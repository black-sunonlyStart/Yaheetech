<template>
    <div>
         <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm" size="mini">
             <el-row>
                 <el-col :span="10">
                     <el-form-item label="产品类型:" prop="productType">
                        <el-radio-group v-model="ruleForm.productType">
                            <el-radio :label="3">普通/多属性产品</el-radio>
                            <el-radio :label="6">物理捆绑产品</el-radio>
                        </el-radio-group>
                    </el-form-item>
                 </el-col>
             </el-row>
             <el-row>
                 <el-col :span="5">
                    <el-form-item label="产品尺寸:" prop="productSizeL">
                        <div class="productSizeW">
                            <el-input placeholder="请输入内容" v-model="ruleForm.productSizeL">
                                <template slot="append">长(cm)</template>
                            </el-input>
                        </div>
                    </el-form-item>
                </el-col>
                 <el-col :span="3">
                    <el-form-item  prop="productSizeW" label-width="15px">      
                        <div class="productSizeW">
                            <el-input placeholder="请输入内容" v-model="ruleForm.productSizeW">
                                <template slot="append">宽(cm)</template>
                            </el-input>
                        </div>
                    </el-form-item>
                </el-col>
                 <el-col :span="3">
                    <el-form-item  prop="productSizeH" label-width="15px">      
                        <div class="productSizeW">
                            <el-input placeholder="请输入内容" v-model="ruleForm.productSizeH">
                                <template slot="append">高(cm)</template>
                            </el-input>
                        </div>
                    </el-form-item>
                </el-col>
             </el-row>
             <el-row>
                 <el-col :span="5">
                    <el-form-item label="包装尺寸(发货用):" prop="packageSizeL">
                        <div class="productSizeW">
                            <el-input placeholder="请输入内容" v-model="ruleForm.packageSizeL">
                                <template slot="append">长(cm)</template>
                            </el-input>
                        </div>
                    </el-form-item>
                </el-col>
                 <el-col :span="3">
                    <el-form-item  prop="packageSizeW" label-width="15px">      
                        <div class="productSizeW">
                            <el-input placeholder="请输入内容" v-model="ruleForm.packageSizeW">
                                <template slot="append">宽(cm)</template>
                            </el-input>
                        </div>
                    </el-form-item>
                </el-col>
                 <el-col :span="3">
                    <el-form-item  prop="packageSizeH" label-width="15px">      
                        <div class="productSizeW">
                            <el-input placeholder="请输入内容" v-model="ruleForm.packageSizeH">
                                <template slot="append">高(cm)</template>
                            </el-input>
                        </div>
                    </el-form-item>
                </el-col>
                 <el-col :span="2">
                    <el-form-item  prop="packageSizeH" label-width="15px">      
                        <el-select 
                            v-model="ruleForm.sizeRules"
                            placeholder="请选择"
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
                 <el-col :span="5">
                    <el-form-item label="外箱尺寸(装柜用):" prop="outerBoxSizeL">
                        <div class="productSizeW">
                            <el-input placeholder="请输入内容" v-model="ruleForm.outerBoxSizeL">
                                <template slot="append">长(cm)</template>
                            </el-input>
                        </div>
                    </el-form-item>
                </el-col>
                 <el-col :span="3">
                    <el-form-item  prop="packageSizeW" label-width="15px">      
                        <div class="productSizeW">
                            <el-input placeholder="请输入内容" v-model="ruleForm.outerBoxSizeW">
                                <template slot="append">宽(cm)</template>
                            </el-input>
                        </div>
                    </el-form-item>
                </el-col>
                 <el-col :span="3">
                    <el-form-item  prop="packageSizeH" label-width="15px">      
                        <div class="productSizeW">
                            <el-input placeholder="请输入内容" v-model="ruleForm.outerBoxSizeH">
                                <template slot="append">高(cm)</template>
                            </el-input>
                        </div>
                    </el-form-item>
                </el-col>
                 <el-col :span="2">
                    <el-form-item  prop="outerBoxSizeRules" label-width="15px">      
                        <el-select 
                            v-model="ruleForm.outerBoxSizeRules"
                            placeholder="请选择"
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
                 <el-col :span="5">
                    <el-form-item  prop="containersNumber" label="可装货柜数量：">      
                        <el-select 
                            v-model="ruleForm.containersNumber"
                            placeholder="请选择"
                            >
                            <el-option 
                                v-for="item in containersType"                        
                                :key="item.key"
                                :label="item.label"
                                :value="item.value"
                                >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item  prop="outerBoxNum" label-width="15px">      
                        <div class="productSizeW">
                            <el-input placeholder="请输入内容" v-model="ruleForm.outerBoxNum">
                                <template slot="append">个/柜</template>
                            </el-input>
                        </div>
                    </el-form-item>
                </el-col>
             </el-row>
             <el-row>
                 <el-col :span="5">
                    <el-form-item  prop="proNetWeight" label="净重:">      
                        <div class="productSizeW">
                            <el-input placeholder="请输入内容" v-model="ruleForm.proNetWeight">
                                <template slot="append">Kg</template>
                            </el-input>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item  prop="outerBoxNum" label-width="15px">      
                        <div class="productSizeW">
                            <el-input placeholder="请输入内容" v-model="ruleForm.proNetWeight" disabled>
                                <template slot="append">Kg</template>
                            </el-input>
                        </div>
                    </el-form-item>
                </el-col>
             </el-row>
             <el-row>
                 <el-col :span="5">
                    <el-form-item  prop="proGrossWeight" label="毛重:">      
                        <div class="productSizeW">
                            <el-input placeholder="请输入内容" v-model="ruleForm.proGrossWeight">
                                <template slot="append">Kg</template>
                            </el-input>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item label-width="15px">      
                        <div class="productSizeW">
                            <el-input placeholder="请输入内容" v-model="ruleForm.proGrossWeight" disabled>
                                <template slot="append">Kg</template>
                            </el-input>
                        </div>
                    </el-form-item>
                </el-col>
             </el-row>
             <el-row>
                 <el-col :span="5">
                    <el-form-item  prop="proOuterBoxWeight" label="外箱重量:">      
                        <div class="productSizeW">
                            <el-input placeholder="请输入内容" v-model="ruleForm.proOuterBoxWeight">
                                <template slot="append">Kg</template>
                            </el-input>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item  label-width="15px">      
                        <div class="productSizeW">
                            <el-input placeholder="请输入内容" v-model="ruleForm.proOuterBoxWeight" disabled>
                                <template slot="append">Kg</template>
                            </el-input>
                        </div>
                    </el-form-item>
                </el-col>
             </el-row>
             <el-row>
                 <el-col :span="5">
                    <el-form-item  prop="packingMethod" label="包装方式:">      
                        <el-select 
                            v-model="ruleForm.packingMethod"
                            placeholder="请选择"
                            >
                            <el-option 
                                v-for="item in packingMethodType"                        
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
                 <el-col :span="5">
                    <el-form-item  prop="casesNumber" label="装箱数:">      
                        <div class="productSizeW">
                            <el-input placeholder="请输入内容" v-model="ruleForm.casesNumber" >
                                <template slot="append">个/箱</template>
                            </el-input>
                        </div>
                    </el-form-item>
                </el-col>
             </el-row>
             <el-row>
                 <el-col :span="24">
                    <el-form-item  prop="tableData" label="多箱清单:">      
                         <el-table
                            :data="ruleForm.tableData"
                            border
                            style="width: 100%">
                            <el-table-column
                                prop="date"
                                label="序号"
                            >
                            <template slot-scope="scope">
                                第{{scope.$index + 1}}箱        
                            </template>
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="包装后 - 长(cm)"
                            >
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.name"></el-input>      
                            </template>
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="包装后 - 宽(cm)">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.date"></el-input>      
                            </template>
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="包装后 - 高(cm)">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.address"></el-input>      
                            </template>
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="包装后 - 重量(Kg)">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.address"></el-input>      
                            </template>
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="操作">
                                <template slot-scope="scope">
                                    <el-button
                                    @click.native.prevent="deleteRow(scope.$index, ruleForm.tableData)"
                                    type="text"
                                    size="small">
                                    移除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="tableText" @click="addTableList">
                            添加一箱
                        </div>
                    </el-form-item>
                </el-col>
             </el-row>
             <el-row>
                 <el-col :span="15">
                     <el-form-item  label="尺码:" prop="productSize">      
                        <div class="productSizeText">
                            <div class="productSizeInput">
                                <el-input  v-model="ruleForm.productSize"></el-input>
                            </div>
                            <div>
                                如要开发更多尺码, 请在保存产品信息以后，在此产品基础上选择开发其它尺码!
                            </div>
                        </div>
                    </el-form-item>
                 </el-col>
             </el-row>
             <el-row>
                 <el-col :span="15">
                     <el-form-item  label="颜色:" prop="productColor">      
                        <el-checkbox-group v-model="ruleForm.productColor">
                            <el-checkbox :label="item" v-for="item in checkList" :key="item"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                 </el-col>
             </el-row>
             <el-row>
                 <el-col :span="24">
                     <el-form-item  label="销售(多)属性:" prop="productColor">      
                        <el-table
                            :data="ruleForm.tableData"
                            border
                            style="width: 100%">
                            <el-table-column
                                prop="date"
                                label="开发状态"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="date"
                                label="SKU"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="date"
                                label="开发属性"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="date"
                                label="关联SKU"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="date"
                                label="是否上架"
                            >
                            </el-table-column>
                        </el-table>
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
    name:'pordSizeAttrEdit',
    data(){
        return {
            ruleForm:{
                productType:3,
                productSizeL:'',
                productSizeW:'',
                productSizeH:'',
                packageSizeL:'',
                packageSizeW:'',
                packageSizeH:'',
                outerBoxSizeH:'',
                outerBoxSizeW:'',
                outerBoxSizeL:'',
                sizeRules:'',
                outerBoxSizeRules:'',
                containersNumber:'',
                outerBoxNum:'',
                proNetWeight:'',
                proGrossWeight:'',
                proOuterBoxWeight:'',
                packingMethod:'',
                casesNumber:'',
                productSize:'',
                productColor:[],
                tableData: [
                        {
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                        }
                    ]
            },
            rules:{
                productType: [{ required: true, message: '请选择产品类型', trigger: 'blur' }],
                productSizeL: [{ required: true, message: '请添加产品尺寸', trigger: 'blur' }],
                productSizeW: [{ required: true, message: '请添加产品尺寸', trigger: 'blur' }],
                productSizeH: [{ required: true, message: '请添加产品尺寸', trigger: 'blur' }],
                packageSizeL: [{ required: true, message: '请添加包装尺寸', trigger: 'blur' }],
                packageSizeW: [{ required: true, message: '请添加包装尺寸', trigger: 'blur' }],
                packageSizeH: [{ required: true, message: '请添加包装尺寸', trigger: 'blur' }],
                outerBoxSizeL: [{ required: true, message: '请添加外箱尺寸', trigger: 'blur' }],
                outerBoxSizeW: [{ required: true, message: '请添加外箱尺寸', trigger: 'blur' }],
                outerBoxSizeH: [{ required: true, message: '请添加外箱尺寸', trigger: 'blur' }],
                sizeRules: [{ required: true, message: '请选择尺寸规则', trigger: 'blur' }],
                outerBoxSizeRules: [{ required: true, message: '请选择尺寸规则', trigger: 'blur' }],
                containersNumber: [{ required: true, message: '请选择货柜体积', trigger: 'blur' }],
                outerBoxNum: [{ required: true, message: '请输入货柜数量', trigger: 'blur' }],
                proNetWeight: [{ required: true, message: '请输入净重', trigger: 'blur' }],
                proGrossWeight: [{ required: true, message: '请输入毛重', trigger: 'blur' }],
                proOuterBoxWeight: [{ required: true, message: '请输入外箱重量', trigger: 'blur' }],
                packingMethod: [{ required: true, message: '请选择包装方式', trigger: 'blur' }],
                casesNumber: [{ required: true, message: '请输入集装箱数量', trigger: 'blur' }],
                tableData: [{ required: true, message: '请输入集装箱数量', trigger: 'blur' }],
                productSize: [{ required: true, message: '请填写商品尺码', trigger: 'blur' }],
                productColor: [{ required: true, message: '请选择产品颜色', trigger: 'blur' }],
            },
            devSign:[
                {
                    label: '规则立方体',
                    key: 1,
                    value: '规则立方体'
                },
                {
                    label: '不规则立方体',
                    key: 2,
                    value: '不规则立方体'
                },    
            ],
            containersType:[
                {
                    label: '散装',
                    key: 1,
                    value: '散装'
                },
                {
                    label: '集装箱(40HQ)',
                    key: 2,
                    value: '集装箱(40HQ)'
                },    
                {
                    label: '集装箱(45HQ)',
                    key: 3,
                    value: '集装箱(45HQ)'
                },    
                {
                    label: '集装箱(20GP)',
                    key: 4,
                    value: '集装箱(20GP)'
                },    
                {
                    label: '集装箱(40GP)',
                    key: 5,
                    value: '集装箱(40GP)'
                },    
            ],
            packingMethodType:[
                {
                    label: '单箱包装',
                    key: 1,
                    value: '单箱包装'
                },
                {
                    label: '多箱包装',
                    key: 2,
                    value: '多箱包装'
                }
            ],
            checkList:['黑色','黄色']
        }
    },
    methods: {
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      addTableList(){
          this.ruleForm.tableData.push({
              data:'',
              name:'',
              address:''
          })
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
    },
}
</script>
<style lang="scss" scoped>
.bottomButton{
    width: 100%;
    height: 30px;   
    display: flex;
    justify-content: flex-end;
}
.productSizeW{
        // width: 200px;
        // margin-right: 20px;
}
.productSizeText{
    display: flex;
    .productSizeInput{
        width: 200px;
        margin-right: 15px;
    }
}
.tableText{
    color:#409eff ;
    cursor: pointer;
}
</style>