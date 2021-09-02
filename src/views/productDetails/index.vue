<template>
  <div class="nav-container">
      <div class="navTitle">
        <el-row :gutter="5">
        <el-col :span="12">
            <el-card class="card">
            <div class="out-container">
                <div class="image-container">
                    <el-image
                        style="width: 100px; height: 100px; dispaly:black"
                        :src="titleImgSrc"
                        fit="fill">
                    </el-image>
                </div>
                <div class="detailsText">
                    <div>
                        开发id:<span>{{development.id}}</span>
                    </div>
                    <div>
                        生成型号:<span>{{$route.params.productId}}</span>
                    </div>
                    <div>
                        开发市场:<div class="countryTitle">{{ productCountryList.countryName }}</div> 
                        <div v-for="item in productCountryList.otherCountryNames" :key="item.otherCountryNames" class="otherCountryTitle"> {{item}}</div>
                    </div>
                    <div class="haveMoneyLitte">
                        <div>
                            开发价/最低利润:
                        </div>
                        <div>
                            <div v-for="item in productMarketStrs" :key="item.currency" class="profit">
                                {{item.platformName}}-{{item.marketProfits[0].warehouseName}}-{{item.currency}} {{item.developmentPrice}}/{{item.marketProfits[0].profitMargin}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </el-card>
        </el-col>
        <el-col :span="12">
            <el-card class="card">
                <div class="stepBox">
                        <span class="leftButton" @click="leftMove">左箭头</span>
                        <span class="step-container">
                            <el-steps :active="copeDevProgress.length - 1" space='200' align-center style="margin-right:15px" finish-status="success">
                                <el-step v-for="item in developmentProgresses" :title="item.statusValue" :key="item.status" :description="item.createOn">
                                        <template slot="title">
                                            <el-tooltip class="item" effect="dark" :content="item.createBy" placement="top">
                                                <div class="stepTitle">
                                                    {{item.statusValue}}
                                                </div>
                                            </el-tooltip>
                                        </template>
                                </el-step>
                            </el-steps>
                        </span>
                        <span class='rightButton' @click="rightMove">右箭头</span>
                </div>
                
            </el-card>
        </el-col>
        </el-row>
    </div>
    <div class="cardBox">
        <!-- <el-card class="card"> -->
            <div class="cardBoxMain">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="开发类型/场景" name="first" >
                        <div class="backgoundCon"></div>
                        <div class='tabContainer'>
                            <el-card>
                                <div slot="header" class="clearfix">
                                    <div>开发类型/场景
                                        <div class="edit-position" @click="isEdit = !isEdit" v-if="isEdit"><i class="icon-edit"></i>编辑</div>
                                    </div>   
                                </div>
                                <div v-if="isEdit">
                                    <devDetail :productVoDetail='productVoDetail'></devDetail>
                                </div>
                                <div v-else>
                                    <devScene @closeEdit='editPage'></devScene>
                                </div>
                            </el-card>
                            <el-card style="margin-top:10px">
                                <div slot="header" class="clearfix">
                                    <span>产品尺寸图
                                        <div class="edit-position" @click="isEdit1 = !isEdit1" v-if="isEdit1"><i class="icon-edit"></i>编辑</div>
                                    </span>
                                </div>
                                <div v-if="isEdit1" class="imgContainer">
                                    <div v-for="item in productImgDetail" :key="item.key" class="imgCon">
                                        <el-image
                                            lazy
                                            style="width: 100px; height: 100px; dispaly:black"
                                            :src="item.showImgUrl"
                                            fit="fill">
                                        </el-image>
                                    </div>
                                </div>
                                <div v-else>
                                    <imgUpload @inputImg='putImgList' :value='imageList' @closeEdit='updeEditPage'></imgUpload> 
                                </div>
                            </el-card>
                            <el-card style="margin-top:10px">
                                <div slot="header" class="clearfix">
                                    <span>销售目标
                                        <div class="edit-position" @click="isEdit2 = !isEdit2" v-if="isEdit2"><i class="icon-edit"></i>编辑</div>
                                    </span>
                                </div>
                                <div v-if="isEdit2">
                                    <sales-target-detail :salesTargetDetaiList='salesTargetDetaiList'></sales-target-detail>
                                </div>
                                <div v-else>
                                    <salesTargetEdit @closeEdit='salesEditPage'></salesTargetEdit>
                                </div>
                            </el-card>
                        </div>                   
                    </el-tab-pane>
                    <el-tab-pane label="产品尺寸图" name="second">
                        <div class="backgoundCon"></div>
                        <div class='tabContainer'>
                            <el-card>
                                <div slot="header" class="clearfix">
                                    <div>开发类型/场景
                                        <div class="edit-position" @click="isEdit = !isEdit" v-if="isEdit"><i class="icon-edit"></i>编辑</div>
                                    </div>   
                                </div>
                                <div v-if="isEdit">
                                    <devDetail :productVoDetail='productVoDetail'></devDetail>
                                </div>
                                <div v-else>
                                <devScene @closeEdit='editPage'></devScene>
                                </div>
                            </el-card>
                            <el-card style="margin-top:10px">
                                <div slot="header" class="clearfix">
                                    <span>产品尺寸图
                                        <div class="edit-position" @click="isEdit1 = !isEdit1" v-if="isEdit1"><i class="icon-edit"></i>编辑</div>
                                    </span>
                                </div>
                                <div v-if="isEdit1" class="imgContainer">
                                    <div v-for="item in productImgDetail" :key="item.key" class="imgCon">
                                        <el-image
                                            lazy
                                            style="width: 100px; height: 100px; dispaly:black"
                                            :src="item.showImgUrl"
                                            fit="fill">
                                        </el-image>
                                    </div>
                                </div>
                                <div v-else>
                                    <imgUpload @inputImg='putImgList' :value='imageList' @closeEdit='updeEditPage'></imgUpload> 
                                </div>
                            </el-card>
                            <el-card style="margin-top:10px">
                                <div slot="header" class="clearfix">
                                    <span>销售目标
                                        <div class="edit-position" @click="isEdit2 = !isEdit2" v-if="isEdit2"><i class="icon-edit"></i>编辑</div>
                                    </span>
                                </div>
                                <div v-if="isEdit2">
                                    <sales-target-detail :salesTargetDetaiList='salesTargetDetaiList'></sales-target-detail>
                                </div>
                                <div v-else>
                                    <salesTargetEdit @closeEdit='salesEditPage'></salesTargetEdit>
                                </div>
                            </el-card>
                        </div>                  
                        
                    </el-tab-pane>
                    <el-tab-pane label="销售目标" name="third">
                        <div class="backgoundCon"></div>
                        <div class='tabContainer'>
                            <el-card>
                                <div slot="header" class="clearfix">
                                    <div>开发类型/场景
                                        <div class="edit-position" @click="isEdit = !isEdit" v-if="isEdit"><i class="icon-edit"></i>编辑</div>
                                    </div>   
                                </div>
                                <div v-if="isEdit">
                                    <devDetail :productVoDetail='productVoDetail'></devDetail>
                                </div>
                                <div v-else>
                                    <devScene @closeEdit='editPage'></devScene>
                                </div>
                            </el-card>
                            <el-card style="margin-top:10px">
                                <div slot="header" class="clearfix">
                                    <span>产品尺寸图
                                        <div class="edit-position" @click="isEdit1 = !isEdit1" v-if="isEdit1"><i class="icon-edit"></i>编辑</div>
                                    </span>
                                </div>
                                <div v-if="isEdit1" class="imgContainer">
                                    <div v-for="item in productImgDetail" :key="item.key" class="imgCon">
                                        <el-image
                                            lazy
                                            style="width: 100px; height: 100px; dispaly:black"
                                            :src="item.showImgUrl"
                                            fit="fill">
                                        </el-image>
                                    </div>
                                </div>
                                <div v-else>
                                    <imgUpload @inputImg='putImgList' :value='imageList' @closeEdit='updeEditPage'></imgUpload> 
                                </div>
                            </el-card>
                            <el-card style="margin-top:10px">
                                <div slot="header" class="clearfix">
                                    <span>销售目标
                                        <div class="edit-position" @click="isEdit2 = !isEdit2" v-if="isEdit2"><i class="icon-edit"></i>编辑</div>
                                    </span>
                                </div>
                                <div v-if="isEdit2">
                                    <sales-target-detail :salesTargetDetaiList='salesTargetDetaiList'></sales-target-detail>
                                </div>
                                <div v-else>
                                    <salesTargetEdit @closeEdit='salesEditPage'></salesTargetEdit>
                                </div>
                            </el-card>
                        </div>                  
                    </el-tab-pane>
                    <el-tab-pane label="竞品信息" name="fourth">
                        <div class="backgoundCon"></div>
                        <div class='tabContainer'>
                            <el-card>
                                <div slot="header" class="clearfix">
                                    <div>竞品信息
                                        <div class="edit-position" @click="isEdit3 = !isEdit3" v-if="isEdit3"><i class="icon-edit"></i>编辑</div>
                                    </div>   
                                </div>
                                <div v-if="isEdit3">
                                    <comNewsDetail :comNewsDetailList='comNewsDetailList'></comNewsDetail>
                                </div>
                                <div v-else>
                                    <comNewsEdit @closeEdit='comNewsEdit'></comNewsEdit>
                                </div>
                            </el-card>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="开发信息" name="fifth">
                        <div class="backgoundCon"></div>
                        <div class='tabContainer'>
                            <el-card>
                                <div slot="header" class="clearfix">
                                    <div>开发信息
                                        <div class="edit-position" @click="isEdit4 = !isEdit4" v-if="isEdit4"><i class="icon-edit"></i>编辑</div>
                                    </div>   
                                </div>
                                <div v-if="isEdit4">
                                    <devInformationDetail :devInformationDetaiList='devInformationDetaiList'></devInformationDetail>
                                </div>
                                <div v-else>
                                    <devInformationEdit @closeEdit='devInfoEdit'></devInformationEdit>
                                </div>
                            </el-card>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="产品认证信息" name="sixth">
                        <div class="backgoundCon"></div>
                        <div class='tabContainer'>
                            <el-card>
                                <div slot="header" class="clearfix">
                                    <div>产品认证信息
                                        <div class="edit-position" @click="isEdit5 = !isEdit5" v-if="isEdit5"><i class="icon-edit"></i>编辑</div>
                                    </div>   
                                </div>
                                <div v-if="isEdit5">
                                    <prodCerInfoDetail :prodCerInfoDetailList='prodCerInfoDetailList'></prodCerInfoDetail>
                                </div>
                                <div v-else>
                                    <prodCerInfoEdit @closeEdit='proInfoEdit'></prodCerInfoEdit>
                                </div>
                            </el-card>
                        </div>
                        <div class="backgoundCon"></div>
                        <div class='tabContainer'>
                            <el-card>
                                <div slot="header" class="clearfix">
                                    <div>产品标题和供应商信息
                                        <div class="edit-position" @click="isEdit6 = !isEdit6" v-if="isEdit6"><i class="icon-edit"></i>编辑</div>
                                    </div>   
                                </div>
                                <div v-if="isEdit6">
                                    <prodevInfoDetail :prodevInfoDetaiList='prodevInfoDetaiList'></prodevInfoDetail>
                                </div>
                                <div v-else>
                                    <prodevInfoEdit @closeEdit='prodevInfoEdit'></prodevInfoEdit>
                                </div>
                            </el-card>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="产品标题和供应商信息" name="seventh">
                        <div class="backgoundCon"></div>
                        <div class='tabContainer'>
                            <el-card>
                                <div slot="header" class="clearfix">
                                    <div>产品认证信息
                                        <div class="edit-position" @click="isEdit5 = !isEdit5" v-if="isEdit5"><i class="icon-edit"></i>编辑</div>
                                    </div>   
                                </div>
                                <div v-if="isEdit5">
                                    <prodCerInfoDetail :prodCerInfoDetailList='prodCerInfoDetailList'></prodCerInfoDetail>
                                
                                </div>
                                <div v-else>
                                <prodCerInfoEdit @closeEdit='proInfoEdit'></prodCerInfoEdit>
                                </div>
                            </el-card>
                        </div>
                        <div class="backgoundCon"></div>
                        <div class='tabContainer'>
                            <el-card>
                                <div slot="header" class="clearfix">
                                    <div>产品标题和供应商信息
                                        <div class="edit-position" @click="isEdit6 = !isEdit6" v-if="isEdit6"><i class="icon-edit"></i>编辑</div>
                                    </div>   
                                </div>
                                <div v-if="isEdit6">
                                    <prodevInfoDetail :prodevInfoDetaiList='prodevInfoDetaiList'></prodevInfoDetail>
                                </div>
                                <div v-else>
                                    <prodevInfoEdit @closeEdit='prodevInfoEdit'></prodevInfoEdit>
                                </div>
                            </el-card>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="产品尺寸和属性信息" name="eigth">
                        <div class="backgoundCon"></div>
                        <div class='tabContainer'>
                            <el-card>
                                <div slot="header" class="clearfix">
                                    <div>产品尺寸和属性信息
                                        <div class="edit-position" @click="isEdit7 = !isEdit7" v-if="isEdit7"><i class="icon-edit"></i>编辑</div>
                                    </div>   
                                </div>
                                <div v-if="isEdit7">
                                    <pordSizeAttrInfo :pordSizeAttrInfoList='pordSizeAttrInfoList'></pordSizeAttrInfo>
                                </div>
                                <div v-else>
                                    <pordSizeAttrEdit  @closeEdit='closeProdevAttr'></pordSizeAttrEdit>
                                </div>
                            </el-card>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="采购信息" name="nineth">
                        <div class="backgoundCon"></div>
                        <div class='tabContainer'>
                            <el-card>
                                <div slot="header" class="clearfix">
                                    <div>采购信息
                                        <div class="edit-position" @click="isEdit8 = !isEdit8" v-if="isEdit8"><i class="icon-edit"></i>编辑</div>
                                    </div>   
                                </div>
                                <div v-if="isEdit8">
                                    <purchaseInfoDetail :purchaseInfoDetaiList='purchaseInfoDetaiList'></purchaseInfoDetail>
                                </div>
                                <div v-else>
                                    <purchaseInfoEdit  @closeEdit='closePurchaseInfo'></purchaseInfoEdit>
                                </div>
                            </el-card>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="备注" name="tenth">
                        <div class="backgoundCon"></div>
                        <div class='remarkContainer'>
                            <el-card>
                                <div slot="header" class="clearfix">
                                    <div>
                                        备注信息
                                    </div>   
                                </div>
                                <div>
                                <remarksTable></remarksTable>
                                </div>
                            </el-card>
                        </div>
                    </el-tab-pane>
                </el-tabs>   
            </div>
        <!-- </el-card> -->
    </div>
  </div>
</template>
<script>
 import { getProductDevDetail,getProdCerInfoDetailList } from '@/api/user.js'
 import devDetail from '@/components/devDetail.vue'
 import devScene from '@/components/devScene.vue'
 import imgUpload from '@/components/uploadImg.vue'
 import remarksTable from '@/components/remarksTable.vue'
//  import salesTargetDetail from '@/components/salesTargetDetail.vue'
 import salesTargetEdit from '@/components/salesTargetEdit.vue'
 import comNewsDetail from '@/components/comNewsDetail.vue'
 import comNewsEdit from '@/components/comNewsEdit.vue'
 import devInformationDetail from '@/components/devInformationDetail.vue'
 import devInformationEdit from '@/components/devInformationEdit.vue'
 import prodCerInfoDetail from '@/components/prodCerInfoDetail.vue'
 import prodevInfoDetail from '@/components/prodevInfoDetail.vue'
 import prodCerInfoEdit from '@/components/prodCerInfoEdit.vue'
 import prodevInfoEdit from '@/components/prodevInfoEdit.vue'
 import pordSizeAttrInfo from '@/components/pordSizeAttrInfo.vue'
 import pordSizeAttrEdit from '@/components/pordSizeAttrEdit.vue'
 import purchaseInfoDetail from '@/components/purchaseInfoDetail.vue'
 import purchaseInfoEdit from '@/components/purchaseInfoEdit.vue'
export default {
  name: 'productDetails',
  components:{
      devDetail,
      devScene,
      imgUpload,
      salesTargetDetail:() => import('@/components/salesTargetDetail'),
      salesTargetEdit,
      comNewsDetail,
      comNewsEdit,
      devInformationDetail,
      devInformationEdit,
      prodCerInfoDetail,
      prodevInfoDetail,
      prodCerInfoEdit,
      prodevInfoEdit,
      pordSizeAttrInfo,
      pordSizeAttrEdit,
      purchaseInfoDetail,
      purchaseInfoEdit,
      remarksTable
  },
  data () {
    return {
        titleImgSrc:'',
        productMarketStrs:{},//头部信息产品利润信息
        copeDevProgress:{},
        allDetailPageDate:{},
        development:{},
        productCountryList:{},
        otherProductCountryList:{},
        productVos:{},
        productVoDetail:{},//开发类型详情数据
        productImgDetail:{},//开发产品尺寸图
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
                toStatusValue:''
            },
            {
                statusValue:'待审批',
                status:'1',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:''
            },
            {
                statusValue:'待认证确认',
                status:'2',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:''
            },
            {
                statusValue:'寻找供应商',
                status:'3',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:''
            },
            {
                statusValue:'采购主管审核',
                status:'4',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:''
            },
            {
                statusValue:'认证审核',
                status:'5',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:''
            },
            {
                statusValue:'待利润初审',
                status:'6',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:''
            },
            {
                statusValue:'样品采购审核',
                status:'7',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:''
            },
            {
                statusValue:'确认样品',
                status:'8',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:''
            },
            {
                statusValue:'待利润复核',
                status:'9',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:''
            },
            {
                statusValue:'待终审',
                status:'10',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:''
            },
            {
                statusValue:'开发完未上架',
                status:'11',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:''
            },
            {
                statusValue:'开发完已上架',
                status:'12',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:''
            },
            {
                statusValue:'已取消',
                status:'13',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:''
            },
            {
                statusValue:'已冻结',
                status:'14',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:''
            },
        ],//进度条数据
        imageList:[],
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
    }
  },
  created () {
      this.getAllpageList()
  },
  mounted () {
    //   this.getAllpageList()
  },
  methods: {
       getAllpageList(){
          let params = {
                developmentId:this.$route.params.developmentId,
                productId:this.$route.params.productId,
                productCountryId:this.$route.params.productCountryId,
          }
           getProductDevDetail(params).then(res => {
                this.allDetailPageDate = res.data
                this.development = res.data.development //产品数据
                this.copeDevProgress = res.data.developmentProgresses
                this.productCountryList = res.data.productVos[0].productCountryList[0].countryMap
                this.otherProductCountryList = res.data.productVos[0].productCountryList[0]
                this.productVos = res.data.productVos[0]
                this.productMarketStrs = res.data.productMarketStrs
                // this.competingproducts = res.data.competingproducts[0]
                this.getDevProgresses(res.data.developmentProgresses)
                //开发类型、详情数据
                this.productVoDetail = {
                    developmenttype:res.data.productVos[0].developmenttype,//开发类型
                    developmentscenarios:res.data.productVos[0].developmentscenarios,//开发场景
                    categoryname:res.data.development.categoryname,//所属分类
                    spu:res.data.development.spu,//关联spu
                    id:res.data.productVos[0].id,//关联spu id
                }
                //图片信息数据
                this.productImgDetail =  res.data.developmentAttachmentList.filter(item => {
                    return item.filetype == 4
                })
                this.productImgDetail.forEach(item => {
                    item.showImgUrl = `${process.env.VUE_APP_IMAGE_API}/${item.developmentid}/${item.fileuri}`
                })
               
                //销售目标数据 
                this.salesTargetDetaiList = {
                    xsstarrating : res.data.productVos[0].xsstarrating, //产品星级评分
                    xstargetstarrating:res.data.productVos[0].xstargetstarrating, //我司目标星级评分
                    xsrepairraterequirement:res.data.productVos[0].xsrepairraterequirement, //目标售后返修率要求
                    xsmarket:res.data.productVos[0].xsmarket, //产品开发市场
                    xstestsampletime:res.data.productVos[0].xstestsampletime, //产品测样时间点
                    xspurchaseprice:res.data.productVos[0].xspurchaseprice, //目标采购价
                    xsdailysales:res.data.productVos[0].xsdailysales, //产品预估产量
                    xsfirstorderquantity:res.data.productVos[0].xsfirstorderquantity, //预估首单订单数量
                    xsspecialrequirements:res.data.productVos[0].xsspecialrequirements, //产品包装尺寸有无特殊要求
                    xsorderoftime:res.data.productVos[0].xsorderoftime, //产品下单时间点
                }  
                //竞品信息数据
                this.comNewsDetailList = {
                    competingproducts:res.data.competingproducts,//图片信息
                    jpsize:res.data.development.jpsize,//竞品尺寸
                    jpweight:res.data.development.jpweight,//竞品的净重
                    basicinformation:res.data.development.basicinformation,//产品的规格参数
                    jpmaterial:res.data.development.jpmaterial,//竞品的材质
                    jpprocess:res.data.development.jpjpprocesssize,//
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
                this.comNewsDetailList.competingproducts.forEach(item => {
                    item.showImgUrl = `${process.env.VUE_APP_IMAGE_API}/${item.developmentid}/${item.pictureuri}`
                })
                 this.titleImgSrc = this.comNewsDetailList.competingproducts[0].showImgUrl
                //开发信息
                this.devInformationDetaiList = {
                    description:res.data.development.description,//产品中文概述
                    title:res.data.development.title,//英文标题
                    titleDe:res.data.development.titleDe,//德文标题
                    titleJp:res.data.development.titleJp,//日文标题
                    keys:res.data.development.keys,//英文关键词
                    priority :res.data.development.priority,//开发优先级
                    isanji:res.data.development.isanji,//是否安吉产品
                    ispatentproduct:res.data.development.ispatentproduct,//是否需要专利确认
                    dutyrate1:JSON.parse(res.data.development.dutyrate).LocalStrings[0].Value,//是否需要专利确认
                    dutyrate2:JSON.parse(res.data.development.dutyrate).LocalStrings[2].Value,//是否需要专利确认
                    dutyrate3:JSON.parse(res.data.development.dutyrate).LocalStrings[3].Value,//是否需要专利确认
                    orderProduct:res.data.productVos[0].productCountryList[0].businessName,//采购开发
                    businessProduct:res.data.productVos[0].productCountryList[0].buyerName,//业务开发
                    productCountryList:res.data.productVos[0].productCountryList[0],//业务开发
                    productMarketList:res.data.productVos[0].productCountryList[0].productMarketList ,//表格数据
                }
                //产品认证信息
                let credentialList1 = res.data.productVos[0].credentialList.filter(item => { //必要认证
                    return item.authtype == 0
                })
                let credentialList2 = res.data.productVos[0].credentialList.filter(item => { //必要认证其他
                    return item.authtype == 1
                })
                let credentialList3 = res.data.productVos[0].credentialList.filter(item => { //必要认证
                    return item.authtype == 2
                })
                
                let newCredentialList1 = []
                getProdCerInfoDetailList().then(res => {
                    let newData = credentialList1 ?credentialList1[0].data.split(','): []
                    let newRate = res.data.credentialsRates.map(item => {
                        return item.authRates
                        
                    })
                    let newRate1 = newRate.flat()
                    newData = newData.map(Number)
                    if(newData.length > 0){
                        newCredentialList1 = newRate1.filter(item => {
                            return newData.includes(item.authId)
                        })
                    }
                    this.prodCerInfoDetailList = {
                        isauth:this.productVos.isauth,//是否需要认证
                        credentialList1:newCredentialList1,//必要认证
                        credentialList2,//必要认证其他
                        credentialList3,//推荐认证
                        authnote:this.productVos.authnote,//认证备注
                        applicableAge:this.productVos.applicableAge ,//产品年龄段
                        applicableAgeNote:this.productVos.applicableAgeNote ,//备注
                        riskllevel:this.productVos.riskllevel,//专利风险等级
                        patentInfo:JSON.parse(this.development.patentinfo).LocalStrings,//专利确认
                    }
                }) 
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
                    factoryGaveImage.forEach(item => {
                        item.showImgUrl = `${process.env.VUE_APP_IMAGE_API}/${item.developmentid}/${item.fileuri}`
                    })
                    this.prodevInfoDetaiList = {
                        title:res.data.productVos[0].title,//中文标题
                        description:res.data.productVos[0].description,//中文标题
                        mustCredentialList,//必要认证附件
                        recommendCredentialList,//推荐认证附件
                        certificationnote:res.data.certificationnote, //备注
                        factoryGaveImage//工厂提供的图片
                    }
                //产品尺寸和属性
                const ycun = 0.3937008;
                const ychi = 35.3147248;
                this.pordSizeAttrInfoList = {
                    buyerName:res.data.productVos[0].productCountryList[0].buyerName,//分配采购开发员
                    producttype:res.data.development.producttype, //产品类型
                    productSize:res.data.productVos[0].length * res.data.productVos[0].width * res.data.productVos[0].height,//产品尺寸
                    productSizeYcun:(res.data.productVos[0].length * ycun) * (res.data.productVos[0].width * ycun) * (res.data.productVos[0].height * ycun),//产品尺寸ycun
                    productVolume:(res.data.productVos[0].length / 100) * (res.data.productVos[0].width / 100) * (res.data.productVos[0].height / 100), //产品体积
                    productVolumeYchi:((res.data.productVos[0].length / 100) * (res.data.productVos[0].width / 100) * (res.data.productVos[0].height / 100)) * ychi, //产品体积
                    packageSize:res.data.productVos[0].packedlength * res.data.productVos[0].packedwidth * res.data.productVos[0].packedheight,//包装尺寸发货用
                    packageSizeYcun:(res.data.productVos[0].packedlength * res.data.productVos[0].packedwidth * res.data.productVos[0].packedheight) * ycun,//包装尺寸发货用
                    packedvolume:res.data.productVos[0].packedvolume,//包装体积(发货用)
                    packedvolumeYchi:res.data.productVos[0].packedvolume * ychi,//包装体积(发货用)
                    outerBoxSize:res.data.productVos[0].cartonLength * res.data.productVos[0].cartonWidth  * res.data.productVos[0].cartonHeight,//外箱尺寸(装柜用
                    outerBoxSizeYcun:(res.data.productVos[0].cartonLength * res.data.productVos[0].cartonWidth  * res.data.productVos[0].cartonHeight) * ycun,//外箱尺寸(装柜用
                    outerBoxVolume:(res.data.productVos[0].cartonLength  / 100) * (res.data.productVos[0].cartonWidth  / 100) * (res.data.productVos[0].cartonHeight  / 100), //外箱体积(装柜用
                    outerBoxVolumeYcun:((res.data.productVos[0].cartonLength  / 100) * (res.data.productVos[0].cartonWidth  / 100) * (res.data.productVos[0].cartonHeight  / 100)) * ychi, //外箱体积(装柜用
                    cartonWeight:res.data.productVos[0].cartonWeight,//外箱重量(装柜用)
                    cartonWeightLB:res.data.productVos[0].cartonWeight * 2.20,//外箱重量(装柜用)
                    beforepackweight:res.data.productVos[0].beforepackweight,//净重
                    abroadbeforepackweight :res.data.productVos[0].abroadbeforepackweight, //净重
                    afterpackweight:res.data.productVos[0].abroadbeforepackweight, //毛重(发货用)
                    abroadafterpackweight:res.data.productVos[0].abroadbeforepackweight, //毛重(发货用)
                    logisticsPerimeter:(res.data.productVos[0].packedlength + (res.data.productVos[0].packedwidth + res.data.productVos[0].packedheight) * 2), //物流周长加长(美国)
                    transportqty:res.data.productVos[0].transportqty,//可装货柜数量
                    packingway:res.data.productVos[0].packingway,//包装方式
                    productlistings:res.data.productVos[0].productlistings,//多箱清单
                    multiAttribute:res.data.allProducts ,//销售（多）属性
                    containerVolume:res.data.productVos[0].containerVolume / res.data.productVos[0].transportqty, //每个产品所占体积
                    containerVolumeCu:(parseFloat((res.data.productVos[0].containerVolume/res.data.productVos[0].transportqty).toFixed(2)) * 35.3147248).toFixed(2), //每个产品所占体积
                    packedlength:res.data.productVos[0].packedlength,
                    packedwidth:res.data.productVos[0].packedwidth,
                    packedheight:res.data.productVos[0].packedheight,
                    id:res.data.productVos[0].id,
                    spu:res.data.development.spu,
                }
                //采购信息
                let productPurchaseVoList = res.data.productVos[0].productPurchaseVoList.filter(item => {
                    return item.type == 0
                })
                let lastProductPurchaseVoList = res.data.productVos[0].productPurchaseVoList.filter(item => {
                    return item.type == 1
                })
                this.purchaseInfoDetaiList = {
                    productPurchaseVoList,//样品采购前报价
                    lastProductPurchaseVoList,//最终报价
                    productprice:res.data.development.productprice, //产品价格
                    freight:res.data.development.freight, //运费
                    backpurchaseprice:res.data.development.backpurchaseprice, //下大单返样品费
                    backpurchasepricenote:res.data.development.backpurchasepricenote, //返样品费详情备注
                    sampledeliverydays:res.data.productVos[0].sampledeliverydays, //样品交期
                    taxleviedpoint:res.data.development.taxleviedpoint, //含税价税点
                    tax:res.data.development.tax, //海关退税率
                    bandprice:res.data.development.bandprice, //品牌费
                    fobbandprice:res.data.development.fobbandprice, //FOB报价品牌费
                    packedvolume:res.data.development.packedvolume, //FOB头程费

                }
                console.log(this.purchaseInfoDetaiList,'this.purchaseInfoDetaiList')
        })
      },
      //步骤条显示数据处理
      getDevProgresses(val){
        this.developmentProgresses.forEach(item => {
            val.forEach(val => {
                if( item.statusValue == val.statusValue){
                    item.createBy = val.createBy
                    item.createOn = val.createOn
                    // item.statusValue = val.statusValue
                    item.status == val.status 
                    item.toStatus = val.toStatus
                    item.toStatusValue = val.toStatusValue
                }
            })
        })
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      editPage(val){
          this.isEdit = val
      },
      updeEditPage(val){  
          this.isEdit1 = val
      },
      salesEditPage(val){  
          this.isEdit2 = val
      },
      comNewsEdit(val){
          this.isEdit3 = val
      },
      devInfoEdit(val){
          this.isEdit4 = val
      },
      proInfoEdit(val){
          this.isEdit5 = val
      },
      prodevInfoEdit(val){
          this.isEdit6 = val
      },
      closeProdevAttr(val){
          this.isEdit7 = val
      },
      closePurchaseInfo(val){
          this.isEdit8 = val
      },
      putImgList(val){
          this.imageList = val
      },
      leftMove(){
          let  image = document.querySelector('.step-container')
          if(image.offsetLeft > 30)return
           image.style.left = image.offsetLeft +100 + 'px'
      },
      rightMove(){
          let image = document.querySelector('.step-container')
        //   let parentBox = document.querySelector('.stepBox')
        //   if(image.offsetLeft < -parentBox.clientWidth ){
        //       return
        //   }else{
              image.style.left = image.offsetLeft - 100 + 'px'
        //   }
          
      }
  }
}
</script>
<style lang="scss" scoped>
.nav-container {
  width: 100%;
  min-height: 980px;
  background-color: rgba(230, 230, 230, 1);
  .cardBox{
    position: relative;
    width: 100%;
    top: 177px;
    .cardBoxMain{
        margin: 10px;
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
    width: 98.9%;
    top: 0px;
    z-index: 999;
    background-color: rgba(230, 230, 230, 1)
  }
  ::v-deep.card{
      margin: 10px 10px 10px 10px;
      .el-card__body{
          padding-top: 10px !important;
        //   margin-left: 200px;
    }
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
      span {
          font-weight: normal;
      }
      .countryTitle{
          color: #409eff;
          display: inline-block;
      }
      .otherCountryTitle{
          display: inline-block;
      }
      .haveMoneyLitte{
          display: flex;
          .profit{
              font-weight: normal;
          }
      }
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
      }
      .step-container{
        display: inline-block;
        width: 200%;
        // overflow: hidden;
        position: absolute;
        left: 23px;
        .stepTitle{ 
            font-size: 10px;
            margin-right: 15px;
            width: 130px;
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
    }
  }
  
  .backgoundCon{
      width: 100%;
      height: 10px;
      background-color: rgba(230, 230, 230, 1);
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
          margin-left: 200px;
      }
      .edit-position{
          float: right;
          margin-right:10px;
          color: #409eff;
          height: 20px;
          width: 55px;
          font-size: 14px;
          &:hover{
              background-color: #409eff;
              color: #ffffff;
              cursor: pointer;   
              text-align: center;
              
              .icon-edit{
                  fill: #ffffff;
                  background-image: url(../../assets/svg/editWrite.svg);
              }
          }
          .icon-edit{
              height: 16px;
              width: 16px;
              float: left;
              background-image: url(../../assets/svg/edit.svg);
          }
      }
      .imgContainer{
          display: flex;
          min-height: 100px;
          .imgCon{
              margin: 0 10px;
          }
      }
      
      
  }
  
}
</style>