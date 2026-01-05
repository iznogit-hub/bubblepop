import React from "react";

export default function ChronoTrigger() {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  // Mock Heatmap Data (0 = bad, 10 = viral)
  const heat = [1,1,0,0,0,1,3,5,6,4,3,4,6,8,9,10,9,7,5,4,2,1,1,1];

  return (
    <div className="container_inner" style={{ width: '100%', marginTop: '20px', padding: '1rem' }}>
      <div className="flex-s-between" style={{ width: '100%' }}>
        <h2 style={{ fontSize: '0.9rem', margin: 0 }}>CHRONO TRIGGER</h2>
        <span style={{ color: '#00ff88', fontSize: '0.8rem' }}>PEAK: 15:00</span>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'flex-end', height: '60px', gap: '4px', marginTop: '10px' }}>
        {hours.map((h) => {
          const intensity = heat[h];
          const color = intensity > 7 ? '#00ff88' : intensity > 4 ? 'var(--bubble-peach)' : '#333';
          
          return (
            <div key={h} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
              <div style={{ 
                width: '100%', 
                height: `${intensity * 10}%`, 
                background: color,
                borderRadius: '2px',
                transition: 'height 0.5s ease'
              }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}