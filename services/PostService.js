import R from 'ramda'
let req = require.context('../content/posts', true, /^\.\/.*\.md$/)

let parsePosts = R.map((key) => {
  let post = req(key)
  let slug = key.split('/')[1].split('.')[0]
  return {
    attributes: post.attributes,
    slug: slug,
    body: post.body,
    url: '/log/' + slug
  }
})

var posts = parsePosts(req.keys())

// constants
const recentPostLimit = 5
const tagsPath = ['attributes','tags']
const datePath = ['attributes','date']

// tag partials
let rejectUndefinedTags = R.reject(R.pathEq(tagsPath, undefined))
let containsTag = tagName => R.pipe(R.path(tagsPath), R.contains(tagName))
let filterByTag = tagName => R.filter(containsTag(tagName))
let mapTags = R.map(R.path(tagsPath))

// date partials
let parsedDate = R.pipe(R.path(datePath), d => new Date(d))
let sortByDate = R.sortBy(parsedDate)
let sortByDateDesc = R.pipe(sortByDate, R.reverse)

// api
export default {
  getPost: slugName => R.find(R.propEq('slug', slugName))(posts),
  recentPosts: R.pipe(sortByDateDesc,R.take(recentPostLimit))(posts),
  allTags: R.pipe(mapTags, R.flatten, R.reject(R.isNil), R.uniq)(posts),
  findPostsWithTag: tagName => R.pipe(rejectUndefinedTags, filterByTag(tagName), sortByDateDesc)(posts)
}
