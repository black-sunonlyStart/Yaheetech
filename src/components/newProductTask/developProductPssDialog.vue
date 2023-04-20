<template>
    <div>
        <el-dialog
            title="开发任务进度"
            :visible.sync="dialogVisible"
            width="1200px"
            :modal="false"
            top="200px"
            class="dialog-main"
            v-dialogDrag
            >
            <el-table
                :data="tableData"
                style="width: 100%;margin-top:10px;"
                height="350"
                border
                :header-cell-style="{background:'#f5f7fa',color:'#606266'}"
                >
                <el-table-column
                    align="center"
                    prop="items"
                    label="状态"
                    width="180"
                    show-overflow-tooltip
                    >
                    <template slot-scope="scope">
                         <span class="textId-box" @click="openUrl(scope.row.items)">{{scope.row.items}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="recodeType"
                    label="负责人"
                    align="center"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="developName"
                    label="累计耗时（天）"
                    align="center"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="quantity"
                    label="预期对比"
                    align="center"
                    show-overflow-tooltip
                    >
                </el-table-column>
                <el-table-column
                    prop="recodeTime"
                    label="开始/结束时间"
                    show-overflow-tooltip
                    align="center"
                    width="200"
                    >
                </el-table-column>
                <el-table-column
                    prop="quantity"
                    label="延期必要说明"
                    align="center"
                    show-overflow-tooltip
                    >
                   <template slot-scope="scope">
                        <!-- <div >
                            <span>{{scope.row.foreignDevelopNames ? scope.row.foreignDevelopNames : '--'}}</span>                      
                        </div> -->
                        <div style="padding-bottom: 20px;">
                            <div v-if="!scope.row.canEditDevelopName">
                                <el-popover placement="right" :close-delay="2000" trigger="hover" effect="light" :visible-arrow='false' popper-class='popperBorder' style="padding:0;border:none">
                                    <span  class="copeTitle" @click="btnClickBotton(scope.$index,'canEditDevelopName',true)">
                                        <i class="el-icon-edit" ></i>
                                    </span>
                                    <span  slot="reference">
                                        <span class="undelineBox" >
                                            {{scope.row.quantity ? scope.row.quantity : '--'}}
                                        </span>
                                    </span>
                                </el-popover>
                            </div> 
                            <span class="timeSelectBox" v-else>
                                 <el-input v-model="scope.row.remark" type="textarea" rows="2" maxlength="500" show-word-limit></el-input>
                                <i class="el-icon-check isIconBox" @click="saveClickBotton(scope.row,1,'canEditDevelopName')"></i> <i @click="btnClickBotton(scope.row.rowIndex,'canEditDevelopName',false)" class="el-icon-close isIconBox"></i>
                            </span> 
                        </div>
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
    name:'developProductPssDialog',
    data() {
        return {
            dialogVisible: false,
            tableData: [
                {
                   quantity:1, 
                }
            ]
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
 ::v-deep.timeSelectBox {
        display: inline-block;
        .el-select{
            .el-input__inner{
            }   
        }
        .el-input__icon{
            line-height: 20px;
        }
        .isIconBox{
            position: relative;
            top: 21px;
            left: -47px;
            font-size: 15px;
            border: 1px solid #ccc;
            cursor: pointer;
            z-index: 11111;
        }
        .el-input__inner{
        }
    }
    .textId-box{
        color: #3089dc;
        cursor: pointer;
    }

</style>