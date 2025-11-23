/**
 * Multi-Provider Bible Service
 * Implements automatic failover across OpenAI → Ollama Cloud → Gemini
 *
 * Provider Priority Chain:
 * 1. OpenAI GPT-4o (Primary) - Highest reliability, confirmed working
 * 2. Ollama Cloud (Secondary) - kimi-k2:1t-cloud (fast, cost-effective)
 * 3. Google Gemini (Tertiary) - gemini-2.0-flash-exp (may have location restrictions)
 */

import { Language } from '../types';

// Provider configuration
const PROVIDERS = {
  OPENAI: {
    name: 'OpenAI',
    model: 'gpt-4o',
    endpoint: '/api/chat',
  },
  OLLAMA: {
    name: 'Ollama Cloud',
    model: 'kimi-k2:1t-cloud',  // Updated to valid Ollama model
    endpoint: '/api/chat',
  },
  GEMINI: {
    name: 'Google Gemini',
    model: 'gemini-2.0-flash-exp',
    apiKey: process.env.GEMINI_API_KEY || process.env.API_KEY,
  },
};

export interface BibleVerseResult {
  reference: string;
  book: string;
  chapter: number;
  verse: number;
  translations: {
    english: string;
    traditionalChinese: string;
    original: string; // Hebrew or Greek
  };
  highlightedWords: {
    original: string;
    transliteration: string;
    meaning: string;
    strongsNumber?: string;
    position: number;
  }[];
  language: Language;
}

/**
 * Call Ollama Cloud via unified API proxy
 */
