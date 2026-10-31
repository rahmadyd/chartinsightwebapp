import React from 'react';
import GlossaryTooltip from './GlossaryTooltip';

const QUESTIONS = [
  {
    key: 'q1',
    label: 'Q1: Ini grafik apa, mengukur apa?',
    hint: 'Sebutkan jenis grafik, sumbu X, sumbu Y, satuan, dan periode waktu.',
    emoji: '📌',
  },
  {
    key: 'q2',
    label: 'Q2: Bentuknya bagaimana?',
    hint: 'Deskripsikan pola: naik, turun, datar, ada lonjakan? Ada outlier? Pola berulang?',
    emoji: '📈',
  },
  {
    key: 'q3',
    label: 'Q3: Kenapa mungkin begitu?',
    hint: 'Hipotesiskan penyebab pola yang kamu lihat. Boleh lebih dari satu kemungkinan.',
    emoji: '🤔',
  },
  {
    key: 'q4',
    label: 'Q4: Lalu harus ngapain?',
    hint: 'Apa rekomendasi atau tindakan selanjutnya berdasarkan data ini?',
    emoji: '🎯',
  },
];

export default function AnswerForm({ answers, onChange, caseData }) {
  const glossaryTerms = caseData?.glossary || [];

  return (
    <div className="space-y-4">
      {glossaryTerms.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center mb-2">
          <span className="text-xs text-text-muted">Glosarium kasus ini:</span>
          {glossaryTerms.map((term) => (
            <GlossaryTooltip key={term} term={term} />
          ))}
        </div>
      )}
      {QUESTIONS.map(({ key, label, hint, emoji }) => (
        <div key={key} className="bg-surface-2 rounded-xl p-4 border border-border">
          <label className="block mb-1">
            <span className="text-text-primary font-semibold text-sm">
              {emoji} {label}
            </span>
            <span className="block text-xs text-text-muted mt-0.5">{hint}</span>
          </label>
          <textarea
            className="w-full mt-2 bg-surface-1 border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-da focus:ring-1 focus:ring-accent-da resize-none transition-colors"
            rows={3}
            placeholder="Tulis jawabanmu di sini..."
            value={answers[key] || ''}
            onChange={(e) => onChange(key, e.target.value)}
          />
          {answers[key] && (
            <div className="flex justify-end mt-1">
              <span className="text-xs text-green-400">✓ Tersimpan otomatis</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
