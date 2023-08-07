<template>
    <div class="nav-container">
      <el-card class="nav-card">
         <slot name="navContent"></slot>
      </el-card>
      <el-card class="mainTable-card">
         <slot name="mainContent"></slot>
      </el-card>
    </div>
</template>
<script>
export default {
    name:'commonTPage',
}
</script>
<style lang="scss" scoped>
.nav-container {
    width: 100%;
    background-color: rgba(230, 230, 230, 1);
    ::v-deep .nav-card {
        margin: 0px 5px;
        width: 99%;
        z-index: 999;
        .el-card__body{
            padding: 0px 20px;
        }
    }
    ::v-deep.mainTable-card {
        margin: 0px 5px;
        position: relative;
        width: 99%;
        .el-card__body{
            padding: 5px 20px 40px 20px;
            overflow-y: auto;
        }
    }
}

</style>