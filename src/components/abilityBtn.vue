<template>
    <span class="navButton" v-if="renderDom">
        <el-button size="mini" 
            @click="addProctList" 
            type="primary" 
            plain  
            icon="el-icon-circle-plus-outline" 
            v-permission="'ERP.Product.ProductDev.ADD'" 
            perkey="ERP.Product.ProductDev.ADD"
            v-track="{triggerType:'click',currentUrl: $route.path,behavior:'开发产品按钮'}"
        >开发产品</el-button>
        <!-- <el-button size="mini" >更换业务开发</el-button> -->
        <el-dropdown trigger="hover"  @command="changeOrderPer" size='mini' >
            <el-button type="primary" 
            size='mini' 
            plain 
            style="margin-left:10px" 
            v-permission="'ERP.Product.ProductDev.EditGroup'"
            porkey='ERP.Product.ProductDev.EditGroup' 
            @click="handleCommand"
            v-track="{triggerType:'click',currentUrl: $route.path,behavior:'更换业务开发按钮'}"
            >
                 更换业务开发<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item command= 6 plain>更换采购开发</el-dropdown-item> -->
                <el-dropdown-item 
                command= 20 
                plain  
                v-permission="'ERP.Product.ProductDev.DistributionProcurement'" 
                perkey='ERP.Product.ProductDev.DistributionProcurement'
                v-track="{triggerType:'click',currentUrl: $route.path,behavior:'更换采购开发按钮'}"
                >更换采购开发</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown trigger="hover" @command="frozenCommand" size='mini' >
            <el-button 
                type="primary" 
                size='mini' 
                plain 
                style="margin-left:10px;margin-right:10px" 
                @click="freezelist" 
                v-permission="'ERP.Product.ProductDev.FreezingOff'" 
                perkey='ERP.Product.ProductDev.FreezingOff'
                v-track="{triggerType:'click',currentUrl: $route.path,behavior:'冻结数据按钮'}"
            >冻结数据<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item 
                command= 6 
                plain 
                v-permission="'ERP.Product.ProductDev.BackToFreezingOff'" 
                perkey='ERP.Product.ProductDev.BackToFreezingOff'
                v-track="{triggerType:'click',currentUrl: $route.path,behavior:'取消冻结数据按钮'}"
                >取消冻结数据</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-button 
        size="mini" 
        type="primary" 
        plain 
        @click="putDataPass" 
        v-permission="'ERP.Product.ProductDev.Audit'" 
        perkey='ERP.Product.ProductDev.Audit'
        v-track="{triggerType:'click',currentUrl: $route.path,behavior:'资料初审通过按钮'}"
        >资料初审通过</el-button>
        <el-button 
        size="mini" 
        type="primary" 
        plain 
        @click="lastPutDataPass"
        v-permission="'ERP.Product.ProductDev.EndAudit'" 
        perkey='ERP.Product.ProductDev.EndAudit'
        v-track="{triggerType:'click',currentUrl: $route.path,behavior:'终审通过按钮'}"
        >终审通过</el-button>
        
        <el-dropdown trigger="hover" size='mini'  @command="clickOutput">
            <el-button type="primary" size='mini' plain style="margin-left:10px;margin-right:10px" v-permission="'ERP.Product.ProductDev.ExportSample'" perkey='ERP.Product.ProductDev.ExportSample'>
                 导出报表<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command= 1 plain v-track="{triggerType:'click',currentUrl: $route.path,behavior:'需求确认清单按钮'}">需求确认清单</el-dropdown-item>
                <el-dropdown-item command= 2 plain v-track="{triggerType:'click',currentUrl: $route.path,behavior:'新产品开发进度表按钮'}">新产品开发进度表</el-dropdown-item>
                <el-dropdown-item command= 3 plain v-track="{triggerType:'click',currentUrl: $route.path,behavior:'开发利润表按钮'}">开发利润表</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <span v-if="optionPutExcle" class="reportTitle"><i class="el-icon-loading" style="margin-right:5px"></i>报表导出中</span>
        <messageDialog :clickId='clickId' :dialogName='dialogName' ref="messageDialog" :selectRow="selectRow" @getTableList='getTableList'></messageDialog>
    </span>
