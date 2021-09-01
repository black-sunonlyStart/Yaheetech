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
                lazy
                style="width: 100px; height: 100px; dispaly:black"
                :src="scope.row.showImgUrl"
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
        prop="address"
        label="产品利润"
        show-overflow-tooltip
        >
        <template slot-scope="scope">
            <div v-for="item in scope.row.productMarketStrs" :key="item.platformName">
                <div>{{item.platformName}}:</div>
                <div>{{item.currency}} {{item.developmentPrice}}/
                    <el-tooltip :content="rows.warehouseName" placement="top" effect="light" v-for="rows in item.marketProfits " :key="rows.warehouseId">
                        <span>{{rows.profitMargin}}</span>
                    </el-tooltip>
                </div>
            </div>
        </template>
      </el-table-column>
      <el-table-column 
        prop="address"
        label="产品尺寸/属性"
        show-overflow-tooltip
        >
        <template slot-scope="scope">
            <div>{{scope.row.size}}</div>
            <div>{{scope.row.packingWay}}</div>
            <div>{{scope.row.shape}}</div>
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
      <el-table-column prop="address"
                       label="业务/采购"
                       show-overflow-tooltip>
            <template slot-scope="scope">
                <div>{{scope.row.businessName}}</div>
                <div>{{scope.row.buyerName}}</div>
            </template>
      </el-table-column>
      <el-table-column prop="address"
                       label="创建/更新时间"
                       show-overflow-tooltip>
            <template slot-scope="scope">
                <div>{{scope.row.createdOn}}</div>
                <div>{{scope.row.modifyOn}}</div>
            </template>
      </el-table-column>
      <el-table-column prop="address"
                       label="操作"
                       show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <div>
        <el-pagination 
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            class="pagePosition"
            >
        </el-pagination>
    </div>
    
  </div>

</template>
<script>
import { fetchPageTableList } from '@/api/user.js'
import { formatDate } from '@/utils/tools.js'
export default {
  name: 'mainTable',
  data () {
    return {
      currentPage4: 1,
      tableData: [],
      multipleSelection: [],
      pageSize:100,
      pageNum:1,
      total:100
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
  mounted(){
      this.getTableList(this.navFilterList)
  },
  methods: {
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
</style>