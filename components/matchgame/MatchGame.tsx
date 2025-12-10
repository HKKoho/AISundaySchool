import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { useTranslation } from 'react-i18next';
import { translations } from './i18n';
import { RoundResult, UserSelections, Round, SideItem, MatchItem } from './types';
import Header from './Header';
import GameRound from './GameRound';
import GameOver from './GameOver';

type Language = 'en' | 'zh-TW';
type GamePhase = 'playing' | 'over';

interface MatchGameProps {
  onBack?: () => void;
  difficultyFilter?: 'Preliminary' | 'Competent';
}

function MatchGame({ onBack, difficultyFilter }: MatchGameProps) {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<Language>(i18n.language as Language || 'en');
  const [uiText, setUiText] = useState(() => translations[language]);
  const [selectedRoundIds, setSelectedRoundIds] = useState<number[]>(() => {
    // Select 10 random round IDs from all available rounds
    const allRounds = translations[language].gameRounds;

    // Filter by difficulty if specified
    const filteredRounds = difficultyFilter
      ? allRounds.filter(r => r.difficulty === difficultyFilter)
      : allRounds;

    const shuffled = [...filteredRounds].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(10, shuffled.length)).map(r => r.id);
  });

  // Get rounds by ID (will update when language changes, but same round IDs)
  const gameRoundsData = React.useMemo(() => {
    const allRounds = translations[language].gameRounds;
    return selectedRoundIds.map(id => allRounds.find(r => r.id === id)).filter(Boolean) as Round[];
  }, [language, selectedRoundIds]);
  
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userSelections, setUserSelections] = useState<UserSelections>({});
  const [roundResult, setRoundResult] = useState<RoundResult>(RoundResult.UNANSWERED);
  const [gamePhase, setGamePhase] = useState<GamePhase>('playing');
  
  const [explanation, setExplanation] = useState<string>('');
  const [isGeneratingExplanation, setIsGeneratingExplanation] = useState<boolean>(false);
  const [isGeneratingRound, setIsGeneratingRound] = useState<boolean>(false);
  const [showUnderConstruction, setShowUnderConstruction] = useState<boolean>(false);

  const [shuffledRightSide, setShuffledRightSide] = useState(gameRoundsData[currentRoundIndex].rightSide);

  const currentRoundData: Round = useMemo(() => gameRoundsData[currentRoundIndex], [currentRoundIndex, gameRoundsData]);

  useEffect(() => {
    // Sync with global i18n language
    const currentLang = i18n.language as Language;
    if (currentLang !== language && (currentLang === 'en' || currentLang === 'zh-TW')) {
      setLanguage(currentLang);
    }
  }, [i18n.language, language]);

  useEffect(() => {
    // Update UI text when language changes (but keep same round IDs)
    const newUiText = translations[language];
    setUiText(newUiText);
  }, [language]);
  
  useEffect(() => {
    // Shuffle the right side options when the round changes
    setShuffledRightSide(
      [...currentRoundData.rightSide].sort(() => Math.random() - 0.5)
    );
    setUserSelections({});
    setRoundResult(RoundResult.UNANSWERED);
    setExplanation('');
  }, [currentRoundData]);

  const handleLanguageChange = useCallback((lang: Language) => {
    setLanguage(lang);
  }, []);
  
  const handleSelectChange = useCallback((rightSideId: string, selection: string) => {
    if (roundResult !== RoundResult.UNANSWERED) return;
    setUserSelections(prev => ({ ...prev, [rightSideId]: selection }));
  }, [roundResult]);

  const generateExplanation = async (round: Round, selections: UserSelections) => {
    setIsGeneratingExplanation(true);
    setExplanation('');
    
    const incorrectMatch = round.rightSide.find(item => selections[item.id] !== item.correctMatch);
    if (!incorrectMatch) {
      setIsGeneratingExplanation(false);
      return;
    }

    const correctLeftItem = round.leftSide.find(item => item.id === incorrectMatch.correctMatch);
    const userSelectedLeftItem = round.leftSide.find(item => item.id === selections[incorrectMatch.id]);

    if (!correctLeftItem || !userSelectedLeftItem) {
      setIsGeneratingExplanation(false);
      return;
    }
    
    const prompt = `In a Bible matching game, a user was asked to match the following item: "${incorrectMatch.text}". They incorrectly matched it with "${userSelectedLeftItem.text}". The correct match is "${correctLeftItem.text}". In ${language === 'en' ? 'English' : 'Traditional Chinese'}, briefly explain why the user's choice is incorrect and the correct choice is right.`;

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });
      setExplanation(response.text);
    } catch (error) {
      console.error("Error generating explanation:", error);
      setExplanation(uiText.aiError);
    } finally {
      setIsGeneratingExplanation(false);
    }
  };

  const handleSubmit = useCallback(() => {
    if (Object.keys(userSelections).length < 4) {
        alert(uiText.selectAllMessage);
        return;
    }

    const isCorrect = currentRoundData.rightSide.every(item => userSelections[item.id] === item.correctMatch);

    if (isCorrect) {
      setScore(prev => prev + 1);
      setRoundResult(RoundResult.CORRECT);
    } else {
      setRoundResult(RoundResult.INCORRECT);
      generateExplanation(currentRoundData, userSelections);
    }
  }, [userSelections, currentRoundData, language, uiText.selectAllMessage, uiText.aiError]);

  const handleNextRound = useCallback(() => {
    if (currentRoundIndex < gameRoundsData.length - 1) {
      setCurrentRoundIndex(prev => prev + 1);
    }
  }, [currentRoundIndex, gameRoundsData.length]);

  const handleFinishGame = useCallback(() => {
      setGamePhase('over');
  }, []);

  const handlePlayAgain = useCallback(() => {
    // Re-initialize with 10 random round IDs
    const allRounds = translations[language].gameRounds;

    // Filter by difficulty if specified
    const filteredRounds = difficultyFilter
      ? allRounds.filter(r => r.difficulty === difficultyFilter)
      : allRounds;

    const shuffled = [...filteredRounds].sort(() => Math.random() - 0.5);
    setSelectedRoundIds(shuffled.slice(0, Math.min(10, shuffled.length)).map(r => r.id));
    setCurrentRoundIndex(0);
    setScore(0);
    setGamePhase('playing');
  }, [language, difficultyFilter]);

  const handleGenerateRound = async () => {
    setIsGeneratingRound(true);
    const existingCategories = gameRoundsData.map(r => r.category).join(', ');
    const prompt = `Generate a new round for a Bible matching game in ${language === 'en' ? 'English' : 'Traditional Chinese'}. The topic should be about biblical characters, theology, history, or literature. Avoid these existing categories: ${existingCategories}. The response must be a JSON object with "category" (string), "leftSide" (array of 4 objects with "id" and "text"), and "rightSide" (array of 4 objects with "id", "text", and "correctMatch"). Left side IDs must be "A", "B", "C", "D". Right side IDs must be "r1", "r2", "r3", "r4". The "correctMatch" values must correspond to a left side ID.`;

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              category: { type: Type.STRING },
              leftSide: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: { id: { type: Type.STRING }, text: { type: Type.STRING }},
                  required: ['id', 'text']
                }
              },
              rightSide: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: { id: { type: Type.STRING }, text: { type: Type.STRING }, correctMatch: { type: Type.STRING }},
                  required: ['id', 'text', 'correctMatch']
                }
              }
            },
            required: ['category', 'leftSide', 'rightSide']
          }
        }
      });
      const newRound: Round = JSON.parse(response.text);
      newRound.id = gameRoundsData.length + 1; // Assign new ID
      // Since gameRoundsData is derived from selectedRoundIds via useMemo,
      // we can't directly add new rounds. Instead, just play again with new random rounds.
      handlePlayAgain();

    } catch (error) {
      console.error("Error generating new round:", error);
      alert(uiText.aiError);
    } finally {
      setIsGeneratingRound(false);
    }
  };

  if (showUnderConstruction) {
    return (
      <div className="min-h-screen font-sans flex flex-col items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-800 shadow-2xl rounded-xl p-8 max-w-2xl w-full text-center">
          <div className="text-6xl mb-6">🚧</div>
          <h2 className="text-4xl font-bold text-sky-600 dark:text-sky-400 mb-6">
            {uiText.underConstructionTitle}
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
            {uiText.underConstructionMessage}
          </p>
          <button
            onClick={() => setShowUnderConstruction(false)}
            className="px-8 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-lg transition-colors"
          >
            {uiText.backToHome}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans flex flex-col items-center justify-center p-4">
      {/* Back to Home Button */}
      {onBack && (
        <div className="absolute top-4 left-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors shadow-lg"
          >
            <span>←</span>
            <span>{uiText.backToHome}</span>
          </button>
        </div>
      )}
      <div className="w-full max-w-4xl mx-auto">
        <Header 
          title={uiText.title}
          roundLabel={uiText.round}
          scoreLabel={uiText.score}
          roundNumber={currentRoundIndex + 1} 
          totalRounds={gameRoundsData.length}
          score={score}
          language={language}
          onLanguageChange={handleLanguageChange}
        />
        <main className="mt-6 bg-white dark:bg-slate-800 shadow-2xl rounded-xl p-6 md:p-8">
          {gamePhase === 'over' ? (
            <GameOver
              score={score}
              totalRounds={gameRoundsData.length}
              onPlayAgain={handlePlayAgain}
              onGenerateRound={handleGenerateRound}
              onGoDeeper={() => setShowUnderConstruction(true)}
              isGenerating={isGeneratingRound}
              uiText={{
                gameOver: uiText.gameOver,
                finalScore: uiText.finalScore,
                playAgain: uiText.playAgain,
                generateNewRound: uiText.generateNewRound,
                generating: uiText.generating,
                challengeTitle: uiText.challengeTitle,
                challengeDesc: uiText.challengeDesc,
                recommendTitle: uiText.recommendTitle,
                recommendDesc: uiText.recommendDesc,
                goDeeper: uiText.goDeeper,
              }}
            />
          ) : (
            <GameRound
              roundData={currentRoundData}
              shuffledRightSide={shuffledRightSide}
              userSelections={userSelections}
              onSelectChange={handleSelectChange}
              roundResult={roundResult}
              onSubmit={handleSubmit}
              onNextRound={handleNextRound}
              onFinishGame={handleFinishGame}
              isLastRound={currentRoundIndex === gameRoundsData.length - 1}
              explanation={explanation}
              isGeneratingExplanation={isGeneratingExplanation}
              language={language}
              uiText={{
                 submit: uiText.submit,
                 correctMessage: uiText.correctMessage,
                 incorrectMessage: uiText.incorrectMessage,
                 nextRound: uiText.nextRound,
                 finishGame: uiText.finishGame,
                 select: uiText.select,
                 generatingExplanation: uiText.generatingExplanation,
              }}
            />
          )}
        </main>
      </div>
       <footer className="text-center mt-8 text-slate-500 text-sm">
          <p>{uiText.footerText}</p>
      </footer>
    </div>
  );
}

export default MatchGame;