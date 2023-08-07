<template>
    <div>
        <el-dialog
            :visible.sync="dialogVisible"
            width="40%"
            :title="titleText"
            :modal-append-to-body="false"
            v-dialogDrag
            class="dialog-main"
            :modal='false'
            >
            <slot></slot>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data(){
        return {
            dialogVisible: false,
        }
    },
    props:{
        titleText:{
            type:String,
            default:() => ('')
        }
    },
    methods:{
        openCommonDialog(){
            this.dialogVisible = true
        },
        closeCommonDialog(){
            this.dialogVisible = false
        }
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