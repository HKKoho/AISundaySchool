import React from 'react';
import type { ArchetypeResult } from '../types';
import PerspectiveCard from './PerspectiveCard';
import { HebrewIcon, ChristianIcon, RestartIcon, ShareIcon } from './icons';
import { useLanguage } from '../contexts';
import { translations } from '../translations';

interface ResultCardProps {
  result: ArchetypeResult;
  onRestart: () => void;
  isImageLoading: boolean;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, onRestart, isImageLoading }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const canShare = typeof navigator !== 'undefined' && navigator.share;

  const handleShare = async () => {
    if (!canShare) return;

    const shareData = {
      title: t.shareTitle,
      text: t.shareText
        .replace('{archetype}', result.archetype)
        .replace('{character}', result.character),
      url: window.location.href,
    };

    try {
      await navigator.share(shareData);
    } catch (err) {
      console.error("Could not share:", err);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 md:p-10 bg-gray-800/50 rounded-2xl shadow-2xl border border-gray-700 backdrop-blur-sm animate-fade-in">
      
      {isImageLoading ? (
        <div className="w-full aspect-video bg-gray-700/50 rounded-lg animate-pulse mb-8 flex items-center justify-center">
          <p className="text-gray-400">{t.imageLoadingSubtitle}</p>
        </div>
      ) : result.imageUrl ? (
        <div className="mb-8 overflow-hidden rounded-lg shadow-xl border border-gray-700">
          <img 
            src={result.imageUrl} 
            alt={t.imageAltText.replace('{character}', result.character)} 
            className="w-full h-auto object-cover animate-fade-in" 
          />
        </div>
      ) : null}

      <div className="text-center mb-8">
        <p className="text-amber-400 text-lg">{t.resultArchetypeIs}</p>
        <h1 className="text-5xl md:text-6xl font-bold text-amber-200 mt-2">{result.archetype}: {result.character}</h1>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">{result.description}</p>
      </div>

      <div className="border-t border-gray-700 my-8"></div>

      <h2 className="text-center text-3xl font-bold text-gray-200 mb-6">{t.resultLearningPaths}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PerspectiveCard 
          perspective={result.hebrewPerspective} 
          icon={<HebrewIcon className="w-10 h-10 text-blue-300"/>}
          title={t.hebrewPerspectiveTitle}
          borderColor="border-blue-400"
        />
        <PerspectiveCard 
          perspective={result.christianPerspective} 
          icon={<ChristianIcon className="w-10 h-10 text-purple-300"/>}
          title={t.christianPerspectiveTitle}
          borderColor="border-purple-400"
        />
      </div>

      <div className="text-center mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={onRestart}
          className="bg-amber-500 text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-amber-400 transition-all duration-300 text-lg shadow-lg shadow-amber-500/20 transform hover:scale-105 inline-flex items-center justify-center w-full sm:w-auto"
        >
          <RestartIcon className="w-5 h-5 mr-2" />
          {t.restartButton}
        </button>
        {canShare && (
          <button
            onClick={handleShare}
            className="bg-gray-600 text-gray-100 font-bold py-3 px-8 rounded-full hover:bg-gray-500 transition-all duration-300 text-lg shadow-lg shadow-gray-600/20 transform hover:scale-105 inline-flex items-center justify-center w-full sm:w-auto"
          >
            <ShareIcon className="w-5 h-5 mr-2" />
            {t.shareButton}
          </button>
        )}
      </div>
    </div>
  );
};

export default ResultCard;