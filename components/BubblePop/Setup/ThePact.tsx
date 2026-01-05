import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

interface PactProps {
  onComplete: () => void;
  faction: "insta_gang" | "insta_parlor" | null;
}

export default function ThePact({ onComplete, faction }: PactProps) {
  const [isHolding, setIsHolding] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startHold = () => {
    setIsHolding(true);
    // Simulate "Long Press" - 1.5 seconds to sign
    timerRef.current = setTimeout(() => {
      onComplete();
    }, 1500);
  };

  const endHold = () => {
    setIsHolding(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  return (
    <motion.div className="container_inner pop-entry" style={{ padding: '3rem' }}>
      <h1>THE PACT</h1>
      <div className="container_description" style={{ margin: '2rem 0' }}>
        <p>I commit to the 20-Day {faction === 'insta_gang' ? 'Syndicate' : 'Sanctuary'} Protocol.</p>
        <p>Zero excuses. Only Growth.</p>
      </div>

      {/* Bio Preview Box */}
      <div style={{ 
        background: '#000', 
        padding: '1rem', 
        borderRadius: '15px', 
        border: '1px dashed var(--bubble-peach)',
        marginBottom: '2rem',
        width: '100%' 
      }}>
        <h2 style={{ fontSize: '1rem', textAlign: 'left' }}>AUTO-GENERATED LOADOUT:</h2>
        <p style={{ fontFamily: 'monospace', color: '#fff' }}>
          {faction === 'insta_gang' ? '⚔️ Built for the Arena | 📈 Market Leader' : '✨ Aesthetic Flow | 🌙 Sanctuary Member'}
        </p>
      </div>

      <motion.button
        onMouseDown={startHold}
        onMouseUp={endHold}
        onMouseLeave={endHold}
        onTouchStart={startHold}
        onTouchEnd={endHold}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          backgroundColor: isHolding ? 'var(--bubble-peach)' : 'transparent',
          scale: isHolding ? 1.1 : 1
        }}
        className="flex-middle"
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          border: '4px solid var(--bubble-peach)',
          color: isHolding ? 'black' : 'white',
          fontWeight: 'bold',
          cursor: 'pointer',
          outline: 'none',
          userSelect: 'none'
        }}
      >
        {isHolding ? "SIGNING..." : "HOLD TO SIGN"}
      </motion.button>
    </motion.div>
  );
}