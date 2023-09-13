<template>
    <el-dialog  
        :title="title" 
        :visible.sync="dialogFormVisible" 
        :modal-append-to-body="false"
        :close-on-click-modal='false'
        class="dialog-main"
        width="800px"
        top="100px"
        zIndex="3000"
        v-dialogDrag
    >
        <el-form class="edit-form" :model="form" :rules="rules" :inline-message="false" ref="form" :disabled="controlsEdit">
            <el-row>
                <el-col :span="10" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-form-item  prop="imgUrl" :label-width="formLabelWidth">
                        <template slot="label">
                            立项图片：
                        </template>
                        <el-upload
                            class="avatar-uploader"
                            :action="action"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                            :data="{fileType:117}"
                            :auto-upload='true'
                            :with-credentials='true'
                            title="点击上传图片"
                            >
                            <el-image 
                                v-if="imgUrl"
                                :src="imgUrl" 
                                class="avatar"  
                                v-loading='imgLoading'
                            >
                            </el-image>
                            <div v-else v-loading='imgLoading' class="loading-sty">
                                <i class="el-icon-plus avatar-uploader-icon" ></i>
                            </div>
                        </el-upload>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10" :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
                    <el-form-item  prop="classCategoryIdArray" :label-width="formLabelWidth" >
                        <template slot="label">
                                系列-类目：
                        </template>
                        <el-cascader
                            style="width:220px"
                             v-model="form.classCategoryIdArray"
                            :options="patentCountry"
                            size="mini"
                            separator='-'
                            :props="{ 
                                value:'seriesCategoryId',
                                label:'seriesCategoryName',
                                children:'classifyDefs'
                                }"
                            clearable
                           :disabled="controlsEditRadio" 
                            >
                        </el-cascader>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10" :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
                    <el-form-item  prop="title" :label-width="formLabelWidth" >
                        <template slot="label">
                            中文简称：
                        </template>
                        <el-input type="textarea" autosize v-model="form.title" maxlength="50" show-word-limit></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item  prop="design" :label-width="formLabelWidth" >
                        <template slot="label">
                            是否设计款：
                        </template>
                        <el-radio-group v-model="form.design"  @change="changeExpectSatrtTime" :disabled="controlsEditRadio" >
                            <el-radio  :label="1">是</el-radio>
                            <el-radio  :label="2">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="12" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item  :label-width="formLabelWidth" :rules="[{required:rowList && rowList.commitStatus  && rowList.commitStatus.some(item => item.state == 18 || item.state == 23),message:'请选择是否有供应商',trigger:'blur'}]">
                        <template slot="label">
                            供应商：
                        </template>
                        <el-radio-group v-model="form.supplierType" @change="changeExpectSatrtTime">
                            <el-radio  :label="0">已有</el-radio>
                            <el-radio  :label="1">全新</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item  prop="businessId" :label-width="formLabelWidth" >
                        <template slot="label">
                                业务开发：
                        </template>
                        <el-select v-model="form.businessId" value-key="code" placeholder="请选择" style="width:220px" class="project-select" size="mini" >
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
                <el-col :span="10" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item  :label-width="formLabelWidth" :rules="[{required:rowList && rowList.commitStatus  && rowList.commitStatus.some(item => item.state == 21 || item.state == 23),message:'请选择是否有供应商',trigger:'blur'}]">
                        <template slot="label">
                                采购开发：
                        </template>
                        <el-select v-model="form.buyerId" value-key="code" placeholder="请选择" style="width:220px" class="project-select" size="mini" >
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
                <el-col :span="10" :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
                    <el-form-item  prop="leader" :label-width="formLabelWidth" >
                        <template slot="label">
                                品类经理：
                        </template>
                        <el-select v-model="form.leader" value-key="code" placeholder="请选择" style="width:220px" class="project-select" size="mini" >
                            <el-option v-for="item in categoryManagerList" :key="item.leader" :label="item.leaderName" :value="item.leader"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item  prop="expectStartTime" :label-width="formLabelWidth" >
                        <template slot="label">
                            预计开始日期：
                        </template>
                        <el-date-picker
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            size="mini"
                            v-model="form.expectStartTime"
                            type="date"
                            @change="changeExpectSatrtTime"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item  prop="expectEndTime" :label-width="formLabelWidth" >
                        <template slot="label">
                            预计结束日期：
                        </template>
                        <el-date-picker
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            size="mini"
                            :disabled="true"
                            v-model="form.expectEndTime"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item  prop="supplier" :label-width="formLabelWidth" >
                        <template slot="label">
                                供应商名称：
                        </template>
                        <el-input  v-model="form.supplier" style="width:220px" size="mini"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10" :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
                    <el-form-item  prop="developmentId" :label-width="formLabelWidth" >
                        <template slot="label">
                                关联开发ID:
                        </template>
                        <el-input  v-model="form.developmentId" size="mini"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                    <span class="yes-icon" v-if="iconShowL.idY"></span><span class="no-icon" v-if="iconShowL.idN"></span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10" :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
                    <el-form-item  prop="skuAlias" :label-width="formLabelWidth" >
                        <template slot="label">
                                sku别名:
                        </template>
                        <el-input  v-model="form.skuAlias"  size="mini"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                    <span class="yes-icon" v-if="iconShowL.skuY"></span><span class="no-icon" v-if="iconShowL.skuN"></span>
                </el-col>
            </el-row>      
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center;">
            <el-button type="primary" @click="onSubmit('form')" size="mini" :loading="clickLoading" :disabled='clickLoading' v-if="!controlsEdit">保 存</el-button>
            <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
