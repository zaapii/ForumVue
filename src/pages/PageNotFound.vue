<template>
  <div class="col-full">
    <h1>Not Found</h1>
    <router-link :to="{ name: 'Home' }">Lee algunos posts ;)</router-link>
  </div>
</template>

<script>
export default {
  created () {
    this.$emit('ready')
  }
}
</script>
