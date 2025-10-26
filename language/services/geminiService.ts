
import { GoogleGenAI, Type } from '@google/genai';
import type { Word, BibleSentence } from '../types';
import { Language } from '../types';

const API_KEY = process.env.API_KEY || process.env.GEMINI_API_KEY;

// Note: Old single-provider service - use multiProviderLanguageService for failover
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

export const getPronunciationFeedback = async (
  word: Word,
  language: Language,
  audioBase64: string,
  mimeType: string
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `You are a friendly and encouraging biblical language pronunciation coach. The user is trying to pronounce the ${language} word "${word.word}". Please listen to the audio and provide brief, clear, and positive feedback on their pronunciation in 1-2 sentences. If they are correct, praise them. If they are slightly off, gently guide them on the correct sound. For reference, the word is transliterated as "${word.transliteration}" and means "${word.meaning}".`;

    const audioPart = {
      inlineData: {
        data: audioBase64,
        mimeType,
      },
    };
    const textPart = { text: prompt };

    const response = await ai.models.generateContent({
      model,
      contents: { parts: [textPart, audioPart] },
    });

    return response.text;
  } catch (error) {
    console.error('Error getting feedback from Gemini:', error);
    return 'Sorry, I encountered an error trying to analyze your pronunciation. Please try again.';
  }
};

// Schema for sentence generation
const sentenceResponseSchema = {
  type: Type.OBJECT,
  properties: {
    original: {
      type: Type.STRING,
      description: "The Bible verse in original Hebrew or Greek text"
    },
    transliteration: {
      type: Type.STRING,
      description: "Romanized pronunciation guide for the original text"
    },
    english: {
      type: Type.STRING,
      description: "English translation of the verse"
    },
    reference: {
      type: Type.STRING,
      description: "Bible verse reference (e.g., 'John 3:16', 'Genesis 1:1')"
    }
  },
  required: ["original", "transliteration", "english", "reference"]
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

export const generateBibleSentence = async (language: Language): Promise<BibleSentence> => {
  try {
    const languageText = language === Language.HEBREW ? 'Biblical Hebrew' : 'Koine Greek';
    const testament = language === Language.HEBREW ? 'Old Testament' : 'New Testament';

    // Randomly select a verse reference from predefined list, avoiding recent ones
    const verseList = language === Language.HEBREW ? hebrewVerses : greekVerses;
    let randomVerse: string;
    let attempts = 0;

    // Try to get a verse that wasn't recently used
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
    console.log('Recent verses:', recentVerses);

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: prompt,
      config: {
        temperature: 0.5,
        responseMimeType: "application/json",
        responseSchema: sentenceResponseSchema,
        candidateCount: 1
      }
    });

    const parsed = JSON.parse(response.text);

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

export const getSentencePronunciationScore = async (
  sentence: BibleSentence,
  audioBase64: string,
  mimeType: string
): Promise<{ score: number; feedback: string }> => {
  try {
    const model = 'gemini-2.5-flash';
    const languageName = sentence.language === Language.HEBREW ? 'Biblical Hebrew' : 'Koine Greek';

    const prompt = `You are an expert ${languageName} pronunciation evaluator. The user is attempting to pronounce this Bible verse:

Original: ${sentence.original}
Transliteration: ${sentence.transliteration}
English: ${sentence.english}
Reference: ${sentence.reference}

Listen to their pronunciation and provide:
1. A score from 0-100 (0=unintelligible, 50=understandable with errors, 80=good, 100=excellent/native-like)
2. Specific feedback on what they did well and what needs improvement

Respond in this EXACT format:
SCORE: [number]
FEEDBACK: [Your detailed feedback in 2-3 sentences]`;

    const audioPart = {
      inlineData: {
        data: audioBase64,
        mimeType,
      },
    };
    const textPart = { text: prompt };

    const response = await ai.models.generateContent({
      model,
      contents: { parts: [textPart, audioPart] },
    });

    const text = response.text;
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
