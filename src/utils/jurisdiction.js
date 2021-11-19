import Vue from 'vue'
// v-permission: 权限控制
Vue.directive('permission', {
  bind(el,binding) {
    let objAfter = JSON.parse(sessionStorage.getItem("permissions"));
    objAfter.forEach(item => {
        if(item.PermissionCode == binding.arg || item.PermissionCode == binding.value){
            if(item.HasPermission){
                el.style.display = true 
            }else {
                el.style.display = 'none' 
            }
        }
    })
 }
})