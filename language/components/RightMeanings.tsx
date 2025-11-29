import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader2, CheckCircle, XCircle, BookOpen } from 'lucide-react';
import { Language } from '../types';
import { getVocabularyByLanguage, type VocabularyCard } from '../vocabularyData';
import { generateRightMeaningsQuestion } from '../services/rightMeaningsService';

interface RightMeaningsProps {
  language: Language;
  onBack: () => void;
}

interface RightMeaningsQuestion {
  word: VocabularyCard;
  sentence: string;
  reference: string;
  correctMeaning: string;
  options: string[];
}

type QuestionState = 'loading' | 'answering' | 'answered' | 'error';

export const RightMeanings: React.FC<RightMeaningsProps> = ({ language, onBack }) => {
  const { t } = useTranslation('language');
  const [questionState, setQuestionState] = useState<QuestionState>('loading');
  const [currentQuestion, setCurrentQuestion] = useState<RightMeaningsQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const loadNewQuestion = async () => {
    setQuestionState('loading');
    setSelectedAnswer(null);
    setIsCorrect(null);

    try {
      // Get vocabulary for the selected language
      const vocabulary = getVocabularyByLanguage(language);

      if (vocabulary.length === 0) {
        setQuestionState('error');
        return;
      }

      // Pick a random word (prefer words with multiple meanings)
      const wordsWithMultipleMeanings = vocabulary.filter(w => w.meanings.length > 1);
      const wordPool = wordsWithMultipleMeanings.length > 0 ? wordsWithMultipleMeanings : vocabulary;
      const randomWord = wordPool[Math.floor(Math.random() * wordPool.length)];

      // Generate question using AI
      const question = await generateRightMeaningsQuestion(randomWord, language);

      setCurrentQuestion(question);
      setQuestionState('answering');
    } catch (error) {
      console.error('Error generating question:', error);
      setQuestionState('error');
    }
  };

  useEffect(() => {
    loadNewQuestion();
  }, [language]);

  const handleAnswerSelect = (answer: string) => {
    if (questionState === 'answered') return;

    setSelectedAnswer(answer);
    const correct = answer === currentQuestion?.correctMeaning;
    setIsCorrect(correct);
    setQuestionState('answered');
    setQuestionsAnswered(prev => prev + 1);

    if (correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    loadNewQuestion();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onBack}
            className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
          >
            &larr; {t('buttons.back')}
          </button>
          <h1 className="text-3xl font-bold text-gray-800">
            {t('rightMeanings.title')} - {language === 'Hebrew' ? t('language.hebrew') : t('language.greek')}
          </h1>
          <div className="w-20"></div>
        </div>

        {/* Score Display */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex justify-between items-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">{score}</div>
            <div className="text-sm text-gray-600">{t('rightMeanings.score')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-700">{questionsAnswered}</div>
            <div className="text-sm text-gray-600">{t('rightMeanings.questionsAnswered')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {questionsAnswered > 0 ? Math.round((score / questionsAnswered) * 100) : 0}%
            </div>
            <div className="text-sm text-gray-600">{t('vocabulary.accuracy')}</div>
          </div>
        </div>

        {/* Loading State */}
        {questionState === 'loading' && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-indigo-600" />
            <p className="text-gray-600">{t('rightMeanings.generating')}</p>
          </div>
        )}

        {/* Error State */}
        {questionState === 'error' && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <XCircle className="w-12 h-12 mx-auto mb-4 text-red-600" />
            <p className="text-gray-600 mb-4">{t('rightMeanings.error')}</p>
            <button
              onClick={loadNewQuestion}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors"
            >
              {t('rightMeanings.tryAgain')}
            </button>
          </div>
        )}

        {/* Question Display */}
        {(questionState === 'answering' || questionState === 'answered') && currentQuestion && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Instruction */}
            <div className="mb-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
              <p className="text-sm text-indigo-900 text-center">
                💡 {t('rightMeanings.allMeaningsValid')}
              </p>
            </div>

            {/* Bible Reference */}
            <div className="mb-4 flex items-center justify-center gap-2">
              <BookOpen className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-semibold text-gray-600">
                {t('rightMeanings.bibleReference')}: {currentQuestion.reference}
              </span>
            </div>

            {/* Sentence in Original Language */}
            <div className="mb-6">
              <div
                className={`text-3xl font-bold p-6 bg-gradient-to-r ${
                  language === 'Hebrew'
                    ? 'from-blue-50 to-blue-100'
                    : 'from-purple-50 to-purple-100'
                } rounded-xl text-center text-gray-700`}
                dir={language === 'Hebrew' ? 'rtl' : 'ltr'}
              >
                {currentQuestion.sentence}
              </div>
            </div>

            {/* Target Word */}
            <div className="mb-6 text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {t('rightMeanings.selectCorrectMeaning')}:
              </h3>
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl font-bold text-gray-700">{currentQuestion.word.word}</span>
                <span className="text-lg text-gray-500 italic">({currentQuestion.word.transliteration})</span>
              </div>
            </div>

            {/* Answer Options */}
            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === option;
                const isCorrectAnswer = option === currentQuestion.correctMeaning;
                const showResult = questionState === 'answered';

                let buttonClass = 'w-full p-4 text-left rounded-xl border-2 transition-all font-medium ';

                if (showResult) {
                  if (isCorrectAnswer) {
                    buttonClass += 'bg-green-50 border-green-500 text-green-800';
                  } else if (isSelected && !isCorrectAnswer) {
                    buttonClass += 'bg-red-50 border-red-500 text-red-800';
                  } else {
                    buttonClass += 'border-gray-200 text-gray-600';
                  }
                } else {
                  buttonClass += isSelected
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-800'
                    : 'border-gray-300 hover:border-indigo-400 hover:bg-indigo-50 text-gray-700';
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={questionState === 'answered'}
                    className={buttonClass}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showResult && isCorrectAnswer && (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      )}
                      {showResult && isSelected && !isCorrectAnswer && (
                        <XCircle className="w-6 h-6 text-red-600" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Feedback */}
            {questionState === 'answered' && (
              <div className={`p-4 rounded-xl mb-6 ${
                isCorrect
                  ? 'bg-green-50 border-2 border-green-400'
                  : 'bg-red-50 border-2 border-red-400'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {isCorrect ? (
                    <>
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <span className="font-bold text-green-800 text-lg">
                        {t('rightMeanings.correct')}
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-6 h-6 text-red-600" />
                      <span className="font-bold text-red-800 text-lg">
                        {t('rightMeanings.incorrect')}
                      </span>
                    </>
                  )}
                </div>
                {!isCorrect && (
                  <p className="text-gray-700">
                    {t('rightMeanings.theCorrectMeaning')}: <span className="font-bold">{currentQuestion.correctMeaning}</span>
                  </p>
                )}
              </div>
            )}

            {/* Next Button */}
            {questionState === 'answered' && (
              <button
                onClick={handleNextQuestion}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-bold rounded-lg shadow-lg transition-all transform hover:scale-105"
              >
                {t('rightMeanings.nextQuestion')} →
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
