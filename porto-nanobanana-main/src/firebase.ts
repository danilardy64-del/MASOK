
import { initializeApp } from "firebase/app";
import { getDatabase, Database } from "firebase/database";

// --- KONFIGURASI FIREBASE ---
// Data ini diambil langsung dari screenshot Console Firebase Anda.

const firebaseConfig = {
  apiKey: "AIzaSyCS4DNHEKWlrC64w8Fm8oWHA1uZyanVjVo",
  authDomain: "jujur-ee25b.firebaseapp.com",
  databaseURL: "https://jujur-ee25b-default-rtdb.firebaseio.com",
  projectId: "jujur-ee25b",
  storageBucket: "jujur-ee25b.firebasestorage.app",
  messagingSenderId: "171128468817",
  appId: "1:171128468817:web:48289cf88548e420d619b10"
};

// --- INISIALISASI ---

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const isConfigured = true;

// Fungsi dummy untuk kompatibilitas
export const saveFirebaseConfig = (configStr: string) => { return true; };
export const resetFirebaseConfig = () => { console.log("Reset disabled"); };

export { db, isConfigured };
