<template>
  <div class="nav-container">
    <el-row :gutter="5">
      <el-col :span="12">
        <el-card class="card">
          <div class="out-container">
            <div class="image-container">
              假装我是一个图片
            </div>
            <div class="detailsText">
              <div>
                开发id:
              </div>
              <div>
                生成型号:
              </div>
              <div>
                开发市场:
              </div>
              <div>
                开发价/最低利润:
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
          <el-card class="card">
              <div class="stepBox">
                    <span class="leftButton" @click="leftMove">左箭头</span>
                    <span class="step-container">
                      
                        <el-steps :active="2" space='200' align-center>
                            <el-step title="步骤1" description="这是一段很长很长很长的描述性文字"></el-step>
                            <el-step title="步骤2" description="这是一段很长很长很长的描述性文字"></el-step>
                            <el-step title="步骤3" description="这是一段很长很长很长的描述性文字"></el-step>
                            <el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>
                            <el-step title="步骤5" description="这是一段很长很长很长的描述性文字"></el-step>
                            <el-step title="步骤6" description="这是一段很长很长很长的描述性文字"></el-step>
                            <el-step title="步骤7" description="这是一段很长很长很长的描述性文字"></el-step>
                            <el-step title="步骤8" description="这是一段很长很长很长的描述性文字"></el-step>
                            <el-step title="步骤9" description="这是一段很长很长很长的描述性文字"></el-step>
                            <el-step title="步骤10" description="这是一段很长很长很长的描述性文字"></el-step>
                            <el-step title="步骤11" description="这是一段很长很长很长的描述性文字"></el-step>
                            <el-step title="步骤12" description="这是一段很长很长很长的描述性文字"></el-step>
                            <el-step title="步骤13" description="这是一段很长很长很长的描述性文字"></el-step>
                            <el-step title="步骤14" description="这是一段很长很长很长的描述性文字"></el-step>
                            <el-step title="步骤15" description="这是一段很长很长很长的描述性文字"></el-step>
                        </el-steps>
                    </span>
                    <span class='rightButton' @click="rightMove">右箭头</span>
              </div>
              
          </el-card>
      </el-col>
    </el-row>
    <el-card class="card">
        <div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="开发类型/场景" name="first" >
                    <div class="backgoundCon"></div>
                    <div class='tabContainer'>
                        <el-card>
                            <div slot="header" class="clearfix">
                                <div>开发类型/场景
                                    <div class="edit-position" @click="isEdit = !isEdit" v-if="isEdit"><i class="icon-edit"></i>编辑</div>
                                </div>   
                            </div>
                            <div v-if="isEdit">
                               <devDetail></devDetail>
                            </div>
                            <div v-else>
                               <devScene @closeEdit='editPage'></devScene>
                            </div>
                        </el-card>
                        <el-card style="margin-top:10px">
                            <div slot="header" class="clearfix">
                                <span>产品尺寸图
                                    <div class="edit-position" @click="isEdit1 = !isEdit1" v-if="isEdit1"><i class="icon-edit"></i>编辑</div>
                                </span>
                            </div>
                            <div v-if="isEdit1" class="imgContainer">
                                <div v-for="item in imgBox" :key="item.key" class="imgCon">
                                    <div>{{item.name}}</div>
                                </div>
                            </div>
                            <div v-else>
                                <imgUpload @inputImg='putImgList' :value='imageList' @closeEdit='updeEditPage'></imgUpload> 
                            </div>
                        </el-card>
                        <el-card style="margin-top:10px">
                            <div slot="header" class="clearfix">
                                <span>销售目标
                                    <div class="edit-position" @click="isEdit2 = !isEdit2" v-if="isEdit2"><i class="icon-edit"></i>编辑</div>
                                </span>
                            </div>
                            <div v-if="isEdit2">
                                <salesTargetDetail></salesTargetDetail>
                            </div>
                            <div v-else>
                                <salesTargetEdit @closeEdit='salesEditPage'></salesTargetEdit>
                            </div>
                        </el-card>
                    </div>                   
                </el-tab-pane>
                <el-tab-pane label="产品尺寸图" name="second">
                     <div class="backgoundCon"></div>
                    <div class='tabContainer'>
                        <el-card>
                            <div slot="header" class="clearfix">
                                <div>开发类型/场景
                                    <div class="edit-position" @click="isEdit = !isEdit" v-if="isEdit"><i class="icon-edit"></i>编辑</div>
                                </div>   
                            </div>
                            <div v-if="isEdit">
                               <devDetail></devDetail>
                            </div>
                            <div v-else>
                               <devScene @closeEdit='editPage'></devScene>
                            </div>
                        </el-card>
                        <el-card style="margin-top:10px">
                            <div slot="header" class="clearfix">
                                <span>产品尺寸图
                                    <div class="edit-position" @click="isEdit1 = !isEdit1" v-if="isEdit1"><i class="icon-edit"></i>编辑</div>
                                </span>
                            </div>
                            <div v-if="isEdit1" class="imgContainer">
                                <div v-for="item in imgBox" :key="item.key" class="imgCon">
                                    <div>{{item.name}}</div>
                                </div>
                            </div>
                            <div v-else>
                                <imgUpload @inputImg='putImgList' :value='imageList' @closeEdit='updeEditPage'></imgUpload> 
                            </div>
                        </el-card>
                        <el-card style="margin-top:10px">
                            <div slot="header" class="clearfix">
                                <span>销售目标
                                    <div class="edit-position" @click="isEdit2 = !isEdit2" v-if="isEdit2"><i class="icon-edit"></i>编辑</div>
                                </span>
                            </div>
                            <div v-if="isEdit2">
                                <salesTargetDetail></salesTargetDetail>
                            </div>
                            <div v-else>
                                <salesTargetEdit @closeEdit='salesEditPage'></salesTargetEdit>
                            </div>
                        </el-card>
                    </div>                  
                    
                </el-tab-pane>
                <el-tab-pane label="销售目标" name="third">
                     <div class="backgoundCon"></div>
                    <div class='tabContainer'>
                        <el-card>
                            <div slot="header" class="clearfix">
                                <div>开发类型/场景
                                    <div class="edit-position" @click="isEdit = !isEdit" v-if="isEdit"><i class="icon-edit"></i>编辑</div>
                                </div>   
                            </div>
                            <div v-if="isEdit">
                               <devDetail></devDetail>
                            </div>
                            <div v-else>
                               <devScene @closeEdit='editPage'></devScene>
                            </div>
                        </el-card>
                        <el-card style="margin-top:10px">
                            <div slot="header" class="clearfix">
                                <span>产品尺寸图
                                    <div class="edit-position" @click="isEdit1 = !isEdit1" v-if="isEdit1"><i class="icon-edit"></i>编辑</div>
                                </span>
                            </div>
                            <div v-if="isEdit1" class="imgContainer">
                                <div v-for="item in imgBox" :key="item.key" class="imgCon">
                                    <div>{{item.name}}</div>
                                </div>
                            </div>
                            <div v-else>
                                <imgUpload @inputImg='putImgList' :value='imageList' @closeEdit='updeEditPage'></imgUpload> 
                            </div>
                        </el-card>
                        <el-card style="margin-top:10px">
                            <div slot="header" class="clearfix">
                                <span>销售目标
                                    <div class="edit-position" @click="isEdit2 = !isEdit2" v-if="isEdit2"><i class="icon-edit"></i>编辑</div>
                                </span>
                            </div>
                            <div v-if="isEdit2">
                                <salesTargetDetail></salesTargetDetail>
                            </div>
                            <div v-else>
                                <salesTargetEdit @closeEdit='salesEditPage'></salesTargetEdit>
                            </div>
                        </el-card>
                    </div>                  
                </el-tab-pane>
                <el-tab-pane label="竞品信息" name="fourth">
                    <div class='tabContainer'>
                        <el-card>
                            <div slot="header" class="clearfix">
                                <div>竞品信息
                                    <div class="edit-position" @click="isEdit3 = !isEdit3" v-if="isEdit3"><i class="icon-edit"></i>编辑</div>
                                </div>   
                            </div>
                            <div v-if="isEdit3">
                               <comNewsDetail></comNewsDetail>
                            </div>
                            <div v-else>
                               <comNewsEdit @closeEdit='comNewsEdit'></comNewsEdit>
                            </div>
                        </el-card>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="开发信息" name="fifth">
                    <div class='tabContainer'>
                        <el-card>
                            <div slot="header" class="clearfix">
                                <div>开发信息
                                    <div class="edit-position" @click="isEdit4 = !isEdit4" v-if="isEdit4"><i class="icon-edit"></i>编辑</div>
                                </div>   
                            </div>
                            <div v-if="isEdit4">
                               <devInformationDetail></devInformationDetail>
                            </div>
                            <div v-else>
                               <devInformationEdit @closeEdit='devInfoEdit'></devInformationEdit>
                            </div>
                        </el-card>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="产品认证信息" name="sixth">
                    <div class='tabContainer'>
                        <el-card>
                            <div slot="header" class="clearfix">
                                <div>产品认证信息
                                    <div class="edit-position" @click="isEdit5 = !isEdit5" v-if="isEdit5"><i class="icon-edit"></i>编辑</div>
                                </div>   
                            </div>
                            <div v-if="isEdit5">
                               <prodCerInfoDetail></prodCerInfoDetail>
                            </div>
                            <div v-else>
                              <prodCerInfoEdit @closeEdit='proInfoEdit'></prodCerInfoEdit>
                            </div>
                        </el-card>
                    </div>
                    <div class="backgoundCon"></div>
                    <div class='tabContainer'>
                        <el-card>
                            <div slot="header" class="clearfix">
                                <div>产品标题和供应商信息
                                    <div class="edit-position" @click="isEdit6 = !isEdit6" v-if="isEdit6"><i class="icon-edit"></i>编辑</div>
                                </div>   
                            </div>
                            <div v-if="isEdit6">
                               <prodevInfoDetail></prodevInfoDetail>
                            </div>
                            <div v-else>
                                <prodevInfoEdit @closeEdit='prodevInfoEdit'></prodevInfoEdit>
                            </div>
                        </el-card>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="产品标题和供应商信息" name="seventh">
                    <div class='tabContainer'>
                        <el-card>
                            <div slot="header" class="clearfix">
                                <div>产品认证信息
                                    <div class="edit-position" @click="isEdit5 = !isEdit5" v-if="isEdit5"><i class="icon-edit"></i>编辑</div>
                                </div>   
                            </div>
                            <div v-if="isEdit5">
                               <prodCerInfoDetail></prodCerInfoDetail>
                               
                            </div>
                            <div v-else>
                              <prodCerInfoEdit @closeEdit='proInfoEdit'></prodCerInfoEdit>
                            </div>
                        </el-card>
                    </div>
                    <div class="backgoundCon"></div>
                    <div class='tabContainer'>
                        <el-card>
                            <div slot="header" class="clearfix">
                                <div>产品标题和供应商信息
                                    <div class="edit-position" @click="isEdit6 = !isEdit6" v-if="isEdit6"><i class="icon-edit"></i>编辑</div>
                                </div>   
                            </div>
                            <div v-if="isEdit6">
                               <prodevInfoDetail></prodevInfoDetail>
                            </div>
                            <div v-else>
                                <prodevInfoEdit @closeEdit='prodevInfoEdit'></prodevInfoEdit>
                            </div>
                        </el-card>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="产品尺寸和属性信息" name="eigth">
                    <div class='tabContainer'>
                        <el-card>
                            <div slot="header" class="clearfix">
                                <div>产品尺寸和属性信息
                                    <div class="edit-position" @click="isEdit7 = !isEdit7" v-if="isEdit7"><i class="icon-edit"></i>编辑</div>
                                </div>   
                            </div>
                            <div v-if="isEdit7">
                               <pordSizeAttrInfo></pordSizeAttrInfo>
                            </div>
                            <div v-else>
                              <pordSizeAttrEdit  @closeEdit='closeProdevAttr'></pordSizeAttrEdit>
                            </div>
                        </el-card>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="采购信息" name="eigth">
                    <div class='tabContainer'>
                        <el-card>
                            <div slot="header" class="clearfix">
                                <div>采购信息
                                    <div class="edit-position" @click="isEdit8 = !isEdit8" v-if="isEdit8"><i class="icon-edit"></i>编辑</div>
                                </div>   
                            </div>
                            <div v-if="isEdit8">
                               <pordSizeAttrInfo></pordSizeAttrInfo>
                            </div>
                            <div v-else>
                              <pordSizeAttrEdit  @closeEdit='closeProdevAttr'></pordSizeAttrEdit>
                            </div>
                        </el-card>
                    </div>
                </el-tab-pane>
             </el-tabs>   
        </div>
    </el-card>
  </div>
