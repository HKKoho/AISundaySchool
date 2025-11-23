# AI Christian Sunday School Platform

**基督教 主日學 AI 工具平台** - An AI-powered educational platform for Christian Sunday School with three integrated learning tools.

## 🌟 Overview

This platform provides interactive tools for Christian education, combining AI technology with biblical content to create engaging learning experiences for students of all ages. The application features three main modules accessible from a unified landing page.

## 🎯 Main Features

### 🎮 聖經探索 - Bible Interactive Game
**Interactive Bible exploration through gamified learning**

- **Quest-Based Learning**: Travel through biblical history with 15+ interactive quests
- **Two Question Categories**:
  - 聖經背景 (Bible Background): Historical and cultural context
  - 聖經人物 (Biblical Persons): Character studies and narratives
- **Progressive System**: Unlock new locations as you complete quests
- **Educational Depth**:
  - Detailed explanations for each answer
  - Journal prompts for personal reflection
  - Deep dive content with scholarly sources
- **Character Encounters**: Meet biblical figures from Abraham to the Apostles
- **Customizable Settings**:
  - Multiple Bible versions (NIV, ESV, KJV)
  - Free choice mode or sequential progression
- **AI-Powered Questions**: Dynamic question generation using Google Gemini AI

### 📚 原文學習 - Biblical Language Learning
**Study Biblical Hebrew and Greek with AI-powered pronunciation feedback**

- **Dual Language Support**:
  - Biblical Hebrew (עברית מקראית)
  - Biblical Greek (Ελληνικά)
- **Multiple Learning Modes**:
  - Alphabet Learning: Master the letters and sounds
  - Word Practice: Build vocabulary with common biblical words
  - Verse Study: Read and practice complete Bible verses
  - Vocabulary Practice: Interactive flashcards
  - Listening Game: Audio comprehension exercises
  - Pronunciation Challenge: AI-evaluated speaking practice
  - Sentence Practice: Construct and practice biblical phrases
- **Pronunciation Feedback**: AI-powered analysis using Google Gemini
- **Audio Recording**: Practice pronunciation with real-time feedback
- **Bible Verse Integration**: Learn language through scripture
- **Progress Tracking**: Monitor learning across different modes

### 🔍 研經助手 - Bible Explore Assistant
**Comprehensive theological research and study platform**

- **Four Integrated Modes**:
  1. **Theology Chat (神學對話)**: AI-powered theological discussions
  2. **Reading Q&A (閱讀問答)**: Document analysis and comprehension
  3. **Assignment Assistant (作業助手)**: Academic writing support
  4. **Resource Search (資源搜尋)**: Theological literature database

- **AI Model Options**:
  - Google Gemini 2.5 Flash
  - Local LLM support via Ollama
  - Configurable temperature and top-p parameters

- **Document Support**: Upload and analyze PDF, DOCX, TXT, and MD files
- **Academic Levels**: Undergraduate, Graduate, Doctoral, and General
- **Assignment Workflow**:
  - Topic planning
  - Draft generation
  - AI critique and feedback
  - Iterative revision support
- **Context-Aware**: Maintains conversation history for coherent discussions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Google Gemini API key (required for full functionality)
- (Optional) Local Ollama installation for local LLM support

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AISundaySchool
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the project root:

   ```bash
   # Google Gemini API Key (Required)
   # Used for: Bible Game questions, Language pronunciation feedback, and Theology Assistant
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

   **Getting Your Gemini API Key:**
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy and paste into `.env.local`

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:3000` (or the port shown in terminal)
   - You'll see the landing page with three feature options

### Production Build

```bash
npm run build
npm run preview
```

## 🏗️ Technical Architecture

### Frontend Framework
- **React 19** with TypeScript
- **Vite 6** for fast development and building
- **Tailwind CSS** with Typography plugin for responsive styling
- **Lucide React** for icons
- **D3.js** for data visualizations

### State Management
- React hooks and Context API
- `GameContext` for Bible Game state
- Component-level state for other features
- Local storage for data persistence
- No external state management library

### AI Integration
- **Google Gemini 2.5 Flash**: Primary AI engine
  - Bible question generation
  - Language pronunciation feedback
  - Theological discussions
  - Document analysis
- **Imagen 4.0**: Image generation (if needed)
- **Ollama Support**: Local LLM integration for theology assistant

