import { merge } from 'webpack-merge';
import commonConfig from './common.js';
import devServer from './server.js';


const devConfig = merge(commonConfig, {
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  devServer,
});

export default devConfig;
