<template>
<div class="col-md-12">
  <div v-html="html"></div>
</div>
</template>

<script>
import md from 'marked'
import $ from 'jquery'
import hljs from 'highlightjs'

export default {
  props: ['fm'],
  computed: {
    html () {
      return md(this.fm.body)
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
  }
}
</script>

<style>

</style>
