<template>
  <section class="container">
    <h2>Logs with the tag: {{this.params.name}}</h2>
    <div class="row">
      <div class="col-md-12" v-for="post in posts">
        <h2><nuxt-link v-bind:to="post.url">{{post.attributes.title}}</nuxt-link></h2>
        <small>{{post.attributes.date}}</small>
        <span v-if="post.attributes.tags"> | <nuxt-link :to="'/log/tag/'+tag" v-for="tag in post.attributes.tags"><span class="label label-success">{{tag}}</span></nuxt-link></span>
        <div class="post-preview" v-html="post.preview"></div>
        <nuxt-link v-if="post.body.length > post.preview.length" v-bind:to="post.url">Read more</nuxt-link>
        <hr />
      </div>
    </div>
  </section>
</template>
<script>
import posts from '../../../content/posts'
export default {
  name: 'log-index',
  asyncData ({params}) {
    var relativePosts = posts.filter(p => p.attributes.tags).filter(p => p.attributes.tags.indexOf(params.name) > -1)
    return { params: params, posts: relativePosts }
  },
  data () {
    return {
    }
  },
  head () {
    return {
      title: 'n8bit.tech | Tag ' + this.params.name
    }
  }
}
</script>

<style scoped>

a:hover {
  text-decoration: none;
}

.label {
  margin-right: 2px;
  font-weight: 100;
  letter-spacing: 0.1em;
}

.post-preview {
  margin-top: 10px;
}

</style>
