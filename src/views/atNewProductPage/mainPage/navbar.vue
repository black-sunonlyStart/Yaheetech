<template>
    <div class="navbarContainer">
        <el-form ref="form"
                :model="form"
                label-width="140px"
                @submit.native.prevent
                >
            <el-row>
                <el-col :span="10" :xs="20" :sm="19" :md="19" :lg="19" :xl="19">
                    <el-form-item>
                        <template slot="label">
                            {{M2('创建日期')}}:
                        </template>
                        <el-radio-group size="mini"  v-model="form.timeEnum">
                            <el-radio-button @click.native="clickRadioSearch('timeEnum',item.timeEnum,$event)" v-for="item in timeList" :key="item.timeEnum" :label="item.timeEnum">{{ item.timeEnumValue }}</el-radio-button>
                        </el-radio-group>
                        <el-date-picker 
                            style="margin-left:10px;width:230px"
                            v-model="form.timeValue2"
                            type="daterange"
                            align="right"
                            unlink-panels
                            :range-separator="M2('至')"
                            :start-placeholder="M2('开始日期')"
                            :end-placeholder="M2('结束日期')"
                            :picker-options="pickerOptions"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            size='mini'
                            >
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :xs="4" :sm="5" :md="5" :lg="5" :xl="5">
                    <el-form-item label-width="10px">
                        <div class="searchBox">
                            <el-input :placeholder="M2('综合搜索')"
                                v-model="putSearch"
                                size='mini'
                                class="input-with-select"
                                clearable
                                @change="searchSomething"
                                @keyup.enter.native="searchSomething"
                                >
                            </el-input>
                            <el-button type="primary" @click="searchSomething">{{M2('搜索')}}</el-button>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item>
                <template slot="label">
                    {{M2('类目')}}:
                </template>
                <el-radio-group size="mini" v-model="form.seriesCategoryId">
                    <el-radio-button :label="null" @click.native="clickRadioSearch('seriesCategoryId',null,$event)">{{M2('全部')}}({{this.totalNum(1)}})</el-radio-button>
                    <el-radio-button @click.native="clickRadioSearch('seriesCategoryId',item.seriesCategoryId,$event),changeRadioSearch(index)" v-for="(item,index) in seriesList" :key="item.seriesCategoryId" :label="item.seriesCategoryId">{{M2(item.seriesCategoryName)}}({{item.num || 0}})</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="form.seriesCategoryId != null">
                <template slot="label">  
                    {{M2('系列')}}:
                </template>
                <el-radio-group size="mini" v-model="form.classifyDefId" >
                    <el-radio-button :label="null" @click.native="clickRadioSearch('classifyDefId',null,$event)">{{M2('全部')}}({{this.totalNum(2)}})</el-radio-button>
                    <el-radio-button @click.native="clickRadioSearch('classifyDefId',item.classifyDefId,$event)" v-for="item in seriesListChilds" :key="item.classifyDefId" :label="item.classifyDefId">{{ M2(item.classifyDefName) }}({{item.num || 0}})</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <template slot="label">
                    {{M2('大组')}}:
                </template>
                <el-radio-group size="mini" v-model="form.categoryManagerId">
                    <el-radio-button :label="null" @click.native="clickRadioSearch('categoryManagerId',null,$event)">{{M2('全部')}}({{this.totalNum(3)}})</el-radio-button>
                    <el-radio-button @click.native="clickRadioSearch('categoryManagerId',item.leader,$event)" v-for="item in categoryManagerList" :key="item.id" :label="item.leader">{{ M2(item.name) }}({{item.num}})</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <template slot="label">
                    {{M2('状   态')}}:
                </template>
                <el-radio-group size="mini" v-model="form.state">
                    <el-radio-button :label="null" @click.native="clickRadioSearch('state',null,$event)">{{M2('全部')}}</el-radio-button>
                    <el-radio-button @click.native="clickRadioSearch('state',item.state,$event)" v-for="item in filterStatusList" :disabled="item.candisable" :key="item.key" :label="item.state">{{ M2(item.statusValue) }}</el-radio-button>
                    <div class="success-radio" v-for="item in filterStatusList1"  :key="item.state"><el-radio  @click.native="clickRadioSearch('state',item.state,$event)"  :label="item.state">{{ M2(item.statusValue) }}</el-radio></div>
                </el-radio-group>
            </el-form-item>
            <el-row>
                <el-col :span="10" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item>
                        <template slot="label">
                            {{M2('业务开发')}}:
                        </template>
                        <el-radio-group size="mini" v-model="form.curBusiness">
                            <el-radio-button @click.native="clickRadioSearch('curBusiness',item.label,$event)" v-for="item in developNameList" :key="item.key" :label="item.label">{{ M2(item.name) }}</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item>
                        <template slot="label">
                            {{M2('经办人')}}:
                        </template>
                        <el-radio-group size="mini" v-model="form.curAssignee">
                            <el-radio-button @click.native="clickRadioSearch('curAssignee',item.label,$event)" v-for="item in developNameList" :key="item.key" :label="item.label">{{ M2(item.name) }}</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item>
                        <template slot="label">
                            {{M2('设计款')}}:
                        </template>
                        <el-radio-group size="mini" v-model="form.designs">
                            <el-radio-button @click.native="clickRadioSearch('designs',item.label,$event),changeSesign(item.label)" v-for="item in designList" :key="item.label" :label="item.label">{{ M2(item.name) }}</el-radio-button>
                            
                        </el-radio-group>
                         <el-checkbox-group v-model="form.designs1" size="mini" class="checkbox-status" v-if="form.designs && form.designs != 2">
                            <el-checkbox  v-for="(item) in designList1" :key="item.label"  :label="item.label" border>{{ M2(item.name) }}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item>
                        <template slot="label">
                            {{M2('产品来源')}}:
                        </template>
                        <el-radio-group size="mini" v-model="form.productSource">
                            <el-radio-button @click.native="clickRadioSearch('productSource',item.label,$event)" v-for="item in supplierTypeList" :key="item.label" :label="item.label">{{ M2(item.name) }}</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            
        </el-form>
    </div>
