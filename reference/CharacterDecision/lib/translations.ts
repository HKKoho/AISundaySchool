export type Language = 'en' | 'zh';

export const translations = {
  en: {
    // Header
    title: 'Life Character Assessment',
    subtitle: 'Discover your personality type through life situations and experiences',
    description: 'This assessment analyzes how you handle real-life situations to determine your Enneagram type',

    // Demo Profiles
    tryDemoProfiles: 'Try Demo Profiles',
    demoProfilesDesc: 'Use pre-filled profiles to quickly experience the assessment:',

    // Form Labels
    lifeStage: 'Life Stage',
    lifeStageRequired: 'Life Stage *',
    relationWithChristianity: 'Relation with Christianity',
    relationWithChristianityRequired: 'Relation with Christianity *',
    interestsHobbies: 'Interests & Hobbies',
    relationshipStatus: 'Relationship Status',
    personalGoals: 'Personal Goals',

    // Placeholders
    selectLifeStage: 'Select life stage',
    selectRelationWithChristianity: 'Select your relation with Christianity',
    interestsPlaceholder: 'e.g., Reading, hiking, photography',
    selectStatus: 'Select status',
    personalGoalsPlaceholder: 'What are you working towards in life right now?',

    // Life Stage Options
    student: 'Student',
    youngProfessional: 'Young Professional',
    parentYoungChildren: 'Parent of young children',
    parentTeenagers: 'Parent of teenagers',
    midLifeAdult: 'Mid-life adult',
    emptyNester: 'Empty nester',
    recentlyRetired: 'Recently retired',
    retired: 'Retired',
    other: 'Other',

    // Christianity Relation Options
    nonBeliever: 'Non-believer',
    curiousExploring: 'Curious/Exploring',
    questioning: 'Questioning',
    newBeliever: 'New believer',
    activeBeliever: 'Active believer',
    matureBeliever: 'Mature believer',
    churchLeader: 'Church leader',
    preferNotToSay: 'Prefer not to say',

    // Relationship Status Options
    single: 'Single',
    inRelationship: 'In a relationship',
    engaged: 'Engaged',
    married: 'Married',
    divorced: 'Divorced',
    widowed: 'Widowed',

    // Buttons
    continue: 'Continue to Life Situations →',

    // Validation
    fillRequiredFields: 'Please fill in required fields (Life Stage, Relation with Christianity).',

    // Footer
    footerText: 'Life Character Assessment - Powered by AI and Enneagram Psychology'
  },
  zh: {
    // Header
    title: '生命性格評估',
    subtitle: '透過生活情境和經歷，探索你的性格類型',
    description: '此評估透過分析您處理真實生活情境的方式來判斷您的九型人格類型',

    // Demo Profiles
    tryDemoProfiles: '試用示範檔案',
    demoProfilesDesc: '使用預設檔案快速體驗評估：',

    // Form Labels
    lifeStage: '人生階段',
    lifeStageRequired: '人生階段 *',
    relationWithChristianity: '與基督教的關係',
    relationWithChristianityRequired: '與基督教的關係 *',
    interestsHobbies: '興趣與嗜好',
    relationshipStatus: '感情狀態',
    personalGoals: '個人目標',

    // Placeholders
    selectLifeStage: '選擇人生階段',
    selectRelationWithChristianity: '選擇您與基督教的關係',
    interestsPlaceholder: '例如：閱讀、登山、攝影',
    selectStatus: '選擇狀態',
    personalGoalsPlaceholder: '您現在正朝向什麼目標努力？',

    // Life Stage Options
    student: '學生',
    youngProfessional: '青年職業人士',
    parentYoungChildren: '幼童家長',
    parentTeenagers: '青少年家長',
    midLifeAdult: '中年成人',
    emptyNester: '空巢期',
    recentlyRetired: '剛退休',
    retired: '退休',
    other: '其他',

    // Christianity Relation Options
    nonBeliever: '非信徒',
    curiousExploring: '好奇/探索中',
    questioning: '質疑中',
    newBeliever: '初信者',
    activeBeliever: '活躍信徒',
    matureBeliever: '成熟信徒',
    churchLeader: '教會領袖',
    preferNotToSay: '不願透露',

    // Relationship Status Options
    single: '單身',
    inRelationship: '交往中',
    engaged: '訂婚',
    married: '已婚',
    divorced: '離婚',
    widowed: '喪偶',

    // Buttons
    continue: '繼續至生活情境 →',

    // Validation
    fillRequiredFields: '請填寫必填欄位（人生階段、與基督教的關係）。',

    // Footer
    footerText: '生命性格評估 - 由人工智慧和九型人格心理學驅動'
  }
};

export function getTranslation(lang: Language, key: string): string {
  const keys = key.split('.');
  let value: any = translations[lang];

  for (const k of keys) {
    value = value?.[k];
  }

  return value || key;
}
