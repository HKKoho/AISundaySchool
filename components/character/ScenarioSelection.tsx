import React from 'react';
import { useTranslation } from 'react-i18next';
import { UserProfile } from '../../types/character';
import { lifeScenarios } from '../../lib/lifeScenarios';

interface ScenarioSelectionProps {
  selectedScenarios: string[];
  setSelectedScenarios: (scenarios: string[]) => void;
  userProfile: UserProfile;
  onGenerateQuestions: () => void;
  isGenerating: boolean;
}

export default function ScenarioSelection({
  selectedScenarios,
  setSelectedScenarios,
  userProfile,
  onGenerateQuestions,
  isGenerating
}: ScenarioSelectionProps) {
  const { i18n } = useTranslation();
  const isZh = i18n.language === 'zh-TW';

  const toggleScenario = (scenarioId: string) => {
    setSelectedScenarios(prev => {
      if (prev.includes(scenarioId)) {
        return prev.filter(id => id !== scenarioId);
      } else {
        if (prev.length >= 3) return prev;
        return [...prev, scenarioId];
      }
    });
  };

  const selectRecommended = () => {
    const recommended = ['family_conflict', 'personal_growth', 'decision_making'];
    setSelectedScenarios(recommended);
  };

  const getIcon = (iconName: string) => {
    const icons: Record<string, string> = {
      'Heart': '❤️',
      'AlertCircle': '⚠️',
      'Users': '👥',
      'TrendingUp': '📈',
      'Lightbulb': '💡',
      'Shield': '🛡️',
      'Sparkles': '✨',
      'MessageSquare': '💬',
      'RefreshCw': '🔄',
      'Globe': '🌍'
    };
    return icons[iconName] || '💡';
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {isZh ? `歡迎 ${userProfile.lifeStage || ''}！選擇生活情境` : `Welcome! Select Life Situations`}
        </h1>
        <p className="text-gray-600 mb-4 text-sm md:text-base">
          {isZh
            ? '選擇 3 個生活情境，透過深入問題探索。'
            : 'Choose 3 life situations to explore through thoughtful questions.'}
          <br />
          <span className="text-sm">
            {isZh
              ? `問題將根據您的人生階段量身定制：${userProfile.lifeStage || ''}`
              : `Questions will be tailored to your life stage: ${userProfile.lifeStage || ''}`}
          </span>
        </p>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={selectRecommended}
            className="text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            {isZh ? '選擇3個你能回應的情境' : 'Select 3 situations you can respond'}
          </button>
          <button
            onClick={onGenerateQuestions}
            disabled={selectedScenarios.length < 3 || isGenerating}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm font-semibold transition-colors"
          >
            {isGenerating ? (
              <>⏳ {isZh ? '生成問題中...' : 'Generating Questions...'}</>
            ) : (
              <>{isZh ? '開始評估 ⚡' : 'Begin Assessment ⚡'}</>
            )}
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {lifeScenarios.map(scenario => {
          const isSelected = selectedScenarios.includes(scenario.id);
          const isDisabled = !isSelected && selectedScenarios.length >= 3;

          // Get Chinese translations if available
          const displayLabel = isZh && scenario.labelZh ? scenario.labelZh : scenario.label;
          const displayDescription = isZh && scenario.descriptionZh ? scenario.descriptionZh : scenario.description;
          const displayFocus = isZh && scenario.enneagramFocusZh ? scenario.enneagramFocusZh : scenario.enneagramFocus;

          return (
            <button
              key={scenario.id}
              onClick={() => !isDisabled && toggleScenario(scenario.id)}
              disabled={isDisabled}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                isSelected
                  ? 'border-green-500 bg-green-50 shadow-md'
                  : isDisabled
                    ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                    : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{getIcon(scenario.icon)}</span>
                <span className="font-semibold text-gray-800 flex-1">{displayLabel}</span>
                {isSelected && <span className="text-green-600 text-xl">✓</span>}
              </div>
              <p className="text-sm text-gray-600 mb-2">{displayDescription}</p>
              <p className="text-xs text-gray-500 italic">{displayFocus}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
