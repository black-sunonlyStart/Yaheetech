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
                                <span>开发类型/场景</span>
                            </div>
                            <div>

                            </div>
                        </el-card>
                        <el-card style="margin-top:10px">
                            <div slot="header" class="clearfix">
                                <span>产品尺寸图</span>
                            </div>
                            <div>

                            </div>
                        </el-card>
                        <el-card style="margin-top:10px">
                            <div slot="header" class="clearfix">
                                <span>销售目标</span>
                            </div>
                            <div>

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

export default {
  name: 'productDetails',
  data () {
    return {
        activeName: 'first'
    }
  },
  created () {

  },
  mounted () {
  },
  methods: {
       handleClick(tab, event) {
        console.log(tab, event);
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
  }
  .details-card{
      .el-card__body{
        //   padding: 20px 0 !important;
      }
  }
  
}
</style>