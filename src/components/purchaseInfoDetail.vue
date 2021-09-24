<template>
    <div>
        <el-row class="textSpeaing" >
            <el-col :span="2">
                <span class="colBoxTitle">样品采购前报价：</span>
            </el-col>
            <el-col :span="20">
                <el-table
                     border
                    :data="purchaseInfoDetaiList.productPurchaseVoList"
                    :header-cell-style="{background:'#f5f7fa',color:'#606266'}"
                    style="width: 100%">
                    <el-table-column
                        label="选择"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="createdName"
                        label="采购开发"
                        header-align='center'
                        >
                    </el-table-column>
                    <el-table-column
                        prop="minbuynum"
                        label="最小起订量">
                    </el-table-column>
                    <el-table-column
                        prop="firstorderqty"
                        label="首单下单数量">
                    </el-table-column>
                    <el-table-column
                        label="出厂价(¥)">
                        <template slot-scope="scope">
                            <div>
                                <span>{{scope.row.purchaseprice}}</span>
                                <span v-if="scope.row.purchaseprice == 1">√</span> 
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="FOB价(¥)">
                         <template slot-scope="scope">
                            <div>
                                <span>{{scope.row.fobprice }}</span>
                                <span v-if="scope.row.purchaseprice  == 2">√</span> 
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="含税价(¥)">
                        <template slot-scope="scope">
                            <div>
                                <span>{{scope.row.taxprice}}</span>
                                <span v-if="scope.row.purchaseprice == 3">√</span> 
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="miscprice"
                        label="杂费(¥)">
                    </el-table-column>
                    <el-table-column
                        prop="warpperfee"
                        label="产品包装费(¥)">
                    </el-table-column>
                    <el-table-column
                        width="200px"
                    >
                        <template slot="header">
                            <div class="textPostion">采购成本</div>
                            <div class="textPostion">净采购价+杂费+包装费(¥)</div>
                        </template>
                        <template slot-scope="scope">
                            <div> 
                                <span>{{scope.row.calculateprofittype == 2 ? scope.row.purchaseFOBPrice : (scope.row.calculateprofittype == 3 ? scope.row.taxprice : scope.row.purchaseprice)  + scope.row.miscprice  + scope.row.warpperfee || " "}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="deliverydays"
                        label="交期(天)">
                    </el-table-column>
                    <el-table-column
                        prop="packingquantity"
                        label="装箱数量(/箱)">
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row class="textSpeaing" v-if="statusList.includes(nowStatus)" >
            <el-col :span="2">
                <span class="colBoxTitle">最终报价：</span>
            </el-col>
            <el-col :span="20">
                <el-table
                     border
                    :data="purchaseInfoDetaiList.lastProductPurchaseVoList"
                    :header-cell-style="{background:'#f5f7fa',color:'#606266'}"
                    style="width: 100%">
                    <el-table-column
                        prop="minbuynum"
                        label="最小起订量"
                       >
                    </el-table-column>
                    <el-table-column
                        prop="firstorderqty"
                        label="首单下单数量"
                       >
                    </el-table-column>
                    <el-table-column
                        label="出厂价( ¥ )">
                        <template slot-scope="scope">
                            <div>
                                <span>{{scope.row.purchaseprice}}</span>
                                <span v-if="scope.row.purchaseprice == 1">√</span> 
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="FOB价( ¥ )">
                         <template slot-scope="scope">
                            <div>
                                <span>{{scope.row.fobprice }}</span>
                                <span v-if="scope.row.purchaseprice  == 2">√</span> 
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="含税价( ¥ )">
                        <template slot-scope="scope">
                            <div>
                                <span>{{scope.row.taxprice}}</span>
                                <span v-if="scope.row.purchaseprice == 3">√</span> 
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="miscprice"
                        label="杂费( ¥ )">
                    </el-table-column>
                    <el-table-column
                        prop="warpperfee"
                        label="产品包装费( ¥ )">
                    </el-table-column>
                    <el-table-column
                     width="200px"
                    >
                        <template slot="header">
                            <div class="textPostion">采购成本</div>
                            <div class="textPostion">净采购价+杂费+包装费( ¥ )</div>
                        </template>
                        <template slot-scope="scope">
                            <div>
                                <span>{{scope.row.calculateprofittype == 2 ? scope.row.purchaseFOBPrice : (scope.row.calculateprofittype == 3 ? scope.row.taxprice : scope.row.purchaseprice)  + scope.row.miscprice  + scope.row.warpperfee || " "}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="deliverydays"
                        label="交期(天)">
                    </el-table-column>
                    <el-table-column
                        prop="packingquantity"
                        label="装箱数量(/箱)">
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">样品购买价: </div> <div class="colBoxContent">{{purchaseInfoDetaiList.productprice}} (产品价格) + {{purchaseInfoDetaiList.freight}} (运费) = {{purchaseInfoDetaiList.productprice + purchaseInfoDetaiList.freight}}RMB</div>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">含税价税点: </div> <div class="colBoxContent">{{purchaseInfoDetaiList.taxleviedpoint ? purchaseInfoDetaiList.taxleviedpoint + '%' : ''}}</div>
                </div>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">下大单返样品费: </div> <div class="colBoxContent">{{purchaseInfoDetaiList.backpurchaseprice}}</div>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">海关退税率: </div> <div class="colBoxContent">{{purchaseInfoDetaiList.tax > 0 ?purchaseInfoDetaiList.tax * 100 + '%' : purchaseInfoDetaiList.tax  + '%'}}</div>
                </div>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">返样品费详情备注: </div> <div class="colBoxContent">{{purchaseInfoDetaiList.backpurchasepricenote}}</div>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">品牌费: </div> <div class="colBoxContent">{{purchaseInfoDetaiList.bandprice}}</div>
                </div>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">样品交期: </div> <div class="colBoxContent">{{purchaseInfoDetaiList.sampledeliverydays}}</div>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">FOB报价品牌费: </div> <div class="colBoxContent">{{purchaseInfoDetaiList.fobbandprice}}</div>
                </div>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                <div class="colbox">
                    <div class="colBoxTitle">FOB头程费: </div> <div class="colBoxContent">{{purchaseInfoDetaiList.packedvolume ? purchaseInfoDetaiList.packedvolume * 93 : 0}}</div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data(){
        return {
             statusList:[4,5,6,7,8,9,14]
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
    }
}
</script>
<style lang="scss" scoped>
.textSpeaing{
    margin-top: 15px;
    // font-weight: bold;
    span {
        // font-weight: normal;
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
.textPostion{
    text-align: center;
}
.colbox{
    display: flex;
    .colBoxTitle{
        font-weight: bold;
        width: 120px;
        text-align: right;
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
</style>