import {uploadFilesUrl,GetFileServiceUrl} from '@/utils/tools'
import { saveProgressDevelopment,selectRoleEmployeeForRoleId,getBigDepartmentLeaders,getExpectEndTime,getSeriesCategoryDef } from '@/api/user.js'
export default {
name:"createProductTaskDialog",
    data() {
        return {
        //   fileType:117,
            title: '新品开发任务',
            iconShowL:{
                idY:false,
                idN:false,
                skuY:false,
                skuN:false,
            },
            dailySales:[],
            targetPrice:[],
            categoryManagerList:[],
            dialogFormVisible: false,
            clickLoading:false,
            imgLoading:false,
            imgUrl:'',
            form: {
                id: null,//(编辑时)id
                pictureUri:null,//立项图片
                classCategoryIdArray:null,//产品系列
                title: null,//中文简称
                design:2,//是否设计款   1 设计款、 2 非设计款
                supplierType:0,//是否设计款   1 设计款、 2 非设计款
                businessId:null,//业务开发--接口获取 /productManage/selectRoleEmployeeForRoleId
                buyerId:null,//采购开发--接口获取 /productManage/selectRoleEmployeeForRoleId
                leader:null,//品类经理--接口获取 /getBigDepartmentLeaders
                expectStartTime:null,//预计开始时间 
                expectEndTime:null,//预计结束时间--接口获取  getExpectEndTime
                supplier:null,//供应商
                developmentId:null,//关联开发ID
                skuAlias:null,//sku别名
                imgUrl:null,
            },
            formLabelWidth: "120px",
            suppliers:[],
            rules:{
                imgUrl : [
                    { required: true, message:'请上传图片', trigger:['blur', 'change'] }
                ],
                classCategoryIdArray : [
                    { required: true, message:'请选择系列-类目', trigger:['blur', 'change'] }
                ],
                title : [
                    { required: true, message:'请填写中文简称', trigger:['blur', 'change'] }
                ],
                design : [
                    { required: true, message:'请选择设计款', trigger:['blur', 'change'] }
                ],
                businessId : [
                    { required: true, message:'请选择业务开发', trigger:['blur', 'change'] }
                ],
                leader : [
                    { required: true, message:'请选择品类经理', trigger:['blur', 'change'] }
                ],
                expectStartTime : [
                    { required: true, message:'请选择开始时间', trigger:['blur', 'change'] }
                ],
                expectEndTime : [
                    { required: true, message:'请选择结束时间', trigger:['blur', 'change'] }
                ],
            },
            patentCountry:[],  
            rowList:{},
            editableList:['30','50','51'],
            editableRadio:[1,2,3,4,5,],
            controlsEditRadio:false,
        };
    },
    created() {

    },
    props:{
        navFilterList:{
            type:Object,
            default:() => {}
        },
        employee:{
            type:Object,
            default:() => {}
        }
    },
    computed:{
        action(){
            return uploadFilesUrl()
        },
        controlsEdit(){  
            if(this.editableList.includes(this.rowList.state)) {
                return true
            }else {
                return false
            }
        },
    },
    methods: {
        openDialog(row,id){
            this.dialogFormVisible = true
            if(this.$refs['form']) this.$refs['form'].resetFields()
            if(id) {
                this.form = {
                    id: row.id,//(编辑时)id
                    imgUrl:row.pictureUri,//立项图片
                    categoryId:row.categoryId,//产品系列
                    title: row.title,//中文简称
                    design:row.design,//是否设计款   1 设计款、 2 非设计款
                    supplierType:row.supplierType,//是否设计款   1 设计款、 2 非设计款
                    businessId:row.businessId,//业务开发--接口获取 /productManage/selectRoleEmployeeForRoleId
                    buyerId:row.buyerId,//采购开发--接口获取 /productManage/selectRoleEmployeeForRoleId
                    leader:row.leader,//品类经理--接口获取 /getBigDepartmentLeaders
                    expectStartTime:row.expectStartTime,//预计开始时间 
                    expectEndTime:row.expectEndTime,//预计结束时间--接口获取  getExpectEndTime
                    supplier:row.supplier,//供应商
                    developmentId:row.developmentId,//关联开发ID
                    skuAlias:row.skuAlias,//sku别名
                    classCategoryIdArray:[row.seriesCategoryId,row.classifyDefId],
                    pictureUri:row.pictureUri,
                }
                this.imgUrl = GetFileServiceUrl(row.pictureUri) 
                this.rowList = row
                if(this.editableRadio.includes(row.pdStatuses[0].state)) {
                    this.controlsEditRadio = false
                }else {
                    this.controlsEditRadio = true 
                }

            }else {
                this.controlsEditRadio = false
                this.form = {}
                this.rowList = {}
                this.$set(this.form,'design',2)
                this.$set(this.form,'expectStartTime',this.$moment().format("YYYY-MM-DD"))
                this.imgUrl = '' 
                this.changeExpectSatrtTime()
            } 
            this.getTypeList()
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
            getBigDepartmentLeaders().then(response => {
                if(response.data){
                    this.categoryManagerList = response.data
                    response.data.forEach(item => {
                        if(item.leader == this.employee.Id) {
                            this.$set(this.form,'leader',item.leader)
                        }
                    })
                }
            });
            getSeriesCategoryDef().then(res => {
                res.data.forEach(item => {
                    item.classifyDefs.forEach(list => {
                        list.seriesCategoryName = list.classifyDefName
                        list.seriesCategoryId = list.classifyDefId
                    })
                })
                this.patentCountry = res.data
            })
        },
        changeExpectSatrtTime(val) {
            if(this.form.expectStartTime) {
                let param = {
                    expectStartTime :this.form.expectStartTime,
                    design:this.form.design,
                    supplierType:this.form.supplierType,
                }
                getExpectEndTime(param).then(res => {
                    this.$set(this.form,'expectEndTime',res.data)
                })
            } 
        },
        handleAvatarSuccess(res, file) {
            this.imgUrl =  GetFileServiceUrl(res.data[0])
            this.imgLoading = false
            this.$set(this.form,'imgUrl',res.data[0])
            this.form.pictureUri = res.data[0]
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type.includes('image');
            const isLt2M = file.size / 1024 / 1024 < 20;
            this.imgLoading = true
            if (!isJPG) {
                this.$message.error('上传类型只能是 图片!');
                this.imgLoading = false
            }
            if (!isLt2M) {
                this.$message({
                    type: 'error', 
                    message:'上传文件大小不能超过 20MB!',
                    offset:220
                })
            }
            return isJPG && isLt2M;
        },
        onSubmit(formName) {
            this.clickLoading = true
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = {
                        id: this.form.id,//(编辑时)id
                        pictureUri:this.form.pictureUri,//立项图片
                        categoryId: this.form.classCategoryIdArray[1],//产品系列

                        title:  this.form.title,//中文简称
                        design: this.form.design,//是否设计款   1 设计款、 2 非设计款
                        supplierType: this.form.supplierType,//是否设计款   1 设计款、 2 非设计款
                        businessId: this.form.businessId,//业务开发--接口获取 /productManage/selectRoleEmployeeForRoleId
                        buyerId: this.form.buyerId,//采购开发--接口获取 /productManage/selectRoleEmployeeForRoleId
                        leader: this.form.leader,//品类经理--接口获取 /getBigDepartmentLeaders
                        expectStartTime: this.form.expectStartTime,//预计开始时间 
                        expectEndTime: this.form.expectEndTime,//预计结束时间--接口获取  getExpectEndTime
                        supplier: this.form.supplier,//供应商
                        developmentId: this.form.developmentId,//关联开发ID
                        skuAlias: this.form.skuAlias,//sku别名
                        seriesCategoryId:  this.form.classCategoryIdArray[0],//类目系列
                        classifyDefId: this.form.classCategoryIdArray[1],
                    }
                    saveProgressDevelopment(params).then((res) => {
                        if(res.code == 200){
                            this.$message({
                                type: 'success', 
                                message:'保存成功',
                                offset:220
                            })
                            this.clickLoading = false
                            this.dialogFormVisible = false
                            this.$emit('mainListList',this.navFilterList)
                        }
                    }).catch(() => {
                        this.clickLoading = false         
                    });
                } else {
                    this.clickLoading = false
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        success() {
            this.$message({
                showClose: true,
                message: '操作成功',
                duration: 2000,
                type: 'success'
            });
        },
        warning(msg) {
            this.$message({
                showClose: true,
                message: msg,
                type: 'warning'
            });
        }
    }
};
</script>
<style scoped lang="scss">
    .loading-sty {

        width: 150px;
        height: 150px;
        display: block;
    }
    .edit-form .edit-form-item{
        display: none;
    }
   ::v-deep.avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        &:hover{
            border-color: #409EFF;
        }
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 150px;
        height: 150px;
        line-height: 150px;
        text-align: center;
    }
    .avatar {
        width: 150px;
        height: 150px;
        display: block;
    }
    ::v-deep.dialog-main{
        .el-dialog__header{
            border-bottom: 1px solid #ccc;
            padding: 10px 0 10px 20px;
            .el-dialog__title{
                font-weight: bold;
            }
    }
    .el-dialog__body{
        padding: 10px 20px 20px !important;
        overflow-y: auto;
        .el-form-item {
            margin-bottom: 10px;
            
        }
        .yes-icon {
            height: 20px;
            width: 20px;
            background-image: url(~@/assets/yes.png);
            cursor: pointer !important;
            display: inline-block;
            margin-top: 10px;
        }
        .no-icon {
            height: 20px;
            width: 20px;
            background-image: url(~@/assets/yno.png);
            cursor: pointer !important;
            display: inline-block;
            margin-top: 10px;
        }
    }
}
.el-form-item {
    margin-bottom: 10px;
}
</style>