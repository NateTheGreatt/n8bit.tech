<template>
  <section class="container" v-html="html"></section>
</template>
<script>
import md from '../content/pages/about.md'

export default {
  name: 'about',
  asyncData (context) {
    return { route: context.route }
  },
  computed: {
    html () { return md }
  },
  head () {
    return {
      title: 'n8bit.tech | ' + this.route.name
    }
  }
}
</script>
