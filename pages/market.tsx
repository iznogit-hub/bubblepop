import React from "react";
import { motion } from "framer-motion";
import RoiChart from "../components/BubblePop/Treasury/RoiChart";
import useStore from "../components/singleComponents/Hooks/useStore";

export default function MarketPage() {
  const faction = useStore(s => s.user?.faction);
  const xp = useStore(s => s.xp);

  return (
    <motion.main 
      initial={{ x: 100, opacity: 0 }} 
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      style={{ paddingTop: '80px', paddingBottom: '100px' }}
    >
      {/* Header */}
      <div className="flex-s-between" style={{ padding: '0 2rem' }}>
        <div>
          <h2 style={{ fontSize: '0.8rem', color: '#ffd200' }}>ZONE: MARKET</h2>
          <h1 style={{ fontSize: '2rem' }}>GROWTH INDEX</h1>
        </div>
        <div style={{ textAlign: 'right' }}>
           <h2 style={{ fontSize: '2rem', fontFamily: 'monospace' }}>
             ${(xp * 0.04).toFixed(2)}
           </h2>
           <p style={{ fontSize: '0.7rem' }}>EST. BRAND VALUE</p>
        </div>
      </div>

      {/* The Main Chart */}
      <div className="container" style={{ height: '50vh', marginTop: '2rem' }}>
        <div className="container_inner" style={{ border: '1px solid #333' }}>
            <RoiChart />
        </div>
      </div>

      {/* Leaderboard Ticker */}
      <div className="container" style={{ marginTop: '2rem' }}>
        <div className="container_inner" style={{ background: 'rgba(0,0,0,0.5)' }}>
            <h3 style={{ borderBottom: '1px solid #333', paddingBottom: '10px' }}>GLOBAL MOVERS</h3>
            {[
                { name: "Agent_Alpha", gain: "+420%", faction: "SYNDICATE" },
                { name: "Vibe_Queen", gain: "+310%", faction: "SANCTUARY" },
                { name: "Pixel_God", gain: "+150%", faction: "SYNDICATE" },
            ].map((p, i) => (
                <div key={i} className="flex-s-between" style={{ padding: '10px 0', borderBottom: '1px dashed #333' }}>
                    <span>{i+1}. {p.name}</span>
                    <span style={{ color: p.faction === 'SYNDICATE' ? '#ff4b2b' : '#00ff88' }}>{p.gain}</span>
                </div>
            ))}
        </div>
      </div>
    </motion.main>
  );
}