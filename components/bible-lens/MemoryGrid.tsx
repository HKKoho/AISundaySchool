import React, { useState, useEffect } from 'react';
import { GridCard, BiblicalPair } from './types';
import { Book, Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface MemoryGridProps {
  pairs: BiblicalPair[];
  onComplete: (timeInSeconds: number) => void;
}

const MemoryGrid: React.FC<MemoryGridProps> = ({ pairs, onComplete }) => {
  const { t, i18n } = useTranslation('bibleLens');
  const isChineseMode = i18n.language === 'zh-TW';

  const [cards, setCards] = useState<GridCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [startTime] = useState<number>(Date.now());
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  // Initialize the grid
  useEffect(() => {
    const gridCards: GridCard[] = [];

    // Create cards for each pair (8 pairs = 16 cards total)
    pairs.forEach((pair) => {
      gridCards.push({
        id: `${pair.id}-image`,
        pairId: pair.id,
        type: 'IMAGE',
        content: pair.imageBase64,
        isFlipped: false,
        isMatched: false,
        position: 0
      });

      gridCards.push({
        id: `${pair.id}-chapter`,
        pairId: pair.id,
        type: 'CHAPTER',
        content: pair.chapterReference,
        contentZh: pair.chapterReferenceZh,
        isFlipped: false,
        isMatched: false,
        position: 0
      });
    });

    // Shuffle all cards
    for (let i = gridCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [gridCards[i], gridCards[j]] = [gridCards[j], gridCards[i]];
    }

    // Assign positions
    const finalCards = gridCards.map((card, index) => ({
      ...card,
      position: index
    }));

    setCards(finalCards);
  }, [pairs]);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  // Check if game is complete
  useEffect(() => {
    if (matchedPairs.length === 8) {
      onComplete(elapsedTime);
    }
  }, [matchedPairs, elapsedTime, onComplete]);

  const handleCardClick = (card: GridCard) => {
    // Ignore if card is already matched or already flipped
    if (card.isMatched || flippedCards.includes(card.id)) {
      return;
    }

    // Can't flip more than 2 cards
    if (flippedCards.length >= 2) {
      return;
    }

    const newFlippedCards = [...flippedCards, card.id];
    setFlippedCards(newFlippedCards);

    // Flip the card
    setCards(prevCards =>
      prevCards.map(c => c.id === card.id ? { ...c, isFlipped: true } : c)
    );

    // Check for pair match when 2 cards are flipped
    if (newFlippedCards.length === 2) {
      setTimeout(() => {
        checkForMatch(newFlippedCards);
      }, 800);
    }
  };

  const checkForMatch = (flippedCardIds: string[]) => {
    const flippedCardObjects = cards.filter(c => flippedCardIds.includes(c.id));

    // Check if both cards belong to the same pair
    const pairIds = flippedCardObjects.map(c => c.pairId);

    // Check if both cards are from the same pair and have different types
    if (pairIds[0] === pairIds[1]) {
      const types = new Set(flippedCardObjects.map(c => c.type));
      if (types.has('IMAGE') && types.has('CHAPTER')) {
        // Match found!
        setMatchedPairs(prev => [...prev, pairIds[0]]);
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
              {t('game.matched')}: {matchedPairs.length}/8
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
                ${card.isFlipped ? '' : 'bg-gradient-to-br from-stone-600 to-stone-800'}
              `}
            >
              {card.isFlipped ? (
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
