// components/SettingsView.tsx
import React, { useEffect, useRef, useState } from 'react';
import { getSettings, saveSettings } from '../storage';
import { TextToSpeech } from '../speech_services';
import { SoundService } from '../sound_services';

const SettingsView = ({ onBack, onExport, onImport, onClearData }: any) => {
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
    if (newVal) SoundService.playCorrect();
  };

  const handleTestSpeech = () => {
    TextToSpeech.getInstance().speak("Hello, this is a speed test.", "en-US", speed);
  };

  const onImportClick = () => fileInputRef.current?.click();
  const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target?.result as string;
      onImport(content);
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="font-bold">語音設定</h3>
        <input type="range" min="0.5" max="1.5" step="0.1" value={speed} onChange={handleSpeedChange} />
        <button onClick={handleTestSpeech} className="mt-2 bg-blue-50 p-2 rounded">測試發音</button>
      </div>

      <div className="mb-6">
        <h3 className="font-bold">資料管理</h3>
        <button onClick={onExport} className="mr-2 bg-gray-100 p-2 rounded">匯出</button>
        <button onClick={onImportClick} className="mr-2 bg-gray-100 p-2 rounded">匯入</button>
        <input type="file" ref={fileInputRef} onChange={onFileSelected} accept="application/json" className="hidden" />
        <button onClick={onClearData} className="ml-2 bg-red-100 p-2 rounded">清除資料</button>
      </div>

      <div>
        <button onClick={onBack} className="bg-white p-2 rounded">返回</button>
      </div>
    </div>
  );
};

export default SettingsView;
