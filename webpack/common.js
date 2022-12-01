import { resolve } from 'node:path';

import { esbuildLoader, svgLoader } from './loaders/index.js';

const commonConfig = {
  target: ['browserslist'],
  resolve: {
    modules: ['node_modules', 'stories'],
    extensions: ['.jsx', '.js', '.json', '.wasm'],
    alias: {
      '@': resolve('src'),
    },
  },

  module: {
    rules: [
      {
        test: /\.(js)|(jsx)|(json)$/,
        resolve: {
          fullySpecified: false,
        },
      },
      esbuildLoader,
      svgLoader,
    ],
  },
};

export default commonConfig;
