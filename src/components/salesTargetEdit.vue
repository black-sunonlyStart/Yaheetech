<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="170px" class="demo-ruleForm" size="mini">
            <el-row :gutter="150">
                <el-col :span="10">
                    <el-form-item label="产品星级评分:" prop="staRating">
                        <el-input-number  :controls='false' :precision="1" :step="0.1" :max="5" :min="0" v-model="ruleForm.staRating" class="numberInput"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="目标采购价:" prop="targetPrice">
                        <div class="targetPriceWbox">
                            <div class="targetPriceBox">
                                <el-input v-model="ruleForm.targetPrice">
                                    <template slot="append" v-if="ruleForm.region == 2">$</template>
                                    <template slot="append" v-else>¥</template>
                                </el-input>
                            </div>
                            <div>
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
                            </div>
                        </div> 
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="150">
                <el-col :span="10">
                    <el-form-item label="我司目标星级评分:" prop="westaRating">
                        <el-input-number  :controls='false' :precision="1" :step="0.1" :max="5" :min="0" v-model="ruleForm.westaRating" class="numberInput"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="产品预估日销量:" prop="dailySales">
                        <el-input v-model="ruleForm.dailySales"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="150">
                <el-col :span="10">
                    <el-form-item label="目标售后返修率要求:" prop="rateRequirements">
                        <el-input v-model="ruleForm.rateRequirements">
                            <template slot="append" >%</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="预估首单订单数量:" prop="orderQuantity">
                        <el-input v-model="ruleForm.orderQuantity"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="150">
                <el-col :span="10">
                    <el-form-item label="产品开发市场:" prop="productMarket">
                        <el-input v-model="ruleForm.productMarket"></el-input>
                    </el-form-item>
                    <el-form-item label="产品测样时间点:" prop="samplingTime">
                        <el-date-picker
                            v-model="ruleForm.samplingTime"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="产品下单时间点:" prop="orderTime">
                        <el-date-picker
                            v-model="ruleForm.orderTime"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="产品包装尺寸特殊要求:" prop="specialPackaging">
                        <el-input type="textarea" v-model="ruleForm.specialPackaging"></el-input>
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
import { salesTarget } from '@/api/user.js'
export default {
    name:'salesTargetEdit',
    data(){
        return {
            ruleForm: {
            region:2,
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
            },
            rules: {
            staRating: [
                { required: true, message: '请添加评分', trigger: 'blur' },
            ],
            targetPrice: [
                { required: true, message: '请填写价格', trigger: 'blur' }
            ],
            westaRating: [
                { type: 'date', required: true, message: '请添加评分', trigger: 'blur' }
            ],
            dailySales: [
                { type: 'date', required: true, message: '请添加产品预估日销量', trigger: 'blur' }
            ],
            rateRequirements: [
                { required: true, message: '请添加返修率', trigger: 'blur' }
            ],
            orderQuantity: [
                { required: true, message: '请填写预估首单订单数量', trigger: 'blur' }
            ],
            productMarket: [
                { required: true, message: '请填写产品开发市场:', trigger: 'blur' }
            ],
            specialPackaging: [
                { required: true, message: '请填写包装尺寸特殊要求', trigger: 'blur' }
            ],
            samplingTime: [
                { required: true, message: '请添加产品测样时间点', trigger: 'blur' }
            ],
            orderTime: [
                { required: true, message: '请添加产品下单时间点', trigger: 'blur' }
            ],
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
                    label: '零售价',
                    key: 3,
                    value: 3
                },    
                ],
        }
    },
    props:{
      salesTargetDetaiList:{
          type:Object,
          default:() => ({})
      }
    },
    mounted(){
        this.getDetailPage()
    },
    methods:{
        getDetailPage(){
            this.ruleForm = {
                staRating:this.salesTargetDetaiList.xsstarrating,//产品星级评分
                targetPrice:this.salesTargetDetaiList.xspurchaseprice,//目标采购价
                staRawestaRatingting:this.salesTargetDetaiList.xstargetstarrating,//我司目标星级评分
                dailySales:this.salesTargetDetaiList.xsdailysales,//产品预估日销量
                rateRequirements:this.salesTargetDetaiList.xsrepairraterequirement,//目标售后返修率要求
                orderQuantity:this.salesTargetDetaiList.xsfirstorderquantity,//预估首单订单数量
                productMarket:this.salesTargetDetaiList.xsmarket,//产品开发市场
                specialPackaging:this.salesTargetDetaiList.xsspecialrequirements,//产品包装尺寸特殊要求
                samplingTime:this.salesTargetDetaiList.xstestsampletime,//产品测样时间点
                orderTime:this.salesTargetDetaiList.xsorderoftime,//产品下单时间点
                region:this.salesTargetDetaiList.xspurchasePriceCurrency?this.salesTargetDetaiList.xspurchasePriceCurrency:2,//目标采购价
                
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                let params = {
                    developmentId:this.$route.params.developmentId,
                    productId:this.$route.params.productId,
                    productCountryId:this.$route.params.productCountryId,
                    xsstarRating:this.ruleForm.staRating,
                    xsTargetStarRating:this.ruleForm.staRawestaRatingting,
                    xsRepairRateRequirement:this.ruleForm.rateRequirements,
                    xsPurchasePrice:this.ruleForm.targetPrice,
                    xsDailySales:this.ruleForm.dailySales,
                    xsFirstOrderQuantity:this.ruleForm.orderQuantity,
                    xsMarket:this.ruleForm.productMarket,
                    xsSpecialRequirements:this.ruleForm.specialPackaging,
                    xsTestSampleTime:this.ruleForm.xsTestSampleTime,
                    xsOrderOfTime:this.ruleForm.orderTime,
                }
                salesTarget(params).then(res => {
                    if(res.code == 200){
                        this.$message.success('保存成功')
                        this.$emit('closeEdit','false')
                    }
                })
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm(formName) {
                this.$refs[formName].resetFields();
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
    ::v-deep.numberInput{
        
        width: 460px;
        .el-input__inner{
            text-align: left;
        }
    }   
</style>