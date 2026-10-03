import 'dotenv/config';
import fetch from 'node-fetch';
import { MongoClient } from 'mongodb';
import * as cheerio from 'cheerio';

const COHERE_KEY = process.env.COHERE_API_KEY;
const MONGO_URI = process.env.MONGO_URI;
const BASE_URL = 'http://127.0.0.1:3000';

async function getEmbedding(text) {
  const res = await fetch('https://api.cohere.com/v1/embed', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${COHERE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      texts: [text],
      model: 'embed-english-light-v3.0',
      input_type: 'search_document',
      truncate: 'END',
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error('   ❌ Cohere error:', data);
    throw new Error(data.message || 'Cohere API failed');
  }

  return data.embeddings[0];
}

async function crawl(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      Accept: 'text/html,application/xhtml+xml',
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();
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
  console.log('Mongo URI:', MONGO_URI ? '✅' : '❌');
  console.log('Cohere Key:', COHERE_KEY ? '✅' : '❌');
  if (!MONGO_URI || !COHERE_KEY) process.exit(1);

  // Frontend check
  try {
    const test = await fetch(BASE_URL);
    if (!test.ok) throw new Error(`HTTP ${test.status}`);
    console.log(`✅ Frontend running at ${BASE_URL}`);
  } catch {
    console.error(`❌ Frontend NOT running at ${BASE_URL}`);
    process.exit(1);
  }

  const client = new MongoClient(MONGO_URI);
  await client.connect();
  console.log('✅ MongoDB connected');

  const db = client.db('recreators');
  const col = db.collection('knowledge');
  await col.deleteMany({});
  console.log('🗑️  Cleared old data\n');

  const urls = [
    `${BASE_URL}/`,
    `${BASE_URL}/about`,
    `${BASE_URL}/project-list`,
    `${BASE_URL}/how-we-work`,
    `${BASE_URL}/career`,
    `${BASE_URL}/blog`,
    `${BASE_URL}/pricing`,
    `${BASE_URL}/pay-now`,
    `${BASE_URL}/faqs`,
    `${BASE_URL}/privacy-policy`,
    `${BASE_URL}/terms-conditions`,
    `${BASE_URL}/packaging`,
    `${BASE_URL}/seo`,
    `${BASE_URL}/digital-marketing`,
    `${BASE_URL}/brand-design`,
    `${BASE_URL}/e-commerce`,
    `${BASE_URL}/content-writing`,
    `${BASE_URL}/contact`,
    `${BASE_URL}/crm-development`,
  ];

  let totalChunks = 0;
  let successPages = 0;
  let failedPages = 0;

  for (const url of urls) {
    try {
      console.log('Indexing:', url);
      const text = await crawl(url);
      const chunks = chunkText(text);
      let saved = 0;

      for (const chunk of chunks) {
        if (chunk.trim().length < 30) continue;
        const embedding = await getEmbedding(chunk);
        await col.insertOne({ text: chunk, url, embedding });
        saved++;
        totalChunks++;
        await new Promise((r) => setTimeout(r, 300));
      }
      console.log(`  ✅ Saved ${saved} chunks\n`);
      successPages++;
    } catch (err) {
      console.error(`  ❌ Failed: ${err.message}\n`);
      failedPages++;
    }
  }

  await client.close();
  console.log('========================================');
  console.log(`✅ Done indexing`);
  console.log(`   Success: ${successPages} pages`);
  console.log(`   Failed:  ${failedPages} pages`);
  console.log(`   Total chunks: ${totalChunks}`);
  console.log('========================================');
}

main().catch(console.error);