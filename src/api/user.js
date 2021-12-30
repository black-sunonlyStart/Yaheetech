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
export function loadFile(data) {
    return request({
      url: '/productManage/loadFile',
      method: "post", 
      data
    })
  }
  //竞品信息上传接口
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
  //审批通过
export function approvalPass(data) {
    return request({
      url: '/productManage/approvalPass',
      method: "get", 
      params:data
    })
  }
  //资料初审通过(批量)、待审核提交通过
export function beginApprovalPass(data) {
    return request({
      url: '/productManage/beginApprovalPass',
      method: "get", 
      params:data
    })
  }
  //打回
export function loadToBack(data) {
    return request({
      url: '/productManage/loadToBack',
      method: "get", 
      params:data
    })
  }
  //跟换业务采购开发
export function updateResponsible(data) {
    return request({
      url: '/productManage/updateResponsible',
      method: "get", 
      params:data
    })
  }
  //冻结数据
export function freezing(data) {
    return request({
      url: '/productManage/freezing',
      method: "get", 
      params:data
    })
  }
  //取消冻结
export function unfreezing(data) {
    return request({
      url: '/productManage/unfreezing',
      method: "get", 
      params:data
    })
  }
  //取消开发
export function cancelExploit(data) {
    return request({
      url: '/productManage/cancelExploit',
      method: "get", 
      params:data
    })
  }
  //查询多属性
export function getProductMultipleAttribute(data) {
    return request({
      url: '/productManage/getProductMultipleAttribute',
      method: "get", 
      params:data
    })
  }
  //检查XSIN
export function checkXSIN(data) {
    return request({
      url: '/productManage/checkXSIN',
      method: "get", 
      params:data
    })
  }
  //查询状态
export function getDevelopStates(data) {
    return request({
      url: '/productManage/getDevelopStates',
      method: "get", 
      params:data
    })
  }
  //终审通过
export function toEndCheck(data) {
    return request({
      url: '/productManage/toEndCheck',
      method: "get", 
      params:data
    })
  }
  //获取图片下载地址
export function getImagePath(data) {
    return request({
      url: '/productManage/getImagePath',
      method: "get", 
      params:data
    })
  }
  //计算利润
export function profitMargin(data) {
    return request({
      url: '/productManage/profitMargin',
      method: "post", 
      data
    })
  }
  //查看当前是否是采购开发
export function checkUserIdentity(data) {
    return request({
      url: '/productManage/checkUserIdentity',
      method: "get", 
      params:data
    })
  }
  //查看当前登录用户
export function getEmployee(data) {
    return request({
      url: '/common/getEmployee',
      method: "get", 
      params:data
    })
  }
  //权限码判断
export function hasPermission(data) {
    return request({
      url: '/common/hasPermission',
      method: "get", 
      params:data
    })
  }
  //权限码判断
export function hasPermissions(data) {
    return request({
      url: '/common/hasPermissions',
      method: "post", 
      data
    })
  }
  //获取场景
export function getDevelopmentScenarios(data) {
    return request({
      url: '/productManage/getDevelopmentScenarios',
      method: "get", 
      params:data
    })
  }
  //获取角色权限
export function getRoleTrue(data) {
    return request({
      url: '/productManage/getRoleTrue',
      method: "get", 
      params:data
    })
  }
  //导出模板
export function Export(data) {
    return request({
      url: '/PMS/Latest/ExportTable/Export',
      method: "post", 
      data
    })
  }
  //产品进度信息
export function getDevelopmentProgresses(data) {
    return request({
      url: '/productManage/getDevelopmentProgresses',
      method: "get", 
      params:data
    })
  }
export function getDevelopment(data) {
    return request({
      url: '/productManage/getDevelopment',
      method: "get", 
      params:data
    })
  }
export function getDevelopmentMemo(data) {
    return request({
      url: 'productManage/getDevelopmentMemo',
      method: "get", 
      params:data
    })
  }
export function getProductVo(data) {
    return request({
      url: '/productManage/getProductVo',
      method: "get", 
      params:data
    })
  }
export function getProductPurchase(data) {
    return request({
      url: '/productManage/getProductPurchase',
      method: "get", 
      params:data
    })
  }
export function getProductCountry(data) {
    return request({
      url: '/productManage/getProductCountry',
      method: "get", 
      params:data
    })
  }
export function getCountry(data) {
    return request({
      url: '/productManage/getCountry',
      method: "get", 
      params:data
    })
  }
