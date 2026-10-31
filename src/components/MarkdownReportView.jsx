import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useApp } from '../context/AppContext';

export default function MarkdownReportView({ caseData, initialMode = 'da' }) {
  const [selectedMdMode, setSelectedMdMode] = useState(initialMode); // 'da' | 'ds'
  const [viewFormat, setViewFormat] = useState('preview'); // 'preview' | 'raw'
  const [copied, setCopied] = useState(false);

  const da = caseData.dataAnalyst || {};
  const ds = caseData.dataScience || {};
  const dnd = caseData.dosAndDonts || { dos: [], donts: [] };
  const timestamp = new Date().toLocaleDateString('id-ID', { dateStyle: 'medium' });

  const generateMarkdown = (mode) => {
    const isModeDA = mode === 'da';

    if (isModeDA) {
      return `# 📊 Bedah Kasus & Kunci Jawaban: Data Analyst
**Kasus:** ${caseData.title}  
**Kategori Industri:** \`${caseData.category || 'General'}\` | **Tipe Grafik:** \`${caseData.chartType}\`  
**Tanggal Kajian:** ${timestamp}  

---

### 📌 Studi Kasus & Masalah Bisnis
> ${caseData.problemStatement || caseData.context}

---

### 💡 Kunci Jawaban Kilat (TL;DR)
> **${caseData.quickAnswer || 'Pola grafik teridentifikasi.'}**

### 🧠 Alasan & Langkah Berpikir (Reasoning)
${caseData.detailedReasoning || caseData.context}

---

### 📊 Sudut Pandang Data Analyst

#### 1. Insight Bisnis
${da.insight || 'Insight operasional dan bisnis terhubung langsung dengan tren data.'}

#### 2. Rekomendasi Tindakan Nyata (Action Items)
${da.recommendations || 'Lakukan audit dan penyesuaian strategi.'}

#### 3. Metrik KPI Kunci yang Wajib Dipantau
${(da.kpiMetrics || []).map(k => `- \`${k}\``).join('\n') || '- Metrik utama kasus ini'}

---

### ⚖️ Panduan Analisis Data: DOs & DON'Ts

#### ✅ Yang Harus Dilakukan (DOs):
${dnd.dos.map(d => `- ${d}`).join('\n') || '- Verifikasi kelengkapan data'}

#### ❌ Yang Harus Dihindari (DON'Ts):
${dnd.donts.map(d => `- ${d}`).join('\n') || '- Jangan langsung mengambil kesimpulan tanpa cek konteks'}

---
*Dibuat dengan [Chart Insight Lab](https://github.com/rahmadyd/chartinsightwebapp) — Bank Studi Kasus & Visualisasi Data*
`;
    } else {
      return `# 🔬 Bedah Kasus & Kunci Jawaban: Data Science
**Kasus:** ${caseData.title}  
**Kategori Industri:** \`${caseData.category || 'General'}\` | **Tipe Visualisasi:** \`${caseData.chartType}\`  
**Tanggal Kajian:** ${timestamp}  

---

### 📌 Studi Kasus & Masalah Analitis
> ${caseData.problemStatement || caseData.context}

---

### 💡 Kunci Jawaban Kilat (TL;DR)
> **${caseData.quickAnswer || 'Pola statistik teridentifikasi.'}**

### 🧠 Alasan & Karakteristik Data (Reasoning)
${caseData.detailedReasoning || caseData.context}

---

### 🔬 Sudut Pandang Data Science

#### 1. Analisis Karakteristik Statistik & Distribusi
${ds.statisticalAnalysis || 'Evaluasi signifikansi pola, distribusi probabilitas, dan anomali.'}

#### 2. Rekomendasi Algoritma / Metode Data Science
${(ds.algorithms || []).map(a => `- **⚡ ${a}**`).join('\n') || '- Model evaluasi statistik standar'}

#### 3. Library Python yang Digunakan
${(ds.pythonLibraries || []).map(l => `- \`${l}\``).join('\n') || '- `scikit-learn`, `pandas`'}

