import React from 'react';

export default function ModeToggle({ mode, onChange }) {
  return (
    <div className="flex items-center gap-2 bg-surface-2 rounded-xl p-1 border border-border">
      <button
        onClick={() => onChange('da')}
        className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
          mode === 'da'
            ? 'bg-accent-da text-white shadow-lg shadow-blue-500/20'
            : 'text-text-muted hover:text-text-primary'
        }`}
      >
        📊 Data Analyst
      </button>
      <button
        onClick={() => onChange('ds')}
        className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
          mode === 'ds'
            ? 'bg-accent-ds text-white shadow-lg shadow-purple-500/20'
            : 'text-text-muted hover:text-text-primary'
        }`}
      >
        🔬 Data Scientist
      </button>
    </div>
  );
}
