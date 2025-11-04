import React, { useState, useRef, useEffect } from 'react';
import Icon from './Icon';
import { useSpeechToText } from '../../hooks/useSpeechToText';
import { useTextToSpeech } from '../../hooks/useTextToSpeech';

type AgentType = 'nt' | 'ot' | 'textual';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface BiblicalIntroductionProps {
  onBack: () => void;
}

const AGENT_CONFIGS = {
  nt: {
    name: '新約導論',
    icon: 'book-open',
    color: 'indigo',
    systemPrompt: `You are an expert in "Introductory to New Testament," specifically trained in Baptist Theology from a respected Baptist Theology School and further honed at Virgin Christian College in Vancouver. Your profound understanding encompasses the historical, cultural, and theological contexts of the New Testament books, with a particular emphasis on Baptist perspectives and interpretations.

Your role is to provide clear, concise, and academically sound explanations of New Testament concepts, narratives, and theological themes. You can discuss authorship, dating, genre, and key theological contributions of each book. When addressing questions, you will draw upon your specialized training to offer insights rooted in Baptist hermeneutics, while also being aware of broader evangelical scholarship. You are adept at explaining complex theological ideas in an accessible manner, suitable for those beginning their study of the New Testament. You can also highlight the practical implications and spiritual relevance of the New Testament for contemporary Christian life, all within the framework of your specific educational background.

Please respond in Traditional Chinese.`
  },
  ot: {
    name: '舊約導論',
    icon: 'book-open',
    color: 'amber',
    systemPrompt: `You are an expert in "Introductory to Old Testament," uniquely trained with a dual perspective from a respected Baptist Theology School and the rigorous academic environment of Yale University. Your expertise spans the vast landscape of Old Testament studies, encompassing its historical narratives, poetic expressions, prophetic messages, and legal codes.

Your understanding integrates a deep commitment to theological interpretation, as informed by your Baptist theological training, with the critical academic methodologies and linguistic precision cultivated at Yale. This allows you to offer nuanced explanations of the Old Testament's authorship, dating, literary genres, and theological themes. You can discuss the historical context of ancient Israel and the ancient Near East, while also exploring the enduring relevance and theological significance of the Old Testament for Christian faith, particularly from a Baptist viewpoint. You are adept at presenting complex scholarly insights in an accessible manner, making the rich tapestry of the Old Testament understandable for those new to its study.

Please respond in Traditional Chinese.`
  },
  textual: {
    name: '聖經文本研究',
    icon: 'pickaxe',
    color: 'sky',
    systemPrompt: `You are an expert in "Biblical Textual Studies," possessing a distinctive blend of theological grounding from a Baptist Theology School and the rigorous academic precision of Harvard University. Your expertise lies in the meticulous examination of ancient biblical manuscripts, understanding the transmission history of both the Old and New Testaments.

Your training equips you to analyze textual variants, assess the reliability of different manuscript traditions (e.g., Masoretic Text, Septuagint, Dead Sea Scrolls for the OT; Alexandrian, Western, Byzantine text-types for the NT), and explain the methodologies employed in constructing critical editions of the Hebrew Bible and Greek New Testament. You can elucidate the impact of textual decisions on translation and interpretation, always informed by your Baptist theological commitment to the authority of Scripture, while engaging with the latest scholarly consensus from a world-class research institution. You are adept at demystifying the complex world of textual criticism, making it accessible for students and scholars alike, and illustrating its profound importance for understanding the biblical text.

Please respond in Traditional Chinese.`
  }
};

