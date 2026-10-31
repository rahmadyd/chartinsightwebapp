import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ChartView from '../components/ChartView';
import MarkdownReportView from '../components/MarkdownReportView';
import DosAndDontsCard from '../components/DosAndDontsCard';
import AlgorithmBadgeList from '../components/AlgorithmBadgeList';
import casesData from '../data/cases.json';
import { useApp } from '../context/AppContext';

const CATEGORY_COLORS = {
  'Finance': { bg: 'rgba(56,189,248,0.14)', text: '#38bdf8', border: 'rgba(56,189,248,0.35)' },
  'E-Commerce': { bg: 'rgba(251,146,60,0.14)', text: '#fb923c', border: 'rgba(251,146,60,0.35)' },
  'Digital Marketing': { bg: 'rgba(244,63,94,0.14)', text: '#f43f5e', border: 'rgba(244,63,94,0.35)' },
  'SaaS & Product': { bg: 'rgba(168,85,247,0.14)', text: '#c084fc', border: 'rgba(168,85,247,0.35)' },
  'Social Media': { bg: 'rgba(236,72,153,0.14)', text: '#f472b6', border: 'rgba(236,72,153,0.35)' },
  'Healthcare': { bg: 'rgba(52,211,153,0.14)', text: '#34d399', border: 'rgba(52,211,153,0.35)' },
};

