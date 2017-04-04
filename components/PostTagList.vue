<template>
<span v-if="tags" class="tag-list"> | <nuxt-link v-for="tag in tags" :to="'/log/tag/'+tag"><span class="label label-default">{{tag}}</span></nuxt-link></span>
</template>

<script>
export default {
  props: ['tags']
}
</script>

<style>
.label {
  position: relative;
  bottom: 0px;
  margin-right: 2px;
  font-weight: normal;
  letter-spacing: 0.1em;
}
.label:hover {
  top: -1px;
}
.tag-list > a {
  padding-bottom: 2px;
  display: inline-block;
}
.label-default {
  background-color: #546f82;
}
</style>
