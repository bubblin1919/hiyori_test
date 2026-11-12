// 此檔案在推送至 GitHub 後會由 scripts/build-entries.js 自動掃描資料夾覆寫更新
// 以下為本機預覽用的範例資料，當你上傳真實 .png 圖片至 assets/ 後會自動替換
window.FF14_ENTRIES = [
  {
    id: "demo-1",
    type: "screenshot",
    src: "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450"><defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1b3b6f"/><stop offset="100%" stop-color="#0d1b2a"/></linearGradient></defs><rect width="800" height="450" fill="url(#g1)"/><circle cx="400" cy="180" r="60" fill="#5bc0eb" opacity="0.25"/><text x="400" y="220" font-family="sans-serif" font-size="24" fill="#e2c07d" text-anchor="middle">FF14 遊戲截圖範例預覽 (16:9 原比例)</text><text x="400" y="258" font-family="sans-serif" font-size="15" fill="#9aa7bd" text-anchor="middle">上傳 .png 圖片至 assets/screenshots/ 即可自動替換</text></svg>'),
    date: "2026.11.12",
    artist: "",
    note: "在黃金港屋頂看夕陽！這部分的心得文字只要透過檔名（YYYY-MM-DD_心得.png）或同名 .txt 檔就能自由調整。"
  },
  {
    id: "demo-2",
    type: "fanart",
    src: "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800"><defs><linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2c1e38"/><stop offset="100%" stop-color="#121520"/></linearGradient></defs><rect width="600" height="800" fill="url(#g2)"/><rect x="40" y="40" width="520" height="720" fill="none" stroke="#e2c07d" stroke-opacity="0.35" stroke-width="2"/><text x="300" y="385" font-family="sans-serif" font-size="24" fill="#e2c07d" text-anchor="middle">二創插圖範例預覽 (直幅原比例)</text><text x="300" y="425" font-family="sans-serif" font-size="15" fill="#9aa7bd" text-anchor="middle">上傳 .png 圖片至 assets/fanart/ 即可自動替換</text></svg>'),
    date: "",
    artist: "@SampleArtist_FF14",
    note: "光之戰士立繪委託紀錄，畫師署名由檔名（畫師名字_備註.png）自動解析。"
  }
];
