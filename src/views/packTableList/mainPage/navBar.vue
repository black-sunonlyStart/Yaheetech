<template>
  <div class="navbarContainer" v-track="{triggerType:'browse',currentUrl: $route.path,behavior:'进入列表页',}">
    <el-form ref="form"
             :model="form"
             label-width="150px">
        <div class="row-flex" style="position:relactive">
            <el-form-item class="firstCreateStyle w-50"
                label-width="150px">
            <el-select 
                v-model="form.dateType"
                @change="typeChange"
                size='mini'
                class="timeBox"        
                >
                <el-option 
                    v-for="item in dataOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    v-track="{triggerType:'click',currentUrl: $route.path,behavior:'筛选时间',businessCode: item.label}"   
                >
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
                size='mini'
                v-track="{triggerType:'blur',currentUrl: $route.path,behavior:'输入日期查询',InputContext:form.timeValue2,}"
                >
            </el-date-picker>
            </el-form-item>

            <el-form-item label="产品负责人:" class="w-30">
                <el-radio-group v-model="form.productOwner">
                <el-radio-button 
                    v-for="item in productOwner" 
                    :label="item.value" 
                    :key="item.value" 
                    @click.native="clickRadioSearch('productOwner',item.value)"
                    v-track="{triggerType:'click',currentUrl: $route.path,behavior:'产品负责人筛选',businessCode:item.label,}"
                >{{item.label}}</el-radio-button>
                </el-radio-group>
            </el-form-item>

            <el-form-item label-width="10px" style="position:absolute;right:0px">
                <div class="searchBox">
                    <el-input placeholder="综合搜索"
                            v-model="putSearch"
                            size='mini'
                            class="input-with-select"
                            clearable
                            @change="searchSomething"
                            @keyup.enter.native="searchSomething"
                            v-track="{triggerType:'blur',currentUrl: $route.path,behavior:'综合搜索输入框',InputContext:putSearch}"
                            >
                    </el-input>
                    <el-button 
                    type="primary" 
                    size="mini" 
                    @click="searchSomething"
                    v-track="{triggerType:'click',currentUrl: $route.path,behavior:'综合搜索按钮'}"
                    >搜索</el-button>
                </div>
            </el-form-item>
        </div>
         <el-row>
        <el-col :span="21">
          <el-form-item label="开发状态:" class="statusBox">
            <div class="checkBoxAll1" style="display:flex;flex-wrap:wrap">
                <el-radio-group 
                    border
                    size="mini"
                    class="chengboxMoreBox1" 
                    v-model="form.status" 
                    v-track="{triggerType:'click',currentUrl: $route.path,behavior:'开发状态筛选'}"
                    >
                    <el-radio-button :label="null" @click.native="clickRadioSearch('status',null,$event)" v-track="{triggerType:'click',currentUrl: $route.path,behavior:'开发状态筛选'}">全选 ({{total}})</el-radio-button>
                    <el-radio-button 
                        border
                        size="mini"
                        v-for="(item) in statusList"
                        :label="item.label"
                        :key="item.key" 
                        @click.native="clickRadioSearch('status',item.label,$event)"
                        >
                        {{item.name}} ({{item.num}})
                    </el-radio-button>
                </el-radio-group>
                <el-checkbox-group v-model="form.status1" size="mini" class="checkbox-status">
                    <el-checkbox v-for="(item) in statusList2" :key="item.label"  :label="item.label" border>{{ item.name }}({{item.num}})</el-checkbox>
                </el-checkbox-group>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
     
        <div class="row-flex"> 
            <el-form-item label="开发国家:" class="w-50" style="min-width:850px">
              <div class="row-flex">
                <el-checkbox 
                    size="mini"
                    class="checkboxAlltext" 
                    style="margin-right:10px;margin-left:5px;"
                    :indeterminate="isIndeterminate" 
                    v-model="checkAll" 
                    @change="handleCheckAllChange"
                   border >全选</el-checkbox>
                <el-checkbox-group 
                    size="mini"
                    class="chengboxMoreBox"
                    v-model="form.checkedCities"
                    @change="handleCheckedCitiesChange"
                     
                    >
                    <el-checkbox 
                        border
                         size="mini"
                        v-for="item in cities"
                        :label="item.countryCodes"
                        :key="item.countryCodes"
                        v-track="{triggerType:'click',currentUrl: $route.path,behavior:'开发国家筛选'}"
                        >
                        {{item.country}}                      
                    </el-checkbox>
                </el-checkbox-group>
              </div>
          </el-form-item>
       
            <el-form-item label="寻找供应商:" class="w-30">
                <el-radio-group v-model="form.suppliers" v-track="{triggerType:'click',currentUrl: $route.path,behavior:'寻找供应商筛选'}">
                    <el-radio-button label="all" @click.native="clickRadioSearch('suppliers','all')">全部</el-radio-button>
                    <el-radio-button label="1" @click.native="clickRadioSearch('suppliers','1')">已找过</el-radio-button>
                    <el-radio-button label="0" @click.native="clickRadioSearch('suppliers','0')">未找过</el-radio-button>
                </el-radio-group>
            </el-form-item>
        </div>

        <div class="row-flex"> 
          <el-form-item label="开发场景:" class="w-50" style="min-width:735px;">
            <el-checkbox-group v-model="form.developmentScenario" style=" display: flex;align-items: center;" v-track="{triggerType:'click',currentUrl: $route.path,behavior:'开发场景筛选'}"> 
                <el-radio-group v-model="radio">
                    <el-radio-button label='all' @click.native="showOtherCheck('all')" class="radioStyle">全部</el-radio-button>
                    <el-radio-button :label="5"  @click.native="showOtherCheck(5)" class="radioStyle">二次开发</el-radio-button>
                    <el-radio-button :label="4"  @click.native="showOtherCheck(4)" class="radioStyle">全新开发</el-radio-button> 
                </el-radio-group>
              <el-checkbox label= '1' border v-if="newProd" size="mini">开发新产品</el-checkbox>
              <el-checkbox label= '2' border v-if="newProd" size="mini">开发新市场</el-checkbox>
              <el-checkbox label= '3' border v-if="newProd" size="mini">开发新尺码</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="产品等级:" class="w-50" style="min-width:600px;">
                <el-radio-group v-model="form.levelId" v-track="{triggerType:'click',currentUrl: $route.path,behavior:'是否需要专利筛选'}">
                    <el-radio-button label="all" @click.native="clickRadioSearch('levelId','all')">全部</el-radio-button>
                    <el-radio-button :label="item.levelId" @click.native="clickRadioSearch('levelId',item.levelId)" v-for="item in productLevelValueList" :key="item.levelId">{{item.levelValue}}</el-radio-button>
                </el-radio-group>
            </el-form-item>
          
        </div>
      
      <el-form-item>
            <template slot="label">
                类目:
            </template>
            <el-radio-group size="mini" v-model="form.seriesCategoryId">
                <el-radio-button :label="null" @click.native="clickRadioSearch('seriesCategoryId',null,$event),changeRadioSearch()">全部</el-radio-button>
                <el-radio-button @click.native="clickRadioSearch('seriesCategoryId',item.seriesCategoryId,$event),changeRadioSearch(index)" v-for="(item,index) in seriesList" :key="item.seriesCategoryId" :label="item.seriesCategoryId">{{ item.seriesCategoryName }}</el-radio-button>
            </el-radio-group>
        </el-form-item>
        <el-form-item v-if="form.seriesCategoryId != null">
            <template slot="label">  
                系列:
            </template>
            <el-radio-group size="mini" v-model="form.classifyDefId" >
                <el-radio-button :label="null" @click.native="clickRadioSearch('classifyDefId',null,$event)">全部</el-radio-button>
                <el-radio-button @click.native="clickRadioSearch('classifyDefId',item.classifyDefId,$event)" v-for="item in seriesListChilds" :key="item.classifyDefId" :label="item.classifyDefId">{{ item.classifyDefName }}</el-radio-button>
            </el-radio-group>
        </el-form-item>
         <div class="row-flex">
            <el-form-item label="是否需要认证:" class="w-50">
                <el-radio-group v-model="form.authentication" class="actionBox" v-track="{triggerType:'click',currentUrl: $route.path,behavior:'是否需要认证筛选'}">
                    <el-radio-button  label="all" @click.native="clickRadioSearch('authentication','all')">全部</el-radio-button>
                    <el-radio-button  :label='1' @click.native="clickRadioSearch('authentication',1)">是</el-radio-button>
                    <el-radio-button  :label='0' @click.native="clickRadioSearch('authentication',0)">否</el-radio-button>
                </el-radio-group>
            </el-form-item>
    
            <el-form-item label="是否需要专利:" class="w-30">
                <el-radio-group v-model="form.patent" v-track="{triggerType:'click',currentUrl: $route.path,behavior:'是否需要专利筛选'}">
                    <el-radio-button label="all" @click.native="clickRadioSearch('patent','all')">全部</el-radio-button>
                    <el-radio-button label='1' @click.native="clickRadioSearch('patent','1')">需要</el-radio-button>
                    <el-radio-button label='0' @click.native="clickRadioSearch('patent','0')">不需要</el-radio-button>
                </el-radio-group>
            </el-form-item>
        </div>
        <div class="row-flex">
            <el-form-item label="包装方式:" class="w-50">
            <el-radio-group v-model="form.packingWay" class="actionBox" v-track="{triggerType:'click',currentUrl: $route.path,behavior:'包装方式筛选'}">
                <el-radio-button  :label="null" @click.native="clickRadioSearch('packingWay',null)">全部</el-radio-button>
                <el-radio-button  :label="1" @click.native="clickRadioSearch('packingWay',1)" >多箱</el-radio-button>
                <el-radio-button  :label="0" @click.native="clickRadioSearch('packingWay',0)">单箱</el-radio-button>
            </el-radio-group>
            </el-form-item>
            <el-form-item label="距样品到货:" class="w-30">
            <el-radio-group v-model="form.sample" v-track="{triggerType:'click',currentUrl: $route.path,behavior:'距样品到货筛选'}">
              <el-radio-button label="all" @click.native="clickRadioSearch('sample','all')">全部</el-radio-button>
              <el-radio-button label="0" @click.native="clickRadioSearch('sample','0')">未超交期</el-radio-button>
              <el-radio-button label="1" @click.native="clickRadioSearch('sample','1')">已逾期</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </div>
    </el-form>
  </div>

