
import { GrammarItem } from './lessons_types';
import { QuizItem, QuizDifficulty } from './quiz_engine';
import { shuffleArray } from './utils';

export const generateGrammarQuiz = (
  items: GrammarItem[],
  difficulty: QuizDifficulty
): QuizItem[] => {
  if (items.length === 0) return [];

  const quizItems: QuizItem[] = [];

  items.forEach((item, index) => {
    if (difficulty === 'standard') {
      // Standard: Rule comprehension
      const distractors = shuffleArray([
        "這個用法通常只用於過去式。",
        "動詞必須加 ing。",
        "必須放在句首使用。",
        "這是口語非正式用法。",
        "只能用於否定句。"
      ]).slice(0, 3);

      const options = shuffleArray([item.rule, ...distractors]);

      quizItems.push({
        id: `gram-std-${index}`,
        type: 'multiple-choice',
        question: `關於「${item.title}」的用法，下列敘述何者正確？`,
        options,
        correctAnswer: item.rule,
        explanation: `規則: ${item.rule}\n例句: ${item.example}`,
        sourceItem: item
      });
    } else {
      // Advanced: Logic / Example matching
      quizItems.push({
        id: `gram-adv-${index}`,
        type: 'multiple-choice',
        question: `請選出符合「${item.title}」文法規則的例句：`,
        options: shuffleArray([
          item.example,
          `I am going to ${item.title.split(' ')[0]} yesterday.`, 
          `He ${item.title.split(' ')[0]} not good.`,
          `They is very ${item.title.split(' ')[0]}.`
        ]),
        correctAnswer: item.example,
        explanation: `${item.title}: ${item.rule}`,
        sourceItem: item
      });
    }
  });

  return shuffleArray(quizItems);
};
