<template>
    <div>
         <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm" size="mini">
             <el-row>
                 <el-col :span="10">
                     <el-form-item label="产品类型:" prop="productType">
                        <el-radio-group v-model="ruleForm.productType">
                            <el-radio :label="1">普通/多属性产品</el-radio>
                            <el-radio :label="2">物理捆绑产品</el-radio>
                        </el-radio-group>
                    </el-form-item>
                 </el-col>
             </el-row>
             <el-row>
                 <el-col :span="6">
                    <el-form-item label="产品尺寸:" prop="productSizeL">
                        <div class="productSizeW">
                            <el-input placeholder="请输入内容" v-model="ruleForm.productSizeL"  oninput="value=value.replace(/^\D*([0-9]\d*\.?\d{0,2})?.*$/,'$1')">
                                <template slot="append">长(cm)</template>
                            </el-input>
                        </div>
                    </el-form-item>
                </el-col>
                 <el-col :span="3">
                    <el-form-item  prop="productSizeW" label-width="15px">      
                        <div class="productSizeW">
                            <el-input placeholder="请输入内容" v-model="ruleForm.productSizeW">
                                <template slot="append">宽(cm)</template>
                            </el-input>
                        </div>
                    </el-form-item>
                </el-col>
                 <el-col :span="3">
                    <el-form-item  prop="productSizeH" label-width="15px">      
                        <div class="productSizeW">
                            <el-input placeholder="请输入内容" v-model="ruleForm.productSizeH">
                                <template slot="append">高(cm)</template>
                            </el-input>
                        </div>
                    </el-form-item>
                </el-col>
             </el-row>
             <el-row>
                 <el-col :span="6">
                    <el-form-item label="包装尺寸(发货用):" prop="packageSizeL">
                        <div class="productSizeW">
                            <el-input placeholder="请输入内容" v-model="ruleForm.packageSizeL">
                                <template slot="append">长(cm)</template>
                            </el-input>
                        </div>
                    </el-form-item>
                </el-col>
                 <el-col :span="3">
                    <el-form-item  prop="packageSizeW" label-width="15px">      
                        <div class="productSizeW">
                            <el-input placeholder="请输入内容" v-model="ruleForm.packageSizeW">
                                <template slot="append">宽(cm)</template>
                            </el-input>
                        </div>
                    </el-form-item>
                </el-col>
                 <el-col :span="3">
                    <el-form-item  prop="packageSizeH" label-width="15px">      
                        <div class="productSizeW">
                            <el-input placeholder="请输入内容" v-model="ruleForm.packageSizeH">
                                <template slot="append">高(cm)</template>
                            </el-input>
                        </div>
                    </el-form-item>
                </el-col>
                 <el-col :span="2">
                    <el-form-item  prop="packageSizeH" label-width="15px">      
                        <el-select 
                            v-model="ruleForm.sizeRules"
                            placeholder="请选择"
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
                </el-col>
                <el-col :span="2">
                    <span class="vacanBox">体积：</span><span v-if="ruleForm.sizeRules == '1'">{{(ruleForm.productSizeH * ruleForm.packageSizeW * ruleForm.packageSizeH) / 1000}}m³</span>
                                      <span v-else-if="ruleForm.sizeRule == '2'">{{(ruleForm.outerBoxSizeL * ruleForm.outerBoxSizeW * ruleForm.outerBoxSizeH) / 1000}}m³</span>
                </el-col>
             </el-row>
             <el-row>
                 <el-col :span="6">
                    <el-form-item label="外箱尺寸(装柜用):" prop="outerBoxSizeL">
                        <div class="productSizeW">
                            <el-input placeholder="请输入内容" v-model="ruleForm.outerBoxSizeL">
                                <template slot="append">长(cm)</template>
                            </el-input>
                        </div>
                    </el-form-item>
                </el-col>
                 <el-col :span="3">
                    <el-form-item  prop="packageSizeW" label-width="15px">      
                        <div class="productSizeW">
                            <el-input placeholder="请输入内容" v-model="ruleForm.outerBoxSizeW">
                                <template slot="append">宽(cm)</template>
                            </el-input>
                        </div>
                    </el-form-item>
                </el-col>
                 <el-col :span="3">
                    <el-form-item  prop="packageSizeH" label-width="15px">      
                        <div class="productSizeW">
                            <el-input placeholder="请输入内容" v-model="ruleForm.outerBoxSizeH">
                                <template slot="append">高(cm)</template>
                            </el-input>
                        </div>
                    </el-form-item>
                </el-col>
                 <el-col :span="2">
                    <el-form-item  prop="outerBoxSizeRules" label-width="15px">      
                        <el-select 
                            v-model="ruleForm.outerBoxSizeRules"
                            placeholder="请选择"
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
                </el-col>
                <el-col :span="2">
                    <span class="vacanBox">体积：</span><span v-if="ruleForm.outerBoxSizeRules == '1'">{{(ruleForm.outerBoxSizeW * ruleForm.outerBoxSizeW * ruleForm.outerBoxSizeW) / 1000}}m³</span>
                                      <span v-else-if="ruleForm.outerBoxSizeRules == '2'">{{(ruleForm.outerBoxSizeL * ruleForm.outerBoxSizeW * ruleForm.outerBoxSizeH) / 1000}}m³</span>
                </el-col>
             </el-row>
             
             <el-row>
                 <el-col :span="6">
                    <el-form-item  prop="containersNumber" label="可装货柜数量：">      
                        <el-select 
                            v-model="ruleForm.containersNumber"
                            placeholder="请选择"
                            @change="selectConNumb"
                            >
                            <el-option 
                                v-for="item in boxType"                        
                                :key="item._id"
                                :label="item._model"
                                :value="item._id"
                                >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item  prop="outerBoxNum" label-width="15px">      
                        <div class="productSizeW">
                            <el-input placeholder="请输入内容" v-model="ruleForm.outerBoxNum">
                                <template slot="append">个/柜</template>
                            </el-input>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                     <span class="vacanBox" v-if="this.selectid && ruleForm.outerBoxNum">每个产品所占体积:<span>{{this.selectid / ruleForm.outerBoxNum}}m³</span></span>       
                </el-col>
             </el-row>
             <el-row>
                 <el-col :span="6">
                    <el-form-item  prop="proNetWeight" label="净重:">      
                        <div class="productSizeW">
                            <el-input placeholder="请输入内容" v-model="ruleForm.proNetWeight">
                                <template slot="append">Kg</template>
                            </el-input>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item  label-width="15px">      
                        <div class="productSizeW">
                            <el-input placeholder="请输入内容" v-model="proNetWeightLb" disabled>
                                <template slot="append">LB</template>
                            </el-input>
                        </div>
                    </el-form-item>
                </el-col>
             </el-row>
             <el-row>
                 <el-col :span="6">
                    <el-form-item  prop="proGrossWeight" label="毛重:">      
                        <div class="productSizeW">
                            <el-input placeholder="请输入内容" v-model="ruleForm.proGrossWeight">
                                <template slot="append">Kg</template>
                            </el-input>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item label-width="15px">      
                        <div class="productSizeW">
                            <el-input placeholder="请输入内容" v-model="proGrossWeightLb" disabled>
                                <template slot="append">LB</template>
                            </el-input>
                        </div>
                    </el-form-item>
                </el-col>
                <!-- <el-col :span="3">
                     <span class="vacanBox" v-if="ruleForm.proGrossWeight && ruleForm.proNetWeight && ruleForm.packingMethod == '0'">体积重:<span>{{ruleForm.proNetWeight + ruleForm.proGrossWeight}}kg/{{((ruleForm.proNetWeight + ruleForm.proGrossWeight) * 2.20).toFixed(2)}}LB</span></span>       
                     <span class="vacanBox" v-if="ruleForm.packingMethod == '1'">体积重:<span>{{ruleForm.proNetWeight + ruleForm.proGrossWeight}}kg/{{((ruleForm.proNetWeight + ruleForm.proGrossWeight) * 2.20).toFixed(2)}}LB</span></span>       
                </el-col> -->
             </el-row>
             <el-row>
                 <el-col :span="6">
                    <el-form-item  prop="proOuterBoxWeight" label="外箱重量:">      
                        <div class="productSizeW">
                            <el-input placeholder="请输入内容" v-model="ruleForm.proOuterBoxWeight">
                                <template slot="append">Kg</template>
                            </el-input>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item  label-width="15px">      
                        <div class="productSizeW">
                            <el-input placeholder="请输入内容" v-model="proOuterBoxWeightLb" disabled>
                                <template slot="append">LB</template>
                            </el-input>
                        </div>
                    </el-form-item>
                </el-col>
             </el-row>
             <el-row>
                 <el-col :span="5">
                    <el-form-item  prop="packingMethod" label="包装方式:">      
                        <el-select 
                            v-model="ruleForm.packingMethod"
                            placeholder="请选择"
                            >
                            <el-option 
                                v-for="item in packingMethodType"                        
                                :key="item.key"
                                :label="item.label"
                                :value="item.value"
                                >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
             </el-row>
             <el-row>
                 <el-col :span="6">
                    <el-form-item  prop="casesNumber" label="装箱数:">      
                        <div class="productSizeW">
                            <el-input placeholder="请输入内容" v-model="ruleForm.casesNumber" >
                                <template slot="append">个/箱</template>
                            </el-input>
                        </div>
                    </el-form-item>
                </el-col>
             </el-row>
             <el-row v-if="ruleForm.packingMethod == '1'">
                 <el-col :span="24">
                    <el-form-item  label="多箱清单:">      
                         <el-table
                            :data="ruleForm.productlistings"
                            border
                            style="width: 100%">
                            <el-table-column
                                prop="date"
                                label="序号"
                            >
                            <template slot-scope="scope">
                                第{{scope.$index + 1}}箱        
                            </template>
                            </el-table-column>
                            <el-table-column
                                prop="packedlength"
                                label="包装后 - 长(cm)"
                            >
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.packedlength"></el-input>      
                            </template>
                            </el-table-column>
                            <el-table-column
                                prop="packedwidth"
                                label="包装后 - 宽(cm)">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.packedwidth"></el-input>      
                            </template>
                            </el-table-column>
                            <el-table-column
                                prop="packedheight"
                                label="包装后 - 高(cm)">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.packedheight"></el-input>      
                            </template>
                            </el-table-column>
                            <el-table-column
                                label="包装后 - 重量(Kg)">
                            <template slot-scope="scope">
                                <div>
                                   <el-input v-model="scope.row.packedWi"></el-input>
                                </div>
                            </template>
                            </el-table-column>
                            <el-table-column
                                label="操作">
                                <template slot-scope="scope">
                                    <div v-if="scope.$index == 0">
                                        第一条数据无法移除
                                    </div>
                                    <el-button
                                        v-else
                                        @click.native.prevent="deleteRow(scope.$index, ruleForm.productlistings)"
                                        type="text"
                                        size="small">
                                        移除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="tableText" @click="addTableList">
                            添加一箱
                        </div>
                    </el-form-item>
                </el-col>
             </el-row>
             <el-row>
                 <el-col :span="15">
                     <el-form-item  label="尺码:" prop="productSize">      
                        <div class="productSizeText">
                            <div class="productSizeInput">
                                <el-input  v-model="ruleForm.productSize"></el-input>
                            </div>
                            <div>
                                如要开发更多尺码, 请在保存产品信息以后，在此产品基础上选择开发其它尺码!
                            </div>
                        </div>
                    </el-form-item>
                 </el-col>
             </el-row>
             <el-row>
                 <el-col :span="15">
                     <el-form-item  label="颜色:" prop="productColor">      
                        <el-checkbox-group v-model="ruleForm.productColor" > 
                            <el-checkbox :label="item" v-for="item in checkList" :key="item + Math.random()"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                 </el-col>
             </el-row>
             <el-row>
                 <el-col :span="20">
                     <el-form-item  label="销售(多)属性:" prop="productColor">      
                        <el-table
                            border
                            :data="ruleForm.multiAttribute"
                            style="width: 100%"
                            :header-cell-style="{background:'#f5f7fa',color:'#606266'}"
                            >
                            <el-table-column
                                label="开发状态"
                                >
                                <template slot-scope="scope">
                                    <div v-if="scope.row.productid == pordSizeAttrInfoList.id">
                                        当前开发
                                    </div>
                                    <div v-else>
                                        其他开发
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="SKU ID"
                                >
                                <template slot-scope="scope">
                                    <div>
                                        {{scope.row.productid}}
                                    </div>
                                    <div>
                                        {{scope.row.encodingrules}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="开发属性">
                            <template slot-scope="scope">
                                    <div>
                                        {{scope.row.color}}
                                    </div>
                                    <div>
                                        {{ruleForm.productSize}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="关联SKU"
                            >
                            <template slot-scope="scope">
                                <div v-if="scope.row.productdraftid && scope.row.skualias && scope.row.sku && scope.row.spu">
                                    <div>
                                        上架ID:{{scope.row.productdraftid}}
                                    </div>
                                    <div>
                                        SKU别名{{scope.row.skualias }}
                                    </div>
                                    <div>
                                        SKU:{{scope.row.sku}}
                                    </div>
                                    <div>
                                        SPU{{pordSizeAttrInfoList.spu}}
                                    </div>
                                </div>
                                <div v-else>
                                    暂无数据
                                </div>
                            </template>
                            </el-table-column>
                            <el-table-column
                                label="是否上架">
                                <template slot-scope="scope">
                                    <div><el-checkbox v-model="scope.row.productneed">需要</el-checkbox></div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                 </el-col>
             </el-row>
         </el-form>
         <div class="bottomButton">
            <el-button type="primary" @click="submitForm('ruleForm')" size="mini">保存</el-button>
            <el-button @click="resetForm('ruleForm')" size="mini">取消</el-button>
        </div>
    </div>
</template>
<script>
import {  findBoxTypesById,purchaseSku } from '@/api/user.js'
export default {
    name:'pordSizeAttrEdit',
    data(){
        return {
            firstList:false,
            putColor:false,
            copeMulAttrBute:{},
            selectid:'',
            boxType:[],
            ruleForm:{
                productType:'',
                productSizeL:'',
                productSizeW:'',
                productSizeH:'',
                packageSizeL:'',
                packageSizeW:'',
                packageSizeH:'',
                outerBoxSizeH:'',
                outerBoxSizeW:'',
                outerBoxSizeL:'',
                sizeRules:[],
                outerBoxSizeRules:'',
                containersNumber:'',
                outerBoxNum:'',
                proNetWeight:'',
                proGrossWeight:'',
                proOuterBoxWeight:'',
                packingMethod:'',
                casesNumber:'',
                productSize:'',
                productColor:[],
                productlistings:[],
                multiAttribute:[]  //多属性
            },
            rules:{
                productType: [{ required: true, message: '请选择产品类型', trigger: 'blur' }],
                productSizeL: [{ required: true, message: '请添加产品尺寸', trigger: 'blur' }],
                productSizeW: [{ required: true, message: '请添加产品尺寸', trigger: 'blur' }],
                productSizeH: [{ required: true, message: '请添加产品尺寸', trigger: 'blur' }],
                packageSizeL: [{ required: true, message: '请添加包装尺寸', trigger: 'blur' }],
                packageSizeW: [{ required: true, message: '请添加包装尺寸', trigger: 'blur' }],
                packageSizeH: [{ required: true, message: '请添加包装尺寸', trigger: 'blur' }],
                outerBoxSizeL: [{ required: true, message: '请添加外箱尺寸', trigger: 'blur' }],
                outerBoxSizeW: [{ required: true, message: '请添加外箱尺寸', trigger: 'blur' }],
                outerBoxSizeH: [{ required: true, message: '请添加外箱尺寸', trigger: 'blur' }],
                sizeRules: [{ required: true, message: '请选择尺寸规则', trigger: 'blur' }],
                outerBoxSizeRules: [{ required: true, message: '请选择尺寸规则', trigger: 'blur' }],
                containersNumber: [{ required: true, message: '请选择货柜体积', trigger: 'blur' }],
                outerBoxNum: [{ required: true, message: '请输入货柜数量', trigger: 'blur' }],
                proNetWeight: [{ required: true, message: '请输入净重', trigger: 'blur' }],
                proGrossWeight: [{ required: true, message: '请输入毛重', trigger: 'blur' }],
                proOuterBoxWeight: [{ required: true, message: '请输入外箱重量', trigger: 'blur' }],
                packingMethod: [{ required: true, message: '请选择包装方式', trigger: 'blur' }],
                casesNumber: [{ required: true, message: '请输入集装箱数量', trigger: 'blur' }],
                tableData: [{ required: true, message: '请输入集装箱数量', trigger: 'blur' }],
                productSize: [{ required: true, message: '请填写商品尺码', trigger: 'blur' }],
                productColor: [{ required: true, message: '请选择产品颜色', trigger: 'blur' }],
            },
            devSign:[
                {
                    label: '规则立方体',
                    key: 1,
                    value: 1
                },
                {
                    label: '不规则立方体',
                    key: 2,
                    value: 2
                },    
            ],
            packingMethodType:[
                {
                    label: '单箱包装',
                    key: 1,
                    value: 0
                },
                {
                    label: '多箱包装',
                    key: 2,
                    value: 1
                }
            ],
            checkList:['米色','黑色','蓝色','天蓝','绿蓝/宝石蓝','浅蓝','深蓝','藏蓝','棕色','深棕色/茶色','浅棕色','中棕色','透明色','黄金','灰色','绿色','白色','奶白色','象牙色','多色','橙色','深橙色','粉红色','紫色','红色','浅红色','银色','黄色','镀铬色','不锈钢','木色','金属钛','古铜色','玫红色','咖啡色','橄榄色','卡其色','铁灰色','暗灰色','驼色','彩虹色','肉色','浅紫色','深紫色','酒红色']
        }
    },
    props:{
        pordSizeAttrInfoList:{
            type:Object,
            default:() => ({})
        },
        multiAttribute:{
            type:Array,
            default:() => ([])
        }
    },
    computed:{
        proGrossWeightLb(){
            return (this.ruleForm.proGrossWeight * 2.20).toFixed(2) || ''
        },
        proNetWeightLb(){
            return (this.ruleForm.proNetWeight * 2.20).toFixed(2) || ''
        },
        proOuterBoxWeightLb(){
            return (this.ruleForm.proOuterBoxWeight * 2.20).toFixed(2) || ''
        },
        productColor(){
            return this.ruleForm.productColor
        },
        productSize(){
            return this.ruleForm.productSize
        }
    },
    mounted(){
        this.getDetaiList()
        this.init()
    },
    watch:{
        productColor:{
            handler(val,oldVal){
                if(val == oldVal  || (oldVal.length == 0 && this.firstList))return  
                if(val.length > oldVal.length){
                    let newVal = val.filter(item => {
                        return !oldVal.includes(item)
                    })
                    this.ruleForm.multiAttribute.push({
                        size:this.ruleForm.productSize,
                        color:newVal.toString(),
                        productid:this.copeMulAttrBute.productid,
                        encodingrules:this.copeMulAttrBute.encodingrules,
                        productneed:this.copeMulAttrBute.productneed,
                        productdraftid:this.copeMulAttrBute.productdraftid,
                        skualias:this.copeMulAttrBute.skualias,
                        sku:this.copeMulAttrBute.sku,
                        spu:this.pordSizeAttrInfoList.spu,
                    })
                }else{
                    let newVal = oldVal.filter(item => {
                        return !val.includes(item)
                    })
                    let colorNewVal = newVal.toString()
                     this.ruleForm.multiAttribute.forEach((item,index) => {
                        if(item && item.color == colorNewVal){
                            this.ruleForm.multiAttribute.splice(index,1)
                        }
                    }) 
                } 
            }
        },
        deep:true
    },
    methods: {
        selectConNumb(val){
            let selectid = []
            selectid = this.boxType.filter(item => {
                return item._id == val
            })
            this.selectid = selectid[0]._id
        },
        init(){
            let params = {
                typeId:0,
            }
            findBoxTypesById(params).then(res => {
                this.boxType = res.data.boxType
            })
        },
        getDetaiList(){
            if(this.multiAttribute && this.multiAttribute[0]){
                this.firstList = true
                this.copeMulAttrBute =JSON.parse(JSON.stringify(this.multiAttribute[0])) 
            } 
            let productColor =  this.multiAttribute.map(item => {
                return item.color
            })
            let proSize = this.multiAttribute &&this.multiAttribute[0] ?  this.multiAttribute[0].size : ''

            this.ruleForm = {
                productType:this.pordSizeAttrInfoList.productType == 2 ? 2 : 1,
                productSizeL:this.pordSizeAttrInfoList.productSizeL,
                productSizeW:this.pordSizeAttrInfoList.productSizeW,
                productSizeH:this.pordSizeAttrInfoList.productSizeH,
                packageSizeL:this.pordSizeAttrInfoList.packageSizeL,
                packageSizeW:this.pordSizeAttrInfoList.packageSizeW,
                packageSizeH:this.pordSizeAttrInfoList.packageSizeH,
                outerBoxSizeH:this.pordSizeAttrInfoList.outerBoxSizeH,
                outerBoxSizeW:this.pordSizeAttrInfoList.outerBoxSizeW,
                outerBoxSizeL:this.pordSizeAttrInfoList.outerBoxSizeL,
                sizeRules:this.pordSizeAttrInfoList.packageshape?this.pordSizeAttrInfoList.packageshape:2,
                outerBoxSizeRules:this.pordSizeAttrInfoList.cartonShape?this.pordSizeAttrInfoList.cartonShape:2,
                containersNumber:this.pordSizeAttrInfoList.containerid,
                outerBoxNum:this.pordSizeAttrInfoList.transportqty,
                proNetWeight:this.pordSizeAttrInfoList.beforepackweight,
                proGrossWeight:this.pordSizeAttrInfoList.afterpackweight,
                proOuterBoxWeight:this.pordSizeAttrInfoList.cartonWeight,
                packingMethod:this.pordSizeAttrInfoList.packingway,
                casesNumber:this.pordSizeAttrInfoList.caseQty,
                productColor:productColor? productColor :[],
                productSize:proSize,
                multiAttribute:this.multiAttribute,
                productlistings:this.pordSizeAttrInfoList.productlistings ? this.pordSizeAttrInfoList.productlistings:[],
            }
        },
        deleteRow(index, rows) {
            rows.splice(index, 1);
        },
        addTableList(){
            this.ruleForm.productlistings.push({
                packedlength:'',
                packedwidth:'',
                packedheight:'',
                packedWi:'',
            })
        },
        submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = {
                        developmentId: this.$route.params.developmentId,
                        productId: this.$route.params.productId,
                        productCountryId: this.$route.params.productCountryId,
                        productType:this.ruleForm.productType,//0普通产品  1多属性产品 2物理捆绑产品
                        product:{//产品信息
                            id:this.$route.params.productId,
                            length:this.ruleForm.productSizeL,//产品尺寸
                            width:this.ruleForm.productSizeW,
                            height:this.ruleForm.productSizeH,
                            packedlength:this.ruleForm.packageSizeL,//包装尺寸
                            packedwidth:this.ruleForm.packageSizeW,
                            packedheight:this.ruleForm.packageSizeH,
                            cartonLength:this.ruleForm.outerBoxSizeL,//外箱尺寸
                            cartonWidth:this.ruleForm.outerBoxSizeW,
                            cartonHeight:this.ruleForm.outerBoxSizeH,
                            containerid:this.ruleForm.containersNumber,//可装货柜数量--货柜id
                            transportqty:this.ruleForm.outerBoxNum,//可装货柜数量--数量
                            beforepackweight:this.ruleForm.proNetWeight,//净重--kg
                            abroadbeforepackweight:this.proNetWeightLb,//净重--lb
                            afterpackweight:this.ruleForm.proGrossWeight,//毛重--kg
                            abroadafterpackweight:this.proGrossWeightLb,//毛重--lb
                            cartonWeight:this.ruleForm.proOuterBoxWeight,//外箱重量
                            packingway:this.ruleForm.packingMethod,//包装方式
                            caseQty:this.ruleForm.casesNumber,//装箱数
                            size:this.ruleForm.productSize,//尺码
                            cartonShape:this.ruleForm.outerBoxSizeRules,
                            packageshape:this.ruleForm.sizeRules
                            

                        },
                        productlistings: this.ruleForm.productlistings
                    }
                    params.productcolors = this.ruleForm.multiAttribute.map(res => {
                        return {
                            productneed:res.productneed,
                            color:res.color || ''
                        }
                    })
                    purchaseSku(params).then(res => {
                        if(res.code == 200){
                            this.$message.success('保存成功')
                            this.$emit('closeEdit','false')
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            resetForm() {
                // this.$refs[formName].resetFields();
                this.$emit('closeEdit','false')
            }
    },
}
</script>
<style lang="scss" scoped>
.bottomButton{
    width: 100%;
    height: 30px;   
    display: flex;
    justify-content: flex-end;
}
.productSizeW{
        // width: 200px;
        // margin-right: 20px;
}
.productSizeText{
    display: flex;
    .productSizeInput{
        width: 200px;
        margin-right: 15px;
    }
}
.tableText{
    color:#409eff ;
    cursor: pointer;
    display: inline-block;
}
.vacanBox{
    display: inline-block;
    height: 30px;
    line-height: 30px;
}
</style>