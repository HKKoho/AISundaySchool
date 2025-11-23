import React, { useState } from 'react';
import { GameProvider } from '../contexts/GameContext';
import Header from './bible/Header';
import GameMap from './bible/GameMap';
import QuizMode from './bible/QuizMode';
import MatchGame from './matchgame/MatchGame';
import { ArrowLeft, Gamepad2, Grid3x3 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface BibleGameProps {
  onBack: () => void;
}

type GameMode = 'select' | 'exploration' | 'exploration-quiz' | 'matching';

export const BibleGame: React.FC<BibleGameProps> = ({ onBack }) => {
  const { t } = useTranslation('common');
  const [gameMode, setGameMode] = useState<GameMode>('select');

  const handleGameModeSelect = (mode: GameMode) => {
    if (mode === 'matching') {
      setGameMode('matching');
      return;
    }
    // Use quiz mode for exploration game
    if (mode === 'exploration') {
      setGameMode('exploration-quiz');
      return;
    }
    setGameMode(mode);
  };

  if (gameMode === 'select') {
    return (
      <div className="fixed inset-0 bg-cover bg-center text-stone-900 font-serif" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/old-wall.png')"}}>
        <div className="bg-stone-800 bg-opacity-60 min-h-screen overflow-auto flex flex-col">
          <div className="p-4 flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-stone-200 hover:text-white transition-colors bg-stone-700 hover:bg-stone-600 px-4 py-2 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
              {t('buttons.backToHome')}
            </button>
          </div>

          <div className="flex-grow flex items-center justify-center p-8">
            <div className="max-w-4xl w-full">
              <h2 className="text-4xl font-bold text-center text-white mb-12" style={{fontFamily: "'Trajan Pro', serif"}}>
                {t('navigation.bibleGame')}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Exploration Game */}
                <button
                  onClick={() => handleGameModeSelect('exploration')}
                  className="group relative bg-gradient-to-br from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                >
                  <div className="flex flex-col items-center text-white">
                    <div className="mb-6 p-6 bg-white/20 rounded-full backdrop-blur-sm">
                      <Gamepad2 className="w-20 h-20" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{t('features.bibleGame.explorationTitle')}</h3>
                    <p className="text-white/90 text-center">
                      {t('features.bibleGame.explorationDesc')}
                    </p>
                  </div>
                </button>

                {/* Matching Game */}
                <button
                  onClick={() => handleGameModeSelect('matching')}
                  className="group relative bg-gradient-to-br from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                >
                  <div className="flex flex-col items-center text-white">
                    <div className="mb-6 p-6 bg-white/20 rounded-full backdrop-blur-sm">
                      <Grid3x3 className="w-20 h-20" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{t('features.bibleGame.matchingTitle')}</h3>
                    <p className="text-white/90 text-center">
                      {t('features.bibleGame.matchingDesc')}
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameMode === 'exploration-quiz') {
    return (
      <div className="fixed inset-0 bg-cover bg-center text-stone-900 font-serif" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/old-wall.png')"}}>
        <div className="bg-stone-800 bg-opacity-60 min-h-screen overflow-auto">
          <QuizMode onBack={() => setGameMode('select')} />
        </div>
      </div>
    );
  }

  if (gameMode === 'matching') {
    return (
      <div className="fixed inset-0">
        <MatchGame onBack={() => setGameMode('select')} />
      </div>
    );
  }

  return (
    <GameProvider>
      <div className="fixed inset-0 bg-cover bg-center text-stone-900 font-serif" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/old-wall.png')"}}>
        <div className="bg-stone-800 bg-opacity-60 min-h-screen overflow-auto">
          <div className="p-4">
            <button
              onClick={() => setGameMode('select')}
              className="flex items-center gap-2 text-stone-200 hover:text-white transition-colors mb-4 bg-stone-700 hover:bg-stone-600 px-4 py-2 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
              {t('buttons.back')}
            </button>
          </div>
          <Header />
          <main className="p-4 sm:p-6 md:p-8">
            <GameMap />
          </main>
          <footer className="text-center py-4 text-stone-400 text-sm">
            <p>📖 Default questions curated by biblical scholars</p>
            <p className="text-xs mt-1">⚡ AI Question Generator powered by Google Gemini 2.0 Flash Experimental</p>
          </footer>
        </div>
      </div>
    </GameProvider>
  );
};
