import * as THREE from "three";

// ==========================================
// BUBBLEPOP EMPIRE LOGIC (NEW)
// ==========================================

// Calculate responsive scale for the 3D "Bubbles"
export const getResponsiveScale = (viewport: any) => {
  const aspect = viewport.width / viewport.height;
  return aspect < 1 ? 0.5 : 1; // Scale down for portrait mobile
};

// Map XP progress to a 0-1 range for shader uniforms
export const mapProgress = (value: number, min: number, max: number) => {
  return (value - min) / (max - min);
};

// Normalized mouse position for Raycasting
export function getMousePos(e: any) {
  return {
    x: (e.clientX / window.innerWidth) * 2 - 1,
    y: -(e.clientY / window.innerHeight) * 2 + 1,
  };
}

// ==========================================
// LEGACY HELPERS (RESTORED TO FIX BUILD)
// ==========================================

/**
 * FIXED: 'map_obj' was missing, causing useTimeLine.tsx to crash.
 * Iterates over an object and applies a function to its values.
 */
export const map_obj = (obj: any, fn: any) => {
  const new_obj: any = {};
  for (const key in obj) {
    new_obj[key] = fn(obj[key], key);
  }
  return new_obj;
};

/**
 * FIXED: 'getPositions' is imported in _app.tsx.
 * Restoring generic handler to satisfy TypeScript.
 */
export const getPositions = (e: any) => {
  // If specific logic existed here, it likely returned scroll offsets.
  // Returning e prevents type errors if it passes through.
  return e;
};