import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddExView from '@/views/AddExView.vue'
import AlterInfoView from "@/views/AlterInfoView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {isShowHeader:true},
    },
    {
      path: '/exhibition/:exId',
      meta:{isShowHeader:true},
      component: () => import('@/views/ExhibitionInfoView.vue')
    },
    {
      path: "/error400",
      component: () => import("@/views/error/400.vue")
    },
    {
      //TODO:动态
      path: '/addEx',
      name: 'AddExView',
      component: AddExView
    },
    {
      path: "/alterinfo/:exId",
      component: AlterInfoView
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
      path: "/error400",
      component: ()=> import("@/views/error/400.vue")
    },
    {
      path: "/search",
      component: ()=> import("@/views/SearchView.vue")
    }
  ]
})

export default router
