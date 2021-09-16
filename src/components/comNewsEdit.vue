<template>
    <div>
        <div>
            <span class="mainTitle">
                竞品信息
            </span>
            <div class="mainImage">
                <el-row>
                    <div v-for="(item, index) in comNewsDetailList.competingproducts" :key="item.key" >
                        <el-col :span="9" class="imgDetail">
                            <div class="productTitle">竞品{{index + 1}}</div>
                            <div class="imgbox">
                                <div class="uploadBox">
                                    <el-upload
                                        :action='action'
                                        list-type="picture-card"
                                        :file-list="item.url ?[item]:[]"
                                        :on-success="onSuccessUpload"
                                        :limit="2"
                                        :auto-upload='true'
                                        :data="fileType"
                                        :with-credentials='true'
                                        >
                                        <div class="imgText" @click="openImage(item,index)">选择图片</div>
                                    </el-upload>
                                </div>
                                <div class="formInput">
                                    <el-form size="mini" label-width="80px" 
                                        :model="item" :rules="comProductRules"
                                    >
                                        <el-form-item label="平台:" prop="platformid">
                                            <el-select 
                                                v-model="item.platformid"
                                                style="width:140px;margin-right:10px"
                                                @change="selectPlatformid(item.platformid,index)"
                                                >
                                                <el-option 
                                                    v-for="item in devSign"                        
                                                    :key="item.key"
                                                    :label="item.label"
                                                    :value="item.value"
                                                    >
                                                </el-option>
                                            </el-select>  
                                            <el-select 
                                                v-model="item.platformsiteid" 
                                                style="width:140px"
                                                >
                                                <el-option 
                                                    v-for="isItem in item.platforms"                        
                                                    :key="isItem.id"
                                                    :label="isItem.name"
                                                    :value="isItem.id"
                                                    >
                                                </el-option>
                                            </el-select>  
                                        </el-form-item>
                                        <el-form-item label="ASIN:" prop="xsin">
                                            <el-input v-model="item.xsin"> {{item.xsin}}</el-input>
                                        </el-form-item>
                                        <el-form-item label="售价:" prop="price">
                                            <el-input-number  :controls='false' v-model="item.price" type='number' style="width:290px"> {{item.price}}</el-input-number>
                                        </el-form-item>
                                    
                                        <el-form-item label="日销量:" prop="recentsalesvolume">
                                            <el-input-number :controls='false'  v-model="item.recentsalesvolume" style="width:290px">{{item.recentsalesvolume}}</el-input-number >
                                        </el-form-item>
                                    
                                        <el-form-item label="备注:">
                                            <el-input v-model="item.note">{{item.note}}</el-input>
                                        </el-form-item>
                                    </el-form>
                                </div>
                            </div>
                            
                        </el-col>
                        <el-col :span ='1' class="iconDelbox"><i class="el-icon-remove-outline" @click="delProductList(index)" v-if="index != 0"></i></el-col>
                    </div>
                </el-row>
            </div>
            <div class="addBottomButton">
                    <el-button type="primary" @click="addPageList" size="mini">添加竞品</el-button>
            </div>
        </div>
            <span class="mainTitle">
                基础信息
            </span>
                <el-form size="mini" label-width="140px" :model="ruleForm" :rules="rules" ref="ruleForm">
                    <el-row :gutter="150">
                        <el-col :span="10">
                            <el-form-item label="产品的尺寸:" prop="jpsize">
                                <el-input type="textarea" autosize v-model="ruleForm.jpsize"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="产品的净重:" prop="jpweight">
                                <el-input type="textarea" autosize v-model="ruleForm.jpweight"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="150">
                        <el-col :span="10">
                            <el-form-item label="产品的材质:" prop="jpmaterial">
                                <el-input type="textarea" autosize  v-model="ruleForm.jpmaterial"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="产品的颜色:" prop="jpcolor">
                                <el-input type="textarea" autosize  v-model="ruleForm.jpcolor"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="150">
                        <el-col :span="10">
                            <el-form-item label="产品的工艺:" prop="jpprocess">
                                <el-input type="textarea" autosize  v-model="ruleForm.jpprocess"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="产品的规格参数:" prop="basicinformation">
                                <el-input type="textarea" autosize  v-model="ruleForm.basicinformation"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <span class="mainTitle">
                        竞品结论
                    </span>
                    <el-row :gutter="150">
                        <el-col :span="10">
                            <el-form-item label="竞品优势功能:" prop="advantagefunction">
                                <el-input type="textarea" autosize  v-model="ruleForm.advantagefunction"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="竞品缺陷功能:" prop="defectfeature">
                                <el-input type="textarea" autosize  v-model="ruleForm.defectfeature"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="150">
                        <el-col :span="10">
                            <el-form-item label="产品使用场景:" prop="usagescenarios">
                                <el-input type="textarea" autosize  v-model="ruleForm.usagescenarios"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="产品目标人群:" prop="usecrowd">
                                <el-input type="textarea" autosize  v-model="ruleForm.usecrowd"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="150">
                        <el-col :span="10">
                            <el-form-item label="产品定位:" prop="jppositioning">
                                <el-input type="textarea" autosize  v-model="ruleForm.jppositioning"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="产品排名:" prop="jpranking">
                                <el-input type="textarea" autosize  v-model="ruleForm.jpranking"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="150">
                        <el-col :span="10">
                            <el-form-item label="产品开发调整点:" prop="jpadjustmentpoint">
                                <el-input type="textarea" autosize  v-model="ruleForm.jpadjustmentpoint"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="备注:" prop="note">
                                <el-input type="textarea" autosize  v-model="ruleForm.note"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div class="bottomButton">
                    <el-button type="primary" @click="submitForm('ruleForm')" size="mini">保存</el-button>
                    <el-button @click="resetForm('ruleForm')" size="mini">取消</el-button>
                </div>
        </div>
