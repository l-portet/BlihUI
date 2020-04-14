module.exports = {
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'BlihUI';
      return args;
    });
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: 'BlihUI'
      }
    }
  }
};
