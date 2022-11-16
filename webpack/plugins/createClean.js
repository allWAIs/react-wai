import { CleanWebpackPlugin } from 'clean-webpack-plugin';

export const createCleanPlugin = (options = {}) => {
  const config = Object.assign(
    {
      verbose: true,
    },
    options
  );

  return new CleanWebpackPlugin(config);
};