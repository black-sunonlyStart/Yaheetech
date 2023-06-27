<template>
    <div class="navbarContainer">
        <el-form ref="form"
                :model="form"
                label-width="100px"
                @submit.native.prevent
                >
            <el-row>
                <el-col :span="10" :xs="20" :sm="19" :md="19" :lg="19" :xl="19">
                    <el-form-item>
                        <template slot="label">
                        创建日期:
                        </template>
                        <el-radio-group size="mini"  v-model="form.timeEnum">
                            <el-radio-button @click.native="clickRadioSearch('timeEnum',item.timeEnum,$event)" v-for="item in timeList" :key="item.key" :label="item.timeEnum">{{ item.timeEnumValue }}</el-radio-button>
                        </el-radio-group>
                        <el-date-picker 
                            style="margin-left:10px;width:230px"
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
                <el-col :xs="4" :sm="5" :md="5" :lg="5" :xl="5">
                    <el-form-item label-width="10px">
                        <div class="searchBox">
                            <el-input placeholder="请输入编号/名称"
                                v-model="putSearch"
                                size='mini'
                                class="input-with-select"
                                clearable
                                @change="searchSomething"
                                @keyup.enter.native="searchSomething"
                                >
                            </el-input>
                            <el-button type="primary" @click="searchSomething">搜索</el-button>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item>
                <template slot="label">
                    类目系列:
                </template>
                <el-radio-group size="mini" v-model="form.seriesCategoryId">
                    <el-radio-button :label="null" @click.native="clickRadioSearch('seriesCategoryId',null,$event)">全部</el-radio-button>
                    <el-radio-button @click.native="clickRadioSearch('seriesCategoryId',item.seriesCategoryId,$event),changeRadioSearch(index)" v-for="(item,index) in seriesList" :key="item.seriesCategoryId" :label="item.seriesCategoryId">{{ item.seriesCategoryName }}</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <template slot="label">    
                </template>
                <el-radio-group size="mini" v-model="form.classifyDefId" v-if="form.seriesCategoryId ">
                    <el-radio-button :label="null" @click.native="clickRadioSearch('classifyDefId',null,$event)">全部</el-radio-button>
                    <el-radio-button @click.native="clickRadioSearch('classifyDefId',item.classifyDefId,$event)" v-for="item in seriesListChilds" :key="item.classifyDefId" :label="item.classifyDefId">{{ item.classifyDefName }}</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <template slot="label">
                    品类经理:
                </template>
                <el-radio-group size="mini" v-model="form.leader">
                    <el-radio-button :label="null" @click.native="clickRadioSearch('leader',null,$event)">全部</el-radio-button>
                    <el-radio-button @click.native="clickRadioSearch('leader',item.leader,$event)" v-for="item in categoryManagerList" :key="item.leader" :label="item.leader">{{ item.leaderName }}</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-row>
                <el-col :span="10" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item>
                        <template slot="label">
                            业务开发:
                        </template>
                        <el-radio-group size="mini" v-model="form.curBusiness">
                            <el-radio-button @click.native="clickRadioSearch('curBusiness',item.label,$event)" v-for="item in developNameList" :key="item.key" :label="item.label">{{ item.name }}</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item>
                        <template slot="label">
                            采购开发:
                        </template>
                        <el-radio-group size="mini" v-model="form.curBuyer">
                            <el-radio-button @click.native="clickRadioSearch('curBuyer',item.label,$event)" v-for="item in developNameList" :key="item.key" :label="item.label">{{ item.name }}</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item>
                        <template slot="label">
                            设计款:
                        </template>
                        <el-radio-group size="mini" v-model="form.design">
                            <el-radio-button @click.native="clickRadioSearch('design',item.label,$event),changeSesign(item.label)" v-for="item in designList" :key="item.key" :label="item.label">{{ item.name }}</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item>
                        <template slot="label">
                            供应商:
                        </template>
                        <el-radio-group size="mini" v-model="form.supplierType">
                            <el-radio-button @click.native="clickRadioSearch('supplierType',item.label,$event)" v-for="item in supplierTypeList" :key="item.key" :label="item.label">{{ item.name }}</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item>
                <template slot="label">
                    状   态:
                </template>
                <el-radio-group size="mini" v-model="form.state">
                    <el-radio-button :label="null" @click.native="clickRadioSearch('state',null,$event)">全部</el-radio-button>
                    <el-radio-button @click.native="clickRadioSearch('state',item.state,$event)" v-for="item in filterStatusList" :disabled="item.candisable" :key="item.id" :label="item.state">{{ item.statusValue }}({{item.num}})</el-radio-button>
                    <div class="success-radio" v-for="item in filterStatusList1"  :key="item.id"><el-radio  @click.native="clickRadioSearch('state',item.state,$event)"  :label="item.state">{{ item.statusValue }}({{item.num}})</el-radio></div>
                </el-radio-group>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { trim } from '@/utils/tools.js';
