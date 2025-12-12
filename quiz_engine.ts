
import { LessonContent } from './lessons_types';
import { generateVocabularyQuiz } from './quiz_vocabulary';
import { generateGrammarQuiz } from './quiz_grammar';
import { generatePhrasesQuiz } from './quiz_phrases';
import { generateSentencesQuiz } from './quiz_sentences';
import { generateDictationQuiz } from './quiz_dictation';
import { MistakeItem } from './storage';
import { shuffleArray } from './utils';

export type QuizCategory = 'vocabulary' | 'grammar' | 'phrases' | 'sentences' | 'dictation';
export type QuizDifficulty = 'standard' | 'advanced';
export type QuizType = 'multiple-choice' | 'ordering' | 'dictation';

export interface QuizItem {
  id: string;
  type: QuizType;
  question: string;
  options?: string[]; // For multiple choice
  correctAnswer: string; // Used for comparison
  audioText?: string; // Specific for dictation
  segments?: string[]; // For ordering
  explanation?: string;
  sourceItem?: any; // The original data object (for saving to mistakes)
  mistakeId?: string; // If this quiz came from the mistake DB
}

export const generateQuiz = (
  content: LessonContent,
  category: QuizCategory,
  difficulty: QuizDifficulty
): QuizItem[] => {
  switch (category) {
    case 'vocabulary':
      return generateVocabularyQuiz(content.vocabulary, difficulty);
    case 'grammar':
      return generateGrammarQuiz(content.grammar, difficulty);
    case 'phrases':
      return generatePhrasesQuiz(content.phrases, difficulty);
    case 'sentences':
      return generateSentencesQuiz(content.sentences, difficulty);
    case 'dictation':
      return generateDictationQuiz(content.sentences);
    default:
      return [];
  }
};

// Special generator that takes a list of MistakeItems and converts them back into quiz questions
export const generateReviewQuiz = (mistakes: MistakeItem[]): QuizItem[] => {
  const quizItems: QuizItem[] = [];

  mistakes.forEach(m => {
    // We treat review as "Standard" difficulty for simplicity, 
    // or we could randomly assign difficulty. Let's use Standard to ensure they get the basics right first.
    let generated: QuizItem[] = [];
    
    if (m.category === 'vocabulary') {
      generated = generateVocabularyQuiz([m.sourceItem], 'standard');
    } else if (m.category === 'grammar') {
      generated = generateGrammarQuiz([m.sourceItem], 'standard');
    } else if (m.category === 'phrases') {
      generated = generatePhrasesQuiz([m.sourceItem], 'standard');
    } else if (m.category === 'sentences') {
      generated = generateSentencesQuiz([m.sourceItem], 'standard');
    } else if (m.category === 'dictation') {
      generated = generateDictationQuiz([m.sourceItem]);
    }

    // Attach the mistakeId so we can delete it later if answered correctly
    generated.forEach(q => {
      q.mistakeId = m.id;
      quizItems.push(q);
    });
  });

  // Shuffle using Fisher-Yates
  return shuffleArray(quizItems);
};

// Exam generator: 20 Vocab, 10 Grammar, 10 Sentences
export const generateExamQuiz = (content: LessonContent): QuizItem[] => {
  // Generate pool for each category
  const allVocab = generateVocabularyQuiz(content.vocabulary, 'standard');
  const allGrammar = generateGrammarQuiz(content.grammar, 'standard');
  const allSentences = generateSentencesQuiz(content.sentences, 'standard');

  // Helper to pick random N items using Fisher-Yates
  const pickRandom = (items: QuizItem[], n: number) => {
    return shuffleArray(items).slice(0, n);
  };

  const selectedVocab = pickRandom(allVocab, 20);
  const selectedGrammar = pickRandom(allGrammar, 10);
  const selectedSentences = pickRandom(allSentences, 10);

  // Combine and shuffle
  return shuffleArray([...selectedVocab, ...selectedGrammar, ...selectedSentences]);
};
