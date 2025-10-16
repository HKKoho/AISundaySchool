import React, { useState } from 'react';
import type { Quest } from '../../types';
import { useGame } from '../../hooks/useGame';
import Icon from './Icon';
import BiblicalIntroduction from './BiblicalIntroduction';
import DeepDiveChat from './DeepDiveChat';

interface DeepDiveContentProps {
  deepDive: Quest['deepDive'];
  quest?: Quest;
  onBack: () => void;
}

const DeepDiveContent: React.FC<DeepDiveContentProps> = ({ deepDive, quest, onBack }) => {
  const { bibleVersion } = useGame();
  const [showBiblicalIntro, setShowBiblicalIntro] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const formatUrl = (url: string, text: string) => {
    if (url === '#') return url;
    const urlObj = new URL(url);
    urlObj.searchParams.set('version', bibleVersion);
    return urlObj.toString();
  };

  if (showBiblicalIntro) {
    return <BiblicalIntroduction onBack={() => setShowBiblicalIntro(false)} />;
  }

  if (showChat) {
    return <DeepDiveChat deepDive={deepDive} quest={quest} onBack={() => setShowChat(false)} />;
  }

  return (
    <div className="flex-grow overflow-y-auto pr-4 -mr-4">
        <h2 id="deepdive-title" className="text-4xl font-bold text-amber-900 mb-4 flex items-center gap-3" style={{fontFamily: "'Trajan Pro', serif"}}>
            <Icon name="lightbulb" className="w-8 h-8"/>
            深入探索：{deepDive.title}
        </h2>

        <p className="text-lg text-stone-800 leading-relaxed mb-6 whitespace-pre-wrap">{deepDive.content}</p>

        <h3 className="text-2xl font-bold text-amber-900 border-b-2 border-amber-800 pb-2 mb-4">
            來源查找器
        </h3>
        <ul className="space-y-2 mb-8">
            {deepDive.sources.map((source, index) => (
                <li key={index}>
                    <a 
                        href={formatUrl(source.url, source.text)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-amber-800 hover:text-amber-600 hover:underline transition-colors font-semibold rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
                    >
                        {source.text.replace(/\((NIV|ESV|KJV)\)/, `(${bibleVersion})`)}
                    </a>
                </li>
            ))}
        </ul>

         <div className="border-t-4 border-dashed border-amber-800/50 my-8"></div>

        <h3 className="text-2xl font-bold text-amber-900 pb-2 mb-4 flex items-center gap-3">
            <Icon name="sparkles" className="w-7 h-7"/>
            探索更深
        </h3>
        <p className="text-stone-700 mb-4">對這個主題有更多問題嗎？與 AI 助理展開深入對話！</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setShowChat(true)}
            className="p-6 rounded-lg bg-gradient-to-br from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <div className="flex items-center gap-3 mb-2">
              <Icon name="message-circle" className="w-6 h-6"/>
              <h4 className="text-xl font-bold">AI 對話助理</h4>
            </div>
            <p className="text-sm text-amber-100">
              與 AI 助理進行互動對話，深入探討聖經主題
            </p>
          </button>

          <button
            onClick={() => setShowBiblicalIntro(true)}
            className="p-6 rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <div className="flex items-center gap-3 mb-2">
              <Icon name="graduation-cap" className="w-6 h-6"/>
              <h4 className="text-xl font-bold">聖經導論專家</h4>
            </div>
            <p className="text-sm text-indigo-100">
              與專業聖經導論學者進行學術討論
            </p>
          </button>
        </div>

        <div className="mt-8 border-t-2 border-amber-800/20 pt-6">
            <button 
              onClick={onBack} 
              className="bg-stone-600 hover:bg-stone-500 text-white font-bold py-2 px-4 rounded-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500 focus-visible:ring-offset-amber-100"
            >
              返回說明
            </button>
        </div>
    </div>
  );
};

export default DeepDiveContent;