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
              <div class="step-container">
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
                                    <div class="edit-position" @click="isEdit2 = !isEdit2" v-if="isEdit"><i class="icon-edit"></i>编辑</div>
                                </span>
                            </div>
                            <div v-if="isEdit2">
                                <salesTargetDetail></salesTargetDetail>
                            </div>
                            <div v-else>
                                <salesTargetEdit></salesTargetEdit>
                            </div>
                        </el-card>
                    </div>                   
                </el-tab-pane>
                <el-tab-pane label="产品尺寸图" name="second">
                    配置管理
                    
                </el-tab-pane>
                <el-tab-pane label="销售目标" name="third">
                    角色管理
                </el-tab-pane>
                <el-tab-pane label="定时任务补偿" name="fourth">
                    定时任务补偿
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
export default {
  name: 'productDetails',
  components:{
      devDetail,
      devScene,
      imgUpload,
      salesTargetDetail,
      salesTargetEdit
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
      putImgList(val){
          this.imageList = val
      }
  }
}
</script>
<style lang="scss" scoped>
.nav-container {
  width: 100%;
  min-height: 980px;
  background-color: rgba(230, 230, 230, 1);
  .card{
      margin: 10px 10px 10px 10px;
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
  .step-container{
      height: 100px;
      width: 100%;
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
  .details-card{
      .el-card__body{
        //   padding: 20px 0 !important;
      }
  }
  
}
</style>