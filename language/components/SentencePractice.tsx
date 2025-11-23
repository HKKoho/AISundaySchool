import React, { useState, useRef, useCallback } from 'react';
import { Loader2, Mic, Square, Sparkles } from 'lucide-react';
import { Language, type BibleSentence } from '../types';
import { generateBibleSentence, getSentencePronunciationScore } from '../services/multiProviderLanguageService';

interface SentencePracticeProps {
  language: Language;
  onBack: () => void;
}

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result !== 'string') {
        return reject(new Error('File could not be read as a string.'));
      }
      const base64Data = reader.result.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const SentencePractice: React.FC<SentencePracticeProps> = ({ language, onBack }) => {
  const [sentence, setSentence] = useState<BibleSentence | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleGenerateSentence = useCallback(async () => {
    setIsGenerating(true);
    setError(null);
    setScore(null);
    setFeedback(null);

    try {
      const newSentence = await generateBibleSentence(language);
      setSentence(newSentence);
    } catch (err) {
      setError('無法生成句子，請重試');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  }, [language]);

  const startRecording = useCallback(async () => {
    if (!sentence) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setError(null);
      setScore(null);
      setFeedback(null);

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      recorder.onstop = async () => {
        setIsEvaluating(true);
        const audioBlob = new Blob(audioChunksRef.current, { type: recorder.mimeType });

        try {
          const base64Audio = await blobToBase64(audioBlob);
          const result = await getSentencePronunciationScore(sentence, base64Audio, recorder.mimeType);
          setScore(result.score);
          setFeedback(result.feedback);
        } catch (apiError) {
          console.error(apiError);
          setError('無法評估發音，請重試');
        } finally {
          setIsEvaluating(false);
        }

        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      setError('需要麥克風權限才能使用。請在瀏覽器設定中啟用麥克風。');
    }
  }, [sentence]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-green-100 border-green-300';
    if (score >= 60) return 'bg-yellow-100 border-yellow-300';
    return 'bg-red-100 border-red-300';
  };

  // Generate initial sentence on mount
  React.useEffect(() => {
    handleGenerateSentence();
  }, [handleGenerateSentence]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <button
        onClick={onBack}
        className="mb-6 text-sm text-stone-600 hover:text-sky-600 transition-colors"
      >
        ← 返回模式選擇
      </button>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-stone-800">
            {language === Language.HEBREW ? '希伯來文' : '希臘文'} 句子練習
          </h2>
          <button
            onClick={handleGenerateSentence}
            disabled={isGenerating || isRecording || isEvaluating}
            className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-stone-200 rounded-lg hover:bg-sky-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> 生成中...</>
            ) : (
              <><Sparkles className="w-4 h-4" /> 新句子</>
            )}
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border-2 border-red-300 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {sentence && !isGenerating && (
          <div className="space-y-6">
            {/* Bible Reference */}
            <div className="text-center">
              <span className="inline-block px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold">
                {sentence.reference}
              </span>
            </div>

            {/* Original Text */}
            <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-xl p-6 border-2 border-blue-200">
              <p className="text-xs text-stone-500 mb-2 font-semibold">原文：</p>
              <p className="text-4xl text-center font-serif leading-relaxed" dir={language === Language.HEBREW ? 'rtl' : 'ltr'}>
                {sentence.original}
              </p>
            </div>

            {/* Transliteration */}
            <div className="bg-stone-50 rounded-xl p-6 border-2 border-stone-200">
              <p className="text-xs text-stone-500 mb-2 font-semibold">發音指南：</p>
              <p className="text-2xl text-center text-stone-700 font-mono leading-relaxed">
                {sentence.transliteration}
              </p>
            </div>

            {/* English Translation */}
            <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
              <p className="text-xs text-stone-500 mb-2 font-semibold">英文翻譯：</p>
              <p className="text-lg text-center text-stone-700 italic">
                "{sentence.english}"
              </p>
            </div>

            {/* Recording Button */}
            <div className="flex flex-col items-center gap-4 pt-4">
              <button
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isEvaluating}
                className={`flex items-center gap-3 px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isRecording
                    ? 'bg-red-600 hover:bg-red-700 text-stone-200 animate-pulse'
                    : 'bg-sky-600 hover:bg-sky-700 text-stone-200'
                }`}
              >
                {isRecording ? (
                  <><Square className="w-6 h-6" /> 停止錄音</>
                ) : (
                  <><Mic className="w-6 h-6" /> 開始錄音</>
                )}
              </button>

              {isEvaluating && (
                <div className="flex items-center gap-2 text-sky-600">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>AI 正在評估您的發音...</span>
                </div>
              )}
            </div>

            {/* Score and Feedback */}
            {score !== null && feedback && (
              <div className={`mt-6 p-6 rounded-xl border-2 ${getScoreBackground(score)} animate-fade-in`}>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span className="text-sm text-stone-600 font-semibold">您的得分：</span>
                  <span className={`text-6xl font-bold ${getScoreColor(score)}`}>
                    {score}
                  </span>
                  <span className="text-2xl text-stone-500">/100</span>
                </div>

                {/* Score Bar */}
                <div className="w-full h-4 bg-stone-200 rounded-full overflow-hidden mb-4">
                  <div
                    className={`h-full transition-all duration-1000 ${
                      score >= 80 ? 'bg-green-600' : score >= 60 ? 'bg-yellow-600' : 'bg-red-600'
                    }`}
                    style={{ width: `${score}%` }}
                  />
                </div>

                <div className="bg-white/50 rounded-lg p-4">
                  <p className="text-sm font-semibold text-stone-700 mb-2">AI 反饋：</p>
                  <p className="text-stone-800 leading-relaxed">{feedback}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {isGenerating && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-12 h-12 text-sky-600 animate-spin mb-4" />
            <p className="text-stone-600">AI 正在生成聖經句子...</p>
          </div>
        )}
      </div>

      {/* Powered by indicator */}
      <div className="mt-4 text-center text-xs text-stone-500">
        Powered by <span className="font-semibold text-blue-600">Multi-AI (GPT-4o/Ollama/Gemini)</span>
      </div>
    </div>
  );
};

export default SentencePractice;
