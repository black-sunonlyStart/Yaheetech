<template>
    <div>
        <el-row class="textSpeaing">
            <el-col :span="10">
                <span class="textWight">分配采购开发员： </span><span style="font-weight:normal">{{pordSizeAttrInfoList.buyerName}}</span>
            </el-col>
            <el-col :span="10">
                <span class="textWight">产品类型： </span><span style="font-weight:normal">{{changeProducttype(pordSizeAttrInfoList.producttype)}}</span>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10" class="moreText">
                <div class="textWight">
                    产品尺寸：
                </div>
                <div class="textBox">
                    <div>{{pordSizeAttrInfoList.productSizeL ?pordSizeAttrInfoList.productSizeL + '×' :'' }}  {{pordSizeAttrInfoList.productSizeW ? pordSizeAttrInfoList.productSizeW + '×' : ''}}  {{pordSizeAttrInfoList.productSizeH ? pordSizeAttrInfoList.productSizeH + ' cm '  : ''}} </div>
                    <div>{{pordSizeAttrInfoList.productSizeYcunL ?pordSizeAttrInfoList.productSizeYcunL + '×' :''}} {{pordSizeAttrInfoList.productSizeYcunW ?pordSizeAttrInfoList.productSizeYcunW + '×' :''}} {{pordSizeAttrInfoList.productSizeYcunH ?pordSizeAttrInfoList.productSizeYcunH + ' inch '  :''}}</div>
                </div>
            </el-col>
            <el-col :span="10" class="moreText">
                <div class="textWight">
                    产品体积： 
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
                    包装尺寸(发货用)：
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
                    包装体积(发货用)： 
                </div>
                <div class="textBox">
                    <div>{{pordSizeAttrInfoList.packedvolume ? pordSizeAttrInfoList.packedvolume + ' m³ ' : ''}}</div>
                    <div>{{pordSizeAttrInfoList.packedvolumeYchi ? pordSizeAttrInfoList.packedvolumeYchi + ' cu ft '  : ''}}</div>
                </div>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10" class="moreText">
                <div class="textWight">
                    外箱尺寸(装柜用)： 
                    <div class="boxSizeRule">{{changePorStyle(pordSizeAttrInfoList.cartonShape)}}</div>
                </div>
                <div class="textBox">
                    <div>{{pordSizeAttrInfoList.outerBoxSizeL ? pordSizeAttrInfoList.outerBoxSizeL + '×' : ''}}
                         {{pordSizeAttrInfoList.outerBoxSizeW ? pordSizeAttrInfoList.outerBoxSizeW + '×' : ''}} 
                         {{pordSizeAttrInfoList.outerBoxSizeH ? pordSizeAttrInfoList.outerBoxSizeH + ' cm '  : ''}} </div>
                    <div>{{pordSizeAttrInfoList.outerBoxSizeYcunL ? pordSizeAttrInfoList.outerBoxSizeYcunL + '×' : ''}}
                          {{pordSizeAttrInfoList.outerBoxSizeYcunW ? pordSizeAttrInfoList.outerBoxSizeYcunW + '×' : ''}}
                           {{pordSizeAttrInfoList.outerBoxSizeYcunH ? pordSizeAttrInfoList.outerBoxSizeYcunH + ' inch '  : ''}}
                           </div>
                </div>
            </el-col>
            <el-col :span="10" class="moreText"> 
                <div class="textWight">
                    外箱体积(装柜用)： 
                </div>
                <div class="textBox">
                    <div>{{pordSizeAttrInfoList.outerBoxVolume ? pordSizeAttrInfoList.outerBoxVolume +  ' m³ ' :''}}</div>
                    <div>{{pordSizeAttrInfoList.outerBoxVolumeYcun ? pordSizeAttrInfoList.outerBoxVolumeYcun +  ' cu ft '  : ''}}</div>
                </div>
            </el-col>
        </el-row>
        <el-row class="textSpeaing">
            <el-col :span="10" class="moreText"> 
                <div class="textWight">
                    外箱重量(装柜用)： 
                </div>
                <div class="textBox">
                    <div>{{pordSizeAttrInfoList.cartonWeight ?pordSizeAttrInfoList.cartonWeight.toFixed(6) +  ' kg ' :'' }}</div>
                    <div>{{pordSizeAttrInfoList.cartonWeightLB ? pordSizeAttrInfoList.cartonWeightLB.toFixed(6) +  ' LB '  : ''}}</div>
                </div>
            </el-col>
            <el-col :span="10" class="moreText">
                <div class="textWight">
                    每个产品所占体积： 
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
                    净重：
                </div>
                <div class="textBox">
                    <div>{{pordSizeAttrInfoList.beforepackweight?pordSizeAttrInfoList.beforepackweight +  ' kg ' :''}}</div>
                    <div>{{pordSizeAttrInfoList.abroadbeforepackweight  ? pordSizeAttrInfoList.abroadbeforepackweight +  ' LB '  : ''}}</div>
                </div>
            </el-col>
            <el-col :span="10" class="moreText"> 
                <div class="textWight">
                    毛重(发货用)： 
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
                    物流周长加长(美国)：
                </div>
                 <div class="textBox">
                    <div>{{pordSizeAttrInfoList.logisticsPerimeter? pordSizeAttrInfoList.logisticsPerimeter + ' cm' : ''}}</div>
                    <div>{{pordSizeAttrInfoList.logisticsPerimeterYcun? pordSizeAttrInfoList.logisticsPerimeterYcun + ' inch' : ''}}</div>
                </div>
            </el-col>
            <el-col :span="10" class="moreText">
                <div class="textWight">
                    物流周长加长(非美国)：
                </div>
                 <div class="textBox">
                    <div>{{pordSizeAttrInfoList.logisticsPerimeterNoUsa? pordSizeAttrInfoList.logisticsPerimeterNoUsa +  ' cm '  : ''}}</div>
                    <div>{{pordSizeAttrInfoList.logisticsPerimeterNoUsaYcun? pordSizeAttrInfoList.logisticsPerimeterNoUsaYcun +  ' inch '  : ''}}</div>
                </div>
            </el-col>
        </el-row>
        <el-row class="textSpeaing" >
            <el-col :span="10">
                <span class="textWight">选择发货货柜： </span><span style="font-weight:normal">{{pordSizeAttrInfoList.containerModel}}</span>
            </el-col>
            <el-col :span="10">
                <span class="textWight">可装货柜数量： </span><span style="font-weight:normal">{{pordSizeAttrInfoList.transportqty}}</span>
            </el-col>
        </el-row>
        <el-row class="textSpeaing" >
            <el-col :span="10">
                <span class="textWight">包装方式： </span><span style="font-weight:normal">{{pordSizeAttrInfoList.packingway == 0 ? '单箱包装' : pordSizeAttrInfoList.packingway == 1 ? '多箱包装' : ''  }}</span>
            </el-col>
        </el-row>
        <el-row class="tableTextSpeaing" >
            <el-col :span="2">
                <span class="textWight">体积重： </span>
            </el-col>
            <el-col :span="15">
                <el-table
                    border
                    :data='[pordSizeAttrInfoList]'
                    style="width: 100%"
                    :header-cell-style="{background:'#f5f7fa',color:'#606266'}"
                    >
                    <el-table-column
                        label="美国 FEDEX & UPS = 长*宽*高 / 9935"
                        >
                        <template slot-scope="scope">
                            <span>{{scope.row.packedlength ? (scope.row.packedlength  * scope.row.packedwidth * scope.row.packedheight /9935).toFixed(2) + 'Kg /' : ''}} </span>
                            <span>{{scope.row.packedlength ? (scope.row.packedlength  * scope.row.packedwidth * scope.row.packedheight /9935 * 2.20).toFixed(2)+ 'LB' : ''}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="美国 JD UPS = 长*宽*高 / 8128"
                        >
                        <template slot-scope="scope">
                            <span>{{scope.row.packedlength ? (scope.row.packedlength  * scope.row.packedwidth * scope.row.packedheight /8182).toFixed(2) + 'Kg /' : ''}} </span>
                            <span>{{scope.row.packedlength ? (scope.row.packedlength  * scope.row.packedwidth * scope.row.packedheight /8182 * 2.20).toFixed(2)+ 'LB' : ''}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="英国 XDP = 长*宽*高 / 5000">
                        <template slot-scope="scope">
                            <span>{{scope.row.packedlength ? (scope.row.packedlength  * scope.row.packedwidth * scope.row.packedheight /5000).toFixed(2)+ 'Kg /' : ''}} </span>
                            <span>{{scope.row.packedlength ? (scope.row.packedlength  * scope.row.packedwidth * scope.row.packedheight /5000 * 2.20).toFixed(2)+ 'LB' : ''}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="英国 Tuffnell = 长*宽*高 / 4000">
                        <template slot-scope="scope">
                            <span>{{scope.row.packedlength ? (scope.row.packedlength  * scope.row.packedwidth * scope.row.packedheight /4000).toFixed(2)+ 'Kg /' : ''}}</span>
                            <span>{{scope.row.packedlength ? (scope.row.packedlength  * scope.row.packedwidth * scope.row.packedheight /4000 * 2.20).toFixed(2)+ 'LB' : ''}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row class="tableTextSpeaing" v-if="pordSizeAttrInfoList.packingway == '1'">
            <el-col :span="2">
                
                <span class="textWight">多箱清单： </span>
            </el-col>
            <el-col :span="15">
                
                <el-table
                     border
                    :data="pordSizeAttrInfoList.productlistings"
                    style="width: 100%"
                    :header-cell-style="{background:'#f5f7fa',color:'#606266'}"
                    >
                    <el-table-column
                        label="箱数"
                        >
                        <template slot-scope="scope">
                            第{{scope.$index + 1}}箱
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="包装尺寸"
                        >
                        <template slot-scope="scope">
                            <div>
                                {{scope.row.packedlength}} × {{scope.row.packedwidth}} × {{scope.row.packedheight}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="毛重">
                        <template slot-scope="scope">
                            <div>
                                {{scope.row.packedweight}}Kg / {{scope.row.packedweight ? (scope.row.packedweight * 2.204).toFixed(2) : ''}}LB
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row class="tableTextSpeaing" >
            <el-col :span="2">
                
                <span class="textWight">销售（多）属性： </span>
            </el-col>
            <el-col :span="15">
                
                <el-table
                     border
                    :data="multiAttribute"
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
                                {{scope.row.size}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="关联SKU"
                    >
                    <template slot-scope="scope">
                        <div v-if="scope.row.productdraftid || scope.row.skualias || scope.row.sku">
                            <div>
                                上架ID：{{scope.row.productdraftid}}
                            </div>
                            <div>
                                SKU别名：{{scope.row.skualias }}
                            </div>
                            <div>
                                SKU：{{scope.row.sku}}
                            </div>
                            <div>
                                SPU：{{pordSizeAttrInfoList.spu}}
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
                            <div v-if="scope.row.productneed">需要</div>
                            <div v-else>不需要</div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        
    </div>
</template>
<script>
export default {
    data(){
        return {
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
    methods:{
        changeProducttype(val){
            if(!val && !this.pordSizeAttrInfoList.beforepackweight)return
            if(val == 2){
               return '物理捆绑属性'
            }
            if(this.pordSizeAttrInfoList.beforepackweight){
                if(val == 1){
                    return '多属性产品'
                }else {
                    return '普通产品'
                }
            }else{
               if(this.pordSizeAttrInfoList.scenarios == 3 || this.pordSizeAttrInfoList.scenarios == 12){
                    return '多属性产品'
                }else {
                    return '普通产品'
                } 
            }
        },
        changePorStyle(val){
            if(!val)return
            if(val == 1){
                return ''
            }else if (val == 2){
                return '不规则立方体'
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
            // margin-left: 5px;
        }
    }
    // span {
    //     font-weight: normal;
    // }
}
.tableTextSpeaing{
    display: flex;
    margin-top: 15px;
    .moreText{
        display: flex;
        .textBox {
            font-weight: normal;
            line-height: 18px;
            // margin-left: 5px;
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