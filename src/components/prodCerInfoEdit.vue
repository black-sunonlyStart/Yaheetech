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
                <el-col :span="21">
                    <el-form-item label="必要认证:" prop="usaNessCertification" >
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
                                英国 : <el-checkbox :label="item.authId" v-for="item in isEu" :key="item.authId">{{item.authName}}</el-checkbox>
                            </div>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="认证要求:" prop="requirements">
                        <div v-for="(item, index) in ruleForm.requirements" 
                            :key="item.id" class="remarkBox">
                            <el-input
                                type="textarea"
                                autosize
                                v-model="item.data"
                                @change="changeRequirements(index,item.data)"
                                >
                            </el-input>
                            <div class="iconBox">
                                <i v-if="index !== 0" @click="delRements(index)" class="delText el-icon-circle-close"></i>
                            </div>      
                        </div>
                        <div class="requireMentsBox" @click="addMustRequire">添加</div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="确认测试要求:" prop="testRequirements">
                        <div v-for="(item, index) in ruleForm.testRequirements" 
                            :key="item.id" class="remarkBox">
                            <el-input
                                type="textarea"
                                autosize
                                v-model="item.data"
                                @change='changeTestRequirements(index, item.data)'
                                >
                                
                            </el-input>
                            <div class="iconBox">
                                <i v-if="index !== 0" @click="delTestRement" class="delText el-icon-circle-close"></i>
                            </div>      
                        </div>
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
import { credential } from '@/api/user.js'
export default {
    name:'prodCerInfoEdit',
    data(){
        return {
            ruleForm:{
                isCertificationReq:3,
                usaNessCertification:[],
                ukNessCertification:[],
                euNessCertification:[],
                requirements:[],
                testRequirements:[],
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
                usaNessCertification: [{
                        required: true,
                        validator: (rules, value, cb) => {
                        let { ukNessCertification,euNessCertification } = this.ruleForm;
                        if (value.length == 0 && ukNessCertification.length == 0 && euNessCertification.length == 0) {
                            return cb(new Error("请选择!"));
                        }

                        return cb();
                        },
                        trigger: "change"
                    }],
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
                {
                    authId:5,
                    authName: 'UL'
                },
                {
                    authId:6,
                    authName: 'CSA'
                },
                {
                    authId:7,
                    authName: 'ASTM F963'
                },
                {
                    authId:8,
                    authName: 'CPSIA'
                },
                {
                    authId:9,
                    authName: 'EPA formaldehyde'
                },
                {
                    authId:10,
                    authName: '16 CFR 1303'
                },
                {
                    authId:11,
                    authName: 'CA TB-117'
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
                {
                    authId:24,
                    authName: 'REACH SVHC'
                },
                {
                    authId:25,
                    authName: 'EMC'
                },
                {
                    authId:26,
                    authName: 'RoHs'
                },
                {
                    authId:27,
                    authName: 'LVD'
                },
                {
                    authId:28,
                    authName: 'E1'
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
                {
                    authId:43,
                    authName: 'UKCA'
                },
                {
                    authId:44,
                    authName: 'GPSD'
                },
                {
                    authId:45,
                    authName: 'FOOD GRADE'
                },
                {
                    authId:46,
                    authName: 'REACH SVHC'
                },
                {
                    authId:47,
                    authName: 'REACH ANNEX XVII'
                },
                {
                    authId:48,
                    authName: 'EMC'
                },
                {
                    authId:49,
                    authName: 'RoHs'
                },
                {
                    authId:50,
                    authName: 'LVD'
                },
                {
                    authId:51,
                    authName: 'E1'
                },
                {
                    authId:52,
                    authName: 'BS5852'
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
        changeTestRequirements(i,val){
            this.ruleForm.testRequirements[i].data = val
        },
        addRequireMent(){
            this.ruleForm.testRequirements.push({
                authtype:2,
                developmentid:this.$route.params.developmentId,
                productid:this.$route.params.productId
                // data:data
            })
        },
        delTestRement(index){
            this.ruleForm.testRequirements.splice(index,1)
        },
        addMustRequire(){
            this.ruleForm.requirements.push({
                authtype:1,
                developmentid:this.$route.params.developmentId,
                productid:this.$route.params.productId
            })
        },
        delRements(i){
           this.ruleForm.requirements.splice(i,1)
        },
        changeRequirements(i,val){
            this.ruleForm.requirements[i].data = val
        },
        getDetailPage(){
            if(!this.prodCerInfoDetailList.credentialList1)return

            let credentialList1 = this.prodCerInfoDetailList.credentialList1 && this.prodCerInfoDetailList.credentialList1[0] ? this.prodCerInfoDetailList.credentialList1[0].data :''
            this.ruleForm = {
                isCertificationReq:this.prodCerInfoDetailList.isauth,
                usaNessCertification:this.getAuthId(this.isUsa,credentialList1),
                ukNessCertification:this.getAuthId(this.isUk,credentialList1),
                euNessCertification:this.getAuthId(this.isEu,credentialList1),
                requirements:this.prodCerInfoDetailList.credentialList2,
                testRequirements:this.prodCerInfoDetailList.credentialList3,
                requirementsRemark:this.prodCerInfoDetailList.authnote,
                productAgeGroup:this.prodCerInfoDetailList.applicableAge,
                ageGroupRemarks:this.prodCerInfoDetailList.applicableAgeNote ? this.prodCerInfoDetailList.applicableAgeNote : '',
                patentRiskLevel:this.prodCerInfoDetailList.riskllevel,
            }
            if(this.prodCerInfoDetailList.patentInfo && this.prodCerInfoDetailList.patentInfo.length > 0){
                this.prodCerInfoDetailList.patentInfo.forEach(item => {
                    if(item.LanguageCode == 'en-US'){
                        this.ruleForm.checkedUSA =['en-US']
                        this.ruleForm.inputUSA = item.Value
                    }else if(item.LanguageCode == 'en-GB'){
                        this.ruleForm.checkedUK = ['EN_GB']
                        this.ruleForm.inputUK = item.Value
                    }else if (item.LanguageCode == 'de'){
                        this.ruleForm.checkedEU = ['DE']
                        this.ruleForm.inputEU = item.Value
                    }
                    
                })
            }
        },
        getAuthId(isUsa,credentialList1){
            let newCredentialList1 = credentialList1.split(',')
            let usaid = []
             isUsa.forEach(item => {
                 newCredentialList1.forEach(res => {
                     if(res == item.authId){
                         usaid.push(item)
                     }
                 })
            })
            let rUsaid = usaid.map(item => {
                return item.authId
            })
            return rUsaid
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                let params = {
                    developmentId:this.$route.params.developmentId,
                    productId:this.$route.params.productId,
                    productCountryId:this.$route.params.productCountryId,
                    auth:this.ruleForm.isCertificationReq,
                    authNote:this.ruleForm.requirementsRemark,
                    applicableAge:this.ruleForm.productAgeGroup,
                    applicableAgeNote:this.ruleForm.ageGroupRemarks,
                    riskLevel:this.ruleForm.patentRiskLevel,
                    usPatentInfo:this.ruleForm.inputUSA,
                    gbPatentInfo:this.ruleForm.inputUK,
                    dePatentInfo:this.ruleForm.inputEU,
                }
                let dataList = this.ruleForm.usaNessCertification.concat(this.ruleForm.ukNessCertification).concat(this.ruleForm.euNessCertification)
                let mustRequire = {
                    id:this.prodCerInfoDetailList && this.prodCerInfoDetailList.credentialList1 && this.prodCerInfoDetailList.credentialList1[0] ? this.prodCerInfoDetailList.credentialList1[0].id : '',
                    developmentid:this.$route.params.developmentId,
                    productid:this.$route.params.productId,
                    authtype:0,
                    data:dataList.toString()
                }
                let copeList = []
                copeList.push(mustRequire,this.ruleForm.requirements,this.ruleForm.testRequirements)
                let newCopeList = copeList.flat()
                params.credentials = newCopeList
                credential(params).then(res => {
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
        color: #3366cc;
        display: inline-block;
    }
    ::v-deep.el-checkbox {
        margin-right: 15px !important;
    } 
    .remarkBox{
        margin-top: 10px;
        display: flex;
        .iconBox{
            width: 30px;
            height: 30px;
            .delText{
                display: inline-block;
                width: 30px;
                margin-left: 10px;
                line-height: 30px;
                &:hover{
                    color: #3366cc;
                }
            }
        }
    }
</style>