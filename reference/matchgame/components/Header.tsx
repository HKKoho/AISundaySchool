import React from 'react';

interface HeaderProps {
  title: string;
  roundLabel: string;
  scoreLabel: string;
  roundNumber: number;
  totalRounds: number;
  score: number;
  language: 'en' | 'zh-TW';
  onLanguageChange: (lang: 'en' | 'zh-TW') => void;
}

const Header: React.FC<HeaderProps> = ({ 
  title,
  roundLabel,
  scoreLabel,
  roundNumber, 
  totalRounds, 
  score,
  language,
  onLanguageChange
}) => {
  return (
    <header className="text-center">
       <div className="absolute top-4 right-4 flex space-x-2">
        <button
          onClick={() => onLanguageChange('en')}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            language === 'en'
              ? 'bg-sky-600 text-white font-semibold'
              : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'
          }`}
        >
          English
        </button>
        <button
          onClick={() => onLanguageChange('zh-TW')}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            language === 'zh-TW'
              ? 'bg-sky-600 text-white font-semibold'
              : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'
          }`}
        >
          繁體中文
        </button>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-sky-600 dark:text-sky-400 mt-12 md:mt-0">
        {title}
      </h1>
      <div className="mt-4 flex justify-center items-center space-x-6 text-lg">
        <span className="font-semibold bg-slate-200 dark:bg-slate-700 px-4 py-1 rounded-full">
          {roundLabel}: {roundNumber} / {totalRounds}
        </span>
        <span className="font-semibold bg-emerald-100 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200 px-4 py-1 rounded-full">
          {scoreLabel}: {score}
        </span>
      </div>
    </header>
  );
};

export default Header;
