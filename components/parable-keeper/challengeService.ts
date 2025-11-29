/**
 * Challenge Generator for Parable Keeper Game
 * Generates Bible verse challenges to test players during gameplay
 */

import { RoleType, Challenge } from './types';

// Access API key from environment (configured in vite.config.ts)
const GEMINI_API_KEY = (process.env.GEMINI_API_KEY || process.env.API_KEY) as string | undefined;

// Log API key status on module load
if (GEMINI_API_KEY) {
  console.log('✅ Gemini API key found - AI challenge generation enabled');
  console.log('🔑 API Key:', GEMINI_API_KEY.substring(0, 10) + '...' + GEMINI_API_KEY.substring(GEMINI_API_KEY.length - 4));
} else {
  console.warn('⚠️ No Gemini API key found - using fallback challenges only');
}

// Fallback challenges if API is unavailable
const FALLBACK_CHALLENGES: Record<RoleType, Challenge[]> = {
  [RoleType.PASTOR]: [
    {
      id: '1',
      distractionText: "Deacons need budget approval. Members want meeting time.",
      distractionTextZh: "執事需要預算批准。會友要求會議時間。",
      bibleStatement: "For where your treasure is, there your heart will be also.",
      bibleStatementZh: "因為你的財寶在哪裡，你的心也在那裡。",
      isRealVerse: true,
      role: RoleType.PASTOR
    },
    {
      id: '2',
      distractionText: "Members request policy changes. Deacons need signatures.",
      distractionTextZh: "會友要求政策改變。執事需要簽名。",
      bibleStatement: "Blessed are those who hunger and thirst for paperwork.",
      bibleStatementZh: "那些渴慕文件工作的人有福了。",
      isRealVerse: false,
      role: RoleType.PASTOR
    },
    {
      id: '3',
      distractionText: "Committee wants your attention. Phone keeps ringing.",
      distractionTextZh: "委員會想要你的關注。電話不斷響起。",
      bibleStatement: "Be still, and know that I am God.",
      bibleStatementZh: "你們要休息，要知道我是神。",
      isRealVerse: true,
      role: RoleType.PASTOR
    }
  ],
  [RoleType.DEACON]: [
    {
      id: '4',
      distractionText: "Pastor needs report. Members complain about facilities.",
      distractionTextZh: "牧師需要報告。會友抱怨設施。",
      bibleStatement: "Cast all your anxiety on him because he cares for you.",
      bibleStatementZh: "你們要將一切的憂慮卸給神，因為他顧念你們。",
      isRealVerse: true,
      role: RoleType.DEACON
    },
    {
      id: '5',
      distractionText: "Members want help. Pastor requests committee work.",
      distractionTextZh: "會友需要幫助。牧師要求委員會工作。",
      bibleStatement: "He who complains the loudest shall receive double blessings.",
      bibleStatementZh: "抱怨最多的人將得到雙倍祝福。",
      isRealVerse: false,
      role: RoleType.DEACON
    },
    {
      id: '6',
      distractionText: "Broken AC and leaking roof need fixing today.",
      distractionTextZh: "壞掉的空調和漏水的屋頂今天需要修理。",
      bibleStatement: "Do not worry about tomorrow, for tomorrow will worry about itself.",
      bibleStatementZh: "不要為明天憂慮，因為明天自有明天的憂慮。",
      isRealVerse: true,
      role: RoleType.DEACON
    }
  ],
  [RoleType.MEMBER]: [
    {
      id: '7',
      distractionText: "Pastor asks for event volunteers. Deacon needs helpers.",
      distractionTextZh: "牧師尋求活動志願者。執事需要幫手。",
      bibleStatement: "Love your neighbor as yourself.",
      bibleStatementZh: "要愛人如己。",
      isRealVerse: true,
      role: RoleType.MEMBER
    },
    {
      id: '8',
      distractionText: "Deacon invites to committee. Pastor requests choir practice.",
      distractionTextZh: "執事邀請加入委員會。牧師要求詩班練習。",
      bibleStatement: "Blessed are the busy, for they shall inherit the earth.",
      bibleStatementZh: "忙碌的人有福了，因為他們必承受地土。",
      isRealVerse: false,
      role: RoleType.MEMBER
    },
    {
      id: '9',
      distractionText: "New visitor needs directions. Phone won't stop buzzing.",
      distractionTextZh: "新訪客需要指引。手機不停震動。",
      bibleStatement: "Do not neglect to show hospitality to strangers.",
      bibleStatementZh: "不可忘記用愛心接待客旅。",
      isRealVerse: true,
      role: RoleType.MEMBER
    }
  ]
};

