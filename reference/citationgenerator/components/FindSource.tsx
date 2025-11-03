
import React from 'react';

interface FindSourceProps {
  url: string;
  onUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  isLoading: boolean;
  error: string | null;
}

const FindSource: React.FC<FindSourceProps> = ({ url, onUrlChange, onSubmit, isLoading, error }) => {
  return (
    <section>
      <h2 className="text-xl sm:text-2xl font-semibold text-cyan-400 mb-4">
        ✨ Auto-fill from a URL
      </h2>
      <p className="text-gray-400 mb-4 text-sm">
        Paste a URL to an article, book, or website, and we'll try to fill in the details for you.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="url"
          value={url}
          onChange={onUrlChange}
          placeholder="https://example.com/article"
          className="flex-grow bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-100 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 transition"
          disabled={isLoading}
          aria-label="Source URL"
        />
        <button
          onClick={onSubmit}
          disabled={isLoading || !url.trim()}
          className="w-full sm:w-auto flex justify-center items-center py-2 px-6 border border-transparent rounded-md shadow-lg text-base font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Finding...
            </>
          ) : (
            'Find Source'
          )}
        </button>
      </div>
      {error && (
         <div className="mt-3 p-3 bg-red-900/50 border border-red-700 text-red-300 rounded-lg text-sm">
            <p>{error}</p>
        </div>
      )}
    </section>
  );
};

export default FindSource;
