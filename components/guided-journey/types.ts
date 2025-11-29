export interface Coordinate {
  lat: number;
  lng: number;
}

export interface RouteStop {
  id: number;
  name: string;
  nameZh: string;
  description: string;
  descriptionZh: string;
  theology: string;
  theologyZh: string;
  coordinates: Coordinate;
  imagePrompt: string;
  imageUrl?: string;
}

export interface RouteData {
  title: string;
  titleZh: string;
  description: string;
  descriptionZh: string;
  stops: RouteStop[];
}

export interface QuizQuestion {
  question: string;
  questionZh: string;
  options: string[];
  optionsZh: string[];
  correctAnswerIndex: number;
  explanation: string;
  explanationZh: string;
}

export enum GameState {
  MENU,
  LOADING_ROUTE,
  PLAYING, // Viewing map/narrative
  QUIZ, // Answering a question to move forward
  FINISHED,
  ERROR
}

export const AVAILABLE_ROUTES = [
  {
    id: 'exodus',
    title: 'The Exodus',
    titleZh: '出埃及記',
    desc: 'Journey from slavery in Egypt to the Promised Land.',
    descZh: '從埃及的奴役到應許之地的旅程。',
    color: 'from-yellow-700 to-orange-500'
  },
  {
    id: 'david',
    title: 'David Fleeing Saul',
    titleZh: '大衛逃避掃羅',
    desc: 'The wilderness wanderings of the future King.',
    descZh: '未來君王的曠野漂流。',
    color: 'from-stone-600 to-stone-800'
  },
  {
    id: 'elijah',
    title: 'Route of Elijah',
    titleZh: '以利亞的路線',
    desc: 'From the showdown at Carmel to the whisper at Horeb.',
    descZh: '從迦密山的對決到何烈山的微聲。',
    color: 'from-sky-700 to-blue-900'
  },
  {
    id: 'jesus',
    title: 'Jesus in Galilee',
    titleZh: '耶穌在加利利',
    desc: 'The ministry path around the Sea of Galilee.',
    descZh: '加利利海周圍的服事之路。',
    color: 'from-emerald-600 to-teal-800'
  },
  {
    id: 'paul',
    title: 'Paul\'s 2nd Mission',
    titleZh: '保羅第二次宣教',
    desc: 'Spreading the Gospel across Europe and Asia Minor.',
    descZh: '在歐洲和小亞細亞傳播福音。',
    color: 'from-purple-700 to-indigo-900'
  },
  {
    id: 'paul_3rd',
    title: 'Paul\'s 3rd Mission',
    titleZh: '保羅第三次宣教',
    desc: 'Strengthening disciples in Galatia, Phrygia, and Ephesus.',
    descZh: '在加拉太、弗呂家和以弗所堅固門徒。',
    color: 'from-red-700 to-rose-900'
  }
];