</template>
<script>
import { getPlatformSiteByPlatformName,competingProduct } from '@/api/user.js'
import { upload_file } from '@/utils/files'
export default {
    name:'comNewsEdit',
    components:{
        
    },
    data(){
        return {
            platforms:[
                {
                    name: 'US',
                    key: 27,
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
            action:upload_file,
            fileType:{
                fileType:102
            },
            pageImageIndex:'',
            ruleForm:{
                advantagefunction:'',
                jpsize:'',
                jpweight:'',
                basicinformation:'',
                jpmaterial:'',
                jpprocess:'',
                jpcolor:'',
                defectfeature:'',
                usagescenarios:'',
                usecrowd:'',
                jppositioning:'',
                jpranking:'',
                jpadjustmentpoint:'',
                note:'',
            },
            rules: {
                advantagefunction: [
                    { required: true, message: '请输入优势功能', trigger: 'blur' },
                ],
                jpsize: [
                    { required: true, message: '请输入产品尺寸', trigger: 'blur' },
                ],
                jpweight: [
                    { required: true, message: '请输入产品净重', trigger: 'blur' },
                ],
                basicinformation: [
                    { required: true, message: '请输入产品规格参数', trigger: 'blur' },
                ],
                jpmaterial: [
                    { required: true, message: '请输入产品材质', trigger: 'blur' },
                ],
                jpprocess: [
                    { required: true, message: '请输入产品工艺', trigger: 'blur' },
                ],
                jpcolor: [
                    { required: true, message: '请输入产品颜色', trigger: 'blur' },
                ],
                defectfeature: [
                    { required: true, message: '请输入产品缺陷功能', trigger: 'blur' },
                ],
                usagescenarios: [
                    { required: true, message: '请输入产品使用场景', trigger: 'blur' },
                ],
                usecrowd: [
                    { required: true, message: '请输入产品目标人群', trigger: 'blur' },
                ],
                jppositioning: [
                    { required: true, message: '请输入产品定位', trigger: 'blur' },
                ],
                jpranking: [
                    { required: true, message: '请输入产品排名', trigger: 'blur' },
                ],
                jpadjustmentpoint: [
                    { required: true, message: '请输入产品确定开发调整点', trigger: 'blur' },
                ],
                note: [
                    { required: true, message: '请输入产品备注', trigger: 'blur' },
                ],
            },
            comProductRules:{
                platformid: [
                    { required: true, message: '请输入站点', trigger: 'blur' },
                ],
                xsin: [
                    { required: true, message: '请输入ASIN', trigger: 'blur' },
                ],
                price: [
                    { required: true, message: '请输入售价', trigger: 'blur' },
                ],
                recentsalesvolume: [
                    { required: true, message: '请输入日销量', trigger: 'blur' },
                ],
            },
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
        }
    },
    props: {
        comNewsDetailList:{
            type:Object,
            default:() => {}
        }
    },
    // computed:{
    //     platformsList(index){
    //         return this.comNewsDetailList.competingproducts[index].platforms
    //     }
    // },
    // watch:{
    //     platformsList:{
    //         handler:function(val){
    //           if(val){
    //             this.getTableList(val)
    //           }
    //       },
    //       deep:true
    //     }
        
    // },
    mounted(){
        this.getDetailPage()
    },
    methods:{
        selectPlatformid(val,index){
            this.comNewsDetailList.competingproducts[index].platformsiteid = ''
            let countryList = this.devSign.filter(item => {
                return item.value == val
            })
            let params = {
                platformName:countryList[0].label
            }
            getPlatformSiteByPlatformName(params).then(res => {
                this.$nextTick(() => {
                    this.comNewsDetailList.competingproducts[index].platforms = res.data
                })     
            })
        },
        delProductList(index){
            this.comNewsDetailList.competingproducts.splice(index,1)
        },
        addPageList(){
            this.comNewsDetailList.competingproducts.push({
                     id:'',
                     platformid:'',
                     platformsiteid:'',
                     xsin:'',
                     price:'',
                     recentsalesvolume:'',
                     note:'',
                     pictureuri:'',
            })
        },
        getDetailPage(){
            this.comNewsDetailList.competingproducts.forEach(item => {
                item.platforms = this.platforms
            })
            this.ruleForm = {
                advantagefunction:this.comNewsDetailList.advantagefunction,
                jpsize:this.comNewsDetailList.jpsize,
                jpweight:this.comNewsDetailList.jpweight,
                basicinformation:this.comNewsDetailList.basicinformation,
                jpmaterial:this.comNewsDetailList.jpmaterial,
                jpprocess:this.comNewsDetailList.jpprocess,
                jpcolor:this.comNewsDetailList.jpcolor,
                defectfeature:this.comNewsDetailList.defectfeature,
                usagescenarios:this.comNewsDetailList.usagescenarios,
                usecrowd:this.comNewsDetailList.usecrowd,
                jppositioning:this.comNewsDetailList.jppositioning,
                jpranking:this.comNewsDetailList.jpranking,
                jpadjustmentpoint:this.comNewsDetailList.jpadjustmentpoint,
                note:this.comNewsDetailList.note,
            }
        },
      resetForm() {
            // this.$refs[formName].resetFields();
            this.$emit('closeEdit','false')
        },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
                developmentId:this.$route.params.developmentId,
                productId:this.$route.params.productId,
                productCountryId:this.$route.params.productCountryId,
                development:{
                    id:this.$route.params.developmentId,//开发id
                    jpsize:this.ruleForm.jpsize,//产品的尺寸
                    jpweight:this.ruleForm.jpweight,//产品的净重
                    basicinformation:this.ruleForm.basicinformation,//产品的规格参数
                    jpmaterial:this.ruleForm.jpmaterial,//产品的材质
                    jpprocess:this.ruleForm.jpprocess,//产品的工艺
                    jpcolor:this.ruleForm.jpcolor,//产品的颜色
                    advantagefunction:this.ruleForm.advantagefunction,//竞品结论--竞品优势功能
                    defectfeature:this.ruleForm.defectfeature,//竞品结论--竞品缺陷功能
                    usagescenarios:this.ruleForm.usagescenarios,//竞品结论--产品使用场景
                    usecrowd:this.ruleForm.usecrowd,//竞品结论--产品目标人群
                    jppositioning:this.ruleForm.jppositioning,//竞品结论--产品定位
                    jpadjustmentpoint:this.ruleForm.jpadjustmentpoint,//竞品结论--产品确定开发调整点
                    note:this.ruleForm.note,//竞品结论--备注
                    jpranking:this.ruleForm.jpranking//竞品结论--产品排名
                },
            }
             params.competingproducts = this.comNewsDetailList.competingproducts.map(res => {
                 return {
                     id:res.id,
                     platformid:res.platformid,
                     platformsiteid:res.platformsiteid,
                     xsin:res.xsin,
                     price:res.price,
                     recentsalesvolume:res.recentsalesvolume,
                     note:res.note,
                     pictureuri:typeof(res.pictureuri) == 'string' ?res.pictureuri : res.pictureuri[0],
                 }
             })
            competingProduct(params).then(res => {
                if(res.code == 200){
                    this.$message.success('保存成功')
                    this.$emit('closeEdit','false')
                }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      onSuccessUpload (res, file, fileList) {
            if(fileList.length > 1){
                fileList[0].url = fileList[1].url
                fileList[0].name = fileList[1].name
                fileList[0].pictureuri = res.data
                fileList.splice(1)
            }else if(fileList.length == 1) {
                this.comNewsDetailList.competingproducts[this.pageImageIndex] = {
                    name:fileList[0].name,
                    url:fileList[0].url,
                    pictureuri:res.data[0],
                }
            }
        },
        beforeUpload(pageList,i){
            this.pageList = pageList
            this.pageListIndex = i
        },
        openImage(item,index){
            this.pageImageIndex = index
        }
    }
}
</script>
<style lang="scss" scoped>
.mainTitle{
    color: #409EFF;
    margin: 10px 0;
    display: inline-block;
    font-weight: bold;
}
.mainImage{
    margin-left: 55px;
    // border: 1px solid #EBEEF5;
    border-top: none;
    ::v-deep .el-form-item{
        margin-bottom:5px !important;
    }
    .iconDelbox{
        display: inline-block;
        margin-top: 15px;
        .el-icon-remove-outline{
            margin-top: 30px;
            color: red;
            font-size: 15px;
        }
    }
    .formInput{
        margin-top: 23px;
        width: 370px;
        margin-left: 38px
    }
    .productTitle{
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-bottom: 1px solid #aaaaaa;
        font-weight: bold;
    }
    ::v-deep.imgDetail{
        border: 1px solid #aaaaaa !important;
        height: 250px;
        margin-top: 45px;
        margin-right: 15px;
        // position:absolute;
        .imgbox{
            display: flex;
            .uploadBox{
                margin: 15px 0px 0px 15px
            }
        }
        .uploadImage{
            // margin-top: 15px;
        }
        .el-upload--picture-card {
            display: block !important;
            border: 1px solid #c0ccda;
            width: 148px !important;
            height: 20px !important;
            // position: relative;
            // top: 1px;
        }
        .imgText{
            position: relative;
            top: -64px;
        }
    }

}
.bottomButton{
    width: 100%;
    height: 30px;   
    display: flex;
    justify-content: flex-end;
}
.addBottomButton{
    width: 100%;
    height: 30px;   
    display: flex;
    justify-content: flex-end;
    margin-right: 20px;
    margin-top: 20px;
}
    
</style>