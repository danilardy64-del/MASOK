
import React, { useState, useEffect } from 'react';
import { PortfolioItem, StoryResponse, AppLanguage } from '../types';

interface StoryModalProps {
  item: PortfolioItem | null;
  parsedStory: any | null; 
  onClose: () => void;
  onSave: (newStory: StoryResponse) => void;
  onDelete: () => void;
  isAdmin: boolean;
  language: AppLanguage;
}

export const StoryModal: React.FC<StoryModalProps> = ({ item, parsedStory, onClose, onSave, onDelete, isAdmin, language }) => {
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // State for manual editing
  const [editTitle, setEditTitle] = useState("");
  const [editStory, setEditStory] = useState("");

  // Robust content extraction
  const getContent = () => {
    if (!parsedStory) return { title: "No Data", story: "No description found for this image." };

    // 1. Check if the format is new bilingual: { id: {title, story}, en: {title, story} }
    if (parsedStory[language] && typeof parsedStory[language] === 'object') {
        return {
            title: parsedStory[language].title || (language === 'id' ? "Tanpa Judul" : "Untitled"),
            story: parsedStory[language].story || (language === 'id' ? "Tidak ada deskripsi." : "No description.")
        };
    }

    // 2. Fallback to another language in the same object if current selection is missing
    const otherLang = language === 'id' ? 'en' : 'id';
    if (parsedStory[otherLang] && typeof parsedStory[otherLang] === 'object') {
        return parsedStory[otherLang];
    }

    // 3. Legacy Format Support: { title, story } (single language)
    return {
        title: parsedStory.title || (language === 'id' ? "Slot #" + (item?.id || 0) : "Slot #" + (item?.id || 0)),
        story: parsedStory.story || "No description available."
    };
  };

  const currentContent = getContent();

  // Initialize edit fields when entering edit mode or when content changes
  useEffect(() => {
    setEditTitle(currentContent.title);
    setEditStory(currentContent.story);
  }, [currentContent.title, currentContent.story, isEditing]);

  const handleCopy = () => {
    if (currentContent?.story) {
      navigator.clipboard.writeText(currentContent.story);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    }
  };

  const handleSaveManual = () => {
    // Construct the new object preserving the other language if it exists
    const newStoryData: StoryResponse = {
        id: parsedStory?.id || { title: "Tanpa Judul", story: "" },
        en: parsedStory?.en || { title: "Untitled", story: "" },
    };

    // Update the currently selected language
    if (language === 'id') {
        newStoryData.id = { title: editTitle, story: editStory };
    } else {
        newStoryData.en = { title: editTitle, story: editStory };
    }

    onSave(newStoryData);
    setIsEditing(false);
  };

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-6xl bg-white border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row h-[85vh] overflow-hidden">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 z-40 w-10 h-10 bg-white border-4 border-black flex items-center justify-center hover:bg-black hover:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all">✕</button>

        {/* Image Display */}
        <div className="w-full md:w-1/2 h-[40%] md:h-full bg-slate-100 border-b-4 md:border-b-0 md:border-r-4 border-black flex items-center justify-center p-8 select-none">
           {item.imageData ? (
             <img src={item.imageData} className="max-h-full object-contain shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black bg-white" draggable="false" />
           ) : (
             <div className="text-slate-300 font-black text-4xl uppercase opacity-20">NO IMAGE</div>
           )}
        </div>

        {/* Content Side */}
        <div className="w-full md:w-1/2 flex flex-col h-[60%] md:h-full bg-white">
            <div className="flex-1 overflow-y-auto p-6 md:p-12">
                {item.isLoading ? (
                    <div className="flex flex-col items-center justify-center h-full space-y-4">
                        <div className="w-12 h-12 border-4 border-black border-t-yellow-400 rounded-full animate-spin"></div>
                        <p className="font-black text-2xl uppercase italic animate-pulse">LOADING...</p>
                    </div>
                ) : (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-black text-white text-[10px] font-black uppercase tracking-widest">SLOT #{item.id}</span>
                            <span className="px-3 py-1 bg-yellow-300 text-black border-2 border-black text-[10px] font-black uppercase">
                                {language === 'id' ? 'Versi Indonesia' : 'English Version'}
                            </span>
                        </div>
                        
                        {isEditing ? (
                            <div className="space-y-4">
                                <input 
                                    type="text" 
                                    value={editTitle} 
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    className="w-full text-4xl font-black uppercase tracking-tighter border-b-4 border-black p-2 focus:outline-none focus:bg-yellow-50"
                                    placeholder="TITLE HERE"
                                />
                                <textarea 
                                    value={editStory}
                                    onChange={(e) => setEditStory(e.target.value)}
                                    className="w-full h-64 bg-slate-50 border-2 border-black p-4 font-medium text-slate-800 leading-relaxed focus:outline-none focus:ring-4 focus:ring-yellow-200"
                                    placeholder="Write your prompt description here..."
                                />
                            </div>
                        ) : (
                            <>
                                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] border-l-8 border-black pl-6">
                                    {currentContent.title}
                                </h2>
                                
                                <div className="bg-slate-50 border-2 border-black p-6 font-medium text-slate-800 leading-relaxed shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <p className="whitespace-pre-wrap">{currentContent.story}</p>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="border-t-4 border-black p-6 bg-white flex flex-col sm:flex-row gap-4">
                {isEditing ? (
                     <>
                        <button 
                            onClick={handleSaveManual}
                            className="flex-1 py-4 bg-green-500 text-white font-black uppercase border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all hover:bg-green-600"
                        >
                            SAVE CHANGES
                        </button>
                        <button 
                            onClick={() => setIsEditing(false)}
                            className="px-6 py-4 bg-slate-200 text-black font-black uppercase border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all hover:bg-slate-300"
                        >
                            CANCEL
                        </button>
                     </>
                ) : (
                    <>
                        <button 
                            onClick={handleCopy} 
                            disabled={!currentContent?.story || item.isLoading}
                            className={`flex-1 flex items-center justify-center gap-3 py-4 font-black uppercase border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all ${copyFeedback ? 'bg-green-400' : 'bg-yellow-400 hover:bg-yellow-300'}`}
                        >
                            {copyFeedback ? (language === 'id' ? 'TERSALIN!' : 'COPIED!') : (language === 'id' ? 'SALIN PROMPT' : 'COPY PROMPT')}
                        </button>
                        
                        {isAdmin && (
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => setIsEditing(true)}
                                    className="px-4 py-4 bg-blue-500 text-white font-black uppercase border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all hover:bg-blue-600"
                                >
                                    EDIT
                                </button>
                                <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete();
                                }} 
                                className="px-4 py-4 bg-red-500 text-white font-black uppercase border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all hover:bg-red-600"
                                >
                                DEL
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};
