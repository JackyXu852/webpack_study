const { resolve } = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

const NODE_ENV = process.env.NODE_ENV || 'none';  //打包环境
const BUILD_ENV = process.env.BUILD_ENV || 'none'; //部署环境

// 名称带hash值是为了缓存 如果文件改变，该文件的hash值就会变，或重新获取，否则文件不变，读取缓存

const config = {
    mode: NODE_ENV || 'none', //NODE_ENV === 'production' 就会自动压缩js
    entry: {
      index: './src/index.js',
    },
    output: {
      path: resolve(__dirname,'../dist/'), //打包输出目录
      filename: "static/js/[name].[hash:7].js",//输出的文件名
    },
    //loader的配置
    module:{
        rules: [
					{
						/* 
							oneOf（优化打包速度）
							当我们在执行loader的时候，例如我们在处理css文件，webpack不会立即执行关于css文件的loader，
							而是执行所有的loader，一个一个匹配适合的loader，实际上这是没必要的，因此oneOf能快速找到
							指定的loader 避免无效匹配，从而提高打包速度
							oneOf 里面只能针对于一个文件只能同时被一个loader处理的情况，不能同时由多个loader处理
						*/

						oneOf: [
							{
								test: /\.js$/,
								exclude:/node_modules/,
								loader:'babel-loader',
								options: {
									//开启babel缓存
									//第二次构建时,会读取第一次缓存
									cacheDirectory: true
								}
							},
							{
								test: /\.(less|css)$/i,
								use: [
									NODE_ENV === 'production' ?
									{
										loader:MiniCssExtractPlugin.loader,
										options: {
											publicPath: '../../', //替换css里url属性的publicPath 解决样式图片路径不能识别问题
											// hmr: NODE_ENV === 'development',
										}
									}
									:"style-loader",							
									"css-loader",
									"postcss-loader",
									"less-loader",
								],
							}, 			
							{
								test: /\.(jpg|png|gif|jpeg)$/,
								loader: 'url-loader',
								options: {
									limit: 20*1024,//20kb以下base64处理
									name: 'static/img/[name].[contenthash:7].[ext]',
									esModule: false,
								}
							},
							{
			　　　　　　test: /\.(html|htm)$/i,
			　　　　　　loader: 'html-withimg-loader' //处理html中 img标签里的图片
				　　　 },	
							// 处理其他资源
							{
								// exclude: /\.(css|js|json|less|jpg|png|gif|jpeg|html)$/,//方式一 排除这些资源
								test: /\.(woff|woff2|eot|ttf|otf|svg)$/,//方式二 处理文字资源
								loader: "file-loader",
								options: {
									name: "static/media/[name].[contenthash:7].[ext]",
								},
							},

						],
					},
					
        ]
    },
		plugins:[
			new HtmlWebpackPlugin({
				template: 'src/index.html', //输入文件
				// filename: 'index.html', //output path中的输出位置
				// inject: true,
				// minify: {
				// 	removeComments: true,
				// },
				//压缩html代码配置
				minify: {
					collapseWhitespace: true,//删除空格
					removeComments:true//删除注释
				  }
				// env: {
				// 	NODE_ENV: NODE_ENV,
				// 	BUILD_ENV: BUILD_ENV,
				// }
			}),
			new MiniCssExtractPlugin(
				{
					filename: 'static/css/[name].[contenthash:7].css',
					chunkFilename: "[id].css"					
				}
			),
			new OptimizeCssAssetsWebpackPlugin()
		],
		optimization: {
			splitChunks: {
				chunks: "all",
			},
		},
		//代码分离 后面再说 ==
		// optimization: {
		// 	//代码分离
		// 	splitChunks: {
		// 		chunks: 'all',//async异步代码分割 initial同步代码分割 all同步异步分割都开启
		// 		minSize: 30000,//字节 引入的文件大于30kb才进行分割
		// 		//maxSize: 50000,         //50kb，尝试将大于50kb的文件拆分成n个50kb的文件
		// 		minChunks: 1,//模块至少使用次数
		// 		maxAsyncRequests: 5,//同时加载的模块数量最多是5个，只分割出同时引入的前5个文件
		// 		maxInitialRequests: 3,//首页加载的时候引入的文件最多3个
		// 		automaticNameDelimiter: '~',//缓存组和生成文件名称之间的连接符
		// 		name: true,//缓存组里面的filename生效，覆盖默认命名
		// 		cacheGroups: { //缓存组，将所有加载模块放在缓存里面一起分割打包
		// 			vendors: {  //自定义打包模块
		// 				test: /[\\/]node_modules[\\/]/,// /[\/]node_modules[\/]/，webpack将把使用npm命令安装的第三方库打包到vendors缓存组里面。
		// 				priority: -10, //优先级，先打包到哪个组里面，值越大，优先级越高
		// 				filename: 'vendors.js',//打包模块输出的文件名，默认为 缓存组名称（vendors） + 连接字符串（automaticNameDelimiter） + 模块入口文件（main.js） 例如：vendors~main.js
		// 			},
		// 			// default: { //默认打包模块
		// 			// 	priority: -20,
		// 			// 	reuseExistingChunk: true, //模块嵌套引入时，判断是否复用已经被打包的模块
		// 			// 	filename: 'common.js'
		// 			// }
		// 		}
		// 	}
		// }
		// performance: {		
		// 	hints:false   
		// },
}

module.exports = config;