</template>
<script>
import { trim } from '@/utils/tools.js';
import { atgetBigDepartmentLeaders,getQueryProductDemandNum,getTimeEnums,atGetSeriesCategoryDef } from '@/api/user.js'
export default {
    name: 'newProductNaver',
    data () {
        return {
            // designs1:[],
            timeList:[],
            seriesListChilds:[],
            filterStatusList:[
                {
                    state:1,
                    key:1,
                    statusValue:'待提交',
                },
                {
                    state:2,
                    key:2,
                    statusValue:'需求初审',
                },
                {
                    state:3,
                    key:3,
                    statusValue:'需求复审',
                },
                {
                    state:4,
                    key:4,
                    statusValue:'需求调研',
                },
                {
                    state:5,
                    key:5,
                    statusValue:'立项中',
                },
                {
                    state:6,
                    key:6,
                    statusValue:'认证初查',
                },
                {
                    state:7,
                    key:7,
                    statusValue:'制定设计需求',
                },
                {
                    state:[8,9],
                    key:8,
                    statusValue:'产品设计/P图',
                },
                {
                    state:10,
                    key:10,
                    statusValue:'专利查询',
                },
                {
                    state:11,
                    key:11,
                    statusValue:'结构设计',
                },
                {
                    state:12,
                    key:12,
                    statusValue:'样前方案确认',
                },  
            ],
            filterStatusList1:[
                {
                    state:18,
                    key:18,
                    statusValue:'开发中',
                },
                {
                    state:13,
                    key:13,
                    statusValue:'计划下单中',
                },
                {
                    state:14,
                    statusValue:'候选下单',
                },
                {
                    state:15,
                    statusValue:'已下单',
                },
                {
                    state:16,
                    statusValue:'已冻结',
                },
                {
                    state:17,
                    statusValue:'已取消',
                },
            ],
            seriesList:[],
            developNameList:[
                {
                    name:'全部',
                    key:1,
                    label:null,
                },
                {
                    name:'自己',
                    key:2,
                    label:true,
                },
                {
                    name:'其他',
                    key:3,
                    label:false,
                },
            ],
            designList:[
                {
                    name:'全部',
                    key:1,
                    label:null,
                },
                {
                    name:'否',
                    key:3,
                    label:2,
                },
                {
                    name:'是',
                    key:2,
                    label:1,
                },
                
            ],
            designList1:[
                {
                    name:'设计',
                    key:2,
                    label:10,
                },
                {
                    name:'P图',
                    key:3,
                    label:11,
                },
            ],
            //1：工厂、2：平台、3：线下、4：设计师推荐、5：其他
            supplierTypeList:[
                {
                    name:'全部',
                    label:null,
                },
                {
                    name:'工厂',
                    label:1,
                },
                {
                    name:'平台',
                    label:2,
                },
                {
                    name:'线下',
                    label:3,
                },
                {
                    name:'设计师推荐',
                    label:4,
                },
                {
                    name:'其他',
                    label:5,
                },
            ],
            categoryManagerList:[
                {
                    name:'全部',
                    key:1,
                    label:null,
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
            name:null,
            classifyDefCount:{},
            form: {
                timeValue2:[],
                timeEnum:500, //时间类型   全部(500)、今天(501)、三天内(502)、7天内(503)、15天内(504)、30天内(505)
                dateFrom:null,//开始时间
                dateTo:null,//截至时间
                categoryId: null,//类目系列
                categoryManagerId:null,//品类经理
                curBusiness: null,//业务开发   true：自己  false：其他
                curAssignee: null,//采购开发   true：自己  false：其他
                state:null,//状态 -- /getStateTime   接口，另外补充  50   已冻结、51   已取消
                designs:null,//设计款
                designs1:[],//设计款
                productSource:null,//产品来源
                seriesCategoryId: null,//一级(类目id)
                classifyDefId:null,
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
    created() {
        this.init()
    },
    mounted(){
        this.$nextTick(res => {
            if(this.$route.query.curAssignee != null ){
                this.form.curAssignee = this.$route.query.curAssignee
            }
        })
        this.addTitleLable()
    },
    computed:{},
    methods: {
        addTitleLable(){
            document.querySelectorAll('.navbarContainer .el-form-item__label').forEach(item => {
                if(!item.getAttribute('title')){
                    item.setAttribute('title',item.innerHTML)
                }                
            })
        },
        totalNum(val){
            let totalNumber = 0
            let list = []
            if(val == 1){
                list = this.seriesList
            }else if(val == 2){
                list = this.seriesListChilds
            }else if(val == 3){
                list = this.categoryManagerList
            }
            list.forEach(item => {
                totalNumber += item.num
            })
            return totalNumber || 0
        },
        getStautList() {
            let param = JSON.parse(JSON.stringify(this.form)) 
            if(param.state){
                if(Array.isArray(param.state)){
                    param.inStatus = param.state
                    param.state= null
                }
            }
            if(param.designs)  param.designs = [param.designs]
            getQueryProductDemandNum(param).then(response => {
                if(response.data) {
                    this.$nextTick(res => {
                        if(this.name != 'seriesCategoryId'){
                            this.seriesList.forEach(item => {
                                if(response.data.seriesCategoryCount[item.seriesCategoryId]){
                                    this.$set(item,'num', response.data.seriesCategoryCount[item.seriesCategoryId])
                                }else {
                                    this.$set(item,'num', 0)
                                }
                            })
                        }
                        if(this.name != 'classifyDefId'){
                            this.seriesListChilds.forEach(item => {
                                if(response.data.classifyDefCount[item.classifyDefId]){
                                    this.$set(item,'num',response.data.classifyDefCount[item.classifyDefId])
                                }else {
                                    this.$set(item,'num', 0)
                                }
                            })
                        }
                        if(this.name != 'categoryManagerId'){
                            this.categoryManagerList.forEach(item => {
                                if(response.data.categoryManagerCount[item.leader]){
                                    this.$set(item,'num', response.data.categoryManagerCount[item.leader])
                                }else {
                                    this.$set(item,'num', 0)
                                }
                            })
                        }
                    })
                }
                this.classifyDefCount = response.data.classifyDefCount
            })
        },
        async init() {
            atgetBigDepartmentLeaders().then(response => {
                if(response.data){
                    this.categoryManagerList = response.data
                }
            });
            getTimeEnums().then(response => {
                if(response.data) {
                    this.timeList = response.data
                }
            })
            await atGetSeriesCategoryDef().then(res => {  
                this.seriesList = res.data
            })  
            await this.getStautList()
        },
        //P图、图片评审、P图方案调整
        changeSesign(value) {
            if(value == 1){
                // this.designs1 = [10,11]
                this.form.designs1 = [10,11]
            }else {
                this.form.designs1 = []
            }
        },
        changeRadioSearch(index) {
            this.seriesList[index].classifyDefs.forEach(item => {
                if(this.classifyDefCount[item.classifyDefId]){
                    item.num = this.classifyDefCount[item.classifyDefId]
                }else {
                    item.num = 0
                }
            })
            this.seriesListChilds = this.seriesList[index].classifyDefs
            this.form.classifyDefId = null
        },
        clickRadioSearch(name,value,el) {
            if (el.target.tagName === 'INPUT') return
            if(value == null){
                this.name = null
            }else {
                this.name = name
            }
            if(name == 'seriesCategoryId' && value == null){
                 this.$set(this.form,'classifyDefId',null)
            }
            this.$set(this.form,name,value)
            this.$set(this.form,'almorlist',Math.random())
            this.getStautList()
        },
        searchSomething(){
            this.name = null
            this.$set(this.form,'search',trim(this.putSearch))
            this.$set(this.form,'almorlist',Math.random())
            this.getStautList()
        }
    }
}
</script>

<style  lang="scss" scoped>
::v-deep.checkbox-status {
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
    .el-row {
        height: 30px;
        display: flex;
    }
    ::v-deep .el-form-item__label {
        color: #3366cc !important;
        font-weight: bold; 
        line-height: 30px; 
        overflow: hidden;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-left: 10px;
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
            &:hover {
                border: 1px solid #3366cc;
                border-left: 1px solid #3366cc;
                color: #3366cc;
            }
        }  
    }
    ::v-deep .el-radio-button__orig-radio:checked + .el-radio-button__inner {
        box-shadow: 0px 0 0 0 #3366cc;
        color: #fff;
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
</style>
