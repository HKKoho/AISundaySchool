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

export interface YouTubeAnalysisResult {
  title: string;
  mainFocus: string;
  keyTeachings: string[];
  biblicalReferences: string[];
  practicalApplications: string;
  theologicalInsights: string[];
  quiz: QuizQuestion[];
}

export enum YouTubeStatus {
  IDLE = 'IDLE',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}

export interface YouTubeAnalysisError {
  message: string;
}
