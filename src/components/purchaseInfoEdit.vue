<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm" size="mini">
            <el-row>
                 <el-col :span="24">
                     <el-form-item label="样品采购前报价:" prop="samplePurchase">
                            <el-table
                                border
                                :data="ruleForm.samplePurTable"
                                style="width: 100%">
                                <el-table-column
                                    type="selection"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="name"
                                    label="采购开发"
                                    >
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.name"></el-input>      
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="address"
                                    label="最小起订量">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.name"></el-input>      
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="address"
                                    label="首单下单数量">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.name"></el-input>      
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="address"
                                    label="出厂价">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.name"></el-input>      
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="address"
                                    label="FOB价">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.name"></el-input>      
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="address"
                                    label="含税价">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.name"></el-input>      
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="address"
                                    label="杂费">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.name"></el-input>      
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="address"
                                    label="产品包装费">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.name"></el-input>      
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="address"
                                    label="采购成本
                                    净采购价+杂费+包装费">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.name"></el-input>      
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="address"
                                    label="交期">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.name"></el-input>      
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="address"
                                    label="装箱数量">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.name"></el-input>      
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
                 <el-col :span="24">
                     <el-form-item label="最终报价:" prop="samplePurchase">
                            <el-table
                                border
                                :data="ruleForm.finalOffer"
                                style="width: 100%">
                                <el-table-column
                                    prop="name"
                                    label="采购开发"
                                    >
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.name"></el-input>      
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="address"
                                    label="最小起订量">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.name"></el-input>      
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="address"
                                    label="首单下单数量">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.name"></el-input>      
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="address"
                                    label="出厂价(¥)">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.name"></el-input>      
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="address"
                                    label="FOB价(¥)">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.name"></el-input>      
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="address"
                                    label="含税价(¥)">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.name"></el-input>      
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="address"
                                    label="杂费(¥)">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.name"></el-input>      
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="address"
                                    label="产品包装费(¥)">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.name"></el-input>      
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="address"
                                    label="采购成本=
                                    净采购价+杂费+包装费(¥)">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.name"></el-input>      
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="address"
                                    label="交期(天)">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.name"></el-input>      
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="address"
                                    label="装箱数量(/箱)">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.name"></el-input>      
                                    </template>
                                </el-table-column>
                            </el-table>
                    </el-form-item>
                 </el-col>
             </el-row>
             <el-row>
                 <el-col :span="8">
                    <el-form-item label="样品购买价:" prop="purchasePrice">
                        <el-input v-model="ruleForm.purchasePrice">
                            <template slot="append">产品价格（RMB）</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item  prop="freight" label-width="15px">
                            <el-input v-model="ruleForm.freight">
                                <template slot="append">运费（RMB）</template>
                            </el-input>
                    </el-form-item>
                 </el-col>

                 <el-col :span="8">
                     <el-form-item label="含税价税点:" prop="taxPoint">
                         <div class="feeForOrderText">
                            <el-input v-model="ruleForm.taxPoint">
                                <template slot="append">%</template>
                            </el-input>
                         </div>
                     </el-form-item>
                 </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="下单返样品费:" prop="feeForOrdering">
                        <div class="feeForOrderText">
                            <el-input v-model="ruleForm.feeForOrdering">
                                <template slot="append">(RMB)</template>
                            </el-input>
                        </div>
                         
                     </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="海关退税率:" prop="feeForOrdering">
                        <div class="feeForOrderText">
                            <el-input v-model="ruleForm.feeForOrdering">
                                <template slot="append">%</template>
                            </el-input>
                         </div>
                     </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="返样品费详情备注:" prop="feeForOrdering">
                        <div class="feeForOrderText">
                            <el-input type="textarea" v-model="ruleForm.feeForOrdering">
                                <template slot="append">(RMB)</template>
                            </el-input>
                        </div>
                         
                     </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="品牌费:" prop="feeForOrdering">
                        <div class="feeForOrderText">
                            <el-input v-model="ruleForm.feeForOrdering">
                                <template slot="append">RMB</template>
                            </el-input>
                         </div>
                     </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="样品交期:" prop="deliveryDate">
                        <div class="feeForOrderText">
                            <el-date-picker
                                v-model="ruleForm.deliveryDate"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </div>   
                     </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="FOB报价品牌费:" prop="feeForOrdering">
                        <div class="feeForOrderText">
                            <el-input v-model="ruleForm.feeForOrdering">
                            <template slot="append">RMB</template>
                            </el-input>
                         </div>
                     </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="货好时间:" prop="goodTimeDate">
                        <div class="feeForOrderText">
                            <el-date-picker
                                v-model="ruleForm.goodTimeDate"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </div>   
                     </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="FOB头程费:" prop="feeForOrdering">
                        <div class="feeForOrderText">
                            <el-input v-model="ruleForm.feeForOrdering">
                                <template slot="append">RMB</template>
                            </el-input>
                        </div>
                     </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="货好时间详情备注:" prop="goodTimeDate"> 
                        <div class="feeForOrderText">
                            <el-input type="textarea" v-model="ruleForm.feeForOrdering">
                                <template slot="append">(RMB)</template>
                            </el-input>
                        </div>      
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
    name:'purchaseInfoEdit',
    data(){
        return {
            ruleForm:{
                goodTimeDate:'',
                deliveryDate:'',
                feeForOrdering:'',
                taxPoint:'',
                freight:'',
                purchasePrice:'',
                samplePurTable: [
                        {
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                        }
                    ],
                finalOffer: [
                        {
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                        }
                    ],
            },
            rules:{
                productType: [{ required: true, message: '请选择产品类型', trigger: 'blur' }],
                purchasePrice: [{ required: true, message: '请选择产品类型', trigger: 'blur' }],
                freight: [{ required: true, message: '请选择产品类型', trigger: 'blur' }],
            }
        }
    },
    methods:{
        addTableList(){
          this.ruleForm.samplePurTable.push({
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
.tableText{
    color:#409eff ;
    cursor: pointer;
}
.feeForOrderText{
    width: 392px;
}
</style>