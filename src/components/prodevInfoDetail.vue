<template>
    <div>
        <el-row>
            <el-col :span="24" class="produInfo"> 
                <div class="colbox">
                    <div class="colBoxTitle">中文标题: </div> <div class="colBoxContent">{{prodevInfoDetaiList.title}}</div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                <div class="colbox">
                    <div class="colBoxTitle">中文描述: </div> <div class="colBoxContent">{{prodevInfoDetaiList.description}}</div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                <div class="colbox">
                    <div class="colBoxTitle">供应商所在地: </div> <div class="colBoxContent">{{prodevInfoDetaiList.provinceStr}}-{{ prodevInfoDetaiList.cityStr}}-{{prodevInfoDetaiList.areaStr}}</div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                <span class="postionBox">必要认证附件:</span><span v-for="item in prodevInfoDetaiList.mustCredentialList" :key="item.id">[{{item.fileuri}}]、</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                <span class="postionBox">推荐认证附件：</span><span v-for="item in prodevInfoDetaiList.recommendCredentialList" :key="item.id">[{{item.fileuri}}]、</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                <div class="colbox">
                    <div class="colBoxTitle">认证备注: </div> <div class="colBoxContent">{{prodevInfoDetaiList.certificationnote}}</div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfoImage">
                <div class="postionBox">工厂提供照片：</div>
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
    // font-weight: bold;
    span {
        // font-weight: normal;
    }
}
.produInfoImage{
    margin: 15px 0px 0px 50px;
    font-weight: bold;
    display: flex;
}
.colbox{
    display: flex;
    .colBoxTitle{
        font-weight: bold;
        width: 120px;
        text-align: right;
        .colBoxContent{
            width: 600px;
        }
    }
}
.postionBox{
    text-align: right;
    width: 120px;
    display: inline-block;
    font-weight: bold;
}

</style>