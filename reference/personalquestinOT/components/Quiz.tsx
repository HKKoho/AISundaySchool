
import React, { useState } from 'react';
import type { Question, Answer } from '../types';
import ProgressBar from './ProgressBar';

interface QuizProps {
  questions: Question[];
  onComplete: (answers: Answer[]) => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const handleAnswerSelect = (optionText: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.text,
      answerText: optionText,
    };
    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete(updatedAnswers);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-8 bg-gray-800/50 rounded-2xl shadow-2xl border border-gray-700 backdrop-blur-sm">
      <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
      <div className="mt-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-amber-200 mb-6 text-center">{currentQuestion.text}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleAnswerSelect(option.text)}
              className="p-5 text-left bg-gray-800 rounded-lg border-2 border-gray-700 hover:border-amber-400 hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transform hover:-translate-y-1"
            >
              <p className="text-gray-200">{option.text}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
