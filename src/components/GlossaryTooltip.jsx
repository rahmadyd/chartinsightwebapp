import React, { useState } from 'react';
import { getDefinition } from '../utils/glossary';

export default function GlossaryTooltip({ term }) {
  const [visible, setVisible] = useState(false);
  const entry = getDefinition(term);
  if (!entry) return <span className="text-accent-da font-medium">{term}</span>;

  return (
    <span className="relative inline-block">
      <button
        onClick={() => setVisible(!visible)}
        className="text-accent-da underline decoration-dotted font-medium hover:text-blue-400 transition-colors cursor-help"
        title="Klik untuk definisi"
      >
        {term}
      </button>
      {visible && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setVisible(false)}
          />
          <div className="absolute z-50 bottom-full mb-2 left-0 w-72 bg-surface-2 border border-border rounded-xl shadow-2xl p-3 text-sm">
            <div className="flex items-start justify-between gap-2">
              <p className="font-bold text-text-primary">{entry.term}</p>
              <button
                onClick={() => setVisible(false)}
                className="text-text-muted hover:text-text-primary text-lg leading-none mt-[-2px]"
              >
                ×
              </button>
            </div>
            <p className="text-text-secondary mt-1 leading-relaxed">{entry.def}</p>
          </div>
        </>
      )}
    </span>
  );
}
