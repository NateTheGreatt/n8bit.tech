<template>
<span v-if="tags"> | <nuxt-link v-for="tag in tags" :to="'/log/tag/'+tag"><span class="label label-default">{{tag}}</span></nuxt-link></span>
</template>

<script>
export default {
  props: ['tags']
}
</script>

<style>
.label {
  margin-right: 2px;
  font-weight: normal;
  letter-spacing: 0.1em;
}
.label-default {
  background-color: #546f82;
}
</style>
