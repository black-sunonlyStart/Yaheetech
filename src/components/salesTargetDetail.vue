<template>
    <div>
         <el-row>
            <el-col :span="8">
                <span class="imageMainbox">产品星级评分: </span>
                <span class="imageMainboxText">{{salesTargetDetaiList.xsstarrating}}</span>
            </el-col>
            <el-col :span="8">
                <span class="imageMainbox">目标采购价: </span>
                <span class="imageMainboxText">{{salesTargetDetaiList.xspurchaseprice}} {{salesTargetDetaiList.xspurchasePriceCurrency==2 ? '$' : "￥"}}</span>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="8">
                <span class="imageMainbox">我司目标星级评分: </span>
                <span class="imageMainboxText">{{salesTargetDetaiList.xstargetstarrating}}</span>
            </el-col>
            <el-col :span="8">
                <span class="imageMainbox">产品预估日销量: </span>
                <span class="imageMainboxText">{{salesTargetDetaiList.xsdailysales}}</span>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="8">
                <span class="imageMainbox">目标售后返修率要求: </span>
                <span class="imageMainboxText">{{salesTargetDetaiList.xsrepairraterequirement ? salesTargetDetaiList.xsrepairraterequirement + '%' : '' }}</span>
            </el-col>
            <el-col :span="8">
                <span class="imageMainbox">预估首单订单数量: </span>
                <span class="imageMainboxText">{{salesTargetDetaiList.xsfirstorderquantity}}</span>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="8">
                <span class="imageMainbox">产品开发市场: </span>
                <span class="imageMainboxText">{{salesTargetDetaiList.xsmarket}}</span>
            </el-col>
            <el-col :span="8">
                <span class="imageMainbox">产品包装尺寸特殊要求: </span>
                <span class="imageMainboxText">{{salesTargetDetaiList.xsspecialrequirements}}</span>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="8">
                <span class="imageMainbox">产品测样时间点: </span>
                <span class="imageMainboxText">{{salesTargetDetaiList.xstestsampletime  ? $moment(salesTargetDetaiList.xstestsampletime).format("YYYY-MM-DD"):''}}</span>
            </el-col>
            <el-col :span="8">
                <span class="imageMainbox">产品下单时间点: </span>
                <span class="imageMainboxText">{{salesTargetDetaiList.xsorderoftime  ?$moment(salesTargetDetaiList.xsorderoftime).format("YYYY-MM-DD"):''}}</span>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name:'salesTargetDetail',
    props:{
        salesTargetDetaiList:{
        type: Object,
        default: function() {
          return {
           
          };
        }
      }
    }
}
</script>
<style lang="scss" scoped>
    .textSpeaing{
          margin-top: 15px;
      }
      .imageMainbox{
          text-align: right;
          font-weight: bold;
          width: 150px;
          display: inline-block;
          .imageMainboxText{
              font-weight: normal;
          }
      }
</style>