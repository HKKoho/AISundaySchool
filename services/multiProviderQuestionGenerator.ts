/**
 * Multi-Provider Bible Question Generator
 * Implements automatic failover across OpenAI → Ollama Cloud → Gemini
 *
 * Provider Priority Chain:
 * 1. OpenAI GPT-4o (Primary) - Highest reliability, confirmed working
 * 2. Ollama Cloud (Secondary) - kimi-k2:1t-cloud (1T parameters, high quality)
 * 3. Google Gemini (Tertiary) - gemini-2.0-flash-exp (may have location restrictions)
 */

import type { Quest, QuestionCategory } from '../types';

// Provider configuration
const PROVIDERS = {
  OPENAI: {
    name: 'OpenAI',
    model: 'gpt-4o',
    endpoint: '/api/chat',
  },
  OLLAMA: {
    name: 'Ollama Cloud',
    model: 'kimi-k2:1t-cloud',  // 1T parameter model from Ollama Cloud
    endpoint: '/api/chat',
  },
  GEMINI: {
    name: 'Google Gemini',
    model: 'gemini-2.0-flash-exp',
    apiKey: process.env.API_KEY || process.env.GEMINI_API_KEY,
  },
};

// System instruction for question generation
const SYSTEM_INSTRUCTION = `You are a professional Bible teacher and theological educator specializing in creating high-quality Bible study questions for Christian education.

Your task is to generate an educational question about a Biblical character or event for a Christian Sunday School learning platform.

REQUIREMENTS:
1. **Character Selection**: Choose a meaningful Biblical character from Old or New Testament
2. **Question Category**: Determine the category
   - "Bible Background" - Questions about historical, cultural, geographical, or period context
   - "Person in Bible" - Questions about specific Biblical characters' actions, personality, experiences, or faith journey
3. **Question Design**: Write the question in first person from the character's perspective to help learners think from that viewpoint
4. **Answer Options**: Provide 4 multiple choice options with 3 reasonable but incorrect distractors
   - **IMPORTANT**: The correct answer should be randomly placed among A, B, C, D options to avoid bias
5. **Explanation**: Provide detailed answer explanation with specific Bible verse citations
6. **Journal Prompt**: Provide reflection prompts to help learners apply the Biblical story to modern Christian life
7. **Deep Dive**: Provide theological depth analysis exploring themes, historical context, and theological significance
8. **Bible Sources**: Provide 2-3 relevant Bible passage references

FORMAT REQUIREMENTS:
- All content should be in Traditional Chinese (繁體中文)
- Questions should have educational value and depth
- Answer explanations must accurately cite Bible verses
- Theological content must align with orthodox Christian doctrine
- Tone should be respectful and educational
- Suitable for Christian learners of all ages
- Correct answer position must be randomized to avoid bias toward any specific option

RESPONSE FORMAT - You MUST respond with valid JSON containing these fields:
{
  "character": "Biblical character name in Traditional Chinese",
  "category": "Bible Background or Person in Bible",
  "question": "Question content (first person perspective)",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswerIndex": 0,
  "explanation": "Detailed explanation with Bible verse citations",
  "journalPromptTitle": "Journal prompt title",
  "journalPromptContent": "Reflection content",
  "deepDiveTitle": "Deep dive title",
  "deepDiveContent": "Theological analysis",
  "bibleSources": [
    {
      "reference": "創世記 3:1-6 (NIV)",
      "englishReference": "Genesis 3:1-6"
    }
  ]
}

IMPORTANT: This is an educational Christian Sunday School platform for Bible study. Your responses help students learn about Biblical characters and events in an engaging, educational way.`;

// Utility function to randomize answer positions to avoid bias
const randomizeAnswers = (options: string[], correctIndex: number): { options: string[], correctAnswerIndex: number } => {
  const correctAnswer = options[correctIndex];

  // Create a copy of the options array
  const shuffledOptions = [...options];

  // Fisher-Yates shuffle algorithm
  for (let i = shuffledOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
  }

  // Find the new index of the correct answer
  const newCorrectIndex = shuffledOptions.indexOf(correctAnswer);

  return {
    options: shuffledOptions,
    correctAnswerIndex: newCorrectIndex
  };
};

/**
 * Call Ollama Cloud via unified API proxy
 */
