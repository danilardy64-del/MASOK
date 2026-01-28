
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { jsPDF } from "jspdf";
import { PortfolioItem, StoryResponse, PortfolioMode, AppLanguage } from './types';
import { PortfolioCard } from './components/PortfolioCard';
import { StoryModal } from './components/StoryModal';
import { subscribeToPortfolio, savePortfolioToCloud, saveItemToCloud } from './utils/storage';
import { INITIAL_DATA } from './src/data/initialData';

// UPDATED TO 100 SLOTS
const TOTAL_SLOTS = 100;
const OWNER_PASSWORD = "@Hilo123";

const EXTERNAL_LINKS = [
  { name: "GEMINI", url: "https://gemini.google.com/" },
  { name: "PIXVERSE", url: "https://pixverse.ai/" },
  { name: "PIPIT AI", url: "https://pippit.ai/id-id" },
  { name: "HIGGSFIELD", url: "https://higgsfield.ai/" },
  { name: "SEAART AGENT", url: "https://www.seaart.ai/agent/d4fekqde878c73ebah70" },
];

// --- HELPER: BRUTE FORCE SEARCH FOR IMAGES ---
const findAllImagesInJSON = (data: any): PortfolioItem[] => {
    let collectedItems: any[] = [];
    
    const traverse = (obj: any) => {
        if (!obj || typeof obj !== 'object') return;

        if (obj.imageData && typeof obj.imageData === 'string' && obj.imageData.startsWith('data:image')) {
            collectedItems.push(obj);
            return;
        }

        if (Array.isArray(obj)) {
            obj.forEach(child => traverse(child));
            return;
        }

        Object.values(obj).forEach(child => traverse(child));
    };

    traverse(data);
    return collectedItems as PortfolioItem[];
};

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
  const [lang, setLang] = useState<AppLanguage>('id');
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false); 
  const [isCloudConnected, setIsCloudConnected] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [onlineUsers, setOnlineUsers] = useState(1);
  const [totalVisits, setTotalVisits] = useState(0);
  const [isProcessingBulk, setIsProcessingBulk] = useState(false);
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginPass, setLoginPass] = useState("");
  const bulkInputRef = useRef<HTMLInputElement>(null);
  const importInputRef = useRef<HTMLInputElement>(null);

  // Initialize Slots
  useEffect(() => {
    const empty = Array.from({ length: TOTAL_SLOTS }, (_, i) => ({
        id: i + 1,
        imageData: null,
        story: null,
        isLoading: false,
        error: null
    }));
    if (INITIAL_DATA && INITIAL_DATA.length > 0) {
        const merged = empty.map(slot => {
            const staticMatch = INITIAL_DATA.find(d => d.id === slot.id);
            return staticMatch ? staticMatch : slot;
        });
        setItems(merged);
    } else {
        setItems(empty);
    }
  }, []);

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
    const unsubscribe = subscribeToPortfolio(viewMode, (cloudData) => {
        if (cloudData && Array.isArray(cloudData) && cloudData.length > 0) {
             setItems(prevItems => {
                 const newItems = Array.from({ length: TOTAL_SLOTS }, (_, i) => {
                    const cloudItem = cloudData.find((item: any) => item && item.id === (i + 1));
                    return cloudItem || (prevItems[i] ? prevItems[i] : {
                        id: i + 1, imageData: null, story: null, isLoading: false, error: null
                    });
                 });
                 return newItems;
             });
             setIsCloudConnected(true);
        } else {
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
    if (loginPass === OWNER_PASSWORD) {
        setIsLoggedIn(true);
        setLoginPass(""); 
    } else {
        alert("Password Salah!");
    }
  };

  const handleAuthCheck = (): boolean => {
    if (isLoggedIn) return true;
    alert(lang === 'id' ? "Akses Ditolak. Login Admin diperlukan." : "Access Denied. Admin Login Required.");
    return false;
  };

  const handleSaveToCloud = async () => {
    if (!handleAuthCheck()) return;
    if (window.confirm(lang === 'id' ? `Simpan SEMUA data ke Cloud Firebase?` : `Save ALL data to Firebase Cloud?`)) {
        setIsSyncing(true);
        try {
            await savePortfolioToCloud(items, viewMode);
            setIsCloudConnected(true);
            alert("✅ BERHASIL DISIMPAN!");
        } catch (error: any) {
            alert(`❌ GAGAL! ${error.message}`);
        } finally {
            setIsSyncing(false);
        }
    }
  };

  // --- ADMIN BACKUP DOWNLOAD ---
  const handleBackupJSON = () => {
    if (!handleAuthCheck()) return;

    const cleanItems = items.map(item => ({
       id: item.id,
       imageData: item.imageData,
       story: item.story
    }));

    const dataStr = JSON.stringify(cleanItems, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `BACKUP_${viewMode.toUpperCase()}_${new Date().toISOString().slice(0,19).replace(/:/g, "-")}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setIsSyncing(true); 

      setTimeout(() => {
          const reader = new FileReader();
          
          reader.onerror = () => {
            alert("ERROR: Browser gagal membaca file ini.");
            setIsSyncing(false);
          };

          reader.onload = async (event) => {
              try {
                  const jsonString = event.target?.result as string;
                  if (!jsonString) throw new Error("File kosong");

                  let data;
                  try {
                    data = JSON.parse(jsonString);
                  } catch (parseError) {
                    throw new Error("Format file BUKAN JSON yang valid.");
                  }

                  const foundItems = findAllImagesInJSON(data);

                  if (!foundItems || foundItems.length === 0) {
                      throw new Error(`TIDAK ADA data gambar ditemukan.`);
                  }

                  const confirmMsg = `Ditemukan ${foundItems.length} data.\nRestore ke halaman '${viewMode.toUpperCase()}' sekarang?`;
                  
                  if (window.confirm(confirmMsg)) {
                      const normalizedItems = Array.from({ length: TOTAL_SLOTS }, (_, i) => {
                          const targetId = i + 1;
                          let match = foundItems.find((it: any) => it.id && (Number(it.id) === targetId || it.id === targetId.toString()));
                          
                          if (match) {
                            return {
                               id: targetId,
                               imageData: match.imageData || null,
                               story: match.story || null,
                               isLoading: false,
                               error: null
                            } as PortfolioItem;
                          }
                          return {
                              id: targetId,
                              imageData: null,
                              story: null,
                              isLoading: false,
                              error: null
                          };
                      });

                      setItems(normalizedItems);
                      await savePortfolioToCloud(normalizedItems, viewMode);
                      
                      alert(`✅ SUKSES! Halaman akan dimuat ulang.`);
                      window.location.reload();
                  }

              } catch (error: any) {
                  alert("⚠️ GAGAL IMPORT: " + error.message);
              } finally {
                  setIsSyncing(false);
                  if (importInputRef.current) importInputRef.current.value = ''; 
              }
          };
          
          reader.readAsText(file);
      }, 500); 
  };

  // --- PDF GENERATOR ---
  const handleExportPDF = () => {
      setIsExportingPDF(true);
      setTimeout(() => {
        try {
            const doc = new jsPDF();
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const margin = 20;
            const maxImgWidth = pageWidth - (margin * 2);
            const maxImgHeight = pageHeight * 0.5; 

            doc.setFont("helvetica", "bold");
            doc.setFontSize(24);
            doc.text("PORTFOLIO DOCUMENT", pageWidth / 2, pageHeight / 3, { align: "center" });
            doc.setFontSize(12);
            doc.text(`Generated by Nanobanana Pro`, pageWidth / 2, pageHeight / 3 + 15, { align: "center" });
            doc.text(`Language: ${lang.toUpperCase()} | Section: ${viewMode.toUpperCase()}`, pageWidth / 2, pageHeight / 3 + 25, { align: "center" });

            items.forEach((item) => {
                if (item.imageData) {
                    doc.addPage();
                    const storyData = getParsedStory(item.story);
                    const langData = storyData ? (storyData[lang] || storyData['id'] || storyData) : null;
                    const title = langData?.title || `Slot #${item.id}`;
                    const promptRaw = langData?.story || "";
                    const prompt = promptRaw.replace(/\r\n/g, "\n");

                    try {
                        const imgProps = doc.getImageProperties(item.imageData);
                        let imgWidth = maxImgWidth;
                        let imgHeight = (imgProps.height * imgWidth) / imgProps.width;
                        if (imgHeight > maxImgHeight) {
                            imgHeight = maxImgHeight;
                            imgWidth = (imgProps.width * imgHeight) / imgProps.height;
                        }
                        
                        doc.addImage(item.imageData, 'JPEG', (pageWidth - imgWidth) / 2, margin, imgWidth, imgHeight);
                        
                        let cursorY = margin + imgHeight + 15;
                        doc.setFontSize(14);
                        doc.setFont("helvetica", "bold");
                        
                        if (cursorY + 10 > pageHeight - margin) {
                            doc.addPage();
                            cursorY = margin;
                        }
                        doc.text(title, pageWidth / 2, cursorY, { align: "center" });
                        cursorY += 10;

                        doc.setFontSize(10);
                        doc.setFont("helvetica", "normal");
                        
                        const lines = doc.splitTextToSize(prompt, maxImgWidth);
                        const lineHeight = 6;

                        lines.forEach((line: string) => {
                            if (cursorY + lineHeight > pageHeight - margin) {
                                doc.addPage();
                                cursorY = margin + 10; 
                            }
                            doc.text(line, margin, cursorY);
                            cursorY += lineHeight;
                        });

                    } catch (err) {
                        console.error("PDF Error", err);
                        doc.text(`Error exporting slot ${item.id}`, margin, margin + 20);
                    }
                }
            });
            doc.save(`Portfolio_${lang}_${viewMode}.pdf`);
        } catch (error) {
            console.error(error);
            alert("Gagal membuat PDF. Cek console.");
        } finally {
            setIsExportingPDF(false);
        }
      }, 200);
  };

  // --- DELETE LOGIC ---
  const handleDeleteItem = async (id: number) => {
    const confirmDelete = window.confirm("⚠️ KONFIRMASI: Hapus gambar ini secara permanen?");
    if (!confirmDelete) return;

    setSelectedItem(null);

    const emptyItem: PortfolioItem = { 
        id: id, 
        imageData: null, 
        story: null, 
        isLoading: false, 
        error: null 
    };

    setItems(prev => prev.map(item => item.id === id ? emptyItem : item));

    try {
        await saveItemToCloud(emptyItem, viewMode);
        // Feedback visual sederhana (opsional karena UI sudah update)
    } catch (e: any) {
        alert("Gagal update database: " + e.message);
        // Reload untuk memastikan data konsisten
        window.location.reload();
    }
  };

  const processSlotUpload = async (id: number, file: File, openModal: boolean = false) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, isLoading: true, error: null } : item));
    try {
        const compressedBase64 = await compressImage(file);
        
        const defaultStory: StoryResponse = {
            id: {
                title: "Judul Baru",
                story: "Klik tombol EDIT untuk menambahkan deskripsi..."
            },
            en: {
                title: "New Title",
                story: "Click EDIT button to add description..."
            }
        };

        const storyJson = JSON.stringify(defaultStory);
        
        const newItem: PortfolioItem = { 
            id, 
            imageData: compressedBase64, 
            story: storyJson, 
            isLoading: false,
            error: null 
        };

        setItems(prev => prev.map(item => item.id === id ? newItem : item));
        saveItemToCloud(newItem, viewMode);

        if (openModal) setSelectedItem(newItem);
    } catch (err) {
        setItems(prev => prev.map(item => item.id === id ? { ...item, isLoading: false, error: "Upload Failed" } : item));
    }
  };

  const handleUpload = useCallback((id: number, file: File) => processSlotUpload(id, file, true), [viewMode]);

  const handleUpdateItem = (id: number, newStoryData: StoryResponse) => {
    const jsonString = JSON.stringify(newStoryData);
    let updatedItem: PortfolioItem | null = null;
    setItems(prev => prev.map(item => {
        if (item.id === id) {
            updatedItem = { ...item, story: jsonString };
            return updatedItem;
        }
        return item;
    }));
    if (updatedItem) saveItemToCloud(updatedItem, viewMode);
  };

  const getParsedStory = (jsonString: string | null): any => {
      if (!jsonString) return null;
      try { return JSON.parse(jsonString); } catch (e) { return null; }
  };

  const themeColor = viewMode === 'main' ? 'bg-yellow-300' : viewMode === 'couple' ? 'bg-pink-300' : 'bg-cyan-300';
  
  const getHeroTitle = () => {
    if (lang === 'id') {
      if (viewMode === 'main') return "50+ Prompt Nanobanana Pro";
      if (viewMode === 'couple') return "50+ Pose Couple";
      return "50+ Iklan Produk";
    } else {
      if (viewMode === 'main') return "50+ Prompt Nanobanana Pro";
      if (viewMode === 'couple') return "50+ Couple Poses";
      return "50+ Product Ads";
    }
  };

  return (
    <div className={`min-h-screen bg-white text-slate-900 font-sans selection:bg-black selection:text-white`}>
      {/* GLOBAL LOADING OVERLAY */}
      {(isSyncing || isProcessingBulk) && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white p-8 border-4 border-black shadow-[16px_16px_0px_0px_#FFFF00] flex flex-col items-center max-w-sm text-center">
                <div className="w-16 h-16 border-8 border-slate-200 border-t-black rounded-full animate-spin mb-6"></div>
                <h3 className="text-2xl font-black uppercase mb-2">MEMPROSES DATA</h3>
                <p className="font-medium text-slate-600">Mohon tunggu sebentar...</p>
            </div>
        </div>
      )}

      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-sm border-b-4 border-black">
        <div className="container mx-auto px-4 py-3 flex flex-col lg:flex-row items-center justify-between gap-4">
           {/* Logo & Online Status */}
           <div className="flex items-center gap-2 w-full lg:w-auto justify-between lg:justify-start">
               <div className="flex items-center gap-2 cursor-pointer" onClick={() => setViewMode('main')}>
                   <div className={`w-8 h-8 ${themeColor} border-2 border-black rounded-full flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                       <span className="font-bold text-sm">K</span>
                   </div>
                   <span className="font-bold text-xs sm:text-sm uppercase tracking-tighter">KILAU AI PORTFOLIO</span>
               </div>
               
               <div className="flex items-center gap-2">
                   {/* MOBILE LANG + PDF */}
                   <div className="flex lg:hidden items-center gap-1">
                       <div className="flex border-2 border-black bg-white overflow-hidden text-[10px] font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                           <button onClick={() => setLang('id')} className={`px-2 py-1 ${lang === 'id' ? 'bg-black text-white' : 'bg-white'}`}>ID</button>
                           <button onClick={() => setLang('en')} className={`px-2 py-1 ${lang === 'en' ? 'bg-black text-white' : 'bg-white'}`}>EN</button>
                       </div>
                       <button onClick={handleExportPDF} disabled={isExportingPDF} className="text-[10px] font-bold text-white px-2 py-1 border-2 border-black bg-purple-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                         📄 PDF
                       </button>
                   </div>
                   <div className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 border-2 border-black bg-slate-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                       <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                       {onlineUsers} ON
                   </div>
               </div>
           </div>

           {/* Navigation & Login */}
           <div className="flex items-center gap-3">
               <div className="flex gap-1">
                   {['main', 'couple', 'product'].map(m => (
                       <button key={m} onClick={() => setViewMode(m as any)} className={`px-2 sm:px-3 py-1.5 text-[10px] font-bold uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all ${viewMode === m ? 'bg-black text-white' : 'bg-white'}`}>
                           {m}
                       </button>
                   ))}
               </div>

               <div className="flex items-center gap-2 bg-slate-100 p-1.5 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  {!isLoggedIn ? (
                      <input type="password" value={loginPass} onChange={(e) => setLoginPass(e.target.value)} placeholder="Pw" className="w-12 sm:w-16 bg-white border-2 border-black px-2 py-1 text-[10px] focus:outline-none focus:ring-2 focus:ring-yellow-400" onKeyDown={(e) => e.key === 'Enter' && handleLogin()} />
                  ) : (
                      <div className="flex gap-1">
                        <input type="file" ref={importInputRef} onChange={handleImportJSON} accept=".json" className="hidden" />
                        
                        <button onClick={() => importInputRef.current?.click()} className="text-[10px] font-bold bg-green-600 text-white px-2 py-1 border-2 border-black hover:bg-green-500" title="Import JSON Backup">📂 IMPORT</button>
                        
                        {/* BUTTON BACKUP JSON (PENGGANTI RST) */}
                        <button onClick={handleBackupJSON} className="text-[10px] font-bold bg-purple-600 text-white px-2 py-1 border-2 border-black hover:bg-purple-500" title="Download Backup JSON">⬇ BACKUP JSON</button>
                        
                        <button onClick={handleSaveToCloud} className="text-[10px] font-bold bg-blue-500 text-white px-2 py-1 border-2 border-black">💾 SAVE</button>
                      </div>
                  )}
               </div>
           </div>

          {/* DESKTOP LANG + PDF */}
          <div className="hidden lg:flex items-center gap-4">
             <div className="flex border-2 border-black bg-white overflow-hidden text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                 <button onClick={() => setLang('id')} className={`px-4 py-1.5 transition-colors ${lang === 'id' ? 'bg-black text-white' : 'bg-white hover:bg-slate-100'}`}>INDONESIA</button>
                 <button onClick={() => setLang('en')} className={`px-4 py-1.5 transition-colors ${lang === 'en' ? 'bg-black text-white' : 'bg-white hover:bg-slate-100'}`}>ENGLISH</button>
             </div>
             <button onClick={handleExportPDF} disabled={isExportingPDF} className="text-xs font-bold text-white px-4 py-1.5 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-purple-600 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                📄 DOWNLOAD ALL
             </button>
             <div className="text-xs font-bold border-2 border-black px-3 py-1.5 bg-slate-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                 👁 {totalVisits.toLocaleString()}
             </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="mb-16 max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1 w-full bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
                    {getHeroTitle()}
                </h1>
                <p className="text-slate-600 font-medium text-lg mb-8 max-w-xl mx-auto">
                    {lang === 'id' 
                      ? 'Koleksi referensi prompt dan desain visual terbaik. Gambar dilindungi hak cipta.' 
                      : 'Collection of the best prompt references and visual designs. Images are copyrighted.'}
                </p>
                <div className="flex justify-center">
                    <input type="file" ref={bulkInputRef} onChange={(e) => {}} multiple accept="image/*" className="hidden" />
                    <button onClick={() => bulkInputRef.current?.click()} className="px-8 py-4 bg-black text-white font-bold uppercase tracking-widest border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition-all shadow-[4px_4px_0px_0px_rgba(150,150,150,1)]">
                      {lang === 'id' ? '+ TAMBAH FOTO' : '+ ADD PHOTOS'}
                    </button>
                </div>
            </div>

            <div className={`w-full lg:w-72 ${themeColor} border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`}>
                <h3 className="font-black uppercase text-xl mb-4 border-b-2 border-black pb-2">LINKS</h3>
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
            <PortfolioCard key={item.id} item={item} onUpload={handleUpload} onClick={(it) => setSelectedItem(it)} onAuthCheck={handleAuthCheck} language={lang} />
          ))}
        </div>
      </main>

      {selectedItem && (
        <StoryModal 
          item={selectedItem} 
          parsedStory={getParsedStory(selectedItem.story)}
          onClose={() => setSelectedItem(null)}
          onSave={(newStory) => handleUpdateItem(selectedItem.id, newStory)}
          onDelete={() => handleDeleteItem(selectedItem.id)}
          isAdmin={isLoggedIn}
          language={lang}
        />
      )}
    </div>
  );
};

export default App;
