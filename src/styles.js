// Shared by the generated stylesheet and the optional inline SVG loader.
export const loaderStyles = `
.ss-shape {
  display: inline-flex;
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  vertical-align: middle;
}
.ss-shape:not([data-ss-shape-loaded]) {
  background-color: currentColor;
  -webkit-mask: var(--ss-shape-mask, none) center / contain no-repeat;
  mask: var(--ss-shape-mask, none) center / contain no-repeat;
}
.ss-shape[data-ss-shape-loaded] {
  background: none;
  -webkit-mask: none;
  mask: none;
}
.ss-shape > svg { display: block; width: 100%; height: 100%; }
`;
