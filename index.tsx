
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { createPortal } from 'react-dom';
import { 
  ChevronLeft, 
  Volume2, 
  RotateCw, 
  GraduationCap, 
  Languages, 
  PenTool, 
  MessageCircle,
  CheckCircle2,
  BrainCircuit,
  Settings,
  Dna,
  BookOpen,
  Star,
  PlayCircle,
  HelpCircle,
  XCircle,
  Trophy,
  ArrowRight,
  RefreshCcw,
  History,
  Trash2,
  Calendar,
  AlertCircle,
  Check,
  Mic,
  MicOff,
  Clock,
  FileText,
  X,
  Flame,
  Download,
  Upload,
  Sliders,
  Music,
  Search,
  Library,
  Filter,
  Keyboard,
  Turtle
} from 'lucide-react';

// Import static data structure
import { getLessonData, getLessonRange, getAllLessons, LessonContent, VocabularyItem, GrammarItem, PhraseItem, SentenceItem } from './lessons';
// Import Quiz Engine
import { generateQuiz, generateReviewQuiz, generateExamQuiz, QuizCategory, QuizDifficulty, QuizItem } from './quiz_engine';
// Import Storage
import { 
  saveQuizResult, getQuizResults, clearQuizResults, QuizResult,
  saveMistake, getMistakes, removeMistake, MistakeItem,
  getVocabStatusMap, setVocabStatus, VocabStatus, VocabStatusMap,
  checkDailyStreak, getStats, getSettings, saveSettings, exportUserData, importUserData
} from './storage';
// Import Speech Services (OOP)
import { TextToSpeech, SpeechRecognizer, SpeechEvaluator } from './speech_services';
// Import Sound Service
import { SoundService } from './sound_services';

type Category = QuizCategory;

// Wrapper for backward compatibility with existing components
const playTTS = (text: string, speedOverride?: number) => {
  // Get current speed setting before playing
  const settings = getSettings();
  const speed = speedOverride !== undefined ? speedOverride : settings.ttsSpeed;
  TextToSpeech.getInstance().speak(text, 'en-US', speed);
};

// Portal Component to render modals at the document root
const Portal = ({ children }: { children: React.ReactNode }) => {
  return createPortal(children, document.body);
};

const SpeakingPracticeWidget = ({ targetText, mode = 'inline' }: { targetText: string, mode?: 'inline' | 'card' }) => {
  const [status, setStatus] = useState<'idle' | 'listening' | 'processing' | 'success' | 'error'>('idle');
  const [spokenText, setSpokenText] = useState('');
  
  // Use Ref to hold the recognizer instance
  const recognizerRef = useRef<SpeechRecognizer | null>(null);

  useEffect(() => {
    // Initialize recognizer
    recognizerRef.current = new SpeechRecognizer();
    return () => {
      // Cleanup if needed
      recognizerRef.current?.stop();
    };
  }, []);

  const startListening = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Stop any playing TTS
    TextToSpeech.getInstance().stop();

    if (!recognizerRef.current?.isSupported) {
       alert("您的瀏覽器不支援語音辨識功能。");
       return;
    }

    recognizerRef.current.start(
      () => { // onStart
        setStatus('listening');
        setSpokenText('');
      },
      (transcript) => { // onResult
        setStatus('processing');
        setSpokenText(transcript);
        
        const isCorrect = SpeechEvaluator.evaluate(transcript, targetText);
        if (isCorrect) {
          setStatus('success');
          SoundService.playCorrect();
        } else {
          setStatus('error');
          SoundService.playError();
        }
      },
      (error) => { // onError
        // Handle specific errors to improve UX
        if (error === 'no-speech') {
           alert("未偵測到聲音，請靠近麥克風再試一次。");
        } else if (error === 'not-allowed' || error === 'service-not-allowed') {
           alert("無法存取麥克風，請檢查瀏覽器權限設定。");
        } else if (error === 'network') {
           alert("網路連線錯誤，無法連接至語音辨識服務。請確認網路狀態。");
        } else if (error !== 'aborted') {
           console.warn("Speech recognition error:", error);
           alert("語音辨識發生錯誤，請稍後再試。");
        }
        
        setStatus('idle');
      },
      () => { // onEnd
        // Use functional update to check current status without stale closure
        setStatus(prev => (prev === 'listening' ? 'idle' : prev));
      }
    );
  };

  const stopListening = (e: React.MouseEvent) => {
    e.stopPropagation();
    recognizerRef.current?.stop();
    setStatus('idle');
  };

  // Inline Mode (Small button for lists)
  if (mode === 'inline') {
    return (
      <>
        <button 
          onClick={status === 'listening' ? stopListening : startListening}
          className={`
            flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full transition-all border
            ${status === 'listening' ? 'bg-red-100 text-red-600 border-red-200 animate-pulse' : 
              status === 'success' ? 'bg-green-100 text-green-700 border-green-200' :
              status === 'error' ? 'bg-orange-100 text-orange-700 border-orange-200' :
              'bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100'}
          `}
        >
          {status === 'listening' ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
          {status === 'listening' ? '聆聽中...' : 
           status === 'success' ? '正確！' : 
           status === 'error' ? '再試一次' : '口說'}
        </button>
        
        {/* Improved Feedback Modal Overlay for Error - Used Portal to avoid clipping */}
        {status === 'error' && spokenText && (
          <Portal>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/75 backdrop-blur-sm animate-in fade-in duration-200" onClick={(e) => { e.stopPropagation(); setStatus('idle'); }}>
              <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                
                {/* Header */}
                <div className="bg-red-50 px-5 py-4 flex items-center justify-between border-b border-red-100">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <span className="font-bold text-red-700 text-lg">辨識結果不符</span>
                  </div>
                  <button onClick={() => setStatus('idle')} className="p-1 hover:bg-red-100 rounded-full transition-colors">
                    <X className="w-6 h-6 text-red-400" />
                  </button>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="mb-5">
                    <div className="flex justify-between items-end mb-2">
                       <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">您說了：</div>
                    </div>
                    <div className="bg-gray-100 border-2 border-gray-200 rounded-xl p-4 text-lg font-medium text-gray-800 leading-relaxed break-words min-h-[4rem] max-h-[12rem] overflow-y-auto shadow-inner bg-opacity-100">
                      "{spokenText}"
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">正確答案應為：</div>
                     <div className="text-green-700 font-bold text-lg bg-green-50 px-4 py-3 rounded-xl border border-green-100 break-words leading-relaxed flex items-center justify-between">
                       <span>{targetText}</span>
                       <button onClick={() => playTTS(targetText)} className="p-2 bg-green-200 text-green-800 rounded-full hover:bg-green-300">
                         <Volume2 className="w-4 h-4" />
                       </button>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => setStatus('idle')} 
                      className="w-full py-3.5 bg-gray-100 text-gray-600 font-bold rounded-xl active:scale-95 transition-transform"
                    >
                      關閉
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); startListening(e); }}
                      className="w-full bg-gray-900 text-white font-bold py-3.5 rounded-xl shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
                    >
                      <RefreshCcw className="w-4 h-4" />
                      再試一次
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Portal>
        )}
      </>
    );
  }

  // Card Mode (Large button for Flashcards)
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <button 
        onClick={status === 'listening' ? stopListening : startListening}
        className={`
          w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all transform active:scale-95 border-4
          ${status === 'listening' ? 'bg-red-500 text-white border-red-300 animate-pulse' : 
            status === 'success' ? 'bg-green-500 text-white border-green-400' :
            status === 'error' ? 'bg-white text-orange-500 border-orange-200' :
            'bg-blue-600 text-white border-blue-400 hover:bg-blue-500'}
        `}
      >
        {status === 'listening' ? <MicOff className="w-10 h-10" /> : 
         status === 'success' ? <Check className="w-10 h-10" /> :
         status === 'error' ? <RefreshCcw className="w-10 h-10" /> :
         <Mic className="w-10 h-10" />}
      </button>

      <div className="min-h-[3rem] w-full px-4 flex flex-col items-center justify-center">
        {status === 'listening' && (
          <span className="text-white/80 text-sm font-bold animate-pulse tracking-wide">請大聲唸出來...</span>
        )}
        {status === 'success' && (
           <div className="bg-green-500 text-white px-4 py-1.5 rounded-full font-bold shadow-lg text-sm animate-in zoom-in">
             🎉 太棒了！發音正確
           </div>
        )}
        {status === 'error' && (
          <div className="w-full animate-in slide-in-from-bottom-2">
            <div className="bg-gray-100 rounded-2xl p-4 shadow-xl text-center relative max-h-[150px] overflow-y-auto border border-gray-200">
               <div className="sticky top-0 bg-gray-100 pb-1 border-b border-gray-200 mb-2 z-10">
                 <p className="text-orange-500 text-xs font-bold uppercase tracking-wide">辨識結果</p>
               </div>
               <p className="text-gray-800 text-base font-bold break-words leading-relaxed px-2">
                 "{spokenText}"
               </p>
            </div>
            <p className="text-gray-400 text-xs mt-2 text-center">請再試一次</p>
          </div>
        )}
        {status === 'idle' && (
          <span className="text-gray-400 text-xs">點擊麥克風練習口說</span>
        )}
      </div>
    </div>
  );
};

