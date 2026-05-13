/* ════════════════════════════════════════════════════════
   校園活動 - 共用資料檔
   ════════════════════════════════════════════════════════ */


/* ────────────────────────────────────────────────────────
   ① 兩個試算表網址：活動 + 建築物對照表
   ────────────────────────────────────────────────────────
   試算表結構：開兩個分頁，「活動」和「建築物」
   各自「發佈到網路」會給你兩個不同的 CSV 連結
   貼到下面對應欄位：
   ──────────────────────────────────────────────────────── */
const SHEET_URL_EVENTS = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTFDBkx0m-aeazHDsCVRCyj857qZt0jQVLgwaPx6EZM08I-osyv1MD3jUDSWqwiThp1zh2FfzH5BVyq/pub?output=csv';
const SHEET_URL_BUILDINGS = ''; // 還沒設定，會用程式內建的對照表

// 舊變數名相容（不要刪，diagnostic 還在用）
const SHEET_URL = SHEET_URL_EVENTS;


/* ────────────────────────────────────────────────────────
   ② 活動類型
   ──────────────────────────────────────────────────────── */
const EVENT_TYPES = [
  { id: 'lecture',     name: '講座',     color: '#2E5BBA' },
  { id: 'workshop',    name: '工作坊',   color: '#D97342' },
  { id: 'club',        name: '社團活動', color: '#7B4FB8' },
  { id: 'performance', name: '表演',     color: '#C73E7E' },
  { id: 'sports',      name: '運動',     color: '#4A7C3A' },
  { id: 'competition', name: '競賽',     color: '#B82E2E' },
];


/* ────────────────────────────────────────────────────────
   ③ 試算表欄位對應
   ──────────────────────────────────────────────────────── */
const FIELD_MAP = {
  'id':         'id',
  '標題':       'title',
  '類型':       'type',
  '日期':       'date',
  '時間':       'time',
  '地點':       'location',
  'x座標':      'x',
  'y座標':      'y',
  '描述':       'description',
  '連結':       'link',
  '主辦單位':   'organizer',
  '需要報名':   'needsRegistration',
  '報名連結':   'registrationLink',
};

const BUILDING_FIELD_MAP = {
  '建築物':  'name',
  'x座標':   'x',
  'y座標':   'y',
};


/* ────────────────────────────────────────────────────────
   ④ 內建建築物對照表
   如果 SHEET_URL_BUILDINGS 沒設定，會用這份；
   設定了的話則用試算表上的（試算表優先）
   ──────────────────────────────────────────────────────── */
const FALLBACK_BUILDINGS = [
  { name: '綜合體育館',                           x: 0.42, y: 0.23 },
  { name: '田徑場/運動場',                         x: 0.42, y: 0.3 },
  { name: '游泳池',                             x: 0.466, y: 0.25 },
  { name: '體育館',                             x: 0.45, y: 0.31 },
  { name: '醉月湖',                             x: 0.519, y: 0.28 },
  { name: '新物理館',                            x: 0.48, y: 0.22 },
  { name: '物理系館',                            x: 0.482, y: 0.235 },
  { name: '數學系館',                            x: 0.53, y: 0.285 },
  { name: '天文數學館',                           x: 0.571, y: 0.245 },
  { name: '化學館',                             x: 0.526, y: 0.405 },
  { name: '化工系館',                            x: 0.544, y: 0.425 },
  { name: '機械工程系',                           x: 0.57, y: 0.415 },
  { name: '生命科學館',                           x: 0.49, y: 0.37 },
  { name: '公衛大樓',                            x: 0.498, y: 0.345 },
  { name: '醫學大樓',                            x: 0.512, y: 0.355 },
  { name: '應用力學館',                           x: 0.563, y: 0.38 },
  { name: '電機資訊學院',                          x: 0.615, y: 0.435 },
  { name: '電機二館',                            x: 0.601, y: 0.415 },
  { name: '博理館',                             x: 0.61, y: 0.45 },
  { name: '工程科學館',                           x: 0.604, y: 0.425 },
  { name: '社會科學院',                           x: 0.627, y: 0.32 },
  { name: '法律學院/霖澤館',                        x: 0.624, y: 0.365 },
  { name: '第二學生活動中心',                        x: 0.524, y: 0.51 },
  { name: '總圖書館',                            x: 0.524, y: 0.475 },
  { name: '行政大樓',                            x: 0.5, y: 0.5 },
  { name: '文學院',                             x: 0.493, y: 0.47 },
  { name: '共同教學館',                           x: 0.5, y: 0.465 },
  { name: '普通教學館',                           x: 0.512, y: 0.45 },
  { name: '第一活動中心',                          x: 0.467, y: 0.51 },
  { name: '鹿鳴堂',                             x: 0.453, y: 0.56 },
  { name: '管理學院',                            x: 0.518, y: 0.69 },
  { name: '管理學院二館',                          x: 0.52, y: 0.705 },
  { name: '大學廣場',                            x: 0.382, y: 0.49 },
  { name: '傅園',                              x: 0.408, y: 0.49 },
  { name: '卓越研究大樓',                          x: 0.184, y: 0.595 },
  { name: '公館捷運站',                           x: 0.351, y: 0.595 },
  { name: '臺大醫院',                            x: 0.106, y: 0.198 },
  { name: '公衛學院',                            x: 0.197, y: 0.13 },
  { name: '公館學院',                            x: 0.265, y: 0.13 },
  { name: '醫學院',                             x: 0.155, y: 0.198 },
];


