import { LifeScenario } from '../types/character';

// Life Situation Categories (instead of job scenarios)
export const lifeScenarios: LifeScenario[] = [
  {
    id: 'family_conflict',
    label: 'Family & Relationships',
    labelZh: '家庭與關係',
    icon: 'Heart',
    description: 'How you handle family dynamics, conflicts, and maintaining relationships',
    descriptionZh: '您如何處理家庭動態、衝突和維持關係',
    enneagramFocus: 'Reveals relationship patterns, emotional responses, and value systems',
    enneagramFocusZh: '揭示關係模式、情緒反應和價值體系'
  },
  {
    id: 'personal_crisis',
    label: 'Personal Crisis Management',
    labelZh: '個人危機管理',
    icon: 'AlertCircle',
    description: 'Your approach to handling unexpected personal challenges and setbacks',
    descriptionZh: '您處理意外個人挑戰和挫折的方式',
    enneagramFocus: 'Shows stress responses, coping mechanisms, and resilience patterns',
    enneagramFocusZh: '顯示壓力反應、應對機制和復原力模式'
  },
  {
    id: 'social_situations',
    label: 'Social Interactions',
    labelZh: '社交互動',
    icon: 'Users',
    description: 'How you navigate social gatherings, friendships, and community involvement',
    descriptionZh: '您如何參與社交聚會、友誼和社區活動',
    enneagramFocus: 'Reveals social needs, boundaries, and interpersonal dynamics',
    enneagramFocusZh: '揭示社交需求、界限和人際動態'
  },
  {
    id: 'personal_growth',
    label: 'Self-Development',
    labelZh: '自我發展',
    icon: 'TrendingUp',
    description: 'Your approach to learning, growth, and handling feedback about yourself',
    descriptionZh: '您對學習、成長和處理關於自己的反饋的態度',
    enneagramFocus: 'Shows self-awareness, openness to change, and core motivations',
    enneagramFocusZh: '顯示自我意識、對變化的開放性和核心動機'
  },
  {
    id: 'decision_making',
    label: 'Life Decisions',
    labelZh: '人生決策',
    icon: 'Lightbulb',
    description: 'How you make important personal decisions and handle uncertainty',
    descriptionZh: '您如何做出重要的個人決定和處理不確定性',
    enneagramFocus: 'Reveals thinking patterns, fear responses, and decision criteria',
    enneagramFocusZh: '揭示思考模式、恐懼反應和決策標準'
  },
  {
    id: 'values_ethics',
    label: 'Values & Integrity',
    labelZh: '價值觀與誠信',
    icon: 'Shield',
    description: 'Situations testing your personal values and ethical boundaries',
    descriptionZh: '考驗您個人價值觀和道德界限的情況',
    enneagramFocus: 'Shows core values, moral compass, and authenticity',
    enneagramFocusZh: '顯示核心價值觀、道德指南針和真實性'
  },
  {
    id: 'creative_expression',
    label: 'Creativity & Hobbies',
    labelZh: '創造力與興趣',
    icon: 'Sparkles',
    description: 'Your approach to creative pursuits, hobbies, and self-expression',
    descriptionZh: '您對創意追求、愛好和自我表達的態度',
    enneagramFocus: 'Reveals self-identity, need for uniqueness, and creative drive',
    enneagramFocusZh: '揭示自我認同、獨特性需求和創造驅力'
  },
  {
    id: 'conflict_resolution',
    label: 'Conflict & Disagreements',
    labelZh: '衝突與分歧',
    icon: 'MessageSquare',
    description: 'How you handle disagreements and resolve conflicts with others',
    descriptionZh: '您如何處理分歧並與他人解決衝突',
    enneagramFocus: 'Shows conflict style, emotional regulation, and harmony needs',
    enneagramFocusZh: '顯示衝突風格、情緒調節和和諧需求'
  },
  {
    id: 'life_changes',
    label: 'Major Life Transitions',
    labelZh: '重大人生轉變',
    icon: 'RefreshCw',
    description: 'Your response to major life changes like moving, relationship changes, etc.',
    descriptionZh: '您對搬家、關係變化等重大人生變化的反應',
    enneagramFocus: 'Reveals adaptability, anxiety levels, and control needs',
    enneagramFocusZh: '揭示適應性、焦慮程度和控制需求'
  },
  {
    id: 'community_involvement',
    label: 'Community & Service',
    labelZh: '社區與服務',
    icon: 'Globe',
    description: 'Your involvement in community, volunteer work, and helping others',
    descriptionZh: '您參與社區、志願工作和幫助他人的情況',
    enneagramFocus: 'Shows altruism, connection needs, and sense of purpose',
    enneagramFocusZh: '顯示利他主義、連結需求和使命感'
  }
];

