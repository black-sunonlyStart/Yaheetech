<template>
    <div>
        <el-row class="textSpeaing">
            <el-col :span="10">
                产品中文概述:<span>{{devInformationDetaiList.description}}</span>
            </el-col>
            <el-col :span="10">
                业务开发:<span>{{devInformationDetaiList.businessName}}</span>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                英文标题:<span>{{devInformationDetaiList.title}}</span>
            </el-col>
            <el-col :span="10">
                采购开发:<span>{{devInformationDetaiList.buyerName}}</span>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                德文标题:<span>{{devInformationDetaiList.titleDe}}</span>
            </el-col>
            <el-col :span="10">
                US Duty税率:<span>{{devInformationDetaiList.dutyrate1}}</span>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                日文标题:<span>{{devInformationDetaiList.titleJp}}</span>
            </el-col>
            <el-col :span="10">
                DE Duty税率:<span>{{devInformationDetaiList.dutyrate2}}</span>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                英文关键词:<span>{{devInformationDetaiList.keys}}</span>
            </el-col>
            <el-col :span="10">
                GB Duty税率:<span>{{devInformationDetaiList.dutyrate3}}</span>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                开发优先级:<span>{{devInformationDetaiList.priority }}</span>
            </el-col>
            <el-col :span="10">
                是否安吉产品:<span>{{devInformationDetaiList.isanji }}</span>
            </el-col>
        </el-row>
        <el-row class="textSpeaing" >
            <el-col :span="10">
                是否需要专利确认:<span>{{devInformationDetaiList.ispatentproduct}}</span>
            </el-col>
        </el-row>
        <el-row v-for="item in devInformationDetaiList.productMarketList" :key="item.id">
            <el-col :span="24">
                <div class="tableTitle">{{item.platformname}}: {{item.countrycode}}   {{item.warehouseName}}</div>
                <el-table
                     border
                    :data="[item]"
                    style="width: 100%">
                    <el-table-column
                        label="类型"
                        width="180">
                        <template>
                            <div>普通</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="基准价"
                        width="180"
                        prop="developmentprice"
                        >
                    </el-table-column>
                    <el-table-column
                        label="利润">
                        <template slot-scope="scope">
                            <div>{{scope.row.profit/scope.row.profitmargin*100}}</div>
                            <div>{{scope.row.endprofit/scope.row.endprofitmargin*100}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="运费">
                        <template slot-scope="scope">
                            <div v-if="scope.row.freightway == 1">{{scope.row.inlandportcosts+scope.row.oceanfreight+scope.row.outlandportcosts}}</div>
                            <div v-if="scope.row.freightway == 2">{{scope.row.oceanfreight}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="piprice"
                        label="PI">
                    </el-table-column>
                    <el-table-column
                        label="海运费成本">
                        <template slot-scope="scope">
                            <div>港前:{{scope.row.inlandportcosts}}</div>
                            <div>海运:{{scope.row.oceanfreight}}</div>
                            <div>目的港:{{scope.row.outlandportcosts}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="税费">
                        <template slot-scope="scope">
                            <div>进口DUTY:{{scope.row.duty}}</div>
                            <div>进口VAT:{{scope.row.vatfee}}</div>
                            <div>销售VAT:{{scope.row.salesvat}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="平台费">
                        <template slot-scope="scope">
                            <div>成交费:{{scope.row.platformfee}}</div>
                            <div>PayPal:{{scope.row.paypalprice}}</div>
                            <div>刊登费:{{scope.row.listingfee}}</div>  
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="海外仓成本">
                        <template slot-scope="scope">                          
                            <div>操作费:{{scope.row.handlingfee}}</div>
                            <div>发货包装:{{scope.row.packagingfee}}</div>
                            <div>本地化费:{{scope.row.localizationfee}}</div>   
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="developmentprice"
                        label="可抵扣税费">
                        <template slot-scope="scope">
                            <div>进口VAT:{{scope.row.vatfee}}</div>
                            <div>快递VAT:{{scope.row.localshippingfeevat}}</div>
                        </template>
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
    },
    props:{
        devInformationDetaiList:{
            type:Object,
            default:() => ({})
        }
    },
    mounted(){
        console.log(this.devInformationDetaiList,'3333333')
    }
}
</script>
<style lang="scss" scoped>
.textSpeaing{
    margin: 10px 0;
    font-weight: bold;
    span{
        font-weight:normal
    }
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