import React from 'react';
import { GeneratedImage } from '../types';

interface HistoryRailProps {
  images: GeneratedImage[];
  onSelect: (image: GeneratedImage) => void;
  selectedId?: string;
}

const HistoryRail: React.FC<HistoryRailProps> = ({ images, onSelect, selectedId }) => {
  if (images.length === 0) return null;

  return (
    <div className="w-full mt-8">
      <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">Recent Creations</h3>
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
        {images.map((img) => (
          <button
            key={img.id}
            onClick={() => onSelect(img)}
            className={`
              relative flex-shrink-0 group rounded-xl overflow-hidden snap-start transition-all duration-300
              ${selectedId === img.id ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-900 scale-105' : 'hover:scale-105 opacity-70 hover:opacity-100'}
            `}
            style={{ width: '120px', height: '120px' }}
          >
            <img 
              src={img.imageUrl} 
              alt={img.prompt} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
               <p className="text-[10px] text-white truncate w-full">{img.prompt}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HistoryRail;
