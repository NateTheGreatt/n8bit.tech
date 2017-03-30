<template>
  <section class="container">
    <h1>
      {{ post.attributes.title }}
      <div class="date pull-right">{{ post.attributes.date }}</div>
    </h1>
    <div v-html="post.body" v-prettyprinter></div>
    <div class="comments">
      <vue-disqus shortname="n8bit" :identifier="post.slug"></vue-disqus>
    </div>
  </section>
</template>

<script>
import $ from 'jquery'
import hljs from 'highlightjs'
// import 'highlightjs/styles/monokai-sublime.css'
import 'highlightjs/styles/atom-one-dark.css'
// import 'highlightjs/styles/androidstudio.css'
// import 'highlightjs/styles/dracula.css'
import VueDisqus from 'vue-disqus/VueDisqus.vue'
import posts from '../../../content/posts'
export default {
  name: 'log-slug',
  components: {
    VueDisqus
  },
  asyncData (context) {
    return {
      route: context.route,
      post: posts.find(p => p.slug === context.params.slug)
    }
  },
  head () {
    return {
      title: 'n8bit.tech | ' + this.post.attributes.title
    }
  },
  directives: {
    prettyprinter: {
      bind (el, binding) {
        var $el = $(el)
        hljs.configure({languages: ['javascript']})
        $el.find('pre').each((i, block) => {
          hljs.highlightBlock(block)
        })
      }
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
