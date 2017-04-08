<template>
  <section class="container">
    <div class="col-md-12">
      <h1>{{ post.attributes.title }}<div class="metadata pull-right">{{ post.attributes.date }}</div></h1>
      <div v-html="html" v-code-prettifier></div>
    </div>
  </section>
</template>

<script>
import md from 'marked'
import PostTagList from '~components/PostTagList'
import PostService from '../../../services/PostService'
import 'highlightjs/styles/atom-one-dark.css'
import hljs from 'highlightjs/highlight.pack.min.js'
hljs.configure({languages: ['javascript']})

export default {
  name: 'draft-slug',
  components: { PostTagList },
  data () {
    return {
    }
  },
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
      post: PostService.getDraft(context.params.slug)
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
h1 {
  margin-bottom: 20px
}
.hljs {
  border-radius: 0;
  padding: 1em!important;
}
.metadata {
  font-size: 12px;
  color: #ccc;
  margin-top: 11px;
}
.metadata .tag-list a {
  position: relative;
  top: -1px;
}
</style>
