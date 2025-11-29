
export enum Language {
  HEBREW = 'Hebrew',
  GREEK = 'Greek',
}

export interface Word {
  word: string;
  transliteration: string;
  meaning: string;
  meaningZh?: string; // Traditional Chinese meaning
}

export type GameState = 'selecting' | 'ready' | 'recording' | 'processing' | 'feedback' | 'error';

export type LearningMode = 'alphabet-learning' | 'word-practice' | 'verse-learning' | 'vocabulary-flashcards' | 'listening-game' | 'pronunciation-challenge' | 'sentence-practice' | 'translation-practice' | 'right-meanings';

export interface BibleSentence {
  original: string;          // Hebrew or Greek text
  transliteration: string;   // Romanized pronunciation guide
  english: string;           // English translation
  reference: string;         // Bible verse reference (e.g., "John 3:16")
  language: Language;
}
