<template>
  <section class="container">
    <h1>{{ post.attributes.title }}<div class="date pull-right"><tag-list :tags="post.attributes.tags"></tag-list> | {{ post.attributes.date }}</div></h1>
    <div v-html="html" v-code-prettifier></div>
    <vue-disqus shortname="n8bit" :identifier="params.slug" :url="url"></vue-disqus>
  </section>
</template>

<script>
import md from 'marked'
import VueDisqus from 'vue-disqus/VueDisqus.vue'
import TagList from '~components/TagList'
import 'highlightjs/styles/atom-one-dark.css'
import hljs from 'highlightjs/highlight.pack.min.js';
hljs.configure({languages: ['javascript']})

var req = require.context('../../../content/posts', true, /^\.\/.*\.md$/)

export default {
  name: 'draft-slug',
  components: { VueDisqus, TagList },
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
