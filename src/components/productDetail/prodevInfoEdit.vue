<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm" size="mini">
            <el-row>
                <el-col :span="11">
                    <el-form-item :label="M2('中文标题') + ':'"  prop="chineseTitle">
                        <el-input type="textarea"  
                            maxlength="25"
                            show-word-limit autosize 
                            v-model="ruleForm.chineseTitle">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item :label="M2('中文描述') + ':'" type="textarea" autosize prop="chineseDescription">
                        <el-input 
                            type="textarea" 
                            autosize 
                            v-model="ruleForm.chineseDescription"
                            maxlength="200"
                            show-word-limit  
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="17">
                    <el-form-item  :label="M2('供应商所在地') + ':'" prop="supplierLocation">
                        <el-select 
                            v-model="ruleForm.supplierLocation"
                            :placeholder="M2('请选择省份')"
                            @change="selectProvince"
                            >
                            <el-option 
                                v-for="item in provinceList"                        
                                :key="item.Id"
                                :label="item.Id == '900000' ? M2(item.FullName) : item.FullName"
                                :value="item.Id"
                                >
                            </el-option>
                        </el-select>
                        <el-select 
                            v-model="ruleForm.supplierLocation1"
                            :placeholder="M2('请选择城市')"
                            @change="selectCity"
                            >
                            <el-option 
                                v-for="item in cityList"                        
                                :key="item.Id"
                                :label="ruleForm.supplierLocation == '900000' ? M2(item.Name) : item.Name"
                                :value="item.Id"
                                >
                            </el-option>
                        </el-select>
                        <el-select 
                            v-model="ruleForm.supplierLocation2"
                            :placeholder="M2('请选择区域')"
                            >
                            <el-option 
                                v-for="item in districtList"                        
                                :key="item.Id"
                                :label="ruleForm.supplierLocation == '900000' ? M2(item.Name) : item.Name"
                                :value="item.Id"
                                >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11" :xs="24" :sm="24" :md="24" :lg="12" :xl="8">
                    <el-form-item :label="M2('必要认证附件') + ':'">
                        <el-upload
                            class="upload-demo"
                            :action='action'
                            :on-preview="handlePreview"
                            :before-remove="beforeRemove"
                            :on-success="successUploadFile"
                            multiple
                            :on-exceed="handleExceed"
                            :file-list="ruleForm.fileList"
                            :data="{fileType:3,developmentId:$route.query.developmentId,countryCode:ruleForm.productMustMarket}"
                            :with-credentials='true'
                            :on-remove='removeMustFile'
                            >
                            <el-select 
                                v-model="ruleForm.productMustMarket"
                                :placeholder="M2('请选择文档所属市场')"
                                >
                                <el-option 
                                    v-for="item in devSign"                        
                                    :key="item.key"
                                    :label="M2(item.label)"
                                    :value="item.value"
                                    >
                                </el-option>
                            </el-select>
                            <el-button size="small" type="primary" style="margin-left:15px">{{M2('选择文件')}}</el-button>
                        </el-upload>
                    </el-form-item>
                    
                </el-col>
                <el-col :span="11" :xs="24" :sm="24" :md="24" :lg="9" :xl="6">
                    <el-form-item :label="M2('附件后补时间') + ':'" prop="noticeTime">
                        <div class="feeForOrderText">
                            <el-date-picker
                                v-model="ruleForm.noticeTime"
                                type="date"
                                :placeholder="M2('选择日期')"
                                :picker-options="setDisabled"
                                style="width:150px"
                                >
                            </el-date-picker>
                        </div>   
                     </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="17">
                    <el-form-item :label="M2('推荐认证附件') + ':'">
                        <el-upload
                            class="upload-demo"
                            :action="action"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            :on-success="successUploadFile"
                            multiple
                            :on-exceed="handleExceed"
                            :data="{fileType:2,developmentId:$route.query.developmentId,countryCode:ruleForm.productMarket}"
                            :with-credentials='true'
                            :file-list="ruleForm.recommendFileList">
                                <el-select 
                                    v-model="ruleForm.productMarket"
                                    :placeholder="M2('请选择文档所属市场')"
                                    >
                                    <el-option 
                                        v-for="item in devSign"                        
                                        :key="item.key"
                                        :label="M2(item.label)"
                                        :value="item.value"
                                        >
                                    </el-option>
                                </el-select>
                                <el-button size="small" type="primary" style="margin-left:15px">{{M2('选择文件')}}</el-button>
                            </el-upload>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="17">
                    <el-form-item :label="M2('认证备注') + ':'">
                        <el-input type="textarea" 
                            autosize 
                            v-model="ruleForm.certificationRemarks"
                            maxlength="200"
                            show-word-limit
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item :label="M2('工厂提供的图片') + ':'">
                        <el-upload
                            class="upload-demo"
                            :action="action"
                            :on-remove="imageHandleRemove"
                            :before-remove="beforeRemove"
                            :on-success="successUploadFile"
                            multiple
                            :limit="6"
                            :on-exceed="handleExceed"
                            list-type="picture-card"
                            accept=".jpg,.jpeg,.png,.gif"
                            :with-credentials='true'
                            :data="{fileType:1,developmentId:$route.query.developmentId}"
                            :file-list="ruleForm.factoryGaveImage">
                            <i class="el-icon-plus"></i>
                            </el-upload>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div class="bottomButton">
            <el-button type="primary" @click="submitForm('ruleForm')" size="mini" v-track="{triggerType:'click',currentUrl: $route.path,behavior:'保存',businessCode:'产品标题和供应商信息'}" perkey='ERP.Product.ProductDev.SalesManEdit'>{{M2('保存')}}</el-button>
            <el-button @click="resetForm('ruleForm')" size="mini" v-track="{triggerType:'click',currentUrl: $route.path,behavior:'取消',businessCode:'产品标题和供应商信息'}">{{M2('取消')}}</el-button>
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
            setDisabled: {
                disabledDate(time) {
                // return time.getTime() > Date.now();  // 可选历史天、可选当前天、不可选未来天
                // return time.getTime() > Date.now() - 8.64e7;  // 可选历史天、不可选当前天、不可选未来天
                // return time.getTime() < Date.now() - 8.64e7;  // 不可选历史天、可选当前天、可选未来天
                return time.getTime() < Date.now(); // 不可选历史天、不可选当前天、可选未来天
                },
            },
            ruleForm:{
                chineseTitle:'',
                chineseDescription:'',
                supplierLocation:'',
                supplierLocation1:'',
                supplierLocation2:'',
                productMarket:0,
                certificationRemarks:'',
                noticeTime:'',
                productMustMarket:0,
                fileList:[
                    ],
                recommendFileList:[
                ],
            },
            rules:{
                chineseDescription: [{ required: true, message: this.M2('请填写描述信息'), trigger: 'blur' }],
                chineseTitle: [{ required: true, message: this.M2('请填写中文标题'), trigger: 'blur' }],
                supplierLocation: [{ required: true, message: this.M2('请选择供应商所在地'), trigger: 'blur' }],
                certificationRemarks: [{ required: true, message: this.M2('请填写认证备注'), trigger: 'blur' }],
                recommendFileList: [{ required: true, message: this.M2('请添加图片'), trigger: 'blur' }],
            },
            devSign:[
                {
                    label: '所有市场',
                    key: 0,
                    value: 0
                },
                {
                    label: '美国',
                    key: 1,
                    value: 'US'
                },
                {
                    label: '英国',
                    key: 2,
                    value: 'GB'
                },    
                {
                    label: '欧盟',
                    key: 3,
                    value: 'OU'
                }, 
            ],
        }
    },
    props:{
        prodevInfoDetaiList:{
            type:Object,
            default:() => ({})
        },
        proImageList:{
            type:String,
            default:() => ('')
        }
    },
    created(){
        this.getContryList()
    },
    mounted(){
        this.getDetaiList()
        
    },
    methods:{
        getContryList(){
            let params = {
                parentId : 0
            }
            getAdministrativeRegion(params).then(res => {
                this.provinceList = res.data
                this.ruleForm.supplierLocation = this.prodevInfoDetaiList.provincecode ? this.prodevInfoDetaiList.provincecode :''
            })
            if(this.prodevInfoDetaiList.provincecode){
                getAdministrativeRegion({parentId:this.prodevInfoDetaiList.provincecode}).then(res => {
                    this.cityList = res.data
                    this.ruleForm.supplierLocation1=this.prodevInfoDetaiList.citycode
                })
            }
            if(this.prodevInfoDetaiList.areacode){
                getAdministrativeRegion({parentId:this.prodevInfoDetaiList.citycode}).then(res => {
                    this.districtList = res.data
                    this.ruleForm.supplierLocation2 = this.prodevInfoDetaiList.areacode
                })
            }
        },
        successUploadFile(data,file){
            // this.$emit('getAllpageList')
            if(data.data){
                data.data.forEach(item => {
                    file.id = item
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
                    noticeTime:this.prodevInfoDetaiList.noticeTime,
                    productMustMarket:0,
                    productMarket:0
            }
        },
        handleRemove(file) {
            let param = new FormData();
            param.append('developmentId', this.$route.query.developmentId);
            param.append('fileType', 2);
            param.append('datta', file.id);
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            loadFile(param,config).then(res => {
                if(res.code == 200){
                   this.$emit('closeEdit')
                }
            })
        },
        imageHandleRemove(file) {
            let param = new FormData();
            param.append('developmentId', this.$route.query.developmentId);
            param.append('fileType', 1);
            param.append('datta', file.id);
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            loadFile(param,config).then(res => {
                if(res.code == 200){
                   this.$emit('closeEdit')
                }
            })
        },
        removeMustFile(file){
            let param = new FormData();
            param.append('developmentId', this.$route.query.developmentId);
            param.append('fileType', 2);
            param.append('datta', file.id);
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            loadFile(param,config).then(res => {
                if(res.code == 200){
                   this.$emit('closeEdit')
                }
            })

        },
        handlePreview(file) {
            //文件点击事件
            window.open(`${this.proImageList}Development/downloadFile?developmentId=${this.$route.query.developmentId}&fileName=${file.fileuri}`)
        },
        handleExceed(files, fileList) {
            this.$message.warning(this.M2(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`));
        },
        beforeRemove(file) {
            return this.$confirm(this.M2(`确定移除这个文件吗？`),this.M2('提示'),{cancelButtonClass: 'btn-custom-cancel'});
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                let params = {
                    developmentId: this.$route.query.developmentId,
                    productId: this.$route.query.productId,
                    productCountryId: this.$route.query.productCountryId,
                    title:this.ruleForm.chineseTitle,//中文标题
                    noticeTime:this.ruleForm.noticeTime ? this.$moment(this.ruleForm.noticeTime).format("YYYY-MM-DD") : this.ruleForm.noticeTime,
                    description:this.ruleForm.chineseDescription,//中文描述
                    certificationnote:this.ruleForm.certificationRemarks,//认证备注
                    provinceCode: this.ruleForm.supplierLocation,//供应商所在地--省
                    cityCode:this.ruleForm.supplierLocation1,//供应商所在地--市
                    areaCode:this.ruleForm.supplierLocation2//供应商所在地--区 
                }
                purchaseManager(params).then((res) => {
                    if(res.code == 200){
                        this.$message({
                            type: 'success', 
                            message:this.M2('保存成功'),
                            offset:220
                        })
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