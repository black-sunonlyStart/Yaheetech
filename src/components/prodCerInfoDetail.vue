<template>
    <div>
        <el-row>
            <el-col :span="24" class="produInfo"> 
                是否需要认证：<span>{{prodCerInfoDetailList.isauth}}</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                必要认证：<span v-for="item in prodCerInfoDetailList.credentialList1" :key="item.authId">{{item.authName}}</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                必要认证其他：<span class="credentialListBox" v-for="item in prodCerInfoDetailList.credentialList2" :key="item.id">{{item.data}}</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                推荐认证：<span v-for="item in prodCerInfoDetailList.credentialList3" :key="item.id">{{item.data}}</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                认证备注：<span>{{prodCerInfoDetailList.authnote}}</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                产品年龄段：<span>{{prodCerInfoDetailList.applicableAge }}</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                专利风险等级：<span>{{prodCerInfoDetailList.riskllevel}}</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                专利确认：<span v-for="item in prodCerInfoDetailList.patentInfo" :key="item.id">{{item.Value}}</span>
            </el-col>
        </el-row>
    </div>
</template>
<script>

export default {
    name:'prodCerInfoDetail',
    data(){
        return {
            showFilterCerInfoList:{}
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