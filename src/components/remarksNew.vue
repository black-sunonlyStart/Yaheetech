<template>
    <div class="remarkContent">
        <div style="float:right;padding:5px;">
             <el-form ref="form"
                :model="form"
                label-width="150px"
                >
                 <el-date-picker 
                    v-model="form.timeValue2"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    size='mini'
                    v-track="{triggerType:'blur',currentUrl: $route.path,behavior:'备注日期查询',InputContext:form.timeValue2,}"
                    >
                </el-date-picker>
                <el-select v-model="form.CreatedBy"
                       size='mini'
                       class="timeBox"  
                       placeholder="选择创建人"      
                       >
                    <el-option v-for="item in dataOptions"
                                :key="item.CreatedBy"
                                :label="item.CreatedName"
                                :value="item.CreatedBy"
                                v-track="{triggerType:'click',currentUrl: $route.path,behavior:'备注选择创建人',businessCode: item.label}"   
                                >
                    </el-option>
                </el-select>
                <el-input placeholder="综合搜索"
                        v-model.trim="putSearch"
                        size='mini'
                        class="input-with-select"
                        clearable
                        @change="searchSomething"
                        @keyup.enter.native="searchSomething"
                        v-track="{triggerType:'blur',currentUrl: $route.path,behavior:'备注综合搜索输入框',InputContext:putSearch}"
                        >
                </el-input>
                <el-button 
                    type="primary" 
                    size="mini" 
                    @click="searchSomething"
                    v-track="{triggerType:'click',currentUrl: $route.path,behavior:'备注综合搜索按钮'}"
                    >搜索</el-button>
                    <el-button 
                        type="primary" 
                        size="mini" 
                        @click="searchAllSomething"
                        v-if="putSearch || form.timeValue2 || form.CreatedBy || form.almorlist ||paramData.showAllbutton"
                        v-track="{triggerType:'click',currentUrl: $route.path,behavior:'备注搜索全部按钮'}"
                    >搜索全部</el-button>
                    <el-button 
                        type="primary" 
                        size="mini" 
                        @click="searchMainSomething"
                        v-track="{triggerType:'click',currentUrl: $route.path,behavior:'备注审核节点备注按钮'}"
                        v-if="remarksParam.mainBtn"
                    >审核节点备注</el-button>
             </el-form>
        </div>
        <div class="infinite-list-wrapper">
            <div
                class="list"
                v-infinite-scroll="load"
                infinite-scroll-disabled="disabled"
                infinite-scroll-distance="10"
                >
                <div v-for="(item) in dataList.List" class="span-backG" :key="item.id">
                    <!-- 添加一个if判断当前人在左侧，其他在右侧 -->
                    <div v-if="dataList.LoginId == item.CreatedBy" class="content-main">
                        <div class="r-text">
                            <div class="r-text-main">
                                <strong>{{item.Title}}</strong>
                                  <!-- <div class="text-m" :ref="'Notes' + index">{{showImage(item.Notes,index)}}</div> -->
                                <div  v-if="item.Notes.includes('{{Img}}')">
                                    <!-- <img :src="showImage(item.Notes)" alt="" onerror="../assets/errorimg.png" style="width:220px" @click="openBlankImg(item.Notes)"> -->
                                    <el-image :src="showImage(item.Notes)" @click="openBlankImg(item.Notes)" style="width:220px;cursor:pointer">
                                        <div slot="error" class="image-slot">
                                            <img src="../assets/errorimg.png" alt="">
                                        </div>
                                        <div slot="placeholder" class="image-slot icon-loading">
                                            <i class="el-icon-loading" ></i>
                                        </div>
                                        <div slot="error" class="image-slot icon-loading" style="font-size:14px">
                                            <i class="el-icon-picture-outline">暂无图片</i>
                                        </div>
                                    </el-image>
                                </div>
                                <div v-else-if="item.Notes.includes('{{Word}}')">
                                     <div @click="uploadFilers(item.Notes)"  class="bg-link">
                                        <img src="../assets/file-word.png" @click="uploadFilers(item.Notes)" style="cursor:pointer">
                                        <div>
                                            {{showFilesName(item.Notes)}}
                                        </div>
                                    </div>
                                </div>
                                <div v-else-if="item.Notes.includes('{{PDF}}')">
                                    <div @click="uploadFilers(item.Notes)"  class="bg-link">
                                        <img src="../assets/pdf.png" @click="uploadFilers(item.Notes)" style="cursor:pointer">
                                        <div>
                                            {{showFilesName(item.Notes)}}
                                        </div>
                                    </div>
                                </div>
                                 <div v-else-if="item.Notes.includes('{{PPT}}')" style="cursor:pointer">
                                        <div @click="uploadFilers(item.Notes)"  class="bg-link">
                                            <img src="../assets/ppt.png" >
                                            <div>
                                                {{showFilesName(item.Notes)}}
                                            </div>
                                        </div>
                                    </div>
                                <div v-else-if="item.Notes.includes('{{Excel}}')">
                                    <div @click="uploadFilers(item.Notes)"  class="bg-link">
                                        <img src="../assets/excel.png" @click="uploadFilers(item.Notes)" style="cursor:pointer">
                                        <div>
                                            {{showFilesName(item.Notes)}}
                                        </div>
                                    </div>
                                </div>
                                <div style="color:#3366cc;cursor:pointer" v-else-if="item.Notes.includes('{{Other}}')">
                                    <div @click="uploadFilers(item.Notes)"  class="bg-link">
                                        <i class="el-icon-document" style="font-size:48px" @click="uploadFilers(item.Notes)"></i>
                                        <div>
                                            {{showFilesName(item.Notes)}}
                                        </div>
                                    </div>
                                </div>
                                <div v-else>
                                    {{item.Notes}}
                                </div>
                            </div>
                            <div class="rt-created-time">{{item.CreatedOnStr}}</div>
                        </div>
                        <div class="bubble-tail"></div>
                        <div class="r-name">{{item.CreatedName}}</div>
                    </div>
                    <div v-else class="content-main">
                        <div class="l-name">{{item.CreatedName}}</div>
                        <div class="l-text">
                            <div class="l-text-main">
                                <strong>{{item.Title}}</strong>
                                <div class="text-m" >
                                    <!-- <div class="text-m" :ref="'Notes' + index">{{showImage(item.Notes,index)}}</div> -->
                                    <div v-if="item.Notes.includes('{{Img}}')">
                                        <!-- <img  alt=""  onerror="../assets/errorimg.png" > -->
                                        <el-image :src="showImage(item.Notes)" @click="openBlankImg(item.Notes)" style="width:220px;cursor:pointer">
                                            <div slot="error" class="image-slot">
                                                <img src="../assets/errorimg.png" alt="">
                                            </div>
                                            <div slot="placeholder" class="image-slot icon-loading">
                                                <i class="el-icon-loading" ></i>
                                            </div>
                                            <div slot="error" class="image-slot icon-loading" style="font-size:14px">
                                                <i class="el-icon-picture-outline">暂无图片</i>
                                            </div>
                                        </el-image>
                                    </div>
                                     <div v-else-if="item.Notes.includes('{{Word}}')" style="cursor:pointer">
                                        <div @click="uploadFilers(item.Notes)"  class="bg-link">
                                            <img src="../assets/file-word.png">
                                            <div>
                                                {{showFilesName(item.Notes)}}
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else-if="item.Notes.includes('{{PDF}}')" style="cursor:pointer">
                                        <div @click="uploadFilers(item.Notes)"  class="bg-link">
                                            <img src="../assets/pdf.png" >
                                            <div>
                                                {{showFilesName(item.Notes)}}
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div v-else-if="item.Notes.includes('{{PPT}}')" style="cursor:pointer">
                                        <div @click="uploadFilers(item.Notes)"  class="bg-link">
                                            <img src="../assets/ppt.png" >
                                            <div>
                                                {{showFilesName(item.Notes)}}
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else-if="item.Notes.includes('{{Excel}}')" style="cursor:pointer">
                                         <div @click="uploadFilers(item.Notes)"  class="bg-link">
                                            <img src="../assets/excel.png">
                                            <div>
                                                {{showFilesName(item.Notes)}}
                                            </div>
                                        </div>
                                    </div>
                                    <div style="color:#3366cc;cursor:pointer" v-else-if="item.Notes.includes('{{Other}}')">
                                         <div @click="uploadFilers(item.Notes)" class="bg-link">
                                            <i class="el-icon-document" style="font-size:48px"></i>
                                            <div>
                                                {{showFilesName(item.Notes)}}
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else>
                                        {{item.Notes}}
                                    </div>
                                </div>
                            </div>
                            <div class="lt-created-time">{{item.CreatedOnStr}}</div>
                        </div>
                        <div class="leftbubble-tail"></div>
                    </div> 
                </div>
                <p v-if="loading" class="loading-t">加载中...</p>
                <p v-if="noMore" class="nomore-text">没有更多了！</p>
            </div> 
        </div>
        <textarea class="content-div" v-model="textareaText" ref="contentDiv" placeholder="可通过 Ctrl+V 直接上传图片/文件" contenteditable='true'></textarea>
        <div class="buttonQuill">
            <el-upload
                class="upload-demo"
                :action="action"
                :show-file-list="false"
                :data="fileType"
                :auto-upload='true'
                :with-credentials='true'
                :on-success='successUploadFile'	
                :before-upload="beforeUpload"
                :multiple="true"
                :disabled="canUnpload"
                ref="uploadRef"
                :on-error="errorUploadFile"
            >
                <el-button size="mini" :loading="canUnpload" :disabled="canUnpload">上传文件</el-button>
            </el-upload>
            <el-button  type="success" size="mini" @click="sendEditQuill()">添加备注</el-button>
        </div>  
        <el-dialog
            title="上传预览"
            :visible.sync="dialogVisible"
            width="60%"
             z-index="1000"
            >
            <div class="imgBox"
                v-loading="dialogLoading"
            >
                <div v-for="(item,index) in imgList" :key="index" style="margin-right:10px;margin-bottom:10px;width:100%">
                    <div v-if="item.imgUrl.includes('{{Img}}')" style="display:flex;flex-wrap:wrap;width: 100%;justify-content: center;">
                        <img :src="showImage(item.imgUrl)"  alt="" style="height:200px;margin-bottom:10px;max-width:1100px;display:flex;flex-wrap:wrap;border:1px solid #ccc;cursor:pointer">
                    </div>
                    
                    <div v-else class="bg-link">
                        {{showFiles(item.filesName)}}
                    </div>
                </div>
            </div>
            
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeUploadDialog()" size="mini">取 消</el-button>
                <el-button type="primary" @click="sendDialogImg()" size="mini">确 定</el-button>
            </span>
            </el-dialog>
    </div>

