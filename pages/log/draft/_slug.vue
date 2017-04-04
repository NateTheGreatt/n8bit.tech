<template>
  <section class="container">
    <div class="col-md-12">
      <h1>{{ post.attributes.title }}<div class="metadata pull-right"><post-tag-list :tags="post.attributes.tags"></post-tag-list> | {{ post.attributes.date }}</div></h1>
      <div v-html="html" v-code-prettifier></div>
    </div>
  </section>
</template>

<script>
var req = require.context('../../../content/drafts', true, /^\.\/.*\.md$/)

export default {
  name: 'draft-slug',
  components: { PostTagList },
  computed: {
    html () {
      return md(this.post.body)
    }
  },
  asyncData (context) {
    return {
      route: context.route,
      params: context.params,
      url: 'https://n8bit.tech/log/' + context.params.slug,
      post: req('./' + context.params.slug + '.md')
    }
  },
  directives: {
    codePrettifier: {
      bind (el, binding) {
        var $el = $(el)
        $el.find('pre').each((i, block) => {
          hljs.highlightBlock(block)
        })
      }
    }
  },
  head () {
    return {
      title: 'n8bit.tech | ' + this.post.attributes.title
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
