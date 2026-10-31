import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ChartView from '../components/ChartView';
import { generateSeededCase, generateSeed } from '../generator/caseGenerator';
import { useApp } from '../context/AppContext';

const CATEGORIES = [
  'Semua',
  'Finance',
  'E-Commerce',
  'Digital Marketing',
  'SaaS & Product',
  'Healthcare',
];

export default function Home() {
  const { perspectiveMode, setPerspectiveMode, isDA, modeLabel, modeEmoji } = useApp();

  // Generator inputs (inspired by the screenshot)
  const [complexity, setComplexity] = useState(2); // 1, 2, 3
  const [seedInput, setSeedInput] = useState('482910');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // Currently displayed case
  const [currentCase, setCurrentCase] = useState(null);
  const [copied, setCopied] = useState(false);

  // Generate on initial load
  useEffect(() => {
    handleGenerateCase(seedInput, selectedCategory, complexity);
  }, []);

  const handleRandomSeed = () => {
    const newSeed = String(generateSeed());
    setSeedInput(newSeed);
    handleGenerateCase(newSeed, selectedCategory, complexity);
  };

  const handleGenerateCase = (seed = seedInput, cat = selectedCategory, comp = complexity) => {
    const numSeed = parseInt(seed, 10) || 482910;
    const generated = generateSeededCase(cat, numSeed, comp);
    setCurrentCase(generated);
  };

  const handleCopyMarkdown = () => {
    if (!currentCase) return;
    const md = `# 📊 Studi Kasus: ${currentCase.title}
**Kategori:** ${currentCase.category} | **Seed:** #${currentCase.seed}

### ❓ Masalah
${currentCase.problem}

### 💡 Kunci Jawaban
${currentCase.quickAnswer}

### 🧠 Kenapa Jawabannya Begitu?
${currentCase.reasoning}

### 🎯 Solusi ${isDA ? 'Data Analyst' : 'Data Scientist'}
${isDA ? currentCase.daAction : `Algoritma: ${currentCase.dsAlgorithms.join(', ')}\nLibrary: ${currentCase.dsLibraries.join(', ')}`}

### ✅ DOs:
${currentCase.dos.map(d => `- ${d}`).join('\n')}

### ❌ DON'Ts:
${currentCase.donts.map(d => `- ${d}`).join('\n')}
`;
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!currentCase) return null;

  const accentColor = isDA ? '#2563eb' : '#7c3aed';
  const complexityLabels = ['Pemula / Simpel', 'Menengah / Standar', 'Lanjutan / Kompleks'];

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a' }}>

      {/* ── TOP NAV BAR (Minimalis & Rapi) ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 40,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #e2e8f0',
        padding: '0.75rem 1rem',
      }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: '1.4rem' }}>🧪</span>
            <div>
              <span style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.02em', color: '#0f172a' }}>
                Chart Insight Lab
              </span>
              <span style={{ display: 'block', fontSize: '0.68rem', color: '#64748b' }}>
                Belajar Membaca Grafik Santai & Tanpa Pusing
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Link to="/image" className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
              📷 Bedah Gambar Grafik
            </Link>
            <Link to="/glossary" className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
              📖 Glosarium
            </Link>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 960, margin: '0 auto', padding: '2rem 1rem 5rem' }}>

        {/* ── GENERATOR CONTROL BOX (Persis Seperti di Screenshot) ── */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: 16,
          padding: '1.25rem 1.5rem',
          marginBottom: '2rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
        }} className="anim-fade-up">

          {/* Top Bar: Slider + Seed Input + Tombol Acak */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1.4fr) auto',
            gap: 12,
            alignItems: 'center',
            marginBottom: 14,
          }} className="generator-bar-grid">

            {/* Slider Tingkat Kesulitan */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#64748b', fontWeight: 600, marginBottom: 4 }}>
                <span>Kompleksitas:</span>
                <span style={{ color: '#0f172a', fontWeight: 700 }}>{complexityLabels[complexity - 1]}</span>
              </div>
              <input
                type="range"
                min="1"
                max="3"
                value={complexity}
                onChange={e => setComplexity(parseInt(e.target.value, 10))}
                style={{
                  width: '100%',
                  accentColor: '#0d9488', // teal accent like screenshot
                  cursor: 'pointer',
                }}
              />
            </div>

            {/* Seed Input (misal: 482910) */}
            <div>
              <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 600, marginBottom: 4 }}>
                Kode Seed Kasus:
              </div>
              <input
                type="text"
                className="input-field"
                placeholder="misal: 482910"
                value={seedInput}
                onChange={e => setSeedInput(e.target.value)}
                style={{
                  padding: '0.55rem 0.85rem',
                  fontSize: '0.88rem',
                  fontFamily: 'monospace',
                  background: '#f8fafc',
                }}
              />
            </div>

            {/* Tombol Acak */}
            <div style={{ paddingTop: 18 }}>
              <button
                onClick={handleRandomSeed}
                className="btn btn-ghost"
                style={{
                  padding: '0.55rem 1rem',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                }}
                title="Acak angka seed baru"
              >
                <span>🎲</span>
                <span>Acak</span>
              </button>
            </div>
          </div>

          {/* Kategori Santai */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
            <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, marginRight: 4 }}>
              Kategori:
            </span>
            {CATEGORIES.map(cat => {
              const isSel = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    handleGenerateCase(seedInput, cat, complexity);
                  }}
                  style={{
                    padding: '3px 10px',
                    borderRadius: 99,
                    border: isSel ? '1px solid #0f172a' : '1px solid #e2e8f0',
                    background: isSel ? '#0f172a' : '#f8fafc',
                    color: isSel ? '#ffffff' : '#475569',
                    fontSize: '0.72rem',
                    fontWeight: isSel ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.1s ease',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* WIDE CLEAN BUTTON (Persis Seperti Tombol "Hasilkan Studi Kasus MySQL" di Screenshot) */}
          <button
            onClick={() => handleGenerateCase(seedInput, selectedCategory, complexity)}
            style={{
              width: '100%',
              padding: '0.85rem 1.5rem',
              borderRadius: 12,
              border: '1px solid #cbd5e1',
              background: '#f1f5f9',
              color: '#0f172a',
              fontSize: '0.98rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              transition: 'all 0.15s ease',
              boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#e2e8f0';
              e.currentTarget.style.borderColor = '#94a3b8';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#f1f5f9';
              e.currentTarget.style.borderColor = '#cbd5e1';
            }}
          >
            <span style={{ fontSize: '1.15rem' }}>✨</span>
            <span>Hasilkan Studi Kasus Grafik</span>
          </button>
        </div>

        {/* ── HASIL STUDI KASUS (BERSIH, LEGA, SANTAI, GAK BIKIN PUSING) ── */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: 20,
          padding: '1.75rem',
          boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
        }} className="anim-fade-up">

          {/* Header Kasus */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span className="pill pill-da">
                  🏷️ {currentCase.category}
                </span>
                <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>
                  Seed #{currentCase.seed}
                </span>
              </div>
              <h1 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.3 }}>
                {currentCase.title}
              </h1>
            </div>

            {/* Mode Switcher Simpel: DA vs DS */}
            <div style={{
              display: 'flex',
              background: '#f1f5f9',
              borderRadius: 10,
              padding: 3,
              gap: 3,
            }}>
              <button
                onClick={() => setPerspectiveMode('da')}
                style={{
                  padding: '5px 12px',
                  borderRadius: 8,
                  border: 'none',
                  background: isDA ? '#ffffff' : 'transparent',
                  color: isDA ? '#2563eb' : '#64748b',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: isDA ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                }}
              >
                📊 Data Analyst
              </button>
              <button
                onClick={() => setPerspectiveMode('ds')}
                style={{
                  padding: '5px 12px',
                  borderRadius: 8,
                  border: 'none',
                  background: !isDA ? '#ffffff' : 'transparent',
                  color: !isDA ? '#7c3aed' : '#64748b',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: !isDA ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                }}
              >
                🔬 Data Scientist
              </button>
            </div>
          </div>

          {/* 1. GRAFIK (Besar & Jernih di Atas) */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #f1f5f9',
            borderRadius: 14,
            padding: '1rem',
            marginBottom: '1.5rem',
            height: 300,
          }}>
            <ChartView caseData={currentCase} mode={perspectiveMode} />
          </div>

          {/* 2. TIGA INTISARI RINGKAS (TO-THE-POINT, NO WALL OF TEXT) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: '1.5rem' }}>

            {/* Poin A: Apa Masalahnya? */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: 12,
              padding: '1rem',
            }}>
              <div style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: '#d97706', marginBottom: 4 }}>
                ❓ Masalah / Pertanyaan Kasus:
              </div>
              <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.5, margin: 0 }}>
                {currentCase.problem}
              </p>
            </div>

            {/* Poin B: Kunci Jawaban & Kenapa Begitu? */}
            <div style={{
              background: '#f0f9ff',
              border: '1px solid #bae6fd',
              borderRadius: 12,
              padding: '1rem',
            }}>
              <div style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: '#0284c7', marginBottom: 4 }}>
                💡 Kunci Jawaban & Analisis:
              </div>
              <p style={{ fontSize: '0.9rem', color: '#0c4a6e', fontWeight: 700, lineHeight: 1.5, marginBottom: 6 }}>
                "{currentCase.quickAnswer}"
              </p>
              <p style={{ fontSize: '0.82rem', color: '#0369a1', lineHeight: 1.5, margin: 0 }}>
                {currentCase.reasoning}
              </p>
            </div>

            {/* Poin C: Rekomendasi Solusi (Sesuai Pilihan DA / DS) */}
            <div style={{
              background: isDA ? '#eff6ff' : '#f5f3ff',
              border: isDA ? '1px solid #bfdbfe' : '1px solid #ddd6fe',
              borderRadius: 12,
              padding: '1rem',
            }}>
              <div style={{
                fontSize: '0.74rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                color: isDA ? '#1d4ed8' : '#6d28d9',
                marginBottom: 4,
              }}>
                🎯 Solusi Rekomendasi ({isDA ? 'Data Analyst' : 'Data Scientist'}):
              </div>

              {isDA ? (
                <div>
                  <p style={{ fontSize: '0.84rem', color: '#1e3a8a', lineHeight: 1.5, whiteSpace: 'pre-line', margin: '0 0 8px 0' }}>
                    {currentCase.daAction}
                  </p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {currentCase.daKpi.map((kpi, i) => (
                      <span key={i} style={{ background: '#dbeafe', color: '#1e40af', padding: '2px 8px', borderRadius: 6, fontSize: '0.7rem', fontWeight: 700 }}>
                        📈 {kpi}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <p style={{ fontSize: '0.84rem', color: '#4c1d95', lineHeight: 1.5, margin: '0 0 8px 0' }}>
                    {currentCase.dsAnalysis}
                  </p>
                  <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#6d28d9', marginBottom: 4 }}>
                    ⚡ Algoritma / Metode yang Digunakan:
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
                    {currentCase.dsAlgorithms.map((algo, i) => (
                      <span key={i} style={{ background: '#ede9fe', color: '#6d28d9', padding: '2px 8px', borderRadius: 6, fontSize: '0.72rem', fontWeight: 700 }}>
                        {algo}
                      </span>
                    ))}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                    Library Python: <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 4, color: '#0f172a' }}>{currentCase.dsLibraries.join(', ')}</code>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* 3. TIPS RINGKAS (DOs & DON'Ts) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 12,
            marginBottom: '1.25rem',
          }}>
            {/* DOs */}
            <div style={{
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: 12,
              padding: '0.875rem 1rem',
            }}>
              <div style={{ color: '#15803d', fontWeight: 800, fontSize: '0.78rem', marginBottom: 6 }}>
                ✓ Yang Harus Dilakukan (DOs):
              </div>
              <ul style={{ paddingLeft: 18, margin: 0, fontSize: '0.78rem', color: '#166534', lineHeight: 1.5 }}>
                {currentCase.dos.map((item, i) => <li key={i} style={{ marginBottom: 4 }}>{item}</li>)}
              </ul>
            </div>

            {/* DONTs */}
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: 12,
              padding: '0.875rem 1rem',
            }}>
              <div style={{ color: '#b91c1c', fontWeight: 800, fontSize: '0.78rem', marginBottom: 6 }}>
                ✕ Yang Harus Dihindari (DON'Ts):
              </div>
              <ul style={{ paddingLeft: 18, margin: 0, fontSize: '0.78rem', color: '#991b1b', lineHeight: 1.5 }}>
                {currentCase.donts.map((item, i) => <li key={i} style={{ marginBottom: 4 }}>{item}</li>)}
              </ul>
            </div>
          </div>

          {/* Bottom Actions: Salin Catatan */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #f1f5f9', paddingTop: 12 }}>
            <button
              onClick={handleCopyMarkdown}
              className="btn btn-ghost"
              style={{ padding: '6px 14px', fontSize: '0.78rem' }}
            >
              {copied ? '✓ Ringkasan Tersalin!' : '📋 Salin Ringkasan Kasus (Markdown)'}
            </button>
          </div>

        </div>

      </main>

      {/* Responsive adjustments */}
      <style>{`
        @media (max-width: 640px) {
          .generator-bar-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