</template>
<script>
const cityOptions = ['GB','US','DE','AU','NZ','JP','PC'];
const statusOptions = [0, 1, 2, 3, 4, 5, 6, 10, 11, 12, 13];
import { getDevelopStatesNum,getProductLevelEnums,getSeriesCategoryDef1 } from '@/api/user.js'
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
        },
        {
            countryCodes:'PC',
            country:'待确认'
        }
        ],
        seriesList:[],
        seriesListChilds:[],
        statusList:[
            {
                name:'待提交开发',
                label:0,
                key:0,
                num:0,
            },
        //   {
        //       name:'待审批',
        //       label:1,
        //       key:1,
        //       num:0,
        //   },
            {
                name:'认证确认',
                label:11,
                key:11,
                num:0,
            },
            {
                name:'寻找供应商',
                label:2,
                key:2,
                num:0,
            },
            {
                name:'采购主管审核',
                label:13,
                key:13,
                num:0,
            },
            {
                name:'认证审核',
                label:12,
                key:12,
                num:0,
            },
            {
                name:'利润初审',
                label:3,
                key:3,
                num:0,
            },
            {
                name:'样品采购审核',
                label:10,
                key:10,
                num:0,
            },
            {
                name:'确认样品',
                label:4,
                key:4,
                num:0,
            },
            {
                name:'利润复审',
                label:5,
                key:5,
                num:0,
            },
            {
                name:'待终审',
                label:6,
                key:6,
                num:0,
            },
           
        ],
        statusList2:[
             {
                name:'开发完未上架',
                label:7,
                key:7,
                num:0,
            },
            {
                name:'开发完已上架',
                label:8,
                key:8,
                num:0,
            },
            {
                name:'已取消',
                label:9,
                key:9,
                num:0,
            },
            {
                name:'已冻结',
                label:14,
                key:14,
                num:0,
            },
        ],
        copeStatusList:[
          {
              name:'未提交审批',
              label:0,
              key:0,
              num:0,
          },
          {
              name:'待审批',
              label:1,
              key:1,
              num:0,
          },
          {
              name:'认证确认',
              label:11,
              key:11,
              num:0,
          },
          {
              name:'寻找供应商',
              label:2,
              key:2,
              num:0,
          },
          {
              name:'采购主管审核',
              label:13,
              key:13,
              num:0,
          },
          {
              name:'认证审核',
              label:12,
              key:12,
              num:0,
          },
          {
              name:'利润初审',
              label:3,
              key:3,
              num:0,
          },
          {
              name:'样品采购审核',
              label:10,
              key:10,
              num:0,
          },
          {
              name:'确认样品',
              label:4,
              key:4,
              num:0,
          },
          {
              name:'利润复审',
              label:5,
              key:5,
              num:0,
          },
          {
              name:'待终审',
              label:6,
              key:6,
              num:0,
          },
          {
              name:'开发完未上架',
              label:7,
              key:7,
              num:0,
          },
          {
              name:'开发完已上架',
              label:8,
              key:8,
              num:0,
          },
          {
              name:'已取消',
              label:9,
              key:9,
              num:0,
          },
          {
              name:'已冻结',
              label:14,
              key:14,
              num:0,
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
        levelId: 'all',
        patent: 'all',
        seriesCategoryId: null,//一级(类目id)
        classifyDefId:null,
        packingWay:null,
        status: null,
        checkedCities:[],
        status1:[],
      },
      tableParams:{},
      productLevelValueList:[],
    //   bleanStatus:true
    }
  },
  computed:{
    totalNum(){
        let totalNumber = 0
        this.statusList.forEach(item => {
            if(item.key != 7 && item.key != 8 && item.key != 9 && item.key != 14)
             totalNumber += item.num
        })
        return totalNumber
    },
  },
  props: {
    msg: String,
    total:Number,
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
                    state:val.status?val.status:null,
                    productOwner:val.productOwner == 2 ? null:val.productOwner,
                    scenariosParentIds:val.developmentScenario.includes('all')? [] : val.developmentScenario,
                    sampleDelivery:val.sample == 'all'? '':Number(val.sample),
                    patentProduct:val.patent == 'all'? null:val.patent,
                    levelId:val.levelId == 'all'? null:val.levelId,
                    packingWay:val.packingWay,
                    search:val.search,
                    status1:val.status1,
                    almorlist:val.almorlist,
                    seriesCategoryId: val.seriesCategoryId,//一级(类目id)
                    classifyDefId:val.classifyDefId,
                }
                // if(this.bleanStatus){
                    this.getDevelopStutsNumber(this.tableParams)
                // }
                this.$emit('putTableList',this.tableParams)      
          },
          deep:true
      } 
  },
  mounted () {
    //   this.changeInnterWeith() 
      this.getDevelopStutsNumber() 
      this.filterStatusNavbar()
  },
  methods: {
    changeRadioSearch(index) {
        if(index || index == 0) {
            this.seriesListChilds = this.seriesList[index].classifyDefs
        }
        this.form.classifyDefId = null
    },
    clickRadioSearch(name,value) {
        this.form[name] = value
        this.$set(this.form,'almorlist',Math.random()) 
    },
    filterStatusNavbar(){
        if(this.$route.query.status){
        this.form.status = Number(this.$route.query.status)
        }
        getProductLevelEnums().then(res => {
        this.productLevelValueList = res.data
        })
        getSeriesCategoryDef1().then(res => {  
            this.seriesList = res.data
        })  
    },
    getDevelopStutsNumber(val){
        let params
        if(val){
            params = JSON.parse(JSON.stringify(val))
        }else {
            params = JSON.parse(JSON.stringify(this.tableParams)) 
        }
         let status = []
        if(!val || val.state == null || !val.state){
            status = [0, 1, 2, 3, 4, 5, 6, 10, 11, 12, 13]
        }else {
            status.push(val.state)
        }
        if(val && val.status1 && val.status1.length > 0){
            val.status1.forEach(item => {
                status.push(item) 
            })
        }
        params.state = status
        getDevelopStatesNum(params).then(res => {
            if(res.data){
                this.statusList.forEach(item => {
                    item.num = 0
                    res.data.forEach(itemNum => {
                        if(item.key == itemNum.state){
                            item.num = itemNum.num
                        }
                    })
                })
                this.statusList2.forEach(item => {
                    item.num = 0
                    res.data.forEach(itemNum => {
                        if(item.key == itemNum.state){
                            item.num = itemNum.num
                        }
                    })
                })
            } 
        })
    },
    changeInnterWeith(){
        if(window.innerWidth < 1450){
            document.querySelector('.navbarContainer').style.width = 1470 + 'px'
        }
    },
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
     handleCheckAllChange(val) {
        this.form.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
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
   
    handleStatusAllChange(val){
        this.form.status = val ? statusOptions : [];
        this.isIndeterminate1 = false;
      }
  }
}
</script>

