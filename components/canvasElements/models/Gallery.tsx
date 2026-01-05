import * as THREE from "three";
import React, { useRef, useEffect, useMemo } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { GLTF } from "three-stdlib";

// FIXED: Moved Options OUTSIDE the component to make them static constants.
const options = {
  depthColor: "#a0b8c4",
  uBigWavesElevation: 0.01,
  uBigWavesSpeed: 0.5,
  uSmallWavesElevation: 0.05,
  uSmallWavesFrequency: 0.26,
  uSmallWavesSpeed: 0.2,
  uSmallIterations: 4,
  uColorOffset: 0.9,
  uColorMultiplier: 1.42,
  uFreqX: 1.5,
  uFreqY: 0,
};

type GLTFResult = GLTF & {
  nodes: {
    Object_4: THREE.Mesh;
    Object_8: THREE.Mesh;
    Object_9: THREE.Mesh;
    Object_10: THREE.Mesh;
    Object_11: THREE.Mesh;
    Object_12: THREE.Mesh;
    Object_13: THREE.Mesh;
    Object_14: THREE.Mesh;
    Object_15: THREE.Mesh;
    Object_30: THREE.Mesh;
    Object_32: THREE.Mesh;
  };
  materials: {
    Image_H_01: THREE.MeshBasicMaterial;
    Image_V_01: THREE.MeshBasicMaterial;
    Image_H_02: THREE.MeshBasicMaterial;
    Image_V_02: THREE.MeshBasicMaterial;
  };
};

export function Gallery(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF(
    "/glb/gallery/gallery.gltf"
  ) as GLTFResult;

  const waterMaterial = useMemo(() => new THREE.ShaderMaterial({
    vertexShader: `
      uniform float uTime;
      uniform float uBigWavesElevation;
      uniform vec2 uBigWavesFrequency;
      uniform float uBigWavesSpeed;
      uniform float uSmallWavesElevation;
      uniform float uSmallWavesFrequency;
      uniform float uSmallWavesSpeed;
      uniform float uSmallIterations;
      varying float vElevation;
      varying vec2 vUv;
      
      vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
      vec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }
      float cnoise(vec3 P) {
          vec3 Pi0 = floor(P);
          vec3 Pi1 = Pi0 + vec3(1.0);
          Pi0 = mod(Pi0, 289.0);
          Pi1 = mod(Pi1, 289.0);
          vec3 Pf0 = fract(P);
          vec3 Pf1 = Pf0 - vec3(1.0);
          vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
          vec4 iy = vec4(Pi0.yy, Pi1.yy);
          vec4 iz0 = Pi0.zzzz;
          vec4 iz1 = Pi1.zzzz;
          vec4 ixy = permute(permute(ix) + iy);
          vec4 ixy0 = permute(ixy + iz0);
          vec4 ixy1 = permute(ixy + iz1);
          vec4 gx0 = ixy0 / 7.0;
          vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
          gx0 = fract(gx0);
          vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
          vec4 sz0 = step(gz0, vec4(0.0));
          gx0 -= sz0 * (step(0.0, gx0) - 0.5);
          gy0 -= sz0 * (step(0.0, gy0) - 0.5);
          vec4 gx1 = ixy1 / 7.0;
          vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
          gx1 = fract(gx1);
          vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
          vec4 sz1 = step(gz1, vec4(0.0));
          gx1 -= sz1 * (step(0.0, gx1) - 0.5);
          gy1 -= sz1 * (step(0.0, gy1) - 0.5);
          vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
          vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
          vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
          vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
          vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
          vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
          vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
          vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
          vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
          g000 *= norm0.x;
          g010 *= norm0.y;
          g100 *= norm0.z;
          g110 *= norm0.w;
          vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
          g001 *= norm1.x;
          g011 *= norm1.y;
          g101 *= norm1.z;
          g111 *= norm1.w;
          float n000 = dot(g000, Pf0);
          float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
          float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
          float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
          float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
          float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
          float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
          float n111 = dot(g111, Pf1);
          vec3 fade_xyz = fade(Pf0);
          vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
          vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
          float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
          return 2.2 * n_xyz;
      }
      void main() {
        vUv = uv;
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        float elevation = sin(modelPosition.x * uBigWavesFrequency.x + uTime * uBigWavesSpeed) *
                          sin(modelPosition.z * uBigWavesFrequency.y + uTime * uBigWavesSpeed) *
                          uBigWavesElevation;
        for(float i = 1.0; i <= uSmallIterations; i++) {
            elevation -= abs(cnoise(vec3(modelPosition.xz * uSmallWavesFrequency * i, uTime * uSmallWavesSpeed)) * uSmallWavesElevation / i);
        }
        modelPosition.y += elevation;
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewPosition;
        gl_Position = projectedPosition;
        vElevation = sin(modelPosition.x * uBigWavesFrequency.x + uTime * uBigWavesSpeed) * sin(modelPosition.z * uBigWavesFrequency.y + uTime * uBigWavesSpeed) ;
      }
    `,
    fragmentShader: `
      uniform vec3 uDepthColor;
      uniform float uColorOffset;
      uniform float uColorMultiplier;
      uniform float uTime;
      uniform vec3 diffuseColor;
      uniform vec2 pattern_scale;
      varying float vElevation;
      varying vec2 vUv;
      
      vec2 random2( vec2 p ) {
        return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
      }
      vec3 voronoi(vec2 st){
        vec2 i_st = floor(st);
        vec2 f_st = fract(st);
        float m_dist = 1.;
        for (int y= -1; y <= 1; y++) {
            for (int x= -1; x <= 1; x++) {
                vec2 neighbor = vec2(float(x),float(y));
                vec2 point = random2(i_st + neighbor);
                point = 0.5 + 0.5*sin(uTime / 3.0 + 6.2831*point);
                vec2 diff = neighbor + point - f_st;
                float dist = length(diff);
                m_dist = min(m_dist, dist);
            }
        }
        vec3 color = vec3(0.0,0.0,0.0);
        color += m_dist;
        return color;
      }
      void main() {
          float mixStrength = (vElevation /2.0 + uColorOffset) * uColorMultiplier;
          vec3 voroColor = vec3(voronoi(vUv.xy/pattern_scale * 3.0)*diffuseColor);
          vec3 colorFinal = mix(uDepthColor, voroColor, mixStrength);
          gl_FragColor = vec4(colorFinal, 1.0);
      }
    `,
    uniforms: {
      uTime: { value: 0 },
      uBigWavesElevation: { value: options.uBigWavesElevation },
      uBigWavesFrequency: { value: new THREE.Vector2(1.5, 0.0) },
      uBigWavesSpeed: { value: options.uBigWavesSpeed },
      uSmallWavesElevation: { value: options.uSmallWavesElevation },
      uSmallWavesFrequency: { value: options.uSmallWavesFrequency },
      uSmallWavesSpeed: { value: options.uSmallWavesSpeed },
      uSmallIterations: { value: options.uSmallIterations },
      uDepthColor: { value: new THREE.Color("507DB8") },
      uColorOffset: { value: options.uColorOffset },
      uColorMultiplier: { value: options.uColorMultiplier },
      pattern_scale: { value: new THREE.Vector2(0.1, 0.1) },
      diffuseColor: { value: new THREE.Color("grey") },
    },
    side: THREE.DoubleSide,
  }), []);

  const plane = new THREE.SphereBufferGeometry(32, 32, 32);
  const shader = new THREE.Mesh(plane, waterMaterial);
  shader.rotation.set(3.9, 8, 3.5);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    waterMaterial.uniforms.uTime.value = t / 4;
  });

  // FIXED: No dependencies needed now because options is external static
  useEffect(() => {
    waterMaterial.uniforms.uDepthColor.value = new THREE.Color(options.depthColor);
    waterMaterial.uniforms.uBigWavesFrequency.value = new THREE.Vector2(options.uFreqX, options.uFreqY);
  }, [waterMaterial]);

  const [sa1, sa4, sa5] = useTexture([
    "/textures/sa1.png",
    "/textures/sa4.png",
    "/textures/sa5.png",
  ]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Floor_0" position={[-3.23, 0, 4.05]}>
                 <mesh name="Object_4" geometry={nodes.Object_4.geometry}>
                   <meshStandardMaterial wireframe />
                 </mesh>
              </group>
              <group name="Pictures_2" position={[-0.07, 1.41, 4.14]} rotation={[0, Math.PI / 2, 0]} scale={0.55}>
                <mesh name="Object_8" geometry={nodes.Object_8.geometry}><meshStandardMaterial wireframe /></mesh>
                <mesh name="Object_9" geometry={nodes.Object_9.geometry} material={materials.Image_H_01} />
                <mesh name="Object_10" geometry={nodes.Object_10.geometry} material={materials.Image_V_01} position={[-0.07, 0, -0.01]} />
                <mesh name="Object_11" geometry={nodes.Object_11.geometry} material={materials.Image_H_02} />
                <mesh name="Object_12" geometry={nodes.Object_12.geometry} material={materials.Image_V_02} />
                <group><mesh name="Object_13" geometry={nodes.Object_13.geometry}><meshStandardMaterial map={sa1} /></mesh></group>
                <mesh name="Object_14" geometry={nodes.Object_14.geometry}><meshStandardMaterial map={sa4} /></mesh>
                <mesh name="Object_15" geometry={nodes.Object_15.geometry}><meshStandardMaterial map={sa5} /></mesh>
              </group>
              <group name="Walls_6" position={[-3.23, 0, 4.05]} rotation={[0, Math.PI / 2, 0]}>
                <mesh name="Object_30" geometry={nodes.Object_30.geometry}><meshStandardMaterial wireframe wireframeLinewidth={3} /></mesh>
              </group>
              <group name="Wood_7" position={[-3.23, 0, 4.05]}>
                <mesh name="Object_32" geometry={nodes.Object_32.geometry}><meshStandardMaterial wireframe /></mesh>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}