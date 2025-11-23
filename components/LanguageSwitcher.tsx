import React from 'react';
import { useTranslation } from 'react-i18next';
import Icon from './bible/Icon';

const LanguageSwitcher: React.FC = () => {
  const { t, i18n } = useTranslation('bibleGame');

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh-TW' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-amber-800 hover:bg-amber-700 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-200"
      title={t('header.languageSwitcher')}
    >
      <Icon name="languages" className="w-5 h-5" />
      <span className="font-medium">
        {i18n.language === 'zh-TW' ? 'Eng' : '中文'}
      </span>
    </button>
  );
};

export default LanguageSwitcher;
