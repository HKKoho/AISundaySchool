// A Biblical Pair: image and Bible chapter with verse
export interface BiblicalPair {
  id: number; // Unique ID for this pair (0-7)
  objectName: string; // e.g., "Fig Tree"
  objectNameZh: string; // Traditional Chinese name
  chapterReference: string; // e.g., "Mark 11:13"
  chapterReferenceZh: string; // Traditional Chinese reference
  verseText: string; // The actual Bible verse mentioning this object
  verseTextZh: string; // Traditional Chinese verse
  imageBase64: string; // Base64 encoded image or URL
}

// Types of card elements in the grid
export type CardType = 'IMAGE' | 'CHAPTER';

// A card in the 4x4 grid
export interface GridCard {
  id: string; // Unique card ID
  pairId: number; // Which pair this belongs to (0-7)
  type: CardType;
  content: string; // Image base64 or chapter reference
  contentZh?: string; // Traditional Chinese content for CHAPTER
  isFlipped: boolean;
  isMatched: boolean;
  position: number; // 0-15 position in grid
}

export interface GameState {
  status: 'START' | 'LOADING' | 'PLAYING' | 'RESULT' | 'ERROR';
  score: number;
  pairs: BiblicalPair[]; // 8 pairs
  gridCards: GridCard[]; // 16 cards in 4x4 grid
  flippedCards: string[]; // IDs of currently flipped cards (max 2 for pair matching)
  matchedPairs: number[]; // IDs of matched pairs
  errorMessage?: string;
  startTime?: number;
  endTime?: number;
}

export type Category = 'Plants' | 'Animals' | 'Food' | 'Places';
