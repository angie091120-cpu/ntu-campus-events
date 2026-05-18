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
  'id':           'id',
  '標題':         'title',
  '類型':         'type',
  '日期':         'date',
  '時間':         'time',
  '地點':         'location',
  'x座標':        'x',
  'y座標':        'y',
  '描述':         'description',
  '連結':         'link',
  '主辦單位':     'organizer',
  '需要報名':     'needsRegistration',
  '報名連結':     'registrationLink',
  '報名截止':     'registrationDeadline',
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
  { name: '綜合體育館 (新體)', x: 0.417, y: 0.242 },
  { name: '操場', x: 0.406, y: 0.353 },
  { name: '游泳池', x: 0.459, y: 0.298 },
  { name: '舊體育館', x: 0.465, y: 0.353 },
  { name: '醉月湖', x: 0.503, y: 0.307 },
  { name: '物理系館', x: 0.463, y: 0.223 },
  { name: '數學系館', x: 0.536, y: 0.315 },
  { name: '天文數學館', x: 0.523, y: 0.264 },
  { name: '化學系館', x: 0.522, y: 0.386 },
  { name: '化工系館', x: 0.527, y: 0.438 },
  { name: '機械系館', x: 0.576, y: 0.386 },
  { name: '生命科學館', x: 0.556, y: 0.591 },
  { name: '應用力學研究大樓', x: 0.621, y: 0.346 },
  { name: '電機一館', x: 0.541, y: 0.388 },
  { name: '電機二館', x: 0.662, y: 0.404 },
  { name: '博理館', x: 0.672, y: 0.375 },
  { name: '工學博物館', x: 0.597, y: 0.411 },
  { name: '社科院', x: 0.671, y: 0.301 },
  { name: '霖澤館', x: 0.723, y: 0.301 },
  { name: '二活', x: 0.468, y: 0.737 },
  { name: '總圖書館', x: 0.627, y: 0.479 },
  { name: '行政大樓', x: 0.478, y: 0.552 },
  { name: '文學院', x: 0.475, y: 0.455 },
  { name: '共同教學館', x: 0.505, y: 0.566 },
  { name: '普通教學館', x: 0.472, y: 0.417 },
  { name: '活大', x: 0.595, y: 0.443 },
  { name: '鹿鳴堂', x: 0.506, y: 0.609 },
  { name: '管理學院一館', x: 0.523, y: 0.674 },
  { name: '管理學院二館', x: 0.48, y: 0.722 },
  { name: '大學廣場', x: 0.357, y: 0.525 },
  { name: '傅園', x: 0.365, y: 0.556 },
  { name: '卓越研究大樓', x: 0.175, y: 0.642 },
  { name: '臺大醫院西址', x: 0.105, y: 0.156 },
  { name: '公衛學院', x: 0.237, y: 0.197 },
  { name: '臺大醫院東址', x: 0.156, y: 0.227 },
  { name: '醫學院', x: 0.161, y: 0.267 },
  { name: '臺大兒童醫院', x: 0.131, y: 0.083 },
  { name: '水源太子學舍', x: 0.22, y: 0.621 },
  { name: '修齊會館', x: 0.254, y: 0.66 },
  { name: '水源校區行政大樓', x: 0.212, y: 0.679 },
  { name: '育成中心A棟', x: 0.225, y: 0.703 },
  { name: '育成中心B棟', x: 0.208, y: 0.719 },
  { name: '育成中心C棟', x: 0.197, y: 0.737 },
  { name: '自行車拖吊場', x: 0.168, y: 0.754 },
  { name: '映新館', x: 0.156, y: 0.711 },
  { name: '思源樓', x: 0.182, y: 0.719 },
  { name: '檔案館', x: 0.189, y: 0.673 },
  { name: '新月台', x: 0.375, y: 0.418 },
  { name: '農業陳列館', x: 0.383, y: 0.441 },
  { name: '人文館', x: 0.383, y: 0.46 },
  { name: '舊總圖書館', x: 0.423, y: 0.464 },
  { name: '樂學館', x: 0.422, y: 0.44 },
  { name: '椰林大道', x: 0.472, y: 0.487 },
  { name: '蒲葵道', x: 0.436, y: 0.428 },
  { name: '植物標本館', x: 0.417, y: 0.531 },
  { name: '女一舍', x: 0.392, y: 0.541 },
  { name: '女三舍', x: 0.392, y: 0.561 },
  { name: '女二舍', x: 0.392, y: 0.577 },
  { name: '大一女舍', x: 0.398, y: 0.596 },
  { name: '女五舍', x: 0.42, y: 0.571 },
  { name: '研一舍', x: 0.434, y: 0.615 },
  { name: '農化新館', x: 0.435, y: 0.548 },
  { name: '敬賢樓', x: 0.458, y: 0.546 },
  { name: '望樂樓', x: 0.455, y: 0.595 },
  { name: '傅鐘', x: 0.475, y: 0.511 },
  { name: '一號館', x: 0.398, y: 0.515 },
  { name: '二號館', x: 0.446, y: 0.511 },
  { name: '三號館', x: 0.444, y: 0.531 },
  { name: '四號館', x: 0.506, y: 0.511 },
  { name: '五號館', x: 0.505, y: 0.529 },
  { name: '農業綜合大樓', x: 0.504, y: 0.546 },
  { name: '小小福', x: 0.494, y: 0.59 },
  { name: '駐警隊', x: 0.469, y: 0.628 },
  { name: '展書樓', x: 0.474, y: 0.641 },
  { name: '臺大附設幼稚園', x: 0.478, y: 0.668 },
  { name: '昆蟲館', x: 0.612, y: 0.833 },
  { name: '尊賢館', x: 0.46, y: 0.7 },
  { name: '推廣教育大樓一號館', x: 0.494, y: 0.788 },
  { name: '建築與城鄉研究所(公館)', x: 0.502, y: 0.773 },
  { name: '管理學院教研館', x: 0.545, y: 0.722 },
  { name: '雅頌坊', x: 0.547, y: 0.685 },
  { name: '食品科技館', x: 0.558, y: 0.667 },
  { name: '造園館', x: 0.589, y: 0.668 },
  { name: '精密溫室', x: 0.576, y: 0.623 },
  { name: '大氣科學館', x: 0.553, y: 0.628 },
  { name: '氣象館', x: 0.548, y: 0.617 },
  { name: '浩瀚樓', x: 0.537, y: 0.627 },
  { name: '地理系館', x: 0.532, y: 0.615 },
  { name: '鹿鳴廣場', x: 0.518, y: 0.595 },
  { name: '地質科學館', x: 0.487, y: 0.625 },
  { name: '大考中心', x: 0.536, y: 0.591 },
  { name: '農產品展售中心', x: 0.524, y: 0.567 },
  { name: '農業試驗場', x: 0.599, y: 0.592 },
  { name: '瑠公圳水源池', x: 0.587, y: 0.559 },
  { name: '人工氣候室', x: 0.628, y: 0.549 },
  { name: '磯永吉紀念室', x: 0.632, y: 0.566 },
  { name: '綠房子', x: 0.631, y: 0.606 },
  { name: '農業試驗場辦公室', x: 0.646, y: 0.587 },
  { name: '工程科學及海洋工程系館', x: 0.675, y: 0.507 },
  { name: '花卉館', x: 0.543, y: 0.525 },
  { name: '水工試驗大樓', x: 0.556, y: 0.541 },
  { name: '森林系館', x: 0.551, y: 0.51 },
  { name: '保健中心', x: 0.578, y: 0.51 },
  { name: '林產館', x: 0.579, y: 0.523 },
  { name: '航空測量館', x: 0.58, y: 0.534 },
  { name: '舟山路', x: 0.598, y: 0.53 },
  { name: '慶齡工業研究中心', x: 0.7, y: 0.521 },
  { name: '納環館', x: 0.716, y: 0.48 },
  { name: '明達館', x: 0.746, y: 0.456 },
  { name: '中非大樓', x: 0.718, y: 0.433 },
  { name: '臺灣科技大學', x: 0.647, y: 0.707 },
  { name: '動科系館', x: 0.738, y: 0.738 },
  { name: '環境研究大樓', x: 0.761, y: 0.783 },
  { name: '資源回收場', x: 0.79, y: 0.814 },
  { name: '實驗動物資源中心', x: 0.784, y: 0.789 },
  { name: '園藝分場', x: 0.826, y: 0.738 },
  { name: '農業昆蟲館', x: 0.869, y: 0.744 },
  { name: '芳蘭大厝', x: 0.878, y: 0.71 },
  { name: '永齡生醫工程館', x: 0.85, y: 0.685 },
  { name: '園藝科學管理研究室', x: 0.833, y: 0.691 },
  { name: '臺大癌醫', x: 0.746, y: 0.619 },
  { name: '臺大動物醫院', x: 0.705, y: 0.587 },
  { name: '男七舍', x: 0.835, y: 0.626 },
  { name: '生技中心', x: 0.85, y: 0.573 },
  { name: '男五舍', x: 0.768, y: 0.587 },
  { name: '男三舍', x: 0.781, y: 0.565 },
  { name: '中華經濟研究院', x: 0.832, y: 0.55 },
  { name: '男一舍', x: 0.748, y: 0.534 },
  { name: '輻射科學暨質子治療中心', x: 0.731, y: 0.563 },
  { name: '男八舍', x: 0.776, y: 0.493 },
  { name: '男六舍', x: 0.79, y: 0.513 },
  { name: '長興太子學舍', x: 0.797, y: 0.482 },
  { name: '土木研究大樓', x: 0.842, y: 0.449 },
  { name: '國家地震工程研究中心', x: 0.871, y: 0.494 },
  { name: '教職員宿舍', x: 0.757, y: 0.394 },
  { name: '學新館', x: 0.724, y: 0.389 },
  { name: '農機館', x: 0.689, y: 0.451 },
  { name: '知武館', x: 0.693, y: 0.432 },
  { name: '獸醫系館', x: 0.656, y: 0.435 },
  { name: '獸醫系三館', x: 0.673, y: 0.434 },
  { name: '鄭江樓', x: 0.692, y: 0.402 },
  { name: '新聞研究所', x: 0.695, y: 0.365 },
  { name: '資工系館 (德田館)', x: 0.648, y: 0.368 },
  { name: '社會與社工系館', x: 0.649, y: 0.326 },
  { name: '萬才館', x: 0.76, y: 0.338 },
  { name: '研三舍', x: 0.745, y: 0.321 },
  { name: '國青大樓', x: 0.746, y: 0.306 },
  { name: '國發所大樓', x: 0.696, y: 0.325 },
  { name: '水杉道', x: 0.623, y: 0.42 },
  { name: '工學院綜合大樓', x: 0.612, y: 0.393 },
  { name: '宗倬章館', x: 0.575, y: 0.408 },
  { name: '土木系館', x: 0.528, y: 0.458 },
  { name: '圖資系館', x: 0.567, y: 0.456 },
  { name: '綜合教學館', x: 0.573, y: 0.434 },
  { name: '農藝館', x: 0.616, y: 0.431 },
  { name: '文學院研究大樓', x: 0.451, y: 0.449 },
  { name: '小福', x: 0.495, y: 0.416 },
  { name: '原子與分子科學研究所', x: 0.528, y: 0.408 },
  { name: '小椰林道', x: 0.553, y: 0.361 },
  { name: '桃花心木道', x: 0.584, y: 0.319 },
  { name: '楓香道', x: 0.635, y: 0.322 },
  { name: '垂葉榕道', x: 0.441, y: 0.336 },
  { name: '博雅教學館', x: 0.468, y: 0.398 },
  { name: '全球變遷中心', x: 0.468, y: 0.262 },
  { name: '海洋研究所', x: 0.494, y: 0.262 },
  { name: '次震宇宙館', x: 0.498, y: 0.237 },
  { name: '凝態科學研究中心', x: 0.463, y: 0.239 },
  { name: '思亮館', x: 0.541, y: 0.285 },
  { name: '計中', x: 0.585, y: 0.289 },
  { name: '漁業科學館', x: 0.569, y: 0.307 },
  { name: '女八舍', x: 0.57, y: 0.333 },
  { name: '女九舍', x: 0.569, y: 0.356 },
  { name: '心理系南館', x: 0.598, y: 0.359 },
  { name: '心理系北館', x: 0.597, y: 0.332 },
  { name: '外教中心', x: 0.602, y: 0.306 },
  { name: '語文大樓', x: 0.624, y: 0.291 },
  { name: '舊體後舞台', x: 0.478, y: 0.351 },
  { name: '新生教學館', x: 0.532, y: 0.351 },
  { name: '數學研究中心', x: 0.536, y: 0.331 },
  { name: '生化科學研究所', x: 0.539, y: 0.37 },
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
          console.warn(`[events.js] 活動「${event.title}」找不到對應建築「${event.location}」，將顯示為「校外/其他」`);
        }
      }
      // 標記是否有有效座標：用 mapLocation 旗標讓地圖頁判斷
      event.mapLocation = isValidCoord(x) && isValidCoord(y);
      event.x = event.mapLocation ? x : 0;
      event.y = event.mapLocation ? y : 0;

      // 「需要報名」欄位：接受是/否、Y/N、TRUE/FALSE、空白
      event.needsRegistration = parseYesNo(event.needsRegistration);

      // 日期標準化：把 YYYY/MM/DD、YYYY.MM.DD、YYYY年MM月DD日 等寫法都轉成 YYYY-MM-DD
      event.date = normalizeDate(event.date);
      event.registrationDeadline = normalizeDate(event.registrationDeadline);

      return event;
    })
    .filter(e => e.id && e.title);
}

