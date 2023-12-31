/*
 * @Author: yingxin wang
 * @Date: 2023-04-18 21:36:30
 * @LastEditors: yingxin wang
 * @LastEditTime: 2023-05-23 15:30:02
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
      meta: { isShowHeader: true },
    },
    {
      path: '/exhibition/:exId',
      meta: { isShowHeader: true },
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
      component: AddExView,
      meta: { isShowHeader: true }
    },
    {
      path: "/alterinfo/:exId",
      component: AlterInfoView,
      meta: { isShowHeader: true }
    },
    {
      path: '/about',
      name: 'about',
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
      component: () => import('../views/PersonalView.vue'),
    },
    {
      path: '/personall',
      name: 'Personall',
      component: () => import('../views/Blank.vue'),
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
      component: () => import("@/views/error/400.vue")
    },
    {
      path: "/search",
      component: () => import("@/views/SearchView.vue")
    },
    {
      path: "/calendar",
      name: 'calendar',
      component: () => import("@/views/CalendarView.vue")
    },
    {
      path: "/test",
      name: 'test',
      component: () => import("@/views/test.vue")
    },
    {
      path:"/map",
      name:'map',
      component: () => import("@/views/ExMapView.vue")
    },
    {
      path: "/threejs",
      component: () => import("@/views/Threejs.vue")
    }
  ]
})

export default router
