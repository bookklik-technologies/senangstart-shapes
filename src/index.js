import shapes, { catalog } from './generated/shapes.js';
import { SSShape, registerShape } from './ss-shape.js';
import { startLoader } from './ss-loader.js';

registerShape();
if (typeof document !== 'undefined') startLoader(document);

export { shapes, catalog, SSShape };
export default shapes;
