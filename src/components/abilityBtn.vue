<template>
    <span class="navButton">
        <el-button size="mini" @click="addProctList" type="primary" plain  icon="el-icon-circle-plus-outline">开发产品</el-button>
        <!-- <el-button size="mini" >更换业务开发</el-button> -->
        <el-dropdown trigger="hover" @command="handleCommand" size='mini' >
            <el-button type="primary" size='mini' plain style="margin-left:10px;margin-right:10px" @click="changeOrderPer">
                更换采购开发<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item command= 6 plain>更换采购开发</el-dropdown-item> -->
                <el-dropdown-item command= 20 plain>更换业务开发</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown trigger="hover" @command="frozenCommand" size='mini' >
            <el-button type="primary" size='mini' plain style="margin-left:10px;margin-right:10px" @click="freezelist">
                冻结数据<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command= 6 plain>取消冻结数据</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-button size="mini" type="primary" plain @click="putDataPass">资料初审通过</el-button>
        <el-button size="mini" type="primary" plain @click="lastPutDataPass">终审通过</el-button>
        <el-button size="mini" type="primary" plain>导出报表</el-button>
        <messageDialog :clickId='clickId' :dialogName='dialogName' ref="messageDialog" :selectRow="selectRow" @getTableList='getTableList'></messageDialog>
    </span>
</template>
<script>
    import { freezing,unfreezing } from '@/api/user.js'
    export default {
        name:'abilityBtn',
        components:{
            messageDialog:() => import('./messageDialog')
        },
        data(){
            return {
                clickId:0,
                dialogName:'',
                row:[]
            }
        },
        props:{
            selectRow:{
                type:Array,
                default:() => ([])
            }
        },
        methods:{
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
                 if(val == '20'){
                    this.dialogName = '更换业务开发'
                    this.clickId = 20
                }
                
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