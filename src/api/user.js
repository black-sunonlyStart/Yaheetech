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
      method: "post",
      data 
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
  //获得产品等级
export function getProductLevelEnums(data) {
    return request({
      url: '/productManage/getProductLevelEnums',
      method: "get", 
      params:data
    })
  }
  //

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
  //获取产品状态数量
  export function getDevelopStatesNum(data) {
    return request({
      url: '/productManage/getDevelopStatesNum',
      method: "post", 
      data
    })
  }
  //记录员工行为
  export function LogEmployeeTracking(data) {
    return request({
      url: 'http://qas-portal.yahee.com.cn:8088/Latest/WcfRedirect/TrackingController/LogEmployeeTracking',
      method: "post", 
      data
    })
  }
  //自定义备注
  export function saveDevelopmentmemo(data) {
    return request({
      url: '/productManage/saveDevelopmentmemo',
      method: "post", 
      data
    })
  }
  export function getUsExchangeRate(data) {
    return request({
      url: '/productManage/getUsExchangeRate',
      method: "get", 
      params:data
    })
  }
  export function getAssignedAuditorList(data) {
    return request({
      url: '/productManage/getAssignedAuditorList',
      method: "get", 
      params:data
    })
  }
  export function getFilePath(url,data) {
    return request({  
      url,
      method: "get", 
      params:data
    })
  }
  export function commonUploadFile(url,data) {
    return request({  
      url:url,
      method: "post", 
      data
    })
  }
  
  export function sendReq(data) {
    return request({  
      url:'/common/sendReq',
      method: "post", 
      data
    })
  }
  export function saveAssignedAuditor(data) {
    return request({  
      url:'/productManage/saveAssignedAuditor',
      method: "get", 
      params:data
    })
  }
  export function getSeriesCategoryDef1(data) {
    return request({  
      url:'/productManage/getSeriesCategoryDef',
      method: "get", 
      params:data
    })
  }
  export function FindGlobalNotes(url,data) {
    return request({  
      url:url,
      method: "post", 
      data,
    })
  }
  export function Insertglobalnotes(url,data) {
    return request({  
      url:url,
      method: "post", 
      data,
    })
  }
  export function GetGlobalNotesUsers1(url,data) {
    return request({  
      url:url,
      method: "post", 
      data,
    })
  }
  export function OutputNew(url,data) {
    return request({  
      url:url,
      method: "post", 
      data,
    })
  }
//新品开发任务 start
//大组长
export function getBigDepartmentLeaders(data) {
    return request({  
      url:'/progressDevelopment/getBigDepartmentLeaders',
      method: "get", 
      params:data
    })
  }
//状态列表
export function getStateTime(data) {
    return request({  
      url:'/progressDevelopment/getStateTime',
      method: "get", 
      params:data
    })
  }
//预计结束时间
export function getExpectEndTime(data) {
    return request({  
      url:'/progressDevelopment/getExpectEndTime',
      method: "get", 
      params:data
    })
  }
//分页查询
export function getProgressDevelopment(data) {
    return request({  
      url:'/progressDevelopment/getProgressDevelopment',
      method: "post", 
      data
    })
  }
//打回
export function approvalMemo(data) {
    return request({  
      url:'/progressDevelopment/approvalMemo',
      method: "post", 
      data
    })
  }
//分页查询
export function saveProgressDevelopment(data) {
    return request({  
      url:'/progressDevelopment/saveProgressDevelopment',
      method: "post", 
      data
    })
  }
//时间节点
export function getTimeEnums(data) {
    return request({  
      url:'/progressDevelopment/getTimeEnums',
      method: "get", 
      params:data
    })
  }
//时间节点
export function getSeriesCategoryDef(data) {
    return request({  
      url:'/progressDevelopment/getSeriesCategoryDef',
      method: "get", 
      params:data
    })
  }
//进度清单
export function getProgressDevelopmentMemo(data) {
    return request({  
      url:`/progressDevelopment/getProgressDevelopmentMemo/${data}`,
      method: "get", 
    })
  }
//进度清单
export function getRemain(data) {
    return request({  
      url:`/progressDevelopment/getRemain/${data.progressDevelopmentId}/${data.operation}`,
      method: "get", 
    })
  }
