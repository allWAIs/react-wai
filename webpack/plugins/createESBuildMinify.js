import { ESBuildMinifyPlugin } from 'esbuild-loader';

export const createESBuildMinifyPlugin = (options = {}) => {
  const config = Object.assign(
    {
      target: 'es2015', // 컴파일 할 구문
      css: true,
    },
    options
  );
  return new ESBuildMinifyPlugin(config);
};