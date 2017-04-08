<template>
  <section class="container">
    <div class="col-md-12">
      <h1>Log entries with the tag: {{this.params.name}}</h1>
      <post-preview v-for="fm in relativePosts" v-bind:key="fm.slug" :fm="fm"></post-preview>
    </div>
  </section>
</template>
<script>
import PostPreview from '~components/PostPreview'
import PostService from '../../../services/PostService'

export default {
  name: 'tag-index',
  components: { PostPreview },
  asyncData ({params}) {
    return { params: params, relativePosts: PostService.findPostsWithTag(params.name) }
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
