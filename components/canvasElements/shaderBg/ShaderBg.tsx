import * as THREE from "three";
import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import useStore from "../../singleComponents/Hooks/useStore";

// Move static GLSL outside to prevent recompilation
const vertexShader = `
  uniform float uTime;
  uniform float uBigWavesElevation;
  uniform vec2 uBigWavesFrequency;
  uniform float uBigWavesSpeed;
  varying float vElevation;
  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    float elevation = sin(modelPosition.x * uBigWavesFrequency.x + uTime * uBigWavesSpeed) *
                      sin(modelPosition.z * uBigWavesFrequency.y + uTime * uBigWavesSpeed) *
                      uBigWavesElevation;
    modelPosition.y += elevation;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
    vElevation = elevation;
  }
`;

const fragmentShader = `
  uniform vec3 uDepthColor;
  uniform vec3 uSurfaceColor;
  varying float vElevation;
  void main() {
    float mixStrength = (vElevation + 0.1) * 5.0;
    vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);
    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function ShaderBg() {
  const mesh = useRef<THREE.Mesh>(null);
  const currentZone = useStore(s => s.currentZone);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uBigWavesElevation: { value: 0.2 },
    uBigWavesFrequency: { value: new THREE.Vector2(4, 1.5) },
    uBigWavesSpeed: { value: 0.75 },
    uDepthColor: { value: new THREE.Color("#000000") },
    uSurfaceColor: { value: new THREE.Color("#1a1a1a") },
  }), []);

  useFrame((state) => {
    const { clock } = state;
    if (mesh.current) {
      // 1. Time Update
      (mesh.current.material as THREE.ShaderMaterial).uniforms.uTime.value = clock.getElapsedTime();

      // 2. Reactive Mood Logic
      const mat = mesh.current.material as THREE.ShaderMaterial;
      
      // Target Values
      let targetSpeed = 0.5;
      let targetElevation = 0.15;
      let targetColor = new THREE.Color("#1a1a1a"); // Default Grey

      if (currentZone === "ARENA") {
        targetSpeed = 2.0; // Stormy
        targetElevation = 0.4;
        targetColor.set("#ff4b2b"); // Red Tint
      } else if (currentZone === "VIBE") {
        targetSpeed = 0.1; // Zen
        targetElevation = 0.05;
        targetColor.set("#00ff88"); // Green Tint
      }

      // Smooth Lerp
      mat.uniforms.uBigWavesSpeed.value = THREE.MathUtils.lerp(mat.uniforms.uBigWavesSpeed.value, targetSpeed, 0.05);
      mat.uniforms.uBigWavesElevation.value = THREE.MathUtils.lerp(mat.uniforms.uBigWavesElevation.value, targetElevation, 0.05);
      mat.uniforms.uSurfaceColor.value.lerp(targetColor, 0.05);
    }
  });

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[20, 20, 128, 128]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={true} // Cyberpunk Look
        transparent={true}
        opacity={0.5}
      />
    </mesh>
  );
}