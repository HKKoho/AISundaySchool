'use client';

import React, { useState } from 'react';
import { FinalResult, HolisticAnalysis, AssessmentQuestion, LifeScenario } from '@/types';

interface ResultsViewProps {
  finalResult: FinalResult | null;
  holisticAnalysis: HolisticAnalysis | null;
  responses: string[];
  generatedQuestions: AssessmentQuestion[];
  testingMode: boolean;
  onRestartAssessment: () => void;
  lifeScenarios: LifeScenario[];
}

export default function ResultsView({
  finalResult,
  holisticAnalysis,
  responses,
  generatedQuestions,
  testingMode,
  onRestartAssessment,
  lifeScenarios
}: ResultsViewProps) {
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);

  if (!finalResult || !holisticAnalysis) {
    return <div>Loading results...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Character Assessment Results</h1>
        <p className="text-gray-600">
          Based on holistic AI analysis of your {generatedQuestions.length} response{generatedQuestions.length > 1 ? 's' : ''}
          {testingMode && <span className="text-orange-600 font-semibold ml-1">(Quick Assessment)</span>}
        </p>
      </div>

      {/* Primary Result with Confidence */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-8 rounded-lg border-2 border-yellow-300 mb-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl font-bold text-gray-900">Your Personality Type</h2>
          </div>

          <div className="flex items-center justify-center gap-6 mb-6">
            <span className={`text-5xl font-bold px-8 py-4 rounded-full text-white ${finalResult.personality?.color || 'bg-gray-500'}`}>
              {finalResult.type}
            </span>
            <div className="text-left">
              <h3 className="text-3xl font-bold text-gray-900">{finalResult.personality?.name}</h3>
              <p className="text-lg text-gray-700 mb-2">{finalResult.personality?.description}</p>
              <div className="flex items-center gap-2">
                <div className="bg-green-100 px-3 py-1 rounded-full">
                  <span className="text-green-800 font-semibold">
                    {holisticAnalysis.confidence}% Confidence
                  </span>
                </div>
                {holisticAnalysis.secondaryType && (
                  <div className="bg-blue-100 px-3 py-1 rounded-full">
                    <span className="text-blue-800 text-sm">
                      Secondary: Type {holisticAnalysis.secondaryType}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Patterns Analysis */}
      {holisticAnalysis.corePatterns && (
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
              🧠 Core Patterns Identified
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <strong className="text-blue-800">Primary Motivation:</strong>
                <p className="text-blue-700">{holisticAnalysis.corePatterns.motivation}</p>
              </div>
              <div>
                <strong className="text-blue-800">Core Fear:</strong>
                <p className="text-blue-700">{holisticAnalysis.corePatterns.fear}</p>
              </div>
              <div>
                <strong className="text-blue-800">Communication Style:</strong>
                <p className="text-blue-700">{holisticAnalysis.corePatterns.communicationStyle}</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center gap-2">
              🎯 Life Insights
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <strong className="text-green-800">Stress Response:</strong>
                <p className="text-green-700">{holisticAnalysis.corePatterns.stressResponse}</p>
              </div>
              <div>
                <strong className="text-green-800">Relationship Approach:</strong>
                <p className="text-green-700">{holisticAnalysis.corePatterns.relationshipApproach}</p>
              </div>
              <div>
                <strong className="text-green-800">Center:</strong>
                <p className="text-green-700">{finalResult.personality?.center} - {finalResult.personality?.category}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Strengths and Challenges */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-200">
          <h3 className="text-lg font-semibold text-emerald-900 mb-4">✨ Key Strengths</h3>
          <ul className="space-y-2">
            {finalResult.personality?.strengths?.map((strength, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-emerald-700">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
          <h3 className="text-lg font-semibold text-amber-900 mb-4">⚠️ Growth Areas</h3>
          <ul className="space-y-2">
            {finalResult.personality?.challenges?.map((challenge, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-amber-700">
                <span className="text-amber-500 mt-0.5">→</span>
                <span>{challenge}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* AI Justification */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          🔍 AI Analysis Justification
        </h3>
        <div className="text-gray-700 leading-relaxed">
          <p className="mb-4">{holisticAnalysis.justification}</p>

          {holisticAnalysis.keyEvidence && holisticAnalysis.keyEvidence.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Key Evidence from Your Responses:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {holisticAnalysis.keyEvidence.map((evidence, index) => (
                  <li key={index} className="text-sm">{evidence}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Detailed Analysis Toggle */}
      <div className="text-center mb-6">
        <button
          onClick={() => setShowDetailedAnalysis(!showDetailedAnalysis)}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          {showDetailedAnalysis ? '👁️ Hide' : '👁️ Show'} Response Details
        </button>
      </div>

      {/* Detailed Response Analysis */}
      {showDetailedAnalysis && (
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Response Analysis</h3>
          <div className="space-y-4">
            {responses.map((response, index) => {
              const scenario = lifeScenarios.find(s => s.id === generatedQuestions[index]?.category);
              return (
                <div key={index} className="bg-white p-4 rounded border">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{scenario?.icon === 'Heart' ? '❤️' : '💡'}</span>
                    <span className="font-semibold text-gray-900">
                      Question {index + 1}: {scenario?.label}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>Question:</strong> {generatedQuestions[index]?.text}
                  </div>
                  <div className="text-sm text-gray-700 mb-2">
                    <strong>Your Response:</strong>
                  </div>
                  <div className="text-sm bg-blue-50 p-3 rounded mb-2 max-h-32 overflow-y-auto border-l-4 border-blue-400">
                    {response}
                  </div>
                  <div className="text-xs text-gray-500">
                    Analysis contributed to Type {finalResult.type} identification through patterns in motivation and communication style.
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="text-center space-y-4">
        <button
          onClick={onRestartAssessment}
          className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-lg font-semibold"
        >
          🔄 Take Assessment Again
        </button>

        <div className="text-sm text-gray-600 max-w-3xl mx-auto">
          <strong>Enhanced Analysis:</strong> This assessment uses AI to analyze your complete response patterns,
          communication style, and decision-making approach holistically. The confidence score reflects the consistency
          of patterns across all your responses. For deeper understanding, consider professional consultation or
          additional validated assessments.
        </div>
      </div>
    </div>
  );
}
