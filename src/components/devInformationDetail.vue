<template>
    <div>
        <el-row class="textSpeaing">
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">产品中文概述： </div> <div class="colBoxContent" style="font-weight: normal;width:580px">{{devInformationDetaiList.description}}</div>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">业务开发： </div> <div class="colBoxContent" style="font-weight: normal">{{devInformationDetaiList.businessProduct ?devInformationDetaiList.businessProduct:''}}</div>
                </div>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">英文标题： </div> <div class="colBoxContent" style="font-weight: normal;width:580px">{{devInformationDetaiList.title}}</div>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">采购开发： </div> <div class="colBoxContent" style="font-weight: normal">{{devInformationDetaiList.orderProduct ? devInformationDetaiList.orderProduct:'' }}</div>
                </div>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">德文标题： </div> <div class="colBoxContent" style="font-weight: normal;width:580px">{{devInformationDetaiList.titleDe }}</div>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">US Duty税率： </div> <div class="colBoxContent" style="font-weight: normal">{{devInformationDetaiList.dutyrate1}}%</div>
                </div>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">日文标题： </div> <div class="colBoxContent" style="font-weight: normal;width:580px">{{devInformationDetaiList.titleJp}}</div>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">GB Duty税率： </div> <div class="colBoxContent" style="font-weight: normal">{{devInformationDetaiList.dutyrate2 || 3.26}}%</div>
                </div>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">英文关键词： </div> <div class="colBoxContent" style="font-weight: normal;width:580px">{{devInformationDetaiList.keys}}</div>
                </div>
            </el-col>
            <el-col :span="10">
                 <div class="colbox">
                    <div class="colBoxTitle">DE Duty税率：</div> <div class="colBoxContent" style="font-weight: normal">{{devInformationDetaiList.dutyrate3 || 3.91}}%</div>
                </div>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">开发优先级： </div> <div class="colBoxContent" style="font-weight: normal">{{changPriority(devInformationDetaiList.priority) }}</div>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">JP Duty税率： </div> <div class="colBoxContent" style="font-weight: normal">{{devInformationDetaiList.dutyrate4 }}%</div>
                </div>
            </el-col>
        </el-row>
        <el-row class="textSpeaing" >
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">是否需要专利确认： </div> <div class="colBoxContent" style="font-weight: normal">{{ devInformationDetaiList.ispatentproduct == 0 ? '否':'是'}}</div>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">是否安吉产品： </div> <div class="colBoxContent" style="font-weight: normal">{{devInformationDetaiList.isanji && devInformationDetaiList.isanji == 1 ? '是':devInformationDetaiList.isanji == 0 ? '否' : ' ' }}</div>
                </div>
            </el-col>
        </el-row>
        <el-row v-for="item in devInformationDetaiList.productMarketList" :key="item.id">
            <el-col :span="22">
                <div class="tableTitle">{{item.platformname}}- {{item.countrycode}} :  {{item.warehouseName}}</div>
                <el-table
                     border
                    :data="item.mapProfit"
                    :header-cell-style="{background:'#f5f7fa',color:'#606266'}"
                    style="width: 100%"
                    >
                    <el-table-column
                        label="类型"
                        width="100px"
                        header-align='center'
                        align="center"
                        >
                        <template slot-scope="scope">
                            <div v-if="scope.row.sfp">SFP</div>
                             <div v-else>普通</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="基准价"
                         width="120px"
                        prop="developmentprice"
                        header-align='center'
                        align="center"
                        >
                        <template slot="header" >
                            <div>基准价 {{'(' + contryCurry(item.countrycode) + ")"}}</div>
                        </template>
                        <template slot-scope="scope">
                            <div>{{scope.row.developmentprice ? scope.row.developmentprice.toFixed(2) : ''}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="利润"
                        width="150px"
                        header-align='center'
                        align="center"
                        >
                        <template slot="header" >
                            <div>利润  {{'(' + contryCurry(item.countrycode) + ")"}}</div>
                        </template>
                        <template slot-scope="scope">
                            <div :class="scope.row.profit >= 0 ? 'textColor':'noColor'">
                                {{scope.row.profit ?scope.row.profit.toFixed(2):'0.00' }} / 
                                {{scope.row.profitmargin ? (scope.row.profitmargin*100).toFixed(2) :'0.00'}}% 
                            </div>
                            <div :class="scope.row.sfp ? (scope.row.sfpEndProfit >= 0  ? 'textColor':'noColor') : (scope.row.endprofit >= 0 ? 'textColor':'noColor' ) ">
                                {{scope.row.sfp ?(scope.row.sfpEndProfit && scope.row.sfpEndProfit.toFixed(2))||'0.00' :  scope.row.endprofit.toFixed(2)||'0.00'}} /
                                {{scope.row.sfp ?(scope.row.sfpEndProfitMargin && (scope.row.sfpEndProfitMargin * 100).toFixed(2) + '%') || '0.00%' : (item.endprofitmargin*100).toFixed(2) + '%' || '0.00%'}} 
                            </div>
                        </template>   
                    </el-table-column>
                    <el-table-column
                     width="100px"
                     header-align='center'
                     align="center"
                    >
                        <template slot="header" >
                            <div>运费  {{'(' + contryCurry(item.countrycode) + ")"}}</div>
                        </template>
                        <template slot-scope="scope">
                            <div>{{scope.row.freight ? scope.row.freight.toFixed(2) : ''}} </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="piprice"
                        label="PI"
                         width="100px"
                         header-align='center'
                         align="center"
                        >
                        <template slot="header" >
                            <div>PI  {{'(' + contryCurry(item.countrycode) + ")"}}</div>
                        </template>
                        <template >
                            <div> {{item.piprice}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="海运费成本"
                        header-align='center'
                        align="center"
                        >
                        <template slot="header" >
                            <div>海运费成本 {{'(' + contryCurry(item.countrycode) + ")"}}</div>
                            <div>港前 + 海运 + 目的港</div>
                        </template>
                        <template >
                            {{item.inlandportcosts ? item.inlandportcosts.toFixed(2)+  " + " :' 0 + '}}
                            {{item.oceanfreight ? item.oceanfreight.toFixed(2)+  " + " :' 0 + '}} 
                            {{item.outlandportcosts ? item.outlandportcosts.toFixed(2) : ' 0 '}} 
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="税费"
                        width="250px"
                        header-align='center'
                        align="center"
                        >
                        <template slot="header" >
                            <div>税费  {{'(' + contryCurry(item.countrycode) + ")"}}</div>
                            <div>进口DUTY + 进口VAT + 销售VAT</div>
                        </template>
                        <template slot-scope="scope" >
                            {{item.duty ? item.duty.toFixed(2)+  " + " :' 0 + '}}
                            {{item.vatfee ? item.vatfee.toFixed(2) +  " + " :' 0 + '}}
                            <span  v-if="scope.row.sfp">{{item.sfpSalesvat ? item.sfpSalesvat.toFixed(2) :' 0 '}} </span>
                            <span  v-else>{{item.salesvat  ? item.salesvat .toFixed(2) :' 0 '}} </span>
                            
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="平台费"
                        header-align='center'
                        align="center"
                        >
                        <template slot="header" >
                            <div>平台费  {{'(' + contryCurry(item.countrycode) + ")"}}</div>
                            <div>成交费 + PayPal + 刊登费</div>
                        </template>
                        <template  slot-scope="scope" >
                            <span  v-if="scope.row.sfp">{{item.sfpPlatformfee  ? item.sfpPlatformfee .toFixed(2)+ " + " : ' 0 + '}} </span>
                            <span  v-else>{{item.platformfee  ? item.platformfee .toFixed(2)+ " + " : ' 0 + '}} </span>
                            <!-- {{item.platformfee ? item.platformfee.toFixed(2) +  " + " :' 0 + '}}  -->
                            {{item.paypalprice ? item.paypalprice.toFixed(2)  + " + " : ' 0 + '}} 
                            {{item.listingfee ? item.listingfee.toFixed(2) : '0'}} 
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="海外仓成本"
                        header-align='center'
                        align="center"
                        >
                        <template slot="header" >
                            <div>海外仓成本  {{'(' + contryCurry(item.countrycode) + ")"}}</div>
                            <div>
                                操作费 + 发货包装 + 本地化费
                            </div>
                        </template>
                        <template  slot-scope="scope" >     
                            <span  v-if="scope.row.sfp">{{item.sfpHandlingfee  ? item.sfpHandlingfee .toFixed(2) + " + " :' 0 +  '}} </span>
                            <span  v-else>{{item.handlingfee  ? item.handlingfee .toFixed(2) + " + " :' 0  + '}} </span>                     
                            {{item.packagingfee ? item.packagingfee.toFixed(2)  + " + " : '0 + '}}
                            {{item.localizationfee ? item.localizationfee.toFixed(2)  : '0'}}  
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="developmentprice"
                        label="可抵扣税费"
                        header-align='center'
                        align="center"
                        >
                        <template slot="header" >
                            <div>可抵扣税费  {{'(' + contryCurry(item.countrycode) + ")"}}</div>
                            <div>进口VAT + 快递VAT </div>
                        </template>
                        <template   slot-scope="scope">
                           {{item.vatfee ? item.vatfee.toFixed(2) + "+" : '0 + '}}
                           <span  v-if="scope.row.sfp">{{item.sfpLocalshippingfeevat   ? item.sfpLocalshippingfeevat  .toFixed(2) :' 0 '}} </span>
                           <span  v-else>{{item.localshippingfeevat  ? item.localshippingfeevat .toFixed(2) :' 0 '}} </span>  
                        </template>
                    </el-table-column>
                </el-table>
                <div class="tableBottomTitle">运输方式(自有/SFP): <span v-if="item.shippingname">{{item.shippingname}} </span><span v-if="item.sfpLogisticsCode"> {{'/' + item.sfpLogisticsCode }}</span><span class="showText" v-if="!item.shippingname && !item.sfpLogisticsCode">运输方式暂无匹配</span>   汇率: {{item.exchangerate}}</div>
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
         objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex > 3) {
                if (rowIndex % 2 === 0) {
                    return {
                    rowspan: 2,
                    colspan: 1
                    };
                } else {
                    return {
                    rowspan: 0,
                    colspan: 0
                    };
                }
            }
        },
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
    .showText{
        color: red;
    }
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
        width: 130px;
        text-align: right;
        .colBoxContent{
            font-weight: normal !important;
            width: 600px;
        }
    }
}
</style>