import React, { useState, useEffect } from 'react';
import { GridCard, BiblicalTriple } from './types';
import { Book, HelpCircle, Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface MemoryGridProps {
  triples: BiblicalTriple[];
  onComplete: (timeInSeconds: number) => void;
}

const MemoryGrid: React.FC<MemoryGridProps> = ({ triples, onComplete }) => {
  const { t, i18n } = useTranslation('bibleLens');
  const isChineseMode = i18n.language === 'zh-TW';

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
      contentZh: '配對三張卡',
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
        contentZh: triple.objectNameZh,
        isFlipped: false,
        isMatched: false,
        position: 0
      });

      gridCards.push({
        id: `${triple.id}-chapter`,
        tripleId: triple.id,
        type: 'CHAPTER',
        content: triple.chapterReference,
        contentZh: triple.chapterReferenceZh,
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

  const getCardContent = (card: GridCard) => {
    const displayContent = isChineseMode && card.contentZh ? card.contentZh : card.content;

    switch (card.type) {
      case 'HINT':
        return (
          <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-amber-500 to-amber-700 text-white p-4">
            <HelpCircle className="w-12 h-12 mb-2" />
            <p className="text-sm font-bold text-center">{displayContent}</p>
          </div>
        );

      case 'IMAGE':
        return (
          <div className="h-full w-full overflow-hidden">
            <img
              src={card.content}
              alt="Biblical object"
              className="w-full h-full object-cover"
            />
          </div>
        );

      case 'NAME':
        return (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-500 to-blue-700 text-white p-4">
            <p className="text-lg font-bold text-center">{displayContent}</p>
          </div>
        );

      case 'CHAPTER':
        return (
          <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-purple-500 to-purple-700 text-white p-4">
            <Book className="w-8 h-8 mb-2" />
            <p className="text-sm font-bold text-center">{displayContent}</p>
          </div>
        );

      default:
        return null;
    }
  };

  const score = Math.max(0, 200 - elapsedTime);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-800 via-stone-900 to-amber-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-amber-50 mb-4">
            {t('game.title')}
          </h1>
          <div className="flex justify-center gap-8 text-amber-100">
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6" />
              <span className="text-xl font-bold">{t('game.score')}: {score}</span>
            </div>
            <div className="text-xl font-bold">
              {t('game.time')}: {elapsedTime}s
            </div>
            <div className="text-xl font-bold">
              {t('game.matched')}: {matchedTriples.length}/5
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card)}
              className={`
                aspect-square rounded-xl shadow-lg cursor-pointer transition-all duration-300
                ${card.isMatched ? 'opacity-50 scale-95' : 'hover:scale-105'}
                ${card.isFlipped || card.type === 'HINT' ? '' : 'bg-gradient-to-br from-stone-600 to-stone-800'}
              `}
            >
              {card.isFlipped || card.type === 'HINT' ? (
                getCardContent(card)
              ) : (
                <div className="h-full w-full flex items-center justify-center text-stone-400">
                  <Book className="w-16 h-16" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-amber-50">
          <h3 className="text-xl font-bold mb-3">{t('game.instructions.title')}</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li>{t('game.instructions.step1')}</li>
            <li>{t('game.instructions.step2')}</li>
            <li>{t('game.instructions.step3')}</li>
            <li>{t('game.instructions.step4')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MemoryGrid;
