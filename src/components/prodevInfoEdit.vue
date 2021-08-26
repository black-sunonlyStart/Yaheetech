<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm" size="mini">
            <el-row>
                <el-col :span="10">
                    <el-form-item label="中文标题:">
                        <el-input v-model="ruleForm.chineseTitle"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="中文描述:" prop="chineseDescription">
                        <el-input v-model="ruleForm.chineseDescription"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="15">
                    <el-form-item label="供应商所在地:" prop="supplierLocation">
                        <el-select 
                            v-model="ruleForm.supplierLocation"
                            placeholder="请选择省份"
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
                            v-model="ruleForm.supplierLocation1"
                            placeholder="请选择城市"
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
                            v-model="ruleForm.supplierLocation2"
                            placeholder="请选择区域"
                            >
                            <el-option 
                                v-for="item in devSign"                        
                                :key="item.key"
                                :label="item.label"
                                :value="item.value"
                                >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="必要认证附件:">
                        <el-upload
                            class="upload-demo"
                            action="https://httpbin.org/post"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            multiple
                            :limit="3"
                            :on-exceed="handleExceed"
                            :file-list="ruleForm.fileList">
                            <el-button size="small" type="primary" style="margin-right:15px">选择文件</el-button>
                                <el-select 
                                    v-model="ruleForm.productMarket"
                                    placeholder="请选择文档所属市场"
                                    >
                                    <el-option 
                                        v-for="item in devSign"                        
                                        :key="item.key"
                                        :label="item.label"
                                        :value="item.value"
                                        >
                                    </el-option>
                                </el-select>
                            </el-upload>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="推荐认证附件:">
                        <el-upload
                            class="upload-demo"
                            action="https://httpbin.org/post"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            multiple
                            :limit="3"
                            :on-exceed="handleExceed"
                            :file-list="ruleForm.recommendFileList">
                            <el-button size="small" type="primary" style="margin-right:15px">选择文件</el-button>
                                <el-select 
                                    v-model="ruleForm.productMarket"
                                    placeholder="请选择文档所属市场"
                                    >
                                    <el-option 
                                        v-for="item in devSign"                        
                                        :key="item.key"
                                        :label="item.label"
                                        :value="item.value"
                                        >
                                    </el-option>
                                </el-select>
                            </el-upload>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="认证备注:" prop="certificationRemarks">
                        <el-input v-model="ruleForm.certificationRemarks"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="工厂提供的图片:" prop="recommendFileList">
                        <el-upload
                            class="upload-demo"
                            action="https://httpbin.org/post"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            multiple
                            :limit="3"
                            :on-exceed="handleExceed"
                            list-type="picture-card"
                            :file-list="ruleForm.recommendFileList">
                            <i class="el-icon-plus"></i>
                                <!-- <el-button size="small" type="primary" style="margin-right:15px">选择本地图片</el-button>
                                <el-button size="small" type="primary" style="margin-right:15px">清空图片</el-button> -->
                            </el-upload>
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
    name:'prodevInfoEdit',
    data(){
        return {
            ruleForm:{
                chineseTitle:'',
                chineseDescription:'',
                supplierLocation:'',
                supplierLocation1:'',
                supplierLocation2:'',
                productMarket:'',
                certificationRemarks:'',
                fileList:[
                    {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, 
                    {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
                    ],
                recommendFileList:[
                    {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, 
                    {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
                ],


            },
            rules:{
                chineseDescription: [{ required: true, message: '请填写描述信息', trigger: 'blur' }],
                supplierLocation: [{ required: true, message: '请选择供应商所在地', trigger: 'blur' }],
                certificationRemarks: [{ required: true, message: '请填写认证备注', trigger: 'blur' }],
                recommendFileList: [{ required: true, message: '请添加图片', trigger: 'blur' }],
            },
            devSign:[
                {
                    label: '成人',
                    key: 1,
                    value: '成人'
                },
                {
                    label: '儿童',
                    key: 2,
                    value: '儿童'
                },    
                {
                    label: '婴儿',
                    key: 3,
                    value: '婴儿'
                }, 
            ],
        }
    },
    methods:{
         handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            //文件点击事件
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file) {
            return this.$confirm(`确定移除 ${ file.name }？`);
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
        resetForm() {
                // this.$refs[formName].resetFields();
                this.$emit('closeEdit','false')
            }
    }
}
</script>
<style lang="scss" scoped>
.bottomButton{
    width: 100%;
    height: 30px;   
    display: flex;
    justify-content: flex-end;
}
</style>