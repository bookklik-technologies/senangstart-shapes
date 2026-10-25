import { resolveShape, renderSVG, syncAccessibility } from './render.js';

const ElementBase = typeof HTMLElement === 'undefined' ? class {} : HTMLElement;

export class SSShape extends ElementBase {
  static get observedAttributes() { return ['shape', 'variant', 'thickness', 'aria-label']; }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.accessibilityState = {};
  }

  connectedCallback() { this.render(); }
  attributeChangedCallback() { if (this.isConnected) this.render(); }

  render() {
    const style = this.ownerDocument.createElement('style');
    style.textContent = ':host{display:inline-flex;width:1em;height:1em;vertical-align:middle;flex-shrink:0}:host([hidden]){display:none}svg{display:block;width:100%;height:100%}';
    const svg = renderSVG(this.ownerDocument, resolveShape(this.getAttribute('shape'), this.getAttribute('variant')), this.getAttribute('thickness'));
    this.shadowRoot.replaceChildren(style, ...(svg ? [svg] : []));
    syncAccessibility(this, this.accessibilityState);
  }
}

export function registerShape() {
  if (typeof customElements !== 'undefined' && !customElements.get('ss-shape')) customElements.define('ss-shape', SSShape);
}
