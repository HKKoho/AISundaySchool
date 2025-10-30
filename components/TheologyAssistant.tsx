import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft, MessageCircle, Settings, FileText, Upload,
  Send, Trash2, Save, Edit3, CheckCircle, AlertCircle,
  Book, GraduationCap, Users, Search, Filter, Info
} from 'lucide-react';
import {
  TheologyAssistantMode,
  AssignmentStage,
  AcademicLevel,
  TheologyAssistantState,
  ChatMessage,
  UploadedDocument,
  AssignmentPlan,
  AssignmentDraft,
  AssignmentCritique,
  LocalLLMModel
} from '../types';
import SpeechInput from './SpeechInput';

interface TheologyAssistantProps {
  onBack: () => void;
}

// Cloud AI Models (API-based) - descriptions will be translated
const getCloudAIModels = (t: any): LocalLLMModel[] => [
  {
    id: 'gemini-2.0-flash',
    name: 'Google Gemini 2.0 Flash',
    size: 'Cloud',
    description: t('models.gemini2Flash')
  },
  {
    id: 'gpt-4o',
    name: 'OpenAI GPT-4o',
    size: 'Cloud',
    description: t('models.gpt4o')
  },
  {
    id: 'gpt-4o-mini',
    name: 'OpenAI GPT-4o Mini',
    size: 'Cloud',
    description: t('models.gpt4oMini')
  }
];

// Ollama Cloud Models (actual available models in your account) - descriptions will be translated
const getOllamaCloudModels = (t: any): LocalLLMModel[] => [
  {
    id: 'kimi-k2:1t',
    name: 'Kimi K2 1T Cloud',
    size: 'Cloud (1T)',
    description: t('models.kimiK2')
  },
  {
    id: 'qwen3-coder:480b',
    name: 'Qwen3 Coder 480B Cloud',
    size: 'Cloud (480B)',
    description: t('models.qwen3Coder')
  },
  {
    id: 'deepseek-v3.1:671b',
    name: 'DeepSeek V3.1 671B Cloud',
    size: 'Cloud (671B)',
    description: t('models.deepseekV3')
  },
  {
    id: 'qwen3-vl:235b-cloud',
    name: 'Qwen3-VL 235B Cloud',
    size: 'Cloud (235B)',
    description: t('models.qwen3VL')
  },
  {
    id: 'llama3:8b',
    name: 'Llama 3 8B Cloud',
    size: 'Cloud (8B)',
    description: t('models.llama38b')
  }
];

// Local Ollama Models (locally installed - only models you actually have) - descriptions will be translated
const getLocalOllamaModels = (t: any): LocalLLMModel[] => [
  {
    id: 'qwen2.5vl:32b',
    name: 'Qwen 2.5 VL 32B',
    size: '32 GB',
    description: t('models.qwen25VL'),
    hasVision: true
  },
  {
    id: 'llama4:scout',
    name: 'Llama 4 Scout',
    size: '67 GB',
    description: t('models.llama4Scout')
  },
  {
    id: 'mistral-small:24b',
    name: 'Mistral Small 24B',
    size: '14 GB',
    description: t('models.mistralSmall')
  },
  {
    id: 'llama3.3:latest',
    name: 'Llama 3.3',
    size: '42 GB',
    description: t('models.llama33')
  },
  {
    id: 'llava:34b',
    name: 'LLaVA 34B',
    size: '20 GB',
    description: t('models.llava34b'),
    hasVision: true
  },
  {
    id: 'deepseek-r1:32b',
    name: 'DeepSeek R1 32B',
    size: '19 GB',
    description: t('models.deepseekR1')
  },
  {
    id: 'llama3.2-vision:latest',
    name: 'Llama 3.2 Vision',
    size: '7.9 GB',
    description: t('models.llama32Vision'),
    hasVision: true
  }
];

