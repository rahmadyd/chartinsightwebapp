import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ChartView from '../components/ChartView';
import MarkdownReportView from '../components/MarkdownReportView';
import DosAndDontsCard from '../components/DosAndDontsCard';
import AlgorithmBadgeList from '../components/AlgorithmBadgeList';
import { generateProceduralCase } from '../generator/caseGenerator';
import { useApp } from '../context/AppContext';

const CATEGORIES = [
  'Semua Kategori',
  'Finance',
  'E-Commerce',
  'Digital Marketing',
  'SaaS & Product',
  'Healthcare',
  'Social Media',
];

const CATEGORY_COLORS = {
  'Finance': { bg: 'rgba(56,189,248,0.14)', text: '#38bdf8', border: 'rgba(56,189,248,0.35)' },
  'E-Commerce': { bg: 'rgba(251,146,60,0.14)', text: '#fb923c', border: 'rgba(251,146,60,0.35)' },
  'Digital Marketing': { bg: 'rgba(244,63,94,0.14)', text: '#f43f5e', border: 'rgba(244,63,94,0.35)' },
  'SaaS & Product': { bg: 'rgba(168,85,247,0.14)', text: '#c084fc', border: 'rgba(168,85,247,0.35)' },
  'Social Media': { bg: 'rgba(236,72,153,0.14)', text: '#f472b6', border: 'rgba(236,72,153,0.35)' },
  'Healthcare': { bg: 'rgba(52,211,153,0.14)', text: '#34d399', border: 'rgba(52,211,153,0.35)' },
};

