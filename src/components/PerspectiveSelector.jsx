import React from 'react';
import { useApp } from '../context/AppContext';

export default function PerspectiveSelector() {
  const { perspectiveMode, setPerspectiveMode } = useApp();

  return (
    <div className="anim-fade-up">
      {/* Label */}
      <p className="section-label text-center mb-3">
        🎯 Pilih sudut pandangmu
      </p>

      {/* Big toggle */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
        }}
      >
        {/* DATA ANALYST */}
        <button
          onClick={() => setPerspectiveMode('da')}
          style={{
            padding: '1.25rem',
            borderRadius: '16px',
            border: perspectiveMode === 'da'
              ? '2.5px solid var(--color-da)'
              : '2px solid var(--color-border)',
            background: perspectiveMode === 'da'
              ? 'linear-gradient(135deg, rgba(79,158,255,0.18), rgba(79,158,255,0.05))'
              : 'var(--color-bg-raised)',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: perspectiveMode === 'da'
              ? '0 0 24px rgba(79,158,255,0.2), inset 0 0 0 1px rgba(79,158,255,0.1)'
              : 'none',
            textAlign: 'left',
          }}
        >
          <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>📊</div>
          <div style={{
            fontWeight: 800,
            fontSize: '1rem',
            color: perspectiveMode === 'da' ? 'var(--color-da)' : 'var(--color-text-2)',
            marginBottom: '4px',
          }}>
            Data Analyst
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--color-text-3)', lineHeight: 1.5 }}>
            Tren, KPI, insight bisnis, rekomendasi
          </div>
          {perspectiveMode === 'da' && (
            <div style={{ marginTop: '8px' }}>
              <span className="pill pill-da">✓ Aktif</span>
            </div>
          )}
        </button>

        {/* DATA SCIENTIST */}
        <button
          onClick={() => setPerspectiveMode('ds')}
          style={{
            padding: '1.25rem',
            borderRadius: '16px',
            border: perspectiveMode === 'ds'
              ? '2.5px solid var(--color-ds)'
              : '2px solid var(--color-border)',
            background: perspectiveMode === 'ds'
              ? 'linear-gradient(135deg, rgba(191,127,255,0.18), rgba(191,127,255,0.05))'
              : 'var(--color-bg-raised)',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: perspectiveMode === 'ds'
              ? '0 0 24px rgba(191,127,255,0.2), inset 0 0 0 1px rgba(191,127,255,0.1)'
              : 'none',
            textAlign: 'left',
          }}
        >
          <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>🔬</div>
          <div style={{
            fontWeight: 800,
            fontSize: '1rem',
            color: perspectiveMode === 'ds' ? 'var(--color-ds)' : 'var(--color-text-2)',
            marginBottom: '4px',
          }}>
            Data Scientist
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--color-text-3)', lineHeight: 1.5 }}>
            Statistik, signifikansi, prediksi, pola
          </div>
          {perspectiveMode === 'ds' && (
            <div style={{ marginTop: '8px' }}>
              <span className="pill pill-ds">✓ Aktif</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
