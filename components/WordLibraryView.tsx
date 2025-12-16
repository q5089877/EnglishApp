// components/WordLibraryView.tsx
import React from 'react';

const WordLibraryView = ({ onBack, onGoToLesson }: any) => {
  // Simplified list of words or lessons navigation
  return (
    <div>
      <h2 className="font-bold mb-4">單字庫</h2>
      <div className="grid grid-cols-1 gap-2">
        <button onClick={() => onGoToLesson('1-0')} className="p-3 bg-white rounded shadow-sm">前往 1-0</button>
        <button onClick={() => onGoToLesson('1-1')} className="p-3 bg-white rounded shadow-sm">前往 1-1</button>
      </div>
      <div className="mt-4">
        <button onClick={onBack} className="bg-white p-2 rounded">返回</button>
      </div>
    </div>
  );
};

export default WordLibraryView;
