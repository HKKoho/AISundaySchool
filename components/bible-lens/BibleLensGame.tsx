import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Play, Loader2, RefreshCw, Trophy, Clock, Book } from 'lucide-react';
import { GameState, BiblicalTriple } from './types';
import { generateBiblicalTriples } from './bibleLensService';
import MemoryGrid from './MemoryGrid';

interface BibleLensGameProps {
  onBack: () => void;
}

const BibleLensGame: React.FC<BibleLensGameProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation('bibleLens');
  const isChineseMode = i18n.language === 'zh-TW';

  const [gameState, setGameState] = useState<GameState>({
    status: 'START',
    score: 0,
    triples: [],
    gridCards: [],
    flippedCards: [],
    matchedTriples: [],
  });

  const [completionTime, setCompletionTime] = useState<number>(0);

  const loadNewGame = async () => {
    setGameState(prev => ({
      ...prev,
      status: 'LOADING',
      errorMessage: undefined,
    }));

    try {
      // Generate all 5 triples with images
      const triples = await generateBiblicalTriples();

      setGameState(prev => ({
        ...prev,
        status: 'PLAYING',
        triples,
        score: 0,
        gridCards: [],
        flippedCards: [],
        matchedTriples: [],
        startTime: Date.now(),
      }));
    } catch (error) {
      console.error('[BibleLensGame] Error loading game:', error);
      setGameState(prev => ({
        ...prev,
        status: 'ERROR',
        errorMessage: t('error.loadFailed')
      }));
    }
  };

  const handleStart = () => {
    loadNewGame();
  };

  const handleComplete = (timeInSeconds: number) => {
    const finalScore = Math.max(0, 200 - timeInSeconds);
    setCompletionTime(timeInSeconds);
    setGameState(prev => ({
      ...prev,
      status: 'RESULT',
      score: finalScore,
      endTime: Date.now(),
    }));
  };

  const handleRestart = () => {
    setGameState({
      status: 'START',
      score: 0,
      triples: [],
      gridCards: [],
      flippedCards: [],
      matchedTriples: [],
    });
    setCompletionTime(0);
  };

  // Error State View
  if (gameState.status === 'ERROR') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-800 via-stone-900 to-amber-900 flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl p-8 max-w-md text-center shadow-2xl">
          <div className="text-red-500 mb-4 flex justify-center">
            <RefreshCw className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-bold text-stone-900 mb-2">{t('error.title')}</h2>
          <p className="text-stone-600 mb-6">{gameState.errorMessage}</p>
          <button
            onClick={loadNewGame}
            className="px-6 py-3 bg-amber-600 text-white rounded-full font-bold hover:bg-amber-700 transition-colors shadow-lg"
          >
            {t('error.retry')}
          </button>
        </div>
      </div>
    );
  }

  // Loading Screen
  if (gameState.status === 'LOADING') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-800 via-stone-900 to-amber-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin text-amber-400 mx-auto mb-4" size={64} />
          <p className="text-amber-50 text-xl font-serif">{t('loading.message')}</p>
        </div>
      </div>
    );
  }

  // Result Screen
  if (gameState.status === 'RESULT') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-800 via-stone-900 to-amber-900 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <Trophy className="text-amber-500 mx-auto mb-4" size={80} />
              <h2 className="text-4xl font-serif font-bold text-stone-900 mb-4">
                {t('result.title')}
              </h2>
              <div className="grid grid-cols-2 gap-6 max-w-md mx-auto mb-6">
                <div className="bg-amber-50 rounded-lg p-4">
                  <Clock className="text-amber-600 mx-auto mb-2" size={32} />
                  <p className="text-stone-600 text-sm mb-1">{t('result.completionTime')}</p>
                  <p className="text-2xl font-bold text-stone-900">{completionTime}s</p>
                </div>
                <div className="bg-amber-50 rounded-lg p-4">
                  <Trophy className="text-amber-600 mx-auto mb-2" size={32} />
                  <p className="text-stone-600 text-sm mb-1">{t('result.finalScore')}</p>
                  <p className="text-2xl font-bold text-stone-900">{gameState.score}</p>
                </div>
              </div>
              <p className="text-stone-600 mb-6">
                {t('result.message')}
              </p>
            </div>

            {/* Show the matched triples */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-stone-900 mb-4 text-center">
                {t('result.objectsLearned')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gameState.triples.map((triple) => (
                  <div key={triple.id} className="bg-stone-50 rounded-lg p-4 border-2 border-amber-200">
                    <div className="flex gap-4">
                      <img
                        src={triple.imageBase64}
                        alt={triple.objectName}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-bold text-stone-900">
                          {isChineseMode ? triple.objectNameZh : triple.objectName}
                        </h4>
                        <p className="text-sm text-stone-600 mb-1">
                          {isChineseMode ? triple.chapterReferenceZh : triple.chapterReference}
                        </p>
                        <p className="text-xs text-stone-500 italic line-clamp-2">
                          {isChineseMode ? triple.verseTextZh : triple.verseText}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={handleRestart}
                className="px-6 py-3 bg-amber-600 text-white rounded-full font-bold hover:bg-amber-700 transition-colors shadow-lg"
              >
                {t('result.playAgain')}
              </button>
              <button
                onClick={onBack}
                className="px-6 py-3 bg-stone-600 text-white rounded-full font-bold hover:bg-stone-700 transition-colors shadow-lg"
              >
                {t('result.exit')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Playing State
  if (gameState.status === 'PLAYING') {
    return <MemoryGrid triples={gameState.triples} onComplete={handleComplete} />;
  }

  // Start Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-800 via-stone-900 to-amber-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-amber-100 hover:text-white transition-colors"
          >
            <ArrowLeft size={24} />
            <span className="font-bold">{t('menu.back')}</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <Book className="text-amber-600 mx-auto mb-4" size={80} />
            <h1 className="text-4xl font-serif font-bold text-stone-900 mb-4">
              {t('menu.title')}
            </h1>
            <p className="text-lg text-stone-600 mb-6">
              {t('menu.description')}
            </p>
          </div>

          <div className="bg-amber-50 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-stone-900 mb-4">{t('menu.howToPlay.title')}</h3>
            <ul className="space-y-3 text-stone-700">
              <li className="flex items-start gap-2">
                <span className="font-bold text-amber-600">1.</span>
                <span>{t('menu.howToPlay.step1')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-amber-600">2.</span>
                <span>{t('menu.howToPlay.step2')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-amber-600">3.</span>
                <span>{t('menu.howToPlay.step3')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-amber-600">4.</span>
                <span>{t('menu.howToPlay.step4')}</span>
              </li>
            </ul>
          </div>

          <div className="bg-stone-100 rounded-lg p-4 mb-6">
            <h4 className="font-bold text-stone-900 mb-2">{t('menu.scoring.title')}</h4>
            <p className="text-stone-700">
              {t('menu.scoring.description')}
            </p>
          </div>

          <div className="text-center">
            <button
              onClick={handleStart}
              className="px-8 py-4 bg-amber-600 text-white rounded-full font-bold text-xl hover:bg-amber-700 transition-colors shadow-lg flex items-center gap-3 mx-auto"
            >
              <Play size={28} />
              {t('menu.startGame')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BibleLensGame;
