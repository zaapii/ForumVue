<template>
  <div v-if="thread" class="col-large push-top">
    <h1>{{ thread.title }}

      <router-link :to="{name:'ThreadEdit', id:this.id}" class="btn-green btn-small">Editar</router-link>

    </h1>

    <PostsList :posts="threadPosts" />

    <post-editor @save="addPost" />
  </div>
</template>

<script>
import PostsList from '@/components/PostsList'
import PostEditor from '@/components/PostEditor.vue'
export default {
  name: 'ThreadShow',
  components: {
    PostsList,
    PostEditor
  },
  data () {
    return {}
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  computed: {
    thread () {
      return this.threads.find((thread) => thread.id === this.id)
    },

    threadPosts () {
      return this.posts.filter((post) => post.threadId === this.id)
    },

    threads () {
      return this.$store.state.threads
    },
    posts () {
      return this.$store.state.posts
    }
  },
  methods: {
    addPost (eventData) {
      const post = { ...eventData.post, threadId: this.id }
      this.$store.dispatch('createPost', post)
    }
  }
}
</script>
