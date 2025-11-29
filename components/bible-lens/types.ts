// A Biblical Triple: image, object name, Bible chapter, and verse
export interface BiblicalTriple {
  id: number; // Unique ID for this triple (0-4)
  objectName: string; // e.g., "Fig Tree"
  objectNameZh: string; // Traditional Chinese name
  chapterReference: string; // e.g., "Mark 11"
  chapterReferenceZh: string; // Traditional Chinese reference
  verseText: string; // The actual Bible verse mentioning this object
  verseTextZh: string; // Traditional Chinese verse
  imageBase64: string; // Base64 encoded image or URL
}

// Types of card elements in the grid
export type CardType = 'IMAGE' | 'NAME' | 'CHAPTER' | 'HINT';

// A card in the 4x4 grid
export interface GridCard {
  id: string; // Unique card ID
  tripleId: number; // Which triple this belongs to (0-4, -1 for hint)
  type: CardType;
  content: string; // Image base64, text name, or chapter reference
  contentZh?: string; // Traditional Chinese content for NAME and CHAPTER
  isFlipped: boolean;
  isMatched: boolean;
  position: number; // 0-15 position in grid
}

export interface GameState {
  status: 'START' | 'LOADING' | 'PLAYING' | 'RESULT' | 'ERROR';
  score: number;
  triples: BiblicalTriple[]; // 5 triples
  gridCards: GridCard[]; // 16 cards in 4x4 grid
  flippedCards: string[]; // IDs of currently flipped cards (max 3 for triple matching)
  matchedTriples: number[]; // IDs of matched triples
  errorMessage?: string;
  startTime?: number;
  endTime?: number;
}

export type Category = 'Plants' | 'Animals' | 'Food' | 'Places';
