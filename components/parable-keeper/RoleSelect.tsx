import React from 'react';
import { useTranslation } from 'react-i18next';
import { RoleType } from './types';
import { ROLE_CONFIG } from './constants';
import { User, BookOpen, HandHeart } from 'lucide-react';

interface RoleSelectProps {
  onSelect: (role: RoleType) => void;
}

export const RoleSelect: React.FC<RoleSelectProps> = ({ onSelect }) => {
  const { t } = useTranslation('parableKeeper');

  const icons = {
    [RoleType.PASTOR]: <BookOpen size={48} className="mb-4 text-amber-400" />,
    [RoleType.DEACON]: <HandHeart size={48} className="mb-4 text-blue-400" />,
    [RoleType.MEMBER]: <User size={48} className="mb-4 text-green-400" />,
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-stone-900 text-stone-100 p-8 relative">
      <h1 className="text-5xl mb-4 text-amber-500 font-bold">{t('gameTitle')}</h1>
      <p className="text-xl mb-12 text-stone-400 max-w-2xl text-center whitespace-pre-line">
        {t('gameSubtitle')}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {(Object.values(RoleType) as RoleType[]).map((role) => (
          <button
            key={role}
            onClick={() => onSelect(role)}
            className="flex flex-col items-center p-8 bg-stone-800 rounded-lg border-2 border-stone-700 hover:border-amber-500 hover:bg-stone-750 transition-all duration-300 group"
          >
            <div className="group-hover:scale-110 transition-transform duration-300">
              {icons[role]}
            </div>
            <h2 className="text-2xl font-bold mb-2">{t(`roles.${role.toLowerCase()}.name`)}</h2>
            <p className="text-stone-400 text-center mb-4 text-sm h-12">
              {t(`roles.${role.toLowerCase()}.description`)}
            </p>

            <div className="w-full space-y-2 text-xs font-mono text-stone-500">
              <div className="flex justify-between">
                <span>{t('stats.speed')}</span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`h-2 w-2 rounded-full ${i < ROLE_CONFIG[role].speed / 2 ? 'bg-amber-500' : 'bg-stone-700'}`} />
                  ))}
                </div>
              </div>
              <div className="flex justify-between">
                <span>{t('stats.teach')}</span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`h-2 w-2 rounded-full ${i < ROLE_CONFIG[role].teachPower / 3 ? 'bg-amber-500' : 'bg-stone-700'}`} />
                  ))}
                </div>
              </div>
              <div className="flex justify-between">
                <span>{t('stats.service')}</span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`h-2 w-2 rounded-full ${i < ROLE_CONFIG[role].servicePower / 3 ? 'bg-amber-500' : 'bg-stone-700'}`} />
                  ))}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
