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
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        list-type="picture-card"
                                        :file-list="item.url ?[item]:[]"
                                        :on-success="onSuccessUpload"
                                        :limit="2"
                                        :auto-upload='true'
                                        >
                                        <div class="imgText" @click="openImage(item,index)">选择图片</div>
                                    </el-upload>
                                </div>
                                <div class="formInput">
                                    <el-form size="mini" label-width="60px">
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
                                </div>
                            </div>
                            <div class="iconDelbox">111111</div>
                        </el-col>
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
export default {
    name:'comNewsEdit',
    components:{
        
    },
    data(){
        return {
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
            console.log(this.comNewsDetailList.competingproducts,'competingproducts')
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
      onSuccessUpload (res, file, fileList) {
            if(fileList.length > 1){
                fileList[0].url = fileList[1].url
                fileList[0].name = fileList[1].name
                fileList.splice(1)
            }else if(fileList.length == 1) {
                this.comNewsDetailList.competingproducts[this.pageImageIndex] = {
                    name:fileList[0].name,
                    url:fileList[0].url,
                }
            }
        },
        beforeUpload(pageList,i){
            console.log(111111)
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
}
.mainImage{
    margin-left: 55px;
    margin-top: 10px;
    // border: 1px solid #EBEEF5;
    border-top: none;
    ::v-deep .el-form-item{
        margin-bottom:5px !important;
    }
    .iconDelbox{
        display: inline-block;
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
        border-bottom: 1px solid #EBEEF5;
    }
    ::v-deep.imgDetail{
        border: 1px solid #EBEEF5 !important;
        height: 250px;
        margin-top: 15px;
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