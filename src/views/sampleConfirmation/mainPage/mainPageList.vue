<template>
    <div>
        <el-row class="maina-tab-title">
            <el-col :span="24">
                <div class="flot-left">
                    <el-button type="primary" plain class="button-put" @click="routerMove()" v-permission="'ERP.Product.ProductSample.SaveProductSample'">{{M2('申请样品确认')}}</el-button>
                    <el-button type="primary" plain class="button-put" @click="opreateButton(2)" v-permission="'ERP.Product.ProductSample.SaveSampleValidator'">{{M2('分配样品确认员')}}</el-button>
                    <el-button type="primary" plain class="button-put" @click="opreateButton(3)" v-permission="'ERP.Product.ProductSample.ApprovalSampleMemo'">{{M2('提交样品结果')}}</el-button>
                    <el-button type="primary" plain class="button-put" @click="opreateButton(5)" v-permission="'PM00070'">{{M2('申请修改结果')}}</el-button>
                    <el-button type="primary" plain class="button-put" @click="opreateButton(6)" v-permission="'PM00071'">{{M2('审核修改结果')}}</el-button>
                    <el-button type="primary" plain class="button-put" @click="opreateButton(7)" v-permission="'ERP.Product.ProductSample.SaveProductSample'">{{M2('删除草稿')}}</el-button>
                    <el-dropdown trigger="hover"  @command="unCancelList" size='mini'>
                        <el-button  plain
                            size='mini' 
                            style="margin-left:10px;height:25px;padding: 5px 15px;" 
                            @click="opreateButton(1)"
                            v-permission="'ERP.Product.ProductSample.CancelOff'"
                            type="danger"
                        >
                            {{M2('取消申请')}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <!-- <el-dropdown-item command= 6 plain>更换采购开发</el-dropdown-item> -->
                            <el-dropdown-item 
                                command= 20 
                                v-permission="'ERP.Product.ProductSample.CancelOn'"
                            >{{M2('恢复申请')}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-dropdown trigger="hover" size='mini' @command="exportFile">
                        <el-button 
                            plain
                            size='mini' 
                            style="margin-left:10px;height:25px;padding: 5px 15px;" 
                        >
                            {{M2('报表导出')}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command= 20 >{{M2('样品确认申请单')}}</el-dropdown-item>
                            <el-dropdown-item command= 40 >{{M2('开发需求确认单')}}</el-dropdown-item>
                            <el-dropdown-item command= 30 v-permission="'ERP.Product.ProductSample.SaveSampleValidator'">{{M2('样品确认进度报表')}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <span v-if="optionPutExcle" class="reportTitle"><i class="el-icon-loading" style="margin-right:5px"></i>{{M2('报表导出中')}}</span>
                </div>
            </el-col>
        </el-row>
        <div>
            <el-table 
                v-loading="loading"
                :data="mainTaskList" 
                border 
                :fit="true"
                :empty-text="M2('暂无数据')"
                style="width: 100%"
                @selection-change="handleSelectionChange" :height='changeMaxHeight()'
                :header-cell-style="{background:'#f5f7fa',color:'#606266',padding:'5px 0px' }"
             >
                <el-table-column type="selection" width="40" header-align='center'></el-table-column>
                <el-table-column width="150">
                    <template slot="header">
                        <div style="text-align:center">
                            {{M2('申请单号')}}
                        </div>
                    </template>
                    <template slot-scope="scope">
                        <el-tooltip placement="right" effect="light" :visible-arrow='false' popper-class='popperBorder' style="padding:0;border:none">
                            <span slot="content" class="copeTitle"  @click="copeDevelopId(scope.row.id)">
                                <i class="el-icon-document-copy" ></i>
                            </span>
                            <div class="fileHoverShow" @click="routerMove(scope.row.id)">
                                {{scope.row.id}}
                            </div>
                        </el-tooltip>
                    </template>
                </el-table-column>
                
                <el-table-column prop="otherSKUAlias" width="380">
                    <template slot="header">
                        <div style="text-align:center">
                            {{M2('产品名称/申请ID')}}
                        </div>
                    </template>
                    <template slot-scope="scope">
                        <div>
                            {{scope.row.productTitle}}  
                        </div>
                        <div>
                            <el-tooltip placement="right" effect="light" :visible-arrow='false' popper-class='popperBorder' style="padding:0;border:none">
                                <span slot="content" class="copeTitle"  @click="copeDevelopId(scope.row.productKey)">
                                    <i class="el-icon-document-copy" ></i>
                                </span>
                                <span class="fileHoverShow" @click="openDevProductDetail(scope.row,2)">
                                    {{scope.row.productKey}}
                                </span>
                            </el-tooltip>
                            <el-tooltip  v-if="(scope.row.productKey && !scope.row.productKey.includes('DEV'))" placement="right" effect="light" :visible-arrow='false' popper-class='popperBorder' style="padding:0;border:none">
                                <span slot="content" class="copeTitle"  @click="copeDevelopId(scope.row.skuAlias)">
                                    <i class="el-icon-document-copy" ></i>
                                </span>
                                <span  style="word-break: break-word;">
                                    （{{scope.row.skuAlias}}）  
                                 </span>
                            </el-tooltip> 
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="otherSKUAlias" width="140">
                    <template slot="header">
                        <div style="text-align:center">
                            {{M2('新型号ID')}}
                        </div>
                    </template>
                    <template slot-scope="scope">
                        <div>
                            <el-tooltip placement="right" effect="light" :visible-arrow='false' popper-class='popperBorder' style="padding:0;border:none">
                                <span slot="content" class="copeTitle"  @click="copeDevelopId(scope.row.releSku)">
                                    <i class="el-icon-document-copy" ></i>
                                </span>
                                <span class="fileHoverShow" @click="openDevProductDetail(scope.row.releSku,1)">
                                    {{scope.row.releSku}}
                                </span>
                            </el-tooltip>
                        </div>
                        <div>
                            <span >{{ scope.row.releSkuAlias}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column width="120" align="center">
                    <template slot="header">
                        {{M2('产品类型')}}
                    </template>
                    <template slot-scope="scope">
                        <span>
                           <div>{{scope.row.scenariosStr ? M2(scope.row.scenariosStr) : '--'}}</div>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column align="center" width="120">
                    <template slot="header">
                       {{M2('样品情况')}}
                    </template>
                    <template slot-scope="scope">
                        <div>
                            {{scope.row.sampleConditionStr? M2(scope.row.sampleConditionStr) : '--'}}
                        </div>
                    </template>
                </el-table-column>
              
                <el-table-column prop="applyEr"  width="110" align="center">
                    <template slot="header">
                        {{M2('状态/耗时')}}
                    </template>
                    <template slot-scope="scope">
                        <div class="status-rudis">
                            <div :class="showClass(scope.row.state,'radiusDiv')"></div>
                            <div>
                                <div>{{M2(scope.row.stateValue)}}</div>
                                <div v-if="scope.row.sjDay"  style="color:#797979">({{scope.row.sjDay}}{{M2('天')}})</div>
                            </div>
                        </div>
                        <div class="fileHoverShow" v-if="scope.row.preProductionDocuments"  @click="clickShowBill(scope.row)">({{scope.row.preProductionDocuments[0].stateValue}})</div>
                    </template>
                </el-table-column>
                <el-table-column prop="sampleValidatorName"  width="120" align="center">
                    <template slot="header">
                        {{M2('样品确认员')}}
                    </template>
                    <template slot-scope="scope">
                        {{scope.row.sampleValidatorName ? scope.row.sampleValidatorName : '--'}}
                    </template>
                </el-table-column>
                <el-table-column prop="status" width="100" align="center">
                    <template slot="header">
                        {{M2('申请次数')}}
                    </template>
                    <template slot-scope="scope">
                        {{M2(scope.row.sampleNum)}}
                    </template>
                </el-table-column>
                <el-table-column align="center" width="120">
                    <template slot="header">
                        {{M2('验样场地')}}
                    </template>
                    <template slot-scope="scope">
                        <span>
                            {{M2(scope.row.testSiteStr)}}
                        </span> 
                        <div v-if="scope.row.testSite == 1" style="color:#797979">
                            {{scope.row.supplierName}}
                        </div> 
                    </template>
                </el-table-column>
                <el-table-column  width="120" align="center">
                    <template slot="header">
                        {{M2('完成时间')}}
                    </template>
                    <template slot-scope="scope">
                        {{scope.row.completionTime ? $moment(scope.row.completionTime).format("YYYY-MM-DD") : '--'}}
                    </template>
                </el-table-column>
             
                <el-table-column prop="priority"  align="center" width="100">
                    <template slot="header">
                        {{M2('申请人')}}
                    </template>
                    <template slot-scope="scope">
                       {{scope.row.applicantName}}
                    </template>
                </el-table-column>
                <el-table-column prop="createdOn" width="110" align="center" sortable>
                    <template slot="header">
                        {{M2('可验样日期')}}
                    </template>
                    <template slot-scope="scope"> 
                        {{showTimeL(scope.row)}}
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="操作 / 记录" width="120"  align="center" fixed="right">
                    <template slot="header">
                        {{M2('操作 / 记录')}}
                    </template>
                    <template slot-scope="scope">
                        <div style="display:flex">
                            <el-dropdown trigger="hover"  @command="clickCommand" size='mini'>
                                <el-button type="primary" 
                                    size='mini' 
                                    style="margin-left:10px;height:25px;padding: 5px 15px;" 
                                >
                                     {{M2('操作')}}<i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item :command='changCommand(item.value,scope.row)' style="width:100px;text-align:center" v-for="item in optionsList"  :key="item.value">
                                        <div v-permission:[item.permission]>
                                            <div 
                                                v-if="item.value == 2 || 
                                                    (item.value == 3 && (scope.row.state == 3 || scope.row.state == 4 || scope.row.state == 1)) 
                                                    || (item.value == 4 && (scope.row.state == 2 || scope.row.state == 3))">
                                            {{item.label}}</div>
                                        </div>
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-pagination
            class="page-box"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[50, 100, 200, 500]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
        <!--改动记录-->
        <sampleDialog ref="sampleDialog" @mainListList="mainListList" />
        <commonDialog ref="commonDialog" :titleText="M2('关联单据')">
            <el-table :empty-text="M2('暂无数据')" :data="tableData" style="width: 100%" height="350" border :header-cell-style="{background:'#f5f7fa',color:'#606266'}" >
                <el-table-column type="index">
                    <template slot="header">
                        {{M2('序号')}}
                    </template>
                </el-table-column>
                <el-table-column >
                    <template slot="header">
                       {{M2('单据')}}
                    </template>
                    <template slot-scope="scope">
                        <div @click="routerMove(scope.row.id)" class="fileHoverShow">
                            {{scope.row.id}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column >
                    <template slot="header">
                       {{M2('样品情况')}}
                    </template>
                    <template slot-scope="scope" >
                        {{M2(scope.row.sampleConditionStr)}}
                    </template>
                </el-table-column>
                <el-table-column >
                    <template slot="header">
                       {{M2('当前状态')}}
                    </template>
                    <template slot-scope="scope" >
                        {{M2(scope.row.stateValue)}}
                    </template>
                </el-table-column>
                <el-table-column >
                    <template slot="header">
                       {{M2('可验样日期')}}
                    </template>
                    <template slot-scope="scope">
                        {{ showTimeL(scope.row)}}
                    </template>
                </el-table-column>
            </el-table>
        </commonDialog>
        <exportDateDialog ref="exportDateDialog" @exprotSampleFile="exprotSampleFile"></exportDateDialog>
    </div>
</template>
<script>
import debounce from 'lodash.debounce';
import { delSampleInfos,queryProductSample,approvalSampleMemo,unCancel,getRelevanceProductSample,getEmployee,exportProductSampleRequirement } from '@/api/user.js'
import { GetFileServiceUrl,copyUrl,formatDate,globalReportExport,judgePorduction } from '@/utils/tools'
export default {
    components:{
        sampleDialog:() => import('@/components/sampleConfirmation/sampleDialog.vue'),
        commonDialog:() => import('@/components/common/commonDialog.vue'),
        exportDateDialog:() => import('@/components/sampleConfirmation/exportDateDialog.vue'),
    },
    data(){
        return {
            optionsList: [
                {
                    value: 2,
                    label: this.M2('详情'),
                    permission:'ERP.Product.ProductSample.View',
                },
                {
                    value: 3,
                    label: this.M2('提交'),
                    permission:'ERP.Product.ProductSample.ApprovalSampleMemo',
                },
                {
                    value: 4,
                    label: this.M2('打回'),
                    permission:'ERP.Product.ProductSample.Repulse',
                },
               
            ],
            uploadFilterList:{
                timeValue2:[],
                timeType:0 ,//时间类型 -1：未加时间筛选  0：申请时间  1：完成时间  时间范围筛选时必传
                timeEnum: 500 ,//时间类型   全部(500)、今天(501)、三天内(502)、7天内(503)
                scenarios: null ,//产品类型  0：全新开发  1：二次开发产品  2：改进变更产品
                sampleCondition: null ,//样品情况   0：完整样品 1：部件
                preproductionSample: null ,//是否为产前样   0 ： 是   1：否
                sampleNum: null ,//来样次数  1:第一次  2：第二次  3：多次
                testSite: null ,//验样场地    0：公司   1：工厂
                sampleValidator: null , //样品确认员
                curApplicantId: null ,//申请人   true：自己  false：其他
                status: null ,//状态   1:未提交  2：待分配   3：样品确认中   4：结果输出中   5：合格    6：改进后通过(产前样)    7：不合格     8：已取消
                status1: [] , //状态   1:未提交  2：待分配   3：样品确认中   4：结果输出中   5：合格    6：改进后通过(产前样)    7：不合格     8：已取消
                search:this.$route.query.search?this.$route.query.search :  null, //搜索(供应商、开发ID、sku别名、sku、申请单号)
                search1: this.$route.query.search?true :  null //搜索(供应商、开发ID、sku别名、sku、申请单号)
            },
            dialogVisible:false,
            showTenth:false,
            remarksParam:{},
            total:0,
            currentPage4:0,
            pageSize:50,
            pageNum:1,
            loading:false,
            mainTaskList:[],
            multipleSelection: [],
            renderDom :false,
            employee:{},
            paramCope:{},
            tableData:[],
            optionPutExcle:false,
        }
    },
    props:{
        filterList:{
            default:() => ({})
        }
    },
    created: function() {
        this.mainListList()
        this.init()
    },
    watch:{
        filterList:{
            handler:function(val){
                this.pageNum = 1
                this.mainListList(val)
                this.uploadFilterList = val
            },
            deep:true
        },
    },
    computed:{
        scrollContainer(){
            return document.querySelector('.el-table__body-wrapper')
        },
    },
    methods:{
        
        init(){
            getEmployee().then(res => {
                this.employee = res.data
            })
        },
        mainListList:debounce (function(val){
            if(!val) val = this.uploadFilterList
            this.loading = true
            let status = []
            if(val.status == null || !val.status){
                status = []
            }else {
                status.push(val.status)
            }
            if(val.status1 && val.status1.length > 0){
                val.status1.forEach(item => {
                    status.push(item) 
                })
            }
            let param = {}
            if(val  &&  val.parameters){
                param = {
                    pageNum:this.pageNum,
                    pageSize:this.pageSize,
                    parametersType:val ? val.parametersType :null,
                    parameters:val ? val.parameters.replaceAll('\n',',') :null,
                }
            } else if(val.search &&  (val.selectCheck != 1 && val.search1)) {
                param = {
                    pageNum:this.pageNum,
                    pageSize:this.pageSize,
                    search:val ? val.search : ''
                }
            } else {
                param = {
                    pageNum:this.pageNum,
                    pageSize:this.pageSize,
                    timeType: val ? val.timeType : null ,//时间类型 -1：未加时间筛选  0：申请时间  1：完成时间  时间范围筛选时必传
                    timeEnum: val ? val.timeEnum : null ,//时间类型   全部(500)、今天(501)、三天内(502)、7天内(503)
                    dateFrom:val && val.timeValue2 ? val.timeValue2[0]: '',// 开始时间
                    dateTo: val && val.timeValue2 ?val.timeValue2[1]: '',// 截至时间
                    scenarios:val ? val.scenarios : null ,//产品类型  0：全新开发  1：二次开发产品  2：改进变更产品
                    sampleCondition:val ? val.sampleCondition : null ,//样品情况   0：完整样品 1：部件
                    preproductionSample:val ? val.preproductionSample : null ,//是否为产前样   0 ： 是   1：否
                    sampleNum:val ? val.sampleNum : null ,//来样次数  1:第一次  2：第二次  3：多次
                    testSite:val ? val.testSite : null ,//验样场地    0：公司   1：工厂
                    sampleValidator:val ? val.sampleValidator : null , //样品确认员
                    curApplicantId:val ? val.curApplicantId : null ,//申请人   true：自己  false：其他
                    status:status ,//状态   1:未提交  2：待分配   3：样品确认中   4：结果输出中   5：合格    6：改进后通过(产前样)    7：不合格     8：已取消
                    search:val && val.selectCheck == 1 ? val.search : null //搜索(供应商、开发ID、sku别名、sku、申请单号)
                }
            }
            this.paramCope = JSON.parse(JSON.stringify(param))
            queryProductSample(param).then(res => {
                this.mainTaskList = res.data.rows
                this.total = res.data.records;
                this.currentPage4 = res.data && res.data.pageNum ? res.data.pageNum : 1
                this.loading =false
            }).catch(res => {
                this.loading = false
            })       
        },500),
        //跳转产品详情页
        showTimeL(row){
            if(row.testSite == 0) {
                if(row.applicationTime){
                    return this.$moment(row.applicationTime).format("YYYY-MM-DD")
                }else {
                    return '--'
                }  
            }
            if(row.testSite == 1) {
                if(row.estimatedDateInspection){
                    return this.$moment(row.estimatedDateInspection).format("YYYY-MM-DD")
                }else {
                    return '--'
                }
            }
            return '--'
        },
        openDevProductDetail(value,type){
            if(type == 1){
                window.open(`http://newserp.yaheecloud.com/PMC/Latest//Product/ProductDetail?sku=${value}&language=en`,'_blank')
            }else {
                if(value.productKey && value.productKey.includes('DEV')){
                    window.open(`http://productdev.yaheecloud.com/productDetails?developmentId=${value.productKey}&productId=${value.devProductId}`,'_blank')
                }else {
                    window.open(`http://newserp.yaheecloud.com/PMC/Latest//Product/ProductDetail?sku=${value.productKey}&language=en`,'_blank')
                } 
            }
        },
        //复制地址
        copeDevelopId(val){
            copyUrl(val)
        },
        //点击查看单据
        clickShowBill(list) {
            let param = {
                productKey:list.productKey,
                supplierId:list.supplierId,
                id:list.id,
            }
            getRelevanceProductSample(param).then(res => {
                this.tableData = res.data
                this.$refs.commonDialog.openCommonDialog()
            })  
        },
        //路由跳转
        routerMove(id){
            let routeData = this.$router.resolve({
                name: "sampleDetail",
                query:{
                    id
                }
            });
            window.open(routeData.href, '_blank');
        },
        unCancelList(){
            if(this.multipleSelection.length == 0){
                this.warning('请至少选择一条数据！')
                return
            }
            if(this.multipleSelection.some(res => res.state != 8)){
                this.warning('只能恢复已取消数据！')
                return
            }
            let params = {
                productSampleIds:this.multipleSelection.map(res => {return res.id})
            }
            unCancel(params).then(res => {
                if(res.code == 200){
                    this.success('恢复成功！')
                    this.mainListList(this.uploadFilterList)
                }
            })
        },
        //取消申请
        opreateButton(id,list){
            let dialog = this.$refs.sampleDialog 
            if(list) {
                this.multipleSelection = [] 
                this.multipleSelection.push(list)
            }
            if(this.multipleSelection.length == 0) {
                this.warning('请至少选择一条数据！')
                return
            }
            if(id == 1 || id == 4 || id== 5 || id== 6) {
                if(this.multipleSelection.length > 1){
                    this.warning('只能操作单条数据！')
                    return
                }   
            }
            if(id == 2 || id == 4){
                if(this.multipleSelection.some(res => res.state != 2 && res.state != 3)){
                    this.warning('仅支持待分配，样品确认中进行该操作！')
                    return
                }
            }
            if(id == 3){
                if(this.multipleSelection.some(res => res.state != 3)){
                    this.warning('只有样品确认中状态才可以提交样品确认结果！')
                    return
                }
            }
            if(id == 1){
                if(this.multipleSelection.some(res => res.state != 2 && res.state != 3 && res.state != 4)){
                    this.warning('仅支持待分配，样品确认中，结果输出中可以操作取消！')
                    return
                }
            }
            //申请修改结果判断当前登录人是否是该条数据的样品确认员。
            if(id == 5){
                if(this.multipleSelection.some(res => res.sampleValidator != this.employee.Id) && !this.employee.IsAdminRole){
                    this.warning('只有当前登录账号是该产品的样品确认员才能修改！')
                    return
                }
                if(this.multipleSelection.some(res => res.state != 5 && res.state != 6 && res.state != 7)){
                    this.warning('仅支持合格，改进后通过(产前样)，不合格状态可以操作！')
                    return
                }
            }
            if(id == 6) {
                if(this.multipleSelection.some(res => res.state != 9)){
                    this.warning('仅支持结果修改中状态可以操作！')
                    return
                }
            }
            if(id == 7){
                if((this.multipleSelection.some(res => res.sampleValidator != this.employee.Id) && !this.employee.IsAdminRole) || this.multipleSelection.some(res => res.state != 1)){
                    this.error('仅【待提交】状态且创建人为本人的数据支持删除')
                    return
                }
                this.$confirm(this.M2('确定删除该数据?'), this.M2('提示'), {
                    confirmButtonText: this.M2('确定'),
                    cancelButtonText: this.M2('取消'),
                    type: 'warning',
                    cancelButtonClass: 'btn-custom-cancel',
                })
                .then(() => {
                    let param = this.multipleSelection.map(item => {return item.id})
                    delSampleInfos(param).then(res => {
                        if(res.code == 200){
                            this.success('提交成功！')
                            this.mainListList(this.uploadFilterList)
                        }
                    })
                })
                return
            }
            if(id == 5) dialog.title = this.M2('申请修改结果')
            if(id == 6) dialog.title = this.M2('审核修改结果')
            if(id == 1) dialog.title = this.M2('取消')
            if(id == 2) dialog.title = this.M2('分配')
            if(id == 3) dialog.title = this.M2('提交')
            if(id == 4) dialog.title = this.M2('打回')
            dialog.openDialog(this.multipleSelection,id)
        },
        //导出文件
        exportFile(command){
            let options
            if(command == 20){
                if(!this.multipleSelection || this.multipleSelection.length == 0 ){
                    this.error(this.M2('请选择数据列表'))
                    return
                }  
                if(this.multipleSelection.every(item => item.scenarios == null || item.sampleCondition == null)){
                    this.error(this.M2('所选数据类型未选定，无法导出需求确认单!'))
                    return
                }
                let rowId = this.multipleSelection.filter(item => {
                    return item.scenarios >= 0 && item.sampleCondition >= 0
                }).map(item => {
                    return item.id
                })
                let noDevProductList =  this.multipleSelection.filter(item => {
                    return item.scenarios == null || item.sampleCondition == null
                }).map(item => {
                    return item.id
                })
                if(noDevProductList && noDevProductList.length > 0){
                    this.error(this.M2('申请单号') + ':' + `${noDevProductList.join(',')}`+ ',' +this.M2('所选数据类型未选定，无法导出需求确认单!'))
                }
                this.optionPutExcle = true
                exportProductSampleRequirement([...new Set(rowId)]).then(res => {
                    if(res.code == 200){
                        if(res.data.virtualPaths){
                            res.data.virtualPaths.forEach(item => {
                                let url = judgePorduction() ? item.replace('http','https') : item
                                window.open(url,'_self')
                            })
                        }
                         this.optionPutExcle = false
                        if(res.data.errProductSampleIds){
                           this.error(this.M2('申请单号') + `${res.data.errProductSampleIds.join(',')}` + this.M2('未成功导出数据，请联系IT部进行处理!'))
                        }
                    }else {
                      this.optionPutExcle = false
                    }
                })
                return
            }else if(command == 30){
                this.$refs.exportDateDialog.openCommonDialog()  
            }else if(command == 40){
                if(!this.multipleSelection || this.multipleSelection.length == 0 ){
                    this.error(this.M2('请选择数据列表'))
                    return
                }
                //devProductId如果没有就报错
                if(this.multipleSelection.every(item => item.devProductId == null)){
                    this.error(this.M2('所选数据未找到对应的开发任务,无法导出需求确认单!'))
                    return
                }
                //过滤出来数据
                let rowId = this.multipleSelection.filter(item => {
                    return item.devProductId
                }).map(item => {
                    return item.devProductId
                })
                //如果没有productId用ID提示
                let noDevProductList =  this.multipleSelection.filter(item => {
                    return item.devProductId == null 
                }).map(item => {
                    return item.id
                })
                if(noDevProductList && noDevProductList.length > 0){
                    this.error(`${this.M2('申请单号')}:${noDevProductList.join(',')}，${this.M2('未找到对应的开发任务，无法导出需求确认单')}!`)
                }
                //去重循环获取文件地址
                [...new Set(rowId)].forEach(item => {
                    options = 
                    [  
                        {
                            "Field":'data-exportid',
                            'Value':document.URL.includes('yaheecloud') ? 257 : '55',//55测试
                        },
                        {
                            "Field":'ProductId',
                            'Value':item,
                        },     
                    ]
                    this.optionPutExcle = true
                    globalReportExport(options,this)
                })
                return
            }
        },
        exprotSampleFile(val){
            let options = 
            [
                {
                    "Field":'data-exportid',
                    'Value':document.URL.includes('yaheecloud') ?886:167,//测试
                },
                {
                    "Field":'startDate',
                    'Value':val.date1 + '-01',//测试
                },
                {
                    "Field":'endDate',
                    'Value':val.date2 + '-01',//测试
                },
            ]
            this.optionPutExcle = true
            globalReportExport(options,this)
        },
        //下拉框改变参数
        changCommand(value,list){
            let opvalue = {
                list,
                value
            }
            return opvalue
        },
        //点击按钮本身
        clickCommand(val){
            if(val.value == 1 || val.value == 2){
                this.routerMove(val.list.id)
            }else if(val.value == 3){
                if(val.list.state == 1){//待提交状态
                    let param = {
                        productSampleIds:[val.list.id]
                    }
                    this.$confirm(this.M2('确定要提交样品申请单至认证部进行样品确认?'), this.M2('提示'), {
                        confirmButtonText: this.M2('确定'),
                        cancelButtonText: this.M2('取消'),
                        type: 'warning',
                        cancelButtonClass: 'btn-custom-cancel',
                    })
                    .then(() => {
                        approvalSampleMemo(param).then(res => {
                            if(res.code == 200){
                                this.success('提交成功！')
                                this.mainListList(this.uploadFilterList)
                            }
                        })
                    })
                }else if(val.list.state == 4){
                    this.error(this.M2('请到详情页补充文件后再提交！'))
                }else {
                    this.opreateButton(val.value,val.list)
                }  
            }else if(val.value == 4) {
                this.opreateButton(val.value,val.list)
            }
        },
        showClass(status){
            switch(status) {
                case 1:
                return 'bgRudis-gray'
                case 2 : 
                return 'bgRudis-pink'
                case 3:
                return 'bgRudis-b'
                case 4:
                return 'bgRudis-orange'
                case 5:
                return 'bgRudis-green'
                case 6:
                return 'bgRudis-agreen'
                case 7:
                return 'bgRudis-red'
                case 8:
                return 'bgRudis-gray'
                default:
                return 'bgRudis-gray'
            }
        },
        goProductPage(sku){
            let url = ''
            if(document.URL.includes('yaheecloud')){
                url = `http://newserp.yaheecloud.com/PMC/Latest/Product/ProductDetail?sku=${sku}&language=en`
            }else {
                url = `http://qas-newerp.yahee.com.cn:8088/PMC/Latest/Product/ProductDetail?sku=${sku}&language=en`
            }
            window.open(url,'_blank')
        },
        closeUploadDialog(){
            this.showTenth = false
            this.dialogVisible = false
        },
        //日志弹窗
        openRecordDialog(val){
            this.remarksParam = {
                productCountryId:`${val.sku}_${val.accountType}_${val.taskType}`,
                noteBussinessName:'CameraTask',
                pageNum:0,
                PageIndex:-1,
                proImageList:GetFileServiceUrl(),
                mainBtn:false,
                Mark:null,
                showAllbutton:false,
                BusinessName:'CameraTask',
            }
            this.showTenth = true
            this.dialogVisible = true
            // if(this.$refs.remarksNew){
            //     this.$refs.remarksNew.load(this.remarksParam,true) 
            // } 
        },
        changeMaxHeight(){
            let nHeight = 0
            if(document.querySelector('.navbarContainer')){
                if(navigator.userAgent.indexOf('WebKit') > -1) {
                    nHeight = 90
                }else {
                    nHeight = 90
                }
                return window.innerHeight - document.querySelector('.navbarContainer').offsetHeight + 5 - nHeight  + 'px' 
            }
               return window.innerHeight - 255 + 'px' 
        },
        //时间格式修改
        formatDate(row) {
            if(row){
                return formatDate(row);
            }else {
                return ''
            }
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.mainListList(this.uploadFilterList)
        },
        handleCurrentChange(val) {
            this.pageNum = val
            this.mainListList(this.uploadFilterList)
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        success(msg) {
            this.$message({
                showClose: true,
                message:this.M2(msg),
                offset:220,
                duration: 2000,
                type: 'success'
            });
        },
        warning(msg) {
            this.$message({
                showClose: true,
                message: this.M2(msg),
                offset:220,
                type: 'warning'
            });
        },
        error(msg) {
            this.$message({
                showClose: true,
                message: msg,
                offset:220,
                type: 'error'
            });
        },
    }
}
</script>
<style scoped lang="scss">
.dropdown-class.el-dropdown-menu {
    width: 100px;
}
::v-deep.dialog-main {
    .el-dialog__header {
        padding: 10px 20px 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid #ccc;
    }
    .el-dialog__body {
        padding: 10px 20px;
    }
}
.bg-blue {
    background-color: rgba(52, 191, 163, 0.2);
    color: #0F7535;
    align-items: center;
    padding: 1px 4px;
    font-weight: 400;
    border-radius: 2px;
    width: 70px;
    border-radius: 2px;
    border: none;
}
.bg-green {
    background-color: rgba(89, 134, 251, 0.2);
    color: #3366CC;
    align-items: center;
    padding: 1px 4px;
    font-weight: 400;
    border-radius: 2px;
    width: 70px;
    border-radius: 2px;
    border: none;
}
.status-rudis {
    display: flex;
    justify-content: center;
    // align-items: center;
    .radiusDiv{
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 10px;
        margin-top: 6px;
    }
    .bgRudis-orange {
        background: orange;
    }
    .bgRudis-b {
        background: #3366cc;
    }
    .bgRudis-green {
        background: green;
    }
    .bgRudis-red {
        background: red;
    }
    .bgRudis-gray{
        background: #a8a6a6;
    }
    .bgRudis-pink{
        background: #fdabab;
    }
    .bgRudis-agreen{
        background: #41f489;
    }
}

.rightBottom-title {
    position:absolute;bottom:2px;right:2px;border:1px dashed #ccc;width: 45px;
    height: 18px;
    line-height: 16px;
    background: #ff000042;
    opacity: 0.8;
}
.popperBorder{
    border: none !important;
    padding: 0 !important;
}
.copeTitle{
    color: #3366cc;
    cursor: pointer;
    font-size: 20px;
    margin-left: 0px;
    &:hover{
        background-color:#3366cc ;
        color: #ffffff;
        display: inline-block;
    }
}
.nodeTextElipire {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-align: left;
    width: 100%;
}
.fileHoverShow{
    color: #3366cc;
    display: inline;
    &:hover{
        background: #3366cc;
        color: #ffffff;
        cursor: pointer;
    }
}
.font-icon {
    font-size: 20px;
    color: #3e6ece;
    cursor: pointer;
}
.button-put{
    padding: 5px 10px;
}
.maina-tab-title{
    width: 95%;
    z-index: 888;
    margin-bottom: 7px;
    .flot-left{
        float: left;
        .el-button{
            font-size: 12px;
        }
    }
    .order-position{
        margin-left: 10px;
    }
}
.item {
    padding: 6px;
    background-color: #fdfdfd;
    border: solid 1px #eee;
    margin-bottom: 10px;
    cursor: pointer;
} 
/*选中样式*/
.chosen {
    border: solid 2px #3089dc !important;
}
.page-box{
    position: fixed;
    bottom: 10px;
    right: 30px;
}
.whiteWarp{
    white-space: pre-wrap;
}
.reportTitle{
    color: rgb(4, 80, 27);
}

</style>