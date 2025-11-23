import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "title": "AI Assistant Bible Study Tool",
      "reference_selector_title": "Select a Bible Reference",
      "book": "Book",
      "chapter": "Chapter",
      "verse": "Verse",
      "old_testament": "Old Testament",
      "new_testament": "New Testament",
      "feature_selector_title": "Select an Analysis Feature",
      "summary": "Summary",
      "explanation": "Explanation",
      "cross_references": "Cross-references",
      "original_language": "Original Language",
      "historical_context": "Historical Context",
      "character_analysis": "Character Analysis",
      "theological_insights": "Theological Insights",
      "personal_application": "Personal Application",
      "analyze": "Analyze",
      "analyzing": "Analyzing...",
      "result_title": "Analysis Result",
      "sources": "Sources",
      "history_title": "History",
      "play_audio": "Play Audio",
      "stop_audio": "Stop Audio",
      "loading_audio": "Loading Audio..."
    }
  },
  es: {
    translation: {
      "title": "Herramienta de Estudio Bíblico con Asistente de IA",
      "reference_selector_title": "Seleccione una Referencia Bíblica",
      "book": "Libro",
      "chapter": "Capítulo",
      "verse": "Versículo",
      "old_testament": "Antiguo Testamento",
      "new_testament": "Nuevo Testamento",
      "feature_selector_title": "Seleccione una Función de Análisis",
      "summary": "Resumen",
      "explanation": "Explicación",
      "cross_references": "Referencias Cruzadas",
      "original_language": "Idioma Original",
      "historical_context": "Contexto Histórico",
      "character_analysis": "Análisis de Personajes",
      "theological_insights": "Perspectivas Teológicas",
      "personal_application": "Aplicación Personal",
      "analyze": "Analizar",
      "analyzing": "Analizando...",
      "result_title": "Resultado del Análisis",
      "sources": "Fuentes",
      "history_title": "Historial",
      "play_audio": "Reproducir Audio",
      "stop_audio": "Detener Audio",
      "loading_audio": "Cargando Audio..."
    }
  },
  "zh-TW": {
    translation: {
      "title": "AI 助理聖經學習工具",
      "reference_selector_title": "選擇聖經參考經文",
      "book": "書卷",
      "chapter": "章",
      "verse": "節",
      "old_testament": "舊約",
      "new_testament": "新約",
      "feature_selector_title": "選擇分析功能",
      "summary": "總結",
      "explanation": "解釋",
      "cross_references": "交叉引用",
      "original_language": "原文語言",
      "historical_context": "歷史背景",
      "character_analysis": "人物分析",
      "theological_insights": "神學見解",
      "personal_application": "個人應用",
      "analyze": "分析",
      "analyzing": "分析中...",
      "result_title": "分析結果",
      "sources": "來源",
      "history_title": "瀏覽紀錄",
      "play_audio": "播放音訊",
      "stop_audio": "停止音訊",
      "loading_audio": "正在載入音訊..."
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;