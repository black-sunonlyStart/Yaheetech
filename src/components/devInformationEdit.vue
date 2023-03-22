<template>
    <div v-loading='loading'>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm1" label-width="200px" class="demo-ruleForm" size="mini">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="英文标题:" prop="staRating">
                        <el-input type="textarea" maxlength="100" show-word-limit  autosize v-model="ruleForm.staRating"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="业务开发:" prop="targetPrice"> 
                        <el-select 
                            v-model="ruleForm.targetPrice"
                            filterable 
                            :disabled='showDailySales'
                            >
                            <el-option 
                                v-for="item in targetPrice"                        
                                :key="item.Id"
                                :label="item.TrueName"
                                :value="item.Id"
                                >
                            </el-option>
                        </el-select>        
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="英文关键字:" prop="westaRating">
                        <el-input type="textarea"  maxlength="100" show-word-limit autosize v-model="ruleForm.westaRating"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="采购开发:" prop="dailySales">
                        <el-select 
                            v-model="ruleForm.dailySales"
                            filterable 
                            :disabled='showDailySales'
                            >
                            <el-option 
                                v-for="item in dailySales"                        
                                :key="item.Id"
                                :label="item.TrueName"
                                :value="item.Id"
                                >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="中文概述:" prop="rateRequirements">
                        <el-input type="textarea" maxlength="500" autosize show-word-limit v-model="ruleForm.rateRequirements"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="开发优先级:" prop="orderQuantity">
                        <el-radio-group v-model="ruleForm.orderQuantity">
                            <el-radio :label="0">低</el-radio>
                            <el-radio :label="1">中</el-radio>
                            <el-radio :label="2">高</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="德文标题:" >
                        <el-input type="textarea" maxlength="200" show-word-limit autosize v-model="ruleForm.titleDe"></el-input>
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
                        <el-input type="textarea" maxlength="200" show-word-limit autosize v-model="ruleForm.titleJp"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12" :xs="24" :sm="24" :md="24" :lg="20" :xl="12">
                    <el-form-item label="是否需要专利确认:" prop="ispatentproduct">
                        <el-radio-group v-model="ruleForm.ispatentproduct">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="0">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12" :xs="24" :sm="24" :md="24" :lg="20" :xl="12">
                    <el-form-item label="是否品牌:" prop="specialPackaging">
                        <span v-for="item in ruleForm.countryCodeList" :key="item.countryCode">
                            {{item.countrySimName}}：
                            <el-select 
                                style="width:80px"
                                v-model="item.countryBand"
                                >
                                <el-option 
                                    v-for="item in isBrandSign"                        
                                    :key="item.key"
                                    :label="item.label"
                                    :value="item.value"
                                    >
                                </el-option>
                            </el-select>
                        </span>
                    </el-form-item>
                </el-col>
                <el-col :span="10"  :xs="24" :sm="24" :md="24" :lg="20" :xl="10">
                     <el-form-item label="Duty税率:" prop="productMarketUS">
                        <div class="taxRate">
                                <span v-for="item in ruleForm.countryCodeList" :key="item.countryCode" >
                                    <span v-if="item.judgeDuty" style="display:flex">
                                        {{item.countryCode}}:<el-input v-model="item.dutyrate">
                                            <template slot="append">%</template>
                                        </el-input>
                                    </span>
                                </span>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="选择开发市场:">
                        <el-select 
                            v-model="ruleForm.marksContry1"
                            @change="seleContry"
                            placeholder="选择开发市场"
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
                            placeholder="选择开发平台"
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
                            placeholder="选择开发仓库"
                            >
                            <el-option 
                                v-for="item in dailySales3"                        
                                :key="item.Id"
                                :label="item.Name"
                                :value="item.Id"
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
                            style="width:250px"
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
        <el-row style="margin-top:30px">
            <el-col v-for="(item,index) in devInformationDetaiList.productMarketList" :key="item.id" :span="12">
                <div class="titleAndButton">
                    <span class="mainTitle">{{item.platformname}}-{{item.countrycode}}   {{item.warehouseName}}</span> <el-button type="primary" @click="delProductMarketList(index)" size="mini" class="delButton">删除</el-button>
                </div>
                <el-form :model="item" :rules="wareHouseRules" ref="ruleForm2" label-width="200px" class="demo-ruleForm" size="mini">
                    <el-form-item label="产品开发价:" prop="developmentprice" >
                        <div class="inputBox"> 
                            <span class="inputUnit">{{contryCurry(item.countrycode)}}</span>
                            <el-input-number  :controls='false'  :precision="2" :step="0.1" v-model="item.developmentprice" @change="changeDevelopmentprice(item.developmentprice,item.platformname)"></el-input-number>  
                        </div>
                        <el-button  v-if="showList(item.createdon)" @click="getMoeny(item,index)">计算利润</el-button>
                        <div :class="item.profit > 0 ? 'titleText' :'noTitleText'" v-show="item.showProfit && item.freight">
                            {{contryCurry(item.countrycode)}}: {{item.endprofit? item.endprofit:item.profit}} - 利润率：{{item.endprofitmargin ? item.endprofitmargin * 100 : item.profitmargin * 100}}%
                        </div>
                        <div class='noTitleText' v-if="item.showProfit && !item.freight">
                            【产品尺寸重量超过物流限制，SFP运费匹配不到】
                        </div>
                    </el-form-item>
                    <div v-if="showList(item.createdon) && nowStatus > 1">
                        <el-form-item label="SFP开发价:" prop="sfpDevelopmentPrice" class="sfpDevelopmentPrice-content" v-if="(item.countrycode == 'GB' || item.countrycode == 'DE') && item.platformname == 'Amazon' && !devInformationDetaiList.packingway">
                            <div class="inputBox"> 
                                <span class="inputUnit">{{contryCurry(item.countrycode)}}</span>
                                <el-input-number  :controls='false'  :precision="2" :step="0.1" v-model="item.sfpDevelopmentPrice"></el-input-number>
                            </div>
                            <el-button  v-if="showList(item.createdon)" @click="getMoeny(item,index)">计算利润</el-button>
                            <div :class="item.sfpProfit > 0 ? 'titleText' :'noTitleText'" v-show="item.showSfpProfit && item.freight" >
                                {{contryCurry(item.countrycode)}}: {{item.sfpEndProfit? item.sfpEndProfit:item.sfpProfit}} - 利润率：{{item.sfpEndProfitMargin ? item.sfpEndProfitMargin * 100 : item.sfpProfitMargin * 100}}%
                            </div>
                        </el-form-item>
                        <el-form-item label="SFP运费:" prop="sfpOceanFreight" v-if="(item.countrycode == 'GB' || item.countrycode == 'DE') && item.platformname == 'Amazon' && !devInformationDetaiList.packingway">
                            <div class="inputBox"> 
                                <span class="inputUnit">{{contryCurry(item.countrycode)}}</span>
                                <el-input-number  :controls='false'  :precision="2" :step="0.1" v-model="item.sfpOceanFreight"></el-input-number>
                            </div>
                        </el-form-item>
                        <el-form-item label="发货包装费:" prop="packagingfee">
                            <div class="inputBox">
                                <span class="inputUnit">{{contryCurry(item.countrycode)}}</span>
                                <el-input-number  :controls='false'  :precision="2" :step="0.1" v-model="item.packagingfee"></el-input-number>
                            </div>
                        </el-form-item>
                        <el-form-item label="本地化费用:" prop="localizationfee">
                            <div class="inputBox">
                                <span class="inputUnit">{{contryCurry(item.countrycode)}}</span>
                                <el-input-number  :controls='false'  :precision="2" :step="0.1" v-model="item.localizationfee"></el-input-number>
                            </div>
                        </el-form-item>
                        <el-form-item label="PI:" prop="piprice">
                            <div class="inputBox"> 
                                <span class="inputUnit">{{contryCurry(item.countrycode)}}</span>
                                <el-input-number  :controls='false' disabled :precision="2" :step="0.1" v-model="item.piprice"></el-input-number>
                            </div>
                        </el-form-item>
                        <el-form-item label="空/海运费:" >
                            <div class="inputBox">
                                <span class="inputUnit">{{contryCurry(item.countrycode)}}</span>
                                <el-input-number  :controls='false' disabled :precision="2" :step="0.1" v-model="item.oceanfreight"></el-input-number>
                            </div>
                            <el-select 
                                v-model="item.freightway "
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
                                <span class="inputUnit">{{contryCurry(item.countrycode)}}</span>
                                <el-input-number  :controls='false' disabled :precision="2" :step="0.1" v-model="item.inlandportcosts"></el-input-number>
                            </div>
                        </el-form-item>
                        <el-form-item label="目的地港费用:" prop="outlandportcosts">
                            <div class="inputBox">
                                <span class="inputUnit">{{contryCurry(item.countrycode)}}</span>
                                <el-input-number  :controls='false' disabled :precision="2" :step="0.1" v-model="item.outlandportcosts"></el-input-number>
                            </div>
                        </el-form-item>
                        <el-form-item label="进口DUTY费:" prop="duty">
                            <div class="inputBox">
                                <span class="inputUnit">{{contryCurry(item.countrycode)}}</span>
                                <el-input-number  :controls='false' disabled :precision="2" :step="0.1" v-model="item.duty"></el-input-number>
                            </div>
                        </el-form-item>
                        <el-form-item label="仓租费:" prop="storageCharges"  v-if="devInformationDetaiList.fbaWarehouseIds && devInformationDetaiList.fbaWarehouseIds.includes(item.warehouseid)">
                            <div class="inputBox">
                                <span class="inputUnit">{{contryCurry(item.countrycode)}}</span>
                                <el-input-number  :controls='false' disabled :precision="2" :step="0.1" v-model="item.storageCharges"></el-input-number>
                            </div>
                        </el-form-item>
                        <el-form-item label="称重处理费:" prop="weighingFee"  v-if="devInformationDetaiList.fbaWarehouseIds && devInformationDetaiList.fbaWarehouseIds.includes(item.warehouseid)">
                            <div class="inputBox">
                                <span class="inputUnit">{{contryCurry(item.countrycode)}}</span>
                                <el-input-number  :controls='false' disabled :precision="2" :step="0.1" v-model="item.weighingFee"></el-input-number>
                            </div>
                        </el-form-item>
                        <el-form-item label="VAT费:" prop="vatfee">
                            <div class="inputBox">
                                <span class="inputUnit">{{contryCurry(item.countrycode)}}</span>
                                <el-input-number  :controls='false' disabled :precision="2" :step="0.1" v-model="item.vatfee"></el-input-number>
                            </div>
                        </el-form-item>
                        <el-form-item label="销售VAT费:" prop="salesvat">
                            <div class="inputBox">
                                <span class="inputUnit">{{contryCurry(item.countrycode)}}</span>
                                <el-input-number  :controls='false' disabled :precision="2" :step="0.1" v-model="item.salesvat"></el-input-number>
                            </div>
                        </el-form-item>
                        <el-form-item label="操作费:" prop="handlingfee">
                            <div class="inputBox">
                                <span class="inputUnit">{{contryCurry(item.countrycode)}}</span>
                                <el-input-number  :controls='false' disabled :precision="2" :step="0.1" v-model="item.handlingfee"></el-input-number>
                            </div>
                        </el-form-item>
                        <el-form-item label="本土运费:" prop="freight">
                            <div class="inputBox">
                                <span class="inputUnit">{{contryCurry(item.countrycode)}}</span>
                                <el-input-number  :controls='false'  :precision="2" :step="0.1" v-model="item.freight"></el-input-number>
                            </div>
                        </el-form-item>
                        <el-form-item label="成交费:" prop="platformfee">
                            <div class="inputBox">
                                <span class="inputUnit">{{contryCurry(item.countrycode)}}</span>
                                <el-input-number  :controls='false' disabled :precision="2" :step="0.1" v-model="item.platformfee"></el-input-number>
                            </div>
                        </el-form-item>
                        <el-form-item label="PayPal Fee:" prop="paypalprice">
                            <div class="inputBox">
                                <span class="inputUnit">{{contryCurry(item.countrycode)}}</span>
                                <el-input-number :controls='false' disabled :precision="2" :step="0.1" v-model="item.paypalprice"></el-input-number>
                            </div>
                        </el-form-item>
                        <el-form-item label="刊登Fee:" prop="listingfee">
                            <div class="inputBox">
                            <span class="inputUnit">{{contryCurry(item.countrycode)}}</span>
                                <el-input-number :controls='false' disabled :precision="2" :step="0.1" v-model="item.listingfee"></el-input-number>
                            </div>
                        </el-form-item>
                        <el-form-item label="退回进口VAT费:" prop="vatfee">
                            <div class="inputBox">
                                <span class="inputUnit">{{contryCurry(item.countrycode)}}</span>
                                <el-input-number  :controls='false' disabled :precision="2" :step="0.1" v-model="item.vatfee"></el-input-number>
                            </div>
                        </el-form-item>
                        <el-form-item label="退回快递费VAT:" prop="localshippingfeevat">
                            <div class="inputBox">
                                <span class="inputUnit">{{contryCurry(item.countrycode)}}</span>
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
                                <span class="inputUnit">{{contryCurry(item.countrycode)}}</span>
                                <el-input-number  :controls='false' disabled :precision="2" :step="0.1" v-model="item.exchangerate"></el-input-number>
                            </div>
                        </el-form-item>
                        <el-form-item label="VAT费率:" prop="vatrate">
                            <div class="inputBox">
                                <span class="inputUnit">{{contryCurry(item.countrycode)}}</span>
                                <el-input-number  :controls='false' disabled :precision="2" :step="0.1" v-model="item.vatrate"></el-input-number>
                            </div>
                        </el-form-item>
                        <el-form-item label="DUTY税率:" prop="dutyrate">
                            <div class="inputBox">
                                <span class="inputUnit">{{contryCurry(item.countrycode)}}</span>
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
                    </div>
                </el-form>
            </el-col>
        </el-row>
        <div class="bottomButton">
            <el-button type="primary" @click="submitForm('ruleForm')" size="mini" perkey='ERP.Product.ProductDev.SalesManEdit' v-track="{triggerType:'click',currentUrl: $route.path,behavior:'保存',businessCode:'开发信息'}">保存</el-button>
            <el-button @click="resetForm('ruleForm')" size="mini" v-track="{triggerType:'click',currentUrl: $route.path,behavior:'取消',businessCode:'开发信息'}">取消</el-button>
        </div>
    </div>
