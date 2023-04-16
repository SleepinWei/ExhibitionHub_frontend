import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
      component: ()=> import("@/views/error/400.vue")
    }
  ]
})

export default router