//进度取消冻结数据
export function progressUnfreezing(data) {
    return request({  
      url:'/progressDevelopment/unfreezing',
      method: "post", 
      data,
    })
  }
//进度取消冻结数据
export function saveMemo(data) {
    return request({  
      url:'/progressDevelopment/saveMemo',
      method: "post", 
      data,
    })
  }
//进度冻结数据
export function progressfreezing(data) {
    return request({  
      url:'/progressDevelopment/freezing',
      method: "post", 
      data,
    })
  }
//
export function getAllQueryStatus(data) {
    return request({  
      url:'/progressDevelopment/getAllQueryStatus',
      method: "post", 
      data,
    })
  }
//保存进度清单
export function saveStateTime(data) {
    return request({  
      url:'/progressDevelopment/saveStateTime',
      method: "post", 
      data
    })
  }
  
//获取经办人
export function getSpecifyAssigneeIds(data) {
    return request({  
      url:'/progressDevelopment/getSpecifyAssigneeIds',
      method: "get", 
      params:data
    })
  }
//分配经办人
export function saveAssigneeId(data) {
    return request({  
      url:'/progressDevelopment/saveAssigneeId',
      method: "post", 
      data
    })
  }

//新品开发任务 end

//样品确认任务start

//样品确认列表数据
export function queryProductSample(data){
    return request ({
        url:'/productSample/queryProductSample',
        method:'post',
        data
    })
}
//查询指定样品确认数据
export function queryProductSampleById(data){
    return request ({
        url:'/productSample/queryProductSampleById',
        method:'get',
        params:data
    })
}
//获取供应商数据
export function findSupplier(data){
    return request ({
        url:'/productSample/findSupplier',
        method:'get',
    })
}
//保存分配样品确认人员
export function saveSampleValidator(data){
    return request ({
        url:'/productSample/saveSampleValidator',
        method:'post',
        data
    })
}
//提交样品确认数据
export function approvalSampleMemo(data){
    return request ({
        url:'/productSample/approvalSampleMemo',
        method:'post',
        data
    })
}
//取消数据
export function cancelApplication(data){
    return request ({
        url:'/productSample/cancelApplication',
        method:'post',
        data
    })
}
//打回数据
export function repulse(data){
    return request ({
        url:'/productSample/repulse',
        method:'post',
        data
    })
}
//样品申请修改数据
export function applyUpdateResult(data){
    return request ({
        url:'/productSample/applyUpdateResult',
        method:'post',
        data
    })
}
//审核修改结果
export function reviewApplyUpdateResult(data){
    return request ({
        url:'/productSample/reviewApplyUpdateResult',
        method:'post',
        data
    })
}
//查看申请结果
export function getApplyUpdateResult(data){
    return request ({
        url:'/productSample/getApplyUpdateResult',
        method:'get',
        params:data
    })
}
//恢复数据
export function unCancel(data){
    return request ({
        url:'/productSample/unCancel',
        method:'post',
        data
    })
}
//关联数据查询
export function getRelevanceProductSample(data){
    return request ({
        url:'/productSample/getRelevanceProductSample',
        method:'get',
        params:data
    })
}
//获取关联数据id
export function getId(data){
    return request ({
        url:'/productSample/getId',
        method:'get',
        params:data
    })
}
//上传文件的接口
export function saveProductSampleAttachment(data,url){
    return request ({
        url,
        method:'post',
        data
    })
}
//样品编辑接口
export function saveProductSample(data){
    return request ({
        url:'/productSample/saveProductSample',
        method:'post',
        data
    })
}
//验证、获取 开发ID / sku别名
export function getProductKey(data){
    return request ({
        url:'/productSample/getProductKey',
        method:'get',
        params:data
    })
}
//验证&获取 是否产前样 & 来样次数
export function getPreproductionSample(data){
    return request ({
        url:'/productSample/getPreproductionSample',
        method:'post',
        data
    })
}
//提交样品确认文件数据
export function savaProductSampleRes(data){
    return request ({
        url:'/productSample/savaProductSampleRes',
        method:'post',
        data
    })
}
//同步样品文件
export function saveProductSampleAttachment1(data){
    return request ({
        url:'/productSample/saveProductSampleAttachment1',
        method:'post',
        data
    })
}
//同步样品文件
export function delSampleInfo(data){
    return request ({
        url:'/productSample/delSampleInfo',
        method:'get',
        params:data
    })
}
//样品确认员
export function getSampleValidatorList(data){
    return request ({
        url:'/productSample/getSampleValidatorList',
        method:'get',
        params:data
    })
}

