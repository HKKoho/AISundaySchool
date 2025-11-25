import React, { useState, useEffect, useRef, useCallback } from 'react';
import { generateMaze, MAZE_SIZE } from './services/mazeGenerator';
import { generateDungeonView } from './services/geminiService';
import { drawLocalMapForAI, drawFullMap, generateRaycastView } from './services/mapRenderer';
import { GameState, Direction, Position, MazeGrid } from './types';
import { GameScreen } from './components/GameScreen';
import { Controls } from './components/Controls';
import { QuestionModal } from './components/QuestionModal';
import { QUESTIONS } from './data/questions';
import { X } from 'lucide-react';

const INITIAL_STATE: GameState = {
  maze: [],
  playerPos: { x: 1, y: 1 },
  playerDir: Direction.EAST,
  status: 'start',
  peeksLeft: 3,
  message: "Welcome to the Dungeon. Find the red portal.",
  startTime: 0,
  activeQuestion: null,
  visitedJunctions: []
};

export default function App() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [aiImage, setAiImage] = useState<string | null>(null);
  const [simpleImage, setSimpleImage] = useState<string>(''); // For Real-time Raycaster
  const [isLoading, setIsLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const mapCanvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize Game
  const startGame = useCallback(() => {
    const { grid, start, exit } = generateMaze(MAZE_SIZE);
    
    // Ensure start isn't wall
    if (grid[start.y][start.x].type === 'wall') {
        grid[start.y][start.x].type = 'path';
    }

    const newState: GameState = {
      ...INITIAL_STATE,
      maze: grid,
      playerPos: start,
      status: 'playing',
      startTime: Date.now(),
      visitedJunctions: [`${start.x},${start.y}`]
    };
    setGameState(newState);
    setElapsedTime(0);
    setAiImage(null);
    // Initial Render
    setSimpleImage(generateRaycastView(newState));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    startGame();
  }, [startGame]);

  // Timer Effect
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    
    if (gameState.status === 'playing') {
      intervalId = setInterval(() => {
        setElapsedTime(Date.now() - gameState.startTime);
      }, 100);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [gameState.status, gameState.startTime]);

  // Effect to draw map when modal is open
  useEffect(() => {
    if (showMap && mapCanvasRef.current && gameState.maze.length > 0) {
      drawFullMap(mapCanvasRef.current, gameState);
    }
  }, [showMap, gameState]);

  // Handle Manual AI Visualization
  const handleVisualize = async () => {
    setIsLoading(true);
    try {
      const mapImageBase64 = drawLocalMapForAI(gameState);
      const result = await generateDungeonView(mapImageBase64);
      if (result.imageUrl) {
        setAiImage(result.imageUrl);
      }
    } catch (error) {
      console.error("Failed to generate AI view", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getOpenNeighbors = (maze: MazeGrid, x: number, y: number): number => {
    let count = 0;
    const dirs = [[0, -1], [0, 1], [-1, 0], [1, 0]];
    dirs.forEach(([dx, dy]) => {
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && nx < maze[0].length && ny >= 0 && ny < maze.length) {
             if (maze[ny][nx].type !== 'wall') count++;
        }
    });
    return count;
  };

  const checkJunction = (maze: MazeGrid, x: number, y: number, visited: string[]) => {
    const neighbors = getOpenNeighbors(maze, x, y);
    const key = `${x},${y}`;
    if (neighbors > 2 && !visited.includes(key)) {
        return true;
    }
    return false;
  };

  const handleMove = async (forward: boolean) => {
    if (gameState.status !== 'playing') return; // Removed isLoading check to allow fluid movement

    const { playerPos, playerDir, maze, visitedJunctions } = gameState;
    let dx = 0;
    let dy = 0;

    switch (playerDir) {
      case Direction.NORTH: dy = -1; break;
      case Direction.EAST:  dx = 1; break;
      case Direction.SOUTH: dy = 1; break;
      case Direction.WEST:  dx = -1; break;
    }

    if (!forward) {
      dx = -dx;
      dy = -dy;
    }

    const newX = playerPos.x + dx;
    const newY = playerPos.y + dy;

    if (newX < 0 || newX >= MAZE_SIZE || newY < 0 || newY >= MAZE_SIZE) return;
    
    const targetCell = maze[newY][newX];
    if (targetCell.type === 'wall') return;

    // Clear AI image on move to show immediate raycast feedback
    setAiImage(null);

    // Check for Win
    if (targetCell.type === 'exit') {
        const endTime = Date.now();
        const finalState = {
          ...gameState,
          playerPos: { x: newX, y: newY },
          status: 'won' as const,
          endTime
        };
        setGameState(finalState);
        setSimpleImage(generateRaycastView(finalState));
        setElapsedTime(endTime - gameState.startTime);
        return;
    }

    // Check for Junction Question
    let newStatus = gameState.status;
    let activeQuestion = null;
    let newVisitedJunctions = [...visitedJunctions];

    if (checkJunction(maze, newX, newY, visitedJunctions)) {
        newStatus = 'question';
        activeQuestion = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
        newVisitedJunctions.push(`${newX},${newY}`);
    }

    const newState = {
      ...gameState,
      playerPos: { x: newX, y: newY },
      status: newStatus,
      activeQuestion,
      visitedJunctions: newVisitedJunctions
    };

    setGameState(newState);
    setSimpleImage(generateRaycastView(newState));
  };

  const handleTurn = async (left: boolean) => {
    if (gameState.status !== 'playing') return;

    let newDir = gameState.playerDir + (left ? -1 : 1);
    if (newDir < 0) newDir = 3;
    if (newDir > 3) newDir = 0;

    const newState = {
      ...gameState,
      playerDir: newDir as Direction
    };

    // Clear AI image on turn
    setAiImage(null);
    setGameState(newState);
    setSimpleImage(generateRaycastView(newState));
  };

  const handleQuestionAnswer = (correct: boolean) => {
    setGameState(prev => ({
        ...prev,
        status: 'playing',
        activeQuestion: null,
        peeksLeft: correct ? prev.peeksLeft + 1 : prev.peeksLeft
    }));
  };

  const toggleMap = () => {
    if (showMap) {
        setShowMap(false);
    } else if (gameState.peeksLeft > 0) {
        setGameState(prev => ({ ...prev, peeksLeft: prev.peeksLeft - 1 }));
        setShowMap(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <header className="mb-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-200 mb-2 tracking-tighter">
            LABYRINTH <span className="text-blue-500">AI</span>
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-lg mx-auto">
            Real-time Raycaster & AI Enhancement. 
            <br/>Find the <span className="text-red-400 font-bold">Red Portal</span>.
        </p>
      </header>

      <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-6 items-center lg:items-start justify-center">
        
        {/* Main Viewport */}
        <div className="w-full max-w-2xl flex-shrink-0">
          <GameScreen 
            imageUrl={aiImage}
            simpleImageUrl={simpleImage} 
            isLoading={isLoading} 
            status={gameState.status === 'question' ? 'playing' : gameState.status} 
            elapsedTime={elapsedTime}
          />
        </div>

        {/* Controls Side Panel */}
        <div className="w-full lg:w-auto flex flex-col items-center">
             <Controls 
                onMoveForward={() => handleMove(true)}
                onMoveBackward={() => handleMove(false)}
                onTurnLeft={() => handleTurn(true)}
                onTurnRight={() => handleTurn(false)}
                onPeek={toggleMap}
                onVisualize={handleVisualize}
                peeksLeft={gameState.peeksLeft}
                disabled={gameState.status !== 'playing' && gameState.status !== 'won'}
                onReset={startGame}
             />
             
             {/* Mini Info */}
             <div className="mt-4 p-4 bg-slate-900/50 rounded-lg border border-slate-800 text-xs text-slate-500 max-w-xs text-center">
                <p>Use "Realism" to generate a photorealistic view of your current location with Gemini.</p>
             </div>
        </div>
      </div>

      {/* Map Modal */}
      {showMap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 p-2 rounded-xl shadow-2xl relative max-w-full max-h-full">
            <button 
                onClick={() => setShowMap(false)}
                className="absolute -top-4 -right-4 bg-red-600 text-white p-2 rounded-full hover:bg-red-500 shadow-lg"
            >
                <X className="w-6 h-6" />
            </button>
            <h3 className="text-center text-slate-300 font-bold mb-2">Tactical Map</h3>
            <canvas 
                ref={mapCanvasRef} 
                width={300} 
                height={300} 
                className="rounded-lg bg-slate-800 max-w-[80vw] max-h-[70vh]"
            />
             <p className="text-center text-slate-500 text-xs mt-2">
                Blue Arrow: You | Red: Exit
            </p>
          </div>
        </div>
      )}

      {/* Question Modal */}
      {gameState.status === 'question' && gameState.activeQuestion && (
        <QuestionModal 
            question={gameState.activeQuestion} 
            onAnswer={handleQuestionAnswer}
        />
      )}
    </div>
  );
}