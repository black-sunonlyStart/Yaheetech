<template>
    <div>
        <div>
            <span class="mainTitle">
                竞品信息
            </span>
            <div class="mainImage">
                <div v-for="(item, index) in comNewsDetailList.competingproducts" :key="item.key" >
                    <div>
                        <div class="productTitle">竞品{{index + 1}}</div>
                        <div>
                            <el-row>
                                <el-col :span="12" class="imgDetail">
                                    <imgUpload @inputImg='putImgList' :value="item.showImgUrl ? [item.showImgUrl] : []" :showButton='false' :imageKey="item.key"></imgUpload> 
                                </el-col>
                                <el-col :span="10" class="formInput">
                                    <el-form size="mini" label-width="120px">
                                        <el-form-item label="平台:">
                                            <el-input v-model="item.platformid">{{item.platformid}}{{item.platformsiteid}}</el-input>
                                        </el-form-item>
                                        <el-form-item label="ASIN:">
                                            <el-input v-model="item.xsin"> {{item.xsin}}</el-input>
                                        </el-form-item>
                                        <el-form-item label="售价:">
                                            <el-input v-model="item.price"> {{item.price}}</el-input>
                                        </el-form-item>
                                    
                                        <el-form-item label="日销量:">
                                            <el-input v-model="item.recentsalesvolume">{{item.recentsalesvolume}}</el-input>
                                        </el-form-item>
                                    
                                        <el-form-item label="备注:">
                                            <el-input v-model="item.note">{{item.note}}</el-input>
                                        </el-form-item>
                                    </el-form>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
            </div>
            <div class="addBottomButton">
                    <el-button type="primary" @click="addPageList" size="mini">添加竞品</el-button>
            </div>
            
        </div>
            <span class="mainTitle">
                基础信息
            </span>
                <el-form size="mini" label-width="140px" :model="ruleForm" :rules="rules" ref="ruleForm">
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="产品的尺寸:" prop="jpsize">
                                <el-input v-model="ruleForm.jpsize"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="产品的净重:" prop="jpweight">
                                <el-input v-model="ruleForm.jpweight"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="产品的材质:" prop="jpmaterial">
                                <el-input v-model="ruleForm.jpmaterial"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="产品的颜色:" prop="jpcolor">
                                <el-input v-model="ruleForm.jpcolor"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="产品的工艺:" prop="jpprocess">
                                <el-input v-model="ruleForm.jpprocess"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="产品的规格参数:" prop="basicinformation">
                                <el-input v-model="ruleForm.basicinformation"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <span class="mainTitle">
                        竞品结论
                    </span>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="竞品优势功能:" prop="advantagefunction">
                                <el-input v-model="ruleForm.advantagefunction"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="竞品缺陷功能:" prop="defectfeature">
                                <el-input v-model="ruleForm.defectfeature"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="产品使用场景:" prop="usagescenarios">
                                <el-input v-model="ruleForm.usagescenarios"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="产品目标人群:" prop="usecrowd">
                                <el-input v-model="ruleForm.usecrowd"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="产品定位:" prop="jppositioning">
                                <el-input v-model="ruleForm.jppositioning"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="产品排名:" prop="jpranking">
                                <el-input v-model="ruleForm.jpranking"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="产品开发调整点:" prop="jpadjustmentpoint">
                                <el-input v-model="ruleForm.jpadjustmentpoint"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="备注:" prop="note">
                                <el-input v-model="ruleForm.note"></el-input>
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
 import imgUpload from '@/components/uploadImg.vue'
export default {
    name:'comNewsEdit',
    components:{
        imgUpload
    },
    data(){
        return {
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
            productsList:[
               {
                   image:'我承认我是一个图片',
                   text:'我是文字我不骗人',
                   dirction:'那我是谁',
                   key:1,
                   imageList:[],
               },
               {
                   image:'我承认我是一个图片',
                   text:'我是文字我不骗人',
                   dirction:'那我是谁',
                   key:2,
                   imageList:[],
               },
               {
                   image:'我承认我是一个图片',
                   text:'我是文字我不骗人',
                   dirction:'那我是谁',
                   key:3,
                   imageList:[],
               },
           ] 
        }
    },
    props: {
        comNewsDetailList:{
            type:Object,
            default:() => {}
        }
    },
    mounted(){
        this.getDetailPage()
    },
    methods:{
        addPageList(){
            this.comNewsDetailList.competingproducts.push({

            })
        },
        getDetailPage(){
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
    putImgList(val,key){
          this.productsList[key-1].imageList = val
      },
      resetForm(formName) {
            this.$refs[formName].resetFields();
            this.$emit('closeEdit','false')
        },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
}
</script>
<style lang="scss" scoped>
.mainTitle{
    color: #409EFF;
    margin: 10px 0;
    display: inline-block;
}
.mainImage{
    border: 1px solid #EBEEF5;
    border-top: none;
    ::v-deep .el-form-item{
        margin-bottom:5px !important;
    }
    .formInput{
        margin-top: 35px;
    }
    .productTitle{
        height: 40px;
        line-height: 40px;
        text-align: center;
        border: 1px solid #EBEEF5;
    }
    .imgDetail{
        border-right: 1px solid #EBEEF5 !important;
        min-height: 236px;
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