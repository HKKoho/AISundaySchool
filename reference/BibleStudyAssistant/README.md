# 聖經研讀工具 | Bible Study App

Advanced Bible Study Tool with STEP Bible Integration

## Features

- 🔍 **8 Study Modes**: From basic reading to advanced word studies
- 📚 **Multiple Versions**: Compare Chinese, English, and original languages
- 💡 **Word Study Tools**: Deep dive into Hebrew and Greek meanings
- 🔗 **Cross References**: Automatic links to related passages
- 📖 **66 Bible Books**: Complete Old and New Testament
- 🌐 **Multilingual Support**: Chinese and English interface

## Study Modes

1. **基本閱讀** - Basic reading with Chinese Union Version
2. **平行對照** - Parallel versions (Chinese/ESV/NIV)
3. **原文對照** - Interlinear with Hebrew/Greek
4. **詞彙研究** - Word study and analysis
5. **註釋研讀** - With commentaries
6. **交叉引用** - Cross-references highlighted
7. **中文對照** - Chinese version comparison
8. **多語對照** - Multilingual comparison

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **STEP Bible** - Bible study backend

## Deployment to Vercel

### Method 1: Using Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

### Method 2: GitHub Integration

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"

### Build Settings (Auto-detected by Vercel)

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Project Structure

```
bible-study-app/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles with Tailwind
├── public/              # Static assets
├── index.html           # HTML entry point
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
└── postcss.config.js    # PostCSS configuration
```

## Environment Variables

No environment variables required. The app uses STEP Bible's public URLs.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project integrates with STEP Bible, which is free for non-commercial use.

## Credits

- **STEP Bible** - Scripture Tools for Every Person
- **Tyndale House Cambridge** - Bible scholarship
- Data from STEPBible.org under CC BY 4.0

## Support

For issues or questions, please open an issue on GitHub.

---

Made with ❤️ for Bible study
