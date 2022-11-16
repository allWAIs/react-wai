import { merge } from 'webpack-merge';
import commonConfig from './common.js';
import { createESBuildMinifyPlugin, createTerserPlugin, createImageMinPlugin, createCleanPlugin } from './plugins/index.js'

const prodConfig = merge(commonConfig, {
  mode: 'production',
  devtool: false,
  output: {
    ...commonConfig.output,
    filename: '[name].min.js',
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
