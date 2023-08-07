<template>
    <commonTPage v-if="renderDom" v-permission="'ERP.Product.ProductSample.View'">
        <navBar slot="navContent"  @putTableList='putTableList' ref="navBar"></navBar>
        <mainPageList slot="mainContent" :filterList='filterList'></mainPageList>
    </commonTPage>
</template>
<script>
import { hasPermissions } from '@/api/user.js'
export default {
    name:'sampleConfirmation',
    components:{
        commonTPage:() => import('@/components/common/commonTPage'),
        navBar:() => import('@/views/sampleConfirmation/mainPage/navBar.vue'),
        mainPageList:() => import('@/views/sampleConfirmation/mainPage/mainPageList.vue')
    },
    data(){
        return {
            filterList:{},
            renderDom:false,
        }
    },
    mounted(){
        this.getPermissions()
    },
    methods:{
        putTableList (val){
            this.filterList = val
        },
        getPermissions(){
            let  params = [
                'ERP.Product.ProductSample.View',
                'ERP.Product.ProductSample.CancelOff',
                'ERP.Product.ProductSample.CancelOn',
                'ERP.Product.ProductSample.Repulse',
                'ERP.Product.ProductSample.SaveSampleValidator',
                'ERP.Product.ProductSample.ApprovalSampleMemo',
                'ERP.Product.ProductSample.SaveProductSample',
                'ERP.Product.ProductSample.SavaProductSampleRes',
            ]
            hasPermissions(params).then(res => {
                this.pageLoading = false
                let data = JSON.stringify( res.data);
                sessionStorage.setItem("permissions", data);
                res.data.forEach(item => {
                    if(item.PermissionCode == 'ERP.Product.ProductSample.View' && !item.HasPermission){
                        this.$message({
                            message: `对不起您没有权限（ERP.Product.ProductSample.View）进行当前操作！`,
                            type: 'error',
                            duration:0,
                            showClose:true,
                            offset:300,
                        })
                    }
                })
                this.renderDom = true
            })
        },
    }
}
</script>