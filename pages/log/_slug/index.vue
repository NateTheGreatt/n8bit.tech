<template>
  <section class="container">
    <h1>
      {{ post.attributes.title }}
      <div class="date pull-right">{{ post.attributes.date }}</div>
    </h1>
    <div v-html="post.body"></div>
    <div class="comments">
      <vue-disqus shortname="n8bit" :identifier="post.slug"></vue-disqus>
    </div>
  </section>
</template>
<script>
import VueDisqus from 'vue-disqus/VueDisqus.vue'
import posts from '../../../content/posts'
export default {
  name: 'log-slug',
  components: {
    VueDisqus
  },
  asyncData (context) {
    return {
      route: context.route,
      post: posts.find(p => p.slug === context.params.slug)
    }
  },
  head () {
    return {
      title: 'n8bit.tech | ' + this.post.attributes.title
    }
  }
}
</script>

<style scoped>
.date {
  font-size: 12px;
  color: #ccc;
  bottom: 0px;
  display: inline-block;
  margin-top: 11px;
}
</style>
