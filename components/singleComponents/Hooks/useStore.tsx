import create from 'zustand';

interface UserProfile {
  uid: string;
  displayName: string;
  faction: "insta_gang" | "insta_parlor" | null;
  archetype: string | null;
  joinedAt: number;
}

interface StoreState {
  [x: string]: any;
  // --- System Config ---
  GPUTier: number;
  canvasLoaded: boolean;
  setGPUTier: (tier: number) => void;
  setCanvasLoaded: (loaded: boolean) => void;

  // --- Player State (Persisted) ---
  user: UserProfile | null;
  xp: number;
  level: number;
  
  // --- World State (Reactive) ---
  dailyHeat: number[]; // Array of 24 integers (0-10) for ChronoTrigger
  currentZone: "DASHBOARD" | "ARENA" | "MARKET" | "VIBE";

  // --- Actions ---
  setUser: (user: UserProfile) => void;
  updateXP: (amount: number) => void;
  setZone: (zone: "DASHBOARD" | "ARENA" | "MARKET" | "VIBE") => void;
}

const useStore = create<StoreState>((set) => ({
  GPUTier: 0,
  canvasLoaded: false,
  
  user: null,
  xp: 0,
  level: 1,
  // Default cold world, spikes at 15:00 (index 15)
  dailyHeat: [1,1,0,0,0,1,3,5,6,4,3,4,6,8,9,10,9,7,5,4,2,1,1,1], 
  currentZone: "DASHBOARD",

  setGPUTier: (tier) => set({ GPUTier: tier }),
  setCanvasLoaded: (loaded) => set({ canvasLoaded: loaded }),
  
  setUser: (user) => set({ user }),
  
  updateXP: (amount) => set((state) => {
    const newXp = state.xp + amount;
    const newLevel = Math.floor(newXp / 1000) + 1; // Level up every 1000 XP
    return { xp: newXp, level: newLevel };
  }),

  setZone: (zone) => set({ currentZone: zone }),
}));

export default useStore;