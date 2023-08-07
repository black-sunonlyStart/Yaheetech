<template>
    <div>
        <el-row class="maina-tab-title">
            <el-col :span="24">
                <div class="flot-left">
                    <el-button type="primary" plain class="button-put" @click="routerMove()" v-permission="'ERP.Product.ProductSample.ExportSample'">申请样品确认</el-button>
                    <el-button type="primary" plain class="button-put" @click="opreateButton(3)" v-permission="'ERP.Product.ProductSample.ApprovalSampleMemo'">提交样品结果</el-button>
                    <el-button type="primary" plain class="button-put" @click="opreateButton(2)" v-permission="'ERP.Product.ProductSample.SaveSampleValidator'">分配样品确认员</el-button>
                    <el-dropdown trigger="hover"  @command="unCancelList" size='mini'>
                        <el-button  plain
                            size='mini' 
                            style="margin-left:10px;height:25px;padding: 5px 15px;" 
                            @click="opreateButton(1)"
                            v-permission="'ERP.Product.ProductSample.CancelOff'"
                        >
                            取消申请<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <!-- <el-dropdown-item command= 6 plain>更换采购开发</el-dropdown-item> -->
                            <el-dropdown-item 
                                command= 20 
                                v-permission="'ERP.Product.ProductSample.CancelOn'"
                            >恢复申请</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-dropdown trigger="hover"  command size='mini'>
                        <el-button 
                            plain
                            size='mini' 
                            style="margin-left:10px;height:25px;padding: 5px 15px;" 
                        >
                            报表导出<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command= 20 >导出样品确认申请单</el-dropdown-item>
                            <el-dropdown-item command= 30 >导出样品进度清单</el-dropdown-item>
                            <el-dropdown-item command= 40 >需求确认单</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-col>
        </el-row>
        <div>
            <el-table 
                v-loading="loading"
                :data="mainTaskList" 
                border 
                style="width: 100%"
                @selection-change="handleSelectionChange" :height='changeMaxHeight()'
                :header-cell-style="{background:'#f5f7fa',color:'#606266'}"
             >
                <el-table-column type="selection" width="40" header-align='center'></el-table-column>
                <el-table-column width="150">
                    <template slot="header">
                        <div style="text-align:center">
                            申请单号
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
                
                <el-table-column prop="otherSKUAlias" >
                    <template slot="header">
                        <div style="text-align:center">
                            产品名称/申请ID
                        </div>
                    </template>
                    <template slot-scope="scope">
                        <div>
                            <span class="fileHoverShow" @click="goProductPage(scope.row.releSku)">
                                {{scope.row.productTitle}}  
                            </span>
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
                            <span v-if="!scope.row.productKey.includes('DEV')" style="word-break: break-word;">
                                （{{scope.row.skuAlias}}）  
                            </span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="otherSKUAlias" width="140">
                    <template slot="header">
                        <div style="text-align:center">
                            新型号ID
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
                        产品类型
                    </template>
                    <template slot-scope="scope">
                        <span>
                           <div>{{scope.row.scenariosStr ? scope.row.scenariosStr : '--'}}</div>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column align="center" width="120">
                    <template slot="header">
                       样品情况
                    </template>
                    <template slot-scope="scope">
                        <div>
                            {{scope.row.sampleConditionStr? scope.row.sampleConditionStr : '--'}}
                        </div>
                    </template>
                </el-table-column>
              
                <el-table-column prop="applyEr"  width="110" align="center">
                    <template slot="header">
                        状态/耗时
                    </template>
                    <template slot-scope="scope">
                        <div class="status-rudis">
                            <div :class="showClass(scope.row.state)"></div>
                            <div>
                                <div>{{scope.row.stateValue}}</div>
                                <div v-if="scope.row.sjDay">({{scope.row.sjDay}}天)</div>
                            </div>
                        </div>
                        <div class="fileHoverShow" v-if="scope.row.preProductionDocuments"  @click="clickShowBill(scope.row)">({{scope.row.preProductionDocuments[0].stateValue}})</div>
                    </template>
                </el-table-column>
                <el-table-column prop="sampleValidatorName"  width="120" align="center">
                    <template slot="header">
                        样品确认员
                    </template>
                    <template slot-scope="scope">
                        {{scope.row.sampleValidatorName ? scope.row.sampleValidatorName : '--'}}
                    </template>
                </el-table-column>
                <el-table-column prop="status" width="100" align="center">
                    <template slot="header">
                        申请次数
                    </template>
                    <template slot-scope="scope">
                        {{scope.row.sampleNum}}
                    </template>
                </el-table-column>
                <el-table-column align="center" width="120">
                    <template slot="header">
                        验样场地
                    </template>
                    <template slot-scope="scope">
                        <span>
                            {{scope.row.testSiteStr}}
                        </span> 
                    </template>
                </el-table-column>
                <el-table-column  width="120" align="center">
                    <template slot="header">
                        完成时间
                    </template>
                    <template slot-scope="scope">
                        {{scope.row.completionTime ? $moment(scope.row.completionTime).format("YYYY-MM-DD") : '--'}}
                    </template>
                </el-table-column>
             
                <el-table-column prop="priority"  align="center" width="100">
                    <template slot="header">
                        申请人
                    </template>
                    <template slot-scope="scope">
                       {{scope.row.applicantName}}
                    </template>
                </el-table-column>
                <el-table-column prop="createdOn" width="100" align="center" sortable label="申请时间">
                    <template slot-scope="scope">
                        {{scope.row.applicationTime ? formatDate(scope.row.applicationTime) : '--'}}
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="操作 / 记录" width="120"  align="center" fixed="right">
                    <template slot="header">
                        操作 / 记录
                    </template>
                    <template slot-scope="scope">
                        <div style="display:flex">
                           <!-- <el-select v-model="scope.row.operator" size="mini" placeholder="请选择">
                                <el-option
                                    v-for="item in optionsList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select> -->
                            <el-dropdown trigger="hover"  @command="clickCommand" size='mini'>
                                <el-button type="primary" 
                                    size='mini' 
                                    style="margin-left:10px;height:25px;padding: 5px 15px;" 
                                >
                                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item :command='changCommand(item.value,scope.row)' style="width:100px;text-align:center" v-for="item in optionsList"  :key="item.value">
                                        <div v-permission:[item.permission]>
                                            <div v-if="(scope.row.state == 8 && (item.value != 2 && item.value != 3)) || scope.row.state != 8">{{item.label}}</div>
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
        <commonDialog ref="commonDialog" titleText="关联单据">
            <el-table :data="tableData" style="width: 100%" height="350" border :header-cell-style="{background:'#f5f7fa',color:'#606266'}" >
                <el-table-column type="index">
                    <template slot="header">
                       序号
                    </template>
                </el-table-column>
                <el-table-column >
                    <template slot="header">
                       单据
                    </template>
                    <template slot-scope="scope" >
                        <div @click="routerMove(scope.row.id)" class="fileHoverShow">
                             {{scope.row.id}}
                        </div>
                       
                    </template>
                </el-table-column>
                <el-table-column >
                    <template slot="header">
                       样品情况
                    </template>
                    <template slot-scope="scope" >
                         {{scope.row.sampleConditionStr}}
                    </template>
                </el-table-column>
                <el-table-column >
                    <template slot="header">
                       当前状态
                    </template>
                    <template slot-scope="scope" >
                         {{scope.row.stateValue}}
                    </template>
                </el-table-column>
                <el-table-column >
                    <template slot="header">
                       申请时间
                    </template>
                    <template slot-scope="scope" >
                         {{$moment(scope.row.applicationTime).format("YYYY-MM-DD") }}
                    </template>
                </el-table-column>
            </el-table>
        </commonDialog>
    </div>