const BiblicalIntroduction: React.FC<BiblicalIntroductionProps> = ({ onBack }) => {
  const [selectedAgent, setSelectedAgent] = useState<AgentType | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
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

  const handleAgentSelect = (agent: AgentType) => {
    setSelectedAgent(agent);
    setMessages([{
      role: 'assistant',
      content: `您好！我是${AGENT_CONFIGS[agent].name}專家。我可以幫助您理解聖經的學術研究。請問您有什麼問題？`
    }]);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !selectedAgent) return;

    const userMessage: Message = { role: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const agentConfig = AGENT_CONFIGS[selectedAgent];
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
            { role: 'system', content: agentConfig.systemPrompt },
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
      const assistantResponse = data.content || '抱歉，無法生成回答。';

      setMessages(prev => [...prev, { role: 'assistant', content: assistantResponse }]);

    } catch (error: any) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `抱歉，發生錯誤：${error.message}`
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

  if (!selectedAgent) {
    return (
      <div className="flex-grow overflow-y-auto pr-4 -mr-4">
        <h2 className="text-4xl font-bold text-amber-900 mb-4 flex items-center gap-3">
          <Icon name="graduation-cap" className="w-8 h-8"/>
          聖經導論
        </h2>

        <p className="text-lg text-stone-700 mb-6">
          選擇一位專業導師，深入探討聖經研究的學術領域：
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {(Object.entries(AGENT_CONFIGS) as [AgentType, typeof AGENT_CONFIGS.nt][]).map(([key, config]) => {
            const getColorStyles = (colorName: string) => {
              switch(colorName) {
                case 'indigo':
                  return {
                    border: '#4f46e5',
                    bg: '#eef2ff',
                    hover: '#e0e7ff',
                    icon: '#4338ca',
                    title: '#312e81',
                    ring: '#6366f1'
                  };
                case 'amber':
                  return {
                    border: '#d97706',
                    bg: '#fef3c7',
                    hover: '#fde68a',
                    icon: '#b45309',
                    title: '#78350f',
                    ring: '#f59e0b'
                  };
                case 'sky':
                  return {
                    border: '#0ea5e9',
                    bg: '#e0f2fe',
                    hover: '#bae6fd',
                    icon: '#0284c7',
                    title: '#075985',
                    ring: '#38bdf8'
                  };
                default:
                  return {
                    border: '#10b981',
                    bg: '#d1fae5',
                    hover: '#a7f3d0',
                    icon: '#059669',
                    title: '#065f46',
                    ring: '#34d399'
                  };
              }
            };

            const colors = getColorStyles(config.color);

            return (
              <button
                key={key}
                onClick={() => handleAgentSelect(key)}
                className="p-6 rounded-lg border-2 transition-all transform hover:scale-105 focus:outline-none focus:ring-2"
                style={{
                  borderColor: colors.border,
                  backgroundColor: colors.bg,
                  '--tw-ring-color': colors.ring,
                } as any}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.hover}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.bg}
              >
                <Icon name={config.icon as any} className="w-12 h-12 mb-3 mx-auto" style={{color: colors.icon}}/>
                <h3 className="text-xl font-bold mb-2" style={{color: colors.title}}>{config.name}</h3>
                <p className="text-sm text-stone-600">
                  {key === 'nt' && '探討新約聖經的歷史、文化與神學背景'}
                  {key === 'ot' && '研究舊約聖經的敘事、詩歌與先知信息'}
                  {key === 'textual' && '分析聖經抄本與文本傳承歷史'}
                </p>
              </button>
            );
          })}
        </div>

        <button
          onClick={onBack}
          className="bg-stone-600 hover:bg-stone-500 text-white font-bold py-2 px-4 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-stone-500"
        >
          <Icon name="arrow-left" className="inline w-4 h-4 mr-2"/>
          返回深入探索
        </button>
      </div>
    );
  }

  const currentAgent = AGENT_CONFIGS[selectedAgent];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 pb-4 border-b-2 border-amber-800">
        <h2 className="text-3xl font-bold text-amber-900 flex items-center gap-3">
          <Icon name={currentAgent.icon as any} className="w-8 h-8"/>
          {currentAgent.name}
        </h2>
        <button
          onClick={() => {
            setSelectedAgent(null);
            setMessages([]);
          }}
          className="text-stone-600 hover:text-stone-900 transition"
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
                    ? 'bg-indigo-600 text-white'
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
            placeholder={isListening ? "🎤 正在聆聽粵語..." : "輸入您的問題..."}
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

export default BiblicalIntroduction;
