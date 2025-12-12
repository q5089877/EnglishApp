
import { LessonContent } from './lessons_types';

export const book3Data: Record<string, LessonContent> = {
  "3-1": {
    vocabulary: [
      { word: "summer", translation: "夏天", example: "Summer is hot.", partOfSpeech: "n." },
      { word: "vacation", translation: "假期", example: "Summer vacation.", partOfSpeech: "n." },
      { word: "trip", translation: "旅行", example: "Have a nice trip.", partOfSpeech: "n." },
      { word: "beach", translation: "海灘", example: "Let's go to the beach.", partOfSpeech: "n." },
      { word: "island", translation: "島嶼", example: "Taiwan is an island.", partOfSpeech: "n." }
    ],
    grammar: [
      { title: "過去進行式", rule: "was/were + V-ing。表示過去某個時間點正在進行的動作。", example: "I was sleeping at 10 PM." },
      { title: "When 連接詞", rule: "當...的時候。連接兩個過去的動作。", example: "When Mom came home, I was watching TV." }
    ],
    phrases: [
      { phrase: "take a trip", translation: "去旅行", example: "We took a trip to Japan." },
      { phrase: "look for", translation: "尋找", example: "He was looking for his keys." }
    ],
    sentences: [
      { sentence: "What were you doing at eight?", translation: "你八點的時候在做什麼？", note: "過去進行式問句。" },
      { sentence: "I was doing my homework.", translation: "我那時候在做功課。", note: "過去進行式回答。" }
    ]
  },
  "3-2": {
    vocabulary: [
      { word: "street", translation: "街道", example: "Cross the street.", partOfSpeech: "n." },
      { word: "corner", translation: "轉角", example: "Turn at the corner.", partOfSpeech: "n." },
      { word: "straight", translation: "直的", example: "Go straight.", partOfSpeech: "adj./adv." },
      { word: "block", translation: "街區", example: "Walk two blocks.", partOfSpeech: "n." },
      { word: "bank", translation: "銀行", example: "Where is the bank?", partOfSpeech: "n." },
      { word: "hospital", translation: "醫院", example: "Go to the hospital.", partOfSpeech: "n." }
    ],
    grammar: [
      { title: "指引方向", rule: "Go straight, Turn right, Turn left, It's on your right.", example: "Go straight for two blocks." },
      { title: "問路", rule: "How do I get to...? / Where is...?", example: "How do I get to the station?" }
    ],
    phrases: [
      { phrase: "across from", translation: "在對面", example: "The bank is across from the park." },
      { phrase: "between", translation: "在...之間", example: "It's between the bank and the shop." }
    ],
    sentences: [
      { sentence: "Excuse me, how do I get to the zoo?", translation: "不好意思，請問動物園怎麼去？", note: "標準問路句型。" },
      { sentence: "Go straight and turn left.", translation: "直走然後左轉。", note: "祈使句指引方向。" }
    ]
  },
  "3-3": {
    vocabulary: [
      { word: "first", translation: "第一", example: "The first prize.", partOfSpeech: "num." },
      { word: "second", translation: "第二", example: "The second floor.", partOfSpeech: "num." },
      { word: "third", translation: "第三", example: "The third day.", partOfSpeech: "num." },
      { word: "date", translation: "日期", example: "What is the date?", partOfSpeech: "n." },
      { word: "birthday", translation: "生日", example: "Happy birthday.", partOfSpeech: "n." },
      { word: "party", translation: "派對", example: "Let's have a party.", partOfSpeech: "n." }
    ],
    grammar: [
      { title: "序數 (Ordinal Numbers)", rule: "first, second, third, fourth... 用於日期和順序。", example: "September 28th." },
      { title: "日期寫法與讀法", rule: "Month + Day(序數)。", example: "May 5th." }
    ],
    phrases: [
      { phrase: "blow out", translation: "吹熄", example: "Blow out the candles." },
      { phrase: "make a wish", translation: "許願", example: "Make a wish." }
    ],
    sentences: [
      { sentence: "When is your birthday?", translation: "你的生日是什麼時候？", note: "詢問日期。" },
      { sentence: "It is on October tenth.", translation: "是在十月十日。", note: "日期前介系詞用 on。" }
    ]
  },
  "3-4": {
    vocabulary: [
      { word: "tomorrow", translation: "明天", example: "See you tomorrow.", partOfSpeech: "adv." },
      { word: "next", translation: "下一個", example: "Next week.", partOfSpeech: "adj." },
      { word: "future", translation: "未來", example: "In the future.", partOfSpeech: "n." },
      { word: "plan", translation: "計畫", example: "What is your plan?", partOfSpeech: "n." },
      { word: "camp", translation: "露營", example: "Summer camp.", partOfSpeech: "n." }
    ],
    grammar: [
      { title: "未來式 (be going to)", rule: "be going to + V原形。表示計畫好的未來。", example: "I am going to visit Japan." },
      { title: "未來式 (will)", rule: "will + V原形。表示意願或預測。", example: "I will help you." }
    ],
    phrases: [
      { phrase: "can't wait", translation: "迫不及待", example: "I can't wait to see you." },
      { phrase: "get ready", translation: "準備好", example: "Get ready for school." }
    ],
    sentences: [
      { sentence: "What are you going to do?", translation: "你打算做什麼？", note: "詢問計畫。" },
      { sentence: "I am going to study English.", translation: "我打算讀英文。", note: "表達計畫。" }
    ]
  },
  "3-5": {
    vocabulary: [
      { word: "famous", translation: "有名的", example: "He is a famous singer.", partOfSpeech: "adj." },
      { word: "singer", translation: "歌手", example: "A pop singer.", partOfSpeech: "n." },
      { word: "song", translation: "歌曲", example: "Sing a song.", partOfSpeech: "n." },
      { word: "fan", translation: "粉絲/迷", example: "I am a baseball fan.", partOfSpeech: "n." },
      { word: "concert", translation: "演唱會", example: "Go to a concert.", partOfSpeech: "n." }
    ],
    grammar: [
      { title: "受格代名詞", rule: "me, you, him, her, it, us, them。放在動詞或介系詞後面。", example: "Give it to me." },
      { title: "不定詞 (to V)", rule: "want / plan / need + to V。兩個動詞中間要有 to。", example: "I want to sleep." }
    ],
    phrases: [
      { phrase: "shake hands", translation: "握手", example: "Shake hands with him." },
      { phrase: "sign one's name", translation: "簽名", example: "Please sign your name." }
    ],
    sentences: [
      { sentence: "I want to be a singer.", translation: "我想要成為歌手。", note: "Want to + V。" },
      { sentence: "Do not laugh at him.", translation: "不要嘲笑他。", note: "him 為受格。" }
    ]
  },
  "3-6": {
    vocabulary: [
      { word: "fast", translation: "快的", example: "Run fast.", partOfSpeech: "adj./adv." },
      { word: "slow", translation: "慢的", example: "Walk slow.", partOfSpeech: "adj." },
      { word: "early", translation: "早的", example: "Get up early.", partOfSpeech: "adj./adv." },
      { word: "late", translation: "晚的", example: "Don't be late.", partOfSpeech: "adj." }
    ],
    grammar: [
      { title: "情態副詞", rule: "形容詞 + ly (大部分)。修飾動詞。", example: "He sings badly." },
      { title: "不規則副詞", rule: "good -> well, fast -> fast, hard -> hard。", example: "She plays well." }
    ],
    phrases: [
      { phrase: "on time", translation: "準時", example: "Be there on time." },
      { phrase: "hurry up", translation: "快一點", example: "Hurry up!" }
    ],
    sentences: [
      { sentence: "He runs very fast.", translation: "他跑得很快。", note: "Fast 修飾 Run。" },
      { sentence: "Please drive carefully.", translation: "請小心駕駛。", note: "Careful -> Carefully。" }
    ]
  }
};
