<template>
    <div class="buttonStyle">
        <el-button v-for="item in operationList" :key="item.id" size="mini" type="primary">{{item.name}}</el-button>
    </div>
</template>
<script>
export default {
    name:'operationButton',
    data(){
        return {
            operationList:[]
        }
    },
    props:{
        nowStatus:{
            type:Number,
            default:() => {0}
        }
    },
    mounted(){
        this.openOperation(this.nowStatus)
    },
    methods:{
        openOperation(state){
          if(state == 0){
              this.operationList = [
                  {
                    name:'提交审批',
                    id:1
                  },
                  {
                    name:'取消开发',
                    id:3
                  },
                  {
                    name:'开发新市场',
                    id:26
                  },
              ]
          }else if(state == 1){
              this.operationList = [
                  {
                    name:'审批通过',
                    id:2
                  },
                  {
                    name:'打回',
                    id:4
                  },
                  {
                    name:'取消开发',
                    id:3
                  },
                  {
                    name:'开发新市场',
                    id:26
                  },
              ]
          }else if(state == 2){
              this.operationList = [
                  {
                    name:'提交采购主管审核',
                    id:5
                  },
                  {
                    name:'更改采购开发员',
                    id:6
                  },
                  {
                    name:'打回',
                    id:4
                  },
                  {
                    name:'开发新市场',
                    id:26
                  },
                  {
                    name:'开发新尺码',
                    id:8
                  },
              ]
          }else if(state == 3){
              this.operationList = [
                  {
                    name:'审批通过',
                    id:25
                  },
                  {
                    name:'开发新尺码',
                    id:8
                  },
                  {
                    name:'取消开发',
                    id:3
                  },
                  {
                    name:'更改采购开发员',
                    id:6
                  },
                  {
                    name:'打回',
                    id:4
                  },
                  {
                    name:'开发新市场',
                    id:26
                  },
              ]
          }else if(state == 4){ //1 4 5 6 7 9 10
              this.operationList = [
                  {
                    name:'提交利润复核',
                    id:15
                  },
                  {
                    name:'开发新尺码',
                    id:8
                  },
                  {
                    name:'打回',
                    id:4
                  },
                  {
                    name:'更改采购开发员',
                    id:6
                  },
                  {
                    name:'开发新市场',
                    id:26
                  },
              ]
          }else if(state == 5){
              this.operationList = [
                  {
                    name:'审批通过',
                    id:25
                  },
                  {
                    name:'开发新尺码',
                    id:8
                  },
                  {
                    name:'打回',
                    id:4
                  },
                  {
                    name:'取消开发',
                    id:3
                  },
                  {
                    name:'更改采购开发员',
                    id:6
                  },
                  {
                    name:'开发新市场',
                    id:26
                  },
              ]
          }else if(state == 6){
              this.operationList = [
                  {
                    name:'审批通过',
                    id:25
                  },
                  {
                    name:'开发新尺码',
                    id:8
                  },
                  {
                    name:'打回',
                    id:4
                  },
                  {
                    name:'取消开发',
                    id:3
                  },
                  {
                    name:'更改采购开发员',
                    id:6
                  },
                  {
                    name:'开发新市场',
                    id:26
                  },
              ]
          }else if (state == 7){
              console.log(state)
          } else if(state == 10){
              this.operationList = [
                  {
                    name:'审批通过',
                    id:25
                  },
                  {
                    name:'打回',
                    id:4
                  },
                  {
                    name:'开发新尺码',
                    id:8
                  },
                  {
                    name:'更改采购开发员',
                    id:6
                  },
              ]
          }else if(state == 11){
              this.operationList = [
                    {
                        name:'提交寻找供应商',
                        id:10
                    },
                  {
                    name:'打回',
                    id:4
                  },
                  {
                    name:'开发新市场',
                    id:26
                  },
              ]
          }else if(state == 12){
              this.operationList = [
                  {
                    name:'审批通过',
                    id:25
                  },
                  {
                    name:'提交利润初审',
                    id:11
                  },
                  {
                    name:'打回',
                    id:4
                  },
                  {
                    name:'开发新市场',
                    id:26
                  },
                  {
                    name:'开发新尺码',
                    id:8
                  },
              ]
          }else if(state == 13){
              this.operationList = [
                  {
                    name:'审批通过',
                    id:25
                  },
                  {
                    name:'打回',
                    id:4
                  },
                  {
                    name:'取消开发',
                    id:3
                  },
                  {
                    name:'开发新市场',
                    id:26
                  },
                  {
                    name:'开发新尺码',
                    id:8
                  },
              ]
          }else if(state == 14){
              this.operationList = [
                  {
                    name:'返回冻结前状态',
                    id:13
                  },
              ]
          }else if (state == 9){
              console.log(state)
          }else if (state == 10){ //0 2 3 8
              this.operationList = [
                  {
                    name:'审批通过',
                    id:25
                  },
                  {
                    name:'开发新市场',
                    id:26
                  },
                  {
                    name:'开发新尺码',
                    id:8
                  },
                ]
          }else if(state == '') {
              this.operationList = []
          }
      }
    }
}
</script>
<style scoped lang="scss">
.buttonStyle{
    display: flex;
    justify-content: flex-end;
    border: 1px solid #ffffff;
    background-color: #ffffff;
    position: fixed;
    bottom: 0px;
    right: 0px;
    width: 100%;
    padding: 5px;
    box-shadow: -5px -5px 5px #cccccc
}
</style>
