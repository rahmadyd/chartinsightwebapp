import React from 'react';
import { useApp } from '../context/AppContext';

export default function PerspectiveSelector() {
  const { perspectiveMode, setPerspectiveMode } = useApp();

  return (
    <div>
      <div style={{
        fontSize: '0.72rem',
        fontWeight: 800,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: 'var(--color-text-3)',
        marginBottom: 10,
        textAlign: 'center',
      }}>
        Pilih Sudut Pandang Analisis
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 12,
      }}>
        {/* DATA ANALYST */}
        <button
          onClick={() => setPerspectiveMode('da')}
          style={{
            padding: '1.15rem 1.25rem',
            borderRadius: 14,
            border: perspectiveMode === 'da'
              ? '2px solid #2563eb'
              : '1px solid var(--color-border)',
            background: perspectiveMode === 'da'
              ? '#eff6ff'
              : '#ffffff',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            boxShadow: perspectiveMode === 'da'
              ? '0 2px 8px rgba(37,99,235,0.08)'
              : '0 1px 2px rgba(0,0,0,0.02)',
            textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: '1.4rem' }}>📊</span>
            {perspectiveMode === 'da' ? (
              <span className="pill pill-da">Aktif</span>
            ) : (
              <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>Pilih</span>
            )}
          </div>
          <div style={{
            fontWeight: 800,
            fontSize: '0.98rem',
            color: perspectiveMode === 'da' ? '#1d4ed8' : '#0f172a',
            marginBottom: 3,
          }}>
            Data Analyst
          </div>
          <div style={{ fontSize: '0.74rem', color: '#64748b', lineHeight: 1.5 }}>
            Fokus ke tren, perbandingan KPI, insight bisnis, dan rekomendasi aksi nyata.
          </div>
        </button>

        {/* DATA SCIENTIST */}
        <button
          onClick={() => setPerspectiveMode('ds')}
          style={{
            padding: '1.15rem 1.25rem',
            borderRadius: 14,
            border: perspectiveMode === 'ds'
              ? '2px solid #7c3aed'
              : '1px solid var(--color-border)',
            background: perspectiveMode === 'ds'
              ? '#f5f3ff'
              : '#ffffff',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            boxShadow: perspectiveMode === 'ds'
              ? '0 2px 8px rgba(124,58,237,0.08)'
              : '0 1px 2px rgba(0,0,0,0.02)',
            textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: '1.4rem' }}>🔬</span>
            {perspectiveMode === 'ds' ? (
              <span className="pill pill-ds">Aktif</span>
            ) : (
              <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>Pilih</span>
            )}
          </div>
          <div style={{
            fontWeight: 800,
            fontSize: '0.98rem',
            color: perspectiveMode === 'ds' ? '#6d28d9' : '#0f172a',
            marginBottom: 3,
          }}>
            Data Scientist
          </div>
          <div style={{ fontSize: '0.74rem', color: '#64748b', lineHeight: 1.5 }}>
            Fokus ke sebaran distribusi, algoritma ML, korelasi vs kausalitas, dan validasi.
          </div>
        </button>
      </div>
    </div>
  );
}
