import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import English translations
import enCommon from '../locales/en/common.json';
import enBibleGame from '../locales/en/bibleGame.json';
import enLanguage from '../locales/en/language.json';
import enExplore from '../locales/en/explore.json';

// Import Traditional Chinese translations
import zhCommon from '../locales/zh-TW/common.json';
import zhBibleGame from '../locales/zh-TW/bibleGame.json';
import zhLanguage from '../locales/zh-TW/language.json';
import zhExplore from '../locales/zh-TW/explore.json';

const resources = {
  en: {
    common: enCommon,
    bibleGame: enBibleGame,
    language: enLanguage,
    explore: enExplore,
  },
  'zh-TW': {
    common: zhCommon,
    bibleGame: zhBibleGame,
    language: zhLanguage,
    explore: zhExplore,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
