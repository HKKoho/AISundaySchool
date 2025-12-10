export interface QuizOption {
  text: string;
  isCorrect: boolean;
}

export type QuizType = 'MULTIPLE_CHOICE' | 'TRUE_FALSE';

export interface QuizQuestion {
  question: string;
  type: QuizType;
  options: string[];
  correctAnswerIndex: number;
}

export interface AnalysisResult {
  title: string;
  mainFocus: string;
  relevantIdeas: string[];
  newConcepts: string[];
  criticism: string;
  examples: string[];
  quiz: QuizQuestion[];
}

export enum AppStatus {
  IDLE = 'IDLE',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}

export interface AnalysisError {
  message: string;
}