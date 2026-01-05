import React from "react";

export default function RoiChart() {
  return (
    <div className="container_inner" style={{ position: 'relative', overflow: 'hidden' }}>
      <h2 style={{ position: 'absolute', top: '20px', left: '20px', fontSize: '1rem' }}>30-DAY ROI</h2>
      
      {/* CSS Graph Representation */}
      <div style={{ display: 'flex', alignItems: 'flex-end', height: '50%', width: '80%', gap: '10px' }}>
        {[20, 35, 40, 30, 50, 75, 90].map((h, i) => (
           <div key={i} style={{ 
             flex: 1, 
             height: `${h}%`, 
             background: i === 6 ? '#ffd200' : 'rgba(255,255,255,0.2)',
             borderRadius: '5px 5px 0 0'
           }} />
        ))}
      </div>
      <h1 style={{ fontSize: '4rem', marginTop: '1rem' }}>+240%</h1>
    </div>
  );
}