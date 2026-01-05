import React from "react";
import { motion } from "framer-motion";
import MobileLayout from "../components/Layout/MobileLayout";
import useStore from "../components/singleComponents/Hooks/useStore";
import TrendTicker from "../components/BubblePop/HUD/TrendTicker";

export default function Dashboard() {
  const faction = useStore(s => s.user?.faction);
  const factionColor = faction === "insta_gang" ? "text-gang" : "text-parlor";

  return (
    <MobileLayout>
      <TrendTicker />
      
      {/* Spacer for Ticker */}
      <div style={{ height: '30px' }} />

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className={factionColor}>CURRENT OBJECTIVE</h2>
        
        <div className="glass-panel" style={{ borderLeft: `4px solid ${faction === 'insta_gang' ? '#ff4b2b' : '#00ff88'}` }}>
          <div className="flex-between">
            <h1>POST 01</h1>
            <span style={{ fontSize: '3rem', opacity: 0.2 }}>Wait</span>
          </div>
          <p style={{ marginTop: '10px', fontSize: '1.2rem', fontWeight: 'bold' }}>THE GENESIS</p>
          <div className="flex-between" style={{ marginTop: '20px' }}>
            <div className="glass-card" style={{ padding: '5px 10px', marginBottom: 0 }}>Type: Reel</div>
            <div className="glass-card" style={{ padding: '5px 10px', marginBottom: 0 }}>Audio: Trending</div>
          </div>
        </div>

        <h2 style={{ marginTop: '30px' }}>SYSTEM STATUS</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div className="glass-panel flex-col">
            <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>84%</span>
            <span style={{ fontSize: '0.7rem', opacity: 0.7 }}>ENGAGEMENT</span>
          </div>
          <div className="glass-panel flex-col">
            <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>12</span>
            <span style={{ fontSize: '0.7rem', opacity: 0.7 }}>HOT LEADS</span>
          </div>
        </div>
        
        <button className={`btn-action ${faction === 'insta_gang' ? 'gang' : 'parlor'}`} style={{ marginTop: '30px' }}>
          INITIATE PROTOCOL
        </button>

      </motion.div>
    </MobileLayout>
  );
}