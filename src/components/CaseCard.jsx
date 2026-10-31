import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const CHART_ICON = { line: '📈', bar: '📊', scatter: '🔵', histogram: '📉' };

const CATEGORY_COLORS = {
  'Finance': { bg: 'rgba(56,189,248,0.14)', text: '#38bdf8', border: 'rgba(56,189,248,0.35)' },
  'E-Commerce': { bg: 'rgba(251,146,60,0.14)', text: '#fb923c', border: 'rgba(251,146,60,0.35)' },
  'Digital Marketing': { bg: 'rgba(244,63,94,0.14)', text: '#f43f5e', border: 'rgba(244,63,94,0.35)' },
  'SaaS & Product': { bg: 'rgba(168,85,247,0.14)', text: '#c084fc', border: 'rgba(168,85,247,0.35)' },
  'Social Media': { bg: 'rgba(236,72,153,0.14)', text: '#f472b6', border: 'rgba(236,72,153,0.35)' },
  'Healthcare': { bg: 'rgba(52,211,153,0.14)', text: '#34d399', border: 'rgba(52,211,153,0.35)' },
};

export default function CaseCard({ caseData }) {
  const { isDA } = useApp();
  const accentColor = isDA ? 'var(--color-da)' : 'var(--color-ds)';
  const catStyle = CATEGORY_COLORS[caseData.category] || CATEGORY_COLORS['Finance'];

  return (
    <Link
      to={`/case/${caseData.id}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        textDecoration: 'none',
        background: 'var(--color-bg-card)',
        border: '1.5px solid var(--color-border)',
        borderRadius: 18,
        padding: '1.25rem',
        transition: 'all 0.2s',
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
      }}
      className="card-hover-effect"
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = accentColor;
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = `0 10px 30px ${isDA ? 'rgba(79,158,255,0.15)' : 'rgba(191,127,255,0.15)'}`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--color-border)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div>
        {/* Top Badges */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{
            background: catStyle.bg,
            color: catStyle.text,
            border: `1px solid ${catStyle.border}`,
            padding: '2px 8px',
            borderRadius: 99,
            fontSize: '0.68rem',
            fontWeight: 800,
            letterSpacing: '0.04em',
          }}>
            {caseData.category}
          </span>

          <span style={{
            display: 'flex', alignItems: 'center', gap: 4,
            fontSize: '0.72rem', color: 'var(--color-text-3)', fontWeight: 600,
          }}>
            {CHART_ICON[caseData.chartType] || '📊'} {caseData.chartType.toUpperCase()}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontWeight: 800,
          fontSize: '0.98rem',
          color: 'var(--color-text-1)',
          marginBottom: 8,
          lineHeight: 1.35,
        }}>
          {caseData.title}
        </h3>

        {/* Problem Statement Snippet */}
        <p style={{
          fontSize: '0.78rem',
          color: 'var(--color-text-2)',
          lineHeight: 1.5,
          marginBottom: 12,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {caseData.problemStatement || caseData.context}
        </p>
      </div>

      {/* Bottom Kunjaw Indicator */}
      <div style={{
        borderTop: '1px solid var(--color-border)',
        paddingTop: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
          💡 Kunjaw & Reasoning
        </span>
        <span style={{ fontSize: '0.8rem', color: accentColor, fontWeight: 800 }}>
          Buka Kasus →
        </span>
      </div>
    </Link>
  );
}
