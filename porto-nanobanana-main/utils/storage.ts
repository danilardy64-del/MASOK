
import { ref, onValue, set, update } from "firebase/database";
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
 * Mengirim data terbaru ke Firebase Cloud (BULK / SEMUA DATA).
 */
export const savePortfolioToCloud = async (items: PortfolioItem[], mode: PortfolioMode) => {
  if (!db) {
      throw new Error("Database initialization failed. Please reload.");
  }
  
  try {
    let path = 'portfolio/slots';
    if (mode === 'couple') path = 'portfolio/couple_slots';
    if (mode === 'product') path = 'portfolio/product_slots';

    const updates: { [key: string]: any } = {};
    updates[path] = items;
    
    await update(ref(db), updates);
    console.log(`Data successfully saved to Firebase Cloud (${path})!`);
    return true;
  } catch (error: any) {
    console.error("Failed to save to Firebase:", error);
    if (error.code === 'PERMISSION_DENIED' || error.message?.includes('permission_denied')) {
        throw new Error("DATABASE TERKUNCI. Buka Firebase Console > Realtime Database > Tab 'Rules'. Pastikan rules sudah benar.");
    }
    throw new Error(error.message || "Koneksi ke Database gagal.");
  }
};

/**
 * AUTO-SAVE: Menyimpan SATU item saja ke Cloud.
 * Dipanggil otomatis saat Upload/Edit/Delete.
 */
export const saveItemToCloud = async (item: PortfolioItem, mode: PortfolioMode) => {
  if (!db) return;

  let basePath = 'portfolio/slots';
  if (mode === 'couple') basePath = 'portfolio/couple_slots';
  if (mode === 'product') basePath = 'portfolio/product_slots';

  // Firebase menggunakan index 0-based, sedangkan ID kita 1-based.
  const index = item.id - 1;
  const itemPath = `${basePath}/${index}`;

  try {
    await set(ref(db, itemPath), item);
    console.log(`Auto-saved Slot #${item.id} to Cloud.`);
  } catch (error) {
    console.error("Auto-save failed:", error);
    alert("GAGAL MENYIMPAN KE CLOUD! Periksa koneksi internet.");
  }
};
