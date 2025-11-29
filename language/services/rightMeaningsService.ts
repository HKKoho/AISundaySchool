import { Language } from '../types';
import type { VocabularyCard } from '../vocabularyData';

interface RightMeaningsQuestion {
  word: VocabularyCard;
  sentence: string;
  reference: string;
  correctMeaning: string;
  options: string[];
}

/**
 * Generate a Right Meanings question for a given word
 * Creates a Bible sentence with the word and provides multiple valid Biblical meanings
 * All options are real Biblical usages of the word, but only one fits this specific context
 */
export async function generateRightMeaningsQuestion(
  word: VocabularyCard,
  language: Language
): Promise<RightMeaningsQuestion> {
  // Check if we have Gemini API key
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;

  if (!apiKey) {
    // Fallback to simple generation without AI
    return generateSimpleRightMeaningsQuestion(word, language);
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
                  text: `You are a Biblical language expert. Generate a "Right Meanings" practice question.

Word: ${word.word} (${word.transliteration})
Language: ${language === 'Hebrew' ? 'Biblical Hebrew' : 'Biblical Greek'}
Known Meanings: ${word.meanings.join(', ')}
Part of Speech: ${word.partOfSpeech}

This word has MULTIPLE valid meanings in the Bible, each used in different contexts.

Task:
1. Find or create an ACTUAL Bible verse (5-10 words) in ${language === 'Hebrew' ? 'Hebrew' : 'Greek'} that uses "${word.word}"
2. Provide the Bible reference (e.g., "Genesis 1:1", "John 3:16")
3. Determine the CORRECT meaning of "${word.word}" in THIS specific verse context
4. Generate 3 OTHER meanings that are ALSO valid Biblical usages of this same word, but used in DIFFERENT verse contexts
   - These must be REAL alternative meanings the word has in other Bible passages
   - They should be plausible but clearly wrong for THIS specific context

Return ONLY a valid JSON object with this EXACT structure (no markdown, no code blocks):
{
  "sentence": "Bible verse in ${language === 'Hebrew' ? 'Hebrew' : 'Greek'} script",
  "reference": "Book Chapter:Verse",
  "correctMeaning": "meaning that fits THIS verse context",
  "otherBiblicalMeanings": [
    "valid meaning from other contexts 1",
    "valid meaning from other contexts 2",
    "valid meaning from other contexts 3"
  ]
}

CRITICAL REQUIREMENTS:
- The sentence MUST be in ${language === 'Hebrew' ? 'Hebrew' : 'Greek'} script
- All 4 meanings must be ACTUAL Biblical usages of this word
- Only the correctMeaning fits THIS specific verse
- The other 3 meanings are used in DIFFERENT Bible verses
- Keep sentence SHORT (5-10 words max)
- Use a well-known Bible verse if possible
- Return ONLY valid JSON`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 600,
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

    // Shuffle options (correct + other biblical meanings)
    const allOptions = [
      parsedResponse.correctMeaning,
      ...parsedResponse.otherBiblicalMeanings
    ];
    const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);

    return {
      word,
      sentence: parsedResponse.sentence,
      reference: parsedResponse.reference,
      correctMeaning: parsedResponse.correctMeaning,
      options: shuffledOptions
    };

  } catch (error) {
    console.error('Error generating AI question:', error);
    // Fallback to simple generation
    return generateSimpleRightMeaningsQuestion(word, language);
  }
}

/**
 * Generate a simple question without AI (fallback)
 * Uses the word's example from vocabularyData
 */
function generateSimpleRightMeaningsQuestion(
  word: VocabularyCard,
  language: Language
): RightMeaningsQuestion {
  // Use the example from the word data if available
  const example = word.examples[0];

  // If the word has multiple meanings, use them
  let otherMeanings: string[] = [];

  if (word.meanings.length > 1) {
    // Use other meanings from the same word
    otherMeanings = word.meanings.slice(1);
  }

  // Fill in with generic meanings if we don't have enough
  const genericMeanings: Record<string, string[]> = {
    noun: ['thing', 'person', 'place', 'concept', 'object', 'being'],
    verb: ['to do', 'to make', 'to go', 'to be', 'to have', 'to see'],
    adjective: ['great', 'good', 'holy', 'true', 'right', 'blessed'],
    pronoun: ['he', 'she', 'they', 'it', 'this', 'that'],
    preposition: ['in', 'on', 'with', 'from', 'to', 'by'],
    conjunction: ['and', 'but', 'or', 'for', 'nor', 'yet'],
    particle: ['indeed', 'truly', 'also', 'not', 'even', 'surely'],
    adverb: ['very', 'greatly', 'well', 'truly', 'rightly', 'surely']
  };

  const possibleMeanings = genericMeanings[word.partOfSpeech] || ['meaning 1', 'meaning 2', 'meaning 3'];

  // Fill to 3 other meanings
  while (otherMeanings.length < 3) {
    const candidate = possibleMeanings[otherMeanings.length % possibleMeanings.length];
    if (candidate !== word.meanings[0] && !otherMeanings.includes(candidate)) {
      otherMeanings.push(candidate);
    }
  }

  // Ensure exactly 3 other meanings
  const finalOtherMeanings = otherMeanings.slice(0, 3);

  // Shuffle all options
  const allOptions = [word.meanings[0], ...finalOtherMeanings];
  const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);

  return {
    word,
    sentence: example?.text || word.word,
    reference: example?.reference || 'Example verse',
    correctMeaning: word.meanings[0],
    options: shuffledOptions
  };
}
