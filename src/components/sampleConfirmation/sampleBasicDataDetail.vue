<template>
    <div>
        <el-row>
            <el-col :span="10"  >
                <span class="imageMainbox">
                    <el-popover
                        placement="bottom"
                        width="627"
                        trigger="click">
                        <el-table :data="gridData" border>
                            <el-table-column width="200" property="productType" label="产品类型"></el-table-column>
                            <el-table-column width="400" property="Interpretation" label="释义"></el-table-column>
                        </el-table>
                        <i class="el-icon-question" slot="reference"></i>
                    </el-popover>
                    产品类型： </span>
                <span class="imageMainboxText">{{ruleForm.scenariosStr}}</span>
            </el-col>
            <el-col :span="10"  >
                <span class="imageMainbox">是否为产前样： </span>
                <span class="imageMainboxText">{{ruleForm.preproductionSampleStr}}</span>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10"  >
                <span class="imageMainbox">
                    <el-popover
                        placement="bottom"
                        width="627"
                        trigger="click">
                        <el-table :data="gridData1" border>
                            <el-table-column width="200" property="productType" label="样品情况"></el-table-column>
                            <el-table-column width="400" property="Interpretation" label="释义"></el-table-column>
                        </el-table>
                        <i class="el-icon-question" slot="reference"></i>
                    </el-popover>
                    样品情况： </span>
                <span class="imageMainboxText">{{ruleForm.sampleConditionStr}}</span>
            </el-col>
            <el-col :span="10"   v-if="showSampleNum">
                <span class="imageMainbox">来样次数： </span>
                <span class="imageMainboxText">{{ruleForm.sampleNum ?ruleForm.sampleNum : 1}}</span>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10"   v-if="ruleForm.scenarios != 2">
                <span class="imageMainbox">开发ID/sku别名： </span>
                <span class="imageMainboxText">{{ruleForm.productKey}}</span>
            </el-col>
            <el-col :span="10"   v-else>
                <span class="imageMainbox">原sku别名： </span>
                <span class="imageMainboxText">{{ruleForm.originalTypeSkuAlias}}</span>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10"  >
                <span class="imageMainbox">产品名称： </span>
                <span class="imageMainboxText">{{ruleForm.productTitle}}</span>
            </el-col>
            <el-col :span="10"   v-if="ruleForm.scenarios != 2">
                <div class="boxFlex">
                    <span class="imageMainbox">供应商类型： </span>
                    <div class="imageMainboxText" >{{ruleForm.supplierTypeStr}}</div>
                </div>
            </el-col>
            <el-col :span="10"  >
                <div class="boxFlex">
                    <span class="imageMainbox">供应商名称： </span>
                    <div class="imageMainboxText" >{{ruleForm.supplierName}}</div>
                </div>       
            </el-col>
            <el-col :span="10"   v-if="ruleForm.scenarios == 2 && ruleForm.sampleStatus == 1">
                <div class="boxFlex">
                    <span class="imageMainbox">原产国： </span>
                    <div class="imageMainboxText" >{{ruleForm.exportMarketStr}}</div>
                </div>       
            </el-col>
            <el-col :span="10"  >
                <div class="boxFlex">
                    <span class="imageMainbox">验样场地： </span>
                    <div class="imageMainboxText" >{{ruleForm.testSiteStr}}</div>
                </div>
            </el-col>
            <el-col :span="10"   v-if="!showSampleNum">
                <div class="boxFlex">
                    <span class="imageMainbox">部件名称： </span>
                    <div class="imageMainboxText" >{{ruleForm.partName}}</div>
                </div>
            </el-col>
            <el-col :span="10"   v-if="ruleForm.scenarios == 2">
                <div class="boxFlex">
                    <span class="imageMainbox">验货报告需求： </span>
                    <div class="imageMainboxText" >{{ruleForm.reportRequirementStr}}</div>
                </div>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10"  >
                <div class="boxFlex">
                    <span class="imageMainbox">出口市场： </span>
                    <div class="imageMainboxText" >{{ruleForm.exportMarketStr}}</div>
                </div>
            </el-col>
            <el-col :span="10"   v-if="showSampleNum">
                <div class="boxFlex">
                    <span class="imageMainbox">英文验货报告： </span>
                    <div class="imageMainboxText" >{{ruleForm.englishInspectionReportStr}}</div>
                </div>       
            </el-col>
        </el-row>
        <el-row class="textSpeaing" v-if="ruleForm.projectType == 2">
            <el-col :span="10"  >
                <div class="boxFlex">
                    <span class="imageMainbox">原型号sku： </span>
                    <div class="imageMainboxText" >{{ruleForm.originalTypeSkuAlias}}</div>
                </div>
            </el-col>
            <el-col :span="10"  >
                <div class="boxFlex">
                    <span class="imageMainbox">二次开发原因： </span>
                    <div class="imageMainboxText" >{{ruleForm.reasonForSecondaryDev}}</div>
                </div>       
            </el-col>
        </el-row>
        <div v-if="showSampleNum">
            <el-row class="textSpeaing" >
                <el-col :span="10"  >
                    <div class="boxFlex">
                        <span class="imageMainbox">产品颜色类型： </span>
                        <div class="imageMainboxText" >{{ruleForm.productColorTypeStr}}</div>
                    </div>
                </el-col>
                <el-col :span="10"  >
                    <div class="boxFlex">
                        <span class="imageMainbox">样品颜色： </span>
                        <div class="imageMainboxText" >{{ruleForm.sampleColor}}</div>
                    </div>       
                </el-col>
            </el-row>
            <el-row class="textSpeaing">
                <el-col :span="10"  >
                    <div class="boxFlex">
                        <span class="imageMainbox">纸箱爆破强度： </span>
                        <div class="imageMainboxText" >{{ruleForm.burstingStrengthCarton}}</div>
                    </div>
                </el-col>
                <el-col :span="10"  >
                    <div class="boxFlex">
                        <span class="imageMainbox">辅材泡沫密度： </span>
                        <div class="imageMainboxText" >{{ruleForm.auxiliaryFoamDensity}}</div>
                    </div>       
                </el-col>
            </el-row>
        </div>
        <el-row class="textSpeaing">
            <el-col :span="10"  >
                <div class="boxFlex">
                    <span class="imageMainbox">产品材质： </span>
                    <div class="imageMainboxText" >{{ruleForm.material}}</div>
                </div>
            </el-col>
            <el-col :span="10"  >
                <div class="boxFlex">
                    <span class="imageMainbox">产品工艺： </span>
                    <div class="imageMainboxText" >{{ruleForm.process}}</div>
                </div>       
            </el-col>
        </el-row>
        <div v-if="ruleForm.scenarios != 2"> 
            <el-row class="textSpeaing">
                <el-col :span="10"  >
                    <div class="boxFlex">
                        <span class="imageMainbox">基础信息： </span>
                        <div class="imageMainboxText" style="white-space:pre-wrap">{{ruleForm.basicInformation}}</div>
                    </div>
                </el-col>
                <el-col :span="10"  >
                    <div class="boxFlex">
                        <span class="imageMainbox">竞品信息： </span>
                        <div class="imageMainboxText" v-html="ruleForm.jpInformation"></div>
                    </div>       
                </el-col>
            </el-row>
            <el-row class="textSpeaing">
                
                <el-col :span="10"  >
                    <div class="boxFlex">
                        <span class="imageMainbox">来样改进信息： </span>
                        <div class="imageMainboxText" v-html="ruleForm.sampleImprovedInformation"></div>
                    </div>       
                </el-col>
               
            </el-row>
            <el-row class="textSpeaing">
                 <el-col :span="10"  >
                    <div class="boxFlex">
                        <span class="imageMainbox">产品尺寸图（彩图）： </span>
                        <div class="imageMainboxText" >
                            <div class="image-flex">
                                <el-image  v-for="item in ruleForm.productSizePhotoList" :key="item.url" :src="item.showImgUrl"></el-image>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-row class="textSpeaing" v-else>
            <el-col :span="10"  >
                <div class="boxFlex">
                    <span class="imageMainbox">本次改进/变更点: </span>
                    <div class="imageMainboxText" >{{ruleForm.xsspecialrequirements}}</div>
                </div>       
            </el-col>
        </el-row>
        <el-row class="textSpeaing" v-if="showSampleNum || ruleForm.sampleOnePhoto">
            <el-col :span="20"  >
                <div class="boxFlex">
                    <span class="imageMainbox">来样图片： </span>
                    <div class="imageMainboxText" >
                        <div class="image-flex">
                            <el-image v-for="(item) in ruleForm.sampleOnePhoto" :key="item.id + Math.random()" :src="item.showImgUrl"></el-image>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row class="textSpeaing" v-else>
            <el-col :span="20"  >
                <div class="boxFlex">
                    <span class="imageMainbox">变更图片： </span>
                    <div class="imageMainboxText" >
                        <div class="image-flex">
                            <el-image v-for="item in ruleForm.changePhoto" :key="item.url" :src="item.showImgUrl"></el-image>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row class="textSpeaing" v-if="ruleForm.sampleImprovementPhoto">
            <el-col :span="20"  >
                <div class="boxFlex">
                    <span class="imageMainbox">来样改进信息图片： </span>
                    <div class="imageMainboxText" >
                        <div class="image-flex">
                            <el-image  v-for="item in ruleForm.sampleImprovementPhoto" :key="item.url" :src="item.showImgUrl"></el-image>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { judgePorduction} from '@/utils/tools.js'
