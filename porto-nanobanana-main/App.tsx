
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { jsPDF } from "jspdf";
import { PortfolioItem, StoryResponse, PortfolioMode } from './types';
import { PortfolioCard } from './components/PortfolioCard';
import { StoryModal } from './components/StoryModal';
import { subscribeToPortfolio, savePortfolioToCloud } from './utils/storage';
import { INITIAL_DATA } from './src/data/initialData';
import { generateStoryFromImage } from './services/geminiService';

const TOTAL_SLOTS = 50;
const OWNER_PASSWORD = "@Hilo123";

const EXTERNAL_LINKS = [
  { name: "GEMINI", url: "https://gemini.google.com/" },
  { name: "PIXVERSE", url: "https://pixverse.ai/" },
  { name: "PIPIT AI", url: "https://pippit.ai/id-id" },
  { name: "HIGGSFIELD", url: "https://higgsfield.ai/" },
  { name: "SEAART AGENT", url: "https://www.seaart.ai/agent/d4fekqde878c73ebah70" },
];

const compressImage = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // OPTIMISASI KUOTA DATABASE:
        // Kurangi dimensi maksimal dari 600 ke 500 px
        const MAX_DIM = 500; 
        
        if (width > height) {
          if (width > MAX_DIM) {
            height *= MAX_DIM / width;
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width *= MAX_DIM / height;
            height = MAX_DIM;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, width, height);
            ctx.drawImage(img, 0, 0, width, height);
            // Turunkan kualitas JPEG dari 0.6 ke 0.5 agar file lebih kecil & database awet
            const dataUrl = canvas.toDataURL('image/jpeg', 0.5);
            resolve(dataUrl);
        } else {
            reject(new Error("Canvas context failed"));
        }
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<PortfolioMode>('main');

  const createInitialSlots = () => {
      const empty = Array.from({ length: TOTAL_SLOTS }, (_, i) => ({
          id: i + 1,
          imageData: null,
          story: null,
          isLoading: false,
          error: null
      }));
      
      if (INITIAL_DATA && INITIAL_DATA.length > 0) {
          return empty.map(slot => {
              const staticMatch = INITIAL_DATA.find(d => d.id === slot.id);
              return staticMatch ? staticMatch : slot;
          });
      }
      return empty;
  };

  const [items, setItems] = useState<PortfolioItem[]>(createInitialSlots);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false); 
  const [isCloudConnected, setIsCloudConnected] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [onlineUsers, setOnlineUsers] = useState(1);
  const [totalVisits, setTotalVisits] = useState(0);
  const [isProcessingBulk, setIsProcessingBulk] = useState(false);
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUser, setLoginUser] = useState("admin");
  const [loginPass, setLoginPass] = useState("");

  const bulkInputRef = useRef<HTMLInputElement>(null);

  // Prevent closing tab while syncing
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isSyncing || isProcessingBulk) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isSyncing, isProcessingBulk]);

  useEffect(() => {
    setIsLoaded(false);
    // Do not reset cloud connection status immediately to avoid flickering UI
    
    const unsubscribe = subscribeToPortfolio(viewMode, (cloudData) => {
        if (cloudData && Array.isArray(cloudData) && cloudData.length > 0) {
             setItems(prevItems => {
                 // Intelligent Merge: Only update slots if they are different/empty to avoid UI jitter
                 return Array.from({ length: TOTAL_SLOTS }, (_, i) => {
                    const cloudItem = cloudData.find((item: any) => item && item.id === (i + 1));
                    return cloudItem || prevItems[i];
                 });
             });
             setIsCloudConnected(true);
        } else {
             // If cloud is empty (first run), keep local defaults but mark connected
             if(cloudData) setIsCloudConnected(true); 
        }
        setIsLoaded(true);
    });

    return () => unsubscribe();
  }, [viewMode]);

  useEffect(() => {
    const interval = setInterval(() => {
        setOnlineUsers(Math.floor(Math.random() * (85 - 12 + 1) + 12));
    }, 5000);
    const visits = localStorage.getItem('kilau_visits') || "1024";
    const newVisits = parseInt(visits) + 1;
    localStorage.setItem('kilau_visits', newVisits.toString());
    setTotalVisits(newVisits);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    if (loginUser === "admin" && loginPass === OWNER_PASSWORD) {
        setIsLoggedIn(true);
        setLoginPass(""); 
    } else {
        alert("Password Salah! Akses Ditolak.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginPass("");
  };

  const handleAuthCheck = (): boolean => {
    if (isLoggedIn) return true;
    alert("Akses Ditolak. Silakan Login sebagai Admin terlebih dahulu.");
    return false;
  };

  const handleSaveToCloud = async () => {
    if (!handleAuthCheck()) return;
    
    let modeLabel = viewMode.charAt(0).toUpperCase() + viewMode.slice(1);
    if (window.confirm(`Simpan perubahan ${modeLabel} ke Cloud Firebase? Pastikan koneksi internet stabil.`)) {
        setIsSyncing(true);
        try {
            await savePortfolioToCloud(items, viewMode);
            setIsCloudConnected(true);
            alert("✅ BERHASIL! Data tersimpan di Cloud Database.");
        } catch (error: any) {
            console.error(error);
            // Display the actual error message from storage.ts
            alert(`❌ GAGAL! ${error.message}`);
        } finally {
            setIsSyncing(false);
        }
    }
  };

  const handleExportPDF = () => {
      setIsExportingPDF(true);
      setTimeout(() => {
        try {
            const doc = new jsPDF();
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const margin = 20;
            const maxImgWidth = pageWidth - (margin * 2);
            const maxImgHeight = pageHeight * 0.55; 

            doc.setFont("helvetica", "bold");
            doc.setFontSize(24);
            doc.text("PORTFOLIO DOCUMENT", pageWidth / 2, pageHeight / 3, { align: "center" });
            doc.setFontSize(30);
            doc.text(viewMode.toUpperCase() + " MODE", pageWidth / 2, (pageHeight / 3) + 15, { align: "center" });
            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");
            doc.text("Generated by Nanobanana Pro - Kilau AI", pageWidth / 2, pageHeight - 20, { align: "center" });

            let hasContent = false;
            items.forEach((item) => {
                if (item.imageData) {
                    hasContent = true;
                    doc.addPage();
                    const storyData = getParsedStory(item.story);
                    const title = storyData?.title || `Slot #${item.id}`;
                    const prompt = storyData?.story || "No description provided.";

                    try {
                        const imgProps = doc.getImageProperties(item.imageData);
                        let imgWidth = maxImgWidth;
                        let imgHeight = (imgProps.height * imgWidth) / imgProps.width;
                        if (imgHeight > maxImgHeight) {
                            imgHeight = maxImgHeight;
                            imgWidth = (imgProps.width * imgHeight) / imgProps.height;
                        }
                        const xPos = (pageWidth - imgWidth) / 2;
                        doc.addImage(item.imageData, 'JPEG', xPos, margin, imgWidth, imgHeight);

                        const textYStart = margin + imgHeight + 15;
                        doc.setFont("helvetica", "bold");
                        doc.setFontSize(16);
                        doc.text(title, pageWidth / 2, textYStart, { align: "center" });

                        const promptYStart = textYStart + 10;
                        doc.setFont("courier", "normal");
                        doc.setFontSize(10);
                        const availableHeight = pageHeight - promptYStart - margin;
                        const lineHeightMm = 5;
                        const maxLines = Math.floor(availableHeight / lineHeightMm);
                        let lines = doc.splitTextToSize(prompt, maxImgWidth);
                        if (lines.length > maxLines) {
                            lines = lines.slice(0, maxLines - 1);
                            lines.push("[... Prompt dipotong agar pas di halaman ...]");
                        }
                        doc.text(lines, margin, promptYStart);
                    } catch (err) {
                        doc.text(`Error loading image for Slot ${item.id}`, margin, margin + 20);
                    }
                }
            });

            if (!hasContent) {
                alert("Tidak ada foto untuk di-export.");
                setIsExportingPDF(false);
                return;
            }
            doc.save(`Portfolio_${viewMode}_KilauAI.pdf`);
        } catch (error) {
            alert("Gagal membuat PDF.");
        } finally {
            setIsExportingPDF(false);
        }
      }, 100);
  };

  const handleDeleteAll = () => {
    if (!handleAuthCheck()) return;
    if (window.confirm("Hapus SEMUA foto di halaman ini? Tindakan ini perlu di-save agar permanen.")) {
        setItems(Array.from({ length: TOTAL_SLOTS }, (_, i) => ({
            id: i + 1,
            imageData: null,
            story: null,
            isLoading: false,
            error: null
        })));
    }
  };

  const processSlotUpload = async (id: number, file: File, openModal: boolean = false) => {
    // Set initial loading state
    setItems(prev => prev.map(item => item.id === id ? { ...item, isLoading: true, error: null } : item));
    
    try {
        const compressedBase64 = await compressImage(file);
        
        // Trigger Gemini AI analysis for the uploaded image
        // Now returns fallback data if API fails, so it won't throw error
        const storyData = await generateStoryFromImage(compressedBase64);
        const storyJson = JSON.stringify(storyData);
        
        setItems(prev => prev.map(item => 
          item.id === id 
            ? { ...item, imageData: compressedBase64, story: storyJson, isLoading: false, error: null } 
            : item
        ));
        
        if (openModal) {
             setSelectedItem({ id, imageData: compressedBase64, story: storyJson, isLoading: false, error: null });
        }
    } catch (err) {
        // This catch handles image compression errors or unexpected system errors
        console.error("System error during upload:", err);
        setItems(prev => prev.map(item => item.id === id ? { ...item, isLoading: false, error: "Upload Failed" } : item));
        alert("Gagal memproses file gambar. Pastikan format file benar.");
    }
  };

  const handleUpload = useCallback((id: number, file: File) => {
    processSlotUpload(id, file, true);
  }, []);

  const handleBulkClick = () => {
    if(handleAuthCheck()) bulkInputRef.current?.click();
  };

  const handleBulkChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files) as File[];
      const emptySlots = items.filter(i => !i.imageData);
      if (emptySlots.length === 0) {
        alert("Slot penuh!");
        return;
      }
      setIsProcessingBulk(true);
      const filesToProcess = files.slice(0, emptySlots.length);
      for (let i = 0; i < filesToProcess.length; i++) {
          await processSlotUpload(emptySlots[i].id, filesToProcess[i], false);
      }
      setIsProcessingBulk(false);
      e.target.value = '';
    }
  };

  const handleUpdateItem = (id: number, newStoryData: StoryResponse) => {
    const jsonString = JSON.stringify(newStoryData);
    setItems(prev => prev.map(item => item.id === id ? { ...item, story: jsonString } : item));
    setSelectedItem(prev => prev && prev.id === id ? { ...prev, story: jsonString } : prev);
  };

  const handleDeleteItem = (id: number) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, imageData: null, story: null, isLoading: false, error: null } : item));
    setSelectedItem(null);
  };

  const getParsedStory = (jsonString: string | null): StoryResponse | null => {
      if (!jsonString) return null;
      try { return JSON.parse(jsonString); } catch (e) { return null; }
  };

  let themeColor = 'bg-yellow-300';
  let focusRing = 'focus:ring-yellow-400';
  if (viewMode === 'couple') {
      themeColor = 'bg-pink-300';
      focusRing = 'focus:ring-pink-400';
  } else if (viewMode === 'product') {
      themeColor = 'bg-cyan-300';
      focusRing = 'focus:ring-cyan-400';
  }

  return (
    <div className={`min-h-screen bg-white text-slate-900 font-sans selection:bg-black selection:text-white`}>
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>
      
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-sm border-b-4 border-black">
        <div className="container mx-auto px-4 py-3 flex flex-col lg:flex-row items-center justify-between gap-4">
           <div className="flex items-center gap-2 w-full lg:w-auto justify-between lg:justify-start">
               <div className="flex items-center gap-2 cursor-pointer" onClick={() => setViewMode('main')}>
                   <div className={`w-8 h-8 ${themeColor} border-2 border-black rounded-full flex items-center justify-center`}>
                       <span className="font-bold text-lg">K</span>
                   </div>
                   <span className="font-bold text-sm tracking-wider uppercase">KILAU AI PORTOFOLIO</span>
               </div>
               
               <div className="flex items-center gap-3">
                   <div className={`flex items-center gap-1.5 px-2 py-1 border-2 border-black text-[10px] font-bold uppercase transition-colors ${isCloudConnected ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                       <span className={`w-2 h-2 rounded-full ${isCloudConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                       {isCloudConnected ? 'Cloud Linked' : 'Offline Mode'}
                   </div>
                   <div className="flex lg:hidden items-center gap-2 text-[10px] font-bold">
                       <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                       {onlineUsers} ON
                   </div>
               </div>
           </div>

           <div className="flex-1 flex justify-center w-full lg:w-auto gap-4">
               <div className="flex gap-2">
                   <button onClick={() => setViewMode('main')} className={`px-3 py-1.5 text-[10px] sm:text-xs font-bold uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${viewMode === 'main' ? 'bg-yellow-400 text-black' : 'bg-white'}`}>MAIN</button>
                   <button onClick={() => setViewMode('couple')} className={`px-3 py-1.5 text-[10px] sm:text-xs font-bold uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${viewMode === 'couple' ? 'bg-pink-400 text-white' : 'bg-white'}`}>COUPLE</button>
                   <button onClick={() => setViewMode('product')} className={`px-3 py-1.5 text-[10px] sm:text-xs font-bold uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${viewMode === 'product' ? 'bg-cyan-400 text-white' : 'bg-white'}`}>PRODUK</button>
               </div>

               <div className="flex items-center gap-2 bg-slate-100 p-1.5 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <button onClick={handleExportPDF} disabled={isExportingPDF} className={`text-[10px] font-bold text-white px-2 py-1.5 border border-black hover:bg-purple-600 transition-all flex items-center gap-1 mr-2 ${isExportingPDF ? 'bg-slate-400 cursor-wait' : 'bg-purple-500'}`}>
                     📄 PDF
                  </button>

                  {!isLoggedIn ? (
                      <div className="flex items-center gap-2">
                        <input type="password" value={loginPass} onChange={(e) => setLoginPass(e.target.value)} placeholder="Pw" className={`w-16 sm:w-24 bg-white border-2 border-black px-2 py-1 text-xs font-bold focus:outline-none focus:ring-2 ${focusRing}`} onKeyDown={(e) => e.key === 'Enter' && handleLogin()} />
                        <button onClick={handleLogin} className={`bg-black text-white px-3 py-1.5 text-xs font-bold border-2 border-black hover:${themeColor} hover:text-black transition-colors`}>GO</button>
                      </div>
                  ) : (
                      <div className="flex items-center gap-2 px-2 py-0.5">
                          <button onClick={handleDeleteAll} className="text-[10px] font-bold bg-red-600 text-white px-2 py-1 border border-black" title="Reset all">RST</button>
                          <button onClick={handleSaveToCloud} disabled={isSyncing} className={`text-[10px] font-bold text-white px-2 py-1 border border-black flex items-center gap-1 ${isSyncing ? 'bg-slate-400' : 'bg-blue-500 hover:bg-blue-600'}`}>
                             {isSyncing ? '...' : '💾 SAVE'}
                          </button>
                          <button onClick={handleLogout} className="text-[10px] font-bold text-red-500 ml-1">X</button>
                      </div>
                  )}
               </div>
           </div>

          <div className="hidden lg:flex items-center gap-4">
             <div className="flex items-center gap-2 text-xs font-bold border-2 border-black px-3 py-1 bg-slate-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                ONLINE: {onlineUsers}
             </div>
             <div className="flex items-center gap-2 text-xs font-bold border-2 border-black px-3 py-1 bg-slate-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                👁 {totalVisits.toLocaleString()}
             </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="mb-16 max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1 w-full bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
                    {viewMode === 'main' ? '50 Prompt Poster' : viewMode === 'couple' ? '50 Couple Pose' : '50 Product Ads'}
                </h1>
                <p className="text-slate-600 font-medium text-lg mb-8 max-w-xl mx-auto">
                    Koleksi referensi prompt dan desain visual terbaik. Gambar dilindungi hak cipta dan tidak dapat disalin.
                </p>
                <div className="flex justify-center">
                    <input type="file" ref={bulkInputRef} onChange={handleBulkChange} multiple accept="image/*" className="hidden" />
                    <button onClick={handleBulkClick} disabled={isProcessingBulk} className={`px-8 py-4 bg-black text-white font-bold uppercase tracking-widest border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition-all shadow-[4px_4px_0px_0px_rgba(150,150,150,1)] ${isProcessingBulk ? 'opacity-50' : ''}`}>
                      {isProcessingBulk ? 'Processing...' : '+ ADD PHOTOS'}
                    </button>
                </div>
            </div>

            <div className={`w-full lg:w-72 ${themeColor} border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`}>
                <h3 className="font-black uppercase text-xl mb-4 border-b-2 border-black pb-2">Link Akses</h3>
                <ul className="space-y-3">
                    {EXTERNAL_LINKS.map((link) => (
                        <li key={link.name}>
                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="block w-full bg-white border-2 border-black px-4 py-2 font-bold text-xs uppercase hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex justify-between group">
                                {link.name}
                                <span className="opacity-0 group-hover:opacity-100">→</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {items.map((item) => (
            <PortfolioCard key={item.id} item={item} onUpload={handleUpload} onClick={(it) => setSelectedItem(it)} onAuthCheck={handleAuthCheck} />
          ))}
        </div>
      </main>

      <footer className="border-t-4 border-black bg-white py-8 mt-12 text-center text-slate-500 text-[10px] font-mono">
          KILAU AI • PORTFOLIO ENGINE v2.2 • {viewMode.toUpperCase()}
      </footer>

      {selectedItem && (
        <StoryModal 
          item={selectedItem} 
          parsedStory={getParsedStory(selectedItem.story)}
          onClose={() => setSelectedItem(null)}
          onSave={(newStory) => handleUpdateItem(selectedItem.id, newStory)}
          onDelete={() => handleDeleteItem(selectedItem.id)}
          isAdmin={isLoggedIn}
        />
      )}
    </div>
  );
};

export default App;
