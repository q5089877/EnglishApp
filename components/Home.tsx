// components/Home.tsx
import React from 'react';

type Props = {
  onSelect: (bk: number, ls: number) => void;
  onHistory: () => void;
  onSettings: () => void;
  onReviewMistakes: () => void;
  onExamSetup: () => void;
  onLibrary: () => void;
};

const Home: React.FC<Props> = ({ onSelect, onHistory, onSettings, onReviewMistakes, onExamSetup, onLibrary }) => {
  // For brevity this component renders a simplified home screen with action buttons
  return (
    <div>
      <header className="mb-6 pt-6 flex justify-between items-start">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            {/* Icon placeholder */}
            📘
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">國中英語第一冊</h1>
            <p className="text-green-700 font-medium text-sm">七年級上學期 (翰林版)</p>
          </div>
        </div>
      </header>

      <div className="space-y-3 mb-8">
        <button onClick={() => onLibrary()} className="w-full bg-white text-indigo-900 border border-indigo-100 p-4 rounded-xl flex items-center justify-between shadow-sm active:scale-98 transition-all hover:border-indigo-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">📚</div>
            <div>
              <div className="text-sm font-bold">單字庫</div>
              <div className="text-xs text-gray-500">查看所有單字與學習狀態</div>
            </div>
          </div>
          <div>→</div>
        </button>

        <div className="grid grid-cols-3 gap-3">
          <button onClick={() => onSelect(1, 0)} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-indigo-300 transition-all">
            單元示範
          </button>
          <button onClick={() => onExamSetup()} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-indigo-300 transition-all">
            模擬考
          </button>
          <button onClick={() => onReviewMistakes()} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-indigo-300 transition-all">
            錯題複習
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
