import React from 'react';
import { Link } from 'react-router-dom';
import { GLOSSARY } from '../utils/glossary';
import { useApp } from '../context/AppContext';

export default function GlossaryPage() {
  const { isDA, modeLabel, modeEmoji } = useApp();
  const entries = Object.values(GLOSSARY).sort((a, b) => a.term.localeCompare(b.term, 'id'));
  const accentColor = isDA ? '#2563eb' : '#7c3aed';

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a' }}>
      <header style={{
        position: 'sticky', top: 0, zIndex: 30,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #e2e8f0',
        padding: '0.75rem 1rem',
      }}>
        <div style={{ maxWidth: 740, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'space-between' }}>
          <Link to="/" className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>← Kembali</Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '1.2rem' }}>📖</span>
            <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>Glosarium Istilah Data</span>
          </div>
          <span className={`pill ${isDA ? 'pill-da' : 'pill-ds'}`}>{modeEmoji} {modeLabel}</span>
        </div>
      </header>

      <main style={{ maxWidth: 740, margin: '0 auto', padding: '2rem 1rem 4rem' }}>
        <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          {entries.length} istilah penting yang sering muncul saat membaca dan menganalisis grafik.
          Gunakan sebagai contekan dan panduan cepat.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {entries.map((entry, i) => (
            <div key={entry.term} className="anim-fade-up" style={{
              animationDelay: `${i * 0.02}s`,
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 14,
              padding: '1rem 1.25rem',
              transition: 'all 0.15s ease',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = accentColor}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#e2e8f0'}
            >
              <div style={{ fontWeight: 800, fontSize: '0.92rem', color: accentColor, marginBottom: 4 }}>
                {entry.term}
              </div>
              <p style={{ fontSize: '0.84rem', color: '#334155', lineHeight: 1.6 }}>
                {entry.def}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
