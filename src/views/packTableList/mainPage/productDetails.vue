<template>
<div v-loading="pageLoading">
    <div class="nav-container" style="z-index:111" v-if="renderDom"  v-permission="'Yahee.ERP.Product.ProductDev'" >
        <div class="navTitle" v-track="{triggerType:'browse',currentUrl: $route.path,behavior:'进入产品详情页'}">
            <el-row :gutter="5">
            <el-col :span="12">
                <el-card class="card">
                    <div class="router-text" @click="routerDev()" v-if="development.productDemandId">>>{{M2('新品需求详情页')}}</div>
                <div class="out-container">
                    <div class="image-container">
                        <el-image
                            style="width: 97px; height: 97px; dispaly:block"
                            :src="titleImgSrc"
                            fit="fill"
                            >
                            <div slot="placeholder" class="image-slot icon-loading">
                                <i class="el-icon-loading" ></i>
                            </div>
                            <div slot="error" class="image-slot icon-loading" style="font-size:14px">
                                <i class="el-icon-picture-outline">{{M2('加载失败')}}</i>
                            </div>
                        </el-image>
                    </div>
                    <div class="detailsText">
                        <div>
                            {{M2('开发id')}}：<span>{{development && development.id ?development.id:'' }}</span>
                        </div>
                        <div>
                            {{M2('生成型号')}}：<span>{{productVos.skuAlias || '--'}}</span>
                        </div>
                        <div>
                            {{M2('开发市场')}}：<div class="countryTitle">{{ productCountryList ? productCountryList.countryName:'' }}</div> 
                            <div v-for="item in otherCountryList" :key="item.productCountryId" class="otherCountryTitle" @click="changeCountry(item.developmentId,item.productId,item.productCountryId)"> {{item ? item.countryName : ''}}</div>
                        </div>
                        <div class="haveMoneyLitte">
                            <div>
                                {{M2('开发价/利润')}}：
                            </div>
                            <div>
                                <div v-for="item in productMarketStrs" :key="item.platformName" class="profit">
                                    <span v-for="name in item.marketProfits" :key="name.warehouseName">
                                        <span v-if="(item.currency == 'USD'&& name.warehouseId == 8) || item.currency != 'USD'">
                                            {{item.platformName}}-{{name.warehouseName}}-{{item.currency}}
                                            <span :class="item.developmentPrice <= 0 ? 'showColor':''"> {{item.developmentPrice}}</span> /
                                            <span :class="item.marketProfits && name && name.profitMargin <= 0 ? 'showColor':'redColor'" > {{name.profitMargin ? (name.profitMargin * 100).toFixed(2) + '%' : '' }}</span>
                                            <span v-if="name.sfpDevelopmentprice"> SFP：{{name.sfpDevelopmentprice}} / </span>
                                            <span :class="item.marketProfits && name && name.sfpProfitMargin <= 0 ? 'showColor':'redColor'" v-if="name.sfpDevelopmentprice">{{(name.sfpProfitMargin * 100).toFixed(2) + '%' }}</span>
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="sizeBox">
                            <div class="sizeColor" v-for="item in showSizeText" :key="item+Math.random()">
                                {{M2(item)}}
                            </div>
                        </div>
                    </div>
                </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="card">
                    <div class="stepBox">
                        <span class="leftButton" @click="leftMove"><i class="el-icon-d-arrow-left"></i></span>
                            <span class="step-container">
                                <el-steps :active="nowStatus" space='150' align-center  finish-status="success" process-status="finish">
                                    <el-step v-for="item in developmentProgresses" :title="M2(item.statusValue)" :key="item.status" :description="item.createOn">
                                            <template slot="icon">
                                                <div class="imageBox"></div>
                                            </template>
                                            <template slot="title">
                                                <el-tooltip class="item" effect="dark" :content="item.createBy" placement="top">
                                                    <div class="stepTitle">
                                                        {{M2(item.statusValue)}}
                                                    </div>
                                                </el-tooltip>
                                            </template>
                                    </el-step>
                                </el-steps>
                            </span>
                        <span class='rightButton' @click="rightMove"><i class="el-icon-d-arrow-right"></i></span>
                    </div> 
                    <div class="stepText">
                        <span class="stepTextLittleTitle">{{M2('业务')}}：{{devInformationDetaiList ? devInformationDetaiList.businessProduct :''}}</span><span>{{M2('采购')}}：{{devInformationDetaiList ? devInformationDetaiList.orderProduct :''}}</span>
                    </div> 
                </el-card>
            </el-col>
            </el-row>
        </div>
        <div class="cardBox">
            <div class="cardBoxMain">
                <el-tabs v-model="activeName" :before-leave="handleClick">
                    <el-tab-pane name="first" >
                    <span slot="label"><span style="margin-right:30px">{{M2('开发类型/场景')}}</span><span style="margin-right:30px">{{M2('产品图片')}}</span><span>{{M2('销售目标')}}</span></span>
                        <div class="backgoundCon"></div>
                        <div class='tabContainer' >
                            <el-card style="min-height:170px">
                                <div slot="header" class="clearfix">
                                    <div>{{M2('开发类型/场景')}}</div> 
                                    <div v-if="isStatusEdit" class="editText">
                                        <div class="edit-position" 
                                            v-permission="'ERP.Product.ProductDev.SalesManEdit'" 
                                            perkey='ERP.Product.ProductDev.SalesManEdit' 
                                            @click="isEdit = !isEdit" 
                                            v-if="isEdit"
                                            v-track="{triggerType:'click',currentUrl: $route.path,behavior:'编辑',businessCode:'开发类型/场景'}"
                                            ><span><i class="icon-edit"></i>{{M2('编辑')}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="isEdit">
                                    <devDetail :productVoDetail='productVoDetail' :multiAttribute='multiAttribute' :showSizeTitle='showSizeTitle'></devDetail>
                                </div>
                                <div v-else>
                                    <devScene @closeEdit='editPage' :productVoDetail='productVoDetail' ></devScene>
                                </div>
                            </el-card>
                            <el-card style="margin-top:10px">
                                <div slot="header" class="clearfix">
                                    <span>{{M2('产品图片')}}</span>
                                    <div v-if="isStatusEdit1 && $route.query.productId" class="editText">
                                        <div class="edit-position" 
                                            v-permission="'ERP.Product.ProductDev.SalesManEdit'" 
                                            perkey='ERP.Product.ProductDev.SalesManEdit' 
                                            @click="isEdit1 = !isEdit1" 
                                            v-if="isEdit1"
                                            v-track="{triggerType:'click',currentUrl: $route.path,behavior:'编辑',businessCode:'产品图片'}"
                                            >
                                            <span ><i class="icon-edit"></i>{{M2('编辑')}}</span>
                                        </div>
                                    </div> 
                                </div>
                                <div v-if="isEdit1" class="imgContainer" >
                                    <div  class="w-50">
                                        <div style="flex-shrink: 0">
                                            {{M2('产品尺寸图')}}
                                        </div>
                                        <div class="imgContainer" style="margin:12px 0px">
                                            <div v-for="item in productImgDetail" :key="item.key" class="imgCon">
                                                <el-image
                                                    class="imageListBox"
                                                    :src="item.showImgUrl"
                                                    fit="fill"
                                                    @click="openImageUrl(item.showBigImgUrl)"
                                                    >
                                                    <div slot="placeholder" class="image-slot icon-loading">
                                                        <i class="el-icon-loading" ></i>
                                                    </div>
                                                    <div slot="error" class="image-slot icon-loading" style="font-size:14px">
                                                        <i class="el-icon-picture-outline">{{M2('加载失败')}}</i>
                                                    </div>
                                                </el-image>
                                            </div>
                                        </div>
                                    </div>
                                    <div  class="w-50">
                                        <div style="flex-shrink: 0">
                                            {{M2('产品细节图')}}
                                        </div>
                                        <div class="imgContainer" style="margin:12px 0px">
                                            <div v-for="item in productImgDetails" :key="item.key" class="imgCon">
                                                <el-image
                                                    class="imageListBox"
                                                    :src="item.showImgUrl"
                                                    fit="fill"
                                                    @click="openImageUrl(item.showBigImgUrl)"
                                                    >
                                                    <div slot="placeholder" class="image-slot icon-loading">
                                                        <i class="el-icon-loading" ></i>
                                                    </div>
                                                    <div slot="error" class="image-slot icon-loading" style="font-size:14px">
                                                        <i class="el-icon-picture-outline">{{M2('加载失败')}}</i>
                                                    </div>
                                                </el-image>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-else>
                                    <div class="imgContainer">
                                        <div class="w-50">
                                            <div style="flex-shrink: 0">
                                                {{M2('产品尺寸图')}}
                                            </div>
                                            <imgUpload @inputImg='putImgList' :imgFileType='4' :showButton="false" :value='imageList' @closeEdit='updeEditPage' :limit="10"></imgUpload> 
                                        </div>
                                        <div class="w-50">
                                            <div style="flex-shrink: 0">
                                                {{M2('产品细节图')}}
                                            </div>
                                            <imgUpload @inputImg='putdetailsImgList' :imgFileType='5' :showButton="false" :value='detailsImageList' @closeEdit='updeEditPage' :limit="10"></imgUpload> 
                                        </div>
                                    </div>
                                        <el-col :span="24">
                                        <div class="bottomButton">
                                            <el-button type="primary" v-track="{triggerType:'click',currentUrl: $route.path,behavior:'保存',businessCode:'产品尺寸图'}" size="mini" @click="updeEditPage" perkey='ERP.Product.ProductDev.SalesManEdit'>{{M2('保存')}}</el-button>
                                            <el-button size="mini" v-track="{triggerType:'click',currentUrl: $route.path,behavior:'取消',businessCode:'产品尺寸图'}" @click="updeEditPage">{{M2('取消')}}</el-button>
                                        </div>
                                    </el-col> 
                                </div>

                            </el-card>
                            <el-card style="margin-top:10px;margin-bottom:30px">
                                <div slot="header" class="clearfix">
                                    <span>{{M2('销售目标')}}</span>
                                    <div v-if="isStatusEdit2 && $route.query.productId" class="editText">
                                        <div class="edit-position" 
                                            v-permission="'ERP.Product.ProductDev.SalesManEdit'" 
                                            perkey='ERP.Product.ProductDev.SalesManEdit' 
                                            @click="isEdit2 = !isEdit2" 
                                            v-if="isEdit2"
                                            v-track="{triggerType:'click',currentUrl: $route.path,behavior:'编辑',businessCode:'销售目标'}"
                                            >
                                            <span><i class="icon-edit"></i>{{M2('编辑')}}</span>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div v-if="isEdit2">
                                    <sales-target-detail :salesTargetDetaiList='salesTargetDetaiList'></sales-target-detail>
                                </div>
                                <div v-else>
                                    <salesTargetEdit @closeEdit='salesEditPage' :salesTargetDetaiList='salesTargetDetaiList'></salesTargetEdit>
                                </div>
                            </el-card>
                        </div>                   
                    </el-tab-pane>
                    
                    <el-tab-pane :label="M2('开发信息')" name="fifth" style="margin-bottom:30px">
                        <div class="backgoundCon"></div>
                        <div class='tabContainer'>
                            <el-card>
                                <div slot="header" class="clearfix">
                                    <div>{{M2('开发信息')}} </div> 
                                    <div v-if="isStatusEdit4" class="editText">
                                        <div class="edit-position" 
                                            v-permission="'ERP.Product.ProductDev.SalesManEdit'" 
                                            perkey='ERP.Product.ProductDev.SalesManEdit' 
                                            @click="isEdit4 = !isEdit4" 
                                            v-if="isEdit4"
                                            v-track="{triggerType:'click',currentUrl: $route.path,behavior:'编辑',businessCode:'开发信息'}"
                                            >
                                            <span><i class="icon-edit"></i>{{M2('编辑')}}</span>
                                        </div>
                                    </div>
                                     
                                </div>
                                <div v-if="isEdit4">
                                    <devInformationDetail :devInformationDetaiList='devInformationDetaiList'></devInformationDetail>
                                </div>
                                <div v-else>
                                    <devInformationEdit @closeEdit='devInfoEdit' :devInformationDetaiList='devInformationDetaiList' :nowStatus='timeStatus'></devInformationEdit>
                                </div>
                            </el-card>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane :label="M2('竞品信息')" name="fourth">
                        <div class="backgoundCon"></div>
                        <div class='tabContainer'>
                            <el-card style="margin-bottom:30px">
                                <div slot="header" class="clearfix">
                                    <div>{{M2('竞品信息')}}</div>  
                                        <div v-if="isStatusEdit3" class="editText">
                                            <div class="edit-position" 
                                                v-permission="'ERP.Product.ProductDev.SalesManEdit'" 
                                                perkey='ERP.Product.ProductDev.SalesManEdit' 
                                                @click="isEdit3 = !isEdit3" 
                                                v-if="isEdit3"
                                                v-track="{triggerType:'click',currentUrl: $route.path,behavior:'编辑',businessCode:'竞品信息'}"
                                                >
                                                <span ><i class="icon-edit"></i>{{M2('编辑')}}</span>
                                            </div>
                                        </div>
                                     
                                </div>
                                <div v-if="isEdit3">
                                    <comNewsDetail :comNewsDetailList='comNewsDetailList'></comNewsDetail>
                                </div>
                                <div v-else>
                                    <comNewsEdit @closeEdit='comNewsEdit' :comNewsDetailList='comNewsDetailList'></comNewsEdit>
                                </div>
                            </el-card>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane :label="M2('产品认证信息')" name="sixth">
                        <span slot="label"><span style="margin-right:30px">{{M2('产品认证信息')}}</span><span>{{M2('产品标题和供应商信息')}}</span></span>
                        <div class="backgoundCon"></div>
                        <div class='tabContainer'>
                            <el-card>
                                <div slot="header" class="clearfix">
                                    <div>{{M2('产品认证信息')}} </div>
                                    <div v-if="isStatusEdit5" class="editText">
                                        <div class="edit-position" 
                                            v-permission="'ERP.Product.ProductDev.EditAuth'" 
                                            perkey='ERP.Product.ProductDev.EditAuth' 
                                            @click="isEdit5 = !isEdit5" 
                                            v-if="isEdit5"
                                            v-track="{triggerType:'click',currentUrl: $route.path,behavior:'编辑',businessCode:'产品认证信息'}"
                                            ><span ><i class="icon-edit"></i>{{M2('编辑')}}</span>
                                        </div>
                                    </div>
                                      
                                </div>
                                <div v-if="isEdit5">
                                    <prodCerInfoDetail :prodCerInfoDetailList='prodCerInfoDetailList'></prodCerInfoDetail>
                                </div>
                                <div v-else>
                                    <prodCerInfoEdit @closeEdit='proInfoEdit'  :prodCerInfoDetailList='prodCerInfoDetailList'></prodCerInfoEdit>
                                </div>
                            </el-card>
                        </div>
                        <div class="backgoundCon"></div>
                        <div class='tabContainer'>
                            <el-card style="margin-bottom:30px">
                                <div slot="header" class="clearfix">
                                    <div>{{M2('产品标题和供应商信息')}}</div>
                                        <div v-if="isStatusEdit6" class="editText">
                                            <div class="edit-position" 
                                                    v-permission="'ERP.Product.ProductDev.BuyerEdit'" 
                                                    perkey='ERP.Product.ProductDev.BuyerEdit' 
                                                    @click="isEdit6 = !isEdit6" 
                                                    v-if="isEdit6"
                                                    v-track="{triggerType:'click',currentUrl: $route.path,behavior:'编辑',businessCode:'产品标题和供应商信息'}"
                                                    ><span><i class="icon-edit"></i>{{M2('编辑')}}</span>
                                            </div>
                                        </div>
                                      
                                </div>
                                <div v-if="isEdit6">
                                    <prodevInfoDetail :prodevInfoDetaiList='prodevInfoDetaiList'  :proImageList='proImageList'></prodevInfoDetail>
                                </div>
                                <div v-else>
                                    <prodevInfoEdit @closeEdit='prodevInfoEdit' :proImageList='proImageList'  @getAllpageList='getAllpageList' :prodevInfoDetaiList='prodevInfoDetaiList'></prodevInfoEdit>
                                </div>
                            </el-card>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane :label="M2('产品尺寸和属性信息')" name="eigth">
                        <div class="backgoundCon"></div>
                        <div class='tabContainer'>
                            <el-card style="margin-bottom:30px">
                                <div slot="header" class="clearfix">
                                    <div>{{M2('产品尺寸和属性信息')}}</div> 
                                        <div v-if="isStatusEdit7" class="editText">
                                            <div class="edit-position" 
                                                v-permission="'ERP.Product.ProductDev.BuyerEdit'" 
                                                perkey='ERP.Product.ProductDev.BuyerEdit' 
                                                @click="isEdit7 = !isEdit7" 
                                                v-if="isEdit7"
                                                v-track="{triggerType:'click',currentUrl: $route.path,behavior:'编辑',businessCode:'产品尺寸和属性信息'}"
                                                ><span ><i class="icon-edit"></i>{{M2('编辑')}}</span>
                                            </div>
                                        </div>
                                      
                                </div>
                                <div v-if="isEdit7">
                                    <pordSizeAttrInfo :pordSizeAttrInfoList='pordSizeAttrInfoList' :multiAttribute='multiAttribute'></pordSizeAttrInfo>
                                </div>
                                <div v-else>
                                    <pordSizeAttrEdit  @closeEdit='closeProdevAttr' :pordSizeAttrInfoList='pordSizeAttrInfoList' :multiAttribute='multiAttribute'></pordSizeAttrEdit>
                                </div>
                            </el-card>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane :label="M2('采购信息')" name="nineth">
                        <div class="backgoundCon"></div>
                        <div class='tabContainer'>
                            <el-card style="margin-bottom:30px">
                                <div slot="header" class="clearfix">
                                    <div>{{M2('采购信息')}}</div>
                                        <div v-if="isStatusEdit8" class="editText">
                                            <div class="edit-position" 
                                                v-permission="'ERP.Product.ProductDev.BuyerEdit'" 
                                                perkey='ERP.Product.ProductDev.BuyerEdit' 
                                                @click="isEdit8 = !isEdit8" 
                                                v-if="isEdit8"
                                                v-track="{triggerType:'click',currentUrl: $route.path,behavior:'编辑',businessCode:'采购信息'}"
                                                ><span ><i class="icon-edit"></i>{{M2('编辑')}}</span>
                                            </div>
                                        </div>
                                       
                                </div>
                                <div v-if="isEdit8">
                                    <purchaseInfoDetail :purchaseInfoDetaiList='purchaseInfoDetaiList' :nowStatus='timeStatus'></purchaseInfoDetail>
                                </div>
                                <div v-else>
                                    <purchaseInfoEdit  @closeEdit='closePurchaseInfo' @getTableList='getAllpageList' :purchaseInfoDetaiList='purchaseInfoDetaiList' :nowStatus='timeStatus'></purchaseInfoEdit>
                                </div>
                            </el-card>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane :label="M2('备注')" name="tenth">
                        <div class="backgoundCon"></div>
                        <div class='tabContainer1'>
                            <el-card style="margin-bottom:30px">
                                <div slot="header" class="clearfix">
                                    <div>{{M2('备注')}}</div>   
                                </div>
                                <remarks :remarksParam='remarksParam' v-if="showTenth" v-track="{triggerType:'click',currentUrl: $route.path,behavior:'备注',businessCode:'备注'}"></remarks>
                            </el-card>
                        </div>
                    </el-tab-pane>
                </el-tabs>
                <operationButton :nowStatus='timeStatus' :isanji='isanji' :employee='employee' @getTableList='updateGetAllpageList' v-if="renderDom"></operationButton>   
            </div>
        </div>
    </div>  
</div>
</template>
<script>
import { getProductDevDetail,getProductMultipleAttribute,exploitType,getImagePath,getEmployee,hasPermissions,getRoleTrue,getCountry,getUsExchangeRate } from '@/api/user.js'
import { judgePorduction} from '@/utils/tools.js'
export default {
    name: 'productDetails',
    components:{
        devDetail:() => import('@/components/productDetail/devDetail'),
        devScene:() => import('@/components/productDetail/devScene'),
        salesTargetDetail:() => import('@/components/productDetail/salesTargetDetail'),
        salesTargetEdit:() => import('@/components/productDetail/salesTargetEdit'),
        comNewsDetail:() => import('@/components/productDetail/comNewsDetail'),
        comNewsEdit:() => import('@/components/productDetail/comNewsEdit'),
        devInformationDetail:() => import('@/components/productDetail/devInformationDetail'),
        devInformationEdit:() => import('@/components/productDetail/devInformationEdit'),
        prodCerInfoDetail:() => import('@/components/productDetail/prodCerInfoDetail'),
        prodevInfoDetail:() => import('@/components/productDetail/prodevInfoDetail'),
        prodCerInfoEdit:() => import('@/components/productDetail/prodCerInfoEdit'),
        prodevInfoEdit:() => import('@/components/productDetail/prodevInfoEdit'),
        pordSizeAttrInfo:() => import('@/components/productDetail/pordSizeAttrInfo'),
        pordSizeAttrEdit:() => import('@/components/productDetail/pordSizeAttrEdit'),
        purchaseInfoDetail:() => import('@/components/productDetail/purchaseInfoDetail'),
        purchaseInfoEdit:() => import('@/components/productDetail/purchaseInfoEdit'),
        operationButton:() => import('@/components/productDetail/operationButton'),
        remarks:() => import('@/components/remarksNew'),
        imgUpload:() => import('@/components/uploadImg'),
},
data () {
    return {
        showTenth:false,
        remarksParam:{},
        statusOptions : [0, 1, 2, 3, 4, 5, 6, 10, 11, 12, 13],
        showInfoTitle:false,
        scenarios:'',
        showSizeText:[],
        multiAttribute:[],
        employee:{},
        titleImgSrc:'',
        productMarketStrs:{},//头部信息产品利润信息
        copeDevProgress:{},
        allDetailPageDate:{},
        development:{},
        productCountryList:{},
        otherCountryList:{},
        // otherProductCountryList:{},
        productVos:{},
        productVoDetail:{},//开发类型详情数据
        productImgDetail:{},//开发产品尺寸图
        productImgDetails:{},//开发产品尺寸图
        comNewsDetailList:{},//竞品信息数据
        devInformationDetaiList:{},//开发信息
        prodCerInfoDetailList:{},//产品认证信息
        prodevInfoDetaiList:{},//产品供应商信息
        pordSizeAttrInfoList:{},//产品尺寸和属性
        purchaseInfoDetaiList:{},//采购信息
        salesTargetDetaiList:{
            xsstarrating : null,//产品星级评分
            xstargetstarrating:null, //我司目标星级评分
            xsrepairraterequirement:null, //目标售后返修率要求
            xsmarket:null, //产品开发市场
            xstestsampletime:null, //产品测样时间点
            xspurchaseprice:null, //目标采购价
            xsdailysales:null, //产品预估产量
            xsfirstorderquantity:null, //预估首单订单数量
            xsspecialrequirements:null, //产品包装尺寸有无特殊要求
            xsorderoftime:null,
        },//销售目标数据
        developmentProgresses:[
            {
                statusValue:'未提交审批',
                status:'0',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:'未提交审批'
            },
            // {
            //     statusValue:'待审批',
            //     status:'1',
            //     createBy:'',
            //     createOn:'',
            //     toStatus :'',
            //     toStatusValue:'待审批'
            // },
            {
                statusValue:'待认证确认',
                status:'2',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:'待认证确认'
            },
            {
                statusValue:'寻找供应商',
                status:'3',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:'寻找供应商'
            },
            {
                statusValue:'采购主管审核',
                status:'4',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:'采购主管审核'
            },
            {
                statusValue:'认证审核',
                status:'5',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:'认证审核'
            },
            {
                statusValue:'待利润初审',
                status:'6',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:'待利润初审'
            },
            {
                statusValue:'样品采购审核',
                status:'7',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:'样品采购审核'
            },
            {
                statusValue:'确认样品',
                status:'8',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:'确认样品'
            },
            {
                statusValue:'待利润复核',
                status:'9',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:'待利润复核'
            },
            {
                statusValue:'待终审',
                status:'10',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:'待终审'
            },
            {
                statusValue:'开发完未上架',
                status:'11',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:'开发完未上架'
            },
            {
                statusValue:'开发完已上架',
                status:'12',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:'开发完已上架'
            },
            {
                statusValue:'已取消',
                status:'13',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:'已取消'
            },
            {
                statusValue:'已冻结',
                status:'14',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:'已冻结'
            },
        ],//进度条数据
        imageList:[],
        detailsImageList:[],
        activeName: 'first',
        isEdit:true,
        isEdit1:true,
        isEdit2:true,
        isEdit3:true,
        isEdit4:true,
        isEdit5:true,
        isEdit6:true,
        isEdit7:true,
        isEdit8:true,
        isStatusEdit:false,
        isStatusEdit1:false,
        isStatusEdit2:false,
        isStatusEdit3:false,
        isStatusEdit4:false,
        isStatusEdit5:false,
        isStatusEdit6:false,
        isStatusEdit7:false,
        isStatusEdit8:false,
        nowStatus:0,
        timeStatus:0,
        proImageList:'',
        // proFileList:'',
        showSizeTitle:false,
        renderDom:false,
        buyerName:'',
        buyerid:'',
        isanji:[],
        routePageList:{},
        pageLoading:true,
    }
},
created () {
    this.getPermissions()   
    this.getRoutePageAll()
    if(this.routePageList.developmentId || this.routePageList.productCountryId || this.routePageList.productId) {
        this.getAllpageList()
    }    
},
mounted () {
    if(this.routePageList.id == 8 || this.routePageList.id == 26){
        this.getNewSizeList()
        this.showSizeTitle = true
    }
    if(!this.routePageList.developmentId || !this.routePageList.developmentId){
        this.isStatusEdit = true;
        this.isStatusEdit1 = true;
        this.isStatusEdit2 = true;
        this.isStatusEdit3 = true;
        this.isStatusEdit4 = true;
    }
    this.init()
},
methods: {
    routerDev(){
        if(judgePorduction()){
                window.open(`http://productdev.yaheecloud.com/newProductPageDetail?id=${this.development.productDemandId}`,'_blank')
            }else {
                window.open(`http://api-tools-test.yahee.com.cn:82/newProductPageDetail?id=${this.development.productDemandId}`,'_blank')
            }
    },
    getRoutePageAll (){
        this.routePageList = {
            // developmentType: this.$route.query.developmentType ? this.$route.query.developmentType : '',
            developmentId:this.$route.query.developmentId ? this.$route.query.developmentId : '',
            productId: this.$route.query.productId ? this.$route.query.productId : '',
            developmentScenarios: this.$route.query.developmentScenarios ? this.$route.query.developmentScenarios : '',
            id: this.$route.query.id ? this.$route.query.id : '',
            edit:this.$route.query.edit === 'false'? this.$route.query.edit : '',
            productCountryId:this.$route.query.productCountryId ? this.$route.query.productCountryId : '',
        }
    },
    //权限判断
    getPermissions(){
        let  params = [
            'ERP.Product.ProductDev.SalesManEdit',
            'ERP.Product.ProductDev.EditAuth',
            'ERP.Product.ProductDev.BuyerEdit',
            'ERP.Product.ProductDev.ADD',
            'ERP.Product.ProductDev.ManagerCancel',
            'ERP.Product.ProductDev.ManagerAudit',
            'ERP.Product.ProductDev.EditGroup',
            'ERP.Product.ProductDev.SalesManBack',
            'ERP.Product.ProductDev.BuyerBack',
            'ERP.Product.ProductDev.SalesBack',
            'ERP.Product.ProductDev.Cancel',
            'ERP.Product.ProductDev.EndAudit',
            'ERP.Product.ProductDev.AuditAuth',
            'ERP.Product.ProductDev.PurchasingSupervisorAudit',
            'ERP.Product.ProductDev.BackToFreezingOff',
            'ERP.Product.ProductDev.SamplePurchaseAudit',
            'Yahee.ERP.Product.ProductDev',
            'ERP.Product.ProductDev.DistributionProcurement',
            'ERP.Product.ProductDev.FreezingOff',
            'ERP.Product.ProductDev.Audit',
            'ERP.Product.ProductDev.ExportSample',
            'ERP.Product.ProductDev.ProfitsFirstTrial'
        ]
        hasPermissions(params).then(res => {
            this.pageLoading = false
            let data = JSON.stringify( res.data);
            sessionStorage.setItem("permissions", data);
              res.data.forEach(item => {
                if(item.PermissionCode == 'Yahee.ERP.Product.ProductDev' && !item.HasPermission){
                    this.$message({
                        message: this.M2('对不起您没有权限（Yahee.ERP.Product.ProductDev）进行当前操作！'),
                        type: 'error',
                        duration:0,
                        showClose:true,
                        offset:300,
                    })
                }
            })
            this.renderDom = true
        })
    },
    scrollPostion(){
        if(document.body.scrollTop == 0) return
        document.body.scrollTop = document.documentElement.scrollTop = 0
    },
    updateGetAllpageList(){
        location.reload()
    },
    initState(){
        this.isStatusEdit=false
        this.isStatusEdit1=false
        this.isStatusEdit2=false
        this.isStatusEdit3=false
        this.isStatusEdit4=false
        this.isStatusEdit5=false
        this.isStatusEdit6=false
        this.isStatusEdit7=false
        this.isStatusEdit8=false
    },
    controlEdit(val){
        let params = {
            roIds:'42'
        }
        getRoleTrue(params).then(res =>{
            if(res.data){
                this.isStatusEdit=true
                this.isStatusEdit1=true
                this.isStatusEdit2=true
                this.isStatusEdit3=true
                this.isStatusEdit4=true
                this.isStatusEdit5=true          
                this.isStatusEdit6=true
                this.isStatusEdit7=true
                this.isStatusEdit8=true
                this.getStateRole(val)
                if(this.routePageList.edit === 'false') {
                    this.initState()
                }
            }
        })    
    },
    getStateRole(val){
        switch(val){
            case 0 :
                this.isStatusEdit = true;
                this.isStatusEdit1 = true;
                this.isStatusEdit2 = true;
                this.isStatusEdit3 = true;
                this.isStatusEdit4 = true;
            break;
            case 1:
                this.isStatusEdit = true;
                this.isStatusEdit1 = true;
                this.isStatusEdit2 = true;
                this.isStatusEdit3 = true;
                this.isStatusEdit4 = true;
            break;
            case 11:
                this.isStatusEdit5 = true;
            break;
            case 2:
                if(this.employee.Id ==  this.buyerid){
                    this.isStatusEdit6 = true;
                    this.isStatusEdit7 = true;
                    this.isStatusEdit8 = true;
                    }
                    this.isStatusEdit = true;
                    this.isStatusEdit1 = true;
                    this.isStatusEdit2 = true;
                    this.isStatusEdit3 = true;
                    this.isStatusEdit4 = true;
                    this.isStatusEdit5 = true;   
            break;
            case 13:
                
            break;
            case 12:
                this.isStatusEdit5 = true;
                this.isStatusEdit6 = true
            break;
            case 3 :
                this.isStatusEdit = true;
                this.isStatusEdit1 = true;
                this.isStatusEdit2 = true;
                this.isStatusEdit3 = true;
                this.isStatusEdit4 = true;
            break;
            case 10:
            break;
            case 4:
                if(this.employee.Id ==  this.buyerid){
                    this.isStatusEdit6 = true;
                    this.isStatusEdit7 = true;
                    this.isStatusEdit8 = true;
                }
            break;
            case 5:
                this.isStatusEdit = true;
                this.isStatusEdit1 = true;
                this.isStatusEdit2 = true;
                this.isStatusEdit3 = true;
                this.isStatusEdit4 = true;
            break;
            case 6:
                this.isStatusEdit = true;
                this.isStatusEdit1 = true;
                this.isStatusEdit2 = true;
                this.isStatusEdit3 = true;
                this.isStatusEdit4 = true;
            break;
            case 7:
            break;
            case 8:
            break;
            case 9:
            break;
            case 14:
            break;
        }
    },
    init(){
        getEmployee().then(res => {
            if(res.data){
                this.employee = res.data
            }
        })
    },
    openImageUrl(url){
        window.open(url)
    },
    //拼接图片地址
    newGetImagePath(){
        getImagePath().then(res => {
            if(res.data){
                this.proImageList = res.data
            }
        })
    },
    getNewSizeList(){
        //  this.scenarios = ''
        if(!this.scenarios){
            if(this.routePageList.id == 8 && this.routePageList.developmentScenarios > 5){
                this.scenarios = 12
            }
            if(this.routePageList.id == 8 && this.routePageList.developmentScenarios < 5){
                this.scenarios = 3
            }
            if(this.routePageList.id == 26 && this.routePageList.developmentScenarios > 5){
                this.scenarios = 11
            }
            if(this.routePageList.id == 26 && this.routePageList.developmentScenarios < 5){
                this.scenarios = 2
            }
        }
        
        let params = {
            scenarios:this.scenarios,//开发场景
            // developmentType:this.routePageList.developmentType,
            developmentScenarios:this.scenarios,
            addDevelopmentId:this.routePageList.developmentId,
            associatedProductId:this.routePageList.id == 8 ? '' : this.routePageList.productId,
        }
        exploitType(params).then(res => {
            if(res.data){
                this.$router.push({
                    name:'productDetails',
                    query:{
                        developmentId:res.data.developmentId,
                        productId:res.data.productId,
                        productCountryId:res.data.productCountryId,
                    }
                    
                })
                let data = {
                    developmentId:res.data.developmentId,
                    productId:res.data.productId,
                    productCountryId:res.data.productCountryId,
                }
                this.getAllpageList(data)
            }
        })
    },
    //如果路由的数据没有获取到就从接口中获取
    getRouterDate(val) {
        if (!val) return
        if(!this.routePageList.productCountryId) {
            this.routePageList.productCountryId  =  val.productCountryId
        }
        if(!this.routePageList.productId) {
            this.routePageList.productId  =  val.productId
        }
        if(!this.routePageList.developmentId) {
            this.routePageList.developmentId  =  val.developmentId
        }
    },
    //获得所有数据接口
async getAllpageList(val){
    this.getRoutePageAll()
    let exchangeRate = ''
    await this.newGetImagePath()
    await getUsExchangeRate().then(res => {
        exchangeRate = res.data
    })
    this.scrollPostion()
    let params = {
        developmentId:this.routePageList.developmentId || null,
        productId:this.routePageList.productId || null,
        productCountryId:this.routePageList.productCountryId || null,
        edit:this.routePageList.edit === 'false' ?  false :true,
    }
    if(val){
        params = {
            developmentId:val.developmentId?val.developmentId:null,
            productId:val.productId?val.productId:null,
            productCountryId:val.productCountryId?val.productCountryId:null,
        }
    }
    getProductDevDetail(params).then(res => {
        if(res.data){
            this.pageLoading = false
            this.allDetailPageDate = res.data
            this.development = res.data.development //产品数据
            this.copeDevProgress = res.data.developmentProgresses
            if(res.data.productVos && res.data.productVos[0] && res.data.productVos[0].countryMap  && res.data.productVos[0].productCountryList && res.data.productVos[0].productCountryList[0] ){
                this.productCountryList =  res.data.productVos[0].countryMap
                this.otherCountryList =  res.data.productVos[0].otherCountryMaps
            }else {
                this.productCountryList = []
            }
            this.otherCountryList = res.data.productVos && res.data.productVos[0] ? res.data.productVos[0].otherCountryMaps : []
            this.isanji = res.data.excludeAuditor || []
            if(res.data.developmentProgresses && res.data.developmentProgresses.length > 0){
                let index = res.data.developmentProgresses.length - 1
                let status = res.data.developmentProgresses[index].toStatus
                this.timeStatus = res.data.developmentProgresses[index].toStatus
                switch(status){
                    case 0 :
                    this.nowStatus = 0;
                    break;
                    case 1:
                    this.nowStatus = 1;
                    break;
                    case 11:
                    this.nowStatus = 1;
                    break;
                    case 2:
                    this.nowStatus = 2;
                    break;
                    case 13 :
                    this.nowStatus = 3;
                    break;
                    case 12:
                    this.nowStatus = 4;
                    break;
                    case 3 :
                    this.nowStatus = 5;
                    break;
                    case 10:
                    this.nowStatus = 6;
                    break;
                    case 4:
                    this.nowStatus = 7;
                    break;
                    case 5:
                    this.nowStatus = 8;
                    break;
                    case 6:
                    this.nowStatus = 9;
                    break;
                    case 7:
                    this.nowStatus = 10;
                    break;
                    case 8:
                    this.nowStatus = 11;
                    break;
                    case 9:
                    this.nowStatus = 12;
                    break;
                    case 14:
                    this.nowStatus = 13;
                    break;
                }

            }else {
                this.nowStatus = 0
            }
            this.proessCenterShow(this.nowStatus)
            // this.otherProductCountryList = res.data.productVos && res.data.productVos[0] && res.data.productVos[0].productCountryList ? res.data.productVos[0].productCountryList[0] : []
            this.productVos = res.data.productVos? res.data.productVos[0] : []
            this.productMarketStrs = res.data.productMarketStrs
            this.employee = res.data.employee
            // this.competingproducts = res.data.competingproducts[0]
            this.buyerName =  this.productVos.productCountryList &&  this.productVos.productCountryList[0] ? this.productVos.productCountryList[0].buyerName :''
            this.buyerid =  this.productVos.productCountryList &&  this.productVos.productCountryList[0] ? this.productVos.productCountryList[0].buyerid :''
            this.getDevProgresses(res.data.developmentProgresses)
            this.getRouterDate(res.data.country)
            let virtualCategoriesName = null
            if(res.data.development && res.data.development.virtualCategories){
                virtualCategoriesName = res.data.development.virtualCategories.map(item => {
                    return item.seriesCategoryName
                })
            }
            //开发类型、详情数据
            this.productVoDetail = {
                developmenttype:this.productVos ? this.productVos.developmenttype :'',//开发类型
                developmentscenarios:this.scenarios ? this.scenarios :this.productVos ? this.productVos.developmentscenarios : '',//开发场景
                categoryname:res.data.development ? res.data.development.categoryname : '',//所属分类
                spu:res.data.development ? res.data.development.spu : '',//关联spu
                id:this.productVos ? this.productVos.id : '',
                spuid:res.data.development ? res.data.development.id : '',
                categoryId:res.data.development ? res.data.development.categoryid : '',
                seriesCategoryName:res.data.development ? res.data.development.seriesCategoryName : [],
                virtualCategories:res.data.development ? res.data.development.virtualCategories : [],
                virtualCategoriesName,
            }
            this.productVoDetail.classCategoryIdArray = [res.data.development.seriesCategoryId,res.data.development.classifyDefId]
            
            //图片信息数据
            this.productImgDetail =  res.data.developmentAttachmentList.filter(item => {
                return item.filetype == 4
            })
            this.productImgDetails =  res.data.developmentAttachmentList.filter(item => {
                return item.filetype == 5
            })
            
            if(this.productImgDetail.length > 0){
                this.productImgDetail.forEach(item => {
                    item.showImgUrl = `${this.proImageList}upload/Development/File/Small/${item.developmentid}/${item.fileuri}`
                    item.showBigImgUrl = `${this.proImageList}upload/Development/File/${item.developmentid}/${item.fileuri}`
                })
                this.productImgDetail.forEach(item => {
                    item.name = item.fileName || item.fileuri
                }) 
            }
            if(this.productImgDetails.length > 0){
                    this.productImgDetails.forEach(item => {
                    item.showImgUrl = `${this.proImageList}upload/Development/File/Small/${item.developmentid}/${item.fileuri}`
                    item.showBigImgUrl = `${this.proImageList}upload/Development/File/${item.developmentid}/${item.fileuri}`
                })
                this.productImgDetails.forEach(item => {
                    item.name = item.fileName || item.fileuri
                })   
            }
            this.imageList = this.productImgDetail.map(item => {
                return {
                    showImgUrl:item.showImgUrl,
                    showBigImgUrl:item.showBigImgUrl,
                    id:item.id
                }
            })
            this.detailsImageList = this.productImgDetails.map(item => {
                return {
                    showImgUrl:item.showImgUrl,
                    showBigImgUrl:item.showBigImgUrl,
                    id:item.id
                }
            })
            //销售目标数据 
              let showPlanToOrder = false
              //利润复核状态下，需要填入，未经历利润复核状态数据，不显示此项；
            if(res.data.developmentProgresses && res.data.developmentProgresses.some(item => item.toStatus == 5)){
                 showPlanToOrder = true
            }
            this.salesTargetDetaiList = {
                xsstarrating : this.productVos.xsstarrating, //产品星级评分
                xstargetstarrating:this.productVos.xstargetstarrating, //我司目标星级评分
                xsrepairraterequirement:this.productVos.xsrepairraterequirement, //目标售后返修率要求
                xsmarket:this.productVos.xsmarket, //产品开发市场
                xstestsampletime:this.productVos.xstestsampletime, //产品测样时间点
                xspurchaseprice:this.productVos.xspurchaseprice, //目标采购价
                xsdailysales:this.productVos.xsdailysales, //产品预估产量
                xsfirstorderquantity:this.productVos.xsfirstorderquantity, //预估首单订单数量
                xsspecialrequirements:this.productVos.xsspecialrequirements, //产品包装尺寸有无特殊要求
                xsorderoftime:this.productVos.xsorderoftime, //产品下单时间点
                xspurchasePriceCurrency:this.productVos.xspurchasePriceCurrency, //
                planToOrder:this.productVos.planToOrder, //
                planToOrderStr:this.productVos.planToOrderStr, //
                nowStatus:this.nowStatus,
                showPlanToOrder
            }  
            //竞品信息数据
            this.comNewsDetailList = {
                competingproducts:res.data.competingproducts,//图片信息
                jpsize:res.data.development.jpsize,//竞品尺寸
                jpweight:res.data.development.jpweight,//竞品的净重
                basicinformation:res.data.development.basicinformation,//产品的规格参数
                jpLoadBearing:res.data.development.jpLoadBearing,//产品的承重
                jpmaterial:res.data.development.jpmaterial,//竞品的材质
                jpprocess:res.data.development.jpprocess,//
                jpcolor:res.data.development.jpcolor,//竞品的颜色
                advantagefunction:res.data.development.advantagefunction,//竞品优势功能
                defectfeature:res.data.development.defectfeature,//竞品缺陷功能
                usagescenarios:res.data.development.usagescenarios,//产品使用场景
                usecrowd:res.data.development.usecrowd,//产品目标人群
                jppositioning:res.data.development.jppositioning,//产品定位
                jpranking:res.data.development.jpranking,//产品排名
                jpadjustmentpoint:res.data.development.jpadjustmentpoint,//产品确定开发调整点
                note:res.data.development.note,//备注
            }
            if(this.comNewsDetailList && this.comNewsDetailList.competingproducts){
                this.comNewsDetailList.competingproducts.forEach(item => {
                    item.showImgUrl = `${this.proImageList}upload/CompetingProduct/Small/${item.developmentid}/${item.pictureuri}`
                    item.showBigImgUrl = `${this.proImageList}upload/CompetingProduct/${item.developmentid}/${item.pictureuri}`
                    item.url = `${this.proImageList}upload/CompetingProduct/Small/${item.developmentid}/${item.pictureuri}`
                    item.name = item.developmentid
                })
            }
            let countryCodeList = []
            this.titleImgSrc = this.comNewsDetailList.competingproducts && this.comNewsDetailList.competingproducts[0]? this.comNewsDetailList.competingproducts[0].showImgUrl : ''
            
            getCountry().then(data => {
                countryCodeList = data.data
                if(res.data.development &&  res.data.development.dutyrate && JSON.parse(res.data.development.dutyrate) && JSON.parse(res.data.development.dutyrate).LocalStrings){
                    JSON.parse(res.data.development.dutyrate).LocalStrings.forEach(res => {
                        countryCodeList.forEach(item => {
                            if(item.countryLanguage  == res.LanguageCode ){
                                item.dutyrate = (res.Value * 100).toFixed(2)
                            }
                        })
                    })   
                }
                if(res.data.development &&  res.data.development.countryband && JSON.parse(res.data.development.countryband) && JSON.parse(res.data.development.countryband).LocalStrings){
                    JSON.parse(res.data.development.countryband).LocalStrings.forEach(res => {
                        countryCodeList.forEach(item => {
                            if(item.countryLanguageBand == res.LanguageCode ){
                                item.countryBand = res.Value
                            }
                        })
                    })   
                }
                countryCodeList.forEach(item => {
                    if(item.countryLanguage == 'en-GB' && !item.dutyrate){
                        item.dutyrate = 0
                    }else if (item.countryLanguage == 'de' && !item.dutyrate){
                        item.dutyrate = 0
                    }
                    if(!item.dutyrate){
                        item.dutyrate = 0
                    }
                    if(!item.countryBand){
                        item.countryBand = '0'
                    }
                })
                //开发信息
                this.devInformationDetaiList = {
                    scenarios:this.scenarios ? this.scenarios :this.productVos ? this.productVos.developmentscenarios : '',
                    countryCodeList,
                    description:res.data.development.description,//产品中文概述
                    title:res.data.development.title,//英文标题
                    titleDe:res.data.development.titleDe,//德文标题
                    titleJp:res.data.development.titleJp,//日文标题
                    keys:res.data.development.keys,//英文关键词
                    priority :res.data.development.priority,//开发优先级
                    isanji:res.data.development.isanji,//是否安吉产品
                    // auditorName:res.data.development.auditorName,//是否安吉产品
                    ispatentproduct:res.data.development.ispatentproduct,//是否需要专利确认
                    fbaWarehouseIds:res.data.fbaWarehouseIds.map(Number),//是否需要专利确认
                    orderProduct:this.productVos.productCountryList &&  this.productVos.productCountryList[0] ? this.productVos.productCountryList[0].buyerName : '',//采购开发
                    ageRangeStr:this.productVos.productCountryList &&  this.productVos.productCountryList[0] ? this.productVos.productCountryList[0].ageRangeStr : null,//采购开发
                    ageRangeId:this.productVos.productCountryList &&  this.productVos.productCountryList[0] ? this.productVos.productCountryList[0].ageRangeId : null,//采购开发
                    electrifyId:this.productVos.productCountryList &&  this.productVos.productCountryList[0] ? this.productVos.productCountryList[0].electrifyId : null,//采购开发
                    electrifyStr:this.productVos.productCountryList &&  this.productVos.productCountryList[0] ? this.productVos.productCountryList[0].electrifyStr : null,//采购开发
                    businessProduct:this.productVos.productCountryList &&  this.productVos.productCountryList[0] ? this.productVos.productCountryList[0].businessName: '',//业务开发
                    auditorName:this.productVos.productCountryList &&  this.productVos.productCountryList[0] ? this.productVos.productCountryList[0].auditorName: '',//负责人
                    auditor:this.productVos.productCountryList &&  this.productVos.productCountryList[0] ? this.productVos.productCountryList[0].auditor: '',//负责人
                    productCountryList:this.productVos.productCountryList ? this.productVos.productCountryList[0] : [],
                    productMarketListALL:this.productVos.productMarketListALL ? this.productVos.productMarketListALL : [],
                    computemode:this.productVos.productCountryList &&  this.productVos.productCountryList[0] &&  this.productVos.productCountryList[0].productMarketList && this.productVos.productCountryList[0].productMarketList[0] ? this.productVos.productCountryList[0].productMarketList[0].computemode : [],
                    productMarketList: this.productVos.productCountryList &&  this.productVos.productCountryList[0] &&  this.productVos.productCountryList[0].productMarketList  && this.productVos.productCountryList[0].productMarketList[0] ?  this.productVos.productCountryList[0].productMarketList : [],//表格数据
                    // mapProfit: this.productVos.productCountryList &&  this.productVos.productCountryList[0] &&  this.productVos.productCountryList[0].productMarketList  && this.productVos.productCountryList[0].productMarketList[0] ?  this.productVos.productCountryList[0].productMarketList : [],//表格数据
                    businessid:this.productVos.productCountryList &&  this.productVos.productCountryList[0] ? this.productVos.productCountryList[0].businessid : '',   
                    buyerid:this.productVos.productCountryList &&  this.productVos.productCountryList[0] ? this.productVos.productCountryList[0].buyerid : '',
                    packingway:this.productVos.packingway,//包装方式   
                    countrycode:this.productVos.productCountryList &&  this.productVos.productCountryList[0] && this.productVos.productCountryList[0].countrycode ? this.productVos.productCountryList[0].countrycode : ''
                }
                if(this.showInfoTitle){
                    if( !this.devInformationDetaiList.packingway && this.devInformationDetaiList.productMarketList.find(item => (item.sfpDevelopmentPrice &&  !item.sfpOceanFreight))){
                        this.$message({
                            type:'error',
                            message:this.M2('【产品尺寸重量超过物流限制，SFP运费匹配不到】'),
                            offset:220,
                        });
                    }
                } 
            })
            //产品认证信息
            let credentialList1 = []
            let credentialList2 = []
            let credentialList3 = []
            if(this.productVos && this.productVos.credentialList){
                credentialList1 = this.productVos.credentialList.filter(item => { //必要认证
                    return item.authtype == 0
                })
                credentialList2 = this.productVos.credentialList.filter(item => { //必要认证其他
                    return item.authtype == 1
                })
                credentialList3 = this.productVos.credentialList.filter(item => { //必要认证
                    return item.authtype == 2
                })
            }
            let patentInfo = []
                patentInfo = res.data.development && res.data.development.patentinfo? JSON.parse(res.data.development.patentinfo) : []
                this.prodCerInfoDetailList = {
                    isauth:this.productVos.isauth,//是否需要认证
                    credentialList1:credentialList1 ? credentialList1:[],//必要认证
                    credentialList2:credentialList2 ? credentialList2:[],//必要认证其他
                    credentialList3:credentialList3 ? credentialList3 : [],//推荐认证
                    authnote:this.productVos.authnote,//认证备注
                    certFinalReviewStr:this.productVos.productCountryList &&  this.productVos.productCountryList[0] ? this.productVos.productCountryList[0].certFinalReviewStr: '',//认证备注
                    certFinalReview:this.productVos.productCountryList &&  this.productVos.productCountryList[0] ? this.productVos.productCountryList[0].certFinalReview: '',//认证备注
                    applicableAge:this.productVos.applicableAge ,//产品年龄段
                    ageRangeId:this.productVos.productCountryList &&  this.productVos.productCountryList[0] ? this.productVos.productCountryList[0].ageRangeId : null,//采购开发
                    electrifyId:this.productVos.productCountryList &&  this.productVos.productCountryList[0] ? this.productVos.productCountryList[0].electrifyId : null,//采购开发
                    applicableAgeNote:this.productVos.applicableAgeNote ,//备注
                    riskllevel:this.productVos.riskllevel == 0 ? 1 : this.productVos.riskllevel,//专利风险等级
                    patentInfo:patentInfo.LocalStrings,//专利确认
                }

                if(!this.prodCerInfoDetailList.certFinalReviewStr && this.prodCerInfoDetailList.certFinalReview != 0){
                    if((this.prodCerInfoDetailList.ageRangeId && this.prodCerInfoDetailList.ageRangeId != 4) || (this.prodCerInfoDetailList.electrifyId && this.prodCerInfoDetailList.electrifyId != 1)){
                        this.$set(this.prodCerInfoDetailList,'certFinalReviewStr','需要')
                    }
                }
            // })
                //产品标题和供应商信息
                let mustCredentialList = res.data.developmentAttachmentList.filter(item => { //必要认证附件
                    return item.filetype  == 3
                })
                let recommendCredentialList = res.data.developmentAttachmentList.filter(item => { //推荐认证附件
                    return item.filetype  == 2
                })
                let factoryGaveImage = res.data.developmentAttachmentList.filter(item => {
                    return item.filetype == 1
                })
                if(factoryGaveImage){
                    factoryGaveImage.forEach(item => {
                        item.showImgUrl = `${this.proImageList}upload/CompetingProduct/Small/${item.developmentid}/${item.fileuri}`
                        item.showBigImgUrl = `${this.proImageList}upload/CompetingProduct/${item.developmentid}/${item.fileuri}`
                        item.url = `${this.proImageList}upload/CompetingProduct/Small/${item.developmentid}/${item.fileuri}`
                        item.name = item.fileName || item.fileuri
                    })
                }
                if(recommendCredentialList){
                    recommendCredentialList.forEach(item => {
                        item.name = item.fileName || item.fileuri
                    })
                }
                if(mustCredentialList){
                    mustCredentialList.forEach(item => {
                        item.name = item.fileName || item.fileuri
                    })
                }
                this.prodevInfoDetaiList = {
                    title:this.productVos.title,//中文标题
                    description:this.productVos.description,//中文标题
                    provincecode:this.productVos.provincecode,
                    citycode:this.productVos.citycode,
                    areacode:this.productVos.areacode,
                    provinceStr:this.productVos.provinceStr,
                    cityStr:this.productVos.cityStr,
                    areaStr:this.productVos.areaStr,
                    noticeTime:res.data.noticeTime,
                    mustCredentialList,//必要认证附件
                    recommendCredentialList,//推荐认证附件
                    certificationnote:res.data.development.certificationnote, //备注
                    factoryGaveImage//工厂提供的图片
                }
            //产品尺寸和属性
                let devParams = {
                    developmentId:this.routePageList.developmentId,
                    productId:this.routePageList.productId,
                }
                getProductMultipleAttribute(devParams).then(res => {   
                    res.data.forEach(item => {
                        if(item.productid == this.productVos.id){
                            item.nowProduct = 2
                        }else {
                            item.nowProduct = 1
                        }
                    })
                    this.multiAttribute = res.data.sort((a,b) => b.nowProduct - a.nowProduct)
                })
            const ycun = 0.3937;
            const ychi = 35.3147248;
            this.pordSizeAttrInfoList = {
                scenarios:this.scenarios ? this.scenarios :this.productVos ? this.productVos.developmentscenarios : '',
                developmentscenarios:this.productVos.developmentscenarios ? this.productVos.developmentscenarios : '',
                buyerName:this.productVos.productCountryList && this.productVos.productCountryList[0] ? this.productVos.productCountryList[0].buyerName : '',//分配采购开发员
                producttype:res.data.development.producttype, //产品类型
                productSizeL:this.productVos.length,//产品尺寸
                productSizeW:this.productVos.width,//产品尺寸
                productSizeH:this.productVos.height,//产品尺寸
                productSizeYcunL:this.productVos.length ? (this.productVos.length * ycun).toFixed(2) : '',//产品尺寸ycun
                productSizeYcunW:this.productVos.width ? (this.productVos.width * ycun).toFixed(2):'' ,//产品尺寸ycun
                productSizeYcunH:this.productVos.height ? (this.productVos.height * ycun).toFixed(2) :'',//产品尺寸ycun
                productVolume:this.productVos.length ? ((this.productVos.length / 100) * (this.productVos.width / 100) * (this.productVos.height / 100)).toFixed(6) : '', //产品体积
                productVolumeYchi:this.productVos.length  ? (((this.productVos.length / 100) * (this.productVos.width / 100) * (this.productVos.height / 100)) * ychi).toFixed(6) :'', //产品体积
                packageSizeL:this.productVos.packedlength,//包装尺寸发货用
                packageSizeW:this.productVos.packedwidth,//包装尺寸发货用
                packageSizeH:this.productVos.packedheight,//包装尺寸发货用
                packageSizeYcunL:this.productVos.packedlength ? ((this.productVos.packedlength) * ycun).toFixed(2) :'',//包装尺寸发货用
                packageSizeYcunW:this.productVos.packedwidth? ((this.productVos.packedwidth) * ycun).toFixed(2) :'',//包装尺寸发货用
                packageSizeYcunH:this.productVos.packedheight ? ((this.productVos.packedheight) * ycun).toFixed(2):'',//包装尺寸发货用
                packedvolume:this.productVos.packedvolume,//包装体积(发货用)
                packedvolumeYchi:this.productVos.packedvolume? (this.productVos.packedvolume * ychi).toFixed(6) :'',//包装体积(发货用)
                outerBoxSizeL:this.productVos.cartonLength,//外箱尺寸(装柜用
                outerBoxSizeW:this.productVos.cartonWidth,//外箱尺寸(装柜用
                outerBoxSizeH:this.productVos.cartonHeight,//外箱尺寸(装柜用
                outerBoxSizeYcunL:this.productVos.cartonLength? ((this.productVos.cartonLength) * ycun).toFixed(2):'',//外箱尺寸(装柜用
                outerBoxSizeYcunW: this.productVos.cartonWidth ? (this.productVos.cartonWidth  * ycun).toFixed(2) :'',//外箱尺寸(装柜用
                outerBoxSizeYcunH:this.productVos.cartonHeight ? ((this.productVos.cartonHeight) * ycun).toFixed(2) :'',//外箱尺寸(装柜用
                outerBoxVolume:this.productVos.cartonLength  ? ((this.productVos.cartonLength  / 100) * (this.productVos.cartonWidth  / 100) * (this.productVos.cartonHeight  / 100)).toFixed(6) :'', //外箱体积(装柜用
                outerBoxVolumeYcun:this.productVos.cartonLength  ? (((this.productVos.cartonLength  / 100) * (this.productVos.cartonWidth  / 100) * (this.productVos.cartonHeight  / 100)) * ychi).toFixed(6) : '', //外箱体积(装柜用
                cartonWeight:this.productVos.cartonWeight,//外箱重量(装柜用)
                cartonWeightLB:this.productVos.cartonWeight * 2.204,//外箱重量(装柜用)
                beforepackweight:this.productVos.beforepackweight,//净重
                abroadbeforepackweight :this.productVos.abroadbeforepackweight, //净重
                afterpackweight:this.productVos.afterpackweight, //毛重(发货用)
                abroadafterpackweight:this.productVos.afterpackweight ? (this.productVos.afterpackweight * 2.204).toFixed(4) : '', //毛重(发货用)
                logisticsPerimeter:this.productVos.packedlength ? (Math.ceil(this.productVos.packedlength) + (Math.ceil(this.productVos.packedwidth) + Math.ceil(this.productVos.packedheight)) * 2).toFixed(2) : '', //物流周长加长(美国)
                logisticsPerimeterYcun:this.productVos.packedlength ? (Math.round(this.productVos.packedlength  * ycun) + (Math.round(this.productVos.packedwidth  * ycun) + Math.round(this.productVos.packedheight  * ycun)) * 2).toFixed(2) : '', //物流周长加长(美国)
                logisticsPerimeterNoUsa:this.productVos.packedlength ? (this.productVos.packedlength + (this.productVos.packedwidth + this.productVos.packedheight) * 2).toFixed(2) : '', //物流周长加长(非美国)
                logisticsPerimeterNoUsaYcun:this.productVos.packedlength ? (this.productVos.packedlength * ycun + ((this.productVos.packedwidth * ycun) + (this.productVos.packedheight * ycun)) * 2).toFixed(2) : '', //物流周长加长(非美国)
                transportqty:this.productVos.transportqty,//可装货柜数量
                packingway:this.productVos.packingway,//包装方式
                productlistings:this.productVos.productlistings,//多箱清单
                containerVolume:this.productVos.containerVolume && this.productVos.transportqty ? (this.productVos.containerVolume / this.productVos.transportqty).toFixed(6) : '', //每个产品所占体积
                containerVolumeCu:this.productVos.containerVolume ? (parseFloat((this.productVos.containerVolume/this.productVos.transportqty).toFixed(2)) * 35.3147248).toFixed(2) :'', //每个产品所占体积
                packedlength:this.productVos.packedlength,
                packedwidth:this.productVos.packedwidth,
                packedheight:this.productVos.packedheight,
                id:this.productVos.id,
                spu:res.data.development.spu,
                packageshape:this.productVos.packageshape,
                containerModel:this.productVos.containerModel,
                containerid:this.productVos.containerid,
                cartonShape:this.productVos.cartonShape,
                caseQty:this.productVos.caseQty,
                computemode:this.productVos.productCountryList &&  this.productVos.productCountryList[0] &&  this.productVos.productCountryList[0].productMarketList && this.productVos.productCountryList[0].productMarketList[0] ? this.productVos.productCountryList[0].productMarketList[0].computemode : [],
            }
            this.changeSizeTitle(this.pordSizeAttrInfoList,this.productCountryList.countryName,this.nowStatus)
            this.initState()
            this.getStateRole(this.timeStatus)
            this.controlEdit(this.timeStatus)
            // if(this.routePageList.edit === 'false') {
            //     this.initState()
            // }
            //采购信息
            let productPurchaseVoList = []
            let lastProductPurchaseVoList  = []
            if(this.productVos.productPurchaseVoList &&this.productVos.productPurchaseVoList[0] ){
                productPurchaseVoList = this.productVos.productPurchaseVoList.filter(item => {
                    return item.type == 0
                })
            }
            if(this.productVos.productPurchaseVoList &&this.productVos.productPurchaseVoList[0] ){
                lastProductPurchaseVoList = this.productVos.productPurchaseVoList.filter(item => {
                    return item.type == 1
                })
            }
            this.purchaseInfoDetaiList = {
                productPurchaseVoList,//样品采购前报价
                lastProductPurchaseVoList,//最终报价
                productprice:res.data.development.productprice, //产品价格
                freight:res.data.development.freight, //运费
                backpurchaseprice:res.data.development.backpurchaseprice, //下大单返样品费
                backpurchasepricenote:res.data.development.backpurchasepricenote, //返样品费详情备注
                sampleDeliveryOn:this.productVos.sampleDeliveryOn, //样品交期
                sampledeliverydays:this.productVos.sampledeliverydays, //样品交期
                taxleviedpoint:res.data.development.taxleviedpoint, //含税价税点
                tax:res.data.development.tax ? (res.data.development.tax * 100).toFixed(2) : '', //海关退税率
                bandprice:res.data.development.bandprice, //品牌费
                fobbandprice:res.data.development.fobbandprice, //FOB报价品牌费
                packedvolume:this.productVos.packedvolume, //FOB头程费
                fobPrice:this.productVos.fobPrice, //FOB头程费
                exchangeRate:res.data.exchangeRate || exchangeRate, //汇率
                gooddate:this.productVos.gooddate,
                goodnote:this.productVos.goodnote,   
                orderProduct:this.buyerName
            }
            //备注信息
            // this.remarksList = res.data.developmentmemoVos
            }else {
                this.pageLoading = false
            }
        })
    },
    changeSizeTitle(pordSizeAttrInfoList,countryName,nowStatus){
    if (!countryName) return
        this.showSizeText = []
        if(nowStatus != 9)return
        let sizeList = [pordSizeAttrInfoList.packageSizeL,pordSizeAttrInfoList.packageSizeW,pordSizeAttrInfoList.packageSizeH]
            sizeList.map(Number)
            sizeList.sort((a,b) => a-b)
            
        let sizePerimeter = Number(pordSizeAttrInfoList.packageSizeL) + (Number(pordSizeAttrInfoList.packageSizeW) + Number(pordSizeAttrInfoList.packageSizeH) ) * 2
        let numLogisticsPerimeter = Number(pordSizeAttrInfoList.logisticsPerimeterYcun)
        if(countryName == '德国'){ 
            // 产品【最长边】超过175cm，请审核人员重新计算利润!（长+（宽+高）*2大于300cm、重量超过31.5KG）
            if(sizeList[2] > 175){
                this.showSizeText.push('产品最长边超过175cm，')
            } if( sizePerimeter > 300){
                this.showSizeText.push('产品周长超过300cm，')
            } if(pordSizeAttrInfoList.afterpackweight > 31.5){
                this.showSizeText.push('重量超过31.5KG，')
            }
        }else if(countryName == '美国'){
            // 美国：产品【最长边】超过118cm，请审核人员重新计算利润!（第二长边超过74cm、重量超过21KG、周长超过105inch/ 125 Inch/162 Inch）；
            if(sizeList[2] > 118){
                this.showSizeText.push('产品最长边超过118cm，')
            } if(sizeList[1] > 74){
                this.showSizeText.push('第二长边超过74cm，')
            } if(pordSizeAttrInfoList.afterpackweight > 31.5){
                this.showSizeText.push('重量超过21KG，')
            } if(numLogisticsPerimeter > 105 && numLogisticsPerimeter <= 125){
                this.showSizeText.push('周长大于105inch，')
            } if(numLogisticsPerimeter > 125 && numLogisticsPerimeter <= 162){
                this.showSizeText.push('周长大于125inch，')
            } if(numLogisticsPerimeter > 162){
                this.showSizeText.push('周长大于162inch，')
            }
        }else if(countryName == '英国'){
            // 英国：产品【最长边】超过118cm，请审核人员重新计算利润!（第二长边超过70cm、第三长边超过60、重量超过30KG、体积超过0.23方）；
            if(sizeList[2] > 118){
                this.showSizeText.push('产品最长边超过118cm，')
            } if(sizeList[1] > 70){
                this.showSizeText.push('第二长边超过70cm，')
            } if (sizeList[0] > 60){
                this.showSizeText.push('第三长边超过60，')
            } if(pordSizeAttrInfoList.afterpackweight > 30){
                this.showSizeText.push('重量超过30KG，')
            } if(pordSizeAttrInfoList.packedvolume > 0.23){
                this.showSizeText.push('体积超过0.23方，')
            }
        }
        if(this.showSizeText.length>0){
            this.showSizeText.push('请审核人员重新计算利润！')
        }   
    },
    //步骤条显示数据处理
    getDevProgresses(val){
        if(!val)return
        this.developmentProgresses.forEach(item => {  
            val.forEach(val => {
                if( item.statusValue == val.statusValue){
                    item.createBy = val.createBy
                    item.createOn = this.$moment(val.createOn).format("YYYY-MM-DD HH:mm:ss")
                }
            })
        })
    },
    editPage(val,res,scenarios){
        this.isEdit = val
        this.scenarios = scenarios
        this.getAllpageList(res)
    },
    updeEditPage(val){  
        if(val){
            this.isEdit1 = val
            this.getAllpageList()
        }else {
            this.getAllpageList()
        }  
    },
    salesEditPage(val){  
        this.isEdit2 = val
        this.getAllpageList()
    },
    comNewsEdit(val){
        this.isEdit3 = val
        this.getAllpageList()
    },
    devInfoEdit(val,res){
        this.isEdit4 = val
        this.showInfoTitle = true
        this.getAllpageList(res)

    },
    proInfoEdit(val){
        this.isEdit5 = val
        this.getAllpageList()
    },
    prodevInfoEdit(val){
        if(val){
            this.isEdit6 = val
            this.getAllpageList()
        }else {
            this.getAllpageList()
        }
    },
    closeProdevAttr(val){
        this.isEdit7 = val
        this.getAllpageList()
    },
    closePurchaseInfo(val){
        this.isEdit8 = val
        this.getAllpageList()
    },
    putImgList(val){
        this.imageList = val
    },
    putdetailsImgList(val){
        this.detailsImageList = val
    },
    proessCenterShow(val){
        if(!val || val < 6)return
            let  image = document.querySelector('.step-container')
            let  cimage = document.querySelector('.stepBox')
        if(image.offsetLeft < -1377){
            return
        }else{
            image.style.left = cimage.offsetLeft - (100 * val) + 'px'
        }
    },
    leftMove(){
        let  image = document.querySelector('.step-container')
        if(image.offsetLeft > 30)return
        image.style.left = image.offsetLeft +100 + 'px'
    },
    rightMove(){
        let image = document.querySelector('.step-container')
        if(image.offsetLeft < -1377){
            return
        }else{
            image.style.left = image.offsetLeft - 100 + 'px'
        }
    },
    handleClick(activeName){
        if(activeName == 'tenth'){
            this.remarksParam = {
            developmentId:this.routePageList.developmentId?this.routePageList.developmentId:'',
            productId:this.routePageList.productId?this.routePageList.productId:'',
            productCountryId:this.routePageList.productCountryId?this.routePageList.productCountryId:'',
            noteBussinessName:'PRODUCTDEV',
            employee:this.employee,
            pageNum:0,
            PageIndex:-1,
            // proImageList:this.proFileList,
            mainBtn:true,
            Mark:'Check',
            customButtonName:this.M2('审核节点备注'),
            showAllbutton:true,
        }  
        this.showTenth = true
        }else {
            this.showTenth = false
        }
    },
    changeCountry(developmentId,productId,productCountryId){
        let routeData = this.$router.resolve({
            name: "productDetails",
            query:{
                    edit:this.routePageList.edit,
                    developmentId:developmentId,
                    productId:productId,
                    productCountryId:productCountryId,
                }
            });
            window.open(routeData.href, '_blank');
        }
    }
}
</script>
<style lang="scss" scoped>
.clearfix {
    height: 42px;
    display: flex;
    align-items: center;
    .editText {
        flex-grow: 1;
    }
}
.w-50 {
    width: 50%;
    display: flex;
    // flex-wrap: wrap;
    font-weight: bold;
}
.nav-container {
    width: 100%;
    height: 100vh;
    background-color: rgba(230, 230, 230, 1);
  .cardBox{
    position: relative;
    width: 100%;
    top: 177px;
    .iconRemarks{
        position: fixed;
        left: 16px;
        top: 245px;
        width: 44px;
        height: 39px;
        z-index: 1000;
        border-radius: 5px;
        .remarks {
            position: fixed;
            left: 22px;
            top: 248px;
            height: 32px;
            width: 32px;
            z-index: 1000;
            background-image: url(~@/assets/svg/shousuo.svg);
            box-shadow: 4px 4px 5px #888888;
            &:hover{
                background-image: url(~@/assets/svg/shousuo1.svg);
                cursor: pointer;
            }
        }
    }
    .cardBoxMain{
        margin:0 10px;
        ::v-deep .el-tabs__nav{
            .is-active{
                font-weight: bold !important;
            }
        }
    }
    ::v-deep .el-tabs__header{
        margin:0 !important;
        background-color: #ffffff;
        padding-right: 5px;
        position: fixed;
        top: 151px;
        z-index: 999;
        width: 100%;
        left: 8px;
        padding-left: 13px
    }
}
.navTitle{
    position: fixed;
    width: 100%;
    top: 0px;
    z-index: 999;
    background-color: rgba(230, 230, 230, 1)
}
::v-deep.card{
    margin: 10px 10px 10px 10px;
    position: relative;
    .el-card__body{
        padding-top: 10px !important;
    }
}
.router-text {
    position: absolute;
    right: 15px;
    top: 10px;
    cursor: pointer;
    color: #3366cc;
    // &:hover{
    //     background-color: #3366cc;
    //     color: #ffffff;
    // }
}
.out-container {
    display: flex;
    .image-container {
        width: 100px;
        height: 100px;
        border: 1px solid #cccccc;
    }
    .detailsText {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 10px;
        font-weight: bold;
        justify-content: space-around;
        span {
            font-weight: normal;
        }
        .countryTitle{
            color: #3366cc;
            display: inline-block;
            cursor: pointer;
            font-size: 13px;
            
        }
        .otherCountryTitle{
            display: inline-block;
            cursor: pointer;
            margin-left: 5px;
            text-decoration: underline;
            &:hover{
                color: #3366cc;
            }
        }
        .haveMoneyLitte{
            display: flex;
            .profit{
                font-weight: normal;
                display: inline-block;
                margin-right: 10px;
            }
        }
    }
}
.stepText{
    font-weight: bold;
    float: right;
    margin-right: 50px;
    .stepTextLittleTitle{
        margin-right: 15px;
    }
}
.stepBox{
    position: relative;
    height: 100px;
    .leftButton{
        position: absolute;
        top: -10px;
        left: -20px;
        background: #ffffff;
        height: 130px;
        width: 50px;
        z-index: 9999;
        line-height: 130px;
        cursor: pointer;
        .el-icon-d-arrow-left{
            font-size: 30px;
        }
    } 
    ::v-deep.step-container{
        display: inline-block;
        width: 200%;
        // overflow: hidden;
        position: absolute;
        left: 23px;
        .is-success{
            color: green !important;
            border-color: green !important;
            .el-step__line-inner{
                border-width: 1px !important;
                width: 100% !important;;
            }
        }
        .stepTitle{ 
            font-size: 12px;
            width: 120px;
        }
    }
    .rightButton{
        position: absolute;
        right: -20px;
        height: 131px;
        width: 52px;
        z-index: 9999;
        top: -10px;
        background: #ffffff;
        line-height: 130px;
        cursor: pointer;
        .el-icon-d-arrow-right{
            font-size: 30px;
        }
    }
}
.backgoundCon{
    width: 100%;
    height: 10px;
    background-color: rgba(230, 230, 230, 1);
}
.tabContainer1{
    height: 100%;
    width: 100%;
    background-color: rgba(230, 230, 230, 1);
    ::v-deep .el-card__header{
        padding: 10px !important;
        font-size: 16px;
        font-weight: bold;
    }
}
.tabContainer{
    height: 100%;
    width: 100%;
    background-color: rgba(230, 230, 230, 1);
    ::v-deep .el-card__header{
        padding: 10px !important;
        font-size: 16px;
        font-weight: bold;
    }
    ::v-deep .el-card__body{
        margin-left: 100px;
    }
    .edit-position{
        float: right;
        margin-right:10px;
        color: #3366cc;
        height: 20px;
        width: 55px;
        font-size: 12px;
        &:hover{
            background-color: #3366cc;
            color: #ffffff;
            cursor: pointer;   
            text-align: center;
            
            .icon-edit{
                fill: #ffffff;
                background-image: url(~@/assets/svg/editWrite.svg);
            }
        }
        .icon-edit{
            height: 16px;
            width: 16px;
            float: left;
            background-image: url(~@/assets/svg/edit.svg);
        }
    }
    .imgContainer{
        display: flex;
        min-height: 100px;
        flex-wrap: wrap;
        height: max-content;
        .imgCon{
            width: 100px; 
                height: 100px; 
            margin: 3px;
            .imageListBox{
                width: 100px; 
                height: 100px; 
                display: block;
                cursor:pointer;
                border-radius: 3px;
            }         
        }
    }  
}
    .icon-loading {
        width: 100px;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size:25px;    
    }
    .showColor{
        color: red;
        font-weight: normal;
    }
    .sizeBox{
        display: flex;
        .sizeColor{
            color: red;
            font-weight: normal;
            display: inline-block;
        }
    }
    .redColor{
        color: green;
    }
    .imageBox{
        height: 18px;
        width: 18px;
        background-image: url(~@/assets/shixiyuan.png);
        cursor: pointer;
    }
}
.bottomButton {
    float: right;
    margin-bottom: 10px;
}
</style>