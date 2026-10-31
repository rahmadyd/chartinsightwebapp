import React from 'react';
import { useApp } from '../context/AppContext';
import GlossaryTooltip from './GlossaryTooltip';

const QUESTIONS = [
  { key: 'q1', n: 'Q1', emoji: '📌', label: 'Ini grafik apa, mengukur apa?', hint: 'Jenis grafik · sumbu X · sumbu Y · satuan · periode' },
  { key: 'q2', n: 'Q2', emoji: '📈', label: 'Bentuknya bagaimana?', hint: 'Naik · turun · datar · lonjakan · outlier · pola berulang' },
  { key: 'q3', n: 'Q3', emoji: '🤔', label: 'Kenapa mungkin begitu?', hint: 'Hipotesis penyebab — boleh lebih dari satu kemungkinan' },
  { key: 'q4', n: 'Q4', emoji: '🎯', label: 'Lalu harus ngapain?', hint: 'Rekomendasi atau tindakan selanjutnya berdasarkan data ini' },
];

export default function AnswerForm({ answers, onChange, caseData }) {
  const { isDA, modeColor, modePillClass } = useApp();
  const focusClass = isDA ? '' : 'ds-focus';
  const glossaryTerms = caseData?.glossary || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {/* Glossary chips */}
      {glossaryTerms.length > 0 && (
        <div style={{
          background: 'var(--color-bg-card)',
          border: '1px solid var(--color-border)',
          borderRadius: 12, padding: '0.625rem 0.875rem',
          display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center',
        }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--color-text-3)', fontWeight: 600 }}>🔤 Istilah kunci:</span>
          {glossaryTerms.map(t => <GlossaryTooltip key={t} term={t} />)}
        </div>
      )}

      {/* Questions */}
      {QUESTIONS.map(({ key, n, emoji, label, hint }) => {
        const filled = answers[key]?.trim().length > 0;
        return (
          <div key={key} style={{
            background: 'var(--color-bg-card)',
            border: filled
              ? `1.5px solid ${modeColor}`
              : '1.5px solid var(--color-border)',
            borderRadius: 14,
            padding: '0.875rem',
            transition: 'border-color 0.2s',
          }}>
            {/* Q header */}
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8 }}>
              <div style={{
                minWidth: 30, height: 30,
                borderRadius: 8,
                background: filled ? modeColor : 'var(--color-bg-raised)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.72rem', fontWeight: 800,
                color: filled ? '#fff' : 'var(--color-text-3)',
                transition: 'all 0.2s',
              }}>
                {filled ? '✓' : n}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', lineHeight: 1.3 }}>
                  {emoji} {label}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-3)', marginTop: 2 }}>{hint}</div>
              </div>
            </div>

            <textarea
              className={`input-field ${focusClass}`}
              rows={3}
              placeholder="Tulis jawabanmu di sini..."
              value={answers[key] || ''}
              onChange={e => onChange(key, e.target.value)}
              style={{ resize: 'none', marginTop: 2 }}
            />

            {filled && (
              <div style={{ textAlign: 'right', marginTop: 4, fontSize: '0.7rem', color: 'var(--color-success)' }}>
                ✓ Tersimpan otomatis
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
