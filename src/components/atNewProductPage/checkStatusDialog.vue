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
                <div v-if="showType == 1">
                    {{M2('是否已完成产品需求的录入，确认提交新产品开发需求？')}}
                </div>
               <div v-if="showType == 2">
                    <el-form-item :label="M2('初审结果') + '：'" prop="operation">
                        <el-select 
                            v-model="ruleForm.operation"
                            :loading="clickLoading"
                            >
                            <el-option 
                                v-for="item in operationList"                        
                                :key="item.value"
                                :label="M2(item.label)"
                                :value="item.value"
                                >
                            </el-option>
                        </el-select> 
                    </el-form-item>
                    <el-form-item :label="M2('备注') + '：'" prop="remark">
                        <el-input v-model="ruleForm.remark" type="textarea" maxlength="500" show-word-limit></el-input>
                    </el-form-item>
                </div>
                <div v-if="showType == 3">
                    <div class="dialog-l-text">
                       {{M2('是否已完成需求复审，确认由业务开发进行需求调研？')}}
                    </div>
                    <el-form-item :label="M2('业务开发') + '：'" prop="businessId">
                        <el-select 
                            v-model="ruleForm.businessId"
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
                     <el-form-item :label="M2('备注') + '：'" prop="remark">
                        <el-input v-model="ruleForm.remark" type="textarea" maxlength="500" show-word-limit></el-input>
                    </el-form-item>
                </div>
                <div v-if="showType == 4">
                    <div class="dialog-l-text">
                        {{M2('是否已完成需求调研，确认提交至下一节点？')}}
                    </div>
                    <el-form-item :label="M2('是否立项') + '：'" prop="projectApproval">
                        <el-radio-group v-model="ruleForm.projectApproval">
                            <el-radio :label="1">{{M2('是（进行立项资料准备）')}}</el-radio>
                            <el-radio :label="0">{{M2('否（进行专利查询）')}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item :label="M2('专利查询市场') + '：'" prop="country">
                        <el-checkbox-group v-model="ruleForm.country" > 
                            <el-checkbox v-for="item in countryList" :key="item.countryCode" :label="item.countryCode">{{item.label}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>

                    <el-form-item :label="M2('备注') + '：'" prop="remark" :rules="[{required: false}]">
                        <el-input v-model="ruleForm.remark" type="textarea" maxlength="500" show-word-limit></el-input>
                    </el-form-item>
                </div>
                <div v-if="showType == 5">
                    <div class="dialog-l-text">
                        {{M2('是否已完成立项，确认提交至认证初查？')}}
                    </div>
                    <el-form-item label="评审会日期：" prop="reviewMeetingDate">
                        <el-date-picker
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            size="mini"
                            v-model="ruleForm.reviewMeetingDate"
                            type="date"
                            :placeholder="M2('选择日期')">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item :label="M2('备注') + '：'" prop="remark">
                        <el-input v-model="ruleForm.remark" type="textarea" maxlength="500" show-word-limit></el-input>
                    </el-form-item>
                </div>
                <div v-if="showType == 6">
                    <!-- <div class="dialog-flex">
                        <div class="dialog-flex-title"><span style="color:red">*</span>专利查询市场：</div>
                        <div v-for="item in showCountryList" :key="item">{{showCountryText(item) + ','}}</div>
                    </div>
                    <div  class="dialog-flex">
                        <div class="dialog-flex-title"><span style="color:red">*</span>专利查询结果：</div>
                        <div>
                            <div v-for="item in historyPatentInfo" :key="item.countryCode">{{showCountryText(item.countryCode) }} - {{showReqRes(item.reqRes)}}</div>
                        </div>
                    </div> -->
                    <el-form-item  :label="M2('专利查询市场') + '：'" prop="reqRes">
                        <div style="display:flex">
                        <!-- <div v-for="item in showCountryList" :key="item">{{showCountryText(item) + ','}}</div> -->
                            <div >{{this.showCountryList && this.showCountryList.length > 0 ? this.showCountryList.toString() : ''}}</div>
                        </div>
                    </el-form-item>
                    <el-form-item  :label="M2('专利查询结果') + '：'" prop="reqRes1">
                        <div v-for="item in historyPatentInfo" :key="item.countryCode">{{showCountryText(item.countryCode) }} - {{showReqRes(item.reqRes)}}</div>
                    </el-form-item>
                </div>
                <div v-if="showType == 7">
                    <el-form-item :label="M2('产品类型') + '：'" prop="design">
                        <el-radio-group v-model="ruleForm.design">
                            <el-radio :label="2">{{M2('非设计款')}}</el-radio>
                            <el-radio v-if="devSignShow" :label="10">{{M2('设计')}}</el-radio>
                            <el-radio v-if="devSignShow" :label="11">{{M2('P图')}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item :label="M2('设计/P图方') + '：'" prop="designer" v-if="ruleForm.design == 10 || ruleForm.design == 11">
                       <el-select 
                            v-model="ruleForm.designer"
                            :loading="clickLoading"
                            >
                            <el-option 
                                v-for="item in designerList"                        
                                :key="item.value"
                                :label="M2(item.label)"
                                :value="item.value"
                                >
                            </el-option>
                        </el-select> 
                    </el-form-item>
                    <el-form-item :label="M2('备注') + '：'" prop="remark" :rules="[{required: false}]">
                        <el-input v-model="ruleForm.remark" type="textarea" maxlength="500" show-word-limit></el-input>
                    </el-form-item>
                </div>
                <div v-if="showType == 7.1">
                    <div class="dialog-l-text" v-if="showCountryList && showCountryList.length > 0">
                        {{M2('产品专利查询未在')}}【<span v-for="item in showCountryList" :key="item">{{M2(showCountryText(item)) + ','}}</span>】{{M2('市场通过')}}，{{M2('请确认该产品的下一状态')}}：
                    </div>
                    <el-form-item  :label="M2('下一状态') + '：'" prop="toState">
                        <el-select 
                            v-model="ruleForm.toState"
                            :loading="clickLoading"
                            >
                            <el-option 
                                v-for="item in toStateList"                        
                                :key="item.key"
                                :label="M2(item.value)"
                                :value="item.key"
                                >
                            </el-option>
                        </el-select> 
                    </el-form-item>
                    <el-form-item  :label="M2('备注') + '：'" prop="remark">
                        <el-input v-model="ruleForm.remark" type="textarea" maxlength="500" show-word-limit></el-input>
                    </el-form-item>
                </div>
                <div v-if="[8,9,10,11].includes(showType)">
                    <div class="dialog-l-text" v-if="showType == 8 || showType == 9">
                        {{M2('是否已上传产品设计图片，确认提交至下一状态？')}}
                    </div>
                    <div class="dialog-l-text" v-if="showType == 10">
                        {{M2('是否已完成产品专利的查询，确认提交至下一状态？')}}
                    </div>
                    <div class="dialog-l-text" v-if="showType == 11">
                        {{M2('是否已上传产品结构图片，确认提交至下一状态？')}}
                    </div>
                    <el-form-item :label="M2('备注') + '：'" prop="remark" :rules="[{required: false}]">
                        <el-input v-model="ruleForm.remark" type="textarea" maxlength="500" show-word-limit></el-input>
                    </el-form-item>
                </div>
                <div v-if="showType == 12">
                    <el-form-item :label="M2('样前方案确认结果') + '：'" prop="beforeSampleResult">
                        <el-radio-group v-model="ruleForm.beforeSampleResult">
                            <el-radio :label="0"> {{M2('通过，推送产品开发系统')}}</el-radio>
                            <el-radio :label="1">{{M2('打回，重新进行产品设计需求调整')}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item :label="M2('备注') + '：'" prop="remark" :rules="[{required: false}]">
                        <el-input v-model="ruleForm.remark" type="textarea" maxlength="500" show-word-limit></el-input>
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
import { selectRoleEmployeeForRoleId,auditProductDemand} from '@/api/user.js'
export default {
    name:'checkStatusDialog',
    data(){
        return {
            showType:1,
            clickLoading:false,
            devSignShow:true,
            ruleForm:{
                status:null,
                toState:null,
                businessId:null,
                country:[],
                remark:'',
                design:null,
            },
            tableData:[],
            dialogName:'审批',
            dialogVisible: false,
            rules: {
                remark: [
                    { required: true, message: this.M2('请输入必填项！'), trigger: 'blur' },
                ],
                operation: [
                    { required: true, message: this.M2('请选择！'), trigger: 'blur' },
                ],
                businessId: [
                    { required: true, message: this.M2('请选择经办人！'), trigger: 'blur' },
                ],
                country: [
                    { required: true, message: this.M2('请选择专利查询市场！'), trigger: 'blur' },
                ],
                projectApproval: [
                    { required: true, message: this.M2('请选择是否立项！'), trigger: 'blur' },
                ],
                reviewMeetingDate: [
                    { required: true, message: this.M2('请选择评审会日期！'), trigger: 'blur' },
                ],
                design: [
                    { required: true, message: this.M2('请选择产品类型！'), trigger: 'blur' },
                ],
                designer: [
                    { required: true, message: this.M2('请选择！'), trigger: 'blur' },
                ],
                toState: [
                    { required: true, message: this.M2('请选择下一个状态！'), trigger: 'blur' },
                ],
                beforeSampleResult: [
                    { required: true, message: this.M2('请选择样前方案结果！'), trigger: 'blur' },
                ],
            },
            status:[],
            rowList:[],
            operationList:[
                {
                    value:0,
                    label:'通过',
                },
                {
                    value:1,
                    label:'驳回',
                },
            ],
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
            toStateList:[
                {
                    label: '结构设计',
                    value:11
                },
                {
                    label: '重新进行产品设计/P图',
                    value:8
                },    
            ],
            designerList:[
                {
                    label: '设计部',
                    value:1
                },
                {
                    label: '工厂',
                    value:2
                },
                {
                    label: '工厂&设计部',
                    value:3
                },
            ],
            assigneeIdList:[],
            patentResults:[],
            showCountryList:[],
            historyPatentInfo:[],
            productStructurePictureNum:0
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
        openDialog(rowList){
            this.rowList = rowList
            let params = {}
            this.$set(this.ruleForm,'status',null)
            this.$set(this.ruleForm,'toState',null)
            this.$set(this.ruleForm,'businessId',null)
            this.$set(this.ruleForm,'country',[])
            this.$set(this.ruleForm,'remark',null)
            this.$set(this.ruleForm,'design',null)
            this.$set(this.ruleForm,'designer',null)
            this.$set(this.ruleForm,'beforeSampleResult',null)
            this.$set(this.ruleForm,'reviewMeetingDate',null)
            this.$set(this.ruleForm,'projectApproval',null)
            this.showType = rowList[0].state
            this.devSignShow = true
            switch (rowList[0].state) {
                case 3 :
                    params = {
                        rid:document.URL.includes('yaheecloud') ? 40 : 171 // rid:40//业务开发40
                    }
                    selectRoleEmployeeForRoleId(params).then(res => {
                        this.assigneeIdList = res.data
                        this.clickLoading = false
                    }).catch(res => {
                        this.clickLoading = false
                        this.dialogVisible = false
                    })
                break;  
                case 6:
                    if(this.rowList[0].curProductDemandPatent){
                        if(this.rowList[0].curProductDemandPatent.patentInfo){
                            this.showCountryList  =  JSON.parse(this.rowList[0].curProductDemandPatent.patentInfo).map(item => {
                                return item.countryCode
                            })
                        }
                        this.historyPatentInfo = JSON.parse(this.rowList[0].curProductDemandPatent.patentInfo)
                    }else {
                        this.showCountryList = []
                        this.historyPatentInfo = []
                    }
                    break 
                case 7 :
                    if(this.rowList[0].design == 2){
                       this.ruleForm.design = 2
                       this.devSignShow = false
                    }
                    if(this.rowList[0].alreadyPatentInquiry == 1 && this.rowList[0].design != 2){
                        this.showType = 7.1
                        if(this.rowList[0].curProductDemandPatent){
                            if(this.rowList[0].curProductDemandPatent.patentInfo){
                                this.showCountryList  =  JSON.parse(this.rowList[0].curProductDemandPatent.patentInfo).filter(item => {
                                    return !item.patentInfo
                                }).map(item => {
                                    return item.countryCode
                                })
                            }
                        }
                        if(this.rowList[0].statusChangeOptions){
                            let toStateList
                            toStateList = this.rowList[0].statusChangeOptions.filter(item => {
                                return item.operation == 0 && item.design == this.ruleForm.design
                                    && item.projectApproval == this.ruleForm.projectApproval 
                                    && item.beforeSampleResult == this.ruleForm.beforeSampleResult 
                            })
                            if(toStateList.length > 0){
                                this.toStateList = toStateList[0].toStateOptions
                            }
                        }
                    }  
                    this.$set(this.ruleForm,'designer',this.rowList[0].designer)      
                    this.$set(this.ruleForm,'design',this.rowList[0].design)
                    break
                case 11 :
                    this.productStructurePictureNum = this.rowList[0].productStructurePictureNum
                    break 
                default :
                    this.showType = rowList[0].state
                    break
            }
            let chenkText = [2,3,5,11]
            if(chenkText.includes(rowList[0].state)){
                this.dialogName = '审核'
            }else {
                this.dialogName = '提交'
            }
            if(this.showType == 1){
                this.$confirm(this.M2(`是否已完成产品需求的录入，确认提交新产品开发需求？`), this.M2('提示'), {
                    cancelButtonText: this.M2('取消'),
                    confirmButtonText: this.M2('确定'),
                    type: 'warning',
                    cancelButtonClass: 'btn-custom-cancel',
                }).then(() => {                      
                    this.savefnExamine()
                }).catch(() => {
                    return          
                }); 
            }else {
                this.dialogVisible = true
            }
        },
        resetForm() {
            if(this.$refs['ruleForm']) this.$refs['ruleForm'].resetFields()
            this.dialogVisible = false
        },
        submitList(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.savefnExamine()
                }
            })
        },
        savefnExamine(){
            if(this.showType == 6 && (this.showCountryList.length == 0 || this.historyPatentInfo.length == 0)){
                this.$message({
                    type: 'error', 
                    message:this.M2('请添加专利查询市场和结果！'),
                    offset:220
                })
                return 
            }
            if(this.showType == 8 || this.showType == 9){
                if(!this.rowList.every(item => item.productDesignPictureNum > 0)){
                    let filterList = this.rowList.filter(item => {
                        return !item.productDesignPictureNum 
                    })
                    .map(item => {
                        return item.developmentId
                    })
                    this.$message({
                        type: 'error', 
                        message:`id:${filterList.toString()}，${this.M2('请至少上传一张设计图片！')}`,
                        offset:220
                    })
                    return 
                }
            }
            if(this.showType ==  11){
                if(!this.rowList.every(item => item.productStructurePictureNum > 0)){
                    let filterList = this.rowList.filter(item => {
                        return !item.productStructurePictureNum 
                    })
                    .map(item => {
                        return item.developmentId
                    })
                    this.$message({
                        type: 'error', 
                        message:`id:${filterList.toString()}，${this.M2('请至少上传一张结构图片！')}`,
                        offset:220
                    })
                    return 
                }
            }
            if(this.showType == 4){
                this.rowList.forEach(item => {
                    if(item.productDemandCompetings){
                        item.countryList = item.productDemandCompetings.map(res => {
                            return res.urlMarket 
                        })
                        if(item.countryList.includes('DE') || item.countryList.includes('FR') || item.countryList.includes('IT') || item.countryList.includes('ES')){
                            item.countryList.push('EU')
                        }
                    }else {
                        item.countryList = []
                    }
                    //德意法西任意一个市场添加了竞品信息，就可以查询欧盟。
                    item.filterCountryList = this.ruleForm.country.filter(item1 => {
                        return !Array.from(new Set(item.countryList)).includes(item1) && (item1)
                    })
                    //德意法西 DE FR IT ES
                })
                if(this.rowList.some(item => item.filterCountryList && item.filterCountryList.length > 0)){
                    let text = ''
                    let textList = this.rowList.filter(item => {
                        return item.filterCountryList && item.filterCountryList.length > 0
                    })
                    textList.forEach(item => {
                        text += `<div style="margin-bottom:2px">${this.M2('开发ID')}：${item.developmentId}，${this.M2('需要完善')}${item.filterCountryList}${this.M2('市场的竞品信息及链接!')}</div>`
                    })
                    this.$message({
                        type: 'error', 
                        dangerouslyUseHTMLString: true,
                        message: text,
                        offset:220,
                    })
                    return 
                }
            }
            this.clickLoading = true
            let toState = this.rowList.state + 1
            let operation = this.ruleForm.operation ? this.ruleForm.operation : 0
            if(this.rowList[0].statusChangeOptions){
                let toStateList
                toStateList = this.rowList[0].statusChangeOptions.filter(item => {
                    return (item.operation == null || item.operation == operation )
                        && (item.design == null || item.design == this.ruleForm.design)
                        && (item.projectApproval == null || item.projectApproval == this.ruleForm.projectApproval)
                        && (item.beforeSampleResult == null || item.beforeSampleResult == this.ruleForm.beforeSampleResult) 
                        && (item.patentInquiry == null || item.patentInquiry == this.rowList[0].patentInquiry)
                })
                if(toStateList.length > 0){
                    toState = toStateList[0].toStates[0]
                }
            }
            let param = {
                "productDemandIds": this.rowList.map(item =>{ return item.id }),//需要操作审核的id 数组
                "operation": operation,//操作 0：提交   1：打回
                "toState":this.showType == 7.1 ? this.ruleForm.toState : toState,//需要操作到达状态
                "projectApproval":this.ruleForm.projectApproval || this.ruleForm.projectApproval == 0 ? this.ruleForm.projectApproval : null,//是否立项  0：不立项、1：立项
                "patentInfo": this.ruleForm.country || null, //专利信息
                "note":this.ruleForm.remark  || null,//备注
                "reviewMeetingDate":this.ruleForm.reviewMeetingDate || null,//评审会日期
                "design": this.ruleForm.design || null,//产品类型 设计款(10： 设计、11：P图)、 2 非设计款
                "designer":this.ruleForm.designer || null,// 设计/P图方  1:设计部、2:工厂、3:工厂&设计部
                "beforeSampleResult":this.ruleForm.beforeSampleResult || this.ruleForm.beforeSampleResult == 0 ? this.ruleForm.beforeSampleResult : null,//样前方案确认结果  0：通过  1：不通过
                "businessId":this.ruleForm.businessId || null,//业务开发
                // "reviewMeetingDate":this.ruleForm.reviewMeetingDate || null,//业务开发
            }
            auditProductDemand(param).then(res => {
                if(res.code == 200){
                    this.successSaveDialog()
                }
            }).catch((err) => {
                this.clickLoading = false
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
        showCountryText(val){
            if(!val) return ''
            let des = []
            des = this.countryList.filter(item => {
                return item.countryCode == val
            })
            if(des.length > 0){
                return des[0].label
            }else {
                return ''
            } 
        },
        showReqRes(val){
            if(!val) return ''
            let des = []
            des = this.devSign.filter(item => {
                return item.value == val
            })
            if(des.length > 0){
                return des[0].label
            }else {
                return ''
            }
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