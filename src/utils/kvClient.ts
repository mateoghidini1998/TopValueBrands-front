import { createClient } from '@vercel/kv';
import dotenv from 'dotenv';

dotenv.config({ path: './.env.development.local' });

const kvUrl = process.env.KV_REST_API_URL;
const kvToken = process.env.KV_REST_API_TOKEN;

if (!kvUrl || !kvToken) {
  throw new Error("Missing Vercel KV configuration");
}

console.log('KV_REST_API_URL:', kvUrl);
console.log('KV_REST_API_TOKEN:', kvToken);

const kv = createClient({
  url: kvUrl!,
  token: kvToken!,
});

export default kv;
