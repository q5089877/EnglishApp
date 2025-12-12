
import { SentenceItem } from './lessons_types';
import { QuizItem } from './quiz_engine';
import { shuffleArray } from './utils';

export const generateDictationQuiz = (
  items: SentenceItem[]
): QuizItem[] => {
  if (items.length === 0) return [];

  // Shuffle items
  const shuffledItems = shuffleArray(items);

  return shuffledItems.map((item, index) => {
    return {
      id: `dict-${index}`,
      type: 'dictation' as const,
      question: `請聆聽語音，並寫下您聽到的句子：`,
      audioText: item.sentence,
      correctAnswer: item.sentence,
      explanation: `原文: ${item.sentence}\n翻譯: ${item.translation}\n解析: ${item.note}`,
      sourceItem: item
    };
  });
};
