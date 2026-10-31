# Plan App Web: Chart Insight Lab

> Tujuan utama: aku sendiri yang belajar membaca grafik dari sudut pandang **Data Analyst (DA)** dan **Data Scientist (DS)**. Aplikasi dibangun sambil belajar, jadi setiap fitur muncul setelah aku paham konsepnya.

---

## 1. Ringkasan

| Item | Isi |
|---|---|
| Nama sementara | Chart Insight Lab |
| Tipe | Web app, frontend + 1 serverless function |
| Pengguna awal | Aku sendiri (pemula), nanti bisa dibuka untuk orang lain |
| Inti | Lihat grafik, jawab 4 pertanyaan, bandingkan dengan jawaban contoh DA dan DS |
| Generator kasus | Template skenario + data acak (rule-based), dikembangkan dengan LLM Groq |
| Deploy | Vercel |
| API key | Groq, diisi manual di Environment Variables Vercel (tidak ditulis di kode) |
| Nilai tambah | Portofolio frontend + bukti belajar data |

---

## 2. Konsep Inti: 4 Pertanyaan Membaca Grafik

Setiap kasus selalu dijawab dengan pola yang sama:

1. **Ini grafik apa, mengukur apa?** (judul, sumbu X, sumbu Y, satuan, periode)
2. **Bentuknya bagaimana?** (naik, turun, datar, lonjakan, outlier, pola berulang)
3. **Kenapa mungkin begitu?** (hipotesis penyebab = insight)
4. **Lalu harus ngapain?** (rekomendasi)

### Dua sudut pandang

| | Data Analyst | Data Scientist |
|---|---|---|
| Pertanyaan utama | Apa yang terjadi dan apa dampaknya ke bisnis? | Apakah ini pola nyata atau kebetulan? Bisa diprediksi? |
| Fokus | Tren, perbandingan, segmentasi, KPI, rekomendasi | Distribusi, korelasi vs kausalitas, signifikansi, bias, prediksi |
| Contoh output | "Views turun 20%, adakan promo lagi" | "Apakah 20% ini di luar fluktuasi normal?" |

### Contoh latihan pertama (sedang dikerjakan)

Line chart views Reels per minggu: `[1200, 1350, 1300, 1500, 4800, 2100, 1700, 1650]` untuk M1 sampai M8.

- Q1 (contoh): line chart, X = minggu, Y = views Reels, melihat perubahan dari waktu ke waktu.
- Q2 (jawabanku): ...
- Q3 (jawabanku, 2 kemungkinan): ...
- Q4: dibahas setelah Q2 dan Q3 terisi.

Latihan ini jadi **kasus pertama** di aplikasi.

---

## 3. Fitur per Tahap

### Tahap 1: Belajar manual (belum perlu coding besar)
- Pilih 3 jenis grafik: **line, bar, scatter**
- Cari 5 contoh nyata per jenis (insight Reels/Carousel, penjualan, dll.)
- Jawab 4 pertanyaan dengan tulisan sendiri
- Output: kumpulan catatan belajar (bahan isi aplikasi)

### Tahap 2: MVP aplikasi (inti)
- [ ] Halaman daftar kasus (5-10 kasus buatan sendiri)
- [ ] Halaman kasus: 1 grafik + 4 kotak jawaban
- [ ] Tombol "Lihat jawaban contoh" (versi DA dan DS)
- [ ] Toggle **Mode DA / Mode DS**
- [ ] Simpan jawaban di browser (localStorage)
- [ ] Glosarium istilah sebagai tooltip (mean, median, outlier, tren, korelasi)

### Tahap 3: Latihan dan variasi
- [ ] Kuis pilihan ganda "insight mana yang benar?"
- [ ] Mode **Misleading Chart** (sumbu dipotong, dual axis, pie terlalu banyak irisan)
- [ ] Tambah jenis grafik: histogram, boxplot, heatmap
- [ ] Progress tracker (kasus selesai, jenis grafik yang dikuasai)

### Tahap 4: Generator kasus acak (lihat bagian 4)
- [ ] Template skenario + generator data
- [ ] Tombol "Kasus Baru" dengan seed acak
- [ ] Link berbagi kasus lewat seed
- [ ] Upload CSV kecil untuk eksplorasi sendiri

### Tahap 5: Integrasi Groq (lihat bagian 5)
- [ ] Endpoint `/api/generate` di Vercel
- [ ] LLM membuat skenario baru (JSON), data tetap dibuat oleh kode
- [ ] Feedback AI atas jawaban tulisan
- [ ] Opsional: badge, streak, mode presentasi insight

---

## 4. Generator Kasus Acak

**Prinsip:** jangan generate gambar grafik secara acak. Generate **data** dari template skenario, lalu render grafik dari data itu. Pola yang benar sudah ditanam, jadi jawaban bisa dinilai otomatis.

