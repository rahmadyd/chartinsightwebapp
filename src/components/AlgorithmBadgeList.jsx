import React from 'react';

export default function AlgorithmBadgeList({ algorithms = [], libraries = [], experiment = '' }) {
  if (!algorithms.length && !libraries.length) return null;

  return (
    <div style={{
      background: '#f5f3ff',
      border: '1px solid #ddd6fe',
      borderRadius: 14,
      padding: '1.15rem',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    }} className="anim-fade-up">

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#6d28d9', fontWeight: 800, fontSize: '0.9rem' }}>
        <span style={{ fontSize: '1.15rem' }}>⚙️</span>
        <span>Rekomendasi Algoritma & Toolkit Data Science</span>
      </div>

      {/* Algorithms */}
      {algorithms.length > 0 && (
        <div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
            Algoritma / Metode yang Tepat:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {algorithms.map((algo, i) => (
              <span key={i} style={{
                background: '#ede9fe',
                border: '1px solid #ddd6fe',
                color: '#6d28d9',
                padding: '4px 10px',
                borderRadius: 8,
                fontSize: '0.75rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
              }}>
                ⚡ {algo}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Python Libraries */}
      {libraries.length > 0 && (
        <div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
            Library Python yang Digunakan:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {libraries.map((lib, i) => (
              <span key={i} style={{
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                color: '#0f172a',
                padding: '3px 8px',
                borderRadius: 6,
                fontSize: '0.72rem',
                fontFamily: 'monospace',
                fontWeight: 600,
              }}>
                📦 {lib}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Next Experiment */}
      {experiment && (
        <div style={{
          background: '#ffffff',
          border: '1px solid #ddd6fe',
          borderRadius: 10,
          padding: '0.75rem',
          fontSize: '0.8rem',
          color: '#334155',
          lineHeight: 1.5,
        }}>
          <strong style={{ color: '#6d28d9' }}>🔬 Desain Eksperimen / Validasi:</strong> {experiment}
        </div>
      )}
    </div>
  );
}
