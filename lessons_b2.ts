
import { LessonContent } from './lessons_types';

export const book2Data: Record<string, LessonContent> = {
  "2-1": {
    vocabulary: [
      { word: "sport", translation: "運動", example: "Do you like sports?", partOfSpeech: "n." },
      { word: "basketball", translation: "籃球", example: "I play basketball.", partOfSpeech: "n." },
      { word: "baseball", translation: "棒球", example: "Baseball is popular.", partOfSpeech: "n." },
      { word: "tennis", translation: "網球", example: "She plays tennis.", partOfSpeech: "n." },
      { word: "badminton", translation: "羽毛球", example: "Let's play badminton.", partOfSpeech: "n." },
      { word: "dodgeball", translation: "躲避球", example: "Kids like dodgeball.", partOfSpeech: "n." }
    ],
    grammar: [
      { title: "助動詞 Do/Does", rule: "用於現在簡單式的疑問句與否定句。第三人稱單數用 Does。", example: "Do you like apples? Does he play baseball?" },
      { title: "Play + 運動", rule: "球類運動前不加 the。", example: "Play soccer, not play the soccer." }
    ],
    phrases: [
      { phrase: "after school", translation: "放學後", example: "I go home after school." },
      { phrase: "every day", translation: "每天", example: "I exercise every day." }
    ],
    sentences: [
      { sentence: "Do you play basketball?", translation: "你打籃球嗎？", note: "Do 起首的問句。" },
      { sentence: "No, I don't. I play tennis.", translation: "不，我打網球。", note: "否定與肯定回答。" }
    ]
  },
  "2-2": {
    vocabulary: [
      { word: "day", translation: "一天", example: "Have a nice day.", partOfSpeech: "n." },
      { word: "week", translation: "週", example: "There are seven days in a week.", partOfSpeech: "n." },
      { word: "Monday", translation: "星期一", example: "I hate Mondays.", partOfSpeech: "n." },
      { word: "Sunday", translation: "星期日", example: "We relax on Sunday.", partOfSpeech: "n." },
      { word: "study", translation: "研讀", example: "Study hard.", partOfSpeech: "v." },
      { word: "practice", translation: "練習", example: "Practice makes perfect.", partOfSpeech: "v." }
    ],
    grammar: [
      { title: "頻率副詞 (1)", rule: "always (總是), usually (通常), sometimes (有時), never (從不)。放在一般動詞前，Be動詞後。", example: "I always get up early." },
      { title: "詢問星期", rule: "What day is today?", example: "It is Friday." }
    ],
    phrases: [
      { phrase: "on weekends", translation: "在週末", example: "I sleep late on weekends." },
      { phrase: "play the guitar", translation: "彈吉他", example: "Can you play the guitar?" }
    ],
    sentences: [
      { sentence: "What do you do on Sundays?", translation: "你星期日都做什麼？", note: "詢問習慣。" },
      { sentence: "I usually practice the piano.", translation: "我通常練習彈鋼琴。", note: "加入頻率副詞。" }
    ]
  },
  "2-3": {
    vocabulary: [
      { word: "weather", translation: "天氣", example: "How is the weather?", partOfSpeech: "n." },
      { word: "sunny", translation: "晴朗的", example: "It is sunny today.", partOfSpeech: "adj." },
      { word: "rainy", translation: "下雨的", example: "I don't like rainy days.", partOfSpeech: "adj." },
      { word: "cloudy", translation: "多雲的", example: "It is cloudy.", partOfSpeech: "adj." },
      { word: "snowy", translation: "下雪的", example: "It is snowy in winter.", partOfSpeech: "adj." },
      { word: "spring", translation: "春天", example: "Flowers bloom in spring.", partOfSpeech: "n." }
    ],
    grammar: [
      { title: "詢問天氣", rule: "How's the weather? 或 What's the weather like?", example: "It's rainy." },
      { title: "非人稱代名詞 It", rule: "用 It 代表天氣、時間、距離。", example: "It rains a lot here." }
    ],
    phrases: [
      { phrase: "go swimming", translation: "去游泳", example: "Let's go swimming." },
      { phrase: "all year round", translation: "整年", example: "It's hot all year round." }
    ],
    sentences: [
      { sentence: "How is the weather there?", translation: "那裡天氣如何？", note: "天氣問句。" },
      { sentence: "It is cold and windy.", translation: "又冷風又大。", note: "形容詞連用。" }
    ]
  },
  "2-4": {
    vocabulary: [
      { word: "yesterday", translation: "昨天", example: "I was sick yesterday.", partOfSpeech: "adv." },
      { word: "last", translation: "上一個...", example: "Last night.", partOfSpeech: "adj." },
      { word: "ago", translation: "以前", example: "Two days ago.", partOfSpeech: "adv." },
      { word: "was", translation: "是(am/is過去式)", example: "I was busy.", partOfSpeech: "v." },
      { word: "were", translation: "是(are過去式)", example: "They were happy.", partOfSpeech: "v." }
    ],
    grammar: [
      { title: "Be動詞過去式", rule: "am/is -> was, are -> were。", example: "I was at home yesterday." },
      { title: "過去時間副詞", rule: "yesterday, last week, three years ago...", example: "Where were you last night?" }
    ],
    phrases: [
      { phrase: "at home", translation: "在家", example: "I was at home." },
      { phrase: "in the mountains", translation: "在山裡", example: "We were in the mountains." }
    ],
    sentences: [
      { sentence: "Where were you yesterday?", translation: "你昨天在哪裡？", note: "過去式問句。" },
      { sentence: "I was at the library.", translation: "我在圖書館。", note: "過去式回答。" }
    ]
  },
  "2-5": {
    vocabulary: [
      { word: "visited", translation: "拜訪(過去式)", example: "I visited my uncle.", partOfSpeech: "v." },
      { word: "played", translation: "玩(過去式)", example: "He played games.", partOfSpeech: "v." },
      { word: "watched", translation: "觀看(過去式)", example: "She watched TV.", partOfSpeech: "v." },
      { word: "cleaned", translation: "清理(過去式)", example: "I cleaned my room.", partOfSpeech: "v." },
      { word: "enjoyed", translation: "享受(過去式)", example: "We enjoyed the party.", partOfSpeech: "v." }
    ],
    grammar: [
      { title: "過去簡單式 (規則變化)", rule: "動詞字尾 + ed。", example: "walk -> walked, cry -> cried." },
      { title: "助動詞 Did", rule: "過去式的疑問句與否定句使用 Did/Didn't，後接原形動詞。", example: "Did you play? I didn't play." }
    ],
    phrases: [
      { phrase: "clean up", translation: "打掃", example: "Clean up the mess." },
      { phrase: "take a walk", translation: "散步", example: "We took a walk." }
    ],
    sentences: [
      { sentence: "What did you do last weekend?", translation: "你上週末做了什麼？", note: "詢問過去行為。" },
      { sentence: "I visited my grandparents.", translation: "我去探望了祖父母。", note: "規則動詞過去式。" }
    ]
  },
  "2-6": {
    vocabulary: [
      { word: "buy", translation: "買", example: "I want to buy a car.", partOfSpeech: "v." },
      { word: "bought", translation: "買(過去式)", example: "I bought a pen.", partOfSpeech: "v." },
      { word: "see", translation: "看見", example: "I see a bird.", partOfSpeech: "v." },
      { word: "saw", translation: "看見(過去式)", example: "I saw him yesterday.", partOfSpeech: "v." },
      { word: "go", translation: "去", example: "Go home.", partOfSpeech: "v." },
      { word: "went", translation: "去(過去式)", example: "He went to the park.", partOfSpeech: "v." }
    ],
    grammar: [
      { title: "過去簡單式 (不規則變化)", rule: "需背誦不規則動詞表。go->went, see->saw, eat->ate...", example: "He ate a burger." },
      { title: "Wh- 問句與過去式", rule: "What/Where/When + did + 主詞 + V...?", example: "When did you go there?" }
    ],
    phrases: [
      { phrase: "go camping", translation: "去露營", example: "We went camping." },
      { phrase: "have a good time", translation: "玩得開心", example: "Did you have a good time?" }
    ],
    sentences: [
      { sentence: "Did you go to the zoo?", translation: "你有去動物園嗎？", note: "Did 問句。" },
      { sentence: "Yes, I saw many monkeys.", translation: "有，我看到很多猴子。", note: "不規則動詞 saw。" }
    ]
  }
};
