import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Mic, MicOff } from 'lucide-react';
import { AssessmentQuestion, LifeScenario, BibleStoryComparison } from '../../types/character';

interface AssessmentFlowProps {
  currentScenario: number;
  generatedQuestions: AssessmentQuestion[];
  currentResponse: string;
  setCurrentResponse: (response: string) => void;
  onSubmitResponse: () => void;
  onContinue: () => void;
  lifeScenarios: LifeScenario[];
  currentBibleStory: BibleStoryComparison | null;
  isGeneratingStory: boolean;
}

export default function AssessmentFlow({
  currentScenario,
  generatedQuestions,
  currentResponse,
  setCurrentResponse,
  onSubmitResponse,
  onContinue,
  lifeScenarios,
  currentBibleStory,
  isGeneratingStory
}: AssessmentFlowProps) {
  const { i18n } = useTranslation();
  const isZh = i18n.language === 'zh-TW';
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Speech-to-text functionality
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert(isZh
        ? '您的瀏覽器不支持語音識別功能。請使用 Chrome、Edge 或 Safari 瀏覽器。'
        : 'Your browser does not support speech recognition. Please use Chrome, Edge, or Safari.');
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.lang = isZh ? 'zh-TW' : 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        console.log('Speech recognition started');
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        console.log('Transcript:', transcript);
        setCurrentResponse(currentResponse + (currentResponse ? ' ' : '') + transcript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);

        let errorMessage = isZh ? '語音識別錯誤：' : 'Speech recognition error: ';
        if (event.error === 'not-allowed') {
          errorMessage += isZh
            ? '請允許瀏覽器訪問您的麥克風。檢查瀏覽器地址欄左側的權限設置。'
            : 'Please allow microphone access. Check permissions in your browser address bar.';
        } else if (event.error === 'no-speech') {
          errorMessage += isZh ? '未檢測到語音。請再試一次。' : 'No speech detected. Please try again.';
        } else {
          errorMessage += event.error;
        }
        alert(errorMessage);
      };

      recognition.onend = () => {
        console.log('Speech recognition ended');
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
      console.log('Attempting to start speech recognition...');
    } catch (error) {
      console.error('Error initializing speech recognition:', error);
      alert(isZh
        ? '無法啟動語音識別。請確保您使用的是支持的瀏覽器（Chrome、Edge 或 Safari）並且允許麥克風訪問。'
        : 'Could not start speech recognition. Please ensure you are using a supported browser (Chrome, Edge, or Safari) and have allowed microphone access.');
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const currentQuestion = generatedQuestions[currentScenario];
  const isLastQuestion = currentScenario >= generatedQuestions.length - 1;
  const scenario = lifeScenarios.find(s => s.id === currentQuestion?.category);

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

  const getScenarioDisplay = () => {
    if (!scenario) return { label: '', description: '', focus: '' };

    const zhTranslation = scenario.id ? scenarioTranslations[scenario.id] : null;

    return {
      label: isZh && zhTranslation ? zhTranslation.label : scenario.label,
      description: isZh && zhTranslation ? zhTranslation.description : scenario.description,
      focus: isZh && zhTranslation ? zhTranslation.focus : scenario.enneagramFocus
    };
  };

  const displayScenario = getScenarioDisplay();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-lg shadow-lg">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            {isZh ? `問題 ${currentScenario + 1} / ${generatedQuestions.length}` : `Question ${currentScenario + 1} of ${generatedQuestions.length}`}
          </h1>
          <div className="text-sm text-gray-600">
            {scenario && (
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium">
                {displayScenario.label}
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
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 md:p-6 rounded-lg mb-6 border border-purple-200">
        <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-3">
          💬 {isZh ? '問題：' : 'Question:'}
        </h2>
        <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-4">{currentQuestion?.text}</p>

        {scenario && (
          <div className="bg-white p-3 rounded border-l-4 border-purple-400">
            <p className="text-sm text-gray-600">
              <strong>{isZh ? '焦點：' : 'Focus:'}</strong> {displayScenario.description}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {displayScenario.focus}
            </p>
          </div>
        )}
      </div>

      {/* Response Input */}
      <div className="mb-6">
        <label className="block text-base md:text-lg font-semibold mb-3 text-gray-800">
          {isZh ? '您的回應' : 'Your Response'}
        </label>
        <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
          <div className="flex items-start gap-2">
            <span className="text-xl">💡</span>
            <div className="text-sm text-yellow-800">
              <strong>{isZh ? '最佳效果建議：' : 'For best results:'}</strong>
              {isZh
                ? ' 分享您具體的生活經驗。解釋您的思考過程、決策動機以及結果對您個人的意義。建議 100 字（請勿使用 AI 代寫）。'
                : ' Share your specific life experience. Explain your thought process, what motivated your decisions, and what the outcome meant to you personally. Aim for 100 words (please do not use AI to write for you).'
              }
            </div>
          </div>
        </div>
        <div className="relative">
          <textarea
            value={currentResponse}
            onChange={(e) => setCurrentResponse(e.target.value)}
            placeholder={isZh
              ? '請花時間提供深思熟慮、詳細的回應。使用您生活中的具體例子來展示您如何處理這種情況。不僅解釋您做了什麼，還要說明為什麼這樣做以及是什麼驅動了您的決定...'
              : 'Take your time to provide a thoughtful, detailed response. Use a specific example from your life that demonstrates how you handle this type of situation. Explain not just what you did, but why you approached it that way and what drove your decisions...'
            }
            className="w-full px-4 py-3 pr-14 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-600"
            rows={8}
          />
          <button
            type="button"
            onClick={isListening ? stopListening : startListening}
            className={`absolute right-3 top-3 p-2 rounded-lg transition-colors ${
              isListening
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
            }`}
            title={isListening ? (isZh ? '停止錄音' : 'Stop recording') : (isZh ? '開始語音輸入' : 'Start voice input')}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
        </div>
        <div className="text-xs text-gray-500 mb-2">
          {isZh ? '點擊麥克風圖標使用語音輸入' : 'Click microphone icon to use voice input'}
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="text-xs text-gray-500">
            {currentResponse.length} {isZh ? '字符' : 'characters'}
            {currentResponse.length < 50 && (
              <span className="text-orange-600 ml-1">
                ({isZh ? `還需 ${50 - currentResponse.length} 字符達到最小要求` : `Need ${50 - currentResponse.length} more for minimum`})
              </span>
            )}
            {currentResponse.length >= 100 && currentResponse.length <= 200 && (
              <span className="text-green-600 ml-1">({isZh ? '最佳分析長度' : 'Optimal length for analysis'})</span>
            )}
          </div>
          <div className="text-xs text-gray-500">
            {isZh ? '字數：' : 'Word count:'} {currentResponse.split(/\s+/).filter(word => word.length > 0).length}
          </div>
        </div>
      </div>

      {/* Submit Button - Only show if no Bible story is displayed */}
      {!currentBibleStory && !isGeneratingStory && (
        <div className="text-center">
          <button
            onClick={onSubmitResponse}
            disabled={currentResponse.length < 50}
            className="px-6 md:px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-base md:text-lg font-semibold"
          >
            {isLastQuestion ? (
              <>{isZh ? '🔍 完成評估並分析' : '🔍 Complete Assessment & Analyze'}</>
            ) : (
              <>{isZh ? '下一個問題 →' : 'Next Question →'}</>
            )}
          </button>

          <p className="text-sm text-gray-500 mt-2">
            {currentResponse.length < 50
              ? isZh
                ? `請再提供至少 ${50 - currentResponse.length} 字符以進行分析`
                : `Please provide at least ${50 - currentResponse.length} more characters for analysis`
              : isLastQuestion
                ? isZh ? '準備好發現您的性格檔案！' : 'Ready to discover your personality profile!'
                : isZh ? '您的回應看起來很全面！' : 'Your response looks comprehensive!'
            }
          </p>
        </div>
      )}

      {/* Loading Bible Story */}
      {isGeneratingStory && (
        <div className="mt-6 text-center bg-amber-50 p-4 rounded-lg border border-amber-200">
          <div className="flex items-center justify-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-amber-600"></div>
            <p className="text-amber-800 font-medium">
              {isZh ? '正在生成聖經人物比較...' : 'Generating Biblical character comparison...'}
            </p>
          </div>
        </div>
      )}

      {/* Bible Story Comparison */}
      {currentBibleStory && !isGeneratingStory && (
        <div className={`mt-6 p-6 rounded-lg border-2 ${
          currentBibleStory.alignment === 'positive'
            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300'
            : 'bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-300'
        }`}>
          <div className="flex items-start gap-3 mb-4">
            <span className="text-3xl">📖</span>
            <div className="flex-1">
              <h3 className={`text-lg font-bold mb-1 ${
                currentBibleStory.alignment === 'positive' ? 'text-green-900' : 'text-amber-900'
              }`}>
                {isZh ? '聖經人物比較' : 'Biblical Character Comparison'}
              </h3>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                currentBibleStory.alignment === 'positive'
                  ? 'bg-green-200 text-green-800'
                  : 'bg-amber-200 text-amber-800'
              }`}>
                {currentBibleStory.alignment === 'positive'
                  ? (isZh ? '✓ 正面回應' : '✓ Positive Response')
                  : (isZh ? '⚠ 負面回應' : '⚠ Negative Response')
                }
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-start gap-2 mb-2">
                <span className="font-bold text-purple-700">{currentBibleStory.character}</span>
                <span className="text-sm text-gray-600 italic">({currentBibleStory.scripture})</span>
              </div>

              <div className="space-y-2 text-sm">
                <p className="text-gray-700">
                  <strong className="text-gray-900">{isZh ? '情況：' : 'Situation:'}</strong> {currentBibleStory.situation}
                </p>
                <p className="text-gray-700">
                  <strong className="text-gray-900">{isZh ? '回應：' : 'Response:'}</strong> {currentBibleStory.response}
                </p>
                <p className="text-gray-700">
                  <strong className="text-gray-900">{isZh ? '結果：' : 'Outcome:'}</strong> {currentBibleStory.outcome}
                </p>
              </div>
            </div>

            <div className={`text-xs p-3 rounded border-l-4 ${
              currentBibleStory.alignment === 'positive'
                ? 'bg-green-100 border-green-500 text-green-800'
                : 'bg-amber-100 border-amber-500 text-amber-800'
            }`}>
              {currentBibleStory.alignment === 'positive'
                ? (isZh
                  ? '💡 這個聖經人物的回應與基督教教導一致，展示了信仰的正面實踐。'
                  : '💡 This biblical character\'s response aligns with Christian teachings, demonstrating positive faith in action.')
                : (isZh
                  ? '⚠️ 這個聖經人物的回應偏離了基督教教導，提供了一個警示性的例子。'
                  : '⚠️ This biblical character\'s response deviated from Christian teachings, providing a cautionary example.')
              }
            </div>
          </div>

          {/* Continue Button after Bible Story */}
          <div className="mt-6 text-center">
            <button
              onClick={onContinue}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 text-lg font-bold shadow-lg transition-all"
            >
              {isLastQuestion
                ? (isZh ? '✅ 繼續分析' : '✅ Continue to Analysis')
                : (isZh ? '➡️ 下一個問題' : '➡️ Next Question')
              }
            </button>
            <p className="text-sm text-gray-600 mt-2">
              {isZh ? '請閱讀聖經故事後繼續' : 'Please read the Bible story before continuing'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
