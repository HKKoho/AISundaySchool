import { LifeScenario } from '@/types';

// Life Situation Categories (instead of job scenarios)
export const lifeScenarios: LifeScenario[] = [
  {
    id: 'family_conflict',
    label: 'Family & Relationships',
    icon: 'Heart',
    description: 'How you handle family dynamics, conflicts, and maintaining relationships',
    enneagramFocus: 'Reveals relationship patterns, emotional responses, and value systems'
  },
  {
    id: 'personal_crisis',
    label: 'Personal Crisis Management',
    icon: 'AlertCircle',
    description: 'Your approach to handling unexpected personal challenges and setbacks',
    enneagramFocus: 'Shows stress responses, coping mechanisms, and resilience patterns'
  },
  {
    id: 'social_situations',
    label: 'Social Interactions',
    icon: 'Users',
    description: 'How you navigate social gatherings, friendships, and community involvement',
    enneagramFocus: 'Reveals social needs, boundaries, and interpersonal dynamics'
  },
  {
    id: 'personal_growth',
    label: 'Self-Development',
    icon: 'TrendingUp',
    description: 'Your approach to learning, growth, and handling feedback about yourself',
    enneagramFocus: 'Shows self-awareness, openness to change, and core motivations'
  },
  {
    id: 'decision_making',
    label: 'Life Decisions',
    icon: 'Lightbulb',
    description: 'How you make important personal decisions and handle uncertainty',
    enneagramFocus: 'Reveals thinking patterns, fear responses, and decision criteria'
  },
  {
    id: 'values_ethics',
    label: 'Values & Integrity',
    icon: 'Shield',
    description: 'Situations testing your personal values and ethical boundaries',
    enneagramFocus: 'Shows core values, moral compass, and authenticity'
  },
  {
    id: 'creative_expression',
    label: 'Creativity & Hobbies',
    icon: 'Sparkles',
    description: 'Your approach to creative pursuits, hobbies, and self-expression',
    enneagramFocus: 'Reveals self-identity, need for uniqueness, and creative drive'
  },
  {
    id: 'conflict_resolution',
    label: 'Conflict & Disagreements',
    icon: 'MessageSquare',
    description: 'How you handle disagreements and resolve conflicts with others',
    enneagramFocus: 'Shows conflict style, emotional regulation, and harmony needs'
  },
  {
    id: 'life_changes',
    label: 'Major Life Transitions',
    icon: 'RefreshCw',
    description: 'Your response to major life changes like moving, relationship changes, etc.',
    enneagramFocus: 'Reveals adaptability, anxiety levels, and control needs'
  },
  {
    id: 'community_involvement',
    label: 'Community & Service',
    icon: 'Globe',
    description: 'Your involvement in community, volunteer work, and helping others',
    enneagramFocus: 'Shows altruism, connection needs, and sense of purpose'
  }
];

// Demo Profiles (Life-focused instead of job-focused)
export const demoProfiles = {
  youngProfessional: {
    lifeStage: 'Young Professional',
    interests: 'Reading, hiking, photography',
    relationshipStatus: 'In a relationship',
    personalGoals: 'Building meaningful relationships and finding work-life balance',
    relationWithChristianity: 'Exploring faith'
  },
  parent: {
    lifeStage: 'Parent of young children',
    interests: 'Family activities, cooking, gardening',
    relationshipStatus: 'Married',
    personalGoals: 'Raising well-adjusted children and maintaining personal identity',
    relationWithChristianity: 'Active believer'
  },
  student: {
    lifeStage: 'College Student',
    interests: 'Music, gaming, social activism',
    relationshipStatus: 'Single',
    personalGoals: 'Discovering passions and building independence',
    relationWithChristianity: 'Questioning'
  },
  midCareer: {
    lifeStage: 'Mid-life adult',
    interests: 'Travel, mentoring, wellness',
    relationshipStatus: 'Divorced',
    personalGoals: 'Rediscovering purpose and building new connections',
    relationWithChristianity: 'Rediscovering faith'
  },
  retiree: {
    lifeStage: 'Recently retired',
    interests: 'Volunteering, crafts, spending time with grandchildren',
    relationshipStatus: 'Widowed',
    personalGoals: 'Finding meaning in new chapter and staying connected',
    relationWithChristianity: 'Lifelong believer'
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
