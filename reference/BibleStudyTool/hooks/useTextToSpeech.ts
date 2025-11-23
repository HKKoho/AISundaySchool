
import { useState, useCallback, useRef, useEffect } from 'react';
import { textToSpeech } from '../services/geminiService';
import { decode, decodeAudioData } from '../utils/audio';

export const useTextToSpeech = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    // Initialize AudioContext
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    
    return () => {
      // Cleanup
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
      if(sourceRef.current) {
        sourceRef.current.stop();
      }
    };
  }, []);

  const play = useCallback(async (text: string) => {
    if (isPlaying) {
      stop();
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const base64Audio = await textToSpeech(text);
      if (audioContextRef.current) {
        if (audioContextRef.current.state === 'suspended') {
            await audioContextRef.current.resume();
        }
        const audioData = decode(base64Audio);
        const audioBuffer = await decodeAudioData(audioData, audioContextRef.current, 24000, 1);
        
        const source = audioContextRef.current.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContextRef.current.destination);
        source.onended = () => {
          setIsPlaying(false);
          sourceRef.current = null;
        };
        source.start(0);
        sourceRef.current = source;
        setIsPlaying(true);
      }
    } catch (err) {
      setError('Failed to play audio.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [isPlaying]);

  const stop = useCallback(() => {
    if (sourceRef.current) {
      sourceRef.current.stop();
      // onended will handle setting state
    }
  }, []);

  return { isPlaying, isLoading, error, play, stop };
};
