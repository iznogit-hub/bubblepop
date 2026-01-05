import "../styles/globals.scss";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { useEffect, useState, useRef } from "react"; // FIXED: Added useRef
import { AnimatePresence, motion } from "framer-motion";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../components/BubblePop/Auth/firebase"; // Check this path matches your project
import useStore from "../components/singleComponents/Hooks/useStore";
import Loader from "../components/singleComponents/loader/Loader";

const CanvasWrapper = dynamic(
  () => import("../components/layouts/canvas/CanvasWrapper"),
  { ssr: false }
);

function MyApp({ Component, pageProps, router }: AppProps) {
  const [loading, setLoading] = useState(true);
  
  // FIXED: Create a ref to satisfy the CanvasWrapper prop type
  const fwdRef = useRef<HTMLDivElement>(null);

  const setUser = useStore((state) => state.setUser);
  const setCanvasLoaded = useStore((state) => state.setCanvasLoaded);
  const canvasLoaded = useStore((state) => state.canvasLoaded);
  const user = useStore((state) => state.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUser({
            uid: currentUser.uid,
            displayName: data.displayName,
            faction: data.faction,
            archetype: data.archetype,
            joinedAt: data.joinedAt,
          });
          if (data.xp) useStore.setState({ xp: data.xp, level: data.level || 1 });
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser]);

  const pageVariants = {
    initial: { opacity: 0, scale: 0.98 },
    enter: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, scale: 1.02, filter: "blur(10px)", transition: { duration: 0.3 } },
  };

  return (
    <div className="app-shell" ref={fwdRef} style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      
      <CanvasWrapper
        fwdRef={fwdRef} 
        setCanvasLoaded={setCanvasLoaded}
        canvasLoaded={canvasLoaded}
        faction={user?.faction || null}
      />

      <div 
        className="ui-layer" 
        style={{ 
          position: 'absolute', 
          top: 0, left: 0, 
          width: '100%', height: '100%', 
          zIndex: 10,
          pointerEvents: 'none' 
        }}
      >
        <AnimatePresence mode="wait">
          {(!canvasLoaded || loading) ? (
            <motion.div
              key="loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ pointerEvents: 'auto' }}
            >
              <Loader />
            </motion.div>
          ) : (
            <motion.div
              key={router.route}
              variants={pageVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}
            >
              <Component {...pageProps} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}

export default MyApp;