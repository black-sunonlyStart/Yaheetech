<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="mini">
            <el-form-item label="开发类型" prop="region">
            <el-select 
                v-model="ruleForm.region"
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
            <el-form-item label="开发场景" prop="scene">
                <el-select v-model="ruleForm.scene " placeholder="请选择" @change="selectScene" :disabled='closeComponent'>
                    <el-option-group
                        v-for="group in sceneOptions"
                        :key="group.label"
                        :label="group.label">
                        <el-option
                            v-for="item in group.options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-option-group>
                </el-select>
            </el-form-item>
            <el-form-item label="关联产品" prop="relation" v-if="showRelation">
                <div >
                    <el-radio v-model="ruleForm.relation" label='1' :disabled='relationId'>产品开发ID</el-radio>
                    <el-radio v-model="ruleForm.relation" label='2' :disabled='spuChange'>SPU号</el-radio>
                </div>
            </el-form-item>
            <el-form-item  prop="inputRelation" v-if="showRelation && ruleForm.relation =='1'">
                <div class="relationBox">
                    <div class="inputLength" >
                        <el-input  v-model="ruleForm.inputRelation" @change="changeInputRelation" :disabled='closeComponent' ></el-input>
                    </div>
                    <div v-if="selectId" class="litterBox">
                        <div style="margin-right:10px">-</div>
                        <el-select 
                            v-model="ruleForm.selectRelation"
                            :disabled='closeComponent'
                            >
                            <el-option 
                                v-for="item in spuSign"                        
                                :key="item.id"
                                :label="item.id"
                                :value="item.id"
                                >
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </el-form-item>
            <el-form-item  prop="skuid" v-else-if="showRelation && ruleForm.relation =='2'">
                <div class="relationBox">
                    <div class="inputLength" >
                        <el-input  v-model="ruleForm.skuid"></el-input>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="所属分类" prop="classiFication" v-if="ruleForm.scene == 1 ">
                <div class="signClass">
                    <div class="signInput">
                        <div> {{ruleForm.classiFication}}</div>
                    </div>
                    <div class="signText" @click="openTypeDialog" >
                        重选分类
                    </div>
                </div>
            </el-form-item>   
        </el-form>
        <div class="bottomButton">
            <el-button type="primary" @click="submitForm('ruleForm')" size="mini">保存</el-button>
            <el-button @click="resetForm('ruleForm')" size="mini">取消</el-button>
        </div>
        <productTypeDialog ref='productTypeDialog' @putTreeDialogList='putTreeDialogList'></productTypeDialog>
    </div>
