<template>
    <div class="dialogBox">
        <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="600px"
            class="dialog-main"
            top="25vh"
            v-dialogDrag
            >
             <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" size='mini'>
                <div v-if="id == 1">
                    <el-form-item label="单号">
                        {{mainList[0].id}}
                    </el-form-item>
                    <el-form-item label="取消原因：" prop="whyNote">
                        <el-input size="mini" type="textarea" v-model="ruleForm.whyNote" :rows="5" ></el-input>
                    </el-form-item>
                </div>
                <el-form-item label="样品确认员：" prop="sampleValidator" v-if="id == 2">
                    <el-select 
                        v-model="ruleForm.sampleValidator"
                        >
                        <el-option 
                            v-for="item in roleList"                        
                            :key="item.Id"
                            :label="item.TrueName"
                            :value="item.Id"
                            >
                        </el-option>
                    </el-select> 
                </el-form-item>
                <div v-if="id == 3">
                    <el-form-item label="样品确认日期：" prop="sampleConfirmationTime">
                        <el-date-picker
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            size="mini"
                            :picker-options="setDisabled"
                            v-model="ruleForm.sampleConfirmationTime"
                            type="date"
                            :key="Math.random()"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="样品确认结果：" prop="sampleConfirmationResult">
                        <el-select 
                            v-model="ruleForm.sampleConfirmationResult"
                            >
                            <el-option 
                                v-for="item in sampleResultList"                        
                                :key="item.key"
                                :label="item.label"
                                :value="item.value"
                                >
                            </el-option>
                        </el-select> 
                    </el-form-item>
                </div>
                <div v-if="id == 4">
                    <el-form-item label="单号">
                        {{mainList[0].id}}
                    </el-form-item>
                    <el-form-item label="打回原因：" prop="whyNote">
                        <el-input size="mini" type="textarea" v-model="ruleForm.whyNote" :rows="5" ></el-input>
                    </el-form-item>
                </div>
             </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onSubmit('ruleForm')" :loading="buttonLoading" :disabled="buttonLoading" size="small">确 定</el-button>
                <el-button  @click="closeSubmit('ruleForm')" size="small">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { selectRoleEmployeeForRoleId,saveSampleValidator,approvalSampleMemo,cancelApplication,repulse } from '@/api/user.js'
var applicationTime = ''
export default {
    name:'sampleDialog',
    data(){
        return {
            buttonLoading:false,
            id:'',
            dialogVisible:false,
            title:'',
            mainList:[],
            roleList:[],
            sampleResultList:[
                {
                    label: '合格',
                    key: 1,
                    value:5
                },
                {
                    label: '改进后通过(产前样)',
                    key: 2,
                    value:6
                },    
                {
                    label: '不合格',
                    key: 3,
                    value:7
                }, 
            ],
            ruleForm:{
                whyNote:'',
                sampleValidator:'',
                sampleConfirmationTime:'',
                sampleConfirmationResult:'',
            },
            rules:{
                whyNote : [
                    { required: true, message: '请填写原因！', trigger:['change'] },
                ],
                sampleValidator : [
                     { required: true, message: '请选择样品确认员！', trigger:['change'] }
                ],
                sampleConfirmationTime : [
                     { required: true, message: '请选择样品确认日期！', trigger:['change'] }
                ],
                sampleConfirmationResult : [
                     { required: true, message: '请选择样品确认结果！', trigger:['change'] }
                ],
            },
             setDisabled: {
                disabledDate(time) {
                    if(applicationTime){
                        return time.getTime() > Date.now() || time.getTime() <= new Date(applicationTime).getTime() - 8.64e7 ;  // 可选历史天、可选当前天、不可选未来天
                    }else {
                        return time.getTime() > Date.now()
                    }
               
                // return time.getTime() > Date.now() - 8.64e7;  // 可选历史天、不可选当前天、不可选未来天
                // return time.getTime() < Date.now() - 8.64e7;  // 不可选历史天、可选当前天、可选未来天
                // return time.getTime() < Date.now(); // 不可选历史天、不可选当前天、可选未来天
                },
            },
        }
    },
    mounted(){
       
    },
    methods:{
        openDialog(list,id) {
            //id = 1 取消 id =2 分配 id= 3 提交样品结果
            if(id == 2) {
                let param = {
                    rid:552
                }
                selectRoleEmployeeForRoleId(param).then(res => {
                    this.roleList = res.data
                })
            }
            // this.ruleForm={
            //     whyNote:null,
            //     sampleValidator:list.sampleValidator,
            //     sampleConfirmationTime:list.sampleConfirmationTime,
            //     sampleConfirmationResult:list.sampleConfirmationResult,
            //     productSampleIds:list.map(res => { return res.id })
            // },
            applicationTime = list.applicationTime ? this.$moment(list.applicationTime).format("YYYY-MM-DD")  : this.$moment(list[0].applicationTime).format("YYYY-MM-DD")  
            let ids =  list.map(res =>  res.id )
            this.$set(this.ruleForm,'whyNote',null)
            this.$set(this.ruleForm,'applicationTime',list.applicationTime ? list.applicationTime :  list[0].applicationTime)
            this.$set(this.ruleForm,'sampleValidator',list.sampleValidator ? list.sampleValidator :  list[0].sampleValidator)
            this.$set(this.ruleForm,'sampleConfirmationTime',list.sampleConfirmationTime ? list.sampleConfirmationTime :  list[0].sampleConfirmationTime)
            this.$set(this.ruleForm,'sampleConfirmationResult',list.sampleConfirmationResult ? list.sampleConfirmationResult :  list[0].sampleConfirmationResult)
            this.$set(this.ruleForm,'productSampleIds', ids)
            this.id = id
            this.dialogVisible = true
            this.mainList = list
        },
        closeSubmit(formName){
            this.$refs[formName].resetFields();
            this.dialogVisible = false
            this.buttonLoading = false
        },
        onSubmit(formName){
            this.buttonLoading = true
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let statusF = null
                    if(this.id == 1) {
                        statusF = cancelApplication(this.ruleForm)
                    }else if(this.id == 2){
                        statusF = saveSampleValidator(this.ruleForm)
                    } else if(this.id == 3) {
                        statusF = approvalSampleMemo(this.ruleForm)
                    } else if(this.id == 4) {
                         statusF= repulse(this.ruleForm)
                    }
                    statusF.then((res) => {
                        this.buttonLoading = false
                        if(res.code == 200){
                            this.$message({
                                type: 'success', 
                                message:'保存成功',
                                offset:220
                            })
                    
                        this.dialogVisible = false
                        this.$refs[formName].resetFields();
                        this.$emit('mainListList')
                        }
                    }).catch(() => {
                        this.buttonLoading = false
                    });
                } else {
                    console.log('error submit!!');
                    this.buttonLoading = false
                    return false;
                }
            });
        }
    }
}
</script>
<style lang="scss" scoped>
::v-deep.dialog-main{
    .el-dialog__header{
        border-bottom: 1px solid #ccc;
        padding: 10px !important;
        .el-dialog__title{
            font-weight: bold;
        }
    }
    .el-dialog__body{
        padding: 10px 20px 20px !important;
        overflow-y: auto;
        max-height: 650px;
    } 
}
</style>