<template>
    <div v-loading="loading">
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
                                     label="选择"
                                     width="50px"
                                    >
                                    <template slot-scope="scope">
                                        <el-radio :label="scope.$index" v-model="radio" :disabled='canTableEdit' @change.native="handleSelectionChange(scope.row,scope.$index)">&nbsp;</el-radio>
                                    </template>
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
                                        <el-input-number style="width:100%" :controls='false' :disabled='canTableEdit' v-model="scope.row.minbuynum" :min="1"></el-input-number>      
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    label="首单下单数量"
                                    width="110px"
                                    >
                                    <template slot-scope="scope">
                                        <el-input-number style="width:100%" :controls='false' :disabled='canTableEdit' v-model="scope.row.firstorderqty" :min="1"></el-input-number >      
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    label="出厂价(¥)">
                                    <template slot-scope="scope">
                                        <el-input-number  style="width:100%" :controls='false' :disabled='canTableEdit' v-model="scope.row.purchaseprice"></el-input-number >      
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    label="FOB价($)">
                                    <template slot-scope="scope">
                                        <el-input-number  style="width:100%" :controls='false' :disabled='canTableEdit' v-model="scope.row.fobprice"></el-input-number>      
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    label="含税价(¥)">
                                    <template slot-scope="scope">
                                        <el-input-number style="width:100%" :controls='false' :disabled='canTableEdit' v-model="scope.row.taxprice"></el-input-number>      
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    label="选择利润计算采购价"
                                    width="120px"
                                    >
                                    <template slot-scope="scope">
                                        <el-select v-model="scope.row.calculateprofittype" :disabled='canTableEdit'>
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
                                        <el-input-number style="width:100%" :controls='false' v-model="scope.row.miscprice" :disabled='canTableEdit'></el-input-number>      
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    label="产品包装费(¥)"
                                    width="110px"
                                    >
                                    <template slot-scope="scope">
                                        <el-input-number style="width:100%" :controls='false' v-model="scope.row.warpperfee" :disabled='canTableEdit'></el-input-number>      
                                    </template>
                                </el-table-column>
                                <el-table-column
                                     width="200px"
                                >
                                    <template slot="header">
                                        <div class="textPostion">采购成本</div>
                                        <div class="textPostion">净采购价+杂费+包装费(¥)</div>
                                    </template>
                                    <template slot-scope="scope">
                                         <span>{{changePrice(scope.row.calculateprofittype,scope.row.fobprice,scope.row.taxprice,scope.row.purchaseprice,scope.row.miscprice,scope.row.warpperfee)|| 0 }}</span>      
                                    </template>
                                </el-table-column>
                                <el-table-column                           
                                    label="交期(天)"
                                    width='80px'
                                    >
                                    <template slot-scope="scope">
                                        <el-input-number style="width:100%" :controls='false' v-model="scope.row.deliverydays" :disabled='canTableEdit' :min="1"></el-input-number>      
                                    </template>
                                </el-table-column>
                                <el-table-column                        
                                    label="装箱数量(/箱)"
                                    width="110px"
                                    >
                                    <template slot-scope="scope">
                                        <el-input-number style="width:100%" :controls='false' v-model="scope.row.packingquantity" :disabled='canTableEdit'></el-input-number>      
                                    </template>
                                </el-table-column>
                                <el-table-column                        
                                    label="操作"
                                    width="50px"
                                    >
                                    <template slot-scope="scope">
                                        <div v-if="scope.$index == 0">
                                            
                                        </div>
                                        <el-button
                                            v-else
                                            @click.native.prevent="deleteRow(scope.$index, ruleForm.productPurchaseVoList)"
                                            type="text"
                                            size="small">
                                            移除
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="tableText" @click="addTableList" v-if="!statusList.includes(nowStatus)">
                                添加一条
                            </div>
                    </el-form-item>
                 </el-col>
             </el-row>
            <el-row v-if="statusList.includes(nowStatus)">
                 <el-col :span="22">
                     <el-form-item label="最终报价:" prop="samplePurchase">
                            <el-table
                                border
                                :data="ruleForm.lastProductPurchaseVoList"
                                :header-cell-style="{background:'#f5f7fa',color:'#606266'}"
                                style="width: 100%"
                                >
                                <el-table-column
                                    prop="createdName"
                                    label="采购开发"
                                    >
                                    <template slot-scope="scope">
                                        <el-input style="width:100%"  v-model="scope.row.createdName" disabled></el-input>      
                                    </template>
                                </el-table-column>
                                <el-table-column                        
                                    label="最小起订量">
                                    <template slot-scope="scope">
                                        <el-input-number style="width:100%" :controls='false' v-model="scope.row.minbuynum" :disabled='canEdit' :min="1"></el-input-number>      
                                    </template>
                                </el-table-column>
                                <el-table-column                           
                                    label="首单下单数量">
                                    <template slot-scope="scope">
                                        <el-input-number style="width:100%" :controls='false' v-model="scope.row.firstorderqty" :disabled='canEdit' :min="1"></el-input-number>      
                                    </template>
                                </el-table-column>
                                <el-table-column                      
                                    label="出厂价(¥)">
                                    <template slot-scope="scope">
                                        <el-input-number style="width:100%" :controls='false' v-model="scope.row.purchaseprice" :disabled='canEdit'></el-input-number>      
                                    </template>
                                </el-table-column>
                                <el-table-column                            
                                    label="FOB价($)">
                                    <template slot-scope="scope">
                                        <el-input-number style="width:100%" :controls='false' v-model="scope.row.fobprice" :disabled='canEdit'></el-input-number>      
                                    </template>
                                </el-table-column>
                                <el-table-column                            
                                    label="含税价(¥)">
                                    <template slot-scope="scope">
                                        <el-input-number  style="width:100%" :controls='false' v-model="scope.row.taxprice" :disabled='canEdit'></el-input-number>      
                                    </template>
                                </el-table-column>
                                 <el-table-column
                                    label="选择利润计算采购价"
                                     width="120px"
                                    >
                                    <template slot-scope="scope">
                                        <el-select v-model="scope.row.calculateprofittype"
                                            :disabled='canEdit'
                                        >
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
                                        <el-input-number style="width:100%" :controls='false' v-model="scope.row.miscprice" :disabled='canEdit'></el-input-number>      
                                    </template>
                                </el-table-column>
                                <el-table-column                            
                                    label="产品包装费(¥)">
                                    <template slot-scope="scope">
                                        <el-input-number style="width:100%" :controls='false' v-model="scope.row.warpperfee" :disabled='canEdit'></el-input-number>      
                                    </template>
                                </el-table-column>
                                <el-table-column
                                     width="200px"
                                >
                                    <template slot="header">
                                        <div class="textPostion">采购成本</div>
                                        <div class="textPostion">净采购价+杂费+包装费(¥)</div>
                                    </template>
                                    <template slot-scope="scope">
                                        <div>{{changePrice(scope.row.calculateprofittype,scope.row.fobprice,scope.row.taxprice,scope.row.purchaseprice,scope.row.miscprice,scope.row.warpperfee) || 0}} </div>   
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    label="交期(天)"
                                    width='80px'
                                    >
                                    <template slot-scope="scope">
                                        <el-input-number style="width:100%" :controls='false' v-model="scope.row.deliverydays" :disabled='canEdit' :min="1"></el-input-number>      
                                    </template>
                                </el-table-column>
                                <el-table-column                         
                                    label="装箱数量(/箱)">
                                    <template slot-scope="scope">
                                        <el-input-number style="width:100%" :controls='false' v-model="scope.row.packingquantity" :disabled='canEdit'></el-input-number>      
                                    </template>
                                </el-table-column>
                            </el-table>
                    </el-form-item>  
                 </el-col>
             </el-row>
             <el-row>
                 <el-col :span="7" :xs="24" :sm="24" :md="11" :lg="10" :xl="7">
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
                    <el-form-item label="出口退税率:" prop="tax">
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
                            <el-input type="textarea" autosize v-model="ruleForm.backpurchasepricenote" maxlength="200" show-word-limit>></el-input>
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
                    <el-form-item label="样品交期:" prop="sampleDeliveryOn">
                        <div class="feeForOrderText">
                            <el-date-picker
                                v-model="ruleForm.sampleDeliveryOn"
                                type="date"
                                placeholder="选择日期"
                                @change="changeDate"
                                >
                            </el-date-picker>
                            距样品交期: {{ ruleForm.sampledeliverydays }}天
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
                    <el-form-item label="货好时间:" prop="goodTimeDate" v-if="statusList.includes(nowStatus)">
                        <div class="feeForOrderText">
                            <el-date-picker
                                v-model="ruleForm.goodTimeDate"
                                type="date"
                                placeholder="选择日期"
                                :disabled='canEdit'
                                >
                            </el-date-picker>
                        </div>   
                     </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="FOB头程费:" prop="feeForOrdering">
                        <div class="feeForOrderText">
                            <div class="inputBox">
                                <el-input-number :controls='false' :precision="2" v-model="ruleForm.fobPrice" disabled></el-input-number>
                                <span class="inputUnit">RMB</span>
                            </div>  
                        </div>
                     </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="货好时间详情备注:" v-if="statusList.includes(nowStatus)"> 
                        <div class="feeForOrderText">
                            <el-input type="textarea" autosize v-model="ruleForm.feeForOrdering" maxlength="200" show-word-limit></el-input>
                        </div>      
                     </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div class="bottomButton">
            <el-button type="primary" @click="submitForm('ruleForm')" size="mini" v-track="{triggerType:'click',currentUrl: $route.path,behavior:'保存',businessCode:'采购信息'}" perkey='ERP.Product.ProductDev.SalesManEdit'>保存</el-button>
            <el-button @click="resetForm('ruleForm')" size="mini" v-track="{triggerType:'click',currentUrl: $route.path,behavior:'取消',businessCode:'采购信息'}">取消</el-button>
        </div>
    </div>
