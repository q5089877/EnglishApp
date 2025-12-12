
import { LessonContent } from './lessons_types';

export const book1Data: Record<string, LessonContent> = {
  // --- Starter Unit ---
  "1-0": {
    vocabulary: [
      { word: "textbook", translation: "課本", example: "Open your textbook.", partOfSpeech: "n." },
      { word: "quiz", translation: "測驗", example: "We have a quiz today.", partOfSpeech: "n." },
      { word: "juicy", translation: "多汁的", example: "The apple is juicy.", partOfSpeech: "adj." },
      { word: "diamond", translation: "鑽石", example: "A shiny diamond.", partOfSpeech: "n." },
      { word: "fright", translation: "驚嚇", example: "It gave me a fright.", partOfSpeech: "n." },
      { word: "wasp", translation: "黃蜂", example: "Watch out for the wasp.", partOfSpeech: "n." },
      { word: "vacuum", translation: "吸塵器", example: "Use the vacuum.", partOfSpeech: "n." },
      { word: "metro", translation: "捷運", example: "Take the metro.", partOfSpeech: "n." },
      { word: "chill", translation: "寒冷/放鬆", example: "Just chill out.", partOfSpeech: "v." },
      { word: "galaxy", translation: "銀河", example: "Stars in the galaxy.", partOfSpeech: "n." }
    ],
    grammar: [
      { title: "人稱代名詞 (Pronouns)", rule: "主格：I (我), You (你), He (他), She (她), It (它)。", example: "I am Cody." },
      { title: "Be 動詞 (Be Verbs)", rule: "am 搭配 I; are 搭配 you; is 搭配 he/she/it。", example: "You are a student." },
      { title: "所有格 (Possessives)", rule: "my (我的), your (你的), his (他的), her (她的), its (它的)。", example: "What is your name?" }
    ],
    phrases: [
      { phrase: "stand up", translation: "起立", example: "Stand up, please." },
      { phrase: "sit down", translation: "坐下", example: "Sit down, please." }
    ],
    sentences: [
      { sentence: "What is your name?", translation: "你叫什麼名字？", note: "詢問姓名。" },
      { sentence: "My name is Jamie.", translation: "我的名字是 Jamie。", note: "回答姓名。" },
      { sentence: "How old are you?", translation: "你幾歲？", note: "詢問年齡。" },
      { sentence: "I am thirteen years old.", translation: "我十三歲。", note: "表達年紀。" }
    ]
  },

  // --- Unit 1: Who's That Handsome Boy? ---
  "1-1": {
    vocabulary: [
      { word: "handsome", translation: "英俊的", example: "He is a handsome boy.", partOfSpeech: "adj." },
      { word: "new", translation: "新的", example: "This is my new bag.", partOfSpeech: "adj." },
      { word: "classmate", translation: "同學", example: "She is my classmate.", partOfSpeech: "n." },
      { word: "young", translation: "年輕的", example: "My teacher is young.", partOfSpeech: "adj." },
      { word: "woman", translation: "女人", example: "Who is that woman?", partOfSpeech: "n." },
      { word: "very", translation: "非常", example: "Thank you very much.", partOfSpeech: "adv." },
      { word: "beautiful", translation: "美麗的", example: "The flower is beautiful.", partOfSpeech: "adj." },
      { word: "too", translation: "也", example: "Nice to meet you, too.", partOfSpeech: "adv." },
      { word: "cousin", translation: "堂表兄弟姐妹", example: "He is my cousin.", partOfSpeech: "n." },
      { word: "really", translation: "真地", example: "Is he really a doctor?", partOfSpeech: "adv." },
      { word: "singer", translation: "歌手", example: "He is a famous singer.", partOfSpeech: "n." },
      { word: "office worker", translation: "上班族", example: "My mom is an office worker.", partOfSpeech: "n." },
      { word: "housewife", translation: "家庭主婦", example: "She is a housewife.", partOfSpeech: "n." },
      { word: "police officer", translation: "警察", example: "Call the police officer.", partOfSpeech: "n." },
      { word: "writer", translation: "作家", example: "She is a good writer.", partOfSpeech: "n." },
      { word: "husband", translation: "丈夫", example: "He is her husband.", partOfSpeech: "n." },
      { word: "wife", translation: "妻子", example: "She is his wife.", partOfSpeech: "n." }
    ],
    grammar: [
      { title: "Be 動詞直述句", rule: "主詞 + BeV (am/are/is) + 名詞/形容詞。", example: "I am a student. She is tall." },
      { title: "Be 動詞否定句", rule: "在 BeV 後面加 not。", example: "I am not a teacher. She is not (isn't) old." },
      { title: "Be 動詞問句", rule: "將 BeV 移到句首：Am/Are/Is + 主詞...?", example: "Is he your brother?" },
      { title: "Who 問句", rule: "Who + is + he/she? (他是誰？)", example: "Who is that handsome boy?" }
    ],
    phrases: [
      { phrase: "nice to meet you", translation: "很高興認識你", example: "Nice to meet you." },
      { phrase: "I see", translation: "我了解了", example: "Oh, I see." },
      { phrase: "year(s) old", translation: "歲", example: "I am 13 years old." }
    ],
    sentences: [
      { sentence: "Who's that handsome boy?", translation: "那個帥哥是誰？", note: "Who is 的縮寫。" },
      { sentence: "He is my cousin, Max.", translation: "他是我的表哥，Max。", note: "介紹親戚。" },
      { sentence: "Is she a nurse?", translation: "她是護理師嗎？", note: "Yes/No 問句。" },
      { sentence: "No, she isn't. She is a doctor.", translation: "不，她不是。她是醫生。", note: "否定回答與更正。" }
    ]
  },

  // --- Unit 2: What Are Those? ---
  "1-2": {
    vocabulary: [
      { word: "house", translation: "房子", example: "My house is big.", partOfSpeech: "n." },
      { word: "parents", translation: "父母親", example: "I love my parents.", partOfSpeech: "n." },
      { word: "wall", translation: "牆壁", example: "The wall is white.", partOfSpeech: "n." },
      { word: "living room", translation: "客廳", example: "We watch TV in the living room.", partOfSpeech: "n." },
      { word: "purple", translation: "紫色(的)", example: "I like purple.", partOfSpeech: "adj./n." },
      { word: "special", translation: "特別的", example: "You are special.", partOfSpeech: "adj." },
      { word: "favorite", translation: "最喜愛(的)", example: "Red is my favorite color.", partOfSpeech: "adj./n." },
      { word: "color", translation: "顏色", example: "What color is it?", partOfSpeech: "n." },
      { word: "kitchen", translation: "廚房", example: "Mom is in the kitchen.", partOfSpeech: "n." },
      { word: "bedroom", translation: "臥室", example: "This is my bedroom.", partOfSpeech: "n." },
      { word: "but", translation: "但是", example: "I am short, but I am strong.", partOfSpeech: "conj." },
      { word: "gray", translation: "灰色(的)", example: "A gray cat.", partOfSpeech: "adj./n." },
      { word: "brown", translation: "棕色(的)", example: "A brown bear.", partOfSpeech: "adj./n." },
      { word: "cookie", translation: "餅乾", example: "I want a cookie.", partOfSpeech: "n." },
      { word: "mice", translation: "老鼠(複數)", example: "Three mice.", partOfSpeech: "n." },
      { word: "maybe", translation: "可能", example: "Maybe he is at home.", partOfSpeech: "adv." },
      { word: "behind", translation: "在...後面", example: "Look behind you.", partOfSpeech: "prep." },
      { word: "hungry", translation: "餓的", example: "I am hungry.", partOfSpeech: "adj." },
      { word: "notebook", translation: "筆記本", example: "Open your notebook.", partOfSpeech: "n." },
      { word: "pencil case", translation: "鉛筆盒", example: "My pencil case is blue.", partOfSpeech: "n." },
      { word: "gift", translation: "禮物", example: "A birthday gift.", partOfSpeech: "n." },
      { word: "bathroom", translation: "浴室", example: "Where is the bathroom?", partOfSpeech: "n." },
      { word: "dining room", translation: "飯廳", example: "Dinner is in the dining room.", partOfSpeech: "n." },
      { word: "sofa", translation: "沙發", example: "Sit on the sofa.", partOfSpeech: "n." }
    ],
    grammar: [
      { title: "What 問句 (單複數)", rule: "What is this/that? (這是什麼？) / What are these/those? (那些是什麼？)", example: "What are those? They are apples." },
      { title: "名詞複數", rule: "大多數加 s (pens); 字尾 s, x, ch, sh 加 es (buses, watches); 子音+y 去 y 加 ies (families)。", example: "cookie -> cookies, mouse -> mice (不規則)。" },
      { title: "地方介系詞", rule: "in (裡面), on (上面), under (下面), next to (旁邊), behind (後面), between (之間), in front of (前面)。", example: "The cat is on the sofa." }
    ],
    phrases: [
      { phrase: "take a look", translation: "看一看", example: "Let's take a look." },
      { phrase: "wait for", translation: "等待", example: "Wait for me." }
    ],
    sentences: [
      { sentence: "What are those in the brown box?", translation: "那個棕色盒子裡的是什麼？", note: "複數問句與介系詞片語。" },
      { sentence: "They're cookies for my mice.", translation: "它們是要給我的老鼠們吃的餅乾。", note: "They 代替 those。" },
      { sentence: "Where is your father?", translation: "你父親在哪裡？", note: "Where 問句。" },
      { sentence: "He's in the dining room.", translation: "他在飯廳裡。", note: "回答地點。" }
    ]
  },

  // --- Unit 3: Open the Magic Door ---
  "1-3": {
    vocabulary: [
      { word: "guy", translation: "傢伙/人", example: "Hey guys!", partOfSpeech: "n." },
      { word: "with", translation: "用/和...一起", example: "Come with me.", partOfSpeech: "prep." },
      { word: "can", translation: "能/會/可以", example: "I can swim.", partOfSpeech: "aux." },
      { word: "many", translation: "許多的", example: "Many people.", partOfSpeech: "adj." },
      { word: "place", translation: "地方", example: "This is a nice place.", partOfSpeech: "n." },
      { word: "use", translation: "使用", example: "Can I use your pen?", partOfSpeech: "v." },
      { word: "sure", translation: "當然", example: "Sure, go ahead.", partOfSpeech: "adv." },
      { word: "careful", translation: "小心的", example: "Be careful.", partOfSpeech: "adj." },
      { word: "museum", translation: "博物館", example: "Let's go to the museum.", partOfSpeech: "n." },
      { word: "hurry", translation: "快點", example: "Hurry up!", partOfSpeech: "v." },
      { word: "see", translation: "看見", example: "I see a bird.", partOfSpeech: "v." },
      { word: "wait", translation: "等待", example: "Wait a minute.", partOfSpeech: "v." },
      { word: "quiet", translation: "安靜的", example: "Be quiet.", partOfSpeech: "adj." },
      { word: "turn off", translation: "關掉", example: "Turn off the phone.", partOfSpeech: "phr." },
      { word: "sign", translation: "標誌", example: "Look at the sign.", partOfSpeech: "n." },
      { word: "talk", translation: "說話", example: "Don't talk.", partOfSpeech: "v." },
      { word: "fight", translation: "打架/吵架", example: "Don't fight.", partOfSpeech: "v." },
      { word: "check", translation: "檢查", example: "Check your answers.", partOfSpeech: "v." },
      { word: "wash", translation: "清洗", example: "Wash your hands.", partOfSpeech: "v." },
      { word: "follow", translation: "遵守/跟隨", example: "Follow the rules.", partOfSpeech: "v." },
      { word: "rule", translation: "規則", example: "Classroom rules.", partOfSpeech: "n." },
      { word: "safe", translation: "安全的", example: "Be safe.", partOfSpeech: "adj." }
    ],
    grammar: [
      { title: "祈使句 (Imperatives)", rule: "原形動詞開頭 (Stand up)。否定用 Don't + 原形 (Don't run)。加入 Please 較有禮貌。", example: "Please be careful. Don't eat here." },
      { title: "Let's 用法", rule: "Let's + 原形動詞 (我們一起...吧)。否定：Let's not...", example: "Let's go. Let's not fight." },
      { title: "助動詞 Can", rule: "表示能力或許可。Can + 原形動詞。問句：Can you...? 答：Yes, I can.", example: "Can we use it? No, we can't." },
      { title: "人稱代名詞受格", rule: "me, you, him, her, it, us, them。放在動詞或介系詞後。", example: "Listen to me. Look at him." }
    ],
    phrases: [
      { phrase: "let's go", translation: "我們走吧", example: "Let's go to the park." },
      { phrase: "be careful", translation: "小心", example: "Be careful with that knife." }
    ],
    sentences: [
      { sentence: "Open the magic door.", translation: "打開那扇魔法門。", note: "祈使句。" },
      { sentence: "Please don't run in the museum.", translation: "請勿在博物館內奔跑。", note: "否定祈使句。" },
      { sentence: "Can we use the phone?", translation: "我們可以使用電話嗎？", note: "Can 請求許可。" },
      { sentence: "Yes, you can.", translation: "可以。", note: "簡答。" }
    ]
  },

  // --- Unit 4: What Time Is the Concert? ---
  "1-4": {
    vocabulary: [
      { word: "music video", translation: "音樂影片", example: "Watch a music video.", partOfSpeech: "n." },
      { word: "band", translation: "樂團", example: "A rock band.", partOfSpeech: "n." },
      { word: "cute", translation: "可愛的", example: "The baby is cute.", partOfSpeech: "adj." },
      { word: "great", translation: "很棒的", example: "That's great!", partOfSpeech: "adj." },
      { word: "free", translation: "有空的/免費的", example: "Are you free today?", partOfSpeech: "adj." },
      { word: "weekend", translation: "週末", example: "On the weekend.", partOfSpeech: "n." },
      { word: "ready", translation: "準備好的", example: "Are you ready?", partOfSpeech: "adj." },
      { word: "p.m.", translation: "下午/晚上", example: "7 p.m.", partOfSpeech: "adv." },
      { word: "o'clock", translation: "點鐘", example: "Six o'clock.", partOfSpeech: "adv." },
      { word: "day", translation: "日子/天", example: "Have a nice day.", partOfSpeech: "n." },
      { word: "today", translation: "今天", example: "Today is Monday.", partOfSpeech: "n." },
      { word: "week", translation: "週", example: "Next week.", partOfSpeech: "n." },
      { word: "study", translation: "研讀", example: "Study English.", partOfSpeech: "v." },
      { word: "English", translation: "英文", example: "Speak English.", partOfSpeech: "n." },
      { word: "movie", translation: "電影", example: "Watch a movie.", partOfSpeech: "n." },
      { word: "party", translation: "派對", example: "Birthday party.", partOfSpeech: "n." },
      { word: "report", translation: "報導", example: "A news report.", partOfSpeech: "n." },
      { word: "popular", translation: "受歡迎的", example: "He is popular.", partOfSpeech: "adj." },
      { word: "fan", translation: "迷/粉絲", example: "I am a fan.", partOfSpeech: "n." },
      { word: "everyone", translation: "每個人", example: "Hi everyone.", partOfSpeech: "pron." },
      { word: "sign", translation: "簽名", example: "Sign here.", partOfSpeech: "v." }
    ],
    grammar: [
      { title: "詢問星期", rule: "What day is today? It's Monday.", example: "What day is the concert?" },
      { title: "詢問時間", rule: "What time is it? It's six o'clock.", example: "What time is the class?" },
      { title: "現在進行式", rule: "Be動詞 + V-ing。表示現在正在進行的動作。", example: "I am reading. He is sleeping." },
      { title: "現在分詞變化", rule: "直接+ing (playing); 去e+ing (dancing); 重複字尾+ing (running)。", example: "run -> running, dance -> dancing." }
    ],
    phrases: [
      { phrase: "take a look", translation: "看一看", example: "Take a look at this." },
      { phrase: "shake hands", translation: "握手", example: "Shake hands with me." },
      { phrase: "take a picture", translation: "照相", example: "Can I take a picture?" }
    ],
    sentences: [
      { sentence: "What time is the concert?", translation: "演唱會是幾點？", note: "詢問特定活動時間。" },
      { sentence: "It is at seven p.m.", translation: "在晚上七點。", note: "時間介系詞用 at。" },
      { sentence: "What are you doing?", translation: "你在做什麼？", note: "現在進行式問句。" },
      { sentence: "I am watching a music video.", translation: "我正在看音樂影片。", note: "現在進行式回答。" }
    ]
  },

  // --- Unit 5: What's the Date? ---
  "1-5": {
    vocabulary: [
      { word: "date", translation: "日期", example: "What's the date?", partOfSpeech: "n." },
      { word: "November", translation: "十一月", example: "In November.", partOfSpeech: "n." },
      { word: "first", translation: "第一(的)", example: "First prize.", partOfSpeech: "num." },
      { word: "Thanksgiving", translation: "感恩節", example: "Thanksgiving Day.", partOfSpeech: "n." },
      { word: "important", translation: "重要的", example: "It is important.", partOfSpeech: "adj." },
      { word: "holiday", translation: "節日", example: "A happy holiday.", partOfSpeech: "n." },
      { word: "when", translation: "何時", example: "When is it?", partOfSpeech: "adv." },
      { word: "fourth", translation: "第四(的)", example: "The fourth day.", partOfSpeech: "num." },
      { word: "birthday", translation: "生日", example: "Happy birthday.", partOfSpeech: "n." },
      { word: "also", translation: "也", example: "I am also hungry.", partOfSpeech: "adv." },
      { word: "before", translation: "在...之前", example: "Before dinner.", partOfSpeech: "prep." },
      { word: "next", translation: "下一個", example: "Next week.", partOfSpeech: "adj." },
      { word: "around", translation: "圍繞/在...附近", example: "Around the table.", partOfSpeech: "prep." },
      { word: "second", translation: "第二(的)", example: "Second place.", partOfSpeech: "num." },
      { word: "give", translation: "給", example: "Give me a hand.", partOfSpeech: "v." },
      { word: "thankful", translation: "感謝的", example: "I am thankful.", partOfSpeech: "adj." },
      { word: "nervous", translation: "緊張的", example: "Don't be nervous.", partOfSpeech: "adj." },
      { word: "hide", translation: "躲藏", example: "Hide under the bed.", partOfSpeech: "v." },
      { word: "mud", translation: "泥巴", example: "Play in the mud.", partOfSpeech: "n." },
      { word: "dinner", translation: "晚餐", example: "Eat dinner.", partOfSpeech: "n." },
      { word: "month", translation: "月份", example: "Which month?", partOfSpeech: "n." },
      { word: "January", translation: "一月", example: "Jan.", partOfSpeech: "n." },
      { word: "February", translation: "二月", example: "Feb.", partOfSpeech: "n." },
      { word: "December", translation: "十二月", example: "Dec.", partOfSpeech: "n." },
      { word: "animal", translation: "動物", example: "Wild animals.", partOfSpeech: "n." },
      { word: "cow", translation: "牛", example: "A milk cow.", partOfSpeech: "n." },
      { word: "lucky", translation: "幸運的", example: "You are lucky.", partOfSpeech: "adj." },
      { word: "only", translation: "唯一的/只是", example: "Only you.", partOfSpeech: "adv." }
    ],
    grammar: [
      { title: "詢問日期", rule: "What's the date today? It's November 21st.", example: "What's the date?" },
      { title: "序數 (Ordinal Numbers)", rule: "first (1st), second (2nd), third (3rd)... 用於日期。", example: "May first." },
      { title: "When 問句", rule: "When is your birthday? 詢問時間點。", example: "When is the party?" },
      { title: "介系詞 (時間)", rule: "at + 點鐘; on + 日期/星期; in + 月份/年份/季節。", example: "In May. On Sunday. At 5:00." }
    ],
    phrases: [
      { phrase: "cry out", translation: "喊叫", example: "Don't cry out." },
      { phrase: "thank goodness", translation: "謝天謝地", example: "Thank goodness you are safe." }
    ],
    sentences: [
      { sentence: "When is your birthday?", translation: "你的生日是什麼時候？", note: "詢問日期。" },
      { sentence: "It is on the fourth Thursday of November.", translation: "是在十一月的第四個星期四。", note: "日期介系詞用 on。" },
      { sentence: "What's the date today?", translation: "今天是幾月幾號？", note: "詢問日期。" }
    ]
  },

  // --- Unit 6: There Are Some Elephants over There ---
  "1-6": {
    vocabulary: [
      { word: "lion", translation: "獅子", example: "The lion is the king.", partOfSpeech: "n." },
      { word: "king", translation: "國王", example: "King of the jungle.", partOfSpeech: "n." },
      { word: "some", translation: "一些", example: "I have some money.", partOfSpeech: "adj." },
      { word: "elephant", translation: "大象", example: "A big elephant.", partOfSpeech: "n." },
      { word: "any", translation: "任何(用於否定/疑問)", example: "Do you have any brothers?", partOfSpeech: "adj." },
      { word: "tiger", translation: "老虎", example: "Tigers are scary.", partOfSpeech: "n." },
      { word: "zebra", translation: "斑馬", example: "Zebras have stripes.", partOfSpeech: "n." },
      { word: "back", translation: "背部/後面", example: "On my back.", partOfSpeech: "n." },
      { word: "help", translation: "幫忙", example: "I need help.", partOfSpeech: "n./v." },
      { word: "right", translation: "對的/右邊", example: "That's right.", partOfSpeech: "adj." },
      { word: "monkey", translation: "猴子", example: "Monkeys climb trees.", partOfSpeech: "n." },
      { word: "fox", translation: "狐狸", example: "A clever fox.", partOfSpeech: "n." },
      { word: "horse", translation: "馬", example: "Ride a horse.", partOfSpeech: "n." },
      { word: "rat", translation: "大老鼠", example: "I hate rats.", partOfSpeech: "n." },
      { word: "bear", translation: "熊", example: "A polar bear.", partOfSpeech: "n." },
      { word: "world", translation: "世界", example: "Around the world.", partOfSpeech: "n." },
      { word: "example", translation: "例子", example: "For example.", partOfSpeech: "n." },
      { word: "bug", translation: "蟲子", example: "A small bug.", partOfSpeech: "n." },
      { word: "food", translation: "食物", example: "Delicious food.", partOfSpeech: "n." },
      { word: "full", translation: "飽的/滿的", example: "I am full.", partOfSpeech: "adj." },
      { word: "healthy", translation: "健康的", example: "Healthy food.", partOfSpeech: "adj." },
      { word: "clean", translation: "乾淨的/清理", example: "Clean the room.", partOfSpeech: "adj./v." },
      { word: "never", translation: "從未", example: "I never smoke.", partOfSpeech: "adv." },
      { word: "know", translation: "知道", example: "I know the answer.", partOfSpeech: "v." },
      { word: "coat", translation: "外套/皮毛", example: "A warm coat.", partOfSpeech: "n." }
    ],
    grammar: [
      { title: "There is / There are", rule: "表示「有...」。單數/不可數用 There is，複數用 There are。", example: "There is a lion. There are some tigers." },
      { title: "Some 與 Any", rule: "Some 用於肯定句；Any 用於否定句與疑問句。", example: "There are some books. Are there any pens?" },
      { title: "可數名詞複數", rule: "字尾 s, es, ies 等變化規則。", example: "fox -> foxes, baby -> babies." }
    ],
    phrases: [
      { phrase: "over there", translation: "在那邊", example: "Look over there." },
      { phrase: "clean up", translation: "清理", example: "Clean up the mess." },
      { phrase: "thanks to", translation: "幸虧/由於", example: "Thanks to you." }
    ],
    sentences: [
      { sentence: "There is a lion over there.", translation: "那裡有一隻獅子。", note: "單數存在句。" },
      { sentence: "Are there any tigers in Africa?", translation: "非洲有老虎嗎？", note: "複數疑問句 (用 any)。" },
      { sentence: "No, there aren't.", translation: "不，沒有。", note: "簡答。" }
    ]
  }
};
