<template>
    <div>
         <el-row>
            <el-col :span="8">
                <span class="boldTitle">开发类型:</span>
                <span>{{productVoDetail.developmenttype == '1' ? '零售' : '批发'}}</span>
            </el-col>
            <el-col :span="8">
                <span class="boldTitle">开发场景:</span>
                <span>{{ showSign(productVoDetail.developmentscenarios) }}</span>
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
    },
    methods:{
        showSign(val){
            if(val == 1){
                return '开发新产品'
            } else if (val == 2){
                return '开发新市场(国家)'
            }else if (val == 3){
                return '开发新尺码(已有产品添加新尺码)'
            }else if (val == 10){
                return '二次开发'
            }else if (val == 11){
                return '二次开发- 市场'
            }else if (val == 12){
                return '二次开发-尺码'
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