import type { Question } from './types';

interface Translation {
  // App.tsx
  startTitle: string;
  startSubtitle: string;
  startButton: string;
  loadingTitle: string;
  loadingSubtitle: string;
  errorTitle: string;
  errorText: string;
  tryAgainButton: string;
  footerText: string;
  // ProgressBar.tsx
  progressBar: string;
  // ResultCard.tsx
  resultArchetypeIs: string;
  resultLearningPaths: string;
  restartButton: string;
  shareButton: string;
  shareTitle: string;
  shareText: string;
  imageLoadingSubtitle: string;
  imageAltText: string;
  // PerspectiveCard.tsx
  hebrewPerspectiveTitle: string;
  christianPerspectiveTitle: string;
  keyTexts: string;
  studyTopics: string;
  // Quiz Questions
  quizQuestions: Question[];
}

const en: Translation = {
  // App.tsx
  startTitle: "Bible Wisdom Personal Quest",
  startSubtitle: "Use a short quiz to uncover Old Testament wisdom to construct a personalized path to explore the guide of God in both Hebrew and Christian perspectives.",
  startButton: "Begin Your Quest",
  loadingTitle: "Decoding the Scrolls...",
  loadingSubtitle: "Analyzing your responses with a scholarly lens...",
  errorTitle: "An Error Occurred",
  errorText: "Failed to generate your profile. The doctrinal analysis is complex. Please try again.",
  tryAgainButton: "Try Again",
  footerText: "Powered by Gemini. An educational tool for theological exploration.",
  // ProgressBar.tsx
  progressBar: "Quest Progress",
  // ResultCard.tsx
  resultArchetypeIs: "Your Biblical Profile is",
  resultLearningPaths: "Your Learning Paths",
  restartButton: "Take Another Quest",
  shareButton: "Share Your Quest",
  shareTitle: "My Bible Wisdom Quest Result",
  shareText: "I got '{archetype}: {character}' on the Bible Wisdom Personal Quest! Discover your own spiritual profile.",
  imageLoadingSubtitle: "Conjuring a vision of your archetype...",
  imageAltText: "A visual depiction of {character}",
  // PerspectiveCard.tsx
  hebrewPerspectiveTitle: "Hebrew Perspective",
  christianPerspectiveTitle: "Christian Perspective",
  keyTexts: "Key Texts",
  studyTopics: "Study Topics",
  // Quiz Questions
  quizQuestions: [
    {
      id: 1,
      text: "You're faced with a major life decision. How do you approach it?",
      options: [
        { id: "A", text: "With careful planning and logic, weighing all the pros and cons." },
        { id: "B", text: "By trusting my intuition and a deep sense of a 'higher calling' or purpose." },
        { id: "C", text: "By seeking wisdom from mentors and historical precedents." },
        { id: "D", text: "By courageously taking a stand for what I believe is right, even if it's unpopular." },
      ],
    },
    {
      id: 2,
      text: "When you see injustice in the world, what is your first instinct?",
      options: [
        { id: "A", text: "To create a system or structure to fix the root problem." },
        { id: "B", text: "To speak out and challenge the existing powers, becoming a voice for the voiceless." },
        { id: "C", text: "To express the emotional truth of the situation through art, music, or writing." },
        { id: "D", text: "To work cleverly and strategically behind the scenes to protect the vulnerable." },
      ],
    },
    {
      id: 3,
      text: "Which of these environments makes you feel most alive?",
      options: [
        { id: "A", text: "A library or study, surrounded by books and knowledge." },
        { id: "B", text: "On a long journey into the unknown, exploring new frontiers." },
        { id: "C", text: "Leading a team or community towards a shared, ambitious goal." },
        { id: "D", text: "A beautiful, peaceful garden or natural landscape that inspires creativity." },
      ],
    },
    {
      id: 4,
      text: "What kind of legacy do you want to leave behind?",
      options: [
        { id: "A", "text": "A legacy of wisdom and prosperity that benefits future generations." },
        { id: "B", "text": "A legacy of faith and perseverance, showing that the impossible is possible." },
        { id: "C", "text": "A legacy of justice and liberation, having set people free from oppression." },
        { id: "D", "text": "A legacy of beauty and heartfelt expression that touches people's souls." }
      ],
    },
    {
      id: 5,
      text: "When studying an ancient text, what is your primary focus?",
      options: [
        { id: "A", text: "Understanding the historical context, original language, and scholarly interpretations." },
        { id: "B", text: "Finding timeless principles and personal applications for my life today." },
        { id: "C", text: "Seeing how it fits into the grand, overarching story of a divine plan." },
        { id: "D", text: "Debating its meaning with others to uncover collective wisdom." },
      ],
    },
    {
      id: 6,
      text: "What do you believe is the primary purpose of divine guidance?",
      options: [
        { id: "A", text: "To provide moral clarity and a stable framework for a just society." },
        { id: "B", text: "To call people to a radical mission or a path of self-sacrifice." },
        { id: "C", text: "To offer comfort, hope, and a narrative of redemption through hardship." },
        { id: "D", text: "To reveal profound mysteries and challenge our understanding of reality." },
      ],
    },
  ],
};

