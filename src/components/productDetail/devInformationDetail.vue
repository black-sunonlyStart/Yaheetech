<template>
    <div>
        <el-row class="textSpeaing">
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">{{M2('产品中文概述')}}： </div> <div class="colBoxContent" style="font-weight: normal;width:580px">{{devInformationDetaiList.description}}</div>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">{{M2('业务开发')}}： </div> <div class="colBoxContent" style="font-weight: normal">{{devInformationDetaiList.businessProduct ?devInformationDetaiList.businessProduct:''}}</div>
                </div>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">{{M2('英文标题')}}： </div> <div class="colBoxContent" style="font-weight: normal;width:580px">{{devInformationDetaiList.title}}</div>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">{{M2('采购开发')}}： </div> <div class="colBoxContent" style="font-weight: normal">{{devInformationDetaiList.orderProduct ? M2(devInformationDetaiList.orderProduct):'' }}</div>
                </div>
            </el-col>
        </el-row>
         <el-row class="textSpeaing" >
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">{{M2('是否安吉产品')}}： </div> <div class="colBoxContent" style="font-weight: normal">{{devInformationDetaiList.isanji && devInformationDetaiList.isanji == 1 ? M2('是'):devInformationDetaiList.isanji == 0 ? M2('否') : ' ' }}</div>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">{{M2('负责人')}}： </div> <div class="colBoxContent" style="font-weight: normal;width:580px">{{M2(devInformationDetaiList.auditorName) }}</div>
                </div>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">{{M2('德文标题')}}： </div> <div class="colBoxContent" style="font-weight: normal;width:580px">{{devInformationDetaiList.titleDe }}</div>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">{{M2('Duty税率')}}： </div> 
                    <span class="colBoxContent" style="margin-right:15px">US:{{showCountryDuty('en-US') }}%</span>
                    <span class="colBoxContent" style="margin-right:15px">GB:{{showCountryDuty('en-GB') }}%</span>
                    <span class="colBoxContent" style="margin-right:15px">DE:{{showCountryDuty('de') }}%</span>
                    <span class="colBoxContent" style="margin-right:15px">JP:{{showCountryDuty('ja-JP') }}%</span>
                </div>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">{{M2('日文标题')}}： </div> <div class="colBoxContent" style="font-weight: normal;width:580px">{{devInformationDetaiList.titleJp}}</div>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">{{M2('产品年龄段')}}： </div> <div class="colBoxContent" style="font-weight: normal">{{devInformationDetaiList.ageRangeStr}}</div>
                </div>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">{{M2('英文关键词')}}： </div> <div class="colBoxContent" style="font-weight: normal;width:580px">{{devInformationDetaiList.keys}}</div>
                </div>
            </el-col>
            <el-col :span="10">
                 <div class="colbox">
                    <div class="colBoxTitle">{{M2('是否带电')}}： </div> <div class="colBoxContent" style="font-weight: normal">{{devInformationDetaiList.electrifyStr}}</div>
                </div>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">{{M2('开发优先级')}}： </div> <div class="colBoxContent" style="font-weight: normal">{{changPriority(devInformationDetaiList.priority) }}</div>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="colbox">
            
                </div>
            </el-col>
        </el-row>
        <el-row class="textSpeaing" >
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">{{M2('是否需要专利确认')}}： </div> <div class="colBoxContent" style="font-weight: normal">{{ devInformationDetaiList.ispatentproduct == 0 ? M2('否'):M2('是')}}</div>
                </div>
            </el-col>
        </el-row>
        <el-row v-for="item in devInformationDetaiList.productMarketList" :key="item.id">
            <el-col :span="item.countrycode == 'DE'? 24 : 22">
                <div class="tableTitle">{{item.platformname}}- {{item.countrycode}} :  {{item.warehouseName}}</div>
                <el-table
                     border
                     :empty-text="M2('暂无数据')"
                    :data="item.mapProfit"
                    :header-cell-style="{background:'#f5f7fa',color:'#606266'}"
                    style="width: 100%"
                    >
                    <el-table-column
                        :label="M2('类型') + '：'"
                        width="60px"
                        header-align='center'
                        align="center"
                        >
                        <template slot-scope="scope">
                            <div v-if="scope.row.sfp">SFP</div>
                            <div v-else> {{M2('普通')}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="M2('基准价') + '：'"
                         width="120px"
                        prop="developmentprice"
                        header-align='center'
                        align="center"
                        >
                        <template slot="header" >
                            <div>{{M2('基准价')}} {{'(' + contryCurry(item.countrycode) + ")"}}</div>
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
                            <div> {{M2('利润')}} {{'(' + contryCurry(item.countrycode) + ")"}}</div>
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
                            <div>{{M2('运费')}}  {{'(' + contryCurry(item.countrycode) + ")"}}</div>
                        </template>
                        <template slot-scope="scope">
                            <div>{{scope.row.freight ? scope.row.freight.toFixed(2) : ''}} </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="piprice"
                        label="PI"
                        width="95px"
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
                        prop="包材费"
                        label="packingMaterialFee"
                        width="110px"
                        header-align='center'
                        align="center"
                        v-if="item.countrycode == 'DE'"
                        >
                        <template slot="header" >
                            <div>{{M2('包材费')}}  {{'(' + contryCurry(item.countrycode) + ")"}}</div>
                        </template>
                        <template >
                            <div> {{item.packingMaterialFee}}</div>
                        </template>
                    </el-table-column>
                    
                    <el-table-column
                        label="海运费成本"
                        header-align='center'
                        align="center"
                        width="160px"
                        >
                        <template slot="header" >
                            <div>{{M2('海运费成本')}} {{'(' + contryCurry(item.countrycode) + ")"}}</div>
                            <div>{{M2('港前')}} + {{M2('海运')}} + {{M2('目的港')}}</div>
                        </template>
                        <template >
                            {{item.inlandportcosts ? item.inlandportcosts.toFixed(2)+  " + " :' 0 + '}}
                            {{item.oceanfreight ? item.oceanfreight.toFixed(2)+  " + " :' 0 + '}} 
                            {{item.outlandportcosts ? item.outlandportcosts.toFixed(2) : ' 0 '}} 
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="税费"
                        width="230px"
                        header-align='center'
                        align="center"
                        >
                        <template slot="header" >
                            <div>{{M2('税费')}}  {{'(' + contryCurry(item.countrycode) + ")"}}</div>
                            <div> {{M2('进口DUTY')}} +  {{M2('进口VAT')}} +  {{M2('销售VAT')}}</div>
                        </template>
                        <template slot-scope="scope" >
                            {{item.duty ? item.duty.toFixed(2)+  " + " :' 0 + '}}
                            {{item.vatfee ? item.vatfee.toFixed(2) +  " + " :' 0 + '}}
                            <span v-if="scope.row.sfp">{{item.sfpSalesvat ? item.sfpSalesvat.toFixed(2) :' 0 '}} </span>
                            <span v-else>{{item.salesvat  ? item.salesvat .toFixed(2) :' 0 '}} </span>
                            
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="平台费"
                        header-align='center'
                        align="center"
                        width="180px"
                        >
                        <template slot="header" >
                            <div>{{M2('平台费')}}  {{'(' + contryCurry(item.countrycode) + ")"}}</div>
                            <div>{{M2('成交费')}} + PayPal + {{M2('刊登费')}}</div>
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
                        label="管理费分摊"
                        header-align='center'
                        align="center"
                        width="200px"
                        >
                        <template slot="header" >
                            <div>{{M2('管理费分摊')}}  {{'(' + contryCurry(item.countrycode) + ")"}}</div>
                            <div>
                                {{M2('操作费')}} + {{M2('发货包装')}} + {{M2('本地化费')}}
                            </div>
                        </template>
                        <template slot-scope="scope" >     
                            <span v-if="scope.row.sfp">{{item.sfpHandlingfee  ? item.sfpHandlingfee .toFixed(2) + " + " :' 0 +  '}} </span>
                            <span v-else>{{item.handlingfee  ? item.handlingfee .toFixed(2) + " + " :' 0  + '}} </span>                     
                            {{item.packagingfee ? item.packagingfee.toFixed(2)  + " + " : '0 + '}}
                            {{item.localizationfee ? item.localizationfee.toFixed(2)  : '0'}}  
                        </template>
                    </el-table-column>
                     <el-table-column
                        prop="developmentprice"
                        label="仓库成本"
                        header-align='center'
                        align="center"
                        width="130px"
                        >
                        <template slot="header" >
                            <div>{{M2('仓库成本')}}  {{'(' + contryCurry(item.countrycode) + ")"}}</div>
                            <div>{{M2('仓租费')}}+{{M2('发货处理费')}} </div>
                        </template>
                        <template>
                           {{item.storageCharges ? item.storageCharges.toFixed(2) + "+" : '0 + '}}
                           <span>{{item.packFee  ? item.packFee .toFixed(2) :' 0 '}} </span>  
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="developmentprice"
                        label="可抵扣税费"
                        header-align='center'
                        align="center"
                        width="220px"
                        >
                        <template slot="header" >
                            <div>{{M2('可抵扣税费')}}  {{'(' + contryCurry(item.countrycode) + ")"}}</div>
                            <div>{{M2('进口VAT')}} + {{M2('快递VAT')}} <span v-if="item.countrycode == 'DE'"> + {{M2('包材VAT')}} </span>  </div>
                        </template>
                        <template slot-scope="scope">
                           {{item.vatfee ? item.vatfee.toFixed(2) + "+" : '0 + '}}
                           <span v-if="scope.row.sfp">{{item.sfpLocalshippingfeevat   ? item.sfpLocalshippingfeevat  .toFixed(2) :' 0 '}} </span>
                           <span v-else>{{item.localshippingfeevat  ? item.localshippingfeevat .toFixed(2) :' 0 '}} </span>  
                           <span v-if="item.countrycode == 'DE'">{{item.packingMaterialFeeVAT  ? '+' + item.packingMaterialFeeVAT .toFixed(2) :' + 0 '}}</span>
                        </template>
                    </el-table-column>
                    
                    <el-table-column
                        prop="developmentprice"
                        label="FBA仓成本"
                        header-align='center'
                        align="center"
                        width="130px"
                        v-if="devInformationDetaiList.fbaWarehouseIds && devInformationDetaiList.fbaWarehouseIds.includes(item.warehouseid)"
                        >
                        <template slot="header" >
                            <div>{{M2('FBA仓成本')}} {{'(' + contryCurry(item.countrycode) + ")"}}</div>
                            <div>{{M2('仓租费')}}+{{M2('称重处理费')}} </div>
                        </template>
                        <template>
                           {{item.storageCharges ? item.storageCharges.toFixed(2) + "+" : '0 + '}}
                           <span>{{item.weighingFee  ? item.weighingFee .toFixed(2) :' 0 '}} </span>  
                        </template>
                    </el-table-column>
                   
                </el-table>
                <div class="tableBottomTitle">{{M2('运输方式(自有/SFP)')}}: <span v-if="item.shippingname">{{item.shippingname}} </span><span v-if="item.sfpLogisticsCode"> {{'/' + item.sfpLogisticsCode }}</span><span class="showText" v-if="!item.shippingname && !item.sfpLogisticsCode">{{M2('运输方式暂无匹配')}}</span>   {{M2('汇率')}}: {{item.exchangerate}}</div>
            </el-col>
        </el-row>
        
    </div>
</template>
<script>
export default {
    data(){
        return {
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
        showCountryDuty(val){
            let filterList = []
            if(this.devInformationDetaiList && this.devInformationDetaiList.countryCodeList){
                filterList =  this.devInformationDetaiList.countryCodeList.filter(res => {
                    return res.countryLanguage == val
                })
            }
            if(filterList.length > 0){
                return filterList[0].dutyrate
            }else {
                return 0
            }
        },
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
            }else if(val =='JP'){
                return 'JPY'
            }else {
                return '$'
            }
        },
        changPriority(val){
            if(typeof(val) == 'number'){
                let newVal = this.devSign.filter(res => {
                    return res.value == val
                })
                return this.M2(newVal[0].label)
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
        flex-shrink: 0;
        .colBoxContent{
            font-weight: normal !important;
            width: 600px;
        }
    }
}
</style>