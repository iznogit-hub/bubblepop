import { useEffect } from "react";
import { useRouter } from "next/router";
import useStore from "../components/singleComponents/Hooks/useStore";

export default function Home() {
  const router = useRouter();
  const user = useStore((state) => state.user);
  const canvasLoaded = useStore((state) => state.canvasLoaded);

  useEffect(() => {
    // Only route once the 3D engine is warmed up to prevent stutter
    if (!canvasLoaded) return;

    if (!user || !user.faction) {
      router.replace("/setup");
    } else {
      router.replace("/dashboard");
    }
  }, [user, router, canvasLoaded]);

  return null; // Render nothing, let _app.tsx handle the 3D background
}