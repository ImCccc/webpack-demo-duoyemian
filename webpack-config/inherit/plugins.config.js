var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var dirVars = require('../base/dir-vars.config.js');
var pageArr = require('../base/page-entries.config.js');

var configPlugins = [
  /* 全局shimming */
  /*
      ProvidePlugin的机制是：当webpack加载到某个js模块里，出现了未定义且名称符合（字符串完全匹配）配置中key的变量时，会自动require配置中value所指定的js模块

      使用ProvidePlugin还有个好处，就是，你自己写的代码里，再！也！不！用！require！jQuery！啦！

      {
        test: require.resolve('jquery'),  // 此loader配置项的目标是NPM中的jquery
        loader: 'expose?$!expose?jQuery', // 先把jQuery对象声明成为全局变量`jQuery`，再通过管道进一步又声明成为全局变量`$`
      },
      有了ProvidePlugin为嘛还需要expose-loader？问得好，如果你所有的jQuery插件都是用webpack来加载的话，
      的确用ProvidePlugin就足够了；但理想是丰满的，现实却是骨感的，总有那么些需求是只能用<script>来加载的

  */
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    'window.$': 'jquery',
  }),


  /*抽取出所有通用的部分*/ 
  new webpack.optimize.CommonsChunkPlugin({

    // 给这个包含公共代码的chunk命个名（唯一标识）
    name: 'commons/commons',      // 需要注意的是，chunk的name不能相同！！！

    // chunks，表示需要在哪些chunk（也可以理解为webpack配置中entry的每一项）里寻找公共代码进行打包。不设置此参数则默认提取范围为所有的chunk。

    // 如何命名打包后生产的js文件，也是可以用上[name]、[hash]、[chunkhash]这些变量的,  实际上就是'commons/commons/bundle.js'了
    // 最终生成文件的路径是根据webpack配置中的ouput.path和上面CommonsChunkPlugin的filename参数来拼的
    filename: '[name]/bundle.js',

    // 公共代码的判断标准：某个js模块被多少个chunk加载了才算是公共代码。
    minChunks: 4,
  }),



  /*
    抽取出chunk的css :

    ExtractTextPlugin的初始化参数不多，唯一的必填项是filename参数，也就是如何来命名生成的CSS文件。跟webpack配置里的output.filename参数类似，这ExtractTextPlugin的filename参数也允许使用变量，包括[id]、[name]和[contenthash]；
    理论上来说如果只有一个chunk，那么不用这些变量，写死一个文件名也是可以的，
    但由于我们要做的是多页应用，必然存在多个chunk（至少每个entry都对应一个chunk啦）。这里我是这么设置的

    [name]对应的是chunk的name，我在webpack配置中把各个entry的name都按index/index、index/login这样的形式来设置了，那么最后css的路径就会像这样：build/index/index/styles.css，也就是跟chunk的js文件放一块了（js文件的路径形如build/index/index/entry.js）

    还要在loader配置里做相应的修改
  */
  new ExtractTextPlugin('[name]/styles.css'),
  /* 配置好Dll */
  // new webpack.DllReferencePlugin({
  //   context: dirVars.staticRootDir, // 指定一个路径作为上下文环境，需要与DllPlugin的context参数保持一致，建议统一设置为项目根目录
  //   manifest: require('../../manifest.json'), // 指定manifest.json
  //   name: 'dll',  // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
  // }),
];

pageArr.forEach((page) => {
  const htmlPlugin = new HtmlWebpackPlugin({
    filename: `${page}/page.html`,
    template: path.resolve(dirVars.pagesDir, `./${page}/html.js`),
    // 意思是加载 page 下面的js , 和加载 commons/commons 目录下的js
    chunks: [page, 'commons/commons'],
    hash: true, // 为静态资源生成hash值
    xhtml: true,
  });
  configPlugins.push(htmlPlugin);
});

module.exports = configPlugins;
