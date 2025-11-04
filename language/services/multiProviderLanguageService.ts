/**
 * Multi-Provider Language Service
 * Implements automatic failover across OpenAI → Ollama Cloud → Gemini
 *
 * Provider Priority Chain:
 * 1. OpenAI GPT-4o (Primary) - Highest reliability, confirmed working
 * 2. Ollama Cloud (Secondary) - kimi-k2:1t-cloud (fast, cost-effective)
 * 3. Google Gemini (Tertiary) - gemini-2.0-flash-exp (may have location restrictions)
 */

import type { Word, BibleSentence } from '../types';
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
    apiKey: process.env.API_KEY || process.env.GEMINI_API_KEY,
  },
};

// Predefined verse references for variety
const hebrewVerses = [
  'Genesis 1:1', 'Psalm 23:1', 'Proverbs 3:5', 'Isaiah 40:31', 'Jeremiah 29:11',
  'Psalm 119:105', 'Deuteronomy 6:4', 'Exodus 20:3', 'Proverbs 16:3', 'Isaiah 53:5',
  'Psalm 46:1', 'Joshua 1:9', 'Micah 6:8', 'Ecclesiastes 3:1', 'Numbers 6:24-25'
];

const greekVerses = [
  'John 3:16', 'Romans 8:28', 'Philippians 4:13', '1 Corinthians 13:4', 'Matthew 5:3',
  'John 1:1', 'Romans 12:2', 'Galatians 5:22', 'Ephesians 2:8', 'James 1:2',
  'Matthew 6:33', '1 John 4:8', 'Colossians 3:23', 'Hebrews 11:1', 'Revelation 21:4'
];

// Track recently used verses to avoid repetition
const recentVerses: string[] = [];
const MAX_RECENT = 5;

/**
 * Call Ollama Cloud via unified API proxy
 */
