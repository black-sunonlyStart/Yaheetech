<template>
    <div>
         <el-row>
            <el-col :span="10">
                <span class="imageMainbox">{{M2('产品星级评分')}}： </span>
                <span class="imageMainboxText">{{salesTargetDetaiList.xsstarrating}}</span>
            </el-col>
            <el-col :span="10">
                <span class="imageMainbox">{{M2('目标采购价')}}： </span>
                <span class="imageMainboxText">{{salesTargetDetaiList.xspurchaseprice}} {{salesTargetDetaiList.xspurchasePriceCurrency==2 ? '$' : "￥"}}</span>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                <span class="imageMainbox">{{M2('我司目标星级评分')}}： </span>
                <span class="imageMainboxText">{{salesTargetDetaiList.xstargetstarrating}}</span>
            </el-col>
            <el-col :span="10">
                <span class="imageMainbox">{{M2('产品预估日销量')}}： </span>
                <span class="imageMainboxText">{{salesTargetDetaiList.xsdailysales}}</span>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                <span class="imageMainbox">{{M2('目标售后返修率要求')}}： </span>
                <span class="imageMainboxText">{{salesTargetDetaiList.xsrepairraterequirement ? salesTargetDetaiList.xsrepairraterequirement + '%' : '' }}</span>
            </el-col>
            <el-col :span="10">
                <span class="imageMainbox">{{M2('预估首单订单数量')}}： </span>
                <span class="imageMainboxText">{{salesTargetDetaiList.xsfirstorderquantity}}</span>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                <div class="boxFlex">
                    <span class="imageMainbox">{{M2('产品开发市场')}}： </span>
                    <div class="imageMainboxText" style="width:520px;dispaly:inline-block;white-space: pre-wrap;">{{salesTargetDetaiList.xsmarket}}</div>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="boxFlex">
                    <span class="imageMainbox">{{M2('产品包装尺寸特殊要求')}}： </span>
                    <div class="imageMainboxText" style="width:520px;dispaly:inline-block;white-space: pre-wrap;">{{salesTargetDetaiList.xsspecialrequirements}}</div>
                </div>       
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                <span class="imageMainbox">{{M2('产品测样时间点')}}： </span>
                <span class="imageMainboxText">{{salesTargetDetaiList.xstestsampletime  ? $moment(salesTargetDetaiList.xstestsampletime).format("YYYY-MM-DD"):''}}</span>
            </el-col>
            <el-col :span="10">
                <span class="imageMainbox">{{M2('预计下单日期')}}： </span>
                <span class="imageMainboxText">{{salesTargetDetaiList.xsorderoftime  ?$moment(salesTargetDetaiList.xsorderoftime).format("YYYY-MM-DD"):''}}</span>
            </el-col>
        </el-row>
        <el-row class="textSpeaing" v-if="salesTargetDetaiList.showPlanToOrder">
            <el-col :span="10">
                
            </el-col>
            <el-col :span="10">
                <span class="imageMainbox">{{M2('是否计划下单')}}： </span>
                <span class="imageMainboxText">{{salesTargetDetaiList.planToOrderStr}}</span>
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
          width: 180px;
          display: inline-block;
          flex-shrink: 0;
          .imageMainboxText{
              font-weight: normal;
              display: inline-block;
          }
      }
      .boxFlex{
          display: flex;
      }
</style>