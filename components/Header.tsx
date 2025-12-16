// components/Header.tsx
import React from 'react';
import { BookOpen, Trophy, Settings } from 'lucide-react';

const Header = ({ onBack, onHistory, onSettings }: { onBack: () => void, onHistory: () => void, onSettings: () => void }) => {
  return (
    <div className="bg-white shadow-sm px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
      <button onClick={onBack} className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-full">
        {/* back icon could be added */}
        ←
      </button>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white shadow-lg">
          <BookOpen className="w-7 h-7" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">國中英語第一冊</h1>
          <p className="text-green-700 font-medium text-sm">七年級上學期 (翰林版)</p>
        </div>
      </div>
      <div className="ml-auto flex gap-2">
        <button onClick={onHistory} className="bg-white p-3 rounded-full shadow-md border border-amber-100 text-amber-500 active:scale-95 transition-transform">
          <Trophy className="w-6 h-6" />
        </button>
        <button onClick={onSettings} className="bg-white p-3 rounded-full shadow-md border border-gray-100 text-gray-600 active:scale-95 transition-transform">
          <Settings className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Header;
