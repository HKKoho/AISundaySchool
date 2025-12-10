import React, { useState } from 'react';
import { Youtube, FileText, Sparkles } from 'lucide-react';

interface InputSectionProps {
  onAnalyze: (text: string) => void;
  isLoading: boolean;
}

const DEMO_TRANSCRIPT = `The study of black holes has revolutionized our understanding of the universe. A black hole is a region of spacetime where gravity is so strong that nothing, including light and other electromagnetic waves, has enough energy to escape it. The theory of general relativity predicts that a sufficiently compact mass can deform spacetime to form a black hole. The boundary of no escape is called the event horizon. Although it has a great effect on the fate and circumstances of an object crossing it, it has no locally detectable features according to general relativity. In many ways, a black hole acts like an ideal black body, as it reflects no light. Moreover, quantum field theory in curved spacetime predicts that event horizons emit Hawking radiation, with the same spectrum as a black body of a temperature inversely proportional to its mass. This temperature is on the order of billionths of a kelvin for stellar black holes, making it essentially impossible to observe directly.`;

const InputSection: React.FC<InputSectionProps> = ({ onAnalyze, isLoading }) => {
  const [url, setUrl] = useState('');
  const [transcript, setTranscript] = useState('');
  const [mode, setMode] = useState<'url' | 'text'>('text');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    
    // In a real server-side app, we would fetch the transcript from the URL here.
    // For this client-side SPA, we focus on the transcript text directly.
    onAnalyze(transcript);
  };

  const handleDemo = () => {
    setTranscript(DEMO_TRANSCRIPT);
    setMode('text');
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
      <div className="bg-indigo-600 p-6 text-white text-center">
        <h1 className="text-3xl font-bold mb-2">TubeTutor AI</h1>
        <p className="text-indigo-100">Turn any educational video into a summary and quiz instantly.</p>
      </div>

      <div className="p-8">
        <div className="flex gap-4 mb-6 justify-center">
          <button
            onClick={() => setMode('text')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              mode === 'text' 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-4 h-4" />
            Paste Transcript
          </button>
           <button
            onClick={() => setMode('url')}
             className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              mode === 'url' 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Youtube className="w-4 h-4" />
            YouTube URL
          </button>
        </div>

        {mode === 'url' ? (
           <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-sm text-amber-800">
             <strong>Note for this Demo:</strong> Direct YouTube transcript extraction requires a backend server due to browser CORS policies. Please switch to the "Paste Transcript" tab or use the Demo button below to test the AI capabilities immediately.
           </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'url' ? (
             <div>
                <label htmlFor="url" className="block text-sm font-medium text-slate-700 mb-2">
                  Video URL
                </label>
                <input
                  type="url"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow"
                  disabled={true} // Disabled for demo clarity
                />
             </div>
          ) : (
             <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="transcript" className="block text-sm font-medium text-slate-700">
                  Video Transcript / Content
                </label>
                <button
                  type="button"
                  onClick={handleDemo}
                  className="text-xs text-indigo-600 font-medium hover:underline"
                >
                  Load Sample Text
                </button>
              </div>
              <textarea
                id="transcript"
                rows={8}
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Paste the video transcript or any educational text here..."
                className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow resize-none text-slate-600 leading-relaxed"
                required
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || (mode === 'text' && !transcript.trim()) || mode === 'url'}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Analyzing Content...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Quiz & Summary
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputSection;
