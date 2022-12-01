import { resolve } from 'node:path';
import { merge } from 'webpack-merge';
import webpack from 'webpack';
import commonConfig from './common.js';
import devServer from './server.js';
import { createHtmlPlugin } from './plugins/index.js';
const devConfig = merge(commonConfig, {
  entry: {
    main: {
      import: resolve('src/main.jsx'),
      dependOn: ['vendor'],
    },
    vendor: ['react', 'react-dom'],
  },
  output: {
    path: resolve('build'),
    filename: '[name].js',
  },
  plugins: [
    createHtmlPlugin(),
    new webpack.ProvidePlugin({ React: 'react' }),
  ].filter(Boolean),
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  devServer,
});

export default devConfig;
