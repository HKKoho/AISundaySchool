import React, { useState } from 'react';
import { QuizQuestion } from './types';
import { BookOpen, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface QuizModalProps {
  quiz: QuizQuestion;
  onCorrect: () => void;
  onIncorrect: () => void;
}

const QuizModal: React.FC<QuizModalProps> = ({ quiz, onCorrect }) => {
  const { t, i18n } = useTranslation('guidedJourney');
  const isChineseMode = i18n.language === 'zh-TW';

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (selectedOption === quiz.correctAnswerIndex) {
      onCorrect();
    } else {
      // Reset to allow retry
      setIsSubmitted(false);
      setSelectedOption(null);
    }
  };

  const isCorrect = selectedOption === quiz.correctAnswerIndex;
  const question = isChineseMode ? quiz.questionZh : quiz.question;
  const options = isChineseMode ? quiz.optionsZh : quiz.options;
  const explanation = isChineseMode ? quiz.explanationZh : quiz.explanation;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-stone-900 text-amber-50 p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <BookOpen size={80} />
          </div>
          <h3 className="text-xl font-serif font-bold relative z-10">
            {t('quiz.title')}
          </h3>
          <p className="text-stone-300 text-sm mt-1 relative z-10">
            {t('quiz.subtitle')}
          </p>
        </div>

        {/* Question Body */}
        <div className="p-6 overflow-y-auto">
          <p className="text-lg font-medium text-stone-800 mb-6 leading-relaxed">
            {question}
          </p>

          <div className="space-y-3">
            {options.map((option, idx) => {
              let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group ";

              if (isSubmitted) {
                if (idx === quiz.correctAnswerIndex) {
                  btnClass += "bg-green-50 border-green-500 text-green-800";
                } else if (idx === selectedOption) {
                  btnClass += "bg-red-50 border-red-500 text-red-800";
                } else {
                  btnClass += "border-gray-100 text-gray-400 opacity-50";
                }
              } else {
                if (selectedOption === idx) {
                  btnClass += "border-amber-600 bg-amber-50 text-amber-900 shadow-md ring-2 ring-amber-100";
                } else {
                  btnClass += "border-gray-200 hover:border-amber-400 hover:bg-stone-50 text-stone-700";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => !isSubmitted && setSelectedOption(idx)}
                  className={btnClass}
                  disabled={isSubmitted}
                >
                  <span className="font-medium">{option}</span>
                  {isSubmitted && idx === quiz.correctAnswerIndex && <CheckCircle className="text-green-600" size={20} />}
                  {isSubmitted && idx === selectedOption && idx !== quiz.correctAnswerIndex && <XCircle className="text-red-600" size={20} />}
                </button>
              );
            })}
          </div>

          {/* Explanation Area */}
          {isSubmitted && (
            <div className={`mt-6 p-4 rounded-lg border ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <h4 className={`font-bold mb-1 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                {isCorrect ? t('quiz.correct') : t('quiz.incorrect')}
              </h4>
              <p className="text-stone-700 text-sm">
                {explanation}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t flex justify-end">
          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className="px-6 py-2 bg-stone-800 text-white rounded-full font-bold shadow-lg hover:bg-stone-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {t('quiz.submit')}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className={`px-6 py-2 flex items-center gap-2 text-white rounded-full font-bold shadow-lg transition-colors ${isCorrect ? 'bg-amber-600 hover:bg-amber-700' : 'bg-stone-500 hover:bg-stone-600'}`}
            >
              {isCorrect ? <>{t('quiz.continue')} <ArrowRight size={18} /></> : t('quiz.retry')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
