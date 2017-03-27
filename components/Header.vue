<script>
import Harmonoscope from '~components/Harmonoscope.vue'

export default {
  components: { Harmonoscope },
  data () {
    return {
      scrollTop: 0,
      threshold: 50,
      frequencies: {osc1: 300, osc2: 550},
      setFrequencies (a, b) {
        this.frequencies = {osc1: a, osc2: b}
      }
    }
  },
  computed: {
    collapsed () { return this.scrollTop > this.threshold }
  },
  methods: {
    scrollHandle (e) {
      this.scrollTop = document.getElementsByTagName('body')[0].scrollTop
    }
  },
  directives: {
    collapsingNav: {
      bind (el, binding) {
        window.addEventListener('scroll', binding.value)
      },
      unbind (el, binding) {
        window.removeEventListener('scroll', binding.value)
      }
    }
  }
}
</script>

<template>
<header>
  <nav class="navbar navbar-default navbar-fixed-top" :class="{'collapsed': collapsed}" v-collapsing-nav="scrollHandle">
    <div class="container">
      <ul class="nav navbar-nav navbar-collapse collapse main">
        <li v-on:click="setFrequencies(300,550)"><nuxt-link to="/">Log</nuxt-link></li>
        <!-- <li v-on:click="setFrequencies(300,390)"><nuxt-link to="/log">Log</nuxt-link></li> -->
        <li v-on:click="setFrequencies(300,810)"><nuxt-link to="/about">About</nuxt-link></li>
        <!-- <li><nuxt-link to="/lab">Lab</nuxt-link></li> -->
        <!-- <li><nuxt-link to="/portfolio">Portfolio</nuxt-link></li> -->
      </ul>
      <div class="center" :class="{'collapsed': collapsed}" >
        <!-- <nuxt-link class="logo" to="/"> -->
          <harmonoscope :collapsed="collapsed" :frequencies="frequencies" />
        <!-- </nuxt-link> -->
      </div>
      <ul class="nav navbar-nav pull-right">
        <li><a href="https://www.soundcloud.com/vyjl" target="_blank"><span class="fa fa-soundcloud"></span></a></li>
        <li><a href="https://www.linkedin.com/in/nathaniel-martin-865b1444/" target="_blank"><span class="fa fa-linkedin"></span></a></li>
        <li><a href="https://www.github.com/NateTheGreatt" target="_blank"><span class="fa fa-github"></span></a></li>
      </ul>
    </div>
  </nav>
</header>
</template>

<style>

nav.navbar {
  height: 100px;
  padding-top: 26px;
  -webkit-transition: all 0.4s ease;
  transition: all 0.4s ease;
}

nav.navbar.collapsed {
  height: 50px;
  padding-top: 0px;
}

.center {
  position: absolute;
  left: 50%;
  top: 10px;
  margin-left: -38px;
  -webkit-transition: all 0.4s ease;
  transition: all 0.4s ease;
}
.center.collapsed {
  top: 0px;
  margin-left: -23px;
}

.logo {
  padding: 0!important;
  margin-top: -15px;
}

.navbar-nav>li>a:hover{color:#00BFFF!important;}
.navbar-nav>li>a:focus{color:#00BFFF!important;}

.navbar-nav.main
{
  letter-spacing: 1px;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 11px;
}
/*.navbar-nav>li>a{color:#999!important;}*/
/*header {
  height: 50px;
}

ul.social a {
  margin: 8px;
}

.navbar {
  background-color: #333;
  border: 0;
}
*/

</style>
