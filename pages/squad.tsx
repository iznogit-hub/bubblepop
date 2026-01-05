import React from "react";
import { motion } from "framer-motion";

export default function SquadPage() {
  return (
    <motion.div 
      className="container pop-entry"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="container_inner" style={{ width: '100%', height: '70vh' }}>
        <h1 style={{ fontSize: '2rem' }}>SQUAD LOBBY</h1>
        <p style={{ color: 'var(--bubble-peach)' }}>5 TARGETS IDENTIFIED FOR RECIPROCITY</p>
        
        <div className="flex" style={{ width: '100%', marginTop: '2rem', gap: '10px' }}>
           {[1,2,3,4,5].map(i => (
             <div key={i} className="flex-r-top" style={{ padding: '1rem', borderBottom: '1px solid #333', justifyContent: 'space-between' }}>
                <span>TARGET_USER_0{i}</span>
                <button style={{ color: 'var(--bubble-peach)' }}>VIEW PROFILE</button>
             </div>
           ))}
        </div>
      </div>
    </motion.div>
  );
}