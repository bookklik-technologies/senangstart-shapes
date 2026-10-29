import { defineConfig } from 'vitepress';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const pkg = require('../../package.json');
const catalog = require('../../dist/catalog.json');

const navigation = ms => [
  { text: ms ? 'Utama' : 'Home', link: ms ? '/ms/' : '/' },
  { text: ms ? 'Panduan' : 'Guide', link: `${ms ? '/ms' : ''}/guide/getting-started` },
  { text: ms ? 'Bentuk' : 'Shapes', link: `${ms ? '/ms' : ''}/shapes/` },
  { text: ms ? 'Corak' : 'Patterns', link: `${ms ? '/ms' : ''}/patterns/` },
  { text: `v${pkg.version}`, link: 'https://github.com/bookklik-technologies/senangstart-shapes' },
];
const guideTitles = {
  en: ['Getting Started', 'Installation', 'Usage & Variants', 'Styling', 'Accessibility', 'Framework Integration'],
  ms: ['Bermula', 'Pemasangan', 'Penggunaan & Varian', 'Penggayaan', 'Kebolehcapaian', 'Integrasi Rangka Kerja'],
};
const guideSlugs = ['getting-started', 'installation', 'usage', 'styling', 'accessibility', 'configuration'];
const categoryNamesMs = { 'geometric-basics': 'Asas geometri', 'stars-bursts': 'Bintang & pancaran', 'flowers-leaves': 'Bunga & daun', 'rings-orbits': 'Gelang & orbit', 'arches-fans': 'Lengkung & kipas', 'waves-linework': 'Gelombang & garisan', 'loops-ribbons': 'Gelung & reben', 'organic-abstract': 'Organik & abstrak', 'tiles-grids': 'Jubin & grid', 'steps-pixels': 'Tangga & piksel', 'arrows-direction': 'Anak panah & arah', 'facets-isometric': 'Faset & isometrik', 'eyes-expressions': 'Mata & ekspresi', 'weather-sky': 'Cuaca & langit' };
const sidebar = ms => {
  const prefix = ms ? '/ms' : '';
  return {
    [`${prefix}/guide/`]: [{ text: ms ? 'Panduan' : 'Guide', items: guideSlugs.map((slug, i) => ({ text: guideTitles[ms ? 'ms' : 'en'][i], link: `${prefix}/guide/${slug}` })) }],
    [`${prefix}/shapes/`]: [
      { text: ms ? 'Pustaka Bentuk' : 'Shape Library', items: [{ text: ms ? 'Semua Bentuk' : 'All Shapes', link: `${prefix}/shapes/` }] },
      ...catalog.categories.map(category => ({ text: ms ? categoryNamesMs[category.slug] : category.name, collapsed: true, items: catalog.shapes.filter(shape => shape.category === category.slug).map(shape => ({ text: shape.name, link: `${prefix}/shapes/${shape.slug}` })) })),
    ],
  };
};

export default defineConfig({
  title: 'SenangStart Shapes',
  description: 'Expressive, customizable SVG shapes for modern web projects.',
  base: '/senangstart-shapes/',
  cleanUrls: true,
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/senangstart-shapes/assets/ss-logo.svg' }]],
  locales: {
    root: { label: 'English', lang: 'en' },
    ms: { label: 'Bahasa Melayu', lang: 'ms', description: 'Bentuk SVG yang ekspresif dan boleh disesuaikan untuk projek web.', themeConfig: { nav: navigation(true), sidebar: sidebar(true), outline: { label: 'Pada halaman ini' }, docFooter: { prev: 'Sebelumnya', next: 'Seterusnya' }, returnToTopLabel: 'Kembali ke atas', sidebarMenuLabel: 'Menu' } },
  },
  themeConfig: {
    logo: '/assets/ss-logo.svg',
    nav: navigation(false), sidebar: sidebar(false),
    socialLinks: [{ icon: 'github', link: 'https://github.com/bookklik-technologies/senangstart-shapes' }],
    search: { provider: 'local' },
    footer: { message: `SenangStart Shapes v${pkg.version} · Part of <a href="https://senangstart.com/">SenangStart</a>`, copyright: 'Copyright © 2026 <a href="https://bookklik.com/">Bookklik Technologies</a>. Released under the MIT License.' },
  },
  vue: { template: { compilerOptions: { isCustomElement: tag => tag === 'ss-shape' } } },
});
