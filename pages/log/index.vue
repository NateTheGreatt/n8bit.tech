<template>
  <section class="container">
    <h1 class="title">
      Log
    </h1>
    <p>Nothing logged yet.</p></section>
</template>
<script>

export default {
  data (context) {
    return { route: context.route }
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
