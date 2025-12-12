
import { LessonContent } from './lessons_types';
import { book1Data } from './lessons_b1';

// Re-export types for use in other files
export * from './lessons_types';

// Only load Book 1 data
const database: Record<string, LessonContent> = {
  ...book1Data
};

export const getLessonData = (book: number, lesson: number): LessonContent => {
  const key = `${book}-${lesson}`;
  if (database[key]) {
    return database[key];
  }
  
  // Fallback / Empty state for undefined lessons
  return {
      vocabulary: [],
      grammar: [],
      phrases: [],
      sentences: []
  };
};

export const getLessonRange = (book: number, startUnit: number, endUnit: number): LessonContent => {
  const aggregated: LessonContent = {
    vocabulary: [],
    grammar: [],
    phrases: [],
    sentences: []
  };

  for (let i = startUnit; i <= endUnit; i++) {
    const key = `${book}-${i}`;
    if (database[key]) {
      aggregated.vocabulary.push(...database[key].vocabulary);
      aggregated.grammar.push(...database[key].grammar);
      aggregated.phrases.push(...database[key].phrases);
      aggregated.sentences.push(...database[key].sentences);
    }
  }

  return aggregated;
};

// New function to retrieve the entire database for global search/listing
export const getAllLessons = (): Record<string, LessonContent> => {
  return database;
};
