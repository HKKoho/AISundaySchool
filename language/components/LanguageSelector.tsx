
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mic, Volume2, Info } from 'lucide-react';
import { Language, LearningMode } from '../types';

interface LanguageSelectorProps {
  onSelect: (language: Language) => void;
  onSelectMode?: (mode: LearningMode, language: Language) => void;
}

const LanguageCard: React.FC<{
  title: string;
  description: string;
  language: Language;
  onSelectMode: (mode: LearningMode, lang: Language) => void;
}> = ({ title, description, language, onSelectMode }) => {
  const { t } = useTranslation('language');

  return (
  <div className="w-full max-w-sm">
    <h2 className="text-2xl font-bold text-sky-800 dark:text-stone-700 mb-4 text-center">{title}</h2>
    <p className="text-stone-600 dark:text-stone-400 mb-4 text-center">{description}</p>
    <div className="flex flex-col gap-3">
      <button
        onClick={() => onSelectMode('alphabet-learning', language)}
        className="p-6 bg-gradient-to-r from-red-300 to-red-400 hover:from-red-400 hover:to-red-500 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
      >
        <div className="text-lg font-bold mb-1 text-stone-700">{t('modes.alphabetLearning')}</div>
        <div className="text-sm opacity-90 text-stone-600">{t('modes.alphabetLearningDesc')}</div>
      </button>
      <button
        onClick={() => onSelectMode('word-practice', language)}
        className="p-6 bg-gradient-to-r from-pink-300 to-pink-400 hover:from-pink-400 hover:to-pink-500 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
      >
        <div className="text-lg font-bold mb-1 text-stone-700">{t('modes.wordPractice')}</div>
        <div className="text-sm opacity-90 text-stone-600">{t('modes.wordPracticeDesc')}</div>
      </button>
      <button
        onClick={() => onSelectMode('verse-learning', language)}
        className="p-6 bg-gradient-to-r from-orange-300 to-orange-400 hover:from-orange-400 hover:to-orange-500 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
      >
        <div className="text-lg font-bold mb-1 text-stone-700">{t('modes.verseLearning')}</div>
        <div className="text-sm opacity-90 text-stone-600">{t('modes.verseLearningDesc')}</div>
      </button>
      <button
        onClick={() => onSelectMode('vocabulary-flashcards', language)}
        className="p-6 bg-gradient-to-r from-amber-300 to-amber-400 hover:from-amber-400 hover:to-amber-500 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
      >
        <div className="text-lg font-bold mb-1 text-stone-700">{t('modes.vocabularyFlashcards')}</div>
        <div className="text-sm opacity-90 text-stone-600">{t('modes.vocabularyFlashcardsDesc')}</div>
      </button>
      <button
        onClick={() => onSelectMode('listening-game', language)}
        className="p-6 bg-gradient-to-r from-green-300 to-green-400 hover:from-green-400 hover:to-green-500 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
      >
        <div className="text-lg font-bold mb-1 text-stone-700">{t('modes.listeningGame')}</div>
        <div className="text-sm opacity-90 text-stone-600">{t('modes.listeningGameDesc')}</div>
      </button>
      <button
        onClick={() => onSelectMode('pronunciation-challenge', language)}
        className="p-6 bg-gradient-to-r from-sky-300 to-sky-400 hover:from-sky-400 hover:to-sky-500 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
      >
        <div className="text-lg font-bold mb-1 text-stone-700">{t('modes.pronunciationChallenge')}</div>
        <div className="text-sm opacity-90 text-stone-600">{t('modes.pronunciationChallengeDesc')}</div>
      </button>
      <button
        onClick={() => onSelectMode('sentence-practice', language)}
        className="p-6 bg-gradient-to-r from-purple-300 to-purple-400 hover:from-purple-400 hover:to-purple-500 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
      >
        <div className="text-lg font-bold mb-1 text-stone-700">{t('modes.sentencePractice')}</div>
        <div className="text-sm opacity-90 text-stone-600">{t('modes.sentencePracticeDesc')}</div>
      </button>
    </div>
  </div>
  );
};

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onSelect, onSelectMode }) => {
  const { t } = useTranslation('language');

  return (
    <div className="flex flex-col items-center justify-center h-full animate-fade-in px-4">
        <h1 className="text-5xl font-extrabold text-white mb-4 text-center">{t('welcome')}</h1>
        <p className="text-xl text-stone-500 dark:text-stone-400 mb-8 text-center">{t('selectLanguagePrompt')}</p>

        {/* Permissions Info */}
        <div className="w-full max-w-2xl mb-8 p-6 bg-sky-50 dark:bg-sky-900/30 border border-sky-200 dark:border-sky-700 rounded-xl">
          <div className="flex items-start gap-3 mb-4">
            <Info className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">{t('permissions.title')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{t('permissions.description')}</p>
            </div>
          </div>

          <div className="space-y-3 ml-8">
            <div className="flex items-start gap-3">
              <Volume2 className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('permissions.speaker')}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{t('permissions.speakerDesc')}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mic className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('permissions.microphone')}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{t('permissions.microphoneDesc')}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              <strong>{t('permissions.tip')}</strong> {t('permissions.tipDesc')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
            <LanguageCard
                title={t('hebrewTitle')}
                description={t('hebrewSubtitle')}
                language={Language.HEBREW}
                onSelectMode={onSelectMode || ((mode, lang) => onSelect(lang))}
            />
            <LanguageCard
                title={t('greekTitle')}
                description={t('greekSubtitle')}
                language={Language.GREEK}
                onSelectMode={onSelectMode || ((mode, lang) => onSelect(lang))}
            />
        </div>
    </div>
  );
};
