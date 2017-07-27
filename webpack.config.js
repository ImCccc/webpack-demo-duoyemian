/* eslint-disable */
var path = require('path');
var glob = require('glob');
var dirVars = {
	staticRootDir: __dirname,
	vendorDir: path.resolve(__dirname,     './vendor'),
	buildDir: path.resolve(__dirname,      './build'),
	srcRootDir: path.resolve(__dirname,    './src'), 
	dllDir: path.resolve(__dirname,        './src/dll'),
	pagesDir: path.resolve(__dirname,      './src/pages'),
	publicDir: path.resolve(__dirname,     './src/public-resource'),
	logicDir: path.resolve(__dirname,      './src/public-resource/logic'),
	libsDir: path.resolve(__dirname,       './src/public-resource/libs'),
	configDir: path.resolve(__dirname,     './src/public-resource/config'),
	layoutDir: path.resolve(__dirname,     './src/public-resource/layout'),
	componentsDir: path.resolve(__dirname, './src/public-resource/components')
};

/*********************************************** entry 配置 *****************************************************/
	var options = {
	  // 在pages目录里找
	  cwd: dirVars.pagesDir, 
	  // 这里不能异步，只能同步
	  sync: true, 
	};

	// 考虑到多个页面共用HTML等资源的情况，跳过以'_'开头的目录
	var globInstance = new glob.Glob('!(_)*/!(_)*', options); 

	// 一个数组，形如['index/index', 'index/login', 'alert/index']
	var pageArr = globInstance.found;

	var configEntry = {};
	pageArr.forEach((page) => {
		// 'alert/index': './src/pages/alert/index/page',
		// 'user/index': './src/pages/user/index/page',
		// 'index/index': './src/pages/index/index/page',
	  	configEntry[page] = path.resolve(dirVars.pagesDir, page + '/page');
	});
/*********************************************** entry 配置 *****************************************************/


/*********************************************** output 配置 *****************************************************/
	var configOutput = {
	  path: dirVars.buildDir,
	  publicPath: '/',
	  // [name]表示entry每一项中的key，用以批量指定生成后文件的名称
	  filename: '[name]/output.js',    

	  // chunkFilename参数与filename参数类似，都是用来定义生成文件的命名方式的，只不过，
	  // chunkFilename参数指定的是除入口文件外的chunk（这些chunk通常是由于webpack对代码的优化所形成的，比如因应实际运行的情况来异步加载）的命名
	  chunkFilename: '[id].bundle.js',
	};
/*********************************************** output 配置 *****************************************************/


/*********************************************** module 配置 *****************************************************/
	// 使用 extract-text-webpack-plugin就可以把css从js中独立抽离出来
	var ExtractTextPlugin = require('extract-text-webpack-plugin');
	const configModule = require('./webpack-config/inherit/module.config.js');
	configModule.rules.push({
	  test: /\.css$/,
	  exclude: /node_modules|bootstrap/,
	  // loader: ExtractTextPlugin.extract('css?minimize&-autoprefixer!postcss'),
	  use: ExtractTextPlugin.extract([
	    {
	      loader: 'css-loader',
	      options: {
	        minimize: true,
	        '-autoprefixer': true,
	      },
	    },
	    {
	      loader: 'postcss-loader',
	    },
	  ]),
	});
	configModule.rules.push({
	  test: /\.css$/,
	  include: /bootstrap/,
	  use: ExtractTextPlugin.extract([
	    {
	      loader: 'css-loader',
	    },
	  ]),
	});
	configModule.rules.push({
	  test: /\.less$/,
	  include: dirVars.srcRootDir,
	  use: ExtractTextPlugin.extract([
	    {
	      loader: 'css-loader',
	      options: {
	        minimize: true,

	        // 有为了浏览器兼容性的废弃CSS代码的话，请关闭autoprefixer已避免你的废弃CSS代码被css-loader删除了，形如css?minimize&-autoprefixer
	        '-autoprefixer': true,
	      },
	    },
	    {
	      loader: 'postcss-loader',
	    },
	    {
	      loader: 'less-loader',
	    },
	  ]),
	});
/*********************************************** module 配置 *****************************************************/


/*********************************************** resolve 配置 *****************************************************/
  	// 模块别名的配置，为了使用方便，一般来说所有模块都是要配置一下别名的
	var configResolve = {
	  alias: {
	    'iconfontDir': path.resolve(dirVars.publicDir, 'iconfont/'),
	    'configDir': dirVars.configDir,
	    'vendorDir': dirVars.vendorDir,
	    'metisMenu': path.resolve(dirVars.vendorDir, 'metisMenu/'),
	    'withoutJqueryModule': path.resolve(dirVars.libsDir, 'without-jquery.module'),
	    'routerModule': path.resolve(dirVars.libsDir, 'router.module'),
	    'libs': path.resolve(dirVars.libsDir, 'libs.module'),
	    'lessDir': path.resolve(dirVars.publicDir, 'less'),
	    'layout': path.resolve(dirVars.layoutDir, 'layout/html'),
	    'layout-without-nav': path.resolve(dirVars.layoutDir, 'layout-without-nav/html'),
	    'cm': path.resolve(dirVars.logicDir, 'common.module'),
	    'cp': path.resolve(dirVars.logicDir, 'common.page'),
	    'configModule': path.resolve(dirVars.configDir, 'common.config'),
	  },
	  // 当require的模块找不到时，尝试添加这些后缀后进行寻找
	  extensions: ['.js', '.css', '.less'],
	};
/*********************************************** resolve 配置 *****************************************************/


/*********************************************** plugins 配置 *****************************************************/
	var webpack = require('webpack');
	var configPlugins = require('./webpack-config/inherit/plugins.config.js');
	
	/* webpack1下，用了压缩插件会导致所有loader添加min配置，而autoprefixser也被定格到某个browers配置 */
	configPlugins.push(new webpack.optimize.UglifyJsPlugin({
	  compress: {
	    warnings: false,
	  },
	}));

	configPlugins.push(new webpack.DefinePlugin({
	  IS_PRODUCTION: true,
	}));

	configPlugins.push(new webpack.NoEmitOnErrorsPlugin()); // 配合CLI的--bail，一出error就终止webpack的编译进程


	var precss = require('precss');
	var autoprefixer = require('autoprefixer');
	var configPostcss = [
    	precss, 
    	autoprefixer({
    		remove: false,
    		browsers: ['ie >= 8', '> 1% in CN'],
  		})
  	];
	var configEslint = {
	  configFile: path.resolve(dirVars.staticRootDir, './.eslintrc.js'),
	  failOnWarning: true,
	  failOnError: true,
	  cache: true,
	};
	configPlugins.push(new webpack.LoaderOptionsPlugin({
	  options: {
	    postcss: configPostcss, 
	    eslint: configEslint
	  },
	}));
/*********************************************** plugins 配置 *****************************************************/


module.exports = {
	entry: configEntry,

	output: configOutput,

	module: configModule,

	resolve: configResolve,

	plugins: configPlugins,

	// externals是webpack配置中的一项，用来将某个全局变量“伪装”成某个js模块的exports，如下面这个配置：
	// 当某个js模块显式地调用var $ = require('jquery')的时候，就会把window,jQuery返回给它
	
	// ProvidePlugin + expose-loader的方案相反，此方案是先用<script>加载的jQuery满足老式jQuery插件的需要，再通过externals将其转换成符合模块化要求的exports
	// externals是会覆盖掉ProvidePlugin的。
	externals: {
		jquery: 'window.jQuery'
	},
};
