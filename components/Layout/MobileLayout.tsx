import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import useStore from "../singleComponents/Hooks/useStore";

// Icons (Simple SVGs)
const Icons = {
  HQ: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
  Arena: <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />,
  Market: <path d="M23 6l-9.5 9.5-5-5L1 18" />,
  Vibe: <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
};

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, level, xp } = useStore();
  const factionColor = user?.faction === "insta_gang" ? "var(--neon-gang)" : "var(--neon-parlor)";

  const NavItem = ({ path, label, icon }: any) => {
    const isActive = router.pathname === path;
    return (
      <div 
        onClick={() => router.push(path)}
        style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: isActive ? 1 : 0.4, cursor: 'pointer' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isActive ? factionColor : "white"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {icon}
        </svg>
        <span style={{ fontSize: '10px', marginTop: '4px', color: isActive ? factionColor : 'white' }}>{label}</span>
        {isActive && <motion.div layoutId="underline" style={{ width: '4px', height: '4px', borderRadius: '50%', background: factionColor, marginTop: '4px' }} />}
      </div>
    );
  };

  return (
    <div className="app-container">
      {/* --- TOP BAR (HUD) --- */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 20 }}>
        <div className="glass-panel" style={{ padding: '8px 16px', borderRadius: '30px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>LVL {level < 10 ? `0${level}` : level}</span>
        </div>
        
        {/* XP Bar */}
        <div style={{ flex: 1, margin: '0 15px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}>
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: `${(xp % 1000) / 10}%` }} 
            style={{ height: '100%', background: factionColor, borderRadius: '10px', boxShadow: `0 0 10px ${factionColor}` }} 
          />
        </div>

        <div className="glass-panel" style={{ padding: '8px 16px', borderRadius: '30px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>${(xp * 0.05).toFixed(1)}k</span>
        </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="main-content">
        {children}
      </main>

      {/* --- BOTTOM DOCK (Navigation) --- */}
      <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', zIndex: 20 }}>
        <div className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0' }}>
          <NavItem path="/dashboard" label="HQ" icon={Icons.HQ} />
          <NavItem path="/arena" label="ARENA" icon={Icons.Arena} />
          <NavItem path="/market" label="MARKET" icon={Icons.Market} />
          <NavItem path="/vibe" label="VIBE" icon={Icons.Vibe} />
        </div>
      </div>
    </div>
  );
}