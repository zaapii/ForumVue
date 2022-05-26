import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from './helpers/firebase'
import FontAwesome from './plugins/FontAwesome'
import ClickOutsideDirective from './plugins/ClickOutisdeDirective'
import PageScrollDirective from './plugins/PageScrollDirective'
import Vue3Pagination from './plugins/Vue3Pagination'
import VeeValidatePlugin from './plugins/VeeValidatePlugin'

const firebaseConfig = {
  apiKey: 'AIzaSyDoBxsA-4DGI38XLTcgIP9Y4nWo0-a9_xg',
  authDomain: 'vue-forum-6e786.firebaseapp.com',
  projectId: 'vue-forum-6e786',
  storageBucket: 'vue-forum-6e786.appspot.com',
  messagingSenderId: '267527989840',
  appId: '1:267527989840:web:08cdb81e53415e4314ff55'
}

firebase.initializeApp(firebaseConfig)

const forumApp = createApp(App)
forumApp.use(router)
forumApp.use(store)
forumApp.use(FontAwesome)
forumApp.use(ClickOutsideDirective)
forumApp.use(PageScrollDirective)
forumApp.use(Vue3Pagination)
forumApp.use(VeeValidatePlugin)

const requireComponent = require.context(
  './components',
  true,
  /App[A-Z]\w+\.(vue|js)$/
)
requireComponent.keys().forEach(function (fileName) {
  let baseComponentConfig = requireComponent(fileName)
  baseComponentConfig = baseComponentConfig.default || baseComponentConfig
  const baseComponentName =
    baseComponentConfig.name ||
    fileName.replace(/^.+\//, '').replace(/\.\w+$/, '')
  forumApp.component(baseComponentName, baseComponentConfig)
})

forumApp.mount('#app')
