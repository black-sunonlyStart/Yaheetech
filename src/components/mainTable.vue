<template>
  <div class="tableMain">
    <el-table 
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange"
        height="640"
        :header-cell-style="{background:'#f5f7fa',color:'#606266'}"
        @row-click="handleRowClick"
        >
      <el-table-column 
        type="selection"
        width="55"
        >
      </el-table-column>
      <el-table-column 
        label="产品图片"
        width="100">
        <template slot-scope="scope">
            <div :class="scope.row.developmentScenarios < 8 ?'imageTitel':'imageTitelRed'">{{showScenarios(scope.row.developmentScenarios)}}</div>
            <el-popover
                placement="right"
                title=""
                trigger="hover">
                <el-image
                    style="width: 200px; height: 200px; dispaly:black"
                    :key="scope.row.showImgUrl" 
                    :src="scope.row.showImgUrl" 
                    fit="fill">
                </el-image>
                <el-image
                    slot="reference"
                    style="width: 80px; height: 80px; dispaly:black;margin-top:3px"
                    :key="scope.row.showImgUrl" 
                    :src="scope.row.showImgUrl" 
                    lazy
                    :scroll-container="scrollContainer"
                    fit="fill">
                </el-image>
         </el-popover>

        </template>
      </el-table-column>
      <el-table-column 
            prop="name"
            label="开发市场"
            width="120"
            >
        <template slot-scope="scope">
            <div class="remarksTitle">{{scope.row.countryName}}</div>
            <div v-for="item in scope.row.otherCountryNames" :key="item">{{item}}</div>
        </template>
      </el-table-column>
      <el-table-column 
            prop="productTypeName"
            label="产品名称"
            >
        <template slot-scope="scope">
            <div class="remarksenTitle" @click="routerMove(scope.row.developmentId,scope.row.productId,scope.row.id)">{{scope.row.enTitle}}</div>
            <div>{{scope.row.title || null}}</div>
            <div>普通产品:{{scope.row.developmentId}}</div>
            <div>sku别名:{{scope.row.skuAlias}}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="产品利润"
        show-overflow-tooltip
        >
        <template slot-scope="scope">
            <div v-for="item in scope.row.productMarketStrs" :key="item.platformName">
                <div style="font-weight:bold">{{item.platformName}}:</div>
                <div>{{item.currency}} {{item.developmentPrice.toFixed(2)}} /
                    <el-tooltip :content="rows.warehouseName" effect="dark" placement="top"  v-for="rows in item.marketProfits " :key="rows.warehouseId">
                        <span :class="rows.profitMargin < 0 ? 'boxColor':''">{{rows.profitMargin + '%' + ' ' + '/'}}</span>
                    </el-tooltip>
                </div>
            </div>
        </template>
      </el-table-column>
      <el-table-column 
            label="产品尺寸 / 属性"
            show-overflow-tooltip
            width="120px"
        >
        <template slot-scope="scope">
            <div>{{scope.row.size}}</div>
            <div v-if="scope.row.packingWay == '多箱'" style="color:red">{{scope.row.packingWay}}</div>
            <div v-if="scope.row.shape == '不规则'" style="color:red">{{scope.row.shape }}</div>
        </template>
      </el-table-column>
      <el-table-column 
            prop="categoryName"
            label="产品分类"
            show-overflow-tooltip
            width="300px"
            >
      </el-table-column>
      <el-table-column 
            prop="stateName"
            label="开发状态"
            show-overflow-tooltip
            width="150px"      
        >
      </el-table-column>
      <el-table-column 
            label="业务 / 采购"
            show-overflow-tooltip
            width="120px" >
            <template slot-scope="scope">
                <div>{{scope.row.businessName}}</div>
                <div>{{scope.row.buyerName}}</div>
            </template>
      </el-table-column>
      <el-table-column 
        label="创建/更新时间"
        show-overflow-tooltip>
            <template slot-scope="scope">
                <div>{{$moment(scope.row.createdOn).format("YYYY-MM-DD HH:mm")}}</div>
                <div>{{$moment(scope.row.modifyOn).format("YYYY-MM-DD HH:mm")}}</div>
                <div :class="scope.row.priority == 0? 'priorityStyle':'smallPriorityStyle'">{{getPriority(scope.row.priority)}}</div>
            </template>
      </el-table-column>
      <el-table-column 
        label="操作"
        show-overflow-tooltip
        width="100px"
        >
        <template slot-scope="scope">
            <div class="operaBox">
                <el-tooltip class="item" effect="dark" content="编辑" placement="bottom-start">
                    <div class="imageBox" @click="clickEdit(scope.row.developmentId,scope.row.productId,scope.row.id)"></div>
                </el-tooltip>
                <el-popover
                    placement="bottom"
                    width="100"
                    trigger="click">
                    <div class="operationBox" v-for="item in operationList" :key="item.id"> 
                        <div class="operationText" @click="putOperation(scope.row,item.id)">{{item.name}}</div>
                    </div>
                    <div class="imageBox1" slot="reference" @click="openOperation(scope.row)"></div>
                </el-popover>
            </div>
        </template>             
      </el-table-column>
    </el-table>
    <div>
        <el-pagination 
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[50, 100, 150, 200]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            class="pagePosition"
            >
        </el-pagination>
    </div>
    <messageDialog :clickId='clickId' :dialogName='dialogName' ref="messageDialog" @getTableList='getTableList' :row='row' :navFilterList='navFilterList'></messageDialog>
  </div>

