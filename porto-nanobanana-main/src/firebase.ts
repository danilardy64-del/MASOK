
import { initializeApp } from "firebase/app";
import { getDatabase, Database } from "firebase/database";

// --- TUGAS ANDA: ISI BAGIAN INI ---
// Salin data ini dari: Project Settings > General > Your Apps > SDK Setup and Configuration (pilih Config)

const firebaseConfig = {
  // GANTI tulisan di bawah dengan API Key dari Firebase Console Anda
  apiKey: "PASTE_API_KEY_DISINI", 
  
  authDomain: "masokkilau.firebaseapp.com",
  
  // URL ini sudah saya ambil dari screenshot Anda
  databaseURL: "https://masokkilau-default-rtdb.asia-southeast1.firebasedatabase.app",
  
  projectId: "masokkilau",
  storageBucket: "masokkilau.firebasestorage.app",
  
  // GANTI dua baris ini dengan data dari Console Anda
  messagingSenderId: "PASTE_SENDER_ID_DISINI",
  appId: "PASTE_APP_ID_DISINI"
};

// --- JANGAN UBAH DI BAWAH INI ---

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const isConfigured = true;

// Fungsi dummy untuk kompatibilitas
export const saveFirebaseConfig = (configStr: string) => { return true; };
export const resetFirebaseConfig = () => { console.log("Reset disabled"); };

export { db, isConfigured };
