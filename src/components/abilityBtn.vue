<template>
    <span class="navButton">
        <el-button size="mini" @click="addProctList" type="primary" plain  icon="el-icon-circle-plus-outline" perkey="ERP.Product.ProductDev.ADD">开发产品</el-button>
        <!-- <el-button size="mini" >更换业务开发</el-button> -->
        <el-dropdown trigger="hover"  @command="changeOrderPer" size='mini' >
            <el-button type="primary" size='mini' plain style="margin-left:10px" porkey='ERP.Product.ProductDev.EditGroup' @click="handleCommand">
                 更换业务开发<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item command= 6 plain>更换采购开发</el-dropdown-item> -->
                <el-dropdown-item command= 20 plain>更换采购开发</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown trigger="hover" @command="frozenCommand" size='mini' >
            <el-button type="primary" size='mini' plain style="margin-left:10px;margin-right:10px" @click="freezelist" perkey='ERP.Product.ProductDev.FreezingOff'>
                冻结数据<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command= 6 plain>取消冻结数据</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-button size="mini" type="primary" plain @click="putDataPass" perkey='ERP.Product.ProductDev.Audit'>资料初审通过</el-button>
        <el-button size="mini" type="primary" plain @click="lastPutDataPass" perkey='ERP.Product.ProductDev.EndAudit'>终审通过</el-button>
        
        <el-dropdown trigger="hover" size='mini' >
            <el-button type="primary" size='mini' plain style="margin-left:10px;margin-right:10px" perkey='ERP.Product.ProductDev.ExportSample' @click="uploadExList">
                 导出报表<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item command= 6 plain>更换采购开发</el-dropdown-item> -->
                <el-dropdown-item command= 1 plain>导出样品采购单</el-dropdown-item>
                <el-dropdown-item command= 2 plain>导出下单数据表</el-dropdown-item>
                <el-dropdown-item command= 3 plain>导出开发利润表</el-dropdown-item>
                <el-dropdown-item command= 4 plain>导出数据表</el-dropdown-item>
                <el-dropdown-item command= 5 plain>导出需求确认清单</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <messageDialog :clickId='clickId' :dialogName='dialogName' ref="messageDialog" :selectRow="selectRow" @getTableList='getTableList'></messageDialog>
    </span>
</template>
<script>
    import { freezing,unfreezing } from '@/api/user.js'
    // import { globalReportExport,Output,formatDate }  from '@/utils/tools.js'
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
            }
        },
        props:{
            selectRow:{
                type:Array,
                default:() => ([])
            }
        },
        methods:{
            uploadExList(){
                this.globalReportExport()
                // Output()
            },
            globalReportExport(option) {
                let defaultOption = {
                    Id: 55,//导出Id
                    Param: [[{'Field':'ProductId','Value':15}]],//输入参数
                    Type: 0, //导出类型 0:导出/1:预览/ 
                    IsOpenParamWin: false,//是否打开参数选择界面 false:不打开，参数需要自己传入/true:打开，参数可选
                    GetParamFun: null,
                    WinTitle: null,
                    parameters:{Id: 55, Param: [{Field:'ProductId',Value:15}]},
                    Callback: function (sUrl) {
                        window.open(sUrl);
                    }
                }
                // GlobalReportExport({Id: 55, Param: [{Field:'ProductId',Value:15}]})
                let _Option = Object.assign({}, defaultOption, option);

                if (!/^\d+$/.test(_Option.Id)) {
                    this.$Message.error('导出Id格式错误，应为大于0的整数!');
                    return;
                }
                _Option.Id = parseInt(_Option.Id, 10);
                // if (option.Id <= 0) {
                //     this.$Message.error('导出Id错误，应为大于0的整数!');
                //     return;
                // }

                //#region  参数获取
                var _Param = _Option.Param;
                if (_Option != null && typeof _Option.GetParamFun == 'function') {
                    _Param = _Option.GetParamFun();
                }
                //#endregion
                if (_Option.IsOpenParamWin) {
                    //创建窗口
                    // new ParamWin({ Id: _Option.Id, Param: _Param, Type: _Option.Type, WinTitle: _Option.WinTitle }, _Option.Callback).open(_Param);
                } else {
                    let  Option = {
                        Id: _Option.Id, Data: _Param, Type: _Option.Type,parameters:_Option.parameters
                    }
                    this.Output(Option, _Option.Callback);
                }
            },
            //导出
            Output(Option) {
                console.log(Option,'Option')
                if (Option.Type == 0) {
                    var data = {};
                    if ( Option.Data.length > 0) {
                        for (var i = 0; i < Option.Data.length; i++) {
                            data[Option.Data[i][i].Field] = Option.Data[i][i].Value;
                        }
                    }
                    // data = {
                    //     ProductId:15
                    // }
                    Option.Data = JSON.stringify(data);
                    let url = this.GetHelpTagsUrl("/ExportTable/OutputNew").toString()
                    this.$jsonp(url,Option).then((data) => {
                        window.open(data.Url)
                    }).catch((err) => {
                        console.log(err)
                    })
                }
            },
            GetHelpTagsUrl(Url) {
                var BaseUrl = '';
                var domain = document.domain;
                if (domain.indexOf('localhost') >= 0) {
                    BaseUrl = 'http://localhost:4840';
                }
                else if (domain.indexOf('yahee.com') >= 0) {
                    BaseUrl = 'http://qas-newerp.yahee.com.cn:8088/PMS/Latest';
                }
                else {
                    BaseUrl = 'http://newerp.yaheecloud.com/PMS/Latest'
                }
                return BaseUrl + Url;
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
            handleCommand(val){
                if( !this.selectRow || this.selectRow.length == 0 || this.selectRow.length == undefined){
                    this.$message({
                        type: 'error', 
                        message:'请选择数据',
                        offset:220
                    })
                    return
                }
                this.row = this.selectRow
                //  if(val == '20'){
                    this.dialogName = '更换业务开发'
                    this.clickId = 20
                // }
                
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
</style>