### Application State Flow
```typescript
// Main app navigation
enum AppState {
  LANDING = 'LANDING',
  BIBLE = 'BIBLE',
  THEOLOGY_SEARCH = 'THEOLOGY_SEARCH',
  BIBLICAL_LANGUAGE = 'BIBLICAL_LANGUAGE',
}

// Bible game quest structure
interface Quest {
  id: string;
  character: string;
  characterImage: string;
  category: QuestionCategory; // Bible Background | Person in Bible
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  journalPrompt: { title: string; content: string };
  deepDive: {
    title: string;
    content: string;
    sources: { text: string; url: string }[];
  };
}

// Theology assistant modes
enum TheologyAssistantMode {
  THEOLOGY_CHAT = 'Theology Chat',
  READING_QA = 'Reading Q&A',
  ASSIGNMENT_ASSISTANT = 'Assignment Assistant',
  RESOURCE_SEARCH = 'Resource Search'
}
```

## 📁 Project Structure

```
AISundaySchool/
├── components/              # Main React components
│   ├── bible/              # Bible game specific components
│   │   ├── QuestionGenerator.tsx
│   │   └── ... (Bible game UI components)
│   ├── language/           # Language learning components
│   │   ├── VocabularyPractice.tsx
│   │   ├── ListeningGame.tsx
│   │   ├── PronunciationChallenge.tsx
│   │   └── SentencePractice.tsx
│   ├── BibleGame.tsx       # Main Bible game container
│   ├── BiblicalLanguage.tsx # Language learning container
│   ├── TheologyAssistant.tsx # Theology assistant container
│   └── LandingPage.tsx     # Main landing page
│
├── language/               # Language learning module
│   ├── components/         # Language-specific components
│   │   ├── AlphabetLearning.tsx
│   │   ├── LanguageSelector.tsx
│   │   ├── RecordButton.tsx
│   │   ├── VerseDisplay.tsx
│   │   ├── VerseSelector.tsx
│   │   └── WordCard.tsx
│   ├── services/
│   │   └── geminiService.ts  # Pronunciation feedback
│   ├── types.ts            # Language types
│   ├── constants.ts        # Word lists and data
│   └── App.tsx             # Language app entry
│
├── data/
│   └── gameData.ts         # Bible quests and locations
│
├── services/
│   └── bibleQuestionGenerator.ts  # AI question generation
│
├── contexts/               # React contexts
│   └── GameContext.tsx     # Bible game state management
│
├── types.ts               # Global TypeScript definitions
├── App.tsx               # Main application router
└── index.tsx            # Application entry point
```

## 🎯 How Each Feature Works

### 🎮 Bible Interactive Game Workflow
1. **Location Selection**: Choose from unlocked biblical locations on the map
2. **Quest Introduction**: Meet a biblical character and receive context
3. **Question Challenge**: Answer multiple-choice questions about biblical content
4. **Instant Feedback**: Get detailed explanations for correct and incorrect answers
5. **Deep Dive**: Explore scholarly sources and additional context
6. **Journal Reflection**: Record personal insights and spiritual reflections
7. **Progress Unlocking**: Complete quests to unlock new locations

**Question Generation**: Uses Google Gemini AI to dynamically generate questions based on:
- Character background
- Biblical events and context
- Historical and cultural settings
- Theological significance

### 📚 Biblical Language Learning Workflow
1. **Language Selection**: Choose Hebrew or Greek
2. **Mode Selection**: Pick a learning mode based on skill level
3. **Interactive Practice**:
   - View/hear content (alphabet, words, verses)
   - Record your pronunciation
   - Receive AI feedback via Gemini
4. **Progress Through Modes**: Build from alphabet → words → verses → sentences

**Pronunciation Feedback**:
- Records audio using browser MediaRecorder API
- Converts to base64 and sends to Gemini AI
- Receives detailed pronunciation analysis and tips

### 🔍 Bible Explore Assistant Workflow

**Theology Chat Mode:**
1. Select AI model and configure parameters
2. Ask theological questions
3. Receive context-aware responses
4. Continue conversation with maintained history

**Reading Q&A Mode:**
1. Upload document (PDF, DOCX, TXT, MD)
2. AI analyzes and summarizes content
3. Ask questions about the document
4. Get answers based on document context

**Assignment Assistant Mode:**
1. **Input Stage**: Define topic, theology area, academic level, length, tone
2. **Planning Stage**: AI generates outline and structure
3. **Drafting Stage**: AI creates first draft
4. **Critiquing Stage**: AI analyzes draft and provides feedback
5. **Revising Stage**: Iteratively improve based on AI suggestions
6. **Export**: Save final version

**Resource Search Mode:**
- Search theological literature databases
- Access scholarly articles and references
- Find relevant resources for research

## 🛠️ Configuration

### Environment Variables

The application uses a `.env.local` file for configuration:

```bash
# Required: Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here
```

### Optional: Local LLM Support

For the Theology Assistant, you can optionally use local LLM models via Ollama:

