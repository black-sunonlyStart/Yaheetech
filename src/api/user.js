import request from '@/utils/request'
export function fetchPageTableList(data) {
    return request({
      url: 'productManage/queryProductManage',
      method: "post",
      data 
    })
  }
export function getProductDevDetail(data) {
    return request({
      url: '/productManage/getProductDevDetail',
      method: "get",
      params:data 
    })
  }