// Demo Profiles (Life-focused instead of job-focused)
export const demoProfiles = {
  youngProfessional: {
    lifeStage: 'Young Professional',
    lifeStageZh: '年輕專業人士',
    interests: 'Reading, hiking, photography',
    interestsZh: '閱讀、登山、攝影',
    relationshipStatus: 'In a relationship',
    relationshipStatusZh: '有伴侶',
    personalGoals: 'Building meaningful relationships and finding work-life balance',
    personalGoalsZh: '建立有意義的關係並尋找工作與生活的平衡',
    relationWithChristianity: 'Exploring faith',
    relationWithChristianityZh: '探索信仰'
  },
  parent: {
    lifeStage: 'Parent of young children',
    lifeStageZh: '幼兒父母',
    interests: 'Family activities, cooking, gardening',
    interestsZh: '家庭活動、烹飪、園藝',
    relationshipStatus: 'Married',
    relationshipStatusZh: '已婚',
    personalGoals: 'Raising well-adjusted children and maintaining personal identity',
    personalGoalsZh: '培養適應良好的孩子並保持個人身份',
    relationWithChristianity: 'Active believer',
    relationWithChristianityZh: '活躍的信徒'
  },
  student: {
    lifeStage: 'College Student',
    lifeStageZh: '大學生',
    interests: 'Music, gaming, social activism',
    interestsZh: '音樂、遊戲、社會行動主義',
    relationshipStatus: 'Single',
    relationshipStatusZh: '單身',
    personalGoals: 'Discovering passions and building independence',
    personalGoalsZh: '發現熱情並建立獨立性',
    relationWithChristianity: 'Questioning',
    relationWithChristianityZh: '質疑中'
  },
  midCareer: {
    lifeStage: 'Mid-life adult',
    lifeStageZh: '中年成人',
    interests: 'Travel, mentoring, wellness',
    interestsZh: '旅行、指導、健康',
    relationshipStatus: 'Divorced',
    relationshipStatusZh: '離婚',
    personalGoals: 'Rediscovering purpose and building new connections',
    personalGoalsZh: '重新發現目標並建立新的聯繫',
    relationWithChristianity: 'Rediscovering faith',
    relationWithChristianityZh: '重新發現信仰'
  },
  retiree: {
    lifeStage: 'Recently retired',
    lifeStageZh: '最近退休',
    interests: 'Volunteering, crafts, spending time with grandchildren',
    interestsZh: '志願服務、手工藝、與孫子共度時光',
    relationshipStatus: 'Widowed',
    relationshipStatusZh: '喪偶',
    personalGoals: 'Finding meaning in new chapter and staying connected',
    personalGoalsZh: '在新篇章中尋找意義並保持聯繫',
    relationWithChristianity: 'Lifelong believer',
    relationWithChristianityZh: '終身信徒'
  }
};

