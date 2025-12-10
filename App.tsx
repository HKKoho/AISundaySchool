import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Home } from 'lucide-react';
import { LandingPage } from './components/LandingPage';
import { BibleGame } from './components/BibleGame';
import { TheologyAssistant } from './components/TheologyAssistant';
import { BiblicalLanguage } from './components/BiblicalLanguage';
import { BibleStudy } from './components/BibleStudy';
import { YouTubeLearning } from './components/YouTubeLearning';
import { AppState } from './types';
import LanguageSwitcher from './components/LanguageSwitcher';
import './config/i18n';

const App: React.FC = () => {
  const { t } = useTranslation(['common', 'theologyAssistant']);
  const [appState, setAppState] = useState<AppState>(AppState.LANDING);

  const handleBackToLanding = () => {
    setAppState(AppState.LANDING);
  };

  const handleNavigateFromLanding = (destination: 'bible-game' | 'theology-search' | 'biblical-language' | 'version-comparison' | 'youtube-learning') => {
    switch (destination) {
      case 'bible-game':
        setAppState(AppState.BIBLE);
        break;
      case 'theology-search':
        setAppState(AppState.THEOLOGY_SEARCH);
        break;
      case 'biblical-language':
        setAppState(AppState.BIBLICAL_LANGUAGE);
        break;
      case 'version-comparison':
        setAppState(AppState.VERSION_COMPARISON);
        break;
      case 'youtube-learning':
        setAppState(AppState.YOUTUBE_LEARNING);
        break;
    }
  }

  const renderContent = () => {
    switch (appState) {
      case AppState.LANDING:
        return <LandingPage onNavigate={handleNavigateFromLanding} />;
      case AppState.BIBLE:
        return <BibleGame onBack={handleBackToLanding} />;
      case AppState.THEOLOGY_SEARCH:
        return <TheologyAssistant onBack={handleBackToLanding} />;
      case AppState.BIBLICAL_LANGUAGE:
        return <BiblicalLanguage onBack={handleBackToLanding} />;
      case AppState.VERSION_COMPARISON:
        return (
          <div className="w-full max-w-7xl mx-auto h-full flex flex-col">
            <button
              onClick={handleBackToLanding}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-4"
            >
              <span>←</span> {t('theologyAssistant:backButton', 'Back to Home')}
            </button>
            <BibleStudy />
          </div>
        );
      case AppState.YOUTUBE_LEARNING:
        return <YouTubeLearning onBack={handleBackToLanding} />;
      default:
        return <LandingPage onNavigate={handleNavigateFromLanding} />;
    }
  };

  return (
    <div
      className={`min-h-screen text-gray-100 flex flex-col ${
        appState === AppState.LANDING
          ? 'bg-cover bg-center bg-no-repeat'
          : 'bg-gray-900'
      }`}
      style={
        appState === AppState.LANDING
          ? {
              backgroundImage: 'url(/sunday-school.png)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              backgroundBlendMode: 'darken'
            }
          : undefined
      }
    >
      {/* Top Navigation Bar */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4">
        {/* Platform Home Button - Left Side - Only show on landing page */}
        {appState === AppState.LANDING ? (
          <a
            href="https://christianplatform.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-lg"
          >
            <Home className="w-5 h-5" />
            <span className="font-semibold">{t('common:platformHome', 'Platform Home')}</span>
          </a>
        ) : (
          <div />
        )}

        {/* Language Switcher - Right Side - Hide in Bible Game (has its own) */}
        {appState !== AppState.BIBLE && <LanguageSwitcher />}
      </div>

      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;