import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Book, BookOpen, Globe, Languages, BookMarked, FileText, Link2, Eye, Sparkles } from 'lucide-react';

interface BibleBook {
  MySeq: string;
  聖經: string;
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

const bibleData: BibleBook[] = [
  { MySeq: "OT01", 聖經: "創世記", 章數: 50, Code: "Gen." },
  { MySeq: "OT02", 聖經: "出埃及記", 章數: 40, Code: "Exod." },
  { MySeq: "OT03", 聖經: "利未記", 章數: 27, Code: "Lev." },
  { MySeq: "OT04", 聖經: "民數記", 章數: 36, Code: "Num." },
  { MySeq: "OT05", 聖經: "申命記", 章數: 34, Code: "Deut." },
  { MySeq: "OT06", 聖經: "約書亞記", 章數: 24, Code: "Josh." },
  { MySeq: "OT07", 聖經: "士師記", 章數: 21, Code: "Judg." },
  { MySeq: "OT08", 聖經: "路得記", 章數: 4, Code: "Ruth." },
  { MySeq: "OT09", 聖經: "撒母耳記上", 章數: 31, Code: "1Sam." },
  { MySeq: "OT10", 聖經: "撒母耳記下", 章數: 24, Code: "2Sam." },
  { MySeq: "OT11", 聖經: "列王記上", 章數: 22, Code: "1Kgs." },
  { MySeq: "OT12", 聖經: "列王記下", 章數: 25, Code: "2Kgs." },
  { MySeq: "OT13", 聖經: "歷代志上", 章數: 29, Code: "1Chr." },
  { MySeq: "OT14", 聖經: "歷代志下", 章數: 36, Code: "2Chr." },
  { MySeq: "OT15", 聖經: "以斯拉記", 章數: 10, Code: "Ezra." },
  { MySeq: "OT16", 聖經: "尼希米記", 章數: 13, Code: "Neh." },
  { MySeq: "OT17", 聖經: "以斯帖記", 章數: 10, Code: "Esth." },
  { MySeq: "OT18", 聖經: "約伯記", 章數: 42, Code: "Job." },
  { MySeq: "OT19", 聖經: "詩篇", 章數: 150, Code: "Ps." },
  { MySeq: "OT20", 聖經: "箴言", 章數: 31, Code: "Prov." },
  { MySeq: "OT21", 聖經: "傳道書", 章數: 12, Code: "Eccl." },
  { MySeq: "OT22", 聖經: "雅歌", 章數: 8, Code: "Song." },
  { MySeq: "OT23", 聖經: "以賽亞書", 章數: 66, Code: "Isa." },
  { MySeq: "OT24", 聖經: "耶利米書", 章數: 52, Code: "Jer." },
  { MySeq: "OT25", 聖經: "耶利米哀歌", 章數: 5, Code: "Lam." },
  { MySeq: "OT26", 聖經: "以西結書", 章數: 48, Code: "Ezek." },
  { MySeq: "OT27", 聖經: "但以理書", 章數: 12, Code: "Dan." },
  { MySeq: "OT28", 聖經: "何西阿書", 章數: 14, Code: "Hos." },
  { MySeq: "OT29", 聖經: "約珥書", 章數: 3, Code: "Joel." },
  { MySeq: "OT30", 聖經: "阿摩司書", 章數: 9, Code: "Amos." },
  { MySeq: "OT31", 聖經: "俄巴底亞書", 章數: 1, Code: "Obad" },
  { MySeq: "OT32", 聖經: "約拿書", 章數: 4, Code: "Jonah." },
  { MySeq: "OT33", 聖經: "彌迦書", 章數: 7, Code: "Mic." },
  { MySeq: "OT34", 聖經: "那鴻書", 章數: 3, Code: "Nah." },
  { MySeq: "OT35", 聖經: "哈巴谷書", 章數: 3, Code: "Hab." },
  { MySeq: "OT36", 聖經: "西番雅書", 章數: 3, Code: "Zeph." },
  { MySeq: "OT37", 聖經: "哈該書", 章數: 2, Code: "Hag." },
  { MySeq: "OT38", 聖經: "撒迦利亞書", 章數: 14, Code: "Zech." },
  { MySeq: "OT39", 聖經: "瑪拉基書", 章數: 4, Code: "Mal." },
  { MySeq: "NT01", 聖經: "馬太福音", 章數: 28, Code: "Matt." },
  { MySeq: "NT02", 聖經: "馬可福音", 章數: 16, Code: "Mark." },
  { MySeq: "NT03", 聖經: "路加福音", 章數: 24, Code: "Luke." },
  { MySeq: "NT04", 聖經: "約翰福音", 章數: 21, Code: "John." },
  { MySeq: "NT05", 聖經: "使徒行傳", 章數: 28, Code: "Acts." },
  { MySeq: "NT06", 聖經: "羅馬書", 章數: 16, Code: "Rom." },
  { MySeq: "NT07", 聖經: "哥林多前書", 章數: 16, Code: "1Cor." },
  { MySeq: "NT08", 聖經: "哥林多後書", 章數: 13, Code: "2Cor." },
  { MySeq: "NT09", 聖經: "加拉太書", 章數: 6, Code: "Gal." },
  { MySeq: "NT10", 聖經: "以弗所書", 章數: 6, Code: "Eph." },
  { MySeq: "NT11", 聖經: "腓立比書", 章數: 4, Code: "Phil." },
  { MySeq: "NT12", 聖經: "歌羅西書", 章數: 4, Code: "Col." },
  { MySeq: "NT13", 聖經: "帖撒羅尼迦前書", 章數: 5, Code: "1Thess." },
  { MySeq: "NT14", 聖經: "帖撒羅尼迦後書", 章數: 3, Code: "2Thess." },
  { MySeq: "NT15", 聖經: "提摩太前書", 章數: 6, Code: "1Tim." },
  { MySeq: "NT16", 聖經: "提摩太後書", 章數: 4, Code: "2Tim." },
  { MySeq: "NT17", 聖經: "提多書", 章數: 3, Code: "Titus." },
  { MySeq: "NT18", 聖經: "腓利門書", 章數: 1, Code: "Phlm" },
  { MySeq: "NT19", 聖經: "希伯來書", 章數: 13, Code: "Heb." },
  { MySeq: "NT20", 聖經: "雅各書", 章數: 5, Code: "Jas." },
  { MySeq: "NT21", 聖經: "彼得前書", 章數: 5, Code: "1Pet." },
  { MySeq: "NT22", 聖經: "彼得後書", 章數: 3, Code: "2Pet." },
  { MySeq: "NT23", 聖經: "約翰壹書", 章數: 5, Code: "1John." },
  { MySeq: "NT24", 聖經: "約翰貳書", 章數: 1, Code: "2John" },
  { MySeq: "NT25", 聖經: "約翰叄書", 章數: 1, Code: "3John" },
  { MySeq: "NT26", 聖經: "猶大書", 章數: 1, Code: "Jude" },
  { MySeq: "NT27", 聖經: "啟示錄", 章數: 22, Code: "Rev." }
];

export const BibleStudy: React.FC = () => {
  const { t } = useTranslation('theologyAssistant');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState<BibleBook | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [studyMode, setStudyMode] = useState('basic');

  const filteredBooks = useMemo(() => {
    if (!searchTerm) return bibleData;

    const term = searchTerm.toLowerCase();
    return bibleData.filter(book =>
      book.聖經.toLowerCase().includes(term) ||
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
  };

  // Generate different types of STEPBible URLs based on study mode
  const generateStepBibleURL = (book: BibleBook, chapter: number, mode: string) => {
    const codeWithoutDot = book.Code.replace('.', '');
    const reference = `${codeWithoutDot}.${chapter}`;

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
      name: t('bibleStudy.modes.basic'),
      nameEn: 'Basic Reading',
      icon: <BookOpen className="w-4 h-4" />,
      desc: t('bibleStudy.modes.basicDesc')
    },
    {
      id: 'parallel',
      name: t('bibleStudy.modes.parallel'),
      nameEn: 'Parallel Versions',
      icon: <BookMarked className="w-4 h-4" />,
      desc: t('bibleStudy.modes.parallelDesc')
    },
    {
      id: 'interlinear',
      name: t('bibleStudy.modes.interlinear'),
      nameEn: 'Interlinear',
      icon: <Languages className="w-4 h-4" />,
      desc: t('bibleStudy.modes.interlinearDesc')
    },
    {
      id: 'word-study',
      name: t('bibleStudy.modes.wordStudy'),
      nameEn: 'Word Study',
      icon: <Sparkles className="w-4 h-4" />,
      desc: t('bibleStudy.modes.wordStudyDesc')
    },
    {
      id: 'commentary',
      name: t('bibleStudy.modes.commentary'),
      nameEn: 'With Commentary',
      icon: <FileText className="w-4 h-4" />,
      desc: t('bibleStudy.modes.commentaryDesc')
    },
    {
      id: 'crossref',
      name: t('bibleStudy.modes.crossref'),
      nameEn: 'Cross References',
      icon: <Link2 className="w-4 h-4" />,
      desc: t('bibleStudy.modes.crossrefDesc')
    },
    {
      id: 'comparison',
      name: t('bibleStudy.modes.comparison'),
      nameEn: 'Chinese Comparison',
      icon: <Globe className="w-4 h-4" />,
      desc: t('bibleStudy.modes.comparisonDesc')
    },
    {
      id: 'multilang',
      name: t('bibleStudy.modes.multilang'),
      nameEn: 'Multilingual',
      icon: <Eye className="w-4 h-4" />,
      desc: t('bibleStudy.modes.multilangDesc')
    }
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={t('bibleStudy.searchPlaceholder')}
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
              <h2 className="text-2xl font-bold text-green-400">{selectedBook.聖經}</h2>
              <p className="text-gray-400">{selectedBook.Code} • {selectedBook.MySeq}</p>
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
                📖 {selectedBook.聖經} {t('bibleStudy.chapter')} {selectedChapter}
              </h3>

              <p className="text-sm text-gray-400 mb-3">{t('bibleStudy.selectMode')}</p>
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

              <a
                href={generateStepBibleURL(selectedBook, selectedChapter, studyMode)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-500 transition-colors font-semibold"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                {t('bibleStudy.openInStepBible')} ({studyModes.find(m => m.id === studyMode)?.name})
              </a>
            </div>
          )}

          {/* Chapter Selection */}
          <div className="border-t border-gray-600 pt-4">
            <p className="text-sm text-gray-400 mb-3">{t('bibleStudy.selectChapter')} ({t('bibleStudy.total')} {selectedBook.章數} {t('bibleStudy.chapters')})</p>
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
            <h2 className="text-xl font-bold text-white">{t('bibleStudy.oldTestament')}</h2>
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
                    <span className="font-semibold text-white">{book.聖經}</span>
                    <span className="text-gray-400 text-sm ml-2">{book.Code}</span>
                  </div>
                  <span className="text-sm text-gray-400">{book.章數} {t('bibleStudy.chapters')}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* New Testament */}
        <div className="bg-gray-800 rounded-lg p-6 flex flex-col">
          <div className="flex items-center mb-4">
            <Book className="w-6 h-6 text-blue-400 mr-2" />
            <h2 className="text-xl font-bold text-white">{t('bibleStudy.newTestament')}</h2>
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
                    <span className="font-semibold text-white">{book.聖經}</span>
                    <span className="text-gray-400 text-sm ml-2">{book.Code}</span>
                  </div>
                  <span className="text-sm text-gray-400">{book.章數} {t('bibleStudy.chapters')}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
