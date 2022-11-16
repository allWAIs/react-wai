const devServer = {
    host: 'localhost',
    port: 3000,
    hot: true,
    open: false,
    compress: true,
    liveReload: true,
    static: ['build'],
    historyApiFallback: true,
    client: {
      logging: 'info',
      overlay: true,
      reconnect: 3,
    },
    watchFiles: {
      paths: ['src/**/*.*', 'public/**/*.*'],
    },
  };
  
  export default devServer;