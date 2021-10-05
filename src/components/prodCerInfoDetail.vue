<template>
    <div>
        <el-row>
            <el-col :span="24" class="produInfo"> 
                <div class="colbox">
                    <div class="colBoxTitle">是否需要认证： </div> <div class="colBoxContent">{{prodCerInfoDetailList.isauth?'是':'否'}}</div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                <div class="colbox">
                    <div class="colBoxTitle">必要认证： </div><div> <div class="colBoxContent" style="width:1200px" v-for="item in prodCerInfoDetailList.credentialList1" :key="item.authId">{{getAuthId(item.data)}}</div></div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                <div class="colbox">
                    <div class="colBoxTitle">必要认证其他：</div> <div><div class="colBoxContent" style="width:1200px" v-for="item in prodCerInfoDetailList.credentialList2" :key="item.id">{{item.data}}</div></div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                <div class="colbox">
                    <div class="colBoxTitle">推荐认证：</div> <div><div class="colBoxContent" style="width:1200px" v-for="item in prodCerInfoDetailList.credentialList3" :key="item.id">{{item.data}}</div></div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                <div class="colbox">
                    <div class="colBoxTitle">认证备注： </div> <div class="colBoxContent" style="width:1200px">{{prodCerInfoDetailList.authnote}}</div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                 <div class="colbox">
                    <div class="colBoxTitle">产品年龄段： </div> <div class="colBoxContent" style="width:1200px">{{prodCerInfoDetailList.applicableAge ? getPersonName(prodCerInfoDetailList.applicableAge):prodCerInfoDetailList.applicableAge == 0 ? '婴儿':'' }} {{prodCerInfoDetailList.applicableAgeNote}}</div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                 <div class="colbox">
                    <div class="colBoxTitle">专利风险等级： </div> <div class="colBoxContent">{{ prodCerInfoDetailList.riskllevel ? getLevel(prodCerInfoDetailList.riskllevel) : prodCerInfoDetailList.riskllevel ==0 ? '高风险':'' }}</div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col class="produInfo">
                <div class="colbox">
                    <div class="colBoxTitle">专利确认： </div> <div style="width:1200px"><div class="colBoxContent" style="width:1200px" v-for="item in prodCerInfoDetailList.patentInfo" :key="item.id">{{changeCountryName(item.LanguageCode)}}:{{item.Value}}</div></div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>

export default {
    name:'prodCerInfoDetail',
    data(){
        return {
            showFilterCerInfoList:{},
             isUsa:[
                {
                    authId:1,
                    authName: 'FCC',
                    contryName:'美国'
                },
                {
                    authId:2,
                    authName: 'CPSIA',
                    contryName:'美国'
                },
                {
                    authId:3,
                    authName: 'CFR 1303'
                },
                {
                    authId:4,
                    authName: 'FDA'
                },
                {
                    authId:5,
                    authName: 'UL'
                },
                {
                    authId:6,
                    authName: 'CSA'
                },
                {
                    authId:7,
                    authName: 'ASTM F963'
                },
                {
                    authId:8,
                    authName: 'CPSIA'
                },
                {
                    authId:9,
                    authName: 'EPA formaldehyde'
                },
                {
                    authId:10,
                    authName: '16 CFR 1303'
                },
                {
                    authId:11,
                    authName: 'CA TB-117'
                },
                {
                    authId:20,
                    authName: 'CE'
                },
                {
                    authId:21,
                    authName: 'GPSD'
                },
                {
                    authId:22,
                    authName: 'food grade'
                },
                {
                    authId:23,
                    authName: 'REACH ANNEX XVII'
                },
                {
                    authId:24,
                    authName: 'REACH SVHC'
                },
                {
                    authId:25,
                    authName: 'EMC'
                },
                {
                    authId:26,
                    authName: 'RoHs'
                },
                {
                    authId:27,
                    authName: 'LVD'
                },
                {
                    authId:28,
                    authName: 'E1'
                },
                {
                    authId:40,
                    authName: 'RCM'
                },
                {
                    authId:41,
                    authName: 'EU Food grade'
                },
                {
                    authId:42,
                    authName: 'FDA'
                },
                {
                    authId:43,
                    authName: 'UKCA'
                },
                {
                    authId:44,
                    authName: 'GPSD'
                },
                {
                    authId:45,
                    authName: 'FOOD GRADE'
                },
                {
                    authId:46,
                    authName: 'REACH SVHC'
                },
                {
                    authId:47,
                    authName: 'REACH ANNEX XVII'
                },
                {
                    authId:48,
                    authName: 'EMC'
                },
                {
                    authId:49,
                    authName: 'RoHs'
                },
                {
                    authId:50,
                    authName: 'LVD'
                },
                {
                    authId:51,
                    authName: 'E1'
                },
                {
                    authId:52,
                    authName: 'BS5852'
                },
            ],
            devSign:[
                {
                    label: '成人',
                    key: 1,
                    value: 2
                },
                {
                    label: '儿童',
                    key: 2,
                    value: 1
                },    
                {
                    label: '婴儿',
                    key: 3,
                    value: 0
                }, 
            ],
            riskLevel:[
                {
                    label: '高风险',
                    key: 1,
                    value: 0
                },
                {
                    label: '中风险',
                    key: 2,
                    value: 1
                },    
                {
                    label: '低风险',
                    key: 3,
                    value: 2
                }, 
            ]
        }
    },
    props:{
        prodCerInfoDetailList:{
            type:Object,
            default:() => ({})
        }
    },
    mounted(){ 
    },
    methods:{
        getAuthId(credentialList1){

            let newCredentialList1 = credentialList1.split(',')
            let usaid = []
             this.isUsa.forEach(item => {
                 newCredentialList1.forEach(res => {
                     if(res == item.authId){
                         usaid.push(item)
                     }
                 })
            })
            let rUsaid = usaid.map(item => {
                return item.authName
            })

            return rUsaid.toString()
        },
        getPersonName(val){
           let personName =  this.devSign.filter(res => {
               return res.value = val
           })
           return personName[0].label
        },
        getLevel(val){
           let personName =  this.riskLevel.filter(res => {
               return res.value = val
           })
           return personName[0].label
        },
        changeCountryName(name){
            if(!name) return
            if(name == 'en-US'){
                return '美国'
            }else if(name == 'en-GB'){
                return '英国'
            }else if(name == 'de'){
                return '德国'
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.produInfo{
    margin: 15px 0px 0px 50px;
    span {
        font-weight: normal;
        margin-right: 15px;
    }
}
.credentialListBox{
    margin-left: 15px;
}
.colbox{
    display: flex;
    .colBoxTitle{
        font-weight: bold;
        width: 120px;
        text-align: right;
        display: inline-block;
        .colBoxContent{
            width: 1200px;
            font-weight: normal !important;
            word-wrap: break-word;
            display: inline-block;
        }
    }
}
</style>