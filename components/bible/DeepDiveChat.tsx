import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from './Icon';
import type { Quest } from '../../types';
import { useSpeechToText } from '../../hooks/useSpeechToText';
import { useTextToSpeech } from '../../hooks/useTextToSpeech';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface DeepDiveChatProps {
  deepDive: Quest['deepDive'];
  quest?: Quest;
  onBack: () => void;
}

const DeepDiveChat: React.FC<DeepDiveChatProps> = ({ deepDive, quest, onBack }) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const isEnglish = currentLanguage === 'en';

  const initialMessage = isEnglish
    ? `Hello! I'm your Bible Study Assistant. I've reviewed the content about "${deepDive.title}". Feel free to ask me any questions, and I'll answer based on biblical knowledge and theological background.`
    : `您好！我是聖經研究助理。我已經了解「${deepDive.title}」的內容。您可以問我任何相關問題，我會基於聖經知識和神學背景為您解答。`;

  const [messages, setMessages] = useState<Message[]>([{
    role: 'assistant',
    content: initialMessage
  }]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<'gemini' | 'openai' | 'ollama'>('gemini');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Speech-to-text (Cantonese input)
  const {
    isListening,
    isSupported: isSpeechInputSupported,
    startListening,
    stopListening,
    transcript,
    resetTranscript
  } = useSpeechToText({
    lang: 'zh-HK', // Cantonese
    continuous: false,
    interimResults: true,
    onResult: (newTranscript) => {
      setInputMessage(prev => prev + newTranscript);
    }
  });

  // Text-to-speech (Cantonese output)
  const {
    isSpeaking,
    isSupported: isSpeechOutputSupported,
    speak,
    stop: stopSpeaking
  } = useTextToSpeech({
    lang: 'zh-HK', // Cantonese
    rate: 1.0,
    pitch: 1.0,
    volume: 1.0
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = { role: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const languageInstruction = isEnglish
        ? 'Your response should be in English.'
        : 'Your response should be in Traditional Chinese.';

      const systemInstruction = `You are a helpful Bible study assistant. Your purpose is to answer questions based on the provided context in a clear, concise, and theologically sound manner. Ground your answers in trustworthy biblical sources and historical context, similar to information found on Wikipedia for historical background. Do not speculate or provide personal opinions. ${languageInstruction}

Context about "${deepDive.title}":
${deepDive.content}

Based on this context and general biblical knowledge, answer the user's questions in a conversational manner.`;

      const conversationHistory = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      // Use the secure backend API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider: selectedModel,
          model: selectedModel === 'gemini' ? 'gemini-2.5-flash' : selectedModel === 'openai' ? 'gpt-4o-mini' : 'kimi-k2:1t-cloud',
          messages: [
            { role: 'system', content: systemInstruction },
            ...conversationHistory,
            { role: 'user', content: inputMessage }
          ],
          temperature: 0.7,
          maxTokens: 2000
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      const fallbackMessage = isEnglish
        ? 'Sorry, unable to generate a response.'
        : '抱歉，無法生成回答。';
      const assistantResponse = data.content || fallbackMessage;

      setMessages(prev => [...prev, { role: 'assistant', content: assistantResponse }]);

    } catch (error: any) {
      console.error('Error:', error);
      const errorMessage = isEnglish
        ? `Sorry, an error occurred: ${error.message}`
        : `抱歉，發生錯誤：${error.message}`;
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: errorMessage
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleSpeakMessage = (content: string) => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(content);
    }
  };

  // Clean up speech when component unmounts or transcript changes
  useEffect(() => {
    if (!isListening && transcript) {
      resetTranscript();
    }
  }, [isListening, transcript, resetTranscript]);

  // Check if this is a quest from 1-50 (original biblical narrative layer)
  const isOriginalQuest = quest && parseInt(quest.id.replace('q', '')) <= 50;

  // Special prompt handler for questions 1-50
  const handleSpecialPrompt = (promptText: string) => {
    setInputMessage(promptText);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 pb-4 border-b-2 border-amber-800">
        <div>
          <h2 className="text-3xl font-bold text-amber-900 flex items-center gap-3">
            <Icon name="message-circle" className="w-8 h-8"/>
            AI 對話：{deepDive.title}
          </h2>
          <p className="text-sm text-stone-600 mt-1">與 AI 助理深入探討這個主題</p>
        </div>
        <button
          onClick={onBack}
          className="text-stone-600 hover:text-stone-900 transition"
          aria-label="返回深入探索"
        >
          <Icon name="x" className="w-6 h-6"/>
        </button>
      </div>

      <div className="mb-3">
        <span className="text-sm font-bold text-stone-600 mr-3">AI 模型:</span>
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            onClick={() => setSelectedModel('gemini')}
            className={`px-3 py-1.5 text-xs font-medium border transition-colors ${selectedModel === 'gemini' ? 'bg-amber-800 text-white border-amber-800' : 'bg-white text-stone-900 border-stone-300 hover:bg-stone-100'} rounded-l-lg`}
          >
            Gemini
          </button>
          <button
            onClick={() => setSelectedModel('openai')}
            className={`px-3 py-1.5 text-xs font-medium border-t border-b transition-colors ${selectedModel === 'openai' ? 'bg-amber-800 text-white border-amber-800' : 'bg-white text-stone-900 border-stone-300 hover:bg-stone-100'}`}
          >
            OpenAI
          </button>
          <button
            onClick={() => setSelectedModel('ollama')}
            className={`px-3 py-1.5 text-xs font-medium border transition-colors ${selectedModel === 'ollama' ? 'bg-amber-800 text-white border-amber-800' : 'bg-white text-stone-900 border-stone-300 hover:bg-stone-100'} rounded-r-lg`}
          >
            Ollama
          </button>
        </div>
      </div>

      {/* Special prompt buttons for questions 1-50 */}
      {isOriginalQuest && (
        <div className="mb-3 p-3 bg-indigo-50 border-2 border-indigo-200 rounded-lg">
          <p className="text-sm font-semibold text-indigo-900 mb-2 flex items-center gap-2">
            <Icon name="book-open" className="w-4 h-4"/>
            快速提問建議：
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleSpecialPrompt('想了解新舊約導論')}
              className="px-3 py-1.5 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              想了解新舊約導論
            </button>
            <button
              onClick={() => handleSpecialPrompt('舊約導論')}
              className="px-3 py-1.5 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              舊約導論
            </button>
            <button
              onClick={() => handleSpecialPrompt('新約導論')}
              className="px-3 py-1.5 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              新約導論
            </button>
            <button
              onClick={() => handleSpecialPrompt('導論')}
              className="px-3 py-1.5 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              導論
            </button>
          </div>
        </div>
      )}

      <div className="flex-grow overflow-y-auto bg-amber-50/30 rounded-lg p-4 mb-4 border border-amber-200 relative">
        {/* Scroll to top button */}
        {messages.length > 3 && (
          <button
            onClick={() => messagesEndRef.current?.parentElement?.scrollTo({ top: 0, behavior: 'smooth' })}
            className="sticky top-2 right-2 float-right bg-amber-600 hover:bg-amber-700 text-white p-2 rounded-full shadow-lg transition-all z-10"
            title="回到頂部"
          >
            <Icon name="arrow-left" className="w-4 h-4 transform rotate-90"/>
          </button>
        )}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
          >
            <div className="inline-flex flex-col gap-2 max-w-[80%]">
              <div
                className={`p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-amber-700 text-white'
                    : 'bg-white text-stone-900 border border-amber-300'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
              {/* Speaker button for assistant messages */}
              {message.role === 'assistant' && isSpeechOutputSupported && (
                <button
                  onClick={() => handleSpeakMessage(message.content)}
                  className={`self-start px-2 py-1 text-xs rounded-md transition-colors flex items-center gap-1 ${
                    isSpeaking
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-amber-600 hover:bg-amber-700 text-white'
                  }`}
                  title={isSpeaking ? '停止播放' : '播放粵語語音'}
                >
                  <Icon name={isSpeaking ? 'volume-x' : 'volume-2'} className="w-3 h-3"/>
                  {isSpeaking ? '停止' : '粵語'}
                </button>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-left">
            <div className="inline-block bg-white border border-amber-300 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2">
        <div className="relative flex-grow">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isListening ? "🎤 正在聆聽粵語..." : (isOriginalQuest ? "例如：導論、新約導論、舊約導論" : "輸入您的問題...")}
            className="w-full p-3 pr-12 border-2 border-amber-700/50 rounded-lg bg-white placeholder:text-stone-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition resize-none"
            rows={2}
            disabled={isLoading || isListening}
          />
          {/* Microphone button */}
          {isSpeechInputSupported && (
            <button
              onClick={handleMicClick}
              disabled={isLoading}
              className={`absolute right-2 top-2 p-2 rounded-lg transition-all ${
                isListening
                  ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse'
                  : 'bg-amber-600 hover:bg-amber-700 text-white'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              title={isListening ? '停止語音輸入' : '開始粵語語音輸入'}
            >
              <Icon name={isListening ? 'mic-off' : 'mic'} className="w-4 h-4"/>
            </button>
          )}
        </div>
        <button
          onClick={handleSendMessage}
          disabled={isLoading || !inputMessage.trim()}
          className="bg-amber-800 text-white font-bold py-2 px-6 rounded-lg hover:bg-amber-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Icon name="send" className="w-5 h-5"/>
          )}
        </button>
      </div>
    </div>
  );
};

export default DeepDiveChat;
