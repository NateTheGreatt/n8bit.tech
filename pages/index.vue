<template>
  <section class="container" v-html="html"></section>
</template>
<script>

export default {
  data (context) {
    return { route: context.route, html: context.html }
  },
  head () {
    return {
      title: this.route.name
    }
  }
}
</script>

<style scoped>

</style>
