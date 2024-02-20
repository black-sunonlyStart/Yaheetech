import axios from 'axios'
import { Message } from 'element-ui'
import { judgePorduction,addMask } from './tools.js'

// create an axios instance

axios.defaults.withCredentials = true;
const service = axios.create({
  baseURL:process.env.VUE_APP_DEVSERVER, // url = base url + request url
  timeout: 90000// request timeout
})
let cancelListApi = ['queryProductManage']
let pending = {
    queryProductManage:[]
}; //声明一个数组用于存储每个请求的取消函数和axios标识
let cancelToken = axios.CancelToken;
let removePending = (config) => {
    for(let p in pending[config.url.split('/')[2]]){
        //当当前请求在数组中存在时执行函数体
            pending[config.url.split('/')[2]][p].f(); //执行取消操作
            pending[config.url.split('/')[2]] = [] //数组移除当前请求
    }
}
service.interceptors.request.use(
  config => {
    if(config.url && cancelListApi.includes(config.url.split('/')[2])){
        removePending(config); //在一个axios发送前执行一下取消操作
        config.cancelToken = new cancelToken((c)=>{
            // pending存放每一次请求的标识，一般是url + 参数名 + 请求方法，当然你可以自己定义
            pending[config.url.split('/')[2]].push({ u: config.url.split('/')[2] +'&' + Math.random(), f: c});//config.data为请求参数
        });
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// // request interceptor
// service.interceptors.request.use(
//   config => {
//     // do something before request is sent
//     return config
//   },
//   error => {
//     console.log(error) // for debug
//     return Promise.reject(error)
//   }
// )

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if ((res.code && res.code !== 200) || (response.status != 200 && !response.data)) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000,
        offset:500,
      })

      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    if(error['__CANCEL__']) {
        return Promise.reject(1)
    }
    if(error.response && error.response.status == 401) {
        // let login_url = 'http://portal.yaheecloud.com';//正式
        // let login_url = 'http://qas-portal.yahee.com.cn:8088';//测试111
        let showProduct = judgePorduction()
        let login_url = ''
        if(showProduct){
            login_url = 'http://portal.yaheecloud.com';//正式
        }else {
            login_url = 'http://qas-portal.yahee.com.cn:8088';//测试
        }
        var localhref = location.href;
        window.location.href = login_url+'/Latest/Account/LogOn?returnUrl='+localhref;
      
    }else if(error.response && error.response.status == 403){
        let permission = error.response.headers.sc_forbidden_code || ''
        Message({
            message: `对不起您没有权限（${permission}）进行当前操作！`,
            type: 'error',
            duration:0,
            showClose:true,
            offset:300,
            })
        return Promise.reject(error)
    }else{
        console.log('err' + error) // for debug
        Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000,
        offset:500,
        })
        return Promise.reject(error)
    }
  }
)

export default service
