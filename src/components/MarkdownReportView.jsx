import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useApp } from '../context/AppContext';

export default function MarkdownReportView({ caseData, userAnswers = {}, initialMode = 'da' }) {
  const { isDA } = useApp();
  const [selectedMdMode, setSelectedMdMode] = useState(initialMode); // 'da' | 'ds'
  const [viewFormat, setViewFormat] = useState('preview'); // 'preview' | 'raw'
  const [copied, setCopied] = useState(false);

  const sample = caseData.sampleAnswers || {};
  const daAnswers = sample.da || {};
  const dsAnswers = sample.ds || {};

  const q1Text = userAnswers.q1?.trim() || sample.q1 || 'Belum diisi';
  const q2Text = userAnswers.q2?.trim() || sample.q2 || 'Belum diisi';
  const q3Text = selectedMdMode === 'da'
    ? (userAnswers.q3?.trim() || daAnswers.q3 || 'Belum diisi')
    : (userAnswers.q3?.trim() || dsAnswers.q3 || 'Belum diisi');
  const q4Text = selectedMdMode === 'da'
    ? (userAnswers.q4?.trim() || daAnswers.q4 || 'Belum diisi')
    : (userAnswers.q4?.trim() || dsAnswers.q4 || 'Belum diisi');

  const generateMarkdown = (mode) => {
    const isModeDA = mode === 'da';
    const timestamp = new Date().toLocaleDateString('id-ID', { dateStyle: 'medium' });

    if (isModeDA) {
      return `# 📊 Laporan Analisis Data (Data Analyst)
**Topik:** ${caseData.title || 'Grafik Kasus'}  
**Tanggal:** ${timestamp}  
**Konteks Bisnis:** ${caseData.context || 'Tidak ada konteks'}  

---

## 1. 📌 Identifikasi Metrik & Dimensi (Q1)
- **Jenis Grafik:** \`${caseData.chartType}\`
- **Sumbu X (Dimensi):** ${caseData.xLabel || 'X'}
- **Sumbu Y (KPI/Metrik):** ${caseData.yLabel || 'Y'}
- **Deskripsi:**
> ${q1Text}

## 2. 📈 Tren & Pola Utama (Q2)
- **Ringkasan Pola:**
> ${q2Text}

## 3. 💡 Hipotesis & Dampak Bisnis (Q3 - DA Perspective)
- **Apa yang Menyebabkan Perubahan Ini?**
> ${q3Text}
- **Fokus DA:** Menghubungkan lonjakan/penurunan dengan operasional, promo, seasonal, atau kampanye bisnis.

## 4. 🎯 Rekomendasi Tindakan / Action Items (Q4 - DA Perspective)
- **Rencana Aksi:**
> ${q4Text}

---
*Laporan dibuat dengan [Chart Insight Lab](https://github.com/rahmadyd/chartinsightwebapp) — Belajar Membaca Grafik*
`;
    } else {
      return `# 🔬 Laporan Penyelidikan Data (Data Scientist)
**Topik:** ${caseData.title || 'Grafik Kasus'}  
**Tanggal:** ${timestamp}  
**Konteks Masalah:** ${caseData.context || 'Tidak ada konteks'}  

---

## 1. 📌 Spesifikasi Variabel & Sinyal (Q1)
- **Tipe Visualisasi:** \`${caseData.chartType}\`
- **Fitur Independen (X):** ${caseData.xLabel || 'X'}
- **Fitur Dependen / Target (Y):** ${caseData.yLabel || 'Y'}
- **Observasi:**
> ${q1Text}

## 2. 📈 Karakteristik Distribusi & Anomali (Q2)
- **Pola Distribusi / Outlier:**
> ${q2Text}

## 3. 🧪 Uji Hipotesis & Hubungan Kausal (Q3 - DS Perspective)
- **Hipotesis Statistik:**
> ${q3Text}
- **Fokus DS:** Menguji apakah sinyal ini kebetulan (random noise), outlier sejati, korelasi semu (confounding), atau signifikansi statistik.

## 4. 🔬 Langkah Eksperimen & Validasi Lanjutan (Q4 - DS Perspective)
- **Rencana Pengujian & Pemodelan:**
> ${q4Text}

---
*Laporan dibuat dengan [Chart Insight Lab](https://github.com/rahmadyd/chartinsightwebapp) — Belajar Membaca Grafik*
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

      {/* Mode Selection Header */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: '1.2rem' }}>📝</span>
            <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>Pemilihan Markdown Template</span>
          </div>

          <div style={{ display: 'flex', gap: 6 }}>
            <button
              onClick={() => setViewFormat('preview')}
              style={{
                padding: '4px 10px',
                borderRadius: 8,
                fontSize: '0.72rem',
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
                padding: '4px 10px',
                borderRadius: 8,
                fontSize: '0.72rem',
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
                padding: '4px 12px',
                borderRadius: 8,
                fontSize: '0.72rem',
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

        {/* 2 Markdown Mode Buttons */}
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
              {selectedMdMode === 'da' && <span className="pill pill-da">Dipilih</span>}
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
              {selectedMdMode === 'ds' && <span className="pill pill-ds">Dipilih</span>}
            </div>
            <p style={{ fontSize: '0.7rem', color: 'var(--color-text-3)', marginTop: 4 }}>
              Format uji statistik, distribusi data, anomali, & pemodelan.
            </p>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div style={{
        background: 'var(--color-bg-base)',
        border: '1px solid var(--color-border)',
        borderRadius: 12,
        padding: '1rem',
        maxHeight: 440,
        overflowY: 'auto',
      }}>
        {viewFormat === 'raw' ? (
          <textarea
            readOnly
            value={currentMarkdown}
            style={{
              width: '100%',
              height: 380,
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
                h1: ({ node, ...props }) => <h1 style={{ color: activeColor, fontSize: '1.2rem', fontWeight: 800, borderBottom: `1px solid ${activeColor}40`, paddingBottom: 6, marginBottom: 12 }} {...props} />,
                h2: ({ node, ...props }) => <h2 style={{ color: 'var(--color-text-1)', fontSize: '1rem', fontWeight: 700, marginTop: 14, marginBottom: 6 }} {...props} />,
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
                    fontSize: '0.8em',
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
