
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
 * Mengirim data terbaru ke Firebase Cloud.
 */
export const savePortfolioToCloud = async (items: PortfolioItem[], mode: PortfolioMode) => {
  if (!db) {
      throw new Error("Database initialization failed. Please reload.");
  }
  
  try {
    let path = 'portfolio/slots';
    if (mode === 'couple') path = 'portfolio/couple_slots';
    if (mode === 'product') path = 'portfolio/product_slots';

    // Strategy: Use 'update' to perform a multi-path update.
    // This is often more robust than 'set' for large lists as it handles the object merge differently.
    const updates: { [key: string]: any } = {};
    
    // We update the entire list object at the path
    updates[path] = items;
    
    await update(ref(db), updates);
    console.log(`Data successfully saved to Firebase Cloud (${path})!`);
    return true;
  } catch (error: any) {
    console.error("Failed to save to Firebase:", error);
    
    // Check for Permission Denied (common if rules are locked)
    if (error.code === 'PERMISSION_DENIED' || error.message?.includes('permission_denied')) {
        throw new Error("AKSES DITOLAK: Database dikunci (Rules: read/write false). Hubungi pemilik proyek Firebase.");
    }
    
    // Check for Payload size issues
    if (error.message?.includes("PAYLOAD_TOO_LARGE") || error.code === 'PAYLOAD_TOO_LARGE') {
        throw new Error("UKURAN DATA TERLALU BESAR: Kurangi jumlah atau kualitas gambar.");
    }

    throw new Error(error.message || "Koneksi ke Database gagal.");
  }
};
