import React, { useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import type { VocabularyCard } from '../../language/vocabularyData';
import { getVocabularyPronunciationFeedback, scoreToQuality, type PronunciationFeedback } from '../../services/vocabularyPronunciation';

interface FlashCardProps {
  card: VocabularyCard;
  onRate: (quality: 'again' | 'hard' | 'good' | 'easy', pronunciationScore?: number) => void;
  showRating?: boolean;
}

type RecordingState = 'idle' | 'recording' | 'processing' | 'feedback';

const FlashCard: React.FC<FlashCardProps> = ({ card, onRate, showRating = true }) => {
  const { t } = useTranslation('language');
  const [isFlipped, setIsFlipped] = useState(false);
  const [recordingState, setRecordingState] = useState<RecordingState>('idle');
  const [pronunciationFeedback, setPronunciationFeedback] = useState<PronunciationFeedback | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result !== 'string') {
          return reject(new Error('File could not be read as a string.'));
        }
        const base64String = reader.result;
        const base64Data = base64String.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handleFlip = () => {
    if (recordingState === 'idle') {
      setIsFlipped(!isFlipped);
    }
  };

  const handleRating = (quality: 'again' | 'hard' | 'good' | 'easy') => {
    const score = pronunciationFeedback?.score;
    onRate(quality, score);
    setIsFlipped(false); // Reset for next card
    setRecordingState('idle');
    setPronunciationFeedback(null);
  };

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setPronunciationFeedback(null);
      setRecordingState('recording');

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      recorder.onstop = async () => {
        setRecordingState('processing');
        const audioBlob = new Blob(audioChunksRef.current, { type: recorder.mimeType });

        try {
          const base64Audio = await blobToBase64(audioBlob);
          const feedback = await getVocabularyPronunciationFeedback(
            card,
            base64Audio,
            recorder.mimeType
          );
          setPronunciationFeedback(feedback);
          setRecordingState('feedback');
        } catch (error) {
          console.error('Error getting pronunciation feedback:', error);
          setPronunciationFeedback({
            isCorrect: false,
            score: 0,
            feedback: t('vocabulary.analysisError')
          });
          setRecordingState('feedback');
        }

        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert(t('vocabulary.micPermissionError'));
      setRecordingState('idle');
    }
  }, [card, t]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  }, []);

  const handleRecordClick = () => {
    if (recordingState === 'recording') {
      stopRecording();
    } else if (recordingState === 'idle') {
      startRecording();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Flashcard Container */}
      <div
        className="relative w-full h-96 cursor-pointer"
        style={{ perspective: '1000px' }}
        onClick={handleFlip}
      >
        <div
          className="relative w-full h-full transition-transform duration-500"
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          {/* Front of Card */}
          <div
            className={`absolute w-full h-full bg-gradient-to-br from-amber-50 to-amber-100 border-4 border-amber-600 rounded-2xl shadow-2xl flex flex-col items-center justify-center p-8 ${
              isFlipped ? 'invisible' : 'visible'
            }`}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="text-center space-y-6">
              {/* Language Badge */}
              <div className="flex justify-center">
                <span
                  className={`px-4 py-1 rounded-full text-sm font-semibold ${
                    card.language === 'Hebrew'
                      ? 'bg-blue-600 text-white'
                      : 'bg-green-600 text-white'
                  }`}
                >
                  {card.language}
                </span>
              </div>

              {/* Original Word */}
              <div
                className={`text-6xl font-bold ${
                  card.language === 'Hebrew' ? 'font-hebrew' : 'font-greek'
                }`}
                dir={card.language === 'Hebrew' ? 'rtl' : 'ltr'}
              >
                {card.word}
              </div>

              {/* Transliteration */}
              <div className="text-2xl text-gray-600 italic">
                {card.transliteration}
              </div>

              {/* Part of Speech */}
              <div className="text-sm text-gray-500 uppercase tracking-wider">
                {card.partOfSpeech}
              </div>

              {/* Pronunciation Section */}
              <div className="pt-8 border-t border-amber-300 w-full">
                <div className="text-sm text-amber-700 font-semibold mb-3">
                  {t('vocabulary.pronunciationPractice')}
                </div>

                {/* Record Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRecordClick();
                  }}
                  disabled={recordingState === 'processing'}
                  className={`w-full py-3 rounded-lg font-bold transition-all ${
                    recordingState === 'recording'
                      ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                      : recordingState === 'processing'
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  {recordingState === 'recording' && `🎤 ${t('vocabulary.recordingNow')}`}
                  {recordingState === 'processing' && `⏳ ${t('vocabulary.aiAnalyzing')}`}
                  {recordingState === 'idle' && `🎤 ${t('vocabulary.startRecording')}`}
                  {recordingState === 'feedback' && `🎤 ${t('vocabulary.tryAgain')}`}
                </button>

                {/* Pronunciation Feedback */}
                {pronunciationFeedback && recordingState === 'feedback' && (
                  <div
                    className={`mt-4 p-4 rounded-lg border-2 ${
                      pronunciationFeedback.isCorrect
                        ? 'bg-green-50 border-green-400'
                        : 'bg-orange-50 border-orange-400'
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-bold">
                        {pronunciationFeedback.isCorrect ? `✅ ${t('vocabulary.veryGood')}` : `📝 ${t('vocabulary.needsImprovement')}`}
                      </span>
                      <span className="text-2xl font-bold text-gray-700">
                        {pronunciationFeedback.score}/100
                      </span>
                    </div>
                    <div className="text-sm text-gray-700 mb-2">
                      {pronunciationFeedback.feedback}
                    </div>
                    {pronunciationFeedback.suggestions && (
                      <div className="text-xs text-gray-600 bg-amber-50/50 p-2 rounded mt-2">
                        💡 {pronunciationFeedback.suggestions}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Tap to Reveal Hint */}
              <div className="pt-4 text-amber-600 text-xs">
                {recordingState === 'idle' && t('vocabulary.tapToReveal')}
                {recordingState === 'feedback' && t('vocabulary.afterRecording')}
              </div>
            </div>
          </div>

          {/* Back of Card */}
          <div
            className={`absolute w-full h-full bg-gradient-to-br from-indigo-50 to-indigo-100 border-4 border-indigo-600 rounded-2xl shadow-2xl flex flex-col p-6 overflow-y-auto ${
              isFlipped ? 'visible' : 'invisible'
            }`}
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            {/* Original Word (smaller, at top) */}
            <div className="text-center mb-4">
              <div
                className={`text-3xl font-bold mb-2 ${
                  card.language === 'Hebrew' ? 'font-hebrew' : 'font-greek'
                }`}
                dir={card.language === 'Hebrew' ? 'rtl' : 'ltr'}
              >
                {card.word}
              </div>
              <div className="text-lg text-gray-600 italic">
                {card.transliteration}
              </div>
            </div>

            {/* Meanings */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                {t('vocabulary.meanings')}
              </h3>
              <div className="space-y-1">
                {card.meanings.map((meaning, idx) => (
                  <div key={idx} className="text-lg">
                    • {meaning}
                  </div>
                ))}
              </div>
            </div>

            {/* Grammatical Notes */}
            {card.grammaticalNotes && (
              <div className="mb-4 bg-amber-50/50 p-3 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                  {t('vocabulary.grammaticalNotes')}
                </h3>
                <p className="text-sm text-gray-700">{card.grammaticalNotes}</p>
              </div>
            )}

            {/* Example */}
            {card.examples.length > 0 && (
              <div className="mb-4 bg-amber-50/50 p-3 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                  {t('vocabulary.bibleExample')}
                </h3>
                <div className="space-y-2">
                  <div className="text-xs text-amber-700 font-semibold">
                    {card.examples[0].reference}
                  </div>
                  <div
                    className={`text-base ${
                      card.language === 'Hebrew' ? 'font-hebrew' : 'font-greek'
                    }`}
                    dir={card.language === 'Hebrew' ? 'rtl' : 'ltr'}
                  >
                    {card.examples[0].text}
                  </div>
                  <div className="text-sm text-gray-600 italic">
                    {card.examples[0].translation}
                  </div>
                </div>
              </div>
            )}

            {/* Frequency & Chapter */}
            <div className="flex justify-between text-xs text-gray-500 mt-auto pt-2">
              <span>{t('vocabulary.frequency')}: {card.frequency}{t('vocabulary.times')}</span>
              <span>{t('vocabulary.chapter')}: {card.chapter}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rating Buttons (only show when flipped) */}
      {showRating && isFlipped && (
        <div className="mt-6 grid grid-cols-4 gap-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRating('again');
            }}
            className="flex flex-col items-center justify-center p-4 bg-red-100 hover:bg-red-200 border-2 border-red-400 rounded-lg transition-colors"
          >
            <span className="text-2xl mb-1">😰</span>
            <span className="text-sm font-semibold text-red-700">{t('vocabulary.again')}</span>
            <span className="text-xs text-red-600">{t('vocabulary.lessThan1Day')}</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRating('hard');
            }}
            className="flex flex-col items-center justify-center p-4 bg-orange-100 hover:bg-orange-200 border-2 border-orange-400 rounded-lg transition-colors"
          >
            <span className="text-2xl mb-1">😅</span>
            <span className="text-sm font-semibold text-orange-700">{t('vocabulary.hard')}</span>
            <span className="text-xs text-orange-600">{t('vocabulary.days3')}</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRating('good');
            }}
            className="flex flex-col items-center justify-center p-4 bg-green-100 hover:bg-green-200 border-2 border-green-400 rounded-lg transition-colors"
          >
            <span className="text-2xl mb-1">😊</span>
            <span className="text-sm font-semibold text-green-700">{t('vocabulary.good')}</span>
            <span className="text-xs text-green-600">{t('vocabulary.days7')}</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRating('easy');
            }}
            className="flex flex-col items-center justify-center p-4 bg-blue-100 hover:bg-blue-200 border-2 border-blue-400 rounded-lg transition-colors"
          >
            <span className="text-2xl mb-1">😎</span>
            <span className="text-sm font-semibold text-blue-700">{t('vocabulary.easy')}</span>
            <span className="text-xs text-blue-600">{t('vocabulary.days14')}</span>
          </button>
        </div>
      )}

      {/* Instructions (only show when not flipped) */}
      {!isFlipped && recordingState === 'idle' && (
        <div className="mt-4 text-center text-gray-500 text-sm">
          {t('vocabulary.practiceFirst')}
        </div>
      )}
      {!isFlipped && recordingState === 'feedback' && pronunciationFeedback && (
        <div className="mt-4 text-center space-y-2">
          <div className="text-sm text-gray-600">
            {t('vocabulary.pronunciationScore')}: <span className="font-bold text-lg">{pronunciationFeedback.score}/100</span>
          </div>
          <div className="text-xs text-gray-500">
            {t('vocabulary.flipToRate')}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashCard;
