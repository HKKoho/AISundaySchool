import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { CheckCircle2, XCircle, RefreshCcw, HelpCircle } from 'lucide-react';

interface QuizProps {
  questions: QuizQuestion[];
  onReset: () => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onReset }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (qIndex: number, optIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qIndex]: optIndex }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswerIndex) score++;
    });
    return score;
  };

  const allAnswered = Object.keys(selectedAnswers).length === questions.length;

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-indigo-600" /> 
          Knowledge Check
        </h2>
        {isSubmitted && (
          <div className="text-lg font-semibold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg">
            Score: {calculateScore()} / {questions.length}
          </div>
        )}
      </div>

      <div className="space-y-6">
        {questions.map((q, qIdx) => (
          <div key={qIdx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-start gap-3 mb-4">
               <span className="bg-slate-100 text-slate-500 text-xs font-bold px-2 py-1 rounded">
                {q.type === 'TRUE_FALSE' ? 'T/F' : 'MCQ'}
               </span>
               <h3 className="text-lg font-medium text-slate-800">
                {qIdx + 1}. {q.question}
              </h3>
            </div>
            
            <div className={`grid gap-3 ${q.type === 'TRUE_FALSE' ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {q.options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[qIdx] === optIdx;
                const isCorrect = q.correctAnswerIndex === optIdx;
                
                let buttonStyle = "border-slate-200 hover:bg-slate-50 text-slate-600";
                let icon = null;

                if (isSubmitted) {
                  if (isCorrect) {
                    buttonStyle = "bg-green-50 border-green-500 text-green-700 font-medium";
                    icon = <CheckCircle2 className="w-5 h-5 text-green-600 ml-auto" />;
                  } else if (isSelected && !isCorrect) {
                    buttonStyle = "bg-red-50 border-red-500 text-red-700";
                    icon = <XCircle className="w-5 h-5 text-red-600 ml-auto" />;
                  } else {
                    buttonStyle = "opacity-50 border-slate-200";
                  }
                } else if (isSelected) {
                  buttonStyle = "bg-indigo-50 border-indigo-500 text-indigo-700 font-medium ring-1 ring-indigo-500";
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelect(qIdx, optIdx)}
                    disabled={isSubmitted}
                    className={`w-full text-left p-4 rounded-lg border transition-all flex items-center ${buttonStyle}`}
                  >
                    <span>{opt}</span>
                    {icon}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row gap-4 justify-end">
        {!isSubmitted ? (
          <button
            onClick={() => setIsSubmitted(true)}
            disabled={!allAnswered}
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-indigo-200"
          >
            Submit Quiz
          </button>
        ) : (
          <button
            onClick={onReset}
            className="px-6 py-3 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCcw className="w-4 h-4" />
            Analyze Another Video
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;