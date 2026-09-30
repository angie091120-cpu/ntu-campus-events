// /api/go.js — 中繼跳轉
// /go?id=e1&url=https://... 記錄點擊後 302 到真實連結
// 只轉到試算表上該 id 登記的「連結」或「報名連結」；對不上、id 不存在、
// 試算表讀不到時一律 302 到站內 /events，且不累加點擊。

import { Redis } from '@upstash/redis';
import { loadEventIndex, normalizeUrl } from './_sheet.js';

const FALLBACK_PATH = '/events';

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

    res.setHeader('Cache-Control', 'no-store');

    // 與試算表登記的連結比對（兩邊同樣正規化）
    const wanted = normalizeUrl(url);
    let matched = false;
    try {
      const index = await loadEventIndex();
      const entry = index.get(id);
      matched = Boolean(wanted && entry && entry.links.has(wanted));
    } catch (err) {
      console.error('[go] sheet error', err);
      matched = false;
    }

    if (!matched) {
      return res.redirect(302, FALLBACK_PATH);
    }

    // 記錄點擊（不阻塞跳轉）
    redis.pipeline()
      .incr(`click:${id}`)
      .incr('total:click')
      .exec()
      .catch(err => console.error('[go] redis error', err));

    return res.redirect(302, wanted);
  } catch (err) {
    console.error('[go] error', err);
    return res.status(500).send('internal error');
  }
}
