import React from 'react';

interface GameOverProps {
  score: number;
  totalRounds: number;
  onPlayAgain: () => void;
  onGenerateRound: () => void;
  onGoDeeper: () => void;
  isGenerating: boolean;
  uiText: {
    gameOver: string;
    finalScore: string;
    playAgain: string;
    generateNewRound: string;
    generating: string;
    challengeTitle: string;
    challengeDesc: string;
    recommendTitle: string;
    recommendDesc: string;
    goDeeper: string;
  };
}

const GameOver: React.FC<GameOverProps> = ({ score, totalRounds, onPlayAgain, onGenerateRound, onGoDeeper, isGenerating, uiText }) => {
  const percentage = totalRounds > 0 ? Math.round((score / totalRounds) * 100) : 0;

  return (
    <div className="text-center py-8">
      <h2 className="text-4xl font-bold text-sky-600 dark:text-sky-400 mb-4">{uiText.gameOver}</h2>
      <p className="text-xl text-slate-600 dark:text-slate-300 mb-2">{uiText.finalScore}</p>
      <p className="text-6xl font-extrabold text-slate-800 dark:text-slate-100 mb-4">
        {score} / {totalRounds} ({percentage}%)
      </p>
      {/* Score-based recommendations */}
      <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4 mb-6 max-w-xl mx-auto">
        {score >= 8 ? (
          <div className="text-green-600 dark:text-green-400">
            <p className="font-bold mb-2">{uiText.challengeTitle}</p>
            <p className="text-sm text-slate-600 dark:text-slate-300">{uiText.challengeDesc}</p>
          </div>
        ) : (
          <div className="text-amber-600 dark:text-amber-400">
            <p className="font-bold mb-2">{uiText.recommendTitle}</p>
            <p className="text-sm text-slate-600 dark:text-slate-300">{uiText.recommendDesc}</p>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={onGoDeeper}
          className="w-full sm:w-auto px-10 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 transition-transform transform hover:scale-105"
        >
          {uiText.goDeeper}
        </button>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={onPlayAgain}
            disabled={isGenerating}
            className="w-full sm:w-auto px-10 py-4 bg-slate-600 text-white font-bold rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-300 dark:focus:ring-slate-800 transition-transform transform hover:scale-105 disabled:opacity-50"
          >
            {uiText.playAgain}
          </button>
           <button
            onClick={onGenerateRound}
            disabled={isGenerating}
            className="w-full sm:w-auto px-10 py-4 bg-sky-600 text-white font-bold rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-800 transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-wait"
          >
            {isGenerating ? uiText.generating : uiText.generateNewRound}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOver;