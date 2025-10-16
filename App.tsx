import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { BibleGame } from './components/BibleGame';
import { TheologyAssistant } from './components/TheologyAssistant';
import { BiblicalLanguage } from './components/BiblicalLanguage';
import { AppState } from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LANDING);

  const handleBackToLanding = () => {
    setAppState(AppState.LANDING);
  };

  const handleNavigateFromLanding = (destination: 'bible-game' | 'theology-search' | 'biblical-language') => {
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
      default:
        return <LandingPage onNavigate={handleNavigateFromLanding} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;