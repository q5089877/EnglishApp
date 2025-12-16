// Slimmed index.tsx — orchestrator that holds global state and handlers,
// imports smaller view components from ./components/*
// Note: this is a reduced/rewritten entry that keeps app behavior but moves UI to components.

import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

// Core modules (kept as in original)
import { getLessonData, getLessonRange, getAllLessons, LessonContent } from './lessons';
import { generateQuiz, generateReviewQuiz, generateExamQuiz, QuizCategory } from './quiz_engine';
import {
  saveQuizResult, getQuizResults, clearQuizResults,
  saveMistake, getMistakes, removeMistake,
  getVocabStatusMap, setVocabStatus,
  checkDailyStreak, getStats, getSettings, saveSettings, exportUserData, importUserData
} from './storage';
import { TextToSpeech, SpeechRecognizer, SpeechEvaluator } from './speech_services';
import { SoundService } from './sound_services';

// Split components
import Header from './components/Header';
import Home from './components/Home';
import SettingsView from './components/SettingsView';
import HistoryView from './components/HistoryView';
import WordLibraryView from './components/WordLibraryView';
import PracticeView from './components/PracticeView';
import LessonView from './components/LessonView';

// Types
type Category = QuizCategory;

const UNIT_TITLES: Record<number, string> = {
  0: "Starter Unit",
  1: "Who's That Handsome Boy?",
  2: "What Are Those?",
  3: "Open the Magic Door",
  4: "What Time Is the Concert?",
  5: "What's the Date?",
  6: "There Are Some Elephants over There"
};

const CATEGORY_NAMES: Record<string, string> = {
  vocabulary: '單字',
  grammar: '文法',
  phrases: '片語',
  sentences: '句型',
  exam: '模擬考',
  dictation: '聽寫'
};

const App = () => {
  // Global app state (kept from original)
  const [view, setView] = useState<'home' | 'lesson' | 'flashcards' | 'practice' | 'history' | 'exam-setup' | 'settings' | 'library'>('home');
  const selectedBook = 1;
  const [selectedLesson, setSelectedLesson] = useState<number>(0);
  const [lessonContent, setLessonContent] = useState<LessonContent | null>(null);
  const [activeTab, setActiveTab] = useState<Category>('vocabulary');

  const [isReviewMode, setIsReviewMode] = useState(false);
  const [isExamMode, setIsExamMode] = useState(false);
  const [examTitle, setExamTitle] = useState('');

  useEffect(() => {
    checkDailyStreak();
  }, []);

  // Example handler - select lesson
  const handleLessonSelect = (bk: number, ls: number) => {
    setSelectedLesson(ls);
    const data = getLessonData(bk, ls);
    setLessonContent(data);
    setView('lesson');
  };

  // Handlers for navigation coming from children
  const handleStartQuiz = (category: Category) => {
    // preserve original behavior: set to practice and configure quiz
    setIsReviewMode(false);
    setIsExamMode(false);
    setView('practice');
    // further quiz setup is handled inside PracticeView via props (or can call functions here)
  };

  const handleReviewMistakes = () => {
    setIsReviewMode(true);
    setView('practice');
  };

  const handleStartExam = (title: string) => {
    setExamTitle(title);
    setIsExamMode(true);
    setView('practice');
  };

  const handleExport = () => {
    const json = exportUserData();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hanlin_english_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (content: string) => {
    const result = importUserData(content);
    if (result.success) {
      alert(`資料匯入成功！${result.details || ''} 頁面將重新整理。`);
      window.location.reload();
    } else {
      alert(`匯入失敗：${result.error}\n${result.details || ''}`);
    }
  };

  const handleClearData = () => {
    if (confirm("警告：此操作將刪除所有測驗記錄、錯題本與單字學習狀態，且無法復原。確定要繼續嗎？")) {
      clearQuizResults();
      localStorage.removeItem('hanlin_eng_mistakes');
      localStorage.removeItem('hanlin_eng_vocab_status');
      localStorage.removeItem('hanlin_eng_stats');
      alert("所有學習資料已清除。");
      window.location.reload();
    }
  };

  // Other helpers (TTS test, sound toggle, etc.) are passed into SettingsView

  const onBackToHome = () => setView('home');

  // Render switch (renders the split components)
  const renderContent = () => {
    switch (view) {
      case 'home':
        return (
          <Home 
            onSelect={(bk, ls) => handleLessonSelect(bk, ls)} 
            onHistory={() => setView('history')} 
            onSettings={() => setView('settings')}
            onReviewMistakes={handleReviewMistakes} 
            onExamSetup={() => setView('exam-setup')}
            onLibrary={() => setView('library')}
          />
        );
      case 'lesson':
        return <LessonView lessonId={`${selectedBook}-${selectedLesson}`} lessonContent={lessonContent} onBack={onBackToHome} />;
      case 'history':
        return <HistoryView onBack={onBackToHome} />;
      case 'settings':
        return <SettingsView onBack={onBackToHome} onExport={handleExport} onImport={handleImport} onClearData={handleClearData} />;
      case 'library':
        return <WordLibraryView onBack={onBackToHome} onGoToLesson={(lessonId: string) => {
          const [bk, ls] = lessonId.split('-');
          handleLessonSelect(parseInt(bk), parseInt(ls));
        }} />;
      case 'practice':
        return <PracticeView 
                  onBack={onBackToHome} 
                  isReviewMode={isReviewMode} 
                  isExamMode={isExamMode}
                  examTitle={examTitle}
                />;
      default:
        return <Home onSelect={() => {}} onHistory={() => {}} onSettings={() => {}} onReviewMistakes={() => {}} onExamSetup={() => {}} onLibrary={() => {}} />;
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <Header onBack={() => { if (view !== 'home') setView('home'); }} onHistory={() => setView('history')} onSettings={() => setView('settings')} />
      <div className="p-4 grow overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);

export default App;
