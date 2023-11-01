<template>
    <commonTPage v-if="renderDom" v-permission="'ERP.Product.ProductSample.View'">
        <navBar slot="navContent"  @putTableList='putTableList' ref="navBar"></navBar>
        <mainPageList slot="mainContent" :filterList='filterList'></mainPageList>
    </commonTPage>
</template>
<script>
import { hasPermissions } from '@/api/user.js'
import { addMask} from '@/utils/tools.js'
import { getAllTranslateList } from '@/utils/translate.js'
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
                'PM00070',
                'PM00071',
            ]
            hasPermissions(params).then(res => {
                this.pageLoading = false
                let data = JSON.stringify( res.data);
                sessionStorage.setItem("permissions", data);
                let per = res.data.filter(item => {
                    return item.PermissionCode == 'ERP.Product.ProductSample.View' && !item.HasPermission
                })
                if(per && per.length > 0){
                    addMask('ERP.Product.ProductSample.View')
                }else {
                    getAllTranslateList(this)
                }
            })
        },
    }
}
</script>