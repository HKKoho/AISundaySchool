
import React, { useState } from 'react';
import { GeneratedCitations, CitationStyle, NotesBibliographyOutput, AuthorDateOutput } from '../types';
import CopyIcon from './icons/CopyIcon';

interface CitationOutputProps {
  citations: GeneratedCitations | null;
  isLoading: boolean;
  error: string | null;
  style: CitationStyle;
}

const useCopyToClipboard = (): [boolean, (text: string) => void] => {
    const [isCopied, setIsCopied] = useState(false);

    const copy = async (text: string) => {
        if (!navigator?.clipboard) {
            console.warn('Clipboard not supported');
            return;
        }

        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
        } catch (error) {
            console.warn('Copy failed', error);
            setIsCopied(false);
        }
    };

    return [isCopied, copy];
};


const CitationBox: React.FC<{ title: string; content: string }> = ({ title, content }) => {
    const [isCopied, copy] = useCopyToClipboard();
    
    return (
        <div>
            <h3 className="text-lg font-semibold text-cyan-400 mb-2">{title}</h3>
            <div className="relative bg-gray-800 p-4 rounded-md border border-gray-700">
                <p className="text-gray-300 pr-10">{content}</p>
                <button
                    onClick={() => copy(content)}
                    className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white transition-colors duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    aria-label="Copy to clipboard"
                >
                    {isCopied ? (
                        <span className="text-xs text-green-400">Copied!</span>
                    ) : (
                        <CopyIcon className="w-5 h-5" />
                    )}
                </button>
            </div>
        </div>
    );
}

const CitationOutput: React.FC<CitationOutputProps> = ({ citations, isLoading, error, style }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8 bg-gray-800 rounded-lg shadow-inner">
        <svg className="animate-spin h-8 w-8 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="ml-4 text-lg text-gray-300">Generating your citation...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg">
        <h3 className="font-bold">Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!citations) {
    return (
      <div className="text-center p-8 bg-gray-800/50 border-2 border-dashed border-gray-700 rounded-lg">
        <p className="text-gray-500">Your generated citation will appear here.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 shadow-2xl rounded-lg p-6 md:p-8 space-y-6">
      <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
        Your Citation
      </h2>
      {style === CitationStyle.NotesBibliography ? (
        <>
            <CitationBox title="Footnote" content={(citations as NotesBibliographyOutput).footnote} />
            <CitationBox title="Bibliography" content={(citations as NotesBibliographyOutput).bibliography} />
        </>
      ) : (
        <>
            <CitationBox title="In-Text Citation" content={(citations as AuthorDateOutput).inText} />
            <CitationBox title="Reference List" content={(citations as AuthorDateOutput).reference} />
        </>
      )}
    </div>
  );
};

export default CitationOutput;
