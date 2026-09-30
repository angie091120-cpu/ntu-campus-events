// /api/track.js — 事件記錄端點
// POST { type: "click" | "view", eventId: "e1" } 或 { type: "view", eventIds: ["e1","e2"] }

import { Redis } from '@upstash/redis';
import { loadEventIndex } from './_sheet.js';

const redis = Redis.fromEnv();

// 限流：每個來源 IP 每 60 秒最多 30 次請求
const RATE_LIMIT_MAX = 30;
const RATE_LIMIT_WINDOW_SEC = 60;
const ID_RE = /^[a-zA-Z0-9_-]{1,50}$/;

function clientIp(req) {
  const xff = req.headers['x-forwarded-for'];
  const first = (Array.isArray(xff) ? xff[0] : xff || '').split(',')[0].trim();
  return first || (req.socket && req.socket.remoteAddress) || 'unknown';
}

async function overRateLimit(ip) {
  const key = `rl:track:${ip}`;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, RATE_LIMIT_WINDOW_SEC);
  return count > RATE_LIMIT_MAX;
}

export default async function handler(req, res) {
  // 網站同源呼叫，不開 CORS
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  try {
    if (await overRateLimit(clientIp(req))) {
      return res.status(429).json({ error: 'too many requests' });
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { type } = body;

    if (type !== 'click' && type !== 'view') {
      return res.status(400).json({ error: 'invalid type' });
    }

    let ids = [];
    if (body.eventId) ids = [body.eventId];
    if (Array.isArray(body.eventIds)) ids = body.eventIds;
    ids = ids
      .filter(id => typeof id === 'string' && ID_RE.test(id))
      .slice(0, 100);

    if (ids.length === 0) {
      return res.status(400).json({ error: 'no valid eventId(s)' });
    }

    // id 必須存在於活動試算表；讀不到試算表就不寫入
    let index;
    try {
      index = await loadEventIndex();
    } catch (err) {
      console.error('[track] sheet error', err);
      return res.status(503).json({ error: 'event list unavailable' });
    }
    ids = ids.filter(id => index.has(id));
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
