<template>
  <div v-if="thread" class="col-large push-top">
    <h1>{{ thread.title }}</h1>

    <PostsList :posts="posts" />

    <post-editor @save="addPost"/>

  </div>
</template>

<script>
import dataJson from '@/data.json'
import PostsList from '@/components/PostsList'
import PostEditor from '@/components/PostEditor.vue'
export default {
  name: 'ThreadShow',
  components: {
    PostsList,
    PostEditor
  },
  data () {
    return {
      threads: dataJson.threads,
      posts: dataJson.posts
    }
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
    }
  },
  methods: {
    addPost (eventData) {
      const post = { ...eventData.post, threadId: this.id }

      this.posts.push(post)
      this.thread.posts.push(post.id)
    }
  }

}
</script>
