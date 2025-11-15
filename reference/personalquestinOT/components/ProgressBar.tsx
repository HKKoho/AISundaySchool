
import React from 'react';
import { useLanguage } from '../contexts';
import { translations } from '../translations';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const percentage = (current / total) * 100;

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-amber-300">{t.progressBar}</span>
        <span className="text-sm font-medium text-amber-300">{current} / {total}</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div 
          className="bg-amber-400 h-2.5 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
