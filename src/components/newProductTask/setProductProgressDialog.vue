<template>
    <div>
        <el-dialog
            title="设置"
            :visible.sync="dialogVisible"
            width="800px"
            :modal="false"
            top="200px"
            class="dialog-main"
            v-dialogDrag
            >
            <el-table
                :data="tableData"
                style="width: 100%;margin-top:10px"
                height="350"
                border
                :header-cell-style="{background:'#f5f7fa',color:'#606266'}"
                >
                <el-table-column
                    prop="recodeType"
                    label="环节"
                    align="center"
                    width="150">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="items"
                    label="预定耗时（天）"
                    width="600"
                    show-overflow-tooltip
                    >
                    <template slot-scope="scope">
                       <el-input type="text"></el-input>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false" class="button-style" size="mini">关 闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// import { getWeekViewDetails } from '@/api/user.js'
export default {
    name:'setProductProgressDialog',
    data() {
        return {
            dialogVisible: false,
            tableData: []
        };
    },
    methods: {
        saveClickBotton() {

        },
        btnClickBotton(index,editName,value) {
            this.$set(this.tableData[index],editName,value)
        },
        openUrl(url) {
            let rurl = `http://jira.yaheecloud.com:8080/browse/${url}`
            window.open(rurl)
        },
        openDialog(params){
            this.dialogVisible = true
            
            // getWeekViewDetails(params).then(res => {
            //     if(res.data){
            //         this.tableData = res.data
            //     }
            // })
        }
    }
}
</script>

<style scoped lang="scss">
::v-deep.dialog-main{
    .el-dialog__header{
        border-bottom: 1px solid #ccc;
        .el-dialog__title{
            font-weight: bold;
        }
    }
    .el-dialog__body{
        padding: 0 20px 20px !important;
        max-height: 450px;
        overflow-y: auto;
       
    }
}

</style>