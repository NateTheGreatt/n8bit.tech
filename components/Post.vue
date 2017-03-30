<template>
<div>
  <h1>
    {{ post.attributes.title }}
    <div class="date pull-right">{{ post.attributes.date }}</div>
  </h1>
  <div v-html="post.body" v-code-prettifier></div>
</div>
</template>

<script>
import md from 'marked'
import $ from 'jquery'
import hljs from 'highlightjs'

export default {
  props: ['slug', 'fm', 'preview'],
  computed: {
    post () {
      var post = this.fm

      // console.log(this.md)

      var previewLength = 250
      post.preview = post.body.length > previewLength
        ? md(post.body.slice(0, previewLength) + '...')
        : md(post.body)
      post.body = md(post.body)
      post.slug = this.slug
      post.url = '/log/' + post.slug
      return post
    }
  },
  directives: {
    codePrettifier: {
      bind (el, binding) {
        var $el = $(el)
        hljs.configure({languages: ['javascript']})
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

</style>
