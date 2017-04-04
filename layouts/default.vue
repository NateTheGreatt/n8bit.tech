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

export default {
  components: {
    MyHeader,
    MyFooter
  }
}
</script>

<style>
#__nuxt {
  margin-top: 100px;
}
h1 {
  padding-bottom: 10px;
  /*margin-bottom: 20px;*/
  border-bottom: 1px solid #ddd;
  font-size: 24px;
}
h2 {
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
