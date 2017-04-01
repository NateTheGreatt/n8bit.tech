<template>
<div class="col-md-12" >
    <h2><nuxt-link v-bind:to="post.url">{{post.title}}</nuxt-link></h2>
    <small>{{post.date}}</small><tag-list :tags="post.tags"></tag-list>
    <div class="post-preview" v-html="post.preview" v-code-prettifier></div>
    <nuxt-link v-if="post.body.length > previewLength" v-bind:to="post.url">Read more</nuxt-link>
    <hr />
</div>
</template>

<script>
import TagList from './TagList'
import md from 'marked'
import $ from 'jquery'
import 'highlightjs/styles/atom-one-dark.css'
import hljs from 'highlightjs/highlight.pack.min.js';
hljs.configure({languages: ['javascript']})

export default {
  props: ['fm'],
  components: { TagList },
  data () {
    return {
      previewLength: 250,
    }
  },
  computed: {
    post () {
      if(this.fm) {
        return {
          title: this.fm.attributes.title,
          date: this.fm.attributes.date,
          tags: this.fm.attributes.tags,
          url: this.fm.url,
          body: this.fm.body,
          preview: this.fm.body.length > this.previewLength
            ? md(this.fm.body.slice(0, this.previewLength) + '...')
            : md(this.fm.body)
        }
      }
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
  }
}
</script>

<style scoped>
hr {
  margin-bottom: 0.6em;
}
</style>
