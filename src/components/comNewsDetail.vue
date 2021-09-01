<template>
    <div>
        <div class="productsTitle">竞品信息</div>
        <el-row>
            <el-col v-for="(item, index) in comNewsDetailList.competingproducts" :key="item.id" class="productsMain" :span="12">
                <div class="productsBox">
                    我是竞品{{index + 1}}
                </div>
                <div class="productsImage">
                    <div class="imageBox">
                        <el-image
                            style="width: 100px; height: 100px; dispaly:black"
                            :src="item.showImgUrl"
                            fit="fill">
                        </el-image>
                    </div>
                    <div class="imageTitle">
                        <div class="imageMainbox">
                            平台：<span class="imageMainboxText">{{item.platformid}}{{item.platformsiteid}}</span>
                        </div>
                        <div class="imageMainbox">
                            ASIN:<span class="imageMainboxText">{{item.xsin}}</span>
                        </div>
                        <div class="imageMainbox">
                            售价：<span class="imageMainboxText">{{item.price}}</span>
                        </div> 
                        <div class="imageMainbox">
                            日销量：<span class="imageMainboxText">{{item.recentsalesvolume}}</span>
                        </div> 
                        <div class="imageMainbox">
                            备注：<span class="imageMainboxText">{{item.note}}</span>
                        </div> 
                    </div>
                </div>
            </el-col>
        </el-row>
        
        <el-row>
            <el-col  :span="12">
                <div class="mainInofTitle">基础信息</div>
                <div class="mianInfo">
                    <span>产品的尺寸：</span>
                    <span class="mianInfoTitle">{{comNewsDetailList.jpsize}}</span>
                </div>
                <div class="mianInfo">
                    <span>产品的净重：</span>
                    <span class="mianInfoTitle">{{comNewsDetailList.jpweight}}</span>
                </div>
                <div class="mianInfo">
                    <span>产品的规格参数：</span>
                    <span class="mianInfoTitle">{{comNewsDetailList.basicinformation}}</span>
                </div>
                <div class="mianInfo">
                    <span>产品的材质：</span>
                    <span class="mianInfoTitle">{{comNewsDetailList.jpmaterial}}</span>
                </div>
                <div class="mianInfo">
                    <span>产品的工艺：</span>
                    <span class="mianInfoTitle">{{comNewsDetailList.jpprocess}}</span>
                </div>
                <div class="mianInfo">
                    <span>产品的颜色：</span>
                    <span class="mianInfoTitle">{{comNewsDetailList.jpcolor}}</span>
                </div >
                
            </el-col>
            <el-col  :span="12">
                <div class="mainInofTitle">竞品结论</div>
                <div class="mianInfo">
                    <span>竞品优势功能：</span>
                    <span class="mianInfoTitle">{{comNewsDetailList.advantagefunction}}</span>
                </div>
                <div class="mianInfo">
                    <span>竞品缺陷功能：</span>
                    <span class="mianInfoTitle">{{comNewsDetailList.defectfeature}}</span>
                </div>
                <div class="mianInfo">
                    <span>产品使用场景：</span>
                    <span class="mianInfoTitle">{{comNewsDetailList.usagescenarios}}</span>
                </div>
                <div class="mianInfo">
                    <span>产品目标人群：</span>
                    <span class="mianInfoTitle">{{comNewsDetailList.usecrowd}}</span>
                </div>
                <div class="mianInfo">
                    <span>产品定位：</span>
                    <span class="mianInfoTitle">{{comNewsDetailList.jppositioning}}</span>
                </div>           
                <div class="mianInfo">
                    <span>产品排名：</span>
                    <span class="mianInfoTitle">{{comNewsDetailList.jpranking}}</span>
                </div>           
                <div class="mianInfo">
                    <span>产品确定开发调整点：</span>
                    <span class="mianInfoTitle">{{comNewsDetailList.jpadjustmentpoint}}</span>
                </div>           
                <div class="mianInfo">
                    <span>备注：</span>
                    <span class="mianInfoTitle">{{comNewsDetailList.note}}</span>
                </div>           
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name:'comNewsDetail',
    data(){
        return {
           productsList:[
               {
                   image:'我承认我是一个图片',
                   text:'我是文字我不骗人',
                   dirction:'那我是谁',
                   key:'1'
               },
               {
                   image:'我承认我是一个图片',
                   text:'我是文字我不骗人',
                   dirction:'那我是谁',
                   key:'2'
               },
               {
                   image:'我承认我是一个图片',
                   text:'我是文字我不骗人',
                   dirction:'那我是谁',
                   key:'3'
               },
           ] 
        }
    },
    props: {
        comNewsDetailList:{
            type:Object,
            default:() => {}
        }
    }
}
</script>
<style lang="scss" scoped>
.productsTitle{
    color: #409EFF;
    font-weight: bold;
    margin-bottom: 15px;
}
.mainInofTitle{
    color: #409EFF;
    font-weight: bold;
    margin: 30px 0;
}
.imageMainbox {
    font-weight: bold;
    .imageMainboxText{
        font-weight: normal;
    }
}
.mianInfo{
    margin-bottom: 10px;
    font-weight: bold;
    .mianInfoTitle{
        font-weight: normal;
    }
}
.productsMain{
    display: inline-block;
    .productsBox{
        display: flex;
        font-weight: bold;
        margin: 10px 0;
    }
    .productsImage{
        .imageBox{
            width: 100px;
            height: 100px;
            border:1px solid #cccccc;
        }
        .imageTitle{
            width: 100px;
            height: 100px;
            display: flex;
            // align-items: center;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 10px;
        }
        display: flex;
    }
}
    
</style>