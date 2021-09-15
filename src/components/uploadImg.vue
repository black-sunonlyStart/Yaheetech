
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
        :key="item + index"
        class="draggable-item"
        :style="{ width: width + 'px', height: height + 'px' }"
      >
        <el-image :src="item" :preview-src-list="[item]"></el-image>
        <div class="shadow" @click="onRemoveHandler(index)">
          <i class="el-icon-delete"></i>
        </div>
      </li>
      <!-- 上传按钮 -->
      <!-- <el-upload
        slot="footer"
        ref="uploadRef"
        class="uploadBox"
        :style="{ width: width + 'px', height: height + 'px' }"
        :auto-upload="false"
        :action="action"
        accept=".jpg,.jpeg,.png,.gif"
        :show-file-list="false"
        :before-upload="beforeUpload"
        :data="fileType"
        :on-change="handleChange"
        :http-request='httprequest' 
        :with-credentials="true"
      > -->
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
        :before-upload="beforeUpload"
        :on-success="onSuccessUpload"
        :on-exceed="onExceed"
        :data="fileType"
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
            <el-button type="primary"  size="mini" @click="saveImgList">保存</el-button>
            <el-button size="mini" @click="updeEditPage">取消</el-button>
        </div>
      </el-col> 
  </el-row>
   
</div>
</template>

<script>
import vuedraggable from 'vuedraggable'
// import { getToken } from '@/utils/auth' // 获取token，
import { validImgUpload } from '@/utils/validate'
import lrz from 'lrz' // 前端图片压缩插件
import tools from '@/utils/tools'
import {uploadFile} from '@/api/user.js'
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
    // 是否使用图片压缩
    useCompress: {
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
    imageKey:{
        type:Number,
        default:1
    }
  },

  data () {
    return {
        param:[],
    //   headers: { token: getToken() },
      isUploading: false, // 正在上传状态
      isFirstMount: true ,// 控制防止重复回显
      fileType:{
          fileType:102
      }

    }
  },

  computed: {
      action(){
          return `${process.env.VUE_APP_DEVSERVER}/productManage/uploadFile`
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
        this.$emit('inputImg', val,this.imageKey)
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
          this.syncElUpload()
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
    // submitUpload() {
    //     this.$refs.uploadRef.submit();
    // },
    handleChange(file, fileList) {
      this.fileList = fileList;
      console.log(fileList,'fileList')
      this.$refs.uploadRef.submit();
    },
    // 同步el-upload数据
    syncElUpload (val) {
      const imgList = val || this.imgList
      this.$refs.uploadRef.uploadFiles = imgList.map((v, i) => {
        return {
          name: 'pic' + i,
          url: v,
          status: 'success',
          uid: tools.createUniqueString()
        }
      })
      console.log(this.$refs.uploadRef.uploadFiles,'this.$refs.uploadRef.uploadFiles')
      this.isFirstMount = false
    },
    // 上传图片之前
    beforeUpload (file) {
      this.isFirstMount = false
    //   if (this.useCompress) {
    //     // 图片压缩
    //     return new Promise((resolve, reject) => {
    //       lrz(file, { width: 1920 }).then((rst) => {
    //         file = rst.file
    //       }).always(() => {
    //         if (validImgUpload(file, this.size)) {
    //           this.isUploading = true
    //           resolve()
    //         } else {
    //           reject(new Error())
    //         }
    //       })
    //     })
    //   } else {
    //     if (validImgUpload(file, this.size)) {
    //       this.isUploading = true
    //       return true
    //     } else {
    //       return false
    //     }
    //   }

    // this.imgname =  file.name;
    // const isLt2M = file.size / 1024 / 1024 < 2;
    //     if (!isLt2M) {
    // this.$message.error('上传图片大小不能超过 2MB!');
    // }
    // else{
        console.log(file);
        //创建临时的路径来展示图片
        // var windowURL = window.URL || window.webkitURL; 
        // this.imageUrl=windowURL.createObjectURL(file);
        this.param = new FormData();
        this.param.append('files', file);
        //下面append的东西就会到form表单数据的fields中；
        this.param.append('fileType', 102);
    // }
    // return false;

    },
    httprequest() {
        var that=this;
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }; 
        uploadFile(this.param, config).then(function(res) { 
            if(res.code == 200){ //本项目中判断接口返回code
                    that.$message.success("上传成功");
                    let showImgUrl = `${process.env.VUE_APP_IMAGE_API}/${this.$route.params.developmentid}/${res.data[0]}`
                    that.imgList.push(showImgUrl) 
                }else{
                    this.$message.error(res.data.invokeResultMessage);
                }
            }).catch((res) => { 
                this.$message.error('请稍候重试或联系管理员');
        })
    },

    // 上传完单张图片
    onSuccessUpload (res, file, fileList) {
      // 这里需要根据你自己的接口返回数据格式和层级来自行修改
      if (res) {
        if (this.imgList.length < this.limit) {
            this.imgList.push(res.files.file)
        }
      } else {
        this.syncElUpload()
        this.$message({ type: 'error', message: res.msg })
      }
      this.isUploading = false
    },
    // 移除单张图片
    onRemoveHandler (index) {
      this.$confirm('确定删除该图片?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.imgList = this.imgList.filter((v, i) => {
            return i !== index
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
        message: `图片超限，最多可上传${this.limit}张图片`
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
    }
  },

  components: { vuedraggable }
}
</script>

<style lang="scss" scoped>
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
// el-image
.el-image-viewer__wrapper {
  .el-image-viewer__mask {
    opacity: .8;
  }
  .el-icon-circle-close {
    color: #fff;
  }
}
</style>