</template>
<script>
import debounce from 'lodash.debounce';
import { queryProductSample,approvalSampleMemo,unCancel,getRelevanceProductSample,getId } from '@/api/user.js'
import { GetFileServiceUrl,copyUrl,formatDate } from '@/utils/tools'
export default {
    components:{
        sampleDialog:() => import('@/components/sampleConfirmation/sampleDialog.vue'),
        commonDialog:() => import('@/components/common/commonDialog.vue')
    },
    data(){
        return {
            optionsList: [
                {
                    value: 2,
                    label: '详情',
                    permission:'ERP.Product.ProductSample.SaveProductSample',
                },
                {
                    value: 3,
                    label: '提交',
                    permission:'ERP.Product.ProductSample.ApprovalSampleMemo',
                },
                {
                    value: 4,
                    label: '打回',
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
                status1: [] ,//状态   1:未提交  2：待分配   3：样品确认中   4：结果输出中   5：合格    6：改进后通过(产前样)    7：不合格     8：已取消
                search: null //搜索(供应商、开发ID、sku别名、sku、申请单号)
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
            tableData:[],
        }
    },
    props:{
        filterList:{
            default:() => ({})
        }
    },
    created: function() {
        this.mainListList()
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
        openDevProductDetail(value,type){
            if(type == 1){
                window.open(`http://newserp.yaheecloud.com/PMC/Latest//Product/ProductDetail?sku=${value}&language=en`,'_blank')
            }else {
                if(value.productKey.includes('DEV')){
                    window.open(`http://productdev.yaheecloud.com/productDetails?developmentId=${value.productKey}&productId=${value.devProductId}`,'_blank')
                }else {
                    window.open(`http://newserp.yaheecloud.com/PMC/Latest//Product/ProductDetail?sku=${value.releSku}&language=en`,'_blank')
                } 
            }

        },
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
            // if(!id){
            //     getId().then(res => {
            //         id = res.data
            //         let routeData = this.$router.resolve({
            //             name: "sampleDetail",
            //             query:{
            //                 id
            //             }
            //         });
            //         window.open(routeData.href, '_blank');
            //     })
            // }else {
                let routeData = this.$router.resolve({
                    name: "sampleDetail",
                    query:{
                        id
                    }
                });
                window.open(routeData.href, '_blank');
            // }
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
            if(id == 1 || id == 4) {
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
                    this.warning('仅支持待分配，样品确认中,结果输出中可以操作取消！')
                    return
                }
            }
            if(id == 1) dialog.title = '取消'
            if(id == 2) dialog.title = '分配'
            if(id == 3) dialog.title = '提交'
            if(id == 4) dialog.title = '打回'
            dialog.openDialog(this.multipleSelection,id)
        },
        changCommand(value,list){
            let opvalue = {
                list,
                value
            }
            return opvalue
        },
        clickCommand(val){
            if(val.value == 1 || val.value == 2){
                this.routerMove(val.list.id)
            }else if(val.value == 3){
                if(val.list.state == 1){//待提交状态
                    let param = {
                        productSampleIds:[val.list.id]
                    }
                    this.$confirm(' 确定要提交样品申请单至认证部进行样品确认?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        cancelButtonClass: 'btn-custom-cancel',
                    })
                    .then(() => {
                        approvalSampleMemo(param).then(res => {
                            if(res.code == 200){
                                this.mainListList(this.uploadFilterList)
                            }
                        })
                    })
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
            return window.innerHeight - 255 + 'px' 
        },

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
                message:msg,
                offset:220,
                duration: 2000,
                type: 'success'
            });
        },
        warning(msg) {
            this.$message({
                showClose: true,
                message: msg,
                offset:220,
                type: 'warning'
            });
        }
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
    justify-content: left;
    // align-items: center;
    .bgRudis-orange {
        background: orange;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 10px;
        margin-top: 6px;
    }
    .bgRudis-b {
        background: #3366cc;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 10px;
        margin-top: 6px;
    }
    .bgRudis-green {
        background: green;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 10px;
        margin-top: 6px;
    }
    .bgRudis-red {
        background: red;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 10px;
        margin-top: 6px;
    }
    .bgRudis-gray{
        background: #a8a6a6;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 10px;
        margin-top: 6px;
    }
    .bgRudis-pink{
        background: #fdabab;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 10px;
        margin-top: 6px;
    }
    .bgRudis-agreen{
        background: #41f489;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 10px;
        margin-top: 6px;
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