</template>
<script>
import { findProductByDevId,exploitType } from '@/api/user.js'
import productTypeDialog from '@/components/productTypeDialog'
export default {
    name:'devScene',
    components:{
        productTypeDialog
    },
    data() {
      return {
          relationId:false,
          spuChange:false,
          showRelation:true,
          sceneOptions: [{
          label: '全新开发',
            options:[
                        {
                            value: 1,
                            label: '开发新产品'
                        }, 
                        {
                            value: 2,
                            label: '开发新市场(国家)'
                        },
                        {
                            value: 3,
                            label: '开发新尺码(已有产品添加新尺码)'
                        },
                    ]
                }, 
            {
            label: '二次开发',
            options: 
            [
                {
                    value: 10,
                    label: '二次开发(存在PDC的老产品，重新打样/改善包装/找新供应商)'
                }, 
                {
                    value: 11,
                    label: '二次开发 - 市场(已有二次开发产品，开发其他市场)'
                }, 
                {
                    value: 12,
                    label: '二次开发 - 尺码(已有二次开发产品，开发其他尺码)'
                }, 
            ]
        }],
        devSign:[    
        {
          label: '零售',
          key: 1,
          value: 1
        },
        {
          label: '批发',
          key: 2,
          value: 2
        },
        ],
        selectId:false,
        closeComponent:false,
        spuSign:[],  
        ruleForm: {
          scene: '',
          region: '',
          relation:'',
          inputRelation:'',
          selectRelation:'',
          classiFication:''
        },
        rules: {
          region: [
            { required: true, message: '请选择开发类型', trigger: 'change' },
          ],
          skuid: [
            { required: true, message: '请添加skuId', trigger: 'change' },
          ],
          scene: [
            { required: true, message: '请选择开发场景', trigger: 'change' },
          ],
          relation: [
            { required: true, message: '请选择开发场景', trigger: 'change' },
          ],
          inputRelation: [
            { required: true, message: '请选择关联产品', trigger: 'change' },
          ],
          selectRelation: [
            { required: true, message: '请选择产品类别', trigger: 'change' },
          ],
          classiFication: [
            { required: true, message: '请选择产品类别', trigger: 'change' },
          ],
        }
      };
    },
    props:{
        productVoDetail:{
            type:Object,
            default:() => ({})
        }
    },
    mounted(){
        this.getDetailPage()
    },
    methods: {
        putTreeDialogList(treeVal,treeId){
            this.ruleForm.classiFication = treeVal
            this.ruleForm.treeId = treeId
        },
        openTypeDialog(){
            this.$refs.productTypeDialog.openDialog()
        },
      getDetailPage(){
          this.ruleForm = {
              region : this.productVoDetail.developmenttype,
              scene:this.productVoDetail.developmentscenarios,
              classiFication:this.productVoDetail.categoryname,
              relation:this.productVoDetail.id ? '1':'2',
              inputRelation:this.productVoDetail.spuid,
              selectRelation:this.productVoDetail.id,
          }
          if(this.productVoDetail.developmentscenarios == 1){
              this.showRelation = false
          }
          if(this.productVoDetail.developmentscenarios){
              this.closeComponent = true
              this.selectScene(this.productVoDetail.developmentscenarios)
          }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
                developmentId:this.$route.params.developmentId,
                productId:this.$route.params.productId,
                productCountryId:this.$route.params.productCountryId,
                categoryId:this.ruleForm.treeId,
                developmentType:this.ruleForm.region,
                developmentScenarios:this.ruleForm.scene,
                addDevelopmentId:this.ruleForm.inputRelation,
                associatedProductId:this.ruleForm.selectRelation,
                addSPUId:this.ruleForm.skuid,
            }
            exploitType(params).then(res => {
                if(res.code == 200){
                    this.$message({
                        type: 'success', 
                        message:'数据保存成功',
                        offset:220
                    })
                    this.$emit('closeEdit','false',res.data)
                    this.$router.push({
                        name:'productDetails',
                        params:{
                            developmentId:res.data.developmentId,
                            productId:res.data.productId,
                            productCountryId:res.data.productCountryId,
                        }
                    })
                }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.$emit('closeEdit','false')
      },
      selectScene(val){
          this.showRelation = true
          this.relationId = false
          this.spuChange = false
          this.selectId = false
          if(val == 1){
            this.showRelation = false
          } else if (val == 2){
            this.spuChange = true
            this.selectId = true
          } else if (val == 3){
               this.ruleForm.relation = '1'
            this.spuChange = true
          } else if (val == 10){
              this.ruleForm.relation = '2'
              this.relationId = true
              
          }else if (val == 11){
              this.ruleForm.relation = '1'
            this.spuChange = true
          } else if (val == 12){
              this.ruleForm.relation = '1'
            this.spuChange = true
          }
      },
      changeInputRelation(val){
          if(!val)return
          findProductByDevId({devId:val}).then(res => {
              this.spuSign = res.data
          })
      }
    }
}
</script>
<style lang="scss" scoped>
    ::v-deep.demo-ruleForm{
        .el-form-item {
            margin-bottom: 15px;
        }
    }
    .textSpeaing{
          margin-top: 15px;
      }
      .relationBox{
          display: flex;
        .inputLength{
          width: 200px;
        }
        .litterBox{
            margin: 0 10px;
            display: flex;
            margin-right: 10px;
        }
      }
      .signClass{
          display: flex;
          .signInput{
            //   width: 300px;
          }
          .signText{
              color: #3366cc ;
              margin-left: 10px;
            //   width: 300px;
            &:hover{
                cursor: pointer;
            }
          }
      }
      .bottomButton{
          width: 100%;
          height: 30px;
          display: flex;
          justify-content: flex-end;
      }
      .el-select-dropdown__wrap {
            max-height: 100% !important;
        }
      
</style>