</template>
<script>
import { fetchPageTableList,unfreezing } from '@/api/user.js'
import { formatDate } from '@/utils/tools.js'
export default {
  name: 'mainTable',
  components:{
      messageDialog:() => import('./messageDialog.vue')
  },
  data () {
    return {
      row:{},
      dialogName:'',
      operationList:{},
      currentPage4: 1,
      tableData: [],
      multipleSelection: [],
      pageSize:50,
      pageNum:1,
      total:50,
      dialogVisible: false,
      clickId:0
    }
  },
  props:{
      navFilterList:{
      type: Object,
      default:() => ({})
    },
  },
  watch:{
      navFilterList:{
          handler:function(val){
              if(val){
                this.getTableList(val)
              }
          },
          deep:true
      }
  },
  computed:{
      scrollContainer(){
          return document.querySelector('.el-table__body-wrapper')
      }
  },
  mounted(){
      this.getTableList(this.navFilterList)
  },
  methods: {
      showScenarios(val){
          if(val == 1){
              return '新产品'
          }else if(val == 2){
              return '新市场'
          }else if(val == 3){
              return '新尺码'
          }else if(val == 10){
              return '二 · 产品'
          }else if(val == 11){
              return '二 · 市场'
          }else if(val == 12){
              return '二 · 尺寸'
          }
      },
      handleRowClick(row){
          this.$refs.multipleTable.toggleRowSelection(row);
      },
      getPriority(val){
          if(val == 0){
              return '高优先级'
          }else if(val == 1){
              return '中优先级'
          }else{
              return '低优先级'
          }
      },
      clickEdit(devId,proId,procountryId){
          let routeData = this.$router.resolve({
            name: "productDetails",
            params:{
                    developmentId:devId,
                    productId:proId,
                    productCountryId:procountryId,
                }
            });
            window.open(routeData.href, '_blank');
      },
      putOperation(row,id){
          this.clickId = id
          if(id == 1){
            this.dialogName = '提交审批' 
          }else if (id == 2){
            this.dialogName = '审批通过' 
          }else if(id == 3){
            this.dialogName = '取消开发' 
          }else if (id == 4){
            this.dialogName = '打回'
          }else if (id == 5){
            this.dialogName = '提交采购主管审核'
          }else if (id == 6){
            this.dialogName = '更改采购开发员'
          }else if (id == 7){
            this.dialogName = '样品采购审核'
          }else if (id == 8){
            let routeData = this.$router.resolve({
            name: "productDetails",
            params:{
                    row,
                    id
                }
            });
            window.open(routeData.href, '_blank');
          }else if (id == 9){
              this.dialogName='终审通过'
              this.clickId = 2
          }else if (id == 10){
              this.dialogName ='提交寻找供应商'
          }else if (id == 11){
              this.dialogName ='提交利润初审'
          }else if (id == 12){
              this.dialogName='审核通过'
              this.clickId = 2
          }else if (id == 13){
              let params = {
                  productCountryIds:row.id
              }
              unfreezing(params).then((res) => {
                  if(res.code == 200){
                      this.$message({
                        type: 'success', 
                        message:'解冻成功',
                        offset:220
                    })
                      this.getTableList(this.navFilterList)
                  }
              }) 
          }else if(id == 14){
             this.dialogName ='提交利润初审'
          }else if (id == 26){
              let routeData = this.$router.resolve({
                name: "productDetails",
                params:{
                        developmentId:row.developmentId,
                        productId:row.productId,
                        productCountryId:row.productCountryId,
                    }
                });
            window.open(routeData.href, '_blank');
            return
          }else if(id == 15){
             this.dialogName ='提交利润复核'
          }
          this.row = row
          if(id != 13 && id != 8 && id != 26) {
              this.$refs.messageDialog.openDialog()
          }
           
      },
      openOperation(row){
          if(row.state == 0){
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
          }else if(row.state == 1){
              this.operationList = [  //1  13 12 3 10 5 6 
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
          }else if(row.state == 2){
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
          }else if(row.state == 3){
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
          }else if(row.state == 4){ //1 4 5 6 7 9 10
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
          }else if(row.state == 5){
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
          }else if(row.state == 6){
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
          }else if (row.state == 7){
              console.log(row)
          } else if(row.state == 10){
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
          }else if(row.state == 11){
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
          }else if(row.state == 12){
              this.operationList = [
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
          }else if(row.state == 13){
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
          }else if(row.state == 14){
              this.operationList = [
                  {
                    name:'返回冻结前状态',
                    id:13
                  },
              ]
          }else if (row.state == 9){
              console.log(row)
          }else if (row.state == 10){ //0 2 3 8
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
          }
      },
      routerMove(devId,proId,procountryId){
          let routeData = this.$router.resolve({
            name: "productDetails",
            params:{
                    developmentId:devId,
                    productId:proId,
                    productCountryId:procountryId,
                }
            });
            window.open(routeData.href, '_blank');
      },
    getTableList(val){
        let params = {
            pageNum :this.pageNum,
            pageSize:this.pageSize,
            timeType:val.timeType == 0 ? 0 : val.timeType,
            dateFrom:val.dateFrom,
            dateTo:val.dateTo,
            countryCodes:val.countryCodes,
            seekEnd:val.seekEnd,
            auth:val.auth,
            state:val.state ? val.state:[0,1,2,3,4,5,6,10,11,12,13],
            productOwner:val.productOwner,
            scenariosParentIds:val.scenariosParentIds,
            sampleDelivery:val.sampleDelivery,
            patentProduct:val.patentProduct,
            search:val.search
        }
        fetchPageTableList(params).then(res => {
            if(res.data && res.data.rows){
                res.data.rows.forEach(item => {
                    item.showImgUrl = `${process.env.VUE_APP_NEWIMAGE_API}/${item.imagesUri}`
                });
              }
            this.currentPage4 = res.data && res.data.pageNum ? res.data.pageNum : 0
            this.tableData = res.data && res.data.rows ? res.data.rows : []
            this.total = res.data && res.data.rows ? res.data.records : 0
        
        })
        
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
      this.$emit('putTbleSelection',val)
    },
    handleSizeChange (val) {
        this.pageSize = val
        this.getTableList(this.navFilterList)
    },
    handleCurrentChange (val) {
        this.pageNum = val
        this.getTableList(this.navFilterList)
    },
    getFormatDate(data){
        let newTime = formatDate(data)
        return newTime
    }
  }
}
</script>
<style lang="scss" scoped>
.imageTitel {
    display: inline-block;
    font-size: 12px;
    // font-weight: bold;
    z-index: 10000;
    position: absolute;
    right: 0px;
    color: #3366cc;
    background-color: #ffffff;
    border: 1px dashed #cccccc;
}
.imageTitelRed {
    display: inline-block;
    font-size: 12px;
    // font-weight: bold;
    z-index: 10000;
    position: absolute;
    right: 0px;
    color: red;
    background-color: #ffffff;
    border: 1px dashed #cccccc;
}
.remarksTitle{
    color: #3366cc;
    cursor: pointer;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
}
.remarksenTitle{
    color: #3366cc;
    cursor: pointer;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    
    &:hover{
        background-color:#3366cc ;
        color: #ffffff;
        display: inline-block;
    }
}
.pagePosition{
    float: right;
}
::v-deep.tableMain{
    overflow: auto;
    .el-table{
        .el-table__body-wrapper .is-scrolling-none .scroll-container{
            .el-table__body{
                overflow: auto;
            }
            
        }
    }
    
}
.boxColor{
    color: red;
}
.operationBox{
    width: 100px;
    .operationText{
        &:hover{
            color: #3366cc;
            cursor: pointer;
        }
    }
}
.operaBox{
    display: flex;

    .imageBox{
        height: 18px;
        width: 18px;
        // float: left;
        background-image: url(../assets/bianji.png);
    }
    .imageBox1{
        margin-left: 10px;
        height: 22px;
        width: 22px;
        // float: left;
        background-image: url(../assets/shenhe.png);
    }
    
}
::v-deep.el-table {
    td {
        padding: 2px 0 2px 0 !important;
    }
    .cell{
            line-height: 18px !important;
        }
}
.priorityStyle{
    color: red;
}
.smallPriorityStyle{
    color: #cccccc;
}

</style>