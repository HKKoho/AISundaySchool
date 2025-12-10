import React, { useState, useCallback } from 'react';
import { GeneratedImage, AspectRatio } from './types';
import { generateImageFromText } from './services/geminiService';
import AspectRatioSelector from './components/AspectRatioSelector';
import HistoryRail from './components/HistoryRail';

// Icons
const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
  </svg>
);

const PhotoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-slate-600">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>
);

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M12 12.75l0-9.75m0 9.75L8.25 9M12 12.75l3.75-3.75" />
  </svg>
);

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<GeneratedImage[]>([]);
  const [currentImage, setCurrentImage] = useState<GeneratedImage | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setError(null);

    try {
      const imageUrl = await generateImageFromText(prompt, aspectRatio);
      
      const newImage: GeneratedImage = {
        id: crypto.randomUUID(),
        imageUrl,
        prompt: prompt.trim(),
        aspectRatio,
        timestamp: Date.now(),
      };

      setCurrentImage(newImage);
      setHistory(prev => [newImage, ...prev]);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, [prompt, aspectRatio]);

  const handleDownload = useCallback(() => {
    if (!currentImage) return;
    const link = document.createElement('a');
    link.href = currentImage.imageUrl;
    link.download = `gemini-gen-${currentImage.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [currentImage]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 selection:bg-indigo-500/30">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 flex flex-col md:flex-row gap-8 min-h-[calc(100vh-4rem)]">
        
        {/* Left Panel: Controls */}
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 flex items-center gap-2">
              <SparklesIcon />
              Gemini Vision
            </h1>
            <p className="text-slate-400 text-sm">
              Transform your imagination into reality with the Gemini 2.5 Flash Image model.
            </p>
          </div>

          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm shadow-xl flex-1 flex flex-col">
            <div className="space-y-4">
              
              {/* Prompt Input */}
              <div className="space-y-2">
                <label htmlFor="prompt" className="text-sm font-medium text-slate-300">
                  Prompt
                </label>
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="A futuristic city with flying cars, neon lights, cyberpunk style..."
                  className="w-full h-32 bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none transition-all text-sm leading-relaxed"
                  disabled={loading}
                />
              </div>

              {/* Aspect Ratio */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                  Aspect Ratio
                </label>
                <AspectRatioSelector 
                  value={aspectRatio} 
                  onChange={setAspectRatio}
                  disabled={loading}
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={loading || !prompt.trim()}
                className={`
                  w-full py-4 px-6 rounded-xl font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300
                  flex items-center justify-center gap-2 mt-4
                  ${loading || !prompt.trim() 
                    ? 'bg-slate-700 cursor-not-allowed text-slate-400' 
                    : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-500/40 hover:-translate-y-0.5'}
                `}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Dreaming...</span>
                  </>
                ) : (
                  <>
                    <SparklesIcon />
                    <span>Generate Image</span>
                  </>
                )}
              </button>
            </div>
            
            {/* History Rail embedded in left panel for mobile, or distinct on desktop? 
                Actually, putting it at the bottom of the left panel is good. 
            */}
            <div className="mt-auto pt-8">
              <HistoryRail 
                images={history} 
                onSelect={setCurrentImage} 
                selectedId={currentImage?.id}
              />
            </div>
          </div>
        </div>

        {/* Right Panel: Display */}
        <div className="w-full md:w-2/3 flex flex-col">
          <div className="flex-1 bg-slate-950/50 rounded-3xl border border-slate-800 flex items-center justify-center p-4 md:p-8 relative overflow-hidden group">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" 
              style={{ 
                backgroundImage: 'radial-gradient(circle at 2px 2px, #475569 1px, transparent 0)', 
                backgroundSize: '24px 24px' 
              }} 
            />

            {currentImage ? (
              <div className="relative max-w-full max-h-full flex flex-col items-center animate-in fade-in zoom-in duration-500">
                <img
                  src={currentImage.imageUrl}
                  alt={currentImage.prompt}
                  className="max-w-full max-h-[70vh] rounded-xl shadow-2xl shadow-black/50 object-contain"
                />
                <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={handleDownload}
                    className="bg-slate-900/80 hover:bg-black text-white p-3 rounded-full backdrop-blur-md border border-white/10 shadow-lg transition-transform hover:scale-110"
                    title="Download Image"
                  >
                    <DownloadIcon />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4 opacity-50">
                <div className="mx-auto w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center">
                  <PhotoIcon />
                </div>
                <div className="space-y-1">
                  <p className="text-xl font-medium text-slate-300">No image generated yet</p>
                  <p className="text-sm text-slate-500 max-w-xs mx-auto">
                    Enter a descriptive prompt and hit generate to see the magic happen.
                  </p>
                </div>
              </div>
            )}
          </div>
          
          {currentImage && (
             <div className="mt-4 px-2 text-center md:text-left">
                <p className="text-slate-500 text-xs uppercase tracking-wide font-semibold mb-1">Current Prompt</p>
                <p className="text-slate-300 text-sm md:text-base font-light italic leading-relaxed">
                  "{currentImage.prompt}"
                </p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
