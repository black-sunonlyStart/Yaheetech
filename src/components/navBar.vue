<template>
  <div class="navbarContainer">
    <el-form ref="form"
             :model="form"
             label-width="150px">
      <el-row>
        <el-col :span="10" :xs="24" :sm="24" :md="24" :lg="12" :xl="11">
          <el-form-item class="firstCreateStyle"
                label-width="150px">
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
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                size='mini'>
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="10" :lg="8" :xl="9">
          <el-form-item label="产品负责人:">
            <el-radio-group v-model="form.productOwner">
              <el-radio v-for="item in productOwner" :label="item.value" :key="item.value" >{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="12" :md="6" :lg="4" :xl="4">
          <el-form-item label-width="10px">
            <div class="searchBox">
                <el-input placeholder="综合搜索"
                        v-model="putSearch"
                        size='mini'
                        class="input-with-select"
                        clearable
                        @change="searchSomething"
                        @keyup.enter.native="searchSomething"
                        >
                </el-input>
                <el-button type="primary" size="mini" @click="searchSomething">搜索</el-button>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :xs="24" :sm="24" :md="24" :lg="12" :xl="11">
          <el-form-item label="开发国家:">
              <div class="checkBoxAll">
                <el-checkbox class="checkboxAlltext" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <el-checkbox-group 
                class="chengboxMoreBox"
                    v-model="form.checkedCities"
                    @change="handleCheckedCitiesChange">
                    <el-checkbox 
                        v-for="item in cities"
                        :label="item.countryCodes"
                        :key="item.countryCodes">
                        {{item.country}}
                    </el-checkbox>
                </el-checkbox-group>
              </div>
          </el-form-item>
        </el-col>
        <el-col :span="10" :lg="10" :xl="10">
          <el-form-item label="寻找供应商:">
                <el-radio-group v-model="form.suppliers" >
                <el-radio label="all">全部</el-radio>
                <el-radio label="1">已找过</el-radio>
                <el-radio label="0">未找过</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :xs="24" :sm="24" :md="24" :lg="12" :xl="11">
          <el-form-item label="开发场景:">
            <el-checkbox-group v-model="form.developmentScenario" > 
                <el-radio  label='all' v-model="radio" style="width:42px" @change="showOtherCheck" class="radioStyle">全部</el-radio>
                <el-radio :label="4" v-model="radio" style="width:52px" @change="showOtherCheck" class="radioStyle">全新开发</el-radio>
                <el-radio :label="5" v-model="radio" style="width:42px;" @change="showOtherCheck" class="radioStyle">二次开发</el-radio>
              <el-checkbox label= '1' v-if="newProd" style="margin-left:10px;width:74px">开发新产品</el-checkbox>
              <el-checkbox label= '2' v-if="newProd" style="width:74px" >开发新市场</el-checkbox>
              <el-checkbox label= '3' v-if="newProd" style="width:74px" >开发新尺码</el-checkbox>

              <el-checkbox label= '10' v-if="showTwoProd"  style="margin-left:10px;width:74px">二次开发产品</el-checkbox>
              <!-- <el-checkbox label= '11' v-if="showTwoProd" style="width:74px">二次开发市场 </el-checkbox>
              <el-checkbox label= '12' v-if="showTwoProd" style="width:74px">二次开发尺码</el-checkbox> -->
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="10" :lg="9" :xl="10">
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
        <el-col :span="10" :xs="24" :sm="24" :md="24" :lg="12" :xl="11">
          <el-form-item label="是否需要认证:">
            <el-radio-group v-model="form.authentication" class="actionBox">
              <el-radio style="width:42px" label="all">全部</el-radio>
              <el-radio style="width:52px" label= 1>是</el-radio>
              <el-radio style="width:42px" label= 0>否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="10" :lg="9" :xl="10">
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
        <el-col :span="20">
          <el-form-item label="开发状态:" class="statusBox">
            <div class="checkBoxAll1">
                <el-checkbox class="checkboxAlltext1" :indeterminate="isIndeterminate1" v-model="checkStatusAll" @change="handleStatusAllChange">全选</el-checkbox>
                <el-checkbox-group class="chengboxMoreBox1" v-model="form.status" @change="handleCheckedStatusChange">
                    <el-checkbox 
                        v-for="item in statusList"
                        :label="item.label"
                        :key="item.key">
                        {{item.name}}
                    </el-checkbox>
                </el-checkbox-group>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>

</template>
<script>
const cityOptions = ['GB','US','DE','AU','NZ','JP'];
const statusOptions = [0, 1, 2, 3, 4, 5, 6, 10, 11, 12, 13];
export default {
  name: 'navBar',  
  data () {
    return {
    checked:true,
    radio:'all',
    showTwoProd:false,
    newProd:false,
    putSearch: '',
    checkAll: false,
    checkStatusAll:false,
    cities:[{
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
        }],
      statusList:[
          {
              name:'未提交审批',
              label:0,
              key:0
          },
          {
              name:'待审批',
              label:1,
              key:1
          },
          {
              name:'认证确认',
              label:11,
              key:11
          },
          {
              name:'寻找供应商',
              label:2,
              key:2
          },
          {
              name:'采购主管审核',
              label:13,
              key:13
          },
          {
              name:'认证审核',
              label:12,
              key:12
          },
          {
              name:'利润初审',
              label:3,
              key:3
          },
          {
              name:'样品采购审核',
              label:10,
              key:10
          },
          {
              name:'确认样品',
              label:4,
              key:4
          },
          {
              name:'利润复审',
              label:5,
              key:5
          },
          {
              name:'待终审',
              label:6,
              key:6
          },
          {
              name:'开发完未上架',
              label:7,
              key:7
          },
          {
              name:'开发完已上架',
              label:8,
              key:8
          },
          {
              name:'已取消',
              label:9,
              key:9
          },
          {
              name:'已冻结',
              label:14,
              key:14
          },
      ],
      isIndeterminate: true,
      isIndeterminate1: true,
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
                    timeType:val.dateType == 0 ?0: val.dateType,
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
                    search:val.search,
                    almorlist:val.almorlist
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
        if(val.length == 1 && val.includes('15')){
            val = [0,1,2,3,4,5,6,10,11,12,13]
            return val
        }else if(val.length > 1 && val.includes('15')){
            let copeIndex = JSON.parse(JSON.stringify(val))
            let index = copeIndex.indexOf('15');
            copeIndex.splice(index, 1)

            let newVal = copeIndex.map(Number)
            return newVal
        }else {
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
    typeChange () {
      this.changeTableList()
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
    searchSomething(){
        this.$set(this.form,'search',this.putSearch)
        this.$set(this.form,'almorlist',Math.random())
        if(this.form.status[0] == '15'){
            this.form.status = [];
        }  
        
    },
    handleCheckedStatusChange (value) {
      let checkedCount = value.length;
      this.checkStatusAll = checkedCount === this.statusList.length;
      this.isIndeterminate1 = checkedCount > 0 && checkedCount < this.statusList.length;
    },
    handleCheckAllChange(val) {
        this.form.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleStatusAllChange(val){
        this.form.status = val ? statusOptions : [];
        this.isIndeterminate1 = false;
      }
  }
}
</script>

<style  lang="scss" scoped>
.navbarContainer {
  height: 150px;
  background-color: #ffffff;
  margin: 0 10px 10px;
  .el-row {
    height: 25px;
    display: flex;
  }
  .radioStyle{
      margin-top: 14px;
  }
  ::v-deep .el-form-item__label {
    color: #3366cc !important;
    font-weight: bold;
    
    
  }
  ::v-deep .el-form-item__content{
        font-size: 12px !important;
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
.checkBoxAll{
    display: flex;
    .checkboxAlltext{
        display: inline-block;
        margin-right: 20px;
    }
    .chengboxMoreBox{
        width: 500px;
        display: inline-block;
    }
}
.checkBoxAll1{
    display: flex;
    padding-top: 9px;
    .checkboxAlltext1{
        display: inline-block;
        margin-right: 20px;
    }
    .chengboxMoreBox1{
        width: 1250px;
        display: inline-block;
    }
}
::v-deep.statusBox{
    .el-form-item__content{
        line-height: 25px !important;
    }
}
.searchBox{
    display: flex;
    .el-button{
        height: 27px;
        margin-top: 6px;
    }
}
</style>