### Tiga lapis
1. **Template skenario** (manual, "otaknya"): konteks, metrik, jenis grafik, pola tersembunyi.
2. **Generator data**: fungsi yang membuat data acak berdasarkan pola.
3. **Renderer grafik**: Chart.js menggambar datanya.

### Contoh template

```js
const scenarios = [
  {
    id: "ecom-sales-dip",
    context: "Toko online fashion, penjualan harian 90 hari",
    chart: "line",
    hiddenPattern: "drop",
    generate: (rand) => {
      const data = [];
      for (let d = 1; d <= 90; d++) {
        let base = 100 + d * 0.3;                        // tren naik pelan
        base += 15 * Math.sin((d / 7) * 2 * Math.PI);    // musiman mingguan
        if (d > 60) base *= 0.7;                         // pola tersembunyi: turun 30%
        data.push({ day: d, sales: Math.round(base + rand(-8, 8)) });
      }
      return data;
    },
    questions: [
      { q: "Apa insight utama?", answer: "Penjualan turun sekitar 30% sejak hari ke-60" }
    ]
  }
];
```

### Yang diacak
- **Seed random**: angka awal, noise, tanggal mulai, besar efek (pakai `seedrandom` agar kasus bisa diulang/dibagikan)
- **Konteks**: nama produk, kota, kategori
- **Parameter pola**: tanggal drop, besar kenaikan, jumlah outlier

### Pola yang bisa ditanam

| Pola | Cocok untuk grafik | Sudut pandang |
|---|---|---|
| Tren naik/turun | line | DA |
| Musiman | line | DA |
| Outlier | boxplot, scatter | DS |
| Korelasi semu (confounder) | scatter | DS |
| Simpson's paradox | bar grouped | DS |
| Sampel bias / sampel kecil | histogram | DS |
| Sumbu menyesatkan | bar | keduanya |

### Dua level
- **Level 1 (rule-based, tanpa AI):** template + generator. Gratis, cepat, jawaban pasti benar. Dipakai untuk MVP.
- **Level 2 (dengan LLM Groq):** LLM membuat skenario baru dalam format JSON (konteks, parameter pola, pertanyaan). **Data tetap dibuat oleh kode**, bukan oleh LLM, karena angka karangan LLM sering tidak konsisten dengan insight yang diklaim.

### Alur di aplikasi
1. Klik **"Kasus Baru"**, pilih level/topik
2. Sistem pilih template + seed, generate data, render grafik
3. Aku menjawab 4 pertanyaan
4. Muncul pembahasan: pola yang ditanam + cara DA vs DS membacanya

---

## 5. Setup Groq + Vercel

Pembagian tugas:
- **Claude:** menyediakan wadah (file template env dan endpoint), tanpa mengisi key apa pun.
- **Aku:** mengisi `GROQ_API_KEY` dan `GROQ_MODEL` sendiri di Environment Variables Vercel.

### File 1: `.env.example` (kosong)

```
# Salin jadi .env.local untuk development lokal.
# Di Vercel: Project Settings > Environment Variables.
# JANGAN commit .env.local atau key asli ke GitHub.

GROQ_API_KEY=
GROQ_MODEL=
```

### File 2: `api/generate.js` (serverless function)

```js
// POST /api/generate
// Key dibaca dari env di server, tidak pernah dikirim ke browser.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GROQ_API_KEY;
  const model = process.env.GROQ_MODEL;

  if (!apiKey) return res.status(500).json({ error: "GROQ_API_KEY belum diisi." });
  if (!model) return res.status(500).json({ error: "GROQ_MODEL belum diisi." });

  const { messages } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Body harus berisi 'messages' (array)." });
  }

  try {
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ model, messages }),
    });
    const data = await groqRes.json();
    return res.status(groqRes.status).json(data);
  } catch (err) {
    return res.status(502).json({ error: "Gagal menghubungi Groq.", detail: String(err) });
  }
}
```

### Pemanggilan dari frontend

```js
const res = await fetch("/api/generate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    messages: [{ role: "user", content: "Buat skenario kasus line chart..." }],
  }),
});
const data = await res.json();
```

### Checklist deploy
- [ ] Folder `api/` sejajar dengan `src/`
- [ ] `.env.local` masuk `.gitignore`
- [ ] Isi `GROQ_API_KEY` dan `GROQ_MODEL` di Vercel (cek model aktif di console Groq)
- [ ] Jangan pakai prefix `VITE_` untuk key (akan terekspos ke browser)
- [ ] Redeploy setelah mengubah environment variables

---

## 6. Tech Stack

