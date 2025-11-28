'use client';

import React from 'react';
import { LifeScenario, UserProfile } from '@/types';

interface ScenarioSelectionProps {
  selectedScenarios: string[];
  setSelectedScenarios: (scenarios: string[]) => void;
  userProfile: UserProfile;
  testingMode: boolean;
  setTestingMode: (mode: boolean) => void;
  onGenerateQuestions: () => void;
  isGenerating: boolean;
  lifeScenarios: LifeScenario[];
}

export default function ScenarioSelection({
  selectedScenarios,
  setSelectedScenarios,
  userProfile,
  testingMode,
  setTestingMode,
  onGenerateQuestions,
  isGenerating,
  lifeScenarios
}: ScenarioSelectionProps) {
  const toggleScenario = (scenarioId: string) => {
    setSelectedScenarios(prev => {
      if (prev.includes(scenarioId)) {
        return prev.filter(id => id !== scenarioId);
      } else {
        const maxScenarios = testingMode ? 1 : 6;
        if (prev.length >= maxScenarios) {
          return prev;
        }
        return [...prev, scenarioId];
      }
    });
  };

  const selectRecommended = () => {
    const recommended = ['family_conflict', 'personal_growth', 'decision_making', 'social_situations', 'values_ethics'];
    const maxSelect = testingMode ? 1 : 5;
    setSelectedScenarios(recommended.slice(0, maxSelect));
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        {/* Testing Mode Toggle */}
        <div className="mb-4">
          <label className="flex items-center justify-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={testingMode}
              onChange={(e) => {
                setTestingMode(e.target.checked);
                setSelectedScenarios([]);
              }}
              className="rounded"
            />
            <span className={testingMode ? 'text-orange-600 font-semibold' : 'text-gray-600'}>
              Quick Test Mode (1 question only)
            </span>
          </label>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome {userProfile.name}! Select Life Situations
        </h1>
        <p className="text-gray-600 mb-4">
          Choose {testingMode ? '1 life situation' : '4-6 life situations'} to explore through thoughtful questions.
          <br />
          Questions will be tailored to your life stage: {userProfile.lifeStage}.
        </p>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
          <div className="flex items-center gap-2 mb-2 justify-center">
            <span className="font-semibold text-blue-900">💡 Recommended for Accurate Assessment</span>
          </div>
          <p className="text-sm text-blue-700 mb-3">
            For the most accurate personality assessment, we recommend focusing on these life situations:
          </p>
          <button
            onClick={selectRecommended}
            className="text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Auto-select Recommended Situations
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {lifeScenarios.map(scenario => {
          const isSelected = selectedScenarios.includes(scenario.id);
          const isDisabled = !isSelected && selectedScenarios.length >= (testingMode ? 1 : 6);

          return (
            <button
              key={scenario.id}
              onClick={() => !isDisabled && toggleScenario(scenario.id)}
              disabled={isDisabled}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                isSelected
                  ? 'border-purple-500 bg-purple-50 shadow-md'
                  : isDisabled
                    ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{scenario.icon === 'Heart' ? '❤️' : scenario.icon === 'Users' ? '👥' : '💡'}</span>
                <span className="font-semibold text-gray-800">{scenario.label}</span>
                {isSelected && <span className="ml-auto">✓</span>}
              </div>
              <p className="text-sm text-gray-600 mb-2">{scenario.description}</p>
              <p className="text-xs text-gray-500 italic">{scenario.enneagramFocus}</p>
            </button>
          );
        })}
      </div>

      <div className="text-center">
        <button
          onClick={onGenerateQuestions}
          disabled={selectedScenarios.length < 1 || isGenerating}
          className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-lg font-semibold"
        >
          {isGenerating ? (
            <>⏳ Generating Questions...</>
          ) : (
            <>Begin Assessment ⚡</>
          )}
        </button>
        <p className="text-sm text-gray-500 mt-2">
          {selectedScenarios.length === 0
            ? `Select ${testingMode ? '1 situation' : 'at least 3 situations'} to continue`
            : `${selectedScenarios.length} situation${selectedScenarios.length > 1 ? 's' : ''} selected ${testingMode ? '(Quick Mode)' : ''}`
          }
        </p>
      </div>
    </div>
  );
}
