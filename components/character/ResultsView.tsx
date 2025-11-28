import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FinalResult, HolisticAnalysis, AssessmentQuestion, LifeScenario, BibleStoryComparison } from '../../types/character';

interface ResultsViewProps {
  finalResult: FinalResult | null;
  holisticAnalysis: HolisticAnalysis | null;
  responses: string[];
  generatedQuestions: AssessmentQuestion[];
  onRestartAssessment: () => void;
  lifeScenarios: LifeScenario[];
  bibleStories: BibleStoryComparison[];
  finalBibleCharacter: BibleStoryComparison | null;
}

export default function ResultsView({
  finalResult,
  holisticAnalysis,
  responses,
  generatedQuestions,
  onRestartAssessment,
  lifeScenarios,
  bibleStories,
  finalBibleCharacter
}: ResultsViewProps) {
  const { i18n } = useTranslation();
  const isZh = i18n.language === 'zh-TW';
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);

  if (!finalResult || !holisticAnalysis) {
    return <div>{isZh ? '載入結果中...' : 'Loading results...'}</div>;
  }

  const scenarioTranslations: Record<string, { label: string; description: string; focus: string }> = {
    family_conflict: {
      label: '家庭與關係',
      description: '你如何處理家庭動態、衝突和維持關係',
      focus: '揭示關係模式、情緒反應和價值體系'
    },
    personal_crisis: {
      label: '個人危機管理',
      description: '你處理意外個人挑戰和挫折的方法',
      focus: '顯示壓力反應、應對機制和韌性模式'
    },
    social_situations: {
      label: '社交互動',
      description: '你如何處理社交聚會、友誼和社區參與',
      focus: '揭示社交需求、界限和人際動態'
    },
    personal_growth: {
      label: '自我發展',
      description: '你對學習、成長和處理關於自己的反饋的方法',
      focus: '顯示自我意識、對變化的開放性和核心動機'
    },
    decision_making: {
      label: '人生決策',
      description: '你如何做出重要的個人決定並處理不確定性',
      focus: '揭示思維模式、恐懼反應和決策標準'
    },
    values_ethics: {
      label: '價值觀與誠信',
      description: '測試你個人價值觀和道德界限的情境',
      focus: '顯示核心價值觀、道德指南針和真實性'
    },
    creative_expression: {
      label: '創造力與愛好',
      description: '你對創意追求、愛好和自我表達的方法',
      focus: '揭示自我認同、獨特性需求和創造力驅動'
    },
    conflict_resolution: {
      label: '衝突與分歧',
      description: '你如何處理與他人的分歧並解決衝突',
      focus: '顯示衝突風格、情緒調節和和諧需求'
    },
    life_changes: {
      label: '重大人生轉變',
      description: '你對重大生活變化的反應，如搬家、關係變化等',
      focus: '揭示適應能力、焦慮水平和控制需求'
    },
    community_involvement: {
      label: '社區與服務',
      description: '你參與社區、志願工作和幫助他人的情況',
      focus: '顯示利他主義、連結需求和目標感'
    }
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
    <div className="max-w-6xl mx-auto p-4 md:p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {isZh ? '您的性格評估結果' : 'Your Character Assessment Results'}
        </h1>
        <p className="text-gray-600">
          {isZh
            ? `基於對您 ${generatedQuestions.length} 個回應的全面 AI 分析`
            : `Based on holistic AI analysis of your ${generatedQuestions.length} response${generatedQuestions.length > 1 ? 's' : ''}`
          }
        </p>
      </div>

      {/* Primary Result with Confidence */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 md:p-8 rounded-lg border-2 border-yellow-300 mb-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-4xl">🏆</span>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              {isZh ? '您的性格類型' : 'Your Personality Type'}
            </h2>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
            <span className={`text-5xl font-bold px-8 py-4 rounded-full text-white ${finalResult.personality?.color || 'bg-gray-500'}`}>
              {finalResult.type}
            </span>
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{finalResult.personality?.name}</h3>
              <p className="text-base md:text-lg text-gray-700 mb-2">{finalResult.personality?.description}</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <div className="bg-green-100 px-3 py-1 rounded-full">
                  <span className="text-green-800 font-semibold text-sm">
                    {holisticAnalysis.confidence}% {isZh ? '置信度' : 'Confidence'}
                  </span>
                </div>
                {holisticAnalysis.secondaryType && (
                  <div className="bg-blue-100 px-3 py-1 rounded-full">
                    <span className="text-blue-800 text-sm">
                      {isZh ? '次要：' : 'Secondary:'} {isZh ? '類型' : 'Type'} {holisticAnalysis.secondaryType}
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
              🧠 {isZh ? '識別的核心模式' : 'Core Patterns Identified'}
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <strong className="text-blue-800">{isZh ? '主要動機：' : 'Primary Motivation:'}</strong>
                <p className="text-blue-700">{holisticAnalysis.corePatterns.motivation}</p>
              </div>
              <div>
                <strong className="text-blue-800">{isZh ? '核心恐懼：' : 'Core Fear:'}</strong>
                <p className="text-blue-700">{holisticAnalysis.corePatterns.fear}</p>
              </div>
              <div>
                <strong className="text-blue-800">{isZh ? '溝通風格：' : 'Communication Style:'}</strong>
                <p className="text-blue-700">{holisticAnalysis.corePatterns.communicationStyle}</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center gap-2">
              🎯 {isZh ? '生活洞察' : 'Life Insights'}
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <strong className="text-green-800">{isZh ? '壓力反應：' : 'Stress Response:'}</strong>
                <p className="text-green-700">{holisticAnalysis.corePatterns.stressResponse}</p>
              </div>
              <div>
                <strong className="text-green-800">{isZh ? '關係方式：' : 'Relationship Approach:'}</strong>
                <p className="text-green-700">{holisticAnalysis.corePatterns.relationshipApproach}</p>
              </div>
              <div>
                <strong className="text-green-800">{isZh ? '中心：' : 'Center:'}</strong>
                <p className="text-green-700">{finalResult.personality?.center} - {finalResult.personality?.category}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Strengths and Challenges */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-200">
          <h3 className="text-lg font-semibold text-emerald-900 mb-4">✨ {isZh ? '關鍵優勢' : 'Key Strengths'}</h3>
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
          <h3 className="text-lg font-semibold text-amber-900 mb-4">⚠️ {isZh ? '成長領域' : 'Growth Areas'}</h3>
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
          🔍 {isZh ? 'AI 分析理由' : 'AI Analysis Justification'}
        </h3>
        <div className="text-gray-700 leading-relaxed">
          <p className="mb-4">{holisticAnalysis.justification}</p>

          {holisticAnalysis.keyEvidence && holisticAnalysis.keyEvidence.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">{isZh ? '您回應中的關鍵證據：' : 'Key Evidence from Your Responses:'}</h4>
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
          {showDetailedAnalysis ? '👁️ ' + (isZh ? '隱藏' : 'Hide') : '👁️ ' + (isZh ? '顯示' : 'Show')} {isZh ? '回應詳情' : 'Response Details'}
        </button>
      </div>

      {/* Detailed Response Analysis */}
      {showDetailedAnalysis && (
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{isZh ? '您的回應分析' : 'Your Response Analysis'}</h3>
          <div className="space-y-4">
            {responses.map((response, index) => {
              const scenario = lifeScenarios.find(s => s.id === generatedQuestions[index]?.category);
              const zhTranslation = scenario?.id ? scenarioTranslations[scenario.id] : null;
              const displayLabel = isZh && zhTranslation ? zhTranslation.label : scenario?.label || '';

              return (
                <div key={index} className="bg-white p-4 rounded border">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{scenario?.icon ? getIcon(scenario.icon) : '💡'}</span>
                    <span className="font-semibold text-gray-900">
                      {isZh ? '問題' : 'Question'} {index + 1}: {displayLabel}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>{isZh ? '問題：' : 'Question:'}</strong> {generatedQuestions[index]?.text}
                  </div>
                  <div className="text-sm text-gray-700 mb-2">
                    <strong>{isZh ? '您的回應：' : 'Your Response:'}</strong>
                  </div>
                  <div className="text-sm text-blue-800 bg-blue-50 p-3 rounded mb-2 max-h-32 overflow-y-auto border-l-4 border-blue-400">
                    {response}
                  </div>
                  <div className="text-xs text-gray-500">
                    {isZh
                      ? `分析透過動機和溝通風格的模式貢獻於類型 ${finalResult.type} 的識別。`
                      : `Analysis contributed to Type ${finalResult.type} identification through patterns in motivation and communication style.`
                    }
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Bible Character Section */}
      {(finalBibleCharacter || bibleStories.length > 0) && (
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-lg border-2 border-amber-300">
          <h3 className="text-2xl font-bold text-amber-900 mb-4 flex items-center gap-2">
            📖 {isZh ? '聖經人物洞察' : 'Biblical Character Insights'}
          </h3>

          {finalBibleCharacter && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold mb-3 ${
                  finalBibleCharacter.alignment === 'positive'
                    ? 'bg-green-200 text-green-800'
                    : 'bg-amber-200 text-amber-800'
                }`}>
                  {finalBibleCharacter.alignment === 'positive'
                    ? (isZh ? '✓ 正面榜樣' : '✓ Positive Example')
                    : (isZh ? '⚠ 警示性例子' : '⚠ Cautionary Example')
                  }
                </div>
                <h4 className="text-xl font-bold text-purple-800">
                  {finalBibleCharacter.character}{' '}
                  <span className="text-sm text-gray-600 font-normal">({finalBibleCharacter.scripture})</span>
                </h4>
              </div>

              <div className="space-y-3 text-gray-700">
                <p>
                  <strong className="text-gray-900">{isZh ? '情況：' : 'Situation:'}</strong>{' '}
                  {finalBibleCharacter.situation}
                </p>
                <p>
                  <strong className="text-gray-900">{isZh ? '回應：' : 'Response:'}</strong>{' '}
                  {finalBibleCharacter.response}
                </p>
                <p>
                  <strong className="text-gray-900">{isZh ? '結果：' : 'Outcome:'}</strong>{' '}
                  {finalBibleCharacter.outcome}
                </p>
              </div>

              <div className={`mt-4 p-3 rounded border-l-4 text-sm ${
                finalBibleCharacter.alignment === 'positive'
                  ? 'bg-green-50 border-green-500 text-green-800'
                  : 'bg-amber-50 border-amber-500 text-amber-800'
              }`}>
                {finalBibleCharacter.alignment === 'positive'
                  ? (isZh
                    ? '💡 這個聖經人物的特質與您的性格檔案有相似之處。他們的信仰回應展示了與基督教教導一致的正面榜樣。'
                    : '💡 This biblical character shares traits with your personality profile. Their faithful response demonstrates a positive example aligned with Christian teachings.')
                  : (isZh
                    ? '⚠️ 這個聖經人物的某些特質與您的性格檔案相似。他們的經歷提供了一個警示性的例子，展示了偏離信仰原則的後果。'
                    : '⚠️ This biblical character shares some traits with your personality profile. Their experience provides a cautionary example of deviating from faith principles.')
                }
              </div>
            </div>
          )}

          {bibleStories.length > 0 && !finalBibleCharacter && (
            <div className="space-y-4">
              <p className="text-amber-800 mb-4">
                {isZh
                  ? '以下是在您的評估過程中出現的聖經人物故事：'
                  : 'Here are the Bible character stories from your assessment:'}
              </p>
              {bibleStories.map((story, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-purple-800 mb-2">
                    {story.character} <span className="text-sm text-gray-600 font-normal">({story.scripture})</span>
                  </h4>
                  <p className="text-sm text-gray-700">{story.situation}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="text-center space-y-4">
        <button
          onClick={onRestartAssessment}
          className="px-6 md:px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-base md:text-lg font-semibold"
        >
          🔄 {isZh ? '重新評估' : 'Take Assessment Again'}
        </button>

        <div className="text-sm text-gray-600 max-w-3xl mx-auto">
          <strong>{isZh ? '增強分析：' : 'Enhanced Analysis:'}</strong>
          {isZh
            ? ' 此評估使用 AI 全面分析您的完整回應模式、溝通風格和決策方法。置信度分數反映了所有回應中模式的一致性。為了更深入的理解，請考慮專業諮詢或其他經過驗證的評估。'
            : ' This assessment uses AI to analyze your complete response patterns, communication style, and decision-making approach holistically. The confidence score reflects the consistency of patterns across all your responses. For deeper understanding, consider professional consultation or additional validated assessments.'
          }
        </div>
      </div>
    </div>
  );
}
