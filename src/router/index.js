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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      //登陆页面
      component: () => import('../views/LoginView.vue')
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
