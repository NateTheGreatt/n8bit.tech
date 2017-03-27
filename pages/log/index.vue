<template>
  <section class="container">
    <h1 class="title">
      Log
    </h1>
    <div class="row">
      <div class="col-md-12" v-for="post in posts">
        <h2><nuxt-link v-bind:to="post.url">{{post.attributes.title}}</nuxt-link></h2>
        <small>{{post.attributes.date}}</small>
        <p v-html="post.preview"></p>
        <nuxt-link v-bind:to="post.url">Read more</nuxt-link>
        <hr />
      </div>
    </div>
  </section>
</template>
<script>
import posts from '../../content/posts'
export default {
  name: 'log-index',
  asyncData (context) {
    return { route: context.route, posts: posts }
  },
  head () {
    return {
      title: 'n8bit.tech | ' + this.route.name
    }
  }
}
</script>

<style scoped>
h2 {
  margin-bottom: 5px;
}
p {
  margin-top: 10px;
}
</style>