import { queryProductSampleById,getFilePath } from '@/api/user.js'
export default {
    name:'salesTargetDetail',
    props:{
        ruleForm:{
            type:Object,
            default:() => ({
                exportMarket:[]
            })
        },
    },
    computed:{
         //改进变更，部件不显示
        showSampleNum(){
            if(this.ruleForm.scenarios != 2 || (this.ruleForm.scenarios == 2 && this.ruleForm.sampleStatus == 1)){
                return true
            }else {
                return false
            }
        }
    },
    data(){
        return {
            gridData:[
                {
                    productType:'全新产品',
                    Interpretation:'首次开发产品',
                },
                {
                    productType:'二次开发产品',
                    Interpretation:'已有产品变更供应商',
                },
                {
                    productType:'改进/变更产品',
                    Interpretation:'已有产品在不变更供应商的前提下的改进/变更',
                },
            ],
            gridData1:[
                {
                    productType:'完整样品',
                    Interpretation:'样品各部位齐全',
                },
                {
                    productType:'产前样',
                    Interpretation:'缺失部件，质检前需要再提交部件的确认申请单',
                },
                {
                    productType:'部件',
                    Interpretation:'部件确认，仅适用于已申请过产前样的确认申请单',
                },
            ],
        }
    },
    mounted(){
        this.init()
    },
    methods:{
        init(){
            let url = judgePorduction() ? 'http://productdev.yaheecloud.com/tool-api/common/getFilePath' : 'http://api-tools-test.yahee.com.cn:82/tool-api/common/getFilePath'
            getFilePath(url).then(res => {
                if(this.ruleForm.psas && this.ruleForm.psas.length > 0){
                    this.ruleForm.psas.forEach(item => {
                        item.showImgUrl = `${res.data}/Small/${item.fileUri}`
                        item.showBigImgUrl = `${res.data}/${item.fileUri}`
                    })
                    //产品尺寸图
                    this.ruleForm.productSizePhotoList =  this.ruleForm.psas.filter(item => {
                        return item.fileType == 4
                    })
                    //来样图片
                    this.ruleForm.sampleOnePhoto =  this.ruleForm.psas.filter(item => {
                        return item.fileType == 0
                    })
                    this.ruleForm.sampleImprovementPhoto =  this.ruleForm.psas.filter(item => {
                        return item.fileType == 1
                    })
                    this.ruleForm.changePhoto = this.ruleForm.psas.filter(item => {
                        return item.fileType == 3
                    })
                }
            }) 
        },
    }

}
</script>
<style lang="scss" scoped>
 .el-icon-question {
    font-size: 18px;
    cursor: pointer;
    user-select: none;
}
.textSpeaing .el-col{
    margin-top: 15px;
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
.boxFlex{
    display: flex;
}
.image-flex {
    display: flex;
    flex-wrap: wrap;
    .el-image {
        margin: 5px;
        width: 100px;
        height: 100px;
        border: 1px solid #ccc;
    }
}
</style>