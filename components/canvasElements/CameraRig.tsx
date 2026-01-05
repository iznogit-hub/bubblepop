import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import useStore from "../singleComponents/Hooks/useStore";
import * as THREE from "three";

export default function CameraRig() {
  const currentZone = useStore((state) => state.currentZone);
  const vec = new Vector3();

  useFrame((state) => {
    // 1. Define Target Coordinates per Zone
    let targetPos = new Vector3(0, 0, 5); // Default (Dashboard)
    let targetLook = new Vector3(0, 0, 0);

    if (currentZone === "ARENA") {
        targetPos.set(0, 10, 0); // Top-down view for Strategy
        targetLook.set(0, 0, 0);
    } else if (currentZone === "MARKET") {
        targetPos.set(8, 2, 8); // Angled Side View
        targetLook.set(0, 0, 0);
    } else if (currentZone === "VIBE") {
        targetPos.set(0, 0, 2); // Close up (Intimate)
        targetLook.set(0, 0, -5);
    }

    // 2. Smoothly Interpolate Camera Position (Lerp)
    state.camera.position.lerp(targetPos, 0.05);
    
    // 3. Smoothly Interpolate LookAt
    // We cheat slightly by lerping the orbit controls target if they exist, 
    // but for raw camera:
    vec.lerp(targetLook, 0.05);
    state.camera.lookAt(vec);
  });

  return null; // This component has no visual geometry
}