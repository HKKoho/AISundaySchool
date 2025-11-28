import React from 'react';
import { useTranslation } from 'react-i18next';

interface AnalysisViewProps {
  analysisProgress: number;
}

export default function AnalysisView({ analysisProgress }: AnalysisViewProps) {
  const { i18n } = useTranslation();
  const isZh = i18n.language === 'zh-TW';

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          {isZh ? '分析您的回應中' : 'Analyzing Your Responses'}
        </h1>

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
            <div className={`w-6 h-6 rounded-full ${analysisProgress > 20 ? 'bg-purple-500' : 'bg-gray-300'} flex items-center justify-center flex-shrink-0`}>
              {analysisProgress > 20 ? <span className="text-white text-xs">✓</span> : <div className="w-2 h-2 bg-white rounded-full"></div>}
            </div>
            <span className="text-purple-900 text-sm md:text-base">
              {isZh ? '整合所有回應數據' : 'Consolidating all response data'}
            </span>
          </div>

          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded">
            <div className={`w-6 h-6 rounded-full ${analysisProgress > 60 ? 'bg-purple-500' : 'bg-gray-300'} flex items-center justify-center flex-shrink-0`}>
              {analysisProgress > 60 ? <span className="text-white text-xs">✓</span> : <div className="w-2 h-2 bg-white rounded-full"></div>}
            </div>
            <span className="text-purple-900 text-sm md:text-base">
              {isZh ? '執行全面 AI 分析' : 'Performing holistic AI analysis across all responses'}
            </span>
          </div>

          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded">
            <div className={`w-6 h-6 rounded-full ${analysisProgress > 90 ? 'bg-purple-500' : 'bg-gray-300'} flex items-center justify-center flex-shrink-0`}>
              {analysisProgress > 90 ? <span className="text-white text-xs">✓</span> : <div className="w-2 h-2 bg-white rounded-full"></div>}
            </div>
            <span className="text-purple-900 text-sm md:text-base">
              {isZh ? '識別核心模式和九型人格類型' : 'Identifying core patterns and Enneagram type'}
            </span>
          </div>
        </div>

        <div className="mt-8 text-gray-600">
          <p className="text-base md:text-lg mb-2">
            {isZh ? '進階 AI 分析進行中...' : 'Advanced AI Analysis in Progress...'}
          </p>
          <p className="text-sm">
            {isZh
              ? '我們的系統正在分析您的溝通風格、決策模式、核心動機以及在所有回應中的生活態度，以確定您最可能的九型人格類型。'
              : 'Our system is analyzing your communication style, decision-making patterns, core motivations, and life approach across all your responses to determine your most likely Enneagram personality type.'
            }
          </p>
        </div>
      </div>
    </div>
  );
}
