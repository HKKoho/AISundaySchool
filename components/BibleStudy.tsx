import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Book, BookOpen, Globe, Languages, BookMarked, FileText, Link2, Eye, Sparkles, History, Lightbulb, Save, Trash2 } from 'lucide-react';

interface BibleBook {
  MySeq: string;
  聖經: string;
  english: string;
  章數: number;
  Code: string;
}

interface StudyMode {
  id: string;
  name: string;
  nameEn: string;
  icon: JSX.Element;
  desc: string;
}

interface VerseHistory {
  book: string;
  chapter: number;
  mode: string;
  timestamp: string;
}

interface AISummary {
  content: string;
  timestamp: string;
  model: string;
}

interface BrowsingSession {
  url: string;
  timestamp: string;
  reference: string;
}

interface BrowsingRecord {
  sessionId: string;
  startTime: string;
  sessions: BrowsingSession[];
  book: string;
  chapter: number;
  mode: string;
}

const bibleData: BibleBook[] = [
  { MySeq: "OT01", 聖經: "創世記", english: "Genesis", 章數: 50, Code: "Gen." },
  { MySeq: "OT02", 聖經: "出埃及記", english: "Exodus", 章數: 40, Code: "Exod." },
  { MySeq: "OT03", 聖經: "利未記", english: "Leviticus", 章數: 27, Code: "Lev." },
  { MySeq: "OT04", 聖經: "民數記", english: "Numbers", 章數: 36, Code: "Num." },
  { MySeq: "OT05", 聖經: "申命記", english: "Deuteronomy", 章數: 34, Code: "Deut." },
  { MySeq: "OT06", 聖經: "約書亞記", english: "Joshua", 章數: 24, Code: "Josh." },
  { MySeq: "OT07", 聖經: "士師記", english: "Judges", 章數: 21, Code: "Judg." },
  { MySeq: "OT08", 聖經: "路得記", english: "Ruth", 章數: 4, Code: "Ruth." },
  { MySeq: "OT09", 聖經: "撒母耳記上", english: "1 Samuel", 章數: 31, Code: "1Sam." },
  { MySeq: "OT10", 聖經: "撒母耳記下", english: "2 Samuel", 章數: 24, Code: "2Sam." },
  { MySeq: "OT11", 聖經: "列王記上", english: "1 Kings", 章數: 22, Code: "1Kgs." },
  { MySeq: "OT12", 聖經: "列王記下", english: "2 Kings", 章數: 25, Code: "2Kgs." },
  { MySeq: "OT13", 聖經: "歷代志上", english: "1 Chronicles", 章數: 29, Code: "1Chr." },
  { MySeq: "OT14", 聖經: "歷代志下", english: "2 Chronicles", 章數: 36, Code: "2Chr." },
  { MySeq: "OT15", 聖經: "以斯拉記", english: "Ezra", 章數: 10, Code: "Ezra." },
  { MySeq: "OT16", 聖經: "尼希米記", english: "Nehemiah", 章數: 13, Code: "Neh." },
  { MySeq: "OT17", 聖經: "以斯帖記", english: "Esther", 章數: 10, Code: "Esth." },
  { MySeq: "OT18", 聖經: "約伯記", english: "Job", 章數: 42, Code: "Job." },
  { MySeq: "OT19", 聖經: "詩篇", english: "Psalms", 章數: 150, Code: "Ps." },
  { MySeq: "OT20", 聖經: "箴言", english: "Proverbs", 章數: 31, Code: "Prov." },
  { MySeq: "OT21", 聖經: "傳道書", english: "Ecclesiastes", 章數: 12, Code: "Eccl." },
  { MySeq: "OT22", 聖經: "雅歌", english: "Song of Solomon", 章數: 8, Code: "Song." },
  { MySeq: "OT23", 聖經: "以賽亞書", english: "Isaiah", 章數: 66, Code: "Isa." },
  { MySeq: "OT24", 聖經: "耶利米書", english: "Jeremiah", 章數: 52, Code: "Jer." },
  { MySeq: "OT25", 聖經: "耶利米哀歌", english: "Lamentations", 章數: 5, Code: "Lam." },
  { MySeq: "OT26", 聖經: "以西結書", english: "Ezekiel", 章數: 48, Code: "Ezek." },
  { MySeq: "OT27", 聖經: "但以理書", english: "Daniel", 章數: 12, Code: "Dan." },
  { MySeq: "OT28", 聖經: "何西阿書", english: "Hosea", 章數: 14, Code: "Hos." },
  { MySeq: "OT29", 聖經: "約珥書", english: "Joel", 章數: 3, Code: "Joel." },
  { MySeq: "OT30", 聖經: "阿摩司書", english: "Amos", 章數: 9, Code: "Amos." },
  { MySeq: "OT31", 聖經: "俄巴底亞書", english: "Obadiah", 章數: 1, Code: "Obad" },
  { MySeq: "OT32", 聖經: "約拿書", english: "Jonah", 章數: 4, Code: "Jonah." },
  { MySeq: "OT33", 聖經: "彌迦書", english: "Micah", 章數: 7, Code: "Mic." },
  { MySeq: "OT34", 聖經: "那鴻書", english: "Nahum", 章數: 3, Code: "Nah." },
  { MySeq: "OT35", 聖經: "哈巴谷書", english: "Habakkuk", 章數: 3, Code: "Hab." },
  { MySeq: "OT36", 聖經: "西番雅書", english: "Zephaniah", 章數: 3, Code: "Zeph." },
  { MySeq: "OT37", 聖經: "哈該書", english: "Haggai", 章數: 2, Code: "Hag." },
  { MySeq: "OT38", 聖經: "撒迦利亞書", english: "Zechariah", 章數: 14, Code: "Zech." },
  { MySeq: "OT39", 聖經: "瑪拉基書", english: "Malachi", 章數: 4, Code: "Mal." },
  { MySeq: "NT01", 聖經: "馬太福音", english: "Matthew", 章數: 28, Code: "Matt." },
  { MySeq: "NT02", 聖經: "馬可福音", english: "Mark", 章數: 16, Code: "Mark." },
  { MySeq: "NT03", 聖經: "路加福音", english: "Luke", 章數: 24, Code: "Luke." },
  { MySeq: "NT04", 聖經: "約翰福音", english: "John", 章數: 21, Code: "John." },
  { MySeq: "NT05", 聖經: "使徒行傳", english: "Acts", 章數: 28, Code: "Acts." },
  { MySeq: "NT06", 聖經: "羅馬書", english: "Romans", 章數: 16, Code: "Rom." },
  { MySeq: "NT07", 聖經: "哥林多前書", english: "1 Corinthians", 章數: 16, Code: "1Cor." },
  { MySeq: "NT08", 聖經: "哥林多後書", english: "2 Corinthians", 章數: 13, Code: "2Cor." },
  { MySeq: "NT09", 聖經: "加拉太書", english: "Galatians", 章數: 6, Code: "Gal." },
  { MySeq: "NT10", 聖經: "以弗所書", english: "Ephesians", 章數: 6, Code: "Eph." },
  { MySeq: "NT11", 聖經: "腓立比書", english: "Philippians", 章數: 4, Code: "Phil." },
  { MySeq: "NT12", 聖經: "歌羅西書", english: "Colossians", 章數: 4, Code: "Col." },
  { MySeq: "NT13", 聖經: "帖撒羅尼迦前書", english: "1 Thessalonians", 章數: 5, Code: "1Thess." },
  { MySeq: "NT14", 聖經: "帖撒羅尼迦後書", english: "2 Thessalonians", 章數: 3, Code: "2Thess." },
  { MySeq: "NT15", 聖經: "提摩太前書", english: "1 Timothy", 章數: 6, Code: "1Tim." },
  { MySeq: "NT16", 聖經: "提摩太後書", english: "2 Timothy", 章數: 4, Code: "2Tim." },
  { MySeq: "NT17", 聖經: "提多書", english: "Titus", 章數: 3, Code: "Titus." },
  { MySeq: "NT18", 聖經: "腓利門書", english: "Philemon", 章數: 1, Code: "Phlm" },
  { MySeq: "NT19", 聖經: "希伯來書", english: "Hebrews", 章數: 13, Code: "Heb." },
  { MySeq: "NT20", 聖經: "雅各書", english: "James", 章數: 5, Code: "Jas." },
  { MySeq: "NT21", 聖經: "彼得前書", english: "1 Peter", 章數: 5, Code: "1Pet." },
  { MySeq: "NT22", 聖經: "彼得後書", english: "2 Peter", 章數: 3, Code: "2Pet." },
  { MySeq: "NT23", 聖經: "約翰壹書", english: "1 John", 章數: 5, Code: "1John." },
  { MySeq: "NT24", 聖經: "約翰貳書", english: "2 John", 章數: 1, Code: "2John" },
  { MySeq: "NT25", 聖經: "約翰叄書", english: "3 John", 章數: 1, Code: "3John" },
  { MySeq: "NT26", 聖經: "猶大書", english: "Jude", 章數: 1, Code: "Jude" },
  { MySeq: "NT27", 聖經: "啟示錄", english: "Revelation", 章數: 22, Code: "Rev." }
];

