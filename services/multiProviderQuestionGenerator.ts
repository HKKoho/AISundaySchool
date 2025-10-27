/**
 * Multi-Provider Bible Question Generator
 * Implements automatic failover across OpenAI → Ollama Cloud → Gemini
 *
 * Provider Priority Chain:
 * 1. OpenAI GPT-4o (Primary) - Highest reliability, confirmed working
 * 2. Ollama Cloud (Secondary) - qwen3-vl:235b-cloud (fast, cost-effective)
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
    model: 'qwen3-vl:235b-cloud',  // Updated to valid Ollama model
    endpoint: '/api/chat',
  },
  GEMINI: {
    name: 'Google Gemini',
    model: 'gemini-2.0-flash-exp',
    apiKey: process.env.API_KEY || process.env.GEMINI_API_KEY,
  },
};

// System instruction for question generation
const SYSTEM_INSTRUCTION = `你是一位專業的聖經教師和神學教育者，專門創作高質量的聖經學習問題。

你的任務是生成一個關於聖經人物或事件的教育性問題，包含：

1. **角色選擇**：選擇一個有意義的聖經人物（舊約或新約）
2. **問題分類**：判斷問題類別
   - "Bible Background" (聖經背景)：關於歷史背景、文化背景、地理環境、時代背景的問題
   - "Person in Bible" (聖經人物)：關於特定聖經人物的行為、性格、經歷、信仰歷程的問題
3. **問題設計**：以第一人稱（角色視角）撰寫問題，讓學習者能夠代入角色思考
4. **選項設計**：提供4個選項，其中3個是合理但錯誤的干擾項
   - **重要**：正確答案應該隨機分配在A、B、C、D選項中，避免總是出現在同一位置
5. **解釋**：提供詳細的答案解釋，必須包含具體的聖經經文引用
6. **靈修引導**：提供日誌提示，幫助學習者將聖經故事應用到現代生活
7. **深度探索**：提供神學深度分析，探討主題、歷史背景和神學意義
8. **經文來源**：提供2-3個相關的聖經章節引用

要求：
- 所有內容使用繁體中文
- 問題要有教育意義和思考深度
- 答案解釋要準確引用聖經經文
- 神學內容要符合正統基督教教義
- 語氣要尊重、教育性強
- 適合各年齡層的基督徒學習者
- 正確答案的位置必須隨機化，避免偏向任何特定選項

你必須以JSON格式回覆，包含以下欄位：
{
  "character": "聖經人物名稱（繁體中文）",
  "category": "Bible Background 或 Person in Bible",
  "question": "問題內容（第一人稱）",
  "options": ["選項A", "選項B", "選項C", "選項D"],
  "correctAnswerIndex": 0,
  "explanation": "詳細解釋，包含聖經經文引用",
  "journalPromptTitle": "靈修日誌標題",
  "journalPromptContent": "靈修反思內容",
  "deepDiveTitle": "深度探索標題",
  "deepDiveContent": "深度神學分析",
  "bibleSources": [
    {
      "reference": "創世記 3:1-6 (NIV)",
      "englishReference": "Genesis 3:1-6"
    }
  ]
}`;

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

  return JSON.parse(cleanedText.trim());
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
  let prompt = "請生成一個聖經問題";

  if (characterName) {
    prompt += `，關於聖經人物「${characterName}」`;
  }

  if (topic) {
    prompt += `，主題是「${topic}」`;
  }

  if (testament === 'old') {
    prompt += "，來自舊約聖經";
  } else if (testament === 'new') {
    prompt += "，來自新約聖經";
  }

  prompt += "。";

  return generateBiblicalQuestion(prompt);
};
