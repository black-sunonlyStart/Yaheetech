<template>
    <div>
        <div class="productsTitle">竞品信息</div>
        <el-row>
            <el-col v-for="item in productsList" :key="item.key" class="productsMain" :span="12">
                <div class="productsBox">
                    我是竞品{{item.key}}
                </div>
                <div class="productsImage">
                    <div class="imageBox">
                        {{item.image}}
                    </div>
                    <div>
                        <div>
                            平台：{{item.text}}
                        </div>
                        <div>
                            售价：{{item.dirction}}
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
                    <span>产品的尺寸</span>
                </div>
                <div class="mianInfo">
                    <span>产品的净重：</span>
                    <span>产品的净重</span>
                </div>
                <div class="mianInfo">
                    <span>产品的规格参数：</span>
                    <span>产品的规格参数</span>
                </div>
                <div class="mianInfo">
                    <span>产品的材质：</span>
                    <span>产品的尺寸</span>
                </div>
                <div class="mianInfo">
                    <span>产品的工艺：</span>
                    <span>产品的尺寸</span>
                </div>
                <div class="mianInfo">
                    <span>产品的颜色：</span>
                    <span>产品的尺寸</span>
                </div >
                
            </el-col>
            <el-col  :span="12">
                <div class="mainInofTitle">竞品结论</div>
                <div class="mianInfo">
                    <span>产品的尺寸：</span>
                    <span>产品的尺寸</span>
                </div>
                <div class="mianInfo">
                    <span>产品的净重：</span>
                    <span>产品的净重</span>
                </div>
                <div class="mianInfo">
                    <span>产品的规格参数：</span>
                    <span>产品的规格参数</span>
                </div>
                <div class="mianInfo">
                    <span>产品的材质：</span>
                    <span>产品的尺寸</span>
                </div>
                <div class="mianInfo">
                    <span>产品的工艺：</span>
                    <span>产品的尺寸</span>
                </div>
                <div class="mianInfo">
                    <span>产品的颜色：</span>
                    <span>产品的尺寸</span>
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
    margin: 10px 0;
}
.mianInfo{
    margin-bottom: 10px;
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
            width: 200px;
            height: 200px;
            border:1px solid red;
        }
        display: flex;
    }
}
    
</style>