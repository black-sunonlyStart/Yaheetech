<template>
    <div>
         <el-row>
            <el-col :span="8">
                <span>开发类型:</span>
                <span></span>
            </el-col>
            <el-col :span="8">
                <span>开发场景:</span>
                <span></span>
            </el-col>
            <el-col :span="8">
                <span>关联产品:</span>
                <span></span>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="8">
                <span>所属分类:</span>
                <span></span>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name:'devDetail'
}
</script>
<style lang="scss" scoped>
    .textSpeaing{
          margin-top: 15px;
      }
</style>