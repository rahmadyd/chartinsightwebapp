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

  const accentColor = isDA ? '#2563eb' : '#7c3aed';

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a' }}>

      {/* ── STICKY HEADER ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 40,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #e2e8f0',
        padding: '0.75rem 1rem',
      }}>
        <div style={{ maxWidth: 1050, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: '1.4rem' }}>🧪</span>
            <div>
              <span style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.02em', color: '#0f172a' }}>
                Chart Insight Lab
              </span>
              <span style={{ display: 'block', fontSize: '0.68rem', color: '#64748b', fontWeight: 600 }}>
                Bank Soal & Kunjaw Penalaran Grafik
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className={`pill ${isDA ? 'pill-da' : 'pill-ds'}`}>
              {modeEmoji} {modeLabel}
            </span>
            <Link to="/generate" className="btn btn-primary" style={{ padding: '6px 14px', fontSize: '0.78rem' }}>
              ⚡ Generate Kasus
            </Link>
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
            background: '#ffffff', border: '1px solid #e2e8f0',
            padding: '4px 14px', borderRadius: 99, fontSize: '0.75rem', fontWeight: 700,
            color: '#475569', marginBottom: 14,
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
          }}>
            ⚡ Bukan Ujian atau Tugas • Murni Membuka Wawasan Analisis Data
          </div>

          <h1 style={{
            fontSize: 'clamp(1.85rem, 4.5vw, 2.75rem)',
            fontWeight: 900,
            lineHeight: 1.15,
            marginBottom: '0.75rem',
            letterSpacing: '-0.03em',
            color: '#0f172a',
          }}>
            Bank Studi Kasus & <span style={{ color: accentColor }}>Kunci Jawaban Grafik</span>
          </h1>

          <p style={{
            color: '#475569',
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
            <Link
              to="/generate"
              className="btn btn-primary"
              style={{
                padding: '0.85rem 1.75rem',
                fontSize: '0.95rem',
                borderRadius: 12,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span>⚡</span>
              <span>GENERATE KASUS BARU</span>
            </Link>

            <button
              onClick={handleRandomCase}
              className="btn btn-ghost"
              style={{
                padding: '0.85rem 1.6rem',
                fontSize: '0.92rem',
                borderRadius: 12,
                fontWeight: 700,
              }}
            >
              🎲 Acak dari Bank Soal
            </button>

            <Link
              to="/image"
              className="btn btn-ghost"
              style={{
                padding: '0.85rem 1.6rem',
                fontSize: '0.92rem',
                borderRadius: 12,
                fontWeight: 700,
              }}
            >
              📷 Input Gambar Grafik
            </Link>
          </div>
        </div>

        {/* ── PERSPECTIVE SELECTOR (DA VS DS) ── */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: 16,
          padding: '1.25rem',
          marginBottom: '2rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
        }} className="anim-fade-up">
          <PerspectiveSelector />
        </div>

        {/* ── 3 NAVIGATION CARDS ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 12,
          marginBottom: '2rem',
        }}>
          {/* Card 1: Live Generator */}
          <Link
            to="/generate"
            style={{
              textDecoration: 'none',
              background: '#ffffff',
              border: '1px solid #bfdbfe',
              borderRadius: 16,
              padding: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              transition: 'all 0.15s ease',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#2563eb'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#bfdbfe'}
          >
            <div style={{
              width: 44, height: 44, borderRadius: 10,
              background: '#eff6ff',
              color: '#2563eb',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.4rem',
            }}>⚡</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a', marginBottom: 2 }}>
                Generator Kasus Real-Time →
              </div>
              <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                Bikin grafik baru dengan formula acak & kunjaw instan.
              </div>
            </div>
          </Link>

          {/* Card 2: Bank Soal */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: 16,
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 10,
              background: '#f1f5f9',
              color: '#0f172a',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.4rem',
            }}>📚</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a', marginBottom: 2 }}>
                Bank Soal Terkurasi
              </div>
              <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                Kasus Finance, E-Com, Marketing, SaaS, Healthcare, Medsos.
              </div>
            </div>
          </div>

          {/* Card 3: Image Input */}
          <Link
            to="/image"
            style={{
              textDecoration: 'none',
              background: '#ffffff',
              border: '1px solid #ddd6fe',
              borderRadius: 16,
              padding: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              transition: 'all 0.15s ease',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#7c3aed'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#ddd6fe'}
          >
            <div style={{
              width: 44, height: 44, borderRadius: 10,
              background: '#f5f3ff',
              color: '#7c3aed',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.4rem',
            }}>📷</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a', marginBottom: 2 }}>
                Input Gambar Grafik →
              </div>
              <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                Paste screenshot (Ctrl+V) / upload gambar grafik dari luar.
              </div>
            </div>
          </Link>
        </div>

        {/* ── CATEGORY FILTER TABS ── */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#64748b', marginBottom: 8 }}>
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
                    border: isActive ? `1.5px solid ${accentColor}` : '1px solid #e2e8f0',
                    background: isActive ? (isDA ? '#eff6ff' : '#f5f3ff') : '#ffffff',
                    color: isActive ? accentColor : '#475569',
                    fontSize: '0.78rem',
                    fontWeight: isActive ? 800 : 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
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
          <div style={{ textAlign: 'center', padding: '4rem 0', color: '#64748b' }}>
            Belum ada kasus untuk kategori ini.
          </div>
        )}
      </main>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: '1px solid #e2e8f0',
        background: '#ffffff',
        padding: '2rem 1rem',
        textAlign: 'center',
        fontSize: '0.78rem',
        color: '#64748b',
      }}>
        🧪 Chart Insight Lab — Dirancang untuk membuka wawasan visualisasi data secara santai dan aplikatif.
      </footer>
    </div>
  );
}
