/* ════════════════════════════════════════════════════════
   tracking.js — 共用前端追蹤
   提供：
   - trackUrl(eventId, originalUrl): 把活動連結包成 /api/go?id=...&url=...
   - reportViews(eventIds): 一次回報多個活動曝光
   ════════════════════════════════════════════════════════ */

(function () {
  // 把原始連結轉成中繼跳轉網址
  window.trackUrl = function (eventId, originalUrl) {
    // 不是 http(s) 的連結（javascript:、data: 等）一律回 '#'，不原樣回傳
    if (!originalUrl || !/^https?:\/\//i.test(originalUrl)) return '#';
    if (!eventId) return originalUrl;
    return `/api/go?id=${encodeURIComponent(eventId)}&url=${encodeURIComponent(originalUrl)}`;
  };

  // 回報「使用者看到了這些活動」（一次回報、防重複）
  const _reported = new Set();
  let _viewQueue = [];
  let _viewTimer = null;

  window.reportViews = function (eventIds) {
    if (!Array.isArray(eventIds)) eventIds = [eventIds];
    const fresh = eventIds.filter(id => id && !_reported.has(id));
    if (fresh.length === 0) return;
    fresh.forEach(id => _reported.add(id));
    _viewQueue.push(...fresh);

    // 用 debounce + 批次發送，避免每秒打太多次
    clearTimeout(_viewTimer);
    _viewTimer = setTimeout(flushViews, 800);
  };

  function flushViews() {
    if (_viewQueue.length === 0) return;
    const batch = _viewQueue.splice(0, 100); // 一次最多 100 個

    // 用 fetch keepalive，即使使用者馬上離開頁面也會送出
    try {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'view', eventIds: batch }),
        keepalive: true,
      }).catch(() => {});
    } catch (e) {}
  }

  // 視窗關閉前再嘗試送一次
  window.addEventListener('beforeunload', flushViews);
})();
