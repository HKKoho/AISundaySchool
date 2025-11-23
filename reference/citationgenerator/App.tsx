
import React, { useState, useCallback } from 'react';
import { SourceType, CitationStyle, GeneratedCitations } from './types';
import { SOURCE_TYPES } from './constants';
import Header from './components/Header';
import FindSource from './components/FindSource';
import SourceTypeSelector from './components/SourceTypeSelector';
import CitationForm from './components/CitationForm';
import CitationOutput from './components/CitationOutput';
import { generateCitation, findSourceByUrl } from './services/geminiService';

export default function App() {
  const [sourceType, setSourceType] = useState<SourceType>(SourceType.Book);
  const [citationStyle, setCitationStyle] = useState<CitationStyle>(CitationStyle.NotesBibliography);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [generatedCitations, setGeneratedCitations] = useState<GeneratedCitations | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // New state for Find Source feature
  const [findUrl, setFindUrl] = useState<string>('');
  const [isFindingSource, setIsFindingSource] = useState<boolean>(false);
  const [findSourceError, setFindSourceError] = useState<string | null>(null);

  const handleSourceTypeChange = useCallback((type: SourceType) => {
    setSourceType(type);
    setFormData({});
    setGeneratedCitations(null);
    setError(null);
  }, []);

  const handleFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleStyleChange = useCallback((style: CitationStyle) => {
    setCitationStyle(style);
    setGeneratedCitations(null);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (Object.values(formData).every(val => !val.trim())) {
      setError("Please fill in the source details before generating a citation.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedCitations(null);
    try {
      const result = await generateCitation(sourceType, citationStyle, formData);
      setGeneratedCitations(result);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'Failed to generate citation. Please check your input and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [sourceType, citationStyle, formData]);

  // New handler for Find Source
  const handleFindSource = useCallback(async () => {
    if (!findUrl.trim()) return;
    
    setIsFindingSource(true);
    setFindSourceError(null);
    setError(null);
    setGeneratedCitations(null);
    
    try {
        const result = await findSourceByUrl(findUrl);
        setSourceType(result.sourceType);
        setFormData(result.details);
    } catch (e) {
        console.error(e);
        setFindSourceError(e instanceof Error ? e.message : 'An unknown error occurred.');
        setSourceType(SourceType.Book); // Reset to default
        setFormData({});
    } finally {
        setIsFindingSource(false);
    }
  }, [findUrl]);

  // New handler for URL input change
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFindUrl(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <Header />
        <main className="mt-8">
          <div className="bg-gray-800 shadow-2xl rounded-lg p-6 md:p-8">
            <FindSource
                url={findUrl}
                onUrlChange={handleUrlChange}
                onSubmit={handleFindSource}
                isLoading={isFindingSource}
                error={findSourceError}
            />

            <div className="border-t border-gray-700 my-8"></div>
            
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-cyan-400 mb-4">1. Select Source Type</h2>
              <SourceTypeSelector
                sourceTypes={SOURCE_TYPES}
                selectedType={sourceType}
                onSelect={handleSourceTypeChange}
              />
            </section>

            <div className="border-t border-gray-700 my-8"></div>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-cyan-400 mb-4">2. Enter Source Details</h2>
              <CitationForm
                sourceType={sourceType}
                citationStyle={citationStyle}
                formData={formData}
                onFormChange={handleFormChange}
                onStyleChange={handleStyleChange}
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
            </section>
          </div>

          <div className="mt-8">
            <CitationOutput
              citations={generatedCitations}
              isLoading={isLoading}
              error={error}
              style={citationStyle}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
