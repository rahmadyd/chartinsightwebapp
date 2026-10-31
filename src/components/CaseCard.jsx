import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getCompletedCases } from '../utils/storage';

const CHART_ICON = { line: '📈', bar: '📊', scatter: '🔵', histogram: '📉' };
const LEVEL_STYLE = {
  pemula:   { bg: 'rgba(52,211,153,0.12)', color: '#34d399', border: 'rgba(52,211,153,0.3)' },
  menengah: { bg: 'rgba(251,191,36,0.12)', color: '#fbbf24', border: 'rgba(251,191,36,0.3)' },
  lanjutan: { bg: 'rgba(248,113,113,0.12)', color: '#f87171', border: 'rgba(248,113,113,0.3)' },
};

export default function CaseCard({ caseData, completed }) {
  const { isDA } = useApp();
  const accentColor = isDA ? 'var(--color-da)' : 'var(--color-ds)';
  const glowColor = isDA ? 'var(--color-da-glow)' : 'var(--color-ds-glow)';
  const lvl = LEVEL_STYLE[caseData.level] || LEVEL_STYLE.pemula;

  return (
    <Link
      to={`/case/${caseData.id}`}
      style={{
        display: 'block',
        textDecoration: 'none',
        background: 'var(--color-bg-card)',
        border: completed ? `2px solid ${accentColor}` : '1.5px solid var(--color-border)',
        borderRadius: 16,
        padding: '1rem',
        transition: 'all 0.2s',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: completed ? `0 0 16px ${glowColor}` : 'none',
      }}
      className="card-hover-effect"
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = accentColor;
        e.currentTarget.style.background = 'var(--color-bg-raised)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = completed ? accentColor : 'var(--color-border)';
        e.currentTarget.style.background = 'var(--color-bg-card)';
      }}
    >
      {/* Done badge */}
      {completed && (
        <div style={{
          position: 'absolute', top: 10, right: 10,
          width: 22, height: 22, borderRadius: '50%',
          background: 'rgba(52,211,153,0.2)',
          border: '1.5px solid rgba(52,211,153,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.7rem', color: 'var(--color-success)',
        }}>✓</div>
      )}

      {/* Icon + Chart type */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <div style={{
          width: 40, height: 40,
          background: 'var(--color-bg-raised)',
          borderRadius: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.3rem',
        }}>
          {CHART_ICON[caseData.chartType] || '📊'}
        </div>
        <div>
          <div style={{ fontSize: '0.68rem', color: 'var(--color-text-3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {caseData.chartType} chart
          </div>
          <div style={{
            display: 'inline-flex', alignItems: 'center',
            fontSize: '0.66rem', fontWeight: 700,
            padding: '2px 8px', borderRadius: 99,
            background: lvl.bg, color: lvl.color,
            border: `1px solid ${lvl.border}`,
          }}>
            {caseData.level}
          </div>
        </div>
      </div>

      {/* Title */}
      <div style={{
        fontWeight: 700, fontSize: '0.875rem',
        color: 'var(--color-text-1)', marginBottom: 6,
        lineHeight: 1.4,
      }}>
        {caseData.title}
      </div>

      {/* Context snippet */}
      <div style={{
        fontSize: '0.75rem', color: 'var(--color-text-3)',
        lineHeight: 1.5,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {caseData.context}
      </div>

      {/* Arrow */}
      <div style={{ textAlign: 'right', marginTop: 10, color: 'var(--color-text-3)', fontSize: '0.8rem' }}>→</div>
    </Link>
  );
}
