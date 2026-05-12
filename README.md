# 校園活動網站 - 使用說明

## 快速開始

### Windows
1. 把所有檔案放在同一個資料夾
2. **雙擊 `start-windows.bat`**
3. 瀏覽器會自動打開網站

### Mac
1. 把所有檔案放在同一個資料夾
2. **第一次使用**：在 `start-mac.command` 上「按右鍵 → 打開」（系統會問是否確定要打開，按「打開」）
3. **之後**：直接雙擊 `start-mac.command` 就行

如果 Mac 一直跳「無法執行」的訊息，請打開「終端機 Terminal」，把整個資料夾拖進去，然後執行：
```
chmod +x start-mac.command
```
之後就能正常雙擊了。

---

## 啟動後

- 自動打開瀏覽器到 `http://localhost:8000`
- 看到的是 `index.html`（地圖頁）
- nav 可切換到「活動列表」
- 想看診斷頁，網址改成 `http://localhost:8000/diagnostic.html`
- 想用座標工具，網址改成 `http://localhost:8000/coord-picker.html`

**關閉網站**：把那個黑色命令視窗關掉就好。

---

## 為什麼不能直接雙擊 HTML 開？

當網址是 `file://...` 開頭時，瀏覽器會擋下對 Google Sheet 的 fetch 請求（CORS 限制），導致活動資料載入失敗。透過本地伺服器網址會變成 `http://localhost:8000`，這個限制就消失了。

---

## 檔案說明

| 檔名 | 用途 |
|------|------|
| `index.html` | 地圖頁（首頁） |
| `events.html` | 活動列表頁 |
| `events.js` | 活動資料來源設定（含 Google Sheet 網址） |
| `diagnostic.html` | 資料診斷工具 |
| `coord-picker.html` | 建築物座標標記工具 |
| `活動資料範本.csv` | 試算表範本 |
| `start-windows.bat` | Windows 啟動腳本 |
| `start-mac.command` | Mac 啟動腳本 |
| `ntu-map.jpg` | 校園地圖底圖（圖片已嵌入 HTML，這個檔可有可無） |

---

## 修改活動內容

直接編輯你的 Google Sheet 即可，網站重新整理就會抓最新資料。
不用碰任何程式碼。
