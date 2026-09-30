// /api/_sheet.js — 活動試算表共用模組（底線開頭，Vercel 不當成路由）
// 給 go.js 與 track.js 用：抓活動試算表 CSV → 解析 → 以 id 建索引，模組層快取 5 分鐘。
//
// 介面：
//   loadEventIndex() → Promise<Map<id, { links: Set<string> }>>
//     links 是該 id 的「連結」「報名連結」欄正規化後的網址（只收 http/https）。
//     讀不到或解析失敗時丟錯（呼叫端自己決定 302 /events 或 503），失敗結果不快取。
//   normalizeUrl(raw) → string | null   去頭尾空白＋new URL().toString()，非 http/https 回 null
//   parseCsv(text)    → string[][]      RFC 4180：雙引號包住的逗號、換行、"" 跳脫

// 與 events.js 的 SHEET_URL_EVENTS 相同
export const SHEET_URL_EVENTS = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTFDBkx0m-aeazHDsCVRCyj857qZt0jQVLgwaPx6EZM08I-osyv1MD3jUDSWqwiThp1zh2FfzH5BVyq/pub?output=csv';

const CACHE_TTL_MS = 5 * 60 * 1000;
const FETCH_TIMEOUT_MS = 5000;

let cache = null;      // { index, expiresAt }
let inflight = null;   // 同時多個請求只抓一次

export function normalizeUrl(raw) {
  if (typeof raw !== 'string') return null;
  const s = raw.trim();
  if (!s) return null;
  try {
    const u = new URL(s);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return null;
    return u.toString();
  } catch {
    return null;
  }
}

export function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  let i = 0;
  if (text.charCodeAt(0) === 0xfeff) i = 1; // 去 BOM

  for (; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else {
        field += c;
      }
      continue;
    }
    if (c === '"') inQuotes = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\r') { /* CRLF 的 \r 略過，換行以 \n 為準 */ }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else field += c;
  }
  if (inQuotes) throw new Error('csv: unterminated quoted field');
  if (field !== '' || row.length > 0) { row.push(field); rows.push(row); }
  // 跳過全空白列（對齊前端 Papa.parse skipEmptyLines）
  return rows.filter(r => r.some(v => v.trim() !== ''));
}

// 對齊 events.js parseEventsCsv：表頭 trim、id/標題 trim 後都要有值才算一筆活動
function buildIndex(csvText) {
  const rows = parseCsv(csvText);
  if (rows.length === 0) throw new Error('csv: empty');
  const header = rows[0].map(h => h.trim());
  const col = name => header.indexOf(name);
  const idCol = col('id');
  const titleCol = col('標題');
  const linkCols = [col('連結'), col('報名連結')].filter(n => n >= 0);
  if (idCol < 0) throw new Error('csv: missing id column');

  const index = new Map();
  for (const r of rows.slice(1)) {
    const id = (r[idCol] || '').trim();
    const title = titleCol >= 0 ? (r[titleCol] || '').trim() : '';
    if (!id || !title) continue;
    const entry = index.get(id) || { links: new Set() };
    for (const c of linkCols) {
      const u = normalizeUrl(r[c] || '');
      if (u) entry.links.add(u);
    }
    index.set(id, entry);
  }
  return index;
}

async function fetchIndex() {
  const resp = await fetch(SHEET_URL_EVENTS, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
  if (!resp.ok) throw new Error('sheet HTTP ' + resp.status);
  return buildIndex(await resp.text());
}

export async function loadEventIndex() {
  const now = Date.now();
  if (cache && cache.expiresAt > now) return cache.index;
  if (!inflight) {
    inflight = fetchIndex()
      .then(index => {
        cache = { index, expiresAt: Date.now() + CACHE_TTL_MS };
        return index;
      })
      .finally(() => { inflight = null; });
  }
  return inflight;
}
