import React from 'react';
import { Gamepad2, Search, Languages } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (destination: 'bible-game' | 'theology-search' | 'biblical-language') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const features = [
    {
      id: 'bible-game' as const,
      title: '聖經探索',
      subtitle: 'Bible Interactive Game',
      description: '通過互動遊戲探索聖經故事和聖經背景知識，與AI邊玩邊學習',
      icon: Gamepad2,
      color: 'from-purple-500 to-purple-700',
      hoverColor: 'hover:from-purple-600 hover:to-purple-800',
    },
    {
      id: 'biblical-language' as const,
      title: '原文學習',
      subtitle: 'Biblical Textual Learning',
      description: '學習聖經原文語言：希伯來文和希臘文發音練習與AI對話',
      icon: Languages,
      color: 'from-amber-500 to-amber-700',
      hoverColor: 'hover:from-amber-600 hover:to-amber-800',
    },
    {
      id: 'theology-search' as const,
      title: '研經助手',
      subtitle: 'Bible Explore Assistant',
      description: '全方位聖經神學研究平台：AI互動、文檔分析、作業輔導和資源搜尋',
      icon: Search,
      color: 'from-green-500 to-green-700',
      hoverColor: 'hover:from-green-600 hover:to-green-800',
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          AI Christian Sunday School Platform
        </h1>
        <p className="text-xl text-gray-300">
          基督教 主日學 AI 工具平台 - 探索信仰，學習聖言
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-5xl mx-auto">
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
                <p className="text-base text-white/80 mb-4 font-medium">
                  {feature.subtitle}
                </p>
                <p className="text-white/90 leading-relaxed text-base">
                  {feature.description}
                </p>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          );
        })}
      </div>

      <div className="mt-16 text-center text-gray-400 text-sm">
        <p>選擇一個功能開始您的聖經探索之旅</p>
        <p className="mt-2">Choose a feature to begin your faith exploration journey</p>
      </div>
    </div>
  );
}; 
