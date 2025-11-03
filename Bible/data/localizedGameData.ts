import { TFunction } from 'i18next';
import type { Quest } from '../types';

export const getLocalizedQuests = (t: TFunction): Quest[] => {
  const questIds = ['q1', 'q2', 'q5', 'q3', 'q4', 'q6'];

  return questIds.map((questId) => ({
    id: questId,
    character: t(`quests.${questId}.character`),
    characterImage: `https://picsum.photos/seed/${questId}/100`,
    question: t(`quests.${questId}.question`),
    options: [
      t(`quests.${questId}.options.0`),
      t(`quests.${questId}.options.1`),
      t(`quests.${questId}.options.2`),
      t(`quests.${questId}.options.3`),
    ],
    correctAnswerIndex: getCorrectAnswerIndex(questId),
    explanation: t(`quests.${questId}.explanation`),
    journalPrompt: {
      title: t(`quests.${questId}.journalPrompt.title`),
      content: t(`quests.${questId}.journalPrompt.content`),
    },
    deepDive: {
      title: t(`quests.${questId}.deepDive.title`),
      content: t(`quests.${questId}.deepDive.content`),
      sources: getQuestSources(questId),
    },
  }));
};

// Correct answer indices for each quest
const getCorrectAnswerIndex = (questId: string): number => {
  const correctAnswers: Record<string, number> = {
    q1: 2, // "A promise of land, descendants, and blessings."
    q2: 0, // "To cleanse ritual impurity and restore the opportunity to approach God."
    q5: 1, // "An inner, spiritual transformation enabling obedience to God."
    q3: 0, // "A baptism of repentance for the forgiveness of sins."
    q4: 2, // "For the forgiveness of your sins and to receive the gift of the Holy Spirit."
    q6: 1, // "In God's eyes, our identity is completely covered by Christ's righteousness."
  };
  return correctAnswers[questId] || 0;
};

// Bible verse sources for each quest
const getQuestSources = (questId: string) => {
  const sources: Record<string, Array<{ text: string; url: string }>> = {
    q1: [
      { text: 'Genesis 17:1-14 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Genesis+17&version=NIV' },
      { text: 'Early Church Fathers on Covenant', url: '#' },
    ],
    q2: [
      { text: 'Leviticus 15:31 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Leviticus+15:31&version=ESV' },
      { text: 'Hebrews 9:13-14 (KJV)', url: 'https://www.biblegateway.com/passage/?search=Hebrews+9:13-14&version=KJV' },
    ],
    q5: [
      { text: 'Ezekiel 36:25-27 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Ezekiel+36:25-27&version=NIV' },
      { text: 'Jeremiah 31:31-34 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Jeremiah+31:31-34&version=ESV' },
    ],
    q3: [
      { text: 'Mark 1:4-8 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Mark+1:4-8&version=NIV' },
      { text: 'Matthew 3:11 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Matthew+3:11&version=ESV' },
    ],
    q4: [
      { text: 'Acts 2:38-39 (KJV)', url: 'https://www.biblegateway.com/passage/?search=Acts+2:38-39&version=KJV' },
      { text: 'Romans 6:3-4 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Romans+6:3-4&version=NIV' },
      { text: 'Didache on Baptism (Early Church Text)', url: '#' },
    ],
    q6: [
      { text: 'Galatians 3:26-27 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Galatians+3:26-27&version=NIV' },
      { text: 'Colossians 2:12 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Colossians+2:12&version=ESV' },
    ],
  };
  return sources[questId] || [];
};
