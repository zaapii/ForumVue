<template>
  <div class="col-full push-top" v-if="thread && text">
    <h1>
      Editing <i>{{ thread.title }}</i>
    </h1>

    <ThreadEditor :title="thread.title" :text="text" @save="save" @cancel="cancel" />
  </div>
</template>
<script>
import ThreadEditor from '@/components/ThreadEditor'
import {mapActions} from 'vuex'
export default {
  components: { ThreadEditor },
  props: {
    id: { type: String, required: true }
  },
  computed: {
    thread () {
      return this.$store.state.threads.find(thread => thread.id === this.id)
    },
    text () {
      const post = this.$store.state.posts.find(post => post.id === this.thread.posts[0])
      return post ? post.text : ''
    }
  },
  async created()
  {
    const thread = await this.fetchThread({id: this.id})
    this.fetchPost({id: thread.posts[0]})
  },
  methods: {
    ...mapActions(["updateThread", "fetchThread","fetchPost"]),
    async save ({ title, text }) {
      const thread = await this.updateThread({
        id: this.id,
        title,
        text
      })
      this.$router.push({ name: 'ThreadShow', params: { id: thread.id } })
    },
    cancel () {
      this.$router.push({ name: 'ThreadShow', params: { id: this.id } })
    }
  }
}
</script>
