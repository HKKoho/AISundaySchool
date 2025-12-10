import React, { useState } from 'react';
import { Youtube, FileText, Sparkles, BookOpen, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { DEMO_SERMON_TRANSCRIPT } from '../../services/youtubeAnalysisService';

interface YouTubeInputProps {
  onAnalyze: (text: string) => void;
  isLoading: boolean;
}

export const YouTubeInput: React.FC<YouTubeInputProps> = ({ onAnalyze, isLoading }) => {
  const { t, i18n } = useTranslation(['common', 'youtube']);
  const [url, setUrl] = useState('');
  const [transcript, setTranscript] = useState('');
  const [mode, setMode] = useState<'url' | 'text' | 'opal'>('url');
  const [fetchingTranscript, setFetchingTranscript] = useState(false);
  const [transcriptError, setTranscriptError] = useState<string | null>(null);
  const [errorHelpText, setErrorHelpText] = useState<string | null>(null);
  const [analysisMethod, setAnalysisMethod] = useState<'transcript' | 'video-analysis' | null>(null);

  // Check if current language is Chinese
  const isChineseMode = i18n.language === 'zh-TW' || i18n.language === 'zh';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || fetchingTranscript) return;

    setTranscriptError(null);

    if (mode === 'url') {
      // Fetch transcript from YouTube URL via backend API
      setFetchingTranscript(true);
      try {
        const response = await fetch('/api/youtube-transcript', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url }),
        });

        const data = await response.json();

        if (!response.ok) {
          setErrorHelpText(data.helpText || null);
          throw new Error(data.error || 'Failed to fetch transcript');
        }

        setErrorHelpText(null);

        // Store the method used for user feedback
        setAnalysisMethod(data.method || 'transcript');

        // Successfully fetched transcript or video analysis, now analyze it
        onAnalyze(data.transcript);
      } catch (err: any) {
        console.error('Transcript fetch error:', err);
        setTranscriptError(err.message || 'Failed to fetch transcript');
      } finally {
        setFetchingTranscript(false);
      }
    } else {
      // Use pasted transcript directly
      onAnalyze(transcript);
    }
  };

  const handleDemo = () => {
    setTranscript(DEMO_SERMON_TRANSCRIPT);
    setMode('text');
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
      <div className="bg-red-600 p-6 text-white text-center">
        <div className="flex justify-center mb-3">
          <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
            <BookOpen className="w-8 h-8" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2">
          {t('navigation.youtubeLearning', 'Quick Learning from Videos in YouTube')}
        </h1>
        <p className="text-red-100">
          {t('youtube:subtitle', 'Turn biblical teachings into summaries and quizzes instantly')}
        </p>
      </div>

      <div className="p-8">
        <div className="flex gap-4 mb-6 justify-center flex-wrap">
          <button
            onClick={() => setMode('url')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              mode === 'url'
                ? 'bg-red-100 text-red-700'
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Youtube className="w-4 h-4" />
            {t('youtube:youtubeUrl', 'YouTube URL')}
          </button>
          <button
            onClick={() => setMode('text')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              mode === 'text'
                ? 'bg-red-100 text-red-700'
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-4 h-4" />
            {t('youtube:pasteTranscript', 'Paste Transcript')}
          </button>
          <button
            onClick={() => setMode('opal')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              mode === 'opal'
                ? 'bg-red-100 text-red-700'
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <ExternalLink className="w-4 h-4" />
            {t('youtube:opalEmbed', 'Opal Embed')}
          </button>
        </div>

        {transcriptError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-sm text-red-800">
            <strong>{t('youtube:error', 'Error')}:</strong> {transcriptError}
            {errorHelpText && (
              <div className="mt-2 pt-2 border-t border-red-300 text-red-700">
                <strong>{t('youtube:howToFix', 'How to fix')}:</strong> {errorHelpText}
              </div>
            )}
          </div>
        )}

        {analysisMethod === 'video-analysis' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-sm text-blue-800">
            <strong>{t('youtube:info', 'Info')}:</strong> {t('youtube:videoAnalysisUsed', 'This video had no transcript, so we used AI video analysis to extract the content. This may take a bit longer but provides comprehensive analysis.')}
          </div>
        )}

        {mode === 'opal' ? (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
              <strong>{t('youtube:info', 'Info')}:</strong> {t('youtube:opalEmbedInfo', 'This Opal app provides interactive YouTube learning experience. Use it to explore biblical teachings from YouTube videos.')}
            </div>

            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border-2 border-red-200 shadow-lg">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 bg-white rounded-full shadow-md">
                    <ExternalLink className="w-12 h-12 text-red-600" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-800">
                  {t('youtube:opalAppTitle', 'Interactive YouTube Learning')}
                </h3>

                <p className="text-slate-600 max-w-md mx-auto">
                  {t('youtube:opalAppDescription', 'Due to security restrictions, the Opal app opens in a new tab where you can interact with YouTube videos and extract biblical teachings.')}
                </p>

                <a
                  href="https://opal.google/?flow=drive:/1bKYzqve-9MHL9X7N4GKDhw1EwS-An49W&shared&mode=app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-red-200 transition-all transform hover:scale-105"
                >
                  <ExternalLink className="w-6 h-6" />
                  {t('youtube:launchOpalApp', 'Launch Opal Learning Tool')}
                </a>

                <div className="pt-4 border-t border-red-200 mt-6">
                  <p className="text-sm text-slate-500">
                    {t('youtube:opalAppNote', 'The app will open in a new browser tab with full functionality.')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'url' ? (
               <div className="space-y-4">
                  <div>
                    <label htmlFor="url" className="block text-sm font-medium text-slate-700 mb-2">
                      {t('youtube:videoUrl', 'Video URL')}
                    </label>
                    <input
                      type="url"
                      id="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-shadow"
                      required
                    />
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <p className="text-sm font-medium text-slate-700 mb-3">
                      {t('youtube:tryTheseExamples', 'Try these example videos:')}
                    </p>
                    <div className="space-y-2">
                      {isChineseMode ? (
                        // Traditional Chinese Examples - Using Bible Project videos with auto-transcripts
                        <>
                          <button
                            type="button"
                            onClick={() => setUrl('https://www.youtube.com/watch?v=GQI72THyO5I')}
                            className="w-full text-left px-3 py-2 bg-white hover:bg-red-50 border border-slate-200 hover:border-red-300 rounded-lg text-sm text-slate-700 hover:text-red-700 transition-colors"
                          >
                            <div className="font-medium">{t('youtube:example1Title', 'Bible Project - 創世記 1-11 章')}</div>
                            <div className="text-xs text-slate-500">{t('youtube:example1Desc', '聖經概覽動畫（含自動字幕）')}</div>
                          </button>

                          <button
                            type="button"
                            onClick={() => setUrl('https://www.youtube.com/watch?v=ej_6dVdJSIZ')}
                            className="w-full text-left px-3 py-2 bg-white hover:bg-red-50 border border-slate-200 hover:border-red-300 rounded-lg text-sm text-slate-700 hover:text-red-700 transition-colors"
                          >
                            <div className="font-medium">{t('youtube:example2Title', 'Bible Project - 福音書概覽')}</div>
                            <div className="text-xs text-slate-500">{t('youtube:example2Desc', '馬太、馬可、路加、約翰福音')}</div>
                          </button>

                          <button
                            type="button"
                            onClick={() => setUrl('https://www.youtube.com/watch?v=ak06MSETeo4')}
                            className="w-full text-left px-3 py-2 bg-white hover:bg-red-50 border border-slate-200 hover:border-red-300 rounded-lg text-sm text-slate-700 hover:text-red-700 transition-colors"
                          >
                            <div className="font-medium">{t('youtube:example3Title', 'Bible Project - 聖經是什麼？')}</div>
                            <div className="text-xs text-slate-500">{t('youtube:example3Desc', '聖經整體架構介紹')}</div>
                          </button>
                        </>
                      ) : (
                        // English Examples
                        <>
                          <button
                            type="button"
                            onClick={() => setUrl('https://www.youtube.com/watch?v=ak06MSETeo4')}
                            className="w-full text-left px-3 py-2 bg-white hover:bg-red-50 border border-slate-200 hover:border-red-300 rounded-lg text-sm text-slate-700 hover:text-red-700 transition-colors"
                          >
                            <div className="font-medium">The Bible Project - What is the Bible?</div>
                            <div className="text-xs text-slate-500">Educational overview of the Bible</div>
                          </button>

                          <button
                            type="button"
                            onClick={() => setUrl('https://www.youtube.com/watch?v=GswSg2ohqmA')}
                            className="w-full text-left px-3 py-2 bg-white hover:bg-red-50 border border-slate-200 hover:border-red-300 rounded-lg text-sm text-slate-700 hover:text-red-700 transition-colors"
                          >
                            <div className="font-medium">Wisdom Literature Overview</div>
                            <div className="text-xs text-slate-500">Proverbs, Ecclesiastes & Job explained</div>
                          </button>

                          <button
                            type="button"
                            onClick={() => setUrl('https://www.youtube.com/watch?v=8jPQjjsBbIc')}
                            className="w-full text-left px-3 py-2 bg-white hover:bg-red-50 border border-slate-200 hover:border-red-300 rounded-lg text-sm text-slate-700 hover:text-red-700 transition-colors"
                          >
                            <div className="font-medium">TED Talk - How to Stay Calm</div>
                            <div className="text-xs text-slate-500">Life lessons and decision-making</div>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
               </div>
            ) : (
               <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="transcript" className="block text-sm font-medium text-slate-700">
                    {t('youtube:transcriptLabel', 'Video Transcript / Sermon Content')}
                  </label>
                  <button
                    type="button"
                    onClick={handleDemo}
                    className="text-xs text-red-600 font-medium hover:underline"
                  >
                    {t('youtube:loadSample', 'Load Sample Sermon')}
                  </button>
                </div>
                <textarea
                  id="transcript"
                  rows={8}
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  placeholder={t('youtube:transcriptPlaceholder', 'Paste the sermon transcript or biblical teaching text here...')}
                  className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-shadow resize-none text-slate-600 leading-relaxed"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || fetchingTranscript || (mode === 'text' && !transcript.trim()) || (mode === 'url' && !url.trim())}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg shadow-red-200 transition-all flex items-center justify-center gap-3"
            >
            {fetchingTranscript ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {analysisMethod === 'video-analysis'
                  ? t('youtube:analyzingVideo', 'Analyzing Video...')
                  : t('youtube:fetchingTranscript', 'Fetching Transcript...')}
              </>
            ) : isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {t('youtube:analyzing', 'Analyzing Content...')}
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                {t('youtube:generateButton', 'Generate Quiz & Summary')}
              </>
            )}
          </button>
        </form>
      )}
      </div>
    </div>
  );
};
