<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm" size="mini">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="英文标题:" prop="staRating">
                        <el-input v-model="ruleForm.staRating"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="业务开发:" prop="targetPrice"> 
                        <el-select 
                            v-model="ruleForm.region"
                            filterable 
                            >
                            <el-option 
                                v-for="item in targetPrice"                        
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                                >
                            </el-option>
                        </el-select>        
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="英文关键字:" prop="westaRating">
                        <el-input v-model="ruleForm.westaRating"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="采购开发:" prop="dailySales">
                        <el-select 
                            v-model="ruleForm.dailySales"
                            filterable 
                            >
                            <el-option 
                                v-for="item in dailySales"                        
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                                >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="中文概述:" prop="rateRequirements">
                        <el-input type="textarea" autosize v-model="ruleForm.rateRequirements"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="开发优先级:" prop="orderQuantity">
                        <el-radio-group v-model="ruleForm.orderQuantity">
                            <el-radio :label="0">高</el-radio>
                            <el-radio :label="1">中</el-radio>
                            <el-radio :label="2">低</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="德文标题:" >
                        <el-input v-model="ruleForm.titleDe"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="是否安吉产品:" prop="isanji">
                        <el-radio-group v-model="ruleForm.isanji">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="0">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="日文标题:" >
                        <el-input v-model="ruleForm.titleJp"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="是否需要专利确认:" prop="ispatentproduct">
                        <el-radio-group v-model="ruleForm.ispatentproduct">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="0">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="是否品牌:" prop="specialPackaging">
                        美：
                        <el-select 
                            style="width:80px"
                            v-model="ruleForm.brandUs"
                            >
                            <el-option 
                                v-for="item in isBrandSign"                        
                                :key="item.key"
                                :label="item.label"
                                :value="item.value"
                                >
                            </el-option>
                        </el-select>
                        英：
                        <el-select 
                        style="width:80px"
                            v-model="ruleForm.brandEu"
                            >
                            <el-option 
                                v-for="item in isBrandSign"                        
                                :key="item.key"
                                :label="item.label"
                                :value="item.value"
                                >
                            </el-option>
                        </el-select>
                        德：
                        <el-select
                        style="width:80px" 
                            v-model="ruleForm.brandDe"
                            >
                            <el-option 
                                v-for="item in isBrandSign"                        
                                :key="item.key"
                                :label="item.label"
                                :value="item.value"
                                >
                            </el-option>
                        </el-select>
                        澳：
                        <el-select 
                        style="width:80px"
                            v-model="ruleForm.brandAo"
                            >
                            <el-option 
                                v-for="item in isBrandSign"                        
                                :key="item.key"
                                :label="item.label"
                                :value="item.value"
                                >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Duty税率:" prop="productMarket">
                        <div class="taxRate">
                            US:<el-input v-model="ruleForm.productMarketUS">
                                <template slot="append">%</template>
                            </el-input>
                            GB:<el-input v-model="ruleForm.productMarketGB">
                                <template slot="append">%</template>
                            </el-input>
                            DE:<el-input v-model="ruleForm.productMarketDE">
                                <template slot="append">%</template>
                            </el-input>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="选择开发市场:" prop="dailySales">
                        <el-select 
                            v-model="ruleForm.marksContry1"
                            @change="seleContry"
                            >
                            <el-option 
                                v-for="item in dailySales1"                        
                                :key="item.key"
                                :label="item.label"
                                :value="item.value"
                                >
                            </el-option>
                        </el-select>
                        <el-select 
                            v-model="ruleForm.marksContry2"
                            @change="selectSale"
                            >
                            <el-option 
                                v-for="item in dailySales2"                        
                                :key="item.id"
                                :label="item.platformname"
                                :value="item.platformname"
                                >
                            </el-option>
                        </el-select>
                        <el-select 
                            v-model="ruleForm.marksContry3"
                            @change="selectBox"
                            >
                            <el-option 
                                v-for="item in dailySales3"                        
                                :key="item.id"
                                :label="item.name"
                                :value="item.name"
                                >
                            </el-option>
                        </el-select>
                        <el-button @click="addRemarks" type="primary">添加市场</el-button>
                        添加不同国家站点，请在列表页的操作下拉菜单选择”开发其它市场”
                    </el-form-item>
                </el-col>
            </el-row> 
            <el-row>
                <el-col :span="12">
                    <el-form-item label="计算海运费方式:" prop="seaFreight">
                        <el-select 
                            v-model="ruleForm.seaFreight"
                            >
                            <el-option 
                                v-for="item in seaFreightSign"                        
                                :key="item.key"
                                :label="item.label"
                                :value="item.value"
                                >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>    
        </el-form>
        <el-row>
            <el-col v-for="(item,index) in devInformationDetaiList.productMarketList" :key="item.id" :span="12">
                <span class="mainTitle">{{item.platformname}}-{{item.countrycode}}   {{item.warehouseName}}</span> <el-button type="primary" @click="delProductMarketList(index)" size="mini" class="delButton">删除</el-button>
                <el-form :model="item" :rules="wareHouseRules" ref="ruleForm" label-width="200px" class="demo-ruleForm" size="mini">
                    <el-form-item label="产品开发价:" prop="developmentprice" >
                        <div class="inputBox"> 
                            <span class="inputUnit">GPB</span>
                            <el-input-number  :controls='false'  :precision="2" :step="0.1" v-model="item.developmentprice"></el-input-number>
                            
                        </div>
                        <el-button>计算利润</el-button>
                    </el-form-item>
                    <el-form-item label="SFP开发价:" prop="sfpDevelopmentPrice">
                        <div class="inputBox"> 
                            <span class="inputUnit">GPB</span>
                            <el-input-number  :controls='false'  :precision="2" :step="0.1" v-model="item.sfpDevelopmentPrice"></el-input-number>
                        </div>
                    </el-form-item>
                    <el-form-item label="SFP运费:" prop="sfpOceanFreight">
                        <div class="inputBox"> 
                            <span class="inputUnit">GPB</span>
                            <el-input-number  :controls='false'  :precision="2" :step="0.1" v-model="item.sfpOceanFreight"></el-input-number>
                        </div>
                    </el-form-item>
                    <el-form-item label="发货包装费:" prop="packagingfee">
                        <div class="inputBox">
                            <span class="inputUnit">GPB</span>
                            <el-input-number  :controls='false'  :precision="2" :step="0.1" v-model="item.packagingfee"></el-input-number>
                        </div>
                    </el-form-item>
                    <el-form-item label="本地化费用:" prop="localizationfee">
                        <div class="inputBox">
                            <span class="inputUnit">GPB</span>
                            <el-input-number  :controls='false'  :precision="2" :step="0.1" v-model="item.localizationfee"></el-input-number>
                        </div>
                    </el-form-item>
                    <el-form-item label="PI:" prop="piprice">
                        <div class="inputBox"> 
                            <span class="inputUnit">GPB</span>
                            <el-input-number  :controls='false' disabled :precision="2" :step="0.1" v-model="item.piprice"></el-input-number>
                        </div>
                    </el-form-item>
                    <el-form-item label="空/海运费:" prop="SFProductPrice">
                        <div class="inputBox">
                            <span class="inputUnit">GPB</span>
                            <el-input-number  :controls='false' disabled :precision="2" :step="0.1" v-model="item.SFProductPrice"></el-input-number>
                        </div>
                        <el-select 
                            v-model="item.seaSkySelectKey"
                            >
                            <el-option 
                                v-for="item in seaSkySelect"                        
                                :key="item.key"
                                :label="item.label"
                                :value="item.value"
                                >
                            </el-option>
                        </el-select> 
                    </el-form-item>
                    <el-form-item label="港前费用:" prop="inlandportcosts">
                        <div class="inputBox">
                            <span class="inputUnit">GPB</span>
                            <el-input-number  :controls='false' disabled :precision="2" :step="0.1" v-model="item.inlandportcosts"></el-input-number>
                        </div>
                    </el-form-item>
                    <el-form-item label="目的地港费用:" prop="outlandportcosts">
                        <div class="inputBox">
                            <span class="inputUnit">GPB</span>
                            <el-input-number  :controls='false' disabled :precision="2" :step="0.1" v-model="item.outlandportcosts"></el-input-number>
                        </div>
                    </el-form-item>
                    <el-form-item label="进口DUTY费:" prop="duty">
                        <div class="inputBox">
                            <span class="inputUnit">GPB</span>
                            <el-input-number  :controls='false' disabled :precision="2" :step="0.1" v-model="item.duty"></el-input-number>
                        </div>
                    </el-form-item>
                    <el-form-item label="VAT费:" prop="vatfee">
                        <div class="inputBox">
                            <span class="inputUnit">GPB</span>
                            <el-input-number  :controls='false' disabled :precision="2" :step="0.1" v-model="item.vatfee"></el-input-number>
                        </div>
                    </el-form-item>
                    <el-form-item label="销售VAT费:" prop="salesvat">
                        <div class="inputBox">
                            <span class="inputUnit">GPB</span>
                            <el-input-number  :controls='false' disabled :precision="2" :step="0.1" v-model="item.salesvat"></el-input-number>
                        </div>
                    </el-form-item>
                    <el-form-item label="操作费:" prop="handlingfee">
                        <div class="inputBox">
                            <span class="inputUnit">GPB</span>
                            <el-input-number  :controls='false' disabled :precision="2" :step="0.1" v-model="item.handlingfee"></el-input-number>
                        </div>
                    </el-form-item>
                    <el-form-item label="本土运费:" prop="freight">
                        <div class="inputBox">
                            <span class="inputUnit">GPB</span>
                            <el-input-number  :controls='false'  :precision="2" :step="0.1" v-model="item.freight"></el-input-number>
                        </div>
                    </el-form-item>
                    <el-form-item label="成交费:" prop="platformfee">
                        <div class="inputBox">
                            <span class="inputUnit">GPB</span>
                            <el-input-number  :controls='false' disabled :precision="2" :step="0.1" v-model="item.platformfee"></el-input-number>
                        </div>
                    </el-form-item>
                    <el-form-item label="PayPal Fee:" prop="paypalprice">
                        <div class="inputBox">
                            <span class="inputUnit">GPB</span>
                            <el-input-number  :controls='false' disabled :precision="2" :step="0.1" v-model="item.paypalprice"></el-input-number>
                        </div>
                    </el-form-item>
                    <el-form-item label="刊登Fee:" prop="listingfee">
                        <div class="inputBox">
                           <span class="inputUnit">GPB</span>
                            <el-input-number  :controls='false' disabled :precision="2" :step="0.1" v-model="item.listingfee"></el-input-number>
                        </div>
                    </el-form-item>
                    <el-form-item label="退回进口VAT费:" prop="vatfee">
                        <div class="inputBox">
                            <span class="inputUnit">GPB</span>
                            <el-input-number  :controls='false' disabled :precision="2" :step="0.1" v-model="item.vatfee"></el-input-number>
                        </div>
                    </el-form-item>
                    <el-form-item label="退回快递费VAT:" prop="localshippingfeevat">
                        <div class="inputBox">
                            <span class="inputUnit">GPB</span>
                            <el-input-number  :controls='false' disabled :precision="2" :step="0.1" v-model="item.localshippingfeevat"></el-input-number>
                        </div>
                    </el-form-item>
                    <el-form-item label="本土运输方式:" prop="shippingname ">
                        <div class="shippingPutBox">
                            <el-input v-model="item.shippingname1" disabled style="width:150px;margin-right:10px"></el-input>
                            <el-input v-model="item.shippingname2" disabled style="width:150px;margin-right:10px"></el-input>
                            <el-input v-model="item.shippingname3" disabled style="width:150px;margin-right:10px"></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="汇率:" prop="exchangerate">
                        <div class="inputBox">
                            <span class="inputUnit">GPB</span>
                            <el-input-number  :controls='false' disabled :precision="2" :step="0.1" v-model="item.exchangerate"></el-input-number>
                        </div>
                    </el-form-item>
                    <el-form-item label="VAT费率:" prop="vatrate">
                        <div class="inputBox">
                            <span class="inputUnit">GPB</span>
                            <el-input-number  :controls='false' disabled :precision="2" :step="0.1" v-model="item.vatrate"></el-input-number>
                        </div>
                    </el-form-item>
                    <el-form-item label="DUTY税率:" prop="dutyrate">
                        <div class="inputBox">
                            <span class="inputUnit">GPB</span>
                            <el-input-number  :controls='false' disabled :precision="2" :step="0.1" v-model="item.dutyrate"></el-input-number>
                        </div>
                    </el-form-item>
                    <el-form-item label="快递费计算方式:" prop="freightcalculated">
                        <el-select 
                            v-model="item.freightcalculated"
                            >
                            <el-option 
                                v-for="item in freightSign"                        
                                :key="item.key"
                                :label="item.label"
                                :value="item.value"
                                >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="海运费计算方式:" v-if="item.seaSkySelectKey == 1" prop="freightcalculated">
                        <el-select 
                            v-model="item.seaMoney"
                            >
                            <el-option 
                                v-for="item in seaFreightSign"                        
                                :key="item.key"
                                :label="item.label"
                                :value="item.value"
                                >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <div class="bottomButton">
            <el-button type="primary" @click="submitForm('ruleForm')" size="mini">保存</el-button>
            <el-button @click="resetForm('ruleForm')" size="mini">取消</el-button>
        </div>
    </div>