/* ════════════════════════════════════════════════════════
   程式邏輯（一般不用動）
   ════════════════════════════════════════════════════════ */

let EVENTS = [];
let BUILDINGS = [];

// 備援活動資料（沒設 SHEET_URL_EVENTS 或抓取失敗時用）
const FALLBACK_EVENTS = [
  { id: 'e1', title: 'AI 與創意：生成式 AI 入門工作坊', type: 'workshop',    x: 0.612, y: 0.420, location: '電機資訊學院',   date: '2026-05-15', time: '14:00 – 17:00', description: '從零開始學習如何運用生成式 AI 工具提升日常工作與課業效率。需自備筆電。',                 link: 'https://example.com/event-1' },
  { id: 'e2', title: '春季管弦樂團期末公演',            type: 'performance', x: 0.435, y: 0.555, location: '鹿鳴堂',         date: '2026-05-22', time: '19:30 – 21:30', description: '台大學生管弦樂團年度大型演出，曲目涵蓋柴可夫斯基、貝多芬與當代台灣作曲家作品。',     link: 'https://example.com/event-2' },
  { id: 'e3', title: '量子糾纏前沿專題演講',            type: 'lecture',     x: 0.462, y: 0.205, location: '物理系館',       date: '2026-05-14', time: '15:00 – 16:30', description: '邀請中研院吳教授分享量子糾纏在通訊領域的最新研究，歡迎跨系所同學參加。',             link: 'https://example.com/event-3' },
  { id: 'e4', title: '攝影社春季外拍社課',              type: 'club',        x: 0.450, y: 0.495, location: '第一活動中心',   date: '2026-05-18', time: '13:00 – 17:00', description: '本次主題為街頭攝影，前往大稻埕、迪化街取景，老社員手把手教學，新手可參加。',         link: 'https://example.com/event-4' },
  { id: 'e5', title: '校園公益馬拉松',                  type: 'sports',      x: 0.395, y: 0.265, location: '田徑場/運動場',  date: '2026-05-25', time: '06:30 – 10:00', description: '5K / 10K 雙組別，報名費全數捐贈偏鄉教育，完賽即贈紀念毛巾與運動水壺。',             link: 'https://example.com/event-5' },
  { id: 'e6', title: '創業競賽決賽暨成果發表',          type: 'competition', x: 0.500, y: 0.700, location: '管理學院',       date: '2026-05-30', time: '13:30 – 18:00', description: '入圍前十強的新創團隊進行 8 分鐘 pitch，評審含創投合夥人，現場可 networking。',     link: 'https://example.com/event-6' },
  { id: 'e7', title: '文學跨界沙龍：詩與電影',          type: 'lecture',     x: 0.480, y: 0.450, location: '文學院',         date: '2026-05-17', time: '19:00 – 21:00', description: '當代詩人與獨立電影導演對談，探討詩的視覺化與電影的詩意，自由入場。',                 link: 'https://example.com/event-7' },
  { id: 'e8', title: '初學者 Web 開發工作坊',           type: 'workshop',    x: 0.605, y: 0.435, location: '博理館',         date: '2026-05-20', time: '18:30 – 21:30', description: '完全新手友善，三小時內做出你的第一個網站並部署上線。需自備筆電。',                   link: 'https://example.com/event-8' },
];


/* ───── 載入流程：先載建築物表，再載活動 ───── */
async function loadEvents() {
  // 1. 先載建築物對照表
  BUILDINGS = await loadBuildings();
  console.log(`[events.js] 已準備 ${BUILDINGS.length} 個建築物的座標對照`);

  // 2. 再載活動
  if (!SHEET_URL_EVENTS) {
    console.log('[events.js] 未設定 SHEET_URL_EVENTS，使用內建範例資料');
    EVENTS = FALLBACK_EVENTS;
    return EVENTS;
  }
  try {
    const response = await fetch(SHEET_URL_EVENTS);
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const csv = await response.text();
    const parsed = parseEventsCsv(csv);
    if (parsed.length === 0) {
      console.warn('[events.js] 活動試算表解析後 0 筆，改用範例資料');
      EVENTS = FALLBACK_EVENTS;
    } else {
      EVENTS = parsed;
      console.log(`[events.js] 從試算表載入 ${EVENTS.length} 筆活動`);
    }
  } catch (err) {
    console.error('[events.js] 載入活動試算表失敗，改用範例資料：', err);
    EVENTS = FALLBACK_EVENTS;
  }
  return EVENTS;
}