//样品确认任务end


//新品开发start

export function atGetSeriesCategoryDef(data){
    return request ({
        url:'/productDemand/getSeriesCategoryDef',
        method:'get',
        params:data
    })
}
export function atgetBigDepartmentLeaders(data){
    return request ({
        url:'/productDemand/getBigDepartmentLeaders',
        method:'get',
        params:data
    })
}
export function getProductDemandById(data){
    return request ({
        url:'/productDemand/getProductDemandById',
        method:'get',
        params:data
    })
}

export function queryPlats(url){
    return request ({
        url:url,
        method:'get',
    })
}

export function getProductDemand(data){
    return request ({
        url:'/productDemand/getProductDemand',
        method:'post',
        data
    })
}
//分类数量清单
export function getQueryProductDemandNum(data){
    return request ({
        url:'/productDemand/getQueryProductDemandNum',
        method:'post',
        data
    })
}
//分类数量清单
export function saveProductDemand(data){
    return request ({
        url:'/productDemand/saveProductDemand',
        method:'post',
        data
    })
}
//新增/编辑 专利信息
export function saveProductDemandPatent(data){
    return request ({
        url:'/productDemand/saveProductDemandPatent',
        method:'post',
        data
    })
}
//新增/编辑 
export function saveProductDemandDesignInfo(data){
    return request ({
        url:'/productDemand/saveProductDemandDesignInfo',
        method:'post',
        data
    })
}
//审核 
export function auditProductDemand(data){
    return request ({
        url:'/productDemand/auditProductDemand',
        method:'post',
        data
    })
}
//分配设计师
export function saveDesigner(data){
    return request ({
        url:'/productDemand/saveDesigner',
        method:'post',
        data
    })
}
//专利检索人员
export function getPatentClerks(){
    return request ({
        url:'/productDemand/getPatentClerks',
        method:'get',
        
    })
}
//分配检索人员
export function savePatentClerk(data){
    return request ({
        url:'/productDemand/savePatentClerk',
        method:'post',
        data
    })
}
//更换业务开发
export function saveBusinessId(data){
    return request ({
        url:'/productDemand/saveBusinessId',
        method:'post',
        data
    })
}
//取消原因
export function getCancelType(data){
    return request ({
        url:'/productDemand/getCancelType',
        method:'get',
        
    })
}
//取消原因
export function getDesigners2(data){
    return request ({
        url:'/productDemand/getDesigners2',
        method:'get',
        
    })
}
//取消
export function demandFreezing(data){
    return request ({
        url:'/productDemand/freezing',
        method:'POST',
        data
    })
}
export function demandUnfreezing(data){
    return request ({
        url:'/productDemand/unfreezing',
        method:'POST',
        data
    })
}
export function skipProjectApproval(data){
    return request ({
        url:'/productDemand/skipProjectApproval',
        method:'POST',
        data
    })
}
export function skipStructuralDesign(data){
    return request ({
        url:'/productDemand/skipStructuralDesign',
        method:'POST',
        data
    })
}



//新品开发end

//翻译start
export function addTranslate(url,data) {
    return request({
      url,
      method: "post", 
      data
    })
  }
//获取全部翻译
export function getAllTranslate(url,data) {
    return request({
      url: `${url}/${data}`,
      method: "get", 
    })
  }
//获取全部翻译
export function getTimeStamp(url) {
    return request({
      url,
      method: "get", 
    })
  }
//翻译end

//样品导出start
//导出样品确认清单
export function exportProductSampleRequirement(data){
    return request ({
        url:'productSample/exportProductSampleRequirement',
        method:'POST',
        data
    })
}
//导出样品进度清单id集合
export function queryExportProductSampleProgress(data){
    return request ({
        url:'/productSample/queryExportProductSampleProgress',
        method:'POST',
        data
    })
}
//样品导出end