// --- Data Mapping ---

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

// --- Components ---

const App = () => {
  const [view, setView] = useState<'home' | 'lesson' | 'flashcards' | 'practice' | 'history' | 'exam-setup' | 'settings' | 'library'>('home');
  const selectedBook = 1;
  const [selectedLesson, setSelectedLesson] = useState<number>(0);
  const [lessonContent, setLessonContent] = useState<LessonContent | null>(null);
  const [activeTab, setActiveTab] = useState<Category>('vocabulary');
  
  // State for Review/Exam modes
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [isExamMode, setIsExamMode] = useState(false);
  const [examTitle, setExamTitle] = useState('');

  // Update streak on app load
  useEffect(() => {
    checkDailyStreak();
  }, []);

  // Load content immediately from static file
  const handleLessonSelect = (book: number, lesson: number) => {
    const data = getLessonData(book, lesson);
    setSelectedLesson(lesson);
    setLessonContent(data);
    setIsReviewMode(false);
    setIsExamMode(false);
    setView('lesson');
    setActiveTab('vocabulary'); 
  };

  const handleReviewMistakes = () => {
    const mistakes = getMistakes();
    if (mistakes.length === 0) {
      alert("目前沒有錯題需要複習！");
      return;
    }
    setLessonContent(null); // No specific lesson content needed for generic review
    setIsReviewMode(true);
    setIsExamMode(false);
    setView('practice');
  };

  const handleStartExam = (start: number, end: number, title: string) => {
    const data = getLessonRange(selectedBook, start, end);
    setLessonContent(data);
    setExamTitle(title);
    setIsReviewMode(false);
    setIsExamMode(true);
    setView('practice');
  };

  const renderContent = () => {
    switch (view) {
      case 'home':
        return (
          <Home 
            onSelect={handleLessonSelect} 
            onHistory={() => setView('history')} 
            onSettings={() => setView('settings')}
            onReviewMistakes={handleReviewMistakes} 
            onExamSetup={() => setView('exam-setup')}
            onLibrary={() => setView('library')}
          />
        );
      case 'history':
        return <HistoryView onBack={() => setView('home')} />;
      case 'settings':
        return <SettingsView onBack={() => setView('home')} />;
      case 'library':
        return <WordLibraryView onBack={() => setView('home')} onGoToLesson={(lessonId) => {
          // lessonId format "1-0"
          const [bk, ls] = lessonId.split('-');
          handleLessonSelect(parseInt(bk), parseInt(ls));
        }} />;
      case 'exam-setup':
        return <ExamSetup onBack={() => setView('home')} onStartExam={handleStartExam} />;
      case 'lesson':
        return (
          <LessonDashboard 
            book={selectedBook} 
            lesson={selectedLesson} 
            content={lessonContent!} 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onBack={() => setView('home')}
            onFlashcards={() => setView('flashcards')}
            onPractice={() => {
              setIsReviewMode(false);
              setIsExamMode(false);
              setView('practice');
            }}
          />
        );
      case 'flashcards':
        return (
          <FlashcardMode 
            words={lessonContent?.vocabulary || []} 
            onBack={() => setView('lesson')} 
          />
        );
      case 'practice':
        return (
          <PracticeMode
            lessonId={isReviewMode ? 'review-mistakes' : isExamMode ? `exam-${Date.now()}` : `${selectedBook}-${selectedLesson}`}
            lessonName={isReviewMode ? '錯題複習' : isExamMode ? examTitle : (UNIT_TITLES[selectedLesson] || `Unit ${selectedLesson}`)}
            content={lessonContent!}
            isReviewMode={isReviewMode}
            isExamMode={isExamMode}
            onBack={() => isReviewMode || isExamMode ? setView('home') : setView('lesson')}
          />
        );
      default:
        return <Home onSelect={handleLessonSelect} onHistory={() => setView('history')} onSettings={() => setView('settings')} onReviewMistakes={handleReviewMistakes} onExamSetup={() => setView('exam-setup')} onLibrary={() => setView('library')} />;
    }
  };

  return (
    <div className="min-h-screen bg-orange-50/30 text-gray-800 pb-safe font-sans">
      {renderContent()}
    </div>
  );
};

// --- Sub-Components ---
// ... (Home, WordLibraryView, SettingsView, ExamSetup, HistoryView, LessonDashboard, FlashcardMode kept same, jumping to PracticeMode update) ...

