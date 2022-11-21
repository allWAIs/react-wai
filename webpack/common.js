import { resolve } from 'node:path';
import webpack from 'webpack';
import { esbuildLoader, svgLoader } from './loaders/index.js'
import { createHtmlPlugin } from './plugins/index.js';

const commonConfig = {
  target: ['browserslist'],
  resolve: {
    modules: ['node_modules', 'stories'],
    extensions: ['.jsx', '.js', '.json', '.wasm'],
    alias: {
      '@': resolve('src'),
    },
    
  },
  entry: { 
    main: {
      import: resolve('src/main.jsx'),
      dependOn: ['vendor'],
    },
    vendor: ['react', 'react-dom'],    
  },
  output: {
    path: resolve('build'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js)|(jsx)|(json)$/,
        resolve:{
          fullySpecified:false,
        }
      },
      esbuildLoader,
      svgLoader
    ]
  },
  plugins: [createHtmlPlugin(),
  new webpack.ProvidePlugin({React:'react'})].filter(Boolean),
};

export default commonConfig;
