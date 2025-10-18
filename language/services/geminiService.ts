
import { GoogleGenAI, Type } from '@google/genai';
import type { Word, BibleSentence } from '../types';
import { Language } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

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

export const generateBibleSentence = async (language: Language): Promise<BibleSentence> => {
  try {
    const languageText = language === Language.HEBREW ? 'Biblical Hebrew' : 'Koine Greek';
    const testament = language === Language.HEBREW ? 'Old Testament' : 'New Testament';

    const prompt = `Generate a complete Bible verse sentence in ${languageText} from the ${testament}.

Requirements:
- Choose a well-known, meaningful verse
- Provide the COMPLETE original ${languageText} text with proper characters
- Include accurate transliteration for pronunciation practice
- Provide clear English translation
- Include the Bible reference (book chapter:verse)

Output in JSON format with fields: original, transliteration, english, reference`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: prompt,
      config: {
        temperature: 0.9,
        responseMimeType: "application/json",
        responseSchema: sentenceResponseSchema
      }
    });

    const parsed = JSON.parse(response.text);

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
