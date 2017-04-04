import R from 'ramda'
let req = require.context('../content/posts', true, /^\.\/.*\.md$/)

let posts = R.map((key) => {
  let post = req(key)
  let slug = key.split('/')[1].split('.')[0]
  return {
    attributes: post.attributes,
    slug: slug,
    body: post.body,
    url: '/log/' + slug
  }
})(req.keys())

// constants
const recentPostLimit = 5
const tagsPath = ['attributes','tags']
const datePath = ['attributes','date']

// partials
let rejectUndefinedTags = R.reject(R.pathEq(tagsPath, undefined))
let filterByTag = tagName => R.filter(R.pipe(R.path(tagsPath), R.contains(tagName)))
let sortByDateDesc = R.pipe(R.sortBy(R.pipe(R.path(datePath), d => new Date(d))), R.reverse)


// api
export default {
  recentPosts: R.pipe(sortByDateDesc,R.take(recentPostLimit))(posts),
  allTags: R.pipe(R.map(R.path(tagsPath)), R.flatten, R.reject(R.isNil), R.uniq)(posts),
  findPostsWithTag: tagName => R.pipe(rejectUndefinedTags, filterByTag(tagName), sortByDateDesc)(posts)
}
