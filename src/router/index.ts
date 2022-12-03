import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'




const routes: Array<RouteRecordRaw> = [
  {
    path: '/base',
    name: 'Base',
    component: () => import('../views/base.vue')
  },
  

]

const router = createRouter({
  
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
