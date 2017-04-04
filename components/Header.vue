<script>
import Harmonoscope from '~components/Harmonoscope.vue'
import $ from 'jquery'

export default {
  components: { Harmonoscope },
  data () {
    return {
      scrollTop: 0,
      threshold: 50,
      frequencies: {osc1: 300, osc2: 550}
    }
  },
  computed: {
    collapsed () { return this.scrollTop > this.threshold }
  },
  methods: {
    scrollHandle (e) {
      this.scrollTop = document.getElementsByTagName('body')[0].scrollTop
    },
    setFrequencies (a, b) {
      this.frequencies = {osc1: a, osc2: b}
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
    },
    collapseOnClick: {
      bind (el, binding) {
        var $el = $(el)
        $el.click(() => {
          $el.collapse('hide')
        })
      }
    }
  }
}
</script>

<template>
<header>
  <nav class="navbar navbar-default navbar-fixed-top" :class="{'collapsed': collapsed}" v-collapsing-nav="scrollHandle">
    <div class="container">

      <div class="center" :class="{'collapsed': collapsed}" >
        <!-- <nuxt-link class="logo" to="/"> -->
          <harmonoscope :collapsed="collapsed" :frequencies="frequencies" />
        <!-- </nuxt-link> -->
      </div>

      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
      </div>

      <div id="navbar" class="collapse navbar-collapse" :class="{'collapsed': collapsed}" v-collapse-on-click>
        <ul class="nav navbar-nav main">
          <li v-on:click="setFrequencies(300,550)"><nuxt-link to="/">Log</nuxt-link></li>
          <li v-on:click="setFrequencies(300,810)"><nuxt-link to="/about">About</nuxt-link></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li><a href="https://www.soundcloud.com/vyjl" target="_blank"><span class="fa fa-soundcloud"></span></a></li>
          <li><a href="https://www.linkedin.com/in/nathaniel-martin-865b1444/" target="_blank"><span class="fa fa-linkedin"></span></a></li>
          <li><a href="https://www.github.com/NateTheGreatt" target="_blank"><span class="fa fa-github"></span></a></li>
        </ul>
      </div>

    </div>
  </nav>
</header>
</template>

<style>

nav.navbar {
  height: 100px;
  padding-top: 26px;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

nav.navbar.collapsed {
  height: 50px;
  padding-top: 0px;
}

.navbar-right {
  margin-right: 0px;
}

.center {
  position: absolute;
  left: 50%;
  top: 10px;
  margin-left: -38px;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
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

/*mobile navbar*/
@media (max-width: 768px) {
  #navbar {
    position: relative;
    top: 22px;
    border-top: none;
    border-bottom: 1px solid #e7e7e7;
    text-align: right;
    background-color: #f8f8f8;
  }
  #navbar.collapsed {
    top: -1px;
  }
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
