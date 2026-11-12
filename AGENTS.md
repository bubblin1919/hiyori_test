# AGENTS.md - 個人 FF14 遊戲日誌網頁開發手冊 (GitHub Pages 自動同步版)

## 1. 專案目標與成品定義 (Project Goal)
開發一個輕量、美觀的**個人專屬 FF14 遊戲日誌靜態網頁**，部署於 **GitHub Pages**，用於展示我的遊戲截圖（Gpose）、遊玩心得記錄，以及二創委託／自繪插圖。
- **核心體驗**：只要我將 `.png` 圖片上傳至 GitHub 的指定資料夾（`assets/screenshots/` 或 `assets/fanart/`），系統就會透過 GitHub Actions 自動掃描資料夾、解析檔名資訊並同步更新線上網頁。

## 2. 技術架構與自動化同步機制 (Auto-Sync Architecture)
- **純前端靜態架構**：使用原生 `HTML`、`CSS`、`JavaScript` 渲染畫面，確保載入快速且不依賴外部資料庫。
- **GitHub Actions 自動掃描與部署**：
  - 當 `main` 分支的 `assets/` 內有 `.png` 圖片新增、修改或刪除時，自動觸發 `.github/workflows/update-gallery.yml`。
  - 工作流會執行 `scripts/build-entries.js`（Node.js 腳本），自動掃描 `assets/screenshots/` 與 `assets/fanart/` 內的所有 **`.png` 圖片**，並自動生成最新的 `js/entries.js`。
  - 腳本執行完畢後，自動將更新後的 `js/entries.js` 提交並發布至 GitHub Pages。
- **檔名自動解析規則（方便我隨時調整內容）**：
  - **遊戲截圖 (`assets/screenshots/`)**：檔名格式為 `YYYY-MM-DD_心得文字.png`
    - 範例：`2026-11-12_在黃金港屋頂看夕陽，終於完成主線了！.png`
    - 解析結果：日期 `2026.11.12`，心得 `在黃金港屋頂看夕陽，終於完成主線了！`（若無底線與心得，則僅顯示日期）。
  - **二創插圖 (`assets/fanart/`)**：檔名格式為 `畫師名字_作品備註.png`
    - 範例：`@ArtistName_光之戰士立繪委託.png`
    - 解析結果：畫師署名 `Illust: @ArtistName`，備註 `光之戰士立繪委託`（若無底線與備註，則僅顯示畫師署名）。
  - *進階自訂支援*：若心得文字較長包含換行，可在同資料夾放置與圖片**完全同名**的 `.txt` 檔（例如 `2026-11-12_夕陽.txt`），掃描腳本會優先讀取該文字檔內容作為完整心得。

## 3. 網頁內容與版面規格 (Content & UI Specs)
1. **頁首標題與視覺風格**：
   - 網頁主標題（`<h1>` 與瀏覽器分頁 `<title>`）須明確顯示為 **`Hiyori in Eorzea`**。
   - 網頁主標題字型必須設定為 **`'Courier New', Courier, monospace`**，並套用**加粗樣式（`font-weight: bold` / `700`）**。
2. **圖片格式與原始比例展示**：
   - 專案僅接收並渲染 **`.png` 格式**的圖片檔案。
   - 所有圖片在列表卡片與燈箱檢視時，**必須 100% 按照圖片原始長寬比例展示**（`width: 100%; height: auto;` 搭配瀑布流 Masonry 排版），嚴禁設定固定高度或使用 `object-fit: cover` 強制裁切圖片。
3. **分類瀏覽與卡片欄位規則**：
   - 支援「全部紀錄 / 遊戲截圖 / 二創插圖」的分類篩選切換按鈕，點擊圖片可開啟燈箱（Lightbox）檢視原圖細節。
   - **遊戲截圖卡片**：圖片下方**必定顯示**「截圖日期」（格式：`YYYY.MM.DD`），下方預留「心得文字」區塊（若無心得則自動隱藏）。
   - **二創插圖卡片**：圖片下方**必定顯示**「畫師署名」（格式：`Illust: [畫師名稱]`），若有作品備註則顯示於下方。

## 4. 圖片版權與安全限制 (Strict Constraints)
- **禁止 AI 訓練與生圖用途**：
  - 我上傳至專案資料夾的所有 `.png` 圖片（遊戲截圖與二創插圖），**僅限網頁展示用途，嚴禁作為任何 AI 生圖或模型訓練材料**。
  - 開發過程中，AI 助手**不得**讀取、解析、裁切、重繪我的圖片內容，也不得將圖片送往任何外部 API。
  - `index.html` 的 `<head>` 必須包含防 AI 爬蟲標記（`<meta name="robots" content="noai, noimageai">`），且網頁前端需啟用圖片防右鍵另存與防拖曳保護。

## 5. 專案目錄結構 (Directory Structure)
```text
ff14-adventure-log/
├── AGENTS.md                        # 本專案開發規範與工作手冊
├── index.html                       # 網頁主程式（標題：Hiyori in Eorzea）
├── .github/
│   └── workflows/
│       └── update-gallery.yml       # GitHub Actions 自動掃描與部署設定檔
├── scripts/
│   └── build-entries.js             # 自動掃描 .png 圖片資料夾並生成 js/entries.js 的腳本
├── css/
│   └── style.css                    # 奇幻暗色日誌風格樣式表（含 Courier New 加粗標題與原比例圖片排版）
├── js/
│   ├── entries.js                   # 由 GitHub Actions 自動生成的圖文資料清單
│   └── app.js                       # 負責讀取 entries.js 並渲染瀑布流、篩選與燈箱
└── assets/
    ├── screenshots/                 # 【上傳區】存放 FF14 遊戲截圖（命名：YYYY-MM-DD_心得.png）
    └── fanart/                      # 【上傳區】存放二創插圖（命名：畫師名字_備註.png）
```

## 6. 驗收標準 (Acceptance Criteria)
1. 雙擊 `index.html` 在本機可直接預覽預設範例畫面，且主標題清楚顯示為 `Courier New` 加粗字型的 **`Hiyori in Eorzea`**。
2. 所有展示的 `.png` 圖片皆完整保留原始長寬比例，無任何變形或裁切。
3. 推送至 GitHub 倉庫並開啟 GitHub Pages 後，只要上傳新的 `.png` 圖片至 `assets/screenshots/` 或 `assets/fanart/`，GitHub Actions 會在 1 分鐘內自動更新 `js/entries.js` 並同步顯示於線上網頁。
