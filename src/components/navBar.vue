<template>
  <div class="navbarContainer">
    <el-form ref="form"
             :model="form"
             label-width="150px">
      <el-row :gutter="2">
        <el-col :xs="8" :sm="10" :md="12" :lg="13" :xl="10">
          <el-form-item class="firstCreateStyle"
                        label-width="10px">
            <el-select v-model="form.dateType"
                       @change="typeChange"
                       size='mini'
                    class="timeBox"
                       >
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
                      v-model="search"
                      size='mini'
                      class="input-with-select"
                      @change="searchSomething"
                      clearable
                      >
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
            <el-form-item label="是否需要专利:">
            <el-radio-group v-model="form.patent">
              <el-radio label="all">全部</el-radio>
              <el-radio label= 1>需要</el-radio>
              <el-radio label= 0>不需要</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="寻找供应商:">
            <el-radio-group v-model="form.suppliers" >
              <el-radio style="width:52px" label="all">全部</el-radio>
              <el-radio style="width:52px" label="1">已找过</el-radio>
              <el-radio style="width:52px" label="0">未找过</el-radio>
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
            <el-radio-group v-model="form.authentication" class="actionBox">
              <el-radio style="width:52px" label="all">全部</el-radio>
              <el-radio style="width:52px" label= 1>需要</el-radio>
              <el-radio style="width:52px" label= 0>不需要</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="14">
           <el-form-item label="开发场景:">
            <el-checkbox-group v-model="form.developmentScenario" > 
                <el-radio  label='all' v-model="radio" @change="showOtherCheck" class="radioStyle">全部</el-radio>
                <el-radio :label="4" v-model="radio" @change="showOtherCheck" class="radioStyle">全新开发</el-radio>
                <el-radio :label="5" v-model="radio" @change="showOtherCheck" class="radioStyle">二次开发</el-radio>
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
        <el-col :span="24">
          <el-form-item label="开发状态:">
            <el-checkbox-group v-model="form.status">
              <el-checkbox label= '15'>全部</el-checkbox>
              <el-checkbox label= '0'>未提交审批</el-checkbox>
              <el-checkbox label= '1'>待审批</el-checkbox>
              <el-checkbox label= '11'>认证确认</el-checkbox>
              <el-checkbox label= '2'>寻找供应商</el-checkbox>
              <el-checkbox label= '13'>采购主管审核</el-checkbox>
              <el-checkbox label= '12'>认证审核</el-checkbox>
              <el-checkbox label= '10'>样品采购审核</el-checkbox>
              <el-checkbox label= '4'>确认样品</el-checkbox>
              <el-checkbox label= '5'>利润复审</el-checkbox>
              <el-checkbox label= '6'>终审</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item>
            <el-checkbox-group v-model="form.status">
              <el-checkbox label= '7'>开发完未上架</el-checkbox>
              <el-checkbox label= '8'>开发完已上架</el-checkbox>
              <el-checkbox label= '9'>已取消</el-checkbox>
              <el-checkbox label= '14'>已冻结</el-checkbox>
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
        checked:true,
    radio:'all',
    showTwoProd:false,
    newProd:false,
    search: '',
    checkAll: false,
    
      cities: [
        {
            countryCodes:'15',
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
          value: 2
        },
        {
          label: '自己',
          key: 1,
          value: 1
        },
        {
          label: '其他',
          key: 2,
          value: 0
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
        productOwner: 2,
        developmentScenario: [],
        suppliers: 'all',
        sample: 'all',
        authentication: 'all',
        patent: 'all',
        status: ['15'],
        checkedCities:['15'],
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
                    countryCodes:this.changeCities(val.checkedCities),
                    seekEnd:val.suppliers == 'all' ?null:parseInt(val.suppliers),
                    auth:val.authentication == 'all'?null:parseInt(val.authentication),
                    state:this.changeMath(val.status),
                    productOwner:val.productOwner == 2 ? null:val.productOwner,
                    scenariosParentIds:val.developmentScenario.includes('all')? [] : val.developmentScenario,
                    sampleDelivery:val.sample == 'all'? '':Number(val.sample),
                    patentProduct:val.patent.includes('all')? null:val.patent,
                    search:val.search
                }
                this.$emit('putTableList',this.tableParams)
          },
          deep:true
      }
  },
  mounted () {
  },
  methods: {
    changeMath(val){
        if(val.length > 0 && val.includes('15')){
            let index = val.indexOf('15');
            val.splice(index, 1)
            let newVal = val.map(Number)
            return newVal
        }else{
            let newVal = val.map(Number)
            return newVal
        }
    },
    changeCities(val){
        if(val.length > 0 && val.includes('15')){
            let index = val.indexOf('15');
            val.splice(index, 1)
            return val
        }else{
            return val
        }
    },
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
        }else if(val == 'all'){
            this.newProd = false
            this.showTwoProd = false
            this.form.developmentScenario = [] 
        }
    },
    typeChange (val) {
      this.changeTableList()
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
    searchSomething(val){
        this.form.search = val
        this.$set(this.form,'search',val)
        console.log(this.form,'form')
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
  .radioStyle{
      margin-top: 14px;
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
    .actionBox{
        width: 350px;
    }
    .el-radio{
        width: 80px;
    }
    .timeBox{
        width: 120px;
        margin-left: 30px;
    }
}
</style>