async function loadBuildings() {
  if (!SHEET_URL_BUILDINGS) {
    return FALLBACK_BUILDINGS.slice();
  }
  try {
    const response = await fetch(SHEET_URL_BUILDINGS);
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const csv = await response.text();
    const parsed = parseBuildingsCsv(csv);
    if (parsed.length === 0) {
      console.warn('[events.js] 建築物試算表解析後 0 筆，改用內建對照表');
      return FALLBACK_BUILDINGS.slice();
    }
    console.log(`[events.js] 從試算表載入 ${parsed.length} 個建築物對照`);
    return parsed;
  } catch (err) {
    console.error('[events.js] 載入建築物試算表失敗，改用內建對照表：', err);
    return FALLBACK_BUILDINGS.slice();
  }
}


/* ───── CSV 解析 ───── */
function parseEventsCsv(csv) {
  const result = Papa.parse(csv, {
    header: true, skipEmptyLines: true,
    transformHeader: h => h.trim(),
  });

  const typeNameToId = {};
  EVENT_TYPES.forEach(t => { typeNameToId[t.name] = t.id; });

  return result.data
    .map(row => {
      const event = {};
      for (const [sheetKey, codeKey] of Object.entries(FIELD_MAP)) {
        let val = row[sheetKey];
        if (val !== undefined && val !== null) val = String(val).trim();
        event[codeKey] = val;
      }
      // 類型中文 → id
      if (event.type && typeNameToId[event.type]) {
        event.type = typeNameToId[event.type];
      }

      // 座標：先試試試算表上的數值
      let x = parseFloat(event.x);
      let y = parseFloat(event.y);

      // 試算表的座標無效時，嘗試用「地點」查建築物對照表
      if (!isValidCoord(x) || !isValidCoord(y)) {
        const match = lookupBuilding(event.location);
        if (match) {
          x = match.x; y = match.y;
          console.log(`[events.js] 活動「${event.title}」自動帶入座標 (從「${event.location}」查表)`);
        } else if (event.location) {
          console.warn(`[events.js] 活動「${event.title}」找不到對應建築「${event.location}」`);
        }
      }
      event.x = isValidCoord(x) ? x : 0;
      event.y = isValidCoord(y) ? y : 0;

      // 「需要報名」欄位：接受是/否、Y/N、TRUE/FALSE、空白
      event.needsRegistration = parseYesNo(event.needsRegistration);

      return event;
    })
    .filter(e => e.id && e.title);
}

// 把「是/否」「Y/N」「TRUE/FALSE」等都統一成 true/false/null
function parseYesNo(s) {
  if (!s) return null;
  const v = String(s).trim().toLowerCase();
  if (['是','y','yes','true','1','需要','o'].includes(v)) return true;
  if (['否','n','no','false','0','不需要','x','不用'].includes(v)) return false;
  return null;
}

function parseBuildingsCsv(csv) {
  const result = Papa.parse(csv, {
    header: true, skipEmptyLines: true,
    transformHeader: h => h.trim(),
  });
  return result.data
    .map(row => {
      const b = {};
      for (const [sheetKey, codeKey] of Object.entries(BUILDING_FIELD_MAP)) {
        let val = row[sheetKey];
        if (val !== undefined && val !== null) val = String(val).trim();
        b[codeKey] = val;
      }
      b.x = parseFloat(b.x);
      b.y = parseFloat(b.y);
      return b;
    })
    .filter(b => b.name && isValidCoord(b.x) && isValidCoord(b.y));
}


/* ───── 工具 ───── */
function isValidCoord(n) {
  return typeof n === 'number' && !isNaN(n) && n > 0 && n < 1;
}

// 寬鬆匹配：忽略空白、大小寫、全形半形括號差異
function normalizeName(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[（(]/g, '(')
    .replace(/[）)]/g, ')')
    .replace(/[／/]/g, '/');
}

function lookupBuilding(name) {
  if (!name) return null;
  const target = normalizeName(name);

  // 1. 完全匹配
  for (const b of BUILDINGS) {
    if (normalizeName(b.name) === target) return b;
  }
  // 2. 部份匹配（地點包含建築名 或 建築名包含地點）
  for (const b of BUILDINGS) {
    const bn = normalizeName(b.name);
    if (target.includes(bn) || bn.includes(target)) return b;
  }
  return null;
}

// 給 diagnostic.html 用的 alias
function parseCsv(csv) { return parseEventsCsv(csv); }
