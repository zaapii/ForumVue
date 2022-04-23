<template>
     <div class="col-full">

          <div class="thread-list">

              <h2 class="list-title">Threads</h2>

              <div v-for="thread in threads" :key="thread.id" class="thread">
                  <div>
                      <p>
                          <router-link :to="{name: 'ThreadShow', params: {id: thread.id}}">{{thread.title}}</router-link>
                      </p>
                      <p class="text-faded text-xsmall">
                          By <a href="profile.html">{{userById(thread.userId).name}}</a>, <AppDate :timestamp="thread.publishedAt" />.
                      </p>
                  </div>

                  <div class="activity">
                      <p class="replies-count">
                          {{thread.posts.length > 1 ? thread.posts.length + ' replies' : thread.posts.length + ' reply'}}
                      </p>

                      <img class="avatar-medium"
                           :src="userById(thread.userId).avatar"
                           alt="">

                      <div>
                          <p class="text-xsmall">
                              <a href="profile.html">{{userById(thread.userId).name}}</a>
                          </p>
                          <p class="text-xsmall text-faded"><AppDate :timestamp="thread.publishedAt" /></p>
                      </div>
                  </div>
              </div>

          </div>
      </div>
</template>

<script>
import dataJson from '@/data.json'
export default {
  props: {
    threads: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      posts: dataJson.posts,
      users: dataJson.users
    }
  },
  methods: {
    postById (postId) {
      return this.posts.find((p) => p.id === postId)
    },
    userById (userId) {
      return this.users.find((u) => u.id === userId)
    }
  }
}
</script>