async function callOllamaCloud(prompt: string): Promise<string> {
  const messages = [{ role: 'user', content: prompt }];

  const response = await fetch(PROVIDERS.OLLAMA.endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      provider: 'ollama',
      model: PROVIDERS.OLLAMA.model,
      messages,
      temperature: 0.3,
      topP: 0.9,
      maxTokens: 3000,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Ollama Cloud API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  if (!data.content) {
    throw new Error('Invalid response format from Ollama Cloud');
  }

  return data.content;
}

/**
 * Call Gemini API directly
 */
async function callGemini(prompt: string): Promise<string> {
  const apiKey = PROVIDERS.GEMINI.apiKey;

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY not configured');
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${PROVIDERS.GEMINI.model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          topP: 0.9,
          maxOutputTokens: 3000,
          responseMimeType: "application/json",
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();

  if (data.candidates?.[0]?.content?.parts) {
    return data.candidates[0].content.parts.map((p: any) => p.text).join('');
  }

  throw new Error('Invalid response format from Gemini');
}

/**
 * Call OpenAI via unified API proxy
 */
async function callOpenAI(prompt: string): Promise<string> {
  const messages = [
    {
      role: 'system',
      content: 'You are a biblical scholar assistant. Always respond with valid JSON only. No markdown, no code blocks, just pure JSON.'
    },
    { role: 'user', content: prompt }
  ];

  const response = await fetch(PROVIDERS.OPENAI.endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      provider: 'openai',
      model: PROVIDERS.OPENAI.model,
      messages,
      temperature: 0.3,
      topP: 0.9,
      maxTokens: 3000,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  if (!data.content) {
    throw new Error('Invalid response format from OpenAI');
  }

  return data.content;
}

/**
 * Execute request with automatic provider failover
 */
async function executeWithFailover(prompt: string, context: string): Promise<string> {
  console.log(`🔄 ${context} - Starting provider chain...`);

  // Try OpenAI first (confirmed working)
  try {
    console.log(`🔄 Trying ${PROVIDERS.OPENAI.name} (${PROVIDERS.OPENAI.model})...`);
    const result = await callOpenAI(prompt);
    console.log(`✅ ${PROVIDERS.OPENAI.name} succeeded`);
    return result;
  } catch (error: any) {
    console.warn(`⚠️ ${PROVIDERS.OPENAI.name} failed:`, error.message);
  }

  // Fallback to Ollama Cloud
  try {
    console.log(`↪️ Falling back to ${PROVIDERS.OLLAMA.name} (${PROVIDERS.OLLAMA.model})...`);
    const result = await callOllamaCloud(prompt);
    console.log(`✅ ${PROVIDERS.OLLAMA.name} succeeded`);
    return result;
  } catch (error: any) {
    console.warn(`⚠️ ${PROVIDERS.OLLAMA.name} failed:`, error.message);
  }

  // Final fallback to Gemini
  try {
    console.log(`↪️ Falling back to ${PROVIDERS.GEMINI.name} (${PROVIDERS.GEMINI.model})...`);
    const result = await callGemini(prompt);
    console.log(`✅ ${PROVIDERS.GEMINI.name} succeeded`);
    return result;
  } catch (error: any) {
    console.error(`❌ ${PROVIDERS.GEMINI.name} failed:`, error.message);
  }

  throw new Error('All AI providers failed. Please check your configuration and try again.');
}

/**
 * Parse JSON response (handles markdown code blocks)
 */
function parseJSONResponse(text: string): any {
  let cleanedText = text.trim();

  if (cleanedText.startsWith('```json')) {
    cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/```\s*$/, '');
  } else if (cleanedText.startsWith('```')) {
    cleanedText = cleanedText.replace(/^```\s*/, '').replace(/```\s*$/, '');
  }

  return JSON.parse(cleanedText.trim());
}

/**
 * Search and fetch Bible verse with all translations using multi-provider AI
 */
export async function fetchBibleVerse(
  reference: string,
  language: Language
): Promise<BibleVerseResult | null> {
  try {
    const testament = language === Language.HEBREW ? 'Old Testament' : 'New Testament';
    const originalLanguage = language === Language.HEBREW ? 'Hebrew' : 'Greek';

    const prompt = `You are a biblical scholar. Provide the following information for ${reference} from the ${testament}:

1. The exact ${originalLanguage} original text
2. English translation (ESV or NIV style)
3. Traditional Chinese translation (和合本 style)
4. Identify 3-5 key theological or significant words in the original ${originalLanguage}
5. For each key word provide:
   - Original ${originalLanguage} text
   - Transliteration
   - English meaning
   - Position in the verse (0-based index)

Return as JSON with this exact structure:
{
  "reference": "${reference}",
  "book": "book name",
  "chapter": number,
  "verse": number,
  "translations": {
    "english": "English text",
    "traditionalChinese": "繁體中文",
    "original": "${originalLanguage} text"
  },
  "highlightedWords": [
    {
      "original": "${originalLanguage} word",
      "transliteration": "romanization",
      "meaning": "English meaning",
      "position": 0
    }
  ]
}

Be accurate with the ${originalLanguage} text and ensure the Traditional Chinese uses proper theological terminology.`;

    const resultText = await executeWithFailover(prompt, `Fetch Bible Verse: ${reference}`);
    const verseData = parseJSONResponse(resultText);

    return {
      ...verseData,
      language
    };
  } catch (error) {
    console.error('Bible verse fetch error:', error);
    return null;
  }
}

/**
 * Search Bible verses by keyword using multi-provider AI
 */
export async function searchBibleByKeyword(
  keyword: string,
  language: Language,
  limit: number = 10
): Promise<BibleVerseResult[]> {
  try {
    const testament = language === Language.HEBREW ? 'Old Testament' : 'New Testament';
    const originalLanguage = language === Language.HEBREW ? 'Hebrew' : 'Greek';

    const prompt = `Find ${limit} significant verses from the ${testament} that relate to the keyword "${keyword}".

For each verse provide:
1. The reference (e.g., "Genesis 1:1")
2. ${originalLanguage} original text
3. English translation
4. Traditional Chinese translation (和合本)
5. 2-3 key words from the original ${originalLanguage} with transliterations and meanings

Return as JSON array with this structure:
[
  {
    "reference": "Book Chapter:Verse",
    "book": "book name",
    "chapter": number,
    "verse": number,
    "translations": {
      "english": "text",
      "traditionalChinese": "文本",
      "original": "${originalLanguage} text"
    },
    "highlightedWords": [
      {
        "original": "word",
        "transliteration": "romanization",
        "meaning": "meaning",
        "position": 0
      }
    ]
  }
]`;

    const resultText = await executeWithFailover(prompt, `Search Bible: ${keyword}`);
    const verses = parseJSONResponse(resultText);

    return verses.map((v: any) => ({
      ...v,
      language
    }));
  } catch (error) {
    console.error('Bible search error:', error);
    return [];
  }
}

/**
 * Get detailed word analysis for Hebrew/Greek words
 */
export async function analyzeWord(
  word: string,
  language: Language
): Promise<{
  original: string;
  transliteration: string;
  meaning: string;
  etymology: string;
  usageExamples: string[];
  relatedWords: string[];
} | null> {
  try {
    const languageName = language === Language.HEBREW ? 'Biblical Hebrew' : 'Koine Greek';

    const prompt = `Provide detailed linguistic analysis for the ${languageName} word "${word}":

Return as JSON:
{
  "original": "${word}",
  "transliteration": "romanization",
  "meaning": "primary meaning",
  "etymology": "word origin and root",
  "usageExamples": ["example verse reference 1", "example verse reference 2"],
  "relatedWords": ["related word 1", "related word 2"]
}`;

    const resultText = await executeWithFailover(prompt, `Analyze Word: ${word}`);
    return parseJSONResponse(resultText);
  } catch (error) {
    console.error('Word analysis error:', error);
    return null;
  }
}

/**
 * Get passage with verse-by-verse breakdown
 */
export async function getPassageAnalysis(
  startReference: string,
  endReference: string,
  language: Language
): Promise<BibleVerseResult[]> {
  try {
    const originalLanguage = language === Language.HEBREW ? 'Hebrew' : 'Greek';

    const prompt = `Provide verse-by-verse analysis from ${startReference} to ${endReference}.

For each verse include:
- ${originalLanguage} original text
- English translation
- Traditional Chinese translation
- Key theological words with transliterations

Return as JSON array of verses.`;

    const resultText = await executeWithFailover(prompt, `Passage Analysis: ${startReference}-${endReference}`);
    const verses = parseJSONResponse(resultText);

    return verses.map((v: any) => ({
      ...v,
      language
    }));
  } catch (error) {
    console.error('Passage analysis error:', error);
    return [];
  }
}
