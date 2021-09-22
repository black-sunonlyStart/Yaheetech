<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm" size="mini">
            <el-row>
                 <el-col :span="22">
                     <el-form-item label="样品采购前报价:" prop="samplePurchase">
                            <el-table
                                border
                                :data="ruleForm.productPurchaseVoList"
                                style="width: 100%"
                                ref="singleTable"
                                :header-cell-style="{background:'#f5f7fa',color:'#606266'}"
                                @selection-change="selectionLineChangeHandle"
                                >
                                <el-table-column
                                    type="selection"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="createdName"
                                    label="采购开发"
                                    >
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.createdName" disabled></el-input>      
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    label="最小起订量">
                                    <template slot-scope="scope">
                                        <el-input-number style="width:90px" :controls='false' v-model="scope.row.minbuynum"></el-input-number>      
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    label="首单下单数量">
                                    <template slot-scope="scope">
                                        <el-input-number style="width:90px" :controls='false' v-model="scope.row.firstorderqty"></el-input-number >      
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    label="出厂价(¥)">
                                    <template slot-scope="scope">
                                        <el-input-number  style="width:90px" :controls='false' v-model="scope.row.purchaseprice"></el-input-number >      
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    label="FOB价($)">
                                    <template slot-scope="scope">
                                        <el-input-number  style="width:90px" :controls='false' v-model="scope.row.fobprice"></el-input-number>      
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    label="含税价(¥)">
                                    <template slot-scope="scope">
                                        <el-input-number style="width:90px" :controls='false' v-model="scope.row.taxprice"></el-input-number>      
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    label="选择利润计算采购价">
                                    <template slot-scope="scope">
                                        <el-select v-model="scope.row.calculateprofittype">
                                            <el-option 
                                                v-for="item in devSign"                        
                                                :key="item.key"
                                                :label="item.label"
                                                :value="item.value"
                                                >
                                            </el-option>
                                        </el-select>    
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    label="杂费(¥)">
                                    <template slot-scope="scope">
                                        <el-input-number style="width:90px" :controls='false' v-model="scope.row.MiscPrice"></el-input-number>      
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    label="产品包装费(¥)">
                                    <template slot-scope="scope">
                                        <el-input-number style="width:90px" :controls='false' v-model="scope.row.warpperfee"></el-input-number>      
                                    </template>
                                </el-table-column>
                                <el-table-column>
                                    <template slot="header">
                                        <div class="textPostion">采购成本</div>
                                        <div class="textPostion">净采购价+杂费+包装费(¥)</div>
                                    </template>
                                    <template slot-scope="scope">
                                         <span>{{scope.row.calculateprofittype == 2 ? scope.row.purchaseFOBPrice : (scope.row.calculateprofittype == 3 ? scope.row.taxprice : scope.row.purchaseprice)  + scope.row.miscprice  + scope.row.warpperfee || " " }}</span>      
                                    </template>
                                </el-table-column>
                                <el-table-column                           
                                    label="交期(天)">
                                    <template slot-scope="scope">
                                        <el-input-number style="width:90px" :controls='false' v-model="scope.row.deliverydays"></el-input-number>      
                                    </template>
                                </el-table-column>
                                <el-table-column                        
                                    label="装箱数量(/箱)">
                                    <template slot-scope="scope">
                                        <el-input-number style="width:90px" :controls='false' v-model="scope.row.packingquantity"></el-input-number>      
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="tableText" @click="addTableList">
                                添加一箱
                            </div>
                    </el-form-item>
                 </el-col>
             </el-row>
            <el-row>
                 <el-col :span="22">
                     <el-form-item label="最终报价:" prop="samplePurchase">
                            <el-table
                                border
                                :data="ruleForm.lastProductPurchaseVoList"
                                :header-cell-style="{background:'#f5f7fa',color:'#606266'}"
                                style="width: 100%"
                                >
                                <el-table-column
                                    prop="name"
                                    label="采购开发"
                                    >
                                    <template slot-scope="scope">
                                        <el-input-number style="width:90px" :controls='false'  v-model="scope.row.name"></el-input-number>      
                                    </template>
                                </el-table-column>
                                <el-table-column                        
                                    label="最小起订量">
                                    <template slot-scope="scope">
                                        <el-input-number style="width:90px" :controls='false' v-model="scope.row.date"></el-input-number>      
                                    </template>
                                </el-table-column>
                                <el-table-column                           
                                    label="首单下单数量">
                                    <template slot-scope="scope">
                                        <el-input-number style="width:90px" :controls='false' v-model="scope.row.firstorderqty"></el-input-number>      
                                    </template>
                                </el-table-column>
                                <el-table-column                      
                                    label="出厂价(¥)">
                                    <template slot-scope="scope">
                                        <el-input-number style="width:90px" :controls='false' v-model="scope.row.purchaseprice"></el-input-number>      
                                    </template>
                                </el-table-column>
                                <el-table-column                            
                                    label="FOB价($)">
                                    <template slot-scope="scope">
                                        <el-input-number style="width:90px" :controls='false' v-model="scope.row.fobprice"></el-input-number>      
                                    </template>
                                </el-table-column>
                                <el-table-column                            
                                    label="含税价(¥)">
                                    <template slot-scope="scope">
                                        <el-input-number  style="width:90px" :controls='false' v-model="scope.row.taxprice"></el-input-number>      
                                    </template>
                                </el-table-column>
                                 <el-table-column
                                    label="选择利润计算采购价">
                                    <template slot-scope="scope">
                                        <el-select v-model="scope.row.calculateprofittype">
                                            <el-option 
                                                v-for="item in devSign"                        
                                                :key="item.key"
                                                :label="item.label"
                                                :value="item.value"
                                                >
                                            </el-option>
                                        </el-select>    
                                    </template>
                                </el-table-column>
                                <el-table-column                         
                                    label="杂费(¥)">
                                    <template slot-scope="scope">
                                        <el-input-number style="width:90px" :controls='false' v-model="scope.row.MiscPrice"></el-input-number>      
                                    </template>
                                </el-table-column>
                                <el-table-column                            
                                    label="产品包装费(¥)">
                                    <template slot-scope="scope">
                                        <el-input-number style="width:90px" :controls='false' v-model="scope.row.warpperfee"></el-input-number>      
                                    </template>
                                </el-table-column>
                                <el-table-column>
                                    <template slot="header">
                                        <div class="textPostion">采购成本</div>
                                        <div class="textPostion">净采购价+杂费+包装费(¥)</div>
                                    </template>
                                    <template slot-scope="scope">
                                        <div>{{scope.row.calculateprofittype == 2 ? scope.row.purchaseFOBPrice : (scope.row.calculateprofittype == 3 ? scope.row.taxprice : scope.row.purchaseprice)  + scope.row.miscprice  + scope.row.warpperfee || " "}} </div>   
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    label="交期(天)">
                                    <template slot-scope="scope">
                                        <el-input-number style="width:90px" :controls='false' v-model="scope.row.deliverydays"></el-input-number>      
                                    </template>
                                </el-table-column>
                                <el-table-column                         
                                    label="装箱数量(/箱)">
                                    <template slot-scope="scope">
                                        <el-input-number style="width:90px" :controls='false' v-model="scope.row.packingquantity"></el-input-number>      
                                    </template>
                                </el-table-column>
                            </el-table>
                    </el-form-item>
                 </el-col>
             </el-row>
             <el-row>
                 <el-col :span="7">
                    <el-form-item label="样品购买价:" prop="productprice">
                        <div class="inputBox">
                            <el-input-number :controls='false' v-model="ruleForm.productprice"></el-input-number>
                            <span class="inputUnit">产品价格（RMB）</span>
                        </div> 
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item  prop="freight" label-width="15px">
                            <div class="inputBox">
                                <el-input-number :controls='false' v-model="ruleForm.freight"></el-input-number>
                                <span class="inputUnit">运费（RMB）</span>
                            </div> 
                    </el-form-item>
                 </el-col>

                 <el-col :span="8">
                     <el-form-item label="含税价税点:" prop="taxPoint">
                         <div class="feeForOrderText">
                            <div class="inputBox">
                                <el-input-number :controls='false' v-model="ruleForm.taxleviedpoint"></el-input-number>
                                <span class="inputUnit">%</span>
                            </div> 
                         </div>
                     </el-form-item>
                 </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="下单返样品费:" prop="feeForOrdering">
                        <div class="feeForOrderText">
                            <div class="inputBox">
                                <el-input-number :controls='false' v-model="ruleForm.backpurchaseprice"></el-input-number>
                                <span class="inputUnit">RMB</span>
                            </div> 
                        </div>
                         
                     </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="海关退税率:" prop="feeForOrdering">
                        <div class="feeForOrderText">
                            <div class="inputBox">
                                <el-input-number :controls='false' v-model="ruleForm.tax"></el-input-number>
                                <span class="inputUnit">%</span>
                            </div> 
                         </div>
                     </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="返样品费详情备注:" prop="feeForOrdering">
                        <div class="feeForOrderText">
                            <el-input type="textarea" autosize v-model="ruleForm.backpurchasepricenote"></el-input>
                        </div>  
                     </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="品牌费:" prop="feeForOrdering">
                        <div class="feeForOrderText">
                            <div class="inputBox">
                                <el-input-number :controls='false' v-model="ruleForm.bandprice"></el-input-number>
                                <span class="inputUnit">RMB</span>
                            </div>  
                         </div>
                     </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="样品交期:" prop="sampledeliverydays">
                        <div class="feeForOrderText">
                            <el-date-picker
                                v-model="ruleForm.sampledeliverydays"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </div>   
                     </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="FOB报价品牌费:" prop="feeForOrdering">
                        <div class="feeForOrderText">
                            <div class="inputBox">
                                <el-input-number :controls='false' v-model="ruleForm.fobbandprice"></el-input-number>
                                <span class="inputUnit">$</span>
                            </div>  
                         </div>
                     </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="货好时间:" prop="goodTimeDate">
                        <div class="feeForOrderText">
                            <el-date-picker
                                v-model="ruleForm.goodTimeDate"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </div>   
                     </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="FOB头程费:" prop="feeForOrdering">
                        <div class="feeForOrderText">
                            <div class="inputBox">
                                <el-input-number :controls='false' v-model="ruleForm.packedvolume"></el-input-number>
                                <span class="inputUnit">RMB</span>
                            </div>  
                        </div>
                     </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="货好时间详情备注:" prop="goodTimeDate"> 
                        <div class="feeForOrderText">
                            <el-input type="textarea" autosize v-model="ruleForm.feeForOrdering"></el-input>
                        </div>      
                     </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div class="bottomButton">
            <el-button type="primary" @click="submitForm('ruleForm')" size="mini">保存</el-button>
            <el-button @click="resetForm('ruleForm')" size="mini">取消</el-button>
        </div>
    </div>
