
import { ref, onValue, set } from "firebase/database";
import { db } from "../src/firebase"; // Mengarah ke src/firebase.ts
import { PortfolioItem, PortfolioMode } from "../types";

/**
 * Mendengarkan perubahan data secara Realtime dari Firebase.
 */
export const subscribeToPortfolio = (mode: PortfolioMode, onDataReceived: (items: PortfolioItem[]) => void) => {
  if (!db) {
      console.warn("Database belum terkoneksi (Menunggu Setup)");
      onDataReceived([]); 
      return () => {};
  }

  // Determine path based on mode
  let path = 'portfolio/slots'; // Default main
  if (mode === 'couple') path = 'portfolio/couple_slots';
  if (mode === 'product') path = 'portfolio/product_slots';

  const portfolioRef = ref(db, path);
  
  const unsubscribe = onValue(portfolioRef, (snapshot) => {
    const data = snapshot.val();
    if (data && Array.isArray(data)) {
      onDataReceived(data);
    } else {
      onDataReceived([]);
    }
  }, (error) => {
    console.error("Firebase Read Error:", error);
  });

  return unsubscribe;
};

/**
 * Mengirim data terbaru ke Firebase Cloud.
 */
export const savePortfolioToCloud = async (items: PortfolioItem[], mode: PortfolioMode) => {
  if (!db) {
      throw new Error("Database belum disetting! Lakukan setup di halaman awal.");
  }
  
  try {
    let path = 'portfolio/slots';
    if (mode === 'couple') path = 'portfolio/couple_slots';
    if (mode === 'product') path = 'portfolio/product_slots';

    const portfolioRef = ref(db, path);
    await set(portfolioRef, items);
    console.log(`Data successfully saved to Firebase Cloud (${path})!`);
    return true;
  } catch (error) {
    console.error("Failed to save to Firebase:", error);
    throw error;
  }
};
