import 'dotenv/config';
import { MongoClient } from 'mongodb';
import * as cheerio from 'cheerio';

const HF_KEY = process.env.HUGGINGFACE_API_KEY;
const MONGO_URI = process.env.MONGODB_URI;

async function getEmbedding(text) {
  const res = await fetch(
    'https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HF_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: text }),
    }
  );
  const data = await res.json();
  // HF sometimes returns [[...]] for single input
  return Array.isArray(data[0]) ? data[0] : data;
}

async function crawl(url) {
  const html = await (await fetch(url)).text();
  const $ = cheerio.load(html);
  $('script, style, nav, footer, header').remove();
  return $('body').text().replace(/\s+/g, ' ').trim();
}

function chunkText(text, size = 500, overlap = 50) {
  const chunks = [];
  for (let i = 0; i < text.length; i += size - overlap) {
    chunks.push(text.slice(i, i + size));
  }
  return chunks;
}

async function main() {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  const db = client.db('recreators');
  const col = db.collection('knowledge');
  await col.deleteMany({});

  const urls = [
    'https://recreators-main.vercel.app/',
    'https://recreators-main.vercel.app/about',
    'https://recreators-main.vercel.app/project-list',
    'https://recreators-main.vercel.app/how-we-work',
    'https://recreators-main.vercel.app/career',
    'https://recreators-main.vercel.app/blog',
    'https://recreators-main.vercel.app/pricing',
    'https://recreators-main.vercel.app/pay-now',
    'https://recreators-main.vercel.app/faqs',
    'https://recreators-main.vercel.app/privacy-policy',
    'https://recreators-main.vercel.app/terms-conditions',
    'https://recreators-main.vercel.app/packaging',
    'https://recreators-main.vercel.app/web-development-&-design',
    'https://recreators-main.vercel.app/seo',
    'https://recreators-main.vercel.app/digital-marketing',
    'https://recreators-main.vercel.app/brand-design',
    'https://recreators-main.vercel.app/photography-&-videography',
    'https://recreators-main.vercel.app/e-commerce',
    'https://recreators-main.vercel.app/content-writing',
    'https://recreators-main.vercel.app/contact',
    'https://recreators-main.vercel.app/designing-&-editing',
    'https://recreators-main.vercel.app/download-pdf',
    'https://recreators-main.vercel.app/crm-development',
  ];

  for (const url of urls) {
    try {
      console.log('Indexing:', url);
      const text = await crawl(url);
      const chunks = chunkText(text);
      for (const chunk of chunks) {
        if (chunk.trim().length < 30) continue;
        const embedding = await getEmbedding(chunk);
        await col.insertOne({ text: chunk, url, embedding });
        // small delay to avoid HF rate limits
        await new Promise((r) => setTimeout(r, 300));
      }
    } catch (err) {
      console.error('Failed:', url, err.message);
    }
  }

  await client.close();
  console.log('✅ Done indexing');
}

main().catch(console.error);