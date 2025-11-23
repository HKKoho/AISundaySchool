
import React from 'react';
import { useTranslation } from 'react-i18next';

interface UrlDisplayProps {
  urls?: { uri: string; title: string }[];
}

export const UrlDisplay: React.FC<UrlDisplayProps> = ({ urls }) => {
  const { t } = useTranslation();
  if (!urls || urls.length === 0) {
    return null;
  }

  return (
    <div className="sources">
      <h3>{t('sources')}</h3>
      <ul>
        {urls.map((url, index) => (
          <li key={index}>
            <a href={url.uri} target="_blank" rel="noopener noreferrer">
              {url.title || url.uri}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
