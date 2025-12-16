import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  getQuizResults, getMistakes, getVocabStatusMap, getStats, getSettings,
  QuizResult, MistakeItem, VocabStatusMap, UserStats, UserSettings,
  checkDailyStreak, saveSettings
} from '../storage';
import { LessonContent, getLessonData } from '../lessons';
import { QuizCategory } from '../quiz_engine';

interface AppState {
  isLoading: boolean;
  view: 'home' | 'lesson' | 'flashcards' | 'practice' | 'history' | 'exam-setup' | 'settings' | 'library';
  selectedBook: number;
  selectedLesson: number;
  lessonContent: LessonContent | null;
  activeTab: QuizCategory;
  isReviewMode: boolean;
  isExamMode: boolean;
  examTitle: string;
  stats: UserStats;
  settings: UserSettings;
  mistakes: MistakeItem[];
  quizHistory: QuizResult[];
  vocabStatus: VocabStatusMap;
  toast: { message: string; type: 'success' | 'error' | 'info' | 'warning' } | null;
}

interface AppContextType extends AppState {
  setView: (view: AppState['view']) => void;
  selectLesson: (book: number, lesson: number) => void;
  setActiveTab: (tab: QuizCategory) => void;
  setReviewMode: (value: boolean) => void;
  setExamMode: (value: boolean, title?: string) => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
  refreshData: () => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  hideToast: () => void;
  setLoading: (value: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    isLoading: true,
    view: 'home',
    selectedBook: 1,
    selectedLesson: 0,
    lessonContent: null,
    activeTab: 'vocabulary',
    isReviewMode: false,
    isExamMode: false,
    examTitle: '',
    stats: { streak: 0, lastVisitDate: '', totalPoints: 0 },
    settings: { ttsSpeed: 0.9, soundEffects: true },
    mistakes: [],
    quizHistory: [],
    vocabStatus: {},
    toast: null
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const streak = checkDailyStreak();
        setState(prev => ({
          ...prev,
          isLoading: false,
          stats: getStats(),
          settings: getSettings(),
          mistakes: getMistakes(),
          quizHistory: getQuizResults(),
          vocabStatus: getVocabStatusMap()
        }));
      } catch (error) {
        console.error('Failed to load app data:', error);
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };
    loadData();
  }, []);

  const setView = (view: AppState['view']) => {
    setState(prev => ({ ...prev, view }));
  };

  const selectLesson = (book: number, lesson: number) => {
    const data = getLessonData(book, lesson);
    setState(prev => ({
      ...prev,
      selectedBook: book,
      selectedLesson: lesson,
      lessonContent: data,
      view: 'lesson'
    }));
  };

  const setActiveTab = (tab: QuizCategory) => {
    setState(prev => ({ ...prev, activeTab: tab }));
  };

  const setReviewMode = (value: boolean) => {
    setState(prev => ({ ...prev, isReviewMode: value }));
  };

  const setExamMode = (value: boolean, title?: string) => {
    setState(prev => ({ 
      ...prev, 
      isExamMode: value,
      examTitle: title || prev.examTitle
    }));
  };

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    const updated = { ...state.settings, ...newSettings };
    saveSettings(updated);
    setState(prev => ({ ...prev, settings: updated }));
  };

  const refreshData = () => {
    setState(prev => ({
      ...prev,
      stats: getStats(),
      mistakes: getMistakes(),
      quizHistory: getQuizResults(),
      vocabStatus: getVocabStatusMap()
    }));
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    setState(prev => ({ ...prev, toast: { message, type } }));
  };

  const hideToast = () => {
    setState(prev => ({ ...prev, toast: null }));
  };

  const setLoading = (value: boolean) => {
    setState(prev => ({ ...prev, isLoading: value }));
  };

  return (
    <AppContext.Provider value={{
      ...state,
      setView,
      selectLesson,
      setActiveTab,
      setReviewMode,
      setExamMode,
      updateSettings,
      refreshData,
      showToast,
      hideToast,
      setLoading
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
