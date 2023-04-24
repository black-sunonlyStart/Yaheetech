<template>
    <div v-if="renderDom">
        <el-row class="maina-tab-title" v-track="{triggerType:'browse',currentUrl: $route.path,behavior:'进入摄像页面'}">
            <el-col :span="24">
                <div class="flot-left">
                    <el-button type="primary" class="button-put" @click="createTask()">创建任务</el-button>
                    <el-dropdown  size="mini" style="margin-left:10px" @command="changeFreezing">
                        <el-button type="primary"  class="button-put" @click="freezing(3)">
                            取消开发<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="6">恢复开发</el-dropdown-item>  
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-dropdown  size="mini" style="margin-left:10px" @command="changeFreezing">
                        <el-button type="primary" class="button-put" @click="freezing(4)">
                            冻结数据<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="5">取消冻结</el-dropdown-item>  
                        </el-dropdown-menu>
                    </el-dropdown>

                    <el-button type="primary" style="margin-left:10px" class="button-put" @click="putOperation(null,1)">提交</el-button>
                    <el-button type="primary" class="button-put" @click="setTask()">设置</el-button>
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
             >
                <el-table-column type="selection" width="40" header-align='center'></el-table-column>
                
                <el-table-column prop="laws" width="100" fixed="left" align="center" style="position:relative">
                    <template slot="header">
                        图片
                    </template>
                    <template slot-scope="scope">
                        <div >
                            <span v-if="scope.row.pictureUri">
                                <el-image 
                                    :src="GetFileServiceUrl(scope.row.pictureUri)" 
                                    style="width:80px;height:80px" 
                                    :key="GetFileServiceUrl(scope.row.pictureUri)" 
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
                        <div>
                             {{scope.row.id}} 
                        </div>
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
                        状态/耗时
                    </template>
                    <template slot-scope="scope">
                        <div v-for="(item,index) in scope.row.pdStatuses" :key="index">
                            <div class="blue-button">{{item.statusValue}}</div>
                            <div >{{item.sjDay != null ? item.sjDay + '天' : ''}}</div>
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
                        预计起止时间
                    </template>
                    <template slot-scope="scope">
                        <div>{{scope.row.expectStartTime ? $moment(scope.row.expectStartTime).format("YYYY-MM-DD") : '--'}}</div>
                        <div>-</div>
                        <div>{{scope.row.expectEndTime ? $moment(scope.row.expectEndTime).format("YYYY-MM-DD") : '--'}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="renewalDate"  width="100" align="center">
                    <template slot="header">
                        实际起止时间
                    </template>
                    <template slot-scope="scope">
                        <div>{{scope.row.actualStartTime ? $moment(scope.row.actualStartTime).format("YYYY-MM-DD") : '--'}}</div>
                        <div>-</div>
                        <div>{{scope.row.actualEndTime ? $moment(scope.row.actualEndTime).format("YYYY-MM-DD") : '--'}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="priority"  align="center">
                    <template slot="header">
                        累计工期（天）
                    </template>
                     <template slot-scope="scope">
                        <div>
                            <div>{{scope.row.ljDay}}</div>
                            <div style="color:green">剩余{{  scope.row.syDay }}天</div>
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
                                popper-class='popperBorder' style="border:none"
                                >
                                <div class="operationBox" v-for="item in operationList" :key="item.id"> 
                                    <div class="operationText"  
                                        @click="putOperation(scope.row,item.id,1)"
                                    >
                                    <div class="nameBox"  
                                    >{{item.name}}</div></div>
                                </div>
                                <div class="imageHistoryBox" slot="reference"></div>
                            </el-popover>
                            <el-popover
                                placement="bottom"
                                trigger="hover"
                                popper-class='popperBorder' style="border:none"
                                >
                                <div class="operationBox" v-for="item in edidOperationList" :key="item.id"> 
                                    <div class="operationText"  
                                        @click="editOperation(scope.row,item.id)"
                                    >
                                    <div class="nameBox" 
                                    >{{item.name}}</div></div>
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
            z-index="999"
            >
            <remarksNew :remarksParam='remarksParam' ref="remarksNew" v-if="showTenth"></remarksNew>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeUploadDialog()" size="mini">关 闭</el-button>
            </span>
        </el-dialog>
        <createTaskDialog ref="createTaskDialog" :navFilterList='uploadFilterList' @mainListList='mainListList'></createTaskDialog>
        <checkStatusDialog ref="checkStatusDialog" :navFilterList='uploadFilterList' @mainListList='mainListList'></checkStatusDialog>
        <developProductPssDialog ref="developProductPssDialog"></developProductPssDialog>
        <setProductProgressDialog ref="setProductProgressDialog"></setProductProgressDialog>
    </div>
</template>
<script>

import { copyUr,GetFileServiceUrl} from '@/utils/tools.js'
import { getProgressDevelopment,getEmployee,progressfreezing,progressUnfreezing } from '@/api/user.js'
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
            edidOperationList:[
                {
                    name:'编辑',
                    id:1,
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
            uploadFilterList:{},
            dialogVisible:false,
            showTenth:false,
            remarksParam:{},
            total:0,
            currentPage4:0,
            pageSize:50,
            pageNum:1,
            loading:false,
            mainTaskList:[{}],
            multipleSelection: [],
            renderDom :true,
            employee:{}
        }
    },
    props:{
        filterList:{
            default:() => ({})
        }
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
            }else {
                this.$confirm(`确定${stringT}该数据？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
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
        changeFreezing(command) {
            if(this.multipleSelection.length == 0) {
                this.error('请至少选择一条数据！')
                return
            }
             let stringT = '取消冻结'
            if(command == 6) stringT = '恢复开发'
            if(command) {
                this.$confirm(`确定${stringT}该数据？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
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
        },
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
                    this.error('请选择一条数据！')
                    return
                }
                rowList = this.multipleSelection
            }

            // if(!this.employee.IsAdminRole || rowList.some(item => item.assigneeId != this.employee.Id)) {
            //     this.error('您不能操作当前数据！')
            //     return
            // }

            if(!rowList.every(item => item.state == rowList[0].state)) {
                this.error('操作状态请保持一致！')
                return
            }
            switch (id) {
                case 1 :
                    detailDialog.openDialog(rowList,id)
                    detailDialog.type = 1
                    detailDialog.dialogName = '审批'
                break;
                case 2 :
                    detailDialog.openDialog(rowList,id)
                    detailDialog.type = 2
                    detailDialog.dialogName = '打回'
                break;
            }
        },
        closeUploadDialog(){
            this.showTenth = false
            this.dialogVisible = false
        },
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
            if(this.$refs.remarksNew){
                this.$refs.remarksNew.load(this.remarksParam,true) 
            } 
        },
       
        controlPromiss(){
            let params = [
                "ERP.PDC.Product.CameraTask.View",
                "ERP.PDC.Product.CameraTask.SaveCameraTask1",
                "ERP.PDC.Product.CameraTask.SaveCameraTask2",
                "ERP.PDC.Product.CameraTask.SaveCameraTask3",
                "ERP.PDC.Product.CameraTask.SaveCameraTask4",
                "ERP.PDC.Product.CameraTask.SaveCameraTask",
                "ERP.PDC.Product.CameraTask.SaveCameraTask5",
                "ERP.PDC.Product.CameraTask.SaveCameraTask6",
            ]
            let url = document.URL.includes('yaheecloud') ? 'http://erptools.yaheecloud.com/api/common/hasPermissions':'http://api-tools-test.yahee.com.cn:84/tool-api/common/hasPermissions'
            hasPermissions(url,params).then(response => {
                if(response.data){
                    let data = JSON.stringify( response.data);
                    sessionStorage.setItem("permissions", data);
                    this.renderDom = true
                }
            });
        },
        changeMaxHeight(){
            return window.innerHeight - 240 + 'px'
        },
      
        mainListList:debounce (function(val){
            if(!val) val = this.uploadFilterList
            this.loading = true
          
                let params = {
                    pageNum:this.pageNum,
                    pageSize:this.pageSize,
                    search: val ? val.search : '',//综合搜索  sku/sku别名/申请号
                    dateFrom:val && val.timeValue2 ? val.timeValue2[0]: '',//申请日期 开始时间
                    dateTo: val && val.timeValue2 ?val.timeValue2[1]: '',//申请日期 截至时间

                    categoryId: val && val.categoryId ?val.categoryId : null,//类目系列
                    seriesCategoryId: val && val.seriesCategoryId ?val.seriesCategoryId : null,//类目系列
                    classifyDefId: val && val.classifyDefId ?val.classifyDefId : null,//类目系列
                    leader: val && val.leader ?val.leader : null,//品类经理
                    curBusiness:  val && val.curBusiness ?val.curBusiness : null,//业务开发   true：自己  false：其他
                    curBuyer:  val && val.curBuyer ?val.curBuyer : null,//采购开发   true：自己  false：其他
                    state: val && val.state ?val.state : null,//状态 -- /getStateTime   接口，另外补充  50   已冻结、51   已取消
                    design: val && val.design ?val.design : null,//设计款
                    timeEnum:val && val.timeEnum ? val.timeEnum : null,
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
        }
    }
}
</script>
<style scoped lang="scss">
    .rightBottom-title {
        position:absolute;bottom:2px;right:2px;border:1px dashed #ccc;width: 45px;height: 17px;line-height: 17px;
    }
    .blue-button {
        background-color: #3366cc;
        padding: 0px;
        color: #ffffff;
        border-radius: 4px;
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
</style>
<style>
.popperBorder {
    min-width: 80px;
    width: 80px;
    padding: 5px;
    text-align: left;
}
</style>