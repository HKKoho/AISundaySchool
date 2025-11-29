import React, { useState } from 'react';
import { QuestionData } from '../types';
import { CheckCircle, XCircle, ArrowRight, Book } from 'lucide-react';

interface GameScreenProps {
  question: QuestionData;
  image: string;
  score: number;
  streak: number;
  onAnswer: (correct: boolean) => void;
  onNext: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({
  question,
  image,
  score,
  streak,
  onAnswer,
  onNext
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const handleSelect = (option: string) => {
    if (isRevealed) return;
    
    setSelectedOption(option);
    setIsRevealed(true);
    
    const isCorrect = option === question.correctAnswer;
    onAnswer(isCorrect);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row fade-in">
      {/* Left Panel: Image and Visuals */}
      <div className="w-full md:w-1/2 bg-bible-dark relative overflow-hidden flex flex-col items-center justify-center p-4 md:p-8">
        <div className="absolute top-4 left-4 flex gap-4 z-10">
          <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-medium border border-white/10">
            Score: {score}
          </div>
          <div className="bg-bible-gold/80 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-medium">
            Streak: {streak} 🔥
          </div>
        </div>

        <div className="relative w-full max-w-md aspect-square rounded-xl overflow-hidden shadow-2xl border-4 border-white/10">
          <img 
            src={image} 
            alt={question.subject}
            className="w-full h-full object-cover"
          />
          {/* Overlay gradient for text readability if needed, though we put text below now */}
        </div>

        <div className="mt-6 text-center max-w-lg">
          <p className="text-bible-gold font-serif text-lg tracking-wider uppercase mb-2 text-sm">
            Subject
          </p>
          <h2 className="text-3xl font-bold text-white mb-2">{question.subject}</h2>
        </div>
      </div>

      {/* Right Panel: Verse and Interactions */}
      <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center bg-bible-paper overflow-y-auto">
        <div className="max-w-md mx-auto w-full">
          
          <div className="mb-8">
            <h3 className="flex items-center gap-2 text-bible-accent font-bold uppercase tracking-wide text-xs mb-4">
              <Book className="w-4 h-4" /> Scripture Reference
            </h3>
            <blockquote className="relative p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <span className="absolute top-4 left-4 text-6xl text-gray-100 font-serif -z-10">“</span>
              <p className="text-xl md:text-2xl text-gray-800 font-serif leading-relaxed italic relative z-10">
                {question.verseText}
              </p>
            </blockquote>
          </div>

          <div className="space-y-4 mb-8">
            <p className="text-center text-gray-500 font-medium mb-2">
              Which chapter contains this verse?
            </p>
            <div className="grid grid-cols-1 gap-3">
              {question.options.map((option, idx) => {
                const isSelected = selectedOption === option;
                const isCorrect = option === question.correctAnswer;
                
                let btnClass = "relative w-full p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center justify-between group ";
                
                if (isRevealed) {
                  if (isCorrect) {
                    btnClass += "bg-green-50 border-green-500 text-green-700";
                  } else if (isSelected && !isCorrect) {
                    btnClass += "bg-red-50 border-red-500 text-red-700";
                  } else {
                    btnClass += "bg-gray-50 border-gray-100 text-gray-400 opacity-50";
                  }
                } else {
                  btnClass += "bg-white border-gray-200 hover:border-bible-gold hover:bg-orange-50 text-gray-700 hover:shadow-md";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(option)}
                    disabled={isRevealed}
                    className={btnClass}
                  >
                    <span className="font-semibold text-lg">{option}</span>
                    {isRevealed && isCorrect && <CheckCircle className="w-6 h-6 text-green-500" />}
                    {isRevealed && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-red-500" />}
                  </button>
                );
              })}
            </div>
          </div>

          {isRevealed && (
            <div className="animate-bounce-in flex justify-center">
              <button
                onClick={onNext}
                className="bg-bible-dark hover:bg-black text-white px-8 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 transition-transform hover:scale-105"
              >
                Next Round <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameScreen;