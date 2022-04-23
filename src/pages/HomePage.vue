<template>
  <h1>Bienvenido al Foro</h1>

  <thread-list :threads="threads" />
</template>

<script>
import dataJson from '@/data.json'
import ThreadList from '@/components/ThreadList.vue'
export default {
  components: {
    ThreadList
  },
  data () {
    return {
      threads: dataJson.threads
    }
  }
}
</script>

<style scoped></style>
