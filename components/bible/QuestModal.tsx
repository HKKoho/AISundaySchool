import React, { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { Quest } from '../../types';
import { useGame } from '../../hooks/useGame';
import { useTranslatedQuest } from '../../hooks/useTranslatedQuest';
import DeepDiveContent from './DeepDiveModal';
import Icon from './Icon';

interface QuestModalProps {
  quest: Quest;
  onClose: () => void;
}

const QUEST_TIMER_SECONDS = 60;
const LOCAL_STORAGE_KEY = 'jttw_quest_timers';

const QuestModal: React.FC<QuestModalProps> = ({ quest: originalQuest, onClose }) => {
  const { t, i18n } = useTranslation('bibleGame');
  const quest = useTranslatedQuest(originalQuest);
  const { completeQuest, completedQuests } = useGame();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isDeepDiveOpen, setIsDeepDiveOpen] = useState(false);

  const [timeLeft, setTimeLeft] = useState<number>(QUEST_TIMER_SECONDS);
  const [isTimeUp, setIsTimeUp] = useState(false);

  // Ref for the answer section to scroll to it
  const answerSectionRef = React.useRef<HTMLDivElement>(null);

  const isCorrect = selectedAnswer === quest.correctAnswerIndex;
  const isAlreadyCompleted = completedQuests.has(quest.id);

  // Scroll to answer section when it appears
  useEffect(() => {
    if ((isAnswered || isAlreadyCompleted) && answerSectionRef.current) {
      // Small delay to ensure the animation starts
      setTimeout(() => {
        answerSectionRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }, 100);
    }
  }, [isAnswered, isAlreadyCompleted]);

  const clearTimerFromStorage = useCallback(() => {
    try {
      const timersStr = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!timersStr) return;
      const timers = JSON.parse(timersStr);
      if (timers[quest.id]) {
        delete timers[quest.id];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(timers));
      }
    } catch (e) {
      console.error("Failed to update timers in localStorage", e);
    }
  }, [quest.id]);

  useEffect(() => {
    if (isTimeUp) {
      clearTimerFromStorage();
    }
  }, [isTimeUp, clearTimerFromStorage]);

  useEffect(() => {
    if (isAlreadyCompleted || isAnswered) {
      return;
    }

    const getTimers = (): Record<string, number> => {
      try {
        const timers = localStorage.getItem(LOCAL_STORAGE_KEY);
        return timers ? JSON.parse(timers) : {};
      } catch (e) {
        return {};
      }
    };

    const setTimers = (timers: Record<string, number>) => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(timers));
    };

    const timers = getTimers();
    let deadline = timers[quest.id];

    if (!deadline) {
      deadline = Date.now() + QUEST_TIMER_SECONDS * 1000;
      timers[quest.id] = deadline;
      setTimers(timers);
    }

    const updateTimer = () => {
      const remainingMs = deadline - Date.now();
      if (remainingMs <= 0) {
        setTimeLeft(0);
        setIsTimeUp(true);
        setIsAnswered(true);
      } else {
        setTimeLeft(Math.ceil(remainingMs / 1000));
      }
    };

    updateTimer();

    const intervalId = setInterval(updateTimer, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [quest.id, isAlreadyCompleted, isAnswered]);

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);
    if (index === quest.correctAnswerIndex && !isAlreadyCompleted) {
      completeQuest(quest.id, {
        id: quest.id,
        title: quest.journalPrompt.title,
        content: quest.journalPrompt.content
      });
    }
    clearTimerFromStorage();
  };
  
  const handleClose = useCallback(() => {
    clearTimerFromStorage();
    onClose();
  }, [onClose, clearTimerFromStorage]);

  const getButtonClass = useCallback((index: number) => {
    if (!isAnswered) {
      return 'bg-stone-700 hover:bg-stone-600';
    }
    if (index === quest.correctAnswerIndex) {
      return 'bg-green-700'; // Increased contrast
    }
    if (index === selectedAnswer && !isCorrect) {
      return 'bg-red-700'; // Increased contrast
    }
    return 'bg-stone-700 opacity-70'; // Changed from stone-800 for consistency
  }, [isAnswered, selectedAnswer, isCorrect, quest.correctAnswerIndex]);


  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-40 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby={isDeepDiveOpen ? "deepdive-title" : "quest-title"}
    >
      <div 
        className="bg-cover bg-center rounded-lg shadow-2xl w-full max-w-3xl border-4 border-amber-900 text-stone-900 p-8 relative flex flex-col max-h-[90vh]"
        style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/old-paper.png')"}}
      >
        <button onClick={handleClose} className="absolute top-4 right-4 text-stone-600 hover:text-stone-900 transition-colors rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500 focus-visible:ring-offset-amber-100 z-10" aria-label={t('questModal.closeQuest')}>
          <Icon name="x" className="w-8 h-8"/>
        </button>
        
        {isDeepDiveOpen ? (
          <div className="animate-fade-in overflow-y-auto">
            <DeepDiveContent
              deepDive={quest.deepDive}
              quest={quest}
              onBack={() => setIsDeepDiveOpen(false)}
            />
          </div>
        ) : (
          <div className="animate-fade-in overflow-y-auto">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                  <img src={quest.characterImage} alt={quest.character} className="w-24 h-24 rounded-full border-4 border-amber-800 object-cover"/>
                  <div>
                    <p className="text-lg text-stone-800">{t('questModal.messageFrom')}</p>
                    <h2 id="quest-title" className="text-4xl font-bold text-amber-900">{quest.character}</h2>
                  </div>
              </div>
              {!isAlreadyCompleted && !isAnswered && (
                  <div className="text-lg font-bold text-amber-800 bg-amber-200 border-2 border-amber-400 rounded-full px-4 py-1 flex-shrink-0">
                      {t('questModal.timer', { seconds: timeLeft })}
                  </div>
              )}
            </div>

            <div className="bg-stone-800/95 p-4 rounded-lg mb-6 border-l-4 border-amber-500 shadow-inner">
              <p className="text-xl font-semibold text-amber-50 leading-relaxed">{quest.question}</p>
            </div>

            <div className="space-y-3 mb-6">
              {quest.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-lg text-white font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white ${getButtonClass(index)} ${isAnswered ? '' : 'cursor-pointer'}`}
                >
                  {option}
                </button>
              ))}
            </div>

            {(isAnswered || isAlreadyCompleted) && (
              <div ref={answerSectionRef} className="p-4 rounded-lg bg-amber-100 border border-amber-300 animate-slide-up">
                <h3 className="font-bold text-lg text-amber-900 flex items-center gap-2">
                  {isTimeUp ? (
                      <><Icon name="x" className="w-6 h-6"/>{t('questModal.timeUp')}</>
                  ) : isCorrect || isAlreadyCompleted ? (
                      <><Icon name="check" className="w-6 h-6"/>{t('questModal.correct')}</>
                  ) : (
                      <><Icon name="x" className="w-6 h-6"/>{t('questModal.incorrect')}</>
                  )}
                </h3>
                <p className="mt-2 text-stone-900">
                  {isTimeUp
                      ? t('questModal.timeUpMessage')
                      : quest.explanation}
                </p>

                <div className="mt-4 flex flex-wrap gap-4">
                  <button onClick={handleClose} className="flex-1 bg-amber-800 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500 focus-visible:ring-offset-amber-100">
                    {t('questModal.continueJourney')}
                  </button>
                  {(isCorrect || isAlreadyCompleted) && (
                      <button onClick={() => setIsDeepDiveOpen(true)} className="flex-1 bg-transparent border-2 border-amber-800 hover:bg-amber-100 text-amber-900 font-bold py-2 px-4 rounded-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500 focus-visible:ring-offset-amber-100">
                          {t('questModal.deepDive')}
                      </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestModal;