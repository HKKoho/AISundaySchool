import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { generateBiblicalQuestion, generateBiblicalQuestionWithTopic } from '../../services/multiProviderQuestionGenerator';
import type { Quest } from '../../types';
import Icon from './Icon';

interface QuestionGeneratorProps {
  onQuestionGenerated: (question: Omit<Quest, 'id' | 'characterImage'>) => void;
  onClose: () => void;
}

const QuestionGenerator: React.FC<QuestionGeneratorProps> = ({ onQuestionGenerated, onClose }) => {
  const { t } = useTranslation('bibleGame');
  const [generationMode, setGenerationMode] = useState<'free' | 'guided'>('guided');
  const [characterName, setCharacterName] = useState('');
  const [topic, setTopic] = useState('');
  const [testament, setTestament] = useState<'old' | 'new' | 'both'>('both');
  const [customPrompt, setCustomPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedQuestion, setGeneratedQuestion] = useState<Omit<Quest, 'id' | 'characterImage'> | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    setGeneratedQuestion(null);

    try {
      let question: Omit<Quest, 'id' | 'characterImage'>;

      if (generationMode === 'free') {
        if (!customPrompt.trim()) {
          throw new Error(t('questionGenerator.errorPromptRequired'));
        }
        question = await generateBiblicalQuestion(customPrompt);
      } else {
        question = await generateBiblicalQuestionWithTopic(
          characterName.trim() || undefined,
          topic.trim() || undefined,
          testament
        );
      }

      setGeneratedQuestion(question);
    } catch (err) {
      console.error('Question generation error:', err);
      setError(err instanceof Error ? err.message : t('questionGenerator.errorGeneration'));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveQuestion = () => {
    if (generatedQuestion) {
      onQuestionGenerated(generatedQuestion);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div
        className="bg-cover bg-center rounded-lg shadow-2xl w-full max-w-4xl border-4 border-amber-900 text-stone-900 p-6 relative max-h-[90vh] overflow-y-auto"
        style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/old-paper.png')"}}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-600 hover:text-stone-900 transition-colors rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 z-10"
          aria-label={t('questionGenerator.closeLabel')}
        >
          <Icon name="x" className="w-8 h-8"/>
        </button>

        <h2 className="text-3xl font-bold text-amber-900 mb-2">{t('questionGenerator.title')}</h2>
        <p className="text-stone-700 mb-2">{t('questionGenerator.subtitle')}</p>
        <p className="text-xs text-stone-500 mb-4 flex items-center gap-2">
          <span>⚡ {t('questionGenerator.poweredBy')}</span>
          <span className="font-semibold text-blue-600">{t('questionGenerator.modelName')}</span>
        </p>

        {/* Mode Selection */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-amber-900 mb-2">{t('questionGenerator.modeLabel')}</label>
          <div className="flex gap-3">
            <button
              onClick={() => setGenerationMode('guided')}
              className={`flex-1 px-4 py-3 rounded-lg font-semibold transition ${
                generationMode === 'guided'
                  ? 'bg-amber-800 text-white'
                  : 'bg-stone-300 text-stone-700 hover:bg-stone-400'
              }`}
            >
              {t('questionGenerator.guidedMode')}
            </button>
            <button
              onClick={() => setGenerationMode('free')}
              className={`flex-1 px-4 py-3 rounded-lg font-semibold transition ${
                generationMode === 'free'
                  ? 'bg-amber-800 text-white'
                  : 'bg-stone-300 text-stone-700 hover:bg-stone-400'
              }`}
            >
              {t('questionGenerator.freeMode')}
            </button>
          </div>
        </div>

        {/* Guided Mode */}
        {generationMode === 'guided' && (
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-amber-900 mb-2">
                {t('questionGenerator.characterLabel')}
              </label>
              <input
                type="text"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
                placeholder={t('questionGenerator.characterPlaceholder')}
                className="w-full px-4 py-2 rounded-lg border-2 border-amber-700 bg-amber-50 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-amber-900 mb-2">
                {t('questionGenerator.topicLabel')}
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={t('questionGenerator.topicPlaceholder')}
                className="w-full px-4 py-2 rounded-lg border-2 border-amber-700 bg-amber-50 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-amber-900 mb-2">{t('questionGenerator.scopeLabel')}</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setTestament('both')}
                  className={`flex-1 px-4 py-2 rounded-lg font-semibold transition ${
                    testament === 'both'
                      ? 'bg-amber-700 text-white'
                      : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                  }`}
                >
                  {t('questionGenerator.scopeBoth')}
                </button>
                <button
                  onClick={() => setTestament('old')}
                  className={`flex-1 px-4 py-2 rounded-lg font-semibold transition ${
                    testament === 'old'
                      ? 'bg-amber-700 text-white'
                      : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                  }`}
                >
                  {t('questionGenerator.scopeOld')}
                </button>
                <button
                  onClick={() => setTestament('new')}
                  className={`flex-1 px-4 py-2 rounded-lg font-semibold transition ${
                    testament === 'new'
                      ? 'bg-amber-700 text-white'
                      : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                  }`}
                >
                  {t('questionGenerator.scopeNew')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Free Mode */}
        {generationMode === 'free' && (
          <div className="mb-6">
            <label className="block text-sm font-semibold text-amber-900 mb-2">
              {t('questionGenerator.customPromptLabel')}
            </label>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder={t('questionGenerator.customPromptPlaceholder')}
              rows={4}
              className="w-full px-4 py-2 rounded-lg border-2 border-amber-700 bg-amber-50 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
            />
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border-2 border-red-400 rounded-lg">
            <p className="text-red-800 font-semibold">{error}</p>
          </div>
        )}

        {/* Generated Question Preview */}
        {generatedQuestion && (
          <div className="mb-6 p-4 bg-green-50 border-2 border-green-400 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-green-900">✓ {t('questionGenerator.questionGenerated')}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                generatedQuestion.category === 'Person in Bible'
                  ? 'bg-blue-600 text-white'
                  : 'bg-purple-600 text-white'
              }`}>
                {generatedQuestion.category === 'Person in Bible' ? `📖 ${t('questionGenerator.categoryPerson')}` : `🏛️ ${t('questionGenerator.categoryContext')}`}
              </span>
            </div>
            <p className="text-sm text-green-800 mb-2">
              <strong>{t('questionGenerator.characterField')}</strong>{generatedQuestion.character}
            </p>
            <p className="text-sm text-green-800 mb-2">
              <strong>{t('questionGenerator.questionField')}</strong>{generatedQuestion.question}
            </p>
            <p className="text-xs text-green-700">{t('questionGenerator.savePrompt')}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className={`flex-1 px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 ${
              isGenerating
                ? 'bg-stone-400 text-stone-200 cursor-not-allowed'
                : 'bg-amber-700 hover:bg-amber-600 text-white'
            }`}
          >
            {isGenerating ? (
              <>
                <Icon name="loader" className="w-5 h-5 animate-spin"/>
                {t('questionGenerator.generating')}
              </>
            ) : (
              <>
                <Icon name="sparkles" className="w-5 h-5"/>
                {t('questionGenerator.generateButton')}
              </>
            )}
          </button>

          {generatedQuestion && (
            <button
              onClick={handleSaveQuestion}
              className="flex-1 px-6 py-3 bg-green-700 hover:bg-green-600 text-white rounded-lg font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Icon name="check" className="w-5 h-5"/>
              {t('questionGenerator.saveButton')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionGenerator;