</template>
<script>
 import devDetail from '@/components/devDetail.vue'
 import devScene from '@/components/devScene.vue'
 import imgUpload from '@/components/uploadImg.vue'
 import salesTargetDetail from '@/components/salesTargetDetail.vue'
 import salesTargetEdit from '@/components/salesTargetEdit.vue'
 import comNewsDetail from '@/components/comNewsDetail.vue'
 import comNewsEdit from '@/components/comNewsEdit.vue'
 import devInformationDetail from '@/components/devInformationDetail.vue'
 import devInformationEdit from '@/components/devInformationEdit.vue'
 import prodCerInfoDetail from '@/components/prodCerInfoDetail.vue'
 import prodevInfoDetail from '@/components/prodevInfoDetail.vue'
 import prodCerInfoEdit from '@/components/prodCerInfoEdit.vue'
 import prodevInfoEdit from '@/components/prodevInfoEdit.vue'
 import pordSizeAttrInfo from '@/components/pordSizeAttrInfo.vue'
 import pordSizeAttrEdit from '@/components/pordSizeAttrEdit.vue'
export default {
  name: 'productDetails',
  components:{
      devDetail,
      devScene,
      imgUpload,
      salesTargetDetail,
      salesTargetEdit,
      comNewsDetail,
      comNewsEdit,
      devInformationDetail,
      devInformationEdit,
      prodCerInfoDetail,
      prodevInfoDetail,
      prodCerInfoEdit,
      prodevInfoEdit,
      pordSizeAttrInfo,
      pordSizeAttrEdit
  },
  data () {
    return {
        imageList:[],
        imgBox:[
            {
                name:'假装我是一个小图片',
                key:'1'
            },
            {
                name:'假装我是一个小图片',
                key:'2'
            },
            {
                name:'假装我是一个小图片',
                key:'3'
            },
        ],
        activeName: 'first',
        isEdit:true,
        isEdit1:true,
        isEdit2:true,
        isEdit3:true,
        isEdit4:true,
        isEdit5:true,
        isEdit6:true,
        isEdit7:true,
        isEdit8:true,
    }
  },
  created () {

  },
  mounted () {
  },
  methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      editPage(val){
          this.isEdit = val
      },
      updeEditPage(val){  
          this.isEdit1 = val
      },
      salesEditPage(val){  
          this.isEdit2 = val
      },
      comNewsEdit(val){
          this.isEdit3 = val
      },
      devInfoEdit(val){
          this.isEdit4 = val
      },
      proInfoEdit(val){
          this.isEdit5 = val
      },
      prodevInfoEdit(val){
          this.isEdit6 = val
      },
      closeProdevAttr(val){
          this.isEdit7 = val
      },
      putImgList(val){
          this.imageList = val
      },
      leftMove(){
          let  image = document.querySelector('.step-container')
          if(image.offsetLeft > 30)return
           image.style.left = image.offsetLeft +50 + 'px'
      },
      rightMove(){
          let image = document.querySelector('.step-container')
          let parentBox = document.querySelector('.stepBox')
          if(image.offsetLeft < -parentBox.clientWidth ){
              return
          }else{
              image.style.left = image.offsetLeft - 50 + 'px'
          }
          
      }
  }
}
</script>
<style lang="scss" scoped>
.nav-container {
  width: 100%;
  min-height: 980px;
  background-color: rgba(230, 230, 230, 1);
  ::v-deep.card{
      margin: 10px 10px 10px 10px;
      .el-card__body{
          padding-top: 10px !important;
    }
  }
  .out-container {
    display: flex;
    .image-container {
      width: 100px;
      height: 100px;
      border: 1px solid #cccccc;
    }
    .detailsText {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 10px;
    }
  }
  .stepBox{
      position: relative;
        height: 100px;
      .leftButton{
           position: absolute;
            top: -10px;
            left: -20px;
            background: #ffffff;
            height: 130px;
            width: 50px;
            z-index: 9999;
            line-height: 130px;
            cursor: pointer;
      }
      .step-container{
        display: inline-block;
        width: 200%;
        overflow: hidden;
        position: absolute;
        left: 23px
    }
    .rightButton{
        position: absolute;
        right: -20px;
        height: 131px;
        width: 52px;
        z-index: 9999;
        top: -10px;
        background: #ffffff;
        line-height: 130px;
        cursor: pointer;
    }
  }
  
  .backgoundCon{
      width: 100%;
      height: 10px;
      background-color: rgba(230, 230, 230, 1);
  }
  .tabContainer{
      height: 100%;
      width: 100%;
      background-color: rgba(230, 230, 230, 1);
      ::v-deep .el-card__header{
          padding: 10px !important;
          font-size: 16px;
          font-weight: bold;
      }
      .edit-position{
          float: right;
          margin-right:10px;
          color: #409eff;
          height: 20px;
          width: 55px;
          font-size: 14px;
          &:hover{
              background-color: #409eff;
              color: #ffffff;
              cursor: pointer;   
              text-align: center;
              
              .icon-edit{
                  fill: #ffffff;
                  background-image: url(../../assets/svg/editWrite.svg);
              }
          }
          .icon-edit{
              height: 16px;
              width: 16px;
              float: left;
              background-image: url(../../assets/svg/edit.svg);
          }
      }
      .imgContainer{
          display: flex;
          min-height: 100px;
          .imgCon{
              margin: 0 10px;
          }
      }
      
      
  }
  
}
</style>