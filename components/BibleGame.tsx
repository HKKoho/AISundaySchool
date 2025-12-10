import React, { useState } from 'react';
import { GameProvider } from '../contexts/GameContext';
import Header from './bible/Header';
import GameMap from './bible/GameMap';
import QuizMode from './bible/QuizMode';
import MatchGame from './matchgame/MatchGame';
import DungeonCrawler from './DungeonCrawler';
import CharacterDecision from './CharacterDecision';
import { ParableKeeperGame } from './parable-keeper/ParableKeeperGame';
import GuidedJourneyGame from './guided-journey/GuidedJourneyGame';
import BibleLensGame from './bible-lens/BibleLensGame';
import { ArrowLeft, Gamepad2, Grid3x3, Compass, UserCircle, Users, Map, BookImage } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface BibleGameProps {
  onBack: () => void;
}

type GameMode = 'select' | 'exploration' | 'exploration-quiz' | 'matching' | 'dungeon' | 'character' | 'parable-keeper' | 'guided-journey' | 'bible-lens';

export const BibleGame: React.FC<BibleGameProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation('common');
  const isChineseMode = i18n.language === 'zh-TW';
  const [gameMode, setGameMode] = useState<GameMode>('select');
  const [attendance, setAttendance] = useState<'irregular' | 'regular'>('irregular');
  const [experience, setExperience] = useState<'below5' | '5to14' | 'above14'>('below5');

  const handleGameModeSelect = (mode: GameMode) => {
    if (mode === 'matching') {
      setGameMode('matching');
      return;
    }
    // Use quiz mode for exploration game
    if (mode === 'exploration') {
      setGameMode('exploration-quiz');
      return;
    }
    setGameMode(mode);
  };

  if (gameMode === 'select') {
    return (
      <div className="fixed inset-0 bg-cover bg-center text-stone-900 font-serif" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/old-wall.png')"}}>
        <div className="bg-stone-800 bg-opacity-60 h-screen overflow-y-auto flex flex-col">
          <div className="sticky top-0 z-10 bg-stone-800 bg-opacity-90 backdrop-blur-sm p-4 flex items-center justify-between shadow-lg">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-stone-200 hover:text-white transition-colors bg-stone-700 hover:bg-stone-600 px-4 py-2 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
              {t('buttons.backToHome')}
            </button>
          </div>

          <div className="flex-grow p-8 pb-16">
            <div className="max-w-4xl w-full mx-auto">
              <h2 className="text-4xl font-bold text-center text-white mb-8" style={{fontFamily: "'Trajan Pro', serif"}}>
                {t('navigation.bibleGame')}
              </h2>

              {/* Sunday School Attendance Survey - Single Row */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-8 border border-white/20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Sunday School Attendance */}
                  <div className="flex flex-col gap-2">
                    <label className="text-white font-semibold text-xs">
                      {isChineseMode ? '主日學出席' : 'Sunday School Attendance'}
                    </label>
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-2 text-white cursor-pointer hover:text-amber-200 transition-colors">
                        <input
                          type="radio"
                          name="attendance"
                          value="irregular"
                          checked={attendance === 'irregular'}
                          onChange={(e) => setAttendance(e.target.value as 'irregular' | 'regular')}
                          className="w-4 h-4 text-amber-600 focus:ring-amber-500"
                        />
                        <span className="text-xs">{isChineseMode ? '不定期' : 'Irregularly'}</span>
                      </label>
                      <label className="flex items-center gap-2 text-white cursor-pointer hover:text-amber-200 transition-colors">
                        <input
                          type="radio"
                          name="attendance"
                          value="regular"
                          checked={attendance === 'regular'}
                          onChange={(e) => setAttendance(e.target.value as 'irregular' | 'regular')}
                          className="w-4 h-4 text-amber-600 focus:ring-amber-500"
                        />
                        <span className="text-xs">{isChineseMode ? '定期' : 'Regularly'}</span>
                      </label>
                    </div>
                  </div>

                  {/* Sunday School Learning */}
                  <div className="flex flex-col gap-2">
                    <label className="text-white font-semibold text-xs">
                      {isChineseMode ? '主日學學習' : 'Sunday School Learning'}
                    </label>
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-2 text-white cursor-pointer hover:text-amber-200 transition-colors">
                        <input
                          type="radio"
                          name="experience"
                          value="below5"
                          checked={experience === 'below5'}
                          onChange={(e) => setExperience(e.target.value as 'below5' | '5to14' | 'above14')}
                          className="w-4 h-4 text-amber-600 focus:ring-amber-500"
                        />
                        <span className="text-xs">{isChineseMode ? '5年以下' : 'Below 5 years'}</span>
                      </label>
                      <label className="flex items-center gap-2 text-white cursor-pointer hover:text-amber-200 transition-colors">
                        <input
                          type="radio"
                          name="experience"
                          value="5to14"
                          checked={experience === '5to14'}
                          onChange={(e) => setExperience(e.target.value as 'below5' | '5to14' | 'above14')}
                          className="w-4 h-4 text-amber-600 focus:ring-amber-500"
                        />
                        <span className="text-xs">{isChineseMode ? '5-14年' : '5-14 years'}</span>
                      </label>
                      <label className="flex items-center gap-2 text-white cursor-pointer hover:text-amber-200 transition-colors">
                        <input
                          type="radio"
                          name="experience"
                          value="above14"
                          checked={experience === 'above14'}
                          onChange={(e) => setExperience(e.target.value as 'below5' | '5to14' | 'above14')}
                          className="w-4 h-4 text-amber-600 focus:ring-amber-500"
                        />
                        <span className="text-xs">{isChineseMode ? '14年以上' : '14+ years'}</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {/* Exploration Game - Hidden */}
                {false && (
                  <button
                    onClick={() => handleGameModeSelect('exploration')}
                    className="group relative bg-gradient-to-br from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                  >
                    <div className="flex flex-col items-center text-white">
                      <div className="mb-6 p-6 bg-white/20 rounded-full backdrop-blur-sm">
                        <Gamepad2 className="w-20 h-20" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{t('features.bibleGame.explorationTitle')}</h3>
                      <p className="text-white/90 text-center">
                        {t('features.bibleGame.explorationDesc')}
                      </p>
                    </div>
                  </button>
                )}

                {/* Dungeon Crawler Game */}
                <button
                  onClick={() => handleGameModeSelect('dungeon')}
                  className="group relative bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                >
                  <div className="flex flex-col items-center text-white">
                    <div className="mb-6 p-6 bg-white/20 rounded-full backdrop-blur-sm">
                      <Compass className="w-20 h-20" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{t('features.bibleGame.dungeonTitle')}</h3>
                    <p className="text-white/90 text-center">
                      {t('features.bibleGame.dungeonDesc')}
                    </p>
                  </div>
                </button>

                {/* Bible Lens Game */}
                <button
                  onClick={() => handleGameModeSelect('bible-lens')}
                  className="group relative bg-gradient-to-br from-rose-600 to-rose-800 hover:from-rose-500 hover:to-rose-700 rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                >
                  <div className="flex flex-col items-center text-white">
                    <div className="mb-6 p-6 bg-white/20 rounded-full backdrop-blur-sm">
                      <BookImage className="w-20 h-20" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{t('features.bibleGame.bibleLensTitle')}</h3>
                    <p className="text-white/90 text-center">
                      {t('features.bibleGame.bibleLensDesc')}
                    </p>
                  </div>
                </button>

                {/* Parable Keeper Game */}
                <button
                  onClick={() => handleGameModeSelect('parable-keeper')}
                  className="group relative bg-gradient-to-br from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                >
                  <div className="flex flex-col items-center text-white">
                    <div className="mb-6 p-6 bg-white/20 rounded-full backdrop-blur-sm">
                      <Users className="w-20 h-20" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{t('features.bibleGame.parableKeeperTitle')}</h3>
                    <p className="text-white/90 text-center">
                      {t('features.bibleGame.parableKeeperDesc')}
                    </p>
                  </div>
                </button>

                {/* Guided Journey Game */}
                <button
                  onClick={() => handleGameModeSelect('guided-journey')}
                  className="group relative bg-gradient-to-br from-stone-600 to-stone-800 hover:from-stone-500 hover:to-stone-700 rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                >
                  <div className="flex flex-col items-center text-white">
                    <div className="mb-6 p-6 bg-white/20 rounded-full backdrop-blur-sm">
                      <Map className="w-20 h-20" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{t('features.bibleGame.guidedJourneyTitle')}</h3>
                    <p className="text-white/90 text-center">
                      {t('features.bibleGame.guidedJourneyDesc')}
                    </p>
                  </div>
                </button>

                {/* Character Decision Game */}
                <button
                  onClick={() => handleGameModeSelect('character')}
                  className="group relative bg-gradient-to-br from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                >
                  <div className="flex flex-col items-center text-white">
                    <div className="mb-6 p-6 bg-white/20 rounded-full backdrop-blur-sm">
                      <UserCircle className="w-20 h-20" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{t('features.bibleGame.characterTitle')}</h3>
                    <p className="text-white/90 text-center">
                      {t('features.bibleGame.characterDesc')}
                    </p>
                  </div>
                </button>

                {/* Bible Knowledge Check (formerly Matching Game) */}
                <button
                  onClick={() => handleGameModeSelect('matching')}
                  className="group relative bg-gradient-to-br from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                >
                  <div className="flex flex-col items-center text-white">
                    <div className="mb-6 p-6 bg-white/20 rounded-full backdrop-blur-sm">
                      <Grid3x3 className="w-20 h-20" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{t('features.bibleGame.knowledgeCheckTitle')}</h3>
                    <p className="text-white/90 text-center">
                      {t('features.bibleGame.knowledgeCheckDesc')}
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameMode === 'exploration-quiz') {
    return (
      <div className="fixed inset-0 bg-cover bg-center text-stone-900 font-serif" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/old-wall.png')"}}>
        <div className="bg-stone-800 bg-opacity-60 min-h-screen overflow-auto">
          <QuizMode onBack={() => setGameMode('select')} />
        </div>
      </div>
    );
  }

  // Determine if user should see only Preliminary questions
  // Preliminary: irregular attendance AND (below 5 years OR 5-14 years)
  const showOnlyPreliminary = attendance === 'irregular' && (experience === 'below5' || experience === '5to14');

  if (gameMode === 'matching') {
    return (
      <div className="fixed inset-0">
        <MatchGame
          onBack={() => setGameMode('select')}
          difficultyFilter={showOnlyPreliminary ? 'Preliminary' : undefined}
        />
      </div>
    );
  }

  if (gameMode === 'dungeon') {
    return (
      <div className="fixed inset-0">
        <DungeonCrawler
          onBack={() => setGameMode('select')}
          difficultyFilter={showOnlyPreliminary ? 'Preliminary' : undefined}
        />
      </div>
    );
  }

  if (gameMode === 'character') {
    return (
      <div className="fixed inset-0">
        <CharacterDecision onBack={() => setGameMode('select')} />
      </div>
    );
  }

  if (gameMode === 'parable-keeper') {
    return (
      <div className="fixed inset-0">
        <ParableKeeperGame onBack={() => setGameMode('select')} />
      </div>
    );
  }

  if (gameMode === 'guided-journey') {
    return (
      <div className="fixed inset-0">
        <GuidedJourneyGame onBack={() => setGameMode('select')} />
      </div>
    );
  }

  if (gameMode === 'bible-lens') {
    return (
      <div className="fixed inset-0">
        <BibleLensGame onBack={() => setGameMode('select')} />
      </div>
    );
  }

  return (
    <GameProvider>
      <div className="fixed inset-0 bg-cover bg-center text-stone-900 font-serif" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/old-wall.png')"}}>
        <div className="bg-stone-800 bg-opacity-60 min-h-screen overflow-auto">
          <div className="p-4">
            <button
              onClick={() => setGameMode('select')}
              className="flex items-center gap-2 text-stone-200 hover:text-white transition-colors mb-4 bg-stone-700 hover:bg-stone-600 px-4 py-2 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
              {t('buttons.back')}
            </button>
          </div>
          <Header />
          <main className="p-4 sm:p-6 md:p-8">
            <GameMap />
          </main>
          <footer className="text-center py-4 text-stone-400 text-sm">
            <p>📖 Default questions curated by biblical scholars</p>
            <p className="text-xs mt-1">⚡ AI Question Generator powered by Google Gemini 2.0 Flash Experimental</p>
          </footer>
        </div>
      </div>
    </GameProvider>
  );
};
