import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGame } from '../../hooks/useGame';
import { BibleVersion } from '../../Bible/constants';
import JournalModal from './JournalModal';
import Icon from './Icon';

const Header: React.FC = () => {
  const { t } = useTranslation('bibleGame');
  const { bibleVersion, setBibleVersion, journalEntries } = useGame();
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [showInstruction, setShowInstruction] = useState(false);

  const handleJournalClick = () => {
    if (journalEntries.length === 0) {
      setShowInstruction(true);
    } else {
      setIsJournalOpen(true);
    }
  };

  return (
    <>
      <header className="p-4 bg-stone-900 bg-opacity-40 text-white shadow-lg flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-xl md:text-3xl font-extrabold" style={{fontFamily: "'Trajan Pro', serif"}}>
          {t('header.mainTitle')}
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="bible-version" className="text-sm font-semibold">{t('header.versionLabel')}</label>
            <select
              id="bible-version"
              value={bibleVersion}
              onChange={(e) => setBibleVersion(e.target.value as BibleVersion)}
              className="bg-stone-700 border border-stone-600 text-white text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block p-2"
            >
              {Object.values(BibleVersion).map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>
          <button
            onClick={handleJournalClick}
            className="flex items-center gap-2 bg-amber-800 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105"
            aria-label={t('header.journalAriaLabel')}
          >
            <Icon name="book-open" className="w-5 h-5" />
            <span className="hidden sm:inline">{t('header.journalButton')}</span>
          </button>
        </div>
      </header>

      {/* Instruction Modal */}
      {showInstruction && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 animate-fade-in"
          onClick={() => setShowInstruction(false)}
        >
          <div
            className="bg-cover bg-center rounded-lg shadow-2xl w-full max-w-2xl border-4 border-amber-900 text-stone-900 p-8 relative"
            style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/old-paper.png')"}}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-3xl font-bold text-amber-900" style={{fontFamily: "'Trajan Pro', serif"}}>
                {t('header.instructionModal.title')}
              </h2>
              <button
                onClick={() => setShowInstruction(false)}
                className="text-stone-600 hover:text-stone-900 transition-colors"
                aria-label={t('header.instructionModal.closeAriaLabel')}
              >
                <Icon name="x" className="w-8 h-8"/>
              </button>
            </div>

            <div className="space-y-4 text-stone-800">
              <p className="text-lg font-semibold">
                {t('header.instructionModal.welcome')}
              </p>

              <div className="bg-amber-50/70 border-l-4 border-amber-600 p-4 rounded-r-lg">
                <h3 className="font-bold text-amber-900 mb-2">{t('header.instructionModal.featuresTitle')}</h3>
                <p className="mb-2">{t('header.instructionModal.featuresDesc')}</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>{t('header.instructionModal.feature1')}</li>
                  <li>{t('header.instructionModal.feature2')}</li>
                  <li>{t('header.instructionModal.feature3')}</li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-amber-300">
                <button
                  onClick={() => setShowInstruction(false)}
                  className="w-full px-6 py-3 bg-amber-800 hover:bg-amber-700 text-white font-bold rounded-lg transition-all"
                >
                  {t('header.instructionModal.startButton')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isJournalOpen && <JournalModal onClose={() => setIsJournalOpen(false)} />}
    </>
  );
};

export default Header;