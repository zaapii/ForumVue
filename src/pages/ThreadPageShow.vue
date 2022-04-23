<template>
  <div v-if="thread" class="col-large push-top">
    <h1>{{ thread.title }}</h1>

    <PostsList :posts="posts" />
  </div>
</template>

<script>
import dataJson from '@/data.json'
import PostsList from '@/components/PostsList'
export default {
  name: 'ThreadShow',
  components: {
    PostsList
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
  }
}
</script>
