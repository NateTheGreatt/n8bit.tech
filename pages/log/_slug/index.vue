<template>
  <section class="container">

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
      title: `Log`
    }
  }
}
</script>

<style scoped>

</style>
