<template>
    <div>
        <el-row>
            <el-col :span="24" class="produInfo"> 
                是否需要认证：<span>qqqq</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                必要认证：<span>qqqq</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                必要认证其他：<span>qqqq</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                推荐认证：<span>qqqq</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                认证备注：<span>qqqq</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                产品年龄段：<span>qqqq</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                专利风险等级：<span>qqqq</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="produInfo">
                专利确认：<span>qqqq</span>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name:'prodCerInfoDetail',
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