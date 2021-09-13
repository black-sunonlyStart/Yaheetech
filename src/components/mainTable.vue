<template>
  <div class="tableMain">
    <el-table 
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange"
        height="500"
        :header-cell-style="{background:'#f5f7fa',color:'#606266'}"
        >
      <el-table-column 
        type="selection"
        width="55"
        >
      </el-table-column>
      <el-table-column 
        label="产品图片"
        width="120">
        <template slot-scope="scope">
            <el-image
                style="width: 100px; height: 100px; dispaly:black"
                :key="scope.row.showImgUrl" 
                :src="scope.row.showImgUrl" 
                lazy
                :scroll-container="scrollContainer"
                fit="fill">
            </el-image>
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
            show-overflow-tooltip
            >
        <template slot-scope="scope">
            <div class="remarksTitle" @click="routerMove(scope.row.developmentId,scope.row.productId,scope.row.id)">{{scope.row.enTitle}}</div>
            <div>{{scope.row.title}}</div>
            <div>普通产品:{{scope.row.developmentId}}</div>
            <div>sku别名:{{scope.row.title}}</div>
        </template>
      </el-table-column>
      <el-table-column
        
        label="产品利润"
        show-overflow-tooltip
        >
        <template slot-scope="scope">
            <div v-for="item in scope.row.productMarketStrs" :key="item.platformName">
                <div>{{item.platformName}}:</div>
                <div>{{item.currency}} {{item.developmentPrice}}/
                    <el-tooltip :content="rows.warehouseName" placement="top" effect="light" v-for="rows in item.marketProfits " :key="rows.warehouseId">
                        <span :class="rows.profitMargin < 0 ? 'boxColor':''">{{rows.profitMargin + '%' + '/'}}</span>
                    </el-tooltip>
                </div>
            </div>
        </template>
      </el-table-column>
      <el-table-column 
        
        label="产品尺寸/属性"
        show-overflow-tooltip
        >
        <template slot-scope="scope">
            <div>{{scope.row.size}}</div>
            <div>{{scope.row.packingWay}}</div>
            <div>{{scope.row.shape }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="categoryName"
                       label="产品分类"
                       show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="stateName"
                       label="开发状态"
                       show-overflow-tooltip>
      </el-table-column>
      <el-table-column 
                       label="业务/采购"
                       show-overflow-tooltip>
            <template slot-scope="scope">
                <div>{{scope.row.businessName}}</div>
                <div>{{scope.row.buyerName}}</div>
            </template>
      </el-table-column>
      <el-table-column 
        
        label="创建/更新时间"
        show-overflow-tooltip>
            <template slot-scope="scope">
                <div>{{$moment(scope.row.createdOn).format("YYYY-MM-DD HH:mm:ss")}}</div>
                <div>{{$moment(scope.row.modifyOn).format("YYYY-MM-DD HH:mm:ss")}}</div>
            </template>
      </el-table-column>
      <el-table-column 
        
        label="操作"
        show-overflow-tooltip
        >
        <template slot-scope="scope">
            <div class="operaBox">
                <div class="imageBox" @click="clickEdit(scope.row.developmentId,scope.row.productId,scope.row.id)"></div>
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
    <messageDialog :clickId='clickId' ref="messageDialog"></messageDialog>
  </div>

</template>
<script>
import { fetchPageTableList } from '@/api/user.js'
import { formatDate } from '@/utils/tools.js'
import messageDialog from './messageDialog.vue'
export default {
  name: 'mainTable',
  components:{
      messageDialog
  },
  data () {
    return {
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
      required: true
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
      clickEdit(devId,proId,procountryId){
          this.$router.push({
            name:'productDetails',
            params:{
                developmentId:devId,
                productId:proId,
                productCountryId:procountryId,
            }
          })
      },
      putOperation(row,id){
          this.clickId = id
        //   if(id == 1){
              this.$refs.messageDialog.openDialog()
        //   }
      },
      openOperation(row){
          if(row.state == 0){
              this.operationList = [
                  {
                    name:'提交审批',
                    id:1
                  },
                  {
                    name:'审批通过',
                    id:2
                  },
                  {
                    name:'取消开发',
                    id:3
                  },
              ]
          }else if(row.state == 1){
              this.operationList = [
                  {
                    name:'打回',
                    id:4
                  },
                  {
                    name:'取消开发',
                    id:3
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
              ]
          }else if(row.state == 3){
              this.operationList = [
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
              ]
          }else if(row.state == 4){
              this.operationList = [
                  {
                    name:'提交利润复核',
                    id:14
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
              ]
          }else if(row.state == 5){
              this.operationList = [
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
              ]
          }else if(row.state == 6){
              this.operationList = [
                  {
                    name:'终审通过',
                    id:9
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
              ]
          }else if(row.state == 10){
              this.operationList = [
                  {
                    name:'样品采购审核',
                    id:7
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
                    name:'打回',
                    id:4
                  },
                  {
                    name:'提交寻找供应商',
                    id:10
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
              ]
          }else if(row.state == 13){
              this.operationList = [
                  {
                    name:'审核通过',
                    id:12
                  },
                  {
                    name:'打回',
                    id:4
                  },
                  {
                    name:'取消开发',
                    id:3
                  },
              ]
          }else if(row.state == 14){
              this.operationList = [
                  {
                    name:'返回冻结前状态',
                    id:13
                  },
              ]
          }
      },
      routerMove(devId,proId,procountryId){
          this.$router.push({
            name:'productDetails',
            params:{
                developmentId:devId,
                productId:proId,
                productCountryId:procountryId,
            }
          })
      },
    getTableList(val){
        let params = {
            pageNum :this.pageNum,
            pageSize:this.pageSize,
            timeType:val.dateType,
            dateFrom:val.dateFrom,
            dateTo:val.dateTo,
            countryCodes:val.countryCodes,
            seekEnd:val.seekEnd,
            auth:val.auth,
            state:val.state,
            productOwner:val.productOwner,
            scenariosParentIds:val.scenariosParentIds,
            sampleDelivery:val.sampleDelivery,
            patentProduct:val.patentProduct
        }
        fetchPageTableList(params).then(res => {
            res.data.rows.forEach(item => {
                item.showImgUrl = `${process.env.VUE_APP_IMAGE_API}/${item.developmentId}/${item.imagesUri}`
            });
            this.currentPage4 = res.data.pageNum
            this.tableData = res.data.rows
            this.total = res.data.records
            console.log(this.tableData)
        })
        
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
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
        console.log(newTime)
        return newTime
    }
  }
}
</script>
<style lang="scss" scoped>

.remarksTitle{
    color: #409EFF;
    cursor: pointer;
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
            color: #409EFF;
            cursor: pointer;
        }
    }
}
.operaBox{
    display: flex;

    .imageBox{
        height: 32px;
        width: 32px;
        // float: left;
        background-image: url(../assets/bianji.png);
    }
    .imageBox1{
        height: 32px;
        width: 32px;
        // float: left;
        background-image: url(../assets/shenhe.png);
    }
}
</style>