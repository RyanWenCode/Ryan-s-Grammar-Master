import { Type } from "@google/genai";

export enum Difficulty {
  BEGINNER = "初级",
  INTERMEDIATE = "中级",
  ADVANCED = "高级",
}

export enum GrammarCategory {
  NON_FINITE = "非谓语动词",
  RELATIVE_CLAUSE = "定语从句",
  ADVERBIAL_CLAUSE = "状语从句",
  NOUN_CLAUSE = "名词性从句",
  CONJUNCTION = "连词",
  TENSE = "时态",
  VOICE = "语态",
}

export interface Question {
  id: string;
  sentence: string; // Use "____" for blanks
  options: string[];
  correctAnswer: string;
  category: GrammarCategory;
  difficulty: Difficulty;
  explanation: {
    rule: string;
    example: string;
    commonMistake: string;
    translation: string;
  };
}

export const QUESTIONS: Question[] = [
  {
    id: "1",
    sentence: "______ tired, she still finished the report.",
    options: ["Feeling", "Felt", "To feel", "Feel"],
    correctAnswer: "Feeling",
    category: GrammarCategory.NON_FINITE,
    difficulty: Difficulty.INTERMEDIATE,
    explanation: {
      rule: "现在分词作状语，表示原因或伴随状态。主语 she 与 feel 是主动关系。",
      example: "Feeling hungry, the boy went to the kitchen.",
      commonMistake: "误用过去分词 Felt，过去分词通常表示被动或完成。",
      translation: "尽管感到疲倦，她还是完成了报告。"
    }
  },
  {
    id: "2",
    sentence: "The book ______ I bought yesterday is very interesting.",
    options: ["who", "which", "where", "whose"],
    correctAnswer: "which",
    category: GrammarCategory.RELATIVE_CLAUSE,
    difficulty: Difficulty.BEGINNER,
    explanation: {
      rule: "定语从句引导词。先行词是物（The book），在从句中作宾语，使用 which 或 that。",
      example: "The movie which we saw was great.",
      commonMistake: "误用 who，who 用于先行词是人的情况。",
      translation: "我昨天买的那本书很有趣。"
    }
  },
  {
    id: "3",
    sentence: "I won't go to the party ______ I am invited.",
    options: ["if", "unless", "because", "since"],
    correctAnswer: "unless",
    category: GrammarCategory.ADVERBIAL_CLAUSE,
    difficulty: Difficulty.INTERMEDIATE,
    explanation: {
      rule: "unless 相当于 if...not，意为“除非”。",
      example: "You will fail unless you work hard.",
      commonMistake: "误用 if，if 表示“如果”，逻辑不通。",
      translation: "除非我受到邀请，否则我不会去参加聚会。"
    }
  },
  {
    id: "4",
    sentence: "The teacher asked us ______ we had finished our homework.",
    options: ["that", "if", "what", "which"],
    correctAnswer: "if",
    category: GrammarCategory.NOUN_CLAUSE,
    difficulty: Difficulty.INTERMEDIATE,
    explanation: {
      rule: "宾语从句引导词。表示“是否”时，在及物动词后常用 if 或 whether。",
      example: "I wonder if it will rain tomorrow.",
      commonMistake: "误用 that，that 引导确定的事实，而此处是询问。",
      translation: "老师问我们是否已经完成了作业。"
    }
  },
  {
    id: "5",
    sentence: "______ the weather was bad, they decided to go hiking.",
    options: ["Because", "Although", "Unless", "If"],
    correctAnswer: "Although",
    category: GrammarCategory.ADVERBIAL_CLAUSE,
    difficulty: Difficulty.BEGINNER,
    explanation: {
      rule: "让步状语从句引导词，表示“尽管”。",
      example: "Although it was cold, he didn't wear a coat.",
      commonMistake: "误用 Because，逻辑相反。",
      translation: "尽管天气不好，他们还是决定去徒步。"
    }
  },
  {
    id: "6",
    sentence: "He is the man ______ son won the first prize.",
    options: ["who", "whom", "whose", "that"],
    correctAnswer: "whose",
    category: GrammarCategory.RELATIVE_CLAUSE,
    difficulty: Difficulty.INTERMEDIATE,
    explanation: {
      rule: "whose 引导定语从句，表示所属关系，修饰名词 son。",
      example: "A child whose parents are dead is an orphan.",
      commonMistake: "误用 who，who 在从句中作主语，不能表示所属关系。",
      translation: "他就是那个儿子获得了一等奖的男人。"
    }
  },
  {
    id: "7",
    sentence: "I saw him ______ the street when I was waiting for the bus.",
    options: ["cross", "crossing", "crossed", "to cross"],
    correctAnswer: "crossing",
    category: GrammarCategory.NON_FINITE,
    difficulty: Difficulty.INTERMEDIATE,
    explanation: {
      rule: "see sb. doing sth. 表示看到某人正在做某事（强调过程）。",
      example: "I heard her singing in the next room.",
      commonMistake: "误用 cross，see sb. do sth. 强调看到全过程或经常看到。",
      translation: "我等公交车时看到他正在过马路。"
    }
  },
  {
    id: "8",
    sentence: "Do you know ______ she is crying?",
    options: ["why", "what", "which", "who"],
    correctAnswer: "why",
    category: GrammarCategory.NOUN_CLAUSE,
    difficulty: Difficulty.BEGINNER,
    explanation: {
      rule: "why 引导宾语从句，在从句中作原因状语。",
      example: "Tell me why you are late.",
      commonMistake: "误用 what，what 在从句中需作主语或宾语。",
      translation: "你知道她为什么在哭吗？"
    }
  },
  {
    id: "9",
    sentence: "The news ______ our team won the game spread quickly.",
    options: ["that", "which", "what", "whether"],
    correctAnswer: "that",
    category: GrammarCategory.NOUN_CLAUSE,
    difficulty: Difficulty.ADVANCED,
    explanation: {
      rule: "that 引导同位语从句，解释说明 news 的具体内容。that 在从句中不作成分，仅起连接作用。",
      example: "The fact that he failed surprised us.",
      commonMistake: "误用 which，which 在定语从句中需作主语或宾语，而此句从句成分完整。",
      translation: "我们队赢了比赛的消息迅速传开了。"
    }
  },
  {
    id: "10",
    sentence: "______ by the teacher, the student felt very happy.",
    options: ["Praising", "Praised", "To praise", "Praise"],
    correctAnswer: "Praised",
    category: GrammarCategory.NON_FINITE,
    difficulty: Difficulty.INTERMEDIATE,
    explanation: {
      rule: "过去分词作状语，表示被动关系。主语 the student 与 praise 是被动关系。",
      example: "Seen from the hill, the city looks beautiful.",
      commonMistake: "误用 Praising，Praising 表示主动关系。",
      translation: "受到老师的表扬，那个学生感到很高兴。"
    }
  }
];
