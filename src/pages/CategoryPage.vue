<template>
  <div v-if="asyncDataStatus_ready" class="forum-list col-full">
    <h1 class="text-center push-top">
      {{ category.name }}
    </h1>
    <h2 class="list-title">
      {{ category.name }}
    </h2>
    <forum-list :forums="forums" />
  </div>
</template>

<script>
import ForumList from '@/components/ForumList.vue'
import { mapActions } from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import { findById } from '@/helpers'
export default {
  components: { ForumList },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  mixins: [asyncDataStatus],
  computed: {
    forums () {
      return this.$store.state.forums.filter(
        (forum) => forum.categoryId === this.id
      )
    },
    category () {
      return findById(this.$store.state.categories.items, this.id) || {}
    }
  },
  methods: {
    ...mapActions('categories', ['fetchCategory']),
    ...mapActions('forums', ['fetchForums']),
    getForumsForCategory (category) {
      return this.$store.state.forums.items.filter(
        (forum) => forum.categoryId === category.id
      )
    }
  },
  async created () {
    const category = await this.fetchCategory({ id: this.id })
    await this.fetchForums({ ids: category.forums })
    this.asyncDataStatus_fetched()
  }
}
</script>

<style></style>
