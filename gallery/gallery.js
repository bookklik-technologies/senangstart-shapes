import shapes, { catalog } from '../dist/senangstart-shape.mjs';
import { uiIcon } from './ui-icons.mjs';
import { createDropdown } from './dropdown.mjs';

const words = {
  en: { search: 'Search shapes', placeholder: 'Search shapes...', category: 'Category', categories: 'All categories', style: 'Style', styles: 'All styles', size: 'Size', primary: 'Primary', secondary: 'Secondary', reset: 'Reset', assets: 'assets', hint: 'Select a shape to make it yours', empty: 'No shapes found. Try a different search or reset the filters.', close: 'Close shape details', variant: 'Variant', copy: 'Copy code', download: 'Download SVG', copied: 'Copied to clipboard', failed: 'Could not access the clipboard. Select and copy the code above.', downloaded: 'SVG downloaded', cssNote: 'CSS-only usage uses a monochrome mask. Include style.css. The browser bundle enhances it to inline SVG with both colors.', componentNote: 'Load the browser bundle or import the package once, then use this tag anywhere.', javascriptNote: 'The collection import works in Node.js and bundlers without a browser.', details: 'Full documentation', unavailable: 'Clipboard unavailable. Copy this command:' },
  ms: { search: 'Cari bentuk', placeholder: 'Cuba “flower”, “orbit”, “triangle”…', category: 'Kategori', categories: 'Semua kategori', style: 'Gaya', styles: 'Semua gaya', size: 'Saiz', primary: 'Utama', secondary: 'Sekunder', reset: 'Tetapkan semula', assets: 'aset', hint: 'Pilih bentuk untuk menyesuaikannya', empty: 'Tiada bentuk ditemui. Cuba carian lain atau tetapkan semula penapis.', close: 'Tutup butiran bentuk', variant: 'Varian', copy: 'Salin kod', download: 'Muat turun SVG', copied: 'Disalin ke papan keratan', failed: 'Papan keratan tidak dapat dicapai. Pilih dan salin kod di atas.', downloaded: 'SVG dimuat turun', cssNote: 'Penggunaan CSS sahaja menggunakan topeng monokrom. Sertakan style.css. Bundel pelayar menukarkannya kepada SVG sebaris dengan kedua-dua warna.', componentNote: 'Muatkan bundel pelayar atau import pakej sekali, kemudian gunakan tag ini di mana-mana.', javascriptNote: 'Import koleksi boleh digunakan dalam Node.js dan pembundel tanpa pelayar.', details: 'Dokumentasi penuh', unavailable: 'Papan keratan tidak tersedia. Salin arahan ini:' },
};
const variantNames = { en: { solid: 'Solid', outline: 'Outline', duotone: 'Duotone', tonal: 'Tonal' }, ms: { solid: 'Padu', outline: 'Garis luar', duotone: 'Duotona', tonal: 'Tona' } };
const categoryNamesMs = { 'geometric-basics': 'Asas geometri', 'stars-bursts': 'Bintang & pancaran', 'flowers-leaves': 'Bunga & daun', 'rings-orbits': 'Gelang & orbit', 'arches-fans': 'Lengkung & kipas', 'waves-linework': 'Gelombang & garisan', 'loops-ribbons': 'Gelung & reben', 'organic-abstract': 'Organik & abstrak', 'tiles-grids': 'Jubin & grid', 'steps-pixels': 'Tangga & piksel', 'arrows-direction': 'Anak panah & arah', 'facets-isometric': 'Faset & isometrik', 'eyes-expressions': 'Mata & ekspresi', 'weather-sky': 'Cuaca & langit' };
const allVariants = [...new Set(catalog.shapes.flatMap(shape => shape.variants))];
const entries = catalog.shapes.flatMap(shape => shape.variants.map(variant => ({ shape, variant, id: shape.assets[variant] })));
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
let galleryId = 0;

