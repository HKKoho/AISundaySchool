import React from 'react';
import { Gamepad2, Search, Languages, BookOpen, Youtube } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface LandingPageProps {
  onNavigate: (destination: 'bible-game' | 'theology-search' | 'biblical-language' | 'version-comparison' | 'youtube-learning') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const { t } = useTranslation('common');

  const features = [
    {
      id: 'bible-game' as const,
      title: t('navigation.bibleGame'),
      subtitle: 'Bible Interactive Game',
      description: t('features.bibleGame.description'),
      icon: Gamepad2,
      color: 'from-purple-500 to-purple-700',
      hoverColor: 'hover:from-purple-600 hover:to-purple-800',
    },
    {
      id: 'biblical-language' as const,
      title: t('navigation.language'),
      subtitle: 'Biblical Textual Learning',
      description: t('features.language.description'),
      icon: Languages,
      color: 'from-amber-500 to-amber-700',
      hoverColor: 'hover:from-amber-600 hover:to-amber-800',
    },
    {
      id: 'youtube-learning' as const,
      title: t('navigation.youtubeLearning', 'Quick Learning from Videos in YouTube'),
      subtitle: 'YouTube Bible Teaching',
      description: t('features.youtubeLearning.description', 'Learn bible through YouTube video talks'),
      icon: Youtube,
      color: 'from-red-500 to-red-700',
      hoverColor: 'hover:from-red-600 hover:to-red-800',
    },
    {
      id: 'theology-search' as const,
      title: t('navigation.explore'),
      subtitle: 'Bible Explore Assistant',
      description: t('features.explore.description', 'Chat on theology, Q&A on doc'),
      icon: Search,
      color: 'from-green-500 to-green-700',
      hoverColor: 'hover:from-green-600 hover:to-green-800',
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          {t('appName')}
        </h1>
        <p className="text-xl text-gray-300">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 max-w-7xl mx-auto">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <button
              key={feature.id}
              onClick={() => onNavigate(feature.id)}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${feature.color} ${feature.hoverColor} p-10 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl bg-opacity-80 backdrop-blur-sm`}
              style={{ opacity: 0.75 }}
            >
              <div className="relative z-10">
                <div className="mb-6 flex justify-center">
                  <div className="p-5 bg-white/20 rounded-full backdrop-blur-sm">
                    <Icon className="w-16 h-16 text-white" />
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-white mb-3">
                  {feature.title}
                </h2>
                <p className="text-white/90 leading-relaxed text-base">
                  {feature.description}
                </p>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          );
        })}
      </div>
    </div>
  );
}; 