</template>
<script>
import {productPurchase} from '@/api/user.js'
export default {
    name:'purchaseInfoEdit',
    data(){
        return {
            loading:false,
            days:'',
            statusList:[4,5,6,7,8,9,14],
            selectRow:[],
             radio:'',
            ruleForm:{
                createdName:'',
                taxleviedpoint:'',
                backpurchaseprice:'',
                tax:0,
                backpurchasepricenote:'',
                bandprice:'',
                sampledeliverydays:'',
                sampleDeliveryOn:'',
                fobbandprice:'',
                packedvolume:'',
                purchaseprice:'',
               
                productPurchaseVoList:[
                    {
                        createdName:'',
                        // minbuynum:''
                    }
                ],
                lastProductPurchaseVoList:[],
            },
            rules:{
                productprice: [{ required: true, message: '请填写样品购买价', trigger: 'blur' }],
                sampleDeliveryOn: [{ required: true, message: '请选择样品交期', trigger: 'blur' }],
                goodTimeDate: [{ required: true, message: '请选择货好时间', trigger: 'blur' }],
                freight: [{ required: true, message: '请填写运费', trigger: 'blur' }],
                tax: [{ required: true, message: '请填写税率', trigger: 'blur' }],
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
                    value:3
                },
            ],
            seleindex:0,
        }
    },
    computed:{
        costPrice(){
            return this.purchaseInfoDetaiList.productPurchaseVoList.costPrice
        },
        canEdit(){
            if(this.nowStatus == 4){
                return false
            }else {
                return true
            }
        },
        canTableEdit(){
            if(!this.statusList.includes(this.nowStatus)){
                return false
            }else {
                return true
            }
        }
    },
    props:{
        purchaseInfoDetaiList:{
            type:Object,
            default:() => ({})
        },
         nowStatus:{
            type:Number,
        }
    },
    mounted(){    
        this.getDetailList()
    },
    methods:{
        changePrice(calculateprofittype,fobprice = 0,taxprice = 0,purchaseprice = 0,miscprice = 0,warpperfee = 0){
            if(!calculateprofittype && !this.purchaseInfoDetaiList.exchangeRate )return ''
            if(calculateprofittype == 2) {
                return (fobprice * this.purchaseInfoDetaiList.exchangeRate + miscprice + warpperfee).toFixed(2)
            }else if (calculateprofittype == 3){
              return  (taxprice + miscprice + warpperfee).toFixed(2)
            }else {
                return (purchaseprice + miscprice + warpperfee).toFixed(2)
            }
        },
        deleteRow(index, rows) {
            rows.splice(index, 1);
        },
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
                sampleDeliveryOn :this.purchaseInfoDetaiList.sampleDeliveryOn,
                productprice:this.purchaseInfoDetaiList.productprice,
                goodTimeDate:this.purchaseInfoDetaiList.gooddate,
                feeForOrdering:this.purchaseInfoDetaiList.goodnote,
                sampledeliverydays :this.purchaseInfoDetaiList.sampledeliverydays,
                freight:this.purchaseInfoDetaiList.freight,
                fobbandprice :this.purchaseInfoDetaiList.fobbandprice,
                packedvolume :this.purchaseInfoDetaiList.packedvolume * 93 || '',
                productPurchaseVoList :this.purchaseInfoDetaiList.productPurchaseVoList || [],
                lastProductPurchaseVoList :this.purchaseInfoDetaiList.lastProductPurchaseVoList || [],
                purchaseprice :this.purchaseInfoDetaiList.purchaseprice,
                fobPrice :this.purchaseInfoDetaiList.fobPrice,
            }
            this.$nextTick(() => {
                if(this.purchaseInfoDetaiList.productPurchaseVoList && this.purchaseInfoDetaiList.productPurchaseVoList.length > 0){
                    if(this.selectRow.length == 0){
                        this.radio = 0
                        this.selectRow = this.ruleForm.productPurchaseVoList[0]
                    }
                    this.purchaseInfoDetaiList.productPurchaseVoList.forEach((item,index) => {
                        if(item.isdefault){
                            this.radio = index
                        }                       
                    })
                    
                }
                
            })
            if(this.purchaseInfoDetaiList.lastProductPurchaseVoList.length == 0 && this.statusList.includes(this.nowStatus)){
                this.ruleForm.lastProductPurchaseVoList.push({
                    name:this.purchaseInfoDetaiList.orderProduct,
                    isdefault:true,
                    type:1,
                })
            }
        },
        addTableList(){
            let createdName = ''
            if(this.purchaseInfoDetaiList){
                 createdName = this.purchaseInfoDetaiList.orderProduct
            }
            
          this.ruleForm.productPurchaseVoList.push({
              createdName:createdName,
              isdefault:false,
              type:0
          })
          if(this.selectRow.length == 0 || (this.selectRow.length == 1 && this.selectRow[0] == undefined)){
          this.$nextTick(() => {
                this.radio = 0
                this.selectRow = this.ruleForm.productPurchaseVoList[0]
            })
          }
      },
      submitForm(formName) {
          if(!this.selectRow || this.selectRow.length == 0){
              this.$message({
                            type: 'error', 
                            message:'请选择一条采购前报价数据',
                            offset:220
                        })
                        return
          }
            this.$refs[formName].validate((valid) => {
            if (valid) {
                let params = {
                    developmentId: this.$route.query.developmentId,
                    productId: this.$route.query.productId,
                    productCountryId: this.$route.query.productCountryId,
                    development:{//开发信息
                        id:this.$route.query.developmentId,//开发id
                        productprice:this.ruleForm.productprice,//样品购买价
                        freight:this.ruleForm.freight,//运费
                        backpurchaseprice:this.ruleForm.backpurchaseprice,//下单返样品费
                        backpurchasepricenote:this.ruleForm.backpurchasepricenote,//返样品费详情备注
                        taxleviedpoint:this.ruleForm.taxleviedpoint,//含税价税点
                        tax:this.ruleForm.tax,//海关退税率
                        bandprice:this.ruleForm.bandprice,//品牌费
                        fobbandprice:this.ruleForm.fobbandprice,//FOB
                    },
                    sampleDeliveryOn:this.ruleForm.sampleDeliveryOn,//样品交期
                    sampledeliverydays:this.ruleForm.sampledeliverydays,//样品交期--时间差
                    packedvolume:this.ruleForm.packedvolume,//FOB头程费
                    gooddate:this.ruleForm.goodTimeDate,//货好时间
                    goodnote:this.ruleForm.feeForOrdering,//货好时间详情备注
                    purchases:[//采购信息
                    ]
                } 
                this.ruleForm.productPurchaseVoList.forEach(item => {
                    item.isdefault = false
                })
                this.ruleForm.productPurchaseVoList[this.seleindex].isdefault = true
                let tableList = []
                tableList.push( this.ruleForm.productPurchaseVoList)
                if(this.ruleForm.lastProductPurchaseVoList.length != 0){
                        this.ruleForm.lastProductPurchaseVoList.type = 1
                        tableList.push(this.ruleForm.lastProductPurchaseVoList)
                }
                params.purchases = tableList.flat()
                this.loading = true
                productPurchase(params).then(res => {
                    if(res.code == 200){
                        this.$message({
                            type: 'success', 
                            message:'保存成功',
                            offset:220
                        })
                        this.loading = false
                        this.$emit('closeEdit','false')                 
                    }else {
                        this.loading = false
                    }
                }).catch(err => { this.loading = false })
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
      resetForm() {
            this.$emit('closeEdit','false')
        },
        handleSelectionChange(val,index){
            this.selectRow = val
            this.seleindex = index
            if(val.length > 1) return
        },
        changeDate(val){
            const start = Date.now();
            let end = val.getTime()
            let difftime = (end - start)/1000
            let days = parseInt(difftime/86400)
            if(days > 0){
                this.ruleForm.sampledeliverydays = days
            }else {
                this.ruleForm.sampledeliverydays = 0
            }
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
    display: inline-block;
}
.feeForOrderText{
    width: 392px;
}
::v-deep.inputBox{
        width: 300px;
        display: inline-block;
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