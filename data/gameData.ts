import type { BibleLocation, Quest, Level } from '../types';
import { QuestionCategory } from '../types';

export const quests: Quest[] = [
  {
    id: 'q1',
    character: '亞伯拉罕',
    characterImage: 'https://picsum.photos/seed/abraham/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '上帝與我立約，並以一個特定的記號為標誌。這個約主要是關於什麼？',
    options: [
      '一個新船的承諾。',
      '建造金字塔的合約。',
      '土地、後裔和祝福的承諾。',
      '只吃蔬菜的法令。',
    ],
    correctAnswerIndex: 2,
    explanation: '亞伯拉罕之約（創世記 12, 15, 17章）是上帝一個基礎性的應許。這個約的記號是割禮，一個象徵分別為聖的身體標記。這個「分別為聖」的主題是洗禮概念的前身。',
    journalPrompt: {
      title: '亞伯拉罕之約',
      content: '約是神聖的承諾。上帝應許亞伯拉罕土地、無數的後裔，並且萬國都將因他得福。這為上帝與人類持續的關係奠定了基礎。'
    },
    deepDive: {
      title: '聖約神學',
      content: '在希伯來文中，約是 "berit"。它不僅僅是一份合約；它是一個將兩方連結在一起的莊嚴誓言。古代的約通常包含一個儀式或記號，就像割禮一樣。這種具有約束力的關係性承諾的概念，對於理解後來的聖經主題，包括耶穌所立的新約，至關重要。',
      sources: [
        { text: '創世記 17:1-14 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Genesis+17&version=NIV' },
        { text: '早期教父論聖約', url: '#' },
      ]
    }
  },
  {
    id: 'q2',
    character: '摩西',
    characterImage: 'https://picsum.photos/seed/moses/100',
    category: QuestionCategory.BIBLE_BACKGROUND,
    question: '在西奈山，我為以色列領受了律法，其中包含許多涉及血的潔淨禮儀。這些禮儀的主要目的是什麼？',
    options: [
      '潔淨禮儀上的不潔，以恢復親近上帝的機會。',
      '為年度游泳比賽做準備。',
      '在沙漠的炎熱中降溫。',
      '在節期前洗衣服。',
    ],
    correctAnswerIndex: 0,
    explanation: '利未記的律法（利未記 11-15章）規定用水洗滌或獻祭血的潔淨禮儀，以潔淨個人的禮儀不潔（例如，接觸屍體或患有皮膚病後）。這不是關於身體的骯髒，而是關於處於聖潔的狀態，以便親近聖潔的上帝。水和血成為了屬靈潔淨的有力象徵。',
     journalPrompt: {
      title: '以水潔淨',
      content: '賜給摩西的律法教導說，上帝是聖潔的，人們需要被潔淨才能親近祂。水是這種禮儀潔淨的主要方式，象徵著從不潔狀態到潔淨狀態的轉變。'
    },
    deepDive: {
      title: '禮儀潔淨與道德潔淨',
      content: '區分禮儀上的不潔與罪是很重要的。一個人可能在沒有犯罪的情況下變得禮儀上不潔。這些律法教導以色列一個深刻的功課：親近上帝需要聖潔。後來的先知會強調，內心真正的潔淨比外在的儀式更重要，這是施洗約翰和耶穌將會進一步發展的主題。',
      sources: [
        { text: '利未記 15:31 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Leviticus+15:31&version=ESV' },
        { text: '希伯來書 9:13-14 (KJV)', url: 'https://www.biblegateway.com/passage/?search=Hebrews+9:13-14&version=KJV' },
      ]
    }
  },
  {
    id: 'q5',
    character: '以西結',
    characterImage: 'https://picsum.photos/seed/ezekiel/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '在流亡巴比倫期間，我傳達了上帝的一個應許，要賜給祂的子民一顆「新心」和一個「新靈」。這個應許主要意味著什麼？',
    options: [
      '對新音樂風格的欣賞。',
      '一種內在的、屬靈的轉變，使人能夠順服上帝。',
      '身體上的心臟移植。',
      '學習新語言的能力。',
    ],
    correctAnswerIndex: 1,
    explanation: '以西結書 36:25-27 是一個關鍵的舊約段落，預言了上帝將要進行的內在潔淨和更新工作。上帝應許要用清水潔淨祂的子民，除去他們的「石心」（硬心），並賜給他們一顆「肉心」（軟心），將祂的靈放在他們裡面。這直接預示了基督教洗禮中所象徵的重生和聖靈的內住。',
    journalPrompt: {
      title: '新心的應許',
      content: '先知以西結預言了一個超越外在儀式的新約。上帝應許要從內心深處改變祂的子民，潔淨他們，並賜給他們祂的靈，使他們能夠遵行祂的道。',
    },
    deepDive: {
      title: '舊約中的重生',
      content: '雖然「重生」一詞是新約的概念，但其根源深植於舊約的應許中。像以西結書 36 章和耶利米書 31:31-34（關於刻在心版上的新約）這樣的段落，都指向了上帝有一天會對人心進行根本性的工作。這不再僅僅是遵守外在的律法，而是擁有一顆被改變的、渴望順服上帝的心。基督教的洗禮正是這個應許實現的標誌。',
      sources: [
        { text: '以西結書 36:25-27 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Ezekiel+36:25-27&version=NIV' },
        { text: '耶利米書 31:31-34 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Jeremiah+31:31-34&version=ESV' },
      ],
    },
  },
  {
    id: 'q3',
    character: '施洗約翰',
    characterImage: 'https://picsum.photos/seed/john/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '我在約旦河為人們施洗。我的洗禮是...',
    options: [
      '加入當地的釣魚俱樂部。',
      '加入羅馬軍隊的入會儀式。',
      '一個沒有意義的文化傳統。',,
      '悔改的洗，使罪得赦。'
    ],
    correctAnswerIndex: 3,
    explanation: '約翰的洗禮是一個強有力的公開宣告。人們承認自己的罪，並歸向神，為即將到來的彌賽亞做準備。它將舊約中水的潔淨主題與個人悔改的迫切呼籲聯繫起來。',
     journalPrompt: {
      title: '悔改的洗禮',
      content: '施洗約翰是舊約與新約之間的橋樑。他在約旦河的洗禮象徵著遠離罪惡，並為迎接彌賽亞耶穌的到來預備心靈。'
    },
    deepDive: {
      title: '浸禮池（Mikveh）與約翰的洗禮',
      content: '猶太傳統中已有在「浸禮池」中進行禮儀性浸泡以求潔淨的作法。約翰的洗禮在形式上相似，但其信息卻是激進的，將此儀式應用於全以色列，作為全國悔改的標誌。他宣稱，一位比他更偉大的將要來臨，祂不僅用水施洗，還要用聖靈與火施洗。',
      sources: [
        { text: '馬可福音 1:4-8 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Mark+1:4-8&version=NIV' },
        { text: '馬太福音 3:11 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Matthew+3:11&version=ESV' },
      ]
    }
  },
  {
    id: 'q4',
    character: '使徒彼得',
    characterImage: 'https://picsum.photos/seed/peter/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '在五旬節那天，我告訴眾人要「悔改，並受洗」，目的是什麼？',
    options: [
      '為了得到一頓免費的餐點。',
      '為了使你們的罪得赦，並領受所賜的聖靈。',
      '為了登記新社區的人口普查。',,
      '為了在耶路撒冷的陽光下降溫。'
    ],
    correctAnswerIndex: 1,
    explanation: '彼得在使徒行傳第二章的講道標誌著基督教會的誕生。洗禮現在明確地與信靠耶穌基督、藉祂的死與復活赦免罪惡，以及聖靈的內住聯繫在一起。這是進入新約群體的入會儀式。',
     journalPrompt: {
      title: '新約的洗禮',
      content: '基督教的洗禮，如彼得所傳講的，是救贖歷史的高潮。它結合了聖約（加入神的子民）、潔淨（罪得赦免）和新生命（領受聖靈）的主題。'
    },
    deepDive: {
      title: '洗禮：與基督聯合的象徵',
      content: '使徒保羅後來解釋說，洗禮是在靈性上與耶穌同死、同埋葬、同復活（羅馬書 6:3-4）。當一個人浸入水中時，象徵著舊我罪性的死亡。從水中出來則象徵著在基督裡復活，得著新生命。這是福音本身一個深刻的畫面。',
      sources: [
        { text: '使徒行傳 2:38-39 (KJV)', url: 'https://www.biblegateway.com/passage/?search=Acts+2:38-39&version=KJV' },
        { text: '羅馬書 6:3-4 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Romans+6:3-4&version=NIV' },
        { text: '十二使徒遺訓論洗禮（早期教會文獻）', url: '#'}
      ]
    }
  },
  {
    id: 'q6',
    character: '使徒保羅',
    characterImage: 'https://picsum.photos/seed/paul/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '我在寫給加拉太教會的信中提到，凡受洗歸入基督的，都是「披戴基督」了。這句話的屬靈含義是什麼？',
    options: [
      '加入一個名為「基督」的時尚俱樂部。',
      '穿上印有基督形象的特殊服裝。',
      '在洗禮時得到一件新斗篷。',,
      '在上帝眼中，我們的身份完全被基督的義所覆蓋。'
    ],
    correctAnswerIndex: 3,
    explanation: '「披戴基督」（加拉太書 3:27）是一個強有力的比喻。它意味著當我們藉著信靠和洗禮與基督聯合時，上帝看我們就不再是看我們有罪的舊我，而是看到基督的完美和公義。我們的身份從根本上被改變了。我們現在是「在基督裡」，有了一個新的地位和家庭。',
    journalPrompt: {
      title: '披戴基督',
      content: '洗禮不僅是洗去罪惡，也是穿上一個新的身份。使徒保羅教導說，在洗禮中，我們披戴了基督自己。我們的舊身份已經過去，我們現在以上帝兒女的身份活在基督的義中。',
    },
    deepDive: {
      title: '在基督裡的身份',
      content: '保羅神學的核心是「在基督裡」這個概念。這是一種深刻的屬靈聯合。洗禮是這種聯合的外在標誌。正如羅馬書 6 章所解釋的，我們與基督同死、同埋葬、同復活；正如加拉太書所說，我們披戴了祂。這意味著基督的勝利成為我們的勝利，祂的義成為我們的義，祂與父的關係也成為我們的關係。這徹底改變了基督徒看待自己和生活的方式。',
      sources: [
        { text: '加拉太書 3:26-27 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Galatians+3:26-27&version=NIV' },
        { text: '歌羅西書 2:12 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Colossians+2:12&version=ESV' },
      ],
    },
  },
  {
    id: 'q7',
    character: '約書亞',
    characterImage: 'https://picsum.photos/seed/joshua/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '當以色列人過約旦河進入應許之地時，我設立了十二塊石頭作為紀念。這個紀念碑的目的是什麼？',
    options: [
      '為了建造一個游泳池。',
      '用來建造約書亞的新房子。',,
      '作為後代詢問時的見證，紀念上帝使河水乾涸的神蹟。',
      '為了練習舉重運動。'
    ],
    correctAnswerIndex: 2,
    explanation: '約書亞記4:6-7記載，這十二塊石頭是為了讓後代子孫詢問其意義時，父母可以向他們講述上帝如何停住約旦河水，使以色列人得以過河。這顯示了紀念上帝作為和傳承信仰故事的重要性。',
    journalPrompt: {
      title: '紀念石的意義',
      content: '約書亞設立的紀念石提醒我們，信仰需要被記念和傳承。每一個見證上帝作為的標記，都成為向下一代述說神恩的機會。'
    },
    deepDive: {
      title: '記憶與信仰傳承',
      content: '舊約中充滿了設立紀念碑的例子，從雅各在伯特利立石，到撒母耳的以便以謝石。這些不僅是歷史記錄，更是信仰教育的工具。它們提醒我們上帝的信實，並為下一代提供詢問和學習的機會。基督教的聖餐也是這種紀念傳統的延續。',
      sources: [
        { text: '約書亞記 4:1-9 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Joshua+4:1-9&version=NIV' },
        { text: '申命記 6:20-25 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Deuteronomy+6:20-25&version=ESV' },
      ]
    }
  },
  {
    id: 'q8',
    character: '大衛王',
    characterImage: 'https://picsum.photos/seed/david/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '我在詩篇中寫道：「你當將你的重擔卸給耶和華」。這句話在面對人生困難時給我們什麼啟示？',
    options: [
      '我們應該把所有的行李都扔掉。',
      '我們可以將憂慮和困難交託給上帝，相信祂會扶持我們。',
      '我們應該搬到別的城市。',
      '我們需要聘請更多的助手。',
    ],
    correctAnswerIndex: 1,
    explanation: '詩篇55:22教導我們，當面對重壓和困難時，我們可以將這些負擔交託給上帝。大衛作為君王經歷了許多挑戰，他學會了依靠上帝的力量而非自己的能力。這是信靠與交託的功課。',
    journalPrompt: {
      title: '交託的智慧',
      content: '大衛的詩篇教導我們，真正的力量來自於學會交託。當我們將重擔卸給上帝時，我們不是在逃避責任，而是在承認上帝的主權和愛護。'
    },
    deepDive: {
      title: '詩篇中的信靠神學',
      content: '大衛的詩篇不僅是個人情感的表達，更是深刻的神學反思。從詩篇23篇的牧人形象，到詩篇51篇的悔改，再到詩篇139篇對上帝全知的讚嘆，這些詩篇教導我們如何在各種人生境遇中與上帝建立關係。交託不是被動的放棄，而是主動的信靠。',
      sources: [
        { text: '詩篇 55:22 (KJV)', url: 'https://www.biblegateway.com/passage/?search=Psalm+55:22&version=KJV' },
        { text: '彼得前書 5:7 (NIV)', url: 'https://www.biblegateway.com/passage/?search=1+Peter+5:7&version=NIV' },
      ]
    }
  },
  {
    id: 'q9',
    character: '所羅門王',
    characterImage: 'https://picsum.photos/seed/solomon/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '當上帝問我想要什麼時，我沒有求財富或長壽，而是求什麼？',
    options: [
      '打敗所有敵人的能力。',
      '一座更大的宮殿。',
      '成為世界上最富有的人。',,
      '智慧來治理神的百姓。'
    ],
    correctAnswerIndex: 3,
    explanation: '列王紀上3:9記載，所羅門求上帝賜給他智慧，使他能夠分辨善惡，好治理神的百姓。這個無私的請求讓上帝喜悅，不僅賜給他智慧，也賜給他財富和尊榮。這教導我們優先次序的重要性。',
    journalPrompt: {
      title: '智慧的價值',
      content: '所羅門的選擇提醒我們，真正的智慧比任何物質財富都更寶貴。當我們尋求上帝的智慧時，我們是在尋求按照神的心意生活的能力。'
    },
    deepDive: {
      title: '智慧文學的貢獻',
      content: '所羅門不僅以智慧統治以色列，他也為我們留下了豐富的智慧文學，包括箴言、傳道書和部分詩篇。這些書卷教導實用的生活智慧，從人際關係到工作倫理，從言語的力量到財富的適當使用。然而，傳道書也提醒我們，即使是最智慧的人也會發現，離開上帝的人生終究是虛空的。',
      sources: [
        { text: '列王紀上 3:5-14 (NIV)', url: 'https://www.biblegateway.com/passage/?search=1+Kings+3:5-14&version=NIV' },
        { text: '箴言 9:10 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Proverbs+9:10&version=ESV' },
      ]
    }
  },
  {
    id: 'q10',
    character: '先知以賽亞',
    characterImage: 'https://picsum.photos/seed/isaiah/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '我預言了一位「受苦的僕人」，他將「為我們的過犯受害，為我們的罪孽壓傷」。這個預言指向誰？',
    options: [
      '彌賽亞耶穌基督。',
      '亞述王撒珥根。',,
      '巴比倫王尼布甲尼撒。',
      '波斯王居魯士。'
    ],
    correctAnswerIndex: 0,
    explanation: '以賽亞書53章是舊約中最明確的彌賽亞預言之一。這位「受苦的僕人」的描述完美地預言了耶穌基督的生平、受死和復活。新約多次引用這段經文來說明耶穌就是應許的彌賽亞。',
    journalPrompt: {
      title: '受苦僕人的預言',
      content: '以賽亞的預言向我們顯示，上帝的救贖計劃從古時就已經確定。彌賽亞不是以征服者的身份來臨，而是以受苦僕人的身份，透過犧牲來拯救世人。'
    },
    deepDive: {
      title: '彌賽亞預言的應驗',
      content: '以賽亞書53章被稱為「舊約的福音」，因為它如此詳細地預言了彌賽亞的受苦、死亡和勝利。從「他誠然擔當我們的憂患」到「因他受的刑罰我們得平安」，每一個細節都在耶穌身上得到應驗。這種跨越數百年的預言應驗，是聖經神聖啟示的有力證據，也讓我們看見上帝救贖計劃的深度和廣度。',
      sources: [
        { text: '以賽亞書 53:3-12 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Isaiah+53:3-12&version=NIV' },
        { text: '使徒行傳 8:32-35 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Acts+8:32-35&version=ESV' },
      ]
    }
  },
  {
    id: 'q11',
    character: '但以理',
    characterImage: 'https://picsum.photos/seed/daniel/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '在巴比倫的宮廷中，我和我的朋友決定不吃王的膳和王所飲的酒。我們這樣做的主要原因是什麼？',
    options: [
      '為了持守我們對上帝的信仰和律法的要求。',
      '因為食物味道不好。',
      '因為我們正在節食減肥。',
      '因為我們想要與眾不同。',
    ],
    correctAnswerIndex: 0,
    explanation: '但以理書1:8記載，但以理立志不以王的膳和王所飲的酒玷污自己。這可能涉及食物是否潔淨、是否獻給偶像等律法問題。但以理在異邦環境中持守信仰，展現了在壓力下保持屬靈忠誠的勇氣。',
    journalPrompt: {
      title: '在異地持守信仰',
      content: '但以理的故事提醒我們，無論在什麼環境中，我們都可以選擇忠於上帝。即使在不友善的環境中，堅持正確的原則往往會得到意想不到的祝福。'
    },
    deepDive: {
      title: '流亡中的見證',
      content: '但以理和他朋友們的故事展示了如何在世俗環境中活出信仰。他們沒有逃避世界，而是在世界中成為光鹽。從拒食王膳到火窯中的拯救，從夢的解釋到獅子坑的神蹟，這些故事都說明了一個原則：當我們忠於上帝時，上帝必定忠於我們。他們的見證影響了外邦君王，展現了信仰的轉化力量。',
      sources: [
        { text: '但以理書 1:8-16 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Daniel+1:8-16&version=NIV' },
        { text: '但以理書 3:16-18 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Daniel+3:16-18&version=ESV' },
      ]
    }
  },
  {
    id: 'q12',
    character: '耶穌基督',
    characterImage: 'https://picsum.photos/seed/jesus/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '我在登山寶訓中說：「虛心的人有福了」。這裡的「虛心」指的是什麼？',
    options: [
      '很少說話的人。',,
      '沒有自信的人。',
      '心情不好的人。',
      '認識自己靈性貧乏，需要上帝的人。'
    ],
    correctAnswerIndex: 3,
    explanation: '馬太福音5:3中的「虛心」在原文中是「靈裡貧窮」的意思。這不是指物質的貧窮，而是指認識到自己在屬靈上的需要，承認離開上帝就一無所有。這種謙卑的態度是天國子民的第一個特質。',
    journalPrompt: {
      title: '靈裡的貧窮',
      content: '耶穌的八福始於靈裡的貧窮，這提醒我們，進入天國的第一步是認識自己的需要。當我們承認自己的有限和罪性時，我們就為接受上帝的恩典預備了心。'
    },
    deepDive: {
      title: '天國的價值觀',
      content: '登山寶訓中的八福完全顛覆了世界的價值觀。世界說強者有福，耶穌說虛心的人有福；世界說富足的人有福，耶穌說哀慟的人有福。這些教導不是消極的人生哲學，而是天國的積極價值觀。它們描述了一種新的生活方式，這種生活方式建立在對上帝的信靠和對他人的愛上。',
      sources: [
        { text: '馬太福音 5:3-12 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Matthew+5:3-12&version=NIV' },
        { text: '路加福音 6:20-26 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Luke+6:20-26&version=ESV' },
      ]
    }
  },
  {
    id: 'q13',
    character: '稅吏撒該',
    characterImage: 'https://picsum.photos/seed/zacchaeus/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '當耶穌來到我家後，我做了什麼來表示真正的悔改？',
    options: [
      '我把財產的一半給窮人，並四倍償還我所虧欠的。',
      '我辭去了稅吏的工作。',
      '我搬到了另一個城市。',
      '我建造了一座新的會堂。',
    ],
    correctAnswerIndex: 0,
    explanation: '路加福音19:8記載，撒該對主說：「主啊，我把所有的一半給窮人；我若訛詐了誰，就還他四倍。」這不僅是口頭的悔改，更是實際的行動，顯示了真正悔改會帶來生活方式的改變。',
    journalPrompt: {
      title: '悔改的果子',
      content: '撒該的故事告訴我們，真正的悔改不只是內心的改變，還會表現在外在的行動上。當我們真正遇見耶穌時，我們的價值觀和行為都會被轉化。'
    },
    deepDive: {
      title: '救恩與社會公義',
      content: '撒該的故事美妙地結合了個人救恩與社會公義。他沒有只是獲得心靈的平安就滿足了，而是主動去修復他過去的錯誤行為對他人造成的傷害。這顯示真正的福音是整全的，它不僅拯救靈魂，也轉化我們對財富、權力和關係的態度。撒該的行動回應了舊約中關於公義和憐憫的教導。',
      sources: [
        { text: '路加福音 19:1-10 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Luke+19:1-10&version=NIV' },
        { text: '以西結書 33:14-16 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Ezekiel+33:14-16&version=ESV' },
      ]
    }
  },
  {
    id: 'q14',
    character: '使徒約翰',
    characterImage: 'https://picsum.photos/seed/johnapostle/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '我在約翰福音中記錄了耶穌說的「我就是道路、真理、生命」。這句話的核心信息是什麼？',
    options: [
      '耶穌知道很多道理。',,
      '耶穌是一位偉大的哲學老師。',
      '耶穌是最好的旅行嚮導。',
      '耶穌是通往父神的唯一道路。'
    ],
    correctAnswerIndex: 3,
    explanation: '約翰福音14:6完整地記錄了耶穌的話：「我就是道路、真理、生命；若不藉著我，沒有人能到父那裡去。」這是基督教信仰的核心宣告，說明耶穌不只是眾多宗教領袖中的一位，而是神與人之間唯一的中保。',
    journalPrompt: {
      title: '基督的獨特性',
      content: '約翰記錄的這句話挑戰我們思考耶穌的身份。祂不是說祂知道道路，而是說祂就是道路。這種排他性的宣告要求我們做出回應：接受或拒絕。'
    },
    deepDive: {
      title: '約翰福音中的「我是」宣告',
      content: '約翰福音記錄了耶穌的七個「我是」宣告：生命的糧、世界的光、羊的門、好牧人、復活和生命、道路真理生命、真葡萄樹。這些宣告都使用了舊約中上帝自我啟示的「我是」格式（如出埃及記3:14），暗示耶穌的神性。每個宣告都不只是比喻，而是關於耶穌本質的深刻神學陳述。',
      sources: [
        { text: '約翰福音 14:6 (NIV)', url: 'https://www.biblegateway.com/passage/?search=John+14:6&version=NIV' },
        { text: '使徒行傳 4:12 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Acts+4:12&version=ESV' },
      ]
    }
  },
  {
    id: 'q15',
    character: '馬大',
    characterImage: 'https://picsum.photos/seed/martha/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '當我忙於服事而抱怨妹妹馬利亞時，耶穌對我說了什麼？',
    options: [
      '妳應該雇用更多的僕人。',
      '馬利亞選擇了那上好的福分，是不能奪去的。',
      '妳們兩個都應該去廚房幫忙。',
      '不用準備這麼豐盛的餐點。',
    ],
    correctAnswerIndex: 1,
    explanation: '路加福音10:42記錄了耶穌的回答：「但是不可少的只有一件；馬利亞已經選擇那上好的福分，是不能奪去的。」耶穌不是批評服事，而是強調靈性追求的優先性和聆聽神話語的重要性。',
    journalPrompt: {
      title: '服事與敬拜的平衡',
      content: '馬大的故事提醒我們，即使是為主做工，也不能取代與主親近的時間。服事很重要，但如果失去了敬拜和聆聽的心，服事也會成為空虛的忙碌。'
    },
    deepDive: {
      title: '行動與默想的整合',
      content: '馬大和馬利亞的故事常被解讀為行動與默想、服事與敬拜之間的對比。然而，更深層的信息是關於動機和優先次序。馬大的服事本身是好的，但當她讓焦慮和怨恨進入心中時，服事就失去了愛的本質。真正的基督徒生活需要整合馬利亞的聆聽心和馬大的服事手，但都必須源於對基督的愛。',
      sources: [
        { text: '路加福音 10:38-42 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Luke+10:38-42&version=NIV' },
        { text: '詩篇 46:10 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Psalm+46:10&version=ESV' },
      ]
    }
  },
  {
    id: 'q16',
    character: '夏娃',
    characterImage: 'https://picsum.photos/seed/eve/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '在伊甸園中，蛇引誘我吃分別善惡樹的果子時，用了什麼論點？',
    options: [
      '所有動物都在吃這個果子。',
      '吃了就能像神一樣知道善惡。',
      '上帝只是在開玩笑。',,
      '果子看起來很美味。'
    ],
    correctAnswerIndex: 1,
    explanation: '創世記3:5記載，蛇對夏娃說：「因為神知道，你們吃的日子眼睛就明亮了，你們便如神能知道善惡。」這個試探的核心是要人類追求獨立於上帝的知識和判斷力，想要「像神一樣」。',
    journalPrompt: {
      title: '第一次試探',
      content: '夏娃面對的試探揭示了罪的本質：不相信上帝的良善，渴望自主權，想要成為自己的神。這個模式在人類歷史中不斷重複。'
    },
    deepDive: {
      title: '罪的起源與本質',
      content: '蛇的試探包含三個元素：懷疑神的話（「神豈是真說...？」）、否認後果（「你們不一定死」）、和應許錯誤的好處（「像神一樣」）。這種試探模式在整本聖經中反覆出現，甚至耶穌在曠野受試探時也面對類似的模式。理解罪的本質幫助我們識別和抵擋現代的試探。',
      sources: [
        { text: '創世記 3:1-6 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Genesis+3:1-6&version=NIV' },
        { text: '約翰一書 2:16 (ESV)', url: 'https://www.biblegateway.com/passage/?search=1+John+2:16&version=ESV' },
      ]
    }
  },
  {
    id: 'q17',
    character: '挪亞',
    characterImage: 'https://picsum.photos/seed/noah/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '當上帝吩咐我建造方舟時，洪水還要多久才來臨？',
    options: [
      '大約120年後。',
      '立即就來。',
      '明天。',,
      '一個月後。'
    ],
    correctAnswerIndex: 0,
    explanation: '根據創世記6:3和後續經文的推算，從上帝宣告審判到洪水來臨，大約經過了120年。在這段漫長的時間裡，挪亞一邊建造方舟，一邊向世人傳講悔改的信息。',
    journalPrompt: {
      title: '忍耐的信心',
      content: '挪亞花了超過一個世紀建造方舟，在這期間必定經歷許多嘲笑和質疑。他的故事教導我們，真實的信心需要長期的堅持和順服。'
    },
    deepDive: {
      title: '上帝的忍耐與人的回應',
      content: '120年的準備期顯示了上帝極大的忍耐和給人悔改機會的心意。彼得後書2:5稱挪亞為「傳義道的人」，表明他不只是默默建造方舟，更積極呼籲人悔改。然而，只有他的家人回應了。這提醒我們，即使面對長期的拒絕，我們仍要忠心傳講真理。',
      sources: [
        { text: '創世記 6:3-22 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Genesis+6:3-22&version=NIV' },
        { text: '彼得後書 2:5 (ESV)', url: 'https://www.biblegateway.com/passage/?search=2+Peter+2:5&version=ESV' },
      ]
    }
  },
  {
    id: 'q18',
    character: '約瑟',
    characterImage: 'https://picsum.photos/seed/joseph/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '當我在埃及成為宰相後，我對賣我為奴的哥哥們說了什麼？',
    options: [
      '從前你們的意思是要害我，但神的意思原是好的。',
      '你們要為此付出代價！',
      '我再也不想見到你們。',
      '這都是你們應得的。',
    ],
    correctAnswerIndex: 0,
    explanation: '創世記50:20記載，約瑟對哥哥們說：「從前你們的意思是要害我，但神的意思原是好的，要保全許多人的性命，成就今日的光景。」這顯示了約瑟對神主權的信心和寬恕的心。',
    journalPrompt: {
      title: '神的主權與人的選擇',
      content: '約瑟的故事展現了一個深刻的真理：人的惡意無法阻擋神的美意。神能使用甚至是不公義的事件來成就祂更大的計劃。'
    },
    deepDive: {
      title: '苦難中的信心',
      content: '約瑟經歷了被兄弟出賣、被誣告下監、被遺忘等一連串的不公。但他從未放棄對神的信心。他的故事預表了基督：被自己人拒絕，經歷苦難，最終成為拯救者。約瑟的寬恕也教導我們，真正的饒恕來自於認識到神的主權和計劃。',
      sources: [
        { text: '創世記 50:15-21 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Genesis+50:15-21&version=NIV' },
        { text: '羅馬書 8:28 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Romans+8:28&version=ESV' },
      ]
    }
  },
  {
    id: 'q19',
    character: '米利暗',
    characterImage: 'https://picsum.photos/seed/miriam/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '當以色列人過紅海後，我做了什麼來慶祝？',
    options: [
      '開始抱怨食物不足。',,
      '拿著鼓跳舞唱歌讚美神。',
      '立刻倒頭就睡。',
      '準備了一場盛宴。'
    ],
    correctAnswerIndex: 1,
    explanation: '出埃及記15:20-21記載，女先知米利暗拿著鼓，眾婦女也跟著出去拿鼓跳舞。她唱道：「你們要歌頌耶和華，因他大大戰勝，將馬和騎馬的投在海中。」這是聖經中最早記載的敬拜讚美場景之一。',
    journalPrompt: {
      title: '喜樂的敬拜',
      content: '米利暗帶領婦女們用音樂、舞蹈和歌聲讚美神，展現了敬拜可以是充滿喜樂和表達力的。當神行奇事時，我們的回應應該是真誠的讚美。'
    },
    deepDive: {
      title: '女性在聖經中的領導角色',
      content: '米利暗被稱為「女先知」，與摩西和亞倫一起被列為以色列的領袖（彌迦書6:4）。她在敬拜中的領導顯示了女性在神國度工作中的重要角色。然而，她後來因為驕傲而受到管教（民數記12章），提醒我們領導權柄來自神，必須謙卑使用。',
      sources: [
        { text: '出埃及記 15:20-21 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Exodus+15:20-21&version=NIV' },
        { text: '彌迦書 6:4 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Micah+6:4&version=ESV' },
      ]
    }
  },
  {
    id: 'q20',
    character: '迦勒',
    characterImage: 'https://picsum.photos/seed/caleb/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '當十二個探子窺探迦南地回來後，我和約書亞說了什麼？',
    options: [
      '讓我們先訓練軍隊十年。',,
      '我們立刻上去得那地吧！我們足能得勝。',
      '那地的人太強大了，我們無法征服。',
      '我們應該回埃及。'
    ],
    correctAnswerIndex: 1,
    explanation: '民數記13:30記載，迦勒在摩西面前安撫百姓說：「我們立刻上去得那地吧！我們足能得勝。」雖然其他十個探子報惡信，只有迦勒和約書亞相信神的應許。',
    journalPrompt: {
      title: '信心勝過恐懼',
      content: '迦勒看到了與其他探子相同的巨人和堅固城牆，但他的信心使他看見更大的真理：神與他們同在。真實的信心不是否認困難，而是相信神比困難更大。'
    },
    deepDive: {
      title: '專心跟從神',
      content: '聖經多次描述迦勒「專心跟從耶和華」（民數記32:12）。即使在85歲高齡，他仍然充滿活力和信心，要求得那有巨人居住的希伯崙山地（約書亞記14:10-12）。迦勒的一生教導我們，忠心跟從神會帶來長久的祝福，而信心不因年齡而減退。',
      sources: [
        { text: '民數記 13:26-33; 14:6-9 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Numbers+13:26-33;14:6-9&version=NIV' },
        { text: '約書亞記 14:6-15 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Joshua+14:6-15&version=ESV' },
      ]
    }
  },
  {
    id: 'q21',
    character: '路得',
    characterImage: 'https://picsum.photos/seed/ruth/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '當我的婆婆拿俄米要我回摩押老家時，我對她說了什麼？',
    options: [
      '我需要先回去看看我的家人。',,
      '讓我考慮一下。',
      '好的，我現在就走。',
      '妳往哪裡去，我也往那裡去；妳的神就是我的神。'
    ],
    correctAnswerIndex: 3,
    explanation: '路得記1:16-17記錄了路得美麗的承諾：「妳往哪裡去，我也往那裡去；妳在哪裡住宿，我也在那裡住宿；妳的國就是我的國，妳的神就是我的神。妳在哪裡死，我也在那裡死，也葬在那裡。」',
    journalPrompt: {
      title: '忠誠的愛',
      content: '路得對拿俄米的忠誠，以及她對以色列神的委身，展現了真實的愛與信心。她選擇離開自己的家鄉和神明，跟隨看似沒有前途的婆婆和未知的神。'
    },
    deepDive: {
      title: '外邦人與救贖',
      content: '路得是摩押人，按照律法本不應該進入以色列會眾。但她的信心和忠誠使她不僅被接納，更成為大衛王的曾祖母，進入了彌賽亞的家譜。她的故事預示了福音將臨到萬國，以及外邦人因信得救的真理。路得記也展現了「救贖者」（goel）的概念，預表基督的救贖工作。',
      sources: [
        { text: '路得記 1:16-18 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Ruth+1:16-18&version=NIV' },
        { text: '馬太福音 1:5 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Matthew+1:5&version=ESV' },
      ]
    }
  },
  {
    id: 'q22',
    character: '撒母耳',
    characterImage: 'https://picsum.photos/seed/samuel/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '當我還是小孩子在會幕服事時，夜裡聽見有聲音叫我的名字。那是誰？',
    options: [
      '我的母親哈拿。',
      '耶和華神。',
      '我在做夢。',,
      '祭司以利。'
    ],
    correctAnswerIndex: 1,
    explanation: '撒母耳記上3章記載，神三次呼喚小撒母耳的名字。起初他以為是以利叫他，但以利指示他說：「你去睡吧，若再呼喚你，你就說：『耶和華啊，請說，僕人敬聽！』」這是撒母耳第一次聽見神的聲音。',
    journalPrompt: {
      title: '聆聽神的聲音',
      content: '撒母耳學會了如何辨認和回應神的聲音。他的態度「請說，僕人敬聽」成為我們與神關係的典範：願意聆聽，準備順服。'
    },
    deepDive: {
      title: '先知的呼召',
      content: '撒母耳的呼召發生在「耶和華的言語稀少，不常有默示」的時代（撒上3:1）。這提醒我們，即使在屬靈荒涼的時期，神仍在尋找願意聆聽和順服的人。撒母耳後來成為以色列歷史上最偉大的先知之一，膏立了掃羅和大衛兩位王。他的一生展現了忠心聆聽神話語的重要性。',
      sources: [
        { text: '撒母耳記上 3:1-21 (NIV)', url: 'https://www.biblegateway.com/passage/?search=1+Samuel+3:1-21&version=NIV' },
        { text: '希伯來書 3:7-8 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Hebrews+3:7-8&version=ESV' },
      ]
    }
  },
  {
    id: 'q23',
    character: '拔示巴',
    characterImage: 'https://picsum.photos/seed/bathsheba/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '我的兒子所羅門能繼承大衛的王位，主要是因為什麼？',
    options: [
      '他在武術比賽中獲勝。',
      '他賄賂了所有的大臣。',,
      '上帝應許他要作王，大衛也確認了這應許。',
      '他是長子。'
    ],
    correctAnswerIndex: 2,
    explanation: '列王紀上1章記載，當大衛年老時，拔示巴提醒大衛曾指著神起誓說所羅門必接續他作王。先知拿單也證實了這事。這是神的揀選，而非人為的安排。',
    journalPrompt: {
      title: '從罪到救贖',
      content: '拔示巴的故事以大衛的罪開始，但神的恩典使她成為所羅門的母親，甚至進入彌賽亞的家譜。這顯示神能使用破碎的生命成就祂的計劃。'
    },
    deepDive: {
      title: '恩典與主權',
      content: '拔示巴在馬太福音家譜中被特別提及，這是不尋常的。她的包含提醒我們，神的恩典超越人的過犯。雖然大衛與拔示巴的關係始於罪，但神仍然揀選他們的兒子所羅門繼承王位。這不是縱容罪，而是展現神能在人的軟弱中彰顯祂的憐憫和主權。',
      sources: [
        { text: '列王紀上 1:11-31 (NIV)', url: 'https://www.biblegateway.com/passage/?search=1+Kings+1:11-31&version=NIV' },
        { text: '馬太福音 1:6 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Matthew+1:6&version=ESV' },
      ]
    }
  },
  {
    id: 'q24',
    character: '以利亞',
    characterImage: 'https://picsum.photos/seed/elijah/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '在迦密山上，我與巴力的先知對決。我向神禱告後發生了什麼？',
    options: [
      '火從天降，燒盡了祭物、木柴、石頭和水。',
      '下了三天三夜的雨。',
      '什麼都沒發生。',,
      '巴力的先知自願認輸。'
    ],
    correctAnswerIndex: 0,
    explanation: '列王紀上18:38記載：「於是耶和華降下火來，燒盡燔祭、木柴、石頭、塵土，又燒乾溝裡的水。」這個神蹟證明了耶和華是真神，導致百姓俯伏敬拜說：「耶和華是神！耶和華是神！」',
    journalPrompt: {
      title: '單獨面對眾人',
      content: '以利亞一人對抗450個巴力先知和400個亞舍拉先知，展現了對真神的堅定信心。有時候，忠於神的道路是孤獨的，但神必定顯明真理。'
    },
    deepDive: {
      title: '屬靈爭戰的真實性',
      content: '迦密山的對決不只是先知之間的比賽，而是真假神明之間的較量。以利亞甚至在祭壇周圍挖溝，三次倒水，使神蹟更加明顯。這個事件後，以利亞卻因耶洗別的威脅而逃跑，顯示即使是屬靈偉人也會經歷軟弱。神在何烈山以微小的聲音對他說話，教導我們神的同在不總是在戲劇性的事件中。',
      sources: [
        { text: '列王紀上 18:20-40 (NIV)', url: 'https://www.biblegateway.com/passage/?search=1+Kings+18:20-40&version=NIV' },
        { text: '列王紀上 19:11-13 (ESV)', url: 'https://www.biblegateway.com/passage/?search=1+Kings+19:11-13&version=ESV' },
      ]
    }
  },
  {
    id: 'q25',
    character: '以利沙',
    characterImage: 'https://picsum.photos/seed/elisha/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '當敘利亞元帥乃縵來找我治療大痲瘋時，我叫他做什麼？',
    options: [
      '支付大筆金錢。',
      '回家等三天。',,
      '獻上一百隻羊。',
      '在約旦河沐浴七次。'
    ],
    correctAnswerIndex: 3,
    explanation: '列王紀下5:10記載，以利沙打發一個使者對乃縵說：「你去在約旦河中沐浴七回，你的肉就必復原，而得潔淨。」起初乃縵因為這個簡單的命令而生氣，但當他順服時，就得了醫治。',
    journalPrompt: {
      title: '謙卑的順服',
      content: '乃縵必須放下身為大元帥的驕傲，接受看似簡單甚至侮辱的醫治方法。神的道路有時與我們的期待不同，但順服就帶來祝福。'
    },
    deepDive: {
      title: '得救在乎歸回安息',
      content: '乃縵期待先知會出來行大事，但以利沙連面都不露，只給了一個簡單的指示。這挑戰了乃縵的驕傲和對神蹟的期待。同樣，許多人期待複雜的宗教儀式或偉大的善行才能得救，但福音的呼召是簡單的：相信和悔改。乃縵的醫治也預表外邦人將藉信心得救（路加福音4:27）。',
      sources: [
        { text: '列王紀下 5:1-19 (NIV)', url: 'https://www.biblegateway.com/passage/?search=2+Kings+5:1-19&version=NIV' },
        { text: '路加福音 4:27 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Luke+4:27&version=ESV' },
      ]
    }
  },
  {
    id: 'q26',
    character: '約伯',
    characterImage: 'https://picsum.photos/seed/job/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '在失去一切之後，我對神的回應是什麼？',
    options: [
      '我詛咒神並離棄祂。',
      '賞賜的是耶和華，收取的也是耶和華，耶和華的名是應當稱頌的。',
      '我要找律師控告神。',
      '從此再也不相信神。',
    ],
    correctAnswerIndex: 1,
    explanation: '約伯記1:21-22記載，約伯失去所有財產和兒女後，說：「我赤身出於母胎，也必赤身歸回。賞賜的是耶和華，收取的也是耶和華，耶和華的名是應當稱頌的。」在這一切的事上，約伯並不犯罪，也不以神為愚妄。',
    journalPrompt: {
      title: '苦難中的信心',
      content: '約伯的故事挑戰我們：當生命崩潰時，我們如何回應？約伯展現了即使在極度痛苦中，仍能持守對神的信心和敬拜。'
    },
    deepDive: {
      title: '苦難的奧秘',
      content: '約伯記探討了一個深刻的問題：為什麼義人受苦？約伯的朋友們試圖用「報應神學」解釋，認為苦難必定是罪的結果。但神最後顯明，祂的道路高過人的道路。苦難不總能被簡單解釋，但神仍是主權者。約伯最終看見神自己，這比得到答案更重要（約伯記42:5）。',
      sources: [
        { text: '約伯記 1:13-22 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Job+1:13-22&version=NIV' },
        { text: '約伯記 42:1-6 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Job+42:1-6&version=ESV' },
      ]
    }
  },
  {
    id: 'q27',
    character: '耶利米',
    characterImage: 'https://picsum.photos/seed/jeremiah/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '神呼召我作先知時，我的回應是什麼？',
    options: [
      '我去找別人來做這工作。',
      '我立刻答應。',
      '主啊，我不知怎樣說，因為我是年幼的。',
      '我要求先考慮三天。',
    ],
    correctAnswerIndex: 2,
    explanation: '耶利米書1:6記載，耶利米對神說：「主耶和華啊，我不知怎樣說，因為我是年幼的。」但神回應說：「你不要說我是年幼的，因為我差遣你到誰那裡去，你都要去；我吩咐你說什麼話，你都要說。」',
    journalPrompt: {
      title: '不足感與神的呼召',
      content: '耶利米感到自己不夠資格，但神的呼召不是基於我們的能力，而是基於祂的揀選和同在。神應許：「我與你同在，要拯救你。」'
    },
    deepDive: {
      title: '流淚的先知',
      content: '耶利米被稱為「流淚的先知」，因為他預言耶路撒冷將被毀，但百姓不聽。他經歷了監禁、嘲笑和孤立，但仍忠心傳講神的話語。耶利米的事工提醒我們，成功的事奉不是以世人的回應來衡量，而是以對神的忠心來衡量。他的痛苦也預表了基督，為耶路撒冷哀哭。',
      sources: [
        { text: '耶利米書 1:4-10 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Jeremiah+1:4-10&version=NIV' },
        { text: '耶利米書 20:7-9 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Jeremiah+20:7-9&version=ESV' },
      ]
    }
  },
  {
    id: 'q28',
    character: '尼希米',
    characterImage: 'https://picsum.photos/seed/nehemiah/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '當我聽說耶路撒冷城牆破損、城門被火焚燒時，我做了什麼？',
    options: [
      '我忽視這個消息。',
      '我坐下哭泣、禁食禱告神。',
      '我立刻辭職回耶路撒冷。',
      '我寫信責備那些住在耶路撒冷的人。',
    ],
    correctAnswerIndex: 1,
    explanation: '尼希米記1:4記載：「我聽見這話，就坐下哭泣，悲哀幾日，在天上的神面前禁食祈禱。」尼希米的第一反應不是立即行動，而是帶著破碎的心轉向神。',
    journalPrompt: {
      title: '禱告與行動',
      content: '尼希米的例子展示了禱告與行動的完美結合。他先在神面前傾心吐意，然後在神的引導下採取大膽的行動，最終帶領百姓在52天內重建城牆。'
    },
    deepDive: {
      title: '屬靈復興與物質重建',
      content: '尼希米不僅重建了城牆，更重要的是他與以斯拉一起帶領屬靈復興。城牆的重建是外在的，但真正的目標是恢復百姓與神的關係。尼希米面對內外的反對，但他的禱告、勇氣和組織能力使這不可能的任務成為可能。他展現了敬虔的領導如何影響整個社群。',
      sources: [
        { text: '尼希米記 1:1-11 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Nehemiah+1:1-11&version=NIV' },
        { text: '尼希米記 6:15-16 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Nehemiah+6:15-16&version=ESV' },
      ]
    }
  },
  {
    id: 'q29',
    character: '以斯帖',
    characterImage: 'https://picsum.photos/seed/esther/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '當我需要違背律法去見王以拯救猶太人時，我說了什麼？',
    options: [
      '讓末底改自己去處理。',,
      '我若死就死吧！',
      '這太危險了，我不能做。',
      '我要等到王主動召見我。'
    ],
    correctAnswerIndex: 1,
    explanation: '以斯帖記4:16記載，以斯帖請求末底改招聚所有猶太人為她禁食三天，然後說：「我若死就死吧！」她願意冒生命危險去拯救她的百姓。',
    journalPrompt: {
      title: '為此時而生',
      content: '末底改對以斯帖說：「焉知你得了王后的位分，不是為現今的機會嗎？」神將我們放在特定的位置，是為了祂的目的。勇氣就是即使害怕，仍然選擇正確的行動。'
    },
    deepDive: {
      title: '隱藏的護理',
      content: '以斯帖記是聖經中唯一沒有直接提到神名字的書卷，但神的作為卻清晰可見。從以斯帖被選為王后，到王失眠讀歷史，到哈曼的計謀被揭露，每個「巧合」都顯示神在背後的護理。這教導我們，即使在神似乎缺席的時候，祂仍在掌權。以斯帖的故事也啟發了猶太人的普珥節。',
      sources: [
        { text: '以斯帖記 4:12-17 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Esther+4:12-17&version=NIV' },
        { text: '以斯帖記 6:1-11 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Esther+6:1-11&version=ESV' },
      ]
    }
  },
  {
    id: 'q30',
    character: '施洗約翰的母親以利沙伯',
    characterImage: 'https://picsum.photos/seed/elizabeth/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '當馬利亞來探訪我時，發生了什麼事？',
    options: [
      '我腹中的胎兒跳動，我被聖靈充滿。',
      '我們一起做飯。',
      '什麼特別的事都沒發生。',,
      '我們討論天氣。'
    ],
    correctAnswerIndex: 0,
    explanation: '路加福音1:41記載：「以利沙伯一聽馬利亞問安，所懷的胎就在腹裡跳動。以利沙伯且被聖靈充滿。」她大聲喊著說：「你在婦女中是有福的，你所懷的胎也是有福的！」',
    journalPrompt: {
      title: '認出救主',
      content: '甚至在約翰出生前，他就在母腹中因彌賽亞的臨在而跳動。以利沙伯被聖靈充滿，認出馬利亞所懷的是主。真實的屬靈敏銳使我們能認出神的工作。'
    },
    deepDive: {
      title: '兩個奇蹟的誕生',
      content: '以利沙伯和撒迦利亞年老無子，如同亞伯拉罕和撒拉。約翰的出生本身就是神蹟，預備人心迎接更大的神蹟——基督的降生。以利沙伯稱馬利亞為「我主的母親」，這是新約中第一次有人認出耶穌的神性。兩個女人的對話和馬利亞的頌歌（尊主頌）充滿了舊約的引用，顯示神如何成就祂古老的應許。',
      sources: [
        { text: '路加福音 1:39-45 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Luke+1:39-45&version=NIV' },
        { text: '路加福音 1:46-55 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Luke+1:46-55&version=ESV' },
      ]
    }
  },
  {
    id: 'q31',
    character: '智慧人（東方博士）',
    characterImage: 'https://picsum.photos/seed/wisemen/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '我們從東方來到耶路撒冷尋找新生王時，獻上了什麼禮物？',
    options: [
      '金、銀、寶石。',
      '食物、衣服、玩具。',
      '書籍、地圖、武器。',,
      '黃金、乳香、沒藥。'
    ],
    correctAnswerIndex: 3,
    explanation: '馬太福音2:11記載：「進了房子，看見小孩子和他母親馬利亞，就俯伏拜那小孩子，揭開寶盒，拿黃金、乳香、沒藥為禮物獻給他。」這三樣禮物都有深刻的象徵意義。',
    journalPrompt: {
      title: '尋求並敬拜',
      content: '智慧人不辭辛勞地尋找新生王，並獻上最珍貴的禮物。真正的敬拜需要尋求、付出代價，並獻上我們最好的。'
    },
    deepDive: {
      title: '禮物的象徵意義',
      content: '傳統上，這三樣禮物被賦予象徵意義：黃金代表王權，乳香代表神性（用於敬拜），沒藥代表受苦和死亡（用於安葬）。這些外邦的智慧人認出了猶太人的王，預示福音將傳給萬邦。希律王和耶路撒冷全城的驚慌，對比智慧人的喜樂，顯示人們對彌賽亞的不同反應。',
      sources: [
        { text: '馬太福音 2:1-12 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Matthew+2:1-12&version=NIV' },
        { text: '詩篇 72:10-11 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Psalm+72:10-11&version=ESV' },
      ]
    }
  },
  {
    id: 'q32',
    character: '尼哥底母',
    characterImage: 'https://picsum.photos/seed/nicodemus/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '我夜裡來見耶穌時，祂對我說必須怎樣才能見神的國？',
    options: [
      '必須嚴格遵守所有律法。',
      '必須重生。',
      '必須成為法利賽人。',,
      '必須奉獻所有財產。'
    ],
    correctAnswerIndex: 1,
    explanation: '約翰福音3:3記載，耶穌回答說：「我實實在在地告訴你，人若不重生，就不能見神的國。」這個宣告震撼了尼哥底母，引發了關於屬靈重生的深刻對話。',
    journalPrompt: {
      title: '重生的必要',
      content: '耶穌告訴這位宗教領袖，他需要的不是更多的宗教知識或更好的行為，而是全新的屬靈生命。重生不是我們能做的，而是聖靈的工作。'
    },
    deepDive: {
      title: '從黑夜到光明',
      content: '尼哥底母「夜裡」來見耶穌，可能是害怕被人看見，但也象徵他屬靈的黑暗。約翰福音三次提到尼哥底母：夜裡的造訪、在公會中為耶穌辯護、以及在耶穌死後與約瑟一起埋葬耶穌。這個進程顯示他從隱密的尋求者變為公開的跟隨者。重生的教導是福音的核心：不是靠行為，而是靠聖靈的更新。',
      sources: [
        { text: '約翰福音 3:1-21 (NIV)', url: 'https://www.biblegateway.com/passage/?search=John+3:1-21&version=NIV' },
        { text: '約翰福音 19:38-42 (ESV)', url: 'https://www.biblegateway.com/passage/?search=John+19:38-42&version=ESV' },
      ]
    }
  },
  {
    id: 'q33',
    character: '撒瑪利亞婦人',
    characterImage: 'https://picsum.photos/seed/samaritan/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '當耶穌在井邊向我要水喝時，祂說祂能給我什麼？',
    options: [
      '往耶路撒冷的地圖。',,
      '活水，使人永遠不渴。',
      '一口新井。',
      '一個新水罐。'
    ],
    correctAnswerIndex: 1,
    explanation: '約翰福音4:13-14記載，耶穌回答說：「凡喝這水的還要再渴；人若喝我所賜的水就永遠不渴。我所賜的水要在他裡頭成為泉源，直湧到永生。」',
    journalPrompt: {
      title: '永生的泉源',
      content: '我們都在尋找能滿足心靈乾渴的東西。耶穌提供的不是暫時的滿足，而是永恆的生命之水。只有祂能真正滿足人心最深的渴望。'
    },
    deepDive: {
      title: '跨越文化的福音',
      content: '這個對話打破了多重界限：耶穌與撒瑪利亞人對話（猶太人所輕視的）、與女人單獨對話（不符合當時習俗）、與有道德問題的人對話（她有五個丈夫）。耶穌不僅沒有迴避她，反而向她啟示祂是彌賽亞。這個婦人成為第一位撒瑪利亞的宣教士，全城的人因她的見證來信耶穌。這顯示福音超越所有社會和文化障礙。',
      sources: [
        { text: '約翰福音 4:4-42 (NIV)', url: 'https://www.biblegateway.com/passage/?search=John+4:4-42&version=NIV' },
        { text: '以賽亞書 55:1 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Isaiah+55:1&version=ESV' },
      ]
    }
  },
  {
    id: 'q34',
    character: '百夫長',
    characterImage: 'https://picsum.photos/seed/centurion/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '當耶穌要到我家醫治我的僕人時，我對祂說了什麼？',
    options: [
      '我需要你來按手在他身上。',
      '請立刻到我家來。',
      '我不敢當，只要你說一句話，我的僕人就必好了。',
      '我要先支付醫療費用。',
    ],
    correctAnswerIndex: 2,
    explanation: '馬太福音8:8記載，百夫長回答說：「主啊，你到我舍下，我不敢當；只要你說一句話，我的僕人就必好了。」耶穌聽見就希奇，說：「我實在告訴你們，這麼大的信心，就是在以色列中，我也沒有遇見過。」',
    journalPrompt: {
      title: '權柄的認識',
      content: '百夫長認識權柄的運作，因此明白耶穌的話語本身就帶有醫治的能力。真實的信心不是看見才信，而是相信神的話語必定成就。'
    },
    deepDive: {
      title: '外邦人的信心',
      content: '這位羅馬軍官展現了超越許多猶太人的信心。他不僅關心他的僕人（在當時文化中不尋常），更認出耶穌超自然的權柄。耶穌用這個例子預言外邦人將進入天國，而許多本國的子民卻要被趕出去。這個事件預示了福音將傳給萬國，以及信心比種族血統更重要。',
      sources: [
        { text: '馬太福音 8:5-13 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Matthew+8:5-13&version=NIV' },
        { text: '路加福音 7:1-10 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Luke+7:1-10&version=ESV' },
      ]
    }
  },
  {
    id: 'q35',
    character: '抹大拉的馬利亞',
    characterImage: 'https://picsum.photos/seed/marymagdalene/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '復活的主日早晨，我是第一個看見什麼的人？',
    options: [
      '空的墳墓和復活的耶穌。',
      '門徒們聚集。',
      '守墓的羅馬兵丁。',
      '大祭司。',
    ],
    correctAnswerIndex: 0,
    explanation: '約翰福音20章記載，抹大拉的馬利亞清早到墳墓那裡，看見石頭從墳墓挪開了。她成為第一個看見空墳墓，以及第一個見到復活基督的人。耶穌託付她去告訴門徒這好消息。',
    journalPrompt: {
      title: '第一個見證人',
      content: '神選擇一位女性作為復活的第一個見證人，這在當時的文化中是革命性的。馬利亞的忠心愛慕使她最先經歷復活的喜樂。'
    },
    deepDive: {
      title: '從黑暗到光明',
      content: '抹大拉的馬利亞曾被七個鬼附著，耶穌釋放了她（路加福音8:2）。她從深深的綑綁中得釋放，成為最忠心的跟隨者之一，甚至在十字架下和空墳墓前都有她的身影。她的生命轉變和對基督的委身，使她有資格成為復活的第一個見證人。在當時女性見證不被法庭接受的文化中，這更顯示神對女性的重視和祂國度價值觀的顛覆性。',
      sources: [
        { text: '約翰福音 20:1-18 (NIV)', url: 'https://www.biblegateway.com/passage/?search=John+20:1-18&version=NIV' },
        { text: '路加福音 8:1-3 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Luke+8:1-3&version=ESV' },
      ]
    }
  },
  {
    id: 'q36',
    character: '多馬',
    characterImage: 'https://picsum.photos/seed/thomas/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '當其他門徒告訴我他們見到復活的主時，我說了什麼？',
    options: [
      '我們去慶祝吧！',,
      '我完全相信你們。',
      '我非看見他手上的釘痕，不能信。',
      '這太不可思議了！'
    ],
    correctAnswerIndex: 2,
    explanation: '約翰福音20:25記載，多馬說：「我非看見他手上的釘痕，用指頭探入那釘痕，又用手探入他的肋旁，我總不信。」八天後，耶穌向他顯現，邀請他觸摸祂的傷痕。',
    journalPrompt: {
      title: '疑惑到相信',
      content: '耶穌沒有責備多馬的疑惑，反而滿足了他的需要。但耶穌也說：「你因看見了我才信；那沒有看見就信的有福了。」信心不需要所有的證據，但神願意在我們的軟弱中遇見我們。'
    },
    deepDive: {
      title: '誠實的懷疑',
      content: '多馬常被稱為「疑惑的多馬」，但他的懷疑是誠實的，而不是頑固的不信。當他看見主時，他做出了福音書中最偉大的認信之一：「我的主！我的神！」（約20:28）。這是第一次有門徒直接稱呼耶穌為神。傳統認為多馬後來成為宣教士，將福音傳到印度，最終為信仰殉道。他從疑惑者變為殉道者的旅程，鼓勵我們帶著誠實的問題來到神面前。',
      sources: [
        { text: '約翰福音 20:24-29 (NIV)', url: 'https://www.biblegateway.com/passage/?search=John+20:24-29&version=NIV' },
        { text: '約翰福音 11:16 (ESV)', url: 'https://www.biblegateway.com/passage/?search=John+11:16&version=ESV' },
      ]
    }
  },
  {
    id: 'q37',
    character: '呂底亞',
    characterImage: 'https://picsum.photos/seed/lydia/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '在腓立比，當保羅傳道時，發生了什麼事？',
    options: [
      '眾人趕走保羅。',
      '主開導我的心，使我留心聽保羅所講的話。',
      '會堂被關閉。',,
      '沒有人願意聽。'
    ],
    correctAnswerIndex: 1,
    explanation: '使徒行傳16:14記載：「有一個賣紫色布匹的婦人，名叫呂底亞，是推雅推喇城的人，素來敬拜神。她聽見了，主就開導她的心，叫她留心聽保羅所講的話。」她和她一家都受了洗。',
    journalPrompt: {
      title: '心門的開啟',
      content: '呂底亞已經是敬拜神的人，但她需要主開導她的心才能真正明白福音。得救不僅是人的決定，更是神的工作。她的家成為保羅在歐洲的第一個宣教基地。'
    },
    deepDive: {
      title: '歐洲的第一位信徒',
      content: '呂底亞是歐洲第一位基督徒，她的歸信標誌著福音從亞洲傳到歐洲的歷史性時刻。作為成功的女商人（賣紫色布匹是高級生意），她運用自己的資源和影響力支持保羅的事工。她的家成為腓立比教會的聚會地點。腓立比書是保羅寫給這教會的信，充滿了喜樂和感恩，部分原因可能是呂底亞和其他信徒的慷慨支持。',
      sources: [
        { text: '使徒行傳 16:11-15 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Acts+16:11-15&version=NIV' },
        { text: '腓立比書 1:3-7 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Philippians+1:3-7&version=ESV' },
      ]
    }
  },
  {
    id: 'q38',
    character: '亞居拉和百基拉',
    characterImage: 'https://picsum.photos/seed/aquila/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '當我們遇見年輕傳道人亞波羅時，我們做了什麼？',
    options: [
      '私下將神的道給他講解更加詳細。',
      '公開批評他的教導。',
      '把他趕出會堂。',
      '忽視他的存在。',
    ],
    correctAnswerIndex: 0,
    explanation: '使徒行傳18:26記載：「他在會堂裡放膽講道，百基拉、亞居拉聽見，就接他來，將神的道給他講解更加詳細。」這對夫婦以智慧和愛心幫助亞波羅成長。',
    journalPrompt: {
      title: '謙卑的服事',
      content: '這對製作帳棚的夫婦展現了如何以恩慈和智慧造就他人。他們沒有公開糾正亞波羅，而是私下幫助他，使他成為更有效的神國工人。'
    },
    deepDive: {
      title: '平信徒的影響力',
      content: '亞居拉和百基拉是保羅同工的平信徒夫婦，他們以製作帳棚為生，同時積極參與宣教工作。保羅在多處書信中提到他們，稱他們為同工，甚至說他們「為我的命將自己的頸項置之度外」（羅馬書16:3-4）。他們的家成為教會聚會的地方。這對夫婦展示了平信徒如何在神的國度中發揮重大影響力，不需要全職事奉才能有效服事神。',
      sources: [
        { text: '使徒行傳 18:24-28 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Acts+18:24-28&version=NIV' },
        { text: '羅馬書 16:3-5 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Romans+16:3-5&version=ESV' },
      ]
    }
  },
  {
    id: 'q39',
    character: '腓利門',
    characterImage: 'https://picsum.photos/seed/philemon/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '保羅寫信給我，請求我如何對待逃跑的奴隸阿尼西母？',
    options: [
      '賣掉他。',,
      '把他送回羅馬。',
      '嚴厲懲罰他。',
      '接納他，不再當奴僕，乃是高過奴僕，當作親愛的兄弟。'
    ],
    correctAnswerIndex: 3,
    explanation: '腓利門書16節記載，保羅請求腓利門接納阿尼西母，「不再是奴僕，乃是高過奴僕，當作親愛的兄弟」。這封信展現了福音如何轉化社會關係。',
    journalPrompt: {
      title: '福音的轉化力量',
      content: '基督信仰沒有立即廢除奴隸制度，但它從內部轉化了這種關係。在基督裡，主人和奴隸都是弟兄。這種革命性的平等觀最終導致奴隸制的廢除。'
    },
    deepDive: {
      title: '饒恕與和解',
      content: '這封寫給腓利門的私人信件被包含在聖經中，因為它展現了福音如何處理人際衝突和社會不公。阿尼西母可能偷了主人的東西後逃跑，遇見保羅並成為基督徒。保羅沒有命令腓利門釋放阿尼西母，但他暗示這應該是結果。這種溫和但堅定的勸說方式，教導我們如何在權力不平等的情況下促進和解與公義。',
      sources: [
        { text: '腓利門書 1:8-21 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Philemon+1:8-21&version=NIV' },
        { text: '加拉太書 3:28 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Galatians+3:28&version=ESV' },
      ]
    }
  },
  {
    id: 'q40',
    character: '提摩太',
    characterImage: 'https://picsum.photos/seed/timothy/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '保羅寫信提醒我，不可因為什麼而叫人小看我？',
    options: [
      '我的財富不多。',
      '我沒有受過高等教育。',
      '我年輕。',
      '我不是猶太人。',
    ],
    correctAnswerIndex: 2,
    explanation: '提摩太前書4:12記載：「不可叫人小看你年輕，總要在言語、行為、愛心、信心、清潔上，都作信徒的榜樣。」保羅鼓勵年輕的提摩太不要因年齡而自卑。',
    journalPrompt: {
      title: '忠心勝過年齡',
      content: '提摩太雖然年輕，卻被委以重任牧養以弗所教會。神不看外貌或年齡，祂看重的是忠心和品格。年輕人可以在信仰上成為榜樣。'
    },
    deepDive: {
      title: '屬靈父子',
      content: '保羅與提摩太的關係展現了屬靈導師的美好典範。保羅稱提摩太為「我親愛的兒子」、「因信主作我真兒子的」。提摩太從小被敬虔的外祖母羅以和母親友尼基教導聖經（提後1:5，3:15）。他後來成為保羅最信任的同工之一。保羅寫給他的兩封書信充滿了實用的牧會建議和深情的關懷，是跨代門徒訓練的經典範例。',
      sources: [
        { text: '提摩太前書 4:12-16 (NIV)', url: 'https://www.biblegateway.com/passage/?search=1+Timothy+4:12-16&version=NIV' },
        { text: '提摩太後書 1:3-7 (ESV)', url: 'https://www.biblegateway.com/passage/?search=2+Timothy+1:3-7&version=ESV' },
      ]
    }
  },
  {
    id: 'q41',
    character: '雅各（主的兄弟）',
    characterImage: 'https://picsum.photos/seed/jamesbrother/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '在我的書信中，我如何描述真實的信心？',
    options: [
      '沒有行為的信心是死的。',
      '信心不需要任何證明。',
      '信心是私人的事，不需要表現出來。',,
      '信心只要存在心裡就夠了。'
    ],
    correctAnswerIndex: 0,
    explanation: '雅各書2:26寫道：「身體沒有靈魂是死的，信心沒有行為也是死的。」雅各強調真實的信心必然會在生活中結出行為的果子。',
    journalPrompt: {
      title: '活潑的信心',
      content: '雅各的教導不是與保羅的因信稱義矛盾，而是補充。保羅強調我們是因信得救，不是靠行為；雅各強調真實的信心必然產生行為。兩者都是真理。'
    },
    deepDive: {
      title: '從懷疑到領袖',
      content: '雅各是耶穌的親弟弟，但在耶穌傳道期間，他並不相信耶穌（約7:5）。復活後的顯現改變了他（林前15:7），他成為耶路撒冷教會的領袖。優西比烏記載他被稱為「公義的雅各」，因為他的敬虔生活。他最終為信仰殉道。雅各書是最實用的新約書信之一，強調信心與生活的結合，特別關注社會公義、馴服舌頭、和禱告的力量。',
      sources: [
        { text: '雅各書 2:14-26 (NIV)', url: 'https://www.biblegateway.com/passage/?search=James+2:14-26&version=NIV' },
        { text: '加拉太書 2:9 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Galatians+2:9&version=ESV' },
      ]
    }
  },
  {
    id: 'q42',
    character: '西拉',
    characterImage: 'https://picsum.photos/seed/silas/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '當我和保羅在腓立比監獄中被毒打並關押時，我們做了什麼？',
    options: [
      '大聲抱怨不公。',
      '約在半夜，我們禱告唱詩讚美神。',
      '放棄了信仰。',,
      '計畫逃獄。'
    ],
    correctAnswerIndex: 1,
    explanation: '使徒行傳16:25記載：「約在半夜，保羅和西拉禱告唱詩讚美神，眾囚犯也側耳而聽。」忽然地大震動，監門全開，眾囚犯的鎖鍊也都鬆開了。禁卒和他全家因此信主。',
    journalPrompt: {
      title: '患難中的讚美',
      content: '保羅和西拉在極端痛苦中選擇讚美神。他們的見證不只感動了獄卒，也成為歷代信徒在患難中的榜樣。真實的信心在逆境中更加閃耀。'
    },
    deepDive: {
      title: '同工的力量',
      content: '西拉（又名西拉斯）是耶路撒冷教會的領袖，被選為將使徒會議決定帶給外邦教會的使者。當保羅和巴拿巴分開後，西拉成為保羅第二次宣教旅程的夥伴。他不只是助手，更是同等的同工，被稱為先知。他與保羅一起經歷了腓立比的監獄、帖撒羅尼迦的暴亂、和庇哩亞的歡迎。後來他協助彼得寫信（彼前5:12）。他的事工展示了忠心同工的重要性。',
      sources: [
        { text: '使徒行傳 16:16-34 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Acts+16:16-34&version=NIV' },
        { text: '帖撒羅尼迦前書 1:1 (ESV)', url: 'https://www.biblegateway.com/passage/?search=1+Thessalonians+1:1&version=ESV' },
      ]
    }
  },
  {
    id: 'q43',
    character: '亞波羅',
    characterImage: 'https://picsum.photos/seed/apollos/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '當我在以弗所傳道時，我對舊約聖經的知識如何？',
    options: [
      '我完全不懂聖經。',
      '我只讀過新約。',
      '最有學問，最能講解聖經，但只曉得約翰的洗禮。',
      '我從不引用聖經。',
    ],
    correctAnswerIndex: 2,
    explanation: '使徒行傳18:24-25形容亞波羅「是有學問的，最能講解聖經。這人已經在主的道上受了教訓，心裡火熱，將耶穌的事詳細講論教訓人；只是他單曉得約翰的洗禮。」',
    journalPrompt: {
      title: '持續的學習',
      content: '亞波羅雖然有學問、熱心，但仍需要更完全的認識。他謙卑地接受百基拉和亞居拉的指導，成為更有效的工人。我們都需要持續學習和成長。'
    },
    deepDive: {
      title: '恩賜與合一',
      content: '亞波羅後來在哥林多大有能力，公開駁倒猶太人，引聖經證明耶穌是基督（徒18:28）。但哥林多教會有人說「我是屬亞波羅的」，引起分黨（林前1:12）。保羅在林前3:5-9澄清：他栽種，亞波羅澆灌，但使植物生長的是神。他們都是神的同工。這教導我們，不同的恩賜和角色應該互補，而非競爭。保羅甚至勸亞波羅去哥林多（林前16:12），顯示他們之間的合一。',
      sources: [
        { text: '使徒行傳 18:24-28 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Acts+18:24-28&version=NIV' },
        { text: '哥林多前書 3:4-9 (ESV)', url: 'https://www.biblegateway.com/passage/?search=1+Corinthians+3:4-9&version=ESV' },
      ]
    }
  },
  {
    id: 'q44',
    character: '腓利（執事）',
    characterImage: 'https://picsum.photos/seed/philipdeacon/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '當聖靈引導我去曠野的路上時，我遇見了誰？',
    options: [
      '一位羅馬將軍。',
      '耶路撒冷的祭司。',,
      '一群盜賊。',
      '一位埃提阿伯的太監，正在讀以賽亞書。'
    ],
    correctAnswerIndex: 3,
    explanation: '使徒行傳8:27-35記載，腓利遇見一位埃提阿伯太監，正在讀以賽亞書53章。腓利向他講解這段經文指向耶穌，太監立刻要求受洗，成為非洲第一位基督徒。',
    journalPrompt: {
      title: '聖靈的引導',
      content: '腓利順服聖靈的引導，離開撒馬利亞的復興，去曠野只向一個人傳福音。神看重每一個靈魂。我們需要敏銳於聖靈的帶領，即使看似不合邏輯。'
    },
    deepDive: {
      title: '從管飯食到傳福音',
      content: '腓利原本被選為七位執事之一，管理飯食服事寡婦（徒6:1-6）。但他不滿足於此，成為強有力的佈道家。司提反殉道後，他將福音帶到撒馬利亞，帶領許多人歸主，甚至行神蹟。與太監的相遇後，他又被聖靈提去，在沿海一帶傳道。多年後，保羅訪問他在該撒利亞的家，他有四個女兒都作先知（徒21:8-9）。腓利的一生展示忠心從小事開始，但可以發展成偉大的事工。',
      sources: [
        { text: '使徒行傳 8:26-40 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Acts+8:26-40&version=NIV' },
        { text: '使徒行傳 21:8-9 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Acts+21:8-9&version=ESV' },
      ]
    }
  },
  {
    id: 'q45',
    character: '哥尼流',
    characterImage: 'https://picsum.photos/seed/cornelius/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '作為外邦人，神用什麼方式告訴我要邀請彼得來我家？',
    options: [
      '我在聖殿聽見聲音。',
      '透過夢。',
      '保羅來拜訪我。',,
      '天使在異象中向我顯現。'
    ],
    correctAnswerIndex: 3,
    explanation: '使徒行傳10:3-6記載：「有一天，約在申初，他在異象中明明看見神的一個使者進去，到他那裡，說：哥尼流。」天使指示他派人到約帕去請彼得來。同時，神也給彼得異象，預備他打破猶太傳統去外邦人家。',
    journalPrompt: {
      title: '福音跨越藩籬',
      content: '哥尼流是敬畏神的外邦人，但直到彼得來傳講耶穌，他才完全明白福音。神同時預備了尋求者和傳道者。福音是為萬民預備的。'
    },
    deepDive: {
      title: '教會歷史的轉捩點',
      content: '哥尼流是羅馬百夫長，卻虔誠敬拜以色列的神。他樂善好施，常常禱告。他的歸信標誌著教會歷史的重大轉變：外邦人可以不經過猶太律法直接成為基督徒。當聖靈降在哥尼流和他家人身上時，彼得驚奇地說：「這些人既受了聖靈，與我們一樣，誰能禁止用水給他們施洗呢？」（徒10:47）。這個事件成為後來耶路撒冷會議的關鍵先例（徒15章）。',
      sources: [
        { text: '使徒行傳 10:1-48 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Acts+10:1-48&version=NIV' },
        { text: '使徒行傳 11:1-18 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Acts+11:1-18&version=ESV' },
      ]
    }
  },
  {
    id: 'q46',
    character: '巴拿巴',
    characterImage: 'https://picsum.photos/seed/barnabas/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '我的名字「巴拿巴」是什麼意思？',
    options: [
      '智慧者',
      '勸慰子',
      '勇士',,
      '大力士'
    ],
    correctAnswerIndex: 1,
    explanation: '使徒行傳4:36記載：「有一個利未人，生在居比路，名叫約瑟，使徒稱他為巴拿巴（巴拿巴翻出來就是勸慰子）。」他的名字完美描述了他的恩賜和性格。',
    journalPrompt: {
      title: '鼓勵者的恩賜',
      content: '巴拿巴看見別人的潛力，願意給人第二次機會。他引薦保羅給使徒，給馬可第二次服事的機會。教會需要更多像巴拿巴這樣的鼓勵者。'
    },
    deepDive: {
      title: '好人與犧牲',
      content: '聖經形容巴拿巴是「好人，被聖靈充滿，大有信心」（徒11:24）。他賣了田產，將錢財帶來放在使徒腳前。當保羅歸主後沒人敢接納他時，巴拿巴勇敢為他擔保。他邀請保羅一起在安提阿服事，甚至主動讓保羅成為主要的講道者。後來他們因馬可的事分開，巴拿巴選擇給馬可第二次機會。保羅後來承認馬可對他有益處（提後4:11），證明巴拿巴的眼光是對的。',
      sources: [
        { text: '使徒行傳 4:36-37 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Acts+4:36-37&version=NIV' },
        { text: '使徒行傳 15:36-41 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Acts+15:36-41&version=ESV' },
      ]
    }
  },
  {
    id: 'q47',
    character: '以巴弗',
    characterImage: 'https://picsum.photos/seed/epaphras/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '保羅如何描述我為歌羅西教會的禱告？',
    options: [
      '常常竭力為你們祈求，願你們在神一切的旨意上得以完全。',
      '只在主日為他們禱告。',,
      '從不為他們禱告。',
      '偶爾為他們禱告。'
    ],
    correctAnswerIndex: 0,
    explanation: '歌羅西書4:12記載，保羅說：「有你們那裡的人，作基督耶穌僕人的以巴弗問你們安。他在禱告之間，常為你們竭力的祈求，願你們在神一切的旨意上得以完全，信心充足，能站立得穩。」',
    journalPrompt: {
      title: '代禱的事工',
      content: '以巴弗可能建立了歌羅西教會，但他最大的事工是恆切的代禱。有時神呼召我們的事工不在前線，而是在禱告的密室中。忠心的代禱是有永恆價值的服事。'
    },
    deepDive: {
      title: '無名英雄',
      content: '以巴弗的名字在新約中只出現兩次，但每次都與禱告有關。保羅稱他為「親愛的同工」和「我一同坐監的」（門1:23）。他可能因福音的緣故與保羅同時被監禁。雖然他沒有像保羅那樣寫書信或建立眾多教會，但他忠心的代禱和服事卻被記錄在聖經中。教會需要更多像以巴弗這樣願意在背後竭力禱告的無名英雄。',
      sources: [
        { text: '歌羅西書 4:12-13 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Colossians+4:12-13&version=NIV' },
        { text: '歌羅西書 1:7-8 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Colossians+1:7-8&version=ESV' },
      ]
    }
  },
  {
    id: 'q48',
    character: '非比',
    characterImage: 'https://picsum.photos/seed/phoebe/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '保羅如何介紹我給羅馬教會？',
    options: [
      '堅革哩教會的女執事，素來幫助許多人。',
      '普通信徒。',
      '一位訪客。',,
      '我的學生。'
    ],
    correctAnswerIndex: 0,
    explanation: '羅馬書16:1-2記載：「我對你們舉薦我們的姊妹非比，她是堅革哩教會中的女執事。請你們為主接待她，合乎聖徒的體統。她在何事上要你們幫助，你們就幫助她，因她素來幫助許多人，也幫助了我。」',
    journalPrompt: {
      title: '服事的榜樣',
      content: '非比很可能是帶著羅馬書信去羅馬的人。她被稱為執事，是教會中有職分的服事者，也是許多人的幫助者。女性在早期教會擔任重要角色。'
    },
    deepDive: {
      title: '女性在教會中的角色',
      content: '非比被稱為「執事」（diakonos），與提摩太前書3:8-13中執事的資格用的是同一個詞。她也被稱為「幫助者」（prostatis），這個詞有領袖、庇護人的意思。她可能是富有的商人，資助保羅和其他工人。羅馬書16章提到多位女性同工：百基拉（保羅稱她為同工）、馬利亞（為你們多受勞苦）、土非拿氏和土富撒氏（在主裡勞碌）。早期教會中，女性積極參與各種服事。',
      sources: [
        { text: '羅馬書 16:1-2 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Romans+16:1-2&version=NIV' },
        { text: '羅馬書 16:3-16 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Romans+16:3-16&version=ESV' },
      ]
    }
  },
  {
    id: 'q49',
    character: '馬可（約翰馬可）',
    characterImage: 'https://picsum.photos/seed/mark/100',
    category: QuestionCategory.PERSON_IN_BIBLE,
    question: '在第一次宣教旅程中，我做了什麼導致保羅不再信任我？',
    options: [
      '我偷了奉獻。',
      '我從未跟他們一起去。',,
      '我在旁非利亞離開他們，回耶路撒冷去了。',
      '我公開批評保羅。'
    ],
    correctAnswerIndex: 2,
    explanation: '使徒行傳13:13記載：「保羅和他的同人從帕弗開船，來到旁非利亞的別加，約翰就離開他們，回耶路撒冷去。」這導致保羅在第二次旅程時拒絕帶馬可同行，引發他與巴拿巴的分歧。',
    journalPrompt: {
      title: '失敗後的恢復',
      content: '馬可的早期失敗沒有定義他的一生。巴拿巴給他第二次機會，最終連保羅都承認他的價值。我們都會失敗，但神能恢復和使用願意成長的人。'
    },
    deepDive: {
      title: '從失敗到福音作者',
      content: '馬可的母親馬利亞家中是早期教會的聚會地點（徒12:12）。他曾服事保羅、巴拿巴和彼得。雖然他在第一次宣教旅程中退出，但後來他成長成熟。保羅在晚年寫信給提摩太時說：「你來的時候，要把馬可帶來，因為他在傳道的事上於我有益處」（提後4:11）。彼得稱他為「我兒子馬可」（彼前5:13）。最重要的是，神使用他寫下馬可福音，成為四福音中最早寫成的。',
      sources: [
        { text: '使徒行傳 15:36-41 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Acts+15:36-41&version=NIV' },
        { text: '提摩太後書 4:11 (ESV)', url: 'https://www.biblegateway.com/passage/?search=2+Timothy+4:11&version=ESV' },
      ]
    }
  },
  {
    id: 'q50',
    character: '老底嘉教會',
    characterImage: 'https://picsum.photos/seed/laodicea/100',
    category: QuestionCategory.BIBLE_BACKGROUND,
    question: '在啟示錄中，主對我們教會最嚴厲的責備是什麼？',
    options: [
      '你們太熱心了。',,
      '你們也不冷也不熱，我必從我口中把你吐出去。',
      '你們被迫害。',
      '你們太窮了。'
    ],
    correctAnswerIndex: 1,
    explanation: '啟示錄3:16記載，主說：「你既如溫水，也不冷也不熱，所以我必從我口中把你吐出去。」老底嘉教會的問題是自滿和屬靈的不冷不熱。',
    journalPrompt: {
      title: '危險的不冷不熱',
      content: '老底嘉教會自以為富足，卻不知道自己在屬靈上是「困苦、可憐、貧窮、瞎眼、赤身的」。自滿是屬靈生命最危險的敵人。主呼籲：「我勸你向我買火煉的金子，叫你富足。」'
    },
    deepDive: {
      title: '七個教會的最後警告',
      content: '老底嘉是啟示錄七個教會中最後一個，也是唯一沒有受到任何稱讚的。這城市以銀行業、羊毛工業和眼藥聞名，導致屬靈的驕傲。它的水源是溫的，既不像希拉波立的熱水有療效，也不像歌羅西的冷水可解渴。主站在門外叩門（啟3:20），顯示祂已被排除在教會活動之外。這封信對今天富裕但屬靈冷淡的教會是嚴厲的警告。',
      sources: [
        { text: '啟示錄 3:14-22 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Revelation+3:14-22&version=NIV' },
        { text: '何西阿書 12:8 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Hosea+12:8&version=ESV' },
      ]
    }
  },
  // Academic Theology Layer - Hebrew Bible Studies
  {
    id: 'q51',
    character: '希伯來聖經學者',
    characterImage: 'https://picsum.photos/seed/hebrew-scholar/100',
    category: QuestionCategory.BIBLE_BACKGROUND,
    question: '希伯來聖經（Tanakh）的三個主要部分是什麼？',
    options: [
      '摩西五經、先知書、智慧文學',
      '歷史書、詩歌書、預言書',,
      '律法書（Torah）、先知書（Nevi\'im）、聖卷（Ketuvim）',
      '創世記、出埃及記、詩篇'
    ],
    correctAnswerIndex: 2,
    explanation: '希伯來聖經（Tanakh）分為三個主要部分：Torah（תּוֹרָה，律法書，五經）、Nevi\'im（נְבִיאִים，先知書）和Ketuvim（כְּתוּבִים，聖卷）。Tanakh這個名稱就是由這三個部分的首字母組成的縮寫（T-N-K）。',
    journalPrompt: {
      title: '希伯來聖經的結構',
      content: 'Tanakh的三重結構反映了猶太教對聖經不同部分的權威等級理解。Torah是最核心的，包含神的律法；Nevi\'im記載先知的教導；Ketuvim包含詩歌、智慧文學和其他著作。'
    },
    deepDive: {
      title: '希伯來聖經的正典形成',
      content: '希伯來聖經的正典化是一個漫長的過程。Torah在公元前5世紀已被普遍接受；先知書在公元前3世紀基本確定；聖卷的正典地位在公元90年左右的雅麥尼亞會議（Council of Jamnia）後才最終確立。這個三重結構也影響了基督教舊約的編排方式，雖然順序有所不同。',
      sources: [
        { text: '路加福音 24:44 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Luke+24:44&version=NIV' },
        { text: 'Hebrew Bible Structure', url: 'https://www.jewishvirtuallibrary.org/the-tanakh' },
      ]
    }
  },
  {
    id: 'q52',
    character: '文本批評學者',
    characterImage: 'https://picsum.photos/seed/textual-critic/100',
    category: QuestionCategory.BIBLE_BACKGROUND,
    question: '馬索拉文本（Masoretic Text）在希伯來聖經研究中的重要性是什麼？',
    options: [
      '它是標準的希伯來聖經文本，包含母音符號和註釋系統',
      '它是死海古卷的另一個名稱',,
      '它是希伯來聖經的希臘文翻譯',
      '它是最早的希伯來文手抄本'
    ],
    correctAnswerIndex: 0,
    explanation: '馬索拉文本（MT）是公元7-10世紀由馬索拉學者（Masoretes）精心編纂的希伯來聖經標準文本。他們添加了母音符號（nikkud）、音調記號（ta\'amim）和邊註，確保正確讀音和詮釋，成為現代希伯來聖經研究和翻譯的主要依據。',
    journalPrompt: {
      title: '聖經文本的傳承',
      content: '馬索拉學者對聖經文本的細緻保存工作展現了對神話語的敬畏。他們不僅抄寫文字，還發展出複雜的計數和檢查系統，確保每一個字母都準確無誤。'
    },
    deepDive: {
      title: '文本批判與聖經可靠性',
      content: '馬索拉文本的發現和研究，特別是與死海古卷（公元前3世紀至公元1世紀）的對比，證明了希伯來聖經傳抄的驚人準確性。雖然存在一些異文（textual variants），但絕大多數是拼寫差異，核心內容保持一致。這為聖經的可靠性提供了強有力的證據。列寧格勒抄本（Leningrad Codex, 1008 CE）是現存最古老的完整馬索拉文本，也是《希伯來聖經》（BHS）的底本。',
      sources: [
        { text: '以賽亞書 40:8 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Isaiah+40:8&version=ESV' },
        { text: 'Masoretic Text Overview', url: 'https://www.britannica.com/topic/Masoretic-text' },
      ]
    }
  },
  {
    id: 'q53',
    character: '語言學家',
    characterImage: 'https://picsum.photos/seed/linguist/100',
    category: QuestionCategory.BIBLE_BACKGROUND,
    question: '希伯來聖經中使用的主要語言是什麼？有哪些例外？',
    options: [
      '希伯來文為主，但但以理書和以斯拉記部分用亞蘭文',
      '亞蘭文為主，少部分希伯來文',,
      '希伯來文和希臘文混合',
      '全部用希伯來文書寫'
    ],
    correctAnswerIndex: 0,
    explanation: '希伯來聖經主要用古希伯來文書寫，但有重要例外：但以理書2:4-7:28和以斯拉記4:8-6:18、7:12-26用帝國亞蘭文（Imperial Aramaic）書寫。亞蘭文在波斯帝國時期成為近東的通用語言，反映了猶太人在被擄時期的語言環境變化。',
    journalPrompt: {
      title: '語言與歷史背景',
      content: '聖經使用不同語言反映了以色列民族的歷史變遷。希伯來文代表早期民族身份，亞蘭文顯示被擄時期的文化影響，這些語言選擇本身就講述著神子民的故事。'
    },
    deepDive: {
      title: '閃族語言與聖經研究',
      content: '希伯來文和亞蘭文都屬於閃族語系的西北支。理解這些語言的特點對解經至關重要：1) 它們是子音文字，母音後來才添加；2) 詞根系統（通常是三個子音）表達核心意義；3) 動詞時態表達完成/未完成狀態而非時間；4) 豐富的並行體（parallelism）用於詩歌。此外，耶利米書10:11有一節完全用亞蘭文，創世記31:47也有亞蘭文地名。',
      sources: [
        { text: '但以理書 2:4 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Daniel+2:4&version=NIV' },
        { text: 'Biblical Languages', url: 'https://www.britannica.com/topic/biblical-literature' },
      ]
    }
  },
  {
    id: 'q54',
    character: '文學批評學者',
    characterImage: 'https://picsum.photos/seed/literary-critic/100',
    category: QuestionCategory.BIBLE_BACKGROUND,
    question: '希伯來詩歌的主要文學特徵是什麼？',
    options: [
      '平行體（Parallelism）和意象',
      '十四行詩結構',
      '無韻自由詩',,
      '押韻和格律'
    ],
    correctAnswerIndex: 0,
    explanation: '希伯來詩歌的核心特徵是平行體（Parallelism），而非押韻。主要類型包括：同義平行（synonymous，重複相同意思）、反義平行（antithetical，對比相反意思）、綜合平行（synthetic，擴展前句意思）。詩篇、箴言、約伯記和先知書廣泛使用這種結構。',
    journalPrompt: {
      title: '聖經詩歌的美學',
      content: '平行體不僅是文學技巧，更是神學表達方式。透過重複、對比和擴展，希伯來詩歌幫助讀者深入默想真理，讓神的話語在心中迴響。'
    },
    deepDive: {
      title: '希伯來詩歌的多層結構',
      content: '除了平行體，希伯來詩歌還包含其他特徵：1) 字母離合詩（acrostic），如詩篇119篇每段以希伯來字母順序開頭；2) 交錯配列法（chiasm），如詩篇51:1-2的ABBA結構；3) 包孕法（inclusio），首尾呼應；4) 豐富的隱喻和擬人化。理解這些特徵幫助我們欣賞聖經詩歌的深度和美感，也避免過度字面化解釋詩意表達。',
      sources: [
        { text: '詩篇 19:1-2 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Psalm+19:1-2&version=ESV' },
        { text: 'Hebrew Poetry Characteristics', url: 'https://www.britannica.com/art/biblical-literature/Poetry' },
      ]
    }
  },
  // Old Testament Introduction
  {
    id: 'q55',
    character: '舊約學者',
    characterImage: 'https://picsum.photos/seed/ot-scholar/100',
    category: QuestionCategory.BIBLE_BACKGROUND,
    question: '舊約聖經與希伯來聖經的主要差異是什麼？',
    options: [
      '舊約比希伯來聖經多了新約',
      '書卷順序和分類方式不同',
      '內容完全不同',
      '語言翻譯不同但內容相同',
    ],
    correctAnswerIndex: 1,
    explanation: '基督教舊約和猶太教Tanakh包含相同的書卷（新教版本），但順序不同。舊約按歷史、詩歌、先知排列，以瑪拉基書結束，指向彌賽亞；Tanakh按Torah、Nevi\'im、Ketuvim排列，以歷代志結束，強調回歸與重建。天主教和東正教舊約還包含次經（Deuterocanonical books）。',
    journalPrompt: {
      title: '正典與神學視角',
      content: '同樣的經文，不同的編排順序反映不同的神學強調。基督教舊約的編排突顯了對彌賽亞的期盼，為新約預備道路。'
    },
    deepDive: {
      title: '七十士譯本與正典差異',
      content: '舊約編排差異部分源於七十士譯本（LXX，公元前3-2世紀希臘文翻譯）。早期教會主要使用LXX，它包含次經並重新編排書卷。新教改教者回歸希伯來正典（39卷），但保留LXX順序；天主教保留次經（46卷舊約書）；東正教包含更多書卷（50卷）。這些差異涉及「誰有權定義正典」的深層神學問題。',
      sources: [
        { text: '瑪拉基書 4:5-6 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Malachi+4:5-6&version=NIV' },
        { text: 'Old Testament Canon', url: 'https://www.britannica.com/topic/biblical-literature/The-Christian-canon' },
      ]
    }
  },
  {
    id: 'q56',
    character: '考古學家',
    characterImage: 'https://picsum.photos/seed/archaeologist/100',
    category: QuestionCategory.BIBLE_BACKGROUND,
    question: '哪一個考古發現對舊約研究最具革命性影響？',
    options: [
      '死海古卷',
      '特洛伊遺址',,
      '羅塞塔石碑',
      '圖坦卡門墓'
    ],
    correctAnswerIndex: 0,
    explanation: '1947年在昆蘭洞穴發現的死海古卷（Dead Sea Scrolls）是20世紀最重要的考古發現。它包含公元前3世紀至公元1世紀的約900份手抄本，證明聖經文本傳抄的準確性，並提供了第二聖殿時期猶太教的珍貴資料。',
    journalPrompt: {
      title: '考古學與信仰',
      content: '死海古卷的發現不僅證實聖經的可靠性，也讓我們一窺耶穌時代的猶太社群（如愛色尼派）如何理解和實踐信仰。'
    },
    deepDive: {
      title: '死海古卷的重要性',
      content: '死海古卷包含：1) 除以斯帖記外所有舊約書卷的片段或完整抄本；2) 以賽亞書完整卷軸，與馬索拉文本相差僅1000年但高度一致；3) 昆蘭社群的規章和註釋；4) 次經和偽經。這些發現幫助學者：理解經文異文、研究猶太教派別、追溯彌賽亞觀念發展、了解新約背景。例如，《哈巴谷書註釋》顯示昆蘭社群如何將先知書應用於當代。',
      sources: [
        { text: '以賽亞書 40:8 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Isaiah+40:8&version=ESV' },
        { text: 'Dead Sea Scrolls', url: 'https://www.deadseascrolls.org.il/' },
      ]
    }
  },
  {
    id: 'q57',
    character: '文獻假說學者',
    characterImage: 'https://picsum.photos/seed/documentary/100',
    category: QuestionCategory.BIBLE_BACKGROUND,
    question: '「文獻假說」（Documentary Hypothesis）主要論述什麼？',
    options: [
      '所有舊約書卷都失傳了',,
      '舊約全是後期偽造的',
      '摩西五經由單一作者一次寫成',
      '摩西五經是由多個文獻來源（J、E、D、P）編輯而成'
    ],
    correctAnswerIndex: 3,
    explanation: '文獻假說（又稱JEDP理論）由Julius Wellhausen在19世紀提出，認為摩西五經由四個主要來源編輯而成：J（耶和華文獻）、E（以羅欣文獻）、D（申命記文獻）、P（祭司文獻）。這個理論引發了關於摩西五經作者和成書過程的廣泛學術討論。',
    journalPrompt: {
      title: '批判學術與信仰',
      content: '文獻假說提醒我們聖經成書過程的複雜性。無論接受與否，這個理論促使信徒更深入思考聖靈如何引導人類作者，以及默示的本質。'
    },
    deepDive: {
      title: '文獻假說的評估',
      content: '文獻假說基於：1) 神的不同名稱（YHWH vs. Elohim）；2) 重複敘事（如兩個創造故事）；3) 語言和風格差異；4) 神學觀點變化。批評者指出：1) 古代近東文學常用多個神名；2) 重複可能是文學技巧；3) 摩西可能使用早期資料；4) 考古證據支持早期成書。現代學者發展出補充假說、片段假說等替代理論。保守學者維護摩西實質作者權，但承認後期編輯。',
      sources: [
        { text: '申命記 31:24-26 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Deuteronomy+31:24-26&version=NIV' },
        { text: 'Documentary Hypothesis', url: 'https://www.britannica.com/topic/documentary-hypothesis' },
      ]
    }
  },
  {
    id: 'q58',
    character: '神學家',
    characterImage: 'https://picsum.photos/seed/theologian1/100',
    category: QuestionCategory.BIBLE_BACKGROUND,
    question: '「約」（Covenant）在舊約神學中的核心地位體現在哪裡？',
    options: [
      '約只是次要主題',
      '約只出現在新約',
      '約等同於律法',,
      '約是理解神與人關係的核心框架'
    ],
    correctAnswerIndex: 3,
    explanation: '約（berit）是舊約的核心神學概念，結構化了神與人的關係。主要的約包括：挪亞之約（創9）、亞伯拉罕之約（創15,17）、西奈之約（出19-24）、大衛之約（撒下7）。這些約逐步揭示神的救贖計劃，最終指向耶利米預言的新約（耶31:31-34）。',
    journalPrompt: {
      title: '約的神學',
      content: '聖約顯示神是主動、信實的一位。祂不是遙不可及的哲學概念，而是與人立約、建立關係的神。每個約都揭示祂救贖計劃的一個層面。'
    },
    deepDive: {
      title: '約的類型與結構',
      content: '舊約的約借鑑了古代近東宗主條約（Suzerain-Vassal Treaty）的形式：1) 序言（確認立約者）；2) 歷史序言（回顧關係）；3) 條款（義務）；4) 見證人；5) 祝福與咒詛。申命記完美體現這個結構。但聖經的約超越政治條約：亞伯拉罕之約是無條件的恩典之約；西奈之約是條件性的；大衛之約是永恆的王權應許。新約（New Covenant）在基督裡應驗所有舊約，寫在人心版上（耶31:33；來8:10）。',
      sources: [
        { text: '耶利米書 31:31-34 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Jeremiah+31:31-34&version=ESV' },
        { text: 'Covenant Theology', url: 'https://www.britannica.com/topic/covenant-theology' },
      ]
    }
  },
  // New Testament Introduction
  {
    id: 'q59',
    character: '新約學者',
    characterImage: 'https://picsum.photos/seed/nt-scholar/100',
    category: QuestionCategory.BIBLE_BACKGROUND,
    question: '新約的27卷書主要用什麼語言寫成？',
    options: [
      '拉丁文',,
      '希伯來文',
      '通用希臘文（Koine Greek）',
      '亞蘭文'
    ],
    correctAnswerIndex: 2,
    explanation: '新約全部用通用希臘文（Koine Greek）寫成，這是公元前3世紀至公元6世紀地中海世界的通用語言。雖然耶穌和使徒可能說亞蘭文，但他們選擇用希臘文記錄福音，使信息能傳遍羅馬帝國。',
    journalPrompt: {
      title: '神的時機與工具',
      content: '神使用希臘文作為新約語言不是偶然。亞歷山大大帝的征服建立了希臘化世界，羅馬的道路系統便利旅行，通用希臘文讓福音迅速傳播——「時候滿足」（加4:4）。'
    },
    deepDive: {
      title: 'Koine希臘文的特點',
      content: 'Koine（κοινή，意為「通用的」）是簡化的希臘文，不同於古典希臘文。特點：1) 簡化語法；2) 減少虛擬語氣；3) 大量外來語（如希伯來文、亞蘭文）；4) 更接近口語。19世紀紙草文獻的發現證明新約用的是普通人的語言，而非宗教術語。這反映了福音的平民性——不是精英哲學，而是給萬人的好消息。馬太福音可能有希伯來文或亞蘭文版本，但現存只有希臘文。',
      sources: [
        { text: '使徒行傳 21:37-40 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Acts+21:37-40&version=NIV' },
        { text: 'Koine Greek', url: 'https://www.britannica.com/topic/Koine' },
      ]
    }
  },
  {
    id: 'q60',
    character: '正典研究學者',
    characterImage: 'https://picsum.photos/seed/canon-scholar/100',
    category: QuestionCategory.BIBLE_BACKGROUND,
    question: '新約正典的27卷書何時最終確立？',
    options: [
      '使徒保羅時代立即確定',
      '宗教改革時期',,
      '第四世紀（如公元367年亞他那修的復活節書信）',
      '第一世紀結束前'
    ],
    correctAnswerIndex: 2,
    explanation: '新約正典的確立是漸進過程。公元367年，亞歷山大主教亞他那修（Athanasius）在復活節書信中首次列出今天的27卷新約書目。公元397年迦太基會議（Council of Carthage）正式確認這個正典，但教會實質上在更早就廣泛接受這些書卷。',
    journalPrompt: {
      title: '正典的形成',
      content: '正典不是由會議「創造」的，而是教會「承認」聖靈已在信徒群體中見證為真的書卷。標準包括：使徒性、正統性、大公性（普遍接受）、默示性。'
    },
    deepDive: {
      title: '正典形成的標準與爭議',
      content: '早期教會用四個標準判斷正典：1) 使徒性（apostolic）——由使徒或使徒同工寫作；2) 正統性（orthodoxy）——符合使徒教導；3) 大公性（catholicity）——被眾教會廣泛使用；4) 默示性（inspiration）——聖靈見證。有爭議的書卷（Antilegomena）包括：希伯來書、雅各書、彼得後書、約翰二三書、猶大書、啟示錄。偽經如《多馬福音》因缺乏使徒性和正統性被拒。穆拉多利殘卷（Muratorian Fragment, ~170 AD）是最早的新約正典清單。',
      sources: [
        { text: '啟示錄 22:18-19 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Revelation+22:18-19&version=ESV' },
        { text: 'New Testament Canon', url: 'https://www.britannica.com/topic/biblical-literature/New-Testament-canon' },
      ]
    }
  },
  {
    id: 'q61',
    character: '福音書研究專家',
    characterImage: 'https://picsum.photos/seed/gospel-scholar/100',
    category: QuestionCategory.BIBLE_BACKGROUND,
    question: '「符類福音問題」（Synoptic Problem）探討什麼議題？',
    options: [
      '約翰福音為何不同',,
      '福音書的歷史可靠性',
      '馬太、馬可、路加三福音之間的文學關係',
      '為什麼只有三本福音書'
    ],
    correctAnswerIndex: 2,
    explanation: '符類福音問題探討馬太、馬可、路加（稱為符類福音，因可並排比較）之間的相似性和差異性。主流理論是「馬可優先說」（Marcan Priority）加「Q來源」假說：馬可最早，馬太和路加使用馬可加上共同來源Q（德文Quelle，意為「來源」）。',
    journalPrompt: {
      title: '多元見證的價值',
      content: '四福音提供四個視角看同一位基督。馬可強調耶穌的行動（僕人），馬太強調教導（君王），路加強調憐憫（完全的人），約翰強調神性（神的兒子）。這豐富我們對基督的認識。'
    },
    deepDive: {
      title: '符類福音理論',
      content: '主要理論：1) 馬可優先說（Marcan Priority）：馬可最早（~65-70 AD），馬太和路加獨立使用馬可；2) Q來源假說：馬太和路加共享約250節馬可沒有的內容，推測來自失傳的語錄來源Q；3) M和L來源：馬太和路加各自獨特的材料。替代理論包括：Griesbach假說（馬太最早）、Farrer假說（無需Q，路加用馬太）。這些討論幫助我們理解福音書作者如何在聖靈引導下選擇、編排材料，為不同讀者呈現基督。',
      sources: [
        { text: '路加福音 1:1-4 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Luke+1:1-4&version=NIV' },
        { text: 'Synoptic Problem', url: 'https://www.britannica.com/topic/Synoptic-Problem' },
      ]
    }
  },
  {
    id: 'q62',
    character: '保羅書信專家',
    characterImage: 'https://picsum.photos/seed/paul-scholar/100',
    category: QuestionCategory.BIBLE_BACKGROUND,
    question: '保羅書信中哪些被普遍認為是無可爭議的真保羅書信？',
    options: [
      '全部都有爭議',,
      '羅馬書、哥林多前後書、加拉太書、腓立比書、帖撒羅尼迦前書、腓利門書（7封）',
      '全部13封保羅書信',
      '只有羅馬書和加拉太書'
    ],
    correctAnswerIndex: 1,
    explanation: '學者們普遍接受7封為無可爭議的保羅真作（Undisputed Paulines）：羅馬書、哥林多前後書、加拉太書、腓立比書、帖撒羅尼迦前書、腓利門書。教牧書信（提摩太前後書、提多書）和以弗所書、歌羅西書的作者身份仍有學術爭議，但傳統教會普遍接受為保羅所寫。',
    journalPrompt: {
      title: '保羅的神學遺產',
      content: '即使在學術爭議中，保羅書信的神學價值不變。因信稱義、在基督裡的新創造、教會作為基督身體——這些真理塑造了基督教神學。'
    },
    deepDive: {
      title: '保羅書信的分類與爭議',
      content: '分類：1) 無爭議書信（7封）；2) 教牧書信（提前後、多）——風格和神學差異引發爭議；3) 監獄書信（弗、腓、西、門）——腓和門無爭議，弗和西有爭議；4) 希伯來書——早期教會有些歸於保羅,但現代學者幾乎一致認為非保羅所寫。爭議基於：詞彙差異、神學發展、教會組織成熟度。保守學者辯護：秘書協助、處境不同、神學發展。無論作者，正典地位基於使徒性和默示性。',
      sources: [
        { text: '加拉太書 1:11-12 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Galatians+1:11-12&version=ESV' },
        { text: 'Pauline Epistles Authorship', url: 'https://www.britannica.com/biography/Saint-Paul-the-Apostle/The-Pauline-letters' },
      ]
    }
  },
  // Sources of Testaments
  {
    id: 'q63',
    character: '文獻學家',
    characterImage: 'https://picsum.photos/seed/manuscript-scholar/100',
    category: QuestionCategory.BIBLE_BACKGROUND,
    question: '現存最早的完整新約手抄本是哪一份？',
    options: [
      '穆拉多利殘卷',
      '西奈抄本（Codex Sinaiticus）',
      '武加大譯本',,
      '死海古卷'
    ],
    correctAnswerIndex: 1,
    explanation: '西奈抄本（Codex Sinaiticus，約公元330-360年）是現存最早的完整新約手抄本之一，也包含部分舊約。它與梵蒂岡抄本（Codex Vaticanus，約公元300-325年）一起，是新約文本批判最重要的見證。',
    journalPrompt: {
      title: '手抄本的見證',
      content: '神奇妙地保存了數千份新約手抄本（超過5800份希臘文手抄本），遠超任何古代文獻。這些手抄本的數量和一致性證明新約的可靠傳承。'
    },
    deepDive: {
      title: '新約手抄本的分類',
      content: '新約手抄本分為：1) 紙草抄本（Papyri）——最早（如P52，約125 AD，含約翰福音片段）；2) 安色爾字體抄本（Uncials）——大寫字母，4-8世紀（如א西奈抄本、B梵蒂岡抄本、A亞歷山大抄本、D貝撒抄本）；3) 小楷字體抄本（Minuscules）——小寫字母，9世紀後，數量最多；4) 經課集（Lectionaries）——禮拜用經文選集。文本批判學者比較這些手抄本，重建最接近原文的經文。雖有異文（variants），但99%是拼寫差異，無一影響核心教義。',
      sources: [
        { text: '彼得前書 1:24-25 (NIV)', url: 'https://www.biblegateway.com/passage/?search=1+Peter+1:24-25&version=NIV' },
        { text: 'Codex Sinaiticus', url: 'https://www.codexsinaiticus.org/' },
      ]
    }
  },
  {
    id: 'q64',
    character: '翻譯史學者',
    characterImage: 'https://picsum.photos/seed/translation-scholar/100',
    category: QuestionCategory.BIBLE_BACKGROUND,
    question: '七十士譯本（Septuagint，LXX）對早期基督教有何重要性？',
    options: [
      '它是舊約的希臘文翻譯，被新約作者廣泛引用',
      '它是拉丁文聖經',,
      '它是死海古卷的翻譯',
      '它是新約的希臘文版本'
    ],
    correctAnswerIndex: 0,
    explanation: '七十士譯本是公元前3-2世紀在亞歷山大完成的希伯來聖經希臘文翻譯，傳說由70位（或72位）學者翻譯而得名。新約作者引用舊約時，約有三分之二使用LXX。它也是早期教會（特別是講希臘語的外邦信徒）的主要舊約版本。',
    journalPrompt: {
      title: '跨文化的福音',
      content: 'LXX為福音預備道路。當猶太僑民散居各地，他們需要希臘文聖經；當外邦人歸主，他們能用熟悉的語言讀舊約。神在各個層面預備福音的傳播。'
    },
    deepDive: {
      title: '七十士譯本的影響',
      content: 'LXX的重要性：1) 新約引用——如以賽亞書7:14的「童女」（parthenos）概念來自LXX；2) 神學詞彙——如「logos」（道）、「kyrios」（主）等新約核心詞彙源於LXX；3) 正典範圍——LXX包含次經，影響天主教和東正教正典；4) 教父使用——早期教父如俄利根、奧古斯丁主要用LXX。亞歷山大草紙信（Letter of Aristeas）記載翻譯傳說。LXX與馬索拉文本有些差異，死海古卷顯示有些希伯來文底本確實不同。',
      sources: [
        { text: '使徒行傳 8:32-35 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Acts+8:32-35&version=ESV' },
        { text: 'Septuagint', url: 'https://www.britannica.com/topic/Septuagint' },
      ]
    }
  },
  {
    id: 'q65',
    character: '次經研究者',
    characterImage: 'https://picsum.photos/seed/apocrypha-scholar/100',
    category: QuestionCategory.BIBLE_BACKGROUND,
    question: '舊約次經（Apocrypha/Deuterocanonical Books）包含哪些書卷？',
    options: [
      '新約偽經',
      '死海古卷',
      '馬加比書、多比傳、猶滴傳等不在希伯來正典但在LXX中的書卷',
      '諾斯底福音書',
    ],
    correctAnswerIndex: 2,
    explanation: '次經（天主教稱「第二正典」）包括：多比傳、猶滴傳、所羅門智訓、便西拉智訓、巴錄書、馬加比一二書、以斯帖記補編、但以理書補編等。這些書在七十士譯本中，天主教和東正教接受為正典，但新教視為有益但非正典的著作。',
    journalPrompt: {
      title: '正典的界線',
      content: '次經的地位反映基督徒對「什麼是神的話語」有不同理解。無論如何，這些書提供兩約之間時期的歷史和屬靈洞見。'
    },
    deepDive: {
      title: '次經的歷史與神學爭議',
      content: '次經爭議源於：1) 希伯來正典不包含這些書（猶太教拉比在雅麥尼亞會議後確認）；2) 新約從未直接引用次經（雖有典故）；3) 早期教父意見分歧（耶柔米反對，奧古斯丁接受）。宗教改革時，路德將次經放在兩約之間，稱其「有益閱讀」；天特會議（Council of Trent, 1546）回應新教,正式確認次經為正典。次經包含：馬加比革命歷史、煉獄教義（馬加比下書12:43-45）、施捨贖罪（多比傳12:9）等。新教拒絕次經基於：唯獨聖經原則和希伯來正典權威。',
      sources: [
        { text: '啟示錄 22:18-19 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Revelation+22:18-19&version=NIV' },
        { text: 'Biblical Apocrypha', url: 'https://www.britannica.com/topic/biblical-literature/Apocrypha-and-Pseudepigrapha' },
      ]
    }
  },
  {
    id: 'q66',
    character: '古代譯本專家',
    characterImage: 'https://picsum.photos/seed/versions-scholar/100',
    category: QuestionCategory.BIBLE_BACKGROUND,
    question: '武加大譯本（Vulgate）在教會歷史中的角色是什麼？',
    options: [
      '英文聖經的第一個翻譯',
      '耶柔米翻譯的拉丁文聖經，成為天主教會的標準版本',
      '希伯來文舊約的註釋',,
      '最早的希臘文新約'
    ],
    correctAnswerIndex: 1,
    explanation: '武加大譯本是教父耶柔米（Jerome）在公元382-405年翻譯的拉丁文聖經。他從希伯來文翻譯舊約（而非依賴LXX），修訂了新約拉丁文翻譯。武加大成為天主教會一千多年的官方聖經版本，直到梵二大公會議後才鼓勵使用本地語言。',
    journalPrompt: {
      title: '神話語的可及性',
      content: '耶柔米將聖經翻譯成當時的通用語言拉丁文，使更多人能讀神的話。每個時代都需要忠實、清晰的翻譯，讓人能在自己的語言中遇見神。'
    },
    deepDive: {
      title: '武加大的歷史影響',
      content: '武加大的特點：1) 從希伯來文翻譯舊約，而非依賴LXX（耶柔米在伯利恆學習希伯來文）；2) 包含次經；3) 影響西方神學詞彙（如「sacramentum」=聖禮）。天特會議（1546）宣佈武加大為官方版本，回應新教改教者的希臘文/希伯來文原文運動。武加大影響：中世紀所有神學和禮拜；英語詞彙（許多KJV翻譯源於武加大）；藝術和文學（但丁、米爾頓）。1979年新武加大（Nova Vulgata）成為天主教禮拜用版本。',
      sources: [
        { text: '詩篇 119:105 (Vulgate: Lucerna pedibus meis)', url: 'https://www.biblegateway.com/passage/?search=Psalm+119:105&version=NIV' },
        { text: 'Vulgate', url: 'https://www.britannica.com/topic/Vulgate' },
      ]
    }
  },
  // Historical and Cultural Backgrounds
  {
    id: 'q67',
    character: '歷史學家',
    characterImage: 'https://picsum.photos/seed/historian1/100',
    category: QuestionCategory.BIBLE_BACKGROUND,
    question: '兩約之間時期（公元前400-公元1年）對理解新約有何重要性？',
    options: [
      '這段時期聖經仍在書寫',
      '這段時期見證猶太教派別（法利賽人、撒都該人、愛色尼派）的形成和希臘化影響',
      '這段時期無關緊要',
      '這段時期以色列獨立無外來影響',
    ],
    correctAnswerIndex: 1,
    explanation: '兩約之間時期（又稱「沉默的400年」）經歷波斯、希臘（亞歷山大及其繼承者）、羅馬統治。這段時期形成新約提及的猶太教派別、會堂制度、文士傳統、彌賽亞期盼加劇，以及希臘化文化影響。理解這個背景對解讀福音書至關重要。',
    journalPrompt: {
      title: '神在歷史中的作為',
      content: '即使沒有先知話語，神在兩約之間仍作工——預備語言（希臘文）、道路（羅馬）、期盼（彌賽亞）。歷史不是偶然，而是神救贖計劃的舞台。'
    },
    deepDive: {
      title: '兩約之間的關鍵事件',
      content: '重要發展：1) 政治：波斯→亞歷山大→托勒密王朝（埃及）→塞琉古王朝（敘利亞）→哈斯摩尼王朝（馬加比革命後，167-63 BC）→羅馬（63 BC起）；2) 宗教：會堂興起、口傳律法發展、法利賽人（強調律法和傳統）、撒都該人（祭司貴族，只接受摩西五經）、愛色尼派（昆蘭社群，禁慾主義）、奮銳黨（反羅馬激進派）形成；3) 文化：希臘化（Hellenization）影響猶太思想、LXX翻譯、智慧文學發展；4) 神學：彌賽亞觀念發展、復活和天使論爭論。安提阿哥四世褻瀆聖殿（167 BC）引發馬加比革命。',
      sources: [
        { text: '但以理書 11章 (預言)', url: 'https://www.biblegateway.com/passage/?search=Daniel+11&version=NIV' },
        { text: 'Intertestamental Period', url: 'https://www.britannica.com/event/Intertestamental-period' },
      ]
    }
  },
  {
    id: 'q68',
    character: '猶太文化專家',
    characterImage: 'https://picsum.photos/seed/jewish-culture/100',
    category: QuestionCategory.BIBLE_BACKGROUND,
    question: '第一世紀猶太教的會堂（Synagogue）有何功能？',
    options: [
      '政府行政辦公室',,
      '只是社交聚會場所',
      '讀經、禱告、教導的敬拜和社群中心',
      '取代聖殿的獻祭中心'
    ],
    correctAnswerIndex: 2,
    explanation: '會堂在被擄後發展，成為猶太社群的宗教和社會中心。功能包括：安息日讀經和教導（路4:16-21）、禱告、教育兒童、社群集會、慈善工作。耶穌和保羅都在會堂傳道（徒17:1-2）。會堂不獻祭（獻祭只在耶路撒冷聖殿進行），而是研讀和教導律法的地方。',
    journalPrompt: {
      title: '會堂與早期教會',
      content: '早期基督教會的敬拜模式受會堂影響：讀經、講道、禱告。會堂也成為保羅宣教的起點——先向猶太人，後向外邦人（羅1:16）。'
    },
    deepDive: {
      title: '會堂的結構與禮拜',
      content: '會堂組織：1) 會堂主管（如睚魯，可5:22）負責禮拜秩序；2) 管理委員會處理社群事務；3) 收藏Torah卷軸的約櫃；4) 面向耶路撒冷的方向。安息日禮拜程序：示瑪（Shema，申6:4-9）、禱告（Amidah，18祝福）、Torah讀經、先知書讀經（Haftarah）、講解（Midrash）、祝福。任何成年男性可被邀請讀經和教導（路4:16；徒13:15）。會堂需至少10個成年男性（minyan）。公元70年聖殿被毀後，會堂成為猶太教的中心。',
      sources: [
        { text: '路加福音 4:16-21 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Luke+4:16-21&version=ESV' },
        { text: 'Ancient Synagogues', url: 'https://www.britannica.com/topic/synagogue' },
      ]
    }
  },
  {
    id: 'q69',
    character: '羅馬文化學者',
    characterImage: 'https://picsum.photos/seed/roman-culture/100',
    category: QuestionCategory.BIBLE_BACKGROUND,
    question: '羅馬帝國對新約時期基督教傳播有何影響？',
    options: [
      '羅馬對基督教毫無影響',
      '羅馬完全壓制基督教',
      '羅馬皇帝支持基督教',,
      '羅馬的和平（Pax Romana）、道路系統、通用語言促進福音傳播'
    ],
    correctAnswerIndex: 3,
    explanation: '羅馬帝國在神的護理中為福音傳播預備條件：1) 羅馬和平（Pax Romana）提供穩定和安全；2) 優秀的道路系統便利旅行；3) 通用希臘文跨越語言障礙；4) 猶太僑民散居各地建立會堂。保羅利用羅馬公民身份（徒22:25-29）和道路網絡進行宣教旅程。',
    journalPrompt: {
      title: '神主權的工具',
      content: '神甚至使用異教帝國成就祂的旨意。羅馬無意中為福音預備道路，正如居里扭的戶口令促使耶穌在伯利恆降生（路2:1-7），應驗彌迦書5:2。'
    },
    deepDive: {
      title: '羅馬帝國的宗教與政治背景',
      content: '羅馬帝國特點：1) 宗教多元主義——容忍各種宗教,只要效忠皇帝；2) 皇帝崇拜——奧古斯都後被神化，要求獻香稱「主」（kyrios），與基督教「耶穌是主」衝突；3) 法律系統——保羅上訴於凱撒（徒25:11）；4) 社會階層——公民vs.非公民、自由人vs.奴隸，基督教超越階級（加3:28）；5) 道路——羅馬軍團建造的道路網絡連接帝國；6) 希臘化——雖羅馬統治,但東部仍主要說希臘語。逼迫：尼祿（64 AD）、多米田（90s AD）、圖拉真（110s AD）、戴克里先（303 AD）。君士坦丁（313 AD）頒佈米蘭敕令,終止逼迫。',
      sources: [
        { text: '路加福音 2:1-7 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Luke+2:1-7&version=NIV' },
        { text: 'Roman Empire and Christianity', url: 'https://www.britannica.com/topic/Christianity/The-history-of-Christianity' },
      ]
    }
  },
  {
    id: 'q70',
    character: '古代近東專家',
    characterImage: 'https://picsum.photos/seed/ancient-near-east/100',
    category: QuestionCategory.BIBLE_BACKGROUND,
    question: '古代近東文學（如吉爾伽美什史詩、埃努瑪·埃利什創世詩）與創世記的關係是什麼？',
    options: [
      '這些神話比創世記更可靠',,
      '創世記抄襲這些神話',
      '創世記與這些文學有相似主題但提供獨特的一神論視角',
      '兩者毫無關係'
    ],
    correctAnswerIndex: 2,
    explanation: '創世記與古代近東文學（如巴比倫創世詩埃努瑪·埃利什、吉爾伽美什洪水敘事）有相似主題：創造、洪水、英雄。但創世記提供根本不同的神學：一位創造主（非多神）、有序創造（非神祇爭鬥）、人有神的形像（非神的奴隸）。創世記在相同文化語境中傳達獨特啟示。',
    journalPrompt: {
      title: '啟示與文化',
      content: '神在特定文化背景中啟示祂自己。創世記使用古代近東讀者熟悉的文學形式，但顛覆異教神學，彰顯獨一真神的榮耀和人的尊貴。'
    },
    deepDive: {
      title: '創世記與古代近東文學的對比',
      content: '相似性：1) 洪水敘事（吉爾伽美什史詩第11塊泥板：方舟、動物、烏鴉/鴿子、山頂停靠、獻祭）；2) 創造主題（埃努瑪·埃利什：原始水、光的創造、人的形成）；3) 宗主條約結構（赫人條約與盟約）。關鍵差異：1) 一神論vs.多神論；2) 有序創造vs.神祇暴力爭鬥；3) 人有神形像vs.人是神的奴隸；4) 道德洪水審判vs.神厭煩人的噪音；5) 慈愛創造主vs.反覆無常的神。這些比較不貶低聖經權威，反而突顯其獨特啟示性。',
      sources: [
        { text: '創世記 1:1-2 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Genesis+1:1-2&version=ESV' },
        { text: 'Ancient Near Eastern Literature', url: 'https://www.britannica.com/topic/ancient-Near-Eastern-literature' },
      ]
    }
  },
  {
    id: 'q71',
    character: '社會史學者',
    characterImage: 'https://picsum.photos/seed/social-historian/100',
    category: QuestionCategory.BIBLE_BACKGROUND,
    question: '第一世紀地中海世界的榮辱文化（Honor-Shame Culture）如何影響新約的理解？',
    options: [
      '新約完全拒絕榮辱觀念',,
      '理解榮辱文化幫助解釋耶穌的比喻、保羅的修辭和早期信徒的行為',
      '榮辱觀念不重要',
      '只有罪疚文化影響新約'
    ],
    correctAnswerIndex: 1,
    explanation: '第一世紀是榮辱文化（集體主義，重視公眾評價），而非現代西方的罪疚文化（個人主義，重視內在良知）。理解這點幫助解釋：耶穌的「虛心」和「為義受逼迫」（太5:3,10）、十字架的「羞辱」（來12:2）、保羅的「誇口」修辭（林後10-12章）、彼此順服的勸勉（弗5:21）。',
    journalPrompt: {
      title: '福音顛覆文化',
      content: '福音轉化榮辱價值觀：在基督裡,羞辱變為榮耀（腓3:7-8）；軟弱成為能力（林後12:9-10）；末後的在先（太20:16）。神的國有不同的榮辱標準。'
    },
    deepDive: {
      title: '榮辱文化與新約詮釋',
      content: '榮辱文化特徵：1) 集體身份（家族/群體榮辱）；2) 公眾名聲至關重要；3) 挑戰-回應模式（如法利賽人挑戰耶穌）；4) 恩主-受恩者關係（patronage）；5) 有限財富觀（零和遊戲，他人的得是我的失）。新約例子：浪子比喻（路15,小兒子使家族蒙羞）；撒該（路19,稅吏職業羞恥）；十字架（申21:23,被掛者是可咒詛的）；婦女見證人（約20,在榮辱文化中婦女證詞不被重視,但神揀選她們）。福音重新定義榮耀：以神的認可為至高榮耀（約5:44；12:43）。',
      sources: [
        { text: '希伯來書 12:2 (NIV)', url: 'https://www.biblegateway.com/passage/?search=Hebrews+12:2&version=NIV' },
        { text: 'Honor-Shame Culture', url: 'https://www.missiologymatters.com/honor-and-shame' },
      ]
    }
  },
  // Critique on the Bible
  {
    id: 'q72',
    character: '詮釋學學者',
    characterImage: 'https://picsum.photos/seed/hermeneutics/100',
    category: QuestionCategory.BIBLE_BACKGROUND,
    question: '「形式批判」（Form Criticism）在聖經研究中探討什麼？',
    options: [
      '聖經的文學美感',
      '聖經的印刷歷史',,
      '聖經經文在成書前的口傳形式和生活情境（Sitz im Leben）',
      '聖經的文字格式'
    ],
    correctAnswerIndex: 2,
    explanation: '形式批判由德國學者如馬丁·狄貝流斯（Martin Dibelius）和魯道夫·布爾特曼（Rudolf Bultmann）發展，研究聖經材料在被寫下之前的口傳階段。它識別不同文學形式（如神蹟故事、比喻、教導）並探討其在早期社群中的功能（Sitz im Leben，生活情境）。',
    journalPrompt: {
      title: '口傳與書面傳統',
      content: '早期教會在書寫福音前,透過口傳保存耶穌的教導和事蹟。這個過程不是隨意的,而是在聖靈引導下,社群忠實傳承的過程。'
    },
    deepDive: {
      title: '形式批判的方法與評估',
      content: '形式批判步驟：1) 識別文學形式（Gattungen）——神蹟故事、衝突故事、比喻、格言、受難敘事等；2) 分析形式的結構特徵；3) 重建「生活情境」（Sitz im Leben）——這個形式在早期教會哪種場合使用（敬拜、教導、宣教、爭論）；4) 追溯傳統的發展。貢獻：幫助理解福音書材料的多樣性和早期教會處境。批評：1) 過度懷疑歷史可靠性；2) 假設社群創造而非保存傳統；3) 忽視目擊者的角色。保守學者如理查德·鮑克漢（Richard Bauckham）強調目擊者證詞和使徒權威。',
      sources: [
        { text: '路加福音 1:1-4 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Luke+1:1-4&version=ESV' },
        { text: 'Form Criticism', url: 'https://www.britannica.com/topic/form-criticism' },
      ]
    }
  },
  {
    id: 'q73',
    character: '編修批判學者',
    characterImage: 'https://picsum.photos/seed/redaction-critic/100',
    category: QuestionCategory.BIBLE_BACKGROUND,
    question: '「編修批判」（Redaction Criticism）與「形式批判」有何不同？',
    options: [
      '編修批判只關心文法錯誤',
      '編修批判證明聖經都是虛構的',,
      '兩者完全相同',
      '編修批判研究編輯者如何選擇和編排材料以傳達神學訊息'
    ],
    correctAnswerIndex: 3,
    explanation: '編修批判（20世紀中期發展）研究福音書作者作為神學家和編輯的角色。它關注作者如何選擇、編排、修改材料來服事其神學目的和讀者需要。例如,馬太如何編排耶穌的教導成五大講論,或路加如何強調耶穌對邊緣人的關懷。',
    journalPrompt: {
      title: '默示的作者',
      content: '編修批判提醒我們,福音書作者不是機械抄寫員,而是在聖靈引導下,有意識地為特定讀者塑造信息的神學家。默示不抹殺人的個性。'
    },
    deepDive: {
      title: '編修批判的應用',
      content: '編修批判方法：1) 比較符類福音的平行段落；2) 分析作者的增添、省略、編排；3) 識別作者的神學主題和強調。例子：1) 馬太的五大講論（5-7章、10章、13章、18章、24-25章）呼應摩西五經,顯示耶穌為新摩西；2) 路加-使徒行傳的旅程主題（路9:51「定意向耶路撒冷去」，徒1:8「直到地極」）；3) 約翰的「我是」宣告和「相信」動詞（約20:30-31）。貢獻：欣賞每位福音書作者的獨特神學視角。限制：不應假設編輯=捏造,作者仍受歷史事件約束。',
      sources: [
        { text: '約翰福音 20:30-31 (NIV)', url: 'https://www.biblegateway.com/passage/?search=John+20:30-31&version=NIV' },
        { text: 'Redaction Criticism', url: 'https://www.britannica.com/topic/redaction-criticism' },
      ]
    }
  },
  {
    id: 'q74',
    character: '女性主義神學家',
    characterImage: 'https://picsum.photos/seed/feminist-theologian/100',
    category: QuestionCategory.BIBLE_BACKGROUND,
    question: '女性主義聖經批判（Feminist Biblical Criticism）的主要關切是什麼？',
    options: [
      '拒絕整本聖經',
      '只研究女性作者的經文',,
      '證明聖經反對女性',
      '檢視聖經文本和詮釋中的性別偏見,恢復女性聲音和經驗'
    ],
    correctAnswerIndex: 3,
    explanation: '女性主義聖經批判（20世紀後期發展）關注：1) 揭露父權詮釋傳統；2) 重新閱讀被邊緣化的女性故事（如哈拿、路得、以斯帖、馬利亞、抹大拉的馬利亞）；3) 挑戰壓迫性的經文應用；4) 提倡公義和平等的詮釋。目的不是拒絕聖經,而是更忠實地閱讀。',
    journalPrompt: {
      title: '聖經中的女性',
      content: '聖經記載許多有信心的女性：底波拉領導以色列、路得展現堅貞、以斯帖拯救族人、馬利亞孕育救主、抹大拉的馬利亞是復活首位見證人。神重視女性。'
    },
    deepDive: {
      title: '女性主義詮釋的方法與爭議',
      content: '女性主義詮釋方法：1) 解構性閱讀——揭露父權意識形態；2) 重建性閱讀——恢復女性歷史和貢獻；3) 創造性閱讀——想像女性角色的未述故事；4) 規範性閱讀——建立解放和公義的詮釋原則。關注經文：創2-3（夏娃）、士4-5（底波拉）、箴31（才德婦人）、路1-2（馬利亞和以利沙伯）、羅16（女執事非比）、林前11和14（女性在教會）、加3:28（在基督裡合一）、弗5（夫妻關係）、提前2（女性教導）。爭議：激進派視聖經為父權文獻需批判；福音派女性主義者視聖經為解放文獻被誤用。',
      sources: [
        { text: '加拉太書 3:28 (ESV)', url: 'https://www.biblegateway.com/passage/?search=Galatians+3:28&version=ESV' },
        { text: 'Feminist Biblical Interpretation', url: 'https://www.britannica.com/topic/biblical-literature/Feminist-criticism' },
      ]
    }
  },
  {
    id: 'q75',
    character: '後殖民批判學者',
    characterImage: 'https://picsum.photos/seed/postcolonial-scholar/100',
    category: QuestionCategory.BIBLE_BACKGROUND,
    question: '後殖民聖經批判（Postcolonial Biblical Criticism）探討什麼議題？',
    options: [
      '證明聖經支持殖民主義',,
      '只研究古代殖民歷史',
      '拒絕所有西方神學',
      '檢視聖經文本中的帝國權力動態,以及聖經如何被用於殖民和解殖'
    ],
    correctAnswerIndex: 3,
    explanation: '後殖民批判（20世紀末發展）探討：1) 聖經文本中的帝國（埃及、亞述、巴比倫、波斯、羅馬）；2) 征服迦南的倫理問題；3) 聖經如何被殖民者用來合理化壓迫；4) 被殖民者如何重新閱讀聖經尋求解放（如拉丁美洲解放神學）。目標是去殖民化詮釋,讓邊緣聲音被聽見。',
    journalPrompt: {
      title: '邊緣的聲音',
      content: '聖經本身是被壓迫者的文學：希伯來奴隸逃離埃及、被擄者在巴比倫哀歌、受逼迫的教會在羅馬帝國。神站在弱者一邊。'
    },
    deepDive: {
      title: '後殖民詮釋的視角',
      content: '後殖民批判關注：1) 聖經中的帝國批判——出埃及對法老的批判、但以理書對巴比倫/波斯的批判、啟示錄對羅馬（「大巴比倫」）的批判；2) 問題經文——征服迦南（書1-12）、「滅絕令」（herem）的倫理；3) 殖民歷史——西方宣教士如何用聖經支持殖民（「文明使命」）,同時也帶來教育和醫療；4) 解殖詮釋——非洲、亞洲、拉丁美洲神學家如何從本土處境閱讀聖經。貢獻：揭示詮釋的文化和權力因素。挑戰：避免簡化（聖經既有帝國批判也有神授權征服迦南的敘事）；平衡特殊啟示和普世公義。',
      sources: [
        { text: '啟示錄 18章 (巴比倫的傾倒)', url: 'https://www.biblegateway.com/passage/?search=Revelation+18&version=NIV' },
        { text: 'Postcolonial Biblical Criticism', url: 'https://www.oxfordbibliographies.com/view/document/obo-9780195393361/obo-9780195393361-0240.xml' },
      ]
    }
  },
];

