// vue.config.js
module.exports = {
  publicPath: './',
  // configureWebpack: {
  //   externals: {
  //     vue: 'Vue',
  //     'vue-router': 'VueRouter',
  //     vuex: 'Vuex',
  //     axios: 'axios',
  //     'element-ui': 'ELEMENT'
  //   }
  // }
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config
        .entry('app')
        .clear()
        .add('./src/main.js')
      config.set('externals', {
        vue: 'Vue',
        axios: 'axios',
        'element-ui': 'ELEMENT',
        'vue-router': 'VueRouter',
        vuex: 'Vuex'
      })

      // 在html文件中引入相关CDN
      const cdn = {
        css: [
          // element-ui css
          'https://cdn.bootcss.com/element-ui/2.13.0/theme-chalk/index.css'
        ],
        js: [
          // vue
          'https://cdn.bootcss.com/vue/2.6.11/vue.runtime.min.js',
          // vue-router
          'https://cdn.bootcss.com/vue-router/3.1.5/vue-router.min.js',
          // vuex
          'https://cdn.staticfile.org/vuex/3.1.2/vuex.min.js',
          // axios
          'https://cdn.staticfile.org/axios/0.19.0-beta.1/axios.min.js',
          // element-ui js
          'https://cdn.bootcss.com/element-ui/2.13.0/index.js'
        ]
      }
      config.plugin('html')
        .tap(args => {
          args[0].cdn = cdn
          return args
        })
    }
  }
}
