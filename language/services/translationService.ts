import { Language } from '../types';
import type { VocabularyCard } from '../vocabularyData';

interface TranslationQuestion {
  word: VocabularyCard;
  sentence: string;
  sentenceTranslation: string;
  correctMeaning: string;
  options: string[];
}

/**
 * Generate a translation question for a given word
 * Creates a sentence with the word used in context and generates answer options
 */
export async function generateTranslationQuestion(
  word: VocabularyCard,
  language: Language
): Promise<TranslationQuestion> {
  // Check if we have Gemini API key
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;

  if (!apiKey) {
    // Fallback to simple generation without AI
    return generateSimpleQuestion(word, language);
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a Biblical language teacher. Generate a translation practice question.

Word: ${word.word} (${word.transliteration})
Language: ${language}
Correct Meaning: ${word.meanings[0]}
Part of Speech: ${word.partOfSpeech}
All Possible Meanings: ${word.meanings.join(', ')}

Task:
1. Create a SHORT sentence in ${language === 'Hebrew' ? 'Biblical Hebrew' : 'Biblical Greek'} (5-8 words max) that uses the word "${word.word}" in a clear context
2. Provide an English translation of the sentence
3. Generate 3 plausible but INCORRECT meanings that could confuse learners (they should be related to the same general semantic field but clearly wrong in this context)

Return ONLY a valid JSON object with this EXACT structure (no markdown, no code blocks):
{
  "sentence": "sentence in ${language === 'Hebrew' ? 'Hebrew' : 'Greek'} using ${word.word}",
  "sentenceTranslation": "English translation of the sentence",
  "correctMeaning": "${word.meanings[0]}",
  "incorrectOptions": ["wrong meaning 1", "wrong meaning 2", "wrong meaning 3"]
}

IMPORTANT:
- The sentence MUST be in ${language === 'Hebrew' ? 'Hebrew' : 'Greek'} script
- Keep the sentence SHORT and SIMPLE
- Make sure the correct meaning fits the context
- Return ONLY valid JSON, nothing else`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 500,
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error('Failed to generate question');
    }

    const data = await response.json();
    const text = data.candidates[0]?.content?.parts[0]?.text;

    if (!text) {
      throw new Error('No response from AI');
    }

    // Parse the JSON response
    let parsedResponse;
    try {
      // Remove markdown code blocks if present
      const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsedResponse = JSON.parse(cleanedText);
    } catch (e) {
      console.error('Failed to parse AI response:', text);
      throw new Error('Invalid AI response format');
    }

    // Shuffle options (correct + incorrect)
    const allOptions = [
      parsedResponse.correctMeaning,
      ...parsedResponse.incorrectOptions
    ];
    const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);

    return {
      word,
      sentence: parsedResponse.sentence,
      sentenceTranslation: parsedResponse.sentenceTranslation,
      correctMeaning: parsedResponse.correctMeaning,
      options: shuffledOptions
    };

  } catch (error) {
    console.error('Error generating AI question:', error);
    // Fallback to simple generation
    return generateSimpleQuestion(word, language);
  }
}

/**
 * Generate a simple question without AI (fallback)
 */
function generateSimpleQuestion(
  word: VocabularyCard,
  language: Language
): TranslationQuestion {
  // Use the example from the word data if available
  const example = word.examples[0];

  // Generate incorrect options by using other meanings or common confusions
  const incorrectOptions: string[] = [];

  // Add other meanings from the same word if available
  if (word.meanings.length > 1) {
    incorrectOptions.push(...word.meanings.slice(1, 3));
  }

  // Add generic incorrect options based on part of speech
  const genericOptions: Record<string, string[]> = {
    noun: ['person', 'place', 'thing', 'concept', 'action'],
    verb: ['to move', 'to think', 'to speak', 'to make', 'to have'],
    adjective: ['good', 'bad', 'big', 'small', 'beautiful'],
    pronoun: ['I', 'you', 'he', 'they', 'it'],
    preposition: ['in', 'on', 'at', 'with', 'from'],
    conjunction: ['and', 'but', 'or', 'because', 'if'],
    particle: ['not', 'also', 'indeed', 'therefore', 'however'],
    adverb: ['quickly', 'slowly', 'very', 'here', 'there']
  };

  const partOfSpeechOptions = genericOptions[word.partOfSpeech] || ['option 1', 'option 2', 'option 3'];

  // Fill remaining slots with generic options
  while (incorrectOptions.length < 3) {
    const option = partOfSpeechOptions[incorrectOptions.length % partOfSpeechOptions.length];
    if (option !== word.meanings[0] && !incorrectOptions.includes(option)) {
      incorrectOptions.push(option);
    }
  }

  // Ensure we have exactly 3 incorrect options
  const finalIncorrectOptions = incorrectOptions.slice(0, 3);

  // Shuffle all options
  const allOptions = [word.meanings[0], ...finalIncorrectOptions];
  const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);

  return {
    word,
    sentence: example?.text || word.word,
    sentenceTranslation: example?.translation || `Translation of ${word.word}`,
    correctMeaning: word.meanings[0],
    options: shuffledOptions
  };
}
