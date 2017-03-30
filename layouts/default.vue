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
  margin-top: 100px;
}
section h1 {
  padding-bottom: 10px;
  /*margin-bottom: 20px;*/
  border-bottom: 1px solid #ddd;
  font-size: 24px;
}
section h2 {
  font-size: 18px;
}
p {
  margin: 1.6em 0;
  line-height: 1.6em;
}
hr {
  margin: 1.6em 0;
}
</style>
