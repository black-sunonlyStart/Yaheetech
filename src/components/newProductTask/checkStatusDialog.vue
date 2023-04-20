<template>
    <div>
        <el-dialog
            :visible.sync="dialogVisible"
            width='800px'
            :modal='false'
            class="dialogBox"
            v-dialogDrag
            v-loading='loading'
            >
            <div class="titleText" slot="title">
                {{this.dialogName}}
            </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm" size='mini'>
                <div v-if="type">
                    <el-form-item label="提交至：" prop="status">
                        <el-select 
                            v-model="ruleForm.status"
                            >
                            <el-option 
                                v-for="item in status"                        
                                :key="item.status"
                                :label="item.statusValue"
                                :value="item.status"
                                >
                            </el-option>
                        </el-select> 
                    </el-form-item>
                    <el-form-item label="当前状态累计耗时：" prop="remark">
                        {{ }} <span class="link-type" @click="checkProdetail()">查看详情</span>
                    </el-form-item>
                    <el-form-item label="延期对比：" prop="remark">
                        
                    </el-form-item>
                    <el-form-item label="延期必要说明：" prop="remark">
                        <el-input v-model="ruleForm.remark" type="textarea" maxlength="500" show-word-limit></el-input>
                    </el-form-item>
                </div>
                <div v-else>
                    <el-form-item label="打回至：" prop="status">
                        <el-select 
                            v-model="ruleForm.status"
                            >
                            <el-option 
                                v-for="item in status"                        
                                :key="item.status"
                                :label="item.statusValue"
                                :value="item.status"
                                >
                            </el-option>
                        </el-select> 
                    </el-form-item>
                    <el-form-item label="打回原因：" prop="remark">
                        <el-input v-model="ruleForm.remark" type="textarea" maxlength="500" show-word-limit></el-input>
                    </el-form-item>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button 
                    type="primary" 
                    @click="submitList('ruleForm')" 
                    size="mini" 
                    v-track="{triggerType:'click',currentUrl: $route.path,behavior:'确定',behavior:dialogName,shouldUpdate:'1'}"
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
                :header-cell-style="{background:'#f5f7fa',color:'#606266'}"
                >
                <el-table-column
                    prop="recodeType"
                    label="序号"
                    align="center"
                    width="60">
                </el-table-column>
                <el-table-column
                    prop="developName"
                    label="开始时间"
                    align="center"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="quantity"
                    label="结束时间"
                    align="center"
                    width="150"
                    >
                </el-table-column>
                <el-table-column
                    prop="recodeTime"
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
import { cancelExploit } from '@/api/user.js'
export default {
    name:'checkStatusDialog',
    data(){
        return {
            type:true,
            loading:false,
            ruleForm:{
                platformid:0,
                status:'',
                type:'',
                remark:'',
                dailySales:'',
            },
            tableData:[],
            dialogName:'审批',
            dialogVisible: false,
            dialogVisibleDetail: false,
            rules: {
                remark: [
                    { required: true, message: '请输入备注', trigger: 'blur' },
                ],
                status: [
                    { required: true, message: '请选择状态', trigger: 'blur' },
                ],
                type: [
                    { required: true, message: '请选择类型', trigger: 'blur' },
                ],
                dailySales: [
                    { required: true, message: '请选择采购开发', trigger: 'blur' },
                ],
                platformid: [
                    { required: true, message: '请选择开发优先级', trigger: 'blur' },
                ],
            },
            status:[
                 {
                     key:1,
                     statusValue:'未提交审批',
                     status:1,
                 },
                 {
                     key:2,
                     statusValue:'待审批',
                     status:2,
                 },
                 {
                     key:3,
                     statusValue:'采购数据不完整/错填',
                     status:3,
                 },
            ],
        }
    },
    mounted(){

    },
    methods:{
        checkProdetail() {
            this.dialogVisibleDetail = true
        },
        openDialog(){
            this.dialogVisible = true
        },
        resetForm() {
            this.ruleForm = {}
            this.dialogVisible = false
        },
        submitList(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let  params = {
                        productCountryId:this.row.id,
                        whyNote:this.ruleForm.remark
                    }
                    cancelExploit(params).then(res => {
                        if(res.code == 200){
                            this.$message({
                                type: 'success', 
                                message:'保存成功',
                                offset:220
                            })
                            this.$emit('getTableList',this.navFilterList)
                            this.$refs['ruleForm'].resetFields();
                            this.dialogVisible = false 
                            this.loading = false
                        }
                    }).catch((err) => {
                        this.loading = false
                    })
                }
            })
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