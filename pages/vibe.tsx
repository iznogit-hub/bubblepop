import React from "react";
import { motion } from "framer-motion";
import CortexEditor from "../components/BubblePop/Workbench/CortexEditor";
import useStore from "../components/singleComponents/Hooks/useStore";

export default function VibePage() {
  return (
    <motion.main 
      initial={{ scale: 0.95, opacity: 0 }} 
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ paddingTop: '80px', height: '100vh', overflow: 'hidden' }}
    >
      <div className="container" style={{ height: '80vh' }}>
        <div className="two_col" style={{ height: '100%' }}>
            
            {/* Left Col: The Editor */}
            <div style={{ height: '100%' }}>
                <CortexEditor />
            </div>

            {/* Right Col: Inspiration / Output */}
            <div className="container_inner" style={{ height: '100%', border: '1px dashed var(--bubble-peach)' }}>
                <h2 style={{ fontSize: '0.8rem', letterSpacing: '2px' }}>OUTPUT PREVIEW</h2>
                <div className="flex-middle" style={{ height: '80%', opacity: 0.5 }}>
                    <p>RENDER VISUALIZATION...</p>
                </div>
                <div className="flex-s-between">
                    <button className="loader_background" style={{ padding: '10px 20px', border: 'none', color: 'black', fontWeight: 'bold' }}>
                        EXPORT
                    </button>
                    <button style={{ background: 'transparent', border: '1px solid white', color: 'white', padding: '10px' }}>
                        SAVE DRAFT
                    </button>
                </div>
            </div>

        </div>
      </div>
    </motion.main>
  );
}