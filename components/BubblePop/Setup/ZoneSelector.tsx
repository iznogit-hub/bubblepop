import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import useStore from "../../singleComponents/Hooks/useStore";

// FIXED: Added Interface
interface ZoneSelectorProps {
  onSelect?: () => void; // Optional if sometimes used for navigation only
  faction?: any;
}

export default function ZoneSelector({ onSelect, faction }: ZoneSelectorProps) {
  const router = useRouter();
  const setZone = useStore(s => s.setZone);

  const zones = [
    { id: "dashboard", label: "HQ" },
    { id: "arena", label: "ARENA" }, 
    { id: "market", label: "MARKET" }, 
    { id: "vibe", label: "VIBE" } 
  ];

  const handleNav = (zoneId: string) => {
    setZone(zoneId.toUpperCase() as any);
    router.push(`/${zoneId}`);
    if (onSelect) onSelect();
  };

  return (
    <div className="two_col" style={{ gap: '20px', padding: '10%' }}>
      {zones.map((zone) => (
        <motion.div
          key={zone.id}
          whileHover={{ scale: 1.05, borderColor: 'white' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleNav(zone.id)}
          className="container_inner"
          style={{
            height: '200px',
            cursor: 'pointer',
            border: '2px solid var(--bubble-peach)',
            padding: '2rem'
          }}
        >
          <h2 style={{ fontSize: '1.2rem', color: 'white' }}>ZONE</h2>
          <h1 style={{ fontSize: '2.5rem' }}>{zone.label}</h1>
        </motion.div>
      ))}
    </div>
  );
}