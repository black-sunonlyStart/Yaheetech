<template>
    <div>
        <div style="width: 100%;" class="vue-draggable">
            <li
                v-for="(item, index) in imgFileList"
                :key="item.url"
                class="draggable-item"
                >
                <el-image :style="{ width: width + 'px', height: height + 'px' }" :initial-index="index" :src="item.url"  fit="contain">
                    <div slot="placeholder" class="image-slot icon-loading">
                        <i class="el-icon-loading" ></i>
                    </div>
                    <div slot="error" class="image-slot icon-loading" style="font-size:14px">
                        <i class="el-icon-picture-outline">加载失败</i>
                    </div>
                </el-image>
                <div class="shadow" >
                    <i class="el-icon-delete" @click="handleImageRemove(index,item)"></i>
                </div>
            </li>
            <div class="upload-cont">
                <el-upload 
                    :action="action"
                    ref="uploadRef"
                    v-model="imgFileList"
                    :show-file-list="false"
                    accept=".jpg,.jpeg,.png,.gif"
                    :on-remove="handleImageRemove"
                    :on-change="handleImageChange"
                    :before-upload="beforeAvatarUpload"
                    :limit="dialogForm.limit"
                    :on-exceed="onExceed"
                    :with-credentials="true"
                    :multiple="true"
                    :auto-upload="false">
                    <i class="el-icon-plus uploadIcon" :style="{ width: width + 'px', height: height + 'px' }">
                    <span class="uploading" v-show="imgLoading">正在上传...</span>
                    <span
                        v-if="dialogForm.limit && dialogForm.limit!==99 && !dialogForm.isSingle"
                        class="limitTxt"
                    >最多{{ dialogForm.limit }}张</span>
                    </i>
                </el-upload>
            </div>
        </div>
    </div>
</template>
<script>
import { saveProductSampleAttachment } from '@/api/user.js'
export default {
    name:'asyncCommonUploadImg',
    data(){
        return {
            imgLoading:false,
            fileList:[]
        }
    },
    props:{
        dialogForm:{
            type:Object,
            default(){
                return {
                    limit:10,
                }
            }
        },
        imgFileList:{
            type:Array,
            default () {
                return []
            }
        },
        width:{
            type:Number,
            default:120,
        },
        height:{
            type:Number,
            default:120,
        },
        imageURl:{
            type:String,
            default:'productSample/saveProductSampleAttachment',
        },
    },
    action(){
        return `${process.env.VUE_APP_DEVSERVER}/${this.imageURl}`
    },
    mounted(){
        // console.log(this.imgFileList,'imgFileList')
    },
    methods:{
        //删除图片
        handleImageRemove(index,list) {
            this.imgFileList.splice(index,1)
            if(list.aid && list.aid == 567){
                //删除新文件
                this.fileList.splice(this.fileList.findIndex(res => res.uid == list.file.uid),1)
                this.$emit('upDateFile',this.fileList)
            }else {
                //删除原文件
                let param = new FormData();
                param.append('fileType', 4);
                param.append('productSampleId', this.routeParam.id);
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }; 
                saveProductSampleAttachment(param,config).then(res => {
                    
                })
            }
        },
        //改变图片
        handleImageChange(file, fileList) {
            let upList = {
                file,
                aid:567
            }
            
            this.fileList.push(upList)
            this.$emit('upDateFile',this.fileList)
            let list = {
                url:URL.createObjectURL(file.raw),
                aid:567,
                file
            }
            this.imgFileList.push(list) 
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
        onExceed () {
            this.$refs.uploadRef.abort() // 取消剩余接口请求
            this.$message({
                type: 'warning',
                message: `图片超限，最多可上传${this.dialogForm.limit}张图片`,
                offset:220
            })
        },
    }
}
</script>
<style scoped lang="scss">
::v-deep.upload-cont.el-upload {
    width: 100%;
    height: 100%;
}
.uploadIcon {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fbfdff;
    border-radius: 6px;
    font-size: 40px;
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
.vue-draggable {
    display: flex;
    flex-wrap: wrap;
    padding-left: 10px;
}
.vue-draggable .draggable-item {
    margin-right: 5px;
    margin-bottom: 5px;
    border: 1px solid #ddd;
    border-radius: 6px;
    position: relative;
    overflow: hidden;
    list-style: none;
  }
.vue-draggable.el-image {
    width: 100%;
    height: 100%;
}
.vue-draggable .draggable-item .shadow {
    position: absolute;
    top: 0;
    right: 0;
    opacity: 0;
    transition: opacity .3s;
    background-color: rgba(0,0,0,.5);
    color: #fff;
    padding: 2px;
    cursor: pointer;
    height: 20px;
    width: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}
// .vue-draggable .draggable-item .shadow .el-icon-delete {
//     background-image: url('~@/assets/svg/delete.svg');
//     height: 20px;
//     width: 20px;
//     background-size: cover;
// }
// .vue-draggable .draggable-item .shadow:hover {
//     background-color: #fff;
//  }
//  .vue-draggable .draggable-item .shadow:hover .el-icon-delete {
//     background-image: url('~@/assets/svg/delete-blue.svg');
//     height: 20px;
//     width: 20px;
//     background-size: cover;
// }
 .vue-draggable.single {
    overflow: hidden;
    position: relative;
  }
.vue-draggable.draggable-item {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
}
.vue-draggable .draggable-item:hover .shadow {
	opacity: 1;

}
.vue-draggable.maxHidden .uploadBox {
    display: none;
}
.upload-cont {
    border: 1px dashed #ddd;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.upload-cont:hover {
	border:1px dashed #3366cc;
}
</style>