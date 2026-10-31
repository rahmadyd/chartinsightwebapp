import React from 'react';
import { useApp } from '../context/AppContext';

const QS = [
  { key: 'q1', label: 'Q1 — Grafik & Metrik', emoji: '📌', shared: true },
  { key: 'q2', label: 'Q2 — Bentuk & Pola',   emoji: '📈', shared: true },
  { key: 'q3', label: 'Q3 — Hipotesis',        emoji: '🤔', shared: false },
  { key: 'q4', label: 'Q4 — Rekomendasi',      emoji: '🎯', shared: false },
];

export default function SampleAnswer({ sampleAnswers, mode, userAnswers }) {
  const { isDA } = useApp();
  const modeColor = isDA ? 'var(--color-da)' : 'var(--color-ds)';
  const modeGlow  = isDA ? 'var(--color-da-glow)' : 'var(--color-ds-glow)';
  const modeBg    = isDA ? 'rgba(79,158,255,0.08)' : 'rgba(191,127,255,0.08)';
  const modeBorder= isDA ? 'var(--color-da-border)' : 'var(--color-ds-border)';
  const modeLabel = isDA ? '📊 Data Analyst' : '🔬 Data Scientist';
  const modeAnswers = sampleAnswers[mode] || {};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {/* Mode header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '0.625rem 0.875rem',
        background: modeBg,
        border: `1.5px solid ${modeBorder}`,
        borderRadius: 12,
      }}>
        <span style={{ fontWeight: 800, fontSize: '0.875rem', color: modeColor }}>{modeLabel}</span>
        <span style={{ fontSize: '0.72rem', color: 'var(--color-text-3)' }}>— sudut pandang yang aktif</span>
      </div>

      {/* Tip */}
      <div style={{
        padding: '0.625rem 0.875rem',
        background: 'var(--color-bg-raised)',
        borderRadius: 10,
        fontSize: '0.75rem', color: 'var(--color-text-3)',
        lineHeight: 1.5,
      }}>
        💡 <strong style={{ color: 'var(--color-text-2)' }}>Tidak ada jawaban 100% benar.</strong>{' '}
        Bandingkan polamu dengan contoh — apa yang mirip, apa yang bisa diperdalam?
      </div>

      {/* Each question */}
      {QS.map(({ key, label, emoji, shared }) => {
        const sampleText = shared ? sampleAnswers[key] : modeAnswers[key];
        const userText = userAnswers[key];
        return (
          <div key={key} style={{
            background: 'var(--color-bg-raised)',
            border: shared ? '1px solid var(--color-border)' : `1.5px solid ${modeBorder}`,
            borderRadius: 14,
            overflow: 'hidden',
          }}>
            {/* Header row */}
            <div style={{
              padding: '0.6rem 0.875rem',
              background: shared ? 'transparent' : modeBg,
              borderBottom: '1px solid var(--color-border)',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ fontWeight: 700, fontSize: '0.8rem' }}>{emoji} {label}</span>
              {!shared && (
                <span style={{
                  fontSize: '0.68rem', fontWeight: 700,
                  padding: '2px 8px', borderRadius: 99,
                  background: modeBg, color: modeColor,
                  border: `1px solid ${modeBorder}`,
                }}>
                  {isDA ? 'DA' : 'DS'}
                </span>
              )}
            </div>

            <div style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {/* User answer */}
              {userText && (
                <div style={{
                  background: 'var(--color-bg-base)',
                  borderRadius: 10, padding: '0.625rem 0.75rem',
                }}>
                  <div style={{ fontSize: '0.65rem', color: 'var(--color-text-3)', fontWeight: 700, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Jawabanmu
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--color-text-2)', fontStyle: 'italic', lineHeight: 1.5 }}>
                    {userText}
                  </p>
                </div>
              )}

              {/* Sample answer */}
              <div style={{
                background: modeBg,
                border: `1px solid ${modeBorder}`,
                borderRadius: 10, padding: '0.625rem 0.75rem',
              }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, marginBottom: 4, color: modeColor, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Jawaban Contoh
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-1)', lineHeight: 1.6 }}>
                  {sampleText || '—'}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
