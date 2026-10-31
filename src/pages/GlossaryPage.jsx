import React from 'react';
import { Link } from 'react-router-dom';
import { GLOSSARY } from '../utils/glossary';
import { useApp } from '../context/AppContext';

export default function GlossaryPage() {
  const { isDA, modeColor, modePillClass, modeLabel, modeEmoji } = useApp();
  const entries = Object.values(GLOSSARY).sort((a, b) => a.term.localeCompare(b.term, 'id'));

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-base)' }}>
      <header style={{
        position: 'sticky', top: 0, zIndex: 30,
        background: 'rgba(7,9,15,0.9)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--color-border)',
        padding: '0.7rem 1rem',
      }}>
        <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'space-between' }}>
          <Link to="/" className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>← Kembali</Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '1.2rem' }}>📖</span>
            <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>Glosarium Istilah Data</span>
          </div>
          <span className={`pill ${modePillClass}`}>{modeEmoji} {modeLabel}</span>
        </div>
      </header>

      <main style={{ maxWidth: 720, margin: '0 auto', padding: '2rem 1rem 4rem' }}>
        <p style={{ color: 'var(--color-text-3)', fontSize: '0.85rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          {entries.length} istilah yang sering muncul saat membaca dan menganalisis grafik.
          Klik istilah bergaris putus-putus di kasus untuk melihat definisi cepat.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {entries.map((entry, i) => (
            <div key={entry.term} className="anim-fade-up" style={{
              animationDelay: `${i * 0.02}s`,
              background: 'var(--color-bg-card)',
              border: '1.5px solid var(--color-border)',
              borderRadius: 14, padding: '0.875rem 1rem',
              transition: 'border-color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = modeColor + '60'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
            >
              <div style={{ fontWeight: 800, fontSize: '0.875rem', color: modeColor, marginBottom: 4 }}>
                {entry.term}
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-2)', lineHeight: 1.6 }}>
                {entry.def}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
