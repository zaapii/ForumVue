<template>
  <the-navbar />
  <div class="container">
    <router-view @ready="onPageReady" v-show="showPage" :key="$route.path" />
    <app-spinner class="push-top" v-show="!showPage" />
  </div>
</template>

<script>
import TheNavbar from "./components/TheNavbar.vue";
import { mapActions } from "vuex";
import NProgress from "nprogress";
export default {
  components: { TheNavbar },
  name: "App",
  created() {
    NProgress.configure({
      speed: 200,
      showSpinner: false,
    });
    this.fetchAuthUser();
    this.$router.beforeEach(() => {
      this.showPage = false;
      NProgress.start();
    });
  },
  methods: {
    ...mapActions(["fetchAuthUser"]),
    onPageReady() {
      this.showPage = true;
      NProgress.done();
    },
  },
  data() {
    return {
      showPage: false,
    };
  },
};
</script>

<style>
@import "assets/style.css";
@import "~nprogress/nprogress.css";
#nprogress .bar {
  background: #57ad8d;
}
</style>
