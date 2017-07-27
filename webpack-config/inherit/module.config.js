var dirVars = require('../base/dir-vars.config.js');
var eslintFormatter = require('eslint-friendly-formatter');
module.exports = {
  rules: [
    {
      test: /\.js$/,
      enforce: 'pre',
      loader: 'eslint-loader',
      include: dirVars.srcRootDir,
      exclude: /bootstrap/,
      options: {
        formatter: eslintFormatter,
        fix: true,
      }
    },
    {
      test: /\.js$/,
      include: dirVars.srcRootDir,
      loader: 'babel-loader',
      options: {
        presets: [['es2015', { loose: true }]],

        // 参数默认为false ， 若你设置为一个文件目录路径（表示把cache存到哪），或是保留为空（表示操作系统默认的缓存目录），则相当于开启cache。这里的cache指的是babel在编译过程中某些可以缓存的步骤
        cacheDirectory: true,

        // transform-runtime，这个plugin的效果是：不用这plugin的话，babel会为每一个转换后的文件（在webpack这就是每一个chunk了）都添加一些辅助的方法（仅在需要的情况下）；而如果用了这个plugin，babel会把这些辅助的方法都集中到一个文件里统一加载统一管理，算是一个减少冗余，增强性能的优化项
        plugins: ['transform-runtime'],
      },
    },
    {
      test: /\.html$/,
      include: dirVars.srcRootDir,
      loader: 'html-loader',
    },
    {
      test: /\.ejs$/,
      include: dirVars.srcRootDir,
      loader: 'ejs-loader',
    },
    {
      // 图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
      // 如下配置，将小于8192byte的图片转成base64码
      test: /\.(png|jpg|gif)$/,
      include: dirVars.srcRootDir,
      // loader: 'url-loader?limit=8192&name=./static/img/[hash].[ext]',
      loader: 'url-loader',
      options: {
        limit: 8192,
        name: './static/img/[hash].[ext]',
      },
    },
    {
      // 专供bootstrap方案使用的，忽略bootstrap自带的字体文件
      test: /\.(woff|woff2|svg|eot|ttf)$/,
      include: /glyphicons/,
      loader: 'null-loader',
    },
    {
      // 专供iconfont方案使用的，后面会带一串时间戳，需要特别匹配到
      test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
      include: dirVars.srcRootDir,
      // exclude: /glyphicons/,
      // loader: 'file-loader?name=static/fonts/[name].[ext]',
      loader: 'file-loader',
      options: {
        name: 'static/fonts/[name].[ext]',
      },
    },

  ],
};