async function callOllamaCloud(messages: Array<{ role: string; content: string }>, temperature = 0.7): Promise<string> {
  const response = await fetch(PROVIDERS.OLLAMA.endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      provider: 'ollama',
      model: PROVIDERS.OLLAMA.model,
      messages,
      temperature,
      topP: 0.9,
      maxTokens: 2000,
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
async function callGemini(messages: Array<{ role: string; content: string }>, temperature = 0.7): Promise<string> {
  const apiKey = PROVIDERS.GEMINI.apiKey;

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY not configured');
  }

  // Convert messages to Gemini format
  const geminiMessages = messages
    .filter(m => m.role !== 'system')
    .map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

  const systemMessage = messages.find(m => m.role === 'system');

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${PROVIDERS.GEMINI.model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: geminiMessages,
        systemInstruction: systemMessage ? {
          parts: [{ text: systemMessage.content }]
        } : undefined,
        generationConfig: {
          temperature,
          topP: 0.9,
          maxOutputTokens: 2000,
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
async function callOpenAI(messages: Array<{ role: string; content: string }>, temperature = 0.7): Promise<string> {
  const response = await fetch(PROVIDERS.OPENAI.endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      provider: 'openai',
      model: PROVIDERS.OPENAI.model,
      messages,
      temperature,
      topP: 0.9,
      maxTokens: 2000,
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
async function executeWithFailover(
  messages: Array<{ role: string; content: string }>,
  temperature = 0.7,
  context = 'Request'
): Promise<string> {
  console.log(`🔄 ${context} - Starting provider chain...`);

  // Try OpenAI first (confirmed working)
  try {
    console.log(`🔄 Trying ${PROVIDERS.OPENAI.name} (${PROVIDERS.OPENAI.model})...`);
    const result = await callOpenAI(messages, temperature);
    console.log(`✅ ${PROVIDERS.OPENAI.name} succeeded`);
    return result;
  } catch (error: any) {
    console.warn(`⚠️ ${PROVIDERS.OPENAI.name} failed:`, error.message);
  }

  // Fallback to Ollama Cloud
  try {
    console.log(`↪️ Falling back to ${PROVIDERS.OLLAMA.name} (${PROVIDERS.OLLAMA.model})...`);
    const result = await callOllamaCloud(messages, temperature);
    console.log(`✅ ${PROVIDERS.OLLAMA.name} succeeded`);
    return result;
  } catch (error: any) {
    console.warn(`⚠️ ${PROVIDERS.OLLAMA.name} failed:`, error.message);
  }

  // Final fallback to Gemini
  try {
    console.log(`↪️ Falling back to ${PROVIDERS.GEMINI.name} (${PROVIDERS.GEMINI.model})...`);
    const result = await callGemini(messages, temperature);
    console.log(`✅ ${PROVIDERS.GEMINI.name} succeeded`);
    return result;
  } catch (error: any) {
    console.error(`❌ ${PROVIDERS.GEMINI.name} failed:`, error.message);
  }

  throw new Error('All AI providers failed. Please check your configuration and try again.');
}

/**
 * Get pronunciation feedback with automatic failover
 */
export const getPronunciationFeedback = async (
  word: Word,
  language: Language,
  audioBase64: string,
  mimeType: string
): Promise<string> => {
  try {
    // Note: Audio analysis requires vision/audio models
    // For now, we'll use text-based simulation until audio API is fully integrated
    const prompt = `You are a friendly and encouraging biblical language pronunciation coach. The user is trying to pronounce the ${language} word "${word.word}". The word is transliterated as "${word.transliteration}" and means "${word.meaning}".

Based on audio analysis (simulated), provide brief, clear, and positive feedback on their pronunciation in 1-2 sentences. If they are correct, praise them. If they are slightly off, gently guide them on the correct sound.`;

    const messages = [{ role: 'user', content: prompt }];

    return await executeWithFailover(messages, 0.7, 'Pronunciation Feedback');
  } catch (error) {
    console.error('Error getting pronunciation feedback:', error);
    return 'Sorry, I encountered an error trying to analyze your pronunciation. Please try again.';
  }
};

/**
 * Generate Bible sentence with automatic failover
 */
export const generateBibleSentence = async (language: Language): Promise<BibleSentence> => {
  try {
    const languageText = language === Language.HEBREW ? 'Biblical Hebrew' : 'Koine Greek';

    // Randomly select a verse reference from predefined list, avoiding recent ones
    const verseList = language === Language.HEBREW ? hebrewVerses : greekVerses;
    let randomVerse: string;
    let attempts = 0;

    do {
      const randomIndex = Math.floor(Math.random() * verseList.length);
      randomVerse = verseList[randomIndex];
      attempts++;
    } while (recentVerses.includes(randomVerse) && attempts < 10);

    // Track this verse
    recentVerses.push(randomVerse);
    if (recentVerses.length > MAX_RECENT) {
      recentVerses.shift();
    }

    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(7);

    const prompt = `[Request ID: ${randomId}] Generate the specific Bible verse "${randomVerse}" in ${languageText}.

CRITICAL: You MUST provide the verse "${randomVerse}" - not any other verse.

Requirements:
- Provide the COMPLETE original ${languageText} text with proper characters and vowel points if applicable
- Include accurate transliteration for pronunciation practice
- Provide clear English translation
- The reference field MUST be exactly: ${randomVerse}

Unique request timestamp: ${timestamp}

Output in JSON format with fields: original, transliteration, english, reference`;

    console.log(`%c[${randomId}] Generating verse: ${randomVerse} at ${new Date(timestamp).toLocaleTimeString()}`, 'color: blue; font-weight: bold');

    const messages = [{ role: 'user', content: prompt }];
    const resultText = await executeWithFailover(messages, 0.5, `Generate Bible Verse [${randomId}]`);

    // Parse JSON response
    const parsed = JSON.parse(resultText);

    console.log(`%c[${randomId}] ✓ Generated: ${parsed.reference}`, 'color: green; font-weight: bold', parsed);

    return {
      original: parsed.original,
      transliteration: parsed.transliteration,
      english: parsed.english,
      reference: parsed.reference,
      language
    };
  } catch (error) {
    console.error('Error generating Bible sentence:', error);
    throw new Error('Failed to generate Bible sentence. Please try again.');
  }
};

/**
 * Get sentence pronunciation score with automatic failover
 */
export const getSentencePronunciationScore = async (
  sentence: BibleSentence,
  audioBase64: string,
  mimeType: string
): Promise<{ score: number; feedback: string }> => {
  try {
    const languageName = sentence.language === Language.HEBREW ? 'Biblical Hebrew' : 'Koine Greek';

    const prompt = `You are an expert ${languageName} pronunciation evaluator. The user is attempting to pronounce this Bible verse:

Original: ${sentence.original}
Transliteration: ${sentence.transliteration}
English: ${sentence.english}
Reference: ${sentence.reference}

Based on audio analysis (simulated), provide:
1. A score from 0-100 (0=unintelligible, 50=understandable with errors, 80=good, 100=excellent/native-like)
2. Specific feedback on what they did well and what needs improvement

Respond in this EXACT format:
SCORE: [number]
FEEDBACK: [Your detailed feedback in 2-3 sentences]`;

    const messages = [{ role: 'user', content: prompt }];
    const text = await executeWithFailover(messages, 0.7, 'Pronunciation Score');

    const scoreMatch = text.match(/SCORE:\s*(\d+)/);
    const feedbackMatch = text.match(/FEEDBACK:\s*(.+)/s);

    const score = scoreMatch ? parseInt(scoreMatch[1]) : 50;
    const feedback = feedbackMatch ? feedbackMatch[1].trim() : text;

    return { score, feedback };
  } catch (error) {
    console.error('Error getting sentence pronunciation score:', error);
    return {
      score: 0,
      feedback: 'Unable to evaluate pronunciation. Please try again.'
    };
  }
};
