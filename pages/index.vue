<template>
  <section class="container">
    <!-- <h1 class="title">
      Log
    </h1> -->
    <div class="row">
      <div class="col-md-12" v-for="post in posts">
        <h2><nuxt-link v-bind:to="post.url">{{post.attributes.title}}</nuxt-link></h2>
        <small>{{post.attributes.date}}</small>
        <div class="post-preview" v-html="post.preview"></div>
        <nuxt-link v-if="post.body.length > post.preview.length" v-bind:to="post.url">Read more</nuxt-link>
        <hr />
      </div>
    </div>
  </section>
</template>
<script>
import posts from '../content/posts'
export default {
  name: 'log-index',
  asyncData (context) {
    return { route: context.route }
  },
  data () {
    return { posts }
  },
  head () {
    return {
      title: this.route.name
    }
  }
}
</script>

<style scoped>
h2 {
  margin-bottom: 5px;
}
.post-preview {
  margin-top: 10px;
}
</style>
