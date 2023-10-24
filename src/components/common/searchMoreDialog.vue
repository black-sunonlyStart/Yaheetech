<template>
    <div class="dialogBox">
        <el-dialog
            :title="M2(title)"
            :visible.sync="dialogVisible"
            width="30%"
            :modal-append-to-body="false"
            :close-on-click-modal='false'
            class="dialog-main"
            top="25vh"
            v-dialogDrag
            >
             <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="10px" class="demo-ruleForm" size='mini'>
                <el-form-item label="" prop="parametersType" >
                    <el-select 
                        v-model="ruleForm.parametersType"
                        >
                        <el-option 
                            v-for="item in cameraOperatorList"                        
                            :key="item.id"
                            :label="M2(item.name)"
                            :value="item.id"
                            >
                        </el-option>
                    </el-select> 
                </el-form-item>
                
                <el-form-item label="" prop="parameters">
                      <el-input size="mini" type="textarea" v-model="ruleForm.parameters" :rows="5"  @change="changeParameters"></el-input>
                </el-form-item>
                <div style="padding-left:10px">{{M2('多个sku或者sku别名用“，”隔开')}}</div>
             </el-form>
            
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onSubmit('ruleForm')" size="small">{{M2('确 定')}}</el-button>
                <el-button @click="dialogVisible = false" size="small">{{M2('取 消')}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name:'changepeopleDlog',
    data(){
        return {
            dialogVisible:false,
            title:'批量查询',
            cameraOperatorList:[
            {
                name:'SKU',
                id:0
            },
            {
                name:'SKU别名',
                id:1
            },
            {
                name:'开发id',
                id:2
            },
            ],
            ruleForm:{
            parametersType:0,
            parameters:'',
            },
            rules:{},
        }
    },
    methods:{
        openDialog() {
            this.dialogVisible = true
        },
        changeParameters(data) {
            this.ruleForm.parameters = data.replaceAll('\n',',').replaceAll('，',',')
        },
        onSubmit(formName){
            this.$emit('searchMorething',this.ruleForm)
            this.dialogVisible = false
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
    .el-form-item--mini.el-form-item {
        margin-bottom: 4px;
    } 
}
</style>