const INITIAL_STATE: TheologyAssistantState = {
  mode: TheologyAssistantMode.THEOLOGY_CHAT,
  messages: [],
  documents: [],
  assignmentTopic: '',
  theologyArea: '',
  academicLevel: AcademicLevel.UNDERGRADUATE,
  assignmentLength: 1500,
  assignmentTone: 'academic',
  assignmentStage: AssignmentStage.INPUT,
  revisionNumber: 0,
  maxRevisions: 3,
  selectedModel: 'gpt-oss:20b', // Default to Ollama Cloud model
  temperature: 0,
  topP: 0.9,
  isProcessing: false,
};

interface UploadStatus {
  fileName: string;
  isProcessing: boolean;
}

// Search Results Interface (kept from original TheologySearch)
interface SearchResult {
  title: string;
  author: string;
  type: 'book' | 'article' | 'commentary' | 'encyclopedia' | 'thesis' | 'website';
  description: string;
  url?: string;
  tags: string[];
  source?: string;
}

const mockResults: SearchResult[] = [
  {
    title: '系統神學導論 (Introduction to Systematic Theology)',
    author: '路易斯·柏克富 (Louis Berkhof)',
    type: 'book',
    description: '經典的改革宗系統神學著作，全面探討基督教教義的各個方面，包括神論、人論、基督論、救恩論等核心主題。',
    url: 'https://example.com',
    tags: ['系統神學', '改革宗', '教義'],
    source: '本地示例資料庫'
  },
  {
    title: '聖經註釋：羅馬書 (Romans Commentary)',
    author: '約翰·加爾文 (John Calvin)',
    type: 'commentary',
    description: '加爾文對羅馬書的深入註釋,闡述保羅的神學思想，特別關注因信稱義和神的主權等核心議題。',
    url: 'https://example.com',
    tags: ['聖經註釋', '羅馬書', '因信稱義'],
    source: '本地示例資料庫'
  },
  {
    title: '教會歷史研究：宗教改革時期 (Reformation History)',
    author: '多位作者',
    type: 'article',
    description: '探討16世紀宗教改革運動的歷史背景、神學爭議和對現代教會的影響。',
    tags: ['教會歷史', '宗教改革', '馬丁路德'],
    source: '本地示例資料庫'
  },
  {
    title: '三一神論的聖經基礎 (Biblical Basis for Trinity)',
    author: '奧古斯丁 (Augustine)',
    type: 'thesis',
    description: '從聖經角度深入探討三位一體教義的神學基礎和歷史發展。',
    url: 'https://example.com',
    tags: ['三一神論', '教義', '教父神學'],
    source: '本地示例資料庫'
  },
];

