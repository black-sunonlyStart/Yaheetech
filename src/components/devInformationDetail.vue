<template>
    <div>
        <el-row class="textSpeaing">
            <el-col :span="10">
                产品中文概述:<span>{{devInformationDetaiList.description}}</span>
            </el-col>
            <el-col :span="10">
                业务开发:<span>{{devInformationDetaiList.businessProduct ?devInformationDetaiList.businessProduct:'' }}</span>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                英文标题:<span>{{devInformationDetaiList.title}}</span>
            </el-col>
            <el-col :span="10">
                采购开发:<span>{{devInformationDetaiList.orderProduct ? devInformationDetaiList.orderProduct:'' }}</span>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                德文标题:<span>{{devInformationDetaiList.titleDe}}</span>
            </el-col>
            <el-col :span="10">
                US Duty税率:<span>{{devInformationDetaiList.dutyrate1}}%</span>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                日文标题:<span>{{devInformationDetaiList.titleJp}}</span>
            </el-col>
            <el-col :span="10">
                DE Duty税率:<span>{{devInformationDetaiList.dutyrate2 || 3.91}}%</span>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                英文关键词:<span>{{devInformationDetaiList.keys}}</span>
            </el-col>
            <el-col :span="10">
                GB Duty税率:<span>{{devInformationDetaiList.dutyrate3 || 3.26}}%</span>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                开发优先级:<span>{{changPriority(devInformationDetaiList.priority) }}</span>
            </el-col>
            <el-col :span="10">
                是否安吉产品:<span>{{devInformationDetaiList.isanji && devInformationDetaiList.isanji == 1 ? '是':devInformationDetaiList.isanji && devInformationDetaiList.isanji == 0?'否':'' }}</span>
            </el-col>
        </el-row>
        <el-row class="textSpeaing" >
            <el-col :span="10">
                是否需要专利确认:<span>{{devInformationDetaiList.ispatentproduct && devInformationDetaiList.ispatentproduct == 0 ? '否':'是' }}</span>
            </el-col>
        </el-row>
        <el-row v-for="item in devInformationDetaiList.productMarketList" :key="item.id">
            <el-col :span="22">
                <div class="tableTitle">{{item.platformname}}- {{item.countrycode}} :  {{item.warehouseName}}</div>
                <el-table
                     border
                    :data="[item]"
                    :header-cell-style="{background:'#f5f7fa',color:'#606266'}"
                    style="width: 100%">
                    <el-table-column
                        label="类型"
                        width="100px"
                        >
                        <template>
                            <div>普通</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="基准价"
                        prop="developmentprice"
                        width="100px"
                        >
                    </el-table-column>
                    <el-table-column
                        label="利润"
                        width="200px"
                        >
                        <template slot-scope="scope">
                            <div :class="scope.row.profit >= 0 ? 'textColor':'noColor'">{{scope.row.profit ?scope.row.profit:0 }}%/{{scope.row.profitmargin ? scope.row.profitmargin*100 :0}} {{   contryCurry(scope.row.countrycode)}}</div>
                            <div :class="scope.row.profit >= 0 ? 'textColor':'noColor'">{{scope.row.endprofit ? scope.row.endprofit :0}}%/{{scope.row.endprofitmargin ? scope.row.endprofitmargin*100 :0}} {{   contryCurry(scope.row.countrycode)}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="运费">
                        <template slot-scope="scope">
                            <div v-if="scope.row.freightway == 1">{{scope.row.inlandportcosts+scope.row.oceanfreight+scope.row.outlandportcosts}} {{   contryCurry(scope.row.countrycode)}}</div>
                            <div v-if="scope.row.freightway == 2">{{scope.row.oceanfreight}} {{   contryCurry(scope.row.countrycode)}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="piprice"
                        label="PI">
                    </el-table-column>
                    <el-table-column
                        label="海运费成本">
                        <template slot-scope="scope">
                            <div>港 {{' '}} 前:{{scope.row.inlandportcosts}} {{   contryCurry(scope.row.countrycode)}}</div>
                            <div>海运:{{scope.row.oceanfreight}} {{   contryCurry(scope.row.countrycode)}}</div>
                            <div>目的港:{{scope.row.outlandportcosts}} {{   contryCurry(scope.row.countrycode)}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="税费">
                        <template slot-scope="scope">
                            <div>进口DUTY:{{scope.row.duty}} {{   contryCurry(scope.row.countrycode)}}</div>
                            <div>进口VAT:{{scope.row.vatfee}} {{   contryCurry(scope.row.countrycode)}}</div>
                            <div>销售VAT:{{scope.row.salesvat}} {{   contryCurry(scope.row.countrycode)}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="平台费">
                        <template slot-scope="scope">
                            <div>成交费:{{scope.row.platformfee}} {{   contryCurry(scope.row.countrycode)}}</div>
                            <div>PayPal:{{scope.row.paypalprice}} {{   contryCurry(scope.row.countrycode)}}</div>
                            <div>刊登费:{{scope.row.listingfee}} {{   contryCurry(scope.row.countrycode)}}</div>  
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="海外仓成本">
                        <template slot-scope="scope">                          
                            <div>操作费:{{scope.row.handlingfee}} {{   contryCurry(scope.row.countrycode)}}</div>
                            <div>发货包装:{{scope.row.packagingfee}} {{   contryCurry(scope.row.countrycode)}}</div>
                            <div>本地化费:{{scope.row.localizationfee}} {{   contryCurry(scope.row.countrycode)}}</div>   
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="developmentprice"
                        label="可抵扣税费">
                        <template slot-scope="scope">
                            <div>进口VAT:{{scope.row.vatfee}} {{   contryCurry(scope.row.countrycode)}}</div>
                            <div>快递VAT:{{scope.row.localshippingfeevat}} {{   contryCurry(scope.row.countrycode)}}</div>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="tableBottomTitle">运输方式(自有/SFP):{{item.shippingname}}    汇率:{{item.exchangerate}}</div>
            </el-col>
        </el-row>
        
    </div>
</template>
<script>
export default {
    data(){
        return {
             unit:'',
             devSign:[
                 {
                     key:1,
                     label:'低',
                     value:0,
                 },
                 {
                     key:2,
                     label:'中',
                     value:1,
                 },
                 {
                     key:3,
                     label:'高',
                     value:2,
                 },
             ],
        }
    },
    props:{
        devInformationDetaiList:{
            type:Object,
            default:() => ({})
        }
    },
    mounted(){
    },
    methods:{
        // unitChange(){debugger
        //     if(this.devInformationDetaiList.productMarketList.length > 0 ){
        //         this.devInformationDetaiList.productMarketList.forEach(item => {
        //             if(item.countrycode == 'GB'){
        //                 item.unit == 'GBP'
        //             }
        //         })
        //     }
        // }
        contryCurry(val){
            if(val == 'US'){
                return 'USD'
            }else if(val == 'GB'){
                return 'GBP'
            }else if(val == 'DE'){
                return 'EUR'
            }else if(val == 'AU'){
                return 'AUD'
            }
        },
        changPriority(val){
            if(typeof(val) == 'number'){
                let newVal = this.devSign.filter(res => {
                    return res.value == val
                })
                return newVal[0].label
            }
        }
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
    font-weight: bold;
}
.tableBottomTitle{
    border: 1px solid #EBEEF5;
    text-align: end;
    height: 30px;
    line-height: 30px;
    padding-right: 10px;
}
.textColor{
    color: green;
}
.noColor {
    color: red;
}
</style>