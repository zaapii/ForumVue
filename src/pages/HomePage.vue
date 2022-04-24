<template>
  <div v-if="asyncDataStatus_ready" class="container">
    <h1 class="push-top">Bienvenido al Foro</h1>

    <div
      class="forum-list col-full"
      v-for="category in categories"
      :key="category.id"
    >
      <CategoryList :category="category" />
    </div>
  </div>
</template>

<script>
import CategoryList from '@/components/CategoryList.vue'
import { mapActions } from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'
export default {
  components: {
    CategoryList
  },
  mixins: [asyncDataStatus],
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
    const forumIds = categories.map((category) => category.forums).flat()
    await this.fetchForums({ ids: forumIds })
    this.asyncDataStatus_fetched()
  }
}
</script>

<style scoped></style>
