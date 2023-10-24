<template>
    <div>
        <div class="productsTitle">{{M2('竞品信息')}}</div>
        <el-row>
            <el-col v-for="(item, index) in comNewsDetailList.competingproducts" :key="item.id" class="productsMain" :span="12">
                <div class="productsBox">
                    {{M2('我是竞品')}}{{index + 1}}
                </div>
                <div class="productsImage">
                    <div class="imageBox">
                        <el-image
                            class="imageListBox"
                             style="width: 97px; height: 97px; dispaly:block"
                            :src="item.showImgUrl"
                            fit="fill"
                            @click="openImageUrl(item.showBigImgUrl)"
                            >
                            <div slot="placeholder" class="image-slot icon-loading">
                                <i class="el-icon-loading" ></i>
                            </div>
                            <div slot="error" class="image-slot icon-loading" style="font-size:14px">
                                <i class="el-icon-picture-outline">{{M2('加载失败')}}</i>
                            </div>
                        </el-image>
                    </div>
                    <div class="imageTitle">
                        <div class="imageMainbox">
                            <span class="textPostion">{{M2('平台')}}：</span><span class="imageMainboxText">{{item.platformid >= 0 ? getPlatforms(item.platformid) : ''}}-{{item.platformsiteid ? getPlatformsiteid(item.platformsiteid):''}}</span><span class="textUrl" @click="showUrl(item.platformsiteid,item.xsin)">{{M2('访问地址')}}</span>
                        </div>
                        <div class="imageMainbox">
                            <span class="textPostion">ASIN：</span><span class="imageMainboxText">{{item.xsin}}</span>
                        </div>
                        <div class="imageMainbox">
                            <span class="textPostion">{{M2('售价')}}：</span><span class="imageMainboxText">{{item.price}} {{showMoneyCurry(item.platformsiteid)}}</span>
                        </div> 
                        <div class="imageMainbox">
                            <span class="textPostion">{{M2('日销量')}}：</span><span class="imageMainboxText">{{item.recentsalesvolume}}</span>
                        </div> 
                        <div class="imageMainbox" style="display:flex">
                            <div class="textPostion">{{M2('备注')}}：</div><div class="imageMainboxText noteBox " style="display:inline-block;width:500px">{{item.note}}</div>
                        </div> 
                    </div>
                </div>
            </el-col>
        </el-row>
        
        <el-row>
            <el-col  :span="12">
                <div class="mainInofTitle">{{M2('基础信息')}}</div>
                <div class="mianInfo">
                    <span class='showTitle'>{{M2('产品的尺寸')}}：</span>
                    <span class="mianInfoTitle">{{comNewsDetailList.jpsize}}</span>
                </div>
                <div class="mianInfo">
                    <span class='showTitle'>{{M2('产品的净重')}}：</span>
                    <span class="mianInfoTitle">{{comNewsDetailList.jpweight}}</span>
                </div>
                <div class="mianInfo">
                    <span class="showTitle">{{M2('产品的规格参数')}}：</span>
                    <span class="mianInfoTitle">{{comNewsDetailList.basicinformation}}</span>
                </div>
                <div class="mianInfo">
                    <span class='showTitle'>{{M2('产品的材质')}}：</span>
                    <span class="mianInfoTitle">{{comNewsDetailList.jpmaterial}}</span>
                </div>
                <div class="mianInfo">
                    <span class='showTitle'>{{M2('产品的工艺')}}：</span>
                    <span class="mianInfoTitle">{{comNewsDetailList.jpprocess}}</span>
                </div>
                <div class="mianInfo">
                    <span class='showTitle'>{{M2('产品的颜色')}}：</span>
                    <span class="mianInfoTitle">{{comNewsDetailList.jpcolor}}</span>
                </div >
                
            </el-col>
            <el-col  :span="12">
                <div class="mainInofTitle">{{M2('竞品结论')}}</div>
                <div class="mianInfo">
                    <div class='showTitle'>{{M2('竞品优势功能')}}：</div>
                    <div class="mianInfoTitle">{{comNewsDetailList.advantagefunction}}</div>
                </div>
                <div class="mianInfo">
                    <div class='showTitle'>{{M2('竞品缺陷功能')}}：</div>
                    <div class="mianInfoTitle">{{comNewsDetailList.defectfeature}}</div>
                </div>
                <div class="mianInfo">
                    <div class='showTitle'>{{M2('产品使用场景')}}：</div>
                    <div class="mianInfoTitle">{{comNewsDetailList.usagescenarios}}</div>
                </div>
                <div class="mianInfo">
                    <div class='showTitle'>{{M2('产品目标人群')}}：</div>
                    <div class="mianInfoTitle">{{comNewsDetailList.usecrowd}}</div>
                </div>
                <div class="mianInfo">
                    <div class='showTitle'>{{M2('产品定位')}}：</div>
                    <div class="mianInfoTitle">{{comNewsDetailList.jppositioning}}</div>
                </div>           
                <div class="mianInfo">
                    <div class='showTitle'>{{M2('产品排名')}}：</div>
                    <div class="mianInfoTitle">{{comNewsDetailList.jpranking}}</div>
                </div>           
                <div class="mianInfo">
                    <div class='showTitle'>{{M2('产品确定开发调整点')}}：</div>
                    <div class="mianInfoTitle">{{comNewsDetailList.jpadjustmentpoint}}</div>
                </div>           
                <div class="mianInfo">
                    <div class='showTitle'>{{M2('备注')}}：</div>
                    <div class="mianInfoTitle">{{comNewsDetailList.note}}</div>
                </div>           
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { getPlatformSiteByPlatformName } from '@/api/user.js'
export default {
    name:'comNewsDetail',
    data(){
        return {
           devSign:[
                {
                    label: 'eBay',
                    key: 1,
                    value: 0
                },
                {
                    label: 'Amazon',
                    key: 2,
                    value: 1
                },    
                {
                    label: 'TradeMe',
                    key: 3,
                    value: 2
                }, 
                {
                    label: 'Walmart',
                    key: 4,
                    value: 3
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
    mounted(){
        this.getDetailList()
    },
    methods:{
        openImageUrl(url){
          window.open(url)
      },
        showUrl(PlatformSiteId,XSIN){
            let productUrl = ''
                switch (PlatformSiteId)
                    {
                        case 29://英国
                            productUrl = "http://www.ebay.co.uk/itm/" + XSIN;
                            break;
                        case 27://美国
                            productUrl = "http://www.ebay.com/itm/" + XSIN;
                            break;
                        case 34://德国
                            productUrl = "http://www.ebay.de/itm/" + XSIN;
                            break;
                        case 30://澳洲
                            productUrl = "http://www.ebay.com.au/itm/" + XSIN;
                            break;
                        case 54://英国
                            productUrl = "http://www.amazon.co.uk/gp/product/" + XSIN;
                            break;
                        case 55://美国
                            productUrl = "http://www.amazon.com/gp/product/" + XSIN;
                            break;
                        case 56://德国
                            productUrl = "http://www.amazon.de/gp/product/" + XSIN;
                            break;
                        case 65://新西兰
                            productUrl = "http://www.trademe.co.nz/Browse/Listing.aspx?archive=1&id=" + XSIN;
                            break;
                        case 183://日本
                            productUrl = "https://www.amazon.co.jp/gp/product/" + XSIN;
                            break;
                        case 63://美国
                            productUrl = "https://www.walmart.com/ip/" + XSIN + "?findingMethod=hliab";
                            break;
                    }
                    window.open(productUrl, '_blank')
        },
        getDetailList(){
            getPlatformSiteByPlatformName().then(res => {
                if(res.data){
                    this.platforms = res.data
                }
            })
        },
        getPlatforms(val){
            if(val >= 0){
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
        },
        showMoneyCurry(val){
            if(val == 27 || val == 55){
                return 'USD'
            }else if (val == 29 || val == 54){
                return 'GBP'
            }else if(val == 56 || val == 34 ){
                return 'EUR'
            }else if (val == 30 ){
                return 'AUD'
            }else if(val == 65){
                return 'NZD'
            }else if(val == 183) {
                return 'JPY'
            }else {
                return 'USD'
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.icon-loading {
        width: 100px;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size:25px
        
    }
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
    .textPostion{
        width: 50px;
        text-align: right;
        display: inline-block;
    }
}
.mianInfo{
    display: flex;
    margin-bottom: 10px;
    font-weight: bold;
    .mianInfoTitle{
        font-weight: normal;
        width: 660px;
        white-space: pre-wrap;
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
            .imageListBox{
                width: 100px; 
                height: 100px; 
                display: block;
                cursor:pointer
              }
        }
        .imageTitle{
            display: flex;
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
    width: 160px;
}
.textUrl{
    font-size: 12px;
    color: royalblue;
    margin-left: 5px;
    cursor: pointer;
    display: inline-block;
    &:hover{
        color: #ffffff;
        background-color: royalblue;
    }
}
    
</style>