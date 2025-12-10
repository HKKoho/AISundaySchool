import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { transcript } = req.body;

    if (!transcript) {
      return res.status(400).json({ error: 'Transcript is required' });
    }

    console.log(`→ Analyzing YouTube content (${transcript.length} chars)...`);

    // Analysis logic with multi-provider failover
    const geminiApiKey = process.env.GEMINI_API_KEY;
    const ollamaApiKey = process.env.OLLAMA_API_KEY;
    const openaiApiKey = process.env.OPENAI_API_KEY;

    let result = null;
    let lastError = null;

    // Try Gemini first
    if (geminiApiKey) {
      try {
        console.log('  Attempting analysis with Gemini...');
        const { GoogleGenAI } = await import('@google/genai');
        const ai = new GoogleGenAI({ apiKey: geminiApiKey });

        const responseSchema = {
          type: 'OBJECT',
          properties: {
            title: { type: 'STRING' },
            mainFocus: { type: 'STRING' },
            keyTeachings: { type: 'ARRAY', items: { type: 'STRING' } },
            biblicalReferences: { type: 'ARRAY', items: { type: 'STRING' } },
            practicalApplications: { type: 'STRING' },
            theologicalInsights: { type: 'ARRAY', items: { type: 'STRING' } },
            quiz: {
              type: 'ARRAY',
              items: {
                type: 'OBJECT',
                properties: {
                  question: { type: 'STRING' },
                  type: { type: 'STRING', enum: ['MULTIPLE_CHOICE', 'TRUE_FALSE'] },
                  options: { type: 'ARRAY', items: { type: 'STRING' } },
                  correctAnswerIndex: { type: 'INTEGER' }
                },
                required: ['question', 'type', 'options', 'correctAnswerIndex']
              }
            }
          },
          required: ['title', 'mainFocus', 'keyTeachings', 'biblicalReferences', 'practicalApplications', 'theologicalInsights', 'quiz']
        };

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: `You are an expert biblical teacher and theologian. Analyze YouTube video transcripts of biblical teachings and extract key teachings, scripture references, theological insights, and practical applications. Generate a quiz to test understanding.`,
            responseMimeType: 'application/json',
            responseSchema: responseSchema
          },
          contents: [{
            role: 'user',
            parts: [{ text: `Analyze the following biblical teaching video transcript:\n\n${transcript}` }]
          }]
        });

        result = JSON.parse(response.text);
        console.log('✓ Analysis completed with Gemini');
      } catch (geminiError: any) {
        console.error('  Gemini analysis failed:', geminiError.message);
        lastError = `Gemini: ${JSON.stringify(geminiError)}`;

        // If Gemini fails with quota error, continue to next provider
        if (geminiError.message?.includes('RESOURCE_EXHAUSTED') ||
            geminiError.message?.includes('quota') ||
            geminiError.message?.includes('429')) {
          console.log('  Gemini quota exceeded, falling back to Ollama Cloud...');
        } else {
          throw geminiError; // Re-throw non-quota errors
        }
      }
    }

    // Try Ollama Cloud if Gemini failed
    if (!result && ollamaApiKey) {
      try {
        console.log('  Attempting analysis with Ollama Cloud...');
        const response = await fetch('https://ollama.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ollamaApiKey}`
          },
          body: JSON.stringify({
            model: 'kimi-k2:1t',
            messages: [
              {
                role: 'system',
                content: 'You are an expert biblical teacher. Analyze transcripts and extract teachings, references, insights, and create quizzes. Return valid JSON.'
              },
              {
                role: 'user',
                content: `Analyze this biblical teaching transcript and return JSON with: title, mainFocus, keyTeachings (array), biblicalReferences (array), practicalApplications (string), theologicalInsights (array), quiz (array of 5 questions with question, type (MULTIPLE_CHOICE or TRUE_FALSE), options (array), correctAnswerIndex (number)).\n\nTranscript:\n${transcript}`
              }
            ],
            response_format: { type: 'json_object' },
            temperature: 0.7,
            max_tokens: 3000
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Ollama API error: ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();

        // Clean markdown code blocks if present
        let content = data.choices[0].message.content.trim();
        if (content.startsWith('```json')) {
          content = content.replace(/^```json\s*/, '').replace(/```\s*$/, '');
        } else if (content.startsWith('```')) {
          content = content.replace(/^```\s*/, '').replace(/```\s*$/, '');
        }

        result = JSON.parse(content.trim());
        console.log('✓ Analysis completed with Ollama Cloud (fallback)');
      } catch (ollamaError: any) {
        console.error('  Ollama Cloud analysis failed:', ollamaError.message);
        lastError = lastError ? `${lastError}. Ollama: ${ollamaError.message}` : `Ollama: ${ollamaError.message}`;
      }
    }

    // Try OpenAI if Gemini and Ollama failed
    if (!result && openaiApiKey) {
      try {
        console.log('  Attempting analysis with OpenAI...');
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openaiApiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: 'You are an expert biblical teacher. Analyze transcripts and extract teachings, references, insights, and create quizzes. Return valid JSON.'
              },
              {
                role: 'user',
                content: `Analyze this biblical teaching transcript and return JSON with: title, mainFocus, keyTeachings (array), biblicalReferences (array), practicalApplications (string), theologicalInsights (array), quiz (array of 5 questions with question, type (MULTIPLE_CHOICE or TRUE_FALSE), options (array), correctAnswerIndex (number)).\n\nTranscript:\n${transcript}`
              }
            ],
            response_format: { type: 'json_object' },
            temperature: 0.7
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        result = JSON.parse(data.choices[0].message.content);
        console.log('✓ Analysis completed with OpenAI (final fallback)');
      } catch (openaiError: any) {
        console.error('  OpenAI analysis failed:', openaiError.message);
        lastError = lastError ? `${lastError}. OpenAI: ${openaiError.message}` : `OpenAI: ${openaiError.message}`;
      }
    }

    if (!result) {
      throw new Error(`All AI providers failed (Gemini, Ollama, OpenAI). ${lastError || 'No AI provider configured.'}`);
    }

    return res.status(200).json(result);

  } catch (error: any) {
    console.error('✗ YouTube analysis error:', error);
    return res.status(500).json({
      error: 'Failed to analyze content',
      details: error.message
    });
  }
}
