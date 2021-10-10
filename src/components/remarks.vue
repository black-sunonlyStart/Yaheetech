<template>
    <div>
        <el-drawer
            :visible.sync="drawer"
            :direction="direction"
            :modal='false'
            size="20%"
            style="height:80%;margin-top:197px;"
            :before-close="handleClose"
            :withHeader='false'
            >
            <div scope="title" class="titleRemarks">
                备注
            </div>
            <div class="remarksBox">
                <div v-for='item in remarksList' :key="item.key"  class="bubbleText">
                    <div :class="item.backtype  ?'bubbleROutBoxCont':'bubbleLOutBox'">
                        <div><i v-if="!item.backtype" class="el-icon-user isLeft"></i>{{item.trueName}}<i v-if="item.backtype " class="el-icon-user isRight"></i></div>
                        <div>{{$moment(item.createdon).format("YYYY-MM-DD HH:mm:ss")}}</div>
                        <!-- <div>{{item.createdon}}</div> -->
                    </div>
                    <div class="bubbleROutBox">
                        <div :class="item.backtype ?'bubbleTailRight':'bubbleTail'"></div>
                        <div :class="item.backtype ?'bubbleBoxRight':'bubbleBox'">
                            <div class="topStatusTitle">
                                <span >{{item.statusValue}}</span>
                                <span class="bubbleBoxText">{{item.operation}}</span>
                            </div>
                            <div class="bubbleBoxMainText">
                                {{item.note}}
                            </div>
                        </div>
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
        employee: {
            type: Object,
            default:() => ({})
        },
        oemployee: {
            type: Object,
            default:() => ({})
        },
    },
    created(){
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
        // margin-left: 20px;
        height: 100%;
        width: 100%;
        .el-icon-user{
            border-radius: 50%;
            background-color: #cccccc;
            color: #ffffff;
            font-size: 17px;
        }
        .bubbleText{
            display: flex;
            min-height: 100px;
            margin-left: 15px;
            margin-top: 15px;
            position:relative;
            // overflow-y: auto;
            // overflow: hidden;
            .isLeft{
                margin-right: 5px;
            }
            .isRight{
                margin-left: 5px;
            }
            .bubbleLOutBox{
                height: 50px;
                width: 75px;
                padding-top: 8px;
            }
            .bubbleROutBoxCont{
                height: 50px;
                width: 75px;
                padding-top: 8px;
                position: absolute;
                right: 23px
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
                    color:#eeeeee;
                }
                .bubbleTailRight{
                    position:absolute;
                    left: 230px;
                    top:10px;
                    width:0;
                    height:0;
                    border-width:10px;
                    border-style:solid;
                    border-color:transparent;
                    border-left-width:16px;
                    border-left-color:currentColor;
                    color:#eeeeee;
                    }
                .bubbleBox{
                    padding: 5px;
                    border-radius: 5px;
                    position:absolute;
                    right: -160px;
                    top: 0px;
                    min-width: 140px;
                    // height: 40px;
                    background-color:#eeeeee; 
                    // border: 1px solid #cccccc;
                    .topStatusTitle{
                        font-weight: bold;
                        .bubbleBoxText{
                            float: right;
                        }
                    }
                }
                .bubbleBoxRight{
                    padding: 5px;
                    border-radius: 5px;
                    position:absolute;
                    right: -230px;
                    top: 0px;
                    width: 140px;
                    // height: 40px;
                    background-color:#eeeeee; 
                    border: 1px solid #cccccc;
                    .topStatusTitle{
                        font-weight: bold;
                        color: red;
                        .bubbleBoxText{
                            float: right;
                        }
                    }
                }
            }
        }
        
    }
    .titleRemarks{
        font-weight: bold;
        // margin: 15px 0 15px 15px;
        font-size: 16px;
        border-bottom: 1px solid #cccccc;
        padding: 15px
    }
    ::v-deep.el-drawer{
        .el-drawer__header{
            padding-bottom: 0px !important;
            border:1px solid #cccccc;
        }
    }
    .bubbleBoxMainText{
        height: 50px;
        overflow-y: auto;
    }
    
</style>