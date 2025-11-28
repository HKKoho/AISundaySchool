import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
  dangerouslyAllowBrowser: true // Note: In production, API calls should go through a backend
});

export interface BibleStoryComparison {
  character: string;
  scripture: string;
  situation: string;
  response: string;
  outcome: string;
  alignment: 'positive' | 'negative';
}

/**
 * Generate a contextual question based on the scenario and user profile
 */
export async function generateQuestion(
  scenarioId: string,
  scenarioLabel: string,
  scenarioDescription: string,
  userLifeStage: string,
  language: 'en' | 'zh'
): Promise<string> {
  try {
    const systemPrompt = language === 'zh'
      ? `你是一位富有同理心的性格評估專家。根據用戶的人生階段和情境，生成一個深思熟慮的開放式問題。問題應該引導用戶分享具體的個人經歷，而不僅僅是理論性的回答。`
      : `You are an empathetic personality assessment expert. Generate a thoughtful, open-ended question based on the user's life stage and scenario. The question should invite them to share a specific personal experience, not just theoretical responses.`;

    const userPrompt = language === 'zh'
      ? `人生階段：${userLifeStage}
情境類別：${scenarioLabel}
情境描述：${scenarioDescription}

請生成一個深入的問題，幫助了解此人在這種情況下的真實行為模式、動機和價值觀。問題應該是開放式的，鼓勵詳細的敘述性回應。`
      : `Life Stage: ${userLifeStage}
Scenario Category: ${scenarioLabel}
Scenario Description: ${scenarioDescription}

Generate a deep question that helps understand how this person truly behaves, their motivations, and values in this type of situation. The question should be open-ended and encourage detailed narrative responses.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.8,
      max_tokens: 200
    });

    return response.choices[0]?.message?.content?.trim() || '';
  } catch (error) {
    console.error('Error generating question with OpenAI:', error);
    // Return fallback question
    return language === 'zh'
      ? `請分享一個與${scenarioLabel}相關的個人經歷。您如何處理這種情況，是什麼驅動了您的決定？`
      : `Please share a personal experience related to ${scenarioLabel}. How did you handle the situation, and what drove your decisions?`;
  }
}

/**
 * Generate a Bible character story comparison based on user's response
 */
export async function generateBibleStoryComparison(
  scenarioLabel: string,
  userResponse: string,
  language: 'en' | 'zh'
): Promise<BibleStoryComparison> {
  try {
    const systemPrompt = language === 'zh'
      ? `你是一位聖經學者和基督教輔導員。根據用戶的回應，找出一個面臨類似情況的聖經人物。簡要說明該聖經人物如何回應，以及他們的回應是與基督教教導一致（積極）還是偏離（消極）。保持簡潔（2-3句話）並提供聖經經文參考。`
      : `You are a Bible scholar and Christian counselor. Based on the user's response, identify a biblical character who faced a similar situation. Briefly explain how that biblical character responded and whether their response aligned with (positive) or deviated from (negative) Christian teachings. Keep it concise (2-3 sentences) and provide scripture reference.`;

    const userPrompt = language === 'zh'
      ? `生活情境：${scenarioLabel}
用戶回應：${userResponse}

請提供：
1. 聖經人物名字
2. 聖經經文參考（例如：創世記 39:7-12）
3. 他們面臨的情況（1句話）
4. 他們的回應（1句話）
5. 結果以及與基督教教導的關係（1句話）
6. 對齊方式："positive"或"negative"

以JSON格式回應：
{
  "character": "人物名字",
  "scripture": "經文參考",
  "situation": "情況描述",
  "response": "他們的回應",
  "outcome": "結果和對齊",
  "alignment": "positive或negative"
}`
      : `Life Scenario: ${scenarioLabel}
User Response: ${userResponse}

Please provide:
1. Biblical character name
2. Scripture reference (e.g., Genesis 39:7-12)
3. The situation they faced (1 sentence)
4. Their response (1 sentence)
5. The outcome and relation to Christian teaching (1 sentence)
6. Alignment: "positive" or "negative"

Respond in JSON format:
{
  "character": "Character Name",
  "scripture": "Scripture Reference",
  "situation": "Situation description",
  "response": "Their response",
  "outcome": "Outcome and alignment",
  "alignment": "positive or negative"
}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 400,
      response_format: { type: 'json_object' }
    });

    const content = response.choices[0]?.message?.content;
    if (content) {
      const parsed = JSON.parse(content);
      return {
        character: parsed.character || 'Unknown',
        scripture: parsed.scripture || '',
        situation: parsed.situation || '',
        response: parsed.response || '',
        outcome: parsed.outcome || '',
        alignment: parsed.alignment === 'negative' ? 'negative' : 'positive'
      };
    }

    throw new Error('No content in response');
  } catch (error) {
    console.error('Error generating Bible story comparison:', error);
    // Return fallback response
    return {
      character: language === 'zh' ? '大衛' : 'David',
      scripture: language === 'zh' ? '撒母耳記上 17' : '1 Samuel 17',
      situation: language === 'zh'
        ? '大衛面對看似不可能的挑戰（歌利亞）'
        : 'David faced a seemingly impossible challenge (Goliath)',
      response: language === 'zh'
        ? '他憑信心和勇氣回應，信靠神而不是自己的力量'
        : 'He responded with faith and courage, trusting God rather than his own strength',
      outcome: language === 'zh'
        ? '神賜予他勝利，這展示了順服和信靠神的價值'
        : 'God granted him victory, demonstrating the value of obedience and trust in God',
      alignment: 'positive'
    };
  }
}

/**
 * Check if OpenAI API key is configured
 */
export function isOpenAIConfigured(): boolean {
  return !!import.meta.env.VITE_OPENAI_API_KEY;
}
