<template>
    <div>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            >
            <span>说明:确定要把选择的产品提交给业务主管(经理)进行审批?</span>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="活动名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name:'messageDialog',
    data(){
        return {
            dialogVisible: false,
        }
    },
    props:{
        clickId:{
            type:Number,
            
        }
    },
    methods:{
         openDialog(){
            this.dialogVisible = true
        },
    }
    
}
</script>
<style lang="scss" scoped>

</style>