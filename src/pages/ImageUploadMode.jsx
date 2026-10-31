import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import DosAndDontsCard from '../components/DosAndDontsCard';
import AlgorithmBadgeList from '../components/AlgorithmBadgeList';
import ReactMarkdown from 'react-markdown';

const CATEGORIES = [
  'Finance', 'E-Commerce', 'Digital Marketing', 'SaaS & Product', 'Social Media', 'Healthcare', 'Lainnya'
];

const CHART_TYPES = [
  { id: 'line', label: '📈 Line / Time Series', algos: ['ARIMA / SARIMAX', 'Prophet', 'Holt-Winters Exponential Smoothing', 'LSTM / GRU'] },
  { id: 'bar', label: '📊 Bar / Categorical', algos: ['Chi-Square Test of Independence', 'ANOVA (Analysis of Variance)', 'Categorical Random Forest', 'Tukey HSD Post-Hoc Test'] },
  { id: 'scatter', label: '🔵 Scatter / Correlation', algos: ['Pearson & Spearman Correlation', 'Linear / Polynomial Regression', 'K-Means Clustering', 'RANSAC Robust Regression'] },
  { id: 'distribution', label: '📉 Histogram / Distribution', algos: ['Shapiro-Wilk / Kolmogorov-Smirnov Test', 'Kernel Density Estimation (KDE)', 'Gaussian Mixture Models (GMM)', 'Z-Score / IQR Outlier Filter'] },
];

const DEFAULT_DOS = [
  "Periksa label sumbu X dan Y beserta satuan angkanya (apakah nominal, rasio, atau persen).",
  "Cek apakah titik nol (0) pada sumbu Y dimulai dari nol atau dipotong (truncate).",
  "Perhatikan periode waktu pengambilan data dan potensi faktor musiman (seasonality)."
];

const DEFAULT_DONTS = [
  "JANGAN langsung menyimpulkan hubungan kausalitas (sebab-akibat) hanya dari korelasi visual.",
  "JANGAN mengabaikan ukuran sampel (sample size) atau bias seleksi populasi.",
  "JANGAN mengambil keputusan bisnis besar tanpa memverifikasi data mentah di balik grafik."
];

