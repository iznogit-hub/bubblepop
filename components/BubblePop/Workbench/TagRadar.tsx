import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TagRadar() {
  const [tags, setTags] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const checkTagHealth = (tag: string) => {
    // Mock Logic: In real app, this hits your Firebase Cloud Function
    const banned = ["follow4follow", "like4like"];
    const viral = ["fyp", "b3d", "r3f", "webgl"];
    
    if (banned.includes(tag)) return "dead";
    if (viral.includes(tag)) return "viral";
    return "stable";
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && input.trim()) {
      setTags([...tags, input.trim().replace("#", "")]);
      setInput("");
    }
  };

  return (
    <div className="container_inner" style={{ padding: '1.5rem', height: '100%', minHeight: '300px' }}>
      <h2 style={{ textAlign: 'left', fontSize: '1.2rem', marginBottom: '1rem' }}>
        TAG RADAR <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>(ENTER TO SCAN)</span>
      </h2>
      
      <input 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="#scan_tag..."
        style={{
          width: '100%',
          background: 'rgba(255,255,255,0.1)',
          border: 'none',
          padding: '1rem',
          color: 'white',
          borderRadius: '10px',
          marginBottom: '1rem',
          outline: 'none'
        }}
      />

      <div className="flex-start" style={{ gap: '10px', flexWrap: 'wrap', flexDirection: 'row' }}>
        <AnimatePresence>
          {tags.map((tag, i) => {
            const health = checkTagHealth(tag);
            const color = health === "viral" ? "#00ff88" : health === "dead" ? "#ff4b2b" : "#ff9a9e";
            
            return (
              <motion.div
                key={tag + i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  border: `1px solid ${color}`,
                  color: color,
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                #{tag}
                {health === "dead" && <span>⚠️</span>}
                {health === "viral" && <span>🔥</span>}
                <button 
                  onClick={() => setTags(tags.filter((_, idx) => idx !== i))}
                  style={{ background: 'none', border: 'none', color: color, cursor: 'pointer', marginLeft: '5px' }}
                >
                  ×
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}