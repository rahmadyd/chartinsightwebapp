import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ChartView from '../components/ChartView';
import AnswerForm from '../components/AnswerForm';
import SampleAnswer from '../components/SampleAnswer';
import MarkdownReportView from '../components/MarkdownReportView';

/* ── helpers ── */
function parseCSVRows(raw) {
  return raw.split('\n')
    .map(l => l.trim()).filter(Boolean)
    .map(l => { const [a, b] = l.split(/,|;|\t/); return { label: (a || '').trim(), value: (b || '').trim() }; });
}

const CHART_TYPES = [
  { id: 'line',    emoji: '📈', label: 'Line Chart',    desc: 'Tren dari waktu ke waktu' },
  { id: 'bar',     emoji: '📊', label: 'Bar Chart',     desc: 'Perbandingan antar kategori' },
  { id: 'scatter', emoji: '🔵', label: 'Scatter Plot',  desc: 'Hubungan antara 2 variabel' },
];

const STEP_LABELS = ['Setup', 'Input Data', 'Analisis'];

const emptyRow  = () => ({ label: '', value: '' });
const emptyRowXY = () => ({ x: '', y: '' });

const Q_DEFAULTS = { q1: '', q2: '', q3: '', q4: '' };

const SAMPLE_ANSWERS_TEMPLATE = {
  q1: 'Deskripsikan jenis grafik, sumbu X, sumbu Y, dan satuan data yang kamu masukkan.',
  q2: 'Jelaskan pola utama yang terlihat: naik, turun, datar, outlier, fluktuasi?',
  da: {
    q3: 'Dari sudut pandang DA: apa penyebab bisnis yang mungkin menjelaskan pola ini?',
    q4: 'Apa rekomendasi aksi berdasarkan temuan di grafik ini?',
  },
  ds: {
    q3: 'Dari sudut pandang DS: apakah pola ini signifikan secara statistik? Ada confounding variable?',
    q4: 'Apa analisis lanjutan yang perlu dilakukan? Model apa yang relevan?',
  },
};

