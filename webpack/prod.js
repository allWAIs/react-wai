import { resolve } from 'node:path';
import { merge } from 'webpack-merge';
import commonConfig from './common.js';
import {
  createESBuildMinifyPlugin,
  createTerserPlugin,
  createImageMinPlugin,
  createCleanPlugin,
} from './plugins/index.js';

const prodConfig = merge(commonConfig, {
  mode: 'production',
  devtool: false,
  entry: {
    index: {
      import: resolve('src/components/index.js'),
    },
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js',
  },
  optimization: {
    minimize: true,
    minimizer: [
      createTerserPlugin(),
      createCleanPlugin(),
      createImageMinPlugin(),
      createESBuildMinifyPlugin(),
    ],
  },
});

export default prodConfig;
