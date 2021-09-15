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
                供应商所在地:<span></span>
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
                            style="width: 100px; height: 100px; dispaly:black"
                            :src="item.showImgUrl"
                            fit="fill">
                        </el-image>
                    </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import {getAdministrativeRegion} from '@/api/user.js'
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
        // this.getContryList()
    },

    methods:{
        // getContryList(){
        //     let params = {
        //         parentId : 0 
        //     }
        //     getAdministrativeRegion(params).then(res => {
        //         this.provinceList = res.data
        //         let provincecode  = this.prodevInfoDetaiList.provincecode.toString()
        //         res.data.find(item => {
        //             return item[0] == provincecode
        //         })
        //         console.log(this.provinceList,'provinceList')
        //     })
        //     if(this.prodevInfoDetaiList.provincecode){
        //         getAdministrativeRegion({parentId:this.prodevInfoDetaiList.provincecode}).then(res => {
        //             this.cityList = res.data
        //              this.ruleForm.supplierLocation1=this.prodevInfoDetaiList.citycode.toString()
        //         })
        //     }
        //     if(this.prodevInfoDetaiList.areacode){
        //         getAdministrativeRegion({parentId:this.prodevInfoDetaiList.citycode}).then(res => {
        //             this.districtList = res.data
        //             this.ruleForm.supplierLocation2 = this.prodevInfoDetaiList.areacode.toString()
                    
        //         })
        //     }
        // },
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