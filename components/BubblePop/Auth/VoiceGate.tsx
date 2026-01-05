import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { signInAnonymously } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase"; 
import useStore from "../../singleComponents/Hooks/useStore"; 

interface VoiceGateProps {
  setFaction?: (faction: "insta_gang" | "insta_parlor") => void;
}

export default function VoiceGate({ setFaction }: VoiceGateProps) {
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState("IDENTIFY YOURSELF");
  
  // FIX: Explicitly type the ref as 'any' to allow .start() method
  const recognitionRef = useRef<any>(null);
  
  const router = useRouter();
  const setUser = useStore((state: any) => state.setUser);

  const handleVoiceLogic = useCallback(async (transcript: string) => {
    const gangTerms = ["bro", "gang", "hustle", "hard", "grind", "money", "roi"];
    const parlorTerms = ["slay", "bestie", "vibe", "aesthetic", "queen", "mood"];
    
    let faction: "insta_gang" | "insta_parlor" = "insta_gang";
    if (parlorTerms.some(t => transcript.includes(t))) faction = "insta_parlor";

    const archetype = faction === "insta_gang" ? "WARLORD" : "CURATOR";
    setText(faction === "insta_gang" ? "WELCOME, OPERATOR." : "WELCOME, INITIATE.");
    
    try {
      const { user } = await signInAnonymously(auth);
      const userProfile = {
        uid: user.uid,
        displayName: "Agent " + user.uid.slice(0,4),
        faction,
        archetype,
        joinedAt: Date.now()
      };

      await setDoc(doc(db, "users", user.uid), {
        ...userProfile,
        createdAt: serverTimestamp(),
        xp: 0,
        level: 1
      });

      setUser(userProfile);
      if(setFaction) setFaction(faction);
      setTimeout(() => router.push("/dashboard"), 1500);
      
    } catch (error) {
      console.error("Access Denied:", error);
      setText("ERROR. RETRY.");
    }
  }, [setUser, setFaction, router]);

  useEffect(() => {
    // FIX: Safely access window object for SSR compatibility
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript.toLowerCase();
          handleVoiceLogic(transcript);
        };
        recognitionRef.current.onend = () => setIsListening(false);
      }
    }
  }, [handleVoiceLogic]);

  const startListening = () => {
    setIsListening(true);
    // FIX: Check if current exists before calling start
    if (recognitionRef.current) {
      recognitionRef.current.start();
    } else {
      console.warn("Speech API not supported or not initialized");
    }
  };

  return (
    <motion.div 
      className="container_inner pop-entry"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <h1 style={{ fontSize: '3rem', fontFamily: 'monospace' }}>{text}</h1>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={startListening} // FIX: Use the clean handler
        className="loader_background"
        style={{
          marginTop: '2rem',
          padding: '1.5rem 3rem',
          borderRadius: '50px',
          border: isListening ? '3px solid #00ff88' : '3px solid var(--bubble-peach)',
          background: 'transparent',
          color: 'white',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        {isListening ? "LISTENING..." : "HOLD TO SPEAK"}
      </motion.button>
    </motion.div>
  );
}