**Setup Steps:**
1. Install [Ollama](https://ollama.com)
2. Pull desired models:
   ```bash
   ollama pull llama3.3:latest
   ollama pull deepseek-r1:32b
   # etc.
   ```
3. Ollama runs locally at `http://localhost:11434` by default
4. Select local models in the Theology Assistant interface

**Supported Model Categories:**
- **General**: llama3.3, mistral, qwen2.5
- **Reasoning**: deepseek-r1, qwq
- **Chinese-English**: qwen2.5v1
- **Vision**: llava (supports images)

### Bible Game Settings

Configurable within the app:
- **Bible Version**: NIV, ESV, or KJV
- **Play Mode**: Sequential (locked progression) or Free Choice (unlock all)
- **Question Category Filter**: Bible Background, Person in Bible, or All

### Language Learning Settings

Available in-app:
- **Target Language**: Hebrew or Greek
- **Learning Mode**: 7 different modes for different skill levels
- **Pronunciation Sensitivity**: Adjustable feedback detail

## 🔧 Development

### Development Commands
```bash
npm run dev       # Start development server (default port 3000)
npm run build     # Build for production
npm run preview   # Preview production build
```

### Code Architecture

**Component Organization:**
- Each feature is self-contained in its own component
- Shared components in `/components`
- Feature-specific components in subdirectories
- Language learning has its own module structure in `/language`

**State Management:**
- `GameContext` for Bible Game (quest completion, unlocks, journal)
- Component-level state for other features
- Local storage for persistence

**Styling:**
- Tailwind CSS with dark theme
- Gradient backgrounds for feature cards
- Responsive design for mobile/tablet/desktop

### Adding New Content

**New Bible Quest:**
1. Edit `data/gameData.ts`
2. Add quest to `allQuests` array
3. Add location to `allBibleLocations`
4. Add to appropriate level in `allLevels`
5. Test unlock dependencies

**New Language Vocabulary:**
1. Edit `language/constants.ts`
2. Add words to `WORD_LISTS.hebrew` or `WORD_LISTS.greek`
3. Follow existing structure: `{ word, transliteration, meaning }`

**New Bible Verses for Language:**
1. Edit `language/bibleVerses.ts`
2. Add verse with original text, transliteration, and translation
3. Include scripture reference

## 📖 Educational Content

### Bible Game Coverage
The game covers major biblical narratives and characters:
- **Old Testament**: Abraham, Moses, Joshua, Judges period, David, Solomon, Prophets
- **New Testament**: John the Baptist, Jesus' ministry, Apostles, Early Church
- **Categories**: Bible Background questions and Person in Bible questions
- **Learning Elements**: Scripture references, historical context, theological significance

### Language Learning Content
**Hebrew Vocabulary:**
- Basic alphabet (Aleph to Tav)
- Common biblical words
- Key verses from Torah and Prophets

**Greek Vocabulary:**
- Greek alphabet (Alpha to Omega)
- New Testament vocabulary
- Key verses from Gospels and Epistles

### Theology Assistant Resources
- Supports theological discussions across multiple traditions
- Document analysis for biblical and theological texts
- Academic writing assistance for seminary and Bible college students
- Resource database for theological research

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/new-feature`
3. **Make your changes**:
   - Add new Bible quests or questions
   - Expand language vocabulary
   - Improve AI prompts
   - Fix bugs or UI issues
4. **Test thoroughly** with all three features
5. **Commit**: `git commit -m 'Add new feature'`
6. **Push**: `git push origin feature/new-feature`
7. **Open a Pull Request**

### Contribution Guidelines
- Follow TypeScript best practices
- Maintain existing code style and patterns
- Test with actual Gemini API (not just mock data)
- Ensure biblical content is theologically sound and accurate
- Include both English and Chinese translations for UI elements
- Add comments for complex logic

### Areas for Contribution
- **Bible Game**: More quests, characters, and locations
- **Language Learning**: Additional vocabulary, verses, and practice modes
- **Theology Assistant**: Better prompts, more model support
- **UI/UX**: Accessibility improvements, mobile optimization
- **Documentation**: Tutorials, examples, translations

## 📜 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **Google Gemini AI** for powering the AI features
- **Ollama** for local LLM support
- **React & Vite** for the excellent development experience
- **Tailwind CSS** for beautiful, responsive styling
- **Biblical Scholars** whose research informs our content
- **Sunday School Teachers** who inspire Christian education

## 📞 Support & Feedback

- **Issues**: Report bugs or request features via GitHub Issues
- **Questions**: Check inline code documentation
- **Discussions**: Share ideas for new features or improvements

---

**Built for the Christian community**

*"Train up a child in the way he should go; even when he is old he will not depart from it." - Proverbs 22:6*

*"These commandments that I give you today are to be on your hearts. Impress them on your children. Talk about them when you sit at home and when you walk along the road, when you lie down and when you get up." - Deuteronomy 6:6-7*
