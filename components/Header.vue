<script>
import Harmonoscope from '~components/Harmonoscope.vue'

export default {
  components: { Harmonoscope }
}
</script>

<template>
<header>
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
      <div class="center"><nuxt-link class="logo" to="/"><harmonoscope/></nuxt-link></div>
      <ul class="nav navbar-nav">
        <li><nuxt-link to="/">Home</nuxt-link></li>
        <li><nuxt-link to="/blog">Blog</nuxt-link></li>
        <li><nuxt-link to="/about">About</nuxt-link></li>
        <li><nuxt-link to="/lab">Lab</nuxt-link></li>
        <li><nuxt-link to="/portfolio">Portfolio</nuxt-link></li>
      </ul>
      <ul class="nav navbar-nav pull-right social">
        <a href="https://www.github.com/NateTheGreatt" target="_blank" class="btn btn-social-icon btn-github"><span class="fa fa-github"></span></a>
      </ul>
    </div>
  </nav>
</header>
</template>

<style>

header {
  height: 50px;
}

ul.social a {
  margin: 8px;
}

.center {
  position: absolute;
  left: 50%;
  margin-left: -25px;
}

.logo {
  padding: 0!important;
}
.navbar {
  background-color: #333;
  border: 0;
}
.navbar-nav>li>a:hover{color:#00BFFF!important;}
.navbar-nav>li>a:focus{color:#00BFFF!important;}
.navbar-nav>li>a{color:#999!important;}

li, li:visited
{
  letter-spacing: 1px;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 11px;
}

</style>
