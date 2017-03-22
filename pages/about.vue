<template>
  <section class="container">
    <h1 class="title">
      About
    </h1>

  </section>
</template>
<script>
export default {
  data ({ req }) {
    return {
      name: req ? 'server' : 'client'
    }
  },
  head () {
    return {
      title: `About`
    }
  }
}
</script>

<style scoped>

</style>