</template>
<script>
import {productPurchase} from '@/api/user.js'
export default {
    name:'purchaseInfoEdit',
    data(){
        return {
            selectRow:[],
            ruleForm:{
                createdName:'',
                taxleviedpoint:'',
                backpurchaseprice:'',
                tax:'',
                backpurchasepricenote:'',
                bandprice:'',
                sampledeliverydays:'',
                fobbandprice:'',
                packedvolume:'',
                purchaseprice:0,
                productPurchaseVoList:[
                    {
                        createdName:'',
                        minbuynum:''
                    }
                ],
                lastProductPurchaseVoList:[],
            },
            rules:{
                productprice: [{ required: true, message: '请填写样品购买价', trigger: 'blur' }],
                sampledeliverydays: [{ required: true, message: '请选择样品交期', trigger: 'blur' }],
                freight: [{ required: true, message: '请填写运费', trigger: 'blur' }],
            },
            devSign:[
                {
                    label: '出厂价',
                    key: 1,
                    value: 1
                },
                {
                    label: 'FOB价',
                    key: 2,
                    value: 2
                },    
                {
                    label: '含税价',
                    key: 3,
                    value: 3
                },
            ]
        }
    },
    computed:{
        costPrice(){
            return this.purchaseInfoDetaiList.productPurchaseVoList.costPrice
        }
    },
    props:{
        purchaseInfoDetaiList:{
            type:Object,
            default:() => ({})
        }
    },
    mounted(){
        
        this.getDetailList()
    },
    methods:{
        selectionLineChangeHandle(val){
            this.selectRow = val
            if(val.length > 1){
                this.$message({
                    type: 'error', 
                    message:'只能选择一条数据',
                    offset:220
                })
                return
            }
        },
        getDetailList(){
            this.ruleForm = {
                createdName :this.purchaseInfoDetaiList.createdName,
                taxleviedpoint :this.purchaseInfoDetaiList.taxleviedpoint,
                backpurchaseprice :this.purchaseInfoDetaiList.backpurchaseprice,
                tax :this.purchaseInfoDetaiList.tax,
                backpurchasepricenote :this.purchaseInfoDetaiList.backpurchasepricenote,
                bandprice :this.purchaseInfoDetaiList.bandprice,
                sampledeliverydays :this.purchaseInfoDetaiList.sampledeliverydays,
                fobbandprice :this.purchaseInfoDetaiList.fobbandprice,
                packedvolume :this.purchaseInfoDetaiList.packedvolume * 93 || '',
                productPurchaseVoList :this.purchaseInfoDetaiList.productPurchaseVoList || [],
                lastProductPurchaseVoList :this.purchaseInfoDetaiList.lastProductPurchaseVoList || [],
                purchaseprice :this.purchaseInfoDetaiList.purchaseprice,
            }
            this.$nextTick(() => {
                this.$refs.singleTable.toggleRowSelection(this.ruleForm.productPurchaseVoList[0])
            })
             
        },
        addTableList(){
            let createdName = ''
            if(this.purchaseInfoDetaiList.productPurchaseVoList && this.purchaseInfoDetaiList.productPurchaseVoList[0]){
                 createdName = this.purchaseInfoDetaiList.productPurchaseVoList[0].createdName
            }
            
          this.ruleForm.productPurchaseVoList.push({
              createdName:createdName
          })
          if(this.selectRow.length == 0 || (this.selectRow.length == 1 && this.selectRow[0] == undefined)){
          this.$nextTick(() => {
                this.$refs.singleTable.toggleRowSelection(this.ruleForm.productPurchaseVoList[0])
            })
          }
      },
      submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                let params = {
                    developmentId: this.$route.params.developmentId,
                    productId: this.$route.params.productId,
                    productCountryId: this.$route.params.productCountryId,
                    development:{//开发信息
                        id:this.$route.params.developmentId,//开发id
                        productprice:this.ruleForm.productprice,//样品购买价
                        freight:this.ruleForm.freight,//运费
                        backpurchaseprice:this.ruleForm.backpurchaseprice,//下单返样品费
                        backpurchasepricenote:this.ruleForm.backpurchasepricenote,//返样品费详情备注
                        taxleviedpoint:this.ruleForm.taxleviedpoint,//含税价税点
                        tax:this.ruleForm.tax,//海关退税率
                        bandprice:this.ruleForm.bandprice,//品牌费
                    },
                    sampleDeliveryOn:this.ruleForm.sampledeliverydays,//样品交期
                    sampledeliverydays:4,//样品交期--时间差
                    packedvolume:this.ruleForm.packedvolume,//FOB头程费
                    gooddate:this.ruleForm.goodTimeDate,//货好时间
                    goodnote:this.ruleForm.feeForOrdering,//货好时间详情备注
                    purchases:[//采购信息
                    ]
                } 
                
                let tableList = []
                if(this.selectRow.length != 0){
                        this.selectRow.type = 0
                        tableList.push(this.selectRow)
                }
                if(this.ruleForm.lastProductPurchaseVoList.length != 0){
                        this.ruleForm.lastProductPurchaseVoList.type = 1
                        tableList.push(this.ruleForm.lastProductPurchaseVoList)
                }
                params.purchases = tableList.flat()
                productPurchase(params).then(res => {
                    if(res.code == 200){
                        this.$message({
                            type: 'success', 
                            message:'保存成功',
                            offset:220
                        })
                        this.$emit('closeEdit','false')
                    }
                })
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
      resetForm() {
            // this.$refs[formName].resetFields();
            this.$emit('closeEdit','false')
        },
        handleSelectionChange(val){
            this.rows = val
            if(val.length > 1) return
        }
    }
}
</script>
<style lang="scss" scoped>
.bottomButton{
    width: 100%;
    height: 30px;   
    display: flex;
    justify-content: flex-end;
}
.tableText{
    color:#3366cc ;
    cursor: pointer;
}
.feeForOrderText{
    width: 392px;
}
::v-deep.inputBox{
        width: 300px;
        display: inline-block;
        // display: flex;
        .el-input-number {
            width: 150px;
            .el-input__inner{
                color: black !important;
                border-top-right-radius: 0px !important;
                border-bottom-right-radius: 0px !important;
            }
        }
    }
    .inputUnit{
        text-align: center;
        line-height: 28px;
        background-color: #F5F7FA;
        display: inline-block;
        height: 28px;
        width: 105px;
        border: 1px solid #E4E7ED;
        color: black;
        font-size: 12px;
        position: relative;
        top: 1px;
        border-top-right-radius: 4px ;
        border-bottom-right-radius: 4px ;
    }
</style>