// components/PracticeView.tsx
import React from 'react';

const PracticeView = ({ onBack, isReviewMode, isExamMode, examTitle }: any) => {
  // The practice UI (quiz flow) can be complex; this component acts as a container and will
  // call quiz_engine / storage as needed or can accept them via props.
  return (
    <div>
      <div className="mb-4">
        <h2 className="font-bold">{isExamMode ? `測驗：${examTitle}` : (isReviewMode ? '複習錯題' : '練習')}</h2>
      </div>

      <div className="bg-white p-4 rounded shadow-sm">
        {/* Placeholder for quiz items */}
        <p className="text-sm text-gray-500">題目呈現區（保留原有 quiz flow）</p>
      </div>

      <div className="mt-4">
        <button onClick={onBack} className="bg-white p-2 rounded">返回</button>
      </div>
    </div>
  );
};

export default PracticeView;
