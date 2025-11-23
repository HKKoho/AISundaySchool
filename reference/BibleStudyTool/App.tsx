
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GeminiAnalyzer } from './components/GeminiAnalyzer';
import { HistoryTracker } from './components/HistoryTracker';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { LanguageProvider } from './contexts/LanguageContext';
import { HistoryItem } from './types';

const AppContent: React.FC = () => {
  const { t } = useTranslation();
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const addHistoryItem = (item: HistoryItem) => {
    setHistory(prev => [item, ...prev.slice(0, 19)]); // Keep last 20 items
  };

  const handleHistoryClick = (item: HistoryItem) => {
    // This could be implemented to re-run the analysis or just display the result.
    // For now, let's just log it.
    console.log('Clicked history item:', item);
  };

  return (
    <>
      <style>{`
        /* Basic Styles */
        :root {
          --primary-color: #4285F4;
          --secondary-color: #34A853;
          --background-color: #f8f9fa;
          --text-color: #202124;
          --card-background: #ffffff;
          --card-border: #dadce0;
          --font-family: 'Roboto', sans-serif;
        }
        body {
          font-family: var(--font-family);
          background-color: var(--background-color);
          color: var(--text-color);
          margin: 0;
          padding: 20px;
        }
        .app-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 992px) {
          .app-container {
            grid-template-columns: 2fr 1fr;
          }
        }
        header {
          grid-column: 1 / -1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--card-border);
        }
        header h1 {
          color: var(--primary-color);
          margin: 0;
        }
        .main-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .sidebar {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .card {
          background-color: var(--card-background);
          border: 1px solid var(--card-border);
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }
        h2 {
          margin-top: 0;
          color: var(--text-color);
        }

        /* Reference Selector */
        .reference-inputs {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 15px;
        }
        .reference-inputs label {
          display: block;
          margin-bottom: 5px;
          font-weight: 500;
        }
        .reference-inputs select, .reference-inputs input {
          width: 100%;
          padding: 8px;
          border-radius: 4px;
          border: 1px solid var(--card-border);
        }
        
        /* Feature Selector */
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 10px;
        }
        .feature-button {
          padding: 12px;
          border: 1px solid var(--card-border);
          background-color: #f1f3f4;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.2s, color 0.2s;
          text-align: center;
          font-weight: 500;
        }
        .feature-button:hover {
          background-color: #e8eaed;
        }
        .feature-button.selected {
          background-color: var(--primary-color);
          color: white;
          border-color: var(--primary-color);
        }

        /* Analyze Button */
        .analyze-button-container {
          text-align: center;
          margin: 20px 0;
        }
        .analyze-button-container button {
          padding: 12px 30px;
          font-size: 16px;
          font-weight: 500;
          background-color: var(--secondary-color);
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .analyze-button-container button:hover {
          background-color: #2e8c45;
        }
        .analyze-button-container button:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }

        /* Result Card */
        .result-card .result-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
        .tts-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: none;
          border: 1px solid var(--card-border);
          border-radius: 4px;
          cursor: pointer;
        }
        .tts-button:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }
        .result-card .sources {
          margin-top: 20px;
          padding-top: 15px;
          border-top: 1px solid var(--card-border);
        }
        .result-card .sources h3 {
          margin-top: 0;
        }
        .result-card .sources ul {
          padding-left: 20px;
          margin: 0;
        }
        
        /* History Tracker */
        .history-tracker ul {
          list-style: none;
          padding: 0;
          margin: 0;
          max-height: 400px;
          overflow-y: auto;
        }
        .history-tracker li {
          padding: 10px;
          border-bottom: 1px solid var(--card-border);
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .history-tracker li:last-child {
          border-bottom: none;
        }
        .history-tracker li:hover {
          background-color: #f1f3f4;
        }
        
        /* Language Switcher */
        .language-switcher select {
            padding: 5px;
            border-radius: 4px;
            border: 1px solid var(--card-border);
        }
        
        /* Error Message */
        .error-message {
          color: #d93025;
          background-color: #fce8e6;
          border: 1px solid #d93025;
          padding: 15px;
          border-radius: 8px;
          margin-top: 20px;
        }
      `}</style>
      <div className="app-container">
        <header>
          <h1>{t('title')}</h1>
          <LanguageSwitcher />
        </header>
        <main className="main-content">
          <GeminiAnalyzer onNewHistoryItem={addHistoryItem} />
        </main>
        <aside className="sidebar">
          <HistoryTracker history={history} onHistoryItemClick={handleHistoryClick} />
        </aside>
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
