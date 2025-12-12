
import { LessonContent } from './lessons_types';

export const book5Data: Record<string, LessonContent> = {
  "5-1": {
    vocabulary: [
      { word: "girl", translation: "女孩", example: "The girl is nice.", partOfSpeech: "n." },
      { word: "wear", translation: "穿著", example: "She is wearing a red dress.", partOfSpeech: "v." },
      { word: "glasses", translation: "眼鏡", example: "He wears glasses.", partOfSpeech: "n." },
      { word: "handsome", translation: "英俊的", example: "A handsome boy.", partOfSpeech: "adj." },
      { word: "neighbor", translation: "鄰居", example: "My neighbor is kind.", partOfSpeech: "n." }
    ],
    grammar: [
      { title: "關係代名詞 (主格 Who/That)", rule: "修飾人。先行詞 + who/that + V...", example: "The girl who is singing is my sister." },
      { title: "關係代名詞 (主格 Which/That)", rule: "修飾物。先行詞 + which/that + V...", example: "The bus which comes here is late." }
    ],
    phrases: [
      { phrase: "next door", translation: "隔壁", example: "The boy next door." },
      { phrase: "look specifically", translation: "特別看", example: "Look closely." }
    ],
    sentences: [
      { sentence: "The man who is talking to Mom is my teacher.", translation: "正在跟媽媽講話的那個男人是我的老師。", note: "Who 引導形容詞子句。" },
      { sentence: "I like the dog which has a short tail.", translation: "我喜歡那隻短尾巴的狗。", note: "Which 修飾動物。" }
    ]
  },
  "5-2": {
    vocabulary: [
      { word: "gift", translation: "禮物", example: "A birthday gift.", partOfSpeech: "n." },
      { word: "receive", translation: "收到", example: "I received a letter.", partOfSpeech: "v." },
      { word: "like", translation: "喜歡", example: "I like it.", partOfSpeech: "v." },
      { word: "woman", translation: "女人", example: "A beautiful woman.", partOfSpeech: "n." },
      { word: "meet", translation: "遇見", example: "Nice to meet you.", partOfSpeech: "v." }
    ],
    grammar: [
      { title: "關係代名詞 (受格)", rule: "先行詞 + (who/whom/which/that) + S + V。受格關代可以省略。", example: "The man (who) I met yesterday is rich." },
      { title: "介系詞提前", rule: "The house in which I live...", example: "This is the pen with which he writes." }
    ],
    phrases: [
      { phrase: "talk about", translation: "談論", example: "The movie we talked about." },
      { phrase: "fall in love with", translation: "愛上", example: "He fell in love with her." }
    ],
    sentences: [
      { sentence: "The girl (who) you like is my cousin.", translation: "你喜歡的那個女孩是我表妹。", note: "受格關代省略。" },
      { sentence: "This is the book I bought yesterday.", translation: "這是我昨天買的書。", note: "省略 which。" }
    ]
  },
  "5-3": {
    vocabulary: [
      { word: "believe", translation: "相信", example: "I believe you.", partOfSpeech: "v." },
      { word: "true", translation: "真的", example: "Is it true?", partOfSpeech: "adj." },
      { word: "lie", translation: "謊言/說謊", example: "Don't tell a lie.", partOfSpeech: "n./v." },
      { word: "honest", translation: "誠實的", example: "Be honest.", partOfSpeech: "adj." },
      { word: "mistake", translation: "錯誤", example: "I made a mistake.", partOfSpeech: "n." }
    ],
    grammar: [
      { title: "名詞子句 (That)", rule: "S + V + that + S + V。That 可省略。作受詞用。", example: "I think (that) he is right." },
      { title: "虛主詞 It", rule: "It is + Adj + that...", example: "It is true that he lied." }
    ],
    phrases: [
      { phrase: "find out", translation: "發現", example: "I found out the truth." },
      { phrase: "make sure", translation: "確認", example: "Make sure that you are ready." }
    ],
    sentences: [
      { sentence: "I hope that you can come.", translation: "我希望你能來。", note: "That 引導名詞子句。" },
      { sentence: "He said (that) he was sick.", translation: "他說他生病了。", note: "過去式的名詞子句。" }
    ]
  },
  "5-4": {
    vocabulary: [
      { word: "ask", translation: "詢問", example: "May I ask a question?", partOfSpeech: "v." },
      { word: "know", translation: "知道", example: "I don't know.", partOfSpeech: "v." },
      { word: "whether", translation: "是否", example: "I don't know whether he will come.", partOfSpeech: "conj." },
      { word: "if", translation: "是否", example: "Ask him if he is hungry.", partOfSpeech: "conj." },
      { word: "weather", translation: "天氣", example: "The weather is nice.", partOfSpeech: "n." }
    ],
    grammar: [
      { title: "名詞子句 (Wh-)", rule: "Wh-單字 + S + V (間接問句)。不可倒裝。", example: "I don't know who he is." },
      { title: "名詞子句 (Whether/If)", rule: "表示「是否」。", example: "I am not sure if he likes me." }
    ],
    phrases: [
      { phrase: "no idea", translation: "不知道", example: "I have no idea where he is." },
      { phrase: "depend on", translation: "取決於", example: "It depends on the weather." }
    ],
    sentences: [
      { sentence: "Do you know where the station is?", translation: "你知道車站在哪裡嗎？", note: "間接問句不倒裝。" },
      { sentence: "Tell me what you want.", translation: "告訴我你想要什麼。", note: "What 引導的名詞子句。" }
    ]
  },
  "5-5": {
    vocabulary: [
      { word: "too", translation: "太...", example: "It is too hot.", partOfSpeech: "adv." },
      { word: "weak", translation: "虛弱的", example: "He is too weak to walk.", partOfSpeech: "adj." },
      { word: "enough", translation: "足夠的", example: "Good enough.", partOfSpeech: "adj./adv." },
      { word: "strong", translation: "強壯的", example: "He is strong enough.", partOfSpeech: "adj." },
      { word: "rich", translation: "富有的", example: "A rich man.", partOfSpeech: "adj." }
    ],
    grammar: [
      { title: "Too... to...", rule: "太...以至於不能...。隱含否定意味。", example: "The tea is too hot to drink." },
      { title: "Enough to...", rule: "夠...可以去...。", example: "He is old enough to drive." }
    ],
    phrases: [
      { phrase: "so... that...", translation: "如此...以致於...", example: "He is so rich that he can buy a plane." },
      { phrase: "too much", translation: "太多", example: "Too much sugar." }
    ],
    sentences: [
      { sentence: "The box is too heavy for me to lift.", translation: "這箱子太重我搬不動。", note: "Too...to..." },
      { sentence: "She is smart enough to solve the problem.", translation: "她夠聰明能解決這個問題。", note: "Enough to..." }
    ]
  },
  "5-6": {
    vocabulary: [
      { word: "used to", translation: "過去習慣", example: "I used to swim.", partOfSpeech: "phr." },
      { word: "habit", translation: "習慣", example: "Old habits die hard.", partOfSpeech: "n." },
      { word: "anymore", translation: "不再", example: "I don't love you anymore.", partOfSpeech: "adv." },
      { word: "smoke", translation: "抽菸", example: "No smoking.", partOfSpeech: "v." }
    ],
    grammar: [
      { title: "Used to", rule: "Used to + V原形。表示「過去習慣但現在沒有了」。", example: "He used to smoke." },
      { title: "Be used to", rule: "Be used to + V-ing。表示「習慣於...」。", example: "I am used to getting up early." }
    ],
    phrases: [
      { phrase: "get used to", translation: "漸漸習慣", example: "You will get used to it." },
      { phrase: "long time ago", translation: "很久以前", example: "It happened a long time ago." }
    ],
    sentences: [
      { sentence: "There used to be a park here.", translation: "這裡以前有一座公園。", note: "現在已經沒有了。" },
      { sentence: "I am used to the hot weather.", translation: "我習慣了炎熱的天氣。", note: "Be used to + N/Ving。" }
    ]
  }
};