export default function InputMode() {
  const { perspectiveMode, isDA, modeColor, modePillClass, modeLabel, modeEmoji, modeCardClass } = useApp();

  const [step, setStep] = useState(0); // 0=setup, 1=data, 2=analyze

  /* Step 0 — Setup */
  const [chartType, setChartType] = useState('line');
  const [title,   setTitle]   = useState('');
  const [context, setContext] = useState('');
  const [xLabel,  setXLabel]  = useState('');
  const [yLabel,  setYLabel]  = useState('');

  /* Step 1 — Data */
  const [rows,   setRows]   = useState([emptyRow(), emptyRow(), emptyRow()]); // line/bar
  const [xyRows, setXYRows] = useState([emptyRowXY(), emptyRowXY(), emptyRowXY()]); // scatter
  const [csvText, setCsvText] = useState('');
  const [inputTab, setInputTab] = useState('manual'); // 'manual' | 'csv'
  const fileRef = useRef(null);

  /* Step 2 — Analysis */
  const [answers, setAnswers] = useState(Q_DEFAULTS);
  const [showSample, setShowSample] = useState(false);
  const [activeTab, setActiveTab] = useState('form'); // 'form' | 'markdown'

  /* ── Derived chart data object ── */
  function buildCaseData() {
    if (chartType === 'scatter') {
      const valid = xyRows.filter(r => r.x !== '' && r.y !== '');
      return {
        id: 'input-custom',
        title: title || 'Grafik Kustom',
        level: 'kustom',
        chartType: 'scatter',
        context: context || '—',
        xLabel: xLabel || 'X',
        yLabel: yLabel || 'Y',
        labels: [],
        scatterData: valid.map(r => ({ x: parseFloat(r.x) || 0, y: parseFloat(r.y) || 0 })),
        sampleAnswers: SAMPLE_ANSWERS_TEMPLATE,
        glossary: [],
      };
    }
    const valid = rows.filter(r => r.label && r.value !== '');
    return {
      id: 'input-custom',
      title: title || 'Grafik Kustom',
      level: 'kustom',
      chartType,
      context: context || '—',
      xLabel: xLabel || 'Kategori',
      yLabel: yLabel || 'Nilai',
      labels: valid.map(r => r.label),
      values: valid.map(r => parseFloat(r.value) || 0),
      sampleAnswers: SAMPLE_ANSWERS_TEMPLATE,
      glossary: [],
    };
  }

  /* ── Row helpers ── */
  const addRow    = () => setRows(r => [...r, emptyRow()]);
  const removeRow = i  => setRows(r => r.filter((_, j) => j !== i));
  const setRow    = (i, field, val) => setRows(r => r.map((row, j) => j === i ? { ...row, [field]: val } : row));

  const addXY     = () => setXYRows(r => [...r, emptyRowXY()]);
  const removeXY  = i  => setXYRows(r => r.filter((_, j) => j !== i));
  const setXY     = (i, field, val) => setXYRows(r => r.map((row, j) => j === i ? { ...row, [field]: val } : row));

  const handleCSVImport = () => {
    const parsed = parseCSVRows(csvText);
    if (parsed.length > 0) setRows(parsed);
    setInputTab('manual');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setCsvText(ev.target.result);
      setInputTab('csv');
    };
    reader.readAsText(file);
  };

  /* ── Validation ── */
  const step0Valid = chartType && title.trim();
  const step1Valid = chartType === 'scatter'
    ? xyRows.some(r => r.x !== '' && r.y !== '')
    : rows.some(r => r.label && r.value !== '');
  const allFilled = Object.values(answers).every(a => a.trim());
  const caseData = buildCaseData();

  /* ── Render ── */
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-base)' }}>

      {/* HEADER */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 40,
        background: 'rgba(7,9,15,0.9)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--color-border)',
        padding: '0.7rem 1rem',
      }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
            ← Kembali
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '1.1rem' }}>📥</span>
            <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>Input Grafik Mode</span>
          </div>
          <span className={`pill ${modePillClass}`}>{modeEmoji} {modeLabel}</span>
        </div>
      </header>

      <main style={{ maxWidth: 860, margin: '0 auto', padding: '2rem 1rem 4rem' }}>

        {/* ── STEPPER ── */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: 0 }}>
          {STEP_LABELS.map((label, i) => (
            <React.Fragment key={i}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 'none' }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: i < step ? 'var(--color-success)'
                    : i === step ? modeColor
                    : 'var(--color-bg-raised)',
                  color: i <= step ? '#fff' : 'var(--color-text-3)',
                  border: i > step ? '2px solid var(--color-border)' : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.78rem', fontWeight: 800,
                  boxShadow: i === step ? `0 0 14px ${modeColor}60` : 'none',
                  transition: 'all 0.3s',
                }}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span style={{
                  fontSize: '0.68rem', fontWeight: 700,
                  color: i === step ? modeColor : i < step ? 'var(--color-success)' : 'var(--color-text-3)',
                  whiteSpace: 'nowrap',
                }}>
                  {label}
                </span>
              </div>
              {i < STEP_LABELS.length - 1 && (
                <div style={{
                  flex: 1, height: 2,
                  background: i < step ? 'var(--color-success)' : 'var(--color-border)',
                  margin: '-16px 8px 0',
                  transition: 'background 0.3s',
                }}/>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* ══════════════ STEP 0: SETUP ══════════════ */}
        {step === 0 && (
          <div className="anim-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* Chart type */}
            <div style={{
              background: 'var(--color-bg-card)',
              border: '1.5px solid var(--color-border)',
              borderRadius: 18, padding: '1.25rem',
            }}>
              <div className="section-label" style={{ marginBottom: 12 }}>📊 Pilih jenis grafik</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                {CHART_TYPES.map(ct => (
                  <button
                    key={ct.id}
                    onClick={() => setChartType(ct.id)}
                    style={{
                      padding: '1rem 0.75rem',
                      borderRadius: 14,
                      border: chartType === ct.id ? `2px solid ${modeColor}` : '1.5px solid var(--color-border)',
                      background: chartType === ct.id
                        ? (isDA ? 'var(--color-da-glow)' : 'var(--color-ds-glow)')
                        : 'var(--color-bg-raised)',
                      cursor: 'pointer', textAlign: 'center',
                      transition: 'all 0.18s',
                      boxShadow: chartType === ct.id ? `0 0 16px ${modeColor}40` : 'none',
                    }}
                  >
                    <div style={{ fontSize: '1.6rem', marginBottom: 6 }}>{ct.emoji}</div>
                    <div style={{
                      fontWeight: 800, fontSize: '0.78rem',
                      color: chartType === ct.id ? modeColor : 'var(--color-text-2)',
                    }}>{ct.label}</div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--color-text-3)', marginTop: 3 }}>{ct.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Metadata */}
            <div style={{
              background: 'var(--color-bg-card)',
              border: '1.5px solid var(--color-border)',
              borderRadius: 18, padding: '1.25rem',
              display: 'flex', flexDirection: 'column', gap: 14,
            }}>
              <div className="section-label">📋 Info grafik</div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-text-2)', marginBottom: 6 }}>
                  Judul grafik <span style={{ color: 'var(--color-danger)' }}>*</span>
                </label>
                <input
                  className={`input-field ${isDA ? '' : 'ds-focus'}`}
                  placeholder="contoh: Penjualan Bulanan Q3 2024"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-text-2)', marginBottom: 6 }}>
                  Konteks / deskripsi
                </label>
                <textarea
                  className={`input-field ${isDA ? '' : 'ds-focus'}`}
                  placeholder="Ceritakan konteks grafik ini: siapa yang pakai, untuk apa, sumber data dari mana..."
                  value={context}
                  onChange={e => setContext(e.target.value)}
                  rows={3}
                  style={{ resize: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-text-2)', marginBottom: 6 }}>
                    Label sumbu X
                  </label>
                  <input
                    className={`input-field ${isDA ? '' : 'ds-focus'}`}
                    placeholder={chartType === 'scatter' ? 'Variabel X' : 'Minggu / Bulan / Kategori'}
                    value={xLabel}
                    onChange={e => setXLabel(e.target.value)}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-text-2)', marginBottom: 6 }}>
                    Label sumbu Y
                  </label>
                  <input
                    className={`input-field ${isDA ? '' : 'ds-focus'}`}
                    placeholder={chartType === 'scatter' ? 'Variabel Y' : 'Views / Revenue / Jumlah'}
                    value={yLabel}
                    onChange={e => setYLabel(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => step0Valid && setStep(1)}
              disabled={!step0Valid}
              className={step0Valid ? `btn ${isDA ? 'btn-da' : 'btn-ds'}` : 'btn btn-ghost'}
              style={{ width: '100%', padding: '0.875rem', fontSize: '0.95rem' }}
            >
              {step0Valid ? 'Lanjut: Input Data →' : 'Isi judul grafik dulu'}
            </button>
          </div>
        )}

        {/* ══════════════ STEP 1: DATA INPUT ══════════════ */}
        {step === 1 && (
          <div className="anim-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {chartType !== 'scatter' ? (
              /* LINE / BAR input */
              <div style={{
                background: 'var(--color-bg-card)',
                border: '1.5px solid var(--color-border)',
                borderRadius: 18, padding: '1.25rem',
              }}>
                {/* Input tabs */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                  {[['manual','✏️ Manual'], ['csv','📄 CSV / Paste']].map(([id, lbl]) => (
                    <button key={id} onClick={() => setInputTab(id)} style={{
                      padding: '6px 14px', borderRadius: 8,
                      border: inputTab === id ? `1.5px solid ${modeColor}` : '1.5px solid var(--color-border)',
                      background: inputTab === id ? (isDA ? 'var(--color-da-glow)' : 'var(--color-ds-glow)') : 'var(--color-bg-raised)',
                      color: inputTab === id ? modeColor : 'var(--color-text-3)',
                      fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer',
                    }}>{lbl}</button>
                  ))}
                </div>

                {inputTab === 'manual' ? (
                  <>
                    <div className="section-label" style={{ marginBottom: 10 }}>
                      Sumbu X: <strong style={{ color: 'var(--color-text-2)' }}>{xLabel || 'Label'}</strong>
                      {'  '}·{'  '}
                      Sumbu Y: <strong style={{ color: 'var(--color-text-2)' }}>{yLabel || 'Nilai'}</strong>
                    </div>

                    {/* Header */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 32px', gap: 8, marginBottom: 8 }}>
                      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-text-3)', padding: '0 4px' }}>Label (X)</div>
                      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-text-3)', padding: '0 4px' }}>Nilai (Y)</div>
                      <div/>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {rows.map((row, i) => (
                        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 32px', gap: 8, alignItems: 'center' }}>
                          <input
                            className={`input-field ${isDA ? '' : 'ds-focus'}`}
                            placeholder={`Label ${i + 1}`}
                            value={row.label}
                            onChange={e => setRow(i, 'label', e.target.value)}
                          />
                          <input
                            className={`input-field ${isDA ? '' : 'ds-focus'}`}
                            type="number"
                            placeholder="0"
                            value={row.value}
                            onChange={e => setRow(i, 'value', e.target.value)}
                          />
                          <button
                            onClick={() => removeRow(i)}
                            style={{
                              width: 32, height: 32, borderRadius: 8,
                              background: 'rgba(248,113,113,0.1)',
                              border: '1px solid rgba(248,113,113,0.3)',
                              color: 'var(--color-danger)',
                              cursor: 'pointer', fontSize: '0.9rem', fontWeight: 700,
                            }}
                          >×</button>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={addRow}
                      className="btn btn-ghost"
                      style={{ marginTop: 12, width: '100%', fontSize: '0.8rem' }}
                    >
                      + Tambah baris
                    </button>
                  </>
                ) : (
                  /* CSV tab */
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-3)', lineHeight: 1.5 }}>
                      Format: setiap baris = <code style={{ background: 'var(--color-bg-raised)', padding: '1px 6px', borderRadius: 4 }}>Label, Nilai</code>. Contoh:
                      <pre style={{ marginTop: 6, padding: 8, background: 'var(--color-bg-raised)', borderRadius: 8, fontSize: '0.72rem', color: 'var(--color-text-2)' }}>
{`Jan, 1200
Feb, 1500
Mar, 980`}
                      </pre>
                    </div>
                    <textarea
                      className="input-field"
                      rows={8}
                      placeholder="Paste CSV atau teks di sini..."
                      value={csvText}
                      onChange={e => setCsvText(e.target.value)}
                      style={{ resize: 'vertical', fontFamily: 'monospace', fontSize: '0.82rem' }}
                    />
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={handleCSVImport} className={`btn ${isDA ? 'btn-da' : 'btn-ds'}`} style={{ flex: 1 }}>
                        ✓ Import
                      </button>
                      <button onClick={() => fileRef.current.click()} className="btn btn-ghost" style={{ flex: 1 }}>
                        📁 Upload File
                      </button>
                      <input ref={fileRef} type="file" accept=".csv,.txt" style={{ display: 'none' }} onChange={handleFileUpload}/>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* SCATTER input */
              <div style={{
                background: 'var(--color-bg-card)',
                border: '1.5px solid var(--color-border)',
                borderRadius: 18, padding: '1.25rem',
              }}>
                <div className="section-label" style={{ marginBottom: 12 }}>
                  Input pasangan titik X, Y
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 32px', gap: 8, marginBottom: 8 }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-text-3)' }}>X ({xLabel || 'X'})</div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-text-3)' }}>Y ({yLabel || 'Y'})</div>
                  <div/>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {xyRows.map((row, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 32px', gap: 8, alignItems: 'center' }}>
                      <input className={`input-field ${isDA ? '' : 'ds-focus'}`} type="number" placeholder="0" value={row.x} onChange={e => setXY(i, 'x', e.target.value)} />
                      <input className={`input-field ${isDA ? '' : 'ds-focus'}`} type="number" placeholder="0" value={row.y} onChange={e => setXY(i, 'y', e.target.value)} />
                      <button onClick={() => removeXY(i)} style={{ width:32,height:32,borderRadius:8,background:'rgba(248,113,113,0.1)',border:'1px solid rgba(248,113,113,0.3)',color:'var(--color-danger)',cursor:'pointer',fontSize:'0.9rem',fontWeight:700}}>×</button>
                    </div>
                  ))}
                </div>
                <button onClick={addXY} className="btn btn-ghost" style={{ marginTop: 12, width: '100%', fontSize: '0.8rem' }}>
                  + Tambah titik
                </button>
              </div>
            )}

            {/* Live Preview */}
            <div style={{
              background: 'var(--color-bg-card)',
              border: '1.5px solid var(--color-border)',
              borderRadius: 18, padding: '1.25rem',
            }}>
              <div className="section-label" style={{ marginBottom: 10 }}>👁️ Preview Grafik (live)</div>
              <div style={{ height: 220 }}>
                <ChartView caseData={caseData} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setStep(0)} className="btn btn-ghost" style={{ flex: 1 }}>
                ← Kembali
              </button>
              <button
                onClick={() => step1Valid && setStep(2)}
                disabled={!step1Valid}
                className={step1Valid ? `btn ${isDA ? 'btn-da' : 'btn-ds'}` : 'btn btn-ghost'}
                style={{ flex: 2 }}
              >
                {step1Valid ? 'Lanjut: Analisis →' : 'Masukkan minimal 1 data dulu'}
              </button>
            </div>
          </div>
        )}

        {/* ══════════════ STEP 2: ANALYZE ══════════════ */}
        {step === 2 && (
          <div className="anim-fade-up">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
              gap: '1.25rem',
            }} className="analyze-grid">

              {/* LEFT */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                {/* Chart */}
                <div style={{
                  background: 'var(--color-bg-card)',
                  border: '1.5px solid var(--color-border)',
                  borderRadius: 18, padding: '1.25rem',
                }}>
                  <div style={{ height: 260 }}>
                    <ChartView caseData={caseData} />
                  </div>
                </div>

                {/* Context */}
                <div style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 14, padding: '0.875rem',
                  fontSize: '0.8rem', color: 'var(--color-text-2)', lineHeight: 1.6,
                }}>
                  <div className="section-label" style={{ marginBottom: 4 }}>📋 Konteks</div>
                  {caseData.context}
                </div>

                {/* Progress */}
                <div style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 14, padding: '0.875rem 1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.8rem' }}>
                    <span style={{ fontWeight: 700 }}>📝 Pertanyaan</span>
                    <span style={{ color: modeColor, fontWeight: 700 }}>{Object.values(answers).filter(a=>a.trim()).length}/4</span>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {Object.values(answers).map((v, i) => (
                      <div key={i} style={{
                        flex: 1, height: 6, borderRadius: 99,
                        background: v.trim() ? modeColor : 'var(--color-bg-raised)',
                        transition: 'background 0.3s',
                      }}/>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                {!showSample ? (
                  <button
                    onClick={() => allFilled && setShowSample(true)}
                    disabled={!allFilled}
                    className={allFilled ? `btn ${isDA ? 'btn-da' : 'btn-ds'}` : 'btn btn-ghost'}
                    style={{ width: '100%', padding: '0.875rem' }}
                  >
                    {allFilled ? `✨ Lihat Jawaban Panduan ${modeEmoji}` : `Isi semua Q dulu`}
                  </button>
                ) : (
                  <button onClick={() => setShowSample(false)} className="btn btn-ghost" style={{ width: '100%' }}>
                    🙈 Sembunyikan
                  </button>
                )}

                <button onClick={() => setStep(1)} className="btn btn-ghost" style={{ width: '100%', fontSize: '0.8rem' }}>
                  ← Edit Data
                </button>
              </div>

              {/* RIGHT */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                {/* Tab Switcher */}
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
                    <AnswerForm
                      answers={answers}
                      onChange={(key, val) => setAnswers(prev => ({ ...prev, [key]: val }))}
                      caseData={caseData}
                    />
                    {showSample && (
                      <div className="anim-fade-up" style={{
                        background: 'var(--color-bg-card)',
                        border: `1.5px solid ${modeColor}`,
                        borderRadius: 18, padding: '1.25rem',
                      }}>
                        <SampleAnswer
                          sampleAnswers={caseData.sampleAnswers}
                          mode={perspectiveMode}
                          userAnswers={answers}
                        />
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
          </div>
        )}
      </main>

      <style>{`
        @media (max-width: 680px) {
          .analyze-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
