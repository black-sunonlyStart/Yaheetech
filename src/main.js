import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import './styles/index.scss'
Vue.use(Element)


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})