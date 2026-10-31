import React from 'react';

export default function AlgorithmBadgeList({ algorithms = [], libraries = [], experiment = '' }) {
  if (!algorithms.length && !libraries.length) return null;

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(191,127,255,0.08), rgba(191,127,255,0.02))',
      border: '1.5px solid var(--color-ds-border)',
      borderRadius: 16,
      padding: '1.15rem',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    }} className="anim-fade-up">

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-ds)', fontWeight: 800, fontSize: '0.9rem' }}>
        <span style={{ fontSize: '1.2rem' }}>⚙️</span>
        <span>Rekomendasi Algoritma & Toolkit Data Science</span>
      </div>

      {/* Algorithms */}
      {algorithms.length > 0 && (
        <div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
            Algoritma / Metode yang Tepat:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {algorithms.map((algo, i) => (
              <span key={i} style={{
                background: 'rgba(191,127,255,0.14)',
                border: '1px solid var(--color-ds-border)',
                color: 'var(--color-ds)',
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
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
            Library Python yang Digunakan:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {libraries.map((lib, i) => (
              <span key={i} style={{
                background: 'var(--color-bg-base)',
                border: '1px solid var(--color-border)',
                color: '#38bdf8',
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
          background: 'var(--color-bg-base)',
          border: '1px solid var(--color-border)',
          borderRadius: 10,
          padding: '0.75rem',
          fontSize: '0.78rem',
          color: 'var(--color-text-2)',
          lineHeight: 1.5,
        }}>
          <strong style={{ color: 'var(--color-ds)' }}>🔬 Desain Eksperimen / Validasi:</strong> {experiment}
        </div>
      )}
    </div>
  );
}