export const TheologyAssistant: React.FC<TheologyAssistantProps> = ({ onBack }) => {
  const { t } = useTranslation('theologyAssistant');
  const [state, setState] = useState<TheologyAssistantState>(INITIAL_STATE);
  const [currentMessage, setCurrentMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchMode, setSearchMode] = useState<'googleSearch' | 'urlContext' | 'codeExecution' | 'generalKnowledge'>('googleSearch');
  const [urlSource, setUrlSource] = useState<string>('reformed');
  const [uploadStatus, setUploadStatus] = useState<UploadStatus | null>(null);
  const [isEditingPlan, setIsEditingPlan] = useState(false);
  const [editedPlanContent, setEditedPlanContent] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get translated model lists
  const CLOUD_AI_MODELS = getCloudAIModels(t);
  const OLLAMA_CLOUD_MODELS = getOllamaCloudModels(t);
  const LOCAL_OLLAMA_MODELS = getLocalOllamaModels(t);
  const LOCAL_LLM_MODELS = [...CLOUD_AI_MODELS, ...OLLAMA_CLOUD_MODELS, ...LOCAL_OLLAMA_MODELS];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages]);

  const updateState = (updates: Partial<TheologyAssistantState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  // Chat functionality
  const handleSendMessage = async () => {
    if (!currentMessage.trim() || state.isProcessing) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: currentMessage,
      timestamp: new Date().toISOString(),
    };

    updateState({
      messages: [...state.messages, userMessage],
      isProcessing: true,
    });

    setCurrentMessage('');

    try {
      // Import the service dynamically
      const { sendChatMessage, createTheologySystemPrompt } = await import('../services/theologyAssistantService');

      // Prepare messages with system context
      let systemPrompt = createTheologySystemPrompt(state.mode);

      // If in Reading Q&A mode and documents are uploaded, include document context
      if (state.mode === TheologyAssistantMode.READING_QA && state.documents.length > 0) {
        const documentsContext = state.documents.map(doc =>
          `\n\n${t('readingQA.documentStart', { name: doc.name })}\n${doc.content.substring(0, 10000)}\n${t('readingQA.documentEnd')}`
        ).join('\n');

        systemPrompt += `${t('readingQA.documentContext')}${documentsContext}${t('readingQA.answerInstruction')}`;
      }

      const conversationMessages = [
        { role: 'user' as const, content: systemPrompt },
        ...state.messages.map(m => ({ role: m.role, content: m.content })),
        { role: 'user' as const, content: currentMessage }
      ];

      // Call the API
      const response = await sendChatMessage({
        model: state.selectedModel,
        messages: conversationMessages,
        temperature: state.temperature,
        topP: state.topP
      });

      const aiMessage: ChatMessage = {
        role: 'assistant',
        content: response.content,
        timestamp: new Date().toISOString(),
      };

      updateState({
        messages: [...state.messages, userMessage, aiMessage],
        isProcessing: false,
      });
    } catch (error: any) {
      console.error('Chat error:', error);

      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: t('chat.errorPrefix', { message: error.message }) + t('chat.errorChecklist'),
        timestamp: new Date().toISOString(),
      };

      updateState({
        messages: [...state.messages, userMessage, errorMessage],
        isProcessing: false,
      });
    }
  };

  // Document upload functionality
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    for (const file of files) {
      const fileType = file.name.split('.').pop()?.toLowerCase() || 'txt';

      if (fileType === 'pdf') {
        // Handle PDF files
        setUploadStatus({ fileName: file.name, isProcessing: true });
        try {
          const arrayBuffer = await file.arrayBuffer();
          const pdfjsLib = await import('pdfjs-dist');

          // Set worker path to local file
          pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

          const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
          let fullText = '';

          // Extract text from all pages
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items
              .map((item: any) => item.str)
              .join(' ');
            fullText += pageText + '\n\n';
          }

          const document: UploadedDocument = {
            name: file.name,
            content: fullText,
            type: 'pdf',
          };

          updateState({
            documents: [...state.documents, document],
          });
          setUploadStatus(null);
        } catch (error) {
          console.error('PDF parsing error:', error);
          setUploadStatus(null);
          alert(t('readingQA.parseError', { fileName: file.name, error: String(error) }));
        }
      } else {
        // Handle text files (txt, md, docx as text)
        setUploadStatus({ fileName: file.name, isProcessing: true });
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          const document: UploadedDocument = {
            name: file.name,
            content,
            type: fileType as any,
          };

          updateState({
            documents: [...state.documents, document],
          });
          setUploadStatus(null);
        };
        reader.onerror = () => {
          setUploadStatus(null);
          alert(t('readingQA.readError', { fileName: file.name }));
        };
        reader.readAsText(file);
      }
    }
  };

  // Assignment Assistant functionality
  const createAssignmentPlan = async () => {
    if (!state.assignmentTopic.trim() || !state.theologyArea.trim()) return;

    updateState({
      isProcessing: true,
      assignmentStage: AssignmentStage.PLANNING
    });

    try {
      // Import the service dynamically
      const { sendChatMessage } = await import('../services/theologyAssistantService');

      // Custom system prompt for Princeton-trained Bible research assistant
      const systemPrompt = t('assignment.systemPrompt');

      const userPrompt = t('assignment.planPrompt', {
        topic: state.assignmentTopic,
        area: state.theologyArea,
        level: state.academicLevel,
        length: state.assignmentLength
      });

      const response = await sendChatMessage({
        model: state.selectedModel,
        messages: [
          { role: 'user', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: state.temperature,
        topP: state.topP
      });

      const plan: AssignmentPlan = {
        id: Date.now().toString(),
        topic: state.assignmentTopic,
        content: response.content,
        createdAt: new Date().toISOString(),
      };

      updateState({
        currentPlan: plan,
        isProcessing: false,
        assignmentStage: AssignmentStage.DRAFTING,
      });
    } catch (error: any) {
      console.error('Plan generation error:', error);
      updateState({
        isProcessing: false,
        assignmentStage: AssignmentStage.INPUT
      });
      alert(t('assignment.planError', { message: error.message }));
    }
  };

  const createAssignmentDraft = async () => {
    if (!state.currentPlan) return;

    updateState({
      isProcessing: true,
      assignmentStage: AssignmentStage.CRITIQUING
    });

    try {
      // Import the service dynamically
      const { sendChatMessage } = await import('../services/theologyAssistantService');

      // Custom system prompt for Princeton-trained Bible research assistant
      const systemPrompt = t('assignment.systemPrompt');

      const userPrompt = t('assignment.draftPrompt', {
        plan: state.currentPlan.content,
        topic: state.assignmentTopic,
        area: state.theologyArea,
        level: state.academicLevel,
        length: state.assignmentLength
      });

      const response = await sendChatMessage({
        model: state.selectedModel,
        messages: [
          { role: 'user', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: state.temperature,
        topP: state.topP
      });

      const draft: AssignmentDraft = {
        id: Date.now().toString(),
        topic: state.assignmentTopic,
        content: response.content,
        stage: AssignmentStage.DRAFTING,
        revisionNumber: state.revisionNumber,
        createdAt: new Date().toISOString(),
      };

      updateState({
        currentDraft: draft,
        isProcessing: false,
      });
    } catch (error: any) {
      console.error('Draft generation error:', error);
      updateState({ isProcessing: false });
      alert(t('assignment.draftError', { message: error.message }));
    }
  };

  // Search functionality
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);

    try {
      // Import the real search service
      const { searchTheologyResources, SearchMode, THEOLOGY_RESOURCE_URLS } = await import('../services/theologyResourceSearch');

      // Get target URLs if using URL Context mode
      let targetURLs: string[] | undefined;
      if (searchMode === 'urlContext') {
        targetURLs = THEOLOGY_RESOURCE_URLS[urlSource as keyof typeof THEOLOGY_RESOURCE_URLS] || [];
      }

      // Call Gemini search with selected mode
      const response = await searchTheologyResources(
        searchQuery,
        selectedType,
        SearchMode[searchMode.toUpperCase() as keyof typeof SearchMode],
        targetURLs,
        searchMode === 'urlContext' ? urlSource : undefined
      );

      setSearchResults(response.results);
    } catch (error: any) {
      console.error('Search error:', error);

      // Fallback to mock results on error
      let filtered = mockResults.filter(result =>
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );

      if (selectedType !== 'all') {
        filtered = filtered.filter(result => result.type === selectedType);
      }

      setSearchResults(filtered);

      // Show error notification
      alert(t('search.searchError', { message: error.message }));
    } finally {
      setIsSearching(false);
    }
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      book: '📚',
      article: '📄',
      commentary: '📖',
      encyclopedia: '📕',
      thesis: '🎓',
      website: '🌐',
    };
    return icons[type as keyof typeof icons] || '📝';
  };

  const getTypeName = (type: string) => {
    const names: { [key: string]: string } = {
      book: t('search.book'),
      article: t('search.article'),
      commentary: t('search.commentary'),
      encyclopedia: t('search.encyclopedia'),
      thesis: t('search.thesis'),
      website: t('search.website'),
      all: t('search.all')
    };
    return names[type] || type;
  };

  const renderTabButton = (mode: TheologyAssistantMode, icon: React.ReactNode, label: string) => (
    <button
      onClick={() => updateState({ mode })}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
        state.mode === mode
          ? 'bg-indigo-600 text-white'
          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
      }`}
    >
      {icon}
      {label}
    </button>
  );

  // Reusable model selection component
  const renderModelSelection = () => (
    <div className="bg-gray-800 rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold mb-4">{t('modelSelection.title')}</h3>

      {/* Model Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {t('modelSelection.selectModel')}
        </label>
        <select
          value={state.selectedModel}
          onChange={(e) => updateState({ selectedModel: e.target.value })}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-indigo-500 text-white"
        >
          <optgroup label={t('modelSelection.cloudAI')}>
            {CLOUD_AI_MODELS.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name} ({model.size})
              </option>
            ))}
          </optgroup>
          <optgroup label={t('modelSelection.ollamaCloud')}>
            {OLLAMA_CLOUD_MODELS.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name} ({model.size})
              </option>
            ))}
          </optgroup>
          <optgroup label={t('modelSelection.localOllama')}>
            {LOCAL_OLLAMA_MODELS.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name} ({model.size})
              </option>
            ))}
          </optgroup>
        </select>
        <div className="mt-2 p-3 bg-gray-700/50 rounded-lg">
          <p className="text-xs text-gray-300">
            {LOCAL_LLM_MODELS.find(m => m.id === state.selectedModel)?.description}
          </p>
          {LOCAL_LLM_MODELS.find(m => m.id === state.selectedModel)?.hasVision && (
            <span className="text-xs text-yellow-400 mt-1 block">{t('modelSelection.visionSupport')}</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {t('modelSelection.temperature', { value: state.temperature })}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={state.temperature}
            onChange={(e) => updateState({ temperature: parseFloat(e.target.value) })}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{t('modelSelection.temperatureConservative')}</span>
            <span>{t('modelSelection.temperatureCreative')}</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {t('modelSelection.topP', { value: state.topP })}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={state.topP}
            onChange={(e) => updateState({ topP: parseFloat(e.target.value) })}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{t('modelSelection.topPFocused')}</span>
            <span>{t('modelSelection.topPDiverse')}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTheologyChat = () => {
    return (
      <div className="space-y-4">
        {renderModelSelection()}

      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-800 rounded-lg min-h-[600px]">
          {state.messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-2xl lg:max-w-4xl px-4 py-2 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-700 text-gray-100'
                }`}
              >
                {message.role === 'assistant' ? (
                  <div className="prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown>
                      {message.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  message.content
                )}
              </div>
            </div>
          ))}
          {state.isProcessing && (
            <div className="flex justify-start">
              <div className="bg-gray-700 text-gray-100 px-4 py-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-400"></div>
                  {t('chat.thinking')}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-gray-700">
          <div className="flex gap-2">
            <SpeechInput
              value={currentMessage}
              onChange={setCurrentMessage}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
              placeholder={t('chat.placeholder')}
              disabled={state.isProcessing}
              lang="zh-TW"
            />
            <button
              onClick={handleSendMessage}
              disabled={state.isProcessing || !currentMessage.trim()}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
    );
  };

  const renderReadingQA = () => (
    <div className="space-y-6">
      {renderModelSelection()}

      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">{t('readingQA.uploadTitle')}</h3>
        <div
          className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-gray-500 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-300">{t('readingQA.uploadPrompt')}</p>
          <p className="text-sm text-gray-500 mt-2">{t('readingQA.supportedFormats')}</p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.docx,.txt,.md"
          onChange={handleFileUpload}
          className="hidden"
        />

        {uploadStatus && (
          <div className="mt-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-400"></div>
              <div>
                <p className="text-sm font-medium text-blue-300">{t('readingQA.processing')}</p>
                <p className="text-xs text-blue-400">{uploadStatus.fileName}</p>
              </div>
            </div>
          </div>
        )}

        {state.documents.length > 0 && (
          <div className="mt-4">
            <h4 className="font-medium text-gray-300 mb-2">{t('readingQA.uploadedDocs')}</h4>
            <div className="space-y-2">
              {state.documents.map((doc, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-gray-700 rounded">
                  <FileText className="w-4 h-4" />
                  <span className="text-sm">{doc.name}</span>
                  <span className="text-xs text-green-400 ml-auto">{t('readingQA.parsed')}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {state.documents.length > 0 && (
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-800 rounded-lg min-h-[600px]">
            {state.messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-2xl lg:max-w-4xl px-4 py-2 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-700 text-gray-100'
                  }`}
                >
                  {message.role === 'assistant' ? (
                    <div className="prose prose-invert prose-sm max-w-none">
                      <ReactMarkdown>
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    message.content
                  )}
                </div>
              </div>
            ))}
            {state.isProcessing && (
              <div className="flex justify-start">
                <div className="bg-gray-700 text-gray-100 px-4 py-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-400"></div>
                    {t('readingQA.analyzing')}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-700">
            <div className="flex gap-2">
              <SpeechInput
                value={currentMessage}
                onChange={setCurrentMessage}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                placeholder={t('readingQA.placeholder')}
                disabled={state.isProcessing}
                lang="zh-TW"
              />
              <button
                onClick={handleSendMessage}
                disabled={state.isProcessing || !currentMessage.trim()}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderAssignmentAssistant = () => (
    <div className="space-y-6">
      {renderModelSelection()}

      {state.assignmentStage === AssignmentStage.INPUT && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">{t('assignment.settingsTitle')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {t('assignment.topic')}
              </label>
              <SpeechInput
                value={state.assignmentTopic}
                onChange={(value) => updateState({ assignmentTopic: value })}
                placeholder={t('assignment.topicPlaceholder')}
                className="w-full"
                lang="zh-TW"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {t('assignment.theologyArea')}
              </label>
              <SpeechInput
                value={state.theologyArea}
                onChange={(value) => updateState({ theologyArea: value })}
                placeholder={t('assignment.theologyAreaPlaceholder')}
                className="w-full"
                lang="zh-TW"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {t('assignment.academicLevel')}
              </label>
              <select
                value={state.academicLevel}
                onChange={(e) => updateState({ academicLevel: e.target.value as AcademicLevel })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-indigo-500 text-white"
              >
                <option value={AcademicLevel.UNDERGRADUATE}>{t('assignment.undergraduate')}</option>
                <option value={AcademicLevel.GRADUATE}>{t('assignment.graduate')}</option>
                <option value={AcademicLevel.DOCTORAL}>{t('assignment.doctoral')}</option>
                <option value={AcademicLevel.GENERAL}>{t('assignment.general')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {t('assignment.length')}
              </label>
              <input
                type="number"
                value={state.assignmentLength}
                onChange={(e) => updateState({ assignmentLength: parseInt(e.target.value) })}
                min="500"
                max="10000"
                step="500"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-indigo-500 text-white"
              />
            </div>
          </div>

          <button
            onClick={createAssignmentPlan}
            disabled={!state.assignmentTopic.trim() || !state.theologyArea.trim() || state.isProcessing}
            className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            {state.isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                {t('assignment.creatingPlan')}
              </>
            ) : (
              <>
                <Edit3 className="w-4 h-4" />
                {t('assignment.createPlan')}
              </>
            )}
          </button>
        </div>
      )}

      {state.currentPlan && state.assignmentStage === AssignmentStage.DRAFTING && (
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">{t('assignment.planTitle')}</h3>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              {!isEditingPlan && (
                <button
                  onClick={() => {
                    setIsEditingPlan(true);
                    setEditedPlanContent(state.currentPlan?.content || '');
                  }}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3" />
                  {t('assignment.edit')}
                </button>
              )}
            </div>
          </div>

          {isEditingPlan ? (
            <div className="space-y-4">
              <textarea
                value={editedPlanContent}
                onChange={(e) => setEditedPlanContent(e.target.value)}
                className="w-full min-h-96 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-indigo-500 text-gray-200 font-mono text-sm"
                placeholder={t('assignment.editPlanPlaceholder')}
              />
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    updateState({
                      currentPlan: {
                        ...state.currentPlan!,
                        content: editedPlanContent
                      }
                    });
                    setIsEditingPlan(false);
                  }}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  {t('assignment.saveChanges')}
                </button>
                <button
                  onClick={() => {
                    setIsEditingPlan(false);
                    setEditedPlanContent('');
                  }}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg font-medium transition-colors"
                >
                  {t('assignment.cancel')}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-700 rounded-lg p-4 mb-4 max-h-96 overflow-y-auto">
              <div className="prose prose-invert prose-sm max-w-none">
                <ReactMarkdown>{state.currentPlan.content}</ReactMarkdown>
              </div>
            </div>
          )}

          {!isEditingPlan && (
            <button
              onClick={createAssignmentDraft}
              disabled={state.isProcessing}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              {state.isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  {t('assignment.creatingDraft')}
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  {t('assignment.createDraft')}
                </>
              )}
            </button>
          )}
        </div>
      )}

      {state.currentDraft && state.assignmentStage === AssignmentStage.CRITIQUING && (
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">{t('assignment.draftTitle')}</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">{t('assignment.revisionCount', { count: state.revisionNumber })}</span>
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4 max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap text-sm text-gray-200">
              {state.currentDraft.content}
            </pre>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => updateState({
                assignmentStage: AssignmentStage.INPUT,
                currentPlan: undefined,
                currentDraft: undefined,
                revisionNumber: 0
              })}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg font-medium transition-colors"
            >
              {t('assignment.restart')}
            </button>
            <button
              onClick={() => {
                // Save draft functionality would go here
                alert(t('assignment.draftSaved'));
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {t('assignment.saveDraft')}
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderResourceSearch = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
            <div className="flex-1">
              <SpeechInput
                value={searchQuery}
                onChange={setSearchQuery}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSearch()}
                placeholder={t('search.placeholder')}
                className="w-full pl-10"
                lang="zh-TW"
              />
            </div>
          </div>
          <button
            onClick={handleSearch}
            disabled={isSearching || !searchQuery.trim()}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            {isSearching ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                {t('search.searching')}
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                {t('search.searchButton')}
              </>
            )}
          </button>
        </div>

        {/* Search Mode Selection */}
        <div className="mb-4 p-4 bg-gray-700/30 rounded-lg">
          <label className="block text-sm font-medium text-gray-300 mb-3">
            {t('search.modeTitle')}
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button
              onClick={() => setSearchMode('googleSearch')}
              className={`p-3 rounded-lg text-left transition-colors ${
                searchMode === 'googleSearch'
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <div className="font-semibold">🌐 Google Search</div>
              <div className="text-xs mt-1 opacity-80">即時網路搜尋神學資源</div>
            </button>

            <button
              onClick={() => setSearchMode('urlContext')}
              className={`p-3 rounded-lg text-left transition-colors ${
                searchMode === 'urlContext'
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <div className="font-semibold">🔗 URL Context</div>
              <div className="text-xs mt-1 opacity-80">從指定神學網站搜尋</div>
            </button>

            <button
              onClick={() => setSearchMode('codeExecution')}
              className={`p-3 rounded-lg text-left transition-colors ${
                searchMode === 'codeExecution'
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <div className="font-semibold">⚡ Code Execution</div>
              <div className="text-xs mt-1 opacity-80">程式碼分析和統計</div>
            </button>

            <button
              onClick={() => setSearchMode('generalKnowledge')}
              className={`p-3 rounded-lg text-left transition-colors ${
                searchMode === 'generalKnowledge'
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <div className="font-semibold">📚 Knowledge Base</div>
              <div className="text-xs mt-1 opacity-80">使用 AI 知識庫推薦</div>
            </button>
          </div>

          {/* URL Source selector (only shown for URL Context mode) */}
          {searchMode === 'urlContext' && (
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                選擇神學資源來源:
              </label>
              <select
                value={urlSource}
                onChange={(e) => setUrlSource(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-green-500 text-white"
              >
                <option value="reformed">改革宗資源 (Monergism, Ligonier, TGC)</option>
                <option value="catholic">天主教資源 (Vatican, Catholic.com)</option>
                <option value="orthodox">東正教資源 (OCA, Greek Orthodox)</option>
                <option value="academic">學術資源 (Logos, JSTOR)</option>
                <option value="chinese">華人神學資源</option>
              </select>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-gray-400" />
          <span className="text-gray-400 text-sm">資源類型篩選:</span>
          <div className="flex gap-2 flex-wrap">
            {['all', 'book', 'article', 'commentary', 'encyclopedia', 'thesis', 'website'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedType === type
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {type === 'all' ? '全部' : getTypeName(type)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {searchResults.length > 0 && (
        <div className="space-y-4">
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-300 mb-1">找到 {searchResults.length} 個結果</h3>
                <p className="text-sm text-blue-200/80">
                  {searchMode === 'googleSearch' && '使用 Google Search 即時搜尋神學資源，包含網路上的最新內容。'}
                  {searchMode === 'urlContext' && `從 ${urlSource === 'reformed' ? '改革宗' : urlSource === 'catholic' ? '天主教' : urlSource === 'orthodox' ? '東正教' : urlSource === 'academic' ? '學術' : '華人神學'} 資源網站搜尋相關內容。`}
                  {searchMode === 'codeExecution' && '使用程式碼執行分析神學文獻數據，提供統計和分類資訊。'}
                  {searchMode === 'generalKnowledge' && '基於 AI 知識庫推薦經典神學著作和重要學者作品。'}
                </p>
                <p className="text-xs text-blue-300/60 mt-2">
                  💡 請查看每個結果的「資料來源」標籤，以確定是否適合引用
                </p>
              </div>
            </div>
          </div>

          {searchResults.map((result, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors border border-gray-700 hover:border-green-500"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{getTypeIcon(result.type)}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {result.title}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        作者: {result.author}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-xs font-medium whitespace-nowrap">
                      {getTypeName(result.type)}
                    </span>
                  </div>

                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {result.description}
                  </p>

                  <div className="space-y-3">
                    {/* Source Information */}
                    {result.source && (
                      <div className="flex items-center gap-2 text-xs border-l-2 border-blue-500 pl-3 py-1">
                        <Info className="w-3 h-3 text-blue-400 flex-shrink-0" />
                        <span className="text-gray-500">資料來源:</span>
                        <span className="px-2 py-0.5 bg-blue-600/20 text-blue-400 rounded font-medium">
                          {result.source}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex gap-2 flex-wrap">
                        {result.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {result.url && (
                        <a
                          href={result.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
                        >
                          <Book className="w-4 h-4" />
                          查看資源
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {searchResults.length === 0 && searchQuery && !isSearching && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-300 mb-2">
            未找到相關資源
          </h3>
          <p className="text-gray-400">
            嘗試使用不同的關鍵字或調整篩選條件
          </p>
        </div>
      )}

      {searchResults.length === 0 && !searchQuery && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-gray-300 mb-2">
            開始搜尋神學資源
          </h3>
          <p className="text-gray-400 mb-6">
            輸入關鍵字搜尋書籍、文章、註釋和學術論文
          </p>
          <div className="flex justify-center gap-4 text-sm text-gray-500">
            <span>熱門搜尋:</span>
            {['三一神論', '因信稱義', '教會歷史', '系統神學'].map((term) => (
              <button
                key={term}
                onClick={() => {
                  setSearchQuery(term);
                  setTimeout(handleSearch, 100);
                }}
                className="text-green-400 hover:text-green-300 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (state.mode) {
      case TheologyAssistantMode.THEOLOGY_CHAT:
        return renderTheologyChat();
      case TheologyAssistantMode.READING_QA:
        return renderReadingQA();
      case TheologyAssistantMode.ASSIGNMENT_ASSISTANT:
        return renderAssignmentAssistant();
      case TheologyAssistantMode.RESOURCE_SEARCH:
        return renderResourceSearch();
      default:
        return renderTheologyChat();
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          {t('backButton')}
        </button>

        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          {t('title')}
        </h1>
        <p className="text-gray-400">{t('subtitle')}</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {renderTabButton(
          TheologyAssistantMode.RESOURCE_SEARCH,
          <Search className="w-4 h-4" />,
          t('tabs.resourceSearch')
        )}
        {renderTabButton(
          TheologyAssistantMode.ASSIGNMENT_ASSISTANT,
          <GraduationCap className="w-4 h-4" />,
          t('tabs.assignmentAssistant')
        )}
        {renderTabButton(
          TheologyAssistantMode.THEOLOGY_CHAT,
          <MessageCircle className="w-4 h-4" />,
          t('tabs.theologyChat')
        )}
        {renderTabButton(
          TheologyAssistantMode.READING_QA,
          <FileText className="w-4 h-4" />,
          t('tabs.readingQA')
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 min-h-0">
        {renderContent()}
      </div>
    </div>
  );
};