import { initializeApp, getApps } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzY0zF_vwg6F5FfPxopE5yh_2gzIOVJPA",
  authDomain: "kaesar-gaesang.firebaseapp.com",
  projectId: "kaesar-gaesang",
  storageBucket: "kaesar-gaesang.firebasestorage.app",
  messagingSenderId: "374663048554",
  appId: "1:374663048554:web:011d18882497c12e5f0913",
  measurementId: "G-7TX1X0HXD1"
};



// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);

// Enable Offline Persistence for 800k user scale
if (typeof window !== "undefined") {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn("Multiple tabs open, persistence can only be enabled in one tab at a time.");
    } else if (err.code === 'unimplemented') {
      console.warn("The current browser does not support all of the features required to enable persistence");
    }
  });
}

export { db, auth };