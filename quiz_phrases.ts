
import { PhraseItem } from './lessons_types';
import { QuizItem, QuizDifficulty } from './quiz_engine';
import { shuffleArray } from './utils';

export const generatePhrasesQuiz = (
  items: PhraseItem[],
  difficulty: QuizDifficulty
): QuizItem[] => {
  if (items.length === 0) return [];

  return shuffleArray(items.map((item, index) => {
    if (difficulty === 'standard') {
      const distractors = shuffleArray(items.filter(i => i.phrase !== item.phrase))
        .slice(0, 3)
        .map(i => i.translation);
      
      const fillers = ["放棄", "尋找", "起床", "照顧", "關掉", "打開", "坐下", "起立"];
      while (distractors.length < 3) {
        const filler = fillers.pop();
        if (filler && !distractors.includes(filler) && filler !== item.translation) {
          distractors.push(filler);
        }
      }

      const options = shuffleArray([item.translation, ...distractors]);

      return {
        id: `phr-std-${index}`,
        type: 'multiple-choice' as const,
        question: `片語 "${item.phrase}" 的意思是？`,
        options,
        correctAnswer: item.translation,
        explanation: `${item.phrase}: ${item.translation}\n例句: ${item.example}`,
        sourceItem: item
      };
    } else {
      // Advanced: Cloze
      const regex = new RegExp(item.phrase, 'gi');
      const questionText = item.example.replace(regex, '_______');
      
      if (questionText === item.example) {
         return {
            id: `phr-adv-fb-${index}`,
            type: 'multiple-choice' as const,
            question: `"${item.translation}" 的英文片語是？`,
            options: shuffleArray([item.phrase, "give up", "look for", "turn on"]),
            correctAnswer: item.phrase,
            explanation: `${item.phrase} (${item.translation})`,
            sourceItem: item
         }
      }

      const distractors = shuffleArray(items.filter(i => i.phrase !== item.phrase))
        .slice(0, 3)
        .map(i => i.phrase);
        
      const fillers = ["look at", "stand up", "come in", "go out"];
      while (distractors.length < 3) {
         distractors.push(fillers.pop() || "do it");
      }

      const options = shuffleArray([item.phrase, ...distractors]);

      return {
        id: `phr-adv-${index}`,
        type: 'multiple-choice' as const,
        question: `請選出最適合填入空格的片語：\n"${questionText}"`,
        options,
        correctAnswer: item.phrase,
        explanation: `完整句子: ${item.example}\n(${item.translation})`,
        sourceItem: item
      };
    }
  }));
};
