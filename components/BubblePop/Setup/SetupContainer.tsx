import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VoiceGate from "../Auth/VoiceGate";
import ZoneSelector from "./ZoneSelector";
// NicheGrid and ThePact would be imported here in Batch 3

export default function SetupContainer({ setFaction, faction }: any) {
  const [step, setStep] = useState(0);

  return (
    <div className="container">
      <AnimatePresence mode="wait">
        {!faction && (
          <motion.div key="step0" exit={{ opacity: 0, scale: 1.2 }}>
            <VoiceGate setFaction={setFaction} />
          </motion.div>
        )}

        {faction && step === 0 && (
          <motion.div 
            key="step1" 
            className="container_inner pop-entry"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <h2>ACCESS GRANTED</h2>
            <h1>{faction === "insta_gang" ? "SYNDICATE" : "SANCTUARY"}</h1>
            <button onClick={() => setStep(1)} className="flex-middle" style={{color: 'white', marginTop: '20px'}}>
               NEXT →
            </button>
          </motion.div>
        )}

        {step === 1 && (
          <ZoneSelector onSelect={() => setStep(2)} faction={faction} />
        )}
      </AnimatePresence>
    </div>
  );
}