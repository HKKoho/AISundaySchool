'use client';

import React from 'react';

interface AnalysisViewProps {
  analysisProgress: number;
}

export default function AnalysisView({ analysisProgress }: AnalysisViewProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Analyzing Your Responses</h1>

        <div className="mb-8">
          <div className="w-32 h-32 mx-auto mb-6">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
              <div
                className="absolute inset-0 rounded-full border-4 border-purple-500 transition-all duration-1000"
                style={{
                  background: `conic-gradient(from 0deg, #8b5cf6 ${analysisProgress * 3.6}deg, transparent ${analysisProgress * 3.6}deg)`
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center bg-white rounded-full m-3">
                <span className="text-2xl font-bold text-gray-700">{analysisProgress}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 text-left max-w-2xl mx-auto">
          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded">
            <div className={`w-6 h-6 rounded-full ${analysisProgress > 20 ? 'bg-purple-500' : 'bg-gray-300'} flex items-center justify-center`}>
              {analysisProgress > 20 ? <span className="text-white text-xs">✓</span> : <div className="w-2 h-2 bg-white rounded-full"></div>}
            </div>
            <span className="text-purple-900">Consolidating all response data</span>
          </div>

          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded">
            <div className={`w-6 h-6 rounded-full ${analysisProgress > 60 ? 'bg-purple-500' : 'bg-gray-300'} flex items-center justify-center`}>
              {analysisProgress > 60 ? <span className="text-white text-xs">✓</span> : <div className="w-2 h-2 bg-white rounded-full"></div>}
            </div>
            <span className="text-purple-900">Performing holistic AI analysis across all responses</span>
          </div>

          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded">
            <div className={`w-6 h-6 rounded-full ${analysisProgress > 90 ? 'bg-purple-500' : 'bg-gray-300'} flex items-center justify-center`}>
              {analysisProgress > 90 ? <span className="text-white text-xs">✓</span> : <div className="w-2 h-2 bg-white rounded-full"></div>}
            </div>
            <span className="text-purple-900">Identifying core patterns and Enneagram type</span>
          </div>
        </div>

        <div className="mt-8 text-gray-600">
          <p className="text-lg mb-2">Advanced AI Analysis in Progress...</p>
          <p className="text-sm">
            Our system is analyzing your communication style, decision-making patterns,
            core motivations, and life approach across all your responses to determine
            your most likely Enneagram personality type.
          </p>
        </div>
      </div>
    </div>
  );
}
