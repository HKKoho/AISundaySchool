import React from 'react';
import { AspectRatio } from '../types';

interface AspectRatioSelectorProps {
  value: AspectRatio;
  onChange: (ratio: AspectRatio) => void;
  disabled?: boolean;
}

const ratios: { value: AspectRatio; label: string; iconClass: string }[] = [
  { value: '1:1', label: 'Square (1:1)', iconClass: 'w-6 h-6 border-2 border-current rounded-sm' },
  { value: '16:9', label: 'Landscape (16:9)', iconClass: 'w-8 h-5 border-2 border-current rounded-sm' },
  { value: '9:16', label: 'Portrait (9:16)', iconClass: 'w-5 h-8 border-2 border-current rounded-sm' },
  { value: '4:3', label: 'Standard (4:3)', iconClass: 'w-7 h-6 border-2 border-current rounded-sm' },
  { value: '3:4', label: 'Tall (3:4)', iconClass: 'w-6 h-7 border-2 border-current rounded-sm' },
];

const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ value, onChange, disabled }) => {
  return (
    <div className="flex flex-wrap gap-3">
      {ratios.map((ratio) => (
        <button
          key={ratio.value}
          onClick={() => onChange(ratio.value)}
          disabled={disabled}
          className={`
            flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
            ${value === ratio.value 
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 border border-indigo-500' 
              : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700 hover:text-slate-200'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
          title={ratio.label}
        >
          <div className={`${ratio.iconClass} opacity-80`} />
          <span>{ratio.value}</span>
        </button>
      ))}
    </div>
  );
};

export default AspectRatioSelector;
