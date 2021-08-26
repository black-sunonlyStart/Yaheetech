<template>
    <div>
        <el-row class="textSpeaing">
            <el-col :span="10">
                产品中文概述:
            </el-col>
            <el-col :span="10">
                业务开发:
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                英文标题:
            </el-col>
            <el-col :span="10">
                采购开发:
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                德文标题:
            </el-col>
            <el-col :span="10">
                US Duty税率:
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                日文标题:
            </el-col>
            <el-col :span="10">
                DE Duty税率:
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                英文关键词:
            </el-col>
            <el-col :span="10">
                GB Duty税率:
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                开发优先级:
            </el-col>
            <el-col :span="10">
                是否安吉产品:
            </el-col>
        </el-row>
        <el-row class="textSpeaing" >
            <el-col :span="10">
                是否需要专利确认:
            </el-col>
        </el-row>
        <el-row class="textSpeaing" >
            <el-col :span="24">
                <div class="tableTitle">Amazon-GB-英国仓: 销售中   可用库存(421)</div>
                <el-table
                     border
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                        prop="date"
                        label="类型"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="基准价"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="利润">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="运费">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="PI">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="海运费成本">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="税费">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="平台费">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="海外仓成本">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="可抵扣税费">
                    </el-table-column>
                </el-table>
                <div class="tableBottomTitle">运输方式(自有/SFP)：GB_RoyalMail_Tracked48 / GB_DPD_Prime    汇率:8.58</div>
            </el-col>
        </el-row>
        
    </div>
</template>
<script>
export default {
    data(){
        return {
             tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    }
}
</script>
<style lang="scss" scoped>
.textSpeaing{
    margin-top: 15px;
}
.tableTitle{
    border: 1px solid #EBEEF5;
    text-align: center;
    height: 30px;
    line-height: 30px;
}
.tableBottomTitle{
    border: 1px solid #EBEEF5;
    text-align: end;
    height: 30px;
    line-height: 30px;
    padding-right: 10px;
}
</style>