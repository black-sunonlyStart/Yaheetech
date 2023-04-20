<template>
    <el-dialog  
        :title="title" 
        :visible.sync="dialogFormVisible" 
        :modal-append-to-body="false"
        :close-on-click-modal='false'
        class="dialog-main"
        width="800px"
        top="100px"
    >
        <el-form class="edit-form" :model="form" :rules="rules" :inline-message="false" ref="form">
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
                    <el-form-item  prop="country" :label-width="formLabelWidth" >
                        <template slot="label">
                                产品系列：
                        </template>
                        <el-select v-model="form.country" value-key="code" placeholder="请选择" style="width:220px" class="project-select" size="mini" >
                            <el-option v-for="item in patentCountry" :key="item.key" :label="item.value" :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10" :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
                    <el-form-item  prop="productUrl" :label-width="formLabelWidth" >
                        <template slot="label">
                            中文简称：
                        </template>
                        <el-input type="textarea" autosize v-model="form.jpsize" maxlength="50" show-word-limit></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item  prop="productUrl" :label-width="formLabelWidth" >
                        <template slot="label">
                            是否设计款：
                        </template>
                        <el-radio-group v-model="form.categorySeries">
                            <el-radio  :label="1">是</el-radio>
                            <el-radio  :label="2">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item  prop="country" :label-width="formLabelWidth" >
                        <template slot="label">
                                业务开发：
                        </template>
                        <el-select v-model="form.country" value-key="code" placeholder="请选择" style="width:220px" class="project-select" size="mini" >
                            <el-option v-for="item in patentCountry" :key="item.key" :label="item.value" :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item  prop="country" :label-width="formLabelWidth">
                        <template slot="label">
                                采购开发：
                        </template>
                        <el-select v-model="form.country" value-key="code" placeholder="请选择" style="width:220px" class="project-select" size="mini" >
                            <el-option v-for="item in patentCountry" :key="item.key" :label="item.value" :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10" :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
                    <el-form-item  prop="country" :label-width="formLabelWidth" >
                        <template slot="label">
                                品类经理：
                        </template>
                        <el-select v-model="form.country" value-key="code" placeholder="请选择" style="width:220px" class="project-select" size="mini" >
                            <el-option v-for="item in patentCountry" :key="item.key" :label="item.value" :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item  prop="checkDate" :label-width="formLabelWidth" >
                        <template slot="label">
                            预计开始日期：
                        </template>
                        <el-date-picker
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            size="mini"
                            v-model="form.checkDate"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item  prop="checkDate" :label-width="formLabelWidth" >
                        <template slot="label">
                            预计结束日期：
                        </template>
                        <el-date-picker
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            size="mini"
                            v-model="form.checkDate"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item  prop="productUrl" :label-width="formLabelWidth" >
                        <template slot="label">
                                供应商名称：
                        </template>
                        <el-input  v-model="form.productUrl" style="width:220px" size="mini"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10" :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
                    <el-form-item  prop="productUrl" :label-width="formLabelWidth" >
                        <template slot="label">
                                关联开发ID:
                        </template>
                        <el-input  v-model="form.productUrl" size="mini"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                    <span class="yes-icon" v-if="iconShowL.idY"></span><span class="no-icon" v-if="iconShowL.idN"></span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10" :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
                    <el-form-item  prop="productUrl" :label-width="formLabelWidth" >
                        <template slot="label">
                                sku别名:
                        </template>
                        <el-input  v-model="form.productUrl"  size="mini"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                    <span class="yes-icon" v-if="iconShowL.skuY"></span><span class="no-icon" v-if="iconShowL.skuN"></span>
                </el-col>
            </el-row>      
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center;">
            <el-button type="primary" @click="onSubmit('form')" size="mini" :loading="clickLoading" :disabled='clickLoading'>保 存</el-button>
            <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
import {uploadFilesUrl} from '@/utils/tools'
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
        dialogFormVisible: false,
        clickLoading:false,
        imgLoading:false,
        imgUrl:'',
        form: {
            country: '',
            productUrl: '',
            checkDate: '',
            reply: '',
            note: '',
            imgUrl:''
        },
        formLabelWidth: "100px",
        suppliers:[],
        rules:{
            imgUrl : [
                { required: true, message:'请上传图片', trigger:['blur', 'change'] }
            ],
            country : [
                { required: true, message:'请选择查询国家', trigger:['blur', 'change'] }
            ],
        },
        patentCountry:[],
        legalType:[
            {
                key:1,
                name:'可以开发-低风险'
            },
            {
                key:2,
                name:'可以开发-中风险'
            },
            {
                key:3,
                name:'产品改进'
            },
            {
                key:4,
                name:'不可开发'
            },
        ],   
    };
},
created() {

},
computed:{
    action(){
        return uploadFilesUrl()
    },
},
methods: {
    openDialog(){
        this.dialogFormVisible = true
    },
    handleAvatarSuccess(res, file) {
        this.imgUrl = URL.createObjectURL(file.raw);
        this.form.imgUrl = res.data[0]
        this.imgLoading = false
    },
    beforeAvatarUpload(file) {
        const isJPG = file.type.includes('image');
        this.imgLoading = true
        if (!isJPG) {
            this.$message.error('上传类型只能是 图片!');
            this.imgLoading = false
        }
        return isJPG ;
    },
    onSubmit(formName) {
        this.clickLoading = true
        this.$refs[formName].validate((valid) => {
            if (valid) {
                let params = {
                    id: this.id,//新增时不用传
                    imgUrl:this.form.imgUrl,
                    country: this.form.country,
                    productUrl: this.form.productUrl,
                    checkDate: this.form.checkDate,
                    reply: this.form.reply,
                    note: this.form.note,
                }

                savePatentCheck(params).then((res) => {
                    if(res.code == 200){
                        this.$message({
                            type: 'success', 
                            message:'保存成功',
                            offset:220
                        })
                        this.clickLoading = false
                       this.dialogFormVisible = false
                       this.$emit('mainListList')
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
        padding: 10px !important;
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