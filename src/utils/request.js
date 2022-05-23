import axios from 'axios'
import { Message } from 'element-ui'
import { judgePorduction } from './tools.js'

// create an axios instance

axios.defaults.withCredentials = true;
const service = axios.create({
  baseURL:process.env.VUE_APP_DEVSERVER, // url = base url + request url
  timeout: 30000// request timeout
})


// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
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
    if(error.response.status == 401) {
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
      
    }else if(error.response.status == 403){
        Message({
            message: '你没有当前页面的权限！',
            type: 'error',
            duration: 5 * 1000,
            offset:500,
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
