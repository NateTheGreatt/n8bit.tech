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
      title: `About`
    }
  }
}
</script>

<style scoped>

</style>