</template>
<script>
    import { freezing,unfreezing,hasPermissions } from '@/api/user.js'
    import { globalReportExport }  from '@/utils/tools.js'
    export default {
        name:'abilityBtn',
        components:{
            messageDialog:() => import('./messageDialog')
        },
        data(){
            return {
                clickId:0,
                dialogName:'',
                row:[],
                optionPutExcle:false,
                renderDom:false
            }
        },
        props:{
            selectRow:{
                type:Array,
                default:() => ([])
            },
            navFilterList:{
                type:Object,
                default:() => ({})
            }
        },
        created(){
            let  params = [
                'ERP.Product.ProductDev.SalesManEdit',
                'ERP.Product.ProductDev.EditAuth',
                'ERP.Product.ProductDev.BuyerEdit',
                'ERP.Product.ProductDev.ADD',
                'ERP.Product.ProductDev.ManagerCancel',
                'ERP.Product.ProductDev.ManagerAudit',
                'ERP.Product.ProductDev.EditGroup',
                'ERP.Product.ProductDev.SalesManBack',
                'ERP.Product.ProductDev.BuyerBack',
                'ERP.Product.ProductDev.SalesBack',
                'ERP.Product.ProductDev.Cancel',
                'ERP.Product.ProductDev.EndAudit',
                'ERP.Product.ProductDev.AuditAuth',
                'ERP.Product.ProductDev.PurchasingSupervisorAudit',
                'ERP.Product.ProductDev.BackToFreezingOff',
                'ERP.Product.ProductDev.SamplePurchaseAudit',
                'ERP.Product.ProductDev.DistributionProcurement',
                'ERP.Product.ProductDev.FreezingOff',
                'ERP.Product.ProductDev.Audit',
                'ERP.Product.ProductDev.EndAudit',
                'ERP.Product.ProductDev.ExportSample',
                'ERP.Product.ProductDev.ProfitsFirstTrial',
                
      ]
        hasPermissions(params).then(res => {
           let data = JSON.stringify( res.data);
            sessionStorage.setItem("permissions", data);
            this.renderDom = true
        })
        },
        methods:{
            clickOutput(command){
                let options = []
                if(command == 1){
                    if(!this.selectRow || this.selectRow.length == 0 ){
                     this.$message({
                            type: 'error', 
                            message:'请选择数据列表',
                            offset:220
                        })
                        return
                }
                if(this.selectRow.length >= 2 ){
                     this.$message({
                            type: 'error', 
                            message:'选择数据不能大于1',
                            offset:220
                        })
                        return
                }
                    options = 
                    [  
                        {
                            "Field":'data-exportid',
                            'Value':document.URL.includes('yaheecloud') ? 257 : '55',//55测试
                        },
                        {
                            "Field":'ProductId',
                            'Value':this.selectRow[0].productId,
                        },     
                    ]
                }else if (command == 2){
                    
                    if(!this.navFilterList.dateFrom || !this.navFilterList.dateTo || !this.navFilterList.countryCodes || this.navFilterList.countryCodes.length == 0 || this.navFilterList.timeType != 0){
                        this.$message({
                            type: 'error', 
                            message:'请选择创建产品的起止时间及开发国家',
                            offset:220
                        })
                        return
                    }
                    if(this.navFilterList.timeType != 0){
                        this.$message({
                            type: 'error', 
                            message:'请选择创建时间',
                            offset:220
                        })
                        return
                    }
                    let dateFrom = this.navFilterList.dateFrom
                    let dateTo = this.navFilterList.dateTo
                     options = 
                    [
                        {
                            "Field":'data-exportid',
                            'Value':document.URL.includes('yaheecloud') ? 468 : 115,//115测试
                        },
                        { "Field" : "dateFrom", 'Value' : dateFrom },
                        { "Field" : "dateTo", 'Value' : dateTo },
                        { "Field" : "countryCode", 'Value' : this.navFilterList.countryCodes.toString() }
                    ]
                }else if(command == 3){
                    if(!this.navFilterList.dateFrom || !this.navFilterList.dateTo || !this.navFilterList.countryCodes || this.navFilterList.countryCodes.length == 0 || this.navFilterList.timeType != 0){
                        this.$message({
                            type: 'error', 
                            message:'请选择创建产品的起止时间及开发国家',
                            offset:220
                        })
                        return
                    }
                    let dateFrom = this.navFilterList.dateFrom
                    let dateTo = this.navFilterList.dateTo
                    options = 
                    [
                        {
                            "Field":'ProductId',
                            'Value':document.URL.includes('yaheecloud') ?483:116,//测试
                        },
                        {
                            "Field":'countryCode',
                            'Value':this.navFilterList.countryCodes.toString(),
                        },
                        { "Field" : "dateFrom", 'Value' : dateFrom },
                        { "Field" : "dateTo", 'Value' : dateTo },
                    ]
                }
                this.optionPutExcle = true
                globalReportExport(options,this)
            },
            getTableList(){
                this.$emit('putTbleList')
            },
            addProctList(){
            let routeData = this.$router.resolve({
                name: "productDetails"
    
            });
            window.open(routeData.href, '_blank');
            },
            handleCommand(){
                if( !this.selectRow || this.selectRow.length == 0 || this.selectRow.length == undefined){
                    this.$message({
                        type: 'error', 
                        message:'请选择数据',
                        offset:220
                    })
                    return
                }
                this.row = this.selectRow
                this.dialogName = '更换业务开发'
                this.clickId = 20
                this.$refs.messageDialog.openDialog()
            },
            changeOrderPer(){
                if( !this.selectRow || this.selectRow.length == 0 || this.selectRow.length == undefined){
                    this.$message({
                        type: 'error', 
                        message:'请选择数据',
                        offset:220
                    })
                    return
                }
                this.row = this.selectRow
                this.dialogName = '更换采购开发'
                this.clickId = 6
                this.$refs.messageDialog.openDialog()
            },
            frozenCommand(val){
                 if( !this.selectRow || this.selectRow.length == 0 || this.selectRow.length == undefined){
                    this.$message({
                        type: 'error', 
                        message:'请选择数据',
                        offset:220
                    })
                    return
                }
                if(val){
                    let row = this.selectRow.map(res => {
                        return res.id
                    })
                    let params = {
                        productCountryIds:row.toString()
                    }
                    unfreezing(params).then(res => {
                        if(res.code == 200){
                            this.$message({
                                type: 'success', 
                                message:'数据解除冻结成功',
                                offset:220
                            })
                            this.$emit('putTbleList')
                        }
                    })
                }
            },
            freezelist(){
                if( !this.selectRow || this.selectRow.length == 0 || this.selectRow.length == undefined){
                    this.$message({
                        type: 'error', 
                        message:'请选择数据',
                        offset:220
                    })
                    return
                }
                let row = this.selectRow.map(res => {
                        return res.id
                    })
                    let params = {
                        productCountryIds:row.toString()
                    }
                    freezing(params).then(res => {
                        if(res.code == 200){
                             this.$message({
                                type: 'success', 
                                message:'数据冻结成功',
                                offset:220
                            })
                            this.$emit('putTbleList')
                        }
                    })
            },
            putDataPass(){
                if( !this.selectRow || this.selectRow.length == 0 || this.selectRow.length == undefined){
                    this.$message({
                        type: 'error', 
                        message:'请选择数据',
                        offset:220
                    })
                    return
                }
                if(this.selectRow.every(res => res.state == 1)){
                    this.dialogName = '资料初审通过'
                    this.clickId = 2
                    this.row = this.selectRow
                    this.$refs.messageDialog.openDialog()
                }else {
                    this.$message({
                        type: 'error', 
                        message:'所选产品中包含无需初审产品',
                        offset:220
                    })
                    return
                }
                
            },
            lastPutDataPass(){
                if( !this.selectRow || this.selectRow.length == 0 || this.selectRow.length == undefined){
                    this.$message.error('请选择数据')
                    return
                }
                if(this.selectRow.every(res => res.state == 6)){
                    this.dialogName = '资料终审通过'
                    this.clickId = 30
                    this.row = this.selectRow
                    this.$refs.messageDialog.openDialog()
                }else {
                    this.$message({
                        type: 'error', 
                        message:'所选产品中包含无需终审产品',
                        offset:220
                    })
                    return
                }
                
            }
        }
    }
    
</script>
<style lang="scss" scoped>
    .navButton{
        .el-button{
             font-weight: bold;
             color: #ffffff;
        }
       .is-plain{
           background: #3366cc;
       }
    }
    .reportTitle{
        color: rgb(4, 80, 27);
    }
</style>