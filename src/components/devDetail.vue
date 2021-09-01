<template>
    <div>
         <el-row>
            <el-col :span="8">
                <span class="boldTitle">开发类型:</span>
                <span>{{productVoDetail.developmenttype}}</span>
            </el-col>
            <el-col :span="8">
                <span class="boldTitle">开发场景:</span>
                <span>{{productVoDetail.developmentscenarios}}</span>
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
    props:{
        productVoDetail:{
            type:Object,
            default(){
                return {}
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