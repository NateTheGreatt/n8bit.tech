<template>
  <section class="container">
      <div class="col-sm-9" >
        <post-preview v-for="fm in recentPosts" :fm="fm"></post-preview>
      </div>
      <div class="col-sm-3 hidden-xs">
        <div class="sidebar">
          <h4>Tags</h4>
          <ol class="list-unstyled">
            <li v-for="tag in allTags"><nuxt-link :to="'/log/tag/'+tag">{{tag}}</nuxt-link></li>
          </ol>
        </div>
    </div>
  </section>
</template>
<script>
import md from 'marked'
import PostPreview from '~components/PostPreview.vue'
import PostService from '../services/PostService'

export default {
  name: 'log-index',
  components: { PostPreview },
  data () {
    return { recentPosts: PostService.recentPosts, allTags: PostService.allTags }
  },
  asyncData ({route}) {
    return { route }
  },
  head () {
    return {
      title: 'n8bit.tech'
    }
  }
}
</script>

<style scoped>
h2 {
  margin-bottom: 5px;
}

a:hover {
  text-decoration: none;
}

.label {
  margin-right: 2px;
  font-weight: 100;
  letter-spacing: 0.1em;
}

.sidebar {
  margin-top: 20px;
  background-color: #f8f8f8;
  border: 1px solid #e7e7e7;
  padding: 10px 15px;
}

.list-unstyled {
  list-style: none;
}
</style>
