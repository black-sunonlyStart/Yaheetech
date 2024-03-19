<template>
    <div class="navbarContainer">
        <el-form ref="form"
                :model="form"
                label-width="140px"
                @submit.native.prevent
                >
            <el-row>
                <el-col :span="10" :xs="20" :sm="19" :md="19" :lg="19" :xl="20">
                    <el-form-item label-width="0px">
                        <el-select 
                            v-model="form.timeType"
                            size='mini'
                            style="width:130px;margin-right:10px"
                            >
                            <el-option :value="0" :label="M2('可验样日期')" :key="1"></el-option>
                            <el-option :value="1" :label="M2('完成时间')" :key="2"></el-option>
                        </el-select>
                        <el-radio-group size="mini"  v-model="form.timeEnum">
                            <el-radio-button @click.native="clickRadioSearch('timeEnum',item.timeEnum,$event)" v-for="item in timeList" :key="item.timeEnum" :label="item.timeEnum">{{ M2(item.timeEnumValue) }}</el-radio-button>
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
                            @change="changeTime()"
                            >
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :xs="4" :sm="5" :md="5" :lg="5" :xl="4">
                    <el-form-item label-width="10px">
                        <div class="searchBox">
                            <el-input :placeholder="M2('请输入编号/名称/申请人')"
                                v-model="putSearch"
                                size='mini'
                                class="input-with-select"
                                clearable
                                @change="searchSomething"
                                @keyup.enter.native="searchSomething"
                                >
                            </el-input>
                            <el-button type="primary" @click="searchSomething">{{M2('搜索')}}</el-button>
                            <el-checkbox  class="search-check" v-model="form.selectCheck" :label="1">{{M2('在筛选条件中搜索')}}</el-checkbox>
                            <span class="more-search" @click="clickSearchMore()"  v-track="{triggerType:'click',currentUrl: $route.path,behavior:'批量查询'}">
                                {{M2('批量查询')}}
                            </span>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="20" :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
                    <el-form-item>
                        <template slot="label">
                            {{M2('状     态')}}:
                        </template>
                        <el-radio-group size="mini" v-model="form.status">
                            <el-radio-button @click.native="clickRadioSearch('status',item.label,$event)" v-for="(item) in statusList" :key="item.label" :label="item.label">{{ M2(item.name)  }}</el-radio-button>  
                        </el-radio-group>
                        <el-checkbox-group v-model="status1" size="mini" class="checkbox-status">
                            <el-checkbox v-for="(item) in statusList1" :key="item.label"  :label="item.label" border>{{ M2(item.name)  }}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10" :xs="12" :sm="12" :md="12" :lg="12" :xl="15">
                    <el-form-item>
                        <template slot="label">
                            {{M2('产品类型')}}:
                        </template>
                        <el-radio-group size="mini" v-model="form.scenarios">
                            <el-radio-button @click.native="clickRadioSearch('scenarios',item.id,$event)" v-for="(item) in seriesList" :key="item.id" :label="item.id">{{ M2(item.name) }}</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :xs="12" :sm="12" :md="12" :lg="12" :xl="9">
                    <el-form-item>
                        <template slot="label">
                            {{M2('样品情况')}}:
                        </template>
                        <el-radio-group size="mini" v-model="form.sampleCondition">
                            <el-radio-button @click.native="clickRadioSearch('sampleCondition',item.id,$event)" v-for="(item) in sampleList" :key="item.id" :label="item.id">{{ M2(item.name)  }}</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10" :xs="12" :sm="12" :md="12" :lg="12" :xl="15">
                    <el-form-item>
                        <template slot="label">
                            {{M2('来样次数')}}:
                        </template>
                        <el-radio-group size="mini" v-model="form.sampleNum">
                            <el-radio-button @click.native="clickRadioSearch('sampleNum',item.label,$event)" v-for="(item) in prenatalSampleList" :key="item.id" :label="item.label">{{ M2(item.name) }}</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :xs="12" :sm="12" :md="12" :lg="12" :xl="9">
                    <el-form-item>
                        <template slot="label">
                            {{M2('是否为产前样')}}:
                        </template>
                        <el-radio-group size="mini" v-model="form.preproductionSample">
                            <el-radio-button @click.native="clickRadioSearch('preproductionSample',item.label,$event)" v-for="(item) in applicationsNumList" :key="item.id" :label="item.label">{{ M2(item.name)  }}</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10" :xs="12" :sm="12" :md="12" :lg="12" :xl="15">
                    <el-form-item>
                        <template slot="label">
                            {{M2('申请人')}}:
                        </template>
                        <el-radio-group size="mini" v-model="form.curApplicantId">
                            <el-radio-button @click.native="clickRadioSearch('curApplicantId',item.label,$event)" v-for="(item) in developNameList" :key="item.label" :label="item.label">{{ M2(item.name)  }}</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :xs="12" :sm="12" :md="12" :lg="12" :xl="9">
                    <el-form-item>
                        <template slot="label">
                            {{M2('验样场地')}}:
                        </template>
                        <el-radio-group size="mini" v-model="form.testSite">
                            <el-radio-button @click.native="clickRadioSearch('testSite',item.label,$event)" v-for="(item) in inspectionSiteList" :key="item.label" :label="item.label">{{ M2(item.name) }}</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10" :xs="12" :sm="12" :md="12" :lg="12" :xl="15">
                    <el-form-item>
                        <template slot="label">
                            {{M2('样品确认员')}}:
                        </template>
                        <el-radio-group size="mini" v-model="form.sampleValidator">
                            <el-radio-button :label="null" @click.native="clickRadioSearch('sampleValidator',null,$event)">{{M2('全部') }}</el-radio-button>
                            <el-radio-button @click.native="clickRadioSearch('sampleValidator',item.Id,$event)" v-for="(item) in samplePersonList"  :key="item.Id" :label="item.Id">{{ item.TrueName }}</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
           
            <!-- <el-form-item>
                <template slot="label">
                    状   态:
                </template>
                <el-radio-group size="mini" v-model="form.state">
                    <el-radio-button :label="null" @click.native="clickRadioSearch('state',null,$event)">全部</el-radio-button>
                    <el-radio-button @click.native="clickRadioSearch('state',item.state,$event)" v-for="item in filterStatusList" :disabled="item.candisable" :key="item.id" :label="item.state">{{ item.statusValue }}({{item.num}})</el-radio-button>
                    <div class="success-radio" v-for="item in filterStatusList1"  :key="item.id"><el-radio  @click.native="clickRadioSearch('state',item.state,$event)"  :label="item.state">{{ item.statusValue }}({{item.num}})</el-radio></div>
                </el-radio-group>
            </el-form-item> -->
        </el-form>
        <searchMoreDialog ref="searchMoreDialog" @searchMorething='searchMorething'></searchMoreDialog>
    </div>
