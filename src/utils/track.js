import Vue from 'vue'
import { jsonp } from 'vue-jsonp'
let EmployeeId = 0
let behavior = ''
let canUpdata = false
let conGetExlist = {
    GetHelpTagsUrl: function(Url) {
        var BaseUrl = '';
        var domain = document.domain;
        if (domain.indexOf('localhost') >= 0) {
            BaseUrl = 'http://localhost:4840';
        }
        else if (domain.indexOf('yahee.com') >= 0) {
            BaseUrl = 'http://qas-portal.yahee.com.cn:8088/Latest';
        }
        else {
            BaseUrl = 'http://portal.yaheecloud.com/Latest'
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
            if (binding.value.triggerType == 'browse'){
                //调用后台接口保存数据
                sendLogApi(binding.value)
            } else if (binding.value.triggerType == 'click'){
                //如果是click类型，监听click事件
                el.addEventListener('click', (event) => {
                    if(!event.detail)return 
                    //调用后台接口保存数据
                    if(!binding.value.businessCode){
                        binding.value.businessCode = event.target.innerText
                    }
                    if(canUpdata &&  binding.value.shouldUpdate){
                        binding.value.behavior = behavior
                    }
                    sendLogApi(binding.value)
                    }, false)
            } else if(binding.value.triggerType == 'blur'){
                if (el.tagName.toLocaleLowerCase() == 'input') {
                    el.addEventListener('blur', (event) => {
                        //调用后台接口保存数据
                            binding.value.InputContext = event.target.value
                        sendLogApi(binding.value)
                    }, false)
                } else {
                    if (el.getElementsByTagName('input')) {
                        el.getElementsByTagName('input')[0].addEventListener('blur', (event) => {
                            //调用后台接口保存数据
                            binding.value.InputContext = event.target.value
                            sendLogApi(binding.value)
                        }, false)
                    }
                }   
            }
        }
    },
    update:(el,binding) => {
        //如果要传变量多加一个更新属性
        if(binding.value && binding.value.shouldUpdate == '1'){
            canUpdata = true
            behavior = binding.value.behavior
        }
    },
})

function sendLogApi (value) {
    let  params = []
    params = {
        output:'jsonp',
        items:[
            {
                DomId: value.behavior,
                DomText:value.businessCode,
                CurrentPage: value.currentUrl,
                InputContext: value.InputContext, 
                CreatedOnTimeStamp: new Date().getTime(),
            }
        ]
    }
    if(EmployeeId){
        params.items.forEach(res => {
            res.EmployeeId = EmployeeId
        })
    }
    params.items = JSON.stringify(params.items);
    let url = conGetExlist.GetHelpTagsUrl("/Tracking/LogEmployeeTracking").toString()
    jsonp(url,params,2000000).then(res => {  
        if(res){
            EmployeeId = res.EmployeeId
            canUpdata = false
        }    
    },err => {
        // console.log(err)   
        canUpdata = false
    })
}