const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { resolve } = require("path");
const rendererConfig = require('./webpack.config.renderer');

const devServerConfig = merge(rendererConfig, {
    // plugins:[
    //   //热更新插件
    //     new webpack.HotModuleReplacementPlugin()
    // ],
    devtool: 'cheap-module-eval-source-map',
    devServer:{
      contentBase: resolve(__dirname, '../dist/'),//告诉服务器从哪个目录中提供内容
      host: '0.0.0.0',
      port: 5500,
      disableHostCheck:true,//设置为 true 时，此选项绕过主机检查。不建议这样做，因为不检查主机的应用程序容易受到 DNS 重新连接攻击。
      historyApiFallback:true,//spa页面去#
      compress: true,//一切服务都启用 gzip 压缩
      inline: true,
      open:true,
      hot:true,//开启热更新 如果值配置了这个 就只能热更新css
		}
});

module.exports = devServerConfig;