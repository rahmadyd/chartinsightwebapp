import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ChartView from '../components/ChartView';
import AnswerForm from '../components/AnswerForm';
import SampleAnswer from '../components/SampleAnswer';
import ModeToggle from '../components/ModeToggle';
import casesData from '../data/cases.json';
import {
  loadAllAnswers,
  saveAnswer,
  markCaseCompleted,
  getCompletedCases,
} from '../utils/storage';

export default function CasePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const caseData = casesData.find((c) => c.id === id);

  const [answers, setAnswers] = useState({ q1: '', q2: '', q3: '', q4: '' });
  const [showSample, setShowSample] = useState(false);
  const [mode, setMode] = useState('da');
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!caseData) return;
    setAnswers(loadAllAnswers(caseData.id));
    setShowSample(false);
    const completed = getCompletedCases();
    setIsCompleted(completed.includes(caseData.id));
  }, [id, caseData]);

  const handleAnswerChange = useCallback(
    (key, value) => {
      setAnswers((prev) => ({ ...prev, [key]: value }));
      saveAnswer(caseData.id, key, value);
    },
    [caseData]
  );

  const handleShowSample = () => {
    setShowSample(true);
    markCaseCompleted(caseData.id);
    setIsCompleted(true);
  };

  if (!caseData) {
    return (
      <div className="min-h-screen bg-surface-1 flex flex-col items-center justify-center gap-4">
        <p className="text-text-muted">Kasus tidak ditemukan.</p>
        <Link to="/" className="text-accent-da hover:underline text-sm">
          ← Kembali ke daftar
        </Link>
      </div>
    );
  }

  const currentIndex = casesData.findIndex((c) => c.id === id);
  const prevCase = currentIndex > 0 ? casesData[currentIndex - 1] : null;
  const nextCase = currentIndex < casesData.length - 1 ? casesData[currentIndex + 1] : null;

  const allAnswered = Object.values(answers).every((a) => a.trim().length > 0);

  return (
    <div className="min-h-screen bg-surface-1 text-text-primary">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-surface-1/90 backdrop-blur border-b border-border px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-text-muted hover:text-text-primary transition-colors text-sm shrink-0"
          >
            ← <span className="hidden sm:inline">Daftar Kasus</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-text-muted text-xs">
              {currentIndex + 1}/{casesData.length}
            </span>
            <h1 className="text-sm font-semibold text-text-primary truncate max-w-[200px]">
              {caseData.title}
            </h1>
            {isCompleted && (
              <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full">
                ✓ Selesai
              </span>
            )}
          </div>
          <div className="shrink-0 w-20" /> {/* spacer */}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Context */}
        <div className="mb-5 p-4 bg-surface-2 rounded-xl border border-border">
          <div className="text-xs text-text-muted font-medium uppercase tracking-widest mb-1">Konteks</div>
          <p className="text-text-secondary text-sm leading-relaxed">{caseData.context}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Chart + Mode Toggle */}
          <div className="space-y-5">
            {/* Chart */}
            <div className="bg-surface-2 rounded-2xl border border-border p-4">
              <div className="h-72 md:h-80">
                <ChartView caseData={caseData} />
              </div>
            </div>

            {/* Mode Toggle */}
            <div>
              <div className="text-xs text-text-muted mb-2 font-medium">
                Mode jawaban contoh:
              </div>
              <ModeToggle mode={mode} onChange={setMode} />
              <div className={`mt-3 p-3 rounded-xl text-xs leading-relaxed ${
                mode === 'da'
                  ? 'bg-blue-500/10 border border-blue-500/20 text-blue-200'
                  : 'bg-purple-500/10 border border-purple-500/20 text-purple-200'
              }`}>
                {mode === 'da' ? (
                  <><strong>Data Analyst:</strong> Fokus pada tren, perbandingan, KPI, dan rekomendasi bisnis. Pertanyaan utama: <em>apa yang terjadi dan apa dampaknya?</em></>
                ) : (
                  <><strong>Data Scientist:</strong> Fokus pada signifikansi statistik, korelasi vs kausalitas, distribusi, dan prediksi. Pertanyaan utama: <em>apakah ini pola nyata atau kebetulan?</em></>
                )}
              </div>
            </div>

            {/* Show Sample Button */}
            {!showSample && (
              <button
                onClick={handleShowSample}
                disabled={!allAnswered}
                className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  allAnswered
                    ? 'bg-gradient-to-r from-accent-da to-accent-ds text-white hover:opacity-90 shadow-lg shadow-blue-500/20'
                    : 'bg-surface-2 border border-border text-text-muted cursor-not-allowed'
                }`}
              >
                {allAnswered
                  ? '✨ Lihat Jawaban Contoh'
                  : `Jawab semua pertanyaan dulu (${Object.values(answers).filter(a => a.trim()).length}/4)`}
              </button>
            )}

            {/* Navigation */}
            <div className="flex gap-3">
              {prevCase && (
                <Link
                  to={`/case/${prevCase.id}`}
                  className="flex-1 py-2.5 px-4 bg-surface-2 border border-border rounded-xl text-xs text-center text-text-muted hover:text-text-primary hover:border-border/80 transition-all"
                >
                  ← {prevCase.title}
                </Link>
              )}
              {nextCase && (
                <Link
                  to={`/case/${nextCase.id}`}
                  className="flex-1 py-2.5 px-4 bg-surface-2 border border-border rounded-xl text-xs text-center text-text-muted hover:text-text-primary hover:border-border/80 transition-all"
                >
                  {nextCase.title} →
                </Link>
              )}
            </div>
          </div>

          {/* Right: Form + Sample Answer */}
          <div className="space-y-5">
            <AnswerForm
              answers={answers}
              onChange={handleAnswerChange}
              caseData={caseData}
            />

            {showSample && (
              <div className="bg-surface-2 rounded-2xl border border-border p-4">
                <SampleAnswer
                  sampleAnswers={caseData.sampleAnswers}
                  mode={mode}
                  userAnswers={answers}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
