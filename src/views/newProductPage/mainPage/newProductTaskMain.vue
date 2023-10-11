<template>
    <div>
        <el-row class="maina-tab-title" v-track="{triggerType:'browse',currentUrl: $route.path,behavior:'进入竞品页面'}">
            <el-col :span="24">
                <div class="flot-left">
                    <el-button type="primary" class="button-put" @click="createTask()" v-permission="'ERP.Product.AddProgressDevelopment'">创建任务</el-button>
                    <el-dropdown  size="mini" style="margin-left:10px" @command="changeFreezing" v-permission="'ERP.Product.ProgressDevelopment.FreezingOn'">
                        <el-button type="primary"  class="button-put" @click="freezing(3)">
                            取消开发<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="6">恢复开发</el-dropdown-item>  
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-dropdown  size="mini" style="margin-left:10px" @command="changeFreezing" v-permission="'ERP.Product.ProgressDevelopment.FreezingOff'">
                        <el-button type="primary" class="button-put" @click="freezing(4)">
                            冻结数据<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="5">取消冻结</el-dropdown-item>  
                        </el-dropdown-menu>
                    </el-dropdown>

                    <el-button type="primary" style="margin-left:10px" class="button-put" @click="putOperation(null,1)" v-permission="'ERP.Product.ProgressDevelopment.ApprovalMemo'">提交</el-button>
                    <el-button type="primary" class="button-put" @click="setTask()" v-permission="'ERP.Product.ProgressDevelopment.SaveStateTime'">设置预耗时</el-button>
                    <el-button type="primary" class="button-put" @click="putOperation(null,3)" v-permission="'ERP.Product.ProgressDevelopment.SaveAssigneeId'">分配负责人</el-button>
                    <!-- <el-button type="primary" class="button-put" @click="outPutReport()">导出报表</el-button> -->

                     <el-dropdown  size="mini" style="margin-left:10px" @command="outPutReport">
                        <el-button type="primary" class="button-put" @click="outPutReport()">
                            导出新品数据<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="5">导出开发进度</el-dropdown-item>  
                        </el-dropdown-menu>
                    </el-dropdown>

                    <span v-if="optionPutExcle" class="reportTitle"><i class="el-icon-loading" style="margin:5px 0;"></i>报表导出中</span>
                </div>
            </el-col>
        </el-row>
        <div style="padding-bottom:15px;">
            <el-table 
                v-loading="loading"
                :data="mainTaskList" 
                border 
                style="width: 100%"
                @selection-change="handleSelectionChange" :height='changeMaxHeight()'
                :header-cell-style="{background:'#f5f7fa',color:'#606266'}"
                @row-click="handleRowClick"
                ref="multipleTable"
                :row-class-name="tableRowClassName"
                :row-style="selectedHighlight"
             >
                <el-table-column type="selection" width="40" header-align='center'></el-table-column>
                
                <el-table-column prop="laws" width="100" fixed="left" align="center" style="position:relative">
                    <template slot="header">
                        图片
                    </template>
                    <template slot-scope="scope">
                        <div >
                            <span v-if="scope.row.pictureUri">
                                <el-popover
                                    placement="right"
                                    trigger="hover"
                                    >
                                    <el-image 
                                        :src="GetFileServiceUrl(scope.row.pictureUri)" 
                                        style="width:200px;height:200px" 
                                        :key="scope.row.pictureUri* Math.random()" 
                                        @click="blankImageUrl(GetFileServiceUrl( scope.row.pictureUri))"
                                        lazy
                                        :scroll-container="scrollContainer"
                                    >
                                        <div slot="placeholder" class="image-slot icon-loading">
                                            <i class="el-icon-loading" ></i>
                                        </div>
                                        <div slot="error" class="image-slot" style="margin-top:35px;margin-left:5px;color:#cccccc">
                                            <i class="el-icon-picture-outline">暂无图片</i>
                                        </div>
                                    </el-image>
                                    <el-image
                                        slot="reference"
                                        style="width: 80px; height: 80px; dispaly:block;margin-top:3px;cursor:pointer;"
                                        :src="GetFileServiceUrl('Small/' + scope.row.pictureUri)" 
                                        lazy
                                        @click="blankImageUrl(GetFileServiceUrl(scope.row.pictureUri))"
                                        :scroll-container="scrollContainer"
                                        fit="fill"
                                        >
                                        <div slot="placeholder" class="image-slot icon-loading">
                                            <i class="el-icon-loading" ></i>
                                        </div>
                                        <div slot="error" class="image-slot" style="margin-top:35px;margin-left:5px;color:#cccccc">
                                            <i class="el-icon-picture-outline">加载失败</i>
                                        </div>
                                    </el-image>
                                </el-popover>
                            </span>
                            <div v-else>
                                <div  class="image-slot" style="height: 80px;display: flex;justify-content: center;align-items: center;color:#cccccc">
                                    <i class="el-icon-picture-outline">暂无图片</i>
                                </div>
                            </div>
                            <div class="rightBottom-title" v-if="scope.row.design == 1" :style="{'color':scope.row.design == '1'?'red' :''}">
                                {{'设计款'}}
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="otherSKUAlias"  width="150">
                    <template slot="header">
                        <div style="text-align:center">
                            系列/编号
                        </div>
                       
                    </template>
                    <template slot-scope="scope">
                        <div>
                            <span>
                                {{scope.row.categoryName}}  
                            </span>
                        </div>

                        <el-tooltip placement="right" effect="light" :visible-arrow='false' popper-class='popperBorder' style="padding:0;border:none">
                            <span slot="content" class="copeTitle"  @click="copeDevelopId(scope.row.id)">
                                <i class="el-icon-document-copy" ></i>
                            </span>
                            <div>
                                {{scope.row.id}} 
                            </div>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column width="170"  align="center">
                    <template slot="header">                      
                       名称
                    </template>
                    <template slot-scope="scope">
                        <div style="text-align:left">
                            {{scope.row.title}}  
                        </div>
                    </template>
                </el-table-column>
                <el-table-column width="100" align="center">
                    <template slot="header">
                        状态
                    </template>
                    <template slot-scope="scope">
                        <div v-for="(item,index) in scope.row.pdStatuses" :key="index" style="height：30px;line-height:30px">
                            <div class="blue-button" :style="{background:changeBgColor(item.state)}" v-if="item.statusValue">{{item.statusValue}}</div>
                            <div v-else>{{item.statusValue}}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column width="100" align="center">
                    <template slot="header">
                        耗时/延期
                    </template>
                    <template slot-scope="scope">
                        <div v-for="(item,index) in scope.row.pdStatuses" :key="index" style="height：30px;line-height:30px">
                            <div :style="{color:item.syDay < 0 ? 'red':''}">{{item.sjDay != null ? item.sjDay + '天' : ''}}<span v-if="item.syDay < 0">({{'超' + -item.syDay + '天'}})</span></div>
                            
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" width="120">
                     <template slot="header">
                       当前经办人
                    </template>
                    <template slot-scope="scope">
                        <div v-for="(item,index) in scope.row.pdStatuses" :key="index">
                            <div>{{item.assigneeName}}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" width="120">
                    <template slot="header">
                        品类经理
                    </template>
                    <template slot-scope="scope">
                        {{scope.row.leaderName}}
                    </template>
                </el-table-column>
                <el-table-column prop="applyEr"  width="120" align="center">
                    <template slot="header">
                        业务开发
                    </template>
                    <template slot-scope="scope">
                       {{scope.row.businessName}}
                    </template>
                </el-table-column>
                <el-table-column prop="operatorName"  width="120" align="center">
                    <template slot="header">
                        采购开发
                    </template>
                    <template slot-scope="scope">
                        {{scope.row.buyerName ? scope.row.buyerName : '--'}}
                    </template>
                </el-table-column>
                <el-table-column prop="status" width="120" align="center">
                    <template slot="header">
                        供应商
                    </template>
                    <template slot-scope="scope">
                        {{scope.row.supplier ? scope.row.supplier : '--'}}
                    </template>
                </el-table-column>
                <el-table-column  width="120" align="center">
                    <template slot="header">
                        预计起止日期
                    </template>
                    <template slot-scope="scope">
                        <div>{{scope.row.expectStartTime ? $moment(scope.row.expectStartTime).format("YYYY-MM-DD") : '--'}}</div>
                        <div>-</div>
                        <div>{{scope.row.expectEndTime ? $moment(scope.row.expectEndTime).format("YYYY-MM-DD") : '--'}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="renewalDate"  width="100" align="center">
                    <template slot="header">
                        实际起止日期
                    </template>
                    <template slot-scope="scope">
                        <div>{{scope.row.actualStartTime ? $moment(scope.row.actualStartTime).format("YYYY-MM-DD") : '--'}}</div>
                        <div>-</div>
                        <div>{{scope.row.actualEndTime ? $moment(scope.row.actualEndTime).format("YYYY-MM-DD") : '--'}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="priority"  align="center"  width="120">
                    <template slot="header">
                        累计工期（天）
                    </template>
                     <template slot-scope="scope">
                        <div>
                            <div>{{scope.row.ljDay}}</div>
                            <div style="color:green">剩余{{  scope.row.syDay || 0 }}天</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="created"  width="100" align="center" sortable label="创建人">
                    <template slot-scope="scope">
                          {{scope.row.createName ? scope.row.createName : '--'}}
                    </template>
                </el-table-column>
                <el-table-column prop="createdOn"  width="100" align="center" sortable label="创建时间">
                    <template slot-scope="scope">
                          <div>{{scope.row.createdOn ? $moment(scope.row.createdOn).format("YYYY-MM-DD HH:mm:ss") : '--'}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="操作 / 记录" width="120"  align="center" fixed="right">
                    <template slot="header">
                        操作 / 记录
                    </template>
                    <template slot-scope="scope">
                        <div style="display:flex;justify-content: space-around;">
                            <el-popover
                                placement="bottom"
                                trigger="hover"
                                popper-class='popperBorder1' style="border:none"
                                v-if="scope.row.state != 50 && scope.row.state != 51 && (scope.row.commitStatus || scope.row.backStatus)"
                                v-permission="'ERP.Product.ProgressDevelopment.ApprovalMemo'"
                                >
                                <div class="operationBox" v-for="item in operationList" :key="item.id"> 
                                    <div class="operationText"  
                                        @click="putOperation(scope.row,item.id,1)"                                     
                                    >
                                    <div class="nameBox"  
                                    v-if="(scope.row.commitStatus && item.id == 1) || (scope.row.backStatus && item.id == 2)"
                                    >{{item.name}}</div></div>
                                </div>
                                <div class="imageHistoryBox" slot="reference" ></div>
                            </el-popover>
              
                            <el-popover
                                placement="bottom"
                                trigger="hover"
                                popper-class='popperBorder1' style="border:none"
                                >
                                <div class="operationBox" v-for="item in edidOperationList" :key="item.id" v-permission:[item.permission]> 
                                    <div class="operationText"   @click="editOperation(scope.row,item.id)">
                                        <div class="nameBox" >{{editableList.includes(scope.row.state) && item.nameT ? item.nameT : item.name}}</div>
                                    </div>
                                </div>
                                <div class="imageBox" slot="reference"></div>
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
            title="修改日志"
            :visible.sync="dialogVisible"
            width="1000px"
            :modal="false"
            top="100px"
            class="dialog-main"
            z-index="9999"
            @close="closeUploadDialog()"
            >
            <remarksNew :remarksParam='remarksParam' ref="remarksNew" v-if="showTenth"></remarksNew>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeUploadDialog()" size="mini">关 闭</el-button>
            </span>
        </el-dialog>
        <createTaskDialog ref="createTaskDialog" :navFilterList='uploadFilterList' @mainListList='mainListList' :employee="employee"></createTaskDialog>
        <checkStatusDialog ref="checkStatusDialog" :navFilterList='uploadFilterList' @mainListList='mainListList'></checkStatusDialog>
        <developProductPssDialog ref="developProductPssDialog"></developProductPssDialog>
        <setProductProgressDialog ref="setProductProgressDialog"></setProductProgressDialog>
    </div>
</template>
<script>

import { GetFileServiceUrl,copyUrl,globalReportExport} from '@/utils/tools.js'
import { getProgressDevelopment,getEmployee,progressfreezing,progressUnfreezing,getTimeEnums } from '@/api/user.js'
import remarksNew from '@/components/remarksNew.vue'
import debounce from 'lodash.debounce';

export default {
    components:{
        remarksNew,
        createTaskDialog:() => import('@/components/newProductTask/createProductTaskDialog.vue'),
        checkStatusDialog:() => import('@/components/newProductTask/checkStatusDialog.vue'),
        developProductPssDialog:() => import('@/components/newProductTask/developProductPssDialog.vue'),/*  */
        setProductProgressDialog:() => import('@/components/newProductTask/setProductProgressDialog.vue'),/*  */
    },
    data(){
        return {
            editableList:['30','50','51'],
            edidOperationList:[
                {
                    name:'编辑',
                    id:1,
                    permission:'ERP.Product.EditProgressDevelopment',
                    nameT:'查看'
                },
                {
                    name:'进度详情',
                    id:2,
                },
                {
                    name:'日志',
                    id:3,
                },
            ],
            operationList:[
                {
                    name:'提交',
                    id:1,
                },
                {
                    name:'打回',
                    id:2,
                },
                
            ],
            uploadFilterList:{
                timeValue2:[],
                timeEnum:500, //时间类型   全部(500)、今天(501)、三天内(502)、7天内(503)、15天内(504)、30天内(505)
                dateFrom:null,//开始时间
                dateTo:null,//截至时间
                // categoryId: null,//类目系列
                leader:null,//品类经理
                curBusiness: null,//业务开发   true：自己  false：其他
                curBuyer: null,//采购开发   true：自己  false：其他
                state:null,//状态 -- /getStateTime   接口，另外补充  50   已冻结、51   已取消
                design:null,//设计款
                supplierType:null,//设计款
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
                        { "Field":'leader','Value':this.uploadFilterList.leader,},
                        { "Field":'businessId','Value':this.uploadFilterList.curBusiness === true ? this.employee.Id : null,},
                        { "Field":'notBusinessId','Value':this.uploadFilterList.curBusiness === false ? this.employee.Id : null,},
                        { "Field":'buyerId','Value':this.uploadFilterList.curBuyer === true ? this.employee.Id : null,},
                        { "Field":'notBuyerId','Value':this.uploadFilterList.curBuyer === false ? this.employee.Id : null,},
                        { "Field":'design','Value':this.uploadFilterList.design,},
                        { "Field":'state','Value':this.uploadFilterList.state,},
                        { "Field":'supplierType','Value':this.uploadFilterList.supplierType,},
                        { "Field":'def','Value': !this.uploadFilterList.search &&  this.uploadFilterList.state == null ? 1:null},
                    ]
                }
            }
            this.optionPutExcle = true
            globalReportExport(options,this)
        },
        blankImageUrl(url) {
            window.open(url,'_blank')
        },
        tableRowClassName({ row, rowIndex }) {
            //把每一行的索引放进row
            row.index = rowIndex;
        },
        //选中表格加背景颜色
        selectedHighlight({ row, rowIndex }) {
            if (this.getIndex.includes(rowIndex) ) {
                return {
                    'background-color': '#F0F5FF !important'
                };
            }
        },
        //按状态区分颜色
        changeBgColor(val) {
            let stateList1 = [1,4,5,7,10,16,19,20,22,27,29]
            let stateList2 = [18,21,23]
            let stateList3 = [2,8,28,11,1]
            let stateList4 = [3,15,24,25,26]
            let stateList5 = [6,9,12,16]
            if(stateList1.includes(val)) {
                return '#3366cc'
            }else if(stateList2.includes (val)) {
                 return '#975fe4'
            }else if(stateList3.includes (val)) {
                 return '#e6a23c'
            }else if(stateList4.includes (val)) {
                 return '#67c23a'
            }else if(stateList5.includes (val)) {
                 return '#f56c6c'
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
        //冻结数据   
        freezing(val) {
            if(this.multipleSelection.length == 0) {
                this.error('请至少选择一条数据！')
                return
            }
            let stringT = '冻结'
            let id = this.multipleSelection.map(res => {
                return res.id
            }).toString()
            if(val == 3) {
                stringT = '取消'
                this.$refs.checkStatusDialog.cancelStatusDialog(val,id)
                this.$refs.checkStatusDialog.showType = 3
                this.$refs.checkStatusDialog.dialogName = stringT
            }else {
                
                this.$confirm(`确定${stringT}该数据？`, '提示', {
                    cancelButtonText: '取消',
                    confirmButtonText: '确定',
                    type: 'warning',
                    cancelButtonClass: 'btn-custom-cancel',
                    }).then(() => {                      
                        let param = {
                            progressDevelopmentIds:id,
                            operation:val,
                        }
                        progressfreezing(param).then(res => {
                            if(res.code == 200) {
                                this.success('操作成功')
                                this.mainListList(this.uploadFilterList)
                            }
                        })
                    }).catch(() => {
                        return          
                });   
            }
        },
        //冻结数据 取消冻结，恢复开发
        changeFreezing(command) {
            if(this.multipleSelection.length == 0) {
                this.error('请至少选择一条数据！')
                return
            }
            let stringT = '取消冻结'
            if(command == 6) {
                if(!this.multipleSelection.every(item => item.state == 51)) {
                    this.error('请选择状态为取消的数据！')
                    return
                }
                stringT = '恢复开发'
            }else {
                if(!this.multipleSelection.every(item => item.state == 50)) {
                    this.error('请选择状态为冻结的数据！')
                    return
                }
            }
            if(command) {
                this.$confirm(`确定${stringT}该数据？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    cancelButtonClass: 'btn-custom-cancel',
                }).then(() => {
                    let id = this.multipleSelection.map(res => {
                        return res.id
                    }).toString()
                        let param = {
                            progressDevelopmentIds:id,
                            operation:command,
                        }
                        progressUnfreezing(param).then(res => {
                            if(res.code == 200) {
                                this.success('操作成功')
                                this.mainListList(this.uploadFilterList)
                            }
                        })
                    }).catch(() => {
                        return          
                }); 
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
        createTask() {
            this.$refs.createTaskDialog.openDialog()
        },
        //设置任务
        setTask() {
            this.$refs.setProductProgressDialog.openDialog(this.multipleSelection)
        },
        editOperation(row,id) {
            switch (id) {
                case 1 :
                    this.$refs.createTaskDialog.openDialog(row,id)
                break;
                case 2 :
                    this.$refs.developProductPssDialog.openDialog(row)
                break;
                case 3 :
                    this.openRecordDialog(row)
            }
        },
        putOperation(row,id,val) {
            let detailDialog = this.$refs.checkStatusDialog
            let rowList = []
            if(val == 1) {
                rowList.push(row)
            }else {
                if(this.multipleSelection.length == 0) {
                    this.error('请至少选择一条数据！')
                    return
                }
                rowList = this.multipleSelection
            }
            // if(!this.employee.IsAdminRole || rowList.some(item => item.assigneeId != this.employee.Id)) {
            //     this.error('您不能操作当前数据！')
            //     return
            // }
            if(id == 3) {
                let status = ['6','9','12','16']
                //有可能单条数据在两个不同状态里，需循环判断
                if(!rowList.every(item => item.state.split(',').some(res => status.includes(res)))) {
                    this.error('只可以在P图、设计方案制作、设计方案终稿、结构设计状态下分配经办人！')
                    return
                }
                // if(!rowList.every(item => status.includes(item.state))) {
                //     this.error('只可以在P图、设计方案制作、设计方案终稿、结构设计状态下分配经办人！')
                //     return
                // }
                if(!rowList.every(item => item.design == rowList[0].design)) {
                    this.error('所选数据的设计类型不一致！')
                    return
                }
            }else {
                if(!rowList.every(item => item.state == rowList[0].state)) {
                    this.error('所选数据的状态不一致！')
                    return
                }
            }
            switch (id) {
                case 1 :
                    detailDialog.showType = 1
                    detailDialog.dialogName = '审批'
                    detailDialog.openDialog(rowList,id)    
                break;
                case 2 :
                    detailDialog.showType = 2
                    detailDialog.dialogName = '打回'
                    detailDialog.openDialog(rowList,id)
                    
                break;
                case 3 :
                    detailDialog.showType = 4
                    detailDialog.dialogName = '分配负责人'
                    detailDialog.openDialog(rowList,id)
                break;
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
                noteBussinessName:'PRODUCTDEV_PROGRESS',
                pageNum:0,
                PageIndex:-1,
                proImageList:GetFileServiceUrl(),
                mainBtn:false,
                Mark:null,
                showAllbutton:false,
            }
            this.showTenth = true
            this.dialogVisible = true
            // if(this.$refs.remarksNew){
            //     this.$refs.remarksNew.load(this.remarksParam,true) 
            // } 
        },
        changeMaxHeight(){
            return window.innerHeight - 240 + 'px'
        },
      //获取列表数据
        mainListList:debounce (function(val){
            if(!val) val = this.uploadFilterList
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
                leader: val && val.leader ?val.leader : null,//品类经理
                curBusiness:  val.curBusiness,//业务开发   true：自己  false：其他
                curBuyer:  val.curBuyer,//采购开发   true：自己  false：其他
                state: val && val.state ?val.state : null,//状态 -- /getStateTime   接口，另外补充  50   已冻结、51   已取消
                design: val && val.design ?val.design : null,//设计款
                timeEnum:val && val.timeEnum ? val.timeEnum : null,
                supplierType:val && val.supplierType ? val.supplierType : null,
            }
            getProgressDevelopment(params).then(res => {
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
                message: '操作成功',
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
                message: msg,
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
    color: #ffffff;
    border-radius: 4px;
    margin-bottom: 3px;
    height:25px;line-height:25px
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