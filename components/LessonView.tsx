// components/LessonView.tsx
import React from 'react';

const LessonView = ({ lessonId, lessonContent, onBack }: any) => {
  return (
    <div>
      <div className="mb-4">
        <h2 className="font-bold">課程：{lessonId}</h2>
      </div>

      <div className="bg-white p-4 rounded shadow-sm">
        {lessonContent ? (
          <div>
            <h3 className="font-bold">單字</h3>
            <ul className="list-disc ml-5">
              {lessonContent.vocabulary?.slice(0, 5).map((v: any, idx: number) => (
                <li key={idx}>{v.word} — {v.translation}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-sm text-gray-500">未載入課程內容</p>
        )}
      </div>

      <div className="mt-4">
        <button onClick={onBack} className="bg-white p-2 rounded">返回</button>
      </div>
    </div>
  );
};

export default LessonView;