const Home = ({ onSelect, onHistory, onSettings, onReviewMistakes, onExamSetup, onLibrary }: any) => {
    // ... (This component remains largely the same, I will include it to ensure context is correct for the XML structure)
  const [mistakeCount, setMistakeCount] = useState(0);
  const [stats, setStats] = useState({ streak: 0, totalPoints: 0 });
  const [masteredCount, setMasteredCount] = useState(0);

  useEffect(() => {
    setMistakeCount(getMistakes().length);
    setStats(getStats());
    
    // Calculate mastered words
    const vocabMap = getVocabStatusMap();
    const count = Object.values(vocabMap).filter(s => s === 'mastered').length;
    setMasteredCount(count);
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto">
      <header className="mb-6 pt-6 flex justify-between items-start">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <BookOpen className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              國中英語第一冊
            </h1>
            <p className="text-green-700 font-medium text-sm">七年級上學期 (翰林版)</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={onHistory}
            className="bg-white p-3 rounded-full shadow-md border border-amber-100 text-amber-500 active:scale-95 transition-transform"
          >
            <Trophy className="w-6 h-6" />
          </button>
          <button 
            onClick={onSettings}
            className="bg-white p-3 rounded-full shadow-md border border-gray-100 text-gray-500 active:scale-95 transition-transform"
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Stats Dashboard (Gamification) */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white p-3 rounded-xl shadow-sm border border-orange-100 flex items-center gap-3">
          <div className="bg-orange-100 p-2 rounded-full text-orange-500">
            <Flame className="w-5 h-5 fill-current" />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-bold">連續學習</div>
            <div className="text-xl font-black text-gray-800">{stats.streak} <span className="text-xs font-normal text-gray-400">天</span></div>
          </div>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-sm border border-green-100 flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-full text-green-600">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-bold">已熟記單字</div>
            <div className="text-xl font-black text-gray-800">{masteredCount} <span className="text-xs font-normal text-gray-400">字</span></div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 mb-8">
        
        <button 
          onClick={onLibrary}
          className="w-full bg-white text-indigo-900 border border-indigo-100 p-4 rounded-xl flex items-center justify-between shadow-sm active:scale-98 transition-all hover:border-indigo-300"
        >
           <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
               <Library className="w-6 h-6" />
             </div>
             <div className="text-left">
               <h3 className="font-bold text-lg text-indigo-950">單字圖書館 (Library)</h3>
               <p className="text-xs text-indigo-400">全域搜尋 • 收藏管理</p>
             </div>
           </div>
           <ChevronLeft className="w-5 h-5 text-indigo-200 rotate-180" />
        </button>

        {/* Exam Mode Button */}
        <button 
          onClick={onExamSetup}
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4 rounded-xl flex items-center justify-between shadow-lg shadow-purple-500/20 active:scale-98 transition-all"
        >
           <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
               <FileText className="w-6 h-6" />
             </div>
             <div className="text-left">
               <h3 className="font-bold text-lg">模擬段考 (Exam)</h3>
               <p className="text-xs text-purple-100">模擬學校考試範圍 • 限時測驗</p>
             </div>
           </div>
           <ChevronLeft className="w-5 h-5 text-purple-200 rotate-180" />
        </button>

        {mistakeCount > 0 && (
          <button 
            onClick={onReviewMistakes}
            className="w-full bg-red-50 border border-red-200 p-4 rounded-xl flex items-center justify-between shadow-sm active:scale-98 transition-all animate-pulse"
          >
            <div className="flex items-center gap-3">
              <div className="bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow">
                {mistakeCount}
              </div>
              <div className="text-left">
                <h3 className="font-bold text-red-700">複習錯題本</h3>
                <p className="text-xs text-red-500">累積了 {mistakeCount} 個待加強的觀念</p>
              </div>
            </div>
            <ChevronLeft className="w-5 h-5 text-red-300 rotate-180" />
          </button>
        )}
      </div>

      {/* Lesson Grid */}
      <div className="space-y-4">
        {/* Starter Unit Special Card */}
        <button
            onClick={() => onSelect(1, 0)}
            className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 p-5 rounded-2xl shadow-lg border-0 text-white flex items-center gap-4 active:scale-98 transition-transform group relative overflow-hidden"
          >
            <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
              <Star className="w-24 h-24" />
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-lg backdrop-blur-sm">
              S
            </div>
            <div className="text-left">
              <div className="text-teal-100 text-xs font-bold uppercase tracking-wider mb-1">Introduction</div>
              <div className="font-bold text-xl">Starter Unit</div>
            </div>
        </button>

        <h3 className="text-sm font-bold text-gray-400 mt-6 px-1">正式課程</h3>
        
        <div className="grid gap-3">
          {[1, 2, 3, 4, 5, 6].map((lesson) => (
            <button
              key={lesson}
              onClick={() => onSelect(1, lesson)}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 active:scale-98 transition-all hover:border-green-400 hover:shadow-md group"
            >
              <div className="w-12 h-12 bg-gray-50 rounded-lg flex flex-col items-center justify-center group-hover:bg-green-50 transition-colors shrink-0">
                <span className="text-xs text-gray-400 font-bold group-hover:text-green-600">UNIT</span>
                <span className="text-xl font-bold text-gray-800 group-hover:text-green-700">{lesson}</span>
              </div>
              <div className="flex-1 text-left">
                <span className="font-bold text-gray-800 text-sm leading-tight block">
                  {UNIT_TITLES[lesson] || `Unit ${lesson}`}
                </span>
              </div>
              <ChevronLeft className="w-5 h-5 text-gray-300 rotate-180" />
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-12 text-center pb-8">
        <p className="text-xs text-gray-400">Offline Mode • Native TTS • 翰林版教材架構</p>
      </div>
    </div>
  );
};

// ... WordLibraryView, SettingsView, ExamSetup, HistoryView, LessonDashboard, FlashcardMode kept same ...
const WordLibraryView = ({ onBack, onGoToLesson }: { onBack: () => void, onGoToLesson: (id: string) => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'starred' | 'unmastered'>('all');
  const [vocabMap, setVocabMap] = useState<VocabStatusMap>({});
  const [allVocab, setAllVocab] = useState<{ word: string, def: string, unit: string, lessonName: string, item: VocabularyItem }[]>([]);

  useEffect(() => {
    // Flatten all lessons into a single list
    const lessons = getAllLessons();
    const map = getVocabStatusMap();
    setVocabMap(map);

    const flatList: any[] = [];
    Object.keys(lessons).forEach(key => {
      const [book, unitNum] = key.split('-');
      const uNum = parseInt(unitNum);
      const lessonName = UNIT_TITLES[uNum] || `Unit ${uNum}`;
      
      lessons[key].vocabulary.forEach(v => {
        flatList.push({
          word: v.word,
          def: v.translation,
          unit: key,
          lessonName: uNum === 0 ? "Starter" : `Unit ${uNum}`,
          item: v
        });
      });
    });
    setAllVocab(flatList);
  }, []);

  const filteredList = useMemo(() => {
    return allVocab.filter(v => {
      const matchesSearch = v.word.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            v.def.includes(searchTerm);
      
      if (!matchesSearch) return false;

      const status = vocabMap[v.word];
      if (filterMode === 'starred') return status === 'starred';
      if (filterMode === 'unmastered') return status !== 'mastered';
      
      return true;
    });
  }, [allVocab, searchTerm, filterMode, vocabMap]);

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
       <div className="bg-white shadow-sm px-4 py-3 sticky top-0 z-10">
          <div className="flex items-center gap-3 mb-3">
             <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h2 className="font-bold text-lg text-gray-800">全冊單字圖書館</h2>
          </div>

          <div className="relative mb-3">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="搜尋單字或中文解釋..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-100 pl-10 pr-4 py-2.5 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            <button 
              onClick={() => setFilterMode('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${filterMode === 'all' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-500'}`}
            >
              全部單字 ({allVocab.length})
            </button>
            <button 
              onClick={() => setFilterMode('starred')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1 ${filterMode === 'starred' ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-gray-100 text-gray-500'}`}
            >
              <Star className="w-3 h-3 fill-current" /> 已收藏
            </button>
            <button 
              onClick={() => setFilterMode('unmastered')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${filterMode === 'unmastered' ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' : 'bg-gray-100 text-gray-500'}`}
            >
              未熟記
            </button>
          </div>
       </div>

       <div className="flex-1 overflow-y-auto p-4">
         {filteredList.length === 0 ? (
           <div className="text-center text-gray-400 py-12">
             <Library className="w-16 h-16 mx-auto mb-4 opacity-20" />
             <p>找不到符合條件的單字</p>
           </div>
         ) : (
           <div className="space-y-2">
             {filteredList.map((entry, idx) => {
               const status = vocabMap[entry.word];
               return (
                 <div key={idx} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-indigo-200 transition-colors">
                   <div className="flex-1 cursor-pointer" onClick={() => onGoToLesson(entry.unit)}>
                     <div className="flex items-center gap-2 mb-0.5">
                       <span className="font-bold text-gray-900 text-lg">{entry.word}</span>
                       <span className="text-xs text-gray-400 font-mono bg-gray-50 px-1.5 rounded">{entry.item.partOfSpeech}</span>
                       {status === 'starred' && <Star className="w-3 h-3 text-amber-400 fill-current" />}
                       {status === 'mastered' && <Check className="w-3 h-3 text-green-500" />}
                     </div>
                     <div className="flex items-center gap-2">
                       <span className="text-gray-600 text-sm font-medium">{entry.def}</span>
                       <span className="text-[10px] text-indigo-400 bg-indigo-50 px-1.5 py-0.5 rounded font-bold">{entry.lessonName}</span>
                     </div>
                   </div>
                   <button 
                    onClick={(e) => { e.stopPropagation(); playTTS(entry.word); }}
                    className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full"
                   >
                     <Volume2 className="w-5 h-5" />
                   </button>
                 </div>
               );
             })}
           </div>
         )}
       </div>
    </div>
  );
};

const SettingsView = ({ onBack }: { onBack: () => void }) => {
  const [speed, setSpeed] = useState(0.9);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const s = getSettings();
    setSpeed(s.ttsSpeed);
    setSoundEnabled(s.soundEffects);
  }, []);

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSpeed = parseFloat(e.target.value);
    setSpeed(newSpeed);
    saveSettings({ ttsSpeed: newSpeed, soundEffects: soundEnabled });
  };

  const toggleSound = () => {
    const newVal = !soundEnabled;
    setSoundEnabled(newVal);
    saveSettings({ ttsSpeed: speed, soundEffects: newVal });
    if (newVal) SoundService.playCorrect(); // Test sound
  };

  const handleTestSpeech = () => {
    TextToSpeech.getInstance().speak("Hello, this is a speed test.", "en-US", speed);
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

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        if (importUserData(content)) {
          alert("資料匯入成功！頁面將重新整理。");
          window.location.reload();
        } else {
          alert("資料格式錯誤，匯入失敗。");
        }
      }
    };
    reader.readAsText(file);
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

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <div className="bg-white shadow-sm px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="font-bold text-lg text-gray-800">設定與資料</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 max-w-md mx-auto w-full">
        
        {/* Audio Settings */}
        <section className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4 text-blue-600">
            <Volume2 className="w-5 h-5" />
            <h3 className="font-bold">音訊與發音</h3>
          </div>
          
          <div className="mb-6">
             <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-gray-600 flex items-center gap-2">
                <Music className="w-4 h-4" /> 應用程式音效
              </span>
              <button 
                onClick={toggleSound}
                className={`w-12 h-6 rounded-full transition-colors relative ${soundEnabled ? 'bg-green-500' : 'bg-gray-300'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${soundEnabled ? 'left-[26px]' : 'left-0.5'}`} />
              </button>
            </div>
            <p className="text-xs text-gray-400 mb-6 border-b border-gray-100 pb-4">
              開啟答對/答錯時的提示音效。
            </p>


            <div className="flex justify-between mb-2">
              <span className="text-sm font-bold text-gray-600">TTS 朗讀速度</span>
              <span className="text-sm font-mono font-bold text-blue-600">{speed.toFixed(1)}x</span>
            </div>
            <input 
              type="range" 
              min="0.5" 
              max="1.5" 
              step="0.1" 
              value={speed}
              onChange={handleSpeedChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>慢 (0.5x)</span>
              <span>正常 (1.0x)</span>
              <span>快 (1.5x)</span>
            </div>
          </div>

          <button 
            onClick={handleTestSpeech}
            className="w-full py-2 bg-blue-50 text-blue-700 font-bold rounded-lg text-sm hover:bg-blue-100 transition-colors"
          >
            測試發音
          </button>
        </section>

        {/* Data Management */}
        <section className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4 text-purple-600">
            <Sliders className="w-5 h-5" />
            <h3 className="font-bold">資料管理</h3>
          </div>

          <div className="space-y-3">
            <button 
              onClick={handleExport}
              className="w-full py-3 border border-gray-200 rounded-xl flex items-center justify-center gap-2 font-bold text-gray-700 hover:bg-gray-50 active:scale-98 transition-all"
            >
              <Download className="w-5 h-5" />
              備份學習進度 (下載 JSON)
            </button>

            <div className="relative">
              <input 
                type="file" 
                accept=".json"
                ref={fileInputRef}
                onChange={handleImport}
                className="hidden" 
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3 border border-gray-200 rounded-xl flex items-center justify-center gap-2 font-bold text-gray-700 hover:bg-gray-50 active:scale-98 transition-all"
              >
                <Upload className="w-5 h-5" />
                還原學習進度 (匯入 JSON)
              </button>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="bg-white rounded-xl p-5 shadow-sm border border-red-100">
          <div className="flex items-center gap-2 mb-4 text-red-600">
            <AlertCircle className="w-5 h-5" />
            <h3 className="font-bold">危險區域</h3>
          </div>
          <p className="text-xs text-gray-500 mb-4">清除資料將會移除所有的單字記憶狀態、測驗分數與錯題記錄。</p>
          <button 
            onClick={handleClearData}
            className="w-full py-3 bg-red-50 text-red-600 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-red-100 active:scale-98 transition-all"
          >
            <Trash2 className="w-5 h-5" />
            清除所有學習資料
          </button>
        </section>

      </div>
    </div>
  );
};

// ... ExamSetup, HistoryView, LessonDashboard, FlashcardMode kept same ...
const ExamSetup = ({ onBack, onStartExam }: any) => {
  return (
    <div className="h-screen bg-gray-50 flex flex-col">
       <div className="bg-white shadow-sm px-4 py-3 flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h2 className="font-bold text-lg text-gray-800">模擬段考範圍選擇</h2>
        </div>

        <div className="p-6 max-w-md mx-auto w-full flex-1 overflow-y-auto">
          <div className="bg-purple-600 text-white p-6 rounded-2xl shadow-lg mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Clock className="w-32 h-32" />
            </div>
            <h3 className="text-2xl font-bold mb-2">考試模式說明</h3>
            <ul className="text-purple-100 text-sm space-y-2 list-disc pl-4">
              <li>隨機抽取 40 題 (20單字 + 10文法 + 10句型)</li>
              <li>每題 2.5 分，滿分 100 分</li>
              <li>限時 60 分鐘</li>
              <li>交卷後顯示成績與訂正</li>
            </ul>
          </div>

          <h3 className="font-bold text-gray-500 mb-4 px-1">請選擇考試範圍</h3>
          
          <div className="space-y-4">
            <button 
              onClick={() => onStartExam(0, 2, "第一次段考 (Starter-U2)")}
              className="w-full bg-white p-5 rounded-xl border border-purple-100 shadow-sm flex items-center gap-4 hover:border-purple-400 active:scale-98 transition-all group"
            >
              <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center font-bold text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">1st</div>
              <div className="text-left flex-1">
                <div className="font-bold text-gray-800 text-lg">第一次段考</div>
                <div className="text-xs text-gray-500">Starter Unit ~ Unit 2</div>
              </div>
            </button>

            <button 
              onClick={() => onStartExam(3, 4, "第二次段考 (U3-U4)")}
              className="w-full bg-white p-5 rounded-xl border border-purple-100 shadow-sm flex items-center gap-4 hover:border-purple-400 active:scale-98 transition-all group"
            >
              <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center font-bold text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">2nd</div>
              <div className="text-left flex-1">
                <div className="font-bold text-gray-800 text-lg">第二次段考</div>
                <div className="text-xs text-gray-500">Unit 3 ~ Unit 4</div>
              </div>
            </button>

            <button 
              onClick={() => onStartExam(5, 6, "第三次段考 (U5-U6)")}
              className="w-full bg-white p-5 rounded-xl border border-purple-100 shadow-sm flex items-center gap-4 hover:border-purple-400 active:scale-98 transition-all group"
            >
              <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center font-bold text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">3rd</div>
              <div className="text-left flex-1">
                <div className="font-bold text-gray-800 text-lg">第三次段考</div>
                <div className="text-xs text-gray-500">Unit 5 ~ Unit 6</div>
              </div>
            </button>

            <button 
              onClick={() => onStartExam(0, 6, "學期總複習 (All)")}
              className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white p-5 rounded-xl shadow-lg flex items-center gap-4 active:scale-98 transition-all mt-4"
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-bold">ALL</div>
              <div className="text-left flex-1">
                <div className="font-bold text-lg">全冊總複習</div>
                <div className="text-xs text-gray-300">Starter Unit ~ Unit 6</div>
              </div>
            </button>
          </div>
        </div>
    </div>
  );
};

const HistoryView = ({ onBack }: { onBack: () => void }) => {
    // ... kept same
  const [history, setHistory] = useState<QuizResult[]>([]);

  useEffect(() => {
    setHistory(getQuizResults());
  }, []);

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <div className="bg-white shadow-sm px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="font-bold text-lg text-gray-900">學習記錄</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4">
            <History className="w-16 h-16 opacity-30" />
            <p>尚無測驗記錄，快去練習吧！</p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((record) => {
              const isExam = record.category === 'exam';
              const scorePercent = (record.score / record.total) * 100;
              let scoreColor = 'text-red-500';
              let borderColor = 'border-red-100';
              let icon = <XCircle className="w-5 h-5 text-red-400" />;
              
              if (scorePercent === 100) {
                scoreColor = 'text-amber-500';
                borderColor = 'border-amber-200';
                icon = <Trophy className="w-5 h-5 text-amber-400" />;
              } else if (scorePercent >= 60) {
                scoreColor = 'text-green-600';
                borderColor = 'border-green-200';
                icon = <CheckCircle2 className="w-5 h-5 text-green-500" />;
              }

              return (
                <div key={record.id} className={`bg-white p-4 rounded-xl border ${borderColor} shadow-sm flex items-center justify-between`}>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                        {new Date(record.timestamp).toLocaleDateString()}
                      </span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${isExam ? 'bg-purple-100 text-purple-600' : 'text-gray-400'}`}>
                        {CATEGORY_NAMES[record.category] || record.category}
                      </span>
                      {record.difficulty === 'advanced' && (
                        <span className="text-[10px] font-bold bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded">ADV</span>
                      )}
                    </div>
                    <h3 className="font-bold text-gray-800 text-sm">{record.lessonName}</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className={`text-xl font-black ${scoreColor}`}>
                        {record.score}<span className="text-xs text-gray-300 font-medium">/{record.total}</span>
                      </div>
                    </div>
                    {icon}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const LessonDashboard = ({ 
  book, 
  lesson, 
  content, 
  activeTab, 
  setActiveTab, 
  onBack,
  onFlashcards,
  onPractice
}: any) => {
    // ... kept same
  const lessonTitle = UNIT_TITLES[lesson] || `Lesson ${lesson}`;
  const isStarter = lesson === 0;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-3 flex items-center justify-between z-10 sticky top-0">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="text-center">
          <div className="text-xs font-bold text-green-600 uppercase tracking-wider">
            {isStarter ? 'Starter Unit' : `Unit ${lesson}`}
          </div>
          <h2 className="font-bold text-gray-900 text-sm truncate max-w-[200px]">{lessonTitle}</h2>
        </div>
        <div className="w-8" /> 
      </div>

      {/* Categories */}
      <div className="flex bg-white border-b border-gray-100 overflow-x-auto no-scrollbar shadow-sm z-0">
        {[
          { id: 'vocabulary', label: '單字', icon: Languages },
          { id: 'grammar', label: '文法', icon: Settings },
          { id: 'phrases', label: '片語', icon: MessageCircle },
          { id: 'sentences', label: '句型', icon: PenTool },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 px-2 flex flex-col items-center gap-1 text-[10px] font-bold min-w-[70px] border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-green-600 text-green-700 bg-green-50/50'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'stroke-[2.5px]' : ''}`} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 pb-24">
        {activeTab === 'vocabulary' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 mb-6">
               <button 
                onClick={onFlashcards}
                className="bg-green-600 text-white py-3 rounded-xl shadow-lg shadow-green-600/20 flex flex-col items-center justify-center gap-1 font-bold active:scale-95 transition-transform"
               >
                 <RotateCw className="w-6 h-6 mb-1" />
                 <span>翻頁背單字</span>
               </button>
               <button 
                onClick={onPractice}
                className="bg-white text-green-700 border-2 border-green-100 py-3 rounded-xl shadow-sm flex flex-col items-center justify-center gap-1 font-bold active:scale-95 transition-transform"
               >
                 <Dna className="w-6 h-6 mb-1" />
                 <span>測驗練習</span>
               </button>
            </div>
            
            <div className="space-y-3">
              {content.vocabulary.map((item: VocabularyItem, idx: number) => (
                <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-green-200 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{item.word}</h3>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md font-mono">
                        {item.partOfSpeech || 'n.'}
                      </span>
                    </div>
                    <button 
                      onClick={() => playTTS(item.word)} 
                      className="text-green-600 p-2 bg-green-50 rounded-full active:bg-green-200"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-gray-700 font-medium mb-2">{item.translation}</p>
                  <p className="text-gray-400 text-sm italic pl-2 border-l-2 border-green-200">
                    {item.example}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'grammar' && (
          <div className="space-y-4">
            <div className="bg-blue-600 text-white p-4 rounded-xl shadow-lg shadow-blue-600/20 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-lg">文法重點</h4>
                <p className="text-xs text-blue-100 opacity-80">本單元核心觀念解析</p>
              </div>
              <BrainCircuit className="w-8 h-8 opacity-50" />
            </div>
            {content.grammar.map((item: GrammarItem, idx: number) => (
              <div key={idx} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-5 bg-orange-400 rounded-full"></div>
                  <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-gray-700 text-sm leading-relaxed mb-3 border border-gray-100">
                  {item.rule}
                </div>
                <div className="flex gap-2 text-sm">
                  <span className="font-bold text-green-600 shrink-0">Ex:</span>
                  <span className="text-gray-600">{item.example}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'phrases' && (
          <div className="space-y-3">
            {content.phrases.length === 0 ? (
              <div className="text-center text-gray-400 py-10">本單元無重點片語</div>
            ) : (
              content.phrases.map((item: PhraseItem, idx: number) => (
                <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-indigo-400">
                   <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-bold text-indigo-900">{item.phrase}</h3>
                       <button onClick={() => playTTS(item.phrase)} className="text-gray-300 hover:text-indigo-600">
                        <Volume2 className="w-4 h-4" />
                      </button>
                   </div>
                  <p className="text-gray-700 font-medium mb-1">{item.translation}</p>
                  <p className="text-sm text-gray-500">{item.example}</p>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'sentences' && (
          <div className="space-y-3">
            {content.sentences.map((item: SentenceItem, idx: number) => (
              <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 relative group">
                {/* Tag with rounded-tr-xl to match container corner since overflow is visible */}
                <div className="absolute top-0 right-0 bg-gray-100 px-3 py-1.5 rounded-bl-xl rounded-tr-xl text-[10px] text-gray-500 font-bold z-0">
                  句型 {idx + 1}
                </div>
                <div className="relative z-10 pr-2">
                   <p className="text-lg text-gray-900 font-medium mb-2 leading-snug">{item.sentence}</p>
                   <p className="text-gray-500 text-sm mb-3">{item.translation}</p>
                   
                   <div className="flex items-center justify-between mt-3">
                     {item.note && (
                       <span className="text-xs text-orange-500 font-medium bg-orange-50 px-2 py-1 rounded">
                          💡 {item.note}
                       </span>
                     )}
                     <div className="ml-auto flex items-center gap-3">
                       <SpeakingPracticeWidget targetText={item.sentence} mode="inline" />
                       <button 
                         onClick={() => playTTS(item.sentence)}
                         className="flex items-center gap-1 text-xs text-green-700 font-bold bg-green-100 px-3 py-1.5 rounded-full hover:bg-green-200 transition-colors"
                       >
                         <Volume2 className="w-3 h-3" /> 發音
                       </button>
                     </div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ... FlashcardMode kept same ...
const FlashcardMode = ({ words, onBack }: { words: VocabularyItem[], onBack: () => void }) => {
    // ... kept same (copy full content if needed or assume standard structure)
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [vocabStatus, setVocabStatusMap] = useState<VocabStatusMap>({});
  const [filter, setFilter] = useState<'all' | 'starred' | 'unmastered'>('all');

  useEffect(() => {
    setVocabStatusMap(getVocabStatusMap());
  }, []);

  const filteredWords = useMemo(() => {
    if (filter === 'all') return words;
    if (filter === 'starred') return words.filter(w => vocabStatus[w.word] === 'starred');
    if (filter === 'unmastered') return words.filter(w => vocabStatus[w.word] !== 'mastered');
    return words;
  }, [words, filter, vocabStatus]);

  const currentWord = filteredWords[currentIdx];

  // Wrapped in useMemo/useCallback to be safe for keyboard listener dependencies
  const handleNext = React.useCallback(() => {
    if (!filteredWords.length) return;
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIdx((prev) => (prev + 1) % filteredWords.length);
    }, 200);
  }, [filteredWords.length]);

  const handlePrev = React.useCallback(() => {
    if (!filteredWords.length) return;
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIdx((prev) => (prev - 1 + filteredWords.length) % filteredWords.length);
    }, 200);
  }, [filteredWords.length]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'ArrowLeft') handlePrev();
      else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setIsFlipped(p => !p);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  const toggleStatus = (word: string, status: VocabStatus) => {
    const newStatus = vocabStatus[word] === status ? 'none' : status;
    setVocabStatus(word, newStatus);
    setVocabStatusMap(prev => ({ ...prev, [word]: newStatus }));
  };

  if (!currentWord) {
    return (
      <div className="h-screen bg-gray-900 flex flex-col text-white items-center justify-center p-6 text-center">
        <h3 className="text-xl font-bold mb-4">沒有符合篩選條件的單字</h3>
        <button onClick={() => setFilter('all')} className="bg-green-600 px-6 py-2 rounded-full font-bold">
          顯示所有單字
        </button>
        <button onClick={onBack} className="mt-8 text-gray-400 underline">返回</button>
      </div>
    );
  }

  const isStarred = vocabStatus[currentWord.word] === 'starred';
  const isMastered = vocabStatus[currentWord.word] === 'mastered';

  return (
    <div className="h-screen bg-gray-900 flex flex-col text-white">
      {/* Header with Filters */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onBack} className="p-2 bg-gray-800 rounded-full hover:bg-gray-700">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="text-sm font-mono text-gray-400 bg-gray-800 px-3 py-1 rounded-full">
            {currentIdx + 1} / {filteredWords.length}
          </div>
          <div className="w-10"></div>
        </div>
        
        {/* Filter Bar */}
        <div className="flex bg-gray-800 rounded-lg p-1">
          {[
            { id: 'all', label: '全部' },
            { id: 'starred', label: '已收藏' },
            { id: 'unmastered', label: '未熟記' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => { setFilter(f.id as any); setCurrentIdx(0); setIsFlipped(false); }}
              className={`flex-1 text-xs font-bold py-2 rounded-md transition-all ${filter === f.id ? 'bg-gray-700 text-white shadow' : 'text-gray-500'}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Card */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 perspective-1000 min-h-[400px]">
        <div 
          className={`relative w-full max-w-xs aspect-[3/4] transition-all duration-500 transform-style-3d cursor-pointer group ${isFlipped ? 'rotate-y-180' : ''}`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front */}
          <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl flex flex-col items-center justify-center backface-hidden p-6 text-gray-900 border-b-8 border-gray-200 overflow-y-auto no-scrollbar">
            
            {/* Status Buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
               <button 
                onClick={(e) => { e.stopPropagation(); toggleStatus(currentWord.word, 'starred'); }}
                className={`p-2 rounded-full ${isStarred ? 'bg-amber-100 text-amber-500' : 'bg-gray-100 text-gray-300'}`}
               >
                 <Star className={`w-6 h-6 ${isStarred ? 'fill-current' : ''}`} />
               </button>
               <button 
                onClick={(e) => { e.stopPropagation(); toggleStatus(currentWord.word, 'mastered'); }}
                className={`p-2 rounded-full ${isMastered ? 'bg-green-100 text-green-500' : 'bg-gray-100 text-gray-300'}`}
               >
                 <Check className="w-6 h-6" />
               </button>
            </div>

            <span className="text-xs text-gray-300 font-bold uppercase tracking-widest absolute top-8 left-6">Vocabulary</span>
            <h2 className="text-4xl font-black text-center mb-6 text-gray-800 mt-8">{currentWord.word}</h2>
            <span className="bg-gray-100 px-4 py-1.5 rounded-full text-gray-500 font-mono text-sm font-bold shadow-inner mb-6">
              {currentWord.partOfSpeech}
            </span>
            
            {/* Speaking Widget - Integrated into Front Card */}
            <div className="mb-4 w-full px-4" onClick={(e) => e.stopPropagation()}>
              <SpeakingPracticeWidget targetText={currentWord.word} mode="card" />
            </div>

            <button 
              onClick={(e) => { e.stopPropagation(); playTTS(currentWord.word); }}
              className="p-3 bg-green-50 text-green-600 rounded-full hover:bg-green-100 hover:scale-110 transition-all shadow-sm absolute bottom-12 right-6"
            >
              <Volume2 className="w-5 h-5" />
            </button>
            <span className="text-xs text-gray-300 absolute bottom-6">Tap to flip • Space to flip</span>
          </div>

          {/* Back */}
          <div className="absolute inset-0 bg-green-500 rounded-3xl shadow-2xl flex flex-col items-center justify-center backface-hidden rotate-y-180 p-8 text-white border-b-8 border-green-700">
             <h3 className="text-3xl font-bold mb-8 tracking-wide">{currentWord.translation}</h3>
             <div className="w-12 h-1 bg-white/30 rounded-full mb-8"></div>
             <p className="text-center text-green-50 text-lg leading-relaxed font-medium">
               "{currentWord.example}"
             </p>
          </div>
        </div>
      </div>

      <div className="p-8 flex justify-between gap-6 max-w-md mx-auto w-full">
        <button onClick={handlePrev} className="flex-1 bg-gray-800 py-4 rounded-2xl font-bold active:bg-gray-700 transition-colors text-gray-300">
          上一個 (←)
        </button>
        <button onClick={handleNext} className="flex-1 bg-white text-gray-900 py-4 rounded-2xl font-bold active:scale-95 transition-transform shadow-lg shadow-white/10">
          下一個 (→)
        </button>
      </div>
    </div>
  );
};

const PracticeMode = ({ lessonId, lessonName, content, isReviewMode, isExamMode, onBack }: any) => {
  const [mode, setMode] = useState<'menu' | 'quiz'>('menu');
  const [category, setCategory] = useState<Category>('vocabulary');
  const [difficulty, setDifficulty] = useState<QuizDifficulty>('standard');

  const handleStartQuiz = (cat: Category) => {
    setCategory(cat);
    setMode('quiz');
  };

  // If in review or exam mode, skip menu and go straight to quiz (mixed)
  useEffect(() => {
    if (isReviewMode || isExamMode) {
      setMode('quiz');
    }
  }, [isReviewMode, isExamMode]);

  if (mode === 'menu' && !isReviewMode && !isExamMode) {
    return (
      <div className="h-screen bg-gray-50 flex flex-col">
        <div className="bg-white shadow-sm px-4 py-3 flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h2 className="font-bold text-lg text-gray-800">選擇測驗項目</h2>
        </div>
        
        <div className="p-6 grid gap-4 max-w-md mx-auto w-full">
          
          {/* Difficulty Switch */}
          <div className="flex bg-gray-200 p-1 rounded-xl mb-2">
            <button 
              onClick={() => setDifficulty('standard')}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${difficulty === 'standard' ? 'bg-white shadow text-gray-800' : 'text-gray-500'}`}
            >
              標準 (Standard)
            </button>
            <button 
              onClick={() => setDifficulty('advanced')}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${difficulty === 'advanced' ? 'bg-white shadow text-purple-600' : 'text-gray-500'}`}
            >
              進階 (Advanced)
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => handleStartQuiz('vocabulary')} 
              className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-green-300 active:scale-95 transition-all flex flex-col items-center gap-3"
            >
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <Languages className="w-6 h-6" />
              </div>
              <span className="font-bold text-gray-700">單字測驗</span>
            </button>

            <button 
              onClick={() => handleStartQuiz('phrases')} 
              className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-indigo-300 active:scale-95 transition-all flex flex-col items-center gap-3"
            >
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <span className="font-bold text-gray-700">片語測驗</span>
            </button>

            <button 
              onClick={() => handleStartQuiz('sentences')} 
              className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-orange-300 active:scale-95 transition-all flex flex-col items-center gap-3"
            >
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
                <PenTool className="w-6 h-6" />
              </div>
              <span className="font-bold text-gray-700">句型測驗</span>
            </button>

            <button 
              onClick={() => handleStartQuiz('grammar')} 
              className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-300 active:scale-95 transition-all flex flex-col items-center gap-3"
            >
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <span className="font-bold text-gray-700">文法測驗</span>
            </button>
          </div>

          {/* New Dictation Button */}
          <button 
            onClick={() => handleStartQuiz('dictation')} 
            className="w-full bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-teal-300 active:scale-95 transition-all flex items-center gap-4 group mt-2"
          >
             <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center shrink-0">
               <Keyboard className="w-6 h-6" />
             </div>
             <div className="text-left">
                <h3 className="font-bold text-gray-800">聽寫練習 (Dictation)</h3>
                <p className="text-xs text-gray-500">訓練聽力與拼字 • 慢速播放支援</p>
             </div>
          </button>
          
          <div className="bg-gray-100 p-4 rounded-xl flex items-start gap-3 mt-4">
            <HelpCircle className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
            <p className="text-xs text-gray-500 leading-relaxed">
              {difficulty === 'standard' 
                ? "標準模式：基礎選擇題，適合快速複習。" 
                : "進階模式：包含拼字、填空、重組等挑戰題型，加強記憶。"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <QuizPractice 
      lessonId={lessonId}
      lessonName={lessonName}
      content={content} 
      category={category} 
      difficulty={difficulty}
      isReviewMode={isReviewMode}
      isExamMode={isExamMode}
      onBack={onBack} 
    />
  );
};

const QuizPractice = ({ lessonId, lessonName, content, category, difficulty, isReviewMode, isExamMode, onBack }: any) => {
  const [items, setItems] = useState<QuizItem[]>([]);
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null); // For MC
  const [orderedSegments, setOrderedSegments] = useState<string[]>([]); // For Ordering
  const [availableSegments, setAvailableSegments] = useState<string[]>([]); // For Ordering
  const [typedAnswer, setTypedAnswer] = useState(''); // For Dictation
  
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);

  // Timer state
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isReviewMode) {
      const mistakes = getMistakes();
      const generated = generateReviewQuiz(mistakes);
      setItems(generated);
    } else if (isExamMode) {
       const generated = generateExamQuiz(content);
       setItems(generated);
       // Start Timer
       timerRef.current = window.setInterval(() => {
         setTimeLeft(prev => {
           if (prev <= 1) {
             clearInterval(timerRef.current!);
             // Auto submit logic could go here, but for simplicity we just stop at 0
             return 0;
           }
           return prev - 1;
         });
       }, 1000);
    } else {
      const generated = generateQuiz(content, category, difficulty);
      setItems(generated);
    }
    setQIdx(0);
    setScore(0);
    setShowResult(false);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [content, category, difficulty, isReviewMode, isExamMode]);

  useEffect(() => {
    // Reset state when moving to next question
    if (items[qIdx]) {
      if (items[qIdx].type === 'ordering') {
        setAvailableSegments([...(items[qIdx].segments || [])]);
        setOrderedSegments([]);
      } else if (items[qIdx].type === 'dictation') {
        setTypedAnswer('');
        // Auto-play audio when question loads? 
        // Better to let user click to play to avoid startling them.
      }
      setSelected(null);
      setShowResult(false);
      setIsCorrect(false);
    }
  }, [qIdx, items]);

  const handleResult = (correct: boolean) => {
    setIsCorrect(correct);
    setShowResult(true);
    
    // Play sound effect
    if (correct) {
      SoundService.playCorrect();
    } else {
      SoundService.playError();
    }
    
    const currentQ = items[qIdx];

    if (correct) {
      // Exam Mode: Each question 2.5 pts (Total 40 questions = 100)
      if (isExamMode) {
        setScore(s => s + 2.5);
      } else {
        setScore(s => s + 1);
      }
      
      // Logic for Review Mode: Remove from mistakes
      if (isReviewMode && currentQ.mistakeId) {
        removeMistake(currentQ.mistakeId);
      }
    } else {
      // Logic for Normal/Exam Mode: Add to mistakes
      if (!isReviewMode && currentQ.sourceItem) {
        // Find category from question ID prefix or infer
        let cat = category;
        if (isExamMode) {
             if (currentQ.id.startsWith('vocab')) cat = 'vocabulary';
             else if (currentQ.id.startsWith('gram')) cat = 'grammar';
             else if (currentQ.id.startsWith('sent')) cat = 'sentences';
             else if (currentQ.id.startsWith('dict')) cat = 'dictation';
        }
        saveMistake(lessonId, cat, currentQ.sourceItem);
      }
    }
  };

  const handleMCSelect = (opt: string) => {
    if (showResult) return;
    setSelected(opt);
    const correct = opt === items[qIdx].correctAnswer;
    handleResult(correct);
  };

  const handleSegmentClick = (seg: string, idx: number) => {
    if (showResult) return;
    const newAvail = [...availableSegments];
    newAvail.splice(idx, 1);
    setAvailableSegments(newAvail);
    setOrderedSegments([...orderedSegments, seg]);
  };

  const handleOrderedClick = (seg: string, idx: number) => {
    if (showResult) return;
    const newOrdered = [...orderedSegments];
    newOrdered.splice(idx, 1);
    setOrderedSegments(newOrdered);
    setAvailableSegments([...availableSegments, seg]);
  };

  const checkOrdering = () => {
    const userAnswer = orderedSegments.join(' ');
    const correct = userAnswer === items[qIdx].correctAnswer;
    handleResult(correct);
  };

  const checkDictation = () => {
    // Normalize string: remove punctuation, extra spaces, lowercase
    const normalize = (str: string) => str.toLowerCase().replace(/[.,?!'"]/g, '').replace(/\s+/g, ' ').trim();
    const correct = normalize(typedAnswer) === normalize(items[qIdx].correctAnswer);
    handleResult(correct);
  };

  const nextQ = () => {
    if (qIdx < items.length - 1) setQIdx(qIdx + 1);
    else {
      // End of quiz
      if (!isReviewMode) {
        // Save result
        // Exam: score is points (0-100), total is 100
        // Normal: score is correct count, total is items.length
        saveQuizResult({
          lessonId,
          lessonName,
          category: isExamMode ? 'exam' : category,
          difficulty: isExamMode ? 'standard' : difficulty,
          score,
          total: isExamMode ? 100 : items.length
        });
      }
      
      let msg = "";
      if (isReviewMode) {
        msg = "複習完成！答對的題目已從錯題本移除。";
      } else if (isExamMode) {
        msg = `考試結束！\n您的得分: ${score} / 100\n${score >= 60 ? "及格！恭喜！" : "再接再厲！"}\n成績已儲存。`;
      } else {
        msg = `測驗結束！得分: ${score} / ${items.length}\n成績已儲存`;
      }
      
      alert(msg);
      onBack();
    }
  };

  // Format Time
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!items || items.length === 0) {
    return (
      <div className="h-screen bg-gray-50 flex flex-col">
        <div className="bg-white shadow-sm px-4 py-3 flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h2 className="font-bold text-lg text-gray-800">{isReviewMode ? '錯題複習' : isExamMode ? '模擬段考' : '隨堂測驗'}</h2>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-4">
          <CheckCircle2 className="w-16 h-16 text-green-200" />
          <p>{isReviewMode ? "太棒了！目前沒有錯題需要複習。" : "沒有足夠的資料可供測驗。"}</p>
          <button onClick={onBack} className="px-6 py-2 bg-gray-200 rounded-full text-gray-600 font-bold">返回</button>
        </div>
      </div>
    );
  }

  const currentQ = items[qIdx];
  const progress = ((qIdx + 1) / items.length) * 100;
  const isTimeCritical = timeLeft < 300; // less than 5 mins

  return (
    <div className={`h-screen flex flex-col ${isReviewMode ? 'bg-red-50' : isExamMode ? 'bg-purple-50' : 'bg-gray-50'}`}>
       <div className="bg-white shadow-sm px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h2 className="font-bold text-lg text-gray-800 truncate max-w-[150px]">
            {isReviewMode ? '錯題複習' : isExamMode ? '模擬段考' : '隨堂測驗'}
          </h2>
        </div>
        
        {isExamMode && (
          <div className={`flex items-center gap-2 font-mono font-bold px-3 py-1 rounded-lg ${isTimeCritical ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-gray-100 text-gray-700'}`}>
             <Clock className="w-4 h-4" />
             {formatTime(timeLeft)}
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col p-6 max-w-md mx-auto w-full overflow-y-auto">
        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-6">
          <div className={`${isExamMode ? 'bg-purple-600' : 'bg-green-500'} h-1.5 rounded-full transition-all duration-300`} style={{ width: `${progress}%` }}></div>
        </div>

        <div className="mb-4 flex justify-between items-center">
          <span className={`text-xs font-bold px-2 py-1 rounded uppercase ${isExamMode ? 'bg-purple-100 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
            {isExamMode ? `Exam • ${currentQ.id.split('-')[0]}` : `${difficulty} • ${currentQ.type}`}
          </span>
          <span className="text-sm text-gray-400 font-mono font-bold">Q {qIdx + 1} / {items.length}</span>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-8 leading-snug whitespace-pre-line">{currentQ.question}</h3>

        {/* --- Multiple Choice Rendering --- */}
        {currentQ.type === 'multiple-choice' && (
          <div className="flex-1 space-y-3">
            {currentQ.options?.map((opt: string, idx: number) => {
              const isCorrectOpt = opt === currentQ.correctAnswer;
              const isSelected = opt === selected;
              
              let btnClass = "bg-white border-2 border-gray-100 text-gray-600 hover:border-gray-300";
              let icon = null;

              if (showResult) {
                if (isCorrectOpt) {
                  btnClass = "bg-green-50 border-green-500 text-green-800 shadow-sm";
                  icon = <CheckCircle2 className="w-5 h-5 text-green-600" />;
                } else if (isSelected) {
                  btnClass = "bg-red-50 border-red-500 text-red-800";
                  icon = <XCircle className="w-5 h-5 text-red-500" />;
                } else {
                  btnClass = "bg-gray-50 border-gray-100 text-gray-400 opacity-50";
                }
              } else if (isSelected) {
                btnClass = "bg-blue-50 border-blue-500 text-blue-700";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleMCSelect(opt)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-xl text-left font-bold text-sm transition-all flex items-center justify-between group ${btnClass}`}
                >
                  <span className="leading-relaxed">{opt}</span>
                  {icon}
                </button>
              );
            })}
          </div>
        )}

        {/* --- Ordering Rendering --- */}
        {currentQ.type === 'ordering' && (
          <div className="flex-1 flex flex-col">
            {/* Drop Zone */}
            <div className={`min-h-[100px] bg-white border-2 rounded-xl p-4 mb-6 flex flex-wrap gap-2 content-start transition-colors ${showResult ? (isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50') : 'border-dashed border-gray-300'}`}>
               {orderedSegments.length === 0 && !showResult && (
                 <span className="text-gray-300 text-sm font-bold w-full text-center py-4 select-none">點擊下方單字重組句子</span>
               )}
               {orderedSegments.map((seg, idx) => (
                 <button 
                   key={`ord-${idx}`} 
                   onClick={() => handleOrderedClick(seg, idx)}
                   disabled={showResult}
                   className="bg-gray-800 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-md active:scale-95 transition-transform"
                 >
                   {seg}
                 </button>
               ))}
            </div>

            {/* Source Zone */}
            <div className="flex flex-wrap gap-2 justify-center mb-8">
               {availableSegments.map((seg, idx) => (
                 <button 
                   key={`avail-${idx}`} 
                   onClick={() => handleSegmentClick(seg, idx)}
                   disabled={showResult}
                   className="bg-white border border-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-bold shadow-sm active:scale-95 transition-all hover:border-gray-400"
                 >
                   {seg}
                 </button>
               ))}
            </div>

            {!showResult && (
              <button 
                onClick={checkOrdering}
                disabled={orderedSegments.length === 0}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:shadow-none"
              >
                確認答案
              </button>
            )}
          </div>
        )}

        {/* --- Dictation Rendering (NEW) --- */}
        {currentQ.type === 'dictation' && (
           <div className="flex-1 flex flex-col items-center">
             
             {/* Audio Controls */}
             <div className="flex gap-4 mb-6 w-full justify-center">
               <button 
                 onClick={() => playTTS(currentQ.audioText || "", 0.8)} // Normal speed
                 className="w-20 h-20 rounded-full bg-teal-500 text-white shadow-xl flex items-center justify-center hover:bg-teal-400 active:scale-95 transition-all"
               >
                 <Volume2 className="w-10 h-10" />
               </button>
               <button 
                 onClick={() => playTTS(currentQ.audioText || "", 0.5)} // Slow speed
                 className="w-14 h-14 rounded-full bg-teal-100 text-teal-600 shadow-sm flex items-center justify-center hover:bg-teal-200 active:scale-95 transition-all"
                 title="慢速播放"
               >
                 <Turtle className="w-6 h-6" />
               </button>
             </div>
             
             <div className="w-full relative mb-8">
               <input
                 type="text"
                 value={typedAnswer}
                 onChange={(e) => setTypedAnswer(e.target.value)}
                 disabled={showResult}
                 placeholder="請輸入聽到的句子..."
                 className={`w-full p-4 rounded-xl border-2 text-lg font-medium outline-none transition-all ${
                   showResult 
                     ? (isCorrect ? 'border-green-500 bg-green-50 text-green-900' : 'border-red-500 bg-red-50 text-red-900') 
                     : 'border-gray-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-100'
                 }`}
               />
             </div>
             
             {/* Correct Answer Display */}
             {showResult && !isCorrect && (
               <div className="w-full mb-6 animate-in slide-in-from-bottom-2">
                 <div className="text-xs font-bold text-gray-400 uppercase mb-1">正確答案</div>
                 <div className="p-4 bg-gray-100 rounded-xl text-gray-800 font-bold border border-gray-200">
                   {currentQ.correctAnswer}
                 </div>
               </div>
             )}

             {!showResult && (
               <button 
                 onClick={checkDictation}
                 disabled={!typedAnswer.trim()}
                 className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:shadow-none hover:bg-teal-500 transition-all"
               >
                 提交答案
               </button>
             )}
           </div>
        )}

        {/* --- Explanation & Next --- */}
        {showResult && (
          <div className="mt-auto pt-6 animate-in slide-in-from-bottom-4 duration-300 w-full">
            <div className={`p-4 rounded-xl mb-4 text-sm leading-relaxed ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-50 text-red-800'}`}>
               <div className="font-bold mb-1">{isCorrect ? 'Correct!' : 'Incorrect'}</div>
               <div className="whitespace-pre-line">{currentQ.explanation}</div>
               {!isCorrect && !isReviewMode && (
                 <div className="mt-2 pt-2 border-t border-red-200 text-xs font-bold flex items-center gap-1">
                   <AlertCircle className="w-3 h-3" /> 已加入錯題本
                 </div>
               )}
               {isCorrect && isReviewMode && (
                 <div className="mt-2 pt-2 border-t border-green-200 text-xs font-bold flex items-center gap-1">
                   <Check className="w-3 h-3" /> 已從錯題本移除
                 </div>
               )}
            </div>
            <button 
              onClick={nextQ}
              className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
            >
              {qIdx < items.length - 1 ? "下一題" : "查看結果"} <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
