<template>
  <div class="post-list">
    <div v-for="post in posts" :key="post.id" class="post">
      <div class="user-info">
        <a href="#" class="user-name">{{
          userById(post.userId).name
        }}</a>

        <a href="#">
          <img
            class="avatar-large"
            :src="userById(post.userId).avatar"
            alt=""
          />
        </a>

        <p class="desktop-only text-small">107 posts</p>
      </div>

      <div class="post-content">
        <div>
          <p>
            {{ post.text }}
          </p>
        </div>
      </div>

      <div class="post-date text-faded">
        <AppDate :timestamp="post.publishedAt" />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  computed: {
    users () { return this.$store.state.users }
  },
  props: {
    posts: {
      type: Array,
      required: true
    }
  },
  methods: {
    userById (userId) {
      return this.users.find((u) => u.id === userId)
    }
  }
}
</script>
