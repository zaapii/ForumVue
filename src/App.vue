<template>
<the-navbar />
<div class="container">
  <router-view />
  </div>
</template>

<script>
import TheNavbar from './components/TheNavbar.vue'

export default {
  components: { TheNavbar },
  name: 'App'
}
</script>

<style>
@import "assets/style.css";
</style>
