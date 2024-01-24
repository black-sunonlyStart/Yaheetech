<template>
    <div>
        <el-dialog
            :visible.sync="dialogVisible"
            width='800px'
            :modal='false'
            class="dialogBox"
            v-dialogDrag
            zIndex="3000"
            >
            <div class="titleText" slot="title">
                {{M2(this.dialogName)}}
            </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm" size='mini'>
                <div v-if="showType == 1 || showType == 2 || showType == 3">
                    <el-form-item :label="M2(dialogName) + '：'" prop="empId">
                        <el-select 
                            v-model="ruleForm.empId"
                            :loading="clickLoading"
                            >
                            <el-option 
                                v-for="item in assigneeIdList"                        
                                :key="item.Id"
                                :label="item.TrueName"
                                :value="item.Id"
                                >
                            </el-option>
                        </el-select> 
                    </el-form-item>
                </div>
                <div v-if="showType == 4">
                    <div class="dialog-l-text" v-if="rowList[0].state == 1">
                        {{M2('确定取消此开发需求么？取消后数据将被删除；')}}
                    </div>
                    <div v-else>
                        <div class="dialog-l-text">
                            {{M2(`当前选中${this.rowList.length}条数据！`)}}
                        </div>
                        <el-form-item :label="M2('取消原因') + '：'" prop="cancelType">
                            <el-select 
                                v-model="ruleForm.cancelType"
                                :loading="clickLoading"
                                >
                                <el-option 
                                    v-for="item in cancelList"                        
                                    :key="item.typeId"
                                    :label="M2(item.typeValue)"
                                    :value="item.typeId"
                                    >
                                </el-option>
                            </el-select> 
                        </el-form-item>
                        <el-form-item  :label="M2('备注') + '：'" prop="whyNote"  >
                            <el-input v-model="ruleForm.whyNote" type="textarea" maxlength="500" show-word-limit></el-input>
                        </el-form-item>
                    </div>
                    
                </div>
                <div v-if="showType == 6">
                    <div class="dialog-l-text">
                         {{M2(`当前选中${this.rowList.length}条数据！`)}}
                    </div>
                    <el-form-item  :label="M2('冻结原因') + '：'" prop="whyNote"  >
                        <el-input v-model="ruleForm.whyNote" type="textarea" maxlength="500" show-word-limit></el-input>
                    </el-form-item>
                </div>
                <div v-if="showType == 8">
                    <div class="dialog-l-text">
                         {{M2(`当前选中${this.rowList.length}条数据！`)}}
                    </div>
                    <el-form-item :label="M2('跳过的状态') + '：'" prop="skipStatus">
                        {{M2('立项中')}}
                    </el-form-item>
                    <el-form-item :label="M2('下一状态') + '：'" prop="nextStatus">
                        {{M2('认证初查')}}
                    </el-form-item>
                </div>
                <div v-if="showType == 9">
                    <div class="dialog-l-text">
                         {{M2(`当前选中${this.rowList.length}条数据！`)}}
                    </div>
                    <el-form-item :label="M2('跳过的状态') + '：'" prop="skipStatus">
                         {{M2('结构设计')}}
                    </el-form-item>
                    <el-form-item :label="M2('下一状态') + '：'" prop="nextStatus">
                        {{M2('样前方案确认')}}
                    </el-form-item>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button 
                    type="primary" 
                    @click="submitList('ruleForm')" 
                    size="mini" 
                    :loading="clickLoading"
                >{{M2('确 定')}}</el-button>
                <el-button 
                    @click="resetForm('ruleForm')" 
                    size="mini" 
                >{{M2('关 闭')}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { selectRoleEmployeeForRoleId,saveDesigner,getPatentClerks,savePatentClerk,saveBusinessId,getCancelType,demandFreezing,skipProjectApproval,skipStructuralDesign,getDesigners2} from '@/api/user.js'
export default {
    name:'functionButtonDialog',
    data(){
        return {
            showType:1,
            clickLoading:false,
            ruleForm:{
                status:null,
                assigneeId:null,
                empId:null,
                cancelType:null,
                country:[],
                remark:'',
            },
            dialogName:'审批',
            dialogVisible: false,
            rules: {
                remark: [
                    { required: true, message: this.M2('请输入必填项！'), trigger: 'blur' },
                ],
                empId: [
                    { required: true, message:  this.M2('请选择！'), trigger: 'blur' },
                ],
                assigneeId: [
                    { required: true, message:  this.M2('请选择经办人！'), trigger: 'blur' },
                ],
                whyNote: [
                    { required: true, message:  this.M2('请填写取消原因！'), trigger: 'blur' },
                ],
                cancelType: [
                    { required: true, message:  this.M2('请选择取消原因！'), trigger: 'blur' },
                ],
            },
            status:[],
            rowList:[],
            countryList:[
                {
                    label: '美国',
                    countryCode: 'US',
                },
                {
                    label: '英国',
                    countryCode: 'GB',
                },
                {
                    label: '欧盟',
                    countryCode: 'EU',
                },
                {
                    label: '加拿大',
                    countryCode: 'CA',
                },
                {
                    label: '日本',
                    countryCode: 'JP' ,
                },

            ],
            devSign:[
                {
                    label: '可以开发',
                    key: 1,
                    value:1
                },
                {
                    label: '改进后开发',
                    key: 2,
                    value:2
                },    
                {
                    label: '不可以开发',
                    key: 3,
                    value:3
                }, 
            ],
            assigneeIdList:[],
            cancelList:[],
        }
    },
    props:{
        navFilterList:{
            type:Object,
            default:() => {}
        }
    },
    mounted(){},
    methods:{
        async openDialog(rowList,val){
            this.rowList = rowList
            this.showType = val
            let params = {}
            this.$set(this.ruleForm,'status',null)
            this.$set(this.ruleForm,'assigneeId',null)
            this.$set(this.ruleForm,'empId',null)
            this.$set(this.ruleForm,'cancelType',null)
            this.$set(this.ruleForm,'country',[])
            this.$set(this.ruleForm,'remark',null)
            //设计款：产品设计角色     正式：1497、测试： 433
            //P图款：视觉设计角色      正式：1498、测试： 418
            if(val == 1){
                this.dialogName = '分配设计师'
                if(rowList[0].design == 10) { 
                    params = {
                        rid:document.URL.includes('yaheecloud') ? 1612 : 433 // 设计款：产品设计角色 
                    } 
                    await selectRoleEmployeeForRoleId(params).then(res => {
                        this.assigneeIdList = res.data
                        this.clickLoading = false

                    }).catch(res => {
                        this.clickLoading = false
                    })
                }else {
                    await getDesigners2(params).then(res => {
                        this.assigneeIdList = res.data
                        this.clickLoading = false

                    }).catch(res => {
                        this.clickLoading = false
                    })
                }
                
            }else if (val == 2){
                this.dialogName = '分配专利检索员'
                await getPatentClerks(params).then(res => {
                    this.assigneeIdList = res.data
                    this.clickLoading = false
                }).catch(res => {
                    this.clickLoading = false
                })
            }else if(val == 3){
                this.dialogName = '分配业务开发'
                params = {
                    rid:document.URL.includes('yaheecloud') ? 40 : 171 // rid:40//业务开发40
                } 
                await selectRoleEmployeeForRoleId(params).then(res => {
                    this.assigneeIdList = res.data
                    this.clickLoading = false
                }).catch(res => {
                    this.clickLoading = false
                })
            }else if(val == 4){
                this.dialogName = '取消开发'
                await getCancelType().then(res => {
                    this.cancelList = res.data
                    this.clickLoading = false
                }).catch(res => {
                    this.clickLoading = false
                })
            }else if(val == 6){
                this.dialogName = '冻结开发'
            }else if(val == 8){
                this.dialogName = '跳过'
            }
            this.dialogVisible = true
        },
        resetForm() {
            if(this.$refs['ruleForm']) this.$refs['ruleForm'].resetFields()
            this.dialogVisible = false
        },
        submitList(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.clickLoading = true
                    let param = {}
                    let fn 
                    if(this.showType == 1 || this.showType == 2 || this.showType == 3){
                        param = {
                            productDemandIds: this.rowList.map(item =>{ return item.id }),//需要操作审核的id 数组
                            empId:this.ruleForm.empId
                        }
                        if(this.showType == 1){
                            fn = saveDesigner(param)
                        }else if(this.showType == 2){
                            fn = savePatentClerk(param)
                        }else if(this.showType == 3){
                            fn = saveBusinessId(param)
                        }
                    }else if(this.showType == 4 || this.showType == 6){
                        param = {
                            productDemandIds: this.rowList.map(item =>{ return item.id }),//需要操作审核的id 数组
                            operation: this.showType == 4 ?3 : 4,//操作   3：取消  4：冻结 
                            cancelType: this.ruleForm.cancelType,//取消原因
                            whyNote:this.ruleForm.whyNote,//取消 说明、冻结原因
                        }
                        fn = demandFreezing(param)
                    }else if(this.showType == 8){
                        param = {
                            productDemandIds: this.rowList.map(item =>{ return item.id }),//需要操作审核的id 数组
                            skipToState:6
                        }
                        fn = skipProjectApproval(param)
                    }
                    else if(this.showType == 9){
                        param = {
                            productDemandIds: this.rowList.map(item =>{ return item.id }),//需要操作审核的id 数组
                            skipToState:12
                        }
                        fn = skipStructuralDesign(param)
                    }
                    fn.then(res => {
                        if(res.code == 200){
                            this.successSaveDialog()
                        }
                    }).catch((err) => {
                        this.clickLoading = false
                    })
                }
            })
        },
        successSaveDialog() {
            this.$message({
                type: 'success', 
                message:this.M2('操作成功！'),
                offset:220
            })
            this.$emit('mainListList',this.navFilterList)
            this.$refs['ruleForm'].resetFields();
            this.dialogVisible = false 
            this.clickLoading = false
        },
    }  
}
</script>
<style lang="scss" scoped>
.titleText{
    width: 100%;
    height: 30px;
    font-weight: bold;
    font-size: 16px;
    line-height: 30px;
}
::v-deep.dialogBox{
    margin-top: 60px;
    .el-dialog__header{
        .el-dialog__headerbtn {
            top: 15px;
        }
        border-bottom: 1px solid #cccccc;
        padding: 5px;
    }
    .a-link {
       color: #3366cc;
       cursor: pointer;
    }
}
.dialog-flex {
    display: flex;
    margin: 10px 0px;
    .dialog-flex-title {
        padding-left: 140px;
        flex-shrink: 0;
    }
}
.dialog-l-text {
    padding-left: 140px;
    margin-bottom: 15px;
}
</style>