
import { LessonContent } from './lessons_types';

export const book6Data: Record<string, LessonContent> = {
  "6-1": {
    vocabulary: [
      { word: "if", translation: "如果", example: "If I were you...", partOfSpeech: "conj." },
      { word: "bird", translation: "鳥", example: "Birds can fly.", partOfSpeech: "n." },
      { word: "fly", translation: "飛", example: "I want to fly.", partOfSpeech: "v." },
      { word: "wing", translation: "翅膀", example: "Wings of an angel.", partOfSpeech: "n." },
      { word: "millionaire", translation: "百萬富翁", example: "If I were a millionaire.", partOfSpeech: "n." }
    ],
    grammar: [
      { title: "假設語氣 (與現在事實相反)", rule: "If S + 過去式V (be動詞用were), S + would/could/might + V原形。", example: "If I were you, I would go." },
      { title: "條件句 (可能發生)", rule: "If S + 現在式, S + will + V原形。", example: "If it rains, I will stay home." }
    ],
    phrases: [
      { phrase: "in one's shoes", translation: "處在某人的立場", example: "If I were in your shoes..." },
      { phrase: "come true", translation: "成真", example: "Make dreams come true." }
    ],
    sentences: [
      { sentence: "If I were a bird, I could fly to you.", translation: "如果我是一隻鳥，我就能飛向你。", note: "假設語氣 Be 用 Were。" },
      { sentence: "If I had money, I would buy a house.", translation: "如果我有錢，我就會買房子。", note: "動詞用過去式表示假設。" }
    ]
  },
  "6-2": {
    vocabulary: [
      { word: "news", translation: "新聞", example: "Good news.", partOfSpeech: "n." },
      { word: "surprise", translation: "驚訝", example: "To my surprise.", partOfSpeech: "n." },
      { word: "surprising", translation: "令人驚訝的", example: "It is surprising.", partOfSpeech: "adj." },
      { word: "surprised", translation: "感到驚訝的", example: "I am surprised.", partOfSpeech: "adj." },
      { word: "hear", translation: "聽說", example: "I heard the news.", partOfSpeech: "v." }
    ],
    grammar: [
      { title: "附加問句 (Tag Questions)", rule: "前面肯定後面否定，前面否定後面肯定。時態助動詞要一致。", example: "You are a student, aren't you?" },
      { title: "附加問句 (特殊)", rule: "Let's go, shall we? / Open the door, will you? / I am, aren't I?", example: "Let's dance, shall we?" }
    ],
    phrases: [
      { phrase: "believe in", translation: "信仰/信任", example: "Believe in yourself." },
      { phrase: "no matter", translation: "無論", example: "No matter what." }
    ],
    sentences: [
      { sentence: "You didn't go to school, did you?", translation: "你沒去學校，對吧？", note: "前否後肯。" },
      { sentence: "He likes apples, doesn't he?", translation: "他喜歡蘋果，不是嗎？", note: "一般動詞用 Do/Does。" }
    ]
  },
  "6-3": {
    vocabulary: [
      { word: "make", translation: "使...", example: "He made me cry.", partOfSpeech: "v." },
      { word: "let", translation: "讓", example: "Let me go.", partOfSpeech: "v." },
      { word: "have", translation: "叫/使", example: "I had him wash the car.", partOfSpeech: "v." },
      { word: "help", translation: "幫忙", example: "Help me (to) do it.", partOfSpeech: "v." },
      { word: "cry", translation: "哭", example: "Don't cry.", partOfSpeech: "v." }
    ],
    grammar: [
      { title: "使役動詞", rule: "Make/Have/Let + O + V原形。表示要求或允許某人做某事。", example: "Mom makes me clean the room." },
      { title: "Help 的用法", rule: "Help + O + (to) V原形。", example: "He helps me study." }
    ],
    phrases: [
      { phrase: "do the dishes", translation: "洗碗", example: "I did the dishes." },
      { phrase: "clean the room", translation: "打掃房間", example: "Clean the room now." }
    ],
    sentences: [
      { sentence: "My mom made me eat the vegetables.", translation: "我媽強迫我吃蔬菜。", note: "Make + 原形動詞。" },
      { sentence: "Let me help you.", translation: "讓我幫你。", note: "Let + 原形。" }
    ]
  },
  "6-4": {
    vocabulary: [
      { word: "see", translation: "看見", example: "I saw him run.", partOfSpeech: "v." },
      { word: "watch", translation: "觀看", example: "Watch her dance.", partOfSpeech: "v." },
      { word: "hear", translation: "聽見", example: "I heard birds sing.", partOfSpeech: "v." },
      { word: "feel", translation: "感覺", example: "I felt the house shake.", partOfSpeech: "v." },
      { word: "shake", translation: "搖晃", example: "Shake hands.", partOfSpeech: "v." }
    ],
    grammar: [
      { title: "感官動詞", rule: "See/Hear/Watch/Feel + O + V原形 (強調事實) 或 V-ing (強調進行)。", example: "I saw him running." },
      { title: "感官 vs 使役", rule: "感官可用 V-ing，使役只能用原形 (Get除外)。", example: "I heard her singing." }
    ],
    phrases: [
      { phrase: "listen to", translation: "聆聽", example: "Listen to the music." },
      { phrase: "look at", translation: "注視", example: "Look at the stars." }
    ],
    sentences: [
      { sentence: "I saw a dog running in the park.", translation: "我看到一隻狗在公園跑。", note: "強調動作正在進行用 V-ing。" },
      { sentence: "Did you hear the baby cry?", translation: "你有聽到寶寶哭嗎？", note: "強調事實用原形。" }
    ]
  },
  "6-5": {
    vocabulary: [
      { word: "environment", translation: "環境", example: "Save the environment.", partOfSpeech: "n." },
      { word: "protect", translation: "保護", example: "Protect our earth.", partOfSpeech: "v." },
      { word: "earth", translation: "地球", example: "Mother Earth.", partOfSpeech: "n." },
      { word: "plastic", translation: "塑膠", example: "Plastic bags.", partOfSpeech: "n." },
      { word: "reduce", translation: "減少", example: "Reduce waste.", partOfSpeech: "v." }
    ],
    grammar: [
      { title: "Review: Passive Voice", rule: "總複習被動語態。注意時態變化。", example: "The trash must be recycled." },
      { title: "Review: Perfect Tense", rule: "總複習完成式。", example: "We have done a lot." }
    ],
    phrases: [
      { phrase: "turn off", translation: "關掉", example: "Turn off the lights." },
      { phrase: "save energy", translation: "節約能源", example: "We should save energy." }
    ],
    sentences: [
      { sentence: "The earth should be protected by us.", translation: "地球應該被我們保護。", note: "助動詞被動態 (should be p.p.)。" },
      { sentence: "Have you recycled the bottles?", translation: "你回收瓶子了嗎？", note: "完成式複習。" }
    ]
  },
  "6-6": {
    vocabulary: [
      { word: "graduate", translation: "畢業", example: "I will graduate soon.", partOfSpeech: "v." },
      { word: "diploma", translation: "文憑", example: "High school diploma.", partOfSpeech: "n." },
      { word: "memory", translation: "回憶", example: "Good memories.", partOfSpeech: "n." },
      { word: "miss", translation: "想念/錯過", example: "I will miss you.", partOfSpeech: "v." },
      { word: "future", translation: "未來", example: "Bright future.", partOfSpeech: "n." }
    ],
    grammar: [
      { title: "Review: 綜合句型", rule: "國中三年文法總回顧。", example: "Keep learning." },
      { title: "祝福語", rule: "Good luck, Best wishes...", example: "Wish you all the best." }
    ],
    phrases: [
      { phrase: "keep in touch", translation: "保持聯絡", example: "Let's keep in touch." },
      { phrase: "say goodbye", translation: "道別", example: "Time to say goodbye." }
    ],
    sentences: [
      { sentence: "It is time to say goodbye.", translation: "是時候道別了。", note: "不定詞用法。" },
      { sentence: "I will never forget you.", translation: "我永遠不會忘記你們。", note: "未來式否定。" }
    ]
  }
};
