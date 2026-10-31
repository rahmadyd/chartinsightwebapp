import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CaseCard from '../components/CaseCard';
import PerspectiveSelector from '../components/PerspectiveSelector';
import casesData from '../data/cases.json';
import { useApp } from '../context/AppContext';

const CATEGORIES = [
  'Semua Kategori',
  'Finance',
  'E-Commerce',
  'Digital Marketing',
  'SaaS & Product',
  'Social Media',
  'Healthcare',
];

export default function Home() {
  const { isDA, modeLabel, modeEmoji } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');
  const navigate = useNavigate();

  const handleRandomCase = () => {
    const randomCase = casesData[Math.floor(Math.random() * casesData.length)] || casesData[0];
    navigate(`/case/${randomCase.id}`);
  };

  const filteredCases = selectedCategory === 'Semua Kategori'
    ? casesData
    : casesData.filter(c => c.category === selectedCategory);

  const accentColor = isDA ? 'var(--color-da)' : 'var(--color-ds)';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-base)' }}>

      {/* ── STICKY HEADER ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 40,
        background: 'rgba(7,9,15,0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--color-border)',
        padding: '0.75rem 1rem',
      }}>
        <div style={{ maxWidth: 1050, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: '1.5rem' }}>🧪</span>
            <div>
              <span style={{ fontWeight: 900, fontSize: '1.05rem', letterSpacing: '-0.02em', color: 'var(--color-text-1)' }}>
                Chart Insight Lab
              </span>
              <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--color-text-3)', fontWeight: 600 }}>
                Bank Soal & Kunjaw Penalaran Grafik
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className={`pill ${isDA ? 'pill-da' : 'pill-ds'}`}>
              {modeEmoji} {modeLabel}
            </span>
            <Link to="/image" className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
              📷 Input Gambar
            </Link>
            <Link to="/glossary" className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
              📖 Glosarium
            </Link>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1050, margin: '0 auto', padding: '2.5rem 1rem 5rem' }}>

        {/* ── HERO SECTION ── */}
        <div className="anim-fade-up" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'var(--color-bg-raised)', border: '1px solid var(--color-border)',
            padding: '4px 14px', borderRadius: 99, fontSize: '0.75rem', fontWeight: 700,
            color: 'var(--color-text-2)', marginBottom: 14,
          }}>
            ⚡ Bukan Ujian atau Tugas • Murni Membuka Wawasan Analisis Data
          </div>

          <h1 style={{
            fontSize: 'clamp(1.85rem, 4.5vw, 2.75rem)',
            fontWeight: 900,
            lineHeight: 1.15,
            marginBottom: '0.75rem',
            letterSpacing: '-0.03em',
          }}>
            Bank Studi Kasus & <span style={{ color: accentColor }}>Kunci Jawaban Grafik</span>
          </h1>

          <p style={{
            color: 'var(--color-text-2)',
            fontSize: '0.98rem',
            maxWidth: 580,
            margin: '0 auto 1.75rem',
            lineHeight: 1.6,
          }}>
            Lihat grafik, langsung baca <strong>kunci jawaban</strong> dan <strong>alasan logis (reasoning)</strong>-nya.
            Lengkap dengan tips <strong>DOs & DON'Ts</strong> serta rekomendasi <strong>algoritma Data Science</strong>!
          </p>

          {/* Quick Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            <button
              onClick={handleRandomCase}
              className="btn"
              style={{
                background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                color: '#fff',
                padding: '0.85rem 1.75rem',
                fontSize: '0.95rem',
                borderRadius: 14,
                boxShadow: '0 4px 24px rgba(236,72,153,0.35)',
              }}
            >
              🎲 Generate / Acak Studi Kasus
            </button>

            <Link
              to="/image"
              className="btn btn-ghost"
              style={{
                padding: '0.85rem 1.75rem',
                fontSize: '0.95rem',
                borderRadius: 14,
              }}
            >
              📷 Input Gambar Grafik Sendiri
            </Link>
          </div>
        </div>

        {/* ── PERSPECTIVE SELECTOR (DA VS DS) ── */}
        <div style={{
          background: 'var(--color-bg-card)',
          border: '1.5px solid var(--color-border)',
          borderRadius: 20,
          padding: '1.25rem',
          marginBottom: '2rem',
        }} className="anim-fade-up">
          <PerspectiveSelector />
        </div>

        {/* ── 2 MODE NAVIGATION CARDS ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 12,
          marginBottom: '2rem',
        }}>
          <div style={{
            background: 'var(--color-bg-card)',
            border: '1.5px solid var(--color-border)',
            borderRadius: 18,
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: 'rgba(56,189,248,0.15)',
              color: '#38bdf8',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem',
            }}>📚</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', marginBottom: 2 }}>
                Bank Soal Terkurasi
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--color-text-3)' }}>
                Tersedia kasus Finance, Marketing, SaaS, E-Commerce, Healthcare, & Medsos.
              </div>
            </div>
          </div>

          <Link
            to="/image"
            style={{
              textDecoration: 'none',
              background: 'linear-gradient(135deg, rgba(168,85,247,0.12), rgba(168,85,247,0.02))',
              border: '1.5px solid rgba(168,85,247,0.3)',
              borderRadius: 18,
              padding: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              transition: 'all 0.2s',
            }}
          >
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: 'rgba(168,85,247,0.2)',
              color: '#c084fc',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem',
            }}>📷</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--color-text-1)', marginBottom: 2 }}>
                Input Gambar Grafik Random →
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--color-text-3)' }}>
                Paste screenshot (Ctrl+V) atau upload gambar untuk langsung dibedah.
              </div>
            </div>
          </Link>
        </div>

        {/* ── CATEGORY FILTER TABS ── */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-3)', marginBottom: 8 }}>
            🏷️ Filter Berdasarkan Kategori:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {CATEGORIES.map(cat => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 99,
                    border: isActive ? `1.5px solid ${accentColor}` : '1.5px solid var(--color-border)',
                    background: isActive ? (isDA ? 'var(--color-da-glow)' : 'var(--color-ds-glow)') : 'var(--color-bg-card)',
                    color: isActive ? accentColor : 'var(--color-text-2)',
                    fontSize: '0.78rem',
                    fontWeight: isActive ? 800 : 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── CASE CARDS GRID ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
          gap: 14,
        }}>
          {filteredCases.map(c => (
            <div key={c.id} className="anim-fade-up">
              <CaseCard caseData={c} />
            </div>
          ))}
        </div>

        {filteredCases.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-text-3)' }}>
            Belum ada kasus untuk kategori ini.
          </div>
        )}
      </main>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: '1px solid var(--color-border)',
        padding: '2rem 1rem',
        textAlign: 'center',
        fontSize: '0.78rem',
        color: 'var(--color-text-3)',
      }}>
        🧪 Chart Insight Lab — Dirancang untuk membuka wawasan visualisasi data secara santai dan aplikatif.
      </footer>
    </div>
  );
}
