<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="170px" size="mini">
            <el-row :gutter="120">
                <el-col :span="12"  :xs="20" :sm="20" :md="20" :lg="20" :xl="10">
                    <el-form-item label="产品类型:" prop="scenarios" class="col-r">
                        <template slot="label" >
                            <el-popover
                                placement="bottom"
                                width="627"
                                trigger="click">
                                <el-table :data="gridData" border :header-cell-style="{background:'#f5f7fa',color:'#333'}">
                                    <el-table-column width="200" property="productType" :label="M2('产品类型')"></el-table-column>
                                    <el-table-column width="400" property="Interpretation" :label="M2('释义')"></el-table-column>
                                </el-table>
                                <i class="el-icon-question1" slot="reference"></i>
                            </el-popover>
                           {{M2('产品类型')}}:
                        </template>
                       <el-radio-group v-model="ruleForm.scenarios" @change="changePreproductionSample">
                            <el-radio :label="0"> {{M2('全新开发')}}</el-radio>
                            <el-radio :label="1">{{M2('二次开发')}}</el-radio>
                            <el-radio :label="2">{{M2('改进/变更')}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="12"  :xs="20" :sm="20" :md="20" :lg="20" :xl="10">
                    <el-form-item label="是否为产前样:" prop="preproductionSample" class="col-r">
                         <template slot="label" >
                            <el-popover
                                placement="bottom"
                                width="627"
                                trigger="click">
                                <el-table :data="gridData3" border :header-cell-style="{background:'#f5f7fa',color:'#333'}">
                                    <el-table-column width="200" property="productType" :label="M2('产品类型')"></el-table-column>
                                    <el-table-column width="400" property="Interpretation" :label="M2('释义')"></el-table-column>
                                </el-table>
                                <i class="el-icon-question1" slot="reference" style="left:45px"></i>
                            </el-popover>
                            {{M2('是否为产前样')}}:
                        </template>
                       <el-radio-group v-model="ruleForm.preproductionSample" @change="changePreproductionSample">
                            <el-radio :label="1" >{{M2('否')}}</el-radio>
                            <el-radio :label="0">{{M2('是（已提交过单据，并且确认结果为“合格/改进-产前样”）')}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="120">
                <el-col :span="12"  :xs="20" :sm="20" :md="20" :lg="11" :xl="10">
                    <el-form-item label="样品情况:" prop="sampleCondition" class="col-r">
                        <template slot="label">
                            <el-popover
                                placement="bottom"
                                width="627"
                                trigger="click">
                                <el-table :data="gridData1" border :header-cell-style="{background:'#f5f7fa',color:'#333'}">
                                    <el-table-column width="200" property="productType" :label="M2('样品情况')"></el-table-column>
                                    <el-table-column width="400" property="Interpretation" :label="M2('释义')"></el-table-column>
                                </el-table>
                                <i class="el-icon-question1" slot="reference"></i>
                            </el-popover>{{M2('样品情况')}}:
                        </template>
                        <el-radio-group v-model="ruleForm.sampleCondition">
                            <el-radio :label="0">{{M2('完整样品')}}</el-radio>
                            <el-radio :label="1" v-if="showSampleCondition">{{M2('部件')}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="12"  :xs="20" :sm="20" :md="20" :lg="11" :xl="10" v-if="ruleForm.sampleCondition == 0">
                    <el-form-item label="来样次数:" prop="sampleNum">
                        <template slot="label">
                            {{M2('来样次数')}}:
                        </template>
                        {{ruleForm.sampleNum ? ruleForm.sampleNum : 1}}
                    </el-form-item>
                </el-col>
            </el-row>
                <el-row :gutter="120">
                    <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="11" :xl="10" class="col-r">
                        <el-form-item label="开发ID/sku别名:" prop="skuAlias"  v-if="ruleForm.scenarios != 2" :rules="[{required:ruleForm.scenarios != 1,message:M2('请填写开发ID/sku别名!'),trigger:'blur'}]">
                            <template  slot="label">
                                {{ruleForm.sampleCondition == 0 || !ruleForm.sampleCondition? M2('开发ID/sku别名:') :M2('sku别名:')}}
                            </template>
                            <el-input v-model="ruleForm.skuAlias" @change="changeProductKey(1)"></el-input> <i class="el-icon-success" v-if="successIcon"></i><i class="el-icon-error" v-if="errorIcon"></i>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="11" :xl="10" v-if="ruleForm.scenarios == 2" class="col-r">
                        <el-form-item label="原sku别名:" prop="skuAlias" >
                            <template  slot="label">
                                {{ruleForm.sampleCondition == 0 ? M2('原sku别名:') : M2('sku别名:')}}
                            </template>
                            <el-input v-model="ruleForm.skuAlias"  @change="changeProductKey(2)"></el-input> <i class="el-icon-success" v-if="successIcon"></i><i class="el-icon-error" v-if="errorIcon"></i>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="11" :xl="10">
                        <el-form-item label="产品名称:" prop="productTitle">
                            <template slot="label">
                                {{M2("产品名称")}}:
                            </template>
                            <el-input v-model="ruleForm.productTitle" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="120" v-if="ruleForm.sampleCondition == 0">
                    <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="11" :xl="10">
                        <el-form-item  prop="sampleSize">
                            <template slot="label">
                                {{M2("样品尺码")}}:
                            </template>
                            <el-select v-model="ruleForm.sampleSize" @change="changePreproductionSample(1)">
                                <el-option
                                    v-for="item in productSizeList"
                                    :key="item"
                                    :value="item"
                                    :label="item"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="11" :xl="10" >
                        <el-form-item  prop="quantitySpec">
                            <template slot="label">
                                {{M2("数量规格")}}:
                            </template>
                            <el-select v-model="ruleForm.quantitySpec" @change="changePreproductionSample(1)">
                                <el-option
                                    v-for="item in quantitySpecList"
                                    :key="item"
                                    :value="item"
                                    :label="item"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="120">
                    <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="11" :xl="10" >
                        <el-form-item label="供应商类型:" prop="supplierType" v-if="ruleForm.scenarios != 2 && ruleForm.sampleCondition == 0">
                            <template slot="label">
                            {{M2("供应商类型")}}:
                            </template>
                            <el-radio-group v-model="ruleForm.supplierType">
                                <el-radio :label="1">{{M2("新")}}</el-radio>
                                <el-radio :label="0">{{M2("旧")}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="120">
                <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="11" :xl="10" >
                    <el-form-item label="供应商名称:" prop="supplierId">
                        <template slot="label">
                           {{M2("供应商名称")}}:
                        </template>
                        <el-select 
                            v-model="ruleForm.supplierId"
                            @change="changePreproductionSample()"
                            filterable :filter-method="dataFilter"
                            ref="selectSupplierId"
                            @visible-change="getVisible()"
                            value-key="id"
                            :disabled="ruleForm.sampleCondition == 1 || ruleForm.scenarios == 2 || disabledSupplier"
                            >
                            <el-option 
                                v-for="item in suppliers"                        
                                :key="item.id"
                                :label="item.code + '-' + item.supplierAlias"
                                :value="item.id"
                                >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="11" :xl="10" >
                    <el-form-item label="原产国:" prop="countryOfOrigin" v-if="ruleForm.scenarios == 2 && ruleForm.sampleCondition == 0 && ruleForm.countryOfOrigin">
                        <template slot="label">
                           {{M2("原产国")}}:
                        </template>
                        <el-input v-model="ruleForm.countryOfOrigin"></el-input>
                    </el-form-item>
                </el-col>
                </el-row>
                <el-row :gutter="120">
                    <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="11" :xl="10">
                        <el-form-item label="验样场地:" prop="testSite">
                            <template slot="label">
                                {{M2("验样场地")}}:
                            </template>
                            <el-radio-group v-model="ruleForm.testSite">
                                <el-radio :label="0"> {{M2("公司")}}</el-radio>
                                <el-radio :label="1"> {{M2("工厂")}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="11" :xl="10">
                        <el-form-item label="预计验样日期:" prop="estimatedDateInspection" v-if="ruleForm.testSite == 1">
                            <template slot="label">
                                {{M2("预计验样日期")}}:
                            </template>
                              <el-date-picker
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd"
                                size="mini"
                                v-model="ruleForm.estimatedDateInspection"
                                type="date"
                                :key="Math.random()"
                                :placeholder="M2('选择日期')">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="120">
                    <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="11" :xl="10" >
                        <el-form-item label="验货报告需求:" prop="reportRequirement" v-if="ruleForm.sampleCondition == 1 || (ruleForm.sampleCondition == 0 && ruleForm.scenarios == 2)">
                            <template slot="label">
                                {{M2("验货报告需求")}}:
                            </template>
                            <el-radio-group v-model="ruleForm.reportRequirement">
                                <el-radio :label="0">{{M2("更新")}}</el-radio>
                                <el-radio :label="1" v-if="ruleForm.sampleCondition == 1">{{M2("不更新")}}</el-radio>
                                <el-radio :label="2" v-else>{{M2("重做")}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="11" :xl="10" >
                        <el-form-item label="部件名称:" prop="partName" v-if="ruleForm.sampleCondition == 1">
                            <template slot="label">
                                {{M2("部件名称")}}:
                            </template>
                            <el-input v-model="ruleForm.partName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>    
            <el-row :gutter="150">
                <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="20" :xl="10">
                    <el-form-item label="出口市场:" prop="exportMarket">
                        <template slot="label">
                            {{M2("出口市场")}}:
                        </template>
                         <div class="checkBoxAll">
                            <el-checkbox class="checkboxAlltext"  :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">{{M2('全选')}}</el-checkbox>
                            <div style="margin: 15px 0;"></div>
                            <el-checkbox-group  class="chengboxMoreBox" v-model="exportMarket">
                                <el-checkbox  
                                    v-for="item in cities"
                                    :label="item.countryCodes"
                                    :key="item.countryCodes"
                                    @click.native="handleCheckedCitiesChange(item.countryCodes,$event)"
                                >
                                {{M2(item.country)}}                      
                                </el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="20" :xl="10" >
                    <el-form-item label="英文验货报告:" prop="englishInspectionReport" v-if="showSampleNum">
                        <template slot="label">
                            {{M2("英文验货报告")}}:
                        </template>
                        <el-radio-group v-model="ruleForm.englishInspectionReport">
                            <el-radio :label="0">{{M2('需要')}}</el-radio>
                            <el-radio :label="1">{{M2('不需要')}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="150" v-if="ruleForm.scenarios == 1 && ruleForm.sampleCondition == 0">
                <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="11" :xl="10" class="col-r">
                    <el-form-item label="原型号sku:" prop="originalTypeSkuAlias" >
                        <template slot="label">
                            {{M2("原型号sku")}}:
                        </template>
                        <el-input v-model="ruleForm.originalTypeSkuAlias"  @change="changeProductKey1"></el-input> <i class="el-icon-success" v-if="successIcon1"></i><i class="el-icon-error" v-if="errorIcon1"></i>
                    </el-form-item>
                </el-col>
                <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="11" :xl="10">
                    <el-form-item label="二次开发原因:" prop="reasonForSecondaryDev">
                        <template slot="label">
                            {{M2("二次开发原因")}}:
                        </template>
                        <el-input v-model="ruleForm.reasonForSecondaryDev"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <div v-if="showSampleNum">
                <el-row :gutter="150" >
                    <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="11" :xl="10">
                        <el-form-item label="产品颜色类型:" prop="productColorType">
                            <template slot="label">
                                {{M2("产品颜色类型")}}:
                            </template>
                            <el-radio-group v-model="ruleForm.productColorType">
                                <el-radio label="0">{{M2("单颜色")}}</el-radio>
                                <el-radio label="1">{{M2("多颜色")}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="11" :xl="10">
                        <el-form-item label="样品颜色:" prop="sampleColor">
                            <template slot="label">
                                {{M2("样品颜色")}}:
                            </template>
                            <el-input v-model="ruleForm.sampleColor"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="150">
                    <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="11" :xl="10">
                        <el-form-item label="纸箱爆破强度:" prop="burstingStrengthCarton">
                             <template slot="label">
                                {{M2("纸箱爆破强度")}}:
                            </template>
                            <el-input v-model="ruleForm.burstingStrengthCarton" oninput="value=value.replace(/^(0+)|[^\d]+/g,'')">
                                <template slot="append" >PSI</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="11" :xl="10">
                        <el-form-item label="辅助泡沫密度:" prop="auxiliaryFoamDensity">
                            <template slot="label">
                                {{M2("辅助泡沫密度")}}:
                            </template>
                            <el-input v-model="ruleForm.auxiliaryFoamDensity" oninput="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')">
                                <template slot="append" >kg/m³</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>  
            </div> 
            <el-row :gutter="150">
                <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="11" :xl="10">
                    <el-form-item label="产品材质:" prop="material">
                        <template slot="label">
                            {{M2("产品材质")}}:
                        </template>
                        <el-input v-model="ruleForm.material"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="11" :xl="10">
                    <el-form-item label="产品工艺:" prop="process">
                        <template slot="label">
                            {{M2("产品工艺")}}:
                        </template>
                        <el-input v-model="ruleForm.process"></el-input>
                    </el-form-item>
                </el-col>
            </el-row> 
            
            <div v-if="ruleForm.scenarios != 2 && ruleForm.sampleCondition == 0">  
                <el-row :gutter="150">
                    <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="11" :xl="10">
                        <el-form-item label="基础信息:" prop="basicInformation">
                            <template slot="label">
                                {{M2("基础信息")}}:
                            </template>
                            <el-input v-model="ruleForm.basicInformation" type="textarea" :rows="6" maxlength="1000" show-word-limit></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="11" :xl="10">
                        <el-form-item label="竞品信息:" prop="jpInformation">
                             <template slot="label">
                                {{M2("竞品信息")}}:
                            </template>
                            <el-input type="textarea" v-model="ruleForm.jpInformation" :rows="6" maxlength="1000" show-word-limit></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>   
                <el-row :gutter="150">
                    <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="11" :xl="10" style="position: relative;" >
                        <div v-if="ruleForm.sampleNum > 1">
                            <el-form-item label="来样改进信息:" prop="sampleImprovedInformation">
                                <template slot="label">
                                    {{M2("来样改进信息")}}:
                                </template>
                                <el-input type="textarea" v-model="ruleForm.sampleImprovedInformation" :rows="6"  maxlength="300" show-word-limit></el-input>
                            </el-form-item>
                            <span class="a-link" @click="showAddPhoto = true">{{M2('添加图片')}}</span>
                        </div>
                    </el-col>
                    <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="20" :xl="20" >
                        <el-form-item  prop="sampleOnePhoto" v-if="showAddPhoto || (ruleForm.sampleNum > 1 && sampleOnePhoto.length > 0)">
                            <template slot="label">
                                {{M2("来样改进图片")}}：
                            </template>
                            <imgUpload :dataParams='{fileType:1,productSampleId:$route.query.id || null}'  :showButton="false" :value='sampleOnePhoto' :limit="20" @upDateFile="upDateFile" :imgUrl="imgUrl" ruleName="sampleOnePhoto"></imgUpload> 
                        </el-form-item>
                    </el-col>
                     <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
                        <el-form-item  prop="productSizePhotoList" >
                            <template slot="label">
                                {{M2("产品尺寸图（彩图）")}}:
                            </template>
                            <imgUpload :dataParams='{fileType:4,productSampleId:$route.query.id || null}' :showButton="false" :value='productSizePhotoList' :limit="20" @upDateFile="upDateFile" :imgUrl="imgUrl" ruleName="productSizePhotoList"></imgUpload> 
                        </el-form-item>
                    </el-col>
                </el-row> 
            </div>  
            <div v-else> 
                <el-row :gutter="150" >
                    <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="20" :xl="10">
                        <el-form-item label="本次改进/变更点:" prop="thisImprovement">
                            <template slot="label" >
                                <span v-if="ruleForm.sampleCondition == 0">
                                    {{M2("本次改进/变更点")}}:
                                </span> 
                                <span v-else>
                                    {{M2("部件变更点")}}:
                                </span> 
                            </template>
                            <el-input v-model="ruleForm.thisImprovement" type="textarea" :rows="6" maxlength="300" show-word-limit></el-input>
                            <div v-if="ruleForm.sampleCondition == 0" @click="uploadChangeFile" >
                                <div class="fover-click">
                                    {{M2("上传文件")}}
                                </div>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row :gutter="150" v-if="(improvedChangeFileShow && ruleForm.sampleCondition == 0) || (ruleForm.improvedChangeFile && ruleForm.improvedChangeFile.length > 0 && ruleForm.sampleCondition == 0)">
                    <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="20" :xl="20" >
                        <el-form-item  prop="improvedChangeFile">
                            <template slot="label" >
                                <span >
                                    {{M2("本次改进/变更点-文件")}}:
                                </span> 
                            </template>
                            <fileUpload 
                                :dataParams='{fileType:7,productSampleId:$route.query.id || null}' 
                                extraParams='productSampleId'  
                                accept='.doc,.docx,.pdf,.xlsx,.csv,.xls' :imgUrl="imgUrl" 
                                :value='ruleForm.improvedChangeFile' 
                                :limit="5" @upDateFile="upDateFile" 
                                ruleName="improvedChangeFile"
                            ></fileUpload> 
                        </el-form-item>
                    </el-col>
                </el-row>  
            </div>
            <el-row :gutter="150">
                <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="20" :xl="20" >
                    <el-form-item  prop="sampleImprovementPhoto" v-if="ruleForm.testSite == 0 && ruleForm.sampleCondition == 0">
                        <template slot="label" >
                            <span >
                                {{M2("来样图片")}}:
                            </span> 
                        </template>
                        <imgUpload :dataParams='{fileType:0,productSampleId:$route.query.id || null}' :showButton="false" :value='sampleImprovementPhoto' :limit="1" @upDateFile="upDateFile" :imgUrl="imgUrl" ruleName="sampleImprovementPhoto"></imgUpload> 
                    </el-form-item>
                </el-col>
                <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="20" :xl="20" >
                    <el-form-item  prop="changePhoto" v-if="ruleForm.scenarios == 2 || ruleForm.sampleCondition == 1">
                        <template slot="label" >
                            <span>
                                {{M2("变更图片")}}:
                            </span> 
                        </template>
                        <imgUpload :dataParams='{fileType:3,productSampleId:$route.query.id || null}' :showButton="false" :value='changePhoto' :limit="20" @upDateFile="upDateFile" :imgUrl="imgUrl" ruleName="changePhoto"></imgUpload> 
                    </el-form-item>
                </el-col>
                
            </el-row>  
            <el-row :gutter="150">
                <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="20" :xl="20" >
                    <el-form-item  prop="designConstructionDraw">
                        <template slot="label" >
                            <span >
                                {{M2("设计施工图片")}}:
                            </span> 
                        </template>
                        <imgUpload :dataParams='{fileType:8,productSampleId:$route.query.id || null}' :showButton="false" :value='designConstructionDraw' :limit="20" @upDateFile="upDateFile" :imgUrl="imgUrl" ruleName="designConstructionDraw"></imgUpload> 
                    </el-form-item>
                </el-col>
            </el-row>  
            <el-row :gutter="150">
                <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="20" :xl="20" >
                    <el-form-item  prop="designConstructionFile">
                        <template slot="label" >
                            <span >
                                {{M2("设计施工文件")}}:
                            </span> 
                        </template>
                        <fileUpload 
                            :dataParams='{fileType:20,productSampleId:$route.query.id || null}' 
                            extraParams='productSampleId'  
                            accept='.pdf' :imgUrl="imgUrl" 
                            :value='designConstructionFile' 
                            :limit="5" @upDateFile="upDateFile" 
                            ruleName="designConstructionFile"
                        ></fileUpload> 
                    </el-form-item>
                </el-col>
            </el-row>  
        </el-form>
        <div class="bottomButton">
            <el-button class="bule-button" @click="submitForm('ruleForm')" size="mini" :disabled="submitDisabled">{{M2("提交")}}</el-button>
            <el-button type="primary" @click="saveProductSampleFn(1)" size="mini" :disabled="submitDisabled" :loading="submitDisabled">{{M2("保存")}}</el-button>
            <el-button @click="resetForm('ruleForm')"  size="mini">{{M2("取消")}}</el-button>
        </div>
    </div>
</template>
<script>
const cityOptions = ['GB','US','EU','FR','IT','ES','JP','CA','DE'];
import { CFG_ProductSample_SampleSize,CFG_ProductSample_QuantitySpec,saveProductSample,findSupplier,getFilePath, getProductKey,getPreproductionSample,saveProductSampleAttachment1} from '@/api/user.js'
import { judgePorduction,trim } from '@/utils/tools.js'
export default {
    components:{
        imgUpload:() => import('@/components/common/commonUploadImg'),
        fileUpload:() => import('@/components/common/commonUploadFile'),
    },
    name:'salesTargetEdit',
    data(){
        return {
            disabledSupplier:false,
            submitDisabled:false,
            successIcon:false,
            errorIcon:false,
            successIcon1:false,
            errorIcon1:false,
            checkAll: false,
            showAddPhoto: false,
            improvedChangeFileShow: false,
            cities: [
            {
                countryCodes:'US',
                country:'美'
            },
            {
                countryCodes:'GB',
                country:'英'
            },
            {
                countryCodes:'EU',
                country:'欧盟'
            },
            {
                countryCodes:'DE',
                country:'德'
            },
            {
                countryCodes:'FR',
                country:'法'
            },
            {
                countryCodes:'IT',
                country:'意'
            },
            {
                countryCodes:'ES',
                country:'西'
            },
            {
                countryCodes:'JP',
                country:'日本'
            },
            {
                countryCodes:'CA',
                country:'加拿大'
            },
            ],
            isIndeterminate: true,
            imgLoading:false,
            rules: {
                scenarios: [
                    { required: true, message: this.M2('请选择产品类型'), trigger: 'blur' },
                ],
                preproductionSample: [
                    { required: true, message: this.M2('请选择产前样'), trigger: 'blur' }
                ],
                sampleCondition: [
                    { required: true, message: this.M2('请选择样品情况'), trigger: 'blur' }
                ],
                supplierType: [
                    { required: true, message: this.M2('请选择供应商类型'), trigger: 'blur' }
                ],
                supplierId: [
                    { required: true, message: this.M2('请选择供应商'), trigger: 'blur' }
                ],
                testSite: [
                    { required: true, message: this.M2('请选择验样场地'), trigger: 'blur' }
                ],
                reportRequirement: [
                    { required: true, message: this.M2('请选择验货报告需求'), trigger: 'blur' }
                ],
                estimatedDateInspection: [
                    { required: true, message: this.M2('请选择验样日期'), trigger: 'blur' }
                ],
                exportMarket: [
                    {
                        required: true,
                        validator: (rules, value, cb) => {
                            if( !this.exportMarket || (this.exportMarket && this.exportMarket.length == 0) ){
                                return cb(new Error(this.M2("请选择出口市场！")));
                            }
                            return cb();
                        },
                        trigger: "blur"
                    }
                ],
                englishInspectionReport: [
                    { required: true, message:  this.M2('请选择英文验货报告'), trigger: 'blur' }
                ],
                productColorType: [
                    { required: true, message:  this.M2('请选择产品颜色类型'), trigger: 'blur' }
                ],
                
                productTitle: [
                    { required: true, message:  this.M2('请填写产品名称'), trigger: 'blur' }
                ],
                sampleSize: [
                    { required: true, message:  this.M2('请选择产品尺码'), trigger: 'blur' }
                ],
                quantitySpec: [
                    { required: true, message:  this.M2('请选择数量规格'), trigger: 'blur' }
                ],
                countryOfOrigin: [
                    { required: true, message:  this.M2('请填写原产国'), trigger: 'blur' }
                ],
                partName: [
                    { required: true, message:  this.M2('请填写部件名称'), trigger: 'blur' }
                ],
                originalTypeSkuAlias: [
                    { required: true, message:  this.M2('请填写原型号sku'), trigger: 'blur' }
                ],
                reasonForSecondaryDev: [
                    { required: true, message:  this.M2('请填写二次开发原因'), trigger: 'blur' }
                ],
                sampleColor: [
                    { required: true, message:  this.M2('请填写来样颜色'), trigger: 'blur' }
                ],
                burstingStrengthCarton: [
                    { required: true, message:  this.M2('请填写纸箱爆破强度'), trigger: 'blur' }
                ],
                auxiliaryFoamDensity: [
                    { required: true, message:  this.M2('请填写辅助泡沫密度'), trigger: 'blur' }
                ],
                material: [
                    { required: true, message:  this.M2('请填写产品材质'), trigger: 'blur' }
                ],
                process: [
                    { required: true, message:  this.M2('请填写产品工艺'), trigger: 'blur' }
                ],
                basicInformation: [
                    { required: true, message:  this.M2('请填写基础信息'), trigger: 'blur' }
                ],
                jpInformation: [
                    { required: true, message:  this.M2('请填写竞品信息'), trigger: 'blur' }
                ],
                skuAlias: [
                    {
                        required: true,
                        validator: (rules, value, cb) => {
                            if( !value){
                                if( this.ruleForm.sampleCondition == 0 || !this.ruleForm.sampleCondition) {
                                    return cb(new Error( this.M2("请填写开发ID/sku别名!")));
                                }else {
                                    return cb(new Error( this.M2("请填写sku别名！")));
                                }
                            }
                            return cb();
                        },
                        trigger: "change"
                    }
                ],
                productSizePhotoList: [
                    {
                        required: true,
                        validator: (rules, value, cb) => {
                            if( !this.ruleForm.productSizePhotoList || this.ruleForm.productSizePhotoList.length == 0){
                                return cb(new Error( this.M2("请填加产品尺寸图（彩图）!")));
                            }
                            return cb();
                        },
                        trigger: "change"
                    }
                ],
                changePhoto: [
                    {
                        required: true,
                        validator: (rules, value, cb) => {
                            if(!this.ruleForm.changePhoto || this.ruleForm.changePhoto.length == 0 ){
                                return cb(new Error(this.M2("请添加变更图片!")));
                            }
                            return cb();
                        },
                        trigger: "change"
                    }
                ],
                sampleImprovementPhoto: [
                    {
                        required: true,
                        validator: (rules, value, cb) => {
                            if( !this.ruleForm.sampleImprovementPhoto || this.ruleForm.sampleImprovementPhoto.length == 0){
                                return cb(new Error(this.M2("请填加来样图片!")));
                            }
                            return cb();
                        },
                        trigger: "change"
                    }
                ],
                sampleImprovedInformation: [
                    { required: true, message: this.M2('请填写来样改进信息'), trigger: 'blur' }
                ],
                thisImprovement: [
                    { required: true, message: this.M2('请填写本次改进/变更点'), trigger: 'blur' }
                ],
            },
            suppliers:[],
            copySuppliers1:[],
            copySuppliers:[],
            exportMarket:[],
            gridData:[
                {
                    productType:'全新产品',
                    Interpretation:'首次开发的全新产品，且有录入产品开发系统',
                },
                {
                    productType:'二次开发产品',
                    Interpretation:'已售产品变更供应商，且有录入产品开发系统',
                },
                {
                    productType:'改进/变更产品',
                    Interpretation:'已售产品在不变更供应商的前提下改进/变更',
                },
            ],
            gridData1:[
                {
                    productType:'完整样品',
                    Interpretation:'样品各部位齐全',
                },
                {
                    productType:'部件',
                    Interpretation:'产品部件的确认，适用于：\n 1、改进/变更的产品，仅进行部件确认；\n2、产前样进行最终的部件确认;',
                },
            ],
            gridData3:[
                {
                    productType:'产前样',
                    Interpretation:'该产品已提交过样品确认申请单，且被认证部确认为“合格/改进后通过”，本次为量产前的再次样品确认（本次与首次提交单据的供应商应一致）。',
                }
            ],
            productSizePhotoList:[],
            sampleOnePhoto:[],//来样图片1张
            sampleImprovementPhoto:[],//来样改进信息图片
            designConstructionFile:[],//来样改进信息图片
            designConstructionDraw:[],//来样改进信息图片
            changePhoto:[],//变更图片
            imgUrl:'',
            ruleName:'',
            productSizeList:[],
            quantitySpecList:[],
            // disableScenarios:false,
        }
    },
    computed:{
        action(){
            return `${process.env.VUE_APP_DEVSERVER}/productSample/saveProductSampleAttachment`
        },
        //改进变更，部件不显示
        showSampleNum(){
            if(this.ruleForm.sampleCondition == 0){
                return true
            }else {
                return false
            }
        },
        showSampleCondition(){
            if(((this.ruleForm.scenarios == 0 || this.ruleForm.scenarios == 1) && this.ruleForm.preproductionSample == 0) || this.ruleForm.preproductionSample == 0 || this.ruleForm.scenarios == 2){
                return true
            }else {
                return false
            }
        },
    },
    watch:{
        showSampleCondition:{
            handler:function(val,oldVal){
                if(!val){
                    this.$set(this.ruleForm,'sampleCondition',0)
                }
            }
        },
        exportMarket:{
            handler:function(val,oldVal){
                if(!val) val = []
                this.$set(this.ruleForm,'exportMarket',this.exportMarket || [])
                let eulist =  ['FR','IT','ES','DE'];
                if(val.includes('EU') && !oldVal.includes('EU')){
                    eulist.forEach(item=> {
                        val.push(item)
                    })
                    val = [...new Set(val)]
                }
                if(!val.includes('EU') && oldVal.includes('EU')){
                    let a = JSON.parse(JSON.stringify(val))
                    for(let i = 0 ; i <= a.length ;i++){
                        if(eulist.includes(a[i])){
                           this.exportMarket.splice(this.exportMarket.findIndex(res => res == a[i]),1)
                        }
                    }
                    this.$set(this.ruleForm,'exportMarket',this.exportMarket)
                    return
                }
                this.exportMarket = val
                this.$set(this.ruleForm,'exportMarket',this.exportMarket)
            }
        }
    },
    props:{
        ruleForm:{
            type:Object,
            default:() => ({
                exportMarket:[]
            })
        },
        routeParam:{
            type:Object,
            default:() => ({})
        },
    },
    mounted(){
        this.init()
    },
    methods:{
        showRequireType(){
            if( this.ruleForm.sampleCondition == 0 || !this.ruleForm.sampleCondition) {
                return this.M2('请填写开发ID/sku别名')
            }else {
                return this.M2('请填写sku别名！')
            }
        },
        //0：来样图片(一张)，1：来样改进信息(图片),2：样品确认文件-初版验货报告,3：变更图片,4:产品尺寸图,5：样品确认文件模块-文件,6：样品确认文件模块-问题图片 可为空
        //默认显示数据
        init() {
            let sampleUrl = judgePorduction() ? 'http://productdev.yaheecloud.com/tool-api/oceanTransportConfig/queryConfig/CFG_ProductSample_SampleSize':
'http://api-tools-test.yahee.com.cn:82//tool-api/oceanTransportConfig/queryConfig/CFG_ProductSample_SampleSize'
            CFG_ProductSample_SampleSize(sampleUrl).then(res => {
                this.productSizeList = res.data
            })
            let quantityUrl = judgePorduction() ? 'http://productdev.yaheecloud.com/tool-api/oceanTransportConfig/queryConfig/CFG_ProductSample_QuantitySpec':'http://api-tools-test.yahee.com.cn:82//tool-api/oceanTransportConfig/queryConfig/CFG_ProductSample_QuantitySpec'
            CFG_ProductSample_QuantitySpec(quantityUrl).then(res => {
                this.quantitySpecList = res.data
            })

            this.exportMarket = this.ruleForm.exportMarket
            if(this.ruleForm.productKey && this.ruleForm.productKey.includes('DEV')){
                this.$set(this.ruleForm,'skuAlias',this.ruleForm.productKey)
            } 
            findSupplier().then(res => {
                this.suppliers = res.data
                this.copySuppliers1 = JSON.parse(JSON.stringify(res.data)) 
                this.copySuppliers = JSON.parse(JSON.stringify(res.data)) 
            })
            let url = judgePorduction() ? 'http://productdev.yaheecloud.com/tool-api/common/getFilePath' : 'http://api-tools-test.yahee.com.cn:82/tool-api/common/getFilePath'
            getFilePath(url).then(res => {
                this.imgUrl = res.data
                if(this.ruleForm.psas && this.ruleForm.psas.length > 0){
                    this.ruleForm.psas.forEach(item => {
                        item.showImgUrl = `${res.data}/Small/${item.fileUri}`
                        item.showBigImgUrl = `${res.data}/${item.fileUri}`
                    })
                    //产品尺寸图
                    this.ruleForm.productSizePhotoList = this.productSizePhotoList =  this.ruleForm.psas.filter(item => {
                        return item.fileType == 4
                    })
                    //来样图片
                    this.ruleForm.sampleOnePhoto = this.sampleOnePhoto = this.ruleForm.psas.filter(item => {
                        return item.fileType == 1
                    })
                    this.ruleForm.sampleImprovementPhoto = this.sampleImprovementPhoto = this.ruleForm.psas.filter(item => {
                        return item.fileType == 0
                    })
                    this.ruleForm.designConstructionFile = this.designConstructionFile = this.ruleForm.psas.filter(item => {
                        return item.fileType == 20
                    })
                    this.ruleForm.designConstructionDraw = this.designConstructionDraw = this.ruleForm.psas.filter(item => {
                        return item.fileType == 8
                    })
                    //改进变更点文件
                    this.ruleForm.improvedChangeFile  = this.ruleForm.psas.filter(item => {
                        return item.fileType == 7
                    })
                    this.ruleForm.changePhoto = this.changePhoto = this.ruleForm.psas.filter(item => {
                        return item.fileType == 3
                    })
                }
            })
            //if(this.ruleForm.basicInformation)this.ruleForm.basicInformation.replaceAll('\\n','\n')
        },
        uploadChangeFile(){
            this.improvedChangeFileShow = true
        },
        changeProductKey1(){
            if(!this.ruleForm.originalTypeSkuAlias) return
            let param = {
                productKey:this.ruleForm.originalTypeSkuAlias
            }
            getProductKey(param).then(res => {
                if(res.data){
                    this.successIcon1 = true
                    this.errorIcon1 = false
                    if(!this.successIcon){
                        this.$set(this.ruleForm,'releSku', res.data.releSku || this.ruleForm.releSku)
                        this.$set(this.ruleForm,'scenarios', res.data.scenarios || res.data.scenarios == 0 ? res.data.scenarios : this.ruleForm.scenarios)
                        // this.$set(this.ruleForm,'productKey', res.data.productKey || this.ruleForm.productKey)
                        this.$set(this.ruleForm,'originalTypeSku', res.data.productKey)
                        this.$set(this.ruleForm,'devProductId', res.data.devProductId || this.ruleForm.devProductId)
                        if(this.ruleForm.sampleCondition == 1 || this.ruleForm.scenarios == 2) {
                            this.$set(this.ruleForm,'supplierCode', res.data.supplierCode || this.ruleForm.supplierCode)
                            this.$set(this.ruleForm,'supplierId', res.data.supplierId || this.ruleForm.supplierId)
                        } 
                        if(res.data.supplierId && this.ruleForm.scenarios == 2 && this.ruleForm.sampleCondition == 0){
                            let list = []
                            list = this.copySuppliers.filter(item => {
                                return item.id == res.data.supplierId
                            })
                            if(list.length > 0) {
                                if(list[0].regionName && list[0].regionName.includes('国外')){
                                    this.$set(this.ruleForm,'countryOfOrigin',list[0].regionName)
                                }
                            }  
                        }
                        // if(this.ruleForm.scenarios == 0 || this.ruleForm.scenarios){
                        //     this.disableScenarios = true
                        // }else {
                        //     this.disableScenarios = false
                        // }
                    } 
                }else {
                    this.$set(this.ruleForm,'originalTypeSkuAlias', '')
                    this.errorIcon1 = true
                    this.successIcon1 = false
                }
            }).catch(res => {
                this.$set(this.ruleForm,'originalTypeSkuAlias', '')
                this.errorIcon1 = true
                this.successIcon1 = false
            })
        },
        changeProductKey(type){
            if(type == 2) {
                if(this.ruleForm.skuAlias.includes('DEV')){
                    this.$message({
                        type: 'error', 
                        message:this.M2('请填写sku别名'),
                        offset:200,
                    })
                    this.$set(this.ruleForm,'skuAlias','')
                    return
                }else if(type == 1){
                    if(this.ruleForm.sampleCondition == 1 && this.ruleForm.skuAlias.includes('DEV')){
                        this.$message({
                            type: 'error', 
                            message:this.M2('请填写sku别名'),
                            offset:200,
                        })
                        this.$set(this.ruleForm,'skuAlias','')
                        return
                    }
                }
            }
            if(!this.ruleForm.skuAlias) {
                this.ruleForm.skuAlias = '' 
                this.$set(this.ruleForm,'productKey',null)
                return
            }
            this.$set(this.ruleForm,'productKey',trim(this.ruleForm.skuAlias))
            if(this.ruleForm.scenarios == 2){
                if(this.ruleForm.skuAlias.includes('DEV')){
                    this.$message({
                        type: 'error', 
                        message:this.M2('请填写sku别名'),
                        offset:200,
                    })
                    this.errorIcon = true
                    this.successIcon = false
                    this.$set(this.ruleForm,'skuAlias','')
                    return
                }
            }
            let param = {
                productKey:this.ruleForm.productKey
            }
            getProductKey(param).then(res => {
                if(res.data){
                    this.$set(this.ruleForm,'releSku', res.data.releSku || this.ruleForm.releSku)
                    this.$set(this.ruleForm,'scenarios',res.data.scenarios || res.data.scenarios == 0 ? res.data.scenarios : this.ruleForm.scenarios)
                    this.$set(this.ruleForm,'productKey', res.data.productKey || this.ruleForm.productKey)
                    this.$set(this.ruleForm,'devProductId', res.data.devProductId || this.ruleForm.devProductId)
                    if(this.ruleForm.sampleCondition == 1 || this.ruleForm.scenarios == 2) {
                        this.$set(this.ruleForm,'supplierCode', res.data.supplierCode || this.ruleForm.supplierCode)
                        this.$set(this.ruleForm,'supplierId', res.data.supplierId || this.ruleForm.supplierId)
                    } 
                    if(res.data.supplierId && this.ruleForm.scenarios == 2 && this.ruleForm.sampleCondition == 0){
                        let list = []
                        list = this.copySuppliers.filter(item => {
                            return item.id == res.data.supplierId
                        })
                        if(list.length > 0) {
                            if(list[0].regionName && list[0].regionName.includes('国外')){
                                this.$set(this.ruleForm,'countryOfOrigin',list[0].regionName)
                            }
                        }
                    }
                    this.successIcon = true
                    this.errorIcon = false              
                    // if(this.ruleForm.scenarios == 0 || this.ruleForm.scenarios){
                    //     this.disableScenarios = true
                    // }else {
                    //     this.disableScenarios = false
                    // }
                }else {
                    this.$set(this.ruleForm,'skuAlias', '')
                    this.$set(this.ruleForm,'productKey', '')
                    this.errorIcon = true
                    this.successIcon = false  
                }
            }).catch(res => {
                this.$set(this.ruleForm,'productKey', '')
                this.$set(this.ruleForm,'skuAlias', '')
                this.errorIcon = true
                this.successIcon = false
            })
        },
        upDateFile(list,name){
            this.$set(this.ruleForm,name,list)
            this[name]= list
        },
        // putImgList(val){
        //     this.ruleForm.sampleImageList = val
        // },
        handleCheckedCitiesChange (value) {
            this.$set(this.ruleForm,'exportMarket',value)
            let checkedCount = this.exportMarket.length
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        },
        handleCheckAllChange(val) {
            this.exportMarket = val ? cityOptions : []
            this.$set(this.ruleForm,'exportMarket',val ? cityOptions : [])
            this.isIndeterminate = false;
        },
        // handleAvatarSuccess(res, file) {
        //     this.imgUrl = URL.createObjectURL(file.raw);
        //     this.ruleForm.imgUrl = res.data[0]
        //     this.imgLoading = false
        // },
        beforeAvatarUpload(file) {
            const isJPG = file.type.includes('image');
            this.imgLoading = true
            if (!isJPG) {
                this.$message.error(this.M2('上传类型只能是图片!'));
                this.imgLoading = false
            }
            return isJPG ;
        },
        submitForm(formName) {
            this.requireLimitLength()
            this.$refs[formName].validate((valid) => {
                // console.log(this.ruleForm,'ruleForm')
                if (valid) {
                    this.$confirm(this.M2('确认提交样品申请单到认证部确认？'), this.M2('提示'), {
                        confirmButtonText: this.M2('确定'),
                        cancelButtonText: this.M2('取消'),
                        type: 'warning',
                        cancelButtonClass: 'btn-custom-cancel',
                    }).then(() => {
                        this.saveProductSampleFn(2)
                    }).catch(() => {
                        return          
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        requireLimitLength(){
            if(this.ruleForm.jpInformation && this.ruleForm.jpInformation.length > 1000){
                this.error(this.M2('竞品信息最多填写1000字符，请修改后在提交！'));
                return
            }
            if(this.ruleForm.basicInformation && this.ruleForm.basicInformation.length > 1000){
                this.error(this.M2('基础信息最多填写1000字符，请修改后在提交！'));
                return
            }
            if(this.ruleForm.sampleImprovedInformation && this.ruleForm.sampleImprovedInformation.length > 300){
                this.error(this.M2('来样改进信息最多填写300字符，请修改后在提交！'));
                return
            }
            if(this.ruleForm.thisImprovement && this.ruleForm.thisImprovement.length > 300){
                this.error(this.M2('本次变更信息最多填写300字符，请修改后在提交！'));
                return
            }
        },
        error(msg) {
            this.$message({
                showClose: true,
                message: msg,
                offset:220,
                type: 'error'
            });
        },
        saveProductSampleFn(val){
            this.requireLimitLength()
            this.submitDisabled = true
            if(!this.ruleForm.productSizePhotoList){
                this.ruleForm.productSizePhotoList = []
            }
            let params = {
                id:this.$route.query.id || null,//传空会自动生成，正常逻辑是使用 /productSample/getId 生成
                scenarios: this.ruleForm.scenarios,//产品类型   0：全新开发  1：二次开发产品  2：改进变更产品
                preproductionSample:this.ruleForm.preproductionSample,//是否为产前样  0 ： 是   1：否
                sampleCondition:this.ruleForm.sampleCondition,//样品情况  0：完整样品 1：部件
                sampleNum:this.ruleForm.sampleNum || 1,//来样次数
                productKey: this.ruleForm.productKey,//开发ID/sku别名
                devProductId: this.ruleForm.devProductId,//只在 productKey 为  开发id才会有  验证&获取 开发ID / sku别名取得
                releSku: this.ruleForm.releSku,//验证&获取 开发ID / sku别名取得
                productTitle: this.ruleForm.productTitle,//产品名称
                testSite:this.ruleForm.testSite,//验样场地  0：公司   1：工厂
                supplierType:this.ruleForm.supplierType,//供应商类型 0：已有  1：全新
                supplierId:this.ruleForm.supplierId,//供应商id
                supplierCode:this.ruleForm.supplierCode,//供应商code
                supplierName:this.ruleForm.supplierName,//供应商名称
                reportRequirement:this.ruleForm.reportRequirement,//供应商名称
                estimatedDateInspection:this.ruleForm.estimatedDateInspection,//预计来样时间
                sampleSize:this.ruleForm.sampleSize,//产品尺码
                quantitySpec:this.ruleForm.quantitySpec,//数量规格
                devProductSize:this.ruleForm.devProductSize,
                partName:this.ruleForm.partName,//供应商名称
                countryOfOrigin:this.ruleForm.countryOfOrigin,//原产国
                exportMarket:JSON.parse(JSON.stringify(this.ruleForm.exportMarket)).toString(),//出口市场
                englishInspectionReport:this.ruleForm.englishInspectionReport,//英文验货报告    0: 需要  1：不需要
                productColorType:this.ruleForm.productColorType,//产品颜色类型   0：单颜色  1：多颜色
                sampleColor:this.ruleForm.sampleColor,//来样颜色
                burstingStrengthCarton:this.ruleForm.burstingStrengthCarton,//纸箱爆破强度
                auxiliaryFoamDensity:this.ruleForm.auxiliaryFoamDensity,//辅材泡沫密度
                material: this.ruleForm.material,//产品材质
                process: this.ruleForm.process,//产品工艺
                basicInformation: this.ruleForm.basicInformation,//基础信息
                jpInformation: this.ruleForm.jpInformation,//竞品信息
                thisImprovement:this.ruleForm.thisImprovement,
                sampleImprovedInformation:this.ruleForm.sampleImprovedInformation,//来样改进信息
                originalTypeSkuAlias:this.ruleForm.originalTypeSkuAlias,//sku别名
                reasonForSecondaryDev:this.ruleForm.reasonForSecondaryDev,//二次开发原因
                originalTypeSku:this.ruleForm.originalTypeSku,//sku别名
                state: val,// 1：保存   2：提交
                psas:this.ruleForm.productSizePhotoList.concat(this.ruleForm.sampleOnePhoto || [],this.ruleForm.sampleImprovementPhoto||[],this.ruleForm.changePhoto||[],this.ruleForm.designConstructionDraw || [],
                this.ruleForm.designConstructionFile || [], this.ruleForm.improvedChangeFile || []
                ),
            }
            saveProductSample(params).then(res => {
                if(res.code == 200){
                    this.$message({
                        type: 'success', 
                        message:val == 1 ? this.M2('保存成功') : this.M2('提交成功'),
                        offset:220
                    })
                    this.$router.push({query:{id:res.data}})
                    this.$emit('closeEdit','isEdit',true,true)
                    this.submitDisabled = false
                }
            }).catch(() => {
                this.submitDisabled = false
            })
        },
        resetForm(formName) {
            // this.$refs[formName].resetFields();
            // this.$set(this,'ruleForm',[])
            this.$emit('closeEdit','isEdit',true)
        },
        dataFilter(val) {  
            if (val) { //val存在
                this.suppliers = this.copySuppliers.filter((item) => {
                if (
                    (item.code != null && (!!~item.code.indexOf(val) || !!~item.code.toUpperCase().indexOf(val.toUpperCase()))) 
                    || (item.id && item.id.toString().includes(val))
                ) {
                    return true
                }
                })
            }else { //val为空时，还原数组
                // this.ruleForm.supplierId = ''
                this.suppliers = this.copySuppliers1;
            }
        },
        getVisible(){
            this.suppliers = this.copySuppliers1; 
            this.copySuppliers = this.copySuppliers1;
        },
        clearFromValidate(){
            setTimeout(() => {
                this.$refs['ruleForm'].clearValidate()
            }, 50);
        },
        changePreproductionSample(val){

            this.clearFromValidate()
            if(this.ruleForm.supplierId){
                let list = this.copySuppliers.filter(item => {
                    return item.id == this.ruleForm.supplierId
                })
                if(list.length > 0) {
                    this.$set(this.ruleForm,'supplierName',list[0].supplierAlias)
                }
            }
            //preproductionSample 1否 0 是
           //产前样需同步数据//产品类型(scenarios)、出口市场(exportMarket)、英文验货报告(englishInspectionReport)、 产品颜色类型(productColorType)、来样颜色(sampleColor)、
            //纸箱爆破强度(burstingStrengthCarton)、辅材泡沫密度(auxiliaryFoamDensity)、产品材质(material)、产品工艺(process)、基础信息(basicInformation)、竞品信息(jpInformation)、
            //'产品尺寸图(彩图)(psas 里的数据 fileType、fileName、fileUri、contentType)；
            
            //非产前样
            //2.1： 来样次数大于1
            //产品类型(scenarios)、产品名称(productTitle)、供应商类型(supplierType)、出口市场(exportMarket)、英文验货报告(englishInspectionReport)、 产品颜色类型(productColorType)、
            //来样颜色(sampleColor)、纸箱爆破强度(burstingStrengthCarton)、辅材泡沫密度(auxiliaryFoamDensity)、产品材质(material)、产品工艺(process)、基础信息(basicInformation)、竞品信息(jpInformation)、
            //产品尺寸图(彩图)(psas 里的数据 fileType、fileName、fileUri、contentType)
            
            //2.2： 来样次数小于等于1时
            // productKey 为开发ID：产品类型(scenarios)、产品名称(productTitle)、产品材质(material)、产品工艺(process)、基础信息(basicInformation)、
            //竞品信息(jpInformation)、产品尺寸图(彩图)(psas 里的数据 fileType、fileName、fileUri、contentType)；

            // productKey 为 sku别名：产品名称(productTitle)、产品材质(material)、产品工艺(process)、基础信息(basicInformation)、竞品信息(jpInformation)
            if(!this.ruleForm.quantitySpec || !this.ruleForm.sampleSize){
                return
            }
            if(((this.ruleForm.skuAlias || this.ruleForm.originalTypeSkuAlias) && this.ruleForm.scenarios >= 0 && this.ruleForm.preproductionSample == 1 && this.ruleForm.supplierId) || 
                ((this.ruleForm.skuAlias || this.ruleForm.originalTypeSkuAlias) &&  this.ruleForm.supplierId && this.ruleForm.preproductionSample == 0)
                
            ){
                //开发ID/sku别名+供应商+产品类型+否为产前样
                //开发ID/sku别名+供应商+是为产前样
                this.$confirm(this.M2('是否需要同步最新型号的数据？'), this.M2('提示'), {
                    confirmButtonText: this.M2('确定'),
                    cancelButtonText: this.M2('取消'),
                    type: 'warning',
                    cancelButtonClass: 'btn-custom-cancel',
                }).then(() => {
                    this.$nextTick(res => {
                        this.$refs.selectSupplierId.handleClose()  
                    })
                    let param = {
                        productKey:this.ruleForm.productKey !== 2 ? this.ruleForm.productKey:null,//开发ID/sku别名  -- 调用 /productSample/getProductKey 接口返回的 productKey
                        scenarios: this.ruleForm.scenarios,//产品类型      0：全新开发  1：二次开发产品  2：改进变更产品
                        supplierId: this.ruleForm.supplierId,//供应商id
                        supplierName: this.ruleForm.supplierName,//供应商名字
                        sampleSize: this.ruleForm.sampleSize,//供应商名字
                        quantitySpec: this.ruleForm.quantitySpec,//供应商名字
                        preproductionSample:this.ruleForm.preproductionSample,// 是否为产前样   0 ： 是   1：否
                        originalTypeSkuAlias:this.ruleForm.productKey,//原型号sku别名   与 productKey 不能同时传空
                        originalTypeSku :this.ruleForm.originalTypeSku,//原型号sku别名   与 productKey 不能同时传空
                        sampleNum :this.ruleForm.sampleNum,//原型号sku别名   与 productKey 不能同时传空
                        id:this.$route.query.id,//原型号sku别名   与 productKey 不能同时传空
                    }
                    getPreproductionSample(param).then(res => {
                        if(res.data) {
                            if(val == 1 && this.ruleForm.preproductionSample == 0){
                                this.$set(this.ruleForm,'sampleNum',res.data.sampleNum || this.ruleForm.sampleNum)
                                return
                            }
                            if(this.ruleForm.sampleCondition == 1 || this.ruleForm.scenarios == 2) {
                                this.$set(this.ruleForm,'supplierCode', res.data.supplierCode || this.ruleForm.supplierCode)
                                this.$set(this.ruleForm,'supplierId', res.data.supplierId || this.ruleForm.supplierId)
                            } 
                            if(res.data.supplierId && this.ruleForm.scenarios == 2 && this.ruleForm.sampleCondition == 0){
                                let list = []
                                list = this.copySuppliers.filter(item => {
                                    return item.id == res.data.supplierId
                                })
                                if(list.length > 0) {
                                    if(list[0].regionName && list[0].regionName.includes('国外')){
                                        this.$set(this.ruleForm,'countryOfOrigin',list[0].regionName)
                                    }
                                }  
                            }
                            this.$notify({
                                title: this.M2('消息'),
                                message: this.M2('数据同步成功！'),
                                type: 'success'
                            });
                            //同步彩图
                            if((this.ruleForm.preproductionSample == 1 && (this.ruleForm.productKey && this.ruleForm.productKey.includes('DEV') || this.ruleForm.sampleNum > 1)) || this.ruleForm.preproductionSample == 0){
                                if(res.data.psas){
                                    let list =  res.data.psas.filter(item => {
                                        return item.fileType == 4
                                    })
                                    let params = {
                                        productSampleId:this.$route.query.id,
                                        psas:list
                                    }
                                    saveProductSampleAttachment1(params).then(res1 => {
                                        if(res1.data) {
                                            res1.data.forEach(item => {
                                                item.showImgUrl = `${this.imgUrl}/Small/${item.fileUri}`
                                                item.showBigImgUrl = `${this.imgUrl}/${item.fileUri}`
                                            })
                                            if(res1.data && res1.data.length > 0) {
                                                let list1 = []
                                                list1 = res1.data.filter(item => {
                                                    return item.fileType == 4
                                                })
                                                if(list1 && list1.length > 0){
                                                    this.productSizePhotoList = list1
                                                    this.$set(this.ruleForm,'productSizePhotoList',list1 || [])
                                                }
                                            } 
                                        }
                                    })  
                                }  
                            }
                            this.$set(this.ruleForm,'material',res.data.material || this.ruleForm.material)
                            this.$set(this.ruleForm,'sampleNum',res.data.sampleNum || this.ruleForm.sampleNum)
                            this.$set(this.ruleForm,'process',res.data.process || this.ruleForm.process)
                            this.$set(this.ruleForm,'basicInformation',res.data.basicInformation ? res.data.basicInformation.replaceAll('\\n','\n') : this.ruleForm.basicInformation)
                            this.$set(this.ruleForm,'jpInformation',res.data.jpInformation ? res.data.jpInformation.replaceAll('\\n','\n') : this.ruleForm.jpInformation)
                            if(this.ruleForm.preproductionSample == 1 && this.ruleForm.sampleNum < 2 && (this.ruleForm.productKey && this.ruleForm.productKey.includes('DEV'))){
                                this.$set(this.ruleForm,'productTitle',res.data.productTitle || this.ruleForm.productTitle)
                                return 
                            }else {
                                this.$set(this.ruleForm,'scenarios',res.data.scenarios || res.data.scenarios == 0 ? res.data.scenarios : this.ruleForm.scenarios)
                                if(this.ruleForm.preproductionSample == 1 && this.ruleForm.sampleNum < 2 && (this.ruleForm.productKey && this.ruleForm.productKey.includes('DEV'))){
                                    this.$set(this.ruleForm,'productTitle',res.data.productTitle || this.ruleForm.productTitle)
                                    return
                                }
                                if(res.data.exportMarket) {
                                    res.data.exportMarket = res.data.exportMarket.split(',')
                                }else {
                                    res.data.exportMarket = [] 
                                }
                                if(res.data.exportMarket && res.data.exportMarket.length > 0) {
                                    this.$set(this.ruleForm,'exportMarket',res.data.exportMarket)
                                    this.exportMarket = res.data.exportMarket
                                }else {
                                    this.$set(this.ruleForm,'exportMarket',this.ruleForm.exportMarket)
                                    this.exportMarket = this.ruleForm.exportMarket
                                }
                                this.$set(this.ruleForm,'productTitle',res.data.productTitle || this.ruleForm.productTitle)
                                this.$set(this.ruleForm,'englishInspectionReport',res.data.englishInspectionReport || res.data.englishInspectionReport == 0 ? res.data.englishInspectionReport : this.ruleForm.englishInspectionReport)
                                this.$set(this.ruleForm,'productColorType',res.data.productColorType || this.ruleForm.productColorType)
                                this.$set(this.ruleForm,'sampleColor',res.data.sampleColor || this.ruleForm.sampleColor)
                                this.$set(this.ruleForm,'burstingStrengthCarton',res.data.burstingStrengthCarton || this.ruleForm.burstingStrengthCarton)
                                this.$set(this.ruleForm,'auxiliaryFoamDensity',res.data.auxiliaryFoamDensity || this.ruleForm.auxiliaryFoamDensity)
                                if(this.ruleForm.preproductionSample == 0 && this.ruleForm.sampleNum > 1){                              
                                    this.$set(this.ruleForm,'supplierType',res.data.supplierType || res.data.supplierType == 0 ? res.data.supplierType : this.ruleForm.supplierType)
                                    return
                                }
                            }
                        }
                    })
                }).catch(() => {
                    this.$nextTick(res => {
                        this.$refs.selectSupplierId.handleClose()  
                    })
                    return
                });
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.bule-button {
    background-color: #0f7535;
    color: #fff;
    &:hover{
        opacity: 0.8;
    }
}
::v-deep.col-r{
    position: relative;
    .el-icon-question1 {
        background-image: url('~@/assets/svg/interpretation.svg');
        cursor: pointer;
        user-select: none;
        background-size: 15px;
        display: inline-block;
        height: 15px;
        width: 15px;
        position: absolute;
        top: 3px;
        left: 72px;
    }
    .el-icon-question {
        position: absolute;
        top: 3px;
        left: 72px;
        font-size: 18px;
        cursor: pointer;
    }
    .el-icon-success {
        position: absolute;
        right: -22px;
        top: 6px;
        font-size: 18px;
        cursor: pointer;
        color: #0f7535;
    }
    .el-icon-error{
        position: absolute;
        right: -22px;
        top: 6px;
        font-size: 18px;
        cursor: pointer;
        color: #ae2f2f;
    }
}
.a-link {
    color: #3366cc;
    position: absolute;
    right: 5px;
    bottom: 19px;
    cursor: pointer;
    padding: 2px 5px;
    &:hover {
        background-color: #3366cc;
        color: #fff;
    }
}
.fover-click{
    color: #3366cc;
   text-align: right;
    cursor: pointer;
    padding: 1px 2px;
    font-size: 12px;
    float: right;
    display: inline-block;
    height: 20px;
    line-height: 20px;
    margin-top: 2px;
    &:hover {
        background-color: #3366cc;
        color: #fff;
    }
}
.bottomButton{
    width: 100%;
    height: 30px;   
    display: flex;
    justify-content: flex-end;
}
    .targetPriceWbox{
        display: flex;
        .targetPriceBox{
        width: 300px;
        margin-right: 10px;
    }
} 
::v-deep.numberInput{   
    width: 475px;
    .el-input__inner{
        text-align: left;
    }
}  
::v-deep.inputBox{
    width: 300px;
    display: inline-block;
    .el-input-number {
        width: 150px;
        .el-input__inner{
            text-align: left;
            color: black !important;
            border-top-right-radius: 0px !important;
            border-bottom-right-radius: 0px !important;
        }
    }
} 
.inputUnit{
    text-align: center;
    line-height: 28px;
    background-color: #F5F7FA;
    display: inline-block;
    height: 28px;
    width: 105px;
    border: 1px solid #E4E7ED;
    color: black;
    font-size: 12px;
    position: relative;
    top: 1px;
    border-top-right-radius: 4px ;
    border-bottom-right-radius: 4px ;
}
.loading-sty {
    width: 130px;
    height: 130px;
    display: block;
}
::v-deep.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover{
        border-color: #409EFF;
    }
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 45px;
    color: #8c939d;
    width: 130px;
    height: 130px;
    line-height: 130px;
    text-align: center;
    font-weight: bold;
}
.avatar {
    width: 130px;
    height: 130px;
    display: block;
}
.checkBoxAll{
    display: flex;
    .checkboxAlltext{
        display: inline-block;
        margin-right: 20px;
    }
    .chengboxMoreBox{
        width: 500px;
        flex-shrink: 0;
        display: inline-block;
    }
}
.checkBoxAll1{
    display: flex;
    padding-top: 9px;
    .checkboxAlltext1{
        display: inline-block;
        margin-right: 20px;
        height: 23px;
    }
    .chengboxMoreBox1{
        width: 1250px;
        display: inline-block;
    }
}
</style>