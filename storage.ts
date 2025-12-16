
export interface QuizResult {
  id: string;
  timestamp: number;
  lessonId: string;
  lessonName: string;
  category: string;
  difficulty: string;
  score: number;
  total: number;
}

// Generic interface for a mistake item
export interface MistakeItem {
  id: string; // Unique ID (usually category + specific text)
  timestamp: number;
  lessonId: string;
  category: string; // 'vocabulary' | 'grammar' | ...
  sourceItem: any; // The original data object (VocabularyItem, GrammarItem, etc.)
  count: number; // How many times they got it wrong
}

// Vocabulary Status
export type VocabStatus = 'none' | 'starred' | 'mastered';
export type VocabStatusMap = Record<string, VocabStatus>;

// User Settings & Stats
export interface UserSettings {
  ttsSpeed: number; // 0.5 to 1.5
  soundEffects: boolean; // New: Enable/Disable SFX
}

export interface UserStats {
  streak: number;
  lastVisitDate: string; // YYYY-MM-DD
  totalPoints: number; // Simple gamification points
}

const STORAGE_KEY_HISTORY = 'hanlin_eng_quiz_history';
const STORAGE_KEY_MISTAKES = 'hanlin_eng_mistakes';
const STORAGE_KEY_VOCAB = 'hanlin_eng_vocab_status';
const STORAGE_KEY_SETTINGS = 'hanlin_eng_settings';
const STORAGE_KEY_STATS = 'hanlin_eng_stats';

// --- Quiz History ---

export const saveQuizResult = (result: Omit<QuizResult, 'id' | 'timestamp'>) => {
  try {
    const history = getQuizResults();
    const newRecord: QuizResult = {
      ...result,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };
    const updatedHistory = [newRecord, ...history];
    if (updatedHistory.length > 100) updatedHistory.length = 100;
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updatedHistory));
    
    // Update total points (simple calculation)
    updateStats((stats) => {
       stats.totalPoints += Math.floor((result.score / result.total) * 10);
       return stats;
    });

  } catch (e) {
    console.error("Failed to save result", e);
  }
};

export const getQuizResults = (): QuizResult[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY_HISTORY);
    return data ? JSON.parse(data) : [];
  } catch (e) { return []; }
};

export const clearQuizResults = () => {
  localStorage.removeItem(STORAGE_KEY_HISTORY);
};

// --- Mistakes System ---

export const saveMistake = (lessonId: string, category: string, sourceItem: any) => {
  try {
    const mistakes = getMistakes();
    
    // Create a unique ID based on content to avoid duplicates
    let uniqueId = '';
    if (category === 'vocabulary') uniqueId = `vocab-${sourceItem.word}`;
    else if (category === 'grammar') uniqueId = `gram-${sourceItem.title}`;
    else if (category === 'phrases') uniqueId = `phr-${sourceItem.phrase}`;
    else if (category === 'sentences') uniqueId = `sent-${sourceItem.sentence}`;
    else uniqueId = `${category}-${JSON.stringify(sourceItem)}`;

    const existingIndex = mistakes.findIndex(m => m.id === uniqueId);

    if (existingIndex >= 0) {
      // Update existing
      mistakes[existingIndex].count += 1;
      mistakes[existingIndex].timestamp = Date.now();
    } else {
      // Add new
      mistakes.push({
        id: uniqueId,
        timestamp: Date.now(),
        lessonId,
        category,
        sourceItem,
        count: 1
      });
    }
    localStorage.setItem(STORAGE_KEY_MISTAKES, JSON.stringify(mistakes));
  } catch (e) { console.error("Failed to save mistake", e); }
};

export const getMistakes = (): MistakeItem[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY_MISTAKES);
    return data ? JSON.parse(data) : [];
  } catch (e) { return []; }
};

export const removeMistake = (id: string) => {
  try {
    const mistakes = getMistakes();
    const newMistakes = mistakes.filter(m => m.id !== id);
    localStorage.setItem(STORAGE_KEY_MISTAKES, JSON.stringify(newMistakes));
  } catch (e) { console.error("Failed to remove mistake", e); }
};

// --- Vocabulary Status ---

export const getVocabStatusMap = (): VocabStatusMap => {
  try {
    const data = localStorage.getItem(STORAGE_KEY_VOCAB);
    return data ? JSON.parse(data) : {};
  } catch (e) { return {}; }
};

