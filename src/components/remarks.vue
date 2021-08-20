<template>
    <div>
        <el-drawer
            title="我是标题"
            :visible.sync="drawer"
            :direction="direction"
            :before-close="handleClose">
            <span>我来啦!</span>
        </el-drawer>
    </div>
</template>
<script>
export default {
    data(){
        return {
            drawer: false,
            direction: 'ltr',
        }
    },
    props:{
        // controlsRemarks: {
        //     type: Boolean,
        //     default: false
        // },
    },
    methods:{
         handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        openHandle(){
             this.drawer = true
        }
    }
}
</script>
<style lang="scss" scoped>

</style>