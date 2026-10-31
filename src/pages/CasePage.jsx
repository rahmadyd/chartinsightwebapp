import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ChartView from '../components/ChartView';
import MarkdownReportView from '../components/MarkdownReportView';
import DosAndDontsCard from '../components/DosAndDontsCard';
import AlgorithmBadgeList from '../components/AlgorithmBadgeList';
import casesData from '../data/cases.json';
import { useApp } from '../context/AppContext';

const CATEGORY_COLORS = {
  'Finance': { bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' },
  'E-Commerce': { bg: '#fff7ed', text: '#c2410c', border: '#fed7aa' },
  'Digital Marketing': { bg: '#fdf2f8', text: '#be185d', border: '#fbcfe8' },
  'SaaS & Product': { bg: '#f5f3ff', text: '#6d28d9', border: '#ddd6fe' },
  'Social Media': { bg: '#fdf4ff', text: '#a21caf', border: '#f5d0fe' },
  'Healthcare': { bg: '#ecfdf5', text: '#047857', border: '#a7f3d0' },
};

export default function CasePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { perspectiveMode, setPerspectiveMode, isDA, modeLabel, modeEmoji } = useApp();

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
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a' }}>

      {/* ── HEADER ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 40,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #e2e8f0',
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
            <Link to="/generate" className="btn btn-primary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
              ⚡ Generate Kasus Baru
            </Link>
            <button
              onClick={handleRandomCase}
              className="btn btn-ghost"
              style={{ padding: '6px 14px', fontSize: '0.8rem' }}
            >
              🎲 Acak Kasus Lain
            </button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '1.75rem 1rem 4rem' }}>

        {/* ── CASE HEADER CARD ── */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: 16,
          padding: '1.5rem',
          marginBottom: '1.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
        }} className="anim-fade-up">

          {/* Badges */}
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
              🏷️ Kategori: {caseData.category}
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
              📊 {caseData.chartType.toUpperCase()} Chart
            </span>
            <span className="pill pill-green">
              💡 Kunjaw & Reasoning Siap
            </span>
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: 'clamp(1.35rem, 3vw, 1.85rem)',
            fontWeight: 900,
            lineHeight: 1.25,
            color: '#0f172a',
            marginBottom: 12,
          }}>
            {caseData.title}
          </h1>

          {/* Problem Statement Box */}
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
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 16,
              padding: '1.25rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a' }}>
                  📈 Visualisasi Data
                </span>
                <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
                  X: {caseData.xLabel} | Y: {caseData.yLabel}
                </span>
              </div>
              <div style={{ height: 280 }}>
                <ChartView caseData={caseData} mode={perspectiveMode} />
              </div>
            </div>

            {/* Quick Answer (Kunjaw Langsung) */}
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
                "{caseData.quickAnswer}"
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
                {caseData.detailedReasoning}
              </p>
            </div>

            {/* Navigation to Prev / Next */}
            <div style={{ display: 'flex', gap: 8 }}>
              {prevCase ? (
                <Link to={`/case/${prevCase.id}`} className="btn btn-ghost" style={{ flex: 1, fontSize: '0.78rem', padding: '9px' }}>
                  ← {prevCase.title.slice(0, 24)}...
                </Link>
              ) : <div style={{ flex: 1 }} />}
              {nextCase ? (
                <Link to={`/case/${nextCase.id}`} className="btn btn-ghost" style={{ flex: 1, fontSize: '0.78rem', padding: '9px', textAlign: 'right' }}>
                  {nextCase.title.slice(0, 24)}... →
                </Link>
              ) : <div style={{ flex: 1 }} />}
            </div>
          </div>

          {/* RIGHT COLUMN: Perspective Breakdown + Algorithms + Dos/Donts + Markdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* Top View Selector */}
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
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: 9,
                  border: 'none',
                  background: activeTab === 'breakdown' ? '#ffffff' : 'transparent',
                  color: activeTab === 'breakdown' ? '#0f172a' : '#64748b',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  boxShadow: activeTab === 'breakdown' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                }}
              >
                🔍 Kunjaw & Analisis Interaktif
              </button>
              <button
                onClick={() => setActiveTab('markdown')}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: 9,
                  border: 'none',
                  background: activeTab === 'markdown' ? '#ffffff' : 'transparent',
                  color: activeTab === 'markdown' ? '#0f172a' : '#64748b',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  boxShadow: activeTab === 'markdown' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                }}
              >
                📝 Pemilihan Markdown (DA / DS)
              </button>
            </div>

            {activeTab === 'breakdown' ? (
              <>
                {/* 2 Big Perspective Toggle */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <button
                    onClick={() => setPerspectiveMode('da')}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 12,
                      border: isDA ? '2px solid #2563eb' : '1px solid #e2e8f0',
                      background: isDA ? '#eff6ff' : '#ffffff',
                      cursor: 'pointer',
                      textAlign: 'left',
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
                    <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 2 }}>
                      Insight bisnis & rekomendasi
                    </div>
                  </button>

                  <button
                    onClick={() => setPerspectiveMode('ds')}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 12,
                      border: !isDA ? '2px solid #7c3aed' : '1px solid #e2e8f0',
                      background: !isDA ? '#f5f3ff' : '#ffffff',
                      cursor: 'pointer',
                      textAlign: 'left',
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
                    <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 2 }}>
                      Algoritma, Python & validasi
                    </div>
                  </button>
                </div>

                {/* Perspective Details Card */}
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

                {/* DOs & DONTs */}
                <DosAndDontsCard dos={dnd.dos} donts={dnd.donts} />
              </>
            ) : (
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
