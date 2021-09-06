<template>
    <div>
         <el-row>
            <el-col :span="8">
                <span class="boldTitle">开发类型:</span>
                <span>{{productVoDetail.developmenttype == '1' ? '零售' : '批发'}}</span>
            </el-col>
            <el-col :span="8">
                <span class="boldTitle">开发场景:</span>
                <span>{{ showScene }}</span>
            </el-col>
            <el-col :span="8">
                <span class="boldTitle">关联产品:</span>
                <span>({{productVoDetail.id}}){{productVoDetail.spu}}</span>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="8">
                <span class="boldTitle">所属分类:</span>
                <span>{{productVoDetail.categoryname}}</span>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name:'devDetail',
    data(){
        return {
            showScene:'',
        }
    },
    props:{
        productVoDetail:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    mounted(){
        this.showSign()
    },
    methods:{
        showSign(){
            if(this.productVoDetail.developmentscenarios == 1){
                this.showScene = '开发新产品'
            } else if (this.productVoDetail.developmentscenarios == 2){
                this.showScene = '开发新市场(国家)'
            }else if (this.productVoDetail.developmentscenarios == 3){
                this.showScene = '开发新尺码(已有产品添加新尺码)'
            }else if (this.productVoDetail.developmentscenarios == 10){
                this.showScene = '二次开发'
            }else if (this.productVoDetail.developmentscenarios == 11){
                this.showScene = '二次开发- 市场'
            }else if (this.productVoDetail.developmentscenarios == 12){
                this.showScene = '二次开发-尺寸'
            }
        }
    }

}
</script>
<style lang="scss" scoped>
    .textSpeaing{
          margin-top: 15px;
      }
      .boldTitle{
          font-weight: bold;
      }
      .noBoldTitle{
          font-weight: normal;
      }
</style>