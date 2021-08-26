<template>
    <div>
        <el-row>
            <el-col :span="24" class="produInfo"> 
                中文标题:<span>qqqq</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                中文描述:<span>qqqq</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                供应商所在地:<span>qqqq</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                必要认证附件:<span>qqqq</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                推荐认证附件：<span>qqqq</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                认证备注:<span>qqqq</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                工厂提供照片：<span>qqqq</span>
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


</style>