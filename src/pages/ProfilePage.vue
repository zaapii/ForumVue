<template>
  <div class="container">
    <h1>Profile</h1>
    <!-- <div class="flex-grid">
      <div class="col-3 push-top">
        <UserProfileCard v-if="!edit" :user="user" />

        <UserProfileCardEditor v-if="edit" :user="user" />
      </div>

      <div class="col-7 push-top">
        <div class="profile-header">
          <span class="text-lead"> {{ user.username }} recent activity </span>
          <a href="#">See only started threads?</a>
        </div>

        <hr />

        <posts-list :posts="user.posts" /> -->

    <!--  <div class="activity-list">
                  <div class="activity">
                      <div class="activity-header">
                          <img src="https://i.imgur.com/OqlZN48.jpg" alt="" class="hide-mobile avatar-small">
                          <p class="title">
                              How can I chop onions without crying?
                              <span>Joker started a topic in Cooking</span>
                          </p>

                      </div>

                      <div class="post-content">
                        <div>
                          <p>I absolutely love onions, but they hurt my eyes! Is there a way where you can chop onions without crying?</p>
                        </div>
                      </div>

                      <div class="thread-details">
                          <span>4 minutes ago</span>
                          <span>1 comments</span>
                      </div>
                  </div>
              </div> -->
    <!--     </div>
    </div> -->
  </div>
</template>

<script>
/* import PostsList from "@/components/PostsList.vue"; */
import { mapGetters } from 'vuex'
/* import UserProfileCard from "@/components/UserProfileCard";
import UserProfileCardEditor from "@/components/UserProfileCardEditor"; */
export default {
  /*     components: { PostsList, UserProfileCard, UserProfileCardEditor }, */
  computed: {
    ...mapGetters({ user: 'authUser' })
  },
  props: {
    edit: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style></style>
