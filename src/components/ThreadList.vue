<template>
  <div class="col-full">
    <div class="thread-list">
      <h2 class="list-title">Threads</h2>

      <div v-if="threads.length">
        <div v-for="thread in threads" :key="thread.id" class="thread">
          <div>
            <p>
              <router-link
                v-if="thread.id"
                :to="{ name: 'ThreadShow', params: { id: thread.id } }"
                >{{ thread.title }}</router-link
              >
            </p>
            <p class="text-faded text-xsmall">
              By <a href="profile.html">{{ userById(thread.userId).name }}</a
              >, <AppDate :timestamp="thread.publishedAt" />.
            </p>
          </div>

          <div class="activity">
            <p class="replies-count">{{ thread.repliesCount }} replies</p>

            <AppAvatarImg
              class="avatar-medium"
              :src="userById(thread.userId).avatar"
            />

            <div>
              <p class="text-xsmall">
                <a href="#">{{ userById(thread.userId).name }}</a>
              </p>
              <p class="text-xsmall text-faded">
                <AppDate :timestamp="thread.publishedAt" />
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!threads.length" style="padding: 10px; text-align: center">
        <em>No Threads Available</em>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    threads: {
      type: Array,
      required: true,
    },
    forumId: {
      type: String,
    },
  },
  methods: {
    postById(postId) {
      return this.posts.find((p) => p.id === postId);
    },
    userById(userId) {
      return this.users.find((u) => u.id === userId) || {};
    },
  },
  computed: {
    posts() {
      return this.$store.state.posts.items;
    },

    users() {
      return this.$store.state.users.items;
    },
  },
};
</script>
