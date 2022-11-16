import TerserPlugin from 'terser-webpack-plugin';

export const createTerserPlugin = (options = {}) => {
  const config = Object.assign({}, options);
  return new TerserPlugin(config);
};