<template>
    <div class="buttonStyle" >
        <el-button v-permission:[item.perkey] v-for="item in operationList" :key="item.id" size="mini" type="primary" @click="putOperation(item.id)" :perkey='item.perkey'>{{item.name}}</el-button>
        <messageDialog :clickId='clickId' :dialogName='dialogName' ref="messageDialog"  @getTableList='getTableList' :row='row' :showOrder='showOrder'></messageDialog>
    </div>
    
</template>
<script>
import { unfreezing,checkUserIdentity } from '@/api/user.js'
export default {
    name:'operationButton',
    components:{
        messageDialog:() => import('@/components/messageDialog')
    },
    data(){
        return {
            operationList:[],
            clickId:0,
            dialogName:'',
            row:{},
            showOrder:false
        }
    },
    props:{
        nowStatus:{
            type:Number,
            default:() => {0}
        }
    },
    watch:{
         nowStatus:{
          handler:function(val){
              if(val){
                    this.$nextTick(() => {
                        this.openOperation(this.nowStatus)
                    })
              }
          },
          deep:true
      }
    },
    computed:{
        showButton(){
            if(!this.$route.params.productId || !this.$route.params.productCountryId){
                return true
            }else {
                return false
            }
        }
    },
    mounted(){
        this.openOperation(this.nowStatus)
        this.init()
    },
    methods:{
        init(){
            let params = {
              type : 0
          }
          checkUserIdentity(params).then(res => {
              if(res.data){
                  this.showOrder = res.data
              }
              
          })
        },
        getTableList(){
            this.$emit('getTableList')
        },
        putOperation(id){
          let row = {
            developmentId:this.$route.params.developmentId,
            productId:this.$route.params.productId,
            id:this.$route.params.productCountryId || '',
            state:this.nowStatus
          }
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
                    developmentId:row.developmentId,
                    productId:row.productId,
                    productCountryId:row.productCountryId,
                }
            });
            window.open(routeData.href, '_blank');
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
                    //   this.getTableList(this.navFilterList)
                  }
              }) 
          }else if(id == 14){
             this.dialogName ='利润初审通过'
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
          }else {
             this.dialogName ='审核通过' 
          }
          this.row = row
          if(id != 13 || id != 8 || id != 26) {
              this.$refs.messageDialog.openDialog()
          }
           
      },
        openOperation(state){
          if(state == 0){
              this.operationList = [
                   {
                    name:'提交审批',
                    id:1,
                    perkey:'ERP.Product.ProductDev.Audit'
                  },
                  {
                    name:'取消开发',
                    id:3,
                    perkey:'ERP.Product.ProductDev.Cancel'
                  },
              ]
          }else if(state == 1){
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
              ]
          }else if(state == 2){
              this.operationList = [
                  {
                    name:'提交采购主管审核',
                    id:5,
                    perkey:'ERP.Product.ProductDev.BuyerEdit'
                  },
                  {
                    name:'打回',
                    id:4,
                    perkey:'ERP.Product.ProductDev.BuyerBack'
                  },
              ]
          }else if(state == 3){
              this.operationList = [
                  {
                    name:'审核通过',
                    id:14,
                    perkey:'ERP.Product.ProductDev.ProfitsFirstTrial'
                  },
                  {
                    name:'取消开发',
                    id:3,
                    perkey:'ERP.Product.ProductDev.ManagerCancel'
                  },
                  {
                    name:'打回',
                    id:4,
                    perkey:'ERP.Product.ProductDev.SalesBack'
                  },
              ]
          }else if(state == 4){ //1 4 5 6 7 9 10
              this.operationList = [
                  {
                    name:'提交利润复核',
                    id:15,
                    perkey:'ERP.Product.ProductDev.BuyerEdit'
                  },
                  {
                    name:'打回',
                    id:4,
                    perkey:'ERP.Product.ProductDev.BuyerBack'
                  },
              ]
          }else if(state == 5){
              this.operationList = [
                  {
                    name:'审批通过',
                    id:40,
                    perkey:'ERP.Product.ProductDev.SalesManEdit'
                  },
                  {
                    name:'打回',
                    id:4,
                    perkey:'ERP.Product.ProductDev.SalesBack'
                  },
                  {
                    name:'取消开发',
                    id:3,
                    perkey:'ERP.Product.ProductDev.Cancel'
                  },
              ]
          }else if(state == 6){
              this.operationList = [
                  {
                    name:'终审审批',
                    id:9,
                    perkey:'ERP.Product.ProductDev.EndAudit'
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
              ]
          }else if (state == 7){
              this.operationList=[]
          } else if(state == 10){
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
              ]
          }else if(state == 11){
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
              ]
          }else if(state == 12){
              this.operationList = [
                  {
                    name:'提交利润初审',
                    id:11,
                    perkey:'ERP.Product.ProductDev.AuditAuth'
                  },
                  {
                    name:'打回',
                    id:4,
                    perkey:'ERP.Product.ProductDev.AuditAuth'
                  },
              ]
          }else if(state == 13){
              this.operationList = [
                  {
                    name:'审批通过',
                    id:25,
                    perkey:'ERP.Product.ProductDev.PurchasingSupervisorAudit'
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
              ]
          }else if(state == 14){
              this.operationList = [
                  {
                    name:'返回冻结前状态',
                    id:13,
                    perkey:'ERP.Product.ProductDev.BackToFreezingOff'
                  },
              ]
          }else if (state == 9){
               this.operationList=[]
          }else if (state == 10){ //0 2 3 8
              this.operationList = [
                  {
                    name:'审批通过',
                    id:25,
                    perkey:'ERP.Product.ProductDev.SamplePurchaseAudit'
                  },
                ]
          }else {
              this.operationList = []
          }
      }
    }
}
</script>
<style scoped lang="scss">
.buttonStyle{
    z-index: 1000;
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
