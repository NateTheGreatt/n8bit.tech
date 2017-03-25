import Vuex from 'vuex'
// import axios from 'axios'
// import marked from 'marked'

const store = new Vuex.Store({
  state: {
    pages: {},
    posts: []
  },
  actions: {
    async nuxtServerInit ({ commit }, { route }) {
      // await axios.get(`http://localhost:3000/pages/${route.name}.md`)
      //   .then((res) => {
      //     commit('addPage', {name: route.name, html: marked(res.data)})
      //   })
    }
  },
  mutations: {
    addPage (state, page) {
      state.pages[page.name] = page.html
    },
    addPost (state, post) {
      state.posts.push(post)
    }
  }
})

export default store
