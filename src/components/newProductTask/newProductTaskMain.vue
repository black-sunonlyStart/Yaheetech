<template>
    <div v-if="renderDom">
        <el-row class="maina-tab-title" v-track="{triggerType:'browse',currentUrl: $route.path,behavior:'进入摄像页面'}">
            <el-col :span="24">
                <div class="flot-left">
                    <el-button type="primary" class="button-put" @click="createTask()">创建任务</el-button>
                    <el-dropdown  size="mini" style="margin-left:10px">
                        <el-button type="primary"  class="button-put">
                            取消开发<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>恢复开发</el-dropdown-item>  
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-dropdown  size="mini" style="margin-left:10px">
                        <el-button type="primary" class="button-put">
                            冻结数据<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>取消冻结</el-dropdown-item>  
                        </el-dropdown-menu>
                    </el-dropdown>

                    <el-button type="primary" style="margin-left:10px" class="button-put" @click="submitTask()">提交</el-button>
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
                            <span v-if="scope.row.picturePath">
                                <el-image 
                                    :src="imgRul(scope.row.picturePath)" 
                                    style="width:80px;height:80px" 
                                    :key="scope.row.picturePath" 
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
                            <div class="rightBottom-title" v-if="scope.row.accountType == 'YT'" :style="{'color':scope.row.accountType == 'YT'?'red' :''}">
                                {{'有logo'}}
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
                            <span  class="fileHoverShow">
                                {{scope.row.headline}}  
                            </span>
                        </div>
                        <div>
                             {{scope.row.category}} 
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="skuAlias" width="170"  align="center">
                    <template slot="header">                      
                       名称
                    </template>
                    <template slot-scope="scope">
                        <div  v-if="scope.row.sku" class="fileHoverShow">
                          
                         
                        </div>
                    </template>
                </el-table-column>
                <el-table-column width="100" align="center">
                    <template slot="header">
                        状态/耗时
                    </template>
                    <template slot-scope="scope">
                        <span>
                           <div>{{scope.row.bigDepartmentLeaderName ? scope.row.bigDepartmentLeaderName : '--'}}</div>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column align="center" width="120">
                     <template slot="header">
                       当前经办人
                    </template>
                    <template slot-scope="scope">
                        <div v-if="scope.row.market">
                            {{scope.row.market}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" width="120">
                    <template slot="header">
                        品类经理
                    </template>
                    <template slot-scope="scope">
                        
                    </template>
                </el-table-column>
                <el-table-column prop="applyEr"  width="120" align="center">
                    <template slot="header">
                        业务开发
                    </template>
                    <template slot-scope="scope">
                       
                    </template>
                </el-table-column>
                <el-table-column prop="operatorName"  width="120" align="center">
                    <template slot="header">
                        采购开发
                    </template>
                    <template slot-scope="scope">
                        {{scope.row.operatorName ? scope.row.operatorName : '--'}}
                    </template>
                </el-table-column>
                <el-table-column prop="status" width="120" align="center">
                    <template slot="header">
                        供应商
                    </template>
                    <template slot-scope="scope">
                     
                    </template>
                </el-table-column>
                <el-table-column  width="120" align="center">
                    <template slot="header">
                        预计起止时间
                    </template>
                    <template slot-scope="scope">
                        {{scope.row.planCompletionOn ? $moment(scope.row.planCompletionOn).format("YYYY-MM-DD") : '--'}}
                    </template>
                </el-table-column>
                <el-table-column prop="renewalDate"  width="100" align="center">
                    <template slot="header">
                        实际起止时间
                    </template>
                    <template slot-scope="scope">
                     
                    </template>
                </el-table-column>
                <el-table-column prop="priority"  align="center">
                    <template slot="header">
                        累计工期（天）
                    </template>
                     <template slot-scope="scope">
                     
                    </template>
                </el-table-column>
                <el-table-column prop="created"  width="100" align="center" sortable label="创建人">
                    <template slot-scope="scope">
                     
                    </template>
                </el-table-column>
                <el-table-column prop="createdOn"  width="100" align="center" sortable label="创建时间">
                    <template slot-scope="scope">
                     
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
                                width="80"
                                trigger="hover">
                                <div class="operationBox" v-for="item in operationList" :key="item.id"> 
                                    <div class="operationText"  
                                        @click="putOperation(scope.row,item.id)"
                                    >
                                    <div class="nameBox" 
                                        v-permission:[item.perkey] 
                                        v-track="{triggerType:'click',currentUrl: $route.path,behavior:item.name}"
                                    >{{item.name}}</div></div>
                                </div>
                                <div class="imageHistoryBox" slot="reference" @mouseover="openOperation(scope.row)"></div>
                            </el-popover>
                            <el-popover
                                placement="bottom"
                                width="80"
                                trigger="hover">
                                <div class="operationBox" v-for="item in edidOperationList" :key="item.id"> 
                                    <div class="operationText"  
                                        @click="editOperation(scope.row,item.id)"
                                    >
                                    <div class="nameBox" 
                                        v-permission:[item.perkey] 
                                        v-track="{triggerType:'click',currentUrl: $route.path,behavior:item.name}"
                                    >{{item.name}}</div></div>
                                </div>
                                <div class="imageBox" slot="reference" @mouseover="openOperation(scope.row)"></div>
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
        <createTaskDialog ref="createTaskDialog"></createTaskDialog>
        <checkStatusDialog ref="checkStatusDialog"></checkStatusDialog>
        <developProductPssDialog ref="developProductPssDialog"></developProductPssDialog>
        <setProductProgressDialog ref="setProductProgressDialog"></setProductProgressDialog>
    </div>
</template>
<script>

import { copyUrl } from '@/utils/tools.js'
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
            uploadFilterList:{
                
            },
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
       
        }
    },
    props:{
        filterList:{
            default:() => ({})
        }
    },
    created: function() {
        // this.mainListList()
        // this.controlPromiss()
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
        //创建任务
        createTask() {
            this.$refs.createTaskDialog.openDialog()
        },
        //提交任务
        submitTask() {
            this.$refs.checkStatusDialog.openDialog()
        },
        //设置任务
        setTask() {
            this.$refs.setProductProgressDialog.openDialog()
        },
        editOperation(row,id) {
            switch (id) {
                case 1 :
                     this.$refs.createTaskDialog.openDialog()
                break;
                case 2 :
                    this.$refs.developProductPssDialog.openDialog()
                break;
                case 3 :
                    this.openRecordDialog()
            }
           

        },
        putOperation(row,id) {
            let detailDialog = this.$refs.checkStatusDialog
            switch (id) {
                case 1 :
                     detailDialog.openDialog()
                     detailDialog.type = true
                     detailDialog.dialogName = '审批'
                break;
                case 2 :
                    detailDialog.openDialog()
                    detailDialog.type = false
                    detailDialog.dialogName = '打回'
                break;
            }
        },
        openOperation() {

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
                // proImageList:GetFileServiceUrl(),
                mainBtn:false,
                Mark:null,
                showAllbutton:false,
                BusinessName:'CameraTask',
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
            getEmployee().then(res => {
                this.employee = res.data
            })
        },
        changeMaxHeight(){
            return window.innerHeight - 230 + 'px'
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

                    taskType:val ? val.taskType : null,//任务类型 4.场景视频  5.安装视频
                    accountType:val ? val.accountType : 'YT',//账号类型   YT  TP
                    status:status,//状态  1:未拍摄  2：待分配   3：待拍摄   4：拍摄种   5：已完成
                    priority:val ? val.priority : null,//任务优先级  10 ： 低    20：中     30：高
                    operator:val ? val.operator : null,//摄像人员
                    bigDepartmentLeader:val ? val.bigDepartmentLeader :null,//品类经理
                    bigDepartmentLeaderName:val ? val.bigDepartmentLeaderName :null,//品类经理
                    dateType:val ? val.dateType :1,
                    // parametersType:val ? val.parametersType :null,
                    // parameters:val ? val.parameters :null,
                }
            

            // getCameraTasks(params).then(res => {
            //     if(res.data){
            //         this.loading = false
            //         this.mainTaskList = res.data.rows
            //         this.total = res.data.records;
            //         this.currentPage4 = res.data && res.data.pageNum ? res.data.pageNum : 1
            //     }
            // }).catch(err => {
            //     if(err == 1){
            //         this.loading = true     
            //     }else {
            //         this.loading = false     
            //     }
            // })
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
    .rightBottom-title {
        position:absolute;bottom:2px;right:2px;border:1px dashed #ccc;width: 45px;height: 17px;line-height: 17px;
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
        // float: left;
        background-image: url(~@/assets/bianji.png);
        cursor: pointer !important;
        margin: 0px 10px;
    }
    .imageHistoryBox{
        height: 23px;
        width: 23px;
        // float: left;
        background-image: url(~@/assets/shenhe.png);
        cursor: pointer !important;
    }
    .button-put{
            // width: 100px;
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
        // float: right;
        position: fixed;
        bottom: 10px;
        right: 30px;
    }
    .operationBox{
        width: 120px;
    .operationText{
        .nameBox{
            width: 120px;
            line-height: 7px;
            font-size: 12px;
            border-bottom: 1px solid #cccccc;
            padding: 10px 0px;
            &:hover{
                background-color: #3366cc;
                color: #ffffff;
                cursor: pointer;
            }
        }
    }
}
</style>