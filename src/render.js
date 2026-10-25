import shapes, { catalog } from './generated/shapes.js';

const records = new Map(catalog.shapes.map(shape => [shape.slug, shape]));
let instance = 0;

export function resolveShape(slug, variant) {
  const shape = records.get(slug);
  if (!shape) return '';
  const selected = variant === null || variant === undefined ? shape.defaultVariant : variant;
  const id = Object.hasOwn(shape.assets, selected) ? shape.assets[selected] : null;
  return id && Object.hasOwn(shapes, id) ? shapes[id] : '';
}

export function renderSVG(document, source, thickness) {
  if (!source) return null;
  const template = document.createElement('template');
  template.innerHTML = source;
  const svg = template.content.firstElementChild;
  const prefix = `ss-shape-instance-${++instance}-`;
  const ids = new Map();
  svg.querySelectorAll('[id]').forEach(node => {
    const id = node.id;
    ids.set(id, prefix + id);
    node.id = prefix + id;
  });
  svg.querySelectorAll('*').forEach(node => {
    for (const attribute of Array.from(node.attributes)) {
      let value = attribute.value.replace(/url\(#([^)]*)\)/g, (match, id) => ids.has(id) ? `url(#${ids.get(id)})` : match);
      if ((attribute.name === 'href' || attribute.name === 'xlink:href') && ids.has(value.slice(1))) value = '#' + ids.get(value.slice(1));
      if (value !== attribute.value) node.setAttribute(attribute.name, value);
    }
  });
  const width = Number(thickness);
  if (thickness !== null && thickness !== '' && Number.isFinite(width) && width > 0) {
    svg.querySelectorAll('[stroke-width]').forEach(node => node.setAttribute('stroke-width', String(width)));
    if (svg.hasAttribute('stroke-width')) svg.setAttribute('stroke-width', String(width));
  }
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  return svg;
}

// Attribute changes remain reversible; explicit caller semantics take priority.
export function syncAccessibility(host, state) {
  const meaningful = Boolean(host.getAttribute('aria-label')?.trim());
  for (const [attribute, value] of [['aria-hidden', meaningful ? null : 'true'], ['role', meaningful ? 'img' : null]]) {
    if (state[attribute] !== undefined && host.getAttribute(attribute) !== state[attribute]) delete state[attribute];
    if (state[attribute] !== undefined) {
      if (value === null) { host.removeAttribute(attribute); delete state[attribute]; }
      else { host.setAttribute(attribute, value); state[attribute] = value; }
    } else if (!host.hasAttribute(attribute) && value !== null) {
      host.setAttribute(attribute, value);
      state[attribute] = value;
    }
  }
}
