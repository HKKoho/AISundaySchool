import React from 'react';
import { Loader2, Timer, Wand2 } from 'lucide-react';

interface GameScreenProps {
  imageUrl: string | null;     // The High-Res AI generated image
  simpleImageUrl: string;       // The real-time Raycast image
  isLoading: boolean;
  status: 'start' | 'playing' | 'won' | 'lost';
  elapsedTime: number;
}

export const GameScreen: React.FC<GameScreenProps> = ({ imageUrl, simpleImageUrl, isLoading, status, elapsedTime }) => {
  
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border-4 border-slate-800 group">
      
      {/* HUD: Timer */}
      <div className="absolute top-4 right-4 z-30 flex items-center gap-2 font-mono text-xl font-bold text-amber-400 bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
        <Timer className="w-5 h-5" />
        <span>{formatTime(elapsedTime)}</span>
      </div>

      {/* Main Viewport */}
      {/* Layer 1: Simple Raycast (Always present or fallback) */}
      <img 
        src={simpleImageUrl}
        alt="Dungeon View"
        className="absolute inset-0 w-full h-full object-cover pixelated"
        style={{ imageRendering: 'pixelated' }}
      />

      {/* Layer 2: AI High Res (Overlay) */}
      {imageUrl && (
        <img 
            src={imageUrl} 
            alt="Photorealistic View" 
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isLoading ? 'opacity-80' : 'opacity-100'}`}
        />
      )}

      {/* Loading Overlay (Only when generating High Res) */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/50 backdrop-blur-[2px]">
          <Loader2 className="w-12 h-12 text-purple-400 animate-spin mb-4" />
          <div className="flex items-center gap-2 text-purple-200 font-bold animate-pulse tracking-widest">
            <Wand2 className="w-4 h-4" />
            <span>ENHANCING REALITY...</span>
          </div>
        </div>
      )}

      {/* Status Overlays */}
      {status === 'won' && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-green-900/90 backdrop-blur-md animate-in fade-in duration-500">
          <h2 className="text-6xl font-bold text-green-100 mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] tracking-wider">ESCAPED!</h2>
          <p className="text-green-200 text-xl mb-6">You found the exit.</p>
          
          <div className="bg-black/40 px-8 py-4 rounded-xl border border-green-400/30 flex flex-col items-center shadow-2xl">
             <span className="text-green-400 uppercase text-xs tracking-widest mb-1">Total Time</span>
             <span className="text-4xl font-mono text-white font-bold">{formatTime(elapsedTime)}</span>
          </div>
        </div>
      )}
      
      {/* Visual Effects */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] z-[6]"></div>
      {/* Optional: Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient(circle, transparent 50%, rgba(0,0,0,0.5) 100%) z-[5]"></div>
    </div>
  );
};