</template>

<script>
import {getLogMessage,sendLogMessage,GetGlobalNotesUsers,GetFileServiceUrl} from '@/utils/tools'
import { commonUploadFile } from '@/api/user.js'
  export default {
      components: {
        },
    data () {
      return {
        dialogLoading:true,
        canUnpload:false,
        textareaText:'',
        imgList:[],
        dialogVisible:false,
        form:{
            StartOn:'',
            EndOn:'',
            UserIds:'',
            Notes:'',
        },
        putSearch:'',
        fileType:{},
        count: 10,
        loading: false,
        drawer: false,
        direction: 'ltr',
        paramData:{},
        dataList:{
            List:[]
        },
        dataOptions:{},
        pickerOptions: {
        shortcuts: [
          {
            text: '最近三天',
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近十五天',
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 15);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }]
      },
        moreData:false
      }
    },
     props:{
        remarksParam: {
            type: Object,
            default:() => ({})
        },
    },
    watch:{
      form:{
          handler:function(val){
              if(val){
                  this.paramData = {
                       developmentId:this.remarksParam.developmentId,
                       productCountryId:this.remarksParam.productCountryId,
                       noteBussinessName:this.remarksParam.noteBussinessName,
                       PageIndex:0,
                       StartOn:val.timeValue2 ? val.timeValue2[0] : '',
                       EndOn:val.timeValue2 ? val.timeValue2[1] : '',
                       UserIds:val.CreatedBy ? [val.CreatedBy] : [],
                       Notes:val.search,
                       Mark:val.Check
                  }
                 getLogMessage(this.paramData,this,true)
              }
          },
          deep:true
      }
    },
    computed: {
      noMore () {
        return this.moreData
      },
      disabled () {
        return this.loading || this.noMore
      },
      action(){
          return `${process.env.VUE_APP_DEVSERVER}/productManage/uploadFile`
      },
    },
    mounted(){
      this.fileType = {
          fileType:115,
      }
      this.addElementListion(this.remarksParam,this)
      this.openHandle()
    },
    methods: {
        errorUploadFile(err){
            this.canUnpload = false
             this.$message({
                        type: 'error', 
                        message:'文件上传失败！',
                        offset:220
                    })
        },
        beforeUpload(file){
            const isLt2M = file.size / 1024 / 1024 < 100;
            this.canUnpload = true
            if (!isLt2M) {
                this.$message({
                        type: 'error', 
                        message:'上传文件大小不能超过 100MB!',
                        offset:220
                    })
                this.canUnpload = false
            }
            return  isLt2M;  
        },
        openBlankImg(notes){
            window.open(notes.split('{{Img}}')[1],'_blank')
        },
        uploadFilers(notes){
            let fileuri =''
            if(notes.includes('{{Word}}')) {
                fileuri = notes.split('{{Word}}')[1].split('{{Name}}')[0]
            }else if(notes.includes('{{Excel}}')) {
                fileuri = notes.split('{{Excel}}')[1].split('{{Name}}')[0]
            }else if(notes.includes('{{PDF}}')) {
                fileuri = notes.split('{{PDF}}')[1].split('{{Name}}')[0]
            }else if(notes.includes('{{PPT}}')) {
                fileuri = notes.split('{{PPT}}')[1].split('{{Name}}')[0]
            }else if(notes.includes('{{Other}}')) {
                fileuri = notes.split('{{Other}}')[1].split('{{Name}}')[0]
            } 
            window.open(fileuri)
        },
        showFilesName(notes){
             let fileuri =''
            if(notes.includes('{{Word}}')) {
                fileuri = notes.split('{{Word}}')[1].split('{{Name}}')[1]
            }else if(notes.includes('{{Excel}}')) {
                fileuri = notes.split('{{Excel}}')[1].split('{{Name}}')[1]
            }else if(notes.includes('{{PDF}}')) {
                fileuri = notes.split('{{PDF}}')[1].split('{{Name}}')[1]
            }else if(notes.includes('{{PPT}}')) {
                fileuri = notes.split('{{PPT}}')[1].split('{{Name}}')[1]
            }else if(notes.includes('{{Other}}')) {
                fileuri = notes.split('{{Other}}')[1].split('{{Name}}')[1]
            } 
           return fileuri
        },
        showImage(notes,index){
            let notes1 = ''
            if(notes.includes('{{Img}}')){
                notes1 =  notes.split('{{Img}}')[1]
            }else if(notes.includes('{{Word}}')) {
                notes1 = notes.split('{{Word}}')[2]
            }else if(notes.includes('{{Excel}}')) {
                notes1 = notes.split('{{Excel}}')[2]
            }else if(notes.includes('{{PDF}}')) {
                notes1 = notes.split('{{PDF}}')[2]
            }else if(notes.includes('{{PPT}}')) {
                notes1 = notes.split('{{PPT}}')[2]
            }else if(notes.includes('{{Other}}')) {
                notes1 = notes.split('{{Other}}')[2]
            } 
            return notes1
        },
        showFiles(notes){
            let notes1 = ''
             notes1 = notes.split('{{Name}}')[1]
             return notes1
        },
        changeImgUrlParams(item,res){
            if(item.type.includes('image')){
                return {
                    imgUrl:`{{Img}}${GetFileServiceUrl(res)}`,
                }
            }else if((item.name.includes('.xlsx') || item.name.includes('.xls')) && item.type.includes('application')){
                return {
                    imgUrl:`{{Excel}}${GetFileServiceUrl(res)}`,
                    filesName:`{{Name}}${item.name}`,
                }
            }else if((item.name.includes('.doc') || item.name.includes('.doc')) && item.type.includes('application')){
                return {
                    imgUrl:`{{Word}}${GetFileServiceUrl(res)}`,
                    filesName:`{{Name}}${item.name}`,
                }
            }else if((item.name.includes('.pdf'))){
                return {
                    imgUrl:`{{PDF}}${GetFileServiceUrl(res)}`,
                    filesName:`{{Name}}${item.name}`,
                }
            }else if(((item.name.includes('.ppt') || item.name.includes('.pptx')) && item.type.includes('application'))) {
                return {
                    imgUrl:`{{PPT}}${GetFileServiceUrl(res)}`,
                    filesName:`{{Name}}${item.name}`,
                }
            } else {
                return {
                    imgUrl:`{{Other}}${GetFileServiceUrl(res)}`,
                    filesName:`{{Name}}${item.name}`,
                }
            } 
        },
        openDialog(){
            this.dialogLoading = true
            this.dialogVisible = true
            this.canUnpload = true
        },
        closeUploadDialog(){
            this.dialogLoading = true
            this.dialogVisible = false
            this.canUnpload = false
        },
        sendDialogImg(){
            this.imgList.forEach(item => {
                this.paramData.PageIndex = 0
                if(item.filesName){
                     this.paramData.notes = `${item.imgUrl}${item.filesName}`
                }else {
                     this.paramData.notes = `${item.imgUrl}`
                }
               
                sendLogMessage(this.paramData,this)
                this.dialogVisible = false
                this.canUnpload = false
            })
        },
        
        successUploadFile(response,file,fileList){
            if(response.data){
                let notes = ''
                file.type = 
                notes =  this.changeImgUrlParams(file.raw,response.data[0])
                this.paramData.PageIndex = 0
                if(notes.filesName){
                    this.paramData.notes = notes.imgUrl+notes.filesName
                }else {
                     this.paramData.notes = notes.imgUrl
                }
                
                this.canUnpload = false
                sendLogMessage(this.paramData,this)
            }
        },
        searchSomething(){
            this.$set(this.form,'search',this.putSearch)
            this.$set(this.form,'almorlist',Math.random())
        },
        searchAllSomething(){
             this.form={
                timeValue2:[],
                CreatedBy:'',
                Notes:'',
                Check:null,
                almorlist:'',
            }
            this.putSearch = ''
        },
        searchMainSomething(){
            this.$set(this.form,'Check','Check')
            this.$set(this.form,'almorlist',Math.random())
        },
        load () {
            this.loading = true
            if (this.paramData.PageIndex == null) this.paramData.PageIndex = -1
            this.paramData.PageIndex += 1
            getLogMessage(this.paramData,this)
        },
        openHandle(){
            this.paramData = this.remarksParam
            this.load()
            GetGlobalNotesUsers(this.paramData,this)
        },
        sendEditQuill(){
            if(!this.textareaText){
                this.$message({
                        type: 'error', 
                        message:'备注不能为空！',
                        offset:220
                    })
                return
            }
            this.paramData.PageIndex = 0
            this.paramData.notes = this.textareaText
            // let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i
            // let notes = this.$refs.contentDiv.innerHTML.replace(/<img.*?(?:>|\/>)/gi,function(res,index){
            //     if(res){
            //         return '{{Img}}' + res.match(srcReg)[1]
            //     }
            // })
            // this.paramData.notes = notes
            this.textareaText = ''
            sendLogMessage(this.paramData,this)
        },
         addElementListion(remarksParam,that){
            this.$refs.contentDiv.addEventListener('paste', function (e) {//拦截粘贴事件
                if (e.clipboardData || e.originalEvent) {
                    that.imgList = []
                    if (e.clipboardData.items.length == 0)  {
                         that.$message({
                                type: 'error', 
                                message:'复制文件到剪切板失败，请点击按钮上传！',
                                offset:220
                            })
                        return 
                    }
                    if(e.clipboardData.files.length>0){
                        that.openDialog()
                        e.clipboardData.files.forEach(item => {
                            
                            let isLt2M = item.size / 1024 / 1024 < 100;
                            if (!isLt2M) {
                                that.$message({
                                    type: 'error', 
                                    message:'上传文件大小不能超过 100MB!',
                                    offset:200,
                                })
                                return
                            }
                            let param = new FormData();
                            param.append('file', item);
                            param.append('fileType', 115);
                            let config = {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            }; 
                          let url = document.URL.includes('yaheecloud') ? 'http://erptools.yaheecloud.com/api/common/uploadFile':'http://api-tools-test.yahee.com.cn:8090/common/uploadFile'
                          commonUploadFile(url,param,config).then(res => {
                                if(res.data && !res.data.includes(null)){
                                    let data = {}
                                    data = that.changeImgUrlParams(item,res.data[0]) 
                                    that.imgList.push(data)
                                    that.dialogLoading = false                                  
                                }else {
                                     that.$message({
                                        type: 'error', 
                                        message:'上传失败请重新上传！',
                                        offset:200
                                    })
                                }
                            })
                        })
                    }    
                }
            })  
        },
        
    }
}
</script>
<style scoped lang="scss">