export const locations: BibleLocation[] = [
  { id: 'l1', name: '迦勒底的吾珥', era: '先祖時期', position: { top: '75%', left: '70%' }, questId: 'q1' },
  { id: 'l2', name: '西奈山', era: '出埃及時期', position: { top: '55%', left: '45%' }, questId: 'q2', dependency: 'l1' },
  { id: 'l7', name: '約旦河東岸', era: '征服時期', position: { top: '45%', left: '52%' }, questId: 'q7', dependency: 'l2' },
  { id: 'l8', name: '耶路撒冷宮殿', era: '王國時期', position: { top: '42%', left: '48%' }, questId: 'q8', dependency: 'l7' },
  { id: 'l9', name: '基遍', era: '王國鼎盛期', position: { top: '40%', left: '47%' }, questId: 'q9', dependency: 'l8' },
  { id: 'l10', name: '耶路撒冷聖殿', era: '先知時期', position: { top: '43%', left: '49%' }, questId: 'q10', dependency: 'l9' },
  { id: 'l5', name: '巴比倫', era: '流亡時期', position: { top: '60%', left: '65%' }, questId: 'q5', dependency: 'l10' },
  { id: 'l11', name: '巴比倫宮殿', era: '流亡時期', position: { top: '62%', left: '67%' }, questId: 'q11', dependency: 'l5' },
  { id: 'l3', name: '約旦河', era: '新約先驅', position: { top: '40%', left: '50%' }, questId: 'q3', dependency: 'l11' },
  { id: 'l12', name: '加利利山上', era: '耶穌時期', position: { top: '35%', left: '49%' }, questId: 'q12', dependency: 'l3' },
  { id: 'l13', name: '耶利哥', era: '耶穌時期', position: { top: '44%', left: '50%' }, questId: 'q13', dependency: 'l12' },
  { id: 'l4', name: '耶路撒冷', era: '使徒時期', position: { top: '42%', left: '48%' }, questId: 'q4', dependency: 'l13' },
  { id: 'l14', name: '以弗所', era: '使徒時期', position: { top: '32%', left: '38%' }, questId: 'q14', dependency: 'l4' },
  { id: 'l15', name: '伯大尼', era: '耶穌時期', position: { top: '43%', left: '51%' }, questId: 'q15', dependency: 'l14' },
  { id: 'l6', name: '哥林多', era: '教會時期', position: { top: '30%', left: '35%' }, questId: 'q6', dependency: 'l15' },
  { id: 'l16', name: '伊甸園', era: '創世時期', position: { top: '80%', left: '68%' }, questId: 'q16', dependency: 'l6' },
  { id: 'l17', name: '亞拉臘山', era: '洪水時期', position: { top: '70%', left: '55%' }, questId: 'q17', dependency: 'l16' },
  { id: 'l18', name: '埃及', era: '先祖時期', position: { top: '65%', left: '42%' }, questId: 'q18', dependency: 'l17' },
  { id: 'l19', name: '紅海邊', era: '出埃及時期', position: { top: '58%', left: '46%' }, questId: 'q19', dependency: 'l18' },
  { id: 'l20', name: '加低斯巴尼亞', era: '曠野時期', position: { top: '52%', left: '47%' }, questId: 'q20', dependency: 'l19' },
  { id: 'l21', name: '伯利恆', era: '士師時期', position: { top: '43%', left: '49%' }, questId: 'q21', dependency: 'l20' },
  { id: 'l22', name: '示羅', era: '士師時期', position: { top: '41%', left: '48%' }, questId: 'q22', dependency: 'l21' },
  { id: 'l23', name: '大衛城', era: '王國時期', position: { top: '42%', left: '49%' }, questId: 'q23', dependency: 'l22' },
  { id: 'l24', name: '迦密山', era: '王國分裂期', position: { top: '38%', left: '47%' }, questId: 'q24', dependency: 'l23' },
  { id: 'l25', name: '撒瑪利亞', era: '王國分裂期', position: { top: '40%', left: '48%' }, questId: 'q25', dependency: 'l24' },
  { id: 'l26', name: '烏斯地', era: '先祖傳說期', position: { top: '72%', left: '58%' }, questId: 'q26', dependency: 'l25' },
  { id: 'l27', name: '耶利米之井', era: '王國末期', position: { top: '43%', left: '48%' }, questId: 'q27', dependency: 'l26' },
  { id: 'l28', name: '波斯書珊城', era: '回歸時期', position: { top: '55%', left: '73%' }, questId: 'q28', dependency: 'l27' },
  { id: 'l29', name: '波斯帝國', era: '回歸時期', position: { top: '58%', left: '70%' }, questId: 'q29', dependency: 'l28' },
  { id: 'l30', name: '猶大山地', era: '耶穌降生前', position: { top: '44%', left: '50%' }, questId: 'q30', dependency: 'l29' },
  { id: 'l31', name: '伯利恆野地', era: '耶穌降生', position: { top: '43%', left: '49%' }, questId: 'q31', dependency: 'l30' },
  { id: 'l32', name: '耶路撒冷城內', era: '耶穌時期', position: { top: '42%', left: '48%' }, questId: 'q32', dependency: 'l31' },
  { id: 'l33', name: '敘加城', era: '耶穌時期', position: { top: '39%', left: '48%' }, questId: 'q33', dependency: 'l32' },
  { id: 'l34', name: '迦百農', era: '耶穌時期', position: { top: '36%', left: '49%' }, questId: 'q34', dependency: 'l33' },
  { id: 'l35', name: '墓園', era: '復活時期', position: { top: '42%', left: '48%' }, questId: 'q35', dependency: 'l34' },
  { id: 'l36', name: '馬可樓', era: '復活後', position: { top: '42%', left: '49%' }, questId: 'q36', dependency: 'l35' },
  { id: 'l37', name: '推雅推喇', era: '使徒時期', position: { top: '33%', left: '40%' }, questId: 'q37', dependency: 'l36' },
  { id: 'l38', name: '哥林多', era: '使徒時期', position: { top: '30%', left: '35%' }, questId: 'q38', dependency: 'l37' },
  { id: 'l39', name: '歌羅西', era: '使徒時期', position: { top: '32%', left: '41%' }, questId: 'q39', dependency: 'l38' },
  { id: 'l40', name: '小亞細亞', era: '使徒時期', position: { top: '34%', left: '39%' }, questId: 'q40', dependency: 'l39' },
  { id: 'l41', name: '耶路撒冷議會', era: '使徒時期', position: { top: '42%', left: '48%' }, questId: 'q41', dependency: 'l40' },
  { id: 'l42', name: '該撒利亞', era: '使徒時期', position: { top: '37%', left: '47%' }, questId: 'q42', dependency: 'l41' },
  { id: 'l43', name: '安提阿', era: '使徒時期', position: { top: '28%', left: '52%' }, questId: 'q43', dependency: 'l42' },
  { id: 'l44', name: '腓立比', era: '使徒時期', position: { top: '25%', left: '36%' }, questId: 'q44', dependency: 'l43' },
  { id: 'l45', name: '以弗所教會', era: '使徒時期', position: { top: '32%', left: '38%' }, questId: 'q45', dependency: 'l44' },
  { id: 'l46', name: '堅革哩', era: '使徒時期', position: { top: '31%', left: '35%' }, questId: 'q46', dependency: 'l45' },
  { id: 'l47', name: '亞歷山大', era: '使徒時期', position: { top: '50%', left: '40%' }, questId: 'q47', dependency: 'l46' },
  { id: 'l48', name: '凱撒利亞', era: '使徒時期', position: { top: '37%', left: '47%' }, questId: 'q48', dependency: 'l47' },
  { id: 'l49', name: '羅馬', era: '使徒時期', position: { top: '22%', left: '20%' }, questId: 'q49', dependency: 'l48' },
  { id: 'l50', name: '老底嘉', era: '啟示錄時期', position: { top: '33%', left: '41%' }, questId: 'q50', dependency: 'l49' },
  // Academic Theology Layer Locations
  { id: 'l51', name: '希伯來文學研究中心', era: '學術研究', position: { top: '15%', left: '75%' }, questId: 'q51', dependency: 'l50' },
  { id: 'l52', name: '馬索拉文本研究所', era: '學術研究', position: { top: '18%', left: '73%' }, questId: 'q52', dependency: 'l51' },
  { id: 'l53', name: '古代語言學院', era: '學術研究', position: { top: '16%', left: '78%' }, questId: 'q53', dependency: 'l52' },
  { id: 'l54', name: '詩歌文學研究室', era: '學術研究', position: { top: '19%', left: '76%' }, questId: 'q54', dependency: 'l53' },
  { id: 'l55', name: '舊約正典研究中心', era: '學術研究', position: { top: '12%', left: '68%' }, questId: 'q55', dependency: 'l54' },
  { id: 'l56', name: '考古學研究所', era: '學術研究', position: { top: '14%', left: '65%' }, questId: 'q56', dependency: 'l55' },
  { id: 'l57', name: '文獻批判學院', era: '學術研究', position: { top: '17%', left: '70%' }, questId: 'q57', dependency: 'l56' },
  { id: 'l58', name: '聖約神學研究室', era: '學術研究', position: { top: '15%', left: '72%' }, questId: 'q58', dependency: 'l57' },
  { id: 'l59', name: '新約語言研究中心', era: '學術研究', position: { top: '20%', left: '55%' }, questId: 'q59', dependency: 'l58' },
  { id: 'l60', name: '正典形成研究所', era: '學術研究', position: { top: '22%', left: '58%' }, questId: 'q60', dependency: 'l59' },
  { id: 'l61', name: '符類福音研究室', era: '學術研究', position: { top: '18%', left: '60%' }, questId: 'q61', dependency: 'l60' },
  { id: 'l62', name: '保羅書信研究中心', era: '學術研究', position: { top: '21%', left: '62%' }, questId: 'q62', dependency: 'l61' },
  { id: 'l63', name: '古代手抄本研究所', era: '學術研究', position: { top: '10%', left: '50%' }, questId: 'q63', dependency: 'l62' },
  { id: 'l64', name: '七十士譯本研究中心', era: '學術研究', position: { top: '12%', left: '53%' }, questId: 'q64', dependency: 'l63' },
  { id: 'l65', name: '次經研究室', era: '學術研究', position: { top: '14%', left: '48%' }, questId: 'q65', dependency: 'l64' },
  { id: 'l66', name: '古代譯本研究所', era: '學術研究', position: { top: '11%', left: '56%' }, questId: 'q66', dependency: 'l65' },
  { id: 'l67', name: '兩約歷史研究中心', era: '學術研究', position: { top: '25%', left: '45%' }, questId: 'q67', dependency: 'l66' },
  { id: 'l68', name: '猶太文化研究所', era: '學術研究', position: { top: '23%', left: '48%' }, questId: 'q68', dependency: 'l67' },
  { id: 'l69', name: '羅馬文化研究室', era: '學術研究', position: { top: '27%', left: '42%' }, questId: 'q69', dependency: 'l68' },
  { id: 'l70', name: '古代近東研究中心', era: '學術研究', position: { top: '24%', left: '50%' }, questId: 'q70', dependency: 'l69' },
  { id: 'l71', name: '社會文化研究所', era: '學術研究', position: { top: '26%', left: '47%' }, questId: 'q71', dependency: 'l70' },
  { id: 'l72', name: '形式批判研究中心', era: '學術研究', position: { top: '8%', left: '38%' }, questId: 'q72', dependency: 'l71' },
  { id: 'l73', name: '編修批判研究所', era: '學術研究', position: { top: '10%', left: '42%' }, questId: 'q73', dependency: 'l72' },
  { id: 'l74', name: '女性主義詮釋研究室', era: '學術研究', position: { top: '12%', left: '35%' }, questId: 'q74', dependency: 'l73' },
  { id: 'l75', name: '後殖民批判研究中心', era: '學術研究', position: { top: '9%', left: '45%' }, questId: 'q75', dependency: 'l74' },
];

