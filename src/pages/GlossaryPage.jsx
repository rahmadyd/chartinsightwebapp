import React from 'react';
import { Link } from 'react-router-dom';
import { GLOSSARY } from '../utils/glossary';

export default function GlossaryPage() {
  const entries = Object.values(GLOSSARY).sort((a, b) =>
    a.term.localeCompare(b.term, 'id')
  );

  return (
    <div className="min-h-screen bg-surface-1 text-text-primary">
      <header className="sticky top-0 z-30 bg-surface-1/90 backdrop-blur border-b border-border px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link
            to="/"
            className="text-text-muted hover:text-text-primary transition-colors text-sm"
          >
            ←
          </Link>
          <h1 className="text-sm font-bold">📖 Glosarium Istilah Data</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <p className="text-text-muted text-sm mb-6 leading-relaxed">
          Kumpulan istilah yang sering muncul saat membaca dan menganalisis grafik data.
          Klik istilah bergaris putus-putus di kasus untuk definisi cepat.
        </p>

        <div className="space-y-3">
          {entries.map((entry) => (
            <div
              key={entry.term}
              className="bg-surface-2 rounded-xl p-4 border border-border hover:border-accent-da/30 transition-colors"
            >
              <div className="font-semibold text-accent-da text-sm mb-1">{entry.term}</div>
              <p className="text-text-secondary text-sm leading-relaxed">{entry.def}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
