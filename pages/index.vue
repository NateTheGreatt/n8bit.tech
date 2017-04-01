<template>
  <section class="container">
    <div class="row">
      <post-preview v-for="fm in recentPosts" :fm="fm"></post-preview>
    </div>
  </section>
</template>
<script>
import md from 'marked'
import PostPreview from '~components/PostPreview.vue'

var req = require.context('../content/posts', true, /^\.\/.*\.md$/)

export default {
  name: 'log-index',
  components: { PostPreview },
  data () {
    var maxRecent = 5
    var previewLength = 250
    var recentPosts = req.keys()
      .map((key) => {
        var post = req(key)
        var slug = key.split('/')[1].split('.')[0]
        return {
          attributes: post.attributes,
          slug: slug,
          body: post.body,
          url: '/log/' + slug
        }
      })
      .sort((a,b) => {
        var dateA = new Date(a.attributes.date)
        var dateB = new Date(b.attributes.date)
        return dateB - dateA
      })
      .slice(0,maxRecent)

    return { recentPosts }
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
a:hover {
  text-decoration: none;
}

.label {
  margin-right: 2px;
  font-weight: 100;
  letter-spacing: 0.1em;
}

.post-preview {
  /*margin-top: 10px;*/
}

h2 {
  margin-bottom: 5px;
}
</style>
