<template>
    <span>
        <el-button size="mini" @click="addProctList" type="primary" plain>开发产品</el-button>
        <el-button size="mini" type="primary" plain>导出报表</el-button>
        <!-- <el-button size="mini" >更换业务开发</el-button> -->
        <el-dropdown trigger="click" @command="handleCommand" size='mini' >
            <el-button type="primary" size='mini' plain style="margin-left:10px;margin-right:10px">
                更改业务负责人<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command= 6 plain>更换采购开发</el-dropdown-item>
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
        <el-button size="mini" type="primary" plain>综审通过</el-button>
        <messageDialog :clickId='clickId' :dialogName='dialogName' ref="messageDialog" :row="row"></messageDialog>
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
            addProctList(){
                this.$router.push({name:'productDetails'})
            },
            handleCommand(val){
                if( !this.selectRow || this.selectRow.length == 0 || this.selectRow.length == undefined){
                    this.$message.error('请选择数据')
                    return
                }
                this.row = this.selectRow
                if (val == '6'){
                    this.dialogName = '更换采购开发'
                    this.clickId = 6
                }else if(val == '20'){
                    this.dialogName = '更换业务开发'
                    this.clickId = 20
                }
                
                this.$refs.messageDialog.openDialog()
            },
            frozenCommand(val){
                 if( !this.selectRow || this.selectRow.length == 0 || this.selectRow.length == undefined){
                    this.$message.error('请选择数据')
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
                            this.$message.success('数据解除冻结成功')
                        }
                    })
                }
            },
            freezelist(){
                let row = this.selectRow.map(res => {
                        return res.id
                    })
                    let params = {
                        productCountryIds:row.toString()
                    }
                    freezing(params).then(res => {
                        if(res.code == 200){
                            this.$message.success('数据冻结成功')
                        }
                    })
            },
            putDataPass(){
                if( !this.selectRow || this.selectRow.length == 0 || this.selectRow.length == undefined){
                    this.$message.error('请选择数据')
                    return
                }
                this.dialogName = '资料初审通过'
                this.clickId = 2
                this.row = this.selectRow
                this.$refs.messageDialog.openDialog()
            },
            // lastPutDataPass(){
            //     if( !this.selectRow || this.selectRow.length == 0 || this.selectRow.length == undefined){
            //         this.$message.error('请选择数据')
            //         return
            //     }
            //     this.dialogName = '资料终审通过'
            //     this.clickId = 2
            //     this.row = this.selectRow
            //     this.$refs.messageDialog.openDialog()
            // }
        }
    }
    
</script>
<style lang="scss" scoped>

</style>