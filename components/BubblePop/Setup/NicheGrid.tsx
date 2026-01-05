import React from "react";
import { motion } from "framer-motion";

export default function NicheGrid({ onSelect, faction }: any) {
  const niches = [
    { id: "warlord", title: "FPS WARLORD", saturation: 85, color: "#ff4b2b" },
    { id: "vibe_curator", title: "VIBE CURATOR", saturation: 20, color: "#00ff88" },
    { id: "tech_guru", title: "TECH GURU", saturation: 45, color: "#ff9a9e" },
    { id: "lifestyle_lead", title: "LIFESTYLE LEAD", saturation: 60, color: "#ffd200" },
  ];

  return (
    <div className="container_inner pop-entry" style={{ width: '80vw', maxHeight: '70vh', overflowY: 'auto' }}>
      <h2 style={{ marginBottom: '2rem' }}>IDENTIFY YOUR NICHE GAP</h2>
      <div className="flex" style={{ gap: '15px', width: '100%' }}>
        {niches.map((niche) => (
          <motion.div
            key={niche.id}
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
            onClick={() => onSelect(niche.id)}
            style={{
              padding: '1.5rem',
              borderRadius: '20px',
              border: '1px solid rgba(255,154,158,0.3)',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div className="flex-left">
              <h1 style={{ fontSize: '1.2rem', letterSpacing: '2px' }}>{niche.title}</h1>
              <p style={{ fontSize: '0.8rem', color: 'var(--bubble-peach)' }}>
                {niche.saturation > 70 ? "HIGH COMPETITION" : "OPEN GAP"}
              </p>
            </div>
            
            {/* The Saturation Meter */}
            <div style={{ width: '150px', height: '8px', background: '#333', borderRadius: '10px' }}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${niche.saturation}%` }}
                style={{ height: '100%', background: niche.color, borderRadius: '10px' }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}