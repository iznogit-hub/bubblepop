import React from "react";
import MobileLayout from "../components/Layout/MobileLayout";
import TagRadar from "../components/BubblePop/Workbench/TagRadar";
import NicheGrid from "../components/BubblePop/Setup/NicheGrid";
import { motion } from "framer-motion";

export default function Arena() {
  return (
    <MobileLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="text-gang">COMPETITION SCANNER</h2>
        
        <div className="glass-panel" style={{ padding: 0, overflow: 'hidden', height: '300px' }}>
           {/* TagRadar needs to fit 100% width/height of parent */}
           <TagRadar /> 
        </div>

        <h2 style={{ marginTop: '30px' }}>SECTOR ANALYSIS</h2>
        <div style={{ overflowX: 'auto', display: 'flex', gap: '15px', paddingBottom: '10px' }}>
            {/* Horizontal Scroll for Niches on Mobile */}
            <div className="glass-card" style={{ minWidth: '150px' }}>
                <h3>FPS Gaming</h3>
                <div style={{ width: '100%', height: '4px', background: '#333' }}>
                    <div style={{ width: '80%', height: '100%', background: 'red' }} />
                </div>
            </div>
            <div className="glass-card" style={{ minWidth: '150px' }}>
                <h3>Vibe Coding</h3>
                <div style={{ width: '100%', height: '4px', background: '#333' }}>
                    <div style={{ width: '20%', height: '100%', background: 'green' }} />
                </div>
            </div>
            <div className="glass-card" style={{ minWidth: '150px' }}>
                <h3>Crypto Art</h3>
                <div style={{ width: '100%', height: '4px', background: '#333' }}>
                    <div style={{ width: '50%', height: '100%', background: 'orange' }} />
                </div>
            </div>
        </div>
      </motion.div>
    </MobileLayout>
  );
}