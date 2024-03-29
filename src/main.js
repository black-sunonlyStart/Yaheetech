import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import './styles/index.scss'
import VueLazyload from 'vue-lazyload'
import moment from "moment";
import './styles/element-variables.scss'
import '@/utils/directives.js'
import '@/utils/jurisdiction.js'
import '@/utils/track.js'
import 'element-ui/lib/theme-chalk/icon.css'
import { VueJsonp } from 'vue-jsonp'
import store from '@/store/store.js'
import { M2 } from '@/utils/translate.js'
Vue.prototype.M2 = M2;
router.beforeEach((to,form,next) => {
    if(to.meta.title){
        document.title = M2(to.meta.title)
    }
    next()
})
Vue.prototype.$moment = moment;
// Object.defineProperty(Vue.prototype,'$moment',{value:moment})
Vue.prototype.$jsonp = VueJsonp
Vue.use(Element)
Vue.use(VueJsonp)
Vue.use(VueLazyload, {
    //预加载高度
    preLoad: 1.3,
    //错误时显示的图片
    error: '',
    //图片加载中显示的图片
    loading: '',
    //尝试加载次数
    attempt: 1,
    listenEvents: [ 'scroll' ]
  })


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})