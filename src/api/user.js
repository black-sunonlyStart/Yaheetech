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
  //根据国家选择平台
export function getPlatformSiteByCountry(data) {
    return request({
      url: '/productManage/getPlatformSiteByCountry',
      method: "get", 
      params:data
    })
  }
  //根据国家选择平台
export function getWarehouseByCountry(data) {
    return request({
      url: '/productManage/getWarehouseByCountry',
      method: "get", 
      params:data
    })
  }
  //上传接口
export function uploadFile(data) {
    return request({
      url: '/productManage/uploadFile',
      method: "post", 
      data
    })
  }
  //根据平台选择国家
export function getPlatformSiteByPlatformName(data) {
    return request({
      url: '/productManage/getPlatformSiteByPlatformName',
      method: "get", 
      params:data
    })
  }
  //编辑开发信息
export function exploitType(data) {
    return request({
      url: '/productManage/exploitType',
      method: "post", 
      data
    })
  }
  //编辑销售目标
export function salesTarget(data) {
    return request({
      url: '/productManage/salesTarget',
      method: "post", 
      data
    })
  }
  //编辑竞品信息
export function competingProduct(data) {
    return request({
      url: '/productManage/competingProduct',
      method: "post", 
      data
    })
  }
  //开发信息保存
export function developmentMsg(data) {
    return request({
      url: '/productManage/developmentMsg',
      method: "post", 
      data
    })
  }
  //产品认证信息
export function credential(data) {
    return request({
      url: '/productManage/credential',
      method: "post", 
      data
    })
  }
  //编辑产品标题和供应商信息
export function purchaseManager(data) {
    return request({
      url: '/productManage/purchaseManager',
      method: "post", 
      data
    })
  }
  //产品尺寸和属性
export function purchaseSku(data) {
    return request({
      url: '/productManage/sku',
      method: "post", 
      data
    })
  }
  //采购信息
export function productPurchase(data) {
    return request({
      url: 'productManage/productPurchase',
      method: "post", 
      data
    })
  }