const zh: Translation = {
  // App.tsx
  startTitle: "聖經智慧個人探尋",
  startSubtitle: "透過一連串問題，發掘舊約智慧，建構一條個人化的路徑，從希伯來和基督徒的雙重視角，探索神的指引。",
  startButton: "開始你的探尋",
  loadingTitle: "解讀卷軸中...",
  loadingSubtitle: "正透過學術視角分析您的回覆...",
  errorTitle: "發生錯誤",
  errorText: "無法生成您的個人檔案。教義分析過程複雜，請再試一次。",
  tryAgainButton: "再試一次",
  footerText: "由 Gemini 提供技術支持。一個用於神學探索的教育工具。",
  // ProgressBar.tsx
  progressBar: "探尋進度",
  // ResultCard.tsx
  resultArchetypeIs: "您的聖經側寫",
  resultLearningPaths: "你的學習路徑",
  restartButton: "再次探尋",
  shareButton: "分享你的探尋",
  shareTitle: "我的聖經智慧探尋結果",
  shareText: "我在「聖經智慧個人探尋」中得到了 '{archetype}: {character}'！來發現你自己的靈性側寫吧。",
  imageLoadingSubtitle: "正在為您的原型塑造一個視覺形象...",
  imageAltText: "{character}的視覺描繪",
  // PerspectiveCard.tsx
  hebrewPerspectiveTitle: "希伯來視角",
  christianPerspectiveTitle: "基督徒視角",
  keyTexts: "關鍵經文",
  studyTopics: "研究主題",
  // Quiz Questions
  quizQuestions: [
    {
      id: 1,
      text: "你正面臨一個重大的人生決定。你會如何處理？",
      options: [
        { id: "A", text: "透過仔細的規劃和邏輯，權衡所有利弊。" },
        { id: "B", text: "相信我的直覺和一種深刻的「更高呼召」或使命感。" },
        { id: "C", text: "向導師和歷史先例尋求智慧。" },
        { id: "D", text: "勇敢地為我認為正確的事情挺身而出，即使這不受歡迎。" },
      ],
    },
    {
      id: 2,
      text: "當你看到世界上的不公義時，你的第一直覺是什麼？",
      options: [
        { id: "A", text: "建立一個系統或架構來解決根本問題。" },
        { id: "B", text: "大聲疾呼，挑戰現有權力，成為無聲者的聲音。" },
        { id: "C", text: "透過藝術、音樂或寫作來表達情境中的情感真相。" },
        { id: "D", text: "在幕後巧妙地、策略性地工作，以保護弱勢群體。" },
      ],
    },
    {
      id: 3,
      text: "以下哪種環境讓你感覺最有活力？",
      options: [
        { id: "A", text: "圖書館或書房，被書籍和知識所包圍。" },
        { id: "B", text: "在通往未知的長途旅程中，探索新的領域。" },
        { id: "C", text: "帶領一個團隊或社群朝著一個共同的、宏偉的目標前進。" },
        { id: "D", text: "一個美麗、寧靜的花園或自然景觀，能激發創造力。" },
      ],
    },
    {
      id: 4,
      text: "你想留下什麼樣的遺產？",
      options: [
        { id: "A", text: "一個能造福後代的智慧和繁榮的遺產。" },
        { id: "B", text: "一個信念和毅力的遺產，證明不可能皆為可能。" },
        { id: "C", text: "一個正義和解放的遺產，將人們從壓迫中解放出來。" },
        { id: "D", text: "一個能觸動人們靈魂的美麗和真摯表達的遺產。" }
      ],
    },
    {
      id: 5,
      text: "在研究古代文本時，你的主要焦點是什麼？",
      options: [
          { id: "A", text: "理解其歷史背景、原文語言和學術詮釋。" },
          { id: "B", text: "為我今天的生活尋找永恆的原則和個人應用。" },
          { id: "C", text: "看它如何融入神聖計劃的宏大敘事中。" },
          { id: "D", text: "與他人辯論其含義，以發掘集體智慧。" },
      ],
    },
    {
        id: 6,
        text: "你認為神聖指引的主要目的是什麼？",
        options: [
            { id: "A", text: "為一個公正的社會提供道德清晰度和穩定的框架。" },
            { id: "B", text: "呼召人們走向一個激進的使命或自我犧牲的道路。" },
            { id: "C", text: "在困境中提供安慰、希望和救贖的敘事。" },
            { id: "D", text: "揭示深奧的奧秘，並挑戰我們對現實的理解。" },
        ],
    },
  ],
};

export const translations: Record<'en' | 'zh', Translation> = { en, zh };