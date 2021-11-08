<template>
  <div class="tableMain">
    <el-table 
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange"
        height="580"
        :header-cell-style="{background:'#f5f7fa',color:'#606266'}"
        @row-click="handleRowClick"
        v-loading="loading" 
        >
      <el-table-column 
        type="selection"
        width="40"
        header-align='center'
        >
      </el-table-column>
      <el-table-column 
        label="产品图片"
        width="100"
        header-align='center'
        >
        <template slot-scope="scope">
            <div :class="scope.row.developmentScenarios < 8 ?'imageTitel':'imageTitelRed'">{{showScenarios(scope.row.developmentScenarios)}}</div>
            <el-popover
                placement="right"
                trigger="hover"
                >
                <el-image
                    style="width: 200px; height: 200px; dispaly:black"
                    :key="scope.row.showBigImgUrl" 
                    :src="scope.row.showBigImgUrl" 
                    lazy
                    :scroll-container="scrollContainer"
                    fit="fill">
                </el-image>
                <el-image
                    slot="reference"
                    style="width: 80px; height: 80px; dispaly:black;margin-top:3px;cursor:pointer;"
                    :src="scope.row.showImgUrl" 
                    lazy
                    :scroll-container="scrollContainer"
                    fit="fill"
                    >
                    <div slot="error" class="image-slot" style="margin-top:35px;margin-left:5px;color:#cccccc">
                        <i class="el-icon-picture-outline">暂无图片</i>
                    </div>
                </el-image>
         </el-popover>

        </template>
      </el-table-column>
      <el-table-column 
            prop="name"
            label="市场"
            align='center'
            width="50"
            >
        <template slot-scope="scope">
            <div class="remarksTitle">{{scope.row.countryName}}</div>
            <div class="otherRemarks" v-for="item in scope.row.otherCountryNames" :key="item">{{item}}</div>
        </template>
      </el-table-column>
      <el-table-column 
            prop="productTypeName"
            label="产品名称"
            header-align='center'
            width="250"
            >
        <template slot-scope="scope">
            <div class="remarksenTitle" @click="routerMove(scope.row.developmentId,scope.row.productId,scope.row.id)">{{scope.row.enTitle}}</div>
            <div>{{scope.row.title || '--'}}</div>
            <el-tooltip placement="right" effect="light" :visible-arrow='false' popper-class='popperBorder' style="padding:0;border:none">
                <span slot="content" class="copeTitle"  @click="copeDevelopId(scope.row.developmentId)">
                        <i class="el-icon-document-copy" ></i>
                    </span>
                <div style="display:inline-block">普通产品:{{scope.row.developmentId}}</div>
            </el-tooltip>
            <el-tooltip placement="right" effect="light" :visible-arrow='false' popper-class='popperBorder' style="padding:0;border:none">
                <span slot="content" class="copeTitle"  @click="copeDevelopId(scope.row.skuAlias)">
                        <i class="el-icon-document-copy" ></i>
                    </span>
                <div style="display:inline-block">sku别名:{{scope.row.skuAlias || '--'}}</div>
            </el-tooltip>
            <!-- <div>sku别名:{{scope.row.skuAlias || '--'}}</div> -->
        </template>
      </el-table-column>
      <el-table-column
        label="产品利润"
        header-align='center'
        width="300"
        >
        <template slot-scope="scope">
            <div v-for="item in scope.row.productMarketStrs" :key="item.platformName">
                <div style="font-weight:bold">{{item.platformName}}:</div>
                <div>{{item.currency}} {{item.developmentPrice ? item.developmentPrice.toFixed(2) : '--'}} ：
                    <span v-for="rows in item.marketProfits " :key="rows.warehouseId">
                        <el-tooltip :content="rows.warehouseName" effect="dark" placement="top" :key="rows.warehouseId">
                            <span :class="rows.profitMargin < 0 ? 'boxColor':''">{{rows.profitMargin ? (rows.profitMargin * 100).toFixed(2) + '%' + ' ' + '/' : '--'}}</span>
                        </el-tooltip>
                    </span>              
                </div>
                <div v-if="item.sfp">  
                    <div style="font-weight:bold" >{{item.platformName}}-SFP:</div>
                    <div>{{item.currency}} {{item.sfpDevelopmentprice ? item.sfpDevelopmentprice.toFixed(2) : '--'}} ： 
                        <span v-for="rows in item.marketProfits " :key="rows.warehouseId">
                            <span v-if="rows.sfpDevelopmentprice">
                                <el-tooltip :content="rows.warehouseName" effect="dark" placement="top" :key="rows.warehouseId">
                                     <span :class="rows.sfpProfitMargin < 0 ? 'boxColor':''">{{rows.sfpProfitMargin ? (rows.sfpProfitMargin * 100).toFixed(2) + '%' + ' ' + '/' : '--'}}</span>
                                </el-tooltip>
                            </span>
                        </span>              
                    </div>
                </div>
            </div>
        </template>
      </el-table-column>
      <el-table-column 
            label="产品尺寸 / 属性"
            show-overflow-tooltip
            header-align='center'
            align='center'
        >
        <template slot-scope="scope">
            <div>{{scope.row.size || '--'}}</div>
            <div v-if="scope.row.packingWay == '多箱'" style="color:red">{{scope.row.packingWay}}</div>
            <div v-if="scope.row.shape == '不规则'" style="color:red">{{scope.row.shape }}</div>
        </template>
      </el-table-column>
      <el-table-column 
            prop="categoryName"
            label="产品分类"
            show-overflow-tooltip
            v-if="showOrder"
            header-align='center'
            >
      </el-table-column>
      <el-table-column 
            prop="stateName"
            label="开发状态"
            show-overflow-tooltip   
            header-align='center'
             align='center'
        >
        <template slot-scope="scope">
            <div>
                {{scope.row.stateName}}
            </div>
            <div v-if="scope.row.backNum" style="color:red" @click="routerMove(scope.row.developmentId,scope.row.productId,scope.row.id)">
                打回次数：{{scope.row.backNum}}/{{scope.row.backTotalNum}}
            </div>
        </template>
      </el-table-column>
      <el-table-column 
            label="业务 / 采购"
            show-overflow-tooltip
            header-align='center'
             align='center'
            >
            <template slot-scope="scope">
                <div>{{scope.row.businessName}}</div>
                <div>{{scope.row.buyerName}}</div>
            </template>
      </el-table-column>
      <el-table-column 
        label="创建 / 更新时间"
        show-overflow-tooltip
        header-align='center'
        >
            <template slot-scope="scope">
                <div>{{$moment(scope.row.createdOn).format("YYYY-MM-DD HH:mm")}}</div>
                <div>{{$moment(scope.row.modifyOn).format("YYYY-MM-DD HH:mm")}}</div>
                <div :class="scope.row.priority == 2? 'priorityStyle':'smallPriorityStyle'">{{getPriority(scope.row.priority)}}</div>
            </template>
      </el-table-column>
      <el-table-column 
        label="操作"
        show-overflow-tooltip
        header-align='center'
         align='center'
         width="80px"
        >
        <template slot-scope="scope">
            <div class="operaBox" v-show="stateList.includes(scope.row.state)">
                <el-tooltip class="item" effect="dark" content="编辑" placement="bottom-start">
                    <div class="imageBox" @click="clickEdit(scope.row.developmentId,scope.row.productId,scope.row.id)" perkey='ERP.Product.ProductDev.SalesManEdit'></div>
                </el-tooltip>
                <!-- <el-tooltip class="item" effect="dark" content="操作" placement="bottom-start"> -->
                <el-popover
                    placement="bottom"
                    width="80"
                    trigger="hover">
                    <div class="operationBox" v-for="item in operationList" :key="item.id"> 
                        <div class="operationText" @click="putOperation(scope.row,item.id)"><div class="nameBox" :perkey='item.perkey'>{{item.name}}</div></div>
                    </div>
                    <div class="imageBox1" slot="reference" @mouseover="openOperation(scope.row)"></div>
                </el-popover>
                <!-- </el-tooltip> -->
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
    <messageDialog :clickId='clickId' :dialogName='dialogName' ref="messageDialog" @getTableList='getTableList' :row='row' :navFilterList='navFilterList' :showOrder='showOrder'></messageDialog>
  </div>