export const BibleStudy: React.FC = () => {
  const { t, i18n } = useTranslation(['bibleStudy', 'theologyAssistant']);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState<BibleBook | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [studyMode, setStudyMode] = useState('basic');
  const [startVerse, setStartVerse] = useState<number>(1);
  const [endVerse, setEndVerse] = useState<number | null>(null);

  // Helper function to get book name based on current language
  const getBookName = (book: BibleBook) => {
    return i18n.language === 'en' ? book.english : book.聖經;
  };
  const [verseHistory, setVerseHistory] = useState<VerseHistory[]>([]);
  const [selectedModel, setSelectedModel] = useState('gemini-2.0-flash');
  const [aiSummary, setAiSummary] = useState<AISummary | null>(null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [browsingRecords, setBrowsingRecords] = useState<BrowsingRecord[]>([]);
  const [activeWindow, setActiveWindow] = useState<Window | null>(null);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [summaryWordCount, setSummaryWordCount] = useState<number>(300);
  const [showBrowsingPanel, setShowBrowsingPanel] = useState(false);

  // Follow-up questions state
  const [showTextualQuestion, setShowTextualQuestion] = useState(false);
  const [showTheologicalQuestion, setShowTheologicalQuestion] = useState(false);
  const [textualAnalysis, setTextualAnalysis] = useState<string | null>(null);
  const [theologicalAnalysis, setTheologicalAnalysis] = useState<string | null>(null);
  const [isAnalyzingTextual, setIsAnalyzingTextual] = useState(false);
  const [isAnalyzingTheological, setIsAnalyzingTheological] = useState(false);

  const filteredBooks = useMemo(() => {
    if (!searchTerm) return bibleData;

    const term = searchTerm.toLowerCase();
    return bibleData.filter(book =>
      book.聖經.toLowerCase().includes(term) ||
      book.english.toLowerCase().includes(term) ||
      book.Code.toLowerCase().includes(term) ||
      book.MySeq.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  const oldTestament = filteredBooks.filter(book => book.MySeq.startsWith('OT'));
  const newTestament = filteredBooks.filter(book => book.MySeq.startsWith('NT'));

  const handleBookClick = (book: BibleBook) => {
    setSelectedBook(book);
    setSelectedChapter(null);
  };

  const handleChapterClick = (chapter: number) => {
    setSelectedChapter(chapter);
    setStartVerse(1);
    setEndVerse(null);

    // Track verse history
    if (selectedBook) {
      const newHistory: VerseHistory = {
        book: selectedBook.聖經,
        chapter,
        mode: studyMode,
        timestamp: new Date().toISOString()
      };
      setVerseHistory(prev => [...prev, newHistory]);
    }
  };

  const generateSummary = async () => {
    if (verseHistory.length === 0) return;

    setIsGeneratingSummary(true);

    try {
      // Import the service dynamically
      const { sendChatMessage } = await import('../services/theologyAssistantService');

      // Create context from verse history
      const historyContext = verseHistory.map((h, idx) =>
        `${idx + 1}. ${h.book} ${h.chapter} (${h.mode} mode) - viewed at ${new Date(h.timestamp).toLocaleString()}`
      ).join('\n');

      const prompt = `Based on the following Bible verse comparison history, generate a thoughtful summary of the user's study journey. Analyze patterns, themes, and provide insights about what they might be exploring:

${historyContext}

Please provide:
1. Key themes or topics they're exploring
2. Patterns in their study approach (which modes they prefer, testament focus, etc.)
3. Suggested next steps or related passages to explore
4. Brief spiritual insights based on the passages they've studied

Keep the summary concise but meaningful (around 200-300 words).`;

      const response = await sendChatMessage({
        model: selectedModel,
        messages: [
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        topP: 0.9
      });

      const summary: AISummary = {
        content: response.content,
        timestamp: new Date().toISOString(),
        model: selectedModel
      };

      setAiSummary(summary);
    } catch (error) {
      console.error('Summary generation error:', error);
      alert('Failed to generate summary. Please check your API configuration.');
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  const clearHistory = () => {
    setVerseHistory([]);
    setAiSummary(null);
  };

  const openTrackedStepBible = (book: BibleBook, chapter: number, mode: string, verseStart?: number, verseEnd?: number | null) => {
    const url = generateStepBibleURL(book, chapter, mode, verseStart, verseEnd);
    const sessionId = `session_${Date.now()}`;

    // Build reference string with verse range
    let referenceText = `${getBookName(book)} ${chapter}`;
    if (verseStart && verseStart > 1) {
      if (verseEnd && verseEnd > verseStart) {
        referenceText = `${getBookName(book)} ${chapter}:${verseStart}-${verseEnd}`;
      } else {
        referenceText = `${getBookName(book)} ${chapter}:${verseStart}`;
      }
    } else if (verseEnd && verseEnd > 1) {
      referenceText = `${getBookName(book)} ${chapter}:1-${verseEnd}`;
    }

    // Create a new browsing record
    const newRecord: BrowsingRecord = {
      sessionId,
      startTime: new Date().toISOString(),
      sessions: [{
        url,
        timestamp: new Date().toISOString(),
        reference: referenceText
      }],
      book: getBookName(book),
      chapter,
      mode
    };

    setBrowsingRecords(prev => [...prev, newRecord]);
    setCurrentSessionId(sessionId);

    // Open in a new window with specific features
    const windowFeatures = 'width=1200,height=800,menubar=yes,toolbar=yes,location=yes,status=yes,scrollbars=yes,resizable=yes';
    const newWindow = window.open(url, sessionId, windowFeatures);

    if (newWindow) {
      setActiveWindow(newWindow);
      setShowBrowsingPanel(true);

      // Monitor window for URL changes (note: due to same-origin policy, we can only track if window is closed)
      const checkWindowInterval = setInterval(() => {
        if (newWindow.closed) {
          clearInterval(checkWindowInterval);
          setActiveWindow(null);
          // Finalize the browsing session
          setBrowsingRecords(prev =>
            prev.map(record =>
              record.sessionId === sessionId
                ? { ...record, endTime: new Date().toISOString() }
                : record
            )
          );
        }
      }, 1000);
    } else {
      alert(t('popupBlocked', 'Please allow popups for this site to use the browsing tracker feature.'));
    }
  };

  const generateBrowsingSummary = async () => {
    if (browsingRecords.length === 0) return;

    setIsGeneratingSummary(true);

    try {
      const { sendChatMessage } = await import('../services/theologyAssistantService');

      // Create context from browsing records
      const browsingContext = browsingRecords.map((record, idx) => {
        const duration = record.endTime
          ? `(${Math.round((new Date(record.endTime).getTime() - new Date(record.startTime).getTime()) / 1000 / 60)} minutes)`
          : '(still active)';

        return `
Session ${idx + 1} ${duration}:
- Started: ${new Date(record.startTime).toLocaleString()}
- Reference: ${record.book} ${record.chapter}
- Mode: ${record.mode}
- Pages visited: ${record.sessions.length}
${record.sessions.map((s, i) => `  ${i + 1}. ${s.reference} at ${new Date(s.timestamp).toLocaleTimeString()}`).join('\n')}`;
      }).join('\n\n');

      const prompt = `Based on the following Step Bible browsing history, generate a comprehensive summary of the user's Bible study journey. Analyze their exploration patterns, study focus, and provide meaningful insights:

${browsingContext}

Please provide a summary with approximately ${summaryWordCount} words covering:
1. Overview of the study session(s)
2. Key passages and themes explored
3. Study patterns and approach (which modes they used, how they navigated)
4. Theological insights or themes that emerge
5. Recommended next steps or related passages to explore

Keep the summary at around ${summaryWordCount} words and make it thoughtful and actionable.`;

      const response = await sendChatMessage({
        model: selectedModel,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        topP: 0.9
      });

      const summary: AISummary = {
        content: response.content,
        timestamp: new Date().toISOString(),
        model: selectedModel
      };

      setAiSummary(summary);
    } catch (error) {
      console.error('Browsing summary generation error:', error);
      alert('Failed to generate browsing summary. Please check your API configuration.');
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  const clearBrowsingRecords = () => {
    setBrowsingRecords([]);
    setAiSummary(null);
    setTextualAnalysis(null);
    setTheologicalAnalysis(null);
    setShowTextualQuestion(false);
    setShowTheologicalQuestion(false);
    if (activeWindow && !activeWindow.closed) {
      activeWindow.close();
    }
    setActiveWindow(null);
    setCurrentSessionId(null);
  };

  // AI Analysis for textual applicable meaning
  const analyzeTextualMeaning = async () => {
    if (!aiSummary || browsingRecords.length === 0) return;

    setIsAnalyzingTextual(true);

    try {
      const { sendChatMessage } = await import('../services/theologyAssistantService');

      // Create context from browsing records
      const browsingContext = browsingRecords.map((record, idx) => {
        return `Session ${idx + 1}:
- Reference: ${record.book} ${record.chapter}
- Mode: ${record.mode}
- Pages visited: ${record.sessions.map(s => s.reference).join(', ')}`;
      }).join('\n\n');

      const prompt = `Based on the following Bible browsing history and the initial summary, provide a deep textual analysis focusing on the APPLICABLE MEANING of the verses:

Browsing History:
${browsingContext}

Initial Summary:
${aiSummary.content}

Please analyze:
1. The literal and contextual meaning of the verses studied
2. How these verses apply to modern life and practical situations
3. Direct applications for daily Christian living
4. Actionable insights and practical wisdom from the texts
5. How to implement these teachings in real-world scenarios

Focus on practical, applicable insights rather than theological doctrine. Provide around ${summaryWordCount} words.`;

      const response = await sendChatMessage({
        model: selectedModel,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        topP: 0.9
      });

      setTextualAnalysis(response.content);
      setShowTextualQuestion(false);
    } catch (error) {
      console.error('Textual analysis error:', error);
      alert('Failed to generate textual analysis. Please check your API configuration.');
    } finally {
      setIsAnalyzingTextual(false);
    }
  };

  // AI Analysis for theological meaning in Christianity
  const analyzeTheologicalMeaning = async () => {
    if (!aiSummary || browsingRecords.length === 0) return;

    setIsAnalyzingTheological(true);

    try {
      const { sendChatMessage } = await import('../services/theologyAssistantService');

      // Create context from browsing records
      const browsingContext = browsingRecords.map((record, idx) => {
        return `Session ${idx + 1}:
- Reference: ${record.book} ${record.chapter}
- Mode: ${record.mode}
- Pages visited: ${record.sessions.map(s => s.reference).join(', ')}`;
      }).join('\n\n');

      const prompt = `Based on the following Bible browsing history and the initial summary, provide a deep theological analysis focusing on the THEOLOGICAL MEANING IN CHRISTIANITY:

Browsing History:
${browsingContext}

Initial Summary:
${aiSummary.content}

Please analyze:
1. The theological doctrines and principles present in these verses
2. How these passages relate to core Christian theology (Trinity, Salvation, Sanctification, etc.)
3. Historical Christian interpretations and church tradition perspectives
4. Systematic theology connections (Christology, Soteriology, Pneumatology, etc.)
5. How these verses contribute to understanding God's nature, plan, and revelation
6. Connections to the broader narrative of Scripture and redemptive history

Focus on theological depth, doctrinal significance, and Christian orthodoxy. Provide around ${summaryWordCount} words.`;

      const response = await sendChatMessage({
        model: selectedModel,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        topP: 0.9
      });

      setTheologicalAnalysis(response.content);
      setShowTheologicalQuestion(false);
    } catch (error) {
      console.error('Theological analysis error:', error);
      alert('Failed to generate theological analysis. Please check your API configuration.');
    } finally {
      setIsAnalyzingTheological(false);
    }
  };

  // Generate different types of STEPBible URLs based on study mode
  const generateStepBibleURL = (book: BibleBook, chapter: number, mode: string, verseStart?: number, verseEnd?: number | null) => {
    const codeWithoutDot = book.Code.replace('.', '');

    // Build reference with verse range if provided
    let reference = `${codeWithoutDot}.${chapter}`;
    if (verseStart && verseStart > 1) {
      if (verseEnd && verseEnd > verseStart) {
        reference = `${codeWithoutDot}.${chapter}.${verseStart}-${codeWithoutDot}.${chapter}.${verseEnd}`;
      } else {
        reference = `${codeWithoutDot}.${chapter}.${verseStart}`;
      }
    } else if (verseEnd && verseEnd > 1) {
      reference = `${codeWithoutDot}.${chapter}.1-${codeWithoutDot}.${chapter}.${verseEnd}`;
    }

    const baseURL = 'https://www.stepbible.org/?q=';

    switch(mode) {
      case 'basic':
        return `${baseURL}version=CUn|reference=${reference}`;
      case 'parallel':
        return `${baseURL}version=CUn|version=ESV|version=NIV|reference=${reference}`;
      case 'interlinear':
        return `${baseURL}version=CUn|version=OHGB|reference=${reference}&options=HNVUG`;
      case 'commentary':
        return `${baseURL}version=CUn|reference=${reference}&options=HNVUG&display=COMMENTARY`;
      case 'crossref':
        return `${baseURL}version=CUn|reference=${reference}&options=HNVUGCX`;
      case 'word-study':
        return `${baseURL}version=CUn|version=THGNT|reference=${reference}&options=HNVUGMLX`;
      case 'comparison':
        return `${baseURL}version=CUn|version=CUnT|version=CUV|reference=${reference}`;
      case 'multilang':
        return `${baseURL}version=CUn|version=ESV|version=KJV|version=LSG|reference=${reference}`;
      default:
        return `${baseURL}version=CUn|reference=${reference}`;
    }
  };

  const studyModes: StudyMode[] = [
    {
      id: 'basic',
      name: t('modes.basic'),
      nameEn: 'Basic Reading',
      icon: <BookOpen className="w-4 h-4" />,
      desc: t('modes.basicDesc')
    },
    {
      id: 'parallel',
      name: t('modes.parallel'),
      nameEn: 'Parallel Versions',
      icon: <BookMarked className="w-4 h-4" />,
      desc: t('modes.parallelDesc')
    },
    {
      id: 'interlinear',
      name: t('modes.interlinear'),
      nameEn: 'Interlinear',
      icon: <Languages className="w-4 h-4" />,
      desc: t('modes.interlinearDesc')
    },
    {
      id: 'word-study',
      name: t('modes.wordStudy'),
      nameEn: 'Word Study',
      icon: <Sparkles className="w-4 h-4" />,
      desc: t('modes.wordStudyDesc')
    },
    {
      id: 'commentary',
      name: t('modes.commentary'),
      nameEn: 'With Commentary',
      icon: <FileText className="w-4 h-4" />,
      desc: t('modes.commentaryDesc')
    },
    {
      id: 'crossref',
      name: t('modes.crossref'),
      nameEn: 'Cross References',
      icon: <Link2 className="w-4 h-4" />,
      desc: t('modes.crossrefDesc')
    },
    {
      id: 'comparison',
      name: t('modes.comparison'),
      nameEn: 'Chinese Comparison',
      icon: <Globe className="w-4 h-4" />,
      desc: t('modes.comparisonDesc')
    },
    {
      id: 'multilang',
      name: t('modes.multilang'),
      nameEn: 'Multilingual',
      icon: <Eye className="w-4 h-4" />,
      desc: t('modes.multilangDesc')
    }
  ];

  const availableModels = [
    { id: 'gemini-2.0-flash', name: 'Google Gemini 2.0 Flash' },
    { id: 'gpt-4o', name: 'OpenAI GPT-4o' },
    { id: 'gpt-4o-mini', name: 'OpenAI GPT-4o Mini' },
    { id: 'kimi-k2:1t', name: 'Kimi K2 1T Cloud' },
    { id: 'qwen3-coder:480b', name: 'Qwen3 Coder 480B Cloud' },
    { id: 'deepseek-v3.1:671b', name: 'DeepSeek V3.1 671B Cloud' }
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Credits Header */}
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold text-indigo-400">
          {t('creditsTitle', 'All credits and thanks to Step Bible')}
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          {t('creditsSubtitle', 'Powered by STEP Bible - Scripture Tools for Every Person')}
        </p>
      </div>

      {/* Browsing Tracker Panel - Moved to Top - Now Toggleable */}
      {showBrowsingPanel && (
        <div className="mb-6 bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Eye className="w-6 h-6 text-green-400" />
            {t('browsingTrackerTitle', 'Step Bible Browsing Tracker')}
          </h3>
          <div className="flex gap-2">
            {activeWindow && !activeWindow.closed && (
              <span className="flex items-center gap-2 px-3 py-1 bg-green-600 rounded-lg text-sm">
                <span className="animate-pulse w-2 h-2 bg-white rounded-full"></span>
                {t('windowActive', 'Window Active')}
              </span>
            )}
            <button
              onClick={clearBrowsingRecords}
              className="flex items-center gap-2 px-3 py-1 bg-red-600 hover:bg-red-700 rounded-lg text-sm transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              {t('clearBrowsing', 'Clear Browsing')}
            </button>
          </div>
        </div>

        {/* Word Count Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {t('summaryLength', 'Summary Length (words)')}
          </label>
          <div className="flex gap-2">
            {[150, 300, 500, 750, 1000].map((count) => (
              <button
                key={count}
                onClick={() => setSummaryWordCount(count)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  summaryWordCount === count
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {count}
              </button>
            ))}
          </div>
        </div>

        {/* Model Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {t('selectModel', 'Select AI Model')}
          </label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-green-500 text-white"
          >
            {availableModels.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
        </div>

        {/* Browsing Sessions List */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            {t('browsingSessions', 'Browsing Sessions')} ({browsingRecords.length})
          </h4>
          <div className="max-h-60 overflow-y-auto space-y-3">
            {browsingRecords.length === 0 ? (
              <p className="text-gray-500 text-sm italic">
                {t('noBrowsing', 'No browsing sessions yet. Click "Open in STEP Bible" to start a tracked session!')}
              </p>
            ) : (
              browsingRecords.map((record, idx) => {
                const duration = record.endTime
                  ? Math.round((new Date(record.endTime).getTime() - new Date(record.startTime).getTime()) / 1000 / 60)
                  : 'Active';

                return (
                  <div key={record.sessionId} className="p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-green-400">
                        {t('session', 'Session')} {idx + 1}
                      </span>
                      <span className="text-xs text-gray-400">
                        {typeof duration === 'number' ? `${duration} min` : duration}
                      </span>
                    </div>
                    <div className="text-sm text-gray-300 space-y-1">
                      <div>📖 {record.book} {record.chapter}</div>
                      <div>🔍 {record.mode} {t('mode', 'mode')}</div>
                      <div className="text-xs text-gray-400">
                        {new Date(record.startTime).toLocaleString()}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Generate Browsing Summary Button */}
        <button
          onClick={generateBrowsingSummary}
          disabled={browsingRecords.length === 0 || isGeneratingSummary}
          className="w-full mb-4 px-4 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
        >
          {isGeneratingSummary ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              {t('generatingBrowsing', 'Generating Browsing Summary...')}
            </>
          ) : (
            <>
              <Lightbulb className="w-5 h-5" />
              {t('generateBrowsingSummary', 'Generate Browsing Summary')} ({summaryWordCount} {t('words', 'words')})
            </>
          )}
        </button>

        {/* AI Summary Display */}
        {aiSummary && (
          <div className="space-y-4">
            <div className="bg-gray-900 rounded-lg p-4 border border-green-500">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-400">
                  {t('generatedBy', 'Generated by')}: {aiSummary.model}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(aiSummary.timestamp).toLocaleString()}
                </span>
              </div>
              <div className="prose prose-invert prose-sm max-w-none">
                <div className="text-gray-200 whitespace-pre-wrap leading-relaxed">
                  {aiSummary.content}
                </div>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(aiSummary.content);
                  alert(t('copied', 'Summary copied to clipboard!'));
                }}
                className="mt-3 flex items-center gap-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
              >
                <Save className="w-4 h-4" />
                {t('copyToClipboard', 'Copy to Clipboard')}
              </button>
            </div>

            {/* Follow-up Questions Section */}
            <div className="space-y-4 mt-6 pt-6 border-t-2 border-gray-700">
              {/* Question 1: Textual Applicable Meaning */}
              {!textualAnalysis && (
                <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 rounded-lg p-4 border-l-4 border-blue-500">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-gray-200 mb-3 leading-relaxed">
                        {t('textualQuestion', 'Do the browsing knowledge help you find the textual applicable meaning of the verses you look for? If not, would you like AI help to analyse the content you searched?')}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={analyzeTextualMeaning}
                          disabled={isAnalyzingTextual}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-semibold text-sm transition-colors flex items-center gap-2"
                        >
                          {isAnalyzingTextual ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              {t('analyzing', 'Analyzing...')}
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-4 h-4" />
                              {t('yesAnalyze', 'Yes, Analyze')}
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => setShowTextualQuestion(false)}
                          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold text-sm transition-colors"
                        >
                          {t('noThanks', 'No, Thanks')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Textual Analysis Result */}
              {textualAnalysis && (
                <div className="bg-gray-900 rounded-lg p-4 border border-blue-500">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-blue-400" />
                    <h4 className="font-bold text-blue-400">{t('textualAnalysisTitle', 'Textual Applicable Meaning Analysis')}</h4>
                  </div>
                  <div className="prose prose-invert prose-sm max-w-none">
                    <div className="text-gray-200 whitespace-pre-wrap leading-relaxed">
                      {textualAnalysis}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(textualAnalysis);
                      alert(t('copied', 'Analysis copied to clipboard!'));
                    }}
                    className="mt-3 flex items-center gap-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    {t('copyToClipboard', 'Copy to Clipboard')}
                  </button>
                </div>
              )}

              {/* Question 2: Theological Meaning */}
              {!theologicalAnalysis && (
                <div className="bg-gradient-to-r from-purple-900/30 to-purple-800/30 rounded-lg p-4 border-l-4 border-purple-500">
                  <div className="flex items-start gap-3">
                    <BookOpen className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-gray-200 mb-3 leading-relaxed">
                        {t('theologicalQuestion', 'Do the browsing knowledge in Christianity help you find the textual theological meaning in Christianity of the verses you look for? If not, would you like AI help to analyse the content you searched?')}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={analyzeTheologicalMeaning}
                          disabled={isAnalyzingTheological}
                          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-semibold text-sm transition-colors flex items-center gap-2"
                        >
                          {isAnalyzingTheological ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              {t('analyzing', 'Analyzing...')}
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-4 h-4" />
                              {t('yesAnalyze', 'Yes, Analyze')}
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => setShowTheologicalQuestion(false)}
                          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold text-sm transition-colors"
                        >
                          {t('noThanks', 'No, Thanks')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Theological Analysis Result */}
              {theologicalAnalysis && (
                <div className="bg-gray-900 rounded-lg p-4 border border-purple-500">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-5 h-5 text-purple-400" />
                    <h4 className="font-bold text-purple-400">{t('theologicalAnalysisTitle', 'Theological Meaning in Christianity Analysis')}</h4>
                  </div>
                  <div className="prose prose-invert prose-sm max-w-none">
                    <div className="text-gray-200 whitespace-pre-wrap leading-relaxed">
                      {theologicalAnalysis}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(theologicalAnalysis);
                      alert(t('copied', 'Analysis copied to clipboard!'));
                    }}
                    className="mt-3 flex items-center gap-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    {t('copyToClipboard', 'Copy to Clipboard')}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      )}

      {/* Toggle Button for Browsing Summary */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => setShowBrowsingPanel(!showBrowsingPanel)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            showBrowsingPanel
              ? 'bg-green-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          <Eye className="w-4 h-4" />
          {t('browsingSummaryButton', 'Summary of Browsing \'StepBible\'')} ({browsingRecords.length})
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-green-500 focus:outline-none text-white"
          />
        </div>
      </div>

      {/* Selected Book and Study Options */}
      {selectedBook && (
        <div className="mb-6 bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-green-400">{getBookName(selectedBook)}</h2>
              <p className="text-gray-400">{i18n.language === 'en' ? selectedBook.聖經 : selectedBook.english} • {selectedBook.Code}</p>
            </div>
            <button
              onClick={() => {
                setSelectedBook(null);
                setSelectedChapter(null);
              }}
              className="text-gray-400 hover:text-white text-2xl"
            >
              ✕
            </button>
          </div>

          {/* Study Mode Selection */}
          {selectedChapter && (
            <div className="mb-4 p-4 bg-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-4">
                📖 {selectedBook.聖經} {t('chapter')} {selectedChapter}
              </h3>

              <p className="text-sm text-gray-400 mb-3">{t('selectMode')}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {studyModes.map(mode => (
                  <button
                    key={mode.id}
                    onClick={() => setStudyMode(mode.id)}
                    className={`p-3 rounded-lg text-left transition-all ${
                      studyMode === mode.id
                        ? 'bg-green-600 text-white shadow-lg'
                        : 'bg-gray-600 hover:bg-gray-500 text-gray-200'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">{mode.icon}</div>
                      <div className="flex-1">
                        <div className="font-semibold">{mode.name}</div>
                        <div className={`text-xs ${studyMode === mode.id ? 'text-green-100' : 'text-gray-400'}`}>
                          {mode.nameEn}
                        </div>
                        <div className={`text-xs mt-1 ${studyMode === mode.id ? 'text-green-50' : 'text-gray-300'}`}>
                          {mode.desc}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Verse Range Selection - Disabled for Interlinear Study */}
              {studyMode !== 'interlinear' && (
                <div className="mb-4 p-3 bg-gray-600 rounded-lg">
                  <p className="text-sm font-medium text-gray-300 mb-2">
                    {t('verseRange', 'Verse Range (optional)')}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <label className="text-xs text-gray-400 mb-1 block">
                        {t('startVerse', 'Start Verse')}
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={startVerse}
                        onChange={(e) => setStartVerse(parseInt(e.target.value) || 1)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-500 rounded focus:outline-none focus:border-green-500 text-white"
                        placeholder="1"
                      />
                    </div>
                    <span className="text-gray-400 mt-5">—</span>
                    <div className="flex-1">
                      <label className="text-xs text-gray-400 mb-1 block">
                        {t('endVerse', 'End Verse')}
                      </label>
                      <input
                        type="number"
                        min={startVerse}
                        value={endVerse || ''}
                        onChange={(e) => setEndVerse(e.target.value ? parseInt(e.target.value) : null)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-500 rounded focus:outline-none focus:border-green-500 text-white"
                        placeholder={t('endVersePlaceholder', 'End of chapter')}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    {t('verseRangeHint', 'Leave empty for full chapter, or specify a verse range (e.g., 1-10)')}
                  </p>
                </div>
              )}

              <button
                onClick={() => openTrackedStepBible(selectedBook, selectedChapter, studyMode, startVerse, endVerse)}
                className="inline-flex items-center justify-center w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-500 transition-colors font-semibold"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                {t('openInStepBible')} ({studyModes.find(m => m.id === studyMode)?.name})
              </button>
            </div>
          )}

          {/* Chapter Selection */}
          <div className="border-t border-gray-600 pt-4">
            <p className="text-sm text-gray-400 mb-3">{t('selectChapter')} ({t('total')} {selectedBook.章數} {t('chapters')})</p>
            <div className="grid grid-cols-8 sm:grid-cols-10 gap-2 max-h-64 overflow-y-auto">
              {Array.from({ length: selectedBook.章數 }, (_, i) => i + 1).map(chapter => (
                <button
                  key={chapter}
                  onClick={() => handleChapterClick(chapter)}
                  className={`p-2 rounded text-center transition-all ${
                    selectedChapter === chapter
                      ? 'bg-green-600 text-white shadow-md'
                      : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                  }`}
                >
                  {chapter}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Books Grid */}
      <div className="grid md:grid-cols-2 gap-6 flex-1 overflow-hidden">
        {/* Old Testament */}
        <div className="bg-gray-800 rounded-lg p-6 flex flex-col">
          <div className="flex items-center mb-4">
            <Book className="w-6 h-6 text-amber-400 mr-2" />
            <h2 className="text-xl font-bold text-white">{t('oldTestament')}</h2>
          </div>
          <div className="space-y-2 overflow-y-auto flex-1">
            {oldTestament.map(book => (
              <button
                key={book.MySeq}
                onClick={() => handleBookClick(book)}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  selectedBook?.MySeq === book.MySeq
                    ? 'bg-green-600 border-2 border-green-400'
                    : 'bg-gray-700 hover:bg-gray-600 border-2 border-transparent'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-semibold text-white">{getBookName(book)}</span>
                    <span className="text-gray-400 text-sm ml-2">{i18n.language === 'en' ? book.聖經 : book.english}</span>
                  </div>
                  <span className="text-sm text-gray-400">{book.章數} {t('chapters')}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* New Testament */}
        <div className="bg-gray-800 rounded-lg p-6 flex flex-col">
          <div className="flex items-center mb-4">
            <Book className="w-6 h-6 text-blue-400 mr-2" />
            <h2 className="text-xl font-bold text-white">{t('newTestament')}</h2>
          </div>
          <div className="space-y-2 overflow-y-auto flex-1">
            {newTestament.map(book => (
              <button
                key={book.MySeq}
                onClick={() => handleBookClick(book)}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  selectedBook?.MySeq === book.MySeq
                    ? 'bg-green-600 border-2 border-green-400'
                    : 'bg-gray-700 hover:bg-gray-600 border-2 border-transparent'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-semibold text-white">{getBookName(book)}</span>
                    <span className="text-gray-400 text-sm ml-2">{i18n.language === 'en' ? book.聖經 : book.english}</span>
                  </div>
                  <span className="text-sm text-gray-400">{book.章數} {t('chapters')}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