.bg-link {
    color: #3366cc;
    cursor: pointer;
}
.imgBox{
    display: flex;
    flex-wrap: wrap;
}
.timeBox{
    margin: 0 5px;
}
.input-with-select {
    width: 150px;
}
.lt-created-time{
    display: block;
}
.rt-created-time{
    display: inline-block;
}
.content-div {
    width: 100%;
    height: 121px;
    border: 1px solid #ccc;
    padding: 10px;
}
.titleRemarks {
    font-size: 14px;
    font-weight: bold;
    padding-left: 5px;
    border-bottom: 1px solid #eee;
    height: 30px;
    line-height: 30px;
}
.infinite-list-wrapper{
    height:345px;
    width: 100%;
    padding: 0 100px;
    margin-bottom: 30px;
    overflow-y: auto;
}
 .remarkContent {
        position: relative;
        margin-bottom: 20px;
        border:1px solid #eee;
         .buttonQuill {
            position: absolute;
            bottom: -35px;
            right: 10px;
            display: flex;
            button {
                margin-right: 10px;
            }
        }
    }
.list {
    padding: 10px 0px;
}
.content-main {
    width: 100%;
}
.span-backG{
    position: relative;
    display: flex;
    min-height: 70px;
    width: 100%;
    margin-top: 10px;
}
.bubble-tail{
        position: absolute;
        right: 85px;
        top: 5px;
        width: 0;
        height: 0;
        border-width: 6px;
        border-style: solid;
        border-color: transparent;
        border-left-width: 9px;
        border-left-color: currentColor;
        color: #eee;
}
 
