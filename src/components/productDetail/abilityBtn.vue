<template>
    <span class="navButton" v-if="renderDom">
        <el-button size="mini" 
            type="primary"
            @click="addProctList" 
            plain  
            icon="el-icon-circle-plus-outline" 
            v-permission="'ERP.Product.ProductDev.ADD'" 
            v-track="{triggerType:'click',currentUrl: $route.path,behavior:'开发产品按钮'}"
        >{{M2('开发产品')}}</el-button>
        <!-- <el-button size="mini" >更换业务开发</el-button> -->
        <el-dropdown trigger="hover"  @command="changeOrderPer" size='mini' >
            <el-button type="primary" 
                size='mini' 
                plain 
                style="margin-left:10px" 
                v-permission="'ERP.Product.ProductDev.EditGroup'"
                @click="handleCommand"
                v-track="{triggerType:'click',currentUrl: $route.path,behavior:'更换业务开发按钮'}"
            >
                {{M2('更换业务开发')}}<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item command= 6 plain>更换采购开发</el-dropdown-item> -->
                <el-dropdown-item 
                    command= 20 
                    plain  
                    v-permission="'ERP.Product.ProductDev.DistributionProcurement'" 
                    perkey='ERP.Product.ProductDev.DistributionProcurement'
                    v-track="{triggerType:'click',currentUrl: $route.path,behavior:'更换采购开发按钮'}"
                >{{M2('更换采购开发')}}</el-dropdown-item>
                <el-dropdown-item 
                    command= 30 
                    plain  
                    v-track="{triggerType:'click',currentUrl: $route.path,behavior:'更换负责人按钮'}"
                >{{M2('更换负责人')}}</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown trigger="hover" @command="frozenCommand" size='mini' >
            <el-button 
                type="danger" 
                size='mini' 
                plain 
                style="margin-left:10px;margin-right:10px" 
                @click="freezelist" 
                v-permission="'ERP.Product.ProductDev.FreezingOff'" 
                v-track="{triggerType:'click',currentUrl: $route.path,behavior:'冻结数据按钮'}"
            >{{M2('冻结数据')}}<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item 
                    command= 6 
                    plain 
                    v-permission="'ERP.Product.ProductDev.BackToFreezingOff'" 
                    v-track="{triggerType:'click',currentUrl: $route.path,behavior:'取消冻结数据按钮'}"
                >{{M2('取消冻结数据')}}</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-button 
            size="mini" 
            type="primary" 
            plain 
            @click="putDataPass" 
            v-permission="'ERP.Product.ProductDev.Audit'" 
            v-track="{triggerType:'click',currentUrl: $route.path,behavior:'资料初审通过按钮'}"
            >{{M2('资料初审')}}</el-button>
        <el-button 
            size="mini" 
            type="primary" 
            plain 
            @click="lastPutDataPass"
            v-permission="'ERP.Product.ProductDev.EndAudit'" 
            v-track="{triggerType:'click',currentUrl: $route.path,behavior:'终审通过按钮'}"
            >{{M2('终审审核')}}</el-button>
        
        <el-dropdown trigger="hover" size='mini'  @command="clickOutput">
            <el-button 
                size='mini' 
                plain 
                style="margin-left:10px;margin-right:10px" 
                v-permission="'ERP.Product.ProductDev.ExportSample'" 
                >
                {{M2('导出报表')}}<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command= 1 plain v-track="{triggerType:'click',currentUrl: $route.path,behavior:'需求确认清单按钮'}">{{M2('需求确认清单')}}</el-dropdown-item>
                <el-dropdown-item command= 2 plain v-track="{triggerType:'click',currentUrl: $route.path,behavior:'新产品开发进度表按钮'}">{{M2('新产品开发进度表')}}</el-dropdown-item>
                <el-dropdown-item command= 3 plain v-track="{triggerType:'click',currentUrl: $route.path,behavior:'开发利润表按钮'}">{{M2('开发利润表')}}</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <span v-if="optionPutExcle" class="reportTitle"><i class="el-icon-loading" style="margin-right:5px"></i>{{M2('报表导出中')}}</span>
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
                            message:this.M2('请选择数据列表'),
                            offset:220
                        })
                        return
                    }
                    // if(this.selectRow.length >= 2 ){
                    //     this.$message({
                    //         type: 'error', 
                    //         message:'选择数据不能大于1',
                    //         offset:220
                    //     })
                    //     return
                    // }
                    let rowId = this.selectRow.map(item => {
                        return item.productId
                    })
                    rowId = [...new Set(rowId)]
                    rowId.forEach(item => {
                        options = 
                        [  
                            {
                                "Field":'data-exportid',
                                'Value':document.URL.includes('yaheecloud') ? 257 : '55',//55测试
                            },
                            {
                                "Field":'ProductId',
                                'Value':item,
                            },     
                        ]
                         this.optionPutExcle = true
                        globalReportExport(options,this)
                    })
                    return
                }else if (command == 2){
                    if(!this.navFilterList.dateFrom || !this.navFilterList.dateTo || !this.navFilterList.countryCodes || this.navFilterList.countryCodes.length == 0 || this.navFilterList.timeType != 0){
                        this.$message({
                            type: 'error', 
                            message:this.M2('请选择创建产品的起止时间及开发国家'),
                            offset:220
                        })
                        return
                    }
                    if(this.navFilterList.timeType != 0){
                        this.$message({
                            type: 'error', 
                            message:this.M2('请选择创建时间'),
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
                            message:this.M2('请选择创建产品的起止时间及开发国家'),
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
                            message:this.M2('请选择数据'),
                            offset:220
                        })
                        return
                    }
                    this.row = this.selectRow
                    this.dialogName = this.M2('更换业务开发')
                    this.clickId = 20
                    this.$refs.messageDialog.openDialog()
               
            },
            changeOrderPer(command){
                if( !this.selectRow || this.selectRow.length == 0 || this.selectRow.length == undefined){
                    this.$message({
                        type: 'error', 
                        message:this.M2('请选择数据'),
                        offset:220
                    })
                    return
                }
                this.row = this.selectRow

                if(command == 20){
                    this.dialogName = this.M2('更换采购开发')
                    this.clickId = 6
                    this.$refs.messageDialog.openDialog()
                }else if(command == 30){

                    if(this.selectRow.some(item => [7,8,9,14].includes(item.state) )){
                        this.$message({
                            type: 'error', 
                            message:this.M2('已取消、已冻结、开发完已上架、开发完未上架状态数据不允许更改负责人！'),
                            offset:220
                        })
                        return
                    }
                    this.dialogName = this.M2('更换负责人')
                    this.clickId = 50
                    this.$refs.messageDialog.openDialog()
                }
            },
            frozenCommand(val){
                 if( !this.selectRow || this.selectRow.length == 0 || this.selectRow.length == undefined){
                    this.$message({
                        type: 'error', 
                        message:this.M2('请选择数据'),
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
                                message:this.M2('数据解除冻结成功'),
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
                        message:this.M2('请选择数据'),
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
                                message:this.M2('数据冻结成功'),
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
                        message:this.M2('请选择数据'),
                        offset:220
                    })
                    return
                }
                if(this.selectRow.every(res => res.state == 0)){
                    this.dialogName = this.M2('资料初审通过')
                    this.clickId = 2
                    this.row = this.selectRow
                    this.$refs.messageDialog.openDialog()
                }else {
                    this.$message({
                        type: 'error', 
                        message:this.M2('所选产品中包含无需初审产品'),
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
                    this.dialogName = this.M2('资料终审通过')
                    this.clickId = 30
                    this.row = this.selectRow
                    this.$refs.messageDialog.openDialog()
                }else {
                    this.$message({
                        type: 'error', 
                        message:this.M2('所选产品中包含无需终审产品'),
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
    .el-button--mini {
        padding: 5px 15px;
        font-size: 12px;
        border-radius: 3px;
        margin-top: 3px;
    }
}
</style>