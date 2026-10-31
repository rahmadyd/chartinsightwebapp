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
  'Finance': { bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' },
  'E-Commerce': { bg: '#fff7ed', text: '#c2410c', border: '#fed7aa' },
  'Digital Marketing': { bg: '#fdf2f8', text: '#be185d', border: '#fbcfe8' },
  'SaaS & Product': { bg: '#f5f3ff', text: '#6d28d9', border: '#ddd6fe' },
  'Social Media': { bg: '#fdf4ff', text: '#a21caf', border: '#f5d0fe' },
  'Healthcare': { bg: '#ecfdf5', text: '#047857', border: '#a7f3d0' },
};

export default function GeneratePage() {
  const { perspectiveMode, setPerspectiveMode, isDA, modeLabel, modeEmoji } = useApp();

  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');
  const [currentCase, setCurrentCase] = useState(null);
  const [activeTab, setActiveTab] = useState('breakdown'); // 'breakdown' | 'markdown'
  const [generationCount, setGenerationCount] = useState(1);

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
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a' }}>

      {/* HEADER */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 40,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #e2e8f0',
        padding: '0.75rem 1rem',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
            ← Kembali ke Bank Soal
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '1.2rem' }}>⚡</span>
            <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a' }}>Study Case Generator</span>
            <span className="pill pill-green" style={{ fontSize: '0.68rem' }}>Live Engine</span>
          </div>

          <span className={`pill ${isDA ? 'pill-da' : 'pill-ds'}`}>
            {modeEmoji} {modeLabel}
          </span>
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '1.75rem 1rem 4rem' }}>

        {/* ── BIG GENERATOR ACTION HERO (Clean & Professional White) ── */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #cbd5e1',
          borderRadius: 20,
          padding: '1.5rem',
          marginBottom: '1.75rem',
          boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
        }} className="anim-fade-up">

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <span style={{
                  background: '#eff6ff',
                  color: '#2563eb',
                  border: '1px solid #bfdbfe',
                  padding: '2px 8px',
                  borderRadius: 99,
                  fontSize: '0.72rem',
                  fontWeight: 800,
                }}>
                  GENERATOR KASUS REAL-TIME
                </span>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  Generasi ke-#{generationCount}
                </span>
              </div>
              <h1 style={{ fontSize: 'clamp(1.35rem, 3vw, 1.85rem)', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em' }}>
                Generate Studi Kasus & Kunjaw Baru
              </h1>
              <p style={{ fontSize: '0.86rem', color: '#475569', maxWidth: 620, marginTop: 4 }}>
                Klik tombol di kanan untuk men-generate grafik baru dengan data acak realistis, lengkap beserta kunci jawaban dan alasannya.
              </p>
            </div>

            {/* BIG SOLID GENERATE BUTTON */}
            <button
              onClick={() => handleGenerateNewCase(selectedCategory)}
              className="btn btn-primary"
              style={{
                padding: '0.85rem 1.85rem',
                fontSize: '0.98rem',
                fontWeight: 800,
                borderRadius: 12,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span>⚡</span>
              <span>GENERATE KASUS BARU</span>
            </button>
          </div>

          {/* Category Filter Pills inside Generator */}
          <div style={{ borderTop: '1px solid #f1f5f9', marginTop: 16, paddingTop: 14 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
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
                      border: isActive ? '1.5px solid #0f172a' : '1px solid #e2e8f0',
                      background: isActive ? '#0f172a' : '#ffffff',
                      color: isActive ? '#ffffff' : '#475569',
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
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: 16,
          padding: '1.5rem',
          marginBottom: '1.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
        }} className="anim-fade-up">

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <span style={{
              background: catStyle.bg,
              color: catStyle.text,
              border: `1px solid ${catStyle.border}`,
              padding: '2px 9px',
              borderRadius: 99,
              fontSize: '0.74rem',
              fontWeight: 800,
            }}>
              🏷️ Kategori: {currentCase.category}
            </span>
            <span style={{
              background: '#f1f5f9',
              border: '1px solid #e2e8f0',
              color: '#475569',
              padding: '2px 9px',
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
            color: '#0f172a',
            marginBottom: 10,
          }}>
            {currentCase.title}
          </h2>

          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: 12,
            padding: '1rem',
          }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#d97706', marginBottom: 4 }}>
              ❓ Studi Kasus / Problem Bisnis:
            </div>
            <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.6 }}>
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
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 16,
              padding: '1.25rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a' }}>
                  📈 Visualisasi Data Acak
                </span>
                <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
                  X: {currentCase.xLabel} | Y: {currentCase.yLabel}
                </span>
              </div>
              <div style={{ height: 280 }}>
                <ChartView caseData={currentCase} mode={perspectiveMode} />
              </div>
            </div>

            {/* Quick Answer */}
            <div style={{
              background: '#f0f9ff',
              border: '1px solid #bae6fd',
              borderRadius: 16,
              padding: '1.25rem',
              boxShadow: '0 1px 3px rgba(2,132,199,0.06)',
            }} className="anim-fade-up">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#0284c7', fontWeight: 800, fontSize: '0.92rem', marginBottom: 6 }}>
                <span style={{ fontSize: '1.15rem' }}>💡</span>
                <span>Kunci Jawaban Cepat (TL;DR)</span>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#0c4a6e', fontWeight: 600, lineHeight: 1.6 }}>
                "{currentCase.quickAnswer}"
              </p>
            </div>

            {/* Detailed Reasoning */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 16,
              padding: '1.25rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#0f172a', fontWeight: 800, fontSize: '0.9rem', marginBottom: 8 }}>
                <span style={{ fontSize: '1.15rem' }}>🧠</span>
                <span>Kenapa Jawabannya Begitu? (Reasoning)</span>
              </div>
              <p style={{ fontSize: '0.84rem', color: '#334155', lineHeight: 1.65 }}>
                {currentCase.detailedReasoning}
              </p>
            </div>

            {/* Bottom Generate Again Button */}
            <button
              onClick={() => handleGenerateNewCase(selectedCategory)}
              className="btn btn-primary"
              style={{
                padding: '0.85rem',
                fontSize: '0.92rem',
                borderRadius: 12,
              }}
            >
              ⚡ Generate Kasus Lainnya
            </button>
          </div>

          {/* RIGHT: Perspective Breakdown + Algorithms + Dos/Donts + Markdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            <div style={{
              display: 'flex',
              background: '#f1f5f9',
              border: '1px solid #e2e8f0',
              borderRadius: 12,
              padding: 3,
              gap: 4,
            }}>
              <button
                onClick={() => setActiveTab('breakdown')}
                style={{
                  flex: 1, padding: '8px 12px', borderRadius: 9, border: 'none',
                  background: activeTab === 'breakdown' ? '#ffffff' : 'transparent',
                  color: activeTab === 'breakdown' ? '#0f172a' : '#64748b',
                  fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer',
                  boxShadow: activeTab === 'breakdown' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                }}
              >
                🔍 Kunjaw & Analisis Interaktif
              </button>
              <button
                onClick={() => setActiveTab('markdown')}
                style={{
                  flex: 1, padding: '8px 12px', borderRadius: 9, border: 'none',
                  background: activeTab === 'markdown' ? '#ffffff' : 'transparent',
                  color: activeTab === 'markdown' ? '#0f172a' : '#64748b',
                  fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer',
                  boxShadow: activeTab === 'markdown' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
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
                      padding: '12px 14px', borderRadius: 12,
                      border: isDA ? '2px solid #2563eb' : '1px solid #e2e8f0',
                      background: isDA ? '#eff6ff' : '#ffffff',
                      cursor: 'pointer', textAlign: 'left',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: '1.2rem' }}>📊</span>
                      {isDA && <span className="pill pill-da">Aktif</span>}
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: isDA ? '#1d4ed8' : '#0f172a' }}>
                      Data Analyst
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                      Insight bisnis & rekomendasi
                    </div>
                  </button>

                  <button
                    onClick={() => setPerspectiveMode('ds')}
                    style={{
                      padding: '12px 14px', borderRadius: 12,
                      border: !isDA ? '2px solid #7c3aed' : '1px solid #e2e8f0',
                      background: !isDA ? '#f5f3ff' : '#ffffff',
                      cursor: 'pointer', textAlign: 'left',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: '1.2rem' }}>🔬</span>
                      {!isDA && <span className="pill pill-ds">Aktif</span>}
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: !isDA ? '#6d28d9' : '#0f172a' }}>
                      Data Scientist
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                      Algoritma, Python & validasi
                    </div>
                  </button>
                </div>

                {/* Perspective Details */}
                {isDA ? (
                  <div style={{
                    background: '#ffffff',
                    border: '1px solid #bfdbfe',
                    borderRadius: 16,
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                  }} className="anim-fade-up">

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#1d4ed8', fontWeight: 800, fontSize: '0.92rem' }}>
                      <span>📊</span>
                      <span>Analisis Sudut Pandang Data Analyst</span>
                    </div>

                    <div style={{ background: '#f8fafc', borderRadius: 10, padding: '0.875rem', border: '1px solid #f1f5f9' }}>
                      <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: '#2563eb', marginBottom: 4 }}>
                        🔍 Insight Bisnis:
                      </div>
                      <p style={{ fontSize: '0.84rem', color: '#334155', lineHeight: 1.6 }}>
                        {da.insight}
                      </p>
                    </div>

                    <div style={{ background: '#f8fafc', borderRadius: 10, padding: '0.875rem', border: '1px solid #f1f5f9' }}>
                      <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: '#2563eb', marginBottom: 4 }}>
                        🎯 Rekomendasi Tindakan (Action Items):
                      </div>
                      <p style={{ fontSize: '0.84rem', color: '#0f172a', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                        {da.recommendations}
                      </p>
                    </div>

                    {da.kpiMetrics?.length > 0 && (
                      <div>
                        <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', marginBottom: 6 }}>
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
                      background: '#ffffff',
                      border: '1px solid #ddd6fe',
                      borderRadius: 16,
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 12,
                      boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#6d28d9', fontWeight: 800, fontSize: '0.92rem' }}>
                        <span>🔬</span>
                        <span>Analisis Sudut Pandang Data Scientist</span>
                      </div>

                      <div style={{ background: '#f8fafc', borderRadius: 10, padding: '0.875rem', border: '1px solid #f1f5f9' }}>
                        <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: '#7c3aed', marginBottom: 4 }}>
                          🧪 Karakteristik Distribusi & Validasi Statistik:
                        </div>
                        <p style={{ fontSize: '0.84rem', color: '#334155', lineHeight: 1.6 }}>
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
