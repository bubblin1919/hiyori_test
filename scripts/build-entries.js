const fs = require('fs');
const path = require('path');

// 僅允許 .png 格式圖片
const IMAGE_EXTENSIONS = new Set(['.png']);
const SCREENSHOTS_DIR = path.join(__dirname, '..', 'assets', 'screenshots');
const FANART_DIR = path.join(__dirname, '..', 'assets', 'fanart');
const OUTPUT_FILE = path.join(__dirname, '..', 'js', 'entries.js');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function readSidecarText(dir, baseName) {
  const txtPath = path.join(dir, `${baseName}.txt`);
  if (fs.existsSync(txtPath)) {
    return fs.readFileSync(txtPath, 'utf8').trim();
  }
  return null;
}

function scanScreenshots() {
  ensureDir(SCREENSHOTS_DIR);
  const files = fs.readdirSync(SCREENSHOTS_DIR);
  const items = [];

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!IMAGE_EXTENSIONS.has(ext)) continue;

    const baseName = path.basename(file, path.extname(file));
    const underscoreIdx = baseName.indexOf('_');

    let rawDate = '';
    let noteFromFilename = '';

    if (underscoreIdx !== -1) {
      rawDate = baseName.slice(0, underscoreIdx).trim();
      noteFromFilename = baseName.slice(underscoreIdx + 1).trim();
    } else {
      rawDate = baseName.trim();
    }

    const formattedDate = rawDate.replace(/-/g, '.');
    const sidecarNote = readSidecarText(SCREENSHOTS_DIR, baseName);
    const note = sidecarNote !== null ? sidecarNote : noteFromFilename;

    items.push({
      id: `ss-${baseName}`,
      type: 'screenshot',
      src: `assets/screenshots/${encodeURIComponent(file)}`,
      date: formattedDate || '未知日期',
      sortKey: rawDate || file,
      artist: '',
      note: note
    });
  }

  return items.sort((a, b) => b.sortKey.localeCompare(a.sortKey));
}

function scanFanart() {
  ensureDir(FANART_DIR);
  const files = fs.readdirSync(FANART_DIR);
  const items = [];

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!IMAGE_EXTENSIONS.has(ext)) continue;

    const baseName = path.basename(file, path.extname(file));
    const underscoreIdx = baseName.indexOf('_');

    let artist = '';
    let noteFromFilename = '';

    if (underscoreIdx !== -1) {
      artist = baseName.slice(0, underscoreIdx).trim();
      noteFromFilename = baseName.slice(underscoreIdx + 1).trim();
    } else {
      artist = baseName.trim();
    }

    const sidecarNote = readSidecarText(FANART_DIR, baseName);
    const note = sidecarNote !== null ? sidecarNote : noteFromFilename;

    items.push({
      id: `fa-${baseName}`,
      type: 'fanart',
      src: `assets/fanart/${encodeURIComponent(file)}`,
      date: '',
      sortKey: baseName,
      artist: artist || '未知畫師',
      note: note
    });
  }

  return items;
}

function build() {
  const screenshots = scanScreenshots();
  const fanart = scanFanart();
  const allEntries = [...screenshots, ...fanart];

  const fileContent = `// 此檔案由 scripts/build-entries.js 自動生成，請勿手動破壞結構
// 上傳 .png 圖片至 assets/screenshots/ 或 assets/fanart/ 後，GitHub Actions 會自動更新此清單
window.FF14_ENTRIES = ${JSON.stringify(allEntries, null, 2)};
`;

  fs.writeFileSync(OUTPUT_FILE, fileContent, 'utf8');
  console.log(`成功更新 entries.js：共 ${screenshots.length} 張截圖、${fanart.length} 張二創插圖（僅 .png 格式）。`);
}

build();
