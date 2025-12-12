
import { LessonContent } from './lessons_types';

export const book4Data: Record<string, LessonContent> = {
  "4-1": {
    vocabulary: [
      { word: "tall", translation: "高的", example: "He is tall.", partOfSpeech: "adj." },
      { word: "short", translation: "矮的", example: "She is short.", partOfSpeech: "adj." },
      { word: "heavy", translation: "重的", example: "This box is heavy.", partOfSpeech: "adj." },
      { word: "light", translation: "輕的", example: "It is light.", partOfSpeech: "adj." },
      { word: "expensive", translation: "昂貴的", example: "Cars are expensive.", partOfSpeech: "adj." },
      { word: "cheap", translation: "便宜的", example: "It is very cheap.", partOfSpeech: "adj." }
    ],
    grammar: [
      { title: "比較級 (Comparative)", rule: "Adj+er (taller) 或 more + Adj (more beautiful)。用於兩者比較。", example: "A is bigger than B." },
      { title: "Than 的用法", rule: "比...。 A + be + 比較級 + than + B。", example: "I am older than you." }
    ],
    phrases: [
      { phrase: "lose weight", translation: "減重", example: "He needs to lose weight." },
      { phrase: "look like", translation: "看起來像", example: "You look like your father." }
    ],
    sentences: [
      { sentence: "The elephant is heavier than the lion.", translation: "大象比獅子重。", note: "比較級句型。" },
      { sentence: "This watch is more expensive than that one.", translation: "這支錶比那支貴。", note: "多音節比較級。" }
    ]
  },
  "4-2": {
    vocabulary: [
      { word: "best", translation: "最好的", example: "He is my best friend.", partOfSpeech: "adj." },
      { word: "worst", translation: "最差的", example: "The worst day.", partOfSpeech: "adj." },
      { word: "delicious", translation: "美味的", example: "The food is delicious.", partOfSpeech: "adj." },
      { word: "market", translation: "市場", example: "Night market.", partOfSpeech: "n." },
      { word: "store", translation: "商店", example: "Department store.", partOfSpeech: "n." }
    ],
    grammar: [
      { title: "最高級 (Superlative)", rule: "The + Adj+est (the biggest) 或 The most + Adj。用於三者以上比較。", example: "He is the tallest student in class." },
      { title: "Of all / In the...", rule: "最高級常接的範圍片語。", example: "Of all the boys, Tom is the tallest." }
    ],
    phrases: [
      { phrase: "shopping mall", translation: "購物中心", example: "Let's go to the mall." },
      { phrase: "try on", translation: "試穿", example: "Can I try it on?" }
    ],
    sentences: [
      { sentence: "Who is the smartest student in your class?", translation: "你們班最聰明的學生是誰？", note: "最高級問句。" },
      { sentence: "This is the most delicious cake in the world.", translation: "這是世界上最好吃的蛋糕。", note: "長音節最高級。" }
    ]
  },
  "4-3": {
    vocabulary: [
      { word: "experience", translation: "經驗", example: "Work experience.", partOfSpeech: "n." },
      { word: "already", translation: "已經", example: "I have already eaten.", partOfSpeech: "adv." },
      { word: "yet", translation: "尚未/已經(問句)", example: "Have you finished yet?", partOfSpeech: "adv." },
      { word: "ever", translation: "曾經", example: "Have you ever been there?", partOfSpeech: "adv." },
      { word: "never", translation: "從未", example: "I have never seen a ghost.", partOfSpeech: "adv." }
    ],
    grammar: [
      { title: "現在完成式 (1)", rule: "Have/Has + p.p. 表示過去到現在的經驗或動作完成。", example: "I have finished my homework." },
      { title: "不規則 p.p.", rule: "go-went-gone, see-saw-seen, eat-ate-eaten。", example: "He has gone to USA." }
    ],
    phrases: [
      { phrase: "so far", translation: "到目前為止", example: "So far so good." },
      { phrase: "not yet", translation: "還沒", example: "Not yet." }
    ],
    sentences: [
      { sentence: "Have you ever been to Japan?", translation: "你曾經去過日本嗎？", note: "詢問經驗。" },
      { sentence: "Yes, I have been there twice.", translation: "有，我去過兩次。", note: "表達次數。" }
    ]
  },
  "4-4": {
    vocabulary: [
      { word: "since", translation: "自從", example: "Since 2010.", partOfSpeech: "prep./conj." },
      { word: "for", translation: "持續(時間)", example: "For two hours.", partOfSpeech: "prep." },
      { word: "live", translation: "居住", example: "I live in Taipei.", partOfSpeech: "v." },
      { word: "know", translation: "認識/知道", example: "I know him.", partOfSpeech: "v." },
      { word: "busy", translation: "忙碌的", example: "She has been busy.", partOfSpeech: "adj." }
    ],
    grammar: [
      { title: "現在完成式 (2)", rule: "表示持續的動作。常搭配 since + 過去時間點 或 for + 一段時間。", example: "I have lived here for 10 years." },
      { title: "How long", rule: "詢問持續多久。", example: "How long have you known him?" }
    ],
    phrases: [
      { phrase: "grow up", translation: "長大", example: "I grew up here." },
      { phrase: "move to", translation: "搬去", example: "He moved to Taipei." }
    ],
    sentences: [
      { sentence: "How long have you lived here?", translation: "你在這裡住多久了？", note: "詢問持續時間。" },
      { sentence: "I have lived here since 2005.", translation: "我從2005年就住這裡了。", note: "Since + 時間點。" }
    ]
  },
  "4-5": {
    vocabulary: [
      { word: "fix", translation: "修理", example: "Fix the car.", partOfSpeech: "v." },
      { word: "broken", translation: "破損的", example: "A broken window.", partOfSpeech: "adj." },
      { word: "steal", translation: "偷竊", example: "Someone stole my bag.", partOfSpeech: "v." },
      { word: "bite", translation: "咬", example: "The dog bit me.", partOfSpeech: "v." },
      { word: "invite", translation: "邀請", example: "Invite him to the party.", partOfSpeech: "v." }
    ],
    grammar: [
      { title: "被動語態 (Passive Voice)", rule: "Be動詞 + p.p. (+ by 行為者)。強調動作接受者。", example: "The car was washed by Dad." },
      { title: "主動與被動互換", rule: "受詞變主詞，動詞改被動。", example: "Mom loves me -> I am loved by Mom." }
    ],
    phrases: [
      { phrase: "take care of", translation: "照顧", example: "The baby is taken care of by Mary." },
      { phrase: "clean up", translation: "清理", example: "The room was cleaned up." }
    ],
    sentences: [
      { sentence: "The window was broken by the boy.", translation: "窗戶被那個男孩打破了。", note: "過去被動式。" },
      { sentence: "English is spoken in many countries.", translation: "許多國家都講英文。", note: "現在被動式。" }
    ]
  },
  "4-6": {
    vocabulary: [
      { word: "interest", translation: "興趣", example: "I have no interest in math.", partOfSpeech: "n." },
      { word: "interested", translation: "感興趣的(人)", example: "I am interested in art.", partOfSpeech: "adj." },
      { word: "interesting", translation: "有趣的(事)", example: "The book is interesting.", partOfSpeech: "adj." },
      { word: "bore", translation: "使厭煩", example: "The movie bored me.", partOfSpeech: "v." },
      { word: "tire", translation: "使疲累", example: "Running tires me.", partOfSpeech: "v." }
    ],
    grammar: [
      { title: "情緒動詞與分詞", rule: "V-ing (令人...的), V-ed (感到...的)。", example: "The game is exciting. I am excited." },
      { title: "介系詞搭配", rule: "interested in, bored with, excited about...", example: "He is bored with the class." }
    ],
    phrases: [
      { phrase: "be tired of", translation: "厭倦", example: "I am tired of eating pizza." },
      { phrase: "be scared of", translation: "害怕", example: "She is scared of spiders." }
    ],
    sentences: [
      { sentence: "The movie was boring.", translation: "這部電影很無聊。", note: "修飾事物用ing。" },
      { sentence: "I was bored.", translation: "我感到無聊。", note: "修飾人用ed。" }
    ]
  }
};
