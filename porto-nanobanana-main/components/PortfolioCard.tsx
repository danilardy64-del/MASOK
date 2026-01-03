
import React, { useRef } from 'react';
import { PortfolioItem, AppLanguage } from '../types';

interface PortfolioCardProps {
  item: PortfolioItem;
  onUpload: (id: number, file: File) => void;
  onClick: (item: PortfolioItem) => void;
  onAuthCheck: () => boolean; 
  language: AppLanguage;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({ item, onUpload, onClick, onAuthCheck, language }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(item.id, e.target.files[0]);
    }
  };

  const handleClick = () => {
    if (item.imageData) {
      onClick(item);
    } else {
      if (onAuthCheck()) {
        fileInputRef.current?.click();
      }
    }
  };

  return (
    <div 
      className={`
        relative aspect-[3/4] cursor-pointer transition-all duration-200 group bg-white
        border-4 border-black
        ${item.imageData 
          ? 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1' 
          : 'border-dashed border-slate-300 hover:border-black hover:bg-yellow-50 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'}
      `}
      onClick={handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
        onClick={(e) => e.stopPropagation()} 
      />

      <div className="absolute top-0 left-0 z-20 bg-black text-white text-[10px] font-bold px-2 py-1 border-r-2 border-b-2 border-white">
        #{item.id.toString().padStart(2, '0')}
      </div>

      {item.imageData ? (
        <>
          <div className="w-full h-full relative overflow-hidden">
             <img 
               src={item.imageData} 
               alt={`Slot ${item.id}`} 
               className="w-full h-full object-cover transition-all duration-300"
               draggable="false"
             />
             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t-4 border-black p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-200 z-30">
            <p className="text-black text-[10px] font-black uppercase truncate text-center">
              {item.isLoading 
                ? (language === 'id' ? "PROSES..." : "PROCESSING...") 
                : (language === 'id' ? "KLIK UNTUK PROMPT" : "CLICK FOR PROMPT")}
            </p>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 group-hover:text-black transition-colors p-4 text-center">
          <div className="w-12 h-12 border-4 border-slate-200 group-hover:border-black rounded-full flex items-center justify-center mb-2 bg-transparent group-hover:bg-yellow-300 group-hover:scale-110 transition-all shadow-none group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
             <span className="text-2xl font-bold">+</span>
          </div>
          <span className="text-xs font-bold uppercase tracking-wide">{language === 'id' ? 'Upload' : 'Upload'}</span>
          <span className="text-[8px] bg-slate-200 group-hover:bg-black group-hover:text-white px-1 mt-1 font-black transition-colors">OWNER ONLY</span>
        </div>
      )}
    </div>
  );
};
