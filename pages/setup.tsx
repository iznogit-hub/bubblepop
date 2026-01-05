import React from "react";
import { motion } from "framer-motion";
import SetupContainer from "../components/BubblePop/Setup/SetupContainer";
import useStore from "../components/singleComponents/Hooks/useStore";
import { useRouter } from "next/router";

export default function SetupPage() {
  const router = useRouter();
  const user = useStore((state) => state.user);
  
  // If user already exists, kick them to dashboard
  React.useEffect(() => {
    if (user?.faction) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <motion.main 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ scale: 0.95, opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.8 }}
      style={{ height: '100vh', width: '100vw', position: 'relative', overflow: 'hidden' }}
    >
      {/* Background Dimmer */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, width: '100%', height: '100%',
        background: 'radial-gradient(circle at center, transparent 0%, #000 90%)',
        zIndex: 0
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <SetupContainer 
          setFaction={(f: any) => console.log("Faction set:", f)} 
          faction={user?.faction} 
        />
      </div>
    </motion.main>
  );
}