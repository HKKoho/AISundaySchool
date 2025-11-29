import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import English translations
import enCommon from '../locales/en/common.json';
import enBibleGame from '../locales/en/bibleGame.json';
import enLanguage from '../locales/en/language.json';
import enExplore from '../locales/en/explore.json';
import enTheologyAssistant from '../locales/en/theologyAssistant.json';
import enBibleStudy from '../locales/en/bibleStudy.json';
import enParableKeeper from '../locales/en/parableKeeper.json';
import enGuidedJourney from '../locales/en/guidedJourney.json';
import enBibleLens from '../locales/en/bibleLens.json';

// Import Traditional Chinese translations
import zhCommon from '../locales/zh-TW/common.json';
import zhBibleGame from '../locales/zh-TW/bibleGame.json';
import zhLanguage from '../locales/zh-TW/language.json';
import zhExplore from '../locales/zh-TW/explore.json';
import zhTheologyAssistant from '../locales/zh-TW/theologyAssistant.json';
import zhBibleStudy from '../locales/zh-TW/bibleStudy.json';
import zhParableKeeper from '../locales/zh-TW/parableKeeper.json';
import zhGuidedJourney from '../locales/zh-TW/guidedJourney.json';
import zhBibleLens from '../locales/zh-TW/bibleLens.json';

const resources = {
  en: {
    common: enCommon,
    bibleGame: enBibleGame,
    language: enLanguage,
    explore: enExplore,
    theologyAssistant: enTheologyAssistant,
    bibleStudy: enBibleStudy,
    parableKeeper: enParableKeeper,
    guidedJourney: enGuidedJourney,
    bibleLens: enBibleLens,
  },
  'zh-TW': {
    common: zhCommon,
    bibleGame: zhBibleGame,
    language: zhLanguage,
    explore: zhExplore,
    theologyAssistant: zhTheologyAssistant,
    bibleStudy: zhBibleStudy,
    parableKeeper: zhParableKeeper,
    guidedJourney: zhGuidedJourney,
    bibleLens: zhBibleLens,
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
