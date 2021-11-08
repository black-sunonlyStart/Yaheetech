import Vue from 'vue'
import { hasPermission }  from '@/api/user.js'
// v-permission: 权限控制
Vue.directive('permission', {
  bind(el,binding) {
    let params = {
        code:binding.arg || binding.value
    }
    hasPermission(params).then(res => {
        if(res.data){
            el.style.display = true 
        }else {
            el.style.display = 'none' 
        }
    })  
 }
})