
<template>
    <div class="mainBox">
    <div class="uploadWrapper">
        <vuedraggable
            class="vue-draggable"
            :class="{ single: isSingle, maxHidden: isMaxHidden }"
            v-model="imgList"
            tag="ul"
            draggable=".draggable-item"
            @start="onDragStart"
            @end="onDragEnd"
        >
        <!-- 拖拽元素 -->
        <li
            v-for="(item, index) in imgList"
            :key="item.id"
            class="draggable-item"
            :style="{ width: width + 'px', height: height + 'px' }"
        >
            <el-image :src="item.showImgUrl" :preview-src-list="[item.showBigImgUrl]">
                <div slot="placeholder" class="image-slot icon-loading">
                    <i class="el-icon-loading" ></i>
                </div>
                <div slot="error" class="image-slot icon-loading" style="font-size:14px">
                    <i class="el-icon-picture-outline">加载失败</i>
                </div>
            </el-image>
            <div class="shadow" @click="onRemoveHandler(item,index)">
                <i class="el-icon-delete"></i>
            </div>
        </li>
        <el-upload
            slot="footer"
            ref="uploadRef"
            class="uploadBox"
            :style="{ width: width + 'px', height: height + 'px' }"
            :action="action"
            accept=".jpg,.jpeg,.png,.gif"
            :show-file-list="false"
            :multiple="!isSingle"
            :limit="limit"
            :on-success="onSuccessUpload"
            :on-exceed="onExceed"
            :data="dataParamsCom"
            :before-upload="beforeUpload"
            :with-credentials='true'
        >
            <i class="el-icon-plus uploadIcon">
            <span class="uploading" v-show="isUploading">正在上传...</span>
            <span
                v-if="!isUploading && limit && limit!==99 && !isSingle"
                class="limitTxt"
            >最多{{ limit }}张</span>
            </i>
        </el-upload>
        </vuedraggable>
    </div>
    <el-row v-if="showButton">
        <el-col :span="24">
            <div class="bottomButton">
                <el-button type="primary" size="mini" @click="saveImgList" perkey='ERP.Product.ProductDev.SalesManEdit'>保存</el-button>
                <el-button size="mini"  @click="updeEditPage">取消</el-button>
            </div>
        </el-col> 
    </el-row>  
</div>
</template>

<script>
import vuedraggable from 'vuedraggable'
import {createUniqueString} from '@/utils/tools'
import {saveProductSampleAttachment} from '@/api/user.js'
export default {
  name: 'ImgUpload',
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
                fileType:this.fileType,
                productSampleId:this.$route.query.id
            }
        }
    },
    // 限制上传的图片数量
    limit: {
        type: Number,
        default: 99
    },
    // 限制上传图片的文件大小(kb)
    size: {
        type: Number,
        default: 500
    },
    // 是否是单图上传(单图上传就是已传图片和上传按钮重叠)
    isSingle: {
        type: Boolean,
        default: false
    },
    // 图片显示的宽度(px)
    width: {
        type: Number,
        default: 100
    },
    // 图片显示的高度(px)
    height: {
        type: Number,
        default: 100
    },
    showButton:{
        type:Boolean,
        default:true
    },
    imageURl:{
        type:String,
        default:'productSample/saveProductSampleAttachment'
    },
    fileType:{
        type:Number,
        default:0
    },
    imgUrl:{
        type:String,
        default:''
    },
    ruleName:{
        type:String,
        default:''
    },
},

data () {
    return {
        param:[],
        //   headers: { token: getToken() },
        isUploading: false, // 正在上传状态
        isFirstMount: true ,// 控制防止重复回显
    }
},

