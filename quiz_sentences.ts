
import { SentenceItem } from './lessons_types';
import { QuizItem, QuizDifficulty } from './quiz_engine';
import { shuffleArray } from './utils';

export const generateSentencesQuiz = (
  items: SentenceItem[],
  difficulty: QuizDifficulty
): QuizItem[] => {
  if (items.length === 0) return [];

  return shuffleArray(items.map((item, index) => {
    if (difficulty === 'standard') {
      const distractors = shuffleArray(items.filter(i => i.sentence !== item.sentence))
        .slice(0, 3)
        .map(i => i.translation);
      
      const fillers = [
        "我不知道。", "這是一個好主意。", "很高興見到你。", 
        "請保持安靜。", "今天是星期幾？", "你的電話號碼是多少？"
      ];
      while (distractors.length < 3) {
        distractors.push(fillers.pop() || "錯誤選項");
      }

      const options = shuffleArray([item.translation, ...distractors]);

      return {
        id: `sent-std-${index}`,
        type: 'multiple-choice' as const,
        question: `請翻譯句型：\n"${item.sentence}"`,
        options,
        correctAnswer: item.translation,
        explanation: `解析: ${item.note}`,
        sourceItem: item
      };
    } else {
      const words = item.sentence.split(' ');
      const shuffled = shuffleArray([...words]);

      return {
        id: `sent-adv-${index}`,
        type: 'ordering' as const,
        question: `請重組句子 (翻譯: ${item.translation})`,
        correctAnswer: item.sentence,
        segments: shuffled,
        explanation: `正確句子: ${item.sentence}\n解析: ${item.note}`,
        sourceItem: item
      };
    }
  }));
};
