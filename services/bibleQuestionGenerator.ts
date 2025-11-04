import { GoogleGenAI, Type } from "@google/genai";
import type { Quest, QuestionCategory } from '../types';

const API_KEY = process.env.API_KEY || process.env.GEMINI_API_KEY;

// Note: Old single-provider service - use multiProviderQuestionGenerator for failover
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

// Define the schema for question generation
const questionResponseSchema = {
    type: Type.OBJECT,
    properties: {
        character: {
            type: Type.STRING,
            description: "The name of the Biblical character in Traditional Chinese (繁體中文)"
        },
        category: {
            type: Type.STRING,
            description: "The question category: either 'Bible Background' (聖經背景) for historical/contextual questions, or 'Person in Bible' (聖經人物) for character-focused questions",
            enum: ["Bible Background", "Person in Bible"]
        },
        question: {
            type: Type.STRING,
            description: "A thought-provoking question about the character in Traditional Chinese, written in first person from the character's perspective"
        },
        options: {
            type: Type.ARRAY,
            description: "Four multiple choice options in Traditional Chinese",
            items: { type: Type.STRING },
            minItems: 4,
            maxItems: 4
        },
        correctAnswerIndex: {
            type: Type.INTEGER,
            description: "The index (0-3) of the correct answer in the options array"
        },
        explanation: {
            type: Type.STRING,
            description: "A detailed explanation of the answer in Traditional Chinese, including specific Bible verse references (e.g., 創世記 3:5, 約翰福音 3:16)"
        },
        journalPromptTitle: {
            type: Type.STRING,
            description: "A short title for the journal prompt in Traditional Chinese"
        },
        journalPromptContent: {
            type: Type.STRING,
            description: "Reflective content for personal meditation in Traditional Chinese, connecting the Biblical story to modern Christian life"
        },
        deepDiveTitle: {
            type: Type.STRING,
            description: "A title for the deep dive theological exploration in Traditional Chinese"
        },
        deepDiveContent: {
            type: Type.STRING,
            description: "In-depth theological analysis in Traditional Chinese, exploring themes, historical context, and theological implications"
        },
        bibleSources: {
            type: Type.ARRAY,
            description: "Array of relevant Bible passages (at least 2-3 sources)",
            items: {
                type: Type.OBJECT,
                properties: {
                    reference: {
                        type: Type.STRING,
                        description: "Bible reference in Traditional Chinese with version (e.g., '創世記 3:1-6 (NIV)')"
                    },
                    englishReference: {
                        type: Type.STRING,
                        description: "Bible reference in English for URL generation (e.g., 'Genesis 3:1-6')"
                    }
                }
            }
        }
    },
    required: [
        "character",
        "category",
        "question",
        "options",
        "correctAnswerIndex",
        "explanation",
        "journalPromptTitle",
        "journalPromptContent",
        "deepDiveTitle",
        "deepDiveContent",
        "bibleSources"
    ]
};

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

export const generateBiblicalQuestion = async (
    userPrompt: string
): Promise<Omit<Quest, 'id' | 'characterImage'>> => {
    if (!ai) {
        throw new Error('API key not configured. Please set GEMINI_API_KEY environment variable.');
    }

    const result = await ai.models.generateContent({
        model: "gemini-2.0-flash-exp",
        contents: userPrompt,
        config: {
            systemInstruction: `你是一位專業的聖經教師和神學教育者，專門創作高質量的聖經學習問題。

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
- 正確答案的位置必須隨機化，避免偏向任何特定選項`,
            temperature: 0.9,
            topP: 0.95,
            responseMimeType: "application/json",
            responseSchema: questionResponseSchema
        }
    });

    let parsedResponse;
    try {
        const responseText = result.text.trim();

        // Check if response looks like JSON
        if (!responseText.startsWith('{') && !responseText.startsWith('[')) {
            throw new Error(`AI returned non-JSON response: ${responseText.substring(0, 100)}...`);
        }

        parsedResponse = JSON.parse(responseText);
    } catch (error: any) {
        throw new Error(`Failed to parse AI response as JSON: ${error.message}\n\nResponse preview: ${result.text.substring(0, 200)}...`);
    }

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
