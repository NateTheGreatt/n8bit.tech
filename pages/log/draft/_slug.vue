<template>
  <section class="container">
    <h1>{{ post.attributes.title }}<div class="date pull-right">{{ post.attributes.date }}</div></h1>
    <div v-html="html" v-code-prettifier></div>
  </section>
</template>

<script>

var req = require.context('../../../content/drafts', true, /^\.\/.*\.md$/)

export default {
  name: 'draft-slug',
  // components: { Post },
  computed: {
    html () {
      return md(this.post.body)
    }
  },
  asyncData (context) {
    return {
      route: context.route,
      post: req('./' + context.params.slug + '.md')
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
