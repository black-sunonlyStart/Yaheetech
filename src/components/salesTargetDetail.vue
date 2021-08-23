<template>
    <div>
         <el-row>
            <el-col :span="8">
                <span>产品星级评分:</span>
                <span></span>
            </el-col>
            <el-col :span="8">
                <span>目标采购价:</span>
                <span></span>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="8">
                <span>我司目标星级评分:</span>
                <span></span>
            </el-col>
            <el-col :span="8">
                <span>产品预估日销量:</span>
                <span></span>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="8">
                <span>目标售后返修率要求:</span>
                <span></span>
            </el-col>
            <el-col :span="8">
                <span>预估首单订单数量:</span>
                <span></span>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="8">
                <span>产品开发市场:</span>
                <span></span>
            </el-col>
            <el-col :span="8">
                <span>产品包装尺寸特殊要求:</span>
                <span></span>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="8">
                <span>产品测样时间点:</span>
                <span></span>
            </el-col>
            <el-col :span="8">
                <span>产品下单时间点:</span>
                <span></span>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name:'salesTargetDetail'
}
</script>
<style lang="scss" scoped>
    .textSpeaing{
          margin-top: 15px;
      }
</style>