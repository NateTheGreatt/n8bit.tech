<template>
  <section class="container">
    <h1>Log entries with the tag: {{this.params.name}}</h1>
    <div class="row">
      <post-preview v-for="fm in relativePosts" :fm="fm"></post-preview>
    </div>
  </section>
</template>
<script>
import TagList from '~components/TagList'
import PostPreview from '~components/PostPreview'
var req = require.context('../../../content/posts', true, /^\.\/.*\.md$/)

export default {
  name: 'tag-index',
  components: { TagList, PostPreview },
  asyncData ({params}) {
    return { params }
  },
  computed: {
    relativePosts () {
      return req.keys()
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
        .filter(post => post.attributes.tags)
        .filter(post => post.attributes.tags.indexOf(this.params.name) > -1)
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
