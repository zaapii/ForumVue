import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage'
import ThreadPageShow from '@/pages/ThreadPageShow'
import NotFound from '@/pages/PageNotFound'
import dataJson from '@/data.json'
import ForumPage from '@/pages/ForumPage'
import CategoryPage from '@/pages/CategoryPage'
import ProfilePage from '@/pages/ProfilePage'
import ThreadCreate from '@/pages/ThreadCreate'
const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/forum/:id', name: 'ForumPage', component: ForumPage, props: true },
  { path: '/category/:id', name: 'CategoryPage', component: CategoryPage, props: true },
  { path: '/me', name: 'ProfilePage', component: ProfilePage, meta: { toTop: true, smoothScroll: true } },
  { path: '/me/edit', name: 'ProfileEdit', component: ProfilePage, props: { edit: true } },
  { path: '/forum/:forumId/thread/create', name: 'ThreadCreate', component: ThreadCreate, props: true },
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
  routes,
  scrollBehavior (to) {
    const scroll = {}
    if (to.meta.toTop) scroll.top = 0
    if (to.meta.smoothScroll) scroll.behavior = 'smooth'
    return scroll
  }
})
