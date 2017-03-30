<template>
  <section class="container">
    <post :fm="fm"></post>
  </section>
</template>

<script>
import 'highlightjs/styles/atom-one-dark.css'
import Post from '~components/Post.vue'
// import posts from '../../../content/drafts'

var req = require.context('../../../content/drafts', true, /^\.\/.*\.md$/)

export default {
  name: 'draft-slug',
  components: { Post },
  asyncData (context) {
    // console.log(req('./' + context.params.slug + '.md'))
    return {
      route: context.route,
      fm: req('./' + context.params.slug + '.md')
      // post: posts.find(p => p.slug === context.params.slug)
      // post: marked(require('../../../content/drafts/' + context.params.slug + '.md'))
    }
  }
}
</script>

<style>
.hljs {
  border-radius: 0;
  padding: 1em!important;
}
.date {
  font-size: 12px;
  color: #ccc;
  bottom: 0px;
  display: inline-block;
  margin-top: 11px;
}
h1 {
  margin-bottom: 20px
}
</style>
