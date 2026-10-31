// POST /api/generate
// Vercel Serverless Function connecting to Groq API

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  const primaryModel = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
  const fallbackModel = process.env.GROQ_FALLBACK_MODEL || 'llama-3.1-8b-instant';

  if (!apiKey) {
    return res.status(500).json({
      error: 'GROQ_API_KEY belum diisi di environment variables Vercel atau .env.local',
    });
  }

  const { category = 'Semua', complexity = 2, seed = 482910 } = req.body || {};

  const systemPrompt = `Kamu adalah pakar analitik data senior (Data Analyst & Data Scientist) yang bertugas membuat studi kasus grafik edukatif untuk pemula di aplikasi "Chart Insight Lab".

Tugasmu: Hasilkan 1 studi kasus grafik baru dalam format JSON VALID (RFC 8259).
Kategori: ${category === 'Semua' ? 'Pilih salah satu dari: Finance, E-Commerce, Digital Marketing, SaaS & Product, Healthcare, atau Social Media' : category}.
Tingkat Kesulitan: ${complexity === 1 ? 'Pemula / Sederhana' : complexity === 2 ? 'Menengah / Standar' : 'Lanjutan / Kompleks'}.
Seed Acak: ${seed}.

Format JSON WAJIB memiliki properti berikut (jangan tambahkan teks pembuka/penutup, hanya JSON murni):
{
  "title": "Judul studi kasus yang menarik dan realistis",
  "category": "Kategori industri (Finance / E-Commerce / Digital Marketing / SaaS & Product / Healthcare / Social Media)",
  "chartType": "line atau bar atau scatter",
  "xLabel": "Label Sumbu X",
  "yLabel": "Label Sumbu Y",
  "labels": ["L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8"],
  "values": [120, 140, 130, 160, 480, 210, 180, 175],
  "scatterData": [{"x": 1.2, "y": 4.5}],
  "problem": "Deskripsi masalah bisnis/kasus nyata dalam 1-2 kalimat ringkas.",
  "quickAnswer": "Kunci jawaban kilat to-the-point (TL;DR).",
  "reasoning": "Alasan logis kenapa polanya begitu dan cara membacanya.",
  "daAction": "Rekomendasi tindakan bisnis konkret untuk Data Analyst.",
  "daKpi": ["Metrik 1", "Metrik 2", "Metrik 3"],
  "dsAnalysis": "Penjelasan karakteristik statistik dan validasi untuk Data Scientist.",
  "dsAlgorithms": ["Algoritma 1", "Algoritma 2", "Algoritma 3"],
  "dsLibraries": ["scikit-learn", "statsmodels", "scipy.stats"],
  "dos": ["Hal yang harus dilakukan 1", "Hal yang harus dilakukan 2"],
  "donts": ["Hal yang harus dihindari 1", "Hal yang harus dihindari 2"]
}

Catatan penting:
- Untuk chartType 'line' dan 'bar': isi array 'labels' dan 'values' dengan 8-12 titik data angka yang masuk akal dan mencerminkan pola di kasus. 'scatterData' boleh dikosongkan [].
- Untuk chartType 'scatter': isi 'scatterData' dengan minimal 15-20 titik {x, y}. 'labels' dan 'values' boleh dikosongkan [].
- Berikan insight yang tajam, edukatif, dan praktis bagi pemula!`;

  async function callGroq(modelToUse) {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: modelToUse,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Buatkan studi kasus grafik baru dengan tema ${category} dan seed ${seed}.` },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
      }),
    });
    return groqRes;
  }

  try {
    let resData = null;
    let usedModel = primaryModel;

    // 1. Coba Primary Model
    let groqRes = await callGroq(primaryModel);

    // 2. Jika gagal atau rate limit, coba Fallback Model
    if (!groqRes.ok && fallbackModel && fallbackModel !== primaryModel) {
      console.warn(`Primary model ${primaryModel} gagal (${groqRes.status}), mencoba fallback ${fallbackModel}...`);
      usedModel = fallbackModel;
      groqRes = await callGroq(fallbackModel);
    }

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      return res.status(groqRes.status).json({
        error: `Groq API Error (${groqRes.status})`,
        detail: errText,
      });
    }

    const data = await groqRes.json();
    const content = data.choices?.[0]?.message?.content;
    const parsedCase = JSON.parse(content);
    parsedCase.seed = seed;
    parsedCase.source = `Groq AI (${usedModel})`;

    return res.status(200).json(parsedCase);
  } catch (err) {
    return res.status(500).json({
      error: 'Gagal memproses respons dari Groq.',
      detail: String(err),
    });
  }
}
