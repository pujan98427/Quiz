import { createRouter, createWebHistory } from 'vue-router'
import LayoutSelector from '../views/Layout.vue'
import ListView from '../views/ListView.vue'
import Choice from '../views/QuestionSelection.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: LayoutSelector
    },
    {
      path: '/choice',
      name: 'choice',
      component: Choice
    },
    {
      path: '/',
      name: 'layout',
      component: LayoutSelector
    },
    {
      path: '/list',
      name: 'list',
      component: ListView
    },
    {
      path: '/pagination',
      name: 'pagination',
      component: () => import('../views/PaginationView.vue')
    }
  ]
})

export default router
