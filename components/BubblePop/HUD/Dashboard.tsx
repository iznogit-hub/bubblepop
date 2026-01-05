import React from "react";
import { motion } from "framer-motion";

export default function Dashboard({ faction }: any) {
  return (
    <div className="container" style={{ alignItems: 'flex-start', paddingTop: '5vh' }}>
      {/* XP Header */}
      <div className="flex-s-between" style={{ width: '100%', padding: '0 2rem' }}>
        <div className="flex-left">
          <h1 style={{ fontSize: '1.5rem' }}>LVL 01</h1>
          <h2 style={{ fontSize: '0.8rem' }}>{faction?.replace('_', ' ').toUpperCase()}</h2>
        </div>
        <div style={{ width: '60%', height: '10px', background: '#333', borderRadius: '20px', marginTop: '1rem' }}>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '15%' }}
            style={{ height: '100%', background: 'var(--bubble-peach)', borderRadius: '20px', boxShadow: '0 0 15px var(--bubble-peach)' }}
          />
        </div>
      </div>

      {/* Main Mission Card */}
      <motion.div 
        className="container_inner pop-entry" 
        style={{ width: '100%', marginTop: '5vh', height: '40vh', borderStyle: 'double' }}
      >
        <h2 style={{ letterSpacing: '5px' }}>DAILY OBJECTIVE</h2>
        <h1 style={{ fontSize: '2.5rem' }}>POST 01: THE GENESIS</h1>
        <div className="flex-r" style={{ gap: '20px', marginTop: '2rem' }}>
          <div style={{ padding: '10px 20px', background: 'var(--bubble-peach)', color: '#000', borderRadius: '20px', fontWeight: 'bold' }}>
            AUDIO: VIRAL
          </div>
          <div style={{ padding: '10px 20px', border: '1px solid #fff', borderRadius: '20px' }}>
            TYPE: REEL
          </div>
        </div>
      </motion.div>

      {/* Chrono Trigger (Heatmap Placeholder) */}
      <div className="flex-middle" style={{ width: '100%', marginTop: '2rem' }}>
        <p style={{ color: 'var(--bubble-peach)', fontSize: '0.9rem' }}>BEST TIME TO KILL: 18:00 HRS</p>
      </div>
    </div>
  );
}