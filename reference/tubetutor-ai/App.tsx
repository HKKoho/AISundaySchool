import React, { useState } from 'react';
import { AnalysisResult, AppStatus } from './types';
import { analyzeContent } from './services/geminiService';
import InputSection from './components/InputSection';
import Quiz from './components/Quiz';
import { Lightbulb, AlertCircle, Bookmark, Target, Layers } from 'lucide-react';

export default function App() {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (text: string) => {
    setStatus(AppStatus.PROCESSING);
    setError(null);
    try {
      const data = await analyzeContent(text);
      setResult(data);
      setStatus(AppStatus.COMPLETED);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong. Please check your API key and try again.");
      setStatus(AppStatus.ERROR);
    }
  };

  const handleReset = () => {
    setStatus(AppStatus.IDLE);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
      
      {/* Dynamic Header based on state */}
      <div className={`transition-all duration-500 ${status === AppStatus.COMPLETED ? 'mb-8' : 'mb-12'}`}>
         {/* Logo or small header could go here if persistent */}
      </div>

      {status === AppStatus.IDLE || status === AppStatus.PROCESSING || status === AppStatus.ERROR ? (
        <div className="flex flex-col items-center">
          <InputSection onAnalyze={handleAnalyze} isLoading={status === AppStatus.PROCESSING} />
          
          {status === AppStatus.ERROR && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg max-w-xl text-center animate-pulse">
              {error}
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-5xl mx-auto animate-slideUp pb-20">
           {result && (
             <div className="space-y-8">
                {/* Navigation / Back */}
                <button 
                  onClick={handleReset}
                  className="text-slate-500 hover:text-indigo-600 font-medium flex items-center gap-1 transition-colors"
                >
                  ← Back to Analyzer
                </button>

                {/* Header Section */}
                <header className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                  <div className="uppercase tracking-wide text-indigo-600 font-bold text-sm mb-2">Analysis Report</div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                    {result.title}
                  </h1>
                </header>

                {/* Main Focus Section */}
                <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-blue-500" />
                  <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Target className="w-6 h-6 text-blue-500" />
                    Main Focus
                  </h2>
                  <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-lg">
                    {result.mainFocus}
                  </div>
                </section>

                {/* Grid for Concepts & Ideas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 h-full">
                    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <Lightbulb className="w-6 h-6 text-amber-500" />
                      Relevant Ideas
                    </h2>
                    <ul className="space-y-3">
                      {result.relevantIdeas.map((idea, idx) => (
                        <li key={idx} className="flex gap-3 text-slate-600">
                          <span className="text-amber-500 font-bold">•</span>
                          {idea}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 h-full">
                    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <Layers className="w-6 h-6 text-purple-500" />
                      New Concepts
                    </h2>
                     <ul className="space-y-3">
                      {result.newConcepts.map((concept, idx) => (
                        <li key={idx} className="flex gap-3 text-slate-600">
                          <span className="text-purple-500 font-bold">→</span>
                          {concept}
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                {/* Criticism & Examples Grid */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 h-full relative overflow-hidden">
                     <div className="absolute top-0 left-0 w-1 h-full bg-red-400" />
                    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <AlertCircle className="w-6 h-6 text-red-500" />
                      Main Criticism
                    </h2>
                    <p className="text-slate-600 leading-relaxed italic">
                      "{result.criticism}"
                    </p>
                  </section>

                  <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 h-full relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-400" />
                    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <Bookmark className="w-6 h-6 text-emerald-500" />
                      Main Examples
                    </h2>
                     <ul className="space-y-3">
                      {result.examples.map((ex, idx) => (
                        <li key={idx} className="bg-emerald-50 text-emerald-900 p-3 rounded-lg text-sm border border-emerald-100">
                          {ex}
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                {/* Quiz Section */}
                <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500" />
                  <Quiz questions={result.quiz} onReset={handleReset} />
                </section>
             </div>
           )}
        </div>
      )}

      {/* Footer */}
      <footer className="mt-20 text-center text-slate-400 text-sm pb-8">
        <p>Powered by Google Gemini 2.5 Flash</p>
      </footer>
    </div>
  );
}