export const levels: Level[] = [
  {
    id: 'level1',
    name: '信仰的根基',
    locationIds: ['l1', 'l2', 'l7'],
    discussionPrompts: [
        '「聖約」的概念如何改變您對與上帝關係的看法？',
        '為什麼身體上的潔淨在舊約中如此重要，它如何指向更深層次的屬靈現實？',
        '約書亞設立紀念石的做法對今天的信仰傳承有何啟示？'
    ]
  },
  {
    id: 'level2',
    name: '王國的智慧',
    locationIds: ['l8', 'l9', 'l10'],
    discussionPrompts: [
        '大衛在詩篇中表達的信靠與交託，如何幫助我們面對現代生活的壓力？',
        '所羅門選擇智慧而非財富的故事，對我們的人生優先次序有何挑戰？',
        '以賽亞的「受苦僕人」預言如何幫助我們理解救贖的本質？'
    ]
  },
  {
    id: 'level3',
    name: '流亡與盼望',
    locationIds: ['l5', 'l11'],
    discussionPrompts: [
        '以西結關於「新心」的應許如何為耶穌的教導和基督教洗禮鋪路？',
        '但以理在異邦環境中持守信仰的經歷，對現代基督徒有何實用意義？'
    ]
  },
  {
    id: 'level4',
    name: '彌賽亞的來臨',
    locationIds: ['l3', 'l12', 'l13', 'l15'],
    discussionPrompts: [
        '悔改在施洗約翰的事工中扮演什麼角色？它與我們今天對洗禮的理解有何關聯？',
        '耶穌的「八福」如何挑戰世俗的價值觀？',
        '撒該的悔改行動如何示範真正的生命改變？',
        '馬大和馬利亞的故事如何幫助我們平衡服事與靈修？'
    ]
  },
  {
    id: 'level5',
    name: '教會的建立',
    locationIds: ['l4', 'l14', 'l6'],
    discussionPrompts: [
        '根據彼得在五旬節的講道，洗禮與領受聖靈之間有什麼關係？',
        '約翰記錄的「我是道路、真理、生命」如何確立基督信仰的獨特性？',
        '「披戴基督」對基督徒的日常生活有何實際意義？'
    ]
  },
  {
    id: 'level6',
    name: '創造與洪水',
    locationIds: ['l16', 'l17', 'l18'],
    discussionPrompts: [
        '夏娃面對試探的經歷如何幫助我們理解罪的本質和抵擋試探的方法？',
        '挪亞的順服和忍耐對我們在不信的世代中持守信仰有何啟示？',
        '約瑟從被賣到成為宰相的經歷如何展現神的主權和護理？'
    ]
  },
  {
    id: 'level7',
    name: '出埃及與曠野',
    locationIds: ['l19', 'l20', 'l21'],
    discussionPrompts: [
        '米利暗的讚美和領導力對今天的教會女性事奉有何啟發？',
        '迦勒的信心和堅持如何激勵我們面對人生的挑戰？',
        '路得對拿俄米的忠誠如何展現盟約關係的美好？'
    ]
  },
  {
    id: 'level8',
    name: '士師與王國初期',
    locationIds: ['l22', 'l23', 'l24'],
    discussionPrompts: [
        '撒母耳如何成為士師與君王制度之間的橋樑？',
        '拔示巴的故事如何提醒我們罪的後果和神的憐憫？',
        '以利亞對抗巴力的經歷對今天面對屬靈爭戰有何教導？'
    ]
  },
  {
    id: 'level9',
    name: '先知與苦難',
    locationIds: ['l25', 'l26', 'l27'],
    discussionPrompts: [
        '以利沙的神蹟事工如何延續以利亞的使命？',
        '約伯的苦難和信心對我們理解苦難神學有何貢獻？',
        '耶利米在艱難時期的忠心如何鼓勵我們在逆境中堅持？'
    ]
  },
  {
    id: 'level10',
    name: '回歸與重建',
    locationIds: ['l28', 'l29', 'l30'],
    discussionPrompts: [
        '尼希米的領導和組織能力對今天的教會建造有何啟示？',
        '以斯帖的勇氣如何教導我們「為這樣的時刻而生」的使命感？',
        '以利沙伯與馬利亞的相遇如何展現舊新約之間的連結？'
    ]
  },
  {
    id: 'level11',
    name: '耶穌的事工',
    locationIds: ['l31', 'l32', 'l33', 'l34'],
    discussionPrompts: [
        '東方智慧人尋找耶穌的旅程對我們尋求神有何啟發？',
        '尼哥底母「重生」的對話如何幫助我們理解救恩的本質？',
        '撒瑪利亞婦人與耶穌的對話如何打破文化和宗教的障礙？',
        '百夫長的信心如何超越猶太人的理解？'
    ]
  },
  {
    id: 'level12',
    name: '復活與見證',
    locationIds: ['l35', 'l36', 'l37', 'l38'],
    discussionPrompts: [
        '抹大拉的馬利亞作為第一位復活見證人有何重要性？',
        '多馬的懷疑和相信如何幫助我們處理信仰中的疑惑？',
        '呂底亞成為第一位歐洲信徒的故事有何宣教意義？',
        '亞居拉和百基拉夫婦的配搭事奉如何示範家庭宣教？'
    ]
  },
  {
    id: 'level13',
    name: '早期教會',
    locationIds: ['l39', 'l40', 'l41', 'l42'],
    discussionPrompts: [
        '腓利門書如何處理基督教倫理與當時社會制度的張力？',
        '保羅對提摩太的栽培如何展現屬靈導師的重要性？',
        '雅各書如何平衡信心與行為的教導？',
        '西拉與保羅的宣教夥伴關係有何啟發？'
    ]
  },
  {
    id: 'level14',
    name: '使徒擴展',
    locationIds: ['l43', 'l44', 'l45', 'l46'],
    discussionPrompts: [
        '亞波羅被百基拉和亞居拉指教的故事對謙卑學習有何啟示？',
        '腓利向埃提阿伯太監傳福音的經歷如何示範聖靈引導的宣教？',
        '哥尼流的故事如何標誌福音向外邦人開放的轉折點？',
        '巴拿巴的鼓勵恩賜如何建造早期教會？'
    ]
  },
  {
    id: 'level15',
    name: '教會的完全',
    locationIds: ['l47', 'l48', 'l49', 'l50'],
    discussionPrompts: [
        '以巴弗為歌羅西教會的竭力禱告對我們的代禱事工有何教導？',
        '非比被保羅稱為「執事」和「幫助者」對女性事奉有何意義？',
        '馬可從失敗到恢復的經歷如何鼓勵我們在事奉中重新得力？',
        '老底嘉教會的不冷不熱對今天的教會有何警醒？'
    ]
  },
  // Academic Theology Levels
  {
    id: 'level16',
    name: '希伯來聖經導論',
    locationIds: ['l51', 'l52', 'l53', 'l54'],
    discussionPrompts: [
        'Tanakh的三重結構（Torah、Nevi\'im、Ketuvim）如何影響我們理解舊約的權威和神學？',
        '馬索拉文本的精確傳承工作對我們今天敬畏神話語有何啟示？',
        '希伯來文和亞蘭文作為聖經語言的特性如何影響我們的解經方法？',
        '希伯來詩歌的平行體結構如何幫助我們更深入默想神的話語？'
    ]
  },
  {
    id: 'level17',
    name: '舊約研究進階',
    locationIds: ['l55', 'l56', 'l57', 'l58'],
    discussionPrompts: [
        '基督教舊約與猶太教Tanakh的編排差異反映了哪些神學視角的不同？',
        '死海古卷的發現如何加強我們對聖經傳抄可靠性的信心？',
        '文獻假說等批判理論如何挑戰並深化我們對聖經默示的理解？',
        '「約」作為舊約核心主題如何貫穿整個救贖歷史？'
    ]
  },
  {
    id: 'level18',
    name: '新約研究基礎',
    locationIds: ['l59', 'l60', 'l61', 'l62'],
    discussionPrompts: [
        '通用希臘文（Koine）作為新約語言如何體現神的時機和普世宣教的心意？',
        '新約正典形成的漸進過程如何顯示聖靈在教會歷史中的引導？',
        '符類福音問題的研究如何豐富我們對四福音多元見證的理解？',
        '保羅書信的真偽爭議提醒我們在學術誠實和信仰委身之間如何平衡？'
    ]
  },
  {
    id: 'level19',
    name: '聖經文獻與譯本',
    locationIds: ['l63', 'l64', 'l65', 'l66'],
    discussionPrompts: [
        '數千份新約手抄本的保存如何見證神護理祂話語的大能？',
        '七十士譯本（LXX）如何為福音傳向外邦世界預備道路？',
        '次經的正典地位爭議如何幫助我們思考「什麼是神的話語」這個核心問題？',
        '武加大譯本等古代譯本的歷史如何提醒我們翻譯工作的重要性？'
    ]
  },
  {
    id: 'level20',
    name: '歷史文化背景',
    locationIds: ['l67', 'l68', 'l69', 'l70', 'l71'],
    discussionPrompts: [
        '兩約之間時期的歷史發展如何顯示神在「沉默的400年」中仍在作工？',
        '會堂制度和猶太教派別的形成如何幫助我們理解耶穌和使徒的事工背景？',
        '羅馬帝國的和平、道路和語言如何成為神傳播福音的工具？',
        '古代近東文學與創世記的比較如何突顯聖經獨特的一神論啟示？',
        '榮辱文化的理解如何幫助我們更深刻地體會福音對文化價值的顛覆與轉化？'
    ]
  },
  {
    id: 'level21',
    name: '聖經批判研究',
    locationIds: ['l72', 'l73', 'l74', 'l75'],
    discussionPrompts: [
        '形式批判對口傳傳統的研究如何幫助我們欣賞早期教會保存耶穌教導的忠實性？',
        '編修批判如何提醒我們福音書作者在聖靈引導下的神學創造力？',
        '女性主義聖經詮釋如何挑戰我們重新發現聖經中被邊緣化的女性聲音？',
        '後殖民批判如何幫助我們反思聖經詮釋中的權力動態和文化處境？'
    ]
  }
];