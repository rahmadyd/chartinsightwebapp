import React from 'react';

const QUESTION_LABELS = {
  q1: { label: 'Q1: Grafik & Metrik', emoji: '📌' },
  q2: { label: 'Q2: Bentuk & Pola', emoji: '📈' },
  q3: { label: 'Q3: Hipotesis Penyebab', emoji: '🤔' },
  q4: { label: 'Q4: Rekomendasi', emoji: '🎯' },
};

export default function SampleAnswer({ sampleAnswers, mode, userAnswers }) {
  const modeAnswers = sampleAnswers[mode];

  return (
    <div className="space-y-3 animate-fade-in">
      <div className={`text-xs font-bold uppercase tracking-widest mb-3 ${
        mode === 'da' ? 'text-accent-da' : 'text-accent-ds'
      }`}>
        {mode === 'da' ? '📊 Sudut Pandang Data Analyst' : '🔬 Sudut Pandang Data Scientist'}
      </div>

      {/* Q1 dan Q2 sama untuk keduanya */}
      {['q1', 'q2'].map((key) => (
        <div key={key} className="rounded-xl border border-border overflow-hidden">
          <div className="bg-surface-2 px-4 py-2 border-b border-border">
            <span className="text-sm font-semibold text-text-primary">
              {QUESTION_LABELS[key].emoji} {QUESTION_LABELS[key].label}
            </span>
          </div>
          <div className="p-4 space-y-3">
            {userAnswers[key] && (
              <div className="bg-surface-1 rounded-lg p-3">
                <div className="text-xs text-text-muted mb-1 font-medium">Jawabanmu</div>
                <p className="text-sm text-text-secondary italic">{userAnswers[key]}</p>
              </div>
            )}
            <div className={`rounded-lg p-3 ${
              mode === 'da' ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-purple-500/10 border border-purple-500/20'
            }`}>
              <div className="text-xs font-medium mb-1 ${mode === 'da' ? 'text-blue-400' : 'text-purple-400'}">
                Jawaban Contoh
              </div>
              <p className="text-sm text-text-primary leading-relaxed">{sampleAnswers[key]}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Q3 dan Q4 berbeda per mode */}
      {['q3', 'q4'].map((key) => (
        <div key={key} className={`rounded-xl border overflow-hidden ${
          mode === 'da' ? 'border-blue-500/30' : 'border-purple-500/30'
        }`}>
          <div className={`px-4 py-2 border-b ${
            mode === 'da'
              ? 'bg-blue-500/10 border-blue-500/20'
              : 'bg-purple-500/10 border-purple-500/20'
          }`}>
            <span className="text-sm font-semibold text-text-primary">
              {QUESTION_LABELS[key].emoji} {QUESTION_LABELS[key].label}
            </span>
            <span className={`ml-2 text-xs px-2 py-0.5 rounded-full font-medium ${
              mode === 'da'
                ? 'bg-blue-500/20 text-blue-300'
                : 'bg-purple-500/20 text-purple-300'
            }`}>
              {mode === 'da' ? 'DA' : 'DS'}
            </span>
          </div>
          <div className="p-4 space-y-3">
            {userAnswers[key] && (
              <div className="bg-surface-1 rounded-lg p-3">
                <div className="text-xs text-text-muted mb-1 font-medium">Jawabanmu</div>
                <p className="text-sm text-text-secondary italic">{userAnswers[key]}</p>
              </div>
            )}
            <div className={`rounded-lg p-3 ${
              mode === 'da' ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-purple-500/10 border border-purple-500/20'
            }`}>
              <div className={`text-xs font-medium mb-1 ${mode === 'da' ? 'text-blue-400' : 'text-purple-400'}`}>
                Jawaban Contoh {mode === 'da' ? '(DA)' : '(DS)'}
              </div>
              <p className="text-sm text-text-primary leading-relaxed">{modeAnswers[key]}</p>
            </div>
          </div>
        </div>
      ))}

      <div className="mt-4 p-3 bg-surface-2 rounded-xl border border-border">
        <p className="text-xs text-text-muted leading-relaxed">
          💡 <strong className="text-text-secondary">Ingat:</strong> Tidak ada satu jawaban yang 100% benar.
          Kuncinya adalah melatih pola pikir analitis. Bandingkan jawabanmu dengan contoh—
          apa yang mirip? Apa yang bisa diperdalam?
        </p>
      </div>
    </div>
  );
}
