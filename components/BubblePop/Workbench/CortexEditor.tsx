import React, { useState } from "react";
import { motion } from "framer-motion";

export default function CortexEditor() {
  const [text, setText] = useState("");
  const [optimizing, setOptimizing] = useState(false);

  const handleOptimize = () => {
    if (!text) return;
    setOptimizing(true);
    setTimeout(() => {
      setText((prev) => prev + "\n\n[CORTEX]: HOOK OPTIMIZED. CALL TO ACTION INSERTED.");
      setOptimizing(false);
    }, 1500);
  };

  return (
    <div className="container_inner" style={{ height: '100%', padding: '0', overflow: 'hidden', border: '1px solid var(--bubble-peach)' }}>
      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderBottom: '1px solid #333' }}>
        <h2 style={{ fontSize: '0.8rem', textAlign: 'left', margin: 0, letterSpacing: '2px' }}>C.O.R.T.E.X. v1.0</h2>
      </div>
      
      <textarea 
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="INPUT RAW DATA..." 
        style={{ 
          width: '100%', 
          height: '80%', 
          background: 'transparent', 
          color: 'white', 
          border: 'none', 
          outline: 'none', 
          resize: 'none', 
          padding: '1.5rem',
          fontSize: '1rem',
          fontFamily: 'monospace'
        }}
      />

      <motion.button
        onClick={handleOptimize}
        whileTap={{ scale: 0.98 }}
        style={{
          width: '100%',
          height: '20%',
          background: optimizing ? 'white' : 'transparent',
          color: optimizing ? 'black' : 'var(--bubble-peach)',
          borderTop: '1px solid var(--bubble-peach)',
          borderLeft: 'none', borderRight: 'none', borderBottom: 'none',
          cursor: 'pointer',
          fontWeight: 'bold',
          letterSpacing: '3px'
        }}
      >
        {optimizing ? "OPTIMIZING..." : "RUN CORTEX OPTIMIZER"}
      </motion.button>
    </div>
  );
}