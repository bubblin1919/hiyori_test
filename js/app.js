document.addEventListener('DOMContentLoaded', () => {
  const galleryEl = document.getElementById('gallery');
  const emptyStateEl = document.getElementById('empty-state');
  const filterBtns = document.querySelectorAll('.filter-btn');

  // 燈箱元素
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxBadge = document.getElementById('lightbox-badge');
  const lightboxPrimary = document.getElementById('lightbox-primary');
  const lightboxNote = document.getElementById('lightbox-note');
  const lightboxClose = document.getElementById('lightbox-close');

  const entries = Array.isArray(window.FF14_ENTRIES) ? window.FF14_ENTRIES : [];
  let currentFilter = 'all';

  // 禁用圖片區域右鍵選單與拖曳，保護創作者圖片
  document.addEventListener('contextmenu', (e) => {
    if (e.target.closest('.img-shield-wrapper') || e.target.tagName === 'IMG') {
      e.preventDefault();
    }
  });

  function renderGallery() {
    galleryEl.innerHTML = '';
    const filtered = entries.filter((item) => {
      if (currentFilter === 'all') return true;
      return item.type === currentFilter;
    });

    if (filtered.length === 0) {
      emptyStateEl.classList.remove('hidden');
      return;
    }
    emptyStateEl.classList.add('hidden');

    filtered.forEach((item) => {
      const card = document.createElement('article');
      card.className = 'card';

      const isScreenshot = item.type === 'screenshot';
      const badgeClass = isScreenshot ? 'badge-screenshot' : 'badge-fanart';
      const badgeLabel = isScreenshot ? 'SCREENSHOT' : 'FANART';
      const primaryText = isScreenshot
        ? `📅 ${item.date}`
        : `🎨 Illust: ${item.artist}`;

      const noteHtml = item.note && item.note.trim() !== ''
        ? `<p class="note-text">${escapeHtml(item.note)}</p>`
        : '';

      card.innerHTML = `
        <div class="img-shield-wrapper" title="點擊放大檢視">
          <img src="${item.src}" alt="${escapeHtml(primaryText)}" loading="lazy" draggable="false" />
          <div class="img-shield-overlay"></div>
        </div>
        <div class="card-body">
          <div class="card-header-meta">
            <span class="badge ${badgeClass}">${badgeLabel}</span>
            <span class="primary-info">${escapeHtml(primaryText)}</span>
          </div>
          ${noteHtml}
        </div>
      `;

      card.querySelector('.img-shield-wrapper').addEventListener('click', () => {
        openLightbox(item, badgeClass, badgeLabel, primaryText);
      });

      galleryEl.appendChild(card);
    });
  }

  function openLightbox(item, badgeClass, badgeLabel, primaryText) {
    lightboxImg.src = item.src;
    lightboxBadge.className = `badge ${badgeClass}`;
    lightboxBadge.textContent = badgeLabel;
    lightboxPrimary.textContent = primaryText;
    lightboxNote.textContent = item.note || '';
    lightboxNote.style.display = item.note ? 'block' : 'none';
    lightbox.classList.remove('hidden');
  }

  function closeLightbox() {
    lightbox.classList.add('hidden');
    lightboxImg.src = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
      closeLightbox();
    }
  });

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderGallery();
    });
  });

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  renderGallery();
});