<style  lang="scss" scoped>
::v-deep.checkbox-status {
    margin-left: 5px;
    display: inline-block;
    .el-checkbox.is-bordered {
        margin-right: 0px;
        margin-left: 5px;
        // padding: 0px 7px 0px 10px;
        height: 25px;
        top: 2px;
        padding: 2px 3px;
    }
}
.navbarContainer {
    padding-top: 5px;
    background-color: #ffffff;
    min-height: 275px;
    .row-flex {
        display: flex;
        flex-wrap: wrap;
    }
    .w-50 {
        width: 50%;
        min-width: 600px;
    }
    .w-30 {
        width: 30%;
        min-width: 400px;
    }
    .el-row {
        // height: 30px;
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
    ::v-deep .el-form-item {
        margin-bottom: 0px;
    }
    ::v-deep .el-radio-button{
        line-height: 2;
        margin: 3px 4px;
        .el-radio-button__inner {
            padding: 5px 10px;
            color: #333 ;
            border-radius: 2px;
            border: 1px solid #DCDFE6;
            border-left: 1px solid #DCDFE6;
            font-size: 12px;
            &:hover {
                border: 1px solid #3366cc;
                border-left: 1px solid #3366cc;
                color: #3366cc;
            }
        }  
    }
    .el-checkbox.is-bordered.el-checkbox--mini {
        margin-right: 10px;
        margin-left: 0px;
        height: 24px;
        line-height: 22px;
        padding: 0px 15px 0px 10px;
    }
    ::v-deep .el-radio-button__orig-radio:checked + .el-radio-button__inner {
        box-shadow: 0px 0 0 0 #3366cc;
    }
    ::v-deep .success-radio {
        border: 1px solid #ccc;
        display: inline-block;
        margin-right: 10px;
        height: 25px;
        line-height: 25px;
        position: relative;
        top: 5px;
        padding-right: 10px;
        // background: #e8f0f7;
        .el-radio__input {
            border-right:1px solid #ccc;
            line-height: 23px;
        }
    }
}
.searchBox{
    display: flex;
    .el-button{
        height: 28px;
        margin-top: 1px;
        line-height: 3px;
        padding: 12px 12px;
        font-size: 12px;
        margin-right: 10px;
    }
}
::v-deep .firstCreateStyle {
    margin-bottom: 0px;
    .el-form-item__content {
      margin-left: 10px !important;
    }
  }
   .timeBox{
        width: 120px;
        margin-left: 30px;
    }
    .checkBoxAll1{
        display: flex;
        padding-top: 2px;
        position: relative;
    .checkboxAlltext1{
        display: inline-block;
        margin-right: 20px;
        // height: 23px;
        width: 112px;
        position: absolute;
        margin-left: 5px !important;
    }
    .chengboxMoreBox1{
        width: 1500px;
        display: inline-block;
        .margin-120 {
            margin-left: 122px !important;
        }
    }
}
</style>
