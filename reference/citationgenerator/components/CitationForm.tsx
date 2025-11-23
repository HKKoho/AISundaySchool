
import React from 'react';
import { SourceType, CitationStyle } from '../types';
import { FORM_FIELDS } from '../constants';

interface CitationFormProps {
  sourceType: SourceType;
  citationStyle: CitationStyle;
  formData: Record<string, string>;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStyleChange: (style: CitationStyle) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const CitationForm: React.FC<CitationFormProps> = ({
  sourceType,
  citationStyle,
  formData,
  onFormChange,
  onStyleChange,
  onSubmit,
  isLoading,
}) => {
  const fields = FORM_FIELDS[sourceType];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        {fields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-300 mb-1">
              {field.label}
            </label>
            <input
              type="text"
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={onFormChange}
              placeholder={field.placeholder}
              className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-100 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 transition"
            />
          </div>
        ))}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Citation Format</label>
        <div className="flex gap-4 bg-gray-700 p-1 rounded-lg">
           <button 
                onClick={() => onStyleChange(CitationStyle.NotesBibliography)}
                className={`w-1/2 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${citationStyle === CitationStyle.NotesBibliography ? 'bg-cyan-500 text-white' : 'text-gray-300 hover:bg-gray-600'}`}
            >
                Notes & Bibliography
            </button>
            <button 
                onClick={() => onStyleChange(CitationStyle.AuthorDate)}
                className={`w-1/2 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${citationStyle === CitationStyle.AuthorDate ? 'bg-cyan-500 text-white' : 'text-gray-300 hover:bg-gray-600'}`}
            >
                Author-Date
            </button>
        </div>
      </div>

      <div className="pt-4">
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-lg text-base font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            'Generate Citation'
          )}
        </button>
      </div>
    </div>
  );
};

export default CitationForm;
