<template>
    <div>
        <div>
            <span class="mainTitle">
                竞品信息
            </span>
            <div class="mainImage">
                <div v-for="item in productsList" :key="item.key" >
                    <div>
                        <div class="productTitle">竞品{{item.key}}</div>
                        <div>
                            <el-row>
                                <el-col :span="12" class="imgDetail">
                                    <imgUpload @inputImg='putImgList' :value='item.imageList' :showButton='false' :imageKey="item.key"></imgUpload> 
                                </el-col>
                                <el-col :span="10" class="formInput">
                                    <el-form size="mini" label-width="120px">
                                        <el-form-item label="平台:">
                                            <el-input></el-input>
                                        </el-form-item>
                                        <el-form-item label="ASIN:">
                                            <el-input ></el-input>
                                        </el-form-item>
                                        <el-form-item label="售价:">
                                            <el-input></el-input>
                                        </el-form-item>
                                    
                                        <el-form-item label="日销量:">
                                            <el-input ></el-input>
                                        </el-form-item>
                                    
                                        <el-form-item label="备注:">
                                            <el-input></el-input>
                                        </el-form-item>
                                    </el-form>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <div>
            <span class="mainTitle">
                基础信息
            </span>
            <div>
                <el-form size="mini" label-width="120px">
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="产品的尺寸:">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="产品的净重:">
                                <el-input ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="产品的材质:">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="产品的颜色:">
                                <el-input ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="产品的工艺:">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="产品的规格参数:">
                                <el-input ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                
            </div>

        </div>
        <div>
            <span class="mainTitle">
                竞品结论
            </span>
            <div>
                <el-form size="mini" label-width="120px" :model="ruleForm" :rules="rules" ref="ruleForm">
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="竞品优势功能:" prop="productAdvantage">
                                <el-input v-model="ruleForm.productAdvantage"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="竞品缺陷功能:">
                                <el-input ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="产品使用场景:">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="产品目标人群:">
                                <el-input ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="产品定位:">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="产品排名:">
                                <el-input ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="产品开发调整点:">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="备注:">
                                <el-input ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>
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
                productAdvantage:''
            },
            rules: {
                productAdvantage: [
                    { required: true, message: '请输入优势功能', trigger: 'blur' },
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
    methods:{
        putImgList(val,key){
          this.productsList[key-1].imageList = val
      },
      resetForm(formName) {
            this.$refs[formName].resetFields();
            this.$emit('closeEdit','false')
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
    
</style>