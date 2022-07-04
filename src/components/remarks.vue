<template>
    <div>
        <el-drawer
            :visible.sync="drawer"
            :direction="direction"
            :modal='false'
            :size="750"
            style="height:80%;margin-top:197px;"
            :withHeader='false'
            >
            <div scope="title" class="titleRemarks">
                备注
            </div>
            <div class="remarksBox">
                <div v-for='item in remarksList' :key="item.key"  class="bubbleText">
                    <div :class="item.createdby == oemployee.Id || item.otherType == 0 ?'bubbleROutBoxCont':'bubbleLOutBox'">
                        <div>
                            <i v-if="item.createdby == oemployee.Id || item.otherType == 0 " class="el-icon-user isRight"></i><span class="text-box">{{item.trueName}}</span>
                            <i v-if="item.createdby != oemployee.Id " class="el-icon-user isLeft"></i>
                        </div>
                        <div class="moment-time">{{$moment(item.createdon).format("YYYY-MM-DD HH:mm:ss")}}</div>
                    </div>
                    <div class="bubbleROutBox">
                        <div :class="item.createdby == oemployee.Id || item.otherType == 0 ?'bubbleTailRight':'bubbleTail'"></div>
                        <div :class="item.createdby == oemployee.Id || item.otherType == 0 ?'bubbleBoxRight':'bubbleBox'" >
                            <div class="topStatusTitle" :style="{color:(item.backtype || item.otherType == 0?'red':'')}">
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
          <div contenteditable="true" class="content-div" ref="contentDiv">

          </div>
          <div class="buttonQuill">
              <el-button type="primary" size="mini">上传图片</el-button> <el-button  type="primary" size="mini" @click="sendEditQuill()">发送(send)</el-button>
          </div>  
        </el-drawer> 
    </div>
</template>
<script>
import { saveDevelopmentmemo } from '@/api/user.js'
export default {
    components:{
    },
    data(){
        return {
            drawer: false,
            direction: 'ltr',
            content: `11111<br>11111111<br>11111111<br>11111111<br>11111111<br>11111111<br>11111111<br>11111111`,
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
    watch:{
    //   content:{
    //       handler:function(val){debugger
    //           if(val){
    //             this.pageNum = 1
    //             this.getTableList(val)
    //           }
    //       },
    //       deep:true
    //   }
  },
    created(){
    },
    computed:{
    },
    methods:{
        sendEditQuill(){
            let params = {
                developmentid:this.$route.params.developmentId?this.$route.params.developmentId:'',
                productid:this.$route.params.productId?this.$route.params.productId:'',
                productcountryid:this.$route.params.productCountryId?Number(this.$route.params.productCountryId):'',
                note:this.content,
                otherType:1,
          }
          saveDevelopmentmemo(params).then(res => {
              if(res.code == 200){
                  this.$emit('getAllpageList')
              }
          })
        },
        openHandle(){
             this.drawer = true
        },
    }
}
</script>
<style lang="scss" scoped>
.content-div {
    width: 750px;
    height: 184px;
    border: 1px solid #ccc;
    padding: 10px;
}
    .remarksBox{
        width: 100%;
        max-height: 476px;
        overflow-y: auto;
        padding-bottom: 30px;
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
                    position:relative;
                    right: -8px;
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
                    position:relative;
                    right: -600px;
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
                    position:relative;
                    right: -4px;
                    top: 0px;
                    min-width: 140px;
                    background-color:#eeeeee; 
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
                    position:relative;
                    right: -434px;
                    top: 0px;
                    width: 140px;
                    background-color:#eeeeee; 
                    border: 1px solid #cccccc;
                    .topStatusTitle{
                        font-weight: bold;
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
        min-height: 50px;
        width: 123px
    }
    .addColor{
        color: red;
    }
    .text-box{
        font-size: 14px;
        text-decoration: underline;
        max-width: 53px;
        display: inline-block;
        overflow: auto;
    }
    .moment-time{
        color: #cccccc;
    }
   ::v-deep .el-drawer__body {
        position: relative;
         .buttonQuill {
            position: absolute;
            bottom: 16px;
            right: 10px;
        }
    }
    ::v-deep .ql-container {
        max-height: 138px;
        overflow-y: auto;
    }
</style>