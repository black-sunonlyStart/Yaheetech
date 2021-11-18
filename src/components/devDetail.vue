<template>
    <div>
         <el-row>
            <el-col :span="8">
                <span class="boldTitle">开发类型： </span>
                <span>{{productVoDetail.developmenttype == '1' ? '零售' : productVoDetail.developmenttype == '2'? '批发' :''}}</span>
            </el-col>
            <el-col :span="8">
                <span class="boldTitle">开发场景： </span>
                <span>{{ showSign(productVoDetail.developmentscenarios) }}</span>
            </el-col>
            <el-col :span="8" v-if="productVoDetail.developmentscenarios != 1">
                <span class="boldTitle">关联产品： </span>
                <span>{{productVoDetail.spu}}({{productVoDetail.id}})</span>
                <div >请再次确认关联产品，当前关联产品尺码为{{getAttrBute(productVoDetail.id,multiAttribute)}}</div>
            </el-col>
            <el-col :span="8" v-else>
                <span class="boldTitle">所属分类：</span>
                <span>{{productVoDetail.categoryname}}</span>
            </el-col>
        </el-row>
        <el-row class="textSpeaing" v-if="productVoDetail.developmentscenarios != 1" >
            <el-col :span="8">
                <span class="boldTitle">所属分类：</span>
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
        },
        multiAttribute:{
            type:Array,
            default(){
                return {}
            }
        },
        showSizeTitle:{
            type:Boolean,
            default(){
                return true
            }
        }
    },
    
    mounted(){
    },
    methods:{
        getAttrBute(spu,val){
            let sizeList = ''
            if(!val || val.length == 0 )return
            sizeList = val.filter(res => {
               return spu == res.productid
            })
            return sizeList[0].size
        },
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