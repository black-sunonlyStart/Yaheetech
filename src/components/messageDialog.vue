<template>
    <div>
        <el-dialog
            :visible.sync="dialogVisible"
            width="30%"
            :modal='false'
            class="dialogBox"
            >
            <div class="titleText" slot="title">
                {{this.dialogName}}
            </div>
            <span v-if="clickId == 1" class="dialogText">说明:确定要把选择的产品提交给业务主管(经理)进行审批?</span>
            <span v-if="clickId == 2" class="dialogText">说明:确定要把选择的产品审批通过,让认证专员去完善认证需求?</span>
            <span v-if="clickId == 5" class="dialogText">说明:确定选择的产品资料已经正确,让采购主管审核?</span>
            <span v-if="clickId == 7" class="dialogText">说明:确定选择的产品有利润空间后,让采购开发员去购买样品?</span>
            <span v-if="clickId == 10" class="dialogText">说明:确定选择的产品认证需求信息完善,让采购去寻找供应商?</span>
            <span v-if="clickId == 11" class="dialogText">说明:确定选择的产品资料已经正确,让业务开发员初步审核利润率?</span>
            <span v-if="clickId == 21" class="dialogText">说明:确定选择的产品资料已经正确,让业务开发员初步审核利润率?</span>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" size='mini'>
               <el-form-item label="开发优先级" prop="platformid" v-if="clickId == 2">
                    <el-select 
                        v-model="ruleForm.platformid"
                        >
                        <el-option 
                            v-for="item in devSign"                        
                            :key="item.key"
                            :label="item.label"
                            :value="item.value"
                            >
                        </el-option>
                    </el-select> 
                </el-form-item>
               <el-form-item label="打回状态" prop="status" v-if="clickId == 4">
                    <el-select 
                        v-model="ruleForm.status"
                        @change="changStatus"
                        >
                        <el-option 
                            v-for="item in status"                        
                            :key="item.key"
                            :label="item.label"
                            :value="item.value"
                            
                            >
                        </el-option>
                    </el-select> 
                </el-form-item>
               <el-form-item label="打回类型" prop="type" v-if="clickId == 4">
                    <el-select 
                        v-model="ruleForm.type"
                        >
                        <el-option 
                            v-for="item in type2"                        
                            :key="item.key"
                            :label="item.label"
                            :value="item.value"
                            >
                        </el-option>
                    </el-select> 
                </el-form-item>
                <el-form-item :label="label" prop="remark" v-if="clickId != 6 && clickId != 20">
                    <el-input v-model="ruleForm.remark" type="textarea" ></el-input>
                </el-form-item>
                <el-form-item label="更改采购开发员" prop="dailySales" v-if="clickId == 6">
                    <el-select 
                        v-model="ruleForm.dailySales"
                        filterable 
                        >
                        <el-option 
                            v-for="item in dailySales"                        
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                            >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="更改业务开发员" prop="dailySales" v-if="clickId ==20">
                    <el-select 
                        v-model="ruleForm.dailySales"
                        filterable 
                        >
                        <el-option 
                            v-for="item in dailySales"                        
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                            >
                        </el-option>
                    </el-select>
                </el-form-item>
                <div v-if="clickId == 3" class="defText">
                    取消开发以后，产品数据会作废。
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="submitList('ruleForm')" size="mini">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { selectRoleEmployeeForRoleId,approvalPass,beginApprovalPass,loadToBack,updateResponsible } from '@/api/user.js'
export default {
    name:'messageDialog',
    data(){
        return {
            dailySales:[],
            type2:[],
            label:'',
            ruleForm:{

            },
            platformid:0,
            dialogVisible: false,
            remark:'',
             rules: {
                remark: [
                    { required: true, message: '请输入备注', trigger: 'blur' },
                ],
                status: [
                    { required: true, message: '请选择状态', trigger: 'blur' },
                ],
                type: [
                    { required: true, message: '请选择类型', trigger: 'blur' },
                ],
                dailySales: [
                    { required: true, message: '请选择采购开发', trigger: 'blur' },
                ],
                platformid: [
                    { required: true, message: '请选择开发优先级', trigger: 'blur' },
                ],
             },
             devSign:[
                 {
                     key:1,
                     label:'低',
                     value:0,
                 },
                 {
                     key:2,
                     label:'中',
                     value:1,
                 },
                 {
                     key:3,
                     label:'高',
                     value:2,
                 },
             ],
             status:[
                 {
                     key:1,
                     label:'未提交审批',
                     value:1,
                 },
                 {
                     key:2,
                     label:'待审批',
                     value:2,
                 },
                 {
                     key:3,
                     label:'采购数据不完整/错填',
                     value:3,
                 },
             ],
             type:[
                 {
                     key:1,
                     label:'公司禁止开发种类需求',
                     value:1,
                 },
                 {
                     key:2,
                     label:'控制开发种类需求',
                     value:2,
                 },
                 {
                     key:3,
                     label:'可能会导致侵权需求',
                     value:3,
                 },
                 {
                     key:4,
                     label:'竞争力不足产品需求',
                     value:4,
                 },
                 {
                     key:11,
                     label:'业务开发需求数据不完整',
                     value:11,
                 },
                 {
                     key:12,
                     label:'不可控制力因素(如市场变化导致开发需求的变更)',
                     value:11,
                 },
                 {
                     key:13,
                     label:'重复开发',
                     value:13,
                 },
             ],
             type1:[
                 {
                     key:5,
                     label:'采购数据不完整/错填',
                     value:5,
                 },
                 {
                     key:6,
                     label:'采购条件太高而达不到(如起订量偏高等)',
                     value:6,
                 },
                 {
                     key:7,
                     label:'认证不符合要求',
                     value:7,
                 },
                 {
                     key:8,
                     label:'利润率不符合要求',
                     value:8,
                 },
                 {
                     key:9,
                     label:'确认样品时产品/包装/说明书不过关',
                     value:9,
                 },
                 {
                     key:10,
                     label:'不可控制力产生(如供应商问题产生采购信息变更)',
                     value:10,
                 },
             ]
        }
    },
    watch:{
        clickId:{
          handler:function(val){
              if(val){
                this.$nextTick(() => {
                    this.clickId = val
                    if(this.clickId == 6 || this.clickId == 20 ){
                        this.getTypeList()
                    } 
                })
              }
          },
      }
    },
    props:{
        clickId:{
            type:Number,
            default:0
        },
        dialogName:{
            type:String,
            default:''
        },
        row:{
            type:Object,
            default:() => ({})
        },
        selectRow:{
            type:Array,
            default:() => ([])
        },
        navFilterList:{
            type: Object,
            default:() => ({})
        },
    },
    mounted(){
        this.changeLabel()
        if(this.clickId == 6 || this.clickId == 20 ){
              this.getTypeList()
        } 
    },
    methods:{
        getTypeList(){
            if(this.clickId == 6){
            let params = {
                rid:170//采购开发
            }
            selectRoleEmployeeForRoleId(params).then(res => {
                this.dailySales = res.data
            })
            }else if(this.clickId == 20){
                let itemList = {
                    rid:171//业务开发
                }
                selectRoleEmployeeForRoleId(itemList).then(res => {
                    this.dailySales = res.data
                })
            }
        },
        changStatus(val){
            if(val == 3){
                this.type2 = this.type1
            }else {
                this.type2 = this.type
            }
        },
        changeLabel(){
            this.label = '备注:'
            if(this.clickId == 3){
                this.label = '取消原因:'
            }else if(this.clickId == 4){
                this.label = '打回备注:'
            }
        },
         openDialog(){
            this.dialogVisible = true
        },
        submitList(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let toState = ''
            if(this.row.state == 0){
                toState = 1
            }else if (this.row.state == 1){
                toState = 11
            }else if (this.row.state == 11){
                toState = 2
            }else if (this.row.state == 2){
                toState = 13
            }else if (this.row.state == 13){
                toState = 12
            }else if (this.row.state == 12){
                toState = 3
            }else if (this.row.state == 3){
                toState = 10
            }else if (this.row.state == 10){
                    toState = 4
            }else if(this.row.state == 9){
                toState = 10
            }else {
                toState = this.row.state + 1
            }
            let row = []
            if(this.clickId == 2 || this.clickId == 6 || this.clickId ==20){
                 row = this.selectRow.map(res => {
                    return res.id
                })
            }
            let normalList = [1,5,7,10,11,15,16]
            if(normalList.includes(this.clickId)){
                let params = {
                    productCountryId:this.row.id,
                    state:toState,
                    whyNote:this.ruleForm.remark
                }
                approvalPass(params).then(res => {
                    if(res.code == 200){
                        this.$message({
                            type: 'success', 
                            message:'保存成功',
                            offset:220
                        })
                        this.$emit('getTableList',this.navFilterList)
                        this.dialogVisible = false
                         
                    }
                })
            }
            if(this.clickId == 2){
                let params = {
                    priority:this.ruleForm.platformid,
                    whyNote:this.ruleForm.remark,
                    productCountryIds:row.toString()
                }
                beginApprovalPass(params).then(res => {
                    if(res.code == 200){
                        this.$message({
                            type: 'success', 
                            message:'保存成功',
                            offset:220
                        })
                        this.$emit('getTableList',this.navFilterList)
                        this.dialogVisible = false
                        
                    }   
                })
            }
            if(this.clickId == 4 ){
                let params = {
                    whyNote:this.ruleForm.remark,
                    backstate:this.ruleForm.status,
                    backType:this.ruleForm.type,
                    productCountryId:this.row.id
                }
                loadToBack(params).then(res => {
                    if(res.code == 200){
                        this.$message({
                            type: 'success', 
                            message:'保存成功',
                            offset:220
                        })
                        this.$emit('getTableList',this.navFilterList)
                        this.dialogVisible = false
                        
                    }   
                })
            }
            if(this.clickId == 6){
                let params = {
                    productCountryIds:row.toString(),
                    type:1,
                    empId:this.ruleForm.dailySales,
                }
                updateResponsible(params).then(res => {
                    if(res.code == 200){
                        this.$message({
                            type: 'success', 
                            message:'保存成功',
                            offset:220
                        })
                        this.$emit('getTableList',this.navFilterList)
                        this.dialogVisible = false   
                    }  
                })
            }
            if(this.clickId == 20){
                let params = {
                    productCountryIds:row.toString(),
                    type:2,
                    empId:this.ruleForm.dailySales,
                }
                updateResponsible(params).then(res => {
                    if(res.code == 200){
                        this.$message({
                            type: 'success', 
                            message:'保存成功',
                            offset:220
                        })
                         this.$emit('getTableList',this.navFilterList)
                        this.dialogVisible = false  
                    }  
                })
            }
          }
        })
    }
}
    
}
</script>
<style lang="scss" scoped>
.dialogText{
    margin-left: 75px;
    display: inline-block;
    margin-bottom: 15px;
}
.defText{
    margin-left: 102px;
}
.titleText{
    width: 100%;
    height: 30px;
    font-weight: bold;
    font-size: 16px;
}
::v-deep.dialogBox{
    .el-dialog__header{
        border-bottom: 1px solid #cccccc;
    }
}
</style>