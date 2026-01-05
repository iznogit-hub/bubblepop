import React from "react";
import { motion } from "framer-motion";
import SetupContainer from "../../components/BubblePop/Setup/SetupContainer";

export default function SetupPage({ setFaction, faction }: any) {
  return (
    <motion.main 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: "spring", damping: 20 }}
    >
      <SetupContainer setFaction={setFaction} faction={faction} />
    </motion.main>
  );
}