.leftbubble-tail{
        position: absolute;
        left: 84px;
        top: 5px;
        width: 0;
        height: 0;
        border-width: 7px;
        border-style: solid;
        border-color: transparent;
        margin-bottom: -39px;
        border-right-width: 10px;
        border-right-color: currentColor;
        color: #eee;
    }
    .r-text {
        float: right;
        margin-right: 100px;
        max-width: 420px;
        min-height: 52px;  
        // padding: 5px 20px 5px 0;
      
    }
    .r-text-main {
        background: #FAFAFA;
        border: 1px solid #ccc;
        border-radius: 2px;
        padding: 4px;
        word-break: break-all;
        text-align: right;
    }
    .l-text {
        margin-left: 100px;
        max-width: 420px;
        min-height: 52px; 
        // padding: 5px 20px 5px 0;

    }
    .l-text-main {
        background: #F7FFF7;
        border: 1px solid #ccc;
        border-radius: 2px;
        padding: 4px;
        display: inline-block;
        min-width: 123px;
        word-break: break-all;
    }
    .r-name {
        border: 1px solid #ccc;
        position: absolute;
        right: 10px;
        width: 65px;
        line-height: 17px;
        padding: 3px 0 5px;
        text-align: center;
        border: 1px solid #ccc;
        border-radius: 2px;
        background: #f1f1f1;
        word-break: break-all;
    }
    .l-name {
        border: 1px solid #ccc;
        position: absolute;
        left: 10px;
        width: 65px;
        line-height: 17px;
        padding: 3px 0 5px;
        text-align: center;
        border: 1px solid #ccc;
        border-radius: 2px;
        background: #E8FFE8;
        float: right;
        word-break: break-all;
    }
    .text-m {
        word-break: break-all;
    }
    .loading-t {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 36px;
    }
    .nomore-text{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 36px;
    }
</style>