import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage'
import ThreadPageShow from '@/pages/ThreadPageShow'
import NotFound from '@/pages/PageNotFound'
import dataJson from '@/data.json'
const routes = [
  { path: '/', name: 'Home', component: HomePage },
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
