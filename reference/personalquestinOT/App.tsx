
import React, { useState, useCallback, useEffect } from 'react';
import Quiz from './components/Quiz';
import ResultCard from './components/ResultCard';
import LanguageSwitcher from './components/LanguageSwitcher';
import { generateArchetype, generateImage } from './services/geminiService';
import { translations } from './translations';
import { useLanguage } from './contexts';
import type { Answer, ArchetypeResult } from './types';
import { ScrollIcon } from './components/icons';

const App: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [result, setResult] = useState<ArchetypeResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    document.title = t.startTitle;
  }, [t.startTitle]);

  const handleQuizComplete = useCallback(async (finalAnswers: Answer[]) => {
    setAnswers(finalAnswers);
    setIsQuizCompleted(true);
    setIsLoading(true);
    setError(null);
    try {
      const generatedResult = await generateArchetype(finalAnswers, language);
      setResult(generatedResult);
      setIsLoading(false); // Text is loaded, now load image

      setIsImageLoading(true);
      try {
        const imageUrl = await generateImage(generatedResult.archetype, generatedResult.character, generatedResult.description);
        setResult(prevResult => prevResult ? { ...prevResult, imageUrl } : null);
      } catch (imageErr) {
        console.error("Image generation failed, continuing without image.", imageErr);
        // Non-critical error, so we don't show a blocking message to the user
      } finally {
        setIsImageLoading(false);
      }

    } catch (err) {
      console.error(err);
      setError(t.errorText);
      setIsLoading(false);
    }
  }, [language, t.errorText]);

  const restartQuiz = () => {
    setAnswers([]);
    setIsQuizCompleted(false);
    setResult(null);
    setIsLoading(false);
    setIsImageLoading(false);
    setError(null);
    setIsStarted(false);
  };

  const renderContent = () => {
    if (!isStarted) {
      return (
        <div className="text-center flex flex-col items-center max-w-2xl mx-auto p-4">
          <ScrollIcon className="w-24 h-24 text-amber-300 mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold text-amber-200 mb-4">{t.startTitle}</h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            {t.startSubtitle}
          </p>
          <button
            onClick={() => setIsStarted(true)}
            className="bg-amber-500 text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-amber-400 transition-all duration-300 text-lg shadow-lg shadow-amber-500/20 transform hover:scale-105"
          >
            {t.startButton}
          </button>
        </div>
      );
    }

    if (!isQuizCompleted) {
      return <Quiz questions={t.quizQuestions} onComplete={handleQuizComplete} />;
    }

    if (isLoading) {
      return (
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-400 mx-auto mb-4"></div>
          <h2 className="text-3xl font-semibold text-amber-200">{t.loadingTitle}</h2>
          <p className="text-gray-400 mt-2">{t.loadingSubtitle}</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center text-red-400 bg-red-900/30 p-8 rounded-lg max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">{t.errorTitle}</h2>
          <p className="mb-6">{error}</p>
          <button
            onClick={restartQuiz}
            className="bg-amber-500 text-gray-900 font-bold py-2 px-6 rounded-full hover:bg-amber-400 transition-colors"
          >
            {t.tryAgainButton}
          </button>
        </div>
      );
    }

    if (result) {
      return <ResultCard result={result} onRestart={restartQuiz} isImageLoading={isImageLoading} />;
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 selection:bg-amber-500 selection:text-gray-900">
      <header className="absolute top-0 right-0 p-4 z-10">
        <LanguageSwitcher />
      </header>
      <main className="w-full">
        {renderContent()}
      </main>
      <footer className="text-center text-gray-500 text-sm mt-12 pb-4">
        <p>{t.footerText}</p>
      </footer>
    </div>
  );
};

export default App;