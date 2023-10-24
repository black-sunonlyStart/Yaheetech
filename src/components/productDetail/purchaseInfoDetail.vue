<template>
    <div>
        <el-row class="textSpeaing" >
            <el-col :span="2">
                <span class="colBoxTitle">{{M2('样品采购前报价')}}：</span>
            </el-col>
            <el-col :span="20">
                <el-table
                    :empty-text="M2('暂无数据')"
                     border
                    :data="purchaseInfoDetaiList.productPurchaseVoList"
                    :header-cell-style="{background:'#f5f7fa',color:'#606266'}"
                    style="width: 100%">
                    <el-table-column
                        :label="M2('选择')"
                        >
                        <div slot-scope="scope">
                            {{scope.row.isdefault?M2('当前选择'):''}}
                        </div>
                    </el-table-column>
                    <el-table-column
                        prop="createdName"
                        :label="M2('采购开发')"
                        header-align='center'
                        >
                    </el-table-column>
                    <el-table-column
                        prop="minbuynum"
                        :label="M2('最小起订量')"
                       >
                    </el-table-column>
                    <el-table-column
                        prop="firstorderqty"
                        :label="M2('首单下单数量')"
                        >
                    </el-table-column>
                    <el-table-column
                        :label="M2('出厂价') + '(¥)'"
                    >
                        <template slot-scope="scope">
                            <div>
                                <span>{{scope.row.purchaseprice}}</span>
                                <span v-if="scope.row.calculateprofittype == '1'">√</span> 
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="M2('FOB价') + '($)'"
                        >
                         <template slot-scope="scope">
                            <div>
                                <span>{{scope.row.fobprice }}</span>
                                <span v-if="scope.row.calculateprofittype  == '2'">√</span> 
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="M2('含税价') + '(¥)'"
                        >
                        <template slot-scope="scope">
                            <div>
                                <span>{{scope.row.taxprice}}</span>
                                <span v-if="scope.row.calculateprofittype == '3'">√</span> 
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="miscprice"
                        :label="M2('杂费') + '(¥)'"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="warpperfee"
                        :label="M2('产品包装费') + '(¥)'"
                        width="120px"
                        >
                    </el-table-column>
                    <el-table-column
                        width="200px"
                    >
                        <template slot="header">
                            <div class="textPostion">{{M2('采购成本')}}</div>
                            <div class="textPostion">{{M2('净采购价')}}+{{M2('杂费')}}+{{M2('包装费')}}(¥)</div>
                        </template>
                        <template slot-scope="scope">
                            <div> 
                                <span>{{changePrice(scope.row.calculateprofittype,scope.row.fobprice,scope.row.taxprice,scope.row.purchaseprice,scope.row.miscprice,scope.row.warpperfee)|| 0 }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="deliverydays"
                        :label="M2('交期') + '(' + M2('天') + ')'"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="packingquantity"
                        :label="M2('装箱数量') + '(/' + M2('箱') + ')'"
                        width="120px"
                        >
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row class="textSpeaing" v-if="statusList.includes(nowStatus)" >
            <el-col :span="2">
                <span class="colBoxTitle">{{M2('最终报价')}}：</span>
            </el-col>
            <el-col :span="20">
                <el-table
                     border
                     :empty-text="M2('暂无数据')"
                    :data="purchaseInfoDetaiList.lastProductPurchaseVoList"
                    :header-cell-style="{background:'#f5f7fa',color:'#606266'}"
                    style="width: 100%">
                    <el-table-column
                        prop="minbuynum"
                        :label="M2('最小起订量')"
                       >
                    </el-table-column>
                    <el-table-column
                        prop="firstorderqty"
                        :label="M2('首单下单数量')"
                       >
                    </el-table-column>
                    <el-table-column
                        :label="M2('出厂价') + '( ¥ )'"
                       >
                        <template slot-scope="scope">
                            <div>
                                <span>{{scope.row.purchaseprice}}</span>
                                <span v-if="scope.row.calculateprofittype == 1">√</span> 
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="M2('FOB价') + '( $ )'"
                        >
                        <template slot-scope="scope">
                            <div>
                                <span>{{scope.row.fobprice }}</span>
                                <span v-if="scope.row.calculateprofittype  == 2">√</span> 
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="M2('含税价') + '( ¥ )'"
                        >
                        <template slot-scope="scope">
                            <div>
                                <span>{{scope.row.taxprice}}</span>
                                <span v-if="scope.row.calculateprofittype == 3">√</span> 
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="miscprice"
                        :label="M2('杂费') + '( ¥ )'"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="warpperfee"
                        :label="M2('产品包装费') + '( ¥ )'"
                    >
                    </el-table-column>
                    <el-table-column
                     width="200px"
                    >
                        <template slot="header">
                            <div class="textPostion">{{M2('采购成本')}}</div>
                            <div class="textPostion">{{M2('净采购价')}}+{{M2('杂费')}}+{{M2('包装费')}}( ¥ )</div>
                        </template>
                        <template slot-scope="scope">
                            <div>
                                <span>{{changePrice(scope.row.calculateprofittype,scope.row.fobprice,scope.row.taxprice,scope.row.purchaseprice,scope.row.miscprice,scope.row.warpperfee)|| 0}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="deliverydays"
                        :label="M2('交期') + '(' + M2('天') + ')'"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="packingquantity"
                       :label="M2('装箱数量') + '(/' + M2('箱') + ')'">
                    </el-table-column>
                </el-table>
                <div class="showtext" v-if="showText">{{M2('最终报价与采购样品前报价不一致，请审核人员认真检查是否合理')}}</div>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">{{M2('样品购买价')}}： </div> <div class="colBoxContent">{{purchaseInfoDetaiList.productprice}} ({{M2('产品价格')}}) + {{purchaseInfoDetaiList.freight}} ({{M2('运费')}}) = {{purchaseInfoDetaiList.productprice + purchaseInfoDetaiList.freight}}RMB</div>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">{{M2('含税价税点')}}： </div> <div class="colBoxContent">{{purchaseInfoDetaiList.taxleviedpoint ? purchaseInfoDetaiList.taxleviedpoint + '%' : ''}}</div>
                </div>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">{{M2('下大单返样品费')}}： </div> <div class="colBoxContent">{{purchaseInfoDetaiList.backpurchaseprice ? purchaseInfoDetaiList.backpurchaseprice + '(RMB)' : ''}}</div>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">{{M2('出口退税率')}}： </div> <div class="colBoxContent">{{purchaseInfoDetaiList.tax > 0 ?purchaseInfoDetaiList.tax  + '%' : 0 + '%'}}</div>
                </div>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">{{M2('返样品费详情备注')}}： </div> <div class="colBoxContent" style="width:540px">{{purchaseInfoDetaiList.backpurchasepricenote}}</div>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">{{M2('样品交期')}}： </div> <div class="colBoxContent">{{purchaseInfoDetaiList.sampledeliverydays ? purchaseInfoDetaiList.sampledeliverydays + '(天)' : purchaseInfoDetaiList.sampledeliverydays == 0 ? 0 + '(天)' :"" }}</div>
                </div>
            </el-col>
        </el-row>
        <el-row class="textSpeaing" v-if="statusList.includes(nowStatus)">
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">{{M2('货好时间')}}： </div> <div class="colBoxContent">{{purchaseInfoDetaiList.gooddate?$moment(purchaseInfoDetaiList.gooddate).format("YYYY-MM-DD HH:mm") :''}}</div>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">{{M2('货好时间详情备注')}}： </div> <div class="colBoxContent" style="width:540px">{{purchaseInfoDetaiList.goodnote}}</div>
                </div>
            </el-col> 
        </el-row>
        <el-row class="textSpeaing">
             <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">{{M2('品牌费')}}： </div> <div class="colBoxContent">{{purchaseInfoDetaiList.bandprice? purchaseInfoDetaiList.bandprice + '(RMB)' : ''}}</div>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">{{M2('FOB头程费')}}： </div> <div class="colBoxContent">{{purchaseInfoDetaiList.fobPrice ? (purchaseInfoDetaiList.fobPrice ).toFixed(2) + "(RMB)" : 0}}</div>
                </div>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">{{M2('FOB报价品牌费')}}： </div> <div class="colBoxContent">{{purchaseInfoDetaiList.fobbandprice ? purchaseInfoDetaiList.fobbandprice + '($)' : ''}}</div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data(){
        return {
             statusList:[4,5,6,7,8,9,14],
             showText:false,
             selectRow:{}
        }
    },
    props:{
        purchaseInfoDetaiList:{
            type:Object,
            default:() => ({})
        },
        nowStatus:{
            type:Number,
            default:() => (0)
        }        
    },
    mounted(){
        this.showTitle()
    },
    methods:{
        changePrice(calculateprofittype,fobprice,taxprice,purchaseprice,miscprice,warpperfee){
            if(!calculateprofittype && !miscprice && !warpperfee && !this.purchaseInfoDetaiList.exchangeRate )return 0
            if(calculateprofittype == 2) {
                return (fobprice * this.purchaseInfoDetaiList.exchangeRate + miscprice + warpperfee).toFixed(2)
            }else if (calculateprofittype == 3){
              return  (taxprice + miscprice + warpperfee).toFixed(2)
            }else {
                return (purchaseprice + miscprice + warpperfee).toFixed(2)
            }
        },
        showTitle(){
            
            if(this.purchaseInfoDetaiList.lastProductPurchaseVoList && this.purchaseInfoDetaiList.lastProductPurchaseVoList[0] && this.purchaseInfoDetaiList.productPurchaseVoList){
                let lastProductPurchaseVoList = this.purchaseInfoDetaiList.lastProductPurchaseVoList[0] || []
                let filSelectRow = this.purchaseInfoDetaiList.productPurchaseVoList.filter(item => {
                    return item.isdefault == true
                })
                this.selectRow = filSelectRow[0]
                if(this.selectRow && lastProductPurchaseVoList && (this.selectRow.minbuynum != lastProductPurchaseVoList.minbuynum || this.selectRow.firstorderqty != lastProductPurchaseVoList.firstorderqty 
                    || this.selectRow.purchaseprice != lastProductPurchaseVoList.purchaseprice || this.selectRow.fobprice != lastProductPurchaseVoList.fobprice
                    || this.selectRow.taxprice != lastProductPurchaseVoList.taxprice || this.selectRow.calculateprofittype != lastProductPurchaseVoList.calculateprofittype
                    || this.selectRow.miscprice != lastProductPurchaseVoList.miscprice || this.selectRow.warpperfee != lastProductPurchaseVoList.warpperfee
                    || this.selectRow.deliverydays != lastProductPurchaseVoList.deliverydays || this.selectRow.packingquantity != lastProductPurchaseVoList.packingquantity)

                ){
                    this.showText = true
                }
            }
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
    font-weight: bold;
}
.tableBottomTitle{
    border: 1px solid #EBEEF5;
    text-align: end;
    height: 30px;
    line-height: 30px;
    padding-right: 10px;
}
.textPostion{
    text-align: center;
}
.colbox{
    display: flex;
    margin-left: 20px;
    .colBoxTitle{
        font-weight: bold;
        width: 130px;
        text-align: right;
        flex-shrink: 0;
        .colBoxContent{
            width: 600px;
            font-weight: normal !important;
        }
    }
}
.colBoxTitle{
        font-weight: bold;
        width: 100%;
        text-align: right;
        display: inline-block;
}
.showtext{
        width: 600px;
        border: 1px solid sandybrown;
        margin-top: 5px;
        padding-left: 5px;
        color: red;
    }
    .iconBox{
            width: 30px;
            height: 30px;
            .delText{
                display: inline-block;
                width: 30px;
                margin-left: 10px;
                line-height: 30px;
                &:hover{
                    color: #3366cc;
                }
            }
        }
</style>