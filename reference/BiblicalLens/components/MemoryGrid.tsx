import React, { useState, useEffect } from 'react';
import { GridCard, BiblicalTriple } from '../types';
import { Book, HelpCircle } from 'lucide-react';

interface MemoryGridProps {
  triples: BiblicalTriple[];
  onComplete: (timeInSeconds: number) => void;
}

const MemoryGrid: React.FC<MemoryGridProps> = ({ triples, onComplete }) => {
  const [cards, setCards] = useState<GridCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matchedTriples, setMatchedTriples] = useState<number[]>([]);
  const [startTime] = useState<number>(Date.now());
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  // Initialize the grid
  useEffect(() => {
    const gridCards: GridCard[] = [];

    // Add hint card at position 0 (top-left)
    gridCards.push({
      id: 'hint',
      tripleId: -1,
      type: 'HINT',
      content: 'Match the Triple',
      isFlipped: true,
      isMatched: false,
      position: 0
    });

    // Create cards for each triple
    triples.forEach((triple) => {
      gridCards.push({
        id: `${triple.id}-image`,
        tripleId: triple.id,
        type: 'IMAGE',
        content: triple.imageBase64,
        isFlipped: false,
        isMatched: false,
        position: 0
      });

      gridCards.push({
        id: `${triple.id}-name`,
        tripleId: triple.id,
        type: 'NAME',
        content: triple.objectName,
        isFlipped: false,
        isMatched: false,
        position: 0
      });

      gridCards.push({
        id: `${triple.id}-chapter`,
        tripleId: triple.id,
        type: 'CHAPTER',
        content: triple.chapterReference,
        isFlipped: false,
        isMatched: false,
        position: 0
      });
    });

    // Shuffle the non-hint cards
    const cardsToShuffle = gridCards.slice(1);
    for (let i = cardsToShuffle.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardsToShuffle[i], cardsToShuffle[j]] = [cardsToShuffle[j], cardsToShuffle[i]];
    }

    // Combine hint card with shuffled cards and assign positions
    const finalCards = [gridCards[0], ...cardsToShuffle].map((card, index) => ({
      ...card,
      position: index
    }));

    setCards(finalCards);
  }, [triples]);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  // Check if game is complete
  useEffect(() => {
    if (matchedTriples.length === 5) {
      onComplete(elapsedTime);
    }
  }, [matchedTriples, elapsedTime, onComplete]);

  const handleCardClick = (card: GridCard) => {
    // Ignore if card is hint, already matched, or already flipped
    if (card.type === 'HINT' || card.isMatched || flippedCards.includes(card.id)) {
      return;
    }

    // Can't flip more than 3 cards
    if (flippedCards.length >= 3) {
      return;
    }

    const newFlippedCards = [...flippedCards, card.id];
    setFlippedCards(newFlippedCards);

    // Flip the card
    setCards(prevCards =>
      prevCards.map(c => c.id === card.id ? { ...c, isFlipped: true } : c)
    );

    // Check for triple match when 3 cards are flipped
    if (newFlippedCards.length === 3) {
      setTimeout(() => {
        checkForMatch(newFlippedCards);
      }, 800);
    }
  };

  const checkForMatch = (flippedCardIds: string[]) => {
    const flippedCardObjects = cards.filter(c => flippedCardIds.includes(c.id));

    // Check if all three cards belong to the same triple
    const tripleIds = flippedCardObjects.map(c => c.tripleId);
    const uniqueTripleIds = new Set(tripleIds);

    // Check if all cards are from the same triple and all three types are present
    if (uniqueTripleIds.size === 1 && tripleIds[0] !== -1) {
      const types = new Set(flippedCardObjects.map(c => c.type));
      if (types.has('IMAGE') && types.has('NAME') && types.has('CHAPTER')) {
        // Match found!
        setMatchedTriples(prev => [...prev, tripleIds[0]]);
        setCards(prevCards =>
          prevCards.map(c =>
            flippedCardIds.includes(c.id) ? { ...c, isMatched: true } : c
          )
        );
        setFlippedCards([]);
        return;
      }
    }

    // No match - flip cards back
    setCards(prevCards =>
      prevCards.map(c =>
        flippedCardIds.includes(c.id) ? { ...c, isFlipped: false } : c
      )
    );
    setFlippedCards([]);
  };

  const calculateScore = () => {
    return Math.max(0, 200 - elapsedTime);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="bg-white px-6 py-3 rounded-full shadow-md border-2 border-bible-gold">
            <span className="text-lg font-bold text-bible-dark">
              Time: {elapsedTime}s
            </span>
          </div>
          <div className="bg-bible-dark px-6 py-3 rounded-full shadow-md">
            <span className="text-lg font-bold text-white">
              Matches: {matchedTriples.length}/5
            </span>
          </div>
          <div className="bg-white px-6 py-3 rounded-full shadow-md border-2 border-bible-accent">
            <span className="text-lg font-bold text-bible-accent">
              Score: {calculateScore()}
            </span>
          </div>
        </div>

        {/* 4x4 Grid */}
        <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-3xl mx-auto">
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              onClick={() => handleCardClick(card)}
            />
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-md max-w-2xl mx-auto">
          <h3 className="flex items-center gap-2 text-bible-dark font-bold text-lg mb-3">
            <HelpCircle className="w-5 h-5" />
            How to Play
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-bible-gold font-bold">1.</span>
              <span>Click cards to flip and reveal their content</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-bible-gold font-bold">2.</span>
              <span>Match 3 cards that form a complete triple: Image, Name, and Bible Chapter</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-bible-gold font-bold">3.</span>
              <span>Complete all 5 triples as fast as possible!</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-bible-gold font-bold">4.</span>
              <span>Score = max(0, 200 - seconds)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

interface CardProps {
  card: GridCard;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ card, onClick }) => {
  const isHint = card.type === 'HINT';
  const isFlipped = card.isFlipped || card.isMatched;

  return (
    <button
      onClick={onClick}
      disabled={isHint || card.isMatched}
      className={`
        aspect-square rounded-xl transition-all duration-300 transform
        ${isHint ? 'bg-bible-gold cursor-default' : 'hover:scale-105 cursor-pointer'}
        ${card.isMatched ? 'opacity-50 ring-4 ring-green-500' : ''}
        ${!isFlipped && !isHint ? 'bg-bible-dark hover:bg-slate-600' : ''}
        ${isFlipped && !isHint ? 'bg-white border-2 border-bible-accent' : ''}
        shadow-lg overflow-hidden relative
      `}
    >
      {isHint ? (
        <div className="h-full flex flex-col items-center justify-center p-2 text-white">
          <Book className="w-8 h-8 mb-2" />
          <span className="text-xs font-bold text-center leading-tight">
            Match the<br/>Triple
          </span>
        </div>
      ) : isFlipped ? (
        <div className="h-full w-full flex items-center justify-center p-1">
          {card.type === 'IMAGE' ? (
            <div className="w-full h-full relative">
              <img
                src={card.content}
                alt="Biblical object"
                className="w-full h-full object-contain rounded"
                onLoad={() => console.log('Image loaded successfully:', card.id)}
                onError={(e) => {
                  console.error('Image failed to load:', card.id, String(card.content).substring(0, 100));
                  e.currentTarget.style.border = '2px solid red';
                }}
                style={{ minHeight: '60px', minWidth: '60px' }}
              />
            </div>
          ) : (
            <span className="text-center font-bold text-sm md:text-base text-bible-dark px-1">
              {card.content}
            </span>
          )}
        </div>
      ) : (
        <div className="h-full flex items-center justify-center">
          <div className="text-6xl text-white/20">?</div>
        </div>
      )}
    </button>
  );
};

export default MemoryGrid;