</template>
<script>
import { selectRoleEmployeeForRoleId , getPlatformSiteByCountry, getWarehouseByCountry ,developmentMsg,profitMargin} from '@/api/user.js'
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
            loading:false,
            computeModeDefault:true,
            ruleForm: {
                // region:'',
                staRating: '',
                targetPrice: '',
                westaRating: '',
                dailySales: '',
                rateRequirements: '',
                orderQuantity: '',
                // productMarket: '',
                specialPackaging: '',
                isanji:'',
                isbrand:'',
                titleDe:'',
                titleJp:'',
                ispatentproduct:1,
                seaFreight:'',
                productMarketUS: '',
                productMarketGB: '',
                productMarketDE:'',
                productMarketJP:'',
                brandEu:0,
                brandUs:0,
                brandDe:0,
                brandAo:0,
                brandJP:0,
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
                    value:'DE',
                    label:'德国',
                },
                 {
                    value:'JP',
                    label:'日本',
                },
                {
                    value:'AU',
                    label:'澳洲',
                },  
            ],
            rules: {
                staRating: [
                    { required: true, message: '请输入标题', trigger: 'blur' },
                ],
                targetPrice: [
                    { required: true, message: '请选择业务开发', trigger: 'blur' }
                ],
                westaRating: [
                    {required: true, message: '请填写关键字', trigger: 'blur' }
                ],
                dailySales: [
                    {required: true, message: '请选择采购开发', trigger: 'blur' }
                ],
                rateRequirements: [
                    { required: true, message: '请填写中文概述', trigger: 'blur' }
                ],
                orderQuantity: [
                    { required: true, message: '请选择开发优先级', trigger: 'blur' }
                ],
                productMarketUS: [
                    {
                        required: true,
                        validator: (rules, value, cb) => {
                        let { countryCodeList } = this.ruleForm;
                        if(countryCodeList.find(item => item.dutyrate === '' )){
                            return cb(new Error("请填写税率!"));
                        }
                        return cb();
                        },
                        trigger: "change"
                    }
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
                    value: '1'
                },
                {
                    label: '否',
                    key: 0,
                    value: '0'
                },       
            ],
            seaFreightSign:[    
                {
                    label: '按照产品包装尺寸计算的产品体积',
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
                // {
                //     label: '人工录入运费',
                //     key: 2,
                //     value: 1
                // },       
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
                piprice: [
                    {  required: true, message: '请添加价格', trigger: 'blur' }
                ],
                inlandportcosts: [
                    {  required: true, message: '请添加价格', trigger: 'blur' }
                ],
                outlandportcosts: [
                    {  required: true, message: '请添加价格', trigger: 'blur' }
                ],
                duty: [
                    {  required: true, message: '请添加价格', trigger: 'blur' }
                ],
                vatfee: [
                    {  required: true, message: '请添加价格', trigger: 'blur' }
                ],
                salesvat: [
                    {  required: true, message: '请添加价格', trigger: 'blur' }
                ],
                handlingfee: [
                    {  required: true, message: '请添加价格', trigger: 'blur' }
                ],
                freight: [
                    {  required: true, message: '请添加价格', trigger: 'blur' }
                ],
                platformfee: [
                    {  required: true, message: '请添加价格', trigger: 'blur' }
                ],
                paypalprice: [
                    {  required: true, message: '请添加价格', trigger: 'blur' }
                ],
                listingfee: [
                    {  required: true, message: '请添加价格', trigger: 'blur' }
                ],
                localshippingfeevat: [
                    {  required: true, message: '请添加价格', trigger: 'blur' }
                ],
                shippingname: [
                    {  required: true, message: '请输入运输方式', trigger: 'blur' }
                ],
                exchangerate: [
                    {  required: true, message: '请输入汇率', trigger: 'blur' }
                ],
                vatrate: [
                    {  required: true, message: '请添加价格', trigger: 'blur' }
                ],
                dutyrate: [
                    {  required: true, message: '请输入税率', trigger: 'blur' }
                ],
                freightcalculated: [
                    {  required: true, message: '请添加快递费计算方式', trigger: 'blur' }
                ],
                seaSkySelectKey: [
                    {  required: true, message: '请添加海运费计算方式', trigger: 'blur' }
                ],
            }
        }
    },
    computed:{
        showDailySales(){
            if(this.devInformationDetaiList.productMarketList && this.devInformationDetaiList.productMarketList[0] && this.devInformationDetaiList.productMarketList[0].createdon){
                return true
            }else {
                return false
            }
        }
    },
    props:{
        devInformationDetaiList:{
            type:Object,
            default:() => ({})
        },
         nowStatus:{
            type:Number,
            default:() => (0)
        }   
    },
    mounted(){
        this.getDetailPage()
        this.getTypeList()
    },
    methods:{
        showList(val){
            if(!val)return
            if(val){
                return true
            }else {
                return false
            }
        },
        getMoeny(val,index){
            profitMargin(val).then(res => {
                if(res.code == 200){
                    let newList = res.data
                    // this.devInformationDetaiList.productMarketList[index].showProfit = true
                    this.$nextTick(res => {
                        if(newList.shippingname){
                            let shippingname=  newList.shippingname.split('|')
                            newList.shippingname1 = shippingname[0]
                            newList.shippingname2 = shippingname[1]
                            newList.shippingname3 = shippingname[2]
                        }
                        if(!newList.paypalprice)newList.paypalprice = 0
                        if(!newList.listingfee)newList.listingfee = 0
               
                        this.$set(this.devInformationDetaiList.productMarketList, index, newList)
                        this.$set(this.devInformationDetaiList.productMarketList[index],'showProfit' ,true)
                        this.$set(this.devInformationDetaiList.productMarketList[index],'showSfpProfit' ,true)
                    })
                   
                }
            })
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
        delProductMarketList(i){
            this.devInformationDetaiList.productMarketList.splice(i,1)
        },
        addRemarks(){
            if((!this.ruleForm.marksContry1 || !this.ruleForm.marksContry2 || !this.ruleForm.marksContry3) && (this.ruleForm.marksContry1 && this.ruleForm.marksContry1 == 'AU')){
                this.$message({
                    type: 'warning',
                    message: '请选择开发市场',
                    offset:220
                })

                return
            }

            if(this.devInformationDetaiList.productMarketList && this.devInformationDetaiList.productMarketList[0] && this.ruleForm.marksContry1 != this.devInformationDetaiList.productMarketList[0].countrycode){
                this.$message({
                    type:'warning',
                    message:'不能添加其他国家的市场',
                    offset:220
                })
                return
            }
            if(this.devInformationDetaiList.productMarketList && this.devInformationDetaiList.productMarketList[0]){
                if(this.devInformationDetaiList.productMarketList.find(item =>  item.countrycode == this.ruleForm.marksContry1 && item.platformname == this.ruleForm.marksContry2 && item.warehouseid == this.ruleForm.marksContry3)){
                    this.$message({
                                type:'warning',
                                message:'你选择的国家+平台+仓库已存在',
                                offset:220
                            })
                    return 
                }
            }
            if(this.devInformationDetaiList.productMarketListALL && this.devInformationDetaiList.productMarketListALL[0]){
                if(this.devInformationDetaiList.productMarketListALL.find(item =>  (item.countrycode == this.ruleForm.marksContry1 && item.productcountryid != this.$route.query.productCountryId))){
                    this.$message({
                                type:'warning',
                                message:'你选择的国家+平台+仓库已存在',
                                offset:220
                            })
                    return 
                }
            }
            
            let dailySales3 = this.dailySales3.filter(item => {
                return item.Id == this.ruleForm.marksContry3
            })
            let wareHouseList = [
                    {
                      warehouseName:'美国CHI',
                      warehouseid:8  
                    },
                    {
                      warehouseName:'美国CA',
                      warehouseid:16  
                    },
                    {
                      warehouseName:'美国NY',
                      warehouseid:18  
                    },
                ]
            let platformNameList = [
                {
                    name:'Amazon',
                    id:55
                },
                {
                    name:'eBay',
                    id:27
                },
            ]
            if(this.ruleForm.marksContry1 && this.ruleForm.marksContry2 && this.ruleForm.marksContry3){
            this.devInformationDetaiList.productMarketList.push({
                    platformname:this.ruleForm.marksContry2,
                    countrycode:this.ruleForm.marksContry1,
                    warehouseName:dailySales3[0].Name,
                    warehouseid:this.ruleForm.marksContry3,
                    developmentprice:this.devInformationDetaiList.productMarketList && this.devInformationDetaiList.productMarketList[0] ? this.devInformationDetaiList.productMarketList[0].developmentprice : 0
                })
            }else if(this.ruleForm.marksContry1 == 'US' && this.ruleForm.marksContry2 && !this.ruleForm.marksContry3){
                wareHouseList.forEach(item => {
                    this.devInformationDetaiList.productMarketList.push({
                        platformname:this.ruleForm.marksContry2,
                        countrycode:this.ruleForm.marksContry1,
                        warehouseName:item.warehouseName,
                        warehouseid:item.warehouseid,
                        developmentprice:this.devInformationDetaiList.productMarketList && this.devInformationDetaiList.productMarketList[0] ? this.devInformationDetaiList.productMarketList[0].developmentprice : 0
                    })
                })  
            }else if (this.ruleForm.marksContry1 == 'US' && !this.ruleForm.marksContry2 && !this.ruleForm.marksContry3){
                wareHouseList.forEach(item => {
                    this.devInformationDetaiList.productMarketList.push({
                        platformname:'Amazon',
                        countrycode:this.ruleForm.marksContry1,
                        warehouseName:item.warehouseName,
                        warehouseid:item.warehouseid,
                        developmentprice:this.devInformationDetaiList.productMarketList && this.devInformationDetaiList.productMarketList[0] ? this.devInformationDetaiList.productMarketList[0].developmentprice : 0
                    })
                })
                wareHouseList.forEach(item => {
                    this.devInformationDetaiList.productMarketList.push({
                        platformname:'eBay',
                        countrycode:this.ruleForm.marksContry1,
                        warehouseName:item.warehouseName,
                        warehouseid:item.warehouseid,
                        developmentprice:this.devInformationDetaiList.productMarketList && this.devInformationDetaiList.productMarketList[0] ? this.devInformationDetaiList.productMarketList[0].developmentprice : 0
                    })
                })
            }else if (this.ruleForm.marksContry1 == 'GB' && !this.ruleForm.marksContry2 && !this.ruleForm.marksContry3){
                platformNameList.forEach(item => {
                     this.devInformationDetaiList.productMarketList.push({
                        platformname:item.name,
                        countrycode:this.ruleForm.marksContry1,
                        warehouseName:'英国仓',
                        warehouseid:9,
                        developmentprice:this.devInformationDetaiList.productMarketList && this.devInformationDetaiList.productMarketList[0] ? this.devInformationDetaiList.productMarketList[0].developmentprice : 0
                    })
                })
            }else if(this.ruleForm.marksContry1 == 'GB' && this.ruleForm.marksContry2 && !this.ruleForm.marksContry3){
                this.devInformationDetaiList.productMarketList.push({
                        platformname:this.ruleForm.marksContry2,
                        countrycode:this.ruleForm.marksContry1,
                        warehouseName:'英国仓',
                        warehouseid:9,
                        developmentprice:this.devInformationDetaiList.productMarketList && this.devInformationDetaiList.productMarketList[0] ? this.devInformationDetaiList.productMarketList[0].developmentprice : 0
                    })
            }else if(this.ruleForm.marksContry1 == 'DE' && !this.ruleForm.marksContry2 && !this.ruleForm.marksContry3){
                platformNameList.forEach(item => {
                     this.devInformationDetaiList.productMarketList.push({
                        platformname:item.name,
                        countrycode:this.ruleForm.marksContry1,
                        warehouseName:'德国yahee仓',
                        warehouseid:47,
                        developmentprice:this.devInformationDetaiList.productMarketList && this.devInformationDetaiList.productMarketList[0] ? this.devInformationDetaiList.productMarketList[0].developmentprice : 0
                    })
                })
            }else if(this.ruleForm.marksContry1 == 'GB' && this.ruleForm.marksContry2 && !this.ruleForm.marksContry3){
                this.devInformationDetaiList.productMarketList.push({
                        platformname:this.ruleForm.marksContry2,
                        countrycode:this.ruleForm.marksContry1,
                        warehouseName:'德国yahee仓',
                        warehouseid:47,
                        developmentprice:this.devInformationDetaiList.productMarketList && this.devInformationDetaiList.productMarketList[0] ? this.devInformationDetaiList.productMarketList[0].developmentprice : 0
                    })
                }
                this.devInformationDetaiList.productMarketList.forEach(item => {
                    item.nameId = item.warehouseid + item.platformname
                })
               let obj = []
               this.devInformationDetaiList.productMarketList = this.devInformationDetaiList.productMarketList.reduce((item, next) => {
                    obj[next.nameId] ? '' : obj[next.nameId] = true && item.push(next)
                    return item
                }, [])
        },
        changeDevelopmentprice(val,platformname){
            this.devInformationDetaiList.productMarketList.forEach(item => {
                if(item.platformname == platformname){
                    item.developmentprice = val
                }
                
            })
        },
        getTypeList(){
            let params = {
                rid:document.URL.includes('yaheecloud') ?  41 : 170  //测试170
                // rid:41//采购开发41
            }
            selectRoleEmployeeForRoleId(params).then(res => {
                this.dailySales = res.data
            })
            let itemList = {
                rid:document.URL.includes('yaheecloud') ? 40 : 171
                // rid:40//业务开发40
            }
            selectRoleEmployeeForRoleId(itemList).then(res => {
                this.targetPrice = res.data
            })
        },
        getDetailPage(){
            if(!this.devInformationDetaiList.productMarketList)return
            this.devInformationDetaiList.productMarketList.forEach(item => {
                if(item.shippingname){
                    let shippingname=  item.shippingname.split('|')
                    item.shippingname1 = shippingname[0]
                    item.shippingname2 = shippingname[1]
                    item.shippingname3 = shippingname[2]
                 }
                 if(!item.paypalprice)item.paypalprice = 0
                 if(!item.listingfee)item.listingfee = 0
            })
            this.ruleForm = {
                staRating: this.devInformationDetaiList.title,
                targetPrice: this.devInformationDetaiList.businessid,
                westaRating: this.devInformationDetaiList.keys,
                dailySales: this.devInformationDetaiList.buyerid,
                rateRequirements:this.devInformationDetaiList.description,
                orderQuantity: this.devInformationDetaiList.priority,
                isanji:this.devInformationDetaiList.isanji,
                isbrand:this.devInformationDetaiList.ispatentproduct,
                titleDe:this.devInformationDetaiList.titleDe,
                titleJp:this.devInformationDetaiList.titleJp,
                ispatentproduct:this.devInformationDetaiList.ispatentproduct,
                seaFreight:this.devInformationDetaiList.computemode == 0 ||  this.devInformationDetaiList.computemode == '' ?0:1,
                countryCodeList:this.devInformationDetaiList.countryCodeList,

            }
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
                 let filterList = res.data.filter(item => {
                     return item.Id != 104 && item.Id != 11
                 })
                 this.dailySales3 = filterList
            })
        },
        selectBox(val){
            this.ruleForm.marksContry3 = val
        },
        submitForm() {
            if(!this.$route.query.productId){
                this.$message({
                    type:'error',
                    message:'请先完善产品【开发类型/场景】信息',
                    offset:220,
                })
                return
            }
            if(this.devInformationDetaiList.productMarketList.length == 0){
                this.$message({
                    type: 'error', 
                    message:'请选择开发市场',
                    offset:220
                })
                return
            }
            if(this.devInformationDetaiList.productMarketList.find(item =>  item.developmentprice == 0)){
                this.$message({
                    type:'error',
                    message:'开发价不能为0',
                    offset:220,
                });
                return 
            }
            this.$refs['ruleForm1'].validate((valid) => {
                if(valid){
                   if(this.$refs['ruleForm2']){
                    this.$refs['ruleForm2'][0].validate((valid) => {
                    if (valid) {
                        let LocalStrings = this.ruleForm.countryCodeList.map(res => {
                            return {
                                countryCode:res.countryCode,
                                duty:Number(res.dutyrate),
                                band:res.countryBand || '0'
                            }
                        })
                        let params = {
                            scenarios:this.devInformationDetaiList.scenarios,
                            developmentId:this.$route.query.developmentId,
                            productId:this.$route.query.productId,
                            productCountryId:this.$route.query.productCountryId,
                            businessId:this.ruleForm.targetPrice,
                            buyerId:this.ruleForm.dailySales,
                            bandAndRate:JSON.stringify(LocalStrings),
                            computemode:this.ruleForm.seaFreight,
                            development:{
                                description:this.ruleForm.rateRequirements,
                                id:this.ruleForm.id,
                                categoryid:this.ruleForm.categoryid,
                                title:this.ruleForm.staRating,
                                keys:this.ruleForm.westaRating,
                                titleDe:this.ruleForm.titleDe,
                                titleJp:this.ruleForm.titleJp,
                                priority:this.ruleForm.orderQuantity || 0,
                                isanji:this.ruleForm.isanji,
                                ispatentproduct:this.ruleForm.ispatentproduct,
                                computemode:this.ruleForm.seaFreight,
                            },       
                        }
                        params.productMarkets = this.devInformationDetaiList.productMarketList.map(item => {
                            return {
                                id:item.id,
                                productid:item.productidid,
                                countrycode:item.countrycode,
                                warehouseid:item.warehouseid,
                                platformname:item.platformname,
                                developmentprice:item.developmentprice,
                                sfpDevelopmentPrice:item.sfpDevelopmentPrice,
                                sfpOceanFreight:item.sfpOceanFreight,
                                piprice:item.piprice,
                                oceanfreight:item.oceanfreight,
                                freightway:item.freightway,
                                inlandportcosts:item.inlandportcosts,
                                outlandportcosts:item.outlandportcosts,
                                storageCharges:item.storageCharges,
                                weighingFee:item.weighingFee,
                                duty:item.duty,
                                vatfee:item.vatfee,
                                salesvat:item.salesvat,
                                handlingfee:item.handlingfee,
                                freight:item.freight,
                                platformfee:item.platformfee,
                                paypalprice:item.paypalprice || 0,
                                listingfee:item.listingfee || 0,
                                packagingfee:item.packagingfee,
                                localizationfee:item.localizationfee,
                                localshippingfeevat:item.localshippingfeevat,
                                shippingname:item.shippingname,
                                exchangerate:item.exchangerate,
                                vatrate:item.vatrate,
                                dutyrate:item.dutyrate,
                                freightcalculated:item.freightcalculated,
                            }
                        })
                        this.loading=true,
                        developmentMsg(params).then(res => {
                            if(res.code == 200){
                                this.loading=false,
                                this.$message({
                                    type: 'success', 
                                    message:'数据保存成功',
                                    offset:220
                                })
                                this.$router.push({
                                    name:'productDetails',
                                    query:{
                                        developmentId:res.data.developmentId,
                                        productId:res.data.productId,
                                        productCountryId:res.data.productCountryId,
                                    }
                                })
                                this.$emit('closeEdit','false',res.data)
                            }else {
                               this.loading=false
                            }
                        }).catch(err => { this.loading = false })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                    });
                   } else {
                       let params = {
                            developmentId:this.$route.query.developmentId,
                            productId:this.$route.query.productId,
                            productCountryId:this.$route.query.productCountryId,
                            businessId:this.ruleForm.targetPrice,
                            buyerId:this.ruleForm.dailySales,
                            usCountryBand:this.ruleForm.brandUs,
                            enCountryBand:this.ruleForm.brandEu,
                            deCountryBand:this.ruleForm.brandDe,
                            auCountryBand:this.ruleForm.brandAo,
                            jpCountryBand:this.ruleForm.brandJP,
                            usDutyRate:this.ruleForm.productMarketUS,
                            gbDutyRate:this.ruleForm.productMarketGB,
                            deDutyRate:this.ruleForm.productMarketDE,
                            jpDutyRate:this.ruleForm.productMarketJP,
                            computemode:this.ruleForm.seaFreight,
                            development:{
                                description:this.ruleForm.rateRequirements,
                                id:this.ruleForm.id,
                                categoryid:this.ruleForm.categoryid,
                                title:this.ruleForm.staRating,
                                keys:this.ruleForm.westaRating,
                                titleDe:this.ruleForm.titleDe,
                                titleJp:this.ruleForm.titleJp,
                                priority:this.ruleForm.orderQuantity,
                                isanji:this.ruleForm.isanji,
                                ispatentproduct:this.ruleForm.ispatentproduct,
                                computemode:this.ruleForm.seaFreight,
                            },       
                        }
                        params.productMarkets = this.devInformationDetaiList.productMarketList.map(item => {
                            return {
                                id:item.id,
                                productid:item.productidid,
                                countrycode:item.countrycode,
                                warehouseid:item.warehouseid,
                                platformname:item.platformname,
                                developmentprice:item.developmentprice,
                                sfpDevelopmentPrice:item.sfpDevelopmentPrice,
                                sfpOceanFreight:item.sfpOceanFreight,
                                piprice:item.piprice,
                                oceanfreight:item.oceanfreight,
                                freightway:item.freightway,
                                inlandportcosts:item.inlandportcosts,
                                outlandportcosts:item.outlandportcosts,
                                storageCharges:item.storageCharges,
                                weighingFee:item.weighingFee,
                                duty:item.duty,
                                vatfee:item.vatfee,
                                salesvat:item.salesvat,
                                handlingfee:item.handlingfee,
                                freight:item.freight,
                                platformfee:item.platformfee,
                                paypalprice:item.paypalprice || 0,
                                listingfee:item.listingfee || 0,
                                packagingfee:item.packagingfee,
                                localizationfee:item.localizationfee,
                                localshippingfeevat:item.localshippingfeevat,
                                shippingname:item.shippingname,
                                exchangerate:item.exchangerate,
                                vatrate:item.vatrate,
                                dutyrate:item.dutyrate,
                                freightcalculated:item.freightcalculated,
                            }
                        })
                        developmentMsg(params).then(res => {
                            if(res.code == 200){
                                this.$message({
                                    type: 'success', 
                                    message:'数据保存成功',
                                    offset:220
                                })
                                if(this.$route.query.productCountryId != res.data.productCountryId ){
                                    this.$router.push({
                                        name:'productDetails',
                                        query:{
                                            developmentId:res.data.developmentId,
                                            productId:res.data.productId,
                                            productCountryId:res.data.productCountryId,
                                        }
                                    })
                                }
                                this.$emit('closeEdit','false',res.data)
                            }
                        })
                   }
                }else {
                    return false
                }
            })
            
        },
        resetForm() {
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
    ::v-deep.taxRate{
        display: flex;
        .el-input{
            .el-input-group__append{
                padding: 0 10px !important;
            }
        }
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
        .el-input-number {
            .el-input__inner{
                color: black !important;
                border-top-left-radius: 0px !important;
                border-bottom-left-radius: 0px !important;
            }
        }
    }
    .titleAndButton{
        display: flex;
        justify-content: space-between;
        border: 1px solid #E4E7ED;
        margin:0px 20px 10px 0px;
        background-color: #F5F7FA;
        border-radius: 4px;
        .mainTitle{
            font-weight: bold;
        }
     }
    .shippingPutBox{
        width: 500;
    }
    .titleText{
        display: inline-block;
        color: green;
        margin-left: 10px;
        font-size: 12px;
        position: absolute;
        word-break: break-all;
    }
    .noTitleText{
        display: inline-block;
        color: red;
        margin-left: 10px;
        font-size: 12px;
    }
      
</style>