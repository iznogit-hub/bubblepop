import React from "react";
import { motion } from "framer-motion";

export default function TrendTicker() {
  const trends = [
    "AUDIO ALERT: 'Midnight City' Remix (+200%)",
    "FORMAT ALERT: Carousel Posts performing 3x better",
    "NICHE GAP: Low comp in 'Blender Tutorials'",
    "MISSION: Engage with 5 'Sanctuary' accounts"
  ];

  return (
    <div style={{ 
      width: '100%', 
      background: 'var(--bubble-peach)', 
      color: '#000', 
      overflow: 'hidden', 
      whiteSpace: 'nowrap',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 5,
      padding: '0.5rem 0',
      borderBottom: '2px solid white'
    }}>
      <motion.div
        animate={{ x: ["100%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        style={{ display: "inline-block", fontWeight: "bold", fontSize: "0.9rem", letterSpacing: "1px" }}
      >
        {trends.join("  ///  ")}
      </motion.div>
    </div>
  );
}