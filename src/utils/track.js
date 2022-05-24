import Vue from 'vue'
import { jsonp } from 'vue-jsonp'

import { LogEmployeeTracking } from '@/api/user.js'
let conGetExlist = {
    GetHelpTagsUrl: function(Url) {
        var BaseUrl = '';
        var domain = document.domain;
        if (domain.indexOf('localhost') >= 0) {
            BaseUrl = 'http://localhost:4840';
        }
        else if (domain.indexOf('yahee.com') >= 0) {
            BaseUrl = 'http://qas-newerp.yahee.com.cn:8088/Latest';
        }
        else {
            BaseUrl = 'http://newerp.yaheecloud.com/Latest'
        }
        return BaseUrl + Url;
    }
}
// 自定义埋点指令
Vue.directive('track', {
    
  //钩子函数，只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置
  /*
   * el:指令所绑定的元素，可以用来直接操作 DOM
   * binding：一个对象，包含以下 property:
   * vnode：Vue 编译生成的虚拟节点
   */
  bind: (el, binding, vnode) => {
    if (binding.value) {
        //这里参数是根据自己业务可以自己定义
        //如果是浏览类型，直接保存
        let params = {
                output:'jsonp',
                type: "POST",
                Data:[
                {
                    DomId: binding.value.businessCode,
                    DomText: binding.value.behavior,
                    CurrentPage: binding.value.currentUrl,
                    InputContext: "",
                    EmployeeId: 111111,
                    CreatedOnTimeStamp: new Date().getTime()
                }
                ]
            }
        if (binding.value.triggerType == 'browse'){
            //调用后台接口保存数据
            
        } else if (binding.value.triggerType == 'click'){
                //如果是click类型，监听click事件
                el.addEventListener('click', (event) => {
                    //调用后台接口保存数据
                    sendLogApi(params)
                    }, false)
        } else if(binding.value.triggerType == 'blur'){
                el.addEventListener('blur', (event) => {
                    //调用后台接口保存数据
                    
                }, false)
            }
        }
    }
})

// function sendLogApi (params) {
//     params.Data = JSON.stringify(params.Data);
    
//     let url = conGetExlist.GetHelpTagsUrl("/Tracking/LogEmployeeTracking").toString()

//     jsonp(url,params,2000000).then(res => {  
//         if(res.data){
//             console.log(res.data)
//         }    
//     },err => {
//         console.log(err)   
//     })
// }
function sendLogApi (params) {
    LogEmployeeTracking(params.Data).then(res => {
        if(res.data){
            console.log(res.data)
        }
    })
}