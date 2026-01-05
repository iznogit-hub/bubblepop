import React from "react";
import { motion } from "framer-motion";
// FIXED: Changed "ROIChart" to "RoiChart" to match filename
import RoiChart from "../components/BubblePop/Treasury/RoiChart";
import LeadMagnet from "../components/BubblePop/Treasury/LeadMagnet";

export default function TreasuryPage() {
  return (
    <motion.div 
      className="container pop-entry"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div style={{ width: '100%', textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '3rem', color: '#ffd200' }}>TREASURY</h1>
        <p style={{ letterSpacing: '2px', opacity: 0.7 }}>LEVEL 20 UNLOCKED</p>
      </div>

      <div className="two_col" style={{ gap: '2rem', height: '60vh' }}>
        <RoiChart />
        <LeadMagnet />
      </div>
    </motion.div>
  );
}