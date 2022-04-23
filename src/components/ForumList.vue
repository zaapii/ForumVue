<template>
    <div class="forum-listing" v-for="forum in forums" :key="forum.id">
        <div class="forum-details">
          <router-link
            :to="{name: 'ForumPage', params: {id: forum.id}}"
            class="text-xlarge"
          >
            {{ forum.name }}
          </router-link>
          <p>{{ forum.description }}</p>
        </div>

      <div class="threads-count">
        <p>
          <span class="count">{{ forum.threads?.length }}</span>
          {{ forumThreadWord(forum) }}
        </p>
      </div>

      <div class="last-thread"></div>
    </div>
</template>

<script>
export default {
  props: {
    forums: {
      type: Array,
      required: true
    }
  },
  methods: {
    forumThreadWord (forum) {
      if (forum.threads?.length) {
        return forum.threads.length > 1 ? 'threads' : 'thread'
      } else {
        return 'no threads'
      }
    }
  }
}
</script>

<style></style>
