import Vue from 'vue'
// v-permission: 权限控制
Vue.directive('permission', {
    bind(el,binding) {
        let objAfter = JSON.parse(sessionStorage.getItem("permissions"));
        if(!objAfter) el.style.display = 'none'
        //多个权限码
        if(Array.isArray(binding.value) || Array.isArray(binding.arg) ) {
            let filterArray = binding.value || binding.arg
            let filterObjec = objAfter.filter(item => {
                return filterArray.includes(item.PermissionCode)
            })
            if(filterObjec.some(item => item.HasPermission)) {
                el.style.display = true 
            }else {
                el.style.display = 'none' 
            }
        } else {
            //单个权限码
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
    }
})