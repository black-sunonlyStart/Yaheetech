<template>
    <div class="nav-container" v-permission="'PM00038'" v-if="renderDom">
        <el-card class="nav-card naverCard">
            <navBar  @putTableList='putTableList' ref="navBar"></navBar>
            <div title="点击加载更多" class="up-text up-text-c" v-if="upDownshow" @click="clickMoreFilter">∨</div>
            <div title="点击收缩" class="down-text" v-else @click="clickMoreFilter(1)">∧</div>
        </el-card>
        
        <el-card style="margin-top: 5px;">
            <mainPageList :filterList='filterList' @putClearList='putClearList' ></mainPageList>
        </el-card>
    </div>
</template>
<script>
import navBar from '@/views/atNewProductPage/mainPage/navbar.vue'
import mainPageList from '@/views/atNewProductPage/mainPage/mainTable.vue'
import { hasPermissions } from '@/api/user.js'
import { addMask } from '@/utils/tools.js'
export default {
    components: {
        navBar,
        mainPageList,
    },
    data () {
        return {
            upDownshow:true,
            filterList:{},
            renderDom:false,
        }
    },
    computed: {
    },
    created () {
         this.getPermissions()   
    },
    mounted(){
    
    },
    methods: {
        getPermissions(){
            let  params = [
                'PM00038',
                'PM00039',
                'PM00041',
                'PM00042',
                'PM00043',
                'PM00044',
                'PM00045',
                'PM00047',
                'PM00048',
                'PM00049',
                'PM00050',
            ]
            hasPermissions(params).then(res => {
                let data = JSON.stringify( res.data);
                sessionStorage.setItem("permissions", data);
                let per =  res.data.filter(item => {
                    return item.PermissionCode == 'PM00038' && !item.HasPermission
                })
                if(per && per.length > 0){
                    addMask('PM00038')
                }
                this.renderDom = true
            })
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
        putTableList (val){
            this.filterList = val
        },
        putClearList(){
            this.$refs.navBar.getStautList()
        }
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
        top: 133px;
    }
}
.naverCard {
    position: relative;
    height: 147px;
    overflow: hidden;
    background: #fff;
    z-index: 2000;
    opacity: 0.9;
    flex-shrink: 0;
}
.naverCard .el-card__body {
    background: #fff;
}
</style>
  