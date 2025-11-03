
import React from 'react';
import { SourceType } from '../types';

interface SourceTypeSelectorProps {
  sourceTypes: SourceType[];
  selectedType: SourceType;
  onSelect: (type: SourceType) => void;
}

const SourceTypeSelector: React.FC<SourceTypeSelectorProps> = ({ sourceTypes, selectedType, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-3">
      {sourceTypes.map((type) => (
        <button
          key={type}
          onClick={() => onSelect(type)}
          className={`px-4 py-2 text-sm sm:text-base font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500 ${
            selectedType === type
              ? 'bg-cyan-500 text-white shadow-lg'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default SourceTypeSelector;
