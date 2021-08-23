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
                <el-select v-model="ruleForm.scene " placeholder="请选择" >
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
            <el-form-item label="关联产品" prop="relation">
                <div>
                    <el-radio v-model="ruleForm.relation" label="1">产品开发ID</el-radio>
                    <el-radio v-model="ruleForm.relation" label="2">SPU号</el-radio>
                </div>
            </el-form-item>
            <el-form-item  prop="inputRelation">
                <div class="relationBox">
                    <div class="inputLength">
                        <el-input  v-model="ruleForm.inputRelation"></el-input>
                    </div>
                    <div class="litterBox">-</div>
                    <el-select 
                        v-model="ruleForm.selectRelation"
                        >
                        <el-option 
                            v-for="item in devSign"                        
                            :key="item.key"
                            :label="item.label"
                            :value="item.value"
                            >
                        </el-option>
                    </el-select>
                </div>
            </el-form-item>
            <el-form-item label="所属分类" prop="classiFication">
                <div class="signClass">
                    <div class="signInput">
                        <el-input v-model="ruleForm.classiFication" :disabled='true'></el-input>
                    </div>
                    <div class="signText">
                        重选分类
                    </div>
                </div>
            </el-form-item>
            
        </el-form>
        <div class="bottomButton">
            <el-button type="primary" @click="submitForm('ruleForm')" size="mini">保存</el-button>
            <el-button @click="resetForm('ruleForm')" size="mini">取消</el-button>
        </div>
    </div>
</template>
<script>
export default {
    name:'devScene',
    data() {
      return {
          sceneOptions: [{
          label: '全新开发',
            options: [
            {
                value: '开发新产品',
                label: '开发新产品'
            }, 
            {
                value: '开发新市场(国家)',
                label: '开发新市场(国家)'
            },
            {
                value: '开发新尺码(已有产品添加新尺码)',
                label: '开发新尺码(已有产品添加新尺码)'
            },
            ]
            }, 
            {
            label: '全新开发1',
            options: 
            [
                {
                    value: '重新开发',
                    label: '重新开发(存在PDC的老产品，重新打样/改善包装/找新供应商)'
                }, 
            ]
        }],
        devSign:[    
        {
          label: '零售',
          key: 1,
          value: '零售'
        },
        {
          label: '批发',
          key: 2,
          value: '批发'
        },
            
        ],
        ruleForm: {
          scene: '',
          region: '',
          relation:'1',
          inputRelation:'',
          selectRelation:'',
          classiFication:''
        },
        rules: {
          region: [
            { required: true, message: '请选择开发类型', trigger: 'change' },
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
    methods: {
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.$emit('closeEdit','false')
      }
    }
}
</script>
<style lang="scss" scoped>
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
        }
      }
      .signClass{
          display: flex;
          .signInput{
              width: 200px;
          }
          .signText{
              color: #409eff ;
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
      
</style>