// Demo Responses for Life Situations (replacing job-focused responses)
export const demoResponses: Record<string, string[]> = {
  family_conflict: [
    "When my siblings and I disagreed about how to care for our aging parent, emotions ran high. I took the initiative to organize a family meeting where everyone could voice concerns without judgment. I listened carefully to each person's perspective and helped us find common ground. What mattered most to me was keeping our family united during a difficult time, even if it meant compromising on my own preferences.",
    "During holiday planning, my family had very different ideas about traditions. Instead of insisting on my way, I suggested we create new traditions that honored everyone's wishes. I coordinated a poll to gather input and made sure quieter family members felt heard. The experience taught me that flexibility and inclusion create stronger bonds than rigid adherence to the past.",
  ],
  personal_crisis: [
    "When I faced an unexpected health scare, my first instinct was to research everything thoroughly and create a detailed plan. I gathered all medical information, made lists of questions for doctors, and systematically addressed each concern. Staying informed and organized helped me feel more in control during an uncertain time.",
    "After losing my job unexpectedly, I had to quickly reassess my life direction. Rather than panic, I took time to reflect on what I truly wanted, reached out to my support network, and explored opportunities I'd previously overlooked. The crisis became an opportunity for positive change and self-discovery.",
  ],
  social_situations: [
    "At a friend's party where I knew few people, I noticed someone standing alone and struck up a conversation. I genuinely enjoy helping others feel included and comfortable. Throughout the evening, I made introductions and facilitated connections between people who shared interests. Creating warm, welcoming environments brings me joy.",
    "When invited to join a new social group, I was initially hesitant but decided to step outside my comfort zone. I observed the dynamics first, then gradually participated more. I value authentic connections over superficial socializing, so I focused on deeper conversations with a few people rather than trying to meet everyone.",
  ],
  personal_growth: [
    "A close friend pointed out that I tend to avoid difficult conversations, which surprised me at first. After reflecting honestly, I realized they were right. I've been actively working on addressing issues directly rather than letting them fester. It's uncomfortable, but I've noticed my relationships improving as I've become more courageous in communication.",
    "When I received criticism about being too controlling in group settings, it stung initially. But I took time to examine my behavior objectively and recognized the pattern. I've been practicing letting go of control and trusting others more. The growth has been challenging but valuable.",
  ],
  decision_making: [
    "When deciding whether to relocate for a life opportunity, I made detailed pro-con lists and consulted trusted advisors. I researched thoroughly, considered all angles, and ultimately chose the option that aligned with my long-term values and goals. Having a systematic approach helped me feel confident in my decision.",
    "Faced with choosing between staying in a comfortable situation and pursuing an exciting but risky opportunity, I listened to my gut feeling. I've learned that overthinking can paralyze me, so I trusted my instincts while still being practical. The decision felt right emotionally and intellectually.",
  ],
  values_ethics: [
    "When I discovered a local business was treating employees unfairly, I had to decide whether to speak up or stay silent. Even though it was uncomfortable and could have social consequences, I felt compelled to address it directly with the owner. My sense of justice wouldn't let me ignore the situation, even at personal cost.",
    "I was asked to participate in something that conflicted with my values, even though everyone else seemed fine with it. I politely but firmly declined and explained my reasoning. Some people were understanding, others less so, but staying true to my principles mattered more than fitting in.",
  ],
  creative_expression: [
    "I've always been drawn to creative writing as a way to process emotions and experiences. When I finally shared my work publicly, I felt vulnerable but authentic. The creative process helps me understand myself better and express things I struggle to communicate verbally.",
    "I took up painting during a difficult period in my life, not to create masterpieces, but to have a meditative outlet. The process matters more than the product. It's become a sanctuary where I can be completely myself without judgment or expectation.",
  ],
  conflict_resolution: [
    "When my neighbor and I had a boundary dispute, I approached them directly but respectfully to discuss the issue. I listened to their perspective, shared mine, and we worked together to find a solution that respected both our needs. I believe most conflicts stem from misunderstanding rather than malice.",
    "During a disagreement with my partner about household responsibilities, I felt frustrated but knew avoiding the conversation would only build resentment. We set aside time to talk calmly about our expectations and feelings. By focusing on understanding rather than winning, we found a fair compromise.",
  ],
  life_changes: [
    "When I had to move to a new city unexpectedly, I felt anxious but also excited about new possibilities. I created routines quickly to establish a sense of stability, then gradually explored and built new connections. Having structure helped me handle the uncertainty of so much change at once.",
    "After my long-term relationship ended, I went through a period of reflection about what I truly wanted in life. Rather than rushing into activities to distract myself, I allowed space for grief while also exploring new interests. The transition was painful but ultimately helped me rediscover my independence and identity.",
  ],
  community_involvement: [
    "I started volunteering at a local food bank after seeing community needs firsthand. Being able to directly help people and see the impact motivates me. I've taken on increasing responsibility in organizing distributions because I want to make the program as effective and compassionate as possible.",
    "When our neighborhood needed someone to organize community events, I stepped forward even though it meant significant time commitment. Building connections and creating a sense of belonging for everyone in our area feels deeply meaningful to me. I get genuine fulfillment from bringing people together.",
  ]
};

