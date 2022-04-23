<template>
<div class="forum-list col-full">
    <h1 class="text-center push-top">
        {{category.name}}
    </h1>
    <h2 class="list-title">
        {{category.name}}
    </h2>
    <forum-list :forums="forums"/>
</div>
</template>

<script>
import ForumList from '@/components/ForumList.vue'
export default {
  components: { ForumList },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  computed: {
    forums () {
      return this.$store.state.forums.filter(forum => forum.categoryId === this.id)
    },
    category () {
      return this.$store.state.categories.find(category => category.id === this.id)
    }
  }
}
</script>

<style>

</style>
