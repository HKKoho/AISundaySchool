
import React from 'react';
import type { Perspective } from '../types';
import { BookIcon, TopicIcon } from './icons';
import { useLanguage } from '../contexts';
import { translations } from '../translations';

interface PerspectiveCardProps {
  perspective: Perspective;
  icon: React.ReactNode;
  title: string;
  borderColor: string;
}

const PerspectiveCard: React.FC<PerspectiveCardProps> = ({ perspective, icon, title, borderColor }) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className={`bg-gray-800 p-6 rounded-xl border-t-4 ${borderColor} h-full flex flex-col`}>
      <div className="flex items-center mb-4">
        {icon}
        <div className='ml-4'>
            <h3 className="text-2xl font-bold text-gray-200">{perspective.title}</h3>
            <p className='text-gray-400'>{title}</p>
        </div>
      </div>
      <p className="text-gray-300 mb-5 flex-grow">{perspective.summary}</p>
      
      <div>
        <div className="mb-4">
          <h4 className="font-semibold text-amber-300 flex items-center mb-2">
            <BookIcon className="w-5 h-5 mr-2" />
            {t.keyTexts}
          </h4>
          <ul className="list-none space-y-1">
            {perspective.keyTexts.map((text, index) => (
              <li key={index} className="text-gray-400 bg-gray-700/50 px-3 py-1 rounded-md">{text}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-amber-300 flex items-center mb-2">
            <TopicIcon className="w-5 h-5 mr-2" />
            {t.studyTopics}
          </h4>
          <ul className="list-none space-y-1">
            {perspective.studyTopics.map((topic, index) => (
              <li key={index} className="text-gray-400 bg-gray-700/50 px-3 py-1 rounded-md">{topic}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PerspectiveCard;
