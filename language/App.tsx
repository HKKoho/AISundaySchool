
import React, { useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from './components/LanguageSelector';
import { AlphabetLearning } from './components/AlphabetLearning';
import { WordCard } from './components/WordCard';
import { RecordButton } from './components/RecordButton';
import { FeedbackDisplay } from './components/FeedbackDisplay';
import { VerseSelector } from './components/VerseSelector';
import { VerseDisplay } from './components/VerseDisplay';
import VocabularyPractice from '../components/language/VocabularyPractice';
import ListeningGame from '../components/language/ListeningGame';
import PronunciationChallenge from '../components/language/PronunciationChallenge';
import SentencePractice from './components/SentencePractice';
import { TranslationPractice } from './components/TranslationPractice';
import { RightMeanings } from './components/RightMeanings';
import { WORD_LISTS } from './constants';
import { getPronunciationFeedback } from './services/multiProviderLanguageService';
import type { Language, Word, GameState, LearningMode } from './types';
import type { BibleVerse } from './bibleVerses';

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result !== 'string') {
        return reject(new Error('File could not be read as a string.'));
      }
      const base64String = reader.result;
      const base64Data = base64String.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export default function App() {
  const { t } = useTranslation('language');
  const [learningMode, setLearningMode] = useState<LearningMode | null>(null);
  const [gameState, setGameState] = useState<GameState>('selecting');
  const [language, setLanguage] = useState<Language | null>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [selectedVerse, setSelectedVerse] = useState<BibleVerse | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const [isPlayingRecording, setIsPlayingRecording] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const currentWords = language ? WORD_LISTS[language] : [];
  const currentWord = currentWords[currentWordIndex];

  const handleSelectLanguage = (lang: Language) => {
    setLanguage(lang);
    setCurrentWordIndex(0);
    setFeedback(null);
    setError(null);
    setGameState('ready');
  };

  const handleSelectMode = (mode: LearningMode, lang: Language) => {
    setLearningMode(mode);
    setLanguage(lang);
    setCurrentWordIndex(0);
    setFeedback(null);
    setError(null);
    if (mode === 'word-practice') {
      setGameState('ready');
    }
  };

  const handleSelectVerse = (verse: BibleVerse) => {
    setSelectedVerse(verse);
  };

  const handleBackFromVerse = () => {
    setSelectedVerse(null);
  };

  const handleBackToModeSelection = () => {
    setLearningMode(null);
    setLanguage(null);
    setSelectedVerse(null);
    setGameState('selecting');
  };

  const handleMicPermission = () => {
    setError(null);
    setGameState('ready');
  }

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
    }
  }, []);

  const startRecording = useCallback(async () => {
    if (!currentWord || !language) return;

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setFeedback(null);
        setGameState('recording');
        
        const recorder = new MediaRecorder(stream);
        mediaRecorderRef.current = recorder;
        audioChunksRef.current = [];

        recorder.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
        };

        recorder.onstop = async () => {
            setGameState('processing');
            const audioBlob = new Blob(audioChunksRef.current, { type: recorder.mimeType });

            // Create URL for playback
            const audioUrl = URL.createObjectURL(audioBlob);
            setRecordedAudio(audioUrl);

            try {
              const base64Audio = await blobToBase64(audioBlob);
              const result = await getPronunciationFeedback(currentWord, language, base64Audio, recorder.mimeType);
              setFeedback(result);
            } catch (apiError) {
              console.error(apiError);
              setError(t('errors.noFeedback'));
              setGameState('error');
            } finally {
               setGameState('feedback');
            }
            stream.getTracks().forEach(track => track.stop()); // Release microphone
        };

        recorder.start();
    } catch (err) {
        console.error('Error accessing microphone:', err);
        setError(t('errors.micPermission'));
        setGameState('error');
    }
  }, [currentWord, language]);

  const handleRecordClick = () => {
    if (gameState === 'recording') {
      stopRecording();
    } else {
      startRecording();
    }
  };
  
  const handleNextWord = () => {
    setFeedback(null);
    setError(null);
    setRecordedAudio(null);
    setCurrentWordIndex((prevIndex) => (prevIndex + 1) % currentWords.length);
    setGameState('ready');
  };

  const handlePreviousWord = () => {
    setFeedback(null);
    setError(null);
    setRecordedAudio(null);
    setCurrentWordIndex((prevIndex) => (prevIndex - 1 + currentWords.length) % currentWords.length);
    setGameState('ready');
  };

  const playRecordedAudio = () => {
    if (!recordedAudio) return;
    const audio = new Audio(recordedAudio);
    setIsPlayingRecording(true);
    audio.onended = () => setIsPlayingRecording(false);
    audio.play();
  };

  const playOriginalPronunciation = () => {
    if (!currentWord || !('speechSynthesis' in window)) return;

    const utterance = new SpeechSynthesisUtterance(currentWord.transliteration);
    if (language === 'Hebrew') {
      utterance.lang = 'he-IL';
    } else if (language === 'Greek') {
      utterance.lang = 'el-GR';
    }
    utterance.rate = 0.8;
    utterance.pitch = 1.0;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const resetGame = () => {
    setGameState('selecting');
    setLanguage(null);
    setCurrentWordIndex(0);
    setFeedback(null);
    setError(null);
  }

  return (
    <main className="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen font-sans">
      <div className="w-full max-w-5xl flex flex-col items-center">
        {/* Powered by indicator */}
        <div className="absolute top-4 right-4 text-xs text-stone-500 dark:text-stone-400 flex items-center gap-2">
          <span>{t('aiPowered')}</span>
          <span className="font-semibold text-blue-600 dark:text-blue-400">{t('multiAI')}</span>
        </div>
        {/* Mode selection screen */}
        {!learningMode && gameState === 'selecting' && (
          <LanguageSelector onSelectMode={handleSelectMode} onSelect={handleSelectLanguage} />
        )}

        {/* Alphabet Learning Mode */}
        {learningMode === 'alphabet-learning' && language && (
          <AlphabetLearning language={language} onBack={handleBackToModeSelection} />
        )}

        {/* Verse Learning Mode */}
        {learningMode === 'verse-learning' && language && !selectedVerse && (
          <VerseSelector
            language={language}
            onSelectVerse={handleSelectVerse}
            onBack={handleBackToModeSelection}
          />
        )}

        {learningMode === 'verse-learning' && selectedVerse && (
          <VerseDisplay verse={selectedVerse} onBack={handleBackFromVerse} />
        )}

        {/* Vocabulary Flashcards Mode */}
        {learningMode === 'vocabulary-flashcards' && (
          <VocabularyPractice />
        )}

        {/* Listening Game Mode */}
        {learningMode === 'listening-game' && language && (
          <ListeningGame
            language={language === 'Hebrew' ? 'Hebrew' : 'Greek'}
            onBack={handleBackToModeSelection}
          />
        )}

        {/* Pronunciation Challenge Mode */}
        {learningMode === 'pronunciation-challenge' && language && (
          <PronunciationChallenge
            language={language === 'Hebrew' ? 'Hebrew' : 'Greek'}
            onBack={handleBackToModeSelection}
          />
        )}

        {/* Sentence Practice Mode */}
        {learningMode === 'sentence-practice' && language && (
          <SentencePractice
            language={language}
            onBack={handleBackToModeSelection}
          />
        )}

        {/* Translation Practice Mode */}
        {learningMode === 'translation-practice' && language && (
          <TranslationPractice
            language={language}
            onBack={handleBackToModeSelection}
          />
        )}

        {/* Right Meanings Mode */}
        {learningMode === 'right-meanings' && language && (
          <RightMeanings
            language={language}
            onBack={handleBackToModeSelection}
          />
        )}

        {/* Word Practice Mode */}
        {learningMode === 'word-practice' && gameState !== 'selecting' && (
          <>
            <button onClick={handleBackToModeSelection} className="absolute top-4 left-4 text-sm text-stone-500 hover:text-sky-600 transition-colors">
                &larr; {t('buttons.switchMode')}
            </button>

            {language && currentWord && (
              <div className="flex flex-col items-center w-full">
                {/* Word Counter */}
                <div className="mb-4 text-center">
                  <p className="text-lg font-semibold text-stone-700 dark:text-stone-300">
                    {t('wordCount', { current: currentWordIndex + 1, total: currentWords.length })}
                  </p>
                  <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                    <span className={language === 'Hebrew' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-purple-600 dark:text-purple-400 font-bold'}>
                      {language === 'Hebrew' ? t('language.hebrew') : t('language.greek')}
                    </span>
                  </p>
                </div>

                <WordCard wordData={currentWord} language={language} />

                {error && (
                  <div className="w-full max-w-2xl mt-8 bg-red-100 dark:bg-red-900/50 border border-red-300 dark:border-red-700 rounded-xl p-6 text-center animate-fade-in">
                    <p className="text-red-800 dark:text-red-200">{error}</p>
                    { gameState === 'error' && error === t('errors.micPermission') && (
                         <button onClick={handleMicPermission} className="mt-4 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors">
                            {t('buttons.retry')}
                        </button>
                    )}
                  </div>
                )}

                <FeedbackDisplay feedback={feedback} />

                {/* Navigation Buttons - Always Visible */}
                <div className="mt-8 flex items-center gap-4">
                  <button
                    onClick={handlePreviousWord}
                    className="px-6 py-3 bg-stone-600 text-white rounded-full font-bold shadow-md hover:bg-stone-700 transition-all transform hover:scale-105"
                  >
                    &larr; {t('buttons.previous')}
                  </button>
                  <button
                    onClick={handleNextWord}
                    className="px-6 py-3 bg-sky-600 text-white rounded-full font-bold shadow-md hover:bg-sky-700 transition-all transform hover:scale-105"
                  >
                    {t('buttons.next')} &rarr;
                  </button>
                </div>

                {/* Optional Pronunciation Practice */}
                <div className="mt-8 flex flex-col items-center gap-4 w-full max-w-2xl">
                  <p className="text-sm text-stone-600 dark:text-stone-400">
                    {t('pronunciationPractice')}
                  </p>

                  {/* Recording indicator */}
                  {gameState === 'recording' && (
                    <div className="flex items-center gap-2 animate-pulse">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                      <span className="text-red-600 font-semibold">{t('recording')}</span>
                    </div>
                  )}

                  <RecordButton gameState={gameState} onClick={handleRecordClick} />

                  {/* Playback Comparison - Show after recording */}
                  {recordedAudio && (
                    <div className="mt-4 w-full bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border-2 border-purple-200">
                      <h4 className="text-lg font-bold text-purple-900 mb-4 text-center">
                        🎧 {t('compareAudio')}
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Your Recording */}
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <p className="text-sm font-semibold text-purple-700 mb-2">{t('yourRecording')}</p>
                          <button
                            onClick={playRecordedAudio}
                            disabled={isPlayingRecording}
                            className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-purple-400 transition-all flex items-center justify-center gap-2"
                          >
                            <span className="text-xl">{isPlayingRecording ? '⏸️' : '▶️'}</span>
                            <span>{t('playYourAudio')}</span>
                          </button>
                        </div>

                        {/* Original Pronunciation */}
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <p className="text-sm font-semibold text-blue-700 mb-2">{t('originalPronunciation')}</p>
                          <button
                            onClick={playOriginalPronunciation}
                            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                          >
                            <span className="text-xl">🔊</span>
                            <span>{t('playOriginal')}</span>
                          </button>
                        </div>
                      </div>

                      <div className="mt-4 text-center">
                        <p className="text-xs text-stone-600">
                          {t('compareInstructions')}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
