import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-bible-paper text-bible-dark fade-in">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="bg-bible-gold/20 p-4 rounded-full">
            <BookOpen className="w-12 h-12 text-bible-gold" />
          </div>
        </div>
        
        <h1 className="text-4xl font-serif font-bold mb-4 text-bible-dark">
          Biblical Memory Match
        </h1>

        <p className="text-gray-600 mb-8 leading-relaxed">
          Test your memory and scripture knowledge! Match sets of 3 cards to form complete Biblical triples:
          <br/><br/>
          <strong>Image</strong> + <strong>Object Name</strong> + <strong>Bible Chapter</strong>
          <br/><br/>
          Complete all 5 triples as fast as you can!
        </p>

        <button
          onClick={onStart}
          className="group w-full bg-bible-dark hover:bg-slate-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-3 shadow-lg"
        >
          <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
          Start New Game
        </button>
      </div>
      
      <p className="mt-8 text-xs text-gray-400">
        Powered by Google Gemini 2.0 Flash Exp
      </p>
    </div>
  );
};

export default StartScreen;