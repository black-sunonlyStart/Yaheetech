import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRoutes = [
  {
    name:'default',
    path:'/',
    redirect:{name: 'packTableList'}
  },
  {
    name:'packTableList',
    path: '/packTableList',
    component: () => import('@/views/packTableList/index'),
    hidden: true
  },
  {
    name:'productDetails',
    path: '/productDetails/:developmentId?/:productId?/:productCountryId?',
    component: () => import('@/views/productDetails/index'),
    hidden: true
  },
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()


export default router
