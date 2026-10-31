import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CaseCard from '../components/CaseCard';
import PerspectiveSelector from '../components/PerspectiveSelector';
import casesData from '../data/cases.json';
import { getCompletedCases } from '../utils/storage';
import { useApp } from '../context/AppContext';

const FILTERS = ['Semua', 'line', 'bar', 'scatter', 'pemula', 'menengah'];

export default function Home() {
  const { perspectiveMode, chartMode, setChartMode, isDA, modeLabel, modeEmoji } = useApp();
  const [filter, setFilter] = useState('Semua');
  const [completed, setCompleted] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCompleted(getCompletedCases());
  }, []);

  const filtered = filter === 'Semua'
    ? casesData
    : casesData.filter(c => c.chartType === filter || c.level === filter);

  const pct = casesData.length > 0
    ? Math.round((completed.length / casesData.length) * 100)
    : 0;

  const accentColor = isDA ? 'var(--color-da)' : 'var(--color-ds)';
  const glowColor = isDA ? 'var(--color-da-glow)' : 'var(--color-ds-glow)';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-base)' }}>

      {/* ── STICKY HEADER ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 40,
        background: 'rgba(7,9,15,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--color-border)',
        padding: '0.75rem 1rem',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: '1.4rem' }}>🧪</span>
            <span style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.01em' }}>
              Chart Insight Lab
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className={`pill ${isDA ? 'pill-da' : 'pill-ds'}`}>
              {modeEmoji} {modeLabel}
            </span>
            <Link to="/glossary" style={{
              fontSize: '0.78rem', color: 'var(--color-text-3)',
              textDecoration: 'none', padding: '6px 12px',
              background: 'var(--color-bg-raised)',
              borderRadius: 8, border: '1px solid var(--color-border)',
              transition: 'color 0.2s',
            }}>
              📖 Glosarium
            </Link>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1rem 4rem' }}>

        {/* ── HERO ── */}
        <div className="anim-fade-up" style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 900, lineHeight: 1.15, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
            Belajar Membaca Grafik
          </h1>
          <p style={{ color: 'var(--color-text-2)', fontSize: '0.95rem', maxWidth: 480, margin: '0 auto' }}>
            Jawab 4 pertanyaan analisis, bandingkan dengan jawaban contoh,
            dan lihat bedanya sudut pandang <strong>DA</strong> vs <strong>DS</strong>.
          </p>
        </div>

        {/* ── PERSPECTIVE SELECTOR ── */}
        <div style={{
          background: 'var(--color-bg-card)',
          border: '1.5px solid var(--color-border)',
          borderRadius: 20,
          padding: '1.5rem',
          marginBottom: '1.5rem',
        }} className="anim-fade-up">
          <PerspectiveSelector />
        </div>

        {/* ── CHART MODE SELECTOR ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
          marginBottom: '1.5rem',
        }} className="anim-fade-up">
          {/* GENERATE MODE */}
          <button
            onClick={() => setChartMode('generate')}
            style={{
              padding: '1.25rem',
              borderRadius: 16,
              border: chartMode === 'generate'
                ? `2.5px solid ${accentColor}`
                : '2px solid var(--color-border)',
              background: chartMode === 'generate'
                ? `linear-gradient(135deg, ${glowColor}, transparent)`
                : 'var(--color-bg-card)',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s',
              boxShadow: chartMode === 'generate' ? `0 0 20px ${glowColor}` : 'none',
            }}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>✨</div>
            <div style={{
              fontWeight: 800, fontSize: '0.95rem', marginBottom: 4,
              color: chartMode === 'generate' ? accentColor : 'var(--color-text-1)',
            }}>
              Generate Mode
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-text-3)', lineHeight: 1.5 }}>
              Pilih kasus dari koleksi yang sudah ada
            </div>
          </button>

          {/* INPUT MODE */}
          <button
            onClick={() => { setChartMode('input'); navigate('/input'); }}
            style={{
              padding: '1.25rem',
              borderRadius: 16,
              border: chartMode === 'input'
                ? `2.5px solid ${accentColor}`
                : '2px solid var(--color-border)',
              background: chartMode === 'input'
                ? `linear-gradient(135deg, ${glowColor}, transparent)`
                : 'var(--color-bg-card)',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s',
              boxShadow: chartMode === 'input' ? `0 0 20px ${glowColor}` : 'none',
            }}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>📥</div>
            <div style={{
              fontWeight: 800, fontSize: '0.95rem', marginBottom: 4,
              color: chartMode === 'input' ? accentColor : 'var(--color-text-1)',
            }}>
              Input Grafik Mode
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-text-3)', lineHeight: 1.5 }}>
              Input data grafik sendiri untuk dianalisis
            </div>
          </button>
        </div>

        {/* ── 4 PERTANYAAN REFERENCE ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 8,
          marginBottom: '1.5rem',
        }}>
          {[
            { n: 'Q1', e: '📌', t: 'Grafik apa?', s: 'Jenis · sumbu · satuan' },
            { n: 'Q2', e: '📈', t: 'Bentuknya?', s: 'Tren · pola · outlier' },
            { n: 'Q3', e: '🤔', t: 'Kenapa?', s: 'Hipotesis penyebab' },
            { n: 'Q4', e: '🎯', t: 'Ngapain?', s: 'Rekomendasi aksi' },
          ].map(q => (
            <div key={q.n} style={{
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 12,
              padding: '0.75rem',
              display: 'flex', gap: 10, alignItems: 'flex-start',
            }}>
              <span style={{
                minWidth: 28, height: 28,
                background: 'var(--color-bg-raised)',
                borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.75rem', fontWeight: 800, color: accentColor,
              }}>{q.n}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.82rem', marginBottom: 2 }}>{q.e} {q.t}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-3)' }}>{q.s}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── PROGRESS ── */}
        <div style={{
          background: 'var(--color-bg-card)',
          border: '1.5px solid var(--color-border)',
          borderRadius: 16,
          padding: '1rem 1.25rem',
          marginBottom: '1.5rem',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>
              🏆 Progress Belajar
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-3)' }}>
              <span style={{ color: accentColor, fontWeight: 700 }}>{completed.length}</span>
              /{casesData.length} kasus · {pct}%
            </span>
          </div>
          <div className="progress-track">
            <div
              className={isDA ? 'progress-fill-da' : 'progress-fill-ds'}
              style={{ width: `${pct}%` }}
            />
          </div>
          {pct === 100 && (
            <p style={{ color: 'var(--color-success)', fontSize: '0.78rem', marginTop: 8, fontWeight: 600 }}>
              🎉 Semua kasus selesai! Luar biasa.
            </p>
          )}
        </div>

        {/* ── FILTER ── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: '1rem' }}>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '5px 14px',
                borderRadius: 99,
                border: filter === f ? `1.5px solid ${accentColor}` : '1.5px solid var(--color-border)',
                background: filter === f ? (isDA ? 'var(--color-da-glow)' : 'var(--color-ds-glow)') : 'var(--color-bg-raised)',
                color: filter === f ? accentColor : 'var(--color-text-3)',
                fontSize: '0.78rem',
                fontWeight: filter === f ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* ── CASE GRID ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 12,
        }}>
          {filtered.map((c, i) => (
            <div key={c.id} className="anim-fade-up" style={{ animationDelay: `${i * 0.04}s` }}>
              <CaseCard caseData={c} completed={completed.includes(c.id)} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-text-3)' }}>
            Tidak ada kasus untuk filter ini.
          </div>
        )}
      </main>
    </div>
  );
}
