import { GoogleGenAI, Type, Schema } from "@google/genai";
import { YouTubeAnalysisResult } from "../types/youtube";

// Initialize Gemini Client
const geminiApiKey = process.env.GEMINI_API_KEY;
const ai = geminiApiKey ? new GoogleGenAI({ apiKey: geminiApiKey }) : null;

// OpenAI API Key
const openaiApiKey = process.env.OPENAI_API_KEY;

const RESPONSE_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "A concise, engaging title for the biblical teaching content.",
    },
    mainFocus: {
      type: Type.STRING,
      description: "A summary of the main biblical focus or theme of the teaching.",
    },
    keyTeachings: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of key biblical teachings and spiritual insights from the video.",
    },
    biblicalReferences: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of Bible verses or passages referenced (e.g., 'John 3:16', 'Romans 8:28-30').",
    },
    practicalApplications: {
      type: Type.STRING,
      description: "How these teachings can be practically applied to daily Christian life.",
    },
    theologicalInsights: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Deeper theological or doctrinal insights explained in the teaching.",
    },
    quiz: {
      type: Type.ARRAY,
      description: "A list of 5 questions to test understanding, mixing True/False and Multiple Choice.",
      items: {
        type: Type.OBJECT,
        properties: {
          question: {
            type: Type.STRING,
            description: "A question testing comprehension of the biblical teaching."
          },
          type: {
            type: Type.STRING,
            enum: ["MULTIPLE_CHOICE", "TRUE_FALSE"],
            description: "The type of question."
          },
          options: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "For True/False, provide ['True', 'False']. For Multiple Choice, provide 4 options.",
          },
          correctAnswerIndex: {
            type: Type.INTEGER,
            description: "The zero-based index of the correct option.",
          },
        },
        required: ["question", "type", "options", "correctAnswerIndex"],
      },
    },
  },
  required: ["title", "mainFocus", "keyTeachings", "biblicalReferences", "practicalApplications", "theologicalInsights", "quiz"],
};

// Analyze using OpenAI
const analyzeWithOpenAI = async (transcript: string): Promise<YouTubeAnalysisResult> => {
  if (!openaiApiKey) {
    throw new Error("OpenAI API key not configured");
  }

  const systemPrompt = `You are an expert biblical teacher and theologian. Your goal is to analyze YouTube video transcripts of biblical teachings, sermons, or Christian educational content. Extract the main biblical focus, highlight key teachings, identify scripture references, note theological insights, and provide practical applications. Generate a quiz (mixing True/False and Multiple Choice questions) to test understanding of the biblical content.

IMPORTANT:
- Always cite specific Bible verses when referenced (e.g., "John 3:16", "Romans 8:28-30")
- Focus on theological accuracy and biblical soundness
- Make practical applications relevant to daily Christian living
- Ensure quiz questions test comprehension of key biblical concepts

Return your response as a valid JSON object with this exact structure:
{
  "title": "A concise, engaging title for the biblical teaching content",
  "mainFocus": "A summary of the main biblical focus or theme",
  "keyTeachings": ["teaching 1", "teaching 2", "..."],
  "biblicalReferences": ["John 3:16", "Romans 8:28", "..."],
  "practicalApplications": "How these teachings can be practically applied to daily Christian life",
  "theologicalInsights": ["insight 1", "insight 2", "..."],
  "quiz": [
    {
      "question": "Question text",
      "type": "MULTIPLE_CHOICE" or "TRUE_FALSE",
      "options": ["Option 1", "Option 2", "..."],
      "correctAnswerIndex": 0
    }
  ]
}`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openaiApiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Analyze the following biblical teaching video transcript:\n\n${transcript}` }
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
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("No response received from OpenAI");
  }

  return JSON.parse(content) as YouTubeAnalysisResult;
};

// Analyze using Gemini
const analyzeWithGemini = async (transcript: string): Promise<YouTubeAnalysisResult> => {
  if (!ai) {
    throw new Error("Gemini API key not configured");
  }

  const model = "gemini-2.5-flash";

  const response = await ai.models.generateContent({
    model: model,
    config: {
      systemInstruction: `You are an expert biblical teacher and theologian. Your goal is to analyze YouTube video transcripts of biblical teachings, sermons, or Christian educational content. Extract the main biblical focus, highlight key teachings, identify scripture references, note theological insights, and provide practical applications. Generate a quiz (mixing True/False and Multiple Choice questions) to test understanding of the biblical content.

IMPORTANT:
- Always cite specific Bible verses when referenced (e.g., "John 3:16", "Romans 8:28-30")
- Focus on theological accuracy and biblical soundness
- Make practical applications relevant to daily Christian living
- Ensure quiz questions test comprehension of key biblical concepts`,
      responseMimeType: "application/json",
      responseSchema: RESPONSE_SCHEMA,
    },
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Analyze the following biblical teaching video transcript:\n\n${transcript}`,
          },
        ],
      },
    ],
  });

  const jsonText = response.text;
  if (!jsonText) {
    throw new Error("No response received from Gemini");
  }

  return JSON.parse(jsonText) as YouTubeAnalysisResult;
};

