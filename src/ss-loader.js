import { resolveShape, renderSVG, syncAccessibility } from './render.js';
import { loaderStyles } from './styles.js';

const states = new WeakMap();

function enhance(element) {
  const shapeClass = Array.from(element.classList).find(name => name.startsWith('ss-shape-'));
  const signature = JSON.stringify([shapeClass, element.getAttribute('data-variant'), element.getAttribute('data-thickness'), element.getAttribute('aria-label')]);
  const previous = states.get(element);
  if (previous?.signature === signature) return;
  const state = previous || { accessibility: {} };
  state.signature = signature;
  states.set(element, state);
  const svg = renderSVG(element.ownerDocument, resolveShape(shapeClass?.slice(9), element.getAttribute('data-variant')), element.getAttribute('data-thickness'));
  element.replaceChildren(...(svg ? [svg] : []));
  element.setAttribute('data-ss-shape-loaded', '');
  syncAccessibility(element, state.accessibility);
}

export function startLoader(document) {
  if (!document || document.querySelector('style[data-senangstart-shapes]')) return;
  const style = document.createElement('style');
  style.setAttribute('data-senangstart-shapes', '');
  style.textContent = loaderStyles;
  (document.head || document.documentElement).append(style);
  const visit = node => {
    if (node.nodeType !== 1) return;
    if (node.matches('i.ss-shape')) enhance(node);
    node.querySelectorAll('i.ss-shape').forEach(enhance);
  };
  visit(document.documentElement);
  const observer = new document.defaultView.MutationObserver(mutations => {
    for (const mutation of mutations) {
      if (mutation.type === 'attributes') {
        const element = mutation.target;
        if (element.matches('i.ss-shape')) enhance(element);
        else if (states.has(element)) {
          element.replaceChildren();
          element.removeAttribute('data-ss-shape-loaded');
          states.delete(element);
        }
      } else {
        mutation.addedNodes.forEach(visit);
      }
    }
  });
  observer.observe(document.documentElement, { subtree: true, childList: true, attributes: true,
    attributeFilter: ['class', 'data-variant', 'data-thickness', 'aria-label'] });
}
