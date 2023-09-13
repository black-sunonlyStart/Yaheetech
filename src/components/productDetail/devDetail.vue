<template>
    <div>
         <el-row>
            <!-- <el-col :span="8">
                <span class="boldTitle">开发类型： </span>
                <span>{{productVoDetail.developmenttype == '1' ? '零售' : productVoDetail.developmenttype == '2'? '批发' :''}}</span>
            </el-col> -->
            <el-col :span="10">
                <span class="boldTitle imageMainbox">开发场景： </span>
                <span  class="imageMainboxText">{{ showSign(productVoDetail.developmentscenarios) }}</span>
            </el-col>
            <el-col :span="10">
                <span class="boldTitle imageMainbox">类目-系列： </span>
                <span  class="imageMainboxText">{{ productVoDetail.seriesCategoryName }}</span>
            </el-col>
            
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10" v-if="productVoDetail.developmentscenarios != 1">
                <span class="boldTitle imageMainbox">关联产品： </span>
                <span  class="imageMainboxText">{{ productVoDetail.developmentscenarios == 10 || productVoDetail.developmentscenarios == 11 || productVoDetail.developmentscenarios == 12 ? productVoDetail.spu : productVoDetail.spuid}}({{productVoDetail.id}})</span>
                <div >请再次确认关联产品，当前关联产品尺码为{{getAttrBute(productVoDetail.id,multiAttribute)}}</div>
            </el-col>
            <el-col :span="10">
                <span class="boldTitle imageMainbox">所属分类：</span>
                <span  class="imageMainboxText">{{productVoDetail.categoryname}}</span>
            </el-col>
        </el-row>
        <!-- <el-row class="textSpeaing" v-if="productVoDetail.developmentscenarios != 1" >
            <el-col :span="8">
                <span class="boldTitle">所属分类：</span>
                <span>{{productVoDetail.categoryname}}</span>
            </el-col>
        </el-row> -->
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
            if(sizeList && sizeList[0]){
                return sizeList[0].size
            }else {
                return ''
            }
            
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
 .imageMainbox{
    text-align: right;
    font-weight: bold;
    width: 180px;
    display: inline-block;
    flex-shrink: 0;
    .imageMainboxText{
        font-weight: normal;
        display: inline-block;
    }
}
</style>