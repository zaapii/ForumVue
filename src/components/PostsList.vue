<template>
  <div class="post-list">
    <div v-for="post in posts" :key="post.id" class="post">
      <div v-if="userById(post.userId)" class="user-info">
        <a href="#" class="user-name">{{ userById(post.userId).name }}</a>

        <a href="#">
          <img
            class="avatar-large"
            :src="userById(post.userId).avatar"
            alt=""
          />
        </a>

        <p class="desktop-only text-small">
          {{ userById(post.userId).postsCount }} posts
        </p>
        <p class="desktop-only text-small">
          {{ userById(post.userId).threadsCount }} threads
        </p>
      </div>

      <div class="post-content">
        <div class="col-full">
          <post-editor
            @save="handleUpdate"
            :text="post.text"
            :post="post"
            v-if="editing === post.id"
          />
          <p v-else>
            {{ post.text }}
          </p>
        </div>
        <a
          v-if="post.userId === $store.state.auth.authId"
          @click.prevent="toggleEditMode(post.id)"
          href="#"
          style="margin-left: auto; padding-left: 10px"
          class="link-unstyled"
          title="Make a change"
        >
          <fa-wesome icon="pencil-alt" />
        </a>
      </div>

      <div class="post-date text-faded">
        <div v-if="post.edited?.at" class="edition-">edited</div>
        <AppDate :timestamp="post.publishedAt" />
      </div>
    </div>
  </div>
</template>

<script>
import PostEditor from './PostEditor.vue'
import { mapActions } from 'vuex'
export default {
  components: { PostEditor },
  computed: {
    users () {
      return this.$store.state.users.items
    }
  },
  data () {
    return {
      editing: null
    }
  },
  props: {
    posts: {
      type: Array,
      required: true
    }
  },
  methods: {
    ...mapActions('posts', ['updatePost']),
    handleUpdate (event) {
      this.updatePost(event.post)
      this.editing = null
    },
    userById (userId) {
      return this.$store.getters['users/user'](userId)
    },
    toggleEditMode (id) {
      this.editing = id === this.editing ? null : id
    }
  }
}
</script>
