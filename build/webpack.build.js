const webpack = require('webpack');
const mergeConfig = require('./webpack.config.renderer')

webpack(mergeConfig, (err, stats)=> {
    if (err) throw err;
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: true,
    }) + '\n\n');
  
    if (stats.hasErrors()) {
      console.error('Build failed with errors.\n');
      reject();
      process.exit(1);
    }
    console.info('Build complete.\n');
  });