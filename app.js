var Koa = require('koa')
var router = require('koa-route')
var app = new Koa()
var Nuxt = require('nuxt')
var fs = require('fs')
var fm = require('front-matter')
var md = require('marked')

var config = require('./nuxt.config.js')
config.dev = !(app.env === 'production')

var nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  nuxt.build()
  .catch((error) => {
    console.error(error) // eslint-disable-line no-console
    process.exit(1)
  })
}

// on startup, parse all posts with front-matter
const dir = './content/posts/'
const files = fs.readdirSync(dir)
const previewLength = 250
const posts = files.map((filename) => {
  const file = fs.readFileSync(dir+filename, {encoding: 'utf8'})
  var post = fm(file)
  post.preview = post.body.length > previewLength ? md(post.body.slice(0,250) + '...') : md(post.body)
  post.body = md(post.body)
  post.slug = filename.split('.')[0]
  post.url = '/log/'+post.slug
  return post
})

fs.writeFileSync('./content/posts.json', JSON.stringify(posts))

console.log('all posts parsed')

// API methods
// app.use(async (ctx, next) => {
//   ctx.set('Access-Control-Allow-Origin', '*');
//   next()
// });
//
// app.use(router.get('/api/posts', async (ctx) => {
//   ctx.type = 'application/json; charset=utf-8'
//   ctx.body = posts
// }))
//
// app.use(router.get('/api/post/:slug', async (ctx, slug) => {
//   ctx.body = posts.filter(post => post.slug === slug)
// }))

app.use(async (ctx, next) => {
  ctx.status = 200 // koa defaults to 404 when it sees that status is unset
  await nuxt.render(ctx.req, ctx.res)
})

app.listen(3000)
