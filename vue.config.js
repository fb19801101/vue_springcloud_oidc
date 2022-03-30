// vue-cli3的一些服务配置都迁移到 CLI Service 里面了，对于一些基础配置和一些扩展配置需要在根目录新建一个vue.config.js文件进行配置
// 使用 vuecli3 来构建的项目相较于 vuecli2 来说少了 cnfig 目录

const path = require('path')
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const resolve = (dir) => path.join(__dirname, dir)

module.exports = {
  // 所有 webpack-dev-server 的选项都支持
  devServer: {
    overlay: {
      warning: false,
      err: false
    },
    hot: true,
    hotOnly: true, // 是否热更新
    open: true, // 设置自动打开
    host: process.env.VUE_APP_LOCAL_HOST,
    port: process.env.VUE_APP_LOCAL_PORT, // 设置端口
    proxy: { // 设置多个代理跨域
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_REQUEST_URL,
        changeOrigin: true,
        // secure: false, // 如果是http接口，需要配置该参数
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      },

      '/api': { // 拦截所有 HTTP 请求，将之转发到后端服务器上（前端默认端口是 8880），后端的端口是 8085，如果大家有统一的请求前缀那么可以写成/xxx
        target: process.env.VUE_APP_REQUEST_URL,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/authorization_callback': { // 拦截所有 HTTP 请求，将之转发到后端服务器上（前端默认端口是 8880），后端的端口是 8085，如果大家有统一的请求前缀那么可以写成/xxx
        target: [process.env.VUE_APP_REQUEST_URL + '/authorization_callback'],
        changeOrigin: true,
        pathRewrite: {
          '^/authorization_callback': ''
        }
      }
    },
    disableHostCheck: true
  },

  /** 区分打包环境与开发环境
   * 部署应用时的基本 URL 基本路径 baseUrl 从 Vue CLI 3.3 起已弃用使用 publicPath 来替代
   * process.env.NODE_ENV==='production'  (打包环境)
   * process.env.NODE_ENV==='development' (开发环境)
   * publicPath: process.env.NODE_ENV==='production'?"https://cdn.aliyun.com/front/":'front/',
   */
  publicPath: IS_PROD ? './' : process.env.VUE_APP_LOCAL_PAHT + '/',

  // 输出目录（打包位置） build时构建文件的目录 构建时传入 --no-clean 可关闭该行为
  outputDir: 'dist' + process.env.VUE_APP_LOCAL_PAHT,

  // build时放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: 'static',

  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  indexPath: 'index.html',

  // 默认在生成的静态资源文件名中包含hash以控制缓存
  filenameHashing: true,

  // 构建多页面应用，页面的配置
  // pages: {
  //   index: {
  //     // page 的入口
  //     entry: 'src/index/main.js',
  //     // 模板来源
  //     template: 'public/index.html',
  //     // 在 dist/index.html 的输出
  //     filename: 'index.html',
  //     // 当使用 title 选项时，
  //     // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
  //     title: 'Index Page',
  //     // 在这个页面中包含的块，默认情况下会包含
  //     // 提取出来的通用 chunk 和 vendor chunk。
  //     chunks: ['chunk-vendors', 'chunk-common', 'index']
  //   },
  //   // 当使用只有入口的字符串格式时，
  //   // 模板会被推导为 `public/subpage.html`
  //   // 并且如果找不到的话，就回退到 `public/index.html`。
  //   // 输出文件名会被推导为 `subpage.html`。
  //   subpage: 'src/subpage/main.js'
  // },

  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码 (在生产构建时禁用 eslint-loader)
  // 是否开启eslint保存检测，有效值： true | false | 'error'
  // 设置为 true 时，eslint-loader 会将 lint 错误输出为编译警告。默认情况下，警告仅仅会被输出到命令行，且不会使得编译失败
  // 希望让 lint 错误在开发时直接显示在浏览器中，可以使用 lintOnSave: 'error'。这会强制 eslint-loader 将 lint 错误输出为编译错误
  lintOnSave: !IS_PROD,

  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,

  // Babel 显式转译列表
  transpileDependencies: [],

  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  productionSourceMap: !IS_PROD,

  // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性（注：仅影响构建时注入的标签）
  crossorigin: '',

  // 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)
  integrity: false,

  // 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中
  // 如果你需要基于环境有条件地配置行为，或者想要直接修改配置，那就换成一个函数 (该函数会在环境变量被设置之后懒执行)。该方法的第一个参数会收到已经解析好的配置。在函数内，你可以直接修改配置，或者返回一个将会被合并的对象
  configureWebpack: {},

  // 对内部的 webpack 配置（比如修改、增加Loader选项）(链式操作)
  chainWebpack: config => {
    config.resolve.symlinks(true) // 修复热更新失效
    // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
    config.plugin('html').tap(args => {
      // 修复 Lazy loading routes Error
      args[0].chunksSortMode = 'none'
      return args
    })

    config.resolve.alias // 添加别名
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@styles', resolve('src/styles'))
      .set('@components', resolve('src/components'))
      .set('@icons', resolve('src/icons'))
      .set('@views', resolve('src/views'))
      .set('@router', resolve('src/router'))
      .set('@store', resolve('src/store'))

    // 已有配置排除掉svg
    config.module.rule('svg')
      .exclude.add(resolve('src/icons'))

    // 配置svg
    config.module.rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons')).end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' })
  },

  // css的处理
  css: {
    // 当为true时，css文件名可省略 module 默认为 false
    // modules: true,
    // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中,当作为一个库构建时，你也可以将其设置为 false 免得用户自己导入 CSS
    // 默认生产环境下是 true，开发环境下是 false
    extract: IS_PROD,
    requireModuleExtension: true, // 去掉文件名中的 .module   与 modules: true冲突
    // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能
    sourceMap: false,
    // 向 CSS 相关的 loader 传递选项(支持 css-loader postcss-loader sass-loader less-loader stylus-loader)
    loaderOptions: {
      css: {},
      stylus: {
        import: '~@/styles/index.styl'
      },
      scss: {
        prependData: '@import "~@/styles/index.scss"'
      },
      less: {
        prependData: '@import "~@/styles/index.less"',
        lessOptions: {
          modifyVars: {
            'primary-color': '#ec6800'
          },
          javascriptEnabled: true
        }
      }
    }
  },

  // 是否为 Babel 或 TypeScript 使用 thread-loader
  parallel: require('os').cpus().length > 1,

  // 向 PWA 插件传递选项
  pwa: {},

  // 可以用来传递任何第三方插件选项
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'stylus',
      patterns: [
        path.resolve(__dirname, './src/styles/index.styl')
      ]
    }
  }
}
