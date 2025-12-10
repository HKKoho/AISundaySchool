/**
 * Local Development API Server
 * Runs the /api/chat endpoint locally on port 3001
 */

import { createServer } from 'http';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local and .env
const envFiles = ['.env.local', '.env'];
let loaded = false;

for (const envFile of envFiles) {
  const envPath = join(__dirname, envFile);
  try {
    const envContent = readFileSync(envPath, 'utf-8');
    envContent.split('\n').forEach(line => {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim().replace(/^['"]|['"]$/g, '');
        if (!process.env[key]) { // Don't override already set values
          process.env[key] = value;
        }
      }
    });
    console.log(`✓ Loaded environment variables from ${envFile}`);
    loaded = true;
  } catch (error) {
    // Try next file
  }
}

if (!loaded) {
  console.warn('⚠ Could not load any .env files');
}

const PORT = 3001;

const server = createServer(async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Handle /api/youtube-transcript endpoint
  if (req.url === '/api/youtube-transcript') {
    if (req.method !== 'POST') {
      res.writeHead(405, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Method not allowed' }));
      return;
    }

    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const { url } = JSON.parse(body);

        if (!url) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'YouTube URL is required' }));
          return;
        }

        // Validate YouTube URL format
        const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(youtubeRegex);

        if (!match) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid YouTube URL format' }));
          return;
        }

        const videoId = match[1];

        console.log(`→ Fetching transcript for video: ${videoId}...`);

        let transcript = null;
        let method = 'transcript';

        try {
          // First, try to get transcript using youtube-transcript
          const { YoutubeTranscript } = await import('youtube-transcript');

          let transcriptItems = null;

          // Try multiple language codes in order of preference
          const languageCodes = ['en', 'en-US', 'en-GB', 'zh', 'zh-TW', 'zh-CN'];

          for (const lang of languageCodes) {
            try {
              console.log(`  Trying language: ${lang}...`);
              transcriptItems = await YoutubeTranscript.fetchTranscript(videoId, { lang });
              if (transcriptItems && transcriptItems.length > 0) {
                console.log(`  ✓ Found transcript in ${lang}`);
                break;
              }
            } catch (langError) {
              // Try next language
              continue;
            }
          }

          // If no language worked, try without language parameter (auto-detect)
          if (!transcriptItems || transcriptItems.length === 0) {
            console.log(`  Trying auto-detect...`);
            transcriptItems = await YoutubeTranscript.fetchTranscript(videoId);
          }

          if (transcriptItems && transcriptItems.length > 0) {
            // Successfully got transcript
            transcript = transcriptItems
              .map(item => item.text)
              .join(' ')
              .replace(/\s+/g, ' ')
              .trim();

            console.log(`✓ Transcript fetched (${transcript.length} chars)`);
          } else {
            throw new Error('Transcript array is empty');
          }
        } catch (transcriptError) {
          console.log(`⚠ youtube-transcript failed: ${transcriptError.message}`);

          // Try alternative library: youtubei.js
          try {
            console.log(`  Trying alternative library (youtubei.js)...`);
            const { Innertube } = await import('youtubei.js');
            const youtube = await Innertube.create();

            const info = await youtube.getInfo(videoId);
            const transcriptData = await info.getTranscript();

            if (transcriptData && transcriptData.transcript && transcriptData.transcript.content) {
              const segments = transcriptData.transcript.content.body.initial_segments;
              if (segments && segments.length > 0) {
                transcript = segments
                  .map(seg => seg.snippet.text)
                  .join(' ')
                  .replace(/\s+/g, ' ')
                  .trim();

                console.log(`✓ Transcript fetched via youtubei.js (${transcript.length} chars)`);
                method = 'youtubei';
              } else {
                throw new Error('No transcript segments found');
              }
            } else {
              throw new Error('No transcript data available');
            }
          } catch (youtubeIError) {
            console.log(`⚠ youtubei.js also failed: ${youtubeIError.message}`);
            throw new Error('Transcript is disabled on this video');
          }
        }

        if (!transcript) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            error: 'Could not extract content from this video. Please try pasting the transcript manually.'
          }));
          return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          transcript,
          videoId,
          method // 'transcript' or 'video-analysis'
        }));

      } catch (error) {
        console.error('✗ YouTube transcript error:', error);

        let errorMessage = 'Failed to fetch transcript. Please try pasting the transcript manually.';
        let statusCode = 500;
        let helpText = null;

        if (error.message?.includes('Could not retrieve transcript') ||
            error.message?.includes('Transcript is disabled') ||
            error.message?.includes('Transcript array is empty')) {
          errorMessage = 'This video does not have captions/transcripts available.';
          helpText = 'To analyze this video: 1) Open the video on YouTube, 2) Click "Show transcript" if available and copy it, 3) Switch to "Paste Transcript" tab and paste it there.';
          statusCode = 404;
        } else if (error.message?.includes('Video unavailable') || error.message?.includes('private')) {
          errorMessage = 'Video is unavailable, private, or restricted.';
          statusCode = 404;
        }

        res.writeHead(statusCode, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          error: errorMessage,
          helpText,
          details: error.message
        }));
      }
    });
    return;
  }

  // Handle /api/analyze-youtube endpoint
  if (req.url === '/api/analyze-youtube') {
    if (req.method !== 'POST') {
      res.writeHead(405, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Method not allowed' }));
      return;
    }

    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const { transcript } = JSON.parse(body);

        if (!transcript) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Transcript is required' }));
          return;
        }

        console.log(`→ Analyzing YouTube content (${transcript.length} chars)...`);

        // Analysis logic inline (Gemini + Ollama + OpenAI with fallback)
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
          } catch (geminiError) {
            console.error('  Gemini analysis failed:', geminiError.message);
            lastError = `Gemini: ${JSON.stringify(geminiError)}`;

            // If Gemini fails with quota error, try OpenAI
            if (geminiError.message?.includes('RESOURCE_EXHAUSTED') || geminiError.message?.includes('quota') || geminiError.message?.includes('429')) {
              console.log('  Gemini quota exceeded, falling back to OpenAI...');
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
          } catch (ollamaError) {
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
          } catch (openaiError) {
            console.error('  OpenAI analysis failed:', openaiError.message);
            lastError = lastError ? `${lastError}. OpenAI: ${openaiError.message}` : `OpenAI: ${openaiError.message}`;
          }
        }

        if (!result) {
          throw new Error(`All AI providers failed (Gemini, Ollama, OpenAI). ${lastError || 'No AI provider configured.'}`);
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      } catch (error) {
        console.error('✗ YouTube analysis error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          error: 'Failed to analyze content',
          details: error.message
        }));
      }
    });
    return;
  }

  // Handle /api/chat endpoint
  if (req.url !== '/api/chat') {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  // Parse request body
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    try {
      const { provider, model, messages, temperature, topP, maxTokens } = JSON.parse(body);

      let apiUrl;
      let headers;
      let requestBody;

      switch (provider) {
        case 'ollama':
          apiUrl = 'https://ollama.com/v1/chat/completions';
          headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OLLAMA_API_KEY}`
          };
          requestBody = {
            model,
            messages,
            temperature,
            top_p: topP,
            max_tokens: maxTokens || 2000,
            stream: false
          };
          break;

        case 'openai':
          apiUrl = 'https://api.openai.com/v1/chat/completions';
          headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
          };
          requestBody = {
            model,
            messages,
            temperature,
            top_p: topP,
            max_tokens: maxTokens || 2000
          };
          break;

        case 'gemini':
          // Gemini has different endpoint structure
          const geminiMessages = messages
            .filter(m => m.role !== 'system')
            .map(m => ({
              role: m.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: m.content }]
            }));

          const systemMessage = messages.find(m => m.role === 'system');

          apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`;
          headers = {
            'Content-Type': 'application/json'
          };
          requestBody = {
            contents: geminiMessages,
            systemInstruction: systemMessage ? {
              parts: [{ text: systemMessage.content }]
            } : undefined,
            generationConfig: {
              temperature,
              topP,
              maxOutputTokens: maxTokens || 2000
            }
          };
          break;

        default:
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid provider' }));
          return;
      }

      // Make the API request
      console.log(`→ Calling ${provider} API (model: ${model})...`);
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`✗ ${provider} API error (${response.status}):`, errorText);
        res.writeHead(response.status, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          error: `API error (${response.status}): ${errorText}`
        }));
        return;
      }

      const data = await response.json();

      // Normalize response format
      let content;
      if (provider === 'gemini') {
        content = data.candidates?.[0]?.content?.parts
          ?.map(part => part.text)
          ?.join('') || '';
      } else {
        content = data.choices?.[0]?.message?.content || '';
      }

      console.log(`✓ ${provider} API response received (${content.length} chars)`);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        content,
        model,
        provider,
        usage: data.usage
      }));

    } catch (error) {
      console.error('✗ Proxy error:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: error.message || 'Internal server error'
      }));
    }
  });
});

server.listen(PORT, () => {
  console.log('\n🚀 Local API Server Running');
  console.log(`   http://localhost:${PORT}/api/chat`);
  console.log(`   http://localhost:${PORT}/api/youtube-transcript\n`);
  console.log('Available API Keys:');
  console.log(`   GEMINI_API_KEY: ${process.env.GEMINI_API_KEY ? '✓ Set' : '✗ Not set'}`);
  console.log(`   OPENAI_API_KEY: ${process.env.OPENAI_API_KEY ? '✓ Set' : '✗ Not set'}`);
  console.log(`   OLLAMA_API_KEY: ${process.env.OLLAMA_API_KEY ? '✓ Set' : '✗ Not set'}\n`);
});
