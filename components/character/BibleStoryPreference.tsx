import React from 'react';
import { useTranslation } from 'react-i18next';

interface BibleStoryPreferenceProps {
  onSelect: (showDuringQuestions: boolean) => void;
}

export default function BibleStoryPreference({ onSelect }: BibleStoryPreferenceProps) {
  const { i18n } = useTranslation();
  const isZh = i18n.language === 'zh-TW';

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          📖 {isZh ? '聖經故事選項' : 'Bible Story Preference'}
        </h2>
        <p className="text-gray-600">
          {isZh
            ? '您希望在評估過程中如何查看聖經人物故事？'
            : 'How would you like to view Bible character stories during your assessment?'}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Option: YES - Show during questions */}
        <button
          onClick={() => onSelect(true)}
          className="group p-6 border-2 border-green-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all text-left"
        >
          <div className="flex items-start gap-4">
            <div className="text-4xl">✅</div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-green-900 mb-2 group-hover:text-green-700">
                {isZh ? '是，每題後顯示' : 'Yes, Show After Each Question'}
              </h3>
              <p className="text-gray-700 text-sm mb-3">
                {isZh
                  ? '在每個問題回答後，您將看到一個相關的聖經人物故事，展示類似情況下的回應。'
                  : 'After each question response, you will see a relevant Bible character story showing how they responded in a similar situation.'}
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ {isZh ? '3個聖經故事（每題1個）' : '3 Bible stories (1 per question)'}</li>
                <li>✓ {isZh ? '即時反思機會' : 'Immediate reflection opportunities'}</li>
                <li>✓ {isZh ? '深入的靈性洞察' : 'Deeper spiritual insights'}</li>
              </ul>
            </div>
          </div>
        </button>

        {/* Option: NO - Show only at end */}
        <button
          onClick={() => onSelect(false)}
          className="group p-6 border-2 border-purple-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all text-left"
        >
          <div className="flex items-start gap-4">
            <div className="text-4xl">📊</div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-purple-900 mb-2 group-hover:text-purple-700">
                {isZh ? '否，僅在結果顯示' : 'No, Show Only in Final Results'}
              </h3>
              <p className="text-gray-700 text-sm mb-3">
                {isZh
                  ? '完成所有問題後，您將在最終結果中看到1個與您整體性格最相似的聖經人物。'
                  : 'After completing all questions, you will see 1 Bible character in the final results that best matches your overall personality.'}
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ {isZh ? '1個聖經人物（基於整體性格）' : '1 Bible character (based on overall personality)'}</li>
                <li>✓ {isZh ? '更快的評估流程' : 'Faster assessment flow'}</li>
                <li>✓ {isZh ? '專注於問題回答' : 'Focus on answering questions'}</li>
              </ul>
            </div>
          </div>
        </button>
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>{isZh ? '💡 提示：' : '💡 Tip:'}</strong>{' '}
          {isZh
            ? '兩種選項都會為您提供聖經人物的洞察。選擇最適合您學習風格的選項！'
            : 'Both options will provide you with Bible character insights. Choose what works best for your learning style!'}
        </p>
      </div>
    </div>
  );
}
