import React, { useState } from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';

interface SpeakButtonProps {
  text: string;
  language?: 'en' | 'zh-TW';
  variant?: 'icon' | 'button';
  className?: string;
}

/**
 * Reusable text-to-speech button for Bible verses and AI responses
 * Uses Web Speech API for browser-based text-to-speech
 */
export const SpeakButton: React.FC<SpeakButtonProps> = ({
  text,
  language = 'en',
  variant = 'icon',
  className = ''
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  const speak = () => {
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
      console.warn('Speech synthesis not supported in this browser');
      return;
    }

    // Stop any ongoing speech
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    // Configure language and voice
    const voices = window.speechSynthesis.getVoices();

    if (language === 'zh-TW') {
      // Look for Traditional Chinese voice
      const chineseVoice = voices.find(v =>
        v.lang.includes('zh-TW') ||
        v.lang.includes('zh-HK') ||
        (v.lang.includes('zh') && v.name.includes('TW'))
      );
      if (chineseVoice) utterance.voice = chineseVoice;
      utterance.lang = 'zh-TW';
    } else {
      // English voice
      const englishVoice = voices.find(v => v.lang.startsWith('en'));
      if (englishVoice) utterance.voice = englishVoice;
      utterance.lang = 'en-US';
    }

    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  if (!isSupported) {
    return null; // Don't show button if not supported
  }

  if (variant === 'button') {
    return (
      <button
        onClick={speak}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
          isSpeaking
            ? 'bg-amber-600 text-white'
            : 'bg-stone-200 hover:bg-stone-300 text-stone-700'
        } ${className}`}
        aria-label={isSpeaking ? 'Stop reading' : 'Read aloud'}
      >
        {isSpeaking ? (
          <>
            <VolumeX className="w-4 h-4" />
            <span className="text-sm font-medium">Stop</span>
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4" />
            <span className="text-sm font-medium">Read Aloud</span>
          </>
        )}
      </button>
    );
  }

  // Icon variant
  return (
    <button
      onClick={speak}
      className={`p-2 rounded-full transition-colors ${
        isSpeaking
          ? 'bg-amber-600 text-white'
          : 'bg-stone-200 hover:bg-stone-300 text-stone-700'
      } ${className}`}
      aria-label={isSpeaking ? 'Stop reading' : 'Read aloud'}
    >
      {isSpeaking ? (
        <VolumeX className="w-5 h-5" />
      ) : (
        <Volume2 className="w-5 h-5" />
      )}
    </button>
  );
};
