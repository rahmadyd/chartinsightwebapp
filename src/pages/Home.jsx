import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CaseCard from '../components/CaseCard';
import casesData from '../data/cases.json';
import { getCompletedCases } from '../utils/storage';

const FILTER_OPTIONS = ['Semua', 'line', 'bar', 'scatter', 'pemula', 'menengah'];

export default function Home() {
  const [filter, setFilter] = useState('Semua');
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    setCompletedCount(getCompletedCases().length);
  }, []);

  const filtered = filter === 'Semua'
    ? casesData
    : casesData.filter(c => c.chartType === filter || c.level === filter);

  const pct = Math.round((completedCount / casesData.length) * 100);

  return (
    <div className="min-h-screen bg-surface-1 text-text-primary">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-surface-1/90 backdrop-blur border-b border-border px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🧪</span>
            <span className="font-bold text-base tracking-tight">Chart Insight Lab</span>
          </div>
          <Link
            to="/glossary"
            className="text-xs text-text-muted hover:text-accent-da transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-2"
          >
            📖 Glosarium
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Belajar Membaca Grafik
          </h1>
          <p className="text-text-secondary leading-relaxed max-w-2xl">
            Latihan membaca grafik dari sudut pandang{' '}
            <span className="text-accent-da font-medium">Data Analyst</span> dan{' '}
            <span className="text-accent-ds font-medium">Data Scientist</span>.
            Jawab 4 pertanyaan, lalu bandingkan dengan jawaban contoh.
          </p>
        </div>

        {/* 4 Pertanyaan info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { emoji: '📌', label: 'Grafik apa?', sub: 'Jenis, sumbu, satuan' },
            { emoji: '📈', label: 'Bentuknya?', sub: 'Tren, pola, outlier' },
            { emoji: '🤔', label: 'Kenapa?', sub: 'Hipotesis penyebab' },
            { emoji: '🎯', label: 'Ngapain?', sub: 'Rekomendasi aksi' },
          ].map((q) => (
            <div key={q.label} className="bg-surface-2 rounded-xl p-3 border border-border text-center">
              <div className="text-xl mb-1">{q.emoji}</div>
              <div className="text-xs font-semibold text-text-primary">{q.label}</div>
              <div className="text-xs text-text-muted mt-0.5">{q.sub}</div>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="bg-surface-2 rounded-2xl p-4 mb-8 border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold">Progress Belajar</span>
            <span className="text-sm text-text-muted">{completedCount} / {casesData.length} kasus</span>
          </div>
          <div className="h-2 bg-surface-1 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent-da to-accent-ds rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          {completedCount === casesData.length && (
            <p className="text-xs text-green-400 mt-2">🎉 Semua kasus selesai! Keren banget.</p>
          )}
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-5">
          {FILTER_OPTIONS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                filter === f
                  ? 'bg-accent-da/20 border-accent-da/50 text-accent-da'
                  : 'bg-surface-2 border-border text-text-muted hover:text-text-primary hover:border-border/80'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <CaseCard key={c.id} caseData={c} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-text-muted">
            Tidak ada kasus untuk filter ini.
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-text-muted border-t border-border mt-8">
        Chart Insight Lab — Dibangun untuk belajar membaca data 📊
      </footer>
    </div>
  );
}
