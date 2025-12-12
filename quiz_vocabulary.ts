
import { VocabularyItem } from './lessons_types';
import { QuizItem, QuizDifficulty } from './quiz_engine';
import { shuffleArray } from './utils';

export const generateVocabularyQuiz = (
  items: VocabularyItem[],
  difficulty: QuizDifficulty
): QuizItem[] => {
  if (items.length === 0) return [];

  // Shuffle items first
  const shuffledItems = shuffleArray(items);

  return shuffleArray(shuffledItems.map((item, index) => {
    // Standard: EN -> TW translation
    if (difficulty === 'standard') {
      const distractors = shuffleArray(items.filter(i => i.word !== item.word))
        .slice(0, 3)
        .map(i => i.translation);
      
      const options = shuffleArray([item.translation, ...distractors]);

      return {
        id: `vocab-std-${index}`,
        type: 'multiple-choice' as const,
        question: `單字 "${item.word}" 的中文意思是？`,
        options,
        correctAnswer: item.translation,
        explanation: `${item.word} (${item.partOfSpeech}) ${item.translation}\n例句: ${item.example}`,
        sourceItem: item
      };
    } 
    // Advanced: Spelling / Definition check
    else {
      const distractors = shuffleArray(items.filter(i => i.word !== item.word))
        .slice(0, 3)
        .map(i => i.word);

      const options = shuffleArray([item.word, ...distractors]);

      return {
        id: `vocab-adv-${index}`,
        type: 'multiple-choice' as const,
        question: `下列哪個單字的意思是 "${item.translation}"？`,
        options,
        correctAnswer: item.word,
        explanation: `${item.word}: ${item.translation}`,
        sourceItem: item
      };
    }
  }));
};
