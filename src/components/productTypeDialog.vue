<template>
    <div class="dialogBox">
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%">
            <el-input v-model="selectTreeData" disabled size="mini"></el-input>
            <el-tree 
                :data="treeData"
                :props="defaultProps"
                node-key="id"
                ref="treeForm"
                check-strictly
                @node-click='handleNodeClick'
            ></el-tree>
            
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="putTreeNode">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { queryAllCategory } from '@/api/user.js'
export default {
    name:'productTypeDialog',
    data(){
        return {
            selectTreeid:'',
            selectTreeData:'',
            dialogVisible: false,
            treeData:[],
            checkedId:'',
            defaultProps: {
                children: 'categoryVos',
                label: 'headLine'
            }
        }
    },
    mounted(){
        this.getTreeList()
    },
    methods:{
        putTreeNode(){
            this.$emit('putTreeDialogList',this.selectTreeData,this.selectTreeid)
            this.dialogVisible = false
        },
        getTreeList(){
            queryAllCategory().then(res => {
                this.treeData = res.data
            })
        },
        openDialog(){
            this.dialogVisible = true
        },
        handleNodeClick(data,nodeObj) {
           if(nodeObj.level == 3){
               this.selectTreeData = nodeObj.parent.parent.data.headLine + '>>' + nodeObj.parent.data.headLine  + '>>' + nodeObj.data.headLine
               this.selectTreeid = nodeObj.data.id
           }else if (nodeObj.level == 2){
               this.selectTreeData = nodeObj.parent.data.headLine  + '>>' +  nodeObj.data.headLine
           }else if(nodeObj.level == 1){
               this.selectTreeData = nodeObj.data.headLine
           }
        },
    }
}
</script>
<style lang="scss" scoped>
::v-deep.dialogBox{
    .el-dialog__body{
        max-height: 478px;
        overflow: hidden;
        overflow-y: auto;
    }
}
</style>