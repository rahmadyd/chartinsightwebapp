import React, { useState } from 'react';
import { getDefinition } from '../utils/glossary';
import { useApp } from '../context/AppContext';

export default function GlossaryTooltip({ term }) {
  const [visible, setVisible] = useState(false);
  const { isDA, modeColor } = useApp();
  const entry = getDefinition(term);

  if (!entry) return (
    <span style={{ color: modeColor, fontWeight: 700, fontSize: '0.8rem' }}>{term}</span>
  );

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setVisible(v => !v)}
        style={{
          color: modeColor,
          background: 'none', border: 'none',
          textDecoration: 'underline',
          textDecorationStyle: 'dotted',
          fontWeight: 700, fontSize: '0.8rem',
          cursor: 'help',
          padding: 0,
        }}
        title="Klik untuk definisi"
      >
        {term}
      </button>

      {visible && (
        <>
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 40 }}
            onClick={() => setVisible(false)}
          />
          <div style={{
            position: 'absolute', zIndex: 50,
            bottom: '100%', left: 0, marginBottom: 8,
            width: 280,
            background: 'var(--color-bg-card)',
            border: `1.5px solid ${modeColor}40`,
            borderRadius: 14,
            padding: '0.875rem',
            boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
          }} className="anim-scale-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
              <span style={{ fontWeight: 800, fontSize: '0.85rem', color: modeColor }}>{entry.term}</span>
              <button
                onClick={() => setVisible(false)}
                style={{ background: 'none', border: 'none', color: 'var(--color-text-3)', fontSize: '1rem', cursor: 'pointer', lineHeight: 1 }}
              >×</button>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--color-text-2)', lineHeight: 1.6 }}>{entry.def}</p>
          </div>
        </>
      )}
    </span>
  );
}