// Main analysis function with automatic provider fallback
export const analyzeYouTubeContent = async (transcript: string): Promise<YouTubeAnalysisResult> => {
  // Try Gemini first (if available)
  if (ai) {
    try {
      console.log("Attempting analysis with Gemini...");
      const result = await analyzeWithGemini(transcript);
      console.log("✓ Analysis completed with Gemini");
      return result;
    } catch (error: any) {
      console.error("Gemini analysis failed:", error.message);

      // If Gemini fails due to quota/rate limit, try OpenAI
      if (error.message?.includes('RESOURCE_EXHAUSTED') || error.message?.includes('quota') || error.message?.includes('429')) {
        console.log("Gemini quota exceeded, falling back to OpenAI...");
        if (openaiApiKey) {
          try {
            const result = await analyzeWithOpenAI(transcript);
            console.log("✓ Analysis completed with OpenAI (fallback)");
            return result;
          } catch (openaiError: any) {
            console.error("OpenAI fallback also failed:", openaiError.message);
            throw new Error(`Both Gemini and OpenAI failed. Gemini: ${error.message}. OpenAI: ${openaiError.message}`);
          }
        } else {
          throw new Error(`Gemini quota exceeded and no OpenAI key available. ${error.message}`);
        }
      }

      // For other Gemini errors, throw immediately
      throw error;
    }
  }

  // If Gemini not available, try OpenAI
  if (openaiApiKey) {
    try {
      console.log("Attempting analysis with OpenAI...");
      const result = await analyzeWithOpenAI(transcript);
      console.log("✓ Analysis completed with OpenAI");
      return result;
    } catch (error: any) {
      console.error("OpenAI analysis failed:", error.message);
      throw new Error(error.message || "Failed to analyze biblical content with OpenAI");
    }
  }

  // No API keys available
  throw new Error("No AI provider configured. Please add GEMINI_API_KEY or OPENAI_API_KEY to your .env.local file.");
};

// Demo transcript for testing
export const DEMO_SERMON_TRANSCRIPT = `The Parable of the Sower is one of the most important teachings of Jesus found in Matthew 13, Mark 4, and Luke 8. In this parable, Jesus describes a farmer who goes out to sow seeds. Some seeds fall on the path and are eaten by birds. Others fall on rocky ground where they spring up quickly but wither because they have no deep roots. Some seeds fall among thorns which choke them. But other seeds fall on good soil and produce a crop—a hundred, sixty, or thirty times what was sown.

Jesus explains that the seed represents the word of God. The different soils represent different conditions of human hearts. The path represents those who hear the word but don't understand it, and the evil one snatches away what was sown in their hearts. The rocky ground represents those who receive the word with joy but have no root, so when trouble comes, they quickly fall away. The thorny ground represents those who hear the word, but the worries of this life and the deceitfulness of wealth choke it, making it unfruitful.

But the good soil represents those who hear the word, understand it, and produce fruit—some a hundred, some sixty, some thirty times what was sown. This parable teaches us about spiritual receptivity. Jesus is calling us to examine the condition of our hearts. Are we hardened like the path? Are we shallow like rocky soil? Are we distracted like thorny ground? Or are we receptive and fertile like good soil?

The key to being good soil is not just hearing the word, but understanding and applying it. James 1:22 says, "Do not merely listen to the word, and so deceive yourselves. Do what it says." We must cultivate our hearts through prayer, Bible study, fellowship, and obedience. We must protect against spiritual hardness by staying humble and teachable. We must develop deep roots through consistent spiritual disciplines. And we must guard against the thorns—the anxieties and materialism that can choke out God's word in our lives.

This parable reminds us that God's word has power to transform, but we must be receptive. The same sun that melts wax hardens clay. The difference is not in the sun but in the material. Similarly, the difference in how people respond to God's word is not in the word itself, but in the condition of their hearts. Let us pray for good soil hearts that receive God's word and bear fruit for His kingdom.`;
