<template>
     <div class="nav-container" v-if="renderDom"  v-permission="'ERP.Product.ProductDev.Select'" >
        <el-card class="nav-card naverCard">
            <navBar  @putTableList='putTableList' :total='total' :employeeId='employeeId'></navBar>
            <div :title="M2('点击加载更多')" class="up-text up-text-c" v-if="upDownshow" @click="clickMoreFilter">∨</div>
            <div :title="M2('点击收缩')" class="down-text" v-else @click="clickMoreFilter(1)">∧</div>
        </el-card>
        
         <el-card class="button-card">
            <abilityBtn :selectRow='selectRow' @putTbleList='putTbleList' :navFilterList='filterList'></abilityBtn>
        </el-card>
        <el-card class="mainTable-card" >
            <mainTable :navFilterList='filterList' @putTbleSelection='putTbleSelection' ref="mainTable" @getTotal='getTotal'></mainTable>
        </el-card>
    </div>
</template>

<script>
import navBar from '@/views/packTableList/mainPage/navBar.vue'
import abilityBtn from '@/components/productDetail/abilityBtn.vue'
import mainTable from '@/views/packTableList/mainPage/mainTable.vue'
import {hasPermissions } from '@/api/user.js'
import { addMask} from '@/utils/tools.js'
import { getAllTranslateList } from '@/utils/translate.js'
export default {
    name: 'packTableList',
    components: {
        navBar,
        abilityBtn,
        mainTable,
    },
  data () {
    return {
        filterList:{},
        selectRow:[],
        total:50,
        employeeId:0,
        renderDom:false,
        upDownshow:true,
        }
    },
    computed: {
    },
    created () {
        this.getPermissions()
    },
    mounted(){
        // this.changeInnterWidth()
    },
    methods: {
        //权限判断
        getPermissions(){
            let  params = [
                'ERP.Product.ProductDev.Select',
            ]
            hasPermissions(params).then(res => {
                let data = JSON.stringify( res.data);
                sessionStorage.setItem("permissions", data);
                let per = res.data.filter(item => {
                    return item.PermissionCode == 'ERP.Product.ProductDev.Select' && !item.HasPermission
                })
                if(per && per.length > 0){
                    addMask('ERP.Product.ProductDev.Select')
                }else {
                    getAllTranslateList(this)
                }
            })
        },
        getTotal(total){
            this.total = total
        },
       clickMoreFilter (id) {
            let naverCard = document.querySelector('.naverCard')
            if( id == 1) {
                naverCard.style.overflow = 'hidden'
                this.upDownshow = true
            }else {
                naverCard.style.overflow = 'visible'
                this.upDownshow = false
            }
        },
        putClearList(){
            this.$refs.navBar.getStautList()
        },
        putTbleSelection(val){
            this.selectRow = val || []
        },
        putTableList (val){
            this.filterList = val
        },
        putTbleList(){
            this.$refs.mainTable.getTableList(this.filterList)
        },
    }
}
</script>

<style lang="scss" scoped>
.nav-container {
    width: 100%;
    height: 100%;
    padding: 0px 5px 5px 5px;
    z-index: 10001;
    display: flex;
    flex-direction: column;
    background-color: rgba(230, 230, 230, 1);
    ::v-deep .nav-card {
        .el-card__body{
            padding: 1px 0px;
        }
    }
    .up-text,.down-text {
        width:100%;
        background: #EAEDED;
        font-weight: bold;
        color: #3366cc;
        text-align: center;
        font-size: 15px;
        height: 12px;
        line-height: 10px;
        z-index: 1111;
        display: inline-block;
        position: absolute;
        margin: 0px;
        cursor: pointer;
        border-bottom: 1px solid #3366cc;
        border-top: 1px solid #ddd;
        line-height: 9px;
            &:hover {
            background: #9BAFBF;
            color: #fff;
        }
    }
    .up-text-c {
        top: 141px;
    }
}
.naverCard {
    position: relative;
    height: 155px;
    overflow: hidden;
    background: #fff;
    z-index: 2000;
    opacity: 0.9;
    flex-shrink: 0;
}
.naverCard .el-card__body {
    background: #fff;
}
::v-deep .button-card {
        // position: fixed;
        // top: 191px;
        z-index: 1000;
        width: 99.6%;
        height: 37px;
        margin: 3px 0px;
        .el-card__body{
            padding: 3px 20px;
        }
    }
    ::v-deep.mainTable-card {
        // position: relative;
        // top: 226px;
        width: 99.6%;
        .el-card__body{
            padding: 5px 10px 35px;
        }
    }
</style>
  

