// components/HistoryView.tsx
import React from 'react';

const HistoryView = ({ onBack }: { onBack: () => void }) => {
  // A simplified history view; real implementation can fetch getQuizResults()
  return (
    <div>
      <h2 className="font-bold mb-4">歷史成績</h2>
      <div className="bg-white p-4 rounded shadow-sm">
        {/* Placeholder: actual history list will be rendered here */}
        <p className="text-sm text-gray-500">歷史紀錄列表（實作中）</p>
      </div>
      <div className="mt-4">
        <button onClick={onBack} className="bg-white p-2 rounded">返回</button>
      </div>
    </div>
  );
};

export default HistoryView;
