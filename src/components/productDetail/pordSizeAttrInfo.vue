<template>
    <div>
        <el-row class="textSpeaing">
            <el-col :span="10">
                <span class="textWight">{{M2('分配采购开发员')}}： </span><span style="font-weight:normal">{{M2(pordSizeAttrInfoList.buyerName)}}</span>
            </el-col>
            <el-col :span="10">
                <span class="textWight">{{M2('产品类型')}}： </span><span style="font-weight:normal">{{changeProducttype(pordSizeAttrInfoList.producttype)}}</span>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10" class="moreText">
                <div class="textWight">
                    {{M2('产品尺寸')}}：
                </div>
                <div class="textBox">
                    <div>{{pordSizeAttrInfoList.productSizeL ?pordSizeAttrInfoList.productSizeL + '×' :'' }}  {{pordSizeAttrInfoList.productSizeW ? pordSizeAttrInfoList.productSizeW + '×' : ''}}  {{pordSizeAttrInfoList.productSizeH ? pordSizeAttrInfoList.productSizeH + ' cm '  : ''}} </div>
                    <div>{{pordSizeAttrInfoList.productSizeYcunL ?pordSizeAttrInfoList.productSizeYcunL + '×' :''}} {{pordSizeAttrInfoList.productSizeYcunW ?pordSizeAttrInfoList.productSizeYcunW + '×' :''}} {{pordSizeAttrInfoList.productSizeYcunH ?pordSizeAttrInfoList.productSizeYcunH + ' inch '  :''}}</div>
                </div>
            </el-col>
            <el-col :span="10" class="moreText">
                <div class="textWight">
                    {{M2('产品体积')}}： 
                </div>
                <div class="textBox">
                    <div>{{pordSizeAttrInfoList.productVolume ?pordSizeAttrInfoList.productVolume + ' m³ '  :''}}</div>
                    <div>{{pordSizeAttrInfoList.productVolumeYchi ? pordSizeAttrInfoList.productVolumeYchi + ' cu ft '  : ''}}</div>
                </div>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10" class="moreText">
                <div class="textWight">
                    {{M2('包装尺寸(发货用) ')}}：
                    <div class="boxSizeRule">{{changePorStyle(pordSizeAttrInfoList.packageshape)}}</div>
                </div>
                <div class="textBox">
                    <div>{{pordSizeAttrInfoList.packageSizeL ? pordSizeAttrInfoList.packageSizeL + '×' : ''}} 
                        {{pordSizeAttrInfoList.packageSizeW ?  pordSizeAttrInfoList.packageSizeW + '×' : ''}} 
                        {{pordSizeAttrInfoList.packageSizeH ?  pordSizeAttrInfoList.packageSizeH + ' cm '  : ''}} 
                    </div>
                    <div>
                        {{pordSizeAttrInfoList.packageSizeYcunL ? pordSizeAttrInfoList.packageSizeYcunL + '×' : ''}}
                        {{pordSizeAttrInfoList.packageSizeYcunW ? pordSizeAttrInfoList.packageSizeYcunW + '×' : ''}} 
                        {{pordSizeAttrInfoList.packageSizeYcunH ?  pordSizeAttrInfoList.packageSizeYcunH + ' inch '  : ''}} 
                    </div>
                </div>
            </el-col>
            <el-col :span="10" class="moreText"> 
                <div class="textWight">
                    {{M2('包装体积(发货用)')}}： 
                </div>
                <div class="textBox">
                    <div>{{pordSizeAttrInfoList.packedvolume ? pordSizeAttrInfoList.packedvolume + ' m³ ' : ''}}</div>
                    <div>{{pordSizeAttrInfoList.packedvolumeYchi ? pordSizeAttrInfoList.packedvolumeYchi + ' cu ft '  : ''}}</div>
                </div>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10">
                <span class="textWight"> {{M2('包装方式')}}： </span><span style="font-weight:normal">{{pordSizeAttrInfoList.packingway == 0 ? M2('单箱包装') : pordSizeAttrInfoList.packingway == 1 ? M2('多箱包装') : ''  }}</span>
            </el-col>
            <el-col :span="10" class="moreText">
                <div class="textWight">
                    {{M2('每个产品所占体积')}}： 
                </div>
                <div class="textBox">
                    <div>{{pordSizeAttrInfoList.containerVolume ? pordSizeAttrInfoList.containerVolume +  ' m³ ' :''}}</div>
                    <div>{{pordSizeAttrInfoList.containerVolumeCu ? pordSizeAttrInfoList.containerVolumeCu +  ' cu ft '  : ''}}</div>
                </div>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10" class="moreText"> 
                <div class="textWight">
                    {{M2('净重')}}：
                </div>
                <div class="textBox">
                    <div>{{pordSizeAttrInfoList.beforepackweight?pordSizeAttrInfoList.beforepackweight +  ' kg ' :''}}</div>
                    <div>{{pordSizeAttrInfoList.abroadbeforepackweight  ? pordSizeAttrInfoList.abroadbeforepackweight +  ' LB '  : ''}}</div>
                </div>
            </el-col>
            <el-col :span="10" class="moreText"> 
                <div class="textWight">
                    {{M2('毛重(发货用)')}}： 
                </div>
                <div class="textBox">
                    <div>{{pordSizeAttrInfoList.afterpackweight?pordSizeAttrInfoList.afterpackweight +  ' kg ' :''}}</div>
                    <div>{{pordSizeAttrInfoList.abroadafterpackweight? pordSizeAttrInfoList.abroadafterpackweight +  ' LB '  : ''}}</div>
                </div>
            </el-col>
        </el-row>
        <el-row class="textSpeaing" >
            <el-col :span="10" class="moreText">
                <div class="textWight">
                    {{M2('物流周长加长(美国)')}}：
                </div>
                 <div class="textBox">
                    <div>{{pordSizeAttrInfoList.logisticsPerimeter? pordSizeAttrInfoList.logisticsPerimeter + ' cm' : ''}}</div>
                    <div>{{pordSizeAttrInfoList.logisticsPerimeterYcun? pordSizeAttrInfoList.logisticsPerimeterYcun + ' inch' : ''}}</div>
                </div>
            </el-col>
            <el-col :span="10" class="moreText">
                <div class="textWight">
                    {{M2('物流周长加长(非美国)')}}：
                </div>
                 <div class="textBox">
                    <div>{{pordSizeAttrInfoList.logisticsPerimeterNoUsa? pordSizeAttrInfoList.logisticsPerimeterNoUsa +  ' cm '  : ''}}</div>
                    <div>{{pordSizeAttrInfoList.logisticsPerimeterNoUsaYcun? pordSizeAttrInfoList.logisticsPerimeterNoUsaYcun +  ' inch '  : ''}}</div>
                </div>
            </el-col>
        </el-row>
        <el-row class="textSpeaing" >
            <el-col :span="10">
                <span class="textWight">{{M2('选择发货货柜')}}： </span><span style="font-weight:normal">{{M2(pordSizeAttrInfoList.containerModel)}}</span>
            </el-col>
            <el-col :span="10">
                <span class="textWight">{{M2('可装货柜数量')}}： </span><span style="font-weight:normal">{{pordSizeAttrInfoList.transportqty}}</span>
            </el-col>
        </el-row>
        <el-row class="tableTextSpeaing" >
            <el-col :span="2"  :xs="4" :sm="4" :md="3" :lg="4" :xl="2" >
                <span class="textWight">{{M2('体积重')}}： </span>
            </el-col>
            <el-col :span="15">
                <el-table
                    border
                    :empty-text="M2('暂无数据')"
                    :data='[pordSizeAttrInfoList]'
                    style="width: 100%"
                    :header-cell-style="{background:'#f5f7fa',color:'#606266'}"
                    >
                    <el-table-column
                        :label="M2('美国') + ' FEDEX ' + '=' +  M2('长') + '*' + M2('宽') + '*' + M2('高') + ' / ' +  '280'"
                        >
                        <template slot-scope="scope">
                            <span>{{scope.row.packedlength ? (scope.row.packedlength  * scope.row.packedwidth * scope.row.packedheight / 10116).toFixed(2)  + ' Kg /' : ''}} </span>
                            <span>{{scope.row.productSizeYcunL ? (Math.round(scope.row.productSizeYcunL) * Math.round(scope.row.productSizeYcunW) * Math.round(scope.row.productSizeYcunH) /280).toFixed(2)+ ' LB' : ''}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="M2('美国') + ' UPS ' + '=' +  M2('长') + '*' + M2('宽') + '*' + M2('高') + ' / ' +  '279'"
                        >
                        <template slot-scope="scope">
                            <span>{{scope.row.packedlength ? (scope.row.packedlength  * scope.row.packedwidth * scope.row.packedheight / 10080).toFixed(2) + ' Kg /' : ''}} </span>
                            <span>{{scope.row.productSizeYcunL ? (Math.round(scope.row.productSizeYcunL) * Math.round(scope.row.productSizeYcunW) * Math.round(scope.row.productSizeYcunH) /279).toFixed(2)+ ' LB' : ''}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="M2('美国') + ' AS ' + '=' +  M2('长') + '*' + M2('宽') + '*' + M2('高') + ' / ' +  '300'"
                        >
                        <template slot-scope="scope">
                            <span>{{scope.row.packedlength ? (scope.row.packedlength  * scope.row.packedwidth * scope.row.packedheight / 10838).toFixed(2) + ' Kg /' : ''}} </span>
                            <span>{{scope.row.productSizeYcunL ? (Math.round(scope.row.productSizeYcunL) * Math.round(scope.row.productSizeYcunW) * Math.round(scope.row.productSizeYcunH) /300).toFixed(2)+ ' LB' : ''}}</span>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column
                        prop="name"
                        :label="M2('美国') + ' JD UPS' + '=' +  M2('长') + '*' + M2('宽') + '*' + M2('高') + ' / ' +  '8128'"
                        >
                        <template slot-scope="scope">
                            <span>{{scope.row.packedlength ? (scope.row.packedlength  * scope.row.packedwidth * scope.row.packedheight /8182).toFixed(2) + ' Kg /' : ''}} </span>
                            <span>{{scope.row.packedlength ? (scope.row.packedlength  * scope.row.packedwidth * scope.row.packedheight /8182 * 2.20).toFixed(2)+ ' LB' : ''}}</span>
                        </template>
                    </el-table-column> -->
                    <el-table-column
                        prop="address"
                        :label="M2('英国') + ' XDP' + '=' +  M2('长') + '*' + M2('宽') + '*' + M2('高') + ' / ' +  '5000'"
                        >
                        <template slot-scope="scope">
                            <span>{{scope.row.packedlength ? (scope.row.packedlength  * scope.row.packedwidth * scope.row.packedheight /5000).toFixed(2)+ 'Kg /' : ''}} </span>
                            <span>{{scope.row.packedlength ? (scope.row.packedlength  * scope.row.packedwidth * scope.row.packedheight /5000 * 2.20).toFixed(2)+ ' LB' : ''}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        :label="M2('英国') + ' Tuffnell' + '=' +  M2('长') + '*' + M2('宽') + '*' + M2('高') + ' / ' +  '4000'"
                        >
                        <template slot-scope="scope">
                            <span>{{scope.row.packedlength ? (scope.row.packedlength  * scope.row.packedwidth * scope.row.packedheight /4000).toFixed(2)+ ' Kg /' : ''}}</span>
                            <span>{{scope.row.packedlength ? (scope.row.packedlength  * scope.row.packedwidth * scope.row.packedheight /4000 * 2.20).toFixed(2)+ ' LB' : ''}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row class="tableTextSpeaing" v-if="pordSizeAttrInfoList.packingway == '1'">
            <el-col :span="2" :lg="4" :xl="2">
                <span class="textWight">{{M2('多箱清单')}}： </span>
            </el-col>
            <el-col :span="15">
                <el-table
                    border
                    :empty-text="M2('暂无数据')"
                    :data="pordSizeAttrInfoList.productlistings"
                    style="width: 100%"
                    :header-cell-style="{background:'#f5f7fa',color:'#606266'}"
                    >
                    <el-table-column
                        :label="M2('箱数')"
                        >
                        <template slot-scope="scope">
                            {{M2(`第${scope.$index + 1}箱`)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="M2('包装尺寸')"
                        >
                        <template slot-scope="scope">
                            <div>
                                {{scope.row.packedlength}} × {{scope.row.packedwidth}} × {{scope.row.packedheight}} cm
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="M2('毛重')"
                        >
                        <template slot-scope="scope">
                            <div>
                                {{scope.row.packedweight}}Kg / {{scope.row.packedweight ? (scope.row.packedweight * 2.204).toFixed(2) : ''}} LB
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="M2('物流周长加长(美国)')"
                        >
                        <template slot-scope="scope">
                            <div>
                                {{(Math.ceil(scope.row.packedlength) + (Math.ceil(scope.row.packedwidth) + Math.ceil(scope.row.packedheight)) * 2).toFixed(2) || ''}} cm
                            </div>
                            <div>
                                {{(Math.round(scope.row.packedlength * ycun) + (Math.round(scope.row.packedwidth  * ycun) + Math.round(scope.row.packedheight  * ycun)) * 2).toFixed(2)}} inch
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="M2('物流周长加长(非美国)')"
                        >
                        <template slot-scope="scope">
                           <div>
                                {{(Number(scope.row.packedlength) + (Number(scope.row.packedwidth) + Number(scope.row.packedheight)) * 2).toFixed(2)}} cm
                            </div>
                            <div>
                                {{(Number(scope.row.packedlength * ycun) + (Number(scope.row.packedwidth * ycun) + Number(scope.row.packedheight * ycun)) * 2).toFixed(2) }} inch
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row class="tableTextSpeaing" >
            <el-col :span="2"  :lg="4" :xl="2">
                <span class="textWight">{{M2('销售（多）属性')}}： </span>
            </el-col>
            <el-col :span="15">
                <el-table
                     border
                     :empty-text="M2('暂无数据')"
                    :data="multiAttribute"
                    style="width: 100%"
                    :header-cell-style="{background:'#f5f7fa',color:'#606266'}"
                    >
                    <el-table-column
                        :label="M2('开发状态')"
                        >
                        <template slot-scope="scope">
                            <div v-if="scope.row.productid == pordSizeAttrInfoList.id">
                                {{M2('当前开发')}}
                            </div>
                            <div v-else>
                                {{M2('其他开发')}}
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
                        :label="M2('开发属性')"
                        >
                        <template slot-scope="scope">
                            <div>
                                {{scope.row.color}}
                            </div>
                            <div style="display:flex">
                                {{scope.row.size }} 
                                <div v-if="pordSizeAttrInfoList.alreadyConfirmSample && showSampleText(scope.row,1)">
                                    &nbsp(<el-link type="primary" @click="clickSampleText(scope.row)" style="font-size:12px">{{M2('样品结果')}}{{scope.row.subValue}}</el-link>)
                                </div>
                            </div> 
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="M2('关联SKU')"
                    >
                    <template slot-scope="scope">
                        <div v-if="scope.row.productdraftid || scope.row.skualias || scope.row.sku">
                            <div>
                                {{M2('上架ID')}}：{{scope.row.productdraftid}}
                            </div>
                            <div>
                                {{M2('SKU别名')}}：{{scope.row.skualias }}
                            </div>
                            <div>
                                SKU：{{scope.row.sku}}
                            </div>
                            <div>
                                SPU：{{pordSizeAttrInfoList.spu}}
                            </div>
                        </div>
                        <div v-else>
                            {{M2('暂无数据')}}
                        </div>
                    </template>
                    </el-table-column>
                    <el-table-column
                        :label="M2('是否上架')"
                        >
                        <template slot-scope="scope">
                            <div v-if="scope.row.productneed">{{M2('需要')}}</div>
                            <div v-else>{{M2('不需要')}}</div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <commonDialog ref="commonDialog" :titleText="M2('样品确认结果')" width="1000px">
            <subBoxDetail ref="subBoxDetail" :subTableData="subTableData"></subBoxDetail>
        </commonDialog>
    </div>
    
</template>
<script>
export default {
     components:{
        subBoxDetail:() => import('@/components/productDetail/subBoxDetail.vue'),
        commonDialog:() => import('@/components/common/commonDialog.vue')
    },
    data(){
        return {
            ycun:0.3937,
            subTableData:[]
        }
    },
    props:{
        pordSizeAttrInfoList:{
            type:Object,
            default:() => ({})
                    
        },
        mapProductSample:{
            type:Object,
            default:() => ({})
                    
        },
        multiAttribute:{
            type:Array,
            default:() => ([])           
        }
    },
    methods:{
        showSampleText(row,val){
            if(!this.mapProductSample) return false
            let blendArray = this.mapProductSample[row.developmentid]
            if(!Array.isArray(blendArray))return false
            if(blendArray.some(item => item.sampleSize == row.size)){
                let filterSample = blendArray.filter(item => {
                    return item.sampleSize == row.size
                })
                if(filterSample && filterSample.length > 0){
                    row.subList = filterSample
                    row.subValue =  ':' + this.M2(filterSample[filterSample.length - 1].stateValue)
                    return true
                }else {
                    row.subList = blendArray
                    row.subValue = ''
                    return true
                }
            }else {
                row.subList = blendArray
                row.subValue = ''
                return true
            }
        },
        subRouterMove(id){
            let routeData = this.$router.resolve({
                name: "sampleDetail",
                query:{
                    id
                }
            });
            window.open(routeData.href, '_blank');
        },
        clickSampleText(row){
            this.$refs.commonDialog.openCommonDialog()
            this.subTableData = row.subList
        },
        changeProducttype(val){
            if(!val && !this.pordSizeAttrInfoList.beforepackweight)return
            if(val == 2){
               return this.M2('物理捆绑属性')
            }
            if(this.pordSizeAttrInfoList.beforepackweight){
                if(val == 1){
                    return this.M2('多属性产品')
                }else {
                    return this.M2('普通产品')
                }
            }else{
               if(this.pordSizeAttrInfoList.scenarios == 3 || this.pordSizeAttrInfoList.scenarios == 12){
                    return this.M2('多属性产品')
                }else {
                    return this.M2('普通产品')
                } 
            }
        },
        changePorStyle(val){
            if(!val)return
            if(val == 1){
                return ''
            }else if (val == 2){
                return this.M2('不规则立方体')
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.textSpeaing{
    display: flex;
    margin-top: 15px;
    font-weight: bold;
    .moreText{
        display: flex;
        .textBox {
            font-weight: normal;
            line-height: 18px;
        }
    }
}
.tableTextSpeaing{
    display: flex;
    margin-top: 15px;
    .moreText{
        display: flex;
        .textBox {
            font-weight: normal;
            line-height: 18px;
        }
    }
}
.tableTitle{
    border: 1px solid #EBEEF5;
    text-align: center;
    height: 30px;
    line-height: 30px;
    font-weight: bold;
}
.tableBottomTitle{
    border: 1px solid #EBEEF5;
    text-align: end;
    height: 30px;
    line-height: 30px;
    padding-right: 10px;
}
.textWight {
    display: inline-block;
    width: 150px;
    font-weight:bold;
    text-align: right;
}
.has-gutter{
    color: black !important;
}
.boxSizeRule{
    text-align: center;
}
</style>