<template>
    <div>
        <el-row>
            <el-col :span="24" class="produInfo"> 
                <div class="colbox">
                    <div class="colBoxTitle">{{M2('中文标题')}}： </div> <div class="colBoxContent">{{prodevInfoDetaiList.title}}</div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                <div class="colbox">
                    <div class="colBoxTitle">{{M2('中文描述')}}： </div> <div class="colBoxContent" style="width:1200px">{{prodevInfoDetaiList.description}}</div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                <div class="colbox">
                    <div class="colBoxTitle">{{M2('供应商所在地')}}： </div> <div class="colBoxContent">{{prodevInfoDetaiList.provinceStr}}-{{ prodevInfoDetaiList.cityStr}}-{{prodevInfoDetaiList.areaStr}}</div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                <span class="postionBox">{{M2('必要认证附件')}}：</span><div class="mustListStyle"><div v-for="item in prodevInfoDetaiList.mustCredentialList" :key="item.id"><span class="countryList">{{changCountry(item.countryCode)}}</span>：<span class="filesStyl" @click='uploadFiles(item.fileuri)'>[{{item.name}}]</span></div></div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                <div class="postionBox">{{M2('附件后补时间')}}： </div> <div class="mustListStyle">{{prodevInfoDetaiList.noticeTime?$moment(prodevInfoDetaiList.noticeTime).format("YYYY-MM-DD") :''}}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                <span class="postionBox">{{M2('推荐认证附件')}}：</span><div class="mustListStyle"><div v-for="item in prodevInfoDetaiList.recommendCredentialList" :key="item.id"><span class="countryList">{{changCountry(item.countryCode)}}</span>：<span class="filesStyl" @click='uploadFiles(item.fileuri)'>[{{item.name}}]</span></div></div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                <div class="colbox">
                    <div class="colBoxTitle">{{M2('认证备注')}}： </div> <div class="colBoxContent" style="width:1200px">{{prodevInfoDetaiList.certificationnote}}</div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfoImage">
                <div class="postionBox">{{M2('工厂提供照片')}}：</div>
                    <div v-for="item in prodevInfoDetaiList.factoryGaveImage" :key="item.id">
                        <el-image
                            style="width: 100px; height: 100px; dispaly:block;margin-right:10px"
                            :src="item.showImgUrl"
                            fit="fill">
                            <div slot="placeholder" class="image-slot icon-loading">
                                <i class="el-icon-loading" ></i>
                            </div>
                            <div slot="error" class="image-slot icon-loading" style="font-size:14px">
                                <i class="el-icon-picture-outline">{{M2('加载失败')}}</i>
                            </div>
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
        },
        proImageList:{
            type:String,
            default:() => ('')
        }
    },
    mounted(){
    },

    methods:{
        changCountry(val){
            if(val == 'US'){
                return this.M2('美国')
            }else if (val == 'GB' ){
                return this.M2('英国')
            }else if(val == 'OU'){
                return this.M2('欧盟')
            }else {
                return this.M2('所有市场')
            }
        },
        uploadFiles(fileuri){
            //文件点击事件
            window.open(`${this.proImageList}Development/downloadFile?developmentId=${this.$route.query.developmentId}&fileName=${fileuri}`)
        }
    }
}
</script>
<style lang="scss" scoped>
.produInfo{
    display: flex;
    margin: 15px 0px 0px 50px;
}
.produInfoImage{
    margin: 15px 0px 0px 50px;
    font-weight: bold;
    display: flex;
}
.colbox{
    display: flex;
    .colBoxTitle{
        flex-shrink: 0;
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
.mustListStyle{
    display: inline-block;
    .countryList{
        display: inline-block;
        width: 50px;
        text-align: right;
    }
}
.filesStyl{
    color: royalblue;
    cursor: pointer;
    display: inline-block;
    &:hover{
        color: #ffffff;
        background: royalblue;
    }
}

</style>