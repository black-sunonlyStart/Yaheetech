<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm" size="mini">
            <el-row>
                <el-col :span="10">
                    <el-form-item label="是否需要认证:" prop="isCertificationReq">
                        <el-radio-group v-model="ruleForm.isCertificationReq">
                            <el-radio :label="3">是</el-radio>
                            <el-radio :label="6">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="必要认证:" prop="nessCertification" >
                        <el-checkbox-group v-model="ruleForm.usaNessCertification">
                            <div class="contrayText">
                                美国 : <el-checkbox :label="item" v-for="item in isUsa" :key="item">{{item}}</el-checkbox>
                            </div>
                        </el-checkbox-group>
                        <el-checkbox-group v-model="ruleForm.ukNessCertification">
                            <div class="contrayText">
                                英国 : <el-checkbox :label="item" v-for="item in isUk" :key="item">{{item}}</el-checkbox>
                            </div>
                        </el-checkbox-group>
                        <el-checkbox-group v-model="ruleForm.euNessCertification">
                            <div class="contrayText">
                                欧盟 : <el-checkbox :label="item" v-for="item in isEu" :key="item">{{item}}</el-checkbox>
                            </div>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="认证要求:" prop="requirements">
                        <el-input
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 4}"
                            placeholder="请输入内容"
                            v-model="ruleForm.requirements">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="确认测试要求:" prop="testRequirements">
                        <el-input
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 4}"
                            placeholder="请输入内容"
                            v-model="ruleForm.testRequirements">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="认证备注:" prop="testRequirements">
                        <el-input
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 4}"
                            placeholder="请输入内容"
                            v-model="ruleForm.requirementsRemark">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="5">
                    <el-form-item label="产品年龄段" prop="productAgeGroup">
                        <el-select 
                            v-model="ruleForm.productAgeGroup"
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
                <el-col :span="3">
                    <el-form-item label-width="20px">
                        <!-- <span class="ageRemarks"> -->
                            <el-input v-model="ruleForm.ageGroupRemarks" placeholder="备注"></el-input>
                        <!-- </span> -->
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="5">
                    <el-form-item label="专利风险等级" prop="patentRiskLevel">
                        <el-select 
                            v-model="ruleForm.patentRiskLevel"
                            >
                            <el-option 
                                v-for="item in riskLevel"                        
                                :key="item.key"
                                :label="item.label"
                                :value="item.value"
                                >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="10">
                    <el-form-item label="专利确认">
                         <el-checkbox v-model="ruleForm.checkedUSA">美国</el-checkbox>
                         <el-checkbox v-model="ruleForm.checkedUK">英国</el-checkbox>
                         <el-checkbox v-model="ruleForm.checkedEU">德国</el-checkbox>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="ruleForm.checkedUSA">
                <el-col :span="10">
                    <el-form-item label="美国">
                         <el-input v-model="ruleForm.inputUSA"></el-input>  
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="ruleForm.checkedUK">
                <el-col :span="10">
                    <el-form-item label="英国">
                         <el-input v-model="ruleForm.inputUK"></el-input>  
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="ruleForm.checkedEU">
                <el-col :span="10">
                    <el-form-item label="德国">
                         <el-input v-model="ruleForm.inputEU"></el-input>  
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
    name:'prodCerInfoEdit',
    data(){
        return {
            ruleForm:{
                isCertificationReq:3,
                usaNessCertification:[],
                ukNessCertification:[],
                euNessCertification:[],
                requirements:'',
                testRequirements:'',
                requirementsRemark:'',
                productAgeGroup:'',
                ageGroupRemarks:'',
                patentRiskLevel:'',
                checkedUSA:'',
                checkedUK:'',
                checkedEU:'',
                inputUSA:'',
                inputUK:'',
                inputEU:'',
            },
            rules:{
                isCertificationReq: [{ required: true, message: '请选择', trigger: 'blur' }],
                nessCertification: [{ required: true, message: '请选择', trigger: 'blur' }],
                requirements: [{ required: true, message: '请填写认证要求', trigger: 'blur' }],
                testRequirements: [{ required: true, message: '请填写测试要求', trigger: 'blur' }],
                requirementsRemark: [{ required: true, message: '请填写认证备注', trigger: 'blur' }],
                productAgeGroup: [{ required: true, message: '请选择适用年龄段', trigger: 'blur' }],
                patentRiskLevel: [{ required: true, message: '请选择风险等级', trigger: 'blur' }],
            },
            isUsa:['UL', 'CSA' ,'FCC', 'ASTM F963' ,'CPSIA' ,'EPA formaldehyde' ,'FDA' ,'16 CFR 1303', 'CA TB-117'],
            isUk:['UKCA', 'GPSD', 'FOOD GRADE', 'REACH SVHC' ,'REACH ANNEX XVII','EMC', 'RoHs' ,'LVD', 'E1', 'BS5852'],
            isEu:['CE', 'GPSD', 'FOOD GRADE', 'REACH SVHC' ,'REACH ANNEX XVII' ,'EMC' ,'RoHs', 'LVD' ,'E1'],
            devSign:[
                {
                    label: '成人',
                    key: 1,
                    value: '成人'
                },
                {
                    label: '儿童',
                    key: 2,
                    value: '儿童'
                },    
                {
                    label: '婴儿',
                    key: 3,
                    value: '婴儿'
                }, 
            ],
            riskLevel:[
                {
                    label: '高风险',
                    key: 1,
                    value: '高风险'
                },
                {
                    label: '中风险',
                    key: 2,
                    value: '中风险'
                },    
                {
                    label: '低风险',
                    key: 3,
                    value: '低风险'
                }, 
            ]
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
    .contrayText{
        font-size: 14px;
    }
    .ageRemarks{
        width: 200px;
        display: inline-block;
        margin-left: 20px;
    }
</style>