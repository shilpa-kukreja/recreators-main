import { MongoClient } from 'mongodb';

let cachedClient = null;
let cachedDb = null;

async function getDb() {
  if (cachedDb) return cachedDb;
  if (!cachedClient) {
    cachedClient = new MongoClient(process.env.MONGODB_URI);
    await cachedClient.connect();
  }
  cachedDb = cachedClient.db('recreators');
  return cachedDb;
}

async function getEmbedding(text) {
  const res = await fetch(
    'https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: text }),
    }
  );
  const data = await res.json();
  return Array.isArray(data[0]) ? data[0] : data;
}

function cosineSimilarity(a, b) {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export async function POST(req) {
  try {
    const { message } = await req.json();
    if (!message?.trim()) {
      return Response.json({ answer: 'Please ask a question.' }, { status: 400 });
    }

    const db = await getDb();
    const col = db.collection('knowledge');
    const all = await col.find({}, { projection: { embedding: 1, text: 1, url: 1 } }).toArray();

    if (all.length === 0) {
      return Response.json({ answer: 'Knowledge base is empty. Run the indexing script first.' });
    }

    const queryEmb = await getEmbedding(message);
    const scored = all
      .map((doc) => ({ ...doc, score: cosineSimilarity(queryEmb, doc.embedding) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    const context = scored.map((d) => d.text).join('\n\n---\n\n');

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content: `You are the helpful assistant for ReCreators, a digital agency. Answer ONLY using the context below. If the answer isn't in the context, politely say you don't know and suggest contacting the team.

Context:
${context}`,
          },
          { role: 'user', content: message },
        ],
        temperature: 0.3,
        max_tokens: 500,
      }),
    });

    const data = await groqRes.json();
    const answer = data?.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';
    return Response.json({ answer });
  } catch (err) {
    console.error(err);
    return Response.json({ answer: 'Something went wrong.' }, { status: 500 });
  }
}