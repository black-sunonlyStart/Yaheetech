<template>
    <div>
        <el-row>
            <el-col :span="24" class="produInfo"> 
                中文标题:<span>{{prodevInfoDetaiList.title}}</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                中文描述:<span>{{prodevInfoDetaiList.description}}</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                供应商所在地:<span>{{prodevInfoDetaiList.provinceStr}}-{{ prodevInfoDetaiList.cityStr}}-{{prodevInfoDetaiList.areaStr}}</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                必要认证附件:<span v-for="item in prodevInfoDetaiList.mustCredentialList" :key="item.id">[{{item.fileuri}}]、</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                推荐认证附件：<span v-for="item in prodevInfoDetaiList.recommendCredentialList" :key="item.id">[{{item.fileuri}}]、</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                认证备注:<span>{{prodevInfoDetaiList.certificationnote}}</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfoImage">
                <div>工厂提供照片：</div>
                    <div v-for="item in prodevInfoDetaiList.factoryGaveImage" :key="item.id">
                        <el-image
                            style="width: 100px; height: 100px; dispaly:black;margin-right:10px"
                            :src="item.showImgUrl"
                            fit="fill">
                        </el-image>
                    </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>

export default {
    name:'prodevInfoDetail',
    data(){
        return {

        }
    },
    props:{
        prodevInfoDetaiList:{
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
    }
}
.produInfoImage{
    margin: 15px 0px 0px 50px;
    font-weight: bold;
    display: flex;
}


</style>