import React, { useState, useMemo } from 'react';
import { Search, Book, BookOpen } from 'lucide-react';

const bibleData = [
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

const BibleSearchApp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);

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

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setSelectedChapter(null);
  };

  const handleChapterClick = (chapter) => {
    setSelectedChapter(chapter);
  };

  const generateStepBibleLink = (book, chapter) => {
    const codeWithoutDot = book.Code.replace('.', '');
    return `https://www.stepbible.org/?q=version=CUn|reference=${codeWithoutDot}.${chapter}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-12 h-12 text-indigo-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">聖經搜尋</h1>
          </div>
          <p className="text-gray-600">Bible Search & Reference Tool</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="搜尋經卷名稱或代碼..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-indigo-200 focus:border-indigo-500 focus:outline-none shadow-sm"
            />
          </div>
        </div>

        {/* Selected Book and Chapter Display */}
        {selectedBook && (
          <div className="max-w-2xl mx-auto mb-8 bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-indigo-600">{selectedBook.聖經}</h2>
                <p className="text-gray-600">{selectedBook.Code} • {selectedBook.MySeq}</p>
              </div>
              <button
                onClick={() => {
                  setSelectedBook(null);
                  setSelectedChapter(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            {selectedChapter && (
              <div className="mb-4 p-4 bg-indigo-50 rounded-lg">
                <p className="text-lg font-semibold text-indigo-800 mb-2">
                  {selectedBook.聖經} 第 {selectedChapter} 章
                </p>
                <a
                  href={generateStepBibleLink(selectedBook, selectedChapter)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  在 Step Bible 中閱讀 →
                </a>
              </div>
            )}

            <div className="border-t pt-4">
              <p className="text-sm text-gray-600 mb-3">選擇章節 (共 {selectedBook.章數} 章):</p>
              <div className="grid grid-cols-8 gap-2">
                {Array.from({ length: selectedBook.章數 }, (_, i) => i + 1).map(chapter => (
                  <button
                    key={chapter}
                    onClick={() => handleChapterClick(chapter)}
                    className={`p-2 rounded text-center transition-colors ${
                      selectedChapter === chapter
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 hover:bg-indigo-100 text-gray-700'
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
        <div className="grid md:grid-cols-2 gap-8">
          {/* Old Testament */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Book className="w-6 h-6 text-amber-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-800">舊約 Old Testament</h2>
            </div>
            <div className="space-y-2">
              {oldTestament.map(book => (
                <button
                  key={book.MySeq}
                  onClick={() => handleBookClick(book)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedBook?.MySeq === book.MySeq
                      ? 'bg-indigo-100 border-2 border-indigo-500'
                      : 'hover:bg-gray-50 border-2 border-transparent'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-semibold text-gray-800">{book.聖經}</span>
                      <span className="text-gray-500 text-sm ml-2">{book.Code}</span>
                    </div>
                    <span className="text-sm text-gray-500">{book.章數} 章</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* New Testament */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Book className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-800">新約 New Testament</h2>
            </div>
            <div className="space-y-2">
              {newTestament.map(book => (
                <button
                  key={book.MySeq}
                  onClick={() => handleBookClick(book)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedBook?.MySeq === book.MySeq
                      ? 'bg-indigo-100 border-2 border-indigo-500'
                      : 'hover:bg-gray-50 border-2 border-transparent'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-semibold text-gray-800">{book.聖經}</span>
                      <span className="text-gray-500 text-sm ml-2">{book.Code}</span>
                    </div>
                    <span className="text-sm text-gray-500">{book.章數} 章</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-8 max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">統計資料 Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-amber-50 rounded-lg">
              <p className="text-2xl font-bold text-amber-600">{oldTestament.length}</p>
              <p className="text-sm text-gray-600">舊約書卷</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{newTestament.length}</p>
              <p className="text-sm text-gray-600">新約書卷</p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <p className="text-2xl font-bold text-indigo-600">{bibleData.length}</p>
              <p className="text-sm text-gray-600">總書卷</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">
                {bibleData.reduce((sum, book) => sum + book.章數, 0)}
              </p>
              <p className="text-sm text-gray-600">總章數</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BibleSearchApp;
