import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Loader2, Map, BookOpen } from 'lucide-react';
import { GameState, RouteData, QuizQuestion, AVAILABLE_ROUTES } from './types';
import { generateRouteData, generateQuizForStep } from './journeyService';
import MapVisualizer from './MapVisualizer';
import QuizModal from './QuizModal';

interface GuidedJourneyGameProps {
  onBack: () => void;
}

const GuidedJourneyGame: React.FC<GuidedJourneyGameProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation('guidedJourney');
  const isChineseMode = i18n.language === 'zh-TW';

  const [gameState, setGameState] = useState<GameState>(GameState.MENU);
  const [routeData, setRouteData] = useState<RouteData | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentQuiz, setCurrentQuiz] = useState<QuizQuestion | null>(null);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRouteSelect = async (routeId: string) => {
    setGameState(GameState.LOADING_ROUTE);
    setLoadingMessage(t('loading.generatingRoute'));

    try {
      const selectedRoute = AVAILABLE_ROUTES.find(r => r.id === routeId);
      if (!selectedRoute) throw new Error('Route not found');

      const data = await generateRouteData(
        routeId,
        selectedRoute.title,
        selectedRoute.titleZh
      );

      setRouteData(data);
      setCurrentStepIndex(0);
      setGameState(GameState.PLAYING);
    } catch (error) {
      console.error('Error loading route:', error);
      setErrorMessage(t('error.loadFailed'));
      setGameState(GameState.ERROR);
    }
  };

  const handleContinueJourney = async () => {
    if (!routeData) return;

    const currentStop = routeData.stops[currentStepIndex];
    const nextStop = routeData.stops[currentStepIndex + 1];

    if (!nextStop) {
      // Journey complete
      setGameState(GameState.FINISHED);
      return;
    }

    setGameState(GameState.LOADING_ROUTE);
    setLoadingMessage(t('loading.generatingQuiz'));

    try {
      const quiz = await generateQuizForStep(
        currentStop.name,
        currentStop.nameZh,
        nextStop.name,
        nextStop.nameZh,
        isChineseMode ? routeData.titleZh : routeData.title
      );

      setCurrentQuiz(quiz);
      setGameState(GameState.QUIZ);
    } catch (error) {
      console.error('Error generating quiz:', error);
      // Continue without quiz in case of error
      setCurrentStepIndex(prev => prev + 1);
      setGameState(GameState.PLAYING);
    }
  };

  const handleQuizCorrect = () => {
    setCurrentQuiz(null);
    setCurrentStepIndex(prev => prev + 1);
    setGameState(GameState.PLAYING);
  };

  const handleQuizIncorrect = () => {
    // For now, just allow retry by resetting quiz state
    // Could add penalties or different logic here
  };

  const handleRetry = () => {
    setGameState(GameState.MENU);
    setRouteData(null);
    setCurrentStepIndex(0);
    setErrorMessage('');
  };

  // Menu Screen
  if (gameState === GameState.MENU) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-800 via-stone-900 to-amber-900 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-amber-100 hover:text-white transition-colors"
            >
              <ArrowLeft size={24} />
              <span className="font-bold">{t('menu.back')}</span>
            </button>
            <div className="flex items-center gap-3">
              <Map className="text-amber-400" size={32} />
              <h1 className="text-4xl font-serif font-bold text-amber-50">
                {t('menu.title')}
              </h1>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-amber-400/30">
            <p className="text-amber-50 text-lg leading-relaxed">
              {t('menu.description')}
            </p>
          </div>

          {/* Route Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AVAILABLE_ROUTES.map(route => (
              <button
                key={route.id}
                onClick={() => handleRouteSelect(route.id)}
                className={`bg-gradient-to-br ${route.color} rounded-xl p-6 text-left transition-all hover:scale-105 hover:shadow-2xl border-2 border-white/20`}
              >
                <h3 className="text-2xl font-serif font-bold text-white mb-2">
                  {isChineseMode ? route.titleZh : route.title}
                </h3>
                <p className="text-white/90 text-sm">
                  {isChineseMode ? route.descZh : route.desc}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Loading Screen
  if (gameState === GameState.LOADING_ROUTE) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-800 via-stone-900 to-amber-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin text-amber-400 mx-auto mb-4" size={64} />
          <p className="text-amber-50 text-xl font-serif">{loadingMessage}</p>
        </div>
      </div>
    );
  }

  // Error Screen
  if (gameState === GameState.ERROR) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-800 via-stone-900 to-amber-900 flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">{t('error.title')}</h2>
          <p className="text-stone-700 mb-6">{errorMessage}</p>
          <button
            onClick={handleRetry}
            className="px-6 py-3 bg-amber-600 text-white rounded-full font-bold hover:bg-amber-700 transition-colors"
          >
            {t('error.retry')}
          </button>
        </div>
      </div>
    );
  }

  // Finished Screen
  if (gameState === GameState.FINISHED) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-800 via-stone-900 to-amber-900 flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl p-8 max-w-2xl text-center">
          <BookOpen className="text-amber-600 mx-auto mb-4" size={64} />
          <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">
            {t('finished.title')}
          </h2>
          <p className="text-stone-700 text-lg mb-6">
            {t('finished.message')}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleRetry}
              className="px-6 py-3 bg-amber-600 text-white rounded-full font-bold hover:bg-amber-700 transition-colors"
            >
              {t('finished.newJourney')}
            </button>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-stone-600 text-white rounded-full font-bold hover:bg-stone-700 transition-colors"
            >
              {t('finished.exit')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Playing State - Main Game View
  if (gameState === GameState.PLAYING && routeData) {
    const currentStop = routeData.stops[currentStepIndex];
    const isLastStop = currentStepIndex === routeData.stops.length - 1;

    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-800 via-stone-900 to-amber-900 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-amber-100 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-bold">{t('game.back')}</span>
            </button>
            <h2 className="text-2xl font-serif font-bold text-amber-50">
              {isChineseMode ? routeData.titleZh : routeData.title}
            </h2>
            <div className="text-amber-100 font-bold">
              {currentStepIndex + 1} / {routeData.stops.length}
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Map Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-amber-400/30">
              <div className="aspect-[4/3]">
                <MapVisualizer stops={routeData.stops} currentStepIndex={currentStepIndex} />
              </div>
            </div>

            {/* Narrative Section */}
            <div className="bg-white rounded-xl p-6 space-y-4">
              <div>
                <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2">
                  {isChineseMode ? currentStop.nameZh : currentStop.name}
                </h3>
                <p className="text-stone-700 leading-relaxed">
                  {isChineseMode ? currentStop.descriptionZh : currentStop.description}
                </p>
              </div>

              <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-600">
                <h4 className="font-bold text-amber-900 mb-2">
                  {t('game.theologicalInsight')}
                </h4>
                <p className="text-stone-700 text-sm leading-relaxed">
                  {isChineseMode ? currentStop.theologyZh : currentStop.theology}
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleContinueJourney}
                  className="w-full px-6 py-3 bg-amber-600 text-white rounded-full font-bold hover:bg-amber-700 transition-colors shadow-lg"
                >
                  {isLastStop ? t('game.finishJourney') : t('game.continueJourney')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz State
  if (gameState === GameState.QUIZ && currentQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-800 via-stone-900 to-amber-900">
        <QuizModal
          quiz={currentQuiz}
          onCorrect={handleQuizCorrect}
          onIncorrect={handleQuizIncorrect}
        />
      </div>
    );
  }

  return null;
};

export default GuidedJourneyGame;
