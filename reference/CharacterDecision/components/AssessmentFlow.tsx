'use client';

import React from 'react';
import { AssessmentQuestion, LifeScenario } from '@/types';

interface AssessmentFlowProps {
  currentScenario: number;
  generatedQuestions: AssessmentQuestion[];
  currentResponse: string;
  setCurrentResponse: (response: string) => void;
  onSubmitResponse: () => void;
  testingMode: boolean;
  loadDemoResponse: (category: string) => void;
  lifeScenarios: LifeScenario[];
  demoResponses: Record<string, string[]>;
}

export default function AssessmentFlow({
  currentScenario,
  generatedQuestions,
  currentResponse,
  setCurrentResponse,
  onSubmitResponse,
  testingMode,
  loadDemoResponse,
  lifeScenarios,
  demoResponses
}: AssessmentFlowProps) {
  const currentQuestion = generatedQuestions[currentScenario];
  const isLastQuestion = currentScenario >= generatedQuestions.length - 1;
  const scenario = lifeScenarios.find(s => s.id === currentQuestion?.category);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Question {currentScenario + 1} of {generatedQuestions.length}
          </h1>
          <div className="text-sm text-gray-600">
            {scenario && (
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium">
                {scenario.label}
              </span>
            )}
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${((currentScenario + 1) / generatedQuestions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Current Question */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg mb-6 border border-purple-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          💬 Question:
        </h2>
        <p className="text-gray-700 leading-relaxed text-lg mb-4">{currentQuestion?.text}</p>

        {scenario && (
          <div className="bg-white p-3 rounded border-l-4 border-purple-400">
            <p className="text-sm text-gray-600">
              <strong>Focus:</strong> {scenario.description}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {scenario.enneagramFocus}
            </p>
          </div>
        )}
      </div>

      {/* Demo Responses - Only show in testing mode */}
      {testingMode && scenario && demoResponses[scenario.id] && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-gray-600">Need inspiration? Try demo responses:</span>
            <button
              onClick={() => loadDemoResponse(scenario.id)}
              className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200 transition-colors"
            >
              🔀 Load Example
            </button>
          </div>
          <div className="text-xs text-gray-500">
            Click "Load Example" to see a sample response, then modify it to reflect your own experience.
          </div>
        </div>
      )}

      {/* Response Input */}
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-3 text-gray-800">
          Your Response
        </label>
        <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
          <div className="flex items-start gap-2">
            <span className="text-xl">💡</span>
            <div className="text-sm text-yellow-800">
              <strong>For best results:</strong> Share a specific example from your life experience.
              Explain your thought process, what motivated your decisions, and what the outcome meant to you personally.
              Aim for 100-150 words (please do not use AI to write for you).
            </div>
          </div>
        </div>
        <textarea
          value={currentResponse}
          onChange={(e) => setCurrentResponse(e.target.value)}
          placeholder="Take your time to provide a thoughtful, detailed response. Use a specific example from your life that demonstrates how you handle this type of situation. Explain not just what you did, but why you approached it that way and what drove your decisions..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          rows={8}
        />
        <div className="flex justify-between items-center mt-2">
          <div className="text-xs text-gray-500">
            {currentResponse.length} characters
            {currentResponse.length < 50 && (
              <span className="text-orange-600 ml-1">
                (Need {50 - currentResponse.length} more for minimum)
              </span>
            )}
            {currentResponse.length >= 100 && currentResponse.length <= 200 && (
              <span className="text-green-600 ml-1">(Optimal length for analysis)</span>
            )}
          </div>
          <div className="text-xs text-gray-500">
            Word count: {currentResponse.split(/\s+/).filter(word => word.length > 0).length}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          onClick={onSubmitResponse}
          disabled={currentResponse.length < 50}
          className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-lg font-semibold"
        >
          {isLastQuestion ? (
            <>🔍 Complete Assessment & Analyze</>
          ) : (
            <>Next Question →</>
          )}
        </button>

        <p className="text-sm text-gray-500 mt-2">
          {currentResponse.length < 50
            ? `Please provide at least ${50 - currentResponse.length} more characters for analysis`
            : isLastQuestion
              ? "Ready to discover your personality profile!"
              : "Your response looks comprehensive!"
          }
        </p>
      </div>
    </div>
  );
}
