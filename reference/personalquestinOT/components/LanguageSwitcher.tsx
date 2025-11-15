import React, { useState } from 'react';
import { useLanguage } from '../contexts';
import { GlobeIcon } from './icons';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isChanging, setIsChanging] = useState(false);

  const toggleLanguage = () => {
    // Prevent multiple clicks while changing
    if (isChanging) return;

    setIsChanging(true);
    setLanguage(language === 'en' ? 'zh' : 'en');

    // Ensure the loading indicator is visible for a minimum duration for good UX
    setTimeout(() => {
      setIsChanging(false);
    }, 400);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center justify-center w-24 min-h-[40px] bg-gray-800/50 border border-gray-700 text-amber-300 px-3 py-2 rounded-full hover:bg-gray-700/80 backdrop-blur-sm transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-75 disabled:cursor-wait"
      aria-label="Toggle language"
      disabled={isChanging}
    >
      {isChanging ? (
        <div className="w-5 h-5 border-2 border-amber-300/50 border-t-amber-300 rounded-full animate-spin"></div>
      ) : (
        <>
          <GlobeIcon className="w-5 h-5" />
          <span className="ml-2 font-semibold uppercase text-sm">{language}</span>
        </>
      )}
    </button>
  );
};

export default LanguageSwitcher;
