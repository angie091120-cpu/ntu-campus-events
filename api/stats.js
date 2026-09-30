// /api/stats.js — 後台讀統計
// GET /api/stats?key=XXX

import { timingSafeEqual } from 'crypto';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

// fail-closed：ADMIN_KEY 沒設或空字串一律拒絕；比對用常數時間（先比長度）
function isAuthorized(providedKey) {
  const adminKey = process.env.ADMIN_KEY || '';
  if (!adminKey) return false;
  if (typeof providedKey !== 'string' || !providedKey) return false;
  const a = Buffer.from(providedKey, 'utf8');
  const b = Buffer.from(adminKey, 'utf8');
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  const providedKey = req.query.key || req.headers['x-admin-key'];
  if (!isAuthorized(providedKey)) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  try {
    // 掃出所有 click:* 和 view:* 的 key
    // Upstash Redis 用 scan 而不是 scanIterator
    const clickKeys = await scanAll('click:*');
    const viewKeys = await scanAll('view:*');

    const stats = {};

    // 取所有 click 計數
    if (clickKeys.length > 0) {
      const clickValues = await redis.mget(...clickKeys);
      clickKeys.forEach((k, i) => {
        const id = k.replace(/^click:/, '');
        if (!stats[id]) stats[id] = { clicks: 0, views: 0 };
        stats[id].clicks = Number(clickValues[i]) || 0;
      });
    }

    // 取所有 view 計數
    if (viewKeys.length > 0) {
      const viewValues = await redis.mget(...viewKeys);
      viewKeys.forEach((k, i) => {
        const id = k.replace(/^view:/, '');
        if (!stats[id]) stats[id] = { clicks: 0, views: 0 };
        stats[id].views = Number(viewValues[i]) || 0;
      });
    }

    // 全站總計
    const totals = await redis.mget('total:click', 'total:view');

    return res.status(200).json({
      ok: true,
      totals: {
        clicks: Number(totals[0]) || 0,
        views: Number(totals[1]) || 0,
      },
      events: stats,
    });
  } catch (err) {
    console.error('[stats] error', err);
    return res.status(500).json({ error: 'internal error', detail: String(err) });
  }
}

// Upstash Redis 用 scan 反覆呼叫直到 cursor 回 0
async function scanAll(pattern) {
  const keys = [];
  let cursor = '0';
  do {
    const result = await redis.scan(cursor, { match: pattern, count: 100 });
    // Upstash 回傳 [newCursor, keys]
    cursor = result[0];
    if (Array.isArray(result[1])) keys.push(...result[1]);
  } while (cursor !== '0' && cursor !== 0);
  return keys;
}
