import DefaultTheme from 'vitepress/theme';
import ShapeGallery from './ShapeGallery.vue';
import './custom.css';
import '../../../gallery/gallery.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ShapeGallery', ShapeGallery);
    if (!import.meta.env.SSR) import('../../../dist/senangstart-shape.mjs');
  },
};
