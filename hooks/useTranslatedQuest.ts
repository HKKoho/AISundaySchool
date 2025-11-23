import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { Quest } from '../types';

/**
 * Custom hook to translate Quest objects using i18next.
 *
 * For quests that have translations in the bibleGame.json files under the "quests" namespace,
 * this hook will return the translated version. For quests without translations, it falls
 * back to the original content from the Quest object.
 *
 * @param quest - The original Quest object from gameData.ts
 * @returns A translated Quest object
 */
export function useTranslatedQuest(quest: Quest): Quest {
  const { t, i18n } = useTranslation('bibleGame');

  return useMemo(() => {
    const questKey = `quests.${quest.id}`;

    // Check if translation exists for this quest - explicitly specify namespace
    const hasTranslation = i18n.exists(`${questKey}.character`, { ns: 'bibleGame' });

    // Debug logging
    console.log(`[useTranslatedQuest] Quest ${quest.id}:`, {
      language: i18n.language,
      questKey,
      hasTranslation,
      characterKey: `${questKey}.character`,
      existsWithNS: i18n.exists(`${questKey}.character`, { ns: 'bibleGame' }),
      existsWithoutNS: i18n.exists(`${questKey}.character`),
    });

    if (!hasTranslation) {
      // No translation available, return original quest
      console.log(`[useTranslatedQuest] No translation for ${quest.id}, using original`);
      return quest;
    }

    // Return translated quest
    return {
      ...quest,
      character: t(`${questKey}.character`, quest.character),
      question: t(`${questKey}.question`, quest.question),
      options: quest.options.map((_, index) =>
        t(`${questKey}.options.${index}`, quest.options[index])
      ),
      explanation: t(`${questKey}.explanation`, quest.explanation),
      journalPrompt: {
        title: t(`${questKey}.journalPrompt.title`, quest.journalPrompt.title),
        content: t(`${questKey}.journalPrompt.content`, quest.journalPrompt.content)
      },
      deepDive: {
        ...quest.deepDive,
        title: t(`${questKey}.deepDive.title`, quest.deepDive.title),
        content: t(`${questKey}.deepDive.content`, quest.deepDive.content)
      }
    };
  }, [quest, t, i18n, i18n.language]);
}

/**
 * Translate multiple quests at once
 */
export function useTranslatedQuests(quests: Quest[]): Quest[] {
  const { t, i18n } = useTranslation('bibleGame');

  return useMemo(() => {
    return quests.map(quest => {
      const questKey = `quests.${quest.id}`;
      const hasTranslation = i18n.exists(`${questKey}.character`, { ns: 'bibleGame' });

      if (!hasTranslation) {
        return quest;
      }

      return {
        ...quest,
        character: t(`${questKey}.character`, quest.character),
        question: t(`${questKey}.question`, quest.question),
        options: quest.options.map((_, index) =>
          t(`${questKey}.options.${index}`, quest.options[index])
        ),
        explanation: t(`${questKey}.explanation`, quest.explanation),
        journalPrompt: {
          title: t(`${questKey}.journalPrompt.title`, quest.journalPrompt.title),
          content: t(`${questKey}.journalPrompt.content`, quest.journalPrompt.content)
        },
        deepDive: {
          ...quest.deepDive,
          title: t(`${questKey}.deepDive.title`, quest.deepDive.title),
          content: t(`${questKey}.deepDive.content`, quest.deepDive.content)
        }
      };
    });
  }, [quests, t, i18n, i18n.language]);
}
