<template>
    <div>
        <el-drawer
            title="备注"
            :visible.sync="drawer"
            :direction="direction"
            :modal='false'
            size="30%"
            :before-close="handleClose">
            
            <div class="remarksBox">
                <div v-for='item in remarksList' :key="item.key"  class="bubbleText">
                    <div class="bubbleLOutBox">
                        <div>{{item.trueName}}</div>
                        
                        <!-- <div>{{item.createdon}}</div> -->
                    </div>
                    <div class="bubbleROutBox">
                        <div class="bubbleTail"></div>
                        <div class="bubbleBox"></div>
                    </div>
                </div>
            </div>
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
        remarksList: {
            type: Array,
            default:() => ([])
        },
    },
    methods:{
         handleClose(done) {
            // this.$confirm('确认关闭？')
            // .then(_ => {
                done();
            // })
            // .catch(_ => {});
        },
        openHandle(){
             this.drawer = true
        }
    }
}
</script>
<style lang="scss" scoped>
    .remarksBox{
        margin-left: 20px;
        height: 100%;
        width: 100%;
        .bubbleText{
            display: flex;
            height: 70px;
            .bubbleLOutBox{
                height: 50px;
                width: 45px;
                padding-top: 8px;
            }
            .bubbleROutBox{
                display: flex;
                position: relative;
            .bubbleTail{
                    position:absolute;
                    right: -20px;
                    top: 8px;
                    width:0;
                    height:0;
                    border-width:10px;
                    border-style:solid;
                    border-color:transparent;
                    border-right-width:16px;
                    border-right-color:currentColor;
                    color:#dddddd;
                }
                .bubbleBox{
                    position:absolute;
                    right: -130px;
                    top: 0px;
                    width: 113px;
                    height: 40px;
                    background-color:#dddddd; ;
                }
            }
        }
        
    }
    
</style>