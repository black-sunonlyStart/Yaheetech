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
    path: '/productDetails',
    component: () => import('@/views/packTableList/mainPage/productDetails'),
    hidden: true
  },
  {
    name:'productDevelopAt',
    path: '/productDevelopAt',
    component: () => import('@/views/newProductPage/index'),
    hidden: true
  },
  {
    name:'sampleConfirmation',
    path: '/sampleConfirmation',
    component: () => import('@/views/sampleConfirmation/index'),
    hidden: true,
    meta:{
        title:'样品确认'
    }
  },
  {
    name:'sampleDetail',
    path: '/sampleDetail',
    component: () => import('@/views/sampleConfirmation/mainPage/sampleDetail'),
    hidden: true,
    meta:{
        title:'样品详情'
    },
  },
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()


export default router
