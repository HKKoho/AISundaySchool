import React from 'react';
import LanguageApp from '../language/App';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface BiblicalLanguageProps {
  onBack: () => void;
}

export const BiblicalLanguage: React.FC<BiblicalLanguageProps> = ({ onBack }) => {
  const { t } = useTranslation('common');

  return (
    <div className="w-full h-full min-h-screen bg-gradient-to-br from-blue-100 to-sky-200 transition-colors">
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-amber-100 backdrop-blur-sm rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105 text-stone-700"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium">{t('buttons.backToHome')}</span>
        </button>
      </div>
      <LanguageApp />
    </div>
  );
};
