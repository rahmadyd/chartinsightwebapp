import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import ChartView from '../components/ChartView';
import AnswerForm from '../components/AnswerForm';
import SampleAnswer from '../components/SampleAnswer';
import MarkdownReportView from '../components/MarkdownReportView';
import casesData from '../data/cases.json';
import { loadAllAnswers, saveAnswer, markCaseCompleted, getCompletedCases } from '../utils/storage';
import { useApp } from '../context/AppContext';
import PerspectiveSelector from '../components/PerspectiveSelector';

export default function CasePage() {
  const { id } = useParams();
  const { perspectiveMode, isDA, modeLabel, modeEmoji, modeColor, modePillClass } = useApp();
  const caseData = casesData.find(c => c.id === id);

  const [answers, setAnswers] = useState({ q1: '', q2: '', q3: '', q4: '' });
  const [showSample, setShowSample] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showModeSelector, setShowModeSelector] = useState(false);
  const [activeTab, setActiveTab] = useState('form'); // 'form' | 'markdown'

  useEffect(() => {
    if (!caseData) return;
    setAnswers(loadAllAnswers(caseData.id));
    setShowSample(false);
    setIsCompleted(getCompletedCases().includes(caseData.id));
  }, [id, caseData]);

  const handleChange = useCallback((key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    saveAnswer(caseData.id, key, value);
  }, [caseData]);

  const handleShowSample = () => {
    setShowSample(true);
    markCaseCompleted(caseData.id);
    setIsCompleted(true);
  };

  if (!caseData) return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-base)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <p style={{ color: 'var(--color-text-3)' }}>Kasus tidak ditemukan.</p>
      <Link to="/" className="btn btn-ghost">← Kembali</Link>
    </div>
  );

  const idx = casesData.findIndex(c => c.id === id);
  const prevCase = idx > 0 ? casesData[idx - 1] : null;
  const nextCase = idx < casesData.length - 1 ? casesData[idx + 1] : null;
  const filledCount = Object.values(answers).filter(a => a.trim()).length;
  const allFilled = filledCount === 4;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-base)' }}>

      {/* ── HEADER ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 40,
        background: 'rgba(7,9,15,0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--color-border)',
        padding: '0.7rem 1rem',
      }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          display: 'flex', alignItems: 'center', gap: 12,
          justifyContent: 'space-between',
        }}>
          <Link to="/" className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
            ← Kembali
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, justifyContent: 'center', minWidth: 0 }}>
            <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-text-2)', truncate: true, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxWidth: 200 }}>
              {caseData.title}
            </span>
            {isCompleted && <span className="pill pill-green">✓ Selesai</span>}
          </div>

          {/* Mode toggle pill */}
          <button
            onClick={() => setShowModeSelector(v => !v)}
            className={`pill ${modePillClass}`}
            style={{ cursor: 'pointer', border: 'none', whiteSpace: 'nowrap' }}
          >
            {modeEmoji} {modeLabel} ▾
          </button>
        </div>

        {/* Floating mode selector */}
        {showModeSelector && (
          <div style={{
            position: 'absolute', right: 16, top: '100%', marginTop: 8,
            width: 320, zIndex: 50,
            background: 'var(--color-bg-card)',
            border: '1.5px solid var(--color-border)',
            borderRadius: 16, padding: '1rem',
            boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
          }}>
            <PerspectiveSelector />
            <button
              onClick={() => setShowModeSelector(false)}
              style={{ width: '100%', marginTop: 12, textAlign: 'center', fontSize: '0.78rem', color: 'var(--color-text-3)', background: 'none', border: 'none', cursor: 'pointer' }}
            >Tutup</button>
          </div>
        )}
      </header>

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '1.5rem 1rem 4rem' }}>

        {/* ── CONTEXT BANNER ── */}
        <div style={{
          background: 'var(--color-bg-card)',
          border: '1.5px solid var(--color-border)',
          borderRadius: 16, padding: '1rem 1.25rem',
          marginBottom: '1.25rem',
          display: 'flex', gap: 12, alignItems: 'flex-start',
        }}>
          <span style={{ fontSize: '1.5rem' }}>📋</span>
          <div>
            <div className="section-label" style={{ marginBottom: 4 }}>Konteks Kasus</div>
            <p style={{ color: 'var(--color-text-2)', fontSize: '0.875rem', lineHeight: 1.6 }}>
              {caseData.context}
            </p>
          </div>
        </div>

        {/* ── MAIN GRID ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
          gap: '1.25rem',
        }}
          className="case-grid"
        >
          {/* LEFT: Chart + Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Chart */}
            <div style={{
              background: 'var(--color-bg-card)',
              border: '1.5px solid var(--color-border)',
              borderRadius: 18, padding: '1.25rem',
            }}>
              <div style={{ height: 280 }}>
                <ChartView caseData={caseData} mode={perspectiveMode} />
              </div>
            </div>

            {/* Progress mini */}
            <div style={{
              background: 'var(--color-bg-card)',
              border: '1.5px solid var(--color-border)',
              borderRadius: 14, padding: '0.875rem 1rem',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.8rem' }}>
                <span style={{ fontWeight: 700 }}>📝 Pertanyaan Terisi</span>
                <span style={{ color: modeColor, fontWeight: 700 }}>{filledCount}/4</span>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {['Q1','Q2','Q3','Q4'].map((q, i) => (
                  <div key={q} style={{
                    flex: 1, height: 6, borderRadius: 99,
                    background: Object.values(answers)[i]?.trim()
                      ? modeColor
                      : 'var(--color-bg-raised)',
                    transition: 'background 0.3s',
                  }}/>
                ))}
              </div>
            </div>

            {/* Show Sample Button */}
            {!showSample && (
              <button
                onClick={allFilled ? handleShowSample : undefined}
                disabled={!allFilled}
                style={{
                  width: '100%', padding: '0.875rem',
                  borderRadius: 14, border: 'none',
                  fontWeight: 800, fontSize: '0.9rem',
                  cursor: allFilled ? 'pointer' : 'not-allowed',
                  background: allFilled
                    ? (isDA
                        ? 'linear-gradient(135deg, #3a7bd5, var(--color-da))'
                        : 'linear-gradient(135deg, #8b5cf6, var(--color-ds))')
                    : 'var(--color-bg-raised)',
                  color: allFilled ? '#fff' : 'var(--color-text-3)',
                  boxShadow: allFilled ? `0 4px 20px ${isDA ? 'rgba(79,158,255,0.3)' : 'rgba(191,127,255,0.3)'}` : 'none',
                  transition: 'all 0.2s',
                }}
              >
                {allFilled ? `✨ Lihat Jawaban Contoh ${modeEmoji}` : `Isi semua pertanyaan dulu (${filledCount}/4)`}
              </button>
            )}

            {showSample && (
              <button
                onClick={() => setShowSample(false)}
                className="btn btn-ghost"
                style={{ width: '100%' }}
              >
                🙈 Sembunyikan Jawaban
              </button>
            )}

            {/* Nav */}
            <div style={{ display: 'flex', gap: 8 }}>
              {prevCase ? (
                <Link to={`/case/${prevCase.id}`} className="btn btn-ghost" style={{ flex: 1, fontSize: '0.78rem', padding: '8px' }}>
                  ← {prevCase.title}
                </Link>
              ) : <div style={{ flex: 1 }} />}
              {nextCase ? (
                <Link to={`/case/${nextCase.id}`} className="btn btn-ghost" style={{ flex: 1, fontSize: '0.78rem', padding: '8px', textAlign: 'right' }}>
                  {nextCase.title} →
                </Link>
              ) : <div style={{ flex: 1 }} />}
            </div>
          </div>

          {/* RIGHT: Form + Sample + Markdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Switcher Tab */}
            <div style={{
              display: 'flex',
              background: 'var(--color-bg-card)',
              border: '1.5px solid var(--color-border)',
              borderRadius: 14,
              padding: 4,
              gap: 6,
            }}>
              <button
                onClick={() => setActiveTab('form')}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: 10,
                  border: 'none',
                  background: activeTab === 'form' ? (isDA ? 'var(--color-da)' : 'var(--color-ds)') : 'transparent',
                  color: activeTab === 'form' ? '#fff' : 'var(--color-text-3)',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                ✍️ Form 4 Pertanyaan
              </button>
              <button
                onClick={() => setActiveTab('markdown')}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: 10,
                  border: 'none',
                  background: activeTab === 'markdown' ? (isDA ? 'var(--color-da)' : 'var(--color-ds)') : 'transparent',
                  color: activeTab === 'markdown' ? '#fff' : 'var(--color-text-3)',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                📝 Pemilihan Markdown (DA / DS)
              </button>
            </div>

            {activeTab === 'form' ? (
              <>
                <AnswerForm answers={answers} onChange={handleChange} caseData={caseData} />

                {showSample && (
                  <div className="anim-fade-up" style={{
                    background: 'var(--color-bg-card)',
                    border: `1.5px solid ${modeColor}`,
                    borderRadius: 18, padding: '1.25rem',
                  }}>
                    <SampleAnswer sampleAnswers={caseData.sampleAnswers} mode={perspectiveMode} userAnswers={answers} />
                  </div>
                )}
              </>
            ) : (
              <MarkdownReportView
                caseData={caseData}
                userAnswers={answers}
                initialMode={perspectiveMode}
              />
            )}
          </div>
        </div>
      </main>

      {/* Mobile stacking */}
      <style>{`
        @media (max-width: 700px) {
          .case-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
