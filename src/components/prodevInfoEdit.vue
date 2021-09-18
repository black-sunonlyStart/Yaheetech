<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm" size="mini">
            <el-row>
                <el-col :span="11">
                    <el-form-item label="中文标题:">
                        <el-input type="textarea" autosize v-model="ruleForm.chineseTitle"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="中文描述:" type="textarea" autosize prop="chineseDescription">
                        <el-input type="textarea" autosize v-model="ruleForm.chineseDescription"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="15">
                    <el-form-item label="供应商所在地:" prop="supplierLocation">
                        <el-select 
                            v-model="ruleForm.supplierLocation"
                            placeholder="请选择省份"
                            @change="selectProvince"
                            >
                            <el-option 
                                v-for="item in provinceList"                        
                                :key="item[0]"
                                :label="item[1]"
                                :value="item[0]"
                                >
                            </el-option>
                        </el-select>
                        <el-select 
                            v-model="ruleForm.supplierLocation1"
                            placeholder="请选择城市"
                            @change="selectCity"
                            >
                            <el-option 
                                v-for="item in cityList"                        
                                :key="item[0]"
                                :label="item[1]"
                                :value="item[0]"
                                >
                            </el-option>
                        </el-select>
                        <el-select 
                            v-model="ruleForm.supplierLocation2"
                            placeholder="请选择区域"
                            >
                            <el-option 
                                v-for="item in districtList"                        
                                :key="item[0]"
                                :label="item[1]"
                                :value="item[0]"
                                >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="必要认证附件:">
                        <el-upload
                            class="upload-demo"
                            :action='action'
                            :on-preview="handlePreview"
                            :before-remove="beforeRemove"
                            multiple
                            :limit="3"
                            :on-exceed="handleExceed"
                            :file-list="ruleForm.fileList"
                            :data="{fileType:3,developmentId:$route.params.developmentId}"
                            :with-credentials='true'
                            :on-remove='removeMustFile'
                            >
                            <el-button size="small" type="primary" style="margin-right:15px">选择文件</el-button>
                                <el-select 
                                    v-model="ruleForm.productMarket"
                                    placeholder="请选择文档所属市场"
                                    >
                                    <el-option 
                                        v-for="item in devSign"                        
                                        :key="item.key"
                                        :label="item.label"
                                        :value="item.value"
                                        >
                                    </el-option>
                                </el-select>
                            </el-upload>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="推荐认证附件:">
                        <el-upload
                            class="upload-demo"
                            :action="action"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            multiple
                            :limit="3"
                            :on-exceed="handleExceed"
                            :data="{fileType:2,developmentId:$route.params.developmentId}"
                            :with-credentials='true'
                            :file-list="ruleForm.recommendFileList">
                            <el-button size="small" type="primary" style="margin-right:15px">选择文件</el-button>
                                <el-select 
                                    v-model="ruleForm.productMarket"
                                    placeholder="请选择文档所属市场"
                                    >
                                    <el-option 
                                        v-for="item in devSign"                        
                                        :key="item.key"
                                        :label="item.label"
                                        :value="item.value"
                                        >
                                    </el-option>
                                </el-select>
                            </el-upload>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="认证备注:" prop="certificationRemarks">
                        <el-input type="textarea" autosize v-model="ruleForm.certificationRemarks"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="工厂提供的图片:">
                        <el-upload
                            class="upload-demo"
                            :action="action"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            multiple
                            :limit="3"
                            :on-exceed="handleExceed"
                            list-type="picture-card"
                            :with-credentials='true'
                            :data="{fileType:1,developmentId:$route.params.developmentId}"
                            :file-list="ruleForm.factoryGaveImage">
                            <i class="el-icon-plus"></i>
                                <!-- <el-button size="small" type="primary" style="margin-right:15px">选择本地图片</el-button>
                                <el-button size="small" type="primary" style="margin-right:15px">清空图片</el-button> -->
                            </el-upload>
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
import { getAdministrativeRegion,purchaseManager,loadFile } from '@/api/user.js'
import { upload_file } from '@/utils/files'
export default {
    name:'prodevInfoEdit',
    data(){
        return {
            fileType:{
                fileType:2
            },
            action:upload_file,
            provinceList:[],
            cityList:[],
            districtList:[],
            ruleForm:{
                chineseTitle:'',
                chineseDescription:'',
                supplierLocation:'',
                supplierLocation1:'',
                supplierLocation2:'',
                productMarket:'',
                certificationRemarks:'',
                fileList:[
                  
                    ],
                recommendFileList:[
               
                ],


            },
            rules:{
                chineseDescription: [{ required: true, message: '请填写描述信息', trigger: 'blur' }],
                supplierLocation: [{ required: true, message: '请选择供应商所在地', trigger: 'blur' }],
                certificationRemarks: [{ required: true, message: '请填写认证备注', trigger: 'blur' }],
                recommendFileList: [{ required: true, message: '请添加图片', trigger: 'blur' }],
            },
            devSign:[
                {
                    label: 'eBay',
                    key: 1,
                    value: 1
                },
                {
                    label: 'Amazon',
                    key: 2,
                    value: 2
                },    
                {
                    label: 'TradeMe',
                    key: 3,
                    value: 3
                }, 
                {
                    label: 'Walmart',
                    key: 4,
                    value: 4
                }, 
            ],
        }
    },
    props:{
        prodevInfoDetaiList:{
            type:Object,
            default:() => ({})
        }
    },
    mounted(){
        this.getDetaiList()
        this.getContryList()
    },
    methods:{
        getContryList(){
            let params = {
                parentId : 0
            }
            getAdministrativeRegion(params).then(res => {
                this.provinceList = res.data
                this.ruleForm.supplierLocation = this.prodevInfoDetaiList.provincecode ? this.prodevInfoDetaiList.provincecode.toString() :''
            })
            if(this.prodevInfoDetaiList.provincecode){
                getAdministrativeRegion({parentId:this.prodevInfoDetaiList.provincecode}).then(res => {
                    this.cityList = res.data
                     this.ruleForm.supplierLocation1=this.prodevInfoDetaiList.citycode.toString()
                })
            }
            if(this.prodevInfoDetaiList.areacode){
                getAdministrativeRegion({parentId:this.prodevInfoDetaiList.citycode}).then(res => {
                    this.districtList = res.data
                    this.ruleForm.supplierLocation2 = this.prodevInfoDetaiList.areacode.toString()
                    
                })
            }
        },
        selectProvince(val){
            this.ruleForm.supplierLocation1 = ''
            if(this.ruleForm.supplierLocation2){
            this.ruleForm.supplierLocation2 = ''
            }
            let params = {
                parentId : val
            }
            getAdministrativeRegion(params).then(res => {
                this.cityList = res.data
            })
        },
        selectCity(val){
            this.ruleForm.supplierLocation2 = ''
            let params = {
                parentId : val
            }
            getAdministrativeRegion(params).then(res => {
                this.districtList = res.data
            })
        },
        getDetaiList(){
            this.ruleForm = {
                    chineseTitle:this.prodevInfoDetaiList.title,
                    chineseDescription:this.prodevInfoDetaiList.description,
                    supplierLocation:this.prodevInfoDetaiList.provincecode ?this.prodevInfoDetaiList.provincecode:'',
                    supplierLocation1:this.prodevInfoDetaiList.citycode?this.prodevInfoDetaiList.citycode:'',
                    supplierLocation2:this.prodevInfoDetaiList.areacode?this.prodevInfoDetaiList.areacode:'',
                    certificationRemarks:this.prodevInfoDetaiList.certificationnote,
                    fileList:this.prodevInfoDetaiList.mustCredentialList,
                    factoryGaveImage:this.prodevInfoDetaiList.factoryGaveImage,
                    recommendFileList:this.prodevInfoDetaiList.recommendCredentialList,//推荐认证附件
                

            }
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        removeMustFile(file, fileList){
            console.log(file, fileList);
            let params = {
                fileType:3,
                developmentId:this.$route.params.developmentId,
                datta:file.id,
                file:file
            }
            loadFile(params).then(res => {
                if(res.code == 200){
                   this.$emit('closeEdit')
                }
            })

        },
        handlePreview(file) {
            //文件点击事件
            console.log(file);
        },
        handleExceed(files, fileList) {
            console.log(files,'222222')
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                let params = {
                    developmentId: this.$route.params.developmentId,
                    productId: this.$route.params.productId,
                    productCountryId: this.$route.params.productCountryId,
                    title:this.ruleForm.chineseTitle,//中文标题
                    description:this.ruleForm.chineseDescription,//中文描述
                    certificationnote:this.ruleForm.certificationRemarks,//认证备注
                    provinceCode: this.ruleForm.supplierLocation,//供应商所在地--省
                    cityCode:this.ruleForm.supplierLocation1,//供应商所在地--市
                    areaCode:this.ruleForm.supplierLocation2//供应商所在地--区 
                }
                purchaseManager(params).then((res) => {
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
</style>