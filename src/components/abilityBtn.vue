<template>
    <span>
        <el-button size="mini" @click="addProctList">开发产品</el-button>
        <el-button size="mini">导出报表</el-button>
        <el-button size="mini">更换负责人</el-button>
        <el-button size="mini">冻结数据</el-button>
        <el-button size="mini">资料初审通过</el-button>
        <el-button size="mini">综审通过</el-button>
    </span>
</template>
<script>
    export default {
        name:'abilityBtn',
        data(){
            return {
                
            }
        },
        methods:{
            addProctList(){
                this.$router.push({name:'productDetails',})
            }
        }
    }
    
</script>
<style lang="scss" scoped>

</style>