import React, { useState } from 'react';
import { DungeonQuestion } from '../../types/dungeon';
import { BookOpen, CheckCircle, XCircle } from 'lucide-react';

interface QuestionModalProps {
  question: DungeonQuestion;
  onAnswer: (correct: boolean) => void;
}

export const QuestionModal: React.FC<QuestionModalProps> = ({ question, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleOptionClick = (index: number) => {
    if (hasSubmitted) return;
    setSelectedOption(index);
    setHasSubmitted(true);

    const isCorrect = index === question.correctAnswer;
    
    // Slight delay to show result before closing
    setTimeout(() => {
      onAnswer(isCorrect);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-slate-900 border-2 border-amber-600/50 p-6 rounded-xl shadow-[0_0_50px_rgba(217,119,6,0.2)] max-w-lg w-full relative overflow-hidden">
        
        {/* Decorative header */}
        <div className="flex items-center gap-3 mb-6 border-b border-slate-700 pb-4">
          <div className="p-2 bg-amber-900/30 rounded-lg">
             <BookOpen className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <h3 className="text-amber-500 font-bold uppercase tracking-widest text-sm">Divine Encounter</h3>
            <p className="text-slate-400 text-xs">Junction Reached - Wisdom Required</p>
          </div>
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-6 leading-relaxed">
          {question.question}
        </h2>

        <div className="space-y-3">
          {question.options.map((option, index) => {
            let btnClass = "w-full p-4 rounded-lg border text-left transition-all duration-300 flex justify-between items-center group ";
            
            if (hasSubmitted) {
              if (index === question.correctAnswer) {
                btnClass += "bg-green-900/50 border-green-500 text-green-100";
              } else if (index === selectedOption) {
                btnClass += "bg-red-900/50 border-red-500 text-red-100";
              } else {
                btnClass += "bg-slate-800/50 border-slate-700 text-slate-500 opacity-50";
              }
            } else {
              btnClass += "bg-slate-800 hover:bg-slate-700 border-slate-700 hover:border-amber-500/50 text-slate-200 hover:pl-5";
            }

            return (
              <button
                key={index}
                onClick={() => handleOptionClick(index)}
                disabled={hasSubmitted}
                className={btnClass}
              >
                <span className="font-mono">{option}</span>
                {hasSubmitted && index === question.correctAnswer && <CheckCircle className="w-5 h-5 text-green-400" />}
                {hasSubmitted && index === selectedOption && index !== question.correctAnswer && <XCircle className="w-5 h-5 text-red-400" />}
              </button>
            );
          })}
        </div>

        {hasSubmitted && (
          <div className="mt-4 text-center animate-in slide-in-from-bottom-2">
            <p className="text-slate-400 text-xs italic">Reference: {question.bibleReference}</p>
          </div>
        )}

      </div>
    </div>
  );
};