
import React from 'react';
import { useTranslation } from 'react-i18next';
import { HistoryItem } from '../types';

interface HistoryTrackerProps {
  history: HistoryItem[];
  onHistoryItemClick: (item: HistoryItem) => void;
}

export const HistoryTracker: React.FC<HistoryTrackerProps> = ({ history, onHistoryItemClick }) => {
  const { t } = useTranslation();

  return (
    <div className="card history-tracker">
      <h2>{t('history_title')}</h2>
      {history.length === 0 ? (
        <p>No history yet.</p>
      ) : (
        <ul>
          {history.map(item => (
            <li key={item.id} onClick={() => onHistoryItemClick(item)}>
              <strong>{`${item.reference.book} ${item.reference.chapter}:${item.reference.verse}`}</strong>
              <span> - {t(item.feature.replace(/-/g, '_') as any)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