export default function CasePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { perspectiveMode, setPerspectiveMode, isDA, modeColor, modeLabel, modeEmoji } = useApp();

  const caseData = casesData.find(c => c.id === id) || casesData[0];
  const [activeTab, setActiveTab] = useState('breakdown'); // 'breakdown' | 'markdown'

  const catStyle = CATEGORY_COLORS[caseData.category] || CATEGORY_COLORS['Finance'];
  const da = caseData.dataAnalyst || {};
  const ds = caseData.dataScience || {};
  const dnd = caseData.dosAndDonts || { dos: [], donts: [] };

  const handleRandomCase = () => {
    const otherCases = casesData.filter(c => c.id !== caseData.id);
    const randomCase = otherCases[Math.floor(Math.random() * otherCases.length)] || casesData[0];
    navigate(`/case/${randomCase.id}`);
  };

  const currentIndex = casesData.findIndex(c => c.id === caseData.id);
  const prevCase = currentIndex > 0 ? casesData[currentIndex - 1] : null;
  const nextCase = currentIndex < casesData.length - 1 ? casesData[currentIndex + 1] : null;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-base)' }}>

      {/* ── HEADER ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 40,
        background: 'rgba(7,9,15,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--color-border)',
        padding: '0.75rem 1rem',
      }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: 10,
        }}>
          <Link to="/" className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
            ← Bank Soal
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              onClick={handleRandomCase}
              className="btn"
              style={{
                padding: '6px 14px',
                fontSize: '0.8rem',
                background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                color: '#fff',
                boxShadow: '0 0 14px rgba(236,72,153,0.3)',
              }}
            >
              🎲 Acak Studi Kasus Lain
            </button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '1.75rem 1rem 4rem' }}>

        {/* ── CASE HEADER CARD ── */}
        <div style={{
          background: 'var(--color-bg-card)',
          border: '1.5px solid var(--color-border)',
          borderRadius: 20,
          padding: '1.5rem',
          marginBottom: '1.5rem',
        }} className="anim-fade-up">

          {/* Badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <span style={{
              background: catStyle.bg,
              color: catStyle.text,
              border: `1px solid ${catStyle.border}`,
              padding: '3px 10px',
              borderRadius: 99,
              fontSize: '0.74rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
            }}>
              🏷️ Kategori: {caseData.category}
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
              📊 {caseData.chartType.toUpperCase()} Chart
            </span>
            <span style={{
              background: 'rgba(52,211,153,0.12)',
              border: '1px solid rgba(52,211,153,0.3)',
              color: '#34d399',
              padding: '3px 10px',
              borderRadius: 99,
              fontSize: '0.74rem',
              fontWeight: 700,
            }}>
              💡 Kunjaw & Reasoning Siap
            </span>
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: 'clamp(1.4rem, 3vw, 1.85rem)',
            fontWeight: 900,
            lineHeight: 1.25,
            color: 'var(--color-text-1)',
            marginBottom: 10,
          }}>
            {caseData.title}
          </h1>

          {/* Problem Statement Box */}
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
              {caseData.problemStatement}
            </p>
          </div>
        </div>

        {/* ── 2-COLUMN MAIN CONTENT ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1.2fr)',
          gap: '1.5rem',
        }} className="case-page-grid">

          {/* LEFT COLUMN: Visual Chart & Quick Answer */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* Interactive Chart */}
            <div style={{
              background: 'var(--color-bg-card)',
              border: '1.5px solid var(--color-border)',
              borderRadius: 18,
              padding: '1.25rem',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-text-2)' }}>
                  📈 Visualisasi Data
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-text-3)' }}>
                  X: {caseData.xLabel} | Y: {caseData.yLabel}
                </span>
              </div>
              <div style={{ height: 280 }}>
                <ChartView caseData={caseData} mode={perspectiveMode} />
              </div>
            </div>

            {/* Quick Answer (Kunjaw Langsung) */}
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
                "{caseData.quickAnswer}"
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
                {caseData.detailedReasoning}
              </p>
            </div>

            {/* Navigation to Prev / Next */}
            <div style={{ display: 'flex', gap: 8 }}>
              {prevCase ? (
                <Link to={`/case/${prevCase.id}`} className="btn btn-ghost" style={{ flex: 1, fontSize: '0.78rem', padding: '10px' }}>
                  ← {prevCase.title.slice(0, 24)}...
                </Link>
              ) : <div style={{ flex: 1 }} />}
              {nextCase ? (
                <Link to={`/case/${nextCase.id}`} className="btn btn-ghost" style={{ flex: 1, fontSize: '0.78rem', padding: '10px', textAlign: 'right' }}>
                  {nextCase.title.slice(0, 24)}... →
                </Link>
              ) : <div style={{ flex: 1 }} />}
            </div>
          </div>

          {/* RIGHT COLUMN: Perspective Breakdown + Algorithms + Dos/Donts + Markdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* Top View Selector: Breakdown Interaktif vs Pemilihan Markdown */}
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
                  flex: 1,
                  padding: '9px 12px',
                  borderRadius: 10,
                  border: 'none',
                  background: activeTab === 'breakdown' ? 'var(--color-bg-raised)' : 'transparent',
                  color: activeTab === 'breakdown' ? 'var(--color-text-1)' : 'var(--color-text-3)',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  boxShadow: activeTab === 'breakdown' ? '0 2px 8px rgba(0,0,0,0.3)' : 'none',
                }}
              >
                🔍 Kunjaw & Analisis Interaktif
              </button>
              <button
                onClick={() => setActiveTab('markdown')}
                style={{
                  flex: 1,
                  padding: '9px 12px',
                  borderRadius: 10,
                  border: 'none',
                  background: activeTab === 'markdown' ? 'var(--color-bg-raised)' : 'transparent',
                  color: activeTab === 'markdown' ? 'var(--color-text-1)' : 'var(--color-text-3)',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  boxShadow: activeTab === 'markdown' ? '0 2px 8px rgba(0,0,0,0.3)' : 'none',
                }}
              >
                📝 Pemilihan Markdown (DA / DS)
              </button>
            </div>

            {activeTab === 'breakdown' ? (
              <>
                {/* 2 Big Perspective Toggle: Data Analyst vs Data Science */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 10,
                }}>
                  <button
                    onClick={() => setPerspectiveMode('da')}
                    style={{
                      padding: '14px',
                      borderRadius: 14,
                      border: isDA ? '2px solid var(--color-da)' : '1.5px solid var(--color-border)',
                      background: isDA ? 'linear-gradient(135deg, rgba(79,158,255,0.22), rgba(79,158,255,0.06))' : 'var(--color-bg-card)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s',
                      boxShadow: isDA ? '0 0 20px var(--color-da-glow)' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: '1.2rem' }}>📊</span>
                      {isDA && <span className="pill pill-da">Aktif</span>}
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: isDA ? 'var(--color-da)' : 'var(--color-text-2)' }}>
                      Data Analyst
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--color-text-3)', marginTop: 2 }}>
                      Insight bisnis & rekomendasi aksi
                    </div>
                  </button>

                  <button
                    onClick={() => setPerspectiveMode('ds')}
                    style={{
                      padding: '14px',
                      borderRadius: 14,
                      border: !isDA ? '2px solid var(--color-ds)' : '1.5px solid var(--color-border)',
                      background: !isDA ? 'linear-gradient(135deg, rgba(191,127,255,0.22), rgba(191,127,255,0.06))' : 'var(--color-bg-card)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s',
                      boxShadow: !isDA ? '0 0 20px var(--color-ds-glow)' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: '1.2rem' }}>🔬</span>
                      {!isDA && <span className="pill pill-ds">Aktif</span>}
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: !isDA ? 'var(--color-ds)' : 'var(--color-text-2)' }}>
                      Data Scientist
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--color-text-3)', marginTop: 2 }}>
                      Statistik, algoritma & pemodelan
                    </div>
                  </button>
                </div>

                {/* Perspective Details Card */}
                {isDA ? (
                  /* DA VIEW */
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

                    {/* Business Insight */}
                    <div style={{ background: 'var(--color-bg-base)', borderRadius: 12, padding: '0.875rem' }}>
                      <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-da)', marginBottom: 4 }}>
                        🔍 Insight Bisnis:
                      </div>
                      <p style={{ fontSize: '0.84rem', color: 'var(--color-text-2)', lineHeight: 1.6 }}>
                        {da.insight}
                      </p>
                    </div>

                    {/* Action Items */}
                    <div style={{ background: 'var(--color-bg-base)', borderRadius: 12, padding: '0.875rem' }}>
                      <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-da)', marginBottom: 4 }}>
                        🎯 Rekomendasi Tindakan (Action Items):
                      </div>
                      <p style={{ fontSize: '0.84rem', color: 'var(--color-text-1)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                        {da.recommendations}
                      </p>
                    </div>

                    {/* Key KPI Metrics */}
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
                  /* DS VIEW */
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

                      {/* Statistical Validation */}
                      <div style={{ background: 'var(--color-bg-base)', borderRadius: 12, padding: '0.875rem' }}>
                        <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-ds)', marginBottom: 4 }}>
                          🧪 Karakteristik Distribusi & Validasi Statistik:
                        </div>
                        <p style={{ fontSize: '0.84rem', color: 'var(--color-text-2)', lineHeight: 1.6 }}>
                          {ds.statisticalAnalysis}
                        </p>
                      </div>
                    </div>

                    {/* Algorithms & Toolkit Component */}
                    <AlgorithmBadgeList
                      algorithms={ds.algorithms}
                      libraries={ds.pythonLibraries}
                      experiment={ds.nextExperiment}
                    />
                  </div>
                )}

                {/* DOs & DONTs (Tips & Trik Analisis) */}
                <DosAndDontsCard dos={dnd.dos} donts={dnd.donts} />
              </>
            ) : (
              /* MARKDOWN VIEW */
              <MarkdownReportView caseData={caseData} initialMode={perspectiveMode} />
            )}
          </div>
        </div>
      </main>

      <style>{`
        @media (max-width: 820px) {
          .case-page-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
