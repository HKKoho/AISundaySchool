import { VercelRequest, VercelResponse } from '@vercel/node';
import { YoutubeTranscript } from 'youtube-transcript';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'YouTube URL is required' });
    }

    // Validate YouTube URL format
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(youtubeRegex);

    if (!match) {
      return res.status(400).json({ error: 'Invalid YouTube URL format' });
    }

    const videoId = match[1];

    // Fetch transcript
    const transcriptItems = await YoutubeTranscript.fetchTranscript(videoId);

    if (!transcriptItems || transcriptItems.length === 0) {
      return res.status(404).json({
        error: 'No transcript found for this video. The video may not have captions available.'
      });
    }

    // Combine all transcript segments into a single text
    const transcript = transcriptItems
      .map((item: any) => item.text)
      .join(' ')
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();

    return res.status(200).json({
      transcript,
      videoId
    });

  } catch (error: any) {
    console.error('YouTube transcript error:', error);

    // Handle specific error cases
    if (error.message?.includes('Could not retrieve transcript')) {
      return res.status(404).json({
        error: 'Could not retrieve transcript. The video may have transcripts disabled or be unavailable.'
      });
    }

    if (error.message?.includes('Video unavailable')) {
      return res.status(404).json({
        error: 'Video is unavailable or private.'
      });
    }

    return res.status(500).json({
      error: 'Failed to fetch transcript. Please try again or paste the transcript manually.',
      details: error.message
    });
  }
}
