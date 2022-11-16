export const esbuildLoader = {
    test: /\.jsx?$/i,
    exclude: /node_modules/,
    use: {
      loader: 'esbuild-loader',
      options: {
        loader: 'jsx', // JSX를 사용하지 않는 경우 제거
        target: 'es2015', // 컴파일 할 구문
      },
    },
  };