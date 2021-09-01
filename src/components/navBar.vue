<template>
  <div class="navbarContainer">
    <el-form ref="form"
             :model="form"
             label-width="110px">
      <el-row :gutter="20">
        <el-col :xs="8" :sm="10" :md="12" :lg="13" :xl="10">
          <el-form-item class="firstCreateStyle"
                        label-width="10px">
            <el-select v-model="form.dateType"
                       @change="typeChange"
                       size='mini'>
              <el-option v-for="item in dataOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
            <span class="editMstyle">:</span>
            <el-date-picker 
                v-model="form.timeValue2"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                size='mini'>
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col  :xs="8" :sm="8" :md="8" :lg="7" :xl="8">
          <el-form-item label="产品负责人:">
            <el-radio-group v-model="form.productOwner">
              <el-radio v-for="item in productOwner" :label="item.value" :key="item.value" >{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :xs="6" :sm="6" :md="6" :lg="4" :xl="6">
          <el-form-item>
            <el-input placeholder="请输入内容"
                      v-model="form.search"
                      size='mini'
                      class="input-with-select">
              <el-button slot="append"
                         icon="el-icon-search"></el-button>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="开发国家:">
              <el-checkbox-group v-model="form.checkedCities"
                                 @change="handleCheckedCitiesChange">
                <el-checkbox 
                    v-for="item in cities"
                    :label="item.countryCodes"
                    :key="item.countryCodes">
                    {{item.country}}
                </el-checkbox>
              </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="开发场景:">
            <el-checkbox-group v-model="form.developmentScenario" > 
                <el-checkbox label= 'all' >全部</el-checkbox>
                <el-radio :label="4" v-model="radio" @change="showOtherCheck">全新开发</el-radio>
                <el-radio :label="5" v-model="radio" @change="showOtherCheck">二次开发</el-radio>
              <el-checkbox label= '1' v-if="newProd" >开发新产品</el-checkbox>
              <el-checkbox label= '2' v-if="newProd" >开发新市场</el-checkbox>
              <el-checkbox label= '3' v-if="newProd" >开发新尺码</el-checkbox>
              
              <el-checkbox label= '10' v-if="showTwoProd" >二次开发市场 </el-checkbox>
              <el-checkbox label= '11' v-if="showTwoProd" >二次开发产品</el-checkbox>
              <el-checkbox label= '12' v-if="showTwoProd" >二次开发尺码</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="寻找供应商:">
            <el-radio-group v-model="form.suppliers">
              <el-radio label="all">全部</el-radio>
              <el-radio label="1">已找过</el-radio>
              <el-radio label="0">未找过</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="距样品到货:">
            <el-radio-group v-model="form.sample">
              <el-radio label="all">全部</el-radio>
              <el-radio label="0">未超交期</el-radio>
              <el-radio label="1">已逾期</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="是否需要认证:">
            <el-radio-group v-model="form.authentication">
              <el-radio label="all">全部</el-radio>
              <el-radio label= 1>需要</el-radio>
              <el-radio label= 0>不需要</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="是否需要专利:">
            <el-radio-group v-model="form.patent">
              <el-radio label="all">全部</el-radio>
              <el-radio label="1">需要</el-radio>
              <el-radio label="0">不需要</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="开发状态:">
            <el-checkbox-group v-model="form.status">
              <el-checkbox label="all">全部</el-checkbox>
              <el-checkbox label="0">未提交审批</el-checkbox>
              <el-checkbox label="1">待审批</el-checkbox>
              <el-checkbox label="2">认证确认</el-checkbox>
              <el-checkbox label="3">寻找供应商</el-checkbox>
              <el-checkbox label="4">采购主管审核</el-checkbox>
              <el-checkbox label="5">认证审核</el-checkbox>
              <el-checkbox label="6">样品采购审核</el-checkbox>
              <el-checkbox label="7">确认样品</el-checkbox>
              <el-checkbox label="8">利润复审</el-checkbox>
              <el-checkbox label="9">终审</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item>
            <el-checkbox-group v-model="form.status">
              <el-checkbox label="10">开发完未上架</el-checkbox>
              <el-checkbox label="11">开发完已上架</el-checkbox>
              <el-checkbox label="12">已取消</el-checkbox>
              <el-checkbox label="13">已冻结</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>

</template>

<script>
export default {
  name: 'navBar',

  data () {
    return {
    radio:'',
    showTwoProd:false,
    newProd:false,
    search: '',
    checkAll: false,
    
      cities: [
        {
            countryCodes:'all',
            country:'全部'
        },
        {
            countryCodes:'GB',
            country:'英国'
        },
        {
            countryCodes:'US',
            country:'美国'
        },
        {
            countryCodes:'DE',
            country:'德国'
        },
        {
            countryCodes:'AU',
            country:'澳洲'
        },
        {
            countryCodes:'NZ',
            country:'新西兰'
        },
        {
            countryCodes:'JP',
            country:'日本'
        },
      ],
      isIndeterminate: true,
      dataOptions: [
        {
          label: '创建时间',
          key: 0,
          value: 0
        },
        {
          label: '更新时间',
          key: 1,
          value: 1
        },
        {
          label: '终审时间',
          key: 2,
          value: 2
        }
      ],
      productOwner: [
        {
          label: '全部',
          key: 0,
          value: 3
        },
        {
          label: '自己',
          key: 1,
          value: 1
        },
        {
          label: '其他',
          key: 2,
          value: 2
        }
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近三天',
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近十五天',
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 15);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }]
      },
      form: {
        name: '',
        timeValue2: [],
        dateType: 0,
        productOwner: null,
        developmentScenario: [],
        suppliers: null,
        sample: '',
        authentication: null,
        patent: '',
        status: [],
        checkedCities:[],
      },
      tableParams:{}
    }
  },
  props: {
    msg: String
  },
  watch:{
      form:{
          handler:function(val){
               this.tableParams = {//传出的数据
                    timeType:val.dateType,
                    dateFrom:val.timeValue2 && val.timeValue2.length > 0 ? val.timeValue2[0]:'',
                    dateTo:val.timeValue2 && val.timeValue2.length > 0 ? val.timeValue2[1]:'',
                    countryCodes:val.checkedCities,
                    seekEnd:val.suppliers == 'all' ?null:parseInt(val.suppliers),
                    auth:val.authentication == 'all'?null:parseInt(val.authentication),
                    state:val.status.map(Number),
                    productOwner:val.productOwner == 3 ? null:val.productOwner,
                    scenariosParentIds:val.developmentScenario.includes('all')? [] : val.developmentScenario,
                    sampleDelivery:val.sample == 'all'? '':val.sample,
                    patentProduct:val.patent.includes('all')? '':val.patent
                }
                this.$emit('putTableList',this.tableParams)
          },
          deep:true
      }
  },
  mounted () {
  },
  methods: {
    changeTableList(){
    },
    showOtherCheck(val){
        if(val == 4){
            this.newProd = true
            this.showTwoProd = false
            this.form.developmentScenario = ['1','2','3']
        }else if(val == 5){
            this.newProd = false
            this.showTwoProd = true
            this.form.developmentScenario = ['10','11','12'] 
        }
    },
    typeChange (val) {
      this.changeTableList()

      console.log(val)
      console.log(this.form)
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    }
  }
}
</script>

<style  lang="scss" scoped>
.navbarContainer {
  height: 168px;
  background-color: #ffffff;
  margin: 0 10px 10px;
  .el-row {
    height: 30px;
    display: flex;
  }

  ::v-deep .el-form-item__label {
    color: #409eff !important;
    font-weight: bold;
  }
  ::v-deep .firstCreateStyle {
    margin-bottom: 0px;
    .el-form-item__content {
      margin-left: 10px !important;
    }
  }
  .editMstyle {
    margin: 0 10px;
    font-weight: 600;
  }
  .countryCheckbox {
    display: flex;
  }
}
</style>
