<template>
  <section class="container">
    <page :fm="fm"></page>
  </section>
</template>
<script>
import Page from '~components/Page'

var req = require.context('../content/pages', true, /^\.\/.*\.md$/)

export default {
  name: 'about',
  components: { Page },
  asyncData (context) {
    return {
      route: context.route,
      fm: req('./about.md')
    }
  },
  head () {
    return {
      title: 'n8bit.tech | ' + this.route.name
    }
  }
}
</script>
