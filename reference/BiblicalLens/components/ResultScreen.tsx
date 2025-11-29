import React from 'react';
import { Trophy, Clock, Award, RotateCcw, BookOpen } from 'lucide-react';
import { BiblicalTriple } from '../types';

interface ResultScreenProps {
  timeInSeconds: number;
  score: number;
  triples: BiblicalTriple[];
  onRestart: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ timeInSeconds, score, triples, onRestart }) => {
  const getPerformanceMessage = () => {
    if (score >= 150) return { text: "Excellent!", color: "text-yellow-500", emoji: "🌟" };
    if (score >= 100) return { text: "Great Job!", color: "text-green-500", emoji: "✨" };
    if (score >= 50) return { text: "Well Done!", color: "text-blue-500", emoji: "👍" };
    return { text: "Good Try!", color: "text-purple-500", emoji: "💪" };
  };

  const performance = getPerformanceMessage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-bible-dark to-slate-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center fade-in">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-bible-gold rounded-full mb-4 animate-bounce">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-bible-dark mb-2">
            Game Complete!
          </h1>
          <p className={`text-3xl font-bold ${performance.color} mb-2`}>
            {performance.emoji} {performance.text}
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {/* Score */}
          <div className="bg-gradient-to-r from-bible-gold to-yellow-500 rounded-xl p-6 text-white">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Award className="w-6 h-6" />
              <span className="text-lg font-semibold uppercase tracking-wide">Final Score</span>
            </div>
            <div className="text-5xl font-bold">
              {score}
            </div>
            <div className="text-sm opacity-90 mt-1">
              out of 200 points
            </div>
          </div>

          {/* Time */}
          <div className="bg-bible-dark rounded-xl p-6 text-white">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Clock className="w-6 h-6" />
              <span className="text-lg font-semibold uppercase tracking-wide">Completion Time</span>
            </div>
            <div className="text-4xl font-bold">
              {timeInSeconds}s
            </div>
            <div className="text-sm opacity-90 mt-1">
              {Math.floor(timeInSeconds / 60)}m {timeInSeconds % 60}s
            </div>
          </div>
        </div>

        {/* Restart Button */}
        <button
          onClick={onRestart}
          className="w-full bg-bible-accent hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-3"
        >
          <RotateCcw className="w-5 h-5" />
          Play Again
        </button>

        {/* Stats Summary */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-gray-600 text-sm">
            You matched all 5 Biblical triples!
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Score Formula: max(0, 200 - seconds)
          </p>
        </div>
      </div>

      {/* Bible Verses Section */}
      <div className="mt-8 bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-8">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-6 h-6 text-bible-gold" />
          <h2 className="text-2xl font-bold text-bible-dark">Biblical References</h2>
        </div>

        <div className="space-y-6">
          {triples.map((triple) => (
            <div key={triple.id} className="border-l-4 border-bible-gold pl-4 py-2">
              <div className="flex items-start gap-3 mb-2">
                <img
                  src={triple.imageBase64}
                  alt={triple.objectName}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div>
                  <h3 className="font-bold text-lg text-bible-dark">{triple.objectName}</h3>
                  <p className="text-bible-accent font-semibold text-sm">{triple.chapterReference}</p>
                </div>
              </div>
              <blockquote className="text-gray-700 italic leading-relaxed mt-2">
                "{triple.verseText}"
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
