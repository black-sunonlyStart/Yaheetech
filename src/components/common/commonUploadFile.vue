
<template>
    <div class="mainBox">
    <div class="uploadWrapper">
        <el-upload
            ref="uploadRef"
            class="upload-demo"
            :action="action"
            :accept="accept"
            :on-success="uploadFileSuccess"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-preview="handlePreview"
            multiple
            :data="dataParams"
            :limit="limit"
            :with-credentials='true'
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">{{M2('点击上传')}}</el-button>
            <div slot="tip" class="el-upload__tip">
                <div>{{M2(`请上传${accept}类型的文件，最多上传${limit}个文件`)}}</div>
            </div>
        </el-upload>
        <!-- <div v-for="item in fileList" :key="item.id">
            {{item.fileName}}
            <el-progress :percentage="percentage" :color="customColors"></el-progress>
        </div> -->
    </div>
</div>
</template>

<script>
import {commonUploadFile} from '@/api/user.js'
import {createUniqueString} from '@/utils/tools'
export default {
  name: 'fileUpload',
  props: {
    // 图片数据(图片url组成的数组) 通过v-model传递
    value: {
        type: Array,
        default () {
            return []
        }
    },
    dataParams: {
        type: Object,
        default () {
            return {
         
            }
        }
    },
    // 限制上传的图片数量
    limit: {
        type: Number,
        default: 99
    },
    imageURl:{
        type:String,
        default:'productSample/saveProductSampleAttachment'
    },
    imgUrl:{
        type:String,
        default:''
    },
    accept:{
        type:String,
        default:'*'
    },
    //公共地址
    commonUrl:{
        type:String,
        default:''
    },
    //额外参数
    extraParams:{
        type:String,
        default:''
    },
    ruleName:{
        type:String,
        default:''
    }
},

data () {
    return {
        percentage: 20,
        customColors: [
            {color: '#f56c6c', percentage: 20},
            {color: '#e6a23c', percentage: 40},
            {color: '#5cb87a', percentage: 60},
            {color: '#1989fa', percentage: 80},
            {color: '#409eff', percentage: 100}
        ]
    }
},

computed: {
    action(){
        return `${process.env.VUE_APP_DEVSERVER}/${this.imageURl}`
    },
      // 图片数组数据
    fileList: {
        get () {
            return this.value
        },
        set (val) {
            return this.fileList
            // 同步v-model
        }
    },
},
watch: {
  
},
mounted () {
    
},
methods: {
      // 同步el-upload数据
    syncElUpload (val) {
        const fileList = val || this.fileList
        this.$refs.uploadRef.uploadFiles = fileList.map((v, i) => {
            return {
            id:v.id,
            name: 'pic' + i,
            url: v.url,
            status: 'success',
            uid: createUniqueString()
            }
        })
    },
    uploadFileSuccess(res,file, fileList){
        // 这里需要根据你自己的接口返回数据格式和层级来自行修改
        if (res.code == 200) {
            this.$message({
                type: 'success', 
                message:this.M2('上传成功'), 
                offset:220
            })
            if (this.value.length < 5) {
                fileList.forEach(item => {
                    let file = item.response ? item.response.data[0] : item
                    if(item.response){
                        file.name =  file.fileName
                        file.url =  `${this.imgUrl}/${file.fileUri}`
                        item.fileType = file.fileType
                        item.id = file.id
                        item.fileName = file.fileName
                        item.fileUri = file.fileUri
                        item.contentType = file.contentType
                    }
                })
                this.fileList.push(res.data[0])
                if(this.ruleName){
                    this.$emit('upDateFile',fileList,this.ruleName)
                }
              
            }else {
                this.handleExceed()
            }
        } else {
            this.$message({ type: 'error', message: res.msg })
        }
    },
    handleRemove(file, fileList){
        let file1 = file.response ? file.response.data[0] : file    
             
        let param = new FormData();
        //额外参数
        if(this.extraParams)param.append(this.extraParams, this.$route.query.id || null);
        
        if(!file1.id) return
        param.append('fileType', this.dataParams.fileType);
        param.append('datta', file1.id);
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }; 
        commonUploadFile(this.action,param,config).then(res => {
            if(res.code == 200){
                // this.mainPageList.sampleQuestionFile.push(res.data[0])
                this.fileList.splice(this.fileList.findIndex(item => item.id == file1.id),1)
                if(this.ruleName){
                    this.$emit('upDateFile',fileList,this.ruleName)
                }
            }
        })  
    },
    handlePreview(file) {
        //文件点击事件
        window.open(`${this.imgUrl}${file.fileUri}`)
    },
    beforeRemove(){
        return this.$confirm(this.M2(`确定移除这个文件吗？`),this.M2('提示'),{cancelButtonClass: 'btn-custom-cancel'});
    },
    handleExceed(files, fileList) { 
        this.$refs.uploadRef.abort() // 取消剩余接口请求
        this.$message({
            type: 'warning',
            message: this.M2(`文件超限，最多可上传5个文件`),
            offset:220
        })
    },
},
}
</script>

<style lang="scss" scoped>
::v-deep .el-upload {
    // width: 100%;
    height: 100%;
    text-align: left;
}
</style>

