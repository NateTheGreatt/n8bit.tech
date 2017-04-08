import R from 'ramda'
let postContext = require.context('../content/posts', true, /^\.\/.*\.md$/)
let draftContext = require.context('../content/drafts', true, /^\.\/.*\.md$/)

let parsePosts = R.map((key) => {
  let post = postContext(key)
  var slug = key.split('/')[1].split('.')[0]
  return {
    attributes: post.attributes,
    slug: slug,
    body: post.body,
    url: '/log/' + slug
  }
})

let parseDrafts = R.map((key) => {
  let draft = draftContext(key)
  var slug = key.split('/')[1].split('.')[0]
  return {
    attributes: draft.attributes,
    slug: slug,
    body: draft.body,
    url: '/log/' + slug
  }
})

var posts = parsePosts(postContext.keys())
var drafts = parseDrafts(draftContext.keys())

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

// post partials
let findPostBySlug = slugName => R.find(R.propEq('slug', slugName))

// api
export default {

  getPost: slugName => findPostBySlug(slugName)(posts),
  getDraft: slugName => findPostBySlug(slugName)(drafts),

  recentPosts: R.pipe(
    sortByDateDesc,
    R.take(recentPostLimit)
  )(posts),

  allTags: R.pipe(
    mapTags,
    R.flatten,
    R.reject(R.isNil),
    R.uniq
  )(posts),

  findPostsWithTag: tagName => R.pipe(
    rejectUndefinedTags,
    filterByTag(tagName),
    sortByDateDesc
  )(posts)

}
