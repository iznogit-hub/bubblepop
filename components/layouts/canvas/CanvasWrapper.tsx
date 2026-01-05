import React, { Dispatch, RefObject, SetStateAction } from "react";
import { Canvas } from "@react-three/fiber";
import ErrorBoundary from "../../singleComponents/ErrorBoundary/ErrorBoundary";
import { Boids } from "../../canvasElements/boids/Boids";
import ShaderBg from "../../canvasElements/shaderBg/ShaderBg";
import CameraRig from "../../canvasElements/CameraRig"; 
import Post from "../../canvasElements/post/Post";
import { motion, useAnimationControls } from "framer-motion";

// FIXED: Updated types to accept Zustand functions and null refs
interface CanvasWrapperProps {
  fwdRef?: RefObject<HTMLDivElement> | null; 
  canvasLoaded: boolean;
  setCanvasLoaded: (loaded: boolean) => void; // Changed from Dispatch<SetStateAction<boolean>>
  faction: "insta_gang" | "insta_parlor" | null;
}

export default function CanvasWrapper(props: CanvasWrapperProps) {
  const controls = useAnimationControls();

  const onCanvasCreated = (state: any) => {
    state.gl.physicallyCorrectLights = true;
    if (props.fwdRef && props.fwdRef.current && state.events.connect) {
      state.events.connect(props.fwdRef.current);
    }
    props.setCanvasLoaded(true);
    controls.start({ opacity: 1 });
  };

  return (
    <motion.div className="canvas_wrapper" initial={{ opacity: 0 }} animate={controls}>
      <ErrorBoundary fallback={null}>
        <Canvas onCreated={onCanvasCreated} dpr={[1, 2]}>
          <color attach="background" args={['#1a1a1b']} />
          
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} color="#ff9a9e" intensity={1.5} />
          
          <CameraRig />

          {props.faction === 'insta_gang' && <Boids />}
          {props.faction === 'insta_parlor' && <ShaderBg />}

          <Post />
          
        </Canvas>
      </ErrorBoundary>
    </motion.div>
  );
}