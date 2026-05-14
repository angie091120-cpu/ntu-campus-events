// /api/go.js — 中繼跳轉
// /go?id=e1&url=https://... 記錄點擊後 302 到真實連結

import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  try {
    const { id, url } = req.query;

    if (!id || typeof id !== 'string' || !/^[a-zA-Z0-9_-]{1,50}$/.test(id)) {
      return res.status(400).send('invalid id');
    }
    if (!url || typeof url !== 'string') {
      return res.status(400).send('missing url');
    }
    let targetUrl;
    try {
      targetUrl = new URL(url);
      if (!['http:', 'https:'].includes(targetUrl.protocol)) {
        return res.status(400).send('invalid url protocol');
      }
    } catch {
      return res.status(400).send('invalid url');
    }

    // 記錄點擊（不阻塞跳轉）
    redis.pipeline()
      .incr(`click:${id}`)
      .incr('total:click')
      .exec()
      .catch(err => console.error('[go] redis error', err));

    res.setHeader('Cache-Control', 'no-store');
    return res.redirect(302, targetUrl.toString());
  } catch (err) {
    console.error('[go] error', err);
    return res.status(500).send('internal error');
  }
}