export const setVocabStatus = (word: string, status: VocabStatus) => {
  try {
    const map = getVocabStatusMap();
    if (status === 'none') {
      delete map[word];
    } else {
      map[word] = status;
    }
    localStorage.setItem(STORAGE_KEY_VOCAB, JSON.stringify(map));
  } catch (e) { console.error("Failed to save vocab status", e); }
};

// --- Settings & Stats (New) ---

export const getSettings = (): UserSettings => {
  try {
    const data = localStorage.getItem(STORAGE_KEY_SETTINGS);
    const defaults = { ttsSpeed: 0.9, soundEffects: true };
    return data ? { ...defaults, ...JSON.parse(data) } : defaults;
  } catch (e) { return { ttsSpeed: 0.9, soundEffects: true }; }
};

export const saveSettings = (settings: UserSettings) => {
  localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
};

export const getStats = (): UserStats => {
  try {
    const data = localStorage.getItem(STORAGE_KEY_STATS);
    return data ? JSON.parse(data) : { streak: 0, lastVisitDate: '', totalPoints: 0 };
  } catch (e) { return { streak: 0, lastVisitDate: '', totalPoints: 0 }; }
};

const updateStats = (callback: (current: UserStats) => UserStats) => {
  const current = getStats();
  const updated = callback(current);
  localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(updated));
  return updated;
};

// Call this on App load
export const checkDailyStreak = (): number => {
  const today = new Date().toISOString().split('T')[0];
  const stats = getStats();
  
  if (stats.lastVisitDate === today) {
    return stats.streak; // Already logged in today
  }

  // Improved yesterday calculation to handle month/year boundaries
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const yesterday = d.toISOString().split('T')[0];
  
  let newStreak = stats.streak;

  if (stats.lastVisitDate === yesterday) {
    newStreak += 1; // Consecutive day
  } else {
    newStreak = 1; // Broken streak or first visit
  }

  updateStats(s => ({ ...s, streak: newStreak, lastVisitDate: today }));
  return newStreak;
};

// --- Import / Export ---

export const exportUserData = (): string => {
  const data = {
    history: getQuizResults(),
    mistakes: getMistakes(),
    vocab: getVocabStatusMap(),
    stats: getStats(),
    settings: getSettings(),
    version: 1
  };
  return JSON.stringify(data, null, 2);
};

export interface ImportResult {
  success: boolean;
  error?: string;
  details?: string;
}

export const importUserData = (jsonString: string): ImportResult => {
  if (!jsonString || jsonString.trim() === '') {
    return { success: false, error: '檔案內容為空', details: '請選擇有效的備份檔案' };
  }

  let data: any;
  try {
    data = JSON.parse(jsonString);
  } catch (e) {
    return { success: false, error: 'JSON 格式錯誤', details: '檔案格式不正確，請確認是有效的備份檔案' };
  }

  if (!data || typeof data !== 'object') {
    return { success: false, error: '資料格式錯誤', details: '備份檔案結構不正確' };
  }

  if (!data.version) {
    return { success: false, error: '版本資訊遺失', details: '這可能不是有效的備份檔案' };
  }

  try {
    let importedCount = 0;
    if (data.history && Array.isArray(data.history)) {
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(data.history));
      importedCount++;
    }
    if (data.mistakes && Array.isArray(data.mistakes)) {
      localStorage.setItem(STORAGE_KEY_MISTAKES, JSON.stringify(data.mistakes));
      importedCount++;
    }
    if (data.vocab && typeof data.vocab === 'object') {
      localStorage.setItem(STORAGE_KEY_VOCAB, JSON.stringify(data.vocab));
      importedCount++;
    }
    if (data.stats && typeof data.stats === 'object') {
      localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(data.stats));
      importedCount++;
    }
    if (data.settings && typeof data.settings === 'object') {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(data.settings));
      importedCount++;
    }

    if (importedCount === 0) {
      return { success: false, error: '無可匯入的資料', details: '備份檔案中沒有找到任何有效資料' };
    }

    return { success: true, details: `成功匯入 ${importedCount} 項資料` };
  } catch (e: any) {
    return { success: false, error: '儲存失敗', details: e.message || '無法寫入本機儲存空間' };
  }
};
