<template>
    <div>
        <el-row>
            <el-col :span="24" class="produInfo"> 
                是否需要认证：<span>{{prodCerInfoDetailList.isauth?'需要':'不需要'}}</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                必要认证：<span v-for="item in prodCerInfoDetailList.credentialList1" :key="item.authId">{{getAuthId(item.data)}}</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                必要认证其他：<span class="credentialListBox" v-for="item in prodCerInfoDetailList.credentialList2" :key="item.data">{{item.data}}</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                推荐认证：<span v-for="item in prodCerInfoDetailList.credentialList3" :key="item.data">{{item.data}}</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                认证备注：<span>{{prodCerInfoDetailList.authnote}}</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                产品年龄段：<span>{{prodCerInfoDetailList.applicableAge ? getPersonName(prodCerInfoDetailList.applicableAge):prodCerInfoDetailList.applicableAge == 0 ? '婴儿':'' }} {{prodCerInfoDetailList.applicableAgeNote}}</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                专利风险等级：<span>{{ prodCerInfoDetailList.riskllevel ? getLevel(prodCerInfoDetailList.riskllevel) : prodCerInfoDetailList.riskllevel ==0 ? '高风险':'' }}</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                专利确认：<span v-for="item in prodCerInfoDetailList.patentInfo" :key="item.Value">{{item.LanguageCode}}:{{item.Value}}</span>
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
        }
    }
}
</script>
<style lang="scss" scoped>
.produInfo{
    margin: 15px 0px 0px 50px;
    font-weight: bold;
    span {
        font-weight: normal;
        margin-right: 15px;
    }
}
.credentialListBox{
    margin-left: 15px;
}

</style>