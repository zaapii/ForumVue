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
  },
  async beforeCreate () {
    const categories = await this.$store.dispatch('fetchAllCategories')
    const forumIds = categories.map(category => category.forums).flat()
    this.$store.dispatch('fetchForums', { ids: forumIds })
  }
}
</script>

<style scoped></style>
