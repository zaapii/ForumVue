<template>
  <h2 class="list-title">
    <router-link :to="{ name: 'CategoryPage', params: { id: category.id } }">{{
      category.name
    }}</router-link>
  </h2>
  <forum-list :forums="forums" />
</template>

<script>
import ForumList from './ForumList.vue'
export default {
  components: { ForumList },
  props: {
    category: {
      required: true,
      type: Object
    }
  },
  computed: {
    forums () {
      return this.$store.state.forums.items.filter(
        (forum) => forum.categoryId === this.category.id
      )
    }
  }
}
</script>

<style></style>
