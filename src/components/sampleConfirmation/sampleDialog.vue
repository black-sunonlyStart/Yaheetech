<template>
    <div class="dialogBox">
        <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="800px"
            class="dialog-main"
            top="25vh"
            v-dialogDrag
            >
             <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" size='mini'>
                <div v-if="id == 1">
                    <el-form-item label="单号">
                        <template slot="label">
                            {{M2('单号')}}:
                        </template>
                        {{mainList[0].id}}
                    </el-form-item>
                    <el-form-item label="取消原因：" prop="whyNote">
                        <template slot="label">
                            {{M2('取消原因')}}:
                        </template>
                        <el-input size="mini" type="textarea" v-model="ruleForm.whyNote" :rows="5" ></el-input>
                    </el-form-item>
                </div>
                <el-form-item label="样品确认员：" prop="sampleValidator" v-if="id == 2">
                    <template slot="label">
                        {{M2('样品确认员')}}:
                    </template>
                    <el-select 
                        v-model="ruleForm.sampleValidator"
                        >
                        <el-option 
                            v-for="item in roleList"                        
                            :key="item.Id"
                            :label="item.TrueName"
                            :value="item.Id"
                            >
                        </el-option>
                    </el-select> 
                </el-form-item>
                <div v-if="id == 3">
                    <el-form-item label="样品确认日期：" prop="sampleConfirmationTime">
                        <template slot="label">
                            {{M2('样品确认日期')}}:
                        </template>
                        <el-date-picker
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            size="mini"
                            :picker-options="setDisabled"
                            v-model="ruleForm.sampleConfirmationTime"
                            type="date"
                            :key="Math.random()"
                            :placeholder="M2('选择日期')">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="样品确认结果：" prop="sampleConfirmationResult">
                        <template slot="label">
                            {{M2('样品确认结果')}}:
                        </template>
                        <el-select 
                            v-model="ruleForm.sampleConfirmationResult"
                            >
                            <el-option 
                                v-for="item in sampleResultList"                        
                                :key="item.key"
                                :label="M2(item.label)"
                                :value="item.value"
                                >
                            </el-option>
                        </el-select> 
                    </el-form-item>
                </div>
                <div v-if="id == 4">
                    <el-form-item label="单号">
                        <template slot="label">
                            {{M2('单号')}}:
                        </template>
                        {{mainList[0].id}}
                    </el-form-item>
                    <el-form-item label="打回原因：" prop="whyNote">
                        <template slot="label">
                            {{M2('打回原因')}}:
                        </template>
                        <el-input size="mini" type="textarea" v-model="ruleForm.whyNote" :rows="5" ></el-input>
                    </el-form-item>
                </div>
                <div v-if="id == 5">
                    <el-form-item label="申请修改的结果：" prop="sampleConfirmationResult" label-width="130px">
                        <template slot="label">
                            {{M2('申请修改的结果')}}:
                        </template>
                        <el-select 
                            v-model="ruleForm.sampleConfirmationResult"
                            size="mini"
                            >
                            <el-option 
                                v-for="item in devSign"                        
                                :key="item.key"
                                :label="M2(item.label)"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="初版验货报告：" prop="resultFile" label-width="130px" v-if="ruleForm.sampleConfirmationResult == 5 || ruleForm.sampleConfirmationResult == 6">
                        <template slot="label">
                            {{M2('初版验货报告')}}:
                        </template>
                        <fileUpload 
                            :dataParams='{fileType:12}' 
                            accept='.doc,.docx,.pdf,.xlsx,.csv,.xls' :imgUrl="imgUrl" 
                            :value='resultFile' 
                            :limit="5" @upDateFile="upDateFile" 
                            ruleName="resultFile"
                        ></fileUpload> 
                    </el-form-item>
                    <div v-if="ruleForm.sampleConfirmationResult == 6 || ruleForm.sampleConfirmationResult == 7">
                        <el-form-item label="问题描述：" prop="problemDesc" label-width="130px" >
                            <template slot="label">
                                {{M2('问题描述')}}:
                            </template>
                            <el-input type="textarea" :rows="5" size="mini" v-model="ruleForm.problemDesc"></el-input>
                        </el-form-item>
                        <el-form-item label="文件：" prop="designConstructionFile" label-width="130px">
                            <template slot="label">
                                {{M2('文件')}}:
                            </template>
                            <fileUpload 
                                :dataParams='{fileType:15}'  
                                accept='.doc,.docx,.pdf,.xlsx,.csv,.xls' :imgUrl="imgUrl" 
                                :value='ruleForm.designConstructionFile' 
                                :limit="5" @upDateFile="upDateFile" 
                                ruleName="designConstructionFile"
                            ></fileUpload> 
                        </el-form-item>
                        <el-form-item label="问题图片：" prop="sampleQuestionPhoto" label-width="130px">
                            <template slot="label">
                                {{M2('问题图片')}}:
                            </template>
                            <imgUpload :fileType='16' :showButton="false" :value='ruleForm.sampleQuestionPhoto' :limit="20" :imgUrl="imgUrl"></imgUpload> 
                        </el-form-item>
                    </div>
                    
                    <el-form-item label="本次修改的原因：" prop="reason" label-width="130px">
                        <template slot="label">
                            {{M2('本次修改的原因')}}:
                        </template>
                        <el-input size="mini" type="textarea" v-model="ruleForm.reason" :rows="5" ></el-input>
                    </el-form-item>
                </div>

                <div v-if="id == 6">
                    <el-form-item label="审核结果：" prop="modificationResult" label-width="130px">
                        <template slot="label">
                            {{M2('审核结果')}}:
                        </template>
                        <el-select 
                            v-model="ruleForm.modificationResult"
                            size="mini"
                            >
                            <el-option 
                                v-for="item in resuletList"                        
                                :key="item.value"
                                :label="M2(item.label)"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="申请修改的结果："  label-width="130px">
                        <template slot="label">
                            {{M2('申请修改的结果')}}:
                        </template>
                        {{ruleForm.sampleConfirmationResultStr}}
                    </el-form-item>
                    <el-form-item label="初版验货报告：" prop="resultFile" label-width="130px" v-if="ruleForm.sampleConfirmationResult == 5 || ruleForm.sampleConfirmationResult == 6">
                        <template slot="label">
                            {{M2('初版验货报告')}}:
                        </template>
                         <div v-for="item in resultFile" :key="item.id">
                            <el-link type="primary" class="a-link" @click="clickFileName(item.fileUri)">{{item.fileName}}</el-link >
                        </div>
                    </el-form-item>
                    <div v-if="ruleForm.sampleConfirmationResult == 6 || ruleForm.sampleConfirmationResult == 7">
                        <el-form-item label="问题描述："  label-width="130px" >
                            <template slot="label">
                                {{M2('问题描述')}}:
                            </template>
                            {{ruleForm.problemDesc}}
                        </el-form-item>
                        <el-form-item label="文件："  label-width="130px">
                            <template slot="label">
                                {{M2('文件')}}:
                            </template>
                           <div>
                                <div v-for="item in ruleForm.designConstructionFile" :key="item.id">
                                    <el-link type="primary" class="a-link" @click="clickFileName(item.fileUri)">{{item.fileName}}</el-link >
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item label="问题图片："  label-width="130px">
                            <template slot="label">
                                {{M2('问题图片')}}:
                            </template>
                            <div class="image-flex">
                                <el-image  v-for="item in ruleForm.sampleQuestionPhoto" :key="item.url" :src="item.showImgUrl" :preview-src-list="[item.showBigImgUrl]"></el-image>
                            </div>
                        </el-form-item>
                    </div>
                    <el-form-item label="审核说明：" prop="desc" label-width="130px">
                        <template slot="label">
                            {{M2('审核说明')}}:
                        </template>
                        <el-input size="mini" type="textarea" v-model="ruleForm.desc" :rows="5" ></el-input>
                    </el-form-item>
                </div>
             </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onSubmit('ruleForm')" :loading="buttonLoading" :disabled="buttonLoading" size="small">{{M2('确 定')}}</el-button>
                <el-button  @click="closeSubmit('ruleForm')" size="small">{{M2('取 消')}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { getSampleValidatorList,saveSampleValidator,approvalSampleMemo,cancelApplication,repulse,getFilePath,applyUpdateResult,getApplyUpdateResult,reviewApplyUpdateResult } from '@/api/user.js'
import { judgePorduction} from '@/utils/tools.js'
var applicationTime = ''
export default {
    name:'sampleDialog',
    components:{
        imgUpload:() => import('@/components/common/commonUploadImg'),
        fileUpload:() => import('@/components/common/commonUploadFile'),
    },
    data(){
        return {
            devSign:[
                {
                    label: '合格',
                    key: 1,
                    value:5
                },
                {
                    label: '改进后通过(产前样)',
                    key: 2,
                    value:6
                },    
                {
                    label: '不合格',
                    key: 3,
                    value:7
                }, 
            ],
            resuletList:[
                {
                    label: '通过',
                    value:1
                },
                {
                    label: '驳回',
                    value:2
                },
            ],
            buttonLoading:false,
            id:'',
            imgUrl:'',
            dialogVisible:false,
            title:'',
            mainList:[],
            roleList:[],
            designConstructionFile:[],
            sampleResultList:[
                {
                    label: '合格',
                    key: 1,
                    value:5
                },
                {
                    label: '改进后通过(产前样)',
                    key: 2,
                    value:6
                },    
                {
                    label: '不合格',
                    key: 3,
                    value:7
                }, 
            ],
            resultFile:[],
            ruleForm:{
                whyNote:'',
                sampleValidator:'',
                sampleConfirmationTime:'',
                sampleConfirmationResult:null,
                resultFile:[],//初版验货报告
                designConstructionFile:[],//结果对应文件
                sampleQuestionPhoto:[],//结果对应图片
            },
            rules:{
                whyNote : [
                    { required: true, message: this.M2('请填写原因！'), trigger:['change'] },
                ],
                desc : [
                    { required: true, message: this.M2('请填写审核说明！'), trigger:['change'] },
                ],
                sampleValidator : [
                    { required: true, message: this.M2('请选择样品确认员！'), trigger:['change'] }
                ],
                sampleConfirmationTime : [
                    { required: true, message: this.M2('请选择样品确认日期！'), trigger:['change'] }
                ],
                sampleConfirmationResult : [
                    { required: true, message: this.M2('请选择样品确认结果！'), trigger:['change'] }
                ],
                modificationResult : [
                    { required: true, message: this.M2('请选择审核结果！'), trigger:['change'] }
                ],
                reason : [
                    { required: true, message: this.M2('请填写修改原因！'), trigger:['change'] }
                ],
                resultFile : [
                      {
                        required: true,
                        validator: (rules, value, cb) => {
                            if(!this.resuletList || (this.resultFile && this.resultFile.length == 0)){
                                return cb(new Error(this.M2("请选择文件！")));
                            }
                            return cb();
                        },
                        trigger: "change"
                    }
                ],
            },
             setDisabled: {
                disabledDate(time) {
                    if(applicationTime){
                        return time.getTime() > Date.now() || time.getTime() <= new Date(applicationTime).getTime() - 8.64e7 ;  // 可选历史天、可选当前天、不可选未来天
                    }else {
                        return time.getTime() > Date.now()
                    }
                // return time.getTime() > Date.now() - 8.64e7;  // 可选历史天、不可选当前天、不可选未来天
                // return time.getTime() < Date.now() - 8.64e7;  // 不可选历史天、可选当前天、可选未来天
                // return time.getTime() < Date.now(); // 不可选历史天、不可选当前天、可选未来天
                },
            },
        }
    },
    computed:{
        action(){
            return `${process.env.VUE_APP_DEVSERVER}/productSample/saveProductSampleAttachment`
        },
    },
    mounted(){
       
    },
    methods:{
        openDialog(list,id) {
            if(id == 2) {
                getSampleValidatorList().then(res => {
                    this.roleList = res.data
                })
            }
            applicationTime = list.applicationTime ? this.$moment(list.applicationTime).format("YYYY-MM-DD")  : this.$moment(list[0].applicationTime).format("YYYY-MM-DD")  
            let ids =  list.map(res =>  res.id )
            this.$set(this.ruleForm,'whyNote',null)
            this.$set(this.ruleForm,'applicationTime',list.applicationTime ? list.applicationTime :  list[0].applicationTime)
            this.$set(this.ruleForm,'sampleValidator',list.sampleValidator ? list.sampleValidator :  list[0].sampleValidator)
            this.$set(this.ruleForm,'sampleConfirmationTime',list.sampleConfirmationTime ? list.sampleConfirmationTime :  list[0].sampleConfirmationTime)
            this.$set(this.ruleForm,'sampleConfirmationResult',list.sampleConfirmationResult ? list.sampleConfirmationResult :  list[0].sampleConfirmationResult)
            this.$set(this.ruleForm,'productSampleIds', ids)
             if(id == 5 || id == 6){
                let url = judgePorduction() ? 'http://productdev.yaheecloud.com/tool-api/common/getFilePath' : 'http://api-tools-test.yahee.com.cn:82/tool-api/common/getFilePath'
                getFilePath(url).then(res1 => {
                    this.imgUrl = res1.data
                    if(id == 6){
                        let param = {
                            productSampleId:ids.toString()
                        }
                        getApplyUpdateResult(param).then(res => {
                            if(res.data){
                                res.data.sampleAttachments.forEach(item => {
                                    item.showImgUrl = `${res1.data}/Small/${item.fileUri}`
                                    item.showBigImgUrl = `${res1.data}/${item.fileUri}`
                                })
                                res.data.resultFile = this.resultFile = res.data.sampleAttachments.filter(item => {
                                    return item.fileType == 12
                                })
                                this.resultFile.forEach(item => {
                                    item.name =  item.fileName
                                })
                                res.data.designConstructionFile = res.data.sampleAttachments.filter(item => {
                                    return item.fileType == 15
                                })
                                res.data.sampleQuestionPhoto = res.data.sampleAttachments.filter(item => {
                                    return item.fileType == 16
                                })
                                res.data.sampleQuestionPhoto.forEach(item => {
                                    item.name = item.fileName
                                    item.url = item.showBigImgUrl
                                })
                                this.ruleForm = res.data
                            }
                        })
                    }
                })
                if(id == 5){
                    this.$set(this.ruleForm,'resultFile',[])
                    this.$set(this,'resultFile',[])
                    this.$set(this.ruleForm,'designConstructionFile',[])
                    this.$set(this.ruleForm,'problemDesc',null)
                    this.$set(this.ruleForm,'sampleQuestionPhoto',[])
                    this.$set(this.ruleForm,'reason',null)
                }
            }
            this.id = id
            this.dialogVisible = true
            this.mainList = list  
        },
        closeSubmit(formName){
            //if(this.$refs[formName] && this.$refs[formName].resetFields())this.$refs[formName].resetFields()
            this.dialogVisible = false
            this.buttonLoading = false
        },
        onSubmit(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.buttonLoading = true
                    let statusF = null
                    if(this.id == 1) {
                        statusF = cancelApplication(this.ruleForm)
                    }else if(this.id == 2){
                        statusF = saveSampleValidator(this.ruleForm)
                    }else if(this.id == 3){
                        statusF = approvalSampleMemo(this.ruleForm)
                    }else if(this.id == 4){
                        statusF= repulse(this.ruleForm)
                    }else if(this.id == 5){
                        if(this.ruleForm.sampleConfirmationResult == 6 || this.ruleForm.sampleConfirmationResult == 7){
                            if(!this.ruleForm.problemDesc && this.ruleForm.sampleQuestionPhoto.length == 0 && this.ruleForm.designConstructionFile.length == 0){
                                 this.$message({
                                    type: 'error', 
                                    message:this.M2('请添加一个问题描述，文件或者图片！'),
                                    offset:220
                                })
                                this.buttonLoading = false
                                return
                            }
                        }
                        if(this.ruleForm.sampleConfirmationResult == 5 || this.ruleForm.sampleConfirmationResult == 6){
                            if(!this.resultFile || (this.resultFile && this.resultFile.length == 0)){
                                 this.$message({
                                    type: 'error', 
                                    message:this.M2('请添加初版验货报告！'),
                                    offset:220
                                })
                                this.buttonLoading = false
                                return
                            }
                           
                        }
                         if(!this.ruleForm.reason){
                                this.$message({
                                    type: 'error', 
                                    message:this.M2('请添加本次修改的原因！'),
                                    offset:220
                                })
                                this.buttonLoading = false
                                return
                            }
                        let param = {
                            "productSampleId":this.mainList.map(res =>  res.id ).toString(),//样品确认Id   列表 申请单号 
                            "sampleConfirmationResult": this.ruleForm.sampleConfirmationResult,//样品确认结果  5:合格  6：改进后通过(产前样)  7：不合格
                            "problemDesc":this.ruleForm.problemDesc,//样品确认文件-问题描述
                            "reason" : this.ruleForm.reason,//修改原因
                            sampleAttachments:this.resultFile.concat(this.ruleForm.sampleQuestionPhoto || [], this.ruleForm.designConstructionFile || [])
                        }
                        statusF= applyUpdateResult(param)
                    }else if(this.id == 6){
                        let param = {
                            "productSampleId":this.mainList.map(res =>  res.id ).toString(),//页面 申请单号 
                            "res":this.ruleForm.modificationResult,//审核结果   1：通过 、2 ：驳回
                            "desc":this.ruleForm.desc//审核说明
                        }
                        statusF= reviewApplyUpdateResult(param)
                    }
                    statusF.then((res) => {
                        this.buttonLoading = false
                        if(res.code == 200){
                            this.$message({
                                type: 'success', 
                                message:this.M2('保存成功'),
                                offset:220
                            })
                            this.$emit('mainListList')
                            this.dialogVisible = false
                        }
                    }).catch(() => {
                        this.buttonLoading = false
                    });
                } else {
                    console.log('error submit!!');
                    this.buttonLoading = false
                    return false;
                }
            });
        },
        upDateFile(list,name){
            this.$set(this.ruleForm,name,list)
            
        },
        clickFileName(url){
            window.open(`${this.imgUrl}${url}`)
        },
    }
}
</script>
<style lang="scss" scoped>
::v-deep.dialog-main{
    .el-dialog__header{
        border-bottom: 1px solid #ccc;
        padding: 10px !important;
        .el-dialog__title{
            font-weight: bold;
        }
    }
    .el-dialog__body{
        padding: 10px 20px 20px !important;
        overflow-y: auto;
        max-height: 650px;
    } 
    .image-flex {
        display: flex;
        flex-wrap: wrap;
        .el-image {
            margin: 5px;
            width: 100px;
            height: 100px;
            border: 1px solid #ccc;
        }
    }
}
</style>