#### 4. Desain Eksperimen / Pengujian Lanjutan
> ${ds.nextExperiment || 'Validasi model dengan A/B test atau cross-validation.'}

---

### ⚖️ Panduan Analisis Data: DOs & DON'Ts

#### ✅ Yang Harus Dilakukan (DOs):
${dnd.dos.map(d => `- ${d}`).join('\n') || '- Uji normalitas dan cek outlier'}

#### ❌ Yang Harus Dihindari (DON'Ts):
${dnd.donts.map(d => `- ${d}`).join('\n') || '- Jangan menyamakan korelasi dengan kausalitas'}

---
*Dibuat dengan [Chart Insight Lab](https://github.com/rahmadyd/chartinsightwebapp) — Bank Studi Kasus & Visualisasi Data*
`;
    }
  };

  const currentMarkdown = generateMarkdown(selectedMdMode);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeColor = selectedMdMode === 'da' ? 'var(--color-da)' : 'var(--color-ds)';
  const activeGlow = selectedMdMode === 'da' ? 'var(--color-da-glow)' : 'var(--color-ds-glow)';

  return (
    <div style={{
      background: 'var(--color-bg-card)',
      border: `1.5px solid ${activeColor}`,
      borderRadius: 18,
      padding: '1.25rem',
      boxShadow: `0 0 20px ${activeGlow}`,
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
    }} className="anim-fade-up">

      {/* Header Tabs */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: '1.2rem' }}>📝</span>
            <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>Pemilihan Format Markdown</span>
          </div>

          <div style={{ display: 'flex', gap: 6 }}>
            <button
              onClick={() => setViewFormat('preview')}
              style={{
                padding: '5px 12px',
                borderRadius: 8,
                fontSize: '0.74rem',
                fontWeight: 700,
                border: '1px solid var(--color-border)',
                background: viewFormat === 'preview' ? 'var(--color-bg-raised)' : 'transparent',
                color: viewFormat === 'preview' ? 'var(--color-text-1)' : 'var(--color-text-3)',
                cursor: 'pointer',
              }}
            >
              👁️ Preview
            </button>
            <button
              onClick={() => setViewFormat('raw')}
              style={{
                padding: '5px 12px',
                borderRadius: 8,
                fontSize: '0.74rem',
                fontWeight: 700,
                border: '1px solid var(--color-border)',
                background: viewFormat === 'raw' ? 'var(--color-bg-raised)' : 'transparent',
                color: viewFormat === 'raw' ? 'var(--color-text-1)' : 'var(--color-text-3)',
                cursor: 'pointer',
              }}
            >
              📄 Raw MD
            </button>
            <button
              onClick={handleCopy}
              style={{
                padding: '5px 14px',
                borderRadius: 8,
                fontSize: '0.74rem',
                fontWeight: 700,
                border: 'none',
                background: copied ? 'var(--color-success)' : activeColor,
                color: '#fff',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {copied ? '✓ Tersalin!' : '📋 Salin Markdown'}
            </button>
          </div>
        </div>

        {/* 2 Markdown Mode Selection Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <button
            onClick={() => setSelectedMdMode('da')}
            style={{
              padding: '10px 14px',
              borderRadius: 12,
              border: selectedMdMode === 'da'
                ? '2px solid var(--color-da)'
                : '1.5px solid var(--color-border)',
              background: selectedMdMode === 'da'
                ? 'linear-gradient(135deg, rgba(79,158,255,0.2), rgba(79,158,255,0.06))'
                : 'var(--color-bg-raised)',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 800, fontSize: '0.85rem', color: selectedMdMode === 'da' ? 'var(--color-da)' : 'var(--color-text-2)' }}>
                📊 Markdown Data Analyst
              </span>
              {selectedMdMode === 'da' && <span className="pill pill-da">Aktif</span>}
            </div>
            <p style={{ fontSize: '0.7rem', color: 'var(--color-text-3)', marginTop: 4 }}>
              Format metrik KPI, tren bisnis, dan rencana aksi operasional.
            </p>
          </button>

          <button
            onClick={() => setSelectedMdMode('ds')}
            style={{
              padding: '10px 14px',
              borderRadius: 12,
              border: selectedMdMode === 'ds'
                ? '2px solid var(--color-ds)'
                : '1.5px solid var(--color-border)',
              background: selectedMdMode === 'ds'
                ? 'linear-gradient(135deg, rgba(191,127,255,0.2), rgba(191,127,255,0.06))'
                : 'var(--color-bg-raised)',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 800, fontSize: '0.85rem', color: selectedMdMode === 'ds' ? 'var(--color-ds)' : 'var(--color-text-2)' }}>
                🔬 Markdown Data Science
              </span>
              {selectedMdMode === 'ds' && <span className="pill pill-ds">Aktif</span>}
            </div>
            <p style={{ fontSize: '0.7rem', color: 'var(--color-text-3)', marginTop: 4 }}>
              Format algoritma ML, karakteristik distribusi, library Python, & validasi.
            </p>
          </button>
        </div>
      </div>

      {/* Content Box */}
      <div style={{
        background: 'var(--color-bg-base)',
        border: '1px solid var(--color-border)',
        borderRadius: 12,
        padding: '1.15rem',
        maxHeight: 480,
        overflowY: 'auto',
      }}>
        {viewFormat === 'raw' ? (
          <textarea
            readOnly
            value={currentMarkdown}
            style={{
              width: '100%',
              height: 420,
              background: 'transparent',
              border: 'none',
              color: 'var(--color-text-2)',
              fontFamily: 'monospace',
              fontSize: '0.8rem',
              lineHeight: 1.6,
              resize: 'none',
              outline: 'none',
            }}
          />
        ) : (
          <div className="markdown-body" style={{ color: 'var(--color-text-1)', fontSize: '0.85rem', lineHeight: 1.7 }}>
            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => <h1 style={{ color: activeColor, fontSize: '1.25rem', fontWeight: 800, borderBottom: `1px solid ${activeColor}40`, paddingBottom: 6, marginBottom: 12 }} {...props} />,
                h2: ({ node, ...props }) => <h2 style={{ color: 'var(--color-text-1)', fontSize: '1.05rem', fontWeight: 700, marginTop: 16, marginBottom: 8 }} {...props} />,
                h3: ({ node, ...props }) => <h3 style={{ color: activeColor, fontSize: '0.95rem', fontWeight: 700, marginTop: 14, marginBottom: 6 }} {...props} />,
                h4: ({ node, ...props }) => <h4 style={{ color: 'var(--color-text-2)', fontSize: '0.88rem', fontWeight: 700, marginTop: 10, marginBottom: 4 }} {...props} />,
                blockquote: ({ node, ...props }) => (
                  <blockquote style={{
                    borderLeft: `3px solid ${activeColor}`,
                    background: `${activeColor}12`,
                    padding: '8px 12px',
                    borderRadius: '0 8px 8px 0',
                    margin: '8px 0',
                    color: 'var(--color-text-2)',
                  }} {...props} />
                ),
                code: ({ node, ...props }) => (
                  <code style={{
                    background: 'var(--color-bg-raised)',
                    padding: '2px 6px',
                    borderRadius: 4,
                    color: activeColor,
                    fontSize: '0.82em',
                    fontFamily: 'monospace',
                  }} {...props} />
                ),
                ul: ({ node, ...props }) => <ul style={{ paddingLeft: 20, margin: '6px 0' }} {...props} />,
                li: ({ node, ...props }) => <li style={{ marginBottom: 4 }} {...props} />,
                hr: ({ node, ...props }) => <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: '14px 0' }} {...props} />,
              }}
            >
              {currentMarkdown}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
