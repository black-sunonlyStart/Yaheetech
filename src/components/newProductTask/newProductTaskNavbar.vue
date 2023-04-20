<template>
  <div class="navbarContainer">
    <el-form ref="form"
             :model="form"
             label-width="100px"
             @submit.native.prevent
             >
      <el-row>
        <el-col :span="10" :xs="24" :sm="24" :md="24" :lg="20" :xl="20">
            <el-form-item>
                <template slot="label">
                    查询日期:
                </template>
                <el-radio-group v-model="form.dataTime">
                    <el-radio  @click.native="clickRadioSearch('dataTime',item.label)" v-for="item in timeList" :key="item.key" :label="item.label">{{ item.name }}</el-radio>
                </el-radio-group>
                <el-date-picker 
                    style="margin-left:10px"
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
                    size='mini'
                    >
                </el-date-picker>
            </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="12" :md="6" :lg="5" :xl="5">
          <el-form-item label-width="10px">
            <div class="searchBox">
                <el-input placeholder="创建人/备注信息"
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
    
    <el-form-item>
        <template slot="label">
            类目系列:
        </template>
        <el-radio-group v-model="form.categorySeries">
            <el-radio  @click.native="clickRadioSearch('certificateType',item.label)" v-for="item in seriesList" :key="item.key" :label="item.label">{{ item.name }}</el-radio>
        </el-radio-group>
    </el-form-item>
    <el-form-item>
        <template slot="label">
            品类经理:
        </template>
        <el-radio-group v-model="form.categoryManager">
            <el-radio  @click.native="clickRadioSearch('certificateType',item.label)" v-for="item in categoryManagerList" :key="item.key" :label="item.label">{{ item.name }}</el-radio>
        </el-radio-group>
    </el-form-item>
     
      <el-row>
        <el-col :span="10" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item>
                <template slot="label">
                    业务开发:
                </template>
                  <el-radio-group v-model="form.develop">
                    <el-radio  @click.native="clickRadioSearch('certificateType',item.label)" v-for="item in developNameList" :key="item.key" :label="item.label">{{ item.name }}</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-col>
        <el-col :span="10" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item>
                <template slot="label">
                    采购开发:
                </template>
                  <el-radio-group v-model="form.orderName">
                    <el-radio  @click.native="clickRadioSearch('certificateType',item.label)" v-for="item in developNameList" :key="item.key" :label="item.label">{{ item.name }}</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-col>
      </el-row>
        <el-form-item>
            <template slot="label">
                设计款:
            </template>
            <el-radio-group v-model="form.categorySeries">
                <el-radio  @click.native="clickRadioSearch('certificateType',item.label)" v-for="item in designList" :key="item.key" :label="item.label">{{ item.name }}</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item>
            <template slot="label">
                状   态:
            </template>
            <el-radio-group v-model="form.categorySeries">
                <el-radio  @click.native="clickRadioSearch('certificateType',item.label)" v-for="item in statusList" :key="item.key" :label="item.label">{{ item.name }}</el-radio>
            </el-radio-group>
        </el-form-item>
    </el-form>
    
  </div>
</template>
<script>
import { trim } from '@/utils/tools.js';
export default {
    name: 'newProductNaver',
    data () {
    return {
        timeList:[
            {
                name:'全部',
                key:1,
                lable:1,
            },
            {
                name:'今天',
                key:6,
                lable:6,
            },
            {
                name:'3天内',
                key:2,
                lable:2,
            },
            {
                name:'5天内',
                key:3,
                lable:3,
            },
            {
                name:'7天内',
                key:4,
                lable:4,
            },
            {
                name:'30天内',
                key:5,
                lable:5,
            },
            
        ],
        seriesList:[
             {
                name:'全部',
                key:1,
                lable:null,
            },
             {
                name:'庭院',
                key:2,
                lable:2,
            },
             {
                name:'宠物',
                key:3,
                lable:3,
            },
             {
                name:'家具',
                key:4,
                lable:4,
            },
             {
                name:'健康&美容',
                key:5,
                lable:5,
            },
             {
                name:'虚拟类目',
                key:6,
                lable:6,
            },
        ],
        developNameList:[
            {
                name:'全部',
                key:1,
                lable:null,
            },
            {
                name:'自己',
                key:2,
                lable:2,
            },
            {
                name:'其他',
                key:3,
                lable:3,
            },
        ],
        designList:[
            {
                name:'全部',
                key:1,
                lable:null,
            },
            {
                name:'是',
                key:2,
                lable:2,
            },
            {
                name:'否',
                key:3,
                lable:3,
            },
        ],
        statusList:[
            {
                name:'全部',
                key:1,
                lable:null,
            },
        ],
        categoryManagerList:[
            {
                name:'全部',
                key:1,
                lable:null,
            },
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
        putSearch:'',
        tableParams:{},

        form: {
            search: null,//综合搜索  sku/sku别名/申请号
            dateFrom: '',//申请日期 开始时间
            dateTo: "",//申请日期 截至时间 复杂新领域探索
            categorySeries:null,
            dataTime:null,
        }
    }
},
watch:{
    form:{
        handler:function(val){
            this.tableParams = val
            this.$emit('putTableList',this.tableParams)
        },
        deep:true
    }
},
    methods: {
        
        clickRadioSearch(name,value) {
            this.$set(this.form,name,value)
            this.$set(this.form,'almorlist',Math.random())
        },
        clearAll(){
            this.putSearch = '';
            this.tableParams = {};
            this.form = {
                search: null,//综合搜索  sku/sku别名/申请号
                dateFrom: '',//申请日期 开始时间
                dateTo: "",//申请日期 截至时间
                patentType: '',//专利类型
                countryYear: null,//申请国家
                legalStatus: '',//法律状态
                timeValue2:[],
            }
        },
        searchSomething(){
            this.$set(this.form,'search',trim(this.putSearch))
            this.$set(this.form,'almorlist',Math.random())
        }
    }
}
</script>

<style  lang="scss" scoped>
.navbarContainer {
  padding-top: 5px;
  background-color: #ffffff;
//   margin: 0 10px 10px;
  .el-row {
    height: 30px;
    display: flex;
  }
  ::v-deep .el-form-item__label {
    color: #3366cc !important;
    font-weight: bold; 
    line-height: 30px; 
  }
  ::v-deep .el-form-item__content{
        font-size: 12px !important;
        line-height: 30px;
    }
   ::v-deep  .el-form-item {
        margin-bottom: 0px;
        // height: 30px;
    }
    // ::v-deep .el-radio-group  {
    //     // line-height: inherit;
    // }
    .el-radio {
        line-height: 2;
    }
}

.searchBox{
    display: flex;
    .el-button{
        height: 27px;
        margin-top: 1px;
    }
}

</style>
