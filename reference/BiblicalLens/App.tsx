import React, { useState, useCallback } from 'react';
import { GameState, BiblicalTriple } from './types';
import { generateGameTriples } from './services/geminiService';
import StartScreen from './components/StartScreen';
import LoadingScreen from './components/LoadingScreen';
import MemoryGrid from './components/MemoryGrid';
import ResultScreen from './components/ResultScreen';
import { RefreshCw } from 'lucide-react';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    status: 'START',
    score: 0,
    triples: [],
    gridCards: [],
    flippedCards: [],
    matchedTriples: [],
  });

  const [completionTime, setCompletionTime] = useState<number>(0);

  const loadNewGame = useCallback(async () => {
    setGameState(prev => ({
      ...prev,
      status: 'LOADING',
      errorMessage: undefined,
    }));

    try {
      // Generate all 5 triples with images
      const triples = await generateGameTriples();

      setGameState(prev => ({
        ...prev,
        status: 'PLAYING',
        triples,
        score: 0,
        gridCards: [],
        flippedCards: [],
        matchedTriples: [],
        startTime: Date.now(),
      }));
    } catch (error) {
      console.error(error);
      setGameState(prev => ({
        ...prev,
        status: 'ERROR',
        errorMessage: "Failed to generate the game. Please check your API key and try again."
      }));
    }
  }, []);

  const handleStart = () => {
    loadNewGame();
  };

  const handleComplete = (timeInSeconds: number) => {
    const finalScore = Math.max(0, 200 - timeInSeconds);
    setCompletionTime(timeInSeconds);
    setGameState(prev => ({
      ...prev,
      status: 'RESULT',
      score: finalScore,
      endTime: Date.now(),
    }));
  };

  const handleRestart = () => {
    setGameState({
      status: 'START',
      score: 0,
      triples: [],
      gridCards: [],
      flippedCards: [],
      matchedTriples: [],
    });
    setCompletionTime(0);
  };

  // Error State View
  if (gameState.status === 'ERROR') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-6">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md">
          <div className="text-red-500 mb-4 flex justify-center">
             <RefreshCw className="w-12 h-12" />
          </div>
          <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{gameState.errorMessage}</p>
          <button
            onClick={() => loadNewGame()}
            className="bg-bible-dark text-white px-6 py-2 rounded-lg hover:bg-slate-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Render based on state
  switch (gameState.status) {
    case 'LOADING':
      return <LoadingScreen />;
    case 'PLAYING':
      return (
        <MemoryGrid
          triples={gameState.triples}
          onComplete={handleComplete}
        />
      );
    case 'RESULT':
      return (
        <ResultScreen
          timeInSeconds={completionTime}
          score={gameState.score}
          triples={gameState.triples}
          onRestart={handleRestart}
        />
      );
    case 'START':
    default:
      return <StartScreen onStart={handleStart} />;
  }
};

export default App;