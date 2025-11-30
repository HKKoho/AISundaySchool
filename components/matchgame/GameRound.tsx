import React from 'react';
import { Round, MatchItem, UserSelections, RoundResult } from './types';
import { SpeakButton } from '../shared/SpeakButton';

const LABELS = ['A', 'B', 'C', 'D'];

interface GameRoundProps {
  roundData: Round;
  shuffledRightSide: MatchItem[];
  userSelections: UserSelections;
  onSelectChange: (rightSideId: string, selection: string) => void;
  roundResult: RoundResult;
  onSubmit: () => void;
  onNextRound: () => void;
  onFinishGame: () => void;
  isLastRound: boolean;
  explanation: string;
  isGeneratingExplanation: boolean;
  language: 'en' | 'zh-TW';
  uiText: {
    submit: string;
    correctMessage: string;
    incorrectMessage: string;
    nextRound: string;
    finishGame: string;
    select: string;
    generatingExplanation: string;
  };
}

const CheckIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const XIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const GameRound: React.FC<GameRoundProps> = ({
  roundData,
  shuffledRightSide,
  userSelections,
  onSelectChange,
  roundResult,
  onSubmit,
  onNextRound,
  onFinishGame,
  isLastRound,
  explanation,
  isGeneratingExplanation,
  language,
  uiText
}) => {
  const getBorderColor = (item: MatchItem) => {
    if (roundResult === RoundResult.UNANSWERED) return 'border-slate-300 dark:border-slate-600';
    return userSelections[item.id] === item.correctMatch 
      ? 'border-green-500' 
      : 'border-red-500';
  };

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-semibold text-center mb-6 text-slate-700 dark:text-slate-300">
        {roundData.category}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Left Side */}
        <div className="space-y-4">
          {roundData.leftSide.map((item, index) => (
            <div key={item.id} className="flex items-center bg-slate-100 dark:bg-slate-700 p-4 rounded-lg shadow">
              <span className="flex-shrink-0 h-8 w-8 rounded-full bg-sky-500 text-white font-bold flex items-center justify-center mr-4">
                {LABELS[index]}
              </span>
              <p className="text-slate-800 dark:text-slate-200">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Right Side */}
        <div className="space-y-4">
          {shuffledRightSide.map((item) => (
            <div key={item.id} className={`flex items-center bg-white dark:bg-slate-800 p-3 rounded-lg border-2 transition-colors ${getBorderColor(item)}`}>
              <select
                value={userSelections[item.id] || ''}
                onChange={(e) => onSelectChange(item.id, e.target.value)}
                disabled={roundResult !== RoundResult.UNANSWERED}
                className="w-24 mr-3 p-2 border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 disabled:opacity-70 disabled:cursor-not-allowed"
                aria-label={`Select match for: ${item.text}`}
              >
                <option value="" disabled>{uiText.select}</option>
                {LABELS.map((label) => (
                  <option key={label} value={label}>{label}</option>
                ))}
              </select>
              <p className="flex-1 text-slate-800 dark:text-slate-200">{item.text}</p>
               {roundResult !== RoundResult.UNANSWERED && (
                  userSelections[item.id] === item.correctMatch ? 
                  <CheckIcon className="h-6 w-6 text-green-500 ml-2" /> :
                  <XIcon className="h-6 w-6 text-red-500 ml-2" />
               )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8 text-center">
        {roundResult === RoundResult.UNANSWERED ? (
          <button
            onClick={onSubmit}
            className="w-full md:w-auto px-8 py-3 bg-sky-600 text-white font-bold rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-800 transition-transform transform hover:scale-105"
          >
            {uiText.submit}
          </button>
        ) : (
          <div className="flex flex-col items-center">
             <div className="mb-4">
                {roundResult === RoundResult.CORRECT ? (
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{uiText.correctMessage}</p>
                ) : (
                   <>
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">{uiText.incorrectMessage}</p>
                    <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg text-left w-full max-w-2xl">
                        {isGeneratingExplanation && <p className="text-slate-600 dark:text-slate-300 animate-pulse">{uiText.generatingExplanation}</p>}
                        {explanation && (
                          <div>
                            <p className="text-slate-700 dark:text-slate-200 whitespace-pre-wrap mb-3">{explanation}</p>
                            <SpeakButton
                              text={explanation}
                              language={language}
                              variant="button"
                            />
                          </div>
                        )}
                    </div>
                   </>
                )}
            </div>
            <button
              onClick={isLastRound ? onFinishGame : onNextRound}
              className="w-full md:w-auto px-8 py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-800 transition-transform transform hover:scale-105"
            >
              {isLastRound ? uiText.finishGame : uiText.nextRound}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameRound;