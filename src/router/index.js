import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage'
import ThreadPageShow from '@/pages/ThreadPageShow'
import NotFound from '@/pages/PageNotFound'
import dataJson from '@/data.json'
import ForumPage from '@/pages/ForumPage'
import CategoryPage from '@/pages/CategoryPage'
const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/forum/:id', name: 'ForumPage', component: ForumPage, props: true },
  { path: '/category/:id', name: 'CategoryPage', component: CategoryPage, props: true },
  {
    path: '/thread/:id',
    name: 'ThreadShow',
    component: ThreadPageShow,
    props: true,
    beforeEnter (to, from, next) {
      const threadExists = dataJson.threads.find(
        (thread) => thread.id === to.params.id
      )

      if (threadExists) {
        return next()
      } else {
        next({
          name: 'NotFound',
          params: { pathMatch: to.path.substring(1).split('/') },
          query: to.query,
          hash: to.hash
        })
      }
    }
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