import { getBigDepartmentLeaders,getAllQueryStatus,getTimeEnums,getSeriesCategoryDef } from '@/api/user.js'
export default {
    name: 'newProductNaver',
    data () {
        return {
            timeList:[],
            seriesListChilds:[],
            filterStatusList:[],
            filterStatusList1:[],
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
                    name:'是',
                    key:2,
                    label:1,
                },
                {
                    name:'否',
                    key:3,
                    label:2,
                },
            ],
            supplierTypeList:[
                {
                    name:'全部',
                    key:1,
                    label:null,
                },
                {
                    name:'已有',
                    key:2,
                    label:0,
                },
                {
                    name:'全新',
                    key:3,
                    label:1,
                },
            ],
            statusList:[
                {
                    name:'全部',
                    key:1,
                    label:null,
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
            form: {
                timeValue2:[],
                timeEnum:500, //时间类型   全部(500)、今天(501)、三天内(502)、7天内(503)、15天内(504)、30天内(505)
                dateFrom:null,//开始时间
                dateTo:null,//截至时间
                // categoryId: null,//类目系列
                leader:null,//品类经理
                curBusiness: null,//业务开发   true：自己  false：其他
                curBuyer: null,//采购开发   true：自己  false：其他
                state:null,//状态 -- /getStateTime   接口，另外补充  50   已冻结、51   已取消
                design:null,//设计款
                supplierType:null,//设计款
                // categoryIdChird:null,//设计款
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
    methods: {
        getStautList() {
            getAllQueryStatus(this.form).then(response => {
                if(response.data) {
                    this.statusList = response.data
                    this.filterStatusList =response.data.filter(item => {
                        return item.state != 30 && item.state != 50 && item.state != 51
                    })
                    this.filterStatusList1 = response.data.filter(item => {
                        return item.state == 30 || item.state == 50 || item.state == 51
                    })
                }
            })
        },
        init() {
            getBigDepartmentLeaders().then(response => {
                if(response.data){
                    this.categoryManagerList = response.data
                }
            });
            getTimeEnums().then(response => {
                if(response.data) {
                    this.timeList = response.data
                }
            })
            getSeriesCategoryDef().then(res => {
                this.seriesList = res.data
            })  
            this.getStautList()
        },
        //P图、图片评审、P图方案调整
        changeSesign(value) {
            if(!value) {
                this.filterStatusList.forEach(item => {
                    item.candisable = false
                })
                return
            }else{
                let disabledList = value == 1 ?  [6,7,8] : [9,10,11,12,13,15]
                this.filterStatusList.forEach(item => {
                    if(disabledList.includes(item.state)){
                        item.candisable = true
                    }else {
                        item.candisable = false
                    }
                })
                return
            }
        },
        changeRadioSearch(index) {
            this.seriesListChilds = this.seriesList[index].classifyDefs
            this.form.classifyDefId = null
        },
        clickRadioSearch(name,value,el) {
            if (el.target.tagName === 'INPUT') return
            this.$set(this.form,name,value)
            this.$set(this.form,'almorlist',Math.random())
            this.getStautList()
        },
        searchSomething(){
            this.$set(this.form,'search',trim(this.putSearch))
            this.$set(this.form,'almorlist',Math.random())
            this.getStautList()
        }
    }
}
</script>

<style  lang="scss" scoped>
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
}
</style>
