const fs = require('fs')
const fm = require('front-matter')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'n8bit.tech',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' },
      { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' }
    ],
    script:[
      // { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' },
      // { src: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js' }
      // { src: 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?autorun=false&skin=desert' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '~assets/css/main.css'
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#00BFFF' },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['jquery', 'bootstrap'],
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })//,
      // new BundleAnalyzerPlugin()
      // new webpack.optimize.UglifyJsPlugin()
    ],
    extend (config, ctx) {
      config.module.rules.push({
        test: /\.md$/,
        exclude: /(node_modules)/,
        use: [
          {loader: 'json-loader'},
          {loader: 'front-matter-loader'}
        ]
      })
      if (ctx.isClient) {
        /*
        ** Run ESLINT on save
        */
        // config.module.rules.push({
        //   enforce: 'pre',
        //   test: /\.(js|vue)$/,
        //   loader: 'eslint-loader',
        //   exclude: /(node_modules)/
        // })
      }
    }
  },
  plugins: [
    { src: '~plugins/ga.js', ssr: false }
  ],
  generate: {
    routes: function(cb) {
      var postsDir = './content/posts'
      var draftsDir = './content/drafts'

      var posts = fs.readdirSync(postsDir)
      var postRoutes = posts.map(p => '/log/' + p.split('.')[0])

      var tagRoutes = posts
        .map(p => fm(fs.readFileSync(postsDir+'/'+p,{encoding:'utf8'})).attributes.tags)
        .filter(tags => tags)
        .reduce((a,b) => a.concat(b))
        .map(tag => '/log/tag/'+tag)
      // console.log(tagRoutes)

      var draftRoutes = fs.readdirSync(draftsDir).map(p => '/log/draft/' + p.split('.')[0])

      var allRoutes = postRoutes.concat(draftRoutes).concat(tagRoutes)

      cb(null, allRoutes)
    }
  }
}