</template>
<script>
import { selectRoleEmployeeForRoleId , getPlatformSiteByCountry, getWarehouseByCountry} from '@/api/user.js'
export default {
    name:'devInformationEdit',
    data(){
        return {
            // seaSkySelectKey:1,
            targetPrice:[],
            dailySales:[],
            dailySales2:[],
            dailySales3:[],
            countryParams:'',
            ruleForm: {
                region:'出厂价',
                staRating: '',
                targetPrice: '',
                westaRating: '',
                dailySales: '',
                rateRequirements: '',
                orderQuantity: '',
                productMarket: '',
                specialPackaging: '',
                isanji:'',
                isbrand:'',
                titleDe:'',
                titleJp:'',
                ispatentproduct:'',
                seaFreight:'',
                productMarketUS: '',
                productMarketGB: '',
                productMarketDE:'',
                brandEu:0,
                brandUs:0,
                brandDe:0,
                brandAo:0,
                marksContry1:'',
                marksContry2:'',
                marksContry3:'',
            },
            dailySales1:[
                {
                    value:'US',
                    label:'美国',
                },
                {
                    value:'GB',
                    label:'英国',
                },
                {
                    value:'AU',
                    label:'澳洲',
                },
                {
                    value:'DE',
                    label:'德国',
                },
            ],
            rules: {
                staRating: [
                    { required: true, message: '请输入标题', trigger: 'blur' },
                ],
                targetPrice: [
                    { required: true, message: '请填写价格', trigger: 'blur' }
                ],
                westaRating: [
                    { type: 'date', required: true, message: '请填写关键字', trigger: 'blur' }
                ],
                dailySales: [
                    { type: 'date', required: true, message: '请选择开发类型', trigger: 'blur' }
                ],
                rateRequirements: [
                    { type: 'array', required: true, message: '请填写中文概述', trigger: 'blur' }
                ],
                orderQuantity: [
                    { required: true, message: '请选择开发优先级', trigger: 'blur' }
                ],
                productMarket: [
                    { required: true, message: '请填写税率', trigger: 'blur' }
                ],
                ispatentproduct: [
                    { required: true, message: '请选择专利是否需要确认', trigger: 'blur' }
                ],
                isanji: [
                    { required: true, message: '请选择是否安吉产品', trigger: 'blur' }
                ],
                seaFreight: [
                    { required: true, message: '请选择方式', trigger: 'blur' }
                ],
            },
            devSign:[    
                {
                    label: '出厂价',
                    key: 1,
                    value: '出厂价'
                },
                {
                    label: 'FOB价',
                    key: 2,
                    value: 'FOB价'
                },    
                {
                    label: '零售价',
                    key: 3,
                    value: '零售价'
                },    
            ],
            seaSkySelect:[
                {
                    label:'海运',
                    key: 1,
                    value:1,
                },
                {
                    label:'空运',
                    key: 2,
                    value:2,
                },
            ],
            isBrandSign:[    
                {
                    label: '是',
                    key: 1,
                    value: 1
                },
                {
                    label: '否',
                    key: 0,
                    value: 0
                },       
            ],
            seaFreightSign:[    
                {
                    label: '按照产品尺寸计算的产品体积',
                    key: 1,
                    value: 0
                },
                {
                    label: '按照货柜尺寸计算的产品所占的体积',
                    key: 2,
                    value: 1
                },       
            ],
            freightSign:[    
                {
                    label: '按照产品尺寸计算的产品体积',
                    key: 1,
                    value: 0
                },
                {
                    label: '人工录入运费',
                    key: 2,
                    value: 1
                },       
            ],
            wareHouseDetail:
            [
                {
                    name:'Amazon-GB-英国仓1',
                    productPrice:'$11',
                    SFProductPrice:'$89',
                    SFPfreight:'$69',
                    key:'1'
                },
                {
                    name:'ebay-GB-英国仓',
                    productPrice:'$113',
                    SFProductPrice:1,
                    SFPfreight:'$69',
                    key:'2'
                },
            ],
            wareHouseRules:{
                productPrice: [
                    {  required: true, message: '请添加价格', trigger: 'blur' }
                ],
                SFProductPrice: [
                    {  required: true, message: '请添加价格', trigger: 'blur' }
                ],
            }
        }
    },
    props:{
        devInformationDetaiList:{
            type:Object,
            default:() => ({})
        }
    },
    mounted(){
        this.getDetailPage()
        this.getTypeList()
    },
    methods:{
        delProductMarketList(i){
            this.devInformationDetaiList.productMarketList.splice(i,1)
        },
        addRemarks(){
            if(!this.ruleForm.marksContry1 || !this.ruleForm.marksContry2 || !this.ruleForm.marksContry3){
                this.$message({
                    type: 'warning',
                    message: '请选择开发市场'
                })
                return
            }
            
            if(this.ruleForm.marksContry1 != this.devInformationDetaiList.productMarketList[0].countrycode){
                this.$message({
                    type:'warning',
                    message:'不能添加其他国家的市场'
                })
                return
            }
            this.devInformationDetaiList.productMarketList.push({
                platformname:this.ruleForm.marksContry2,
                countrycode:this.ruleForm.marksContry1,
                warehouseName:this.ruleForm.marksContry3,
            })
        },
        getTypeList(){
            let params = {
                rid:170//采购开发
            }
            selectRoleEmployeeForRoleId(params).then(res => {
                this.dailySales = res.data
            })
            let itemList = {
                rid:171//业务开发
            }
            selectRoleEmployeeForRoleId(itemList).then(res => {
                this.targetPrice = res.data
            })
        },
        getDetailPage(){
            this.devInformationDetaiList.productMarketList.forEach(item => {
                if(item.shippingname){
                    let shippingname=  item.shippingname.split('|')
                    item.shippingname1 = shippingname[0]
                    item.shippingname2 = shippingname[1]
                    item.shippingname3 = shippingname[2]
                 }
            })
            this.ruleForm = {
                staRating: this.devInformationDetaiList.title,
                targetPrice: this.devInformationDetaiList.businessName,
                westaRating: this.devInformationDetaiList.keys,
                dailySales: this.devInformationDetaiList.businessName,
                rateRequirements:this.devInformationDetaiList.description,
                orderQuantity: this.devInformationDetaiList.priority,
                productMarketUS: this.devInformationDetaiList.dutyrate1,
                productMarketGB: this.devInformationDetaiList.dutyrate3 ? this.devInformationDetaiList.dutyrate3 : '3.26',
                productMarketDE: this.devInformationDetaiList.dutyrate2 ? this.devInformationDetaiList.dutyrate2 : '3.91',
                isanji:this.devInformationDetaiList.isanji,
                isbrand:this.devInformationDetaiList.ispatentproduct,
                titleDe:this.devInformationDetaiList.titleDe,
                titleJp:this.devInformationDetaiList.titleJp,
                ispatentproduct:this.devInformationDetaiList.ispatentproduct,
                seaFreight:this.devInformationDetaiList.computemode?0:1,
                brandEu:0,
                brandUs:0,
                brandDe:0,
                brandAo:0,  
            }
            console.log(this.ruleForm,'ruleForm')
        },
        seleContry(val){
            this.ruleForm.marksContry2 = ''
            if(this.ruleForm.marksContry3){
                this.ruleForm.marksContry3 = ''
            }
            this.countryParams = {
                countryCode:val
            }
            getPlatformSiteByCountry(this.countryParams ).then(res => {
                
                 this.dailySales2 =  res.data
            })
        },
        selectSale(){
            if(this.ruleForm.marksContry3){
                this.ruleForm.marksContry3 = ''
            }
            getWarehouseByCountry(this.countryParams).then(res => {
                 this.dailySales3 =  res.data
                 console.log(res.data)
            })
        },
        selectBox(val){
            this.ruleForm.marksContry3 = val
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm() {
                // this.$refs[formName].resetFields();
                this.$emit('closeEdit','false')
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
      .targetPriceWbox{
          display: flex;
          .targetPriceBox{
            width: 300px;
            margin-right: 10px;
        }
    }
    .taxRate{
        display: flex;
    }
    .delButton{
        float: right;
        margin-right:20px;
    } 
    .inputUnit{
        text-align: center;
        line-height: 28px;
        background-color: #F5F7FA;
        display: inline-block;
        height: 28px;
        width: 68px;
        border: 1px solid #E4E7ED;
        color: black;
        font-size: 12px;
        position: relative;
        top: 1px;
        border-top-left-radius: 4px ;
        border-bottom-left-radius: 4px ;
    }
    ::v-deep.inputBox{
        width: 200px;
        display: inline-block;
        // display: flex;
        .el-input-number {
            .el-input__inner{
                color: black !important;
                border-top-left-radius: 0px !important;
                border-bottom-left-radius: 0px !important;
            }
        }
    }
    .mainTitle{
        font-weight: bold;
    }
    .shippingPutBox{
        width: 500;
    }
      
</style>