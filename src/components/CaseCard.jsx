import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const CHART_ICON = { line: '📈', bar: '📊', scatter: '🔵', histogram: '📉' };

const CATEGORY_COLORS = {
  'Finance': { bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' },
  'E-Commerce': { bg: '#fff7ed', text: '#c2410c', border: '#fed7aa' },
  'Digital Marketing': { bg: '#fdf2f8', text: '#be185d', border: '#fbcfe8' },
  'SaaS & Product': { bg: '#f5f3ff', text: '#6d28d9', border: '#ddd6fe' },
  'Social Media': { bg: '#fdf4ff', text: '#a21caf', border: '#f5d0fe' },
  'Healthcare': { bg: '#ecfdf5', text: '#047857', border: '#a7f3d0' },
};

export default function CaseCard({ caseData }) {
  const { isDA } = useApp();
  const accentColor = isDA ? '#2563eb' : '#7c3aed';
  const catStyle = CATEGORY_COLORS[caseData.category] || CATEGORY_COLORS['Finance'];

  return (
    <Link
      to={`/case/${caseData.id}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        textDecoration: 'none',
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: 16,
        padding: '1.25rem',
        transition: 'all 0.15s ease',
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = accentColor;
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.06)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = '#e2e8f0';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.03)';
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
            letterSpacing: '0.02em',
          }}>
            {caseData.category}
          </span>

          <span style={{
            display: 'flex', alignItems: 'center', gap: 4,
            fontSize: '0.72rem', color: '#64748b', fontWeight: 600,
          }}>
            {CHART_ICON[caseData.chartType] || '📊'} {caseData.chartType.toUpperCase()}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontWeight: 800,
          fontSize: '0.98rem',
          color: '#0f172a',
          marginBottom: 8,
          lineHeight: 1.35,
        }}>
          {caseData.title}
        </h3>

        {/* Problem Statement Snippet */}
        <p style={{
          fontSize: '0.8rem',
          color: '#475569',
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
        borderTop: '1px solid #f1f5f9',
        paddingTop: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: '0.72rem', color: '#0284c7', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
          💡 Kunjaw & Reasoning
        </span>
        <span style={{ fontSize: '0.78rem', color: accentColor, fontWeight: 800 }}>
          Buka Kasus →
        </span>
      </div>
    </Link>
  );
}