// 給其他頁面用：判斷報名狀態
// 回傳 { status: 'open' | 'closed' | 'today', label: '報名中' | '報名已截止' | '今日截止', daysLeft: 數字 }
function getRegistrationStatus(event) {
  if (!event.registrationDeadline) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadline = new Date(event.registrationDeadline);
  deadline.setHours(23, 59, 59, 999); // 截止日當天還能報名
  const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));

  if (daysLeft < 0) {
    return { status: 'closed', label: '報名已截止', daysLeft };
  } else if (daysLeft === 0) {
    return { status: 'today', label: '今日截止', daysLeft };
  } else if (daysLeft <= 3) {
    return { status: 'urgent', label: `剩 ${daysLeft} 天`, daysLeft };
  } else {
    return { status: 'open', label: `截止 ${event.registrationDeadline}`, daysLeft };
  }
}

// 把各種日期寫法統一成 YYYY-MM-DD
// 支援：YYYY-MM-DD、YYYY/MM/DD、YYYY.MM.DD、YYYY年M月D日
// 月份和日不滿兩位自動補 0
function normalizeDate(s) {
  if (!s) return '';
  const str = String(s).trim();
  if (!str) return '';
  // 抓出數字（年/月/日，按出現順序）
  const m = str.match(/(\d{4})\D+(\d{1,2})\D+(\d{1,2})/);
  if (!m) return str; // 抓不到就照原樣回傳，總比丟掉好
  const y = m[1];
  const mo = m[2].padStart(2, '0');
  const d = m[3].padStart(2, '0');
  return `${y}-${mo}-${d}`;
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

  // 1. 完全匹配 → 直接回傳
  for (const b of BUILDINGS) {
    if (normalizeName(b.name) === target) return b;
  }

  // 2. 對所有候選評分，取最高分
  // 三種匹配方式：
  //   (a) target 包含完整建築名（地點寫得長，例：「博雅教學館 102」）→ 最強
  //   (b) 建築名包含 target（地點寫得短，例：「博雅」→「博雅教學館」）
  //   (c) 共同前綴匹配（例：「博雅 102」開頭是「博雅」，「博雅教學館」也是）
  let bestMatch = null;
  let bestScore = 0;

  for (const b of BUILDINGS) {
    const bn = normalizeName(b.name);
    let score = 0;

    if (target.includes(bn)) {
      // (a) 建築名越長代表 target 命中越多字 → 越具體
      score = bn.length * 1000;
    } else if (bn.includes(target)) {
      // (b) 建築名越短代表 target 佔比越高、越精準
      score = target.length * 1000 - (bn.length - target.length) * 5;
    } else {
      // (c) 共同前綴匹配（要求至少 2 字共同前綴，避免雜訊）
      let common = 0;
      const minLen = Math.min(target.length, bn.length);
      while (common < minLen && target[common] === bn[common]) common++;
      if (common >= 2) {
        score = common * 100 - (bn.length + target.length - 2 * common) * 0.5;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = b;
    }
  }
  return bestMatch;
}

// 給 diagnostic.html 用的 alias
function parseCsv(csv) { return parseEventsCsv(csv); }
