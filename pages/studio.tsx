import React from "react";
import { motion } from "framer-motion";
import TagRadar from "../components/BubblePop/Workbench/TagRadar";
import CortexEditor from "../components/BubblePop/Workbench/CortexEditor";

export default function StudioPage() {
  return (
    <motion.div 
      className="container pop-entry"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ paddingTop: '5vh' }}
    >
      <div className="flex-s-between" style={{ width: '100%', marginBottom: '20px' }}>
         <h1 style={{ fontSize: '2rem' }}>WORKBENCH</h1>
         <span style={{ color: 'var(--bubble-peach)' }}>CREDITS: 1,000</span>
      </div>

      <div className="two_col" style={{ height: '75vh', gap: '2rem' }}>
        {/* Left: AI Editor */}
        <div style={{ width: '100%', height: '100%' }}>
          <CortexEditor />
        </div>
        
        {/* Right: Tools */}
        <div className="flex" style={{ gap: '20px', height: '100%' }}>
          {/* Top Right: Tag Radar */}
          <div style={{ flex: 2, width: '100%' }}>
             <TagRadar />
          </div>
          
          {/* Bottom Right: Quick Actions */}
          <div style={{ flex: 1, width: '100%', display: 'flex', gap: '10px' }}>
             <button className="container_inner" style={{ flex: 1, cursor: 'pointer' }}>
                <h2 style={{ fontSize: '1rem' }}>SAVE DRAFT</h2>
             </button>
             <button className="container_inner" style={{ flex: 1, cursor: 'pointer', borderColor: '#00ff88' }}>
                <h2 style={{ fontSize: '1rem', color: '#00ff88' }}>PUBLISH</h2>
             </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}