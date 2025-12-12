
export interface VocabularyItem {
  word: string;
  translation: string;
  example: string;
  partOfSpeech: string;
}

export interface GrammarItem {
  title: string;
  rule: string;
  example: string;
}

export interface PhraseItem {
  phrase: string;
  translation: string;
  example: string;
}

export interface SentenceItem {
  sentence: string;
  translation: string;
  note: string;
}

export interface LessonContent {
  vocabulary: VocabularyItem[];
  grammar: GrammarItem[];
  phrases: PhraseItem[];
  sentences: SentenceItem[];
}