</template>
<script>
import { trim } from '@/utils/tools.js';
import { getSampleValidatorList } from '@/api/user.js'
export default {
    name: 'newProductNaver',
    components:{
        searchMoreDialog:() => import('@/components/common/searchMoreDialog'),
    },
    data () {
        return {
            timeList:[
                {
                    timeEnumValue:'全部',
                    timeEnum:500,
                },
                {
                    timeEnumValue:'今天',
                    timeEnum:501,
                },
                {
                    timeEnumValue:'3天内',
                    timeEnum:502,
                },
                {
                    timeEnumValue:'7天内',
                    timeEnum:503,
                },
            ],
            seriesList:[
                {
                    name:'全部',
                    id:null,
                },
                {
                    name:'全新产品',
                    id:0,
                },
                {
                    name:'二次开发产品',
                    id:1,
                },
                {
                    name:'改进变更产品',
                    id:2,
                },
            ],
            sampleList:[
                {
                    name:'全部',
                    id:null,
                },
                {
                    name:'完整样品',
                    id:0,
                },
                {
                    name:'部件',
                    id:1,
                },
                
            ],
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
            prenatalSampleList:[
                  {
                    name:'全部',
                    key:1,
                    label:null,
                },
                {
                    name:'第一次',
                    key:2,
                    label:1,
                },
                {
                    name:'第二次',
                    key:3,
                    label:2,
                },
                {
                    name:'多次',
                    key:4,
                    label:3,
                },
            ],
            applicationsNumList:[
                  {
                    name:'全部',
                    key:1,
                    label:null,
                },
                {
                    name:'是',
                    key:2,
                    label:0,
                },
                {
                    name:'否',
                    key:3,
                    label:1,
                },
            ],
            samplePersonList:[
                  {
                    name:'全部',
                    key:1,
                    label:null,
                },
                {
                    name:'张道群',
                    key:2,
                    label:0,
                },
                {
                    name:'谢远峰',
                    key:3,
                    label:1,
                },
            ],
            inspectionSiteList:[
                  {
                    name:'全部',
                    key:1,
                    label:null,
                },
                {
                    name:'公司',
                    key:2,
                    label:0,
                },
                {
                    name:'工厂',
                    key:3,
                    label:1,
                },
            ],
            // 1:未提交  2：待分配   3：样品确认中   4：结果输出中   5：合格    6：改进后通过(产前样)    7：不合格     8：已取消
            statusList:[
                {
                    name:'全部',
                    label:null,
                },
               
                {
                    name:'待分配',
                    label:2,
                },
                {
                    name:'样品确认中',
                    label:3,
                },
                {
                    name:'结果输出中',
                    label:4,
                },
                {
                    name:'结果修改中',
                    label:9,
                },
              
            ],
            statusList1:[
                {
                    name:'待提交',
                    label:1,
                },
                {
                    name:'合格',
                    label:5,
                },
                {
                    name:'改进后通过(产前样)',
                    label:6,
                },
                {
                    name:'不合格',
                    label:7,
                },
                {
                    name:'已取消',
                    label:8,
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
            status1:[],
            tableParams:{}, 
            form: {
                timeValue2:[],
                timeType:0 ,//时间类型 -1：未加时间筛选  0：申请时间  1：完成时间  时间范围筛选时必传
                timeEnum: 500 ,//时间类型   全部(500)、今天(501)、三天内(502)、7天内(503)
                scenarios: null ,//产品类型  0：全新开发  1：二次开发产品  2：改进变更产品
                sampleCondition: null ,//样品情况   0：完整样品 1：部件
                preproductionSample: null ,//是否为产前样   0 ： 是   1：否
                sampleNum: null ,//来样次数  1:第一次  2：第二次  3：多次
                testSite: null ,//验样场地    0：公司   1：工厂
                sampleValidator: null , //样品确认员
                curApplicantId: null ,//申请人   true：自己  false：其他
                status: null ,//状态   1:未提交  2：待分配   3：样品确认中   4：结果输出中   5：合格    6：改进后通过(产前样)    7：不合格     8：已取消
                status1: [] , //状态   1:未提交  2：待分配   3：样品确认中   4：结果输出中   5：合格    6：改进后通过(产前样)    7：不合格     8：已取消
                search: null //搜索(供应商、开发ID、sku别名、sku、申请单号)
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
        },
        status1:{
            handler:function(val){
                this.$set(this.form,'search1',false)
                this.$set(this.form,'status1',val)
                this.$set(this.form,'status','')
                this.$set(this.form,'almorlist',Math.random())       
            },
            deep:true
        }
    },
    created() {
        this.init()
    },
    mounted(){
        this.$nextTick(res => {
            if(this.$route.query.search){
                this.putSearch = this.$route.query.search
            }
        })
        this.addTitleLable()
    },
    methods: {
        addTitleLable(){
            document.querySelectorAll('.navbarContainer .el-form-item__label').forEach(item => {
                if(!item.getAttribute('title')){
                    item.setAttribute('title',item.innerHTML)
                }                
            })
        },
        init() {
            // let param = {
            //     rid:552
            // }
            getSampleValidatorList().then(res => {
                this.samplePersonList = res.data
            })
        },
        changeTime(){
            this.$set(this.form,'timeEnum',500)
        },
        searchMorething(list){
            this.searchMore = { 
                parametersType:list.parametersType,
                parameters:list.parameters,
            }
            this.$emit('putTableList',this.searchMore)
        },
        clickSearchMore() {
            this.$refs.searchMoreDialog.openDialog()
        },
        clickRadioSearch(name,value,el) {
            if (el.target.tagName === 'INPUT') return
            if(name == 'timeEnum'){
                this.$set(this.form,'timeValue2',[])
            }
            if(name == 'status'){
                this.$set(this.form,'status1',[])
                this.status1 = []
            }
            this.$set(this.form,name,value)
            this.$set(this.form,'search1',false)
            this.$set(this.form,'almorlist',Math.random())
        },
        searchSomething(){
            this.$set(this.form,'search',trim(this.putSearch))
            this.$set(this.form,'search1',true)
            this.$set(this.form,'almorlist',Math.random())
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
        height: 25px;
        top: 2px;
        padding: 2px 3px;
    }
}
.navbarContainer {
    padding: 5px;
    background-color: #ffffff;
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
    .more-search {
        color: #3366cc;
        position: absolute;
        right: 10px;
        bottom: -25px;
        cursor: pointer;
        z-index: 111;
    }
    .search-check {
        position: absolute;
        bottom:-25px;
        left: 0;
    }
}
</style>
<style>
    .is-active .el-radio-button__inner {
        color: #fff !important;
    }
</style>