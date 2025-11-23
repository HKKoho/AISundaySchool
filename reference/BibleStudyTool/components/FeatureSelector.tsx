
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Feature } from '../types';

interface FeatureSelectorProps {
  selectedFeature: Feature;
  onFeatureChange: (feature: Feature) => void;
}

const features: { id: Feature; labelKey: string }[] = [
  { id: 'summary', labelKey: 'summary' },
  { id: 'explanation', labelKey: 'explanation' },
  { id: 'cross-references', labelKey: 'cross_references' },
  { id: 'original-language', labelKey: 'original_language' },
  { id: 'historical-context', labelKey: 'historical_context' },
  { id: 'character-analysis', labelKey: 'character_analysis' },
  { id: 'theological-insights', labelKey: 'theological_insights' },
  { id: 'personal-application', labelKey: 'personal_application' },
];

export const FeatureSelector: React.FC<FeatureSelectorProps> = ({ selectedFeature, onFeatureChange }) => {
  const { t } = useTranslation();

  return (
    <div className="card">
      <h2>{t('feature_selector_title')}</h2>
      <div className="feature-grid">
        {features.map(({ id, labelKey }) => (
          <button
            key={id}
            className={`feature-button ${selectedFeature === id ? 'selected' : ''}`}
            onClick={() => onFeatureChange(id)}
          >
            {t(labelKey)}
          </button>
        ))}
      </div>
    </div>
  );
};
