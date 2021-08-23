<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm" size="mini">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="产品星级评分:" prop="staRating">
                        <el-input v-model="ruleForm.staRating"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="目标采购价:" prop="targetPrice">
                        <el-input v-model="ruleForm.targetPrice"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="我司目标星级评分:" prop="westaRating">
                        <el-input v-model="ruleForm.westaRating"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="产品预估日销量:" prop="dailySales">
                        <el-input v-model="ruleForm.dailySales"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="目标售后返修率要求:" prop="rateRequirements">
                        <el-input v-model="ruleForm.rateRequirements"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="预估首单订单数量:" prop="orderQuantity">
                        <el-input v-model="ruleForm.orderQuantity"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="产品开发市场:" prop="productMarket">
                        <el-input v-model="ruleForm.productMarket"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="产品包装尺寸特殊要求:" prop="specialPackaging">
                        <el-input v-model="ruleForm.specialPackaging"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="产品测样时间点:" prop="samplingTime">
                        <el-input v-model="ruleForm.samplingTime"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="产品下单时间点:" prop="orderTime">
                        <el-input v-model="ruleForm.orderTime"></el-input>
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
export default {
    name:'salesTargetEdit',
    data(){
        return {
            ruleForm: {
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
                { required: true, message: '请输入活动名称', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            targetPrice: [
                { required: true, message: '请选择活动区域', trigger: 'change' }
            ],
            westaRating: [
                { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
            ],
            dailySales: [
                { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
            ],
            rateRequirements: [
                { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
            ],
            orderQuantity: [
                { required: true, message: '请选择活动资源', trigger: 'change' }
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
        resetForm(formName) {
                this.$refs[formName].resetFields();
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
</style>