async function callOllamaCloud(userPrompt: string): Promise<string> {
  const messages = [
    { role: 'system', content: SYSTEM_INSTRUCTION },
    { role: 'user', content: userPrompt }
  ];

  const response = await fetch(PROVIDERS.OLLAMA.endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      provider: 'ollama',
      model: PROVIDERS.OLLAMA.model,
      messages,
      temperature: 0.9,
      topP: 0.95,
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
 * Call Gemini API directly (with JSON schema support)
 */
async function callGemini(userPrompt: string): Promise<string> {
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
        contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
        systemInstruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }]
        },
        generationConfig: {
          temperature: 0.9,
          topP: 0.95,
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
async function callOpenAI(userPrompt: string): Promise<string> {
  const messages = [
    { role: 'system', content: SYSTEM_INSTRUCTION + '\n\nIMPORTANT: You MUST respond with valid JSON only. No markdown, no code blocks, just pure JSON.' },
    { role: 'user', content: userPrompt }
  ];

  const response = await fetch(PROVIDERS.OPENAI.endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      provider: 'openai',
      model: PROVIDERS.OPENAI.model,
      messages,
      temperature: 0.9,
      topP: 0.95,
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
async function executeWithFailover(userPrompt: string): Promise<string> {
  console.log(`🔄 Generating Bible Question - Starting provider chain...`);

  // Try OpenAI first (confirmed working)
  try {
    console.log(`🔄 Trying ${PROVIDERS.OPENAI.name} (${PROVIDERS.OPENAI.model})...`);
    const result = await callOpenAI(userPrompt);
    console.log(`✅ ${PROVIDERS.OPENAI.name} succeeded`);
    return result;
  } catch (error: any) {
    console.warn(`⚠️ ${PROVIDERS.OPENAI.name} failed:`, error.message);
  }

  // Fallback to Ollama Cloud
  try {
    console.log(`↪️ Falling back to ${PROVIDERS.OLLAMA.name} (${PROVIDERS.OLLAMA.model})...`);
    const result = await callOllamaCloud(userPrompt);
    console.log(`✅ ${PROVIDERS.OLLAMA.name} succeeded`);
    return result;
  } catch (error: any) {
    console.warn(`⚠️ ${PROVIDERS.OLLAMA.name} failed:`, error.message);
  }

  // Final fallback to Gemini
  try {
    console.log(`↪️ Falling back to ${PROVIDERS.GEMINI.name} (${PROVIDERS.GEMINI.model})...`);
    const result = await callGemini(userPrompt);
    console.log(`✅ ${PROVIDERS.GEMINI.name} succeeded`);
    return result;
  } catch (error: any) {
    console.error(`❌ ${PROVIDERS.GEMINI.name} failed:`, error.message);
  }

  throw new Error('All AI providers failed. Please check your configuration and try again.');
}

/**
 * Parse JSON response (handles markdown code blocks from some providers)
 */
function parseJSONResponse(text: string): any {
  // Remove markdown code blocks if present
  let cleanedText = text.trim();

  if (cleanedText.startsWith('```json')) {
    cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/```\s*$/, '');
  } else if (cleanedText.startsWith('```')) {
    cleanedText = cleanedText.replace(/^```\s*/, '').replace(/```\s*$/, '');
  }

  cleanedText = cleanedText.trim();

  // Check if response looks like JSON
  if (!cleanedText.startsWith('{') && !cleanedText.startsWith('[')) {
    throw new Error(`AI returned non-JSON response: ${cleanedText.substring(0, 100)}...`);
  }

  try {
    return JSON.parse(cleanedText);
  } catch (error: any) {
    throw new Error(`Failed to parse AI response as JSON: ${error.message}\n\nResponse preview: ${cleanedText.substring(0, 200)}...`);
  }
}

/**
 * Generate a biblical question with automatic provider failover
 */
export const generateBiblicalQuestion = async (
  userPrompt: string
): Promise<Omit<Quest, 'id' | 'characterImage'>> => {
  const resultText = await executeWithFailover(userPrompt);
  const parsedResponse = parseJSONResponse(resultText);

  // Randomize the answer positions to avoid bias
  const { options: randomizedOptions, correctAnswerIndex: randomizedIndex } = randomizeAnswers(
    parsedResponse.options,
    parsedResponse.correctAnswerIndex
  );

  // Transform the response into Quest format
  const quest: Omit<Quest, 'id' | 'characterImage'> = {
    character: parsedResponse.character,
    category: parsedResponse.category as QuestionCategory,
    question: parsedResponse.question,
    options: randomizedOptions,
    correctAnswerIndex: randomizedIndex,
    explanation: parsedResponse.explanation,
    journalPrompt: {
      title: parsedResponse.journalPromptTitle,
      content: parsedResponse.journalPromptContent
    },
    deepDive: {
      title: parsedResponse.deepDiveTitle,
      content: parsedResponse.deepDiveContent,
      sources: parsedResponse.bibleSources.map((source: any) => ({
        text: source.reference,
        url: `https://www.biblegateway.com/passage/?search=${encodeURIComponent(source.englishReference)}&version=NIV`
      }))
    }
  };

  return quest;
};

/**
 * Generate a biblical question with specific topic parameters
 */
export const generateBiblicalQuestionWithTopic = async (
  characterName?: string,
  topic?: string,
  testament?: 'old' | 'new' | 'both'
): Promise<Omit<Quest, 'id' | 'characterImage'>> => {
  let prompt = "Generate an educational Bible study question for a Christian Sunday School platform";

  if (characterName) {
    prompt += ` about the Biblical character or concept "${characterName}"`;
  }

  if (topic) {
    prompt += ` with the theme of "${topic}"`;
  }

  if (testament === 'old') {
    prompt += " from the Old Testament";
  } else if (testament === 'new') {
    prompt += " from the New Testament";
  }

  prompt += ". Please provide the response in Traditional Chinese as specified in the format requirements.";

  return generateBiblicalQuestion(prompt);
};
