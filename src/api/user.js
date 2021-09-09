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
export function getProdCerInfoDetailList() {
    return request({
      url: '/productManage/getCredentialsRates',
      method: "get", 
    })
  }
export function findProductByDevId(data) {
    return request({
      url: '/productManage/findProductByDevId',
      method: "get", 
      params:data
    })
  }
//查询省市区接口
export function getAdministrativeRegion(data) {
    return request({
      url: '/productManage/getAdministrativeRegion',
      method: "get", 
      params:data
    })
  }
  //查询集装箱信息
export function findBoxTypesById(data) {
    return request({
      url: '/productManage/findBoxTypesByTypeId',
      method: "get", 
      params:data
    })
  }
  //分类信息
export function queryAllCategory(data) {
    return request({
      url: '/productManage/queryAllCategory',
      method: "get", 
      params:data
    })
  }
  //查询采购开发或者业务开发
export function selectRoleEmployeeForRoleId(data) {
    return request({
      url: '/productManage/selectRoleEmployeeForRoleId',
      method: "get", 
      params:data
    })
  }