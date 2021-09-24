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
                            平台：<span class="imageMainboxText">{{item.platformid ? getPlatforms(item.platformid) : ''}}-{{item.platformsiteid ? getPlatformsiteid(item.platformsiteid):''}}</span>
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
                    <span class='showTitle'>产品的尺寸：</span>
                    <span class="mianInfoTitle">{{comNewsDetailList.jpsize}}</span>
                </div>
                <div class="mianInfo">
                    <span class='showTitle'>产品的净重：</span>
                    <span class="mianInfoTitle">{{comNewsDetailList.jpweight}}</span>
                </div>
                <div class="mianInfo">
                    <span class="showTitle">产品的规格参数：</span>
                    <span class="mianInfoTitle">{{comNewsDetailList.basicinformation}}</span>
                </div>
                <div class="mianInfo">
                    <span class='showTitle'>产品的材质：</span>
                    <span class="mianInfoTitle">{{comNewsDetailList.jpmaterial}}</span>
                </div>
                <div class="mianInfo">
                    <span class='showTitle'>产品的工艺：</span>
                    <span class="mianInfoTitle">{{comNewsDetailList.jpprocess}}</span>
                </div>
                <div class="mianInfo">
                    <span class='showTitle'>产品的颜色：</span>
                    <span class="mianInfoTitle">{{comNewsDetailList.jpcolor}}</span>
                </div >
                
            </el-col>
            <el-col  :span="12">
                <div class="mainInofTitle">竞品结论</div>
                <div class="mianInfo">
                    <div class='showTitle'>竞品优势功能：</div>
                    <div class="mianInfoTitle">{{comNewsDetailList.advantagefunction}}</div>
                </div>
                <div class="mianInfo">
                    <div class='showTitle'>竞品缺陷功能：</div>
                    <div class="mianInfoTitle">{{comNewsDetailList.defectfeature}}</div>
                </div>
                <div class="mianInfo">
                    <div class='showTitle'>产品使用场景：</div>
                    <div class="mianInfoTitle">{{comNewsDetailList.usagescenarios}}</div>
                </div>
                <div class="mianInfo">
                    <div class='showTitle'>产品目标人群：</div>
                    <div class="mianInfoTitle">{{comNewsDetailList.usecrowd}}</div>
                </div>
                <div class="mianInfo">
                    <div class='showTitle'>产品定位：</div>
                    <div class="mianInfoTitle">{{comNewsDetailList.jppositioning}}</div>
                </div>           
                <div class="mianInfo">
                    <div class='showTitle'>产品排名：</div>
                    <div class="mianInfoTitle">{{comNewsDetailList.jpranking}}</div>
                </div>           
                <div class="mianInfo">
                    <div class='showTitle'>产品确定开发调整点：</div>
                    <div class="mianInfoTitle">{{comNewsDetailList.jpadjustmentpoint}}</div>
                </div>           
                <div class="mianInfo">
                    <div class='showTitle'>备注：</div>
                    <div class="mianInfoTitle">{{comNewsDetailList.note}}</div>
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
           devSign:[
                {
                    label: 'eBay',
                    key: 1,
                    value: 1
                },
                {
                    label: 'Amazon',
                    key: 2,
                    value: 2
                },    
                {
                    label: 'TradeMe',
                    key: 3,
                    value: 3
                }, 
                {
                    label: 'Walmart',
                    key: 4,
                    value: 4
                }, 
            ], 
            platforms:[
                {
                    name: 'US',
                    key: 55,
                    id:55
                },
                {
                    name: 'DE',    //55：美国(USD)  56：德国(EUR)  54：英国(GBP)  30：澳大利亚(AUD)  65：新西兰(NZD)//
                    key: 56,
                    id: 56
                },    
                {
                    name: 'GB',
                    key: 54,
                    id:29
                }, 
                {
                    name: 'AU',
                    key: 30,
                    id: 30
                }, 
                {
                    name: 'NZD',
                    key: 65,
                    id: 65
                }, 
            ],
        }
    },
    props: {
        comNewsDetailList:{
            type:Object,
            default:() => {}
        }
    },
    methods:{
        getPlatforms(val){
            if(val){
                let valList = this.devSign.filter(res => {
                    return val == res.value
                })
                if(valList.length > 0){
                    return valList[0].label
                }else {
                    return ''
                }
                
            }
        },
        getPlatformsiteid(val){
            if(val){
                let newList = this.platforms.filter(res => {
                    return val == res.id
                })
                if(newList.length > 0){
                    return newList[0].name
                }else {
                    return ''
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.productsTitle{
    color: #3366cc;
    font-weight: bold;
    margin-bottom: 15px;
}
.mainInofTitle{
    color: #3366cc;
    font-weight: bold;
    margin: 40px 0 10px 0;
}
.imageMainbox {
    font-weight: bold;
    .imageMainboxText{
        font-weight: normal;
    }
}
.mianInfo{
    display: flex;
    margin-bottom: 10px;
    font-weight: bold;
    .mianInfoTitle{
        font-weight: normal;
        width: 660px;
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
            width: 150px;
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
.showTitle{
    display: inline-block;
    text-align: right;
    width: 140px;
}
    
</style>