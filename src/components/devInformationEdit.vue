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
                            >
                            <el-option 
                                v-for="item in devSign"                        
                                :key="item.key"
                                :label="item.label"
                                :value="item.value"
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
                            >
                            <el-option 
                                v-for="item in devSign"                        
                                :key="item.key"
                                :label="item.label"
                                :value="item.value"
                                >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="中文概述:" prop="rateRequirements">
                        <el-input v-model="ruleForm.rateRequirements"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="开发优先级:" prop="orderQuantity">
                        <el-radio-group v-model="ruleForm.orderQuantity">
                            <el-radio :label="3">备选项</el-radio>
                            <el-radio :label="6">备选项</el-radio>
                            <el-radio :label="9">备选项</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="德文标题:" >
                        <el-input v-model="ruleForm.productMarket"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="是否安吉产品:" prop="specialPackaging">
                        <el-radio-group v-model="ruleForm.specialPackaging">
                            <el-radio :label="3">备选项</el-radio>
                            <el-radio :label="6">备选项</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="日文标题:" >
                        <el-input v-model="ruleForm.productMarket"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="是否需要专利确认:" prop="specialPackaging">
                        <el-radio-group v-model="ruleForm.samplingTime">
                            <el-radio :label="3">备选项</el-radio>
                            <el-radio :label="6">备选项</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="是否品牌:" prop="specialPackaging">
                        <el-radio-group v-model="ruleForm.isbrand">
                            <el-radio :label="3">是</el-radio>
                            <el-radio :label="6">否</el-radio>
                        </el-radio-group>
                        <el-select 
                            v-model="ruleForm.dailySales"
                            >
                            <el-option 
                                v-for="item in devSign"                        
                                :key="item.key"
                                :label="item.label"
                                :value="item.value"
                                >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Duty税率:" prop="specialPackaging">
                        <div class="taxRate">
                            US:<el-input v-model="ruleForm.productMarket"></el-input>
                            GB:<el-input v-model="ruleForm.productMarket"></el-input>
                            DE:<el-input v-model="ruleForm.productMarket"></el-input>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="选择开发市场:" prop="dailySales">
                        <el-select 
                            v-model="ruleForm.dailySales"
                            >
                            <el-option 
                                v-for="item in devSign"                        
                                :key="item.key"
                                :label="item.label"
                                :value="item.value"
                                >
                            </el-option>
                        </el-select>
                        <el-select 
                            v-model="ruleForm.dailySales"
                            >
                            <el-option 
                                v-for="item in devSign"                        
                                :key="item.key"
                                :label="item.label"
                                :value="item.value"
                                >
                            </el-option>
                        </el-select>
                        <el-select 
                            v-model="ruleForm.dailySales"
                            >
                            <el-option 
                                v-for="item in devSign"                        
                                :key="item.key"
                                :label="item.label"
                                :value="item.value"
                                >
                            </el-option>
                        </el-select>
                        <el-button>添加市场</el-button>
                        添加不同国家站点，请在列表页的操作下拉菜单选择”开发其它市场”
                    </el-form-item>
                </el-col>
            </el-row> 
            <el-row>
                <el-col :span="12">
                    <el-form-item label="计算海运费方式:" prop="dailySales">
                        <el-select 
                            v-model="ruleForm.dailySales"
                            >
                            <el-option 
                                v-for="item in devSign"                        
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
            <el-col v-for="(item,index) in wareHouseDetail" :key="item.key" :span="12">
                <span>{{wareHouseDetail[index].name}}</span> <el-button type="primary" size="mini" class="delButton">删除</el-button>
                <el-form :model="wareHouseDetail[index]" :rules="wareHouseRules" ref="ruleForm" label-width="200px" class="demo-ruleForm" size="mini">
                    <el-form-item label="产品开发价:" prop="productPrice">
                        <div style="width:200px">
                            <el-input v-model="wareHouseDetail[index].productPrice"></el-input>
                        </div>
                        
                    </el-form-item>
                    <el-form-item label="GBP 计算利润率:" prop="SFProductPrice">
                        <el-input v-model="wareHouseDetail[index].SFProductPrice"></el-input>
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
export default {
    name:'devInformationEdit',
    data(){
        return {
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
            samplingTime:'',
            orderTime:'',
            isbrand:''
            },
            rules: {
            staRating: [
                { required: true, message: '请输入活动名称', trigger: 'blur' },
            ],
            targetPrice: [
                { required: true, message: '请填写价格', trigger: 'blur' }
            ],
            westaRating: [
                { type: 'date', required: true, message: '请选择日期', trigger: 'blur' }
            ],
            dailySales: [
                { type: 'date', required: true, message: '请选择时间', trigger: 'blur' }
            ],
            rateRequirements: [
                { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'blur' }
            ],
            orderQuantity: [
                { required: true, message: '请选择活动资源', trigger: 'blur' }
            ],
            productMarket: [
                { required: true, message: '请填写活动形式', trigger: 'blur' }
            ],
            specialPackaging: [
                { required: true, message: '请填写活动形式', trigger: 'blur' }
            ],
            samplingTime: [
                { required: true, message: '请填写活动形式', trigger: 'blur' }
            ],
            orderTime: [
                { required: true, message: '请填写活动形式', trigger: 'blur' }
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
            wareHouseDetail:
            [
                {
                    name:'Amazon-GB-英国仓',
                    productPrice:'$11',
                    SFProductPrice:'$89',
                    SFPfreight:'$69',
                    key:'1'
                },
                {
                    name:'ebay-GB-英国仓',
                    productPrice:'$113',
                    SFProductPrice:'$89',
                    SFPfreight:'$69',
                    key:'2'
                },
                {
                    name:'ebay-GB-英国仓',
                    productPrice:'$141',
                    SFProductPrice:'$89',
                    SFPfreight:'$69',
                    key:'3'
                },
            ],
            wareHouseRules:{
                productPrice: [
                    { type: 'array', required: true, message: '请添加价格', trigger: 'blur' }
                ],
                SFProductPrice: [
                    { type: 'array', required: true, message: '请添加价格', trigger: 'blur' }
                ],
            }
        }
    },
    methods:{
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
      
</style>