const path = require('node:path');
const TerserPlugin = require('terser-webpack-plugin');

const base = {
  mode: 'production',
  devtool: 'source-map',
  optimization: { minimize: true, minimizer: [new TerserPlugin({ extractComments: false })] },
  performance: { hints: false },
};

module.exports = [
  {
    ...base,
    entry: './src/index.js',
    output: { path: path.resolve(__dirname, 'dist'), filename: 'senangstart-shape.min.js',
      library: { name: 'SenangStartShapes', type: 'umd' }, globalObject: 'globalThis' },
  },
  {
    ...base,
    entry: { 'senangstart-shape': './src/index.js', shapes: './src/generated/shapes.js' },
    experiments: { outputModule: true },
    output: { path: path.resolve(__dirname, 'dist'), filename: '[name].mjs', library: { type: 'module' } },
  },
  {
    ...base,
    entry: { 'senangstart-shape': './src/index.js', shapes: './src/generated/shapes.js' },
    output: { path: path.resolve(__dirname, 'dist'), filename: '[name].cjs', library: { type: 'commonjs2' } },
  },
];
