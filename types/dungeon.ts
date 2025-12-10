export type CellType = 'wall' | 'path' | 'start' | 'exit';

export interface Position {
  x: number;
  y: number;
}

export enum Direction {
  NORTH = 0,
  EAST = 1,
  SOUTH = 2,
  WEST = 3,
}

export interface Cell {
  x: number;
  y: number;
  type: CellType;
  visited: boolean;
}

export type MazeGrid = Cell[][];

export type QuestionDifficulty = 'Preliminary' | 'Competent';

export interface DungeonQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  bibleReference: string;
  difficulty: QuestionDifficulty;
}

export interface GameState {
  maze: MazeGrid;
  playerPos: Position;
  playerDir: Direction;
  status: 'start' | 'playing' | 'won' | 'lost' | 'question';
  peeksLeft: number;
  message: string;
  startTime: number;
  endTime?: number;
  activeQuestion: DungeonQuestion | null;
  visitedJunctions: string[]; // Format "x,y"
}

export interface ViewGenerationResult {
  imageUrl: string;
  narrative?: string;
}
