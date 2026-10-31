import React from 'react';
import { Link } from 'react-router-dom';
import { getCompletedCases } from '../utils/storage';

const LEVEL_BADGE = {
  pemula: 'bg-green-500/20 text-green-300 border-green-500/30',
  menengah: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  lanjutan: 'bg-red-500/20 text-red-300 border-red-500/30',
};

const CHART_ICON = {
  line: '📈',
  bar: '📊',
  scatter: '🔵',
  histogram: '📉',
};

export default function CaseCard({ caseData }) {
  const completed = getCompletedCases();
  const isDone = completed.includes(caseData.id);

  return (
    <Link
      to={`/case/${caseData.id}`}
      className="block bg-surface-2 border border-border rounded-2xl p-5 hover:border-accent-da/50 hover:bg-surface-2/80 transition-all duration-200 group relative overflow-hidden"
    >
      {isDone && (
        <div className="absolute top-3 right-3 w-6 h-6 bg-green-500/20 border border-green-500/40 rounded-full flex items-center justify-center">
          <span className="text-green-400 text-xs">✓</span>
        </div>
      )}
      <div className="flex items-start gap-3">
        <div className="text-2xl mt-0.5">{CHART_ICON[caseData.chartType] || '📊'}</div>
        <div className="flex-1 min-w-0">
          <h3 className="text-text-primary font-semibold text-sm group-hover:text-accent-da transition-colors leading-tight">
            {caseData.title}
          </h3>
          <p className="text-text-muted text-xs mt-1.5 line-clamp-2 leading-relaxed">
            {caseData.context}
          </p>
          <div className="flex items-center gap-2 mt-3">
            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium capitalize ${LEVEL_BADGE[caseData.level] || LEVEL_BADGE.pemula}`}>
              {caseData.level}
            </span>
            <span className="text-xs text-text-muted capitalize">
              {caseData.chartType} chart
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