export function mountGallery(root, { locale = 'en', detailBase = '' } = {}) {
  const t = words[locale] || words.en;
  const variants = variantNames[locale] || variantNames.en;
  const prefix = `ss-gallery-${++galleryId}`;
  const categoryName = category => locale === 'ms' ? categoryNamesMs[category.slug] : category.name;
  const state = { search: '', category: '', variant: '', size: 48, primary: null, secondary: null, selected: null, tab: 'component' };
  const categoryOptions = [{ value: '', label: t.categories }, ...catalog.categories.map(category => ({ value: category.slug, label: categoryName(category) }))];
  root.classList.add('ss-gallery');
  root.innerHTML = `
    <div class="ss-filters">
      <input class="ss-search" type="search" name="search" aria-label="${t.search}" placeholder="${t.placeholder}" autocomplete="off">
      <div data-dropdown="category"></div>
      <div data-dropdown="variant"></div>
    </div>
    <div class="ss-controls">
      <label class="ss-range">${t.size}<input name="size" type="range" min="32" max="100" value="48"><output>48px</output></label>
      <label class="ss-color">${t.primary}<input type="color" name="primary"></label>
      <label class="ss-color">${t.secondary}<input type="color" name="secondary"></label>
      <button type="button" class="ss-reset">${t.reset}</button>
    </div>
    <div class="ss-results-bar"><span class="ss-result-count" role="status" aria-live="polite"></span><span>${t.hint}</span></div>
    <div class="ss-grid"></div>
    <dialog class="ss-dialog" aria-labelledby="${prefix}-title">
      <div class="ss-dialog-inner">
        <div class="ss-dialog-heading"><div><h3 id="${prefix}-title"></h3><span class="ss-dialog-category"></span></div><button class="ss-close" type="button" aria-label="${t.close}">${uiIcon('x-mark')}</button></div>
        <div class="ss-dialog-preview"></div>
        <div data-dropdown="detail-variant"></div>
        <div class="ss-tabs" role="tablist" aria-label="${locale === 'ms' ? 'Contoh penggunaan' : 'Usage examples'}">${[['component', 'Web Component'], ['css', 'CSS'], ['javascript', 'JavaScript']].map(([id, name], index) => `<button type="button" role="tab" id="${prefix}-${id}" aria-controls="${prefix}-panel" data-tab="${id}" aria-selected="${index === 0}" tabindex="${index === 0 ? 0 : -1}">${name}</button>`).join('')}</div>
        <div role="tabpanel" id="${prefix}-panel" aria-labelledby="${prefix}-component" tabindex="0"><pre class="ss-code"></pre><p class="ss-dialog-note"></p></div>
        <div class="ss-dialog-actions" style="margin-top:18px"><button class="ss-button ss-button-primary" type="button" data-action="copy">${t.copy} ${uiIcon('document-duplicate')}</button><button class="ss-button" type="button" data-action="download">${t.download} ${uiIcon('arrow-down-tray')}</button>${detailBase ? `<a class="ss-button ss-doc-link">${t.details} ${uiIcon('arrow-top-right-on-square')}</a>` : ''}</div>
        <div class="ss-status" role="status" aria-live="polite"></div>
      </div>
    </dialog>`;
  const find = selector => root.querySelector(selector);
  const dialog = find('dialog');
  let returnFocus;
  const dropdowns = {
    category: createDropdown(find('[data-dropdown="category"]'), {
      id: `${prefix}-category`, label: t.category, options: categoryOptions, value: state.category,
      onChange(value) { state.category = value; renderGrid(); },
    }),
    variant: createDropdown(find('[data-dropdown="variant"]'), {
      id: `${prefix}-variant`, label: t.style,
      options: [{ value: '', label: t.styles }, ...allVariants.map(variant => ({ value: variant, label: variants[variant] }))],
      value: state.variant,
      onChange(value) { state.variant = value; renderGrid(); },
    }),
    detailVariant: createDropdown(find('[data-dropdown="detail-variant"]'), {
      id: `${prefix}-detail-variant`, label: t.variant,
      onChange(value) { state.selected = { ...state.selected, variant: value }; updateDetail(); },
    }),
  };

  function matching() {
    const terms = state.search.toLowerCase().trim().split(/\s+/).filter(Boolean);
    return entries.filter(entry => (!state.category || entry.shape.category === state.category) && (!state.variant || entry.variant === state.variant) && terms.every(term => `${entry.shape.name} ${entry.shape.slug} ${entry.shape.category} ${entry.variant} ${variants[entry.variant]}`.toLowerCase().includes(term)));
  }

  function previewColors() {
    const style = getComputedStyle(root);
    return {
      primary: state.primary ?? style.getPropertyValue('--ss-ink').trim(),
      secondary: state.secondary ?? style.getPropertyValue('--ss-tone').trim(),
    };
  }

  function paintControls() {
    root.style.setProperty('--ss-preview-size', state.size + 'px');
    const colors = previewColors();
    for (const name of ['primary', 'secondary']) {
      if (state[name] === null) root.style.removeProperty('--ss-preview-' + name);
      else root.style.setProperty('--ss-preview-' + name, state[name]);
      find(`[name=${name}]`).value = colors[name];
    }
    find('output').textContent = state.size + 'px';
  }

  function renderGrid() {
    const list = matching();
    find('.ss-result-count').innerHTML = `<strong>${list.length}</strong> ${t.assets}`;
    find('.ss-grid').innerHTML = list.length ? list.map(entry => `
      <button class="ss-card" type="button" data-asset="${entry.id}" aria-label="${escapeHTML(entry.shape.name + ', ' + variants[entry.variant])}" title="${escapeHTML(entry.shape.name + ', ' + variants[entry.variant])}">
        <span class="ss-card-art"><ss-shape shape="${entry.shape.slug}" variant="${entry.variant}"></ss-shape></span>
        <span class="ss-card-caption"><span class="ss-card-name">${entry.shape.name}</span></span>
      </button>`).join('') : `<p class="ss-empty">${t.empty}</p>`;
  }

  function snippet() {
    const { shape, variant } = state.selected;
    const colors = previewColors();
    if (state.tab === 'css') return `<i class="ss-shape ss-shape-${shape.slug}"\n   data-variant="${variant}"\n   style="color: ${colors.primary}; font-size: ${state.size}px"\n   aria-hidden="true"></i>`;
    if (state.tab === 'javascript') return `import shapes from '@bookklik/senangstart-shapes/shapes';\n\nconst svg = shapes['${shape.assets[variant]}'];`;
    return `<ss-shape shape="${shape.slug}" variant="${variant}"\n  style="font-size: ${state.size}px; color: ${colors.primary};\n    --ss-shape-primary: ${colors.primary};\n    --ss-shape-secondary: ${colors.secondary}">\n</ss-shape>`;
  }

  function updateDetail() {
    const { shape, variant } = state.selected;
    find('h3').textContent = shape.name;
    find('.ss-dialog-category').textContent = categoryName(catalog.categories.find(category => category.slug === shape.category));
    find('.ss-dialog-preview').innerHTML = `<ss-shape shape="${shape.slug}" variant="${variant}"></ss-shape>`;
    dropdowns.detailVariant.setOptions(shape.variants.map(item => ({ value: item, label: variants[item] })), variant);
    find('.ss-code').textContent = snippet();
    find('.ss-dialog-note').textContent = t[state.tab + 'Note'];
    find('[role=tabpanel]').setAttribute('aria-labelledby', `${prefix}-${state.tab}`);
    root.querySelectorAll('[role=tab]').forEach(tab => {
      const active = tab.dataset.tab === state.tab;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    const link = find('.ss-doc-link');
    if (link) link.href = detailBase + shape.slug;
    find('.ss-status').textContent = '';
  }

  async function copy(text, status) {
    try { await navigator.clipboard.writeText(text); status.textContent = t.copied; }
    catch { status.textContent = t.failed; }
  }

  const onInput = event => {
    const name = event.target.name;
    if (name === 'search') {
      state[name] = event.target.value;
      renderGrid();
    } else if (['size', 'primary', 'secondary'].includes(name)) {
      state[name] = event.target.value;
      paintControls();
      if (state.selected) updateDetail();
    }
  };
  const onClick = event => {
    const target = event.target.closest('button');
    if (!target) return;
    if (target.dataset.asset) {
      state.selected = entries.find(entry => entry.id === target.dataset.asset);
      state.tab = 'component';
      returnFocus = target;
      updateDetail();
      dialog.showModal();
    } else if (target.matches('.ss-close')) dialog.close();
    else if (target.dataset.tab) { state.tab = target.dataset.tab; updateDetail(); }
    else if (target.matches('.ss-reset')) {
      Object.assign(state, { search: '', category: '', variant: '', size: 48, primary: null, secondary: null });
      for (const name of ['search', 'size']) find(`[name=${name}]`).value = state[name];
      dropdowns.category.setValue('');
      dropdowns.variant.setValue('');
      paintControls(); renderGrid();
    } else if (target.dataset.action === 'copy') copy(snippet(), find('.ss-status'));
    else if (target.dataset.action === 'download') {
      const { shape, variant } = state.selected;
      const id = shape.assets[variant];
      const colors = previewColors();
      const svg = shapes[id]
        .replace(/var\(--ss-shape-primary, #[0-9a-f]+\)/gi, colors.primary)
        .replace(/var\(--ss-shape-secondary, #[0-9a-f]+\)/gi, colors.secondary)
        .replace(/currentColor/g, colors.primary)
        .replace('<svg ', '<svg width="100" height="100" ');
      const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
      const anchor = document.createElement('a');
      anchor.href = url; anchor.download = id + '.svg';
      anchor.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      find('.ss-status').textContent = t.downloaded;
    }
  };
  const onTabKey = event => {
    if (!event.target.matches('[role=tab]') || !['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const tabs = [...root.querySelectorAll('[role=tab]')];
    const current = tabs.indexOf(event.target);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? 2 : (current + (event.key === 'ArrowRight' ? 1 : -1) + 3) % 3;
    state.tab = tabs[next].dataset.tab;
    updateDetail();
    tabs[next].focus();
  };
  root.addEventListener('input', onInput);
  root.addEventListener('click', onClick);
  root.addEventListener('keydown', onTabKey);
  const themeObserver = new MutationObserver(() => {
    paintControls();
    if (state.selected) updateDetail();
  });
  themeObserver.observe(root.ownerDocument.documentElement, { attributes: true, attributeFilter: ['class'] });
  if (root.ownerDocument.body) themeObserver.observe(root.ownerDocument.body, { attributes: true, attributeFilter: ['class'] });
  dialog.addEventListener('close', () => {
    dropdowns.detailVariant.close();
    if (returnFocus?.isConnected) returnFocus.focus();
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
  paintControls(); renderGrid();
  return () => {
    if (dialog.open) dialog.close();
    Object.values(dropdowns).forEach(dropdown => dropdown.destroy());
    themeObserver.disconnect();
    root.removeEventListener('input', onInput);
    root.removeEventListener('click', onClick);
    root.removeEventListener('keydown', onTabKey);
    root.replaceChildren();
  };
}

if (typeof document !== 'undefined') {
  const root = document.querySelector('#shape-gallery');
  if (root) mountGallery(root, { locale: root.dataset.locale });
  const toggle = document.querySelector('.ss-theme-toggle');
  if (toggle) {
    let dark;
    try { dark = localStorage.getItem('ss-shapes-theme'); } catch {}
    const apply = value => {
      document.body.classList.toggle('dark', value);
      toggle.innerHTML = uiIcon(value ? 'sun' : 'moon');
      toggle.setAttribute('aria-label', `Switch to ${value ? 'light' : 'dark'} theme`);
      toggle.setAttribute('aria-pressed', String(value));
    };
    apply(dark ? dark === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches);
    toggle.addEventListener('click', () => {
      const value = !document.body.classList.contains('dark');
      apply(value);
      try { localStorage.setItem('ss-shapes-theme', value ? 'dark' : 'light'); } catch {}
    });
  }
  document.querySelector('[data-copy-install]')?.addEventListener('click', async () => {
    const status = document.querySelector('.ss-toast');
    try { await navigator.clipboard.writeText('npm i @bookklik/senangstart-shapes'); status.textContent = 'Installation command copied'; }
    catch { status.textContent = 'npm i @bookklik/senangstart-shapes'; }
    setTimeout(() => status.textContent = '', 5000);
  });
}
