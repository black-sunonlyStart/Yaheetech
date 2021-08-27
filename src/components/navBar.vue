<template>
  <div class="navbarContainer">
    <el-form ref="form"
             :model="form"
             label-width="110px">
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item class="firstCreateStyle"
                        label-width="10px">
            <el-select v-model="form.dateType"
                       @change="typeChange"
                       size='mini'>
              <el-option v-for="item in dataOptions"
                         :key="item.key"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
            <span class="editMstyle">:</span>
            <el-date-picker v-model="form.timeValue2"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions"
                            size='mini'>
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="产品负责人:">
            <el-checkbox-group v-model="form.productOwner">
              <el-checkbox label="全部"></el-checkbox>
              <el-checkbox label="自己"></el-checkbox>
              <el-checkbox label="其他"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-input placeholder="请输入内容"
                      v-model="search"
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
            <div class="countryCheckbox">
              <el-checkbox :indeterminate="isIndeterminate"
                           v-model="checkAll"
                           @change="handleCheckAllChange">全选</el-checkbox>
              <span style="width:10px"></span>
              <el-checkbox-group v-model="checkedCities"
                                 @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in cities"
                             :label="city"
                             :key="city">{{city}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="开发场景:">
            <el-checkbox-group v-model="form.developmentScenario">
              <el-checkbox label="全部"></el-checkbox>
              <el-checkbox label="全新开发"></el-checkbox>
              <el-checkbox label="二次开发"></el-checkbox>
              <el-checkbox label="开发新产品"></el-checkbox>
              <el-checkbox label="开发新市场"></el-checkbox>
              <el-checkbox label="开发新尺码"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="寻找供应商:">
            <el-checkbox-group v-model="form.suppliers">
              <el-checkbox label="全部"></el-checkbox>
              <el-checkbox label="已找过"></el-checkbox>
              <el-checkbox label="未找过"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="距样品到货:">
            <el-checkbox-group v-model="form.sample">
              <el-checkbox label="全部"></el-checkbox>
              <el-checkbox label="未超交期"></el-checkbox>
              <el-checkbox label="已逾期"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="是否需要认证:">
            <el-checkbox-group v-model="form.authentication">
              <el-checkbox label="全部"></el-checkbox>
              <el-checkbox label="需要"></el-checkbox>
              <el-checkbox label="不需要"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="是否需要专利:">
            <el-checkbox-group v-model="form.patent">
              <el-checkbox label="全部"></el-checkbox>
              <el-checkbox label="需要"></el-checkbox>
              <el-checkbox label="不需要"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="开发状态:">
            <el-checkbox-group v-model="form.status">
              <el-checkbox label="全部"></el-checkbox>
              <el-checkbox label="未提交审批"></el-checkbox>
              <el-checkbox label="待审批"></el-checkbox>
              <el-checkbox label="认证确认"></el-checkbox>
              <el-checkbox label="寻找供应商"></el-checkbox>
              <el-checkbox label="采购主管审核"></el-checkbox>
              <el-checkbox label="认证审核"></el-checkbox>
              <el-checkbox label="利润初审"></el-checkbox>
              <el-checkbox label="样品采购审核"></el-checkbox>
              <el-checkbox label="确认样品"></el-checkbox>
              <el-checkbox label="利润复审"></el-checkbox>
              <el-checkbox label="终审"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item>
            <el-checkbox-group v-model="form.status">
              <el-checkbox label="开发完未上架"></el-checkbox>
              <el-checkbox label="开发完已上架"></el-checkbox>
              <el-checkbox label="已取消"></el-checkbox>
              <el-checkbox label="已冻结"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>

</template>

<script>
const cityOptions = ['美国', '英国', '德国', '新西兰', '日本'];
export default {
  name: 'navBar',

  data () {
    return {
      search: '',
      checkAll: false,
      checkedCities: [''],
      cities: cityOptions,
      isIndeterminate: true,
      dataOptions: [
        {
          label: '创建时间',
          key: 1,
          value: '创建时间'
        },
        {
          label: '更新时间',
          key: 2,
          value: '更新时间'
        },
        {
          label: '终审时间',
          key: 3,
          value: '终审时间'
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
        timeValue1: '',
        tiemValue2: '',
        dateType: '创建时间',
        productOwner: [],
        developmentScenario: [],
        suppliers: [],
        sample: [],
        authentication: [],
        patent: [],
        status: []
      },
    }
  },
  props: {
    msg: String
  },
  mounted () {
  },
  methods: {
    typeChange (val) {
      // return val
    },
    handleCheckAllChange (val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
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