// Traditional Chinese Demo Responses
export const demoResponsesZh: Record<string, string[]> = {
  family_conflict: [
    "當我和兄弟姐妹們在如何照顧年邁父母的問題上產生分歧時，情緒高漲。我主動組織了一次家庭會議，讓每個人都能在不受評判的情況下表達關切。我仔細聆聽每個人的觀點，幫助我們找到共同點。對我來說最重要的是在困難時期保持家庭團結，即使這意味著要在我自己的偏好上做出妥協。",
    "在節日計劃期間，我的家人對傳統有非常不同的想法。我沒有堅持自己的方式，而是建議我們創造尊重每個人願望的新傳統。我協調了一次投票來收集意見，並確保較安靜的家庭成員也能被聽到。這次經歷教會我，靈活性和包容性比僵硬地堅持過去能創造更強的紐帶。",
  ],
  personal_crisis: [
    "當我面臨意外的健康恐慌時，我的第一反應是徹底研究一切並制定詳細的計劃。我收集了所有醫療信息，列出了要問醫生的問題清單，並系統地處理每個問題。在不確定的時期，保持知情和有條理幫助我感到更有控制感。",
    "在意外失業後，我不得不快速重新評估我的人生方向。我沒有驚慌失措，而是花時間反思我真正想要的是什麼，聯繫了我的支持網絡，並探索了我之前忽視的機會。這場危機成為了積極改變和自我發現的機會。",
  ],
  social_situations: [
    "在朋友的聚會上，我認識的人很少，我注意到有人獨自站著，就上前搭話。我真心喜歡幫助別人感到被包容和舒適。整個晚上，我在有共同興趣的人之間進行介紹並促進聯繫。創造溫暖、歡迎的環境帶給我快樂。",
    "當被邀請加入一個新的社交團體時，我最初很猶豫，但決定走出舒適圈。我首先觀察動態，然後逐漸增加參與。我重視真實的聯繫勝過膚淺的社交，所以我專注於與少數人進行更深入的對話，而不是試圖見到每個人。",
  ],
  personal_growth: [
    "一位親密的朋友指出我傾向於迴避困難的對話，這起初讓我感到驚訝。在誠實反思後，我意識到他們是對的。我一直在積極努力直接解決問題，而不是讓它們惡化。這很不舒服，但我注意到隨著我在溝通中變得更加勇敢，我的關係正在改善。",
    "當我收到關於在團體環境中過於控制的批評時，起初感到刺痛。但我花時間客觀地審視我的行為，並認識到這種模式。我一直在練習放下控制，更多地信任他人。這種成長具有挑戰性但很有價值。",
  ],
  decision_making: [
    "在決定是否為了人生機會而搬遷時，我制作了詳細的利弊清單並諮詢了值得信賴的顧問。我徹底研究，考慮了所有角度，最終選擇了與我的長期價值觀和目標一致的選項。系統化的方法幫助我對自己的決定充滿信心。",
    "面對在舒適的情況和追求令人興奮但有風險的機會之間做出選擇時，我傾聽了我的直覺。我了解到過度思考會讓我陷入癱瘓，所以我在保持實際的同時信任我的本能。這個決定在情感和理智上都感覺正確。",
  ],
  values_ethics: [
    "當我發現一家當地企業不公平地對待員工時，我必須決定是大聲說出來還是保持沉默。儘管這很不舒服並可能產生社交後果，但我感到必須直接與業主解決這個問題。我的正義感不允許我忽視這種情況，即使要付出個人代價。",
    "我被要求參與與我的價值觀相衝突的事情，儘管其他人似乎都沒問題。我禮貌但堅定地拒絕了，並解釋了我的理由。有些人理解，有些人不太理解，但忠於我的原則比融入更重要。",
  ],
  creative_expression: [
    "我一直被創意寫作所吸引，作為處理情緒和經歷的一種方式。當我終於公開分享我的作品時，我感到脆弱但真實。創作過程幫助我更好地了解自己，並表達我難以用語言溝通的東西。",
    "我在生活中的困難時期開始畫畫，不是為了創作傑作，而是為了有一個冥想的出口。過程比產品更重要。它已成為一個避風港，在那裡我可以完全做自己，不受評判或期待。",
  ],
  conflict_resolution: [
    "當我和鄰居發生邊界爭議時，我直接但尊重地接近他們討論這個問題。我傾聽他們的觀點，分享我的觀點，我們一起找到了尊重彼此需求的解決方案。我相信大多數衝突源於誤解而不是惡意。",
    "在與伴侶關於家庭責任的分歧中，我感到沮喪，但知道迴避對話只會積累怨恨。我們專門安排時間冷靜地討論我們的期望和感受。通過專注於理解而不是獲勝，我們找到了公平的妥協。",
  ],
  life_changes: [
    "當我不得不意外搬到一個新城市時，我感到焦慮但也對新的可能性感到興奮。我迅速建立了例行程序以建立穩定感，然後逐漸探索並建立新的聯繫。有結構幫助我處理一次性發生如此多變化的不確定性。",
    "在長期關係結束後，我經歷了一段關於我真正想要的生活的反思期。我沒有急於參與活動來分散自己的注意力，而是允許悲傷的空間，同時也探索新的興趣。這次過渡很痛苦，但最終幫助我重新發現了我的獨立性和身份。",
  ],
  community_involvement: [
    "在親眼目睹社區需求後，我開始在當地食物銀行做志願者。能夠直接幫助人們並看到影響激勵著我。我承擔了越來越多的組織分配責任，因為我想讓這個計劃盡可能有效和富有同情心。",
    "當我們的社區需要有人組織社區活動時，我挺身而出，儘管這意味著大量的時間投入。為我們地區的每個人建立聯繫並創造歸屬感對我來說深具意義。我從讓人們聚在一起中獲得真正的滿足。",
  ]
};
