<template>
  <h1 class="push-top">Bienvenido al Foro</h1>

 <div class="forum-list col-full" v-for="category in categories" :key="category.id">
  <CategoryList :category="category"/>
 </div>

</template>

<script>
import CategoryList from '@/components/CategoryList.vue'
export default {
  components: {
    CategoryList
  },
  computed: {
    categories () {
      return this.$store.state.categories
    }
  }
}
</script>

<style scoped></style>
