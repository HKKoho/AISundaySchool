import React from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Map, RotateCcw, Wand2 } from 'lucide-react';

interface ControlsProps {
  onMoveForward: () => void;
  onMoveBackward: () => void;
  onTurnLeft: () => void;
  onTurnRight: () => void;
  onPeek: () => void;
  onVisualize: () => void;
  peeksLeft: number;
  disabled: boolean;
  onReset: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  onMoveForward,
  onMoveBackward,
  onTurnLeft,
  onTurnRight,
  onPeek,
  onVisualize,
  peeksLeft,
  disabled,
  onReset
}) => {
  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-slate-900 rounded-xl border border-slate-700 shadow-2xl w-full max-w-md">
      
      {/* Movement Pad */}
      <div className="grid grid-cols-3 gap-2">
        <div />
        <button
          onClick={onMoveForward}
          disabled={disabled}
          className="p-4 bg-slate-700 hover:bg-slate-600 active:bg-slate-500 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed border-b-4 border-slate-900 active:border-b-0 active:translate-y-1"
          aria-label="Move Forward"
        >
          <ChevronUp className="w-8 h-8 text-blue-300" />
        </button>
        <div />

        <button
          onClick={onTurnLeft}
          disabled={disabled}
          className="p-4 bg-slate-700 hover:bg-slate-600 active:bg-slate-500 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed border-b-4 border-slate-900 active:border-b-0 active:translate-y-1"
          aria-label="Turn Left"
        >
          <ChevronLeft className="w-8 h-8 text-blue-300" />
        </button>

        <button
            onClick={onMoveBackward}
            disabled={disabled}
            className="p-4 bg-slate-700 hover:bg-slate-600 active:bg-slate-500 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed border-b-4 border-slate-900 active:border-b-0 active:translate-y-1"
            aria-label="Move Backward"
        >
            <ChevronDown className="w-8 h-8 text-blue-300" />
        </button>

        <button
          onClick={onTurnRight}
          disabled={disabled}
          className="p-4 bg-slate-700 hover:bg-slate-600 active:bg-slate-500 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed border-b-4 border-slate-900 active:border-b-0 active:translate-y-1"
          aria-label="Turn Right"
        >
          <ChevronRight className="w-8 h-8 text-blue-300" />
        </button>
      </div>

      <div className="flex gap-2 w-full justify-center mt-2 flex-wrap">
        <button
          onClick={onPeek}
          disabled={peeksLeft <= 0 || disabled}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg font-bold uppercase tracking-wider transition-all text-sm
            ${peeksLeft > 0 
                ? 'bg-amber-600 hover:bg-amber-500 text-slate-900 shadow-[0_0_15px_rgba(217,119,6,0.5)]' 
                : 'bg-slate-800 text-slate-600 cursor-not-allowed'
            }`}
        >
          <Map className="w-4 h-4" />
          <span>Peek ({peeksLeft})</span>
        </button>

        <button
            onClick={onVisualize}
            disabled={disabled}
            className="flex items-center gap-2 px-4 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(147,51,234,0.5)] text-sm"
            title="Generate Photorealistic View with AI"
        >
            <Wand2 className="w-4 h-4" />
            <span>Realism</span>
        </button>
        
        <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-3 bg-red-900/30 hover:bg-red-900/50 text-red-400 border border-red-900/50 rounded-lg transition-all"
        >
            <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};