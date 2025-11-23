
import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { BibleReference, Feature, AnalysisResult, HistoryItem } from '../types';
import { analyzeText } from '../services/geminiService';
import { ReferenceSelector } from './ReferenceSelector';
import { FeatureSelector } from './FeatureSelector';
import { UrlDisplay } from './UrlDisplay';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { PlayIcon, StopIcon, LoadingIcon } from './icons';

interface GeminiAnalyzerProps {
  onNewHistoryItem: (item: HistoryItem) => void;
}

export const GeminiAnalyzer: React.FC<GeminiAnalyzerProps> = ({ onNewHistoryItem }) => {
  const { t, i18n } = useTranslation();
  const [reference, setReference] = useState<BibleReference>({ book: 'Genesis', chapter: '1', verse: '1' });
  const [feature, setFeature] = useState<Feature>('summary');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const { isPlaying, isLoading: isTtsLoading, play, stop } = useTextToSpeech();

  const handleAnalysis = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const analysisResult = await analyzeText(feature, reference, ['ESV', 'NIV'], i18n.language);
      setResult(analysisResult);
      
      const newHistoryItem: HistoryItem = {
        id: new Date().toISOString(),
        reference,
        feature,
        prompt: `Analyze ${reference.book} ${reference.chapter}:${reference.verse} for ${feature}`,
        result: analysisResult,
        timestamp: new Date().toISOString(),
      };
      onNewHistoryItem(newHistoryItem);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [feature, reference, onNewHistoryItem, i18n.language]);
  
  const handleTextToSpeech = () => {
    if (isPlaying) {
      stop();
    } else if (result?.text) {
      play(result.text);
    }
  };


  return (
    <div className="gemini-analyzer">
      <ReferenceSelector onReferenceChange={setReference} />
      <FeatureSelector selectedFeature={feature} onFeatureChange={setFeature} />
      
      <div className="analyze-button-container">
        <button onClick={handleAnalysis} disabled={isLoading}>
          {isLoading ? t('analyzing') : t('analyze')}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {result && (
        <div className="card result-card">
          <div className="result-header">
            <h2>{t('result_title')}</h2>
            <button onClick={handleTextToSpeech} disabled={isTtsLoading} className="tts-button">
              {isTtsLoading ? <LoadingIcon /> : isPlaying ? <StopIcon /> : <PlayIcon />}
              <span>{isTtsLoading ? t('loading_audio') : isPlaying ? t('stop_audio') : t('play_audio')}</span>
            </button>
          </div>
          <ReactMarkdown>{result.text}</ReactMarkdown>
          <UrlDisplay urls={result.urls} />
        </div>
      )}
    </div>
  );
};