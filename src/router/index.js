/*
 * @Author: yingxin wang
 * @Date: 2023-04-18 21:36:30
 * @LastEditors: yingxin wang
 * @LastEditTime: 2023-04-18 21:37:35
 * @Description: 请填写简介
 */
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
      path: '/login',
      name: 'login',
      //登陆页面
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/personal',
      name: 'personal',
      redirect: '/info',
      component: () => import('../views/Person/Personal.vue'),
      children: [
        {
          path: '/info',
          name: 'info',
          component: () => import('../views/Person/Info.vue')
        }
      ]
    },
    {
      path: '/resetPassword',
      name: 'resetPassword',
      //重设密码页面
      component: () => import('../views/ResetPasswordView.vue')
    },
    {
      path: '/register',
      name: 'register',
      //注册页面
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: "/error400",
      component: ()=> import("@/views/error/400.vue")
    },
    {
      path: "/search",
      component: ()=> import("@/views/SearchView.vue")
    },
    {
      path: "/calendar",
      component: ()=> import("@/views/CalendarView.vue")
    }
  ]
})

export default router
