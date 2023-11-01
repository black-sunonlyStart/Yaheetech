<template>
    <div>
        <el-dialog
            :visible.sync="dialogVisible"
            width="40%"
            :title="M2('样品确认进度导出')"
            :modal-append-to-body="false"
            v-dialogDrag
            class="dialog-main"
            :modal='false'
            >
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" size='mini'>
                <el-form-item prop="date1">
                    <template slot="label">
                        {{M2('数据申请月份')}}:
                    </template>
                    <el-input v-model="ruleForm.date1" :placeholder="M2('开始月份，如2023-01')" style="width:220px" clearable></el-input>
                </el-form-item>
                <el-form-item prop="date2">
                    <template slot="label"></template>
                    <el-input v-model="ruleForm.date2" :placeholder="M2('结束月份，如2023-12')" style="width:220px" clearable></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="submitExport('ruleForm')" size="mini" type="primary">{{M2('确 定')}}</el-button>
                <el-button @click="dialogVisible = false" size="mini">{{M2('取 消')}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data(){
        return {
            rules:{
                date2:[
                    {
                        required:true,
                        validator: (rules, value, cb) => {
                            if(!this.ruleForm.date2){
                                return cb(new Error(this.M2("请填写结束月份！")));
                            }
                            if(!(/^\d{4}-\d{2}$/i.test(this.ruleForm.date2))){
                                return cb(new Error(this.M2("请填写正确的时间格式YYYY-MM,例：2023-12！")));
                            }
                            return cb();
                        },
                        trigger: "blur"
                    }
                ],
                date1:[
                    {
                        required:true,
                        validator: (rules, value, cb) => {
                            if(!this.ruleForm.date1){
                                return cb(new Error(this.M2("请填写开始月份！")));
                            }
                            if(!(/^\d{4}-\d{2}$/i.test(this.ruleForm.date1))){
                                return cb(new Error(this.M2("请填写正确的时间格式YYYY-MM,例：2023-01")));
                            }
                            return cb();
                        },
                        trigger: "blur"
                    }
                ],
            },
            ruleForm:{
                date1:null,
                date2:null,
            },
            dialogVisible: false,
        }
    },
    props:{

    },
    methods:{
        submitExport(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let date1 = this.ruleForm.date1.split('-')
                    let date2 = this.ruleForm.date2.split('-')
                    if(date1[0] != date2[0]){
                        this.$message({
                            type:'error',
                            offset:220,
                            message:this.M2('请填写相同年份的数据！')
                        })
                        return
                    }
                    if(date1[0] > date2[0] || date1[1] > date2[1]){
                        this.$message({
                            type:'error',
                            offset:220,
                            message:this.M2('开始时间不能大于结束时间！')
                        })
                        return
                    }
                    if(date1[1] > 12 || date2[1] > 12){
                        this.$message({
                            type:'error',
                            offset:220,
                            message:this.M2('请填写正确的时间格式！')
                        })
                        return
                    }
                    this.$emit('exprotSampleFile',this.ruleForm)
                    this.dialogVisible = false
               } else {
                    return false;
                }
            });
        },
        openCommonDialog(){
            this.clearFromValidate()
            this.$set(this.ruleForm,'date1',null)
            this.$set(this.ruleForm,'date2',null)
            this.dialogVisible = true
        },
        clearFromValidate(){
            setTimeout(() => {
                this.$refs['ruleForm'].clearValidate()
            }, 50);
        },
    }
}
</script>
<style scoped lang="scss">
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
    }
}
</style>