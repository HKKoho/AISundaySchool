import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { quests } from '../../data/gameData';
import { useTranslatedQuests } from '../../hooks/useTranslatedQuest';
import type { Quest } from '../../types';

interface QuizModeProps {
  onBack: () => void;
}

const QuizMode: React.FC<QuizModeProps> = ({ onBack }) => {
  const { t } = useTranslation(['bibleGame', 'common']);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedQuestIds, setSelectedQuestIds] = useState<string[]>([]);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showUnderConstruction, setShowUnderConstruction] = useState(false);

  // Get translated quests based on current language
  const translatedQuests = useTranslatedQuests(quests);

  // Select 10 random quest IDs on component mount (only once)
  useEffect(() => {
    const shuffled = [...quests].sort(() => Math.random() - 0.5);
    const questIds = shuffled.slice(0, 10).map(q => q.id);
    setSelectedQuestIds(questIds);
    setUserAnswers(new Array(10).fill(-1));
  }, []);

  // Get quests by ID from translated quests (will update when language changes, but same quest IDs)
  const selectedQuests = useMemo(() => {
    return selectedQuestIds.map(id => translatedQuests.find(q => q.id === id)).filter(Boolean) as Quest[];
  }, [selectedQuestIds, translatedQuests]);

  const currentQuest = selectedQuests[currentQuestionIndex];
  const score = useMemo(() => {
    return userAnswers.filter((answer, index) =>
      answer === selectedQuests[index]?.correctAnswerIndex
    ).length;
  }, [userAnswers, selectedQuests]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showResult) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setUserAnswers(newAnswers);
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < 9) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setGameOver(true);
    }
  };

  const handlePlayAgain = () => {
    const shuffled = [...translatedQuests].sort(() => Math.random() - 0.5);
    const questIds = shuffled.slice(0, 10).map(q => q.id);
    setSelectedQuestIds(questIds);
    setUserAnswers(new Array(10).fill(-1));
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameOver(false);
  };

  if (selectedQuests.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-2xl">{t('common:common.loading')}</div>
      </div>
    );
  }

  if (showUnderConstruction) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-stone-800/90 rounded-2xl p-8 max-w-2xl w-full text-center">
          <div className="text-6xl mb-6">🚧</div>
          <h2 className="text-4xl font-bold text-amber-400 mb-6" style={{fontFamily: "'Trajan Pro', serif"}}>
            {t('bibleGame:underConstruction.title', 'Under Construction')}
          </h2>
          <p className="text-xl text-stone-300 mb-8">
            {t('bibleGame:underConstruction.message', 'This feature is coming soon! We are working hard to bring you deeper Bible study content.')}
          </p>
          <button
            onClick={() => setShowUnderConstruction(false)}
            className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg transition-colors"
          >
            {t('common:buttons.back', 'Back')}
          </button>
        </div>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-stone-800/90 rounded-2xl p-8 max-w-2xl w-full text-center">
          <h2 className="text-4xl font-bold text-amber-400 mb-6" style={{fontFamily: "'Trajan Pro', serif"}}>
            {t('bibleGame:gameOver.title', 'Game Complete!')}
          </h2>
          <div className="text-6xl font-bold text-white mb-8">
            {score} / 10
          </div>
          <p className="text-xl text-stone-300 mb-4">
            {score === 10 ? t('bibleGame:gameOver.perfect', 'Perfect! You have great biblical knowledge!') :
             score >= 8 ? t('bibleGame:gameOver.great', 'Great job! Keep studying!') :
             score >= 5 ? t('bibleGame:gameOver.good', 'Good effort! Continue learning!') :
             t('bibleGame:gameOver.keepTrying', 'Keep trying! Every question helps you learn!')}
          </p>
          {/* Score-based recommendations */}
          <div className="bg-stone-700/50 rounded-lg p-4 mb-6">
            {score >= 8 ? (
              <div className="text-green-300">
                <p className="font-bold mb-2">{t('bibleGame:gameOver.challengeTitle', 'Ready for a Challenge!')}</p>
                <p className="text-sm">{t('bibleGame:gameOver.challengeDesc', 'You have excellent biblical knowledge! We challenge you to dive deeper into each chapter of the Bible for advanced study.')}</p>
              </div>
            ) : (
              <div className="text-amber-300">
                <p className="font-bold mb-2">{t('bibleGame:gameOver.recommendTitle', 'Recommendation')}</p>
                <p className="text-sm">{t('bibleGame:gameOver.recommendDesc', 'We recommend joining a Sunday School class or Bible Study group to strengthen your foundation in Scripture.')}</p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-4 items-center">
            <button
              onClick={() => setShowUnderConstruction(true)}
              className="w-full sm:w-auto px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors"
            >
              {t('bibleGame:gameOver.goDeeper', 'Go Deeper in Bible')}
            </button>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handlePlayAgain}
                className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg transition-colors"
              >
                {t('common:buttons.retry', 'Play Again')}
              </button>
              <button
                onClick={onBack}
                className="px-8 py-3 bg-stone-600 hover:bg-stone-700 text-white font-bold rounded-lg transition-colors"
              >
                {t('common:buttons.back', 'Back')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isCorrect = selectedAnswer === currentQuest.correctAnswerIndex;

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-stone-700 hover:bg-stone-600 text-white rounded-lg transition-colors"
          >
            ← {t('common:buttons.back', 'Back')}
          </button>
          <div className="text-white text-xl font-bold">
            {t('bibleGame:quiz.question', 'Question')} {currentQuestionIndex + 1} / 10
          </div>
          <div className="text-amber-400 text-xl font-bold">
            {t('bibleGame:quiz.score', 'Score')}: {score}
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-stone-800/90 rounded-2xl p-8 shadow-2xl">
          {/* Character */}
          <div className="flex items-center gap-4 mb-6">
            <img
              src={currentQuest.characterImage}
              alt={currentQuest.character}
              className="w-20 h-20 rounded-full border-4 border-amber-600"
            />
            <div>
              <div className="text-amber-400 text-sm font-semibold">
                {currentQuest.category}
              </div>
              <div className="text-white text-2xl font-bold">
                {currentQuest.character}
              </div>
            </div>
          </div>

          {/* Question */}
          <div className="bg-stone-700/50 rounded-lg p-6 mb-6">
            <p className="text-white text-xl leading-relaxed">
              {currentQuest.question}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {currentQuest.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectAnswer = index === currentQuest.correctAnswerIndex;

              let buttonClass = 'w-full text-left p-4 rounded-lg transition-all border-2 ';
              if (showResult) {
                if (isCorrectAnswer) {
                  buttonClass += 'bg-green-600 border-green-500 text-white';
                } else if (isSelected) {
                  buttonClass += 'bg-red-600 border-red-500 text-white';
                } else {
                  buttonClass += 'bg-stone-700 border-stone-600 text-stone-400';
                }
              } else {
                buttonClass += isSelected
                  ? 'bg-amber-600 border-amber-500 text-white'
                  : 'bg-stone-700 border-stone-600 text-white hover:bg-stone-600';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={buttonClass}
                >
                  <span className="font-semibold mr-2">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showResult && (
            <div className={`p-4 rounded-lg mb-6 ${isCorrect ? 'bg-green-900/50' : 'bg-red-900/50'}`}>
              <div className={`text-lg font-bold mb-2 ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>
                {isCorrect ? '✓ ' + t('bibleGame:quiz.correct', 'Correct!') : '✗ ' + t('bibleGame:quiz.incorrect', 'Incorrect')}
              </div>
              <p className="text-stone-200">{currentQuest.explanation}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end">
            {!showResult ? (
              <button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className="px-8 py-3 bg-amber-600 hover:bg-amber-700 disabled:bg-stone-600 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors"
              >
                {t('common:buttons.submit', 'Submit')}
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg transition-colors"
              >
                {currentQuestionIndex < 9 ? t('common:buttons.next', 'Next') : t('bibleGame:quiz.finish', 'Finish')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizMode;
