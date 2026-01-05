import React from "react";
import {
  EffectComposer,
  Bloom,
  HueSaturation,
  BrightnessContrast,
  Vignette
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export default function Post() {
  return (
    <EffectComposer disableNormalPass>
      <Bloom 
        luminanceThreshold={0.2} 
        mipmapBlur 
        intensity={0.5} 
        radius={0.4} 
      />
      <HueSaturation
        hue={0} 
        saturation={0.1} // Slight boost for the peachy hues
      />
      <BrightnessContrast
        brightness={-0.05} // Darker Obsidian feel
        contrast={0.1} 
      />
      <Vignette
        eskil={false}
        offset={0.5}
        darkness={0.5}
      />
    </EffectComposer>
  );
}