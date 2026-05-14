// /api/track.js — 事件記錄端點
// POST { type: "click" | "view", eventId: "e1" } 或 { type: "view", eventIds: ["e1","e2"] }

import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { type } = body;

    if (type !== 'click' && type !== 'view') {
      return res.status(400).json({ error: 'invalid type' });
    }

    let ids = [];
    if (body.eventId) ids = [body.eventId];
    if (Array.isArray(body.eventIds)) ids = body.eventIds;
    ids = ids
      .filter(id => typeof id === 'string' && /^[a-zA-Z0-9_-]+$/.test(id))
      .slice(0, 100);

    if (ids.length === 0) {
      return res.status(400).json({ error: 'no valid eventId(s)' });
    }

    // 批次累加：click:e1, click:e2 ... 或 view:e1 ...
    const pipeline = redis.pipeline();
    for (const id of ids) {
      pipeline.incr(`${type}:${id}`);
    }
    pipeline.incrby(`total:${type}`, ids.length);
    await pipeline.exec();

    return res.status(200).json({ ok: true, recorded: ids.length });
  } catch (err) {
    console.error('[track] error', err);
    return res.status(500).json({ error: 'internal error', detail: String(err) });
  }
}
