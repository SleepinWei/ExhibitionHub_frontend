import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/personal',
      name: 'personal',
      redirect:'/info',
      component: () => import('../views/Person/Personal.vue'),
      children:[
        {
          path:'/info',
          name:'info',
          component: () => import('../views/Person/Info.vue')
        }
      ]
    }
  ]
})

export default router
