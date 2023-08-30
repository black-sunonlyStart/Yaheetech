<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="mini">
            <!-- <el-form-item label="开发类型" prop="region">
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
            </el-form-item> -->
            <el-form-item label="开发场景" prop="scene">
                <el-select v-model="ruleForm.scene" class="option-input" placeholder="请选择" @change="selectScene" :disabled='closeComponent'>
                    <el-option-group
                        v-for="group in sceneOptions"
                        :key="group.label"
                        :label="group.label"
                        class="group-select"
                        >
                        <el-option
                            v-for="item in group.options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            v-show="!item.shwOption"
                            >
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
                        <el-input  v-model="ruleForm.inputRelation" @input="changeInputRelation" :disabled='closeComponent' ></el-input>
                    </div>
                    <div v-if="selectId" class="litterBox">
                        <div style="margin-right:10px">-</div>
                        <el-select 
                            v-model="ruleForm.selectRelation"
                            :disabled='showSelect'
                            @change="changeSelectRelation"
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
                        <el-input  v-model="ruleForm.skuid" :disabled='closeComponent'></el-input>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="产品系列:" prop="classCategoryIdArray">
                <el-cascader
                    style="width:220px"
                    v-model="ruleForm.classCategoryIdArray"
                    :options="patentCountry"
                    size="mini"
                    separator=' - '
                    :props="{ 
                        value:'seriesCategoryId',
                        label:'seriesCategoryName',
                        children:'classifyDefs'
                        }"
                    clearable
                    >
                </el-cascader> 
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
            <el-button v-track="{triggerType:'click',currentUrl: $route.path,behavior:'保存',businessCode:'开发类型/场景'}" type="primary" @click="submitForm('ruleForm')" size="mini" perkey='ERP.Product.ProductDev.SalesManEdit'>保存</el-button>
            <el-button v-track="{triggerType:'click',currentUrl: $route.path,behavior:'取消',businessCode:'开发类型/场景'}" @click="resetForm('ruleForm')" size="mini">取消</el-button>
        </div>
        <productTypeDialog ref='productTypeDialog' @putTreeDialogList='putTreeDialogList'></productTypeDialog>
    </div>
</template>
<script>
import { findProductByDevId,exploitType,getDevelopmentScenarios,atGetSeriesCategoryDef } from '@/api/user.js'
import productTypeDialog from '@/components/productDetail/productTypeDialog'
export default {
    name:'devScene',
    components:{
        productTypeDialog
    },
    data() {
      return {
          twoSecence:'',
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
                    label: '二次开发',
                    shwOption:true,
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
        patentCountry:[],
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
            { required: true, message: '请添加spuId', trigger: 'change' },
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
          classCategoryIdArray: [
            { required: true, message: '请选择产品系列', trigger: 'blur' }
            ],
        }
      };
    },
    computed:{
        showSelect(){
            if(this.$route.query.productCountryId){
                return true
            }else {
                return false
            }
        }
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
        //获取系列数据
        atGetSeriesCategoryDef().then(res => {
            res.data.forEach(item => {
                item.classifyDefs.forEach(list => {
                    list.seriesCategoryName = list.classifyDefName
                    list.seriesCategoryId = list.classifyDefId
                })
            })
            this.patentCountry = res.data
        })
          this.ruleForm = {
              region : this.productVoDetail.developmenttype,
              scene:this.productVoDetail.developmentscenarios == '11' || this.productVoDetail.developmentscenarios == '12' ? 11 : this.productVoDetail.developmentscenarios,
              classiFication:this.productVoDetail.categoryname,
              relation:this.productVoDetail.id ? '1':'2',
              inputRelation:this.productVoDetail.spuid,
              selectRelation:this.productVoDetail.id,
              skuid:this.productVoDetail.spu,
              classCategoryIdArray:this.productVoDetail.classCategoryIdArray,
              treeId:this.productVoDetail.categoryId
          }
          if(this.productVoDetail.developmentscenarios == 1){
              this.showRelation = false
          }
          if(this.productVoDetail.developmentscenarios){
              this.closeComponent = true
              this.selectScene(this.productVoDetail.developmentscenarios)
              this.changeInputRelation(this.ruleForm.inputRelation)
          }
      },
     async twoGetScene(){
         if(this.ruleForm.scene == 2 || this.ruleForm.scene == 3 ){
          let  twoParams = {
                developmentScenarios:this.ruleForm.scene,
                addDevelopmentId:this.ruleForm.inputRelation,
                associatedProductId:this.ruleForm.selectRelation
            }
        await getDevelopmentScenarios(twoParams).then(res => {
                if(res.data == 11 || res.data == 12){
                    this.$message({
                                    type: 'success', 
                                    message:'当前输入的关联产品为【二次开发】类型',
                                    offset:220
                                })

                    this.twoSecence = res.data
                }
            })
         }
      },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
                developmentId:this.$route.query.developmentId ? this.$route.query.developmentId:this.$route.query.developmentId  ,
                productId:this.$route.query.productId  ? this.$route.query.productId:this.$route.query.productId ,
                productCountryId:this.$route.query.productCountryId  ? this.$route.query.productCountryId:this.$route.query.productCountryId ,
                categoryId:this.ruleForm.treeId,
                // developmentType:this.ruleForm.region,
                developmentScenarios:this.twoSecence ? this.twoSecence : this.ruleForm.scene,
                addDevelopmentId:this.ruleForm.inputRelation,
                associatedProductId:this.ruleForm.selectRelation,
                addSPUId:this.ruleForm.skuid,
                seriesCategoryId: this.ruleForm.classCategoryIdArray[0],//类目系列
                classifyDefId: this.ruleForm.classCategoryIdArray[1],
            }
           
            this.$confirm('保存以后开发场景和关联场景不允许更改，请确认要继续保存？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        cancelButtonClass: 'btn-custom-cancel',
                        }).then(() => {
                            exploitType(params).then(res => {
                                if(res.code == 200){
                                    this.$message({
                                        type: 'success', 
                                        message:'数据保存成功',
                                        offset:220
                                    })
                                    this.$emit('closeEdit','false',res.data,params.developmentScenarios)
                                    this.$router.push({
                                        name:'productDetails',
                                        query:{
                                            developmentId:res.data.developmentId,
                                            productId:res.data.productId,
                                            productCountryId:res.data.productCountryId,
                                            developmentScenarios:params.developmentScenarios,
                                        }
                                    })
                                }
                        })
                }).catch(() => {
                return          
            });
            
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
            this.ruleForm.relation = '1'
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
                this.selectId = true
          } else if (val == 12){
              this.ruleForm.relation = '1'
            this.spuChange = true
          }
      },
      changeInputRelation(val){
          if(!val)return
          if(this.ruleForm.scene == 3){
              this.twoGetScene()
          }
          findProductByDevId({devId:val}).then(res => {
              this.spuSign = res.data
          })
      },
      changeSelectRelation(val){
          if(!val)return 
          if(this.ruleForm.scene == 2){
              this.twoGetScene()
          }
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
          .signText{
              color: #3366cc ;
              margin-left: 10px;
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
        ::v-deep.group-select{
            .el-select-group__title{
                line-height: 10px;
            }
        }
      .option-input{
          width: 420px;
      }
</style>