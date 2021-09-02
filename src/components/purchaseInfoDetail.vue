<template>
    <div>
        <el-row class="textSpeaing" >
            <el-col :span="3">
                <span style="font-weight:bold">样品采购前报价：</span>
            </el-col>
            <el-col :span="20">
                <el-table
                     border
                    :data="purchaseInfoDetaiList.productPurchaseVoList"
                    style="width: 100%">
                    <el-table-column
                        label="选择"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="createdName"
                        label="采购开发"
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
                        label="出厂价">
                        <template slot-scope="scope">
                            <div>
                                <span>{{scope.row.purchaseprice}}</span>
                                <span v-if="scope.row.purchaseprice == 1">√</span> 
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="FOB价">
                         <template slot-scope="scope">
                            <div>
                                <span>{{scope.row.fobprice }}</span>
                                <span v-if="scope.row.purchaseprice  == 2">√</span> 
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="含税价">
                        <template slot-scope="scope">
                            <div>
                                <span>{{scope.row.taxprice}}</span>
                                <span v-if="scope.row.purchaseprice == 3">√</span> 
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="MiscPrice"
                        label="杂费">
                    </el-table-column>
                    <el-table-column
                        prop="WarpperFee"
                        label="产品包装费">
                    </el-table-column>
                    <el-table-column
                        label="采购成本
                        净采购价+杂费+包装费">
                        <template slot-scope="scope">
                            <div>
                                <span>{{scope.row.costPrice  + scope.row.miscprice  + scope.row.warpperfee }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="deliverydays"
                        label="交期">
                    </el-table-column>
                    <el-table-column
                        prop="packingquantity"
                        label="装箱数量">
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row class="textSpeaing" >
            <el-col :span="3">
                <span style="font-weight:bold">最终报价：</span>
            </el-col>
            <el-col :span="20">
                <el-table
                     border
                    :data="purchaseInfoDetaiList.lastProductPurchaseVoList"
                    style="width: 100%">
                    <el-table-column
                        prop="date"
                        label="最小起订量"
                       >
                    </el-table-column>
                    <el-table-column
                        prop="firstorderqty"
                        label="首单下单数量"
                       >
                    </el-table-column>
                    <el-table-column
                        label="出厂价">
                        <template slot-scope="scope">
                            <div>
                                <span>{{scope.row.purchaseprice}}</span>
                                <span v-if="scope.row.purchaseprice == 1">√</span> 
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="FOB价">
                         <template slot-scope="scope">
                            <div>
                                <span>{{scope.row.fobprice }}</span>
                                <span v-if="scope.row.purchaseprice  == 2">√</span> 
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="含税价">
                        <template slot-scope="scope">
                            <div>
                                <span>{{scope.row.taxprice}}</span>
                                <span v-if="scope.row.purchaseprice == 3">√</span> 
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="MiscPrice"
                        label="杂费">
                    </el-table-column>
                    <el-table-column
                        prop="WarpperFee"
                        label="产品包装费">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="采购成本
                        净采购价+杂费+包装费">
                        <template slot-scope="scope">
                            <div>
                                <span>{{scope.row.costPrice  + scope.row.miscprice  + scope.row.warpperfee }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="deliverydays"
                        label="交期">
                    </el-table-column>
                    <el-table-column
                        prop="packingquantity"
                        label="装箱数量">
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                样品购买价:<span>{{purchaseInfoDetaiList.productprice}} + {{purchaseInfoDetaiList.freight}} = {{purchaseInfoDetaiList.productprice + purchaseInfoDetaiList.freight}}$</span>
            </el-col>
            <el-col :span="10">
                含税价税点:<span>{{purchaseInfoDetaiList.taxleviedpoint}}</span>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                下大单返样品费:<span>{{purchaseInfoDetaiList.backpurchaseprice}}</span>
            </el-col>
            <el-col :span="10">
                海关退税率:<span>{{purchaseInfoDetaiList.tax > 0 ? purchaseInfoDetaiList.tax * 100 : purchaseInfoDetaiList.tax + '%'}}</span>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                返样品费详情备注:<span>{{purchaseInfoDetaiList.backpurchasepricenote}}</span>
            </el-col>
            <el-col :span="10">
                品牌费:<span>{{purchaseInfoDetaiList.bandprice}}</span>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                样品交期:<span>{{purchaseInfoDetaiList.sampledeliverydays}}</span>
            </el-col>
            <el-col :span="10">
                FOB报价品牌费:<span>{{purchaseInfoDetaiList.fobbandprice}}</span>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                FOB头程费:<span>{{purchaseInfoDetaiList.packedvolume * 93}}</span>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data(){
        return {
             
        }
    },
    props:{
        purchaseInfoDetaiList:{
            type:Object,
            default:() => ({})
        }        
    }
}
</script>
<style lang="scss" scoped>
.textSpeaing{
    margin-top: 15px;
    font-weight: bold;
    span {
        font-weight: normal;
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