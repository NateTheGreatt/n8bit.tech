<template>
  <div>
    <my-header/>
    <nuxt/>
    <my-footer/>
  </div>
</template>

<script>
import MyHeader from '~components/Header.vue'
import MyFooter from '~components/Footer.vue'
import Harmonoscope from '~components/Harmonoscope.vue'

export default {
  components: {
    MyHeader,
    MyFooter,
    Harmonoscope
  }
}
</script>

<style>
#__nuxt {
  /*margin-top: 15px;*/
}
</style>
