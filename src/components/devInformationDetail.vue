<template>
    <div>
        <el-row class="textSpeaing">
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">产品中文概述: </div> <div class="colBoxContent">{{devInformationDetaiList.description}}</div>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">业务开发: </div> <div class="colBoxContent">{{devInformationDetaiList.businessProduct ?devInformationDetaiList.businessProduct:''}}</div>
                </div>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">英文标题: </div> <div class="colBoxContent">{{devInformationDetaiList.title}}</div>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">采购开发: </div> <div class="colBoxContent">{{devInformationDetaiList.orderProduct ? devInformationDetaiList.orderProduct:'' }}</div>
                </div>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">德文标题: </div> <div class="colBoxContent">{{devInformationDetaiList.titleDe }}</div>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">US Duty税率: </div> <div class="colBoxContent">{{devInformationDetaiList.dutyrate1}}%</div>
                </div>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">日文标题: </div> <div class="colBoxContent">{{devInformationDetaiList.titleJp}}</div>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">GB Duty税率: </div> <div class="colBoxContent">{{devInformationDetaiList.dutyrate2 || 3.26}}%</div>
                </div>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">英文关键词: </div> <div class="colBoxContent">{{devInformationDetaiList.keys}}</div>
                </div>
            </el-col>
            <el-col :span="10">
                 <div class="colbox">
                    <div class="colBoxTitle">DE Duty税率: </div> <div class="colBoxContent">{{devInformationDetaiList.dutyrate3 || 3.91}}%</div>
                </div>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">开发优先级: </div> <div class="colBoxContent">{{changPriority(devInformationDetaiList.priority) }}</div>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">是否安吉产品: </div> <div class="colBoxContent">{{devInformationDetaiList.isanji && devInformationDetaiList.isanji == 1 ? '是':devInformationDetaiList.isanji == 0 ? '否' : ' ' }}</div>
                </div>
            </el-col>
        </el-row>
        <el-row class="textSpeaing" >
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">是否需要专利确认: </div> <div class="colBoxContent">{{ devInformationDetaiList.ispatentproduct == 0 ? '否':'是'}}</div>
                </div>
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
                        >
                        <template slot="header" >
                            <div>基准价 {{'(' + contryCurry(item.countrycode) + ")"}}</div>
                        </template>
                        <div slot-scope="scope">
                            <div>{{scope.row.developmentprice ? scope.row.developmentprice.toFixed(2) : ''}} </div>
                        </div>
                    </el-table-column>
                    <el-table-column
                        label="利润"
                        width="200px"
                        >
                        <template slot="header" >
                            <div>利润  {{'(' + contryCurry(item.countrycode) + ")"}}</div>
                        </template>
                        <template slot-scope="scope">
                            <div :class="scope.row.profit >= 0 ? 'textColor':'noColor'">{{scope.row.profit ?scope.row.profit.toFixed(2):'0.00' }} / {{scope.row.profitmargin ? (scope.row.profitmargin*100).toFixed(2) :'0.00'}}% </div>
                            <div :class="scope.row.profit >= 0 ? 'textColor':'noColor'">{{scope.row.endprofit ? scope.row.endprofit.toFixed(2) :'0.00'}} / {{scope.row.endprofitmargin ? (scope.row.endprofitmargin*100).toFixed(2) :'0.00'}}% </div>
                        </template>
                    </el-table-column>
                    <el-table-column>
                        <template slot="header" >
                            <div>运费  {{'(' + contryCurry(item.countrycode) + ")"}}</div>
                        </template>
                        <template slot-scope="scope">
                            <div>{{scope.row.freight ? scope.row.freight.toFixed(2) : ''}} </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="piprice"
                        label="PI">
                        <template slot="header" >
                            <div>PI  {{'(' + contryCurry(item.countrycode) + ")"}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="海运费成本">
                        <template slot="header" >
                            <div>海运费成本 {{'(' + contryCurry(item.countrycode) + ")"}}</div>
                        </template>
                        <template slot-scope="scope">
                            <div>港 {{' '}} 前: {{scope.row.inlandportcosts ? scope.row.inlandportcosts.toFixed(2) : ''}} </div>
                            <div>海运: {{scope.row.oceanfreight ? scope.row.oceanfreight.toFixed(2) : ''}} </div>
                            <div>目的港: {{scope.row.outlandportcosts ? scope.row.outlandportcosts.toFixed(2) : ''}} </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="税费">
                        <template slot="header" >
                            <div>税费  {{'(' + contryCurry(item.countrycode) + ")"}}</div>
                        </template>
                        <template slot-scope="scope">
                            <div>进口DUTY: {{scope.row.duty ? scope.row.duty.toFixed(2) :''}} </div>
                            <div>进口VAT: {{scope.row.vatfee ? scope.row.vatfee.toFixed(2) : ''}} </div>
                            <div>销售VAT: {{scope.row.salesvat ? scope.row.salesvat.toFixed(2) : ''}} </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="平台费">
                        <template slot="header" >
                            <div>平台费  {{'(' + contryCurry(item.countrycode) + ")"}}</div>
                        </template>
                        <template slot-scope="scope">
                            <div>成交费: {{scope.row.platformfee ? scope.row.platformfee.toFixed(2) :''}} </div>
                            <div>PayPal: {{scope.row.paypalprice ? scope.row.paypalprice.toFixed(2) : ''}} </div>
                            <div>刊登费: {{scope.row.listingfee ? scope.row.listingfee.toFixed(2) : ''}} </div>  
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="海外仓成本">
                        <template slot="header" >
                            <div>海外仓成本  {{'(' + contryCurry(item.countrycode) + ")"}}</div>
                        </template>
                        <template slot-scope="scope">                          
                            <div>操作费: {{scope.row.handlingfee ? scope.row.handlingfee.toFixed(2) : ''}} </div>
                            <div>发货包装: {{scope.row.packagingfee ? scope.row.packagingfee.toFixed(2) : ''}} </div>
                            <div>本地化费: {{scope.row.localizationfee ? scope.row.localizationfee.toFixed(2) : ''}} </div>   
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="developmentprice"
                        label="可抵扣税费">
                        <template slot="header" >
                            <div>可抵扣税费  {{'(' + contryCurry(item.countrycode) + ")"}}</div>
                        </template>
                        <template slot-scope="scope">
                            <div>进口VAT: {{scope.row.vatfee ? scope.row.vatfee.toFixed(2) : ''}} </div>
                            <div>快递VAT: {{scope.row.localshippingfeevat ? scope.row.localshippingfeevat.toFixed(2) : ''}} </div>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="tableBottomTitle">运输方式(自有/SFP): {{item.shippingname}}    汇率: {{item.exchangerate}}</div>
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
.colbox{
    display: flex;
    .colBoxTitle{
        font-weight: bold;
        width: 120px;
        text-align: right;
        .colBoxContent{
            width: 600px;
        }
    }
}
</style>