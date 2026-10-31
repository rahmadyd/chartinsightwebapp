// POST /api/generate
// Key dibaca dari env di server, tidak pernah dikirim ke browser.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  const model = process.env.GROQ_MODEL;

  if (!apiKey) return res.status(500).json({ error: 'GROQ_API_KEY belum diisi di environment variables.' });
  if (!model) return res.status(500).json({ error: 'GROQ_MODEL belum diisi di environment variables.' });

  const { messages } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Body harus berisi 'messages' (array)." });
  }

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ model, messages }),
    });
    const data = await groqRes.json();
    return res.status(groqRes.status).json(data);
  } catch (err) {
    return res.status(502).json({ error: 'Gagal menghubungi Groq.', detail: String(err) });
  }
}
