import React from "react";

export default function LeadMagnet() {
  return (
    <div className="container_inner">
      <h2 style={{ fontSize: '1rem', color: 'var(--bubble-peach)' }}>SOLVER E: AUTO-DM</h2>
      
      <div style={{ width: '80%', textAlign: 'left', marginTop: '2rem' }}>
        <p>TRIGGER WORD:</p>
        {/* FIXED: Escaped Quotes */}
        <div style={{ background: '#000', padding: '10px', border: '1px solid #333', marginBottom: '1rem' }}>
            &quot;PROTOCOL&quot;
        </div>
        
        <p>ASSET LINK:</p>
        <div style={{ background: '#000', padding: '10px', border: '1px solid #333' }}>gumroad.com/l/protocol</div>
      </div>

      <button style={{ 
        marginTop: '2rem', 
        padding: '1rem 2rem', 
        background: 'var(--bubble-peach)', 
        color: 'black', 
        border: 'none', 
        borderRadius: '30px', 
        fontWeight: 'bold',
        cursor: 'pointer'
      }}>
        ACTIVATE SYSTEM
      </button>
    </div>
  );
}