computed: {
    dataParamsCom(){
        if(this.dataParams.fileType || this.dataParams.fileType == 0){
            return this.dataParams
        }else {
            return {
                fileType:this.fileType,
                productSampleId:this.$route.query.id
            }
       }
    },
    action(){
        return `${process.env.VUE_APP_DEVSERVER}/${this.imageURl}`
    },
    // 图片数组数据
    imgList: {
        get () {
            return this.value
        },
        set (val) {
            if (val.length < this.imgList.length) {
            // 判断是删除图片时同步el-upload数据
            this.syncElUpload(val)
            }
            // 同步v-model
            this.$emit('upDateFile',this.imgList,this.ruleName)
        }
    },
    // 控制达到最大限制时隐藏上传按钮
    isMaxHidden () {
        return this.imgList.length >= this.limit
    }
},
watch: {
    value: {
        handler (val) {
            if (this.isFirstMount && this.value.length > 0) {
                this.syncElUpload(val)
            }
        },
        deep: true
    },
},
mounted () {
    if (this.value.length > 0) {
        this.syncElUpload()
    }
},
methods: {
    handleChange(file, fileList) {
        this.fileList = fileList;
        this.$refs.uploadRef.submit();
    },
    // 同步el-upload数据
    syncElUpload (val) {
        const imgList = val || this.imgList
        this.$refs.uploadRef.uploadFiles = imgList.map((v, i) => {
            return {
            id:v.id,
            name: 'pic' + i,
            url: v.imageList,
            status: 'success',
            uid: createUniqueString()
            }
        })
        this.isFirstMount = false
    },
    // 上传图片之前
    beforeUpload (file) {
        this.isFirstMount = false
        this.isUploading = true
    },
    // 上传完单张图片
    onSuccessUpload (res, file, fileList) {
      // 这里需要根据你自己的接口返回数据格式和层级来自行修改
        if (res.code == 200) {
            this.$message({
                type: 'success', 
                message:'上传成功',
                offset:220
            })
        if (this.imgList.length < this.limit) {
            res.data[0].showImgUrl = `${this.imgUrl}/Small/${res.data[0].fileUri}`
            res.data[0].showBigImgUrl = `${this.imgUrl}/${res.data[0].fileUri}`
            this.imgList.push(res.data[0])
            console.log(this.imgList,'this.image')
            if(this.ruleName){
                this.$emit('upDateFile',this.imgList,this.ruleName)
            }
        }
      } else {
            this.syncElUpload()
            this.$message({ type: 'error', message: res.msg })
      }
        this.isUploading = false
    },
    // 移除单张图片
    onRemoveHandler (item,index) {
        this.$confirm('确定删除该图片?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            cancelButtonClass: 'btn-custom-cancel',
        })
        .then(() => {
            let param = new FormData();
            // param.append('productSampleId', this.$route.query.id || null);
            param.append('fileType', this.fileType);
            param.append('datta', item.id);
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }; 
            saveProductSampleAttachment(param,this.imageURl).then(res => {
                if(res.code == 200){
                    this.value.splice(index,1)
                    this.$emit('upDateFile',this.imgList,this.ruleName)
                }
            })
        })
        .catch(() => {})
    },
    // 超限
    onExceed () {
        this.$refs.uploadRef.abort() // 取消剩余接口请求
        this.syncElUpload()
        this.$message({
            type: 'warning',
            message: `图片超限，最多可上传${this.limit}张图片`,
            offset:220
        })
    },
    onDragStart (e) {
        e.target.classList.add('hideShadow')
    },
    onDragEnd (e) {
        e.target.classList.remove('hideShadow')
    },
    updeEditPage(){
        this.$emit('closeEdit','false')
    },
    saveImgList(){
        this.$emit('inputImg', this.imgList)
        this.$emit('closeEdit','false')
    }
},
  components: { vuedraggable }
}
</script>

<style lang="scss" scoped>
.icon-loading {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size:25px
}
.bottomButton{
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: flex-end;
}
::v-deep .el-upload {
    width: 100%;
    height: 100%;
}

// 上传按钮
.uploadIcon {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed #c0ccda;
    background-color: #fbfdff;
    border-radius: 6px;
    font-size: 20px;
    color: #999;
.limitTxt,
    .uploading {
        position: absolute;
        bottom: 10%;
        left: 0;
        width: 100%;
        font-size: 14px;
        text-align: center;
    }
}
// 拖拽
.vue-draggable {
    display: flex;
    flex-wrap: wrap;
    padding-left: 10px;
.draggable-item {
    margin-right: 5px;
    margin-bottom: 5px;
    border: 1px solid #ddd;
    border-radius: 6px;
    position: relative;
    overflow: hidden;
    .el-image {
      width: 100%;
      height: 100%;
    }
    .shadow {
        position: absolute;
        top: 0;
        right: 0;
        background-color: rgba(0,0,0,.5);
        opacity: 0;
        transition: opacity .3s;
        color: #fff;
        font-size: 20px;
        line-height: 20px;
        padding: 2px;
        cursor: pointer;
    }
    &:hover {
        .shadow {
            opacity: 1;
        }
    }
}
&.hideShadow {
    .shadow {
        display: none;
    }
}
&.single {
    overflow: hidden;
    position: relative;
    .draggable-item {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
    }
}
&.maxHidden {
        .uploadBox {
            display: none;
        }
    }
}
.el-image-viewer__wrapper {
    .el-image-viewer__mask {
        opacity: .8;
    }
    .el-icon-circle-close {
        color: #fff;
    }
}
</style>

