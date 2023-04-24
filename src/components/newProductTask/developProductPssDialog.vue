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
                :summary-method="getSummaries"
                show-summary
                :header-cell-style="{background:'#f5f7fa',color:'#606266'}"
                >
                <el-table-column
                    align="center"
                    label="状态"
                    width="180"
                    >
                    <template slot-scope="scope">
                         <span >{{scope.row.statusValue}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="assigneeName"
                    label="负责人"
                    align="center"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="sjDay"
                    label="累计耗时（天）"
                    align="center"
                    width="180">
                </el-table-column>
                <el-table-column
                    label="预期对比"
                    align="center"
                    >
                     <template slot-scope="scope">
                         <span :style="{color:showSjDay(scope.row.sjDay,scope.row.yjDay,1)}">{{ showSjDay(scope.row.sjDay,scope.row.yjDay)}}</span>  
                    </template>
                </el-table-column>
                <el-table-column
                    prop="recodeTime"
                    label="开始/结束时间"
                    align="center"
                    width="200"
                    >
                     <template slot-scope="scope">
                         <div v-for="(item,index) in scope.row.statusTimesDetail" :key="index" >{{item.beginTime + '/' + item.endTime}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="延期必要说明"
                    align="center"
                    >
                   <!-- <template slot-scope="scope">
                        <div style="padding-bottom: 20px;">
                            <div v-if="!scope.row.canEditDevelopName">
                                <el-popover placement="right" :close-delay="2000" trigger="hover" effect="light" :visible-arrow='false' popper-class='popperBorder' style="padding:0;border:none">
                                    <span  class="copeTitle" @click="btnClickBotton(scope.$index,'canEditDevelopName',true)">
                                        <i class="el-icon-edit" ></i>
                                    </span>
                                    <span  slot="reference">
                                        <span class="undelineBox" >
                                            {{scope.row.whyNote ? scope.row.whyNote : '--'}}
                                        </span>
                                    </span>
                                </el-popover>
                            </div> 
                            <span class="timeSelectBox" v-else>
                                 <el-input v-model="scope.row.whyNote" type="textarea" rows="2" maxlength="500" show-word-limit></el-input>
                                <i class="el-icon-check isIconBox" @click="saveClickBotton(scope.row,scope.$index)"></i> <i @click="btnClickBotton(scope.$index,'canEditDevelopName',false)" class="el-icon-close isIconBox"></i>
                            </span> 
                        </div>
                    </template> -->
                      <template slot-scope="scope">
                         <div v-for="(item,index) in scope.row.statusTimesDetail" :key="index" >{{item.whyNote ? item.whyNote :'--'}}</div>
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
import { getProgressDevelopmentMemo,saveMemo } from '@/api/user.js'
export default {
    name:'developProductPssDialog',
    data() {
        return {
            dialogVisible: false,
            syColor: '',
            tableData: [
                {
                   quantity:1, 
                }
            ]
        };
    },
    methods: {
        showSjDay(sjDay,yjDay,val) {
             if(!sjDay || !yjDay ||  sjDay - yjDay == 0){
                 if(val == 1) {
                    return ''
                }
                return '-'
             }else if(  sjDay - yjDay > 0) {
                if(val == 1) {
                    return '#0F7535'
                }
                return `提前${sjDay - yjDay}天`
             }else if(sjDay - yjDay < 0) {
                if(val == 1) {
                    return '#D00606'
                }
                 return `延期${sjDay - yjDay}天`
             }
        },
        saveClickBotton(row,index) {
            let param = [
                {
                    id:row.id,
                    note:row.whyNote
                }
            ]
            saveMemo(param).then(res => {
                if(res.code == 200 ) {
                    this.$message.success('保存成功！')
                    this.$set(this.tableData[index],'canEditDevelopName',false)
                }
            })
        },
        btnClickBotton(index,editName,value) {
            this.$set(this.tableData[index],editName,value)
        },
        openDialog(params){
            this.dialogVisible = true
            
            getProgressDevelopmentMemo(params.id).then(res => {
                if(res.code == 200){
                    this.tableData = res.data

                }
            })
        },
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
            if (index === 0) {
                sums[index] = '合计';
                return;
            }
            const values = data.map(item => Number(item[column.property]));
            if (!values.every(value => isNaN(value))) {
                sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                    return prev + curr;
                } else {
                    return prev;
                }
                }, 0);
                sums[index] += '';
            } else {
                sums[index] = '';
            }
            });

            return sums;
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
        max-height: 450px;
        overflow-y: auto;
    } 
}
 ::v-deep.timeSelectBox {
        display: inline-block;
        .el-input__icon{
            line-height: 20px;
        }
        .isIconBox{
            position: relative;
            top: -3px;
            left: 75px;
            font-size: 15px;
            border: 1px solid #ccc;
            cursor: pointer;
            z-index: 11111;
        }
    }
    .textId-box{
        color: #3089dc;
        cursor: pointer;
    }

</style>