</template>
<script>
import { fetchPageTableList,unfreezing,getImagePath,checkUserIdentity } from '@/api/user.js'
import { formatDate,copyUrl } from '../utils/tools'
export default {
  name: 'mainTable',
  components:{
      messageDialog:() => import('./messageDialog.vue')
  },
  data () {
    return {
      stateList:[0,1,2,3,4,5,6,10,11,12,13],
      showImage:false,
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
      clickId:0,
      lastImageUrl:'',
      loading:true,
      showOrder:false
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
    //    mouseOver(index){
    //        this.$set(this.tableData[index],'showImage',true)
    //    },
    //    mouseLeave(index){
    //      this.$set(this.tableData[index],'showImage',false)
    //    },
      copeDevelopId(val){
          copyUrl(val)
      },
      showScenarios(val){
          if(val == 1){
              return '新产品'
          }else if(val == 2){
              return '新市场'
          }else if(val == 3){
              return '新尺码'
          }else if(val == 10){
              return '二次开发  新产品'
          }else if(val == 11){
              return '二次开发  新市场'
          }else if(val == 12){
              return '二次开发  新尺寸'
          }
      },
      handleRowClick(row){
          this.$refs.multipleTable.toggleRowSelection(row);
      },
      getPriority(val){
          if(val == 0){
              return '低优先级'
          }else if(val == 1){
              return '中优先级'
          }else{
              return '高优先级'
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
              this.$confirm('确定开发此产品的新尺码？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                let routeData = this.$router.resolve({
                    name: "productDetails",
                        query:{
                            developmentType:row.developmentType,
                            developmentId:row.developmentId,
                            productId:row.productId,
                            developmentScenarios:row.developmentScenarios,
                            id
                        }
                    });
                    window.open(routeData.href, '_blank');
                    // this.$router.push({
                    //     name:'productDetails',
                    //     query:{
                    //             developmentType:row.developmentType,
                    //             developmentId:row.developmentId,
                    //             productId:row.productId,
                    //             developmentScenarios:row.developmentScenarios,
                    //             id
                    //         }
                    // })
                }).catch(() => {
                return          
            });
            
          }else if (id == 9){
              this.dialogName='终审通过'
              this.clickId = 30
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
             this.dialogName ='利润初审通过'
          }else if (id == 26){
              this.$confirm('确定开发此产品的新市场？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                let routeData = this.$router.resolve({
                        name: "productDetails",
                        query:{
                                developmentType:row.developmentType,
                                developmentId:row.developmentId,
                                productId:row.productId,
                                developmentScenarios:row.developmentScenarios,
                                id
                            }
                        });
                    window.open(routeData.href, '_blank');
                // this.$router.push({
                //         name:'productDetails',
                //         query:{
                //                 developmentType:row.developmentType,
                //                 developmentId:row.developmentId,
                //                 productId:row.productId,
                //                 developmentScenarios:row.developmentScenarios,
                //                 id
                //             }
                //     })
                }).catch(() => {
                return          
            });
          }else if(id == 15){
             this.dialogName ='提交利润复核'
          }else {
              this.dialogName = '审批通过'
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
                    id:1,
                    perkey:'ERP.Product.ProductDev.ADD'
                  },
                  {
                    name:'取消开发',
                    id:3,
                    perkey:'ERP.Product.ProductDev.ManagerCancel'
                  },
                  {
                    name:'开发新市场',
                    id:26,
                    perkey:'ERP.Product.ProductDev.ADD'
                  },
              ]
          }else if(row.state == 1){
              this.operationList = [  //1  13 12 3 10 5 6 
                  {
                    name:'审批通过',
                    id:2,
                    perkey:'ERP.Product.ProductDev.ManagerAudit'
                  },
                  {
                    name:'打回',
                    id:4,
                    perkey:'ERP.Product.ProductDev.SalesManBack'
                  },
                  {
                    name:'取消开发',
                    id:3,
                    perkey:'ERP.Product.ProductDev.ManagerCancel'
                  },
                  {
                    name:'开发新市场',
                    id:26,
                    perkey:'ERP.Product.ProductDev.ADD'
                  },
              ]
          }else if(row.state == 2){
              this.operationList = [
                  {
                    name:'提交采购主管审核',
                    id:5,
                    perkey:'ERP.Product.ProductDev.BuyerEdit'
                  },
                  {
                    name:'更改采购开发员',
                    id:6,
                    perkey:'ERP.Product.ProductDev.EditGroup'
                  },
                  {
                    name:'打回',
                    id:4,
                    perkey:'ERP.Product.ProductDev.SalesManBack'
                  },
                  {
                    name:'开发新市场',
                    id:26,
                    perkey:'ERP.Product.ProductDev.ADD'
                  },
                  {
                    name:'开发新尺码',
                    id:8,
                    perkey:'ERP.Product.ProductDev.ADD'
                  },
              ]
          }else if(row.state == 3){
              this.operationList = [
                  {
                    name:'审批通过',
                    id:14,
                    perkey:'ERP.Product.ProductDev.ManagerAudit'
                  },
                  {
                    name:'开发新尺码',
                    id:8,
                     perkey:'ERP.Product.ProductDev.ADD'
                  },
                  {
                    name:'取消开发',
                    id:3,
                    perkey:'ERP.Product.ProductDev.ManagerCancel'
                  },
                  {
                    name:'更改采购开发员',
                    id:6,
                    perkey:'ERP.Product.ProductDev.EditGroup'
                  },
                  {
                    name:'打回',
                    id:4,
                    perkey:'ERP.Product.ProductDev.SalesManBack'
                  },
                  {
                    name:'开发新市场',
                    id:26,
                    perkey:'ERP.Product.ProductDev.ADD'
                  },
              ]
          }else if(row.state == 4){ //1 4 5 6 7 9 10
              this.operationList = [
                  {
                    name:'提交利润复核',
                    id:15,
                    perkey:'ERP.Product.ProductDev.BuyerEdit'
                  },
                  {
                    name:'开发新尺码',
                    id:8,
                     perkey:'ERP.Product.ProductDev.ADD'
                  },
                  {
                    name:'打回',
                    id:4,
                    perkey:'ERP.Product.ProductDev.SalesManBack'
                  },
                  {
                    name:'更改采购开发员',
                    id:6,
                    perkey:'ERP.Product.ProductDev.EditGroup'
                  },
                  {
                    name:'开发新市场',
                    id:26,
                    perkey:'ERP.Product.ProductDev.ADD'
                  },
              ]
          }else if(row.state == 5){
              this.operationList = [
                  {
                    name:'审批通过',
                    id:40,
                    perkey:'ERP.Product.ProductDev.ManagerAudit'
                  },
                  {
                    name:'开发新尺码',
                    id:8,
                     perkey:'ERP.Product.ProductDev.ADD'
                  },
                  {
                    name:'打回',
                    id:4,
                    perkey:'ERP.Product.ProductDev.SalesManBack'
                  },
                  {
                    name:'取消开发',
                    id:3,
                    perkey:'ERP.Product.ProductDev.ManagerCancel'
                  },
                  {
                    name:'更改采购开发员',
                    id:6,
                    perkey:'ERP.Product.ProductDev.EditGroup'
                  },
                  {
                    name:'开发新市场',
                    id:26,
                    perkey:'ERP.Product.ProductDev.ADD'
                  },
              ]
          }else if(row.state == 6){
              this.operationList = [
                  {
                    name:'终审审批',
                    id:9,
                    perkey:'ERP.Product.ProductDev.EndAudit'
                  },
                  {
                    name:'开发新尺码',
                    id:8,
                    perkey:'ERP.Product.ProductDev.ADD'
                  },
                  {
                    name:'打回',
                    id:4,
                    perkey:'ERP.Product.ProductDev.SalesManBack'
                  },
                  {
                    name:'取消开发',
                    id:3,
                    perkey:'ERP.Product.ProductDev.ManagerCancel'
                  },
                  {
                    name:'更改采购开发员',
                    id:6,
                    perkey:'ERP.Product.ProductDev.EditGroup'
                  },
                  {
                    name:'开发新市场',
                    id:26,
                    perkey:'ERP.Product.ProductDev.ADD'
                  },
              ]
          }else if (row.state == 7){
              console.log(row)
          } else if(row.state == 10){
              this.operationList = [
                  {
                    name:'审批通过',
                    id:25,
                    perkey:'ERP.Product.ProductDev.ManagerAudit'
                  },
                  {
                    name:'打回',
                    id:4,
                    perkey:'ERP.Product.ProductDev.SalesManBack'
                  },
                  {
                    name:'开发新尺码',
                    id:8,
                    perkey:'ERP.Product.ProductDev.ADD'
                  },
                  {
                    name:'开发新市场',
                    id:26,
                    perkey:'ERP.Product.ProductDev.ADD'
                  },
                  {
                    name:'更改采购开发员',
                    id:6,
                    perkey:'ERP.Product.ProductDev.EditGroup'
                  },
              ]
          }else if(row.state == 11){
              this.operationList = [
                    {
                        name:'提交寻找供应商',
                        id:10,
                        perkey:'ERP.Product.ProductDev.EditAuth'
                    },
                  {
                    name:'打回',
                    id:4,
                    perkey:'ERP.Product.ProductDev.SalesManBack'
                  },
                  {
                    name:'开发新市场',
                    id:26,
                    perkey:'ERP.Product.ProductDev.ADD'
                  },
              ]
          }else if(row.state == 12){
              this.operationList = [
                  {
                    name:'提交利润初审',
                    id:11,
                    perkey:'ERP.Product.ProductDev.AuditAuth'
                  },
                  {
                    name:'打回',
                    id:4,
                    perkey:'ERP.Product.ProductDev.SalesManBack'
                  },
                  {
                    name:'开发新市场',
                    id:26,
                    perkey:'ERP.Product.ProductDev.ADD'
                  },
                  {
                    name:'开发新尺码',
                    id:8,
                     perkey:'ERP.Product.ProductDev.ADD'
                  },
              ]
          }else if(row.state == 13){
              this.operationList = [
                  {
                    name:'审批通过',
                    id:25,
                    perkey:'ERP.Product.ProductDev.ManagerAudit'
                  },
                  {
                    name:'打回',
                    id:4,
                    perkey:'ERP.Product.ProductDev.SalesManBack'
                  },
                  {
                    name:'取消开发',
                    id:3,
                    perkey:'ERP.Product.ProductDev.ManagerCancel'
                  },
                  {
                    name:'开发新市场',
                    id:26,
                    perkey:'ERP.Product.ProductDev.ADD'
                  },
                  {
                    name:'开发新尺码',
                    id:8,
                    perkey:'ERP.Product.ProductDev.ADD'
                  },
              ]
          }else if(row.state == 14){
              this.operationList = [
                  {
                    name:'返回冻结前状态',
                    id:13,
                    perkey:'ERP.Product.ProductDev.BackToFreezingOff'
                  },
              ]
          }else if (row.state == 9){
              console.log(row)
          }else if (row.state == 10){ //0 2 3 8
              this.operationList = [
                  {
                    name:'审批通过',
                    id:25,
                    perkey:'ERP.Product.ProductDev.ManagerAudit'
                  },
                  {
                    name:'开发新市场',
                    id:26,
                    perkey:'ERP.Product.ProductDev.ADD'
                  },
                  {
                    name:'开发新尺码',
                    id:8,
                    perkey:'ERP.Product.ProductDev.ADD'
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
      newGetImagePath(){
          getImagePath().then(res => {
              this.lastImageUrl = res.data
          })
          let params = {
              type : 0
          }
          checkUserIdentity(params).then(res => {
              if(res.data){
                  this.showOrder = res.data
              }
          })
      },
   async getTableList(val){
       await this.newGetImagePath()
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
        this.loading = true
        fetchPageTableList(params).then(res => {
            if(res.data && res.data.rows){
                res.data.rows.forEach(item => {
                    item.showImgUrl = `${this.lastImageUrl}upload/CompetingProduct/Small/${item.developmentId}/${item.imagesUri}`
                    item.showBigImgUrl = `${this.lastImageUrl}upload/CompetingProduct/${item.developmentId}/${item.imagesUri}`
                    this.loading = false
                });
              }else{
                this.loading = false  
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
    z-index: 990;
    position: absolute;
    right: 0px;
    color: #3366cc;
    background-color: #ffffff;
    border: 1px dashed #cccccc;
}
.imageTitelRed {
    display: inline-block;
    line-height: 12px;
    font-size: 12px;
    // font-weight: bold;
    z-index: 990;
    position: absolute;
    right: 0px;
    color: #AE1904;
    background-color: #ffffff;
    border: 1px dashed #cccccc;
    width: 50px;
    text-align: right;
}
.remarksTitle{
    color: black;
    cursor: pointer;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
}
.otherRemarks{
    color: #bbb;
}
.remarksenTitle{
    color: #3366cc;
    cursor: pointer;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    display: inline-block;
    
    &:hover{
        background-color:#3366cc ;
        color: #ffffff;
        display: inline-block;
    }
}
.copeTitle{
    color: #3366cc;
    cursor: pointer;
    font-size: 15px;
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
        .el-table__body-wrapper {
            height: 534px !important;
        }
    }
    
}
.boxColor{
    color: red;
}
.operationBox{
    width: 120px;
    .operationText{
        
        .nameBox{
            width: 120px;
            line-height: 12px;
            font-size: 12px;
            border-bottom: 1px solid #cccccc;
            // margin-top: 5px;
            padding: 10px 0px;
            &:hover{
                background-color: #3366cc;
                color: #ffffff;
                cursor: pointer;
            }
        }
    }
}
.operaBox{
    display: flex;
    margin-left: 10px;
    .imageBox{
        height: 18px;
        width: 18px;
        // float: left;
        background-image: url(../assets/bianji.png);
        cursor: pointer;
    }
    .imageBox1{
        margin-left: 10px;
        height: 22px;
        width: 22px;
        // float: left;
        background-image: url(../assets/shenhe.png);
        cursor: pointer;
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
    color: #bbb;
}
.popperBorder{
    border: none !important;
    padding: 0 !important;
}
::v-deep.el-tooltip__popper{
     border: none !important;
        padding: 0 !important;
    .is-light {
        border: none !important;
        padding: 0 !important;
    }
}
</style>