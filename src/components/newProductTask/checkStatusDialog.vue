<template>
    <div>
        <el-dialog
            :visible.sync="dialogVisible"
            width='800px'
            :modal='false'
            class="dialogBox"
            v-dialogDrag
            zIndex="3000"
            >
            <div class="titleText" slot="title">
                {{this.dialogName}}
            </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm" size='mini'>
                <div v-if="showType ==1">
                    <el-form-item label="提交至：" prop="status">
                        <el-select 
                            v-model="ruleForm.status"
                            :loading="clickLoading"
                            >
                            <el-option 
                                v-for="item in status"                        
                                :key="item.state"
                                :label="item.statusValue"
                                :value="item.state"
                                >
                            </el-option>
                        </el-select> 
                    </el-form-item>
                    <!-- <el-form-item label="当前状态累计耗时：">
                        {{ruleForm.pdStatuses ? ruleForm.pdStatuses.sjDay : '--' }}天 <span class="link-type" @click="checkProdetail()">查看详情</span>
                    </el-form-item>
                    <el-form-item label="预期对比：" prop="sjDay">
                          <span v-if="ruleForm.pdStatuses" :style="{color:showSjDay(ruleForm.pdStatuses.sjDay,ruleForm.pdStatuses.yjDay,1)}">{{ showSjDay(ruleForm.pdStatuses.sjDay,ruleForm.pdStatuses.yjDay)}}</span>  
                          <span v-else> -- </span>
                    </el-form-item> -->
                    <el-form-item label="延期必要说明：" prop="remark" v-if="showRemark">
                        <el-input v-model="ruleForm.remark" type="textarea" maxlength="500" show-word-limit></el-input>
                        <div>
                            所选数据中（<span>{{this.delayList}}</span>）已经延期，需填写延期说明
                        </div>
                    </el-form-item>
                </div>
                <div v-if="showType == 2">
                    <el-form-item label="打回至：" prop="status">
                        <el-select 
                            v-model="ruleForm.status"
                            :loading="clickLoading"
                            >
                            <el-option 
                                v-for="item in status"                        
                                :key="item.state"
                                :label="item.statusValue"
                                :value="item.state"
                                >
                            </el-option>
                        </el-select> 
                    </el-form-item>
                    <el-form-item label="打回原因：" prop="remark">
                        <el-input v-model="ruleForm.remark" type="textarea" maxlength="500" show-word-limit></el-input>
                    </el-form-item>
                </div>
                <div v-if="showType == 3">
                    <el-form-item label="取消原因：" prop="remark" >
                        <el-input v-model="ruleForm.remark" type="textarea" maxlength="500" show-word-limit></el-input>
                    </el-form-item>
                </div>
                <div v-if="showType == 4">
                     <el-form-item label="分配负责人：" prop="assigneeId">
                        <el-select 
                            v-model="ruleForm.assigneeId"
                            :loading="clickLoading"
                            >
                            <el-option 
                                v-for="item in assigneeIdList"                        
                                :key="item.Id"
                                :label="item.TrueName"
                                :value="item.Id"
                                
                                >
                            </el-option>
                        </el-select> 
                    </el-form-item>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button 
                    type="primary" 
                    @click="submitList('ruleForm')" 
                    size="mini" 
                    v-track="{triggerType:'click',currentUrl: $route.path,behavior:'确定',behavior:dialogName,shouldUpdate:'1'}"
                    :loading="clickLoading"
                >确 定</el-button>
                <el-button 
                    @click="resetForm('ruleForm')" 
                    size="mini" 
                    v-track="{triggerType:'click',currentUrl: $route.path,behavior:'取消',behavior:dialogName,shouldUpdate:'1'}"
                >取 消</el-button>
            </span>
        </el-dialog>

        <el-dialog
            :visible.sync="dialogVisibleDetail"
            width="530px"
            :modal="false"
            top="150px"
            class="dialogBox"
            v-dialogDrag
            >
            <div class="titleText" slot="title">
                查看详情
            </div>
            <el-table
                :data="tableData"
                style="width: 100%;"
                border
                :empty-text="M2('暂无数据')"
                :header-cell-style="{background:'#f5f7fa',color:'#606266'}"
                :summary-method="getSummaries"
                show-summary
                >
                <el-table-column
                    prop="recodeType"
                    label="序号"
                    align="center"
                    width="60">
                    <template slot-scope="scope">
                        <div>{{scope.$index + 1}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="beginTime"
                    label="开始时间"
                    align="center"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="endTime"
                    label="结束时间"
                    align="center"
                    width="150"
                    >
                </el-table-column>
                <el-table-column
                    prop="sjDay"
                    label="耗时（天）"
                    align="center"
                    >
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisibleDetail = false" class="button-style" size="mini">关 闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { approvalMemo,progressfreezing,getRemain,getSpecifyAssigneeIds,saveAssigneeId} from '@/api/user.js'
export default {
    name:'checkStatusDialog',
    data(){
        return {
            showType:1,
            clickLoading:false,
            ruleForm:{
                status:null,
                assigneeId:null,
                remark:'',
                pdStatuses:[
                    {
                       yjDay:0,
                       sjDay:0
                    }
                ]
            },
            tableData:[],
            dialogName:'审批',
            dialogVisible: false,
            dialogVisibleDetail: false,
            rules: {
                remark: [
                    { required: true, message: '请输入必填项！', trigger: 'blur' },
                ],
                status: [
                    { required: true, message: '请选择状态！', trigger: 'blur' },
                ],
                assigneeId: [
                    { required: true, message: '请选择经办人！', trigger: 'blur' },
                ],
            },
            status:[
                
            ],
            rowList:[],
            delayList:[],
            assigneeIdList:[],
            id:1,
            showRemark:false,
            cancelParams:{},
        }
    },
    props:{
        navFilterList:{
            type:Object,
            default:() => {}
        }
    },
    mounted(){

    },
    methods:{
        //提前延期时间对比
        showSjDay(sjDay,yjDay,val) {
            if(sjDay - yjDay == 0){
                if(val == 1) {
                    return ''
                }
                return '-'
            }else if(  sjDay - yjDay > 0) {
                if(val == 1) {
                    return '#0F7535'
                }
                return `提前${sjDay - yjDay}天`
            }else if(sjDay - yjDay < 0) {
                if(val == 1) {
                    return '#D00606'
                }
                return `延期${yjDay - sjDay}天`
            }
        },
        checkProdetail() {
            this.dialogVisibleDetail = true
        },
        openDialog(rowList,id){
            this.showRemark = false
            this.assigneeIdList = {}
            this.clickLoading = true
            this.status = {}
            let param = {
                progressDevelopmentId:rowList[0].id, //为列表id字段
                operation:id - 1
            }
            this.rowList = rowList
            this.id = id
            if(this.showType == 1 || this.showType == 2) {
                getRemain(param).then(res => {
                    if(res.code == 200) {
                        this.status = res.data
                        if(res.data.length == 1) {
                            this.$set(this.ruleForm,'status',res.data[0].state)
                        }else {
                            this.$set(this.ruleForm,'status',null)
                        }
                        if(this.rowList.some(item => item.statusDelay == true)) {
                            this.showRemark = true
                            this.delayList = this.rowList.map(item => {
                                return item.id
                            }).toString()
                        }
                        this.clickLoading = false
                    }else {
                        this.dialogVisible = false
                    } 
                }).catch(res => {
                    this.clickLoading = false
                    this.dialogVisible = false
                })
            }else if(this.showType == 4){
                let params =  {
                    design:rowList[0].design
                }
                getSpecifyAssigneeIds(params).then(res => {
                    this.assigneeIdList = res.data
                    this.clickLoading = false

                }).catch(res => {
                    this.clickLoading = false
                    this.dialogVisible = false
                })
            }
           
            this.dialogVisible = true
            this.$nextTick(() => {
                if(this.$refs['ruleForm']) this.$refs['ruleForm'].resetFields()
            })
        },
        cancelStatusDialog(operation,ids) {
            this.cancelParams = {
                operation,
                ids
            }
            this.dialogVisible = true
        },
        resetForm() {
            if(this.$refs['ruleForm']) this.$refs['ruleForm'].resetFields()
            this.dialogVisible = false
        },
        submitList(formName){

            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.clickLoading = true
                    if(this.showType == 3) {
                         let param = {
                            progressDevelopmentIds:this.cancelParams.ids,
                            operation:this.cancelParams.operation,
                            whyNote:this.ruleForm.remark,
                        }
                        progressfreezing(param).then(res => {
                            if(res.code == 200) {
                                this.successSaveDialog()
                            }
                        })
                    }else if(this.showType == 4) {
                        let param = {
                            assigneeId:this.ruleForm.assigneeId,
                            progressDevelopmentIds:this.rowList.map(item => {return item.id})
                        }
                        saveAssigneeId(param).then(res => {
                            if(res.code == 200) {
                                this.successSaveDialog()
                            }
                        })
                    }
                    else {
                        let params = this.rowList.map(item => {
                            return {
                                progressDevelopmentId:item.id,//列表id
                                operation:this.id -1,//0：提交  1：打回//0：提交  1：打回
                                toState:this.ruleForm.status,
                                whyNote:this.ruleForm.remark,
                            }
                        })
                        approvalMemo(params).then(res => {
                            if(res.code == 200){
                                this.successSaveDialog()
                            }
                        }).catch((err) => {
                            this.clickLoading = false
                        })
                    } 
                }
            })
        },
        successSaveDialog() {
            this.$message({
                type: 'success', 
                message:'保存成功',
                offset:220
            })
            this.$emit('mainListList',this.navFilterList)
            this.$refs['ruleForm'].resetFields();
            this.dialogVisible = false 
            this.clickLoading = false
        },
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '合计';
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                    const value = Number(curr);
                    if (!isNaN(value)) {
                        return prev + curr;
                    } else {
                        return prev;
                    }
                    }, 0);
                    sums[index] += '';
                } else {
                    sums[index] = '';
                }
            });
            return sums;
        }
    }  
}
</script>
<style lang="scss" scoped>
.titleText{
    width: 100%;
    height: 30px;
    font-weight: bold;
    font-size: 16px;
    line-height: 30px;
}
::v-deep.dialogBox{
    margin-top: 60px;
    .el-dialog__header{
        .el-dialog__headerbtn {
            top: 15px;
        }
        border-bottom: 1px solid #cccccc;
        padding: 5px;
    }
    .a-link {
       color: #3366cc;
       cursor: pointer;
    }
}
</style>