export default function ImageUploadMode() {
  const { perspectiveMode, setPerspectiveMode, isDA, modeLabel, modeEmoji } = useApp();

  const [imageSrc, setImageSrc] = useState(null);
  const [imageName, setImageName] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Finance');
  const [chartType, setChartType] = useState('line');
  const [notes, setNotes] = useState('');

  const [activeTab, setActiveTab] = useState('breakdown'); // 'breakdown' | 'markdown'
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef(null);

  // Clipboard paste listener (Ctrl+V)
  useEffect(() => {
    const handlePaste = (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const blob = items[i].getAsFile();
          const reader = new FileReader();
          reader.onload = (event) => {
            setImageSrc(event.target.result);
            setImageName('Pasted Screenshot.png');
            if (!title) setTitle('Analisis Grafik Screenshot');
          };
          reader.readAsDataURL(blob);
          break;
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [title]);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target.result);
      setImageName(file.name);
      if (!title) setTitle(file.name.replace(/\.[^/.]+$/, ''));
    };
    reader.readAsDataURL(file);
  };

  const selectedChartObj = CHART_TYPES.find(c => c.id === chartType) || CHART_TYPES[0];
  const accentColor = isDA ? '#2563eb' : '#7c3aed';

  const generateMarkdownReport = (mode) => {
    const isModeDA = mode === 'da';
    const timestamp = new Date().toLocaleDateString('id-ID', { dateStyle: 'medium' });

    if (isModeDA) {
      return `# 📊 Analisis Gambar Grafik: Data Analyst
**Judul Analisis:** ${title || 'Grafik Tanpa Judul'}  
**Kategori:** \`${category}\` | **Tipe Visual:** \`${selectedChartObj.label}\`  
**Sumber File:** ${imageName || 'Upload Gambar'} | **Tanggal:** ${timestamp}  

---

### 📝 Catatan / Konteks Grafik
> ${notes || 'Grafik dianalisis dari tangkapan layar / sumber eksternal.'}

---

### 💡 Framework Analisis Data Analyst

#### 1. 📌 Identifikasi Metrik & Dimensi (Q1)
- Identifikasi apa yang diukur oleh sumbu X (dimensi/waktu) dan sumbu Y (KPI/metrik utama).
- Pastikan satuan angka valid dan tidak ada manipulasi skala visual.

#### 2. 📈 Karakteristik Pola & Tren (Q2)
- Amati arah pergerakan: apakah ada tren kenaikan, penurunan tajam, anomali lonjakan, atau pola musiman?

#### 3. 🔍 Hipotesis Bisnis (Q3)
- Apa pemicu bisnis atau operasional di balik pola grafik ini?

#### 4. 🎯 Rekomendasi Aksi Nyata (Q4)
- Keputusan bisnis praktis apa yang harus dieksekusi berdasarkan informasi grafik ini?

---

### ⚖️ Panduan Analisis: DOs & DON'Ts

#### ✅ Yang Harus Dilakukan (DOs):
${DEFAULT_DOS.map(d => `- ${d}`).join('\n')}

#### ❌ Yang Harus Dihindari (DON'Ts):
${DEFAULT_DONTS.map(d => `- ${d}`).join('\n')}

---
*Dianalisis dengan [Chart Insight Lab](https://github.com/rahmadyd/chartinsightwebapp)*
`;
    } else {
      return `# 🔬 Analisis Gambar Grafik: Data Science
**Judul Analisis:** ${title || 'Grafik Tanpa Judul'}  
**Kategori:** \`${category}\` | **Tipe Visual:** \`${selectedChartObj.label}\`  
**Sumber File:** ${imageName || 'Upload Gambar'} | **Tanggal:** ${timestamp}  

---

### 📝 Catatan / Konteks Grafik
> ${notes || 'Grafik dianalisis dari tangkapan layar / sumber eksternal.'}

---

### 🔬 Toolkit & Algoritma Data Science

#### ⚡ Algoritma Rekomendasi untuk Tipe Grafik Ini:
${selectedChartObj.algos.map(a => `- **${a}**`).join('\n')}

#### 📦 Library Python yang Relevan:
- \`scikit-learn\`, \`statsmodels\`, \`scipy.stats\`, \`pandas\`, \`matplotlib / seaborn\`

#### 🧪 Langkah Validasi Statistik:
1. Uji apakah tren visual ini memiliki signifikansi statistik (*p-value < 0.05*).
2. Periksa keberadaan outlier ekstrem yang berpotensi mendistorsi model.
3. Desain eksperimen A/B testing atau validasi time-series cross-validation.

---

### ⚖️ Panduan Analisis: DOs & DON'Ts

#### ✅ Yang Harus Dilakukan (DOs):
${DEFAULT_DOS.map(d => `- ${d}`).join('\n')}

#### ❌ Yang Harus Dihindari (DON'Ts):
${DEFAULT_DONTS.map(d => `- ${d}`).join('\n')}

---
*Dianalisis dengan [Chart Insight Lab](https://github.com/rahmadyd/chartinsightwebapp)*
`;
    }
  };

  const currentMD = generateMarkdownReport(perspectiveMode);

  const handleCopyMD = () => {
    navigator.clipboard.writeText(currentMD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
            <span style={{ fontSize: '1.2rem' }}>📷</span>
            <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>Input Gambar Grafik Mode</span>
          </div>
          <span className={`pill ${isDA ? 'pill-da' : 'pill-ds'}`}>
            {modeEmoji} {modeLabel}
          </span>
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '1.75rem 1rem 4rem' }}>

        {/* HERO / INSTRUCTION */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: 16,
          padding: '1.25rem 1.5rem',
          marginBottom: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
        }} className="anim-fade-up">
          <div>
            <h1 style={{ fontSize: '1.35rem', fontWeight: 900, marginBottom: 4, color: '#0f172a' }}>
              📷 Bedah Grafik dari Gambar / Screenshot
            </h1>
            <p style={{ fontSize: '0.84rem', color: '#475569' }}>
              Temukan grafik menarik di internet atau pekerjaan? Upload gambarnya atau tekan <strong>Ctrl + V</strong> untuk paste screenshot langsung!
            </p>
          </div>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn btn-primary"
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            📁 Pilih Gambar Grafik
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
        </div>

        {/* 2-COLUMN LAYOUT */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1.2fr)',
          gap: '1.5rem',
        }} className="image-mode-grid">

          {/* LEFT: Image Upload / Preview & Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* Upload Zone / Image Frame */}
            <div
              onClick={() => !imageSrc && fileInputRef.current?.click()}
              style={{
                background: '#ffffff',
                border: imageSrc ? '1px solid #cbd5e1' : '2px dashed #cbd5e1',
                borderRadius: 16,
                padding: imageSrc ? '1rem' : '2.5rem 1.5rem',
                textAlign: 'center',
                cursor: imageSrc ? 'default' : 'pointer',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.15s ease',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
              }}
            >
              {imageSrc ? (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b' }}>
                      🖼️ {imageName || 'Gambar Terpasang'}
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); setImageSrc(null); }}
                      style={{
                        background: '#fef2f2',
                        border: '1px solid #fecaca',
                        color: '#dc2626',
                        borderRadius: 6,
                        padding: '2px 8px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      Ganti Gambar
                    </button>
                  </div>
                  <div style={{
                    maxHeight: 380,
                    borderRadius: 10,
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                  }}>
                    <img
                      src={imageSrc}
                      alt="Grafik yang diupload"
                      style={{ maxWidth: '100%', maxHeight: 380, objectFit: 'contain' }}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>📥</div>
                  <div style={{ fontWeight: 800, fontSize: '0.98rem', marginBottom: 4, color: '#0f172a' }}>
                    Drop file gambar grafik ke sini
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: 12 }}>
                    atau klik untuk browse file dari laptop/HP, atau tekan <strong>Ctrl + V</strong> untuk paste screenshot
                  </p>
                  <span className="pill pill-da">Mendukung PNG, JPG, WebP, SVG</span>
                </div>
              )}
            </div>

            {/* Metadata Settings */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 16,
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                  Judul Grafik / Topik:
                </label>
                <input
                  className="input-field"
                  placeholder="Contoh: Perbandingan Inflasi vs Suku Bunga BI 2024"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                    🏷️ Kategori Industri:
                  </label>
                  <select
                    className="input-field"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    style={{ cursor: 'pointer' }}
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                    📊 Tipe Visualisasi:
                  </label>
                  <select
                    className="input-field"
                    value={chartType}
                    onChange={e => setChartType(e.target.value)}
                    style={{ cursor: 'pointer' }}
                  >
                    {CHART_TYPES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                  Catatan / Pertanyaan yang Mau Dibedah:
                </label>
                <textarea
                  className="input-field"
                  placeholder="Contoh: Kenapa di kuartal 3 grafiknya mendadak drop? Apa yang harus dicek duluan?"
                  rows={3}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  style={{ resize: 'none' }}
                />
              </div>
            </div>

          </div>

          {/* RIGHT: Analytical Framework & Markdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* View Switcher */}
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
                🔍 Panduan Analisis Instan
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
                📝 Format Markdown (DA / DS)
              </button>
            </div>

            {activeTab === 'breakdown' ? (
              <>
                {/* 2 Mode Toggle */}
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
                    <div style={{ fontWeight: 800, fontSize: '0.88rem', color: isDA ? '#1d4ed8' : '#0f172a' }}>
                      📊 Sudut Pandang Data Analyst
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 2 }}>
                      Insight bisnis & rekomendasi tindakan
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
                    <div style={{ fontWeight: 800, fontSize: '0.88rem', color: !isDA ? '#6d28d9' : '#0f172a' }}>
                      🔬 Sudut Pandang Data Scientist
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 2 }}>
                      Algoritma ML, library & validasi statistik
                    </div>
                  </button>
                </div>

                {/* 4 Step Analytical Framework Guide */}
                <div style={{
                  background: '#ffffff',
                  border: `1px solid ${isDA ? '#bfdbfe' : '#ddd6fe'}`,
                  borderRadius: 16,
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                }} className="anim-fade-up">

                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: accentColor, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span>{modeEmoji}</span>
                    <span>Cara Membedah Gambar Grafik Ini ({modeLabel}):</span>
                  </div>

                  <div style={{ background: '#f8fafc', borderRadius: 10, padding: '0.75rem', border: '1px solid #f1f5f9' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 800, color: accentColor }}>1. 📌 Identifikasi Metrik (Q1)</div>
                    <p style={{ fontSize: '0.8rem', color: '#334155', marginTop: 2 }}>
                      Cari tahu apa yang diukur oleh sumbu X (kategori/waktu) dan sumbu Y (angka/persen). Periksa apakah ada satuan khusus.
                    </p>
                  </div>

                  <div style={{ background: '#f8fafc', borderRadius: 10, padding: '0.75rem', border: '1px solid #f1f5f9' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 800, color: accentColor }}>2. 📈 Baca Bentuk & Pola (Q2)</div>
                    <p style={{ fontSize: '0.8rem', color: '#334155', marginTop: 2 }}>
                      Apakah ada lonjakan tiba-tiba, tren naik perlahan, atau titik pencilan (outlier) yang mencolok?
                    </p>
                  </div>

                  <div style={{ background: '#f8fafc', borderRadius: 10, padding: '0.75rem', border: '1px solid #f1f5f9' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 800, color: accentColor }}>3. 💡 Hipotesis Penyebab (Q3)</div>
                    <p style={{ fontSize: '0.8rem', color: '#334155', marginTop: 2 }}>
                      {isDA
                        ? "Hubungkan pola dengan event bisnis: promo, perubahan aturan, seasonal liburan, atau kampanye pemasaran."
                        : "Apakah ini sinyal asli atau kebetulan? Periksa apakah jumlah data (sample size) cukup dan ada variabel pengganggu (confounder)."}
                    </p>
                  </div>

                  <div style={{ background: '#f8fafc', borderRadius: 10, padding: '0.75rem', border: '1px solid #f1f5f9' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 800, color: accentColor }}>4. 🎯 Rekomendasi Selanjutnya (Q4)</div>
                    <p style={{ fontSize: '0.8rem', color: '#334155', marginTop: 2 }}>
                      {isDA
                        ? "Apa langkah nyata yang harus diambil tim bisnis berdasarkan temuan grafik ini?"
                        : "Model machine learning apa yang cocok dibangun untuk memprediksi atau mengotomasi pola ini?"}
                    </p>
                  </div>
                </div>

                {/* Data Science Algorithm Recommendations */}
                {!isDA && (
                  <AlgorithmBadgeList
                    algorithms={selectedChartObj.algos}
                    libraries={['scikit-learn', 'statsmodels', 'scipy.stats', 'pandas', 'seaborn']}
                    experiment="Validasi apakah pola pada gambar ini konsisten dengan data historis atau A/B test grup kontrol."
                  />
                )}

                {/* Dos and Don'ts */}
                <DosAndDontsCard dos={DEFAULT_DOS} donts={DEFAULT_DONTS} />
              </>
            ) : (
              /* MARKDOWN VIEW */
              <div style={{
                background: '#ffffff',
                border: `1px solid ${isDA ? '#bfdbfe' : '#ddd6fe'}`,
                borderRadius: 16,
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
              }} className="anim-fade-up">

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.9rem', color: accentColor }}>
                    📝 Markdown Template ({modeLabel})
                  </span>
                  <button
                    onClick={handleCopyMD}
                    className="btn btn-primary"
                    style={{
                      padding: '4px 12px',
                      fontSize: '0.75rem',
                    }}
                  >
                    {copied ? '✓ Tersalin!' : '📋 Salin Markdown'}
                  </button>
                </div>

                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: 10,
                  padding: '1rem',
                  maxHeight: 440,
                  overflowY: 'auto',
                }}>
                  <ReactMarkdown
                    components={{
                      h1: ({ node, ...props }) => <h1 style={{ color: accentColor, fontSize: '1.15rem', fontWeight: 800, marginBottom: 8 }} {...props} />,
                      h2: ({ node, ...props }) => <h2 style={{ color: '#0f172a', fontSize: '1rem', fontWeight: 700, marginTop: 12 }} {...props} />,
                      h3: ({ node, ...props }) => <h3 style={{ color: accentColor, fontSize: '0.9rem', fontWeight: 700, marginTop: 10 }} {...props} />,
                      blockquote: ({ node, ...props }) => <blockquote style={{ borderLeft: `3px solid ${accentColor}`, background: '#f1f5f9', padding: '6px 12px', margin: '8px 0', color: '#334155' }} {...props} />,
                      code: ({ node, ...props }) => <code style={{ background: '#e2e8f0', padding: '2px 5px', color: '#0f172a' }} {...props} />,
                    }}
                  >
                    {currentMD}
                  </ReactMarkdown>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

      <style>{`
        @media (max-width: 820px) {
          .image-mode-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
