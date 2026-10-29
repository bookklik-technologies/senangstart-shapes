import DefaultTheme from 'vitepress/theme';
import ShapeGallery from './ShapeGallery.vue';
import PatternGallery from './PatternGallery.vue';
import './custom.css';
import '../../../gallery/gallery.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ShapeGallery', ShapeGallery);
    app.component('PatternGallery', PatternGallery);
    if (!import.meta.env.SSR) import('../../../dist/senangstart-shape.mjs');
  },
};
