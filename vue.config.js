// const Components = require("unplugin-vue-components/webpack");
// const { ElementUiResolver } = require("unplugin-vue-components/resolvers");

const path = require('path');
const ProvidePlugin = require('webpack').ProvidePlugin;
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  lintOnSave: true,
  devServer: {
    port: process.env.VUE_APP_PORT,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_TARGET_API, //代理地址，这里设置的地址会代替axios中设置的baseURL
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        pathRewrite: {
          '^/api': '/api',
        },
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve('src'),
        '@components': path.resolve('src/components'),
      },
    },
    plugins: [
      // 引入DLL
      // ...addAssetsPluginArray,
      // ...dllReferencePluginArray,
      //webpack下，按需引入elementui组件
      // Components({
      //   resolvers: [ElementUiResolver()],
      // }),
      new ProvidePlugin({
        _: 'lodash',
        $is: [path.resolve(__dirname, './src/utils/is.js'), 'default'],
        $validate: [path.resolve(__dirname, './src/utils/validate.js'), 'default'],
        $util: [path.resolve(__dirname, './src/utils/index.js'), 'default'],
        $auth: [path.resolve(__dirname, './src/utils/auth.js'), 'default'],
      }),
    ],
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module.rule('svg').exclude.add(path.resolve('src/assets/icons')).end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(path.resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end();
  },
};