/**
 * Generate a challenge using Gemini API with fallback to static challenges
 */
export async function generateChallenge(role: RoleType): Promise<Challenge> {
  // If no API key, use fallback immediately
  if (!GEMINI_API_KEY) {
    console.log('No API key found, using fallback challenge');
    return getRandomFallbackChallenge(role);
  }

  try {
    const distractorInfo = {
      [RoleType.PASTOR]: "deacons and members bothering with admin work and meetings",
      [RoleType.DEACON]: "pastors and members with complaints and work requests",
      [RoleType.MEMBER]: "pastors and deacons diverting attention to church activities"
    };

    const isRealVerse = Math.random() > 0.5;

    // Diverse scenario templates for more variety
    const scenarioTemplates = {
      [RoleType.PASTOR]: [
        "committee meeting requests pile up during service",
        "deacon asks about budget while you're greeting visitors",
        "phone keeps buzzing with church business texts",
        "members want to schedule meetings during worship",
        "financial reports need signing urgently"
      ],
      [RoleType.DEACON]: [
        "broken equipment needs immediate attention",
        "volunteers cancel last minute, need replacements",
        "facility complaints come in during greeting time",
        "multiple people need practical help right now",
        "pastor requests urgent administrative work"
      ],
      [RoleType.MEMBER]: [
        "friend invites you to social event during service",
        "work colleague needs help with personal crisis",
        "family member asks you to handle urgent matter",
        "neighbor requests immediate favor",
        "multiple group chats demanding attention"
      ]
    };

    const randomScenario = scenarioTemplates[role][Math.floor(Math.random() * scenarioTemplates[role].length)];

    const prompt = `You are generating a challenge for a church service game. Create a distraction scenario and Bible verse test.

ROLE: ${role} (church ${role.toLowerCase()})
CONTEXT: ${randomScenario}

Generate ONLY a valid JSON object (no markdown, no code blocks, no explanations) with these exact fields:

{
  "distractionText": "Brief urgent scenario (10-15 words max) describing: ${randomScenario}",
  "distractionTextZh": "Same scenario in Traditional Chinese (繁體中文)",
  "bibleStatement": "${isRealVerse ? 'A REAL Bible verse quote (just the verse text, no reference)' : 'A FAKE verse that sounds Biblical but is completely made up'}",
  "bibleStatementZh": "Same verse in Traditional Chinese using proper biblical language",
  "isRealVerse": ${isRealVerse}
}

REQUIREMENTS:
- distractionText: Make it feel urgent and realistic for a ${role}
- bibleStatement: ${isRealVerse ?
    'Use an actual verse from Old or New Testament. Choose verses about priorities, focus, service, hospitality, or faith. DO NOT include book/chapter reference, just the verse text.' :
    'Create a plausible-sounding fake verse that mimics Biblical language/structure but is NOT real. Make it sound authentic but slightly off.'}
- Both languages must match in meaning
- Keep it concise and game-appropriate

Return ONLY the JSON object.`;

    console.log(`🎯 Generating ${isRealVerse ? 'REAL' : 'FAKE'} verse challenge for ${role}...`);

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': GEMINI_API_KEY
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Gemini API error: ${response.status}`, errorText);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.error('No text in Gemini response:', data);
      throw new Error('No text in Gemini response');
    }

    // Remove markdown code blocks if present
    const jsonText = text.trim().replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    let parsed;
    try {
      parsed = JSON.parse(jsonText);
    } catch (parseError) {
      console.error('JSON parse error. Raw text:', jsonText);
      throw parseError;
    }

    const challenge: Challenge = {
      id: Math.random().toString(36).substr(2, 9),
      distractionText: parsed.distractionText,
      distractionTextZh: parsed.distractionTextZh,
      bibleStatement: parsed.bibleStatement,
      bibleStatementZh: parsed.bibleStatementZh,
      isRealVerse: parsed.isRealVerse,
      role
    };

    console.log(`✅ Generated challenge:`, {
      isReal: challenge.isRealVerse,
      verse: challenge.bibleStatement.substring(0, 50) + '...',
      distraction: challenge.distractionText
    });

    return challenge;
  } catch (error) {
    console.error("❌ Challenge generation error:", error);
    console.log("⚠️ Using fallback challenge instead");
    return getRandomFallbackChallenge(role);
  }
}

/**
 * Get a random fallback challenge for the given role
 */
function getRandomFallbackChallenge(role: RoleType): Challenge {
  const challenges = FALLBACK_CHALLENGES[role];
  return challenges[Math.floor(Math.random() * challenges.length)];
}
