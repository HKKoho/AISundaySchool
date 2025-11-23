import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BIBLE_BOOKS, BIBLE_CHAPTERS, BIBLE_BOOKS_ZH_TW, BIBLE_VERSES } from '../constants';
import { BibleReference } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface ReferenceSelectorProps {
  onReferenceChange: (reference: BibleReference) => void;
}

export const ReferenceSelector: React.FC<ReferenceSelectorProps> = ({ onReferenceChange }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [book, setBook] = useState('Genesis');
  const [chapter, setChapter] = useState('1');
  const [verse, setVerse] = useState('1');

  const getBookDisplayName = (bookName: string) => {
    if (language === 'zh-TW' && BIBLE_BOOKS_ZH_TW[bookName]) {
      return BIBLE_BOOKS_ZH_TW[bookName];
    }
    return bookName;
  };

  const handleBookChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newBook = e.target.value;
    // Reset chapter and verse when book changes to avoid invalid references
    const newChapter = '1';
    const newVerse = '1';
    setBook(newBook);
    setChapter(newChapter);
    setVerse(newVerse);
    onReferenceChange({ book: newBook, chapter: newChapter, verse: newVerse });
  };

  const handleChapterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newChapter = e.target.value;
    // Reset verse to avoid invalid references
    const newVerse = '1';
    setChapter(newChapter);
    setVerse(newVerse);
    onReferenceChange({ book, chapter: newChapter, verse: newVerse });
  };

  const handleVerseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVerse = e.target.value;
    setVerse(newVerse);
    onReferenceChange({ book, chapter, verse: newVerse });
  };
  
  const chapterCount = BIBLE_CHAPTERS[book] || 1;
  const chapters = Array.from({ length: chapterCount }, (_, i) => i + 1);
  const verseCount = BIBLE_VERSES[book]?.[parseInt(chapter) - 1] || 1;

  return (
    <div className="card">
      <h2>{t('reference_selector_title')}</h2>
      <div className="reference-inputs">
        <div>
          <label htmlFor="book">{t('book')}</label>
          <select id="book" value={book} onChange={handleBookChange}>
            <optgroup label={t('old_testament')}>
              {BIBLE_BOOKS['Old Testament'].map(b => (
                <option key={b} value={b}>{getBookDisplayName(b)}</option>
              ))}
            </optgroup>
            <optgroup label={t('new_testament')}>
              {BIBLE_BOOKS['New Testament'].map(b => (
                <option key={b} value={b}>{getBookDisplayName(b)}</option>
              ))}
            </optgroup>
          </select>
        </div>
        <div>
          <label htmlFor="chapter">{t('chapter')}</label>
          <select id="chapter" value={chapter} onChange={handleChapterChange}>
            {chapters.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="verse">{t('verse')}</label>
          <input id="verse" type="number" value={verse} onChange={handleVerseChange} min="1" max={verseCount} />
        </div>
      </div>
    </div>
  );
};