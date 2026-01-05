import React from "react";

export default function Loader() {
  return (
    <div className="loader_background flex-middle" style={{height: '100vh', width: '100vw'}}>
      <div className="Loader">
        <h1 style={{fontSize: '1rem', letterSpacing: '0.5rem', color: 'var(--bubble-peach)'}}>
          POPPING...
        </h1>
      </div>
    </div>
  );
}