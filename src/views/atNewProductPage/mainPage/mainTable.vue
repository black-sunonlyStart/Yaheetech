<template>
    <div>
        <el-row class="maina-tab-title" v-track="{triggerType:'browse',currentUrl: $route.path,behavior:'进入竞品页面'}">
            <el-col :span="24">
                <div class="flot-left">
                    <el-button type="primary" v-permission="'PM00048'"  class="button-put" plain @click="routerMove()">{{M2('发起需求')}}</el-button>
                    <el-button type="primary" v-permission="'PM00047'" class="button-put" plain @click="toExamine()">{{M2('审核')}}</el-button>
                    <!-- <el-dropdown  size="mini" style="margin-left:10px" @command="assignDesigner">
                        <el-button plain  class="button-put" @click="assignDesigner(1)" v-permission="'PM00039'">
                            分配设计师<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="2" v-permission="'PM00041'">分配专利检索</el-dropdown-item>  
                            <el-dropdown-item :command="3" v-permission="'PM00042'">更换业务开发</el-dropdown-item>  
                        </el-dropdown-menu>
                    </el-dropdown> -->
                    <el-button v-permission="'PM00039'" plain style="margin-left:10px" class="button-put" @click="assignDesigner(1)">{{M2('分配设计师')}}</el-button>
                    <el-button v-permission="'PM00041'" plain style="margin-left:10px" class="button-put" @click="assignDesigner(2)">{{M2('分配专利检索')}}</el-button>
                    <el-button v-permission="'PM00042'" plain style="margin-left:10px" class="button-put" @click="assignDesigner(3)">{{M2('更换业务开发')}}</el-button>
                    <el-button v-permission="'PM00043'" plain style="margin-left:10px" class="button-put" @click="assignDesigner(8)">{{M2('跳过立项')}}</el-button>
                    <el-button v-permission="'PM00044'" plain class="button-put" @click="assignDesigner(9)">{{M2('跳过结构设计')}}</el-button>
                    <el-dropdown v-permission="'PM00045'" size="mini" style="margin-left:10px" @command="assignDesigner">
                        <el-button type="danger" plain  class="button-put" @click="assignDesigner(4)">
                            {{M2('取消开发')}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="5">{{M2('恢复开发')}}</el-dropdown-item>  
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-dropdown v-permission="'PM00045'" size="mini" style="margin:0 10px" @command="assignDesigner">
                        <el-button type="danger" plain class="button-put" @click="assignDesigner(6)">
                            {{M2('冻结数据')}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="7">{{M2('取消冻结')}}</el-dropdown-item>  
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-button plain class="button-put" style="display:none">{{M2('导入需求')}}</el-button>
                    <!-- <el-dropdown  size="mini" style="margin-left:10px" @command="outPutReport">
                        <el-button type="primary" class="button-put" @click="outPutReport()">
                            导出新品数据<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="5">导出开发进度</el-dropdown-item>  
                        </el-dropdown-menu>
                    </el-dropdown> -->

                    <span v-if="optionPutExcle" class="reportTitle"><i class="el-icon-loading" style="margin:5px 0;"></i>{{M2('报表导出中')}}</span>
                </div>
            </el-col>
        </el-row>
        <div style="padding-bottom:15px;">
            <el-table 
                v-loading="loading"
                :data="mainTaskList" 
                border 
                :empty-text="M2('暂无数据')"
                style="width: 100%"
                @selection-change="handleSelectionChange" :height='changeMaxHeight()'
                :header-cell-style="{background:'#f5f7fa',color:'#606266'}"
                @row-click="handleRowClick"
                ref="multipleTable"
                :row-class-name="tableRowClassName"
             >
                <el-table-column type="selection" width="40" header-align='center'></el-table-column>
                
                <el-table-column prop="laws" width="100" fixed="left" align="center" style="position:relative">
                    <template slot="header">
                        {{M2('图片')}}
                    </template>
                    <template slot-scope="scope">
                        <div >
                            <span v-if="scope.row.showProductDemandImg">
                                <el-popover
                                    placement="right"
                                    trigger="hover"
                                    >
                                    <el-image 
                                        :src="GetFileServiceUrl(scope.row.showProductDemandImg)" 
                                        style="width:200px;height:200px" 
                                        :key="scope.row.showProductDemandImg* Math.random()" 
                                        @click="blankImageUrl(GetFileServiceUrl( scope.row.showProductDemandImg))"
                                        lazy
                                        :scroll-container="scrollContainer"
                                    >
                                        <div slot="placeholder" class="image-slot icon-loading">
                                            <i class="el-icon-loading" ></i>
                                        </div>
                                        <div slot="error" class="image-slot" style="margin-top:35px;margin-left:5px;color:#cccccc">
                                            <i class="el-icon-picture-outline">{{M2('暂无图片')}}</i>
                                        </div>
                                    </el-image>
                                    <el-image
                                        slot="reference"
                                        style="width: 80px; height: 80px; dispaly:block;margin-top:3px;cursor:pointer;"
                                        :src="GetFileServiceUrl('Small/' + scope.row.showProductDemandImg)" 
                                        lazy
                                        @click="blankImageUrl(GetFileServiceUrl(scope.row.showProductDemandImg))"
                                        :scroll-container="scrollContainer"
                                        fit="fill"
                                        >
                                        <div slot="placeholder" class="image-slot icon-loading">
                                            <i class="el-icon-loading" ></i>
                                        </div>
                                        <div slot="error" class="image-slot" style="margin-top:35px;margin-left:5px;color:#cccccc">
                                            <i class="el-icon-picture-outline">{{M2('加载失败')}}</i>
                                        </div>
                                    </el-image>
                                </el-popover>
                            </span>
                            <div v-else>
                                <div  class="image-slot" style="height: 80px;display: flex;justify-content: center;align-items: center;color:#cccccc">
                                    <i class="el-icon-picture-outline">{{M2('暂无图片')}}</i>
                                </div>
                            </div>
                            <div class="rightBottom-title" v-if="scope.row.design == 1 || scope.row.design == 10 || scope.row.design == 11 " style="color:red">
                                <span v-if="scope.row.design == 1 || scope.row.design == 10">{{M2('设计')}}</span>
                                <span v-if="scope.row.design == 11">{{M2('P图')}}</span>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="otherSKUAlias"  width="150">
                    <template slot="header">
                        <div style="text-align:center">
                            {{M2('类目-系列')}}/ID
                        </div>
                    </template>
                    <template slot-scope="scope">
                        <div>
                            <span>
                                {{M2(scope.row.seriesCategoryName)}}  
                            </span>
                        </div>
                        <el-tooltip placement="right" effect="light" :visible-arrow='false' popper-class='popperBorder' style="padding:0;border:none">
                            <span slot="content" class="copeTitle"  @click="copeDevelopId(scope.row.developmentId)">
                                <i class="el-icon-document-copy" ></i>
                            </span>
                            <div class="fileHoverShow" @click="routerMove(scope.row.id)">
                                {{scope.row.developmentId}} 
                            </div>
                        </el-tooltip>
                        <div v-if="scope.row.skuAlias">
                            <span>{{M2('sku别名')}}:{{scope.row.skuAlias}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column width="170"  align="center">
                    <template slot="header">                      
                       {{M2('产品名称')}}
                    </template>
                    <template slot-scope="scope">
                        <div style="text-align:left">
                            {{scope.row.title}}  
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" width="120">
                    <template slot="header">
                        {{M2('品类经理')}}
                    </template>
                    <template slot-scope="scope">
                        {{M2(scope.row.categoryManagerName)}}
                    </template>
                </el-table-column>

                <el-table-column  width="120" align="center">
                    <template slot="header">
                        {{M2('产品来源')}}
                    </template>
                    <template slot-scope="scope">
                        {{scope.row.productSourceStr}}
                        <div v-if="scope.row.productSource == 1"> {{M2(scope.row.factoryName)}}</div>
                        <div v-if="scope.row.productSource == 2"> {{M2(scope.row.platForm)}}</div>
                        <div v-if="scope.row.productSource == 3"> {{M2(scope.row.platForm)}}</div>
                        <div v-if="scope.row.productSource == 4"> {{M2(scope.row.productSourceDesigner)}}</div>
                        <div v-if="scope.row.productSource == 5"> {{M2(scope.row.otherSources)}}</div>
                    </template>
                </el-table-column>
                <el-table-column width="100" align="center">
                    <template slot="header">
                        {{M2('状态/耗时')}}
                    </template>
                    <template slot-scope="scope">
                        <div class="blue-button" :style="{background:changeBgColor(scope.row.state),'border-color': changeBorColor(scope.row.state),'color':changeBorColor(scope.row.state)}" v-if="scope.row.stateValue" :title="scope.row.stateValue">{{scope.row.stateValue}}</div>
                        <div >{{scope.row.sjDay ?  scope.row.sjDay + M2('天') : M2('0天')}}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center" width="120">
                     <template slot="header">
                       {{M2('当前经办人')}}
                    </template>
                    <template slot-scope="scope">
                        <div>{{M2(scope.row.assigneeName)}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="applyEr"  width="120" align="center">
                    <template slot="header">
                        {{M2('业务开发')}}
                    </template>
                    <template slot-scope="scope">
                       {{M2(scope.row.businessName)}}
                    </template>
                </el-table-column>
                <el-table-column prop="priority"  align="center"  width="120">
                    <template slot="header">
                        {{M2('累计工期')}}
                        <div>
                          （{{M2('工作日')}}）  
                        </div>
                    </template>
                     <template slot-scope="scope">
                        <div>
                            <div style="color:green">{{  scope.row.sjTotalDay || 0 }}{{M2('天')}}</div>
                        </div>
                    </template>
                </el-table-column>
               
                <el-table-column prop="status"  align="center">
                    <template slot="header">
                        {{M2('推荐理由')}}
                    </template>
                    <template slot-scope="scope">
                        <el-popover
                            placement="bottom"
                            trigger="hover"
                            :width="600"
                            >
                            <div>
                                {{scope.row.recomReason ? scope.row.recomReason : '--'}}
                            </div>
                            <div class="nodeTextElipire" slot="reference">
                                {{scope.row.recomReason ? scope.row.recomReason : '--'}}
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>

                <el-table-column prop="created"  width="100" align="center" sortable :label="M2('发起人')">
                    <template slot-scope="scope">
                        {{scope.row.createName ? M2(scope.row.createName) : '--'}}
                    </template>
                </el-table-column>

                <el-table-column prop="renewalDate"  width="120" align="center">
                    <template slot="header">
                        {{M2('发起')}}/{{M2('完成日期')}}
                    </template>
                    <template slot-scope="scope">
                        <div>{{scope.row.startTime ? $moment(scope.row.startTime).format("YYYY-MM-DD") : '--'}}</div>
                        <div>-</div>
                        <div>{{scope.row.completionOn ? $moment(scope.row.completionOn).format("YYYY-MM-DD") : '--'}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="操作" width="120"  align="center" fixed="right">
                    <template slot="header">
                        {{M2('操作')}} 
                    </template>
                    <template slot-scope="scope">
                        <div style="display:flex;justify-content: space-around;">
                            <el-popover
                                placement="bottom"
                                trigger="hover"
                                popper-class='popperBorder1' style="border:none"
                                v-permission="'PM00038'"
                                >
                                <div class="operationBox"> 
                                    <div class="operationText" 
                                         @click="editOperation(scope.row,1)"                                   
                                    >
                                    <div class="nameBox"  
                                    >{{M2('详情')}} </div></div>
                                </div>
                                <div class="imageBox" slot="reference"></div>
                            </el-popover>
                            <el-popover
                                placement="bottom"
                                trigger="hover"
                                popper-class='popperBorder1' style="border:none"
                                v-if="!noEditableList.includes(scope.row.state) && (scope.row.assigneeId == employee.Id || employee.IsAdminRole)"
                                v-permission="'PM00047'"
                                >
                                <div class="operationBox" v-for="item in operationList" :key="item.id"> 
                                    <div class="operationText"                                       
                                        @click="editOperation(scope.row,item.id)"                                     
                                    >
                                        <div class="nameBox">{{scope.row.state == 2 || scope.row.state == 3 ? M2(item.name) : M2(item.tname)}}</div>
                                    </div>
                                </div>
                                <div class="imageHistoryBox" slot="reference" ></div>
                            </el-popover>
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
   
        <el-dialog
            :title="M2('修改日志')"
            :visible.sync="dialogVisible"
            width="1000px"
            :modal="false"
            top="100px"
            class="dialog-main"
            z-index="9999"
            @close="closeUploadDialog()"
            v-dialogDrag
            >
            <remarksNew :remarksParam='remarksParam' ref="remarksNew" v-if="showTenth"></remarksNew>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeUploadDialog()" size="mini">{{M2('关 闭')}}</el-button>
            </span>
        </el-dialog>
        <checkStatusDialog ref="checkStatusDialog" :navFilterList='uploadFilterList' @mainListList='mainListList'></checkStatusDialog>
        <functionButtonDialog ref="functionButtonDialog" :navFilterList='uploadFilterList' @mainListList='mainListList'></functionButtonDialog>
    </div>
</template>
<script>

import { GetFileServiceUrl,copyUrl,globalReportExport} from '@/utils/tools.js'
import { getProductDemand,getEmployee,getTimeEnums,demandFreezing,demandUnfreezing } from '@/api/user.js'
import remarksNew from '@/components/remarksNew.vue'
import debounce from 'lodash.debounce';

export default {
    components:{
        remarksNew,
        checkStatusDialog:() => import('@/components/atNewProductPage/checkStatusDialog.vue'),
        functionButtonDialog:() => import('@/components/atNewProductPage/functionButtonDialog.vue'),
    },
    data(){
        return {
            noEditableList:[13,14,15,16,17,18],
            operationList:[
                //  {
                //     name:'查看',
                //     id:1,
                // },
                {
                    name:'审批',
                    id:2,
                    tname:'提交',
                },
                // {
                //     name:'日志',
                //     id:3,
                // },
                
            ],
              //1：工厂、2：平台、3：线下、4：设计师推荐、5：其他
            supplierTypeList:[
                {
                    name:'工厂',
                    label:1,
                },
                {
                    name:'平台',
                    label:2,
                },
                {
                    name:'线下',
                    label:3,
                },
                {
                    name:'设计师推荐',
                    label:4,
                },
                {
                    name:'其他',
                    label:5,
                },
            ],
            uploadFilterList:{
                timeValue2:[],
                timeEnum:500, //时间类型   全部(500)、今天(501)、三天内(502)、7天内(503)、15天内(504)、30天内(505)
                dateFrom:null,//开始时间
                dateTo:null,//截至时间
                categoryId: null,//类目系列
                categoryManagerId:null,//品类经理
                curBusiness: null,//业务开发   true：自己  false：其他
                curAssignee: null,//采购开发   true：自己  false：其他
                state:null,//状态 -- /getStateTime   接口，另外补充  50   已冻结、51   已取消
                designs:null,//设计款
                productSource:null,//产品来源
                // categoryIdChird:null,//设计款
                seriesCategoryId: null,//一级(类目id)
                classifyDefId:null,
            },
            dialogVisible:false,
            showTenth:false,
            remarksParam:{},
            total:0,
            getIndex:[],
            currentPage4:0,
            pageSize:50,
            pageNum:1,
            loading:false,
            mainTaskList:[{}],
            multipleSelection: [],
            renderDom :true,
            employee:{},
            optionPutExcle:false,
            timeEnumList:[],
        }
    },
    props:{
        filterList:{
            default:() => ({})
        },
    },
    
    created: function() {
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
        //导出报表
        outPutReport(val) {
            let options = []
            switch (val)  {
                case 5 : {
                    if(this.multipleSelection.length == 0) {
                        this.error('请至少选择一条数据！')
                        return
                    }
                    if(this.multipleSelection.length > 1) {
                        this.error('只能选择一条数据！')
                        return
                    }
                    options = [
                        {
                            "Field":'ProductId',
                            'Value':document.URL.includes('yaheecloud') ?793:153,//测试
                        },
                        {
                            "Field":'progressDevelopmentId',
                            'Value':this.multipleSelection[0].id
                        },
                    ]
                    break;
                } 
                default : {
                    let dateFrom = this.uploadFilterList.timeValue2[0]
                    let dateTo = this.uploadFilterList.timeValue2[1]
                    if(this.uploadFilterList.timeEnum) {
                        let timeList =  this.timeEnumList.filter(item => {
                            return item.timeEnum == this.uploadFilterList.timeEnum
                        })
                        dateFrom = timeList[0].dateFrom
                        dateTo = timeList[0].dateTo
                    }
                    options = 
                    [
                        {
                            "Field":'ProductId',
                            'Value':document.URL.includes('yaheecloud') ?794:65,//测试
                        },
                        { "Field":'search','Value':this.uploadFilterList.search,},
                        { "Field":'dateFrom','Value':dateFrom,},
                        { "Field":'dateTo','Value':dateTo,},
                        { "Field":'seriesCategoryId','Value':this.uploadFilterList.seriesCategoryId,},
                        { "Field":'classifyDefId','Value':this.uploadFilterList.classifyDefId,},
                        { "Field":'categoryManagerId','Value':this.uploadFilterList.categoryManagerId,},
                        { "Field":'businessId','Value':this.uploadFilterList.curBusiness === true ? this.employee.Id : null,},
                        { "Field":'notBusinessId','Value':this.uploadFilterList.curBusiness === false ? this.employee.Id : null,},
                        { "Field":'buyerId','Value':this.uploadFilterList.curAssignee === true ? this.employee.Id : null,},
                        { "Field":'notBuyerId','Value':this.uploadFilterList.curAssignee === false ? this.employee.Id : null,},
                        { "Field":'designs','Value':this.uploadFilterList.designs,},
                        { "Field":'state','Value':this.uploadFilterList.state,},
                        { "Field":'productSource','Value':this.uploadFilterList.productSource,},
                        { "Field":'def','Value': !this.uploadFilterList.search &&  this.uploadFilterList.state == null ? 1:null},
                    ]
                }
            }
            this.optionPutExcle = true
            globalReportExport(options,this)
        },
        // //产品来源字段转化
        // changeProductSource(val){
        //     if(!val) return '--'
        //     let sourceList = []
        //     sourceList = this.supplierTypeList.filter(item => {
        //         return item.label == val
        //     })
        // },
        //打开地址
        blankImageUrl(url) {
            window.open(url,'_blank')
        },
        tableRowClassName({ row, rowIndex }) {
            //把每一行的索引放进row
            row.index = rowIndex;
        },
        //按状态区分颜色
        changeBgColor(val) {
            let stateList1 = [1,2,3,4,5]
            let stateList2 = [6,7,8,9,10]
            let stateList3 = [11,12]
            let stateList4 = [13,14,15,16]
            if(stateList1.includes(val)) {
                return '#FCF0E8'
            }else if(stateList2.includes (val)) {
                return '#F1F4FF'
            }else if(stateList3.includes (val)) {
                return '#EEFFF5'
            }else if(stateList4.includes (val)) {
                return '#F6F6F6'
            }else {
                return '#F1F4FF'
            }
        },
        changeBorColor(val){
            let stateList1 = [1,2,3,4,5]
            let stateList2 = [6,7,8,9,10]
            let stateList3 = [11,12]
            let stateList4 = [13,14,15,16]
            if(stateList1.includes(val)) {
                return '#F56C6C'
            }else if(stateList2.includes (val)) {
                return '#3366cc'
            }else if(stateList3.includes (val)) {
                return '#0F7535'
            }else if(stateList4.includes (val)) {
                return '#333333'
            }else {
                return '#3366cc'
            }
        },
        //点击行触发，选中或不选中复选框
        handleRowClick(row){
            this.$refs.multipleTable.toggleRowSelection(row);
            if(this.getIndex.includes(row.index)) {
                this.getIndex.splice(this.getIndex.findIndex(item => item == row.index),1)
            }else {
                this.getIndex.push(row.index);
            }   
        },
        //审核数据 
        toExamine(list){
            let checkList = []
            if(!list){
                checkList = this.multipleSelection
            }else {
                checkList.push(list)
            }
            if(checkList.length == 0) {
                this.error('请至少选择一条数据！')
                return
            }

            if(checkList.some(item => [13,14,15,16,17,18].includes(item.state))){
                this.error('计划下单、候选下单、已下单、已取消、开发中、已冻结状态不允许审批！')
                return
            }
            
            if(checkList.some(item => item.state != checkList[0].state)){
                this.error('请选择相同状态的数据！')
                return
            }
            if(checkList.length > 1 && checkList.some(item => item.state == 6 || item.state == 7 || item.state == 10 || item.state == 13)){
                this.error('所选状态不支持批量处理！')
                return
            }
            if(checkList.some(item => item.assigneeId != this.employee.Id) && !this.employee.IsAdminRole){
                this.error('只有当前经办人可以审批该数据！')
                return
            }
            let checkStatusDialog = this.$refs.checkStatusDialog
            checkStatusDialog.openDialog(checkList)
            
        },
         //功能按钮
        assignDesigner(command){  
            let checkList = this.multipleSelection
            if(checkList.length == 0) {
                this.error('请至少选择一条数据！')
                return
            }
            //分配设计师支持的状态：产品设计、P图、结构设计
            if(command == 1){
                if(checkList.some(item => ![8,9,11].includes(item.state))){
                    this.error('仅支持产品设计、P图、结构设计状态下分配设计师！')
                    return
                }
                if(checkList.some(item => item.design != checkList[0].design)){
                    this.error('请选择设计款相同的数据！')
                    return
                }
                
            }
            //分配专利检索支持的状态：认证初查、专利查询
            if(command == 2){
                if(checkList.some(item => ![6,10].includes(item.state))){
                    this.error('仅支持认证初查、专利查询状态下分配专利检索！')
                    return
                }
            }
            //更换业务开发支持的状态：需求调研、立项中、认证初查、制定设计需求、产品设计、P图、专利查询、结构设计、样前方案确认
            if(command == 3){
                if(checkList.some(item => ![4,5,6,7,8,9,10,11,12].includes(item.state))){
                    this.error('仅支持需求调研、立项中、认证初查、制定设计需求、产品设计、P图、专利查询、结构设计、样前方案确认状态下更换业务开发！')
                    return
                }
            }
            //取消开发支持的状态：需求初审、需求复审、需求调研、立项中、制定设计需求、样前方案确认,待提交
            if(command == 4){
                if(checkList.every(item => item.state == 1)){
                    this.$confirm(`确定取消此开发需求么？取消后数据将被删除。`, '提示', {
                        cancelButtonText: '取消',
                        confirmButtonText: '确定',
                        type: 'warning',
                        cancelButtonClass: 'btn-custom-cancel',
                        }).then(() => {                      
                            let param = {
                                productDemandIds: checkList.map(item =>{ return item.id }),//需要操作审核的id 数组
                                operation:3,
                            }
                            demandFreezing(param).then(res => {
                                if(res.code == 200) {
                                    this.success('操作成功')
                                    this.mainListList(this.uploadFilterList)
                                }
                            })
                        }).catch(() => {
                            return          
                    }); 
                }else {
                    if(checkList.some(item => ![2,3,4,5,7,12].includes(item.state))){
                        this.error('仅支持需求初审、需求复审、需求调研、立项中、制定设计需求、样前方案确认状态取消开发！')
                        return
                    }
                    let checkStatusDialog = this.$refs.functionButtonDialog
                    checkStatusDialog.openDialog(checkList,command)
                }
                return
            }
            //恢复开发
            if(command == 5){
                if(!checkList.every(item => item.state == 17)){
                    this.error('仅支持已取消状态恢复开发！')
                    return
                }
                let param = {
                    productDemandIds: checkList.map(item =>{ return item.id }),//需要操作审核的id 数组
                    operation:6,
                }
                demandUnfreezing(param).then(res => {
                    if(res.code == 200) {
                        this.success('操作成功')
                        this.mainListList(this.uploadFilterList)
                    }
                })
            }
            //冻结数据 不支持的数据状态：待提交、候选下单、已下单、已取消、已冻结；
            if(command == 6){
                if(checkList.some(item => [1,14,15,16,17].includes(item.state))){
                    this.error('不支持待提交、候选下单、已下单、已取消、已冻结状态冻结数据！')
                    return
                }
            }
            //取消冻结
            if(command == 7){
                 if(!checkList.every(item => item.state == 16)){
                    this.error('请选择冻结状态的数据！')
                    return
                }
                let param = {
                    productDemandIds: checkList.map(item =>{ return item.id }),//需要操作审核的id 数组
                    operation:5,
                }
                demandUnfreezing(param).then(res => {
                    if(res.code == 200) {
                        this.success('操作成功')
                        this.mainListList(this.uploadFilterList)
                    }
                })
            }
            //跳过立项 支持状态需求调研、立项中
            if(command == 8){
                if(checkList.some(item => ![4,5].includes(item.state))){
                    this.error('仅支持需求调研、立项中状态跳过立项！')
                    return
                }
            }
            //跳过结构设计 支持状态专利查询、结构设计
            if(command == 9){
                if(checkList.some(item => ![10,11].includes(item.state))){
                    this.error('仅支持专利查询、结构设计状态跳过结构设计！')
                    return
                }
            }
            if(command != 4 && command != 5 && command != 7){
                let checkStatusDialog = this.$refs.functionButtonDialog
                checkStatusDialog.openDialog(checkList,command)
            } 
        },
        init() {
            this.mainListList()
            // this.controlPromiss()
            getEmployee().then(res => {
                this.employee = res.data
            })
            getTimeEnums().then(res => {
                this.timeEnumList = res.data
            })
        },
        //下载文件地址
        GetFileServiceUrl(url) {
            return GetFileServiceUrl(url)
        },
        //创建任务
        routerMove(id) {
            let routeData = this.$router.resolve({
                name: "newProductPageDetail",
                query:{
                    id
                }
            });
            window.open(routeData.href, '_blank');
        },
        editOperation(row,id) {
            switch (id) {
                case 1 :
                    this.routerMove(row.id)
                break;
                case 2 :
                    this.toExamine(row)
                break;
                case 3 :
                    this.openRecordDialog(row)
            }
        },
        closeUploadDialog(){
            this.showTenth = false
            this.dialogVisible = false
        },
        //打开日志弹窗
        openRecordDialog(val){
            this.remarksParam = {
                productCountryId:val.id,
                noteBussinessName:'ProductDemand_Dev',
                pageNum:0,
                PageIndex:-1,
                proImageList:GetFileServiceUrl(),
                mainBtn:false,
                Mark:null,
                showAllbutton:false,
            }
            this.showTenth = true
            this.dialogVisible = true 
        },
        changeMaxHeight(){
            let nHeight = 0
            if(document.querySelector('.navbarContainer')){
                // if(window.innerWidth >= 1920){
                //     nHeight = 0
                // }else {
                    if(navigator.userAgent.indexOf('WebKit') > -1){
                        nHeight = 55
                    }else {
                        nHeight = 55
                    }  
                // }
                return window.innerHeight - document.querySelector('.navbarContainer').offsetHeight + 5 - nHeight  + 'px' 
            }else {
                return window.innerHeight - 240 + 'px'
            }
        },
        //获取列表数据
        mainListList:debounce (function(val){
            if(!val) val = this.uploadFilterList
            let state = null
            let inStatus = null
            if(val.state){
                if(Array.isArray(val.state)){
                    inStatus = val.state
                }else {
                    state= val.state
                }
            }
            let designs = []
            if(val.designs1 && val.designs1.length > 0){
                designs = val.designs1
            }else {
                if(val.designs) designs.push(val.designs)  
            }
            this.loading = true
            let params = {
                pageNum:this.pageNum,
                pageSize:this.pageSize,
                search: val ? val.search : '',//综合搜索  sku/sku别名/申请号
                dateFrom:val && val.timeValue2 ? val.timeValue2[0]: '',//申请日期 开始时间
                dateTo: val && val.timeValue2 ?val.timeValue2[1]: '',//申请日期 截至时间
                // categoryId: val && val.categoryId ?val.categoryId : null,//类目系列
                seriesCategoryId: val && val.seriesCategoryId ?val.seriesCategoryId : null,//类目系列
                classifyDefId: val && val.classifyDefId ?val.classifyDefId : null,//类目系列
                categoryManagerId: val && val.categoryManagerId ?val.categoryManagerId : null,//品类经理
                curBusiness:  val.curBusiness,//业务开发   true：自己  false：其他
                curAssignee:  val.curAssignee,//采购开发   true：自己  false：其他
                state,//状态 -- /getStateTime   接口，另外补充  50   已冻结、51   已取消
                inStatus,//状态 -- /getStateTime   接口，另外补充  50   已冻结、51   已取消
                designs,//设计款
                timeEnum:val && val.timeEnum ? val.timeEnum : null,
                productSource:val && val.productSource ? val.productSource : null,
            }
            getProductDemand(params).then(res => {
                if(res.data){
                    this.loading = false
                    this.mainTaskList = res.data.rows
                    this.total = res.data.records;
                    this.currentPage4 = res.data && res.data.pageNum ? res.data.pageNum : 1
                }
            }).catch(err => {
                if(err == 1){
                    this.loading = true     
                }else {
                    this.loading = false     
                }
            })
        },500),
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
        success() {
            this.$message({
                showClose: true,
                message: this.M2('操作成功'),
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
        },
        error(msg) {
            this.$message({
                showClose: true,
                message: this.M2(msg),
                offset:220,
                type: 'error'
            });
        },
        copeDevelopId(val){
            copyUrl(val)
        },
    }
}
</script>
<style scoped lang="scss">
.nodeTextElipire {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    text-align: left;
    width: 100%;
}
.popperBorder{
    border: none !important;
    padding: 0 !important;
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
}
.rightBottom-title {
    position:absolute;bottom:2px;right:2px;border:1px dashed #ccc;width: 45px;height: 17px;line-height: 17px;
}
.blue-button {
    background-color: #3366cc;
    padding: 0px;
    border-radius: 4px;
    margin-bottom: 3px;
    height:25px;
    line-height:25px;
    border: 1px dashed;
    overflow: hidden;
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
.imageBox{
    height: 18px;
    width: 18px;
    background-image: url(~@/assets/bianji.png);
    cursor: pointer !important;
    margin: 0px 10px;
}
.imageHistoryBox{
    height: 23px;
    width: 23px;
    background-image: url(~@/assets/shenhe.png);
    cursor: pointer !important;
}
.button-put{
    padding: 5px 10px;
    font-size: 12px;
}
.maina-tab-title{
    top: -10px;
    .flot-left{
        float: left;
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
.operationBox{
    .operationText{
        .nameBox{
            line-height: 7px;
            font-size: 12px;
            border-bottom: 1px solid #cccccc;
            padding: 10px 5px;
            text-align: left;
            margin: 5px;
            &:hover{
                background-color: #3366cc;
                color: #ffffff;
                cursor: pointer;
            }
        }
    }
}
::v-deep.el-table {
    td {
        padding: 2px 0 2px 0 !important;
    }
    .cell{
        line-height: 18px !important;
    }
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
.reportTitle{
    color: rgb(4, 80, 27);
}
</style>
<style>
.popperBorder1 {
    min-width: 80px;
    width: 80px;
    padding: 5px;
    text-align: left;
}
.btn-custom-cancel {
    float: right;
    margin-left: 10px;
}
</style>