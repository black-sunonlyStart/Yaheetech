<template>
    <div>
        <el-row class="textSpeaing">
            <el-col :span="10">
                分配采购开发员:
            </el-col>
            <el-col :span="10">
                产品类型:
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                产品尺寸:
            </el-col>
            <el-col :span="10">
                产品体积:
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                包装尺寸(发货用):
            </el-col>
            <el-col :span="10">
                包装体积(发货用):
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                外箱尺寸(装柜用):
            </el-col>
            <el-col :span="10">
                外箱体积(装柜用):
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                外箱重量(装柜用):
            </el-col>
            <el-col :span="10">
                每个产品所占体积:
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                净重:
            </el-col>
            <el-col :span="10">
                毛重(发货用):
            </el-col>
        </el-row>
        <el-row class="textSpeaing" >
            <el-col :span="10">
                物流周长加长(美国):
            </el-col>
            <el-col :span="10">
                物流周长加长(非美国):
            </el-col>
        </el-row>
        <el-row class="textSpeaing" >
            <el-col :span="10">
                选择发货货柜:
            </el-col>
            <el-col :span="10">
                可装货柜数量:
            </el-col>
        </el-row>
        <el-row class="textSpeaing" >
            <el-col :span="10">
                包装方式:
            </el-col>
        </el-row>
        <el-row class="textSpeaing" >
            <el-col :span="3">
                体积重：
            </el-col>
            <el-col :span="21">
                
                <el-table
                     border
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                        prop="date"
                        label="非澳洲=长*宽*高/6000"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="美国FedEx体积重=长*宽*高/9935"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="美国UPS体积重=长*宽*高/9950">
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row class="textSpeaing" >
            <el-col :span="3">
                多箱清单：
            </el-col>
            <el-col :span="21">
                
                <el-table
                     border
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                        prop="date"
                        label="箱数"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="包装尺寸"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="毛重">
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row class="textSpeaing" >
            <el-col :span="3">
                销售（多）属性：
            </el-col>
            <el-col :span="21">
                
                <el-table
                     border
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                        prop="date"
                        label="开发状态"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="SKU ID"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="开发属性">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="关联SKU">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="是否上架">
                    </el-table-column>
                </el-table>
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