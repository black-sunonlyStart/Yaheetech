<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm" size="mini">
            <el-row>
                <el-col :span="10">
                    <el-form-item label="是否需要认证:" prop="isCertificationReq">
                        <el-radio-group v-model="ruleForm.isCertificationReq">
                            <el-radio :label="true">是</el-radio>
                            <el-radio :label="false">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="必要认证:" prop="nessCertification" >
                        <el-checkbox-group v-model="ruleForm.usaNessCertification">
                            <div class="contrayText">
                                美国 : <el-checkbox :label="item.authId" v-for="item in isUsa" :key="item.authId">{{item.authName}}</el-checkbox>
                            </div>
                        </el-checkbox-group>
                        <el-checkbox-group v-model="ruleForm.ukNessCertification">
                            <div class="contrayText">
                                欧盟 : <el-checkbox :label="item.authId" v-for="item in isUk" :key="item.authId">{{item.authName}}</el-checkbox>
                            </div>
                        </el-checkbox-group>
                        <el-checkbox-group v-model="ruleForm.euNessCertification">
                            <div class="contrayText">
                                澳大利亚 : <el-checkbox :label="item.authId" v-for="item in isEu" :key="item.authId">{{item.authName}}</el-checkbox>
                            </div>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="认证要求:" prop="requirements">
                        <el-input
                           v-for="item in ruleForm.requirements" 
                           :key="item.id"
                            v-model="item.data">
                        </el-input>
                         <div class="requireMentsBox" @click="addMustRequire">添加</div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="确认测试要求:" prop="testRequirements">
                        <el-input
                           v-for="item in ruleForm.testRequirements" 
                           :key="item.id"
                            v-model="item.data">
                        </el-input>
                        <div class="requireMentsBox" @click="addRequireMent">添加</div>
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
                         <el-checkbox v-model="ruleForm.checkedUSA" label='en-US'  @change="addthis">美国</el-checkbox>
                         <el-checkbox v-model="ruleForm.checkedUK" label="EN_GB">英国</el-checkbox>
                         <el-checkbox v-model="ruleForm.checkedEU" label="DE">德国</el-checkbox>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="ruleForm.checkedUSA.length > 0">
                <el-col :span="10">
                    <el-form-item label="美国">
                         <el-input v-model="ruleForm.inputUSA"></el-input>  
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="ruleForm.checkedUK.length > 0">
                <el-col :span="10">
                    <el-form-item label="英国">
                         <el-input v-model="ruleForm.inputUK"></el-input>  
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="ruleForm.checkedEU.length > 0">
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
                usaNessCertification:[1],
                ukNessCertification:[],
                euNessCertification:[],
                requirements:'',
                testRequirements:'',
                requirementsRemark:'',
                productAgeGroup:'',
                ageGroupRemarks:'',
                patentRiskLevel:'',
                checkedUSA:[],
                checkedUK:[],
                checkedEU:[],
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
            isUsa:[
                {
                    authId:1,
                    authName: 'FCC'
                },
                {
                    authId:2,
                    authName: 'CPSIA'
                },
                {
                    authId:3,
                    authName: 'CFR 1303'
                },
                {
                    authId:4,
                    authName: 'FDA'
                },
            ],
            isUk:[
                {
                    authId:20,
                    authName: 'CE'
                },
                {
                    authId:21,
                    authName: 'GPSD'
                },
                {
                    authId:22,
                    authName: 'food grade'
                },
                {
                    authId:23,
                    authName: 'REACH ANNEX XVII'
                },
            ],
            isEu:[
                {
                    authId:40,
                    authName: 'RCM'
                },
                {
                    authId:41,
                    authName: 'EU Food grade'
                },
                {
                    authId:42,
                    authName: 'FDA'
                },
            ],
            devSign:[
                {
                    label: '成人',
                    key: 1,
                    value: 2
                },
                {
                    label: '儿童',
                    key: 2,
                    value: 1
                },    
                {
                    label: '婴儿',
                    key: 3,
                    value: 0
                }, 
            ],
            riskLevel:[
                {
                    label: '高风险',
                    key: 1,
                    value: 0
                },
                {
                    label: '中风险',
                    key: 2,
                    value: 1
                },    
                {
                    label: '低风险',
                    key: 3,
                    value: 2
                }, 
            ]
        }
    },
    props:{
        prodCerInfoDetailList:{
            type:Object,
            default:() => ({})
        }
    },
    mounted(){
        this.getDetailPage()
    },
    methods:{
        addthis(val){
            console.log(val)
        },
        addRequireMent(){
            console.log(this.prodCerInfoDetailList)
            this.prodCerInfoDetailList.credentialList2.push({})
        },
        addMustRequire(){
            this.prodCerInfoDetailList.credentialList1.push({})
        },
        getDetailPage(){
            if(!this.prodCerInfoDetailList.credentialList1)return
            let credentialList1 = this.prodCerInfoDetailList.credentialList1.map(item => {
                return item.authId
            })
            if(this.prodCerInfoDetailList.patentInfo.length > 0){
                this.prodCerInfoDetailList.patentInfo.forEach(item => {
                    if(item.LanguageCode == 'en-US'){
                        this.ruleForm.checkedUSA = 'en-US'
                        this.ruleForm.inputUSA = item.Value
                    }else if(item.LanguageCode == 'EN_GB'){
                        this.ruleForm.checkedUSA = 'EN_GB'
                        this.ruleForm.inputUK = item.Value
                    }else if (item.LanguageCode == 'DE'){
                        this.ruleForm.checkedUSA = 'DE'
                        this.ruleForm.inputEU = item.Value
                    }
                    
                })
            }
            this.ruleForm = {
                isCertificationReq:this.prodCerInfoDetailList.isauth,
                usaNessCertification:this.getAuthId(this.isUsa,credentialList1),
                ukNessCertification:this.getAuthId(this.isUk,credentialList1),
                euNessCertification:this.getAuthId(this.isEu,credentialList1),
                requirements:this.prodCerInfoDetailList.credentialList2,
                testRequirements:this.prodCerInfoDetailList.credentialList3,
                requirementsRemark:this.prodCerInfoDetailList.authnote,
                productAgeGroup:this.prodCerInfoDetailList.applicableAge,
                ageGroupRemarks:this.prodCerInfoDetailList.applicableAgeRemarks ? this.prodCerInfoDetailList.applicableAgeRemarks : '',
                patentRiskLevel:this.prodCerInfoDetailList.riskllevel,
                checkedUSA:[],
                checkedUK:[],
                checkedEU:[],
            }
        },
        getAuthId(isUsa,credentialList1){
            let usaid = isUsa.filter(res => {
                return credentialList1.includes(res.authId)
            })
            let rUsaid = usaid.map(item => {
                return item.authId
            })
            return rUsaid
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
    .contrayText{
        font-size: 14px;
    }
    .ageRemarks{
        width: 200px;
        display: inline-block;
        margin-left: 20px;
    }
    .requireMentsBox{
        cursor: pointer;
        color: #409Eff;
        display: inline-block;
    }
</style>