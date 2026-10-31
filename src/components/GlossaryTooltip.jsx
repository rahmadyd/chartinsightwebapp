import React, { useState } from 'react';
import { getDefinition } from '../utils/glossary';
import { useApp } from '../context/AppContext';

export default function GlossaryTooltip({ term }) {
  const [visible, setVisible] = useState(false);
  const { isDA } = useApp();
  const entry = getDefinition(term);
  const accentColor = isDA ? '#2563eb' : '#7c3aed';

  if (!entry) return (
    <span style={{ color: accentColor, fontWeight: 700, fontSize: '0.8rem' }}>{term}</span>
  );

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setVisible(v => !v)}
        style={{
          color: accentColor,
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
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: 12,
            padding: '0.875rem',
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          }} className="anim-scale-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
              <span style={{ fontWeight: 800, fontSize: '0.85rem', color: accentColor }}>{entry.term}</span>
              <button
                onClick={() => setVisible(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1rem', cursor: 'pointer', lineHeight: 1 }}
              >×</button>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#334155', lineHeight: 1.5 }}>{entry.def}</p>
          </div>
        </>
      )}
    </span>
  );
}