export default function GeneratePage() {
  const { perspectiveMode, setPerspectiveMode, isDA, modeLabel, modeEmoji } = useApp();

  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');
  const [currentCase, setCurrentCase] = useState(null);
  const [activeTab, setActiveTab] = useState('breakdown'); // 'breakdown' | 'markdown'
  const [generationCount, setGenerationCount] = useState(1);

  // Generate initial case on mount
  useEffect(() => {
    handleGenerateNewCase();
  }, []);

  const handleGenerateNewCase = (cat = selectedCategory) => {
    const newCase = generateProceduralCase(cat);
    setCurrentCase(newCase);
    setGenerationCount(prev => prev + 1);
  };

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    handleGenerateNewCase(cat);
  };

  if (!currentCase) return null;

  const catStyle = CATEGORY_COLORS[currentCase.category] || CATEGORY_COLORS['Finance'];
  const da = currentCase.dataAnalyst || {};
  const ds = currentCase.dataScience || {};
  const dnd = currentCase.dosAndDonts || { dos: [], donts: [] };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-base)' }}>

      {/* HEADER */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 40,
        background: 'rgba(7,9,15,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--color-border)',
        padding: '0.75rem 1rem',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
            ← Kembali ke Bank Soal
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '1.2rem' }}>⚡</span>
            <span style={{ fontWeight: 900, fontSize: '0.95rem' }}>Study Case Generator</span>
            <span className="pill pill-green" style={{ fontSize: '0.68rem' }}>Live Engine</span>
          </div>

          <span className={`pill ${isDA ? 'pill-da' : 'pill-ds'}`}>
            {modeEmoji} {modeLabel}
          </span>
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '1.75rem 1rem 4rem' }}>

        {/* ── BIG GENERATOR ACTION HERO ── */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(236,72,153,0.14), rgba(139,92,246,0.14))',
          border: '2px solid rgba(236,72,153,0.4)',
          borderRadius: 24,
          padding: '1.5rem',
          marginBottom: '1.75rem',
          boxShadow: '0 0 30px rgba(236,72,153,0.18)',
        }} className="anim-fade-up">

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <span style={{
                  background: 'rgba(236,72,153,0.25)',
                  color: '#f472b6',
                  padding: '2px 8px',
                  borderRadius: 99,
                  fontSize: '0.72rem',
                  fontWeight: 800,
                }}>
                  GENERATOR KASUS REAL-TIME
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-3)' }}>
                  Generasi ke-#{generationCount}
                </span>
              </div>
              <h1 style={{ fontSize: 'clamp(1.35rem, 3vw, 1.85rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>
                Generate Studi Kasus & Kunjaw Baru
              </h1>
              <p style={{ fontSize: '0.84rem', color: 'var(--color-text-2)', maxWidth: 620, marginTop: 4 }}>
                Klik tombol di kanan untuk men-generate grafik baru secara prosedural dengan formula matematika nyata, lengkap beserta kunci jawaban dan alasannya!
              </p>
            </div>

            {/* BIG SHINY GENERATE BUTTON */}
            <button
              onClick={() => handleGenerateNewCase(selectedCategory)}
              className="btn"
              style={{
                background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                color: '#fff',
                padding: '0.9rem 2rem',
                fontSize: '1rem',
                fontWeight: 900,
                borderRadius: 16,
                boxShadow: '0 6px 28px rgba(236,72,153,0.45)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                border: 'none',
              }}
            >
              <span style={{ fontSize: '1.3rem' }}>⚡</span>
              <span>GENERATE KASUS BARU!</span>
            </button>
          </div>

          {/* Category Filter Pills inside Generator */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 16, paddingTop: 14 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--color-text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
              Pilih Fokus Industri Kasus:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {CATEGORIES.map(cat => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    style={{
                      padding: '5px 12px',
                      borderRadius: 99,
                      border: isActive ? '1.5px solid #f472b6' : '1px solid var(--color-border)',
                      background: isActive ? 'rgba(236,72,153,0.25)' : 'var(--color-bg-base)',
                      color: isActive ? '#f472b6' : 'var(--color-text-2)',
                      fontSize: '0.75rem',
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
        </div>

        {/* ── CASE DETAILS HEADER ── */}
        <div style={{
          background: 'var(--color-bg-card)',
          border: '1.5px solid var(--color-border)',
          borderRadius: 20,
          padding: '1.5rem',
          marginBottom: '1.5rem',
        }} className="anim-fade-up">

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <span style={{
              background: catStyle.bg,
              color: catStyle.text,
              border: `1px solid ${catStyle.border}`,
              padding: '3px 10px',
              borderRadius: 99,
              fontSize: '0.74rem',
              fontWeight: 800,
            }}>
              🏷️ Kategori: {currentCase.category}
            </span>
            <span style={{
              background: 'var(--color-bg-raised)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-3)',
              padding: '3px 10px',
              borderRadius: 99,
              fontSize: '0.74rem',
              fontWeight: 700,
            }}>
              📊 {currentCase.chartType.toUpperCase()} Chart
            </span>
            <span className="pill pill-green">
              ⚡ Hasil Generate Real-Time
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(1.35rem, 2.8vw, 1.75rem)',
            fontWeight: 900,
            color: 'var(--color-text-1)',
            marginBottom: 10,
          }}>
            {currentCase.title}
          </h2>

          <div style={{
            background: 'var(--color-bg-base)',
            border: '1.5px solid var(--color-border)',
            borderRadius: 14,
            padding: '1rem',
          }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-warning)', marginBottom: 4 }}>
              ❓ Studi Kasus / Problem Bisnis:
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-2)', lineHeight: 1.6 }}>
              {currentCase.problemStatement}
            </p>
          </div>
        </div>

        {/* ── 2-COLUMN MAIN CONTENT ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1.2fr)',
          gap: '1.5rem',
        }} className="generate-page-grid">

          {/* LEFT: Chart & Quick Answer */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            <div style={{
              background: 'var(--color-bg-card)',
              border: '1.5px solid var(--color-border)',
              borderRadius: 18,
              padding: '1.25rem',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-text-2)' }}>
                  📈 Visualisasi Data Acak
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-text-3)' }}>
                  X: {currentCase.xLabel} | Y: {currentCase.yLabel}
                </span>
              </div>
              <div style={{ height: 280 }}>
                <ChartView caseData={currentCase} mode={perspectiveMode} />
              </div>
            </div>

            {/* Quick Answer */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(56,189,248,0.12), rgba(56,189,248,0.02))',
              border: '2px solid rgba(56,189,248,0.4)',
              borderRadius: 18,
              padding: '1.25rem',
              boxShadow: '0 0 20px rgba(56,189,248,0.15)',
            }} className="anim-fade-up">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#38bdf8', fontWeight: 800, fontSize: '0.92rem', marginBottom: 6 }}>
                <span style={{ fontSize: '1.2rem' }}>💡</span>
                <span>Kunci Jawaban Cepat (TL;DR)</span>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-1)', fontWeight: 600, lineHeight: 1.6 }}>
                "{currentCase.quickAnswer}"
              </p>
            </div>

            {/* Detailed Reasoning */}
            <div style={{
              background: 'var(--color-bg-card)',
              border: '1.5px solid var(--color-border)',
              borderRadius: 18,
              padding: '1.25rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-text-1)', fontWeight: 800, fontSize: '0.9rem', marginBottom: 8 }}>
                <span style={{ fontSize: '1.2rem' }}>🧠</span>
                <span>Kenapa Jawabannya Begitu? (Reasoning)</span>
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--color-text-2)', lineHeight: 1.65 }}>
                {currentCase.detailedReasoning}
              </p>
            </div>

            {/* Bottom Generate Again Button */}
            <button
              onClick={() => handleGenerateNewCase(selectedCategory)}
              className="btn"
              style={{
                background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                color: '#fff',
                padding: '0.9rem',
                fontSize: '0.95rem',
                borderRadius: 14,
                boxShadow: '0 4px 20px rgba(236,72,153,0.3)',
              }}
            >
              ⚡ Generate Kasus Lainnya
            </button>
          </div>

          {/* RIGHT: Perspective Breakdown + Algorithms + Dos/Donts + Markdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            <div style={{
              display: 'flex',
              background: 'var(--color-bg-card)',
              border: '1.5px solid var(--color-border)',
              borderRadius: 14,
              padding: 4,
              gap: 6,
            }}>
              <button
                onClick={() => setActiveTab('breakdown')}
                style={{
                  flex: 1, padding: '9px 12px', borderRadius: 10, border: 'none',
                  background: activeTab === 'breakdown' ? 'var(--color-bg-raised)' : 'transparent',
                  color: activeTab === 'breakdown' ? 'var(--color-text-1)' : 'var(--color-text-3)',
                  fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer',
                }}
              >
                🔍 Kunjaw & Analisis Interaktif
              </button>
              <button
                onClick={() => setActiveTab('markdown')}
                style={{
                  flex: 1, padding: '9px 12px', borderRadius: 10, border: 'none',
                  background: activeTab === 'markdown' ? 'var(--color-bg-raised)' : 'transparent',
                  color: activeTab === 'markdown' ? 'var(--color-text-1)' : 'var(--color-text-3)',
                  fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer',
                }}
              >
                📝 Pemilihan Markdown (DA / DS)
              </button>
            </div>

            {activeTab === 'breakdown' ? (
              <>
                {/* 2 Mode Buttons */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <button
                    onClick={() => setPerspectiveMode('da')}
                    style={{
                      padding: '14px', borderRadius: 14,
                      border: isDA ? '2px solid var(--color-da)' : '1.5px solid var(--color-border)',
                      background: isDA ? 'linear-gradient(135deg, rgba(79,158,255,0.22), rgba(79,158,255,0.06))' : 'var(--color-bg-card)',
                      cursor: 'pointer', textAlign: 'left',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: '1.2rem' }}>📊</span>
                      {isDA && <span className="pill pill-da">Aktif</span>}
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: isDA ? 'var(--color-da)' : 'var(--color-text-2)' }}>
                      Data Analyst
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--color-text-3)' }}>
                      Insight bisnis & rekomendasi
                    </div>
                  </button>

                  <button
                    onClick={() => setPerspectiveMode('ds')}
                    style={{
                      padding: '14px', borderRadius: 14,
                      border: !isDA ? '2px solid var(--color-ds)' : '1.5px solid var(--color-border)',
                      background: !isDA ? 'linear-gradient(135deg, rgba(191,127,255,0.22), rgba(191,127,255,0.06))' : 'var(--color-bg-card)',
                      cursor: 'pointer', textAlign: 'left',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: '1.2rem' }}>🔬</span>
                      {!isDA && <span className="pill pill-ds">Aktif</span>}
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: !isDA ? 'var(--color-ds)' : 'var(--color-text-2)' }}>
                      Data Scientist
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--color-text-3)' }}>
                      Algoritma, Python & validasi
                    </div>
                  </button>
                </div>

                {/* Perspective Details */}
                {isDA ? (
                  <div style={{
                    background: 'var(--color-bg-card)',
                    border: '1.5px solid var(--color-da-border)',
                    borderRadius: 18,
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                  }} className="anim-fade-up">

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-da)', fontWeight: 800, fontSize: '0.92rem' }}>
                      <span>📊</span>
                      <span>Analisis Sudut Pandang Data Analyst</span>
                    </div>

                    <div style={{ background: 'var(--color-bg-base)', borderRadius: 12, padding: '0.875rem' }}>
                      <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-da)', marginBottom: 4 }}>
                        🔍 Insight Bisnis:
                      </div>
                      <p style={{ fontSize: '0.84rem', color: 'var(--color-text-2)', lineHeight: 1.6 }}>
                        {da.insight}
                      </p>
                    </div>

                    <div style={{ background: 'var(--color-bg-base)', borderRadius: 12, padding: '0.875rem' }}>
                      <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-da)', marginBottom: 4 }}>
                        🎯 Rekomendasi Tindakan (Action Items):
                      </div>
                      <p style={{ fontSize: '0.84rem', color: 'var(--color-text-1)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                        {da.recommendations}
                      </p>
                    </div>

                    {da.kpiMetrics?.length > 0 && (
                      <div>
                        <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-text-3)', marginBottom: 6 }}>
                          📌 KPI / Metrik Pendamping Wajib:
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                          {da.kpiMetrics.map((kpi, idx) => (
                            <span key={idx} className="pill pill-da">
                              📈 {kpi}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }} className="anim-fade-up">
                    <div style={{
                      background: 'var(--color-bg-card)',
                      border: '1.5px solid var(--color-ds-border)',
                      borderRadius: 18,
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 12,
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-ds)', fontWeight: 800, fontSize: '0.92rem' }}>
                        <span>🔬</span>
                        <span>Analisis Sudut Pandang Data Scientist</span>
                      </div>

                      <div style={{ background: 'var(--color-bg-base)', borderRadius: 12, padding: '0.875rem' }}>
                        <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-ds)', marginBottom: 4 }}>
                          🧪 Karakteristik Distribusi & Validasi Statistik:
                        </div>
                        <p style={{ fontSize: '0.84rem', color: 'var(--color-text-2)', lineHeight: 1.6 }}>
                          {ds.statisticalAnalysis}
                        </p>
                      </div>
                    </div>

                    <AlgorithmBadgeList
                      algorithms={ds.algorithms}
                      libraries={ds.pythonLibraries}
                      experiment={ds.nextExperiment}
                    />
                  </div>
                )}

                <DosAndDontsCard dos={dnd.dos} donts={dnd.donts} />
              </>
            ) : (
              <MarkdownReportView caseData={currentCase} initialMode={perspectiveMode} />
            )}

          </div>
        </div>
      </main>

      <style>{`
        @media (max-width: 820px) {
          .generate-page-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
