<template>
  <h1 class="push-top">Bienvenido al Foro</h1>

 <div class="forum-list col-full" v-for="category in categories" :key="category.id">
  <CategoryList :category="category"/>
 </div>

</template>

<script>
import CategoryList from '@/components/CategoryList.vue'
import { mapActions } from 'vuex'
export default {
  components: {
    CategoryList
  },
  computed: {
    categories () {
      return this.$store.state.categories
    }
  },
  methods: {
    ...mapActions(['fetchAllCategories', 'fetchForums'])
  },
  async created () {
    const categories = await this.fetchAllCategories()
    const forumIds = categories.map(category => category.forums).flat()
    this.fetchForums({ ids: forumIds })
  }
}
</script>

<style scoped></style>