| Kebutuhan | Pilihan | Alasan |
|---|---|---|
| Struktur | Vite + React | Sesuai skill frontend, mudah dipublikasi |
| Grafik | **Chart.js** | Paling mudah untuk pemula |
| Styling | Tailwind CSS atau CSS biasa | Cepat |
| Penyimpanan | localStorage | Tanpa backend database |
| Data kasus | File JSON | Mudah ditambah manual |
| LLM | Groq via `/api/generate` | Gratis, key aman di server |
| Hosting | Vercel | Mendukung serverless function |
| Tahap 4+ | `seedrandom`, `simple-statistics`, `faker.js` | Generator dan statistik |

---

## 7. Struktur Data Satu Kasus (JSON)

```json
{
  "id": "reels-views-spike",
  "title": "Lonjakan views Reels",
  "level": "pemula",
  "chartType": "line",
  "context": "Views Reels sebuah akun selama 8 minggu.",
  "xLabel": "Minggu",
  "yLabel": "Views",
  "labels": ["M1","M2","M3","M4","M5","M6","M7","M8"],
  "values": [1200,1350,1300,1500,4800,2100,1700,1650],
  "sampleAnswers": {
    "q1": "Line chart: views Reels per minggu selama 8 minggu.",
    "q2": "Stabil di M1-M4, melonjak tajam di M5, lalu turun mendekati normal.",
    "da": {
      "q3": "Kemungkinan satu konten viral atau ikut tren di M5.",
      "q4": "Analisis konten M5, ulangi format/topiknya."
    },
    "ds": {
      "q3": "M5 adalah outlier. Cek apakah lonjakan di luar fluktuasi normal.",
      "q4": "Jangan jadikan M5 patokan. Bandingkan memakai median, bukan rata-rata."
    }
  },
  "glossary": ["outlier", "tren", "median"]
}
```

---

## 8. Struktur Folder

```
chart-insight-lab/
├─ api/
│  └─ generate.js
├─ public/
├─ src/
│  ├─ data/
│  │  └─ cases.json
│  ├─ generator/
│  │  ├─ scenarios.js
│  │  └─ random.js
│  ├─ components/
│  │  ├─ ChartView.jsx
│  │  ├─ AnswerForm.jsx
│  │  ├─ SampleAnswer.jsx
│  │  ├─ ModeToggle.jsx
│  │  └─ GlossaryTooltip.jsx
│  ├─ pages/
│  │  ├─ Home.jsx
│  │  └─ CasePage.jsx
│  ├─ utils/
│  │  └─ storage.js
│  └─ App.jsx
├─ .env.example
├─ .gitignore
├─ PLAN.md
└─ package.json
```

---

## 9. Roadmap

| Minggu | Target |
|---|---|
| 1 | Tahap 1: pelajari line, bar, scatter; tulis 15 catatan kasus |
| 2 | Setup proyek, komponen grafik, 5 kasus pertama |
| 3 | Form 4 jawaban, jawaban contoh, toggle DA/DS, localStorage |
| 4 | Glosarium, 10 kasus, rapikan UI, deploy ke Vercel (MVP selesai) |
| 5-6 | Tahap 3: kuis dan misleading chart |
| 7-8 | Tahap 4: generator acak rule-based |
| 9+ | Tahap 5: integrasi Groq (skenario LLM + feedback jawaban) |

---

## 10. Kriteria Selesai MVP

- [ ] Minimal 8 kasus dengan 3 jenis grafik
- [ ] Tiap kasus punya jawaban contoh DA dan DS
- [ ] Jawabanku tersimpan setelah refresh
- [ ] Bisa dipakai di HP
- [ ] Sudah online di Vercel dan bisa dibagikan linknya

---

## 11. Risiko dan Catatan

- **Aku belum paham materinya:** jangan membangun fitur yang belum dipahami. Belajar dulu, baru bangun.
- **Terlalu banyak fitur di awal:** patuhi urutan tahap. MVP cukup 1 grafik + 4 jawaban.
- **Jawaban contoh salah/asal:** tulis dari hasil belajar dan cek ke sumber yang jelas.
- **Generator terlalu cepat:** ditunda ke Tahap 4 supaya aku tahu pola apa yang mau ditanam.
- **LLM mengarang angka:** LLM hanya membuat parameter skenario, data dihitung oleh kode.
- **Key bocor:** key hanya di env Vercel dan `.env.local`, tidak di kode frontend maupun GitHub.
- **Batas pemakaian Groq:** tambahkan penanganan error dan batasi jumlah request dari frontend.

---

## 12. Langkah Berikutnya

1. Jawab Q2 dan Q3 latihan Reels, lalu bahas Q4 bersama Claude
2. Kumpulkan 5 contoh line chart untuk dibahas
3. Setup proyek Vite + Chart.js dan tampilkan satu grafik
4. Taruh `.env.example` dan `api/generate.js`, isi env di Vercel
