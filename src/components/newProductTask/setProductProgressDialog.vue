<template>
    <div>
        <el-dialog
            title="设置"
            :visible.sync="dialogVisible"
            width="800px"
            :modal="false"
            top="100px"
            class="dialog-main"
            v-dialogDrag
            zIndex="3000"
            >
            <el-table
                :data="tableData"
                style="width: 100%;margin-top:10px"
                height="550"
                border
                :empty-text="M2('暂无数据')"
                :header-cell-style="{background:'#f5f7fa',color:'#606266'}"
                >
                <el-table-column
                    prop="statusValue"
                    label="环节"
                    align="center"
                    width="150">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="预定耗时（天）"
                    width="600"
                    >
                    <template slot-scope="scope">
                       <div style="display:flex">
                            <div :style="{width:scope.row.state == 18? '45%':'100%',display:'flex'}">
                                <div v-if="scope.row.state == 18" style="width:75px;flex-shrink: 0;">已有供应商：</div>
                                <el-input type="text" v-model.number="scope.row.stateTime" size="mini" oninput="value=value.replace(/^\D*([0-9]\d*\.?\d{0,2})?.*$/,'$1')"></el-input>
                            </div>
                            <div style="width:5%"></div>
                            <div v-if="scope.row.state == 18" style="width:45%;display:flex">
                                <div style="width:75px;flex-shrink: 0;">全新供应商：</div>
                                <el-input type="text" v-model.number="scope.row.stateTime1" size="mini" oninput="value=value.replace(/^\D*([0-9]\d*\.?\d{0,2})?.*$/,'$1')"></el-input>
                            </div> 
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveSetProgerss()" class="button-style" size="mini" :loading="loadingTutton">保 存</el-button>
                <el-button  @click="dialogVisible = false" class="button-style" size="mini">关 闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getStateTime,saveStateTime } from '@/api/user.js'
export default {
    name:'setProductProgressDialog',
    data() {
        return {
            dialogVisible: false,
            loadingTutton: false,
            tableData: []
        };
    },
    methods: {
        btnClickBotton(index,editName,value) {
            this.$set(this.tableData[index],editName,value)
        },
        openUrl(url) {
            let rurl = `http://jira.yaheecloud.com:8080/browse/${url}`
            window.open(rurl)
        },
        openDialog(){
            this.dialogVisible = true
            getStateTime().then(res => {
                if(res.code == 200){
                    this.tableData = res.data
                }
            })
        },
        saveSetProgerss() {
            this.loadingTutton = true
            saveStateTime(this.tableData).then(res => {
                if(res.code == 200) {
                    this.$message({
                        type: 'success', 
                        message:'保存成功',
                        offset:220
                    })
                    this.dialogVisible = false
                }
                this.loadingTutton = false
            }).catch((err) => {
                this.loadingTutton = false
            })
        }
    }
}
</script>

<style scoped lang="scss">
::v-deep.dialog-main{
    .el-dialog__header{
        border-bottom: 1px solid #ccc;
        padding: 10px 0 10px 20px;
        .el-dialog__title{
            font-weight: bold;
        }
    }
    .el-dialog__body{
        padding: 0 20px 20px !important;
        max-height: 600px;
        overflow-y: auto;
    }
}
</style>