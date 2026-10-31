# Chart Insight Lab 🧪

Aplikasi web untuk belajar membaca grafik dari sudut pandang **Data Analyst (DA)** dan **Data Scientist (DS)**.

## Cara Pakai

1. Pilih kasus dari daftar
2. Baca konteks + lihat grafik
3. Jawab 4 pertanyaan analisis
4. Klik "Lihat Jawaban Contoh" untuk membandingkan perspektif DA vs DS

## Tech Stack

- **Vite + React** — struktur proyek
- **Chart.js + react-chartjs-2** — render grafik
- **Tailwind CSS v4** — styling
- **react-router-dom** — navigasi
- **localStorage** — simpan jawaban di browser
- **Vercel** — hosting + serverless function untuk Groq API

## Development

```bash
npm install
npm run dev
```

## Deploy ke Vercel

1. Push ke GitHub
2. Import project di Vercel
3. Isi Environment Variables:
   - `GROQ_API_KEY` = key dari console.groq.com
   - `GROQ_MODEL` = misal `llama-3.3-70b-versatile`
4. Deploy

**Jangan** gunakan prefix `VITE_` untuk API key — akan terekspos ke browser!

## Struktur Kasus (JSON)

Tambah kasus baru di `src/data/cases.json`. Format lengkap ada di `PLAN.md`.

## Roadmap

Lihat `PLAN.md` untuk roadmap lengkap Tahap 1-5.
