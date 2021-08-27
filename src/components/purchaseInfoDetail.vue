<template>
    <div>
        <el-row class="textSpeaing" >
            <el-col :span="2">
                <span>样品采购前报价：</span>
            </el-col>
            <el-col :span="22">
                <el-table
                     border
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                        prop="date"
                        label="选择"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="采购开发"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="最小起订量">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="首单下单数量">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="出厂价">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="FOB价">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="含税价">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="杂费">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="产品包装费">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="采购成本
                        净采购价+杂费+包装费">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="交期">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="装箱数量">
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row class="textSpeaing" >
            <el-col :span="2">
                <span>最终报价：</span>
            </el-col>
            
            <el-col :span="22">
                
                <el-table
                     border
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                        prop="date"
                        label="最小起订量"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="首单下单数量"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="出厂价">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="FBO价">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="含税价">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="杂费">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="产品包装费">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="采购成本
                        净采购价+杂费+包装费">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="交期">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="装箱数量">
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                样品购买价:
            </el-col>
            <el-col :span="10">
                含税价税点:
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                下大单返样品费:
            </el-col>
            <el-col :span="10">
                海关退税率:
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                返样品费详情备注:
            </el-col>
            <el-col :span="10">
                品牌费:
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                样品交期:
            </el-col>
            <el-col :span="10">
                FOB报价品牌费:
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                最终报价:
            </el-col>
            <el-col :span="10">
                FOB头程费:
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data(){
        return {
             tableData: [
                 {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
.textSpeaing{
    margin-top: 15px;
    font-weight: bold;
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