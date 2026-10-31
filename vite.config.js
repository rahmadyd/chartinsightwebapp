import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'local-api-generate',
        configureServer(server) {
          server.middlewares.use('/api/generate', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Method not allowed' }));
              return;
            }

            let bodyStr = '';
            req.on('data', chunk => { bodyStr += chunk; });
            req.on('end', async () => {
              const apiKey = env.GROQ_API_KEY || process.env.GROQ_API_KEY;
              const primaryModel = env.GROQ_MODEL || process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
              const fallbackModel = env.GROQ_FALLBACK_MODEL || process.env.GROQ_FALLBACK_MODEL || 'llama-3.1-8b-instant';

              if (!apiKey) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'GROQ_API_KEY belum diisi di .env.local atau Vercel' }));
                return;
              }

              let body = {};
              try { body = JSON.parse(bodyStr); } catch (e) {}

              const { category = 'Semua', complexity = 2, seed = 482910 } = body;

              const systemPrompt = `Kamu adalah pakar analitik data senior (Data Analyst & Data Scientist) yang bertugas membuat studi kasus grafik edukatif untuk pemula di aplikasi "Chart Insight Lab".

Tugasmu: Hasilkan 1 studi kasus grafik baru dalam format JSON VALID (RFC 8259).
Kategori: ${category === 'Semua' ? 'Pilih salah satu dari: Finance, E-Commerce, Digital Marketing, SaaS & Product, Healthcare, atau Social Media' : category}.
Tingkat Kesulitan: ${complexity === 1 ? 'Pemula / Sederhana' : complexity === 2 ? 'Menengah / Standar' : 'Lanjutan / Kompleks'}.
Seed Acak: ${seed}.

Format JSON WAJIB memiliki properti berikut:
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
}`;

              async function callGroq(model) {
                return fetch('https://api.groq.com/openai/v1/chat/completions', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`,
                  },
                  body: JSON.stringify({
                    model,
                    messages: [
                      { role: 'system', content: systemPrompt },
                      { role: 'user', content: `Buatkan studi kasus grafik baru tema ${category} seed ${seed}.` },
                    ],
                    response_format: { type: 'json_object' },
                    temperature: 0.7,
                  }),
                });
              }

              try {
                let groqRes = await callGroq(primaryModel);
                let usedModel = primaryModel;

                if (!groqRes.ok && fallbackModel && fallbackModel !== primaryModel) {
                  usedModel = fallbackModel;
                  groqRes = await callGroq(fallbackModel);
                }

                if (!groqRes.ok) {
                  const errText = await groqRes.text();
                  res.statusCode = groqRes.status;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: `Groq Error (${groqRes.status})`, detail: errText }));
                  return;
                }

                const data = await groqRes.json();
                const content = data.choices?.[0]?.message?.content;
                const parsed = JSON.parse(content);
                parsed.seed = seed;
                parsed.source = `Groq AI (${usedModel})`;

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(parsed));
              } catch (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Gagal memproses Groq', detail: String(err) }));
              }
            });
          });
        },
      },
    ],
  };
});
