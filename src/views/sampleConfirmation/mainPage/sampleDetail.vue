<template>
    <div class="bg-gray" v-if="renderDom" v-permission="'ERP.Product.ProductSample.View'">
        <div class="header-title">
            <div><span class="header-text">{{M2('样品确认单')}}：</span><span class="header-text" style="font-weight: bold;">{{$route.query.id}}</span></div>
            <div class="right-button"> 
                <div class="green-div">{{M2('状态')}}：{{mainPageList ? M2(mainPageList.stateValue) : ''}}</div>
                <div class="green-div">{{M2('申请人')}}:{{mainPageList ? M2(mainPageList.applicantName): ''}}</div>
                <div class="green-div">{{M2('样品员')}}：{{mainPageList ? M2(mainPageList.sampleValidatorName):''}}</div>
                <div class="gray-div">{{M2('可验样日期')}}：{{showTimeL(mainPageList)}}</div>
            </div>
        </div>
        <div class='tabContainer'>
            <el-card class="sample-basis">
                <div slot="header" class="clearfix">
                    <div>{{M2('样品基础数据')}}
                        <div v-if="mainPageList.state == 1 || !mainPageList.state"  v-permission="'ERP.Product.ProductSample.SaveProductSample'">
                            <div class="edit-position" @click="controlsEdit.isEdit = !controlsEdit.isEdit" v-if="controlsEdit.isEdit">
                                <span><i class="icon-edit"></i>{{M2('编辑')}}</span>
                            </div>
                        </div>
                    </div>   
                </div>
                <div v-if="controlsEdit.isEdit">
                    <el-row>
                        <el-col :span="10">
                            <span class="imageMainbox">
                                <el-popover
                                    placement="bottom"
                                    width="627"
                                    trigger="click">
                                    <el-table :data="gridData" border :header-cell-style="{background:'#f5f7fa',color:'#333'}">
                                        <el-table-column width="200" property="productType" :label="M2('产品类型')">
                                            <template slot-scope="scope">
                                                {{M2(scope.row.productType)}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column width="400" property="Interpretation" :label="M2('释义')">
                                            <template slot-scope="scope">
                                                {{M2(scope.row.Interpretation)}}
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <i class="el-icon-question1" slot="reference"></i>
                                </el-popover>
                              {{M2('产品类型')}}: </span>
                            <span class="imageMainboxText">{{M2(mainPageList.scenariosStr)}}</span>
                        </el-col>
                        <el-col :span="10">
                            <span class="imageMainbox">
                                <el-popover
                                    placement="bottom"
                                    width="627"
                                    trigger="click">
                                    <el-table :data="gridData3" border  :header-cell-style="{background:'#f5f7fa',color:'#333'}">
                                        <el-table-column width="200" property="productType" :label="M2('样品情况')">
                                            <template slot-scope="scope">
                                                {{M2(scope.row.productType)}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column width="400" property="Interpretation" :label="M2('释义')">
                                            <template slot-scope="scope">
                                                {{M2(scope.row.Interpretation)}}
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <i class="el-icon-question1" slot="reference"></i>
                                </el-popover>
                                {{M2('是否为产前样')}}： </span>
                            <span class="imageMainboxText">{{M2(mainPageList.preproductionSampleStr)}}</span>
                        </el-col>
                    </el-row>
                    <el-row class="textSpeaing">
                        <el-col :span="10">
                            <span class="imageMainbox">
                                <el-popover
                                    placement="bottom"
                                    width="627"
                                    trigger="click">
                                    <el-table :data="gridData1" border  :header-cell-style="{background:'#f5f7fa',color:'#333'}">
                                        <el-table-column width="200" property="productType" :label="M2('样品情况')">
                                            <template slot-scope="scope">
                                                {{M2(scope.row.productType)}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column width="400" property="Interpretation" :label="M2('释义')" >
                                            <template slot-scope="scope">
                                                {{M2(scope.row.Interpretation)}}
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <i class="el-icon-question1" slot="reference"></i>
                                </el-popover>
                                {{M2('样品情况')}}： </span>
                            <span class="imageMainboxText">{{M2(mainPageList.sampleConditionStr)}}</span>
                        </el-col>
                        <el-col :span="10" v-if="mainPageList.sampleCondition == 0">
                            <span class="imageMainbox">{{M2('来样次数')}}： </span>
                            <span class="imageMainboxText">{{mainPageList.sampleNum || 1}}</span>
                        </el-col>
                    </el-row>
                    <el-row class="textSpeaing">
                        <el-col :span="10" v-if="mainPageList.scenarios != 2">
                            <span class="imageMainbox">{{M2('开发ID/sku别名')}}： </span>
                            <span class="imageMainboxText">{{mainPageList.productKey && mainPageList.productKey.includes('DEV') ?mainPageList.productKey:  mainPageList.skuAlias}}</span>
                        </el-col>
                        <el-col :span="10" v-if="mainPageList.scenarios == 2">
                            <span class="imageMainbox">{{M2('原sku别名')}}： </span>
                            <span class="imageMainboxText">{{mainPageList.skuAlias }}</span>
                        </el-col>
                    </el-row>
                    <el-row class="textSpeaing" v-if="mainPageList.sampleCondition == 0">
                        <el-col :span="10">
                            <span class="imageMainbox">{{M2('样品尺码')}}： </span>
                            <span class="imageMainboxText">{{mainPageList.sampleSize}}</span>
                        </el-col>
                        <el-col :span="10" >
                            <span class="imageMainbox">{{M2('数量规格')}}： </span>
                            <span class="imageMainboxText">{{mainPageList.quantitySpec }}</span>
                        </el-col>
                    </el-row>

                    <el-row class="textSpeaing">
                        <el-col :span="10">
                            <div class="boxFlex">
                                <span class="imageMainbox">{{M2('产品名称')}}： </span>
                                <span class="imageMainboxText">{{mainPageList.productTitle}}</span>
                            </div> 
                        </el-col>
                        <el-col :span="10" v-if="mainPageList.scenarios != 2 && mainPageList.sampleCondition == 0">
                            <div class="boxFlex">
                                <span class="imageMainbox">{{M2('供应商类型')}}： </span>
                                <div class="imageMainboxText" >{{mainPageList.supplierType == 0 ? M2('旧') :mainPageList.supplierType ? M2('新') : ''}}</div>
                            </div>
                        </el-col>
                        <el-col :span="10" style="margin-top:30px">
                            <div class="boxFlex">
                                <span class="imageMainbox">{{M2('供应商名称')}}： </span>
                                <div class="imageMainboxText" >{{mainPageList.supplierName}}</div>
                            </div>       
                        </el-col>
                        <el-col :span="10" style="margin-top:30px"  v-if="mainPageList.scenarios == 2 && mainPageList.sampleCondition == 0 && mainPageList.countryOfOrigin">
                            <div class="boxFlex">
                                <span class="imageMainbox">{{M2('原产国')}}： </span>
                                <div class="imageMainboxText" >{{mainPageList.countryOfOrigin}}</div>
                            </div>       
                        </el-col>
                        <el-col :span="10"  style="margin-top:30px">
                            <div class="boxFlex">
                                <span class="imageMainbox">{{M2('验样场地')}}： </span>
                                <div class="imageMainboxText" >{{M2(mainPageList.testSiteStr)}}</div>
                            </div>
                        </el-col>
                        <el-col :span="10"  style="margin-top:30px" v-if="mainPageList.testSite == 1">
                            <div class="boxFlex">
                                <span class="imageMainbox">{{M2('预计验样日期')}}： </span>
                                <div class="imageMainboxText" >{{mainPageList.estimatedDateInspection}}</div>
                            </div>
                        </el-col>
                        <el-col :span="10" style="margin-top:30px"  v-if="mainPageList.sampleCondition == 1">
                            <div class="boxFlex">
                                <span class="imageMainbox">{{M2('部件名称')}}： </span>
                                <div class="imageMainboxText" >{{mainPageList.partName}}</div>
                            </div>
                        </el-col>
                        <el-col :span="10" style="margin-top:30px" v-if="mainPageList.sampleCondition == 1 || (mainPageList.sampleCondition == 0 && mainPageList.scenarios == 2)">
                            <div class="boxFlex">
                                <span class="imageMainbox">{{M2('验货报告需求')}}： </span>
                                <div class="imageMainboxText" >{{mainPageList.reportRequirementStr}}</div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row class="textSpeaing">
                        <el-col :span="10">
                            <div class="boxFlex">
                                <span class="imageMainbox">{{M2('出口市场')}}： </span>
                                <div class="imageMainboxText" >{{mainPageList.exportMarketStr ? M2(mainPageList.exportMarketStr.replaceAll('欧盟,法,意,西,德,','欧盟')) : ''}}</div>
                            </div>
                        </el-col>
                        <el-col :span="10" v-if="showSampleNum">
                            <div class="boxFlex">
                                <span class="imageMainbox">{{M2('英文验货报告')}}： </span>
                                <div class="imageMainboxText" >{{M2(mainPageList.englishInspectionReportStr)}}</div>
                            </div>       
                        </el-col>
                    </el-row>
                    <el-row class="textSpeaing" v-if="mainPageList.scenarios == 1 && mainPageList.sampleCondition == 0">
                        <el-col :span="10">
                            <div class="boxFlex">
                                <span class="imageMainbox">{{M2('原型号sku')}}： </span>
                                <div class="imageMainboxText" >{{mainPageList.originalTypeSkuAlias}}</div>
                            </div>
                        </el-col>
                        <el-col :span="10">
                            <div class="boxFlex">
                                <span class="imageMainbox">{{M2('二次开发原因')}}： </span>
                                <div class="imageMainboxText" >{{mainPageList.reasonForSecondaryDev}}</div>
                            </div>       
                        </el-col>
                    </el-row>
                    <div v-if="showSampleNum">
                        <el-row class="textSpeaing">
                            <el-col :span="10">
                                <div class="boxFlex">
                                    <span class="imageMainbox">{{M2('产品颜色类型')}}： </span>
                                    <div class="imageMainboxText" >{{M2(mainPageList.productColorTypeStr)}}</div>
                                </div>
                            </el-col>
                            <el-col :span="10">
                                <div class="boxFlex">
                                    <span class="imageMainbox">{{M2('样品颜色')}}： </span>
                                    <div class="imageMainboxText" >{{M2(mainPageList.sampleColor)}}</div>
                                </div>       
                            </el-col>
                        </el-row>
                        <el-row class="textSpeaing">
                            <el-col :span="10">
                                <div class="boxFlex">
                                    <span class="imageMainbox">{{M2('纸箱爆破强度')}}： </span>
                                    <div class="imageMainboxText" >{{mainPageList.burstingStrengthCarton ? mainPageList.burstingStrengthCarton + ' PSI' : ''}}</div>
                                </div>
                            </el-col>
                            <el-col :span="10">
                                <div class="boxFlex">
                                    <span class="imageMainbox">{{M2('辅材泡沫密度')}}： </span>
                                    <div class="imageMainboxText" >{{mainPageList.auxiliaryFoamDensity ? mainPageList.auxiliaryFoamDensity + ' kg/m³' : ''}}</div>
                                </div>       
                            </el-col>
                        </el-row>
                    </div>
                    <el-row class="textSpeaing">
                        <el-col :span="10">
                            <div class="boxFlex">
                                <span class="imageMainbox">{{M2('产品材质')}}： </span>
                                <div class="imageMainboxText" >{{mainPageList.material}}</div>
                            </div>
                        </el-col>
                        <el-col :span="10">
                            <div class="boxFlex">
                                <span class="imageMainbox">{{M2('产品工艺')}}： </span>
                                <div class="imageMainboxText" >{{mainPageList.process}}</div>
                            </div>       
                        </el-col>
                    </el-row>
                    <div v-if="mainPageList.scenarios != 2 && mainPageList.sampleCondition == 0"> 
                        <el-row class="textSpeaing">
                            <el-col :span="10">
                                <div class="boxFlex">
                                    <span class="imageMainbox">{{M2('基础信息')}}： </span>
                                    <div class="imageMainboxText" style="white-space:pre-wrap">{{mainPageList.basicInformation}}</div>
                                </div>
                            </el-col>
                            <el-col :span="10">
                                <div class="boxFlex">
                                    <span class="imageMainbox">{{M2('竞品信息')}}： </span>
                                    <div class="imageMainboxText" style="white-space:pre-wrap">{{mainPageList.jpInformation}}</div>
                                </div>       
                            </el-col>
                        </el-row>
                        <el-row class="textSpeaing">
                            <el-col :span="20"  v-if="mainPageList.sampleNum > 1">
                                <div class="boxFlex">
                                    <span class="imageMainbox">{{M2('来样改进信息')}}： </span>
                                    <div class="imageMainboxText" style="white-space:pre-wrap">{{mainPageList.sampleImprovedInformation}}</div>
                                </div>       
                            </el-col>
                        </el-row>
                        <el-row class="textSpeaing">
                            <el-col :span="20"  >
                                <div class="boxFlex">
                                    <span class="imageMainbox">{{M2('产品尺寸图（彩图）')}}： </span>
                                    <div class="imageMainboxText" >
                                        <div class="image-flex">
                                            <el-image  v-for="item in mainPageList.productSizePhotoList" :key="item.url" :src="item.showImgUrl" :preview-src-list="[item.showBigImgUrl]">
                                                <div slot="error" class="image-slot" style="margin-top:35px;margin-left:5px;color:#cccccc">
                                                    <i class="el-icon-picture-outline">{{M2('加载失败')}}</i>
                                                </div>
                                            </el-image>
                                        </div>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div v-else>
                    <el-row class="textSpeaing" >
                        <el-col :span="20">
                            <div class="boxFlex">
                                <span class="imageMainbox" v-if="mainPageList.sampleCondition == 0">
                                    {{M2('本次改进/变更点')}}:
                                </span> 
                                <span class="imageMainbox" v-else>
                                    {{M2('部件变更点')}}:
                                </span> 
                                <div class="imageMainboxText" >{{mainPageList.thisImprovement}}</div>
                            </div>       
                        </el-col>
                    </el-row>
                     <el-row class="textSpeaing" v-if="mainPageList.sampleCondition == 0">
                        <el-col :span="20"  >
                            <div class="boxFlex">
                                <span class="imageMainbox">{{M2('本次改进/变更点-文件')}}： </span>
                                <div class="imageMainboxText" >
                                    <div>
                                        <div v-for="item in mainPageList.improvedChangeFile" :key="item.id">
                                            <el-link type="primary" class="a-link" @click="clickFileName(item.fileUri)">{{item.fileName}}</el-link >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>                    
                    </div>
                    <el-row class="textSpeaing" v-if="mainPageList.testSite == 0 && mainPageList.sampleCondition == 0">
                        <el-col :span="20"  >
                            <div class="boxFlex">
                                <span class="imageMainbox"> {{M2('来样图片')}}： </span>
                                <div class="imageMainboxText" >
                                    <div class="image-flex">
                                        <el-image v-for="(item) in mainPageList.sampleImprovementPhoto" :key="item.id + Math.random()" :src="item.showImgUrl" :preview-src-list="[item.showBigImgUrl]"></el-image>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row class="textSpeaing" v-if="mainPageList.scenarios == 2 || mainPageList.sampleCondition == 1">
                        <el-col :span="20"  >
                            <div class="boxFlex">
                                <span class="imageMainbox">{{M2('变更图片')}}： </span>
                                <div class="imageMainboxText" >
                                    <div class="image-flex">
                                        <el-image v-for="item in mainPageList.changePhoto" :key="item.url" :src="item.showImgUrl" :preview-src-list="[item.showBigImgUrl]"></el-image>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row class="textSpeaing" v-if="mainPageList.sampleNum > 1">
                        <el-col :span="20"  >
                            <div class="boxFlex">
                                <span class="imageMainbox">{{M2('来样改进信息图片')}}： </span>
                                <div class="imageMainboxText" >
                                    <div class="image-flex">
                                        <el-image  v-for="item in mainPageList.sampleOnePhoto" :key="item.url" :src="item.showImgUrl" :preview-src-list="[item.showBigImgUrl]"></el-image>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row class="textSpeaing">
                        <el-col :span="20"  >
                            <div class="boxFlex">
                                <span class="imageMainbox">{{M2('设计施工图片')}}： </span>
                                <div class="imageMainboxText" >
                                    <div class="image-flex">
                                        <el-image  v-for="item in mainPageList.designConstructionDraw" :key="item.url" :src="item.showImgUrl" :preview-src-list="[item.showBigImgUrl]"></el-image>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row class="textSpeaing">
                        <el-col :span="20"  >
                            <div class="boxFlex">
                                <span class="imageMainbox">{{M2('设计施工文件')}}： </span>
                                <div class="imageMainboxText" >
                                    <div>
                                        <div v-for="item in mainPageList.designConstructionFile" :key="item.id">
                                            <el-link type="primary" class="a-link" @click="clickFileName(item.fileUri)">{{item.fileName}}</el-link >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div v-else>
                    <sample-basic-data-edit @closeEdit='updeEditPage' :ruleForm='mainPageList' :routeParam="routeParam"></sample-basic-data-edit>
                </div>
            </el-card>
            <el-card>
                <div slot="header" class="clearfix">
                    <div>{{M2('样品确认数据')}} <!-- -->
                        <div v-if="mainPageList.state == 3 || mainPageList.state == 4"  v-permission="'ERP.Product.ProductSample.ApprovalSampleMemo'">
                            <div class="edit-position" @click="controlsEdit.isEdit1 = !controlsEdit.isEdit1" v-if="controlsEdit.isEdit1">
                                <span><i class="icon-edit"></i>{{M2('编辑')}}</span>
                            </div>
                        </div>
                    </div>   
                </div>
                <div v-if="controlsEdit.isEdit1">
                    <el-row class="textSpeaing">
                        <el-col :span="10" :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
                            <span class="imageMainbox"> {{M2('样品确认时间')}} ： </span>
                            <span class="imageMainboxText">{{mainPageList.sampleConfirmationTime}}</span>
                        </el-col>
                    </el-row>
                    <el-row class="textSpeaing">
                        <el-col :span="10" :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
                            <span class="imageMainbox">{{M2('样品确认结果')}}： </span>
                            <span class="imageMainboxText">{{M2(mainPageList.sampleConfirmationResultStr)}}</span>
                        </el-col>
                    </el-row>
                </div>
                <div v-else>
                    <el-row class="textSpeaing">
                        <el-col :span="10" :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
                            <span class="imageMainbox"><span style="color:red">*</span> {{M2('样品确认时间')}}： </span>
                            <span class="imageMainboxText">
                                <el-date-picker
                                    format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd"
                                    size="mini"
                                    :picker-options="setDisabled"
                                    v-model="mainPageList.sampleConfirmationTime"
                                    type="date"
                                    placeholder="选择日期"
                                    @change="changeSampleConfirmation"
                                    >
                                </el-date-picker>
                            </span>
                            <div  v-if="showRedRequire">
                                <span class="imageMainbox"></span>
                                <span class="imageMainboxText" style="color:red">{{M2('请填写样品确认时间！')}}</span>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row  class="textSpeaing">
                        <el-col :span="10" :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
                            <span class="imageMainbox"><span style="color:red">*</span>{{M2('样品确认结果')}}： </span>
                            <span class="imageMainboxText">
                                <el-select 
                                    v-model="mainPageList.sampleConfirmationResult"
                                    size="mini"
                                    @change="changeSampleResult"
                                    >
                                    <el-option 
                                        v-for="item in devSign"                        
                                        :key="item.key"
                                        :label="M2(item.label)"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </span>
                            <div v-if="showRedRequire1">
                                <span class="imageMainbox"></span>
                                <span class="imageMainboxText" style="color:red">{{M2('请填写样品确认结果！')}}</span>
                            </div>
                        </el-col>
                    </el-row>
                    <div class="bottomButton">
                        <el-button type="primary" @click="submitForm('isEdit1',true,1)" size="mini">{{M2('提交')}}</el-button>
                        <el-button @click="updeEditPage('isEdit1',true)"  size="mini">{{M2('取消')}}</el-button>
                    </div>
                </div>
            </el-card>
            <el-card>
                <div slot="header" class="clearfix">
                    <div>{{M2('样品确认文件')}} <!-- -->
                        <div v-if="mainPageList.state == 4" v-permission="'ERP.Product.ProductSample.SavaProductSampleRes'">
                            <div class="edit-position" @click="controlsEdit.isEdit2 = !controlsEdit.isEdit2" v-if="controlsEdit.isEdit2">
                                <span><i class="icon-edit"></i>{{M2('编辑')}}</span>
                            </div>
                        </div>
                    </div>   
                </div>
                <div v-if="controlsEdit.isEdit2">
                    <el-row class="textSpeaing" v-if="mainPageList.sampleConfirmationResult == 5 || mainPageList.sampleConfirmationResult == 6">
                        <el-col :span="20">
                            <span class="imageMainbox">{{M2('初版验货报告')}}： </span>
                            <span class="imageMainboxText">
                                <div v-for="item in mainPageList.inspectionReport" :key="item.id">
                                    <el-link type="primary" class="a-link" @click="clickFileName(item.fileUri)">{{item.fileName}}</el-link >
                                </div>
                            </span>
                        </el-col>
                    </el-row>
                    <el-row class="textSpeaing" v-if="mainPageList.sampleConfirmationResult == 7 || mainPageList.sampleConfirmationResult == 6">              
                        <el-col :span="20">
                            <div class="boxFlex">
                                <span class="imageMainbox"> {{M2('问题描述')}}： </span>
                                <span class="imageMainboxText" style="white-space: pre-wrap;">{{mainPageList.problemDesc}}</span>
                            </div>
                        </el-col>
                        <el-col :span="20" >
                            <div style="display:flex">
                                <span class="imageMainbox">{{M2('文件')}}： </span>
                                <span class="imageMainboxText">
                                    <div v-for="item in mainPageList.sampleQuestionFile" :key="item.id">
                                        <el-link type="primary" class="a-link" @click="clickFileName(item.fileUri)">{{item.fileName}}</el-link >
                                    </div>
                                </span>
                            </div>
                           
                        </el-col>
                        <el-col :span="20">
                            <span class="imageMainbox">{{M2('问题图片')}}： </span>
                            <span class="imageMainboxText">
                                <div class="boxFlex">
                                    <div class="image-flex">
                                        <el-image v-for="(item) in mainPageList.sampleQuestionPhoto" :key="item.id + Math.random()" :src="item.showImgUrl" :preview-src-list="[item.showBigImgUrl]"></el-image>
                                    </div>
                                </div>
                            </span>
                        </el-col>
                        <el-col :span="20" v-if="mainPageList.sampleConfirmationResult == 7">
                            <div style="display:flex">
                                <span class="imageMainbox">{{M2('不合格原因')}}： </span>
                                <span class="imageMainboxText">
                                    {{mainPageList.reasonsDisqualificationStr}}
                                </span>
                            </div>
                        </el-col>
                    </el-row> 
                </div>
                <div v-else>
                    <el-row class="textSpeaing" v-if="mainPageList.sampleConfirmationResult == 5 || mainPageList.sampleConfirmationResult == 6">
                        <el-col :span="10" :xs="15" :sm="15" :md="15" :lg="15" :xl="15" style="display:flex">
                            <span class="imageMainbox"><span style="color:red">*</span> {{M2('初版验货报告')}}： </span>
                            <span class="imageMainboxText" style="width:100%;margin-bottom:10px">
                               <el-upload
                                    ref="uploadRef1"
                                    class="upload-demo"
                                    :action="action"
                                    accept=".doc,.docx,.pdf,.xlsx,.csv,.xls"
                                    :on-success="uploadFileSuccess1"
                                    :on-remove="handleRemove1"
                                    :before-remove="beforeRemove"
                                    multiple
                                    :data="{fileType:2,productSampleId:$route.query.id || null}"
                                    :limit="1"
                                    :with-credentials='true'
                                    :on-exceed="handleExceed1"
                                    :file-list="mainPageList.inspectionReport">
                                    <el-button size="small" type="primary">{{M2('点击上传')}}</el-button>
                                    <div slot="tip" class="el-upload__tip">
                                        <div>{{M2('请上传excel、word、pdf类型的文件，最多上传1个文件')}}</div>
                                        <div  v-if="showRedRequire2">
                                            <span class="imageMainboxText" style="color:red">{{M2('请上传初版验货报告！')}}</span>
                                        </div>
                                    </div>
                                </el-upload>
                            </span>
                        </el-col>  
                    </el-row>
                    <div v-if="mainPageList.sampleConfirmationResult == 7 || mainPageList.sampleConfirmationResult == 6">
                        <el-row class="textSpeaing" >
                            <el-col :span="10" :xs="20" :sm="20" :md="20" :lg="20" :xl="10" style="display:flex">
                                <span class="imageMainbox"> {{M2('问题描述')}}： </span>
                                <span class="imageMainboxText" style="width:100%;margin-bottom:10px">
                                    <el-input type="textarea" v-model="mainPageList.problemDesc"></el-input>
                                </span>
                            </el-col>  
                        </el-row>
                        <el-row class="textSpeaing">
                            <el-col :span="10" :xs="15" :sm="15" :md="15" :lg="15" :xl="15" style="display:flex">
                                <span class="imageMainbox"> {{M2('文件')}}： </span>
                                <span class="imageMainboxText" style="width:100%;margin-bottom:10px">
                                    <el-upload
                                        ref="uploadRef"
                                        class="upload-demo"
                                        :action="action"
                                        accept=".doc,.docx,.pdf,.xlsx,.csv,.xls"
                                        :on-success="uploadFileSuccess"
                                        :on-remove="handleRemove"
                                        :before-remove="beforeRemove"
                                        multiple
                                        :data="{fileType:5,productSampleId:$route.query.id || null}"
                                        :limit="5"
                                        :with-credentials='true'
                                        :on-exceed="handleExceed"
                                        :file-list="mainPageList.sampleQuestionFile">
                                        <el-button size="small" type="primary">{{M2('点击上传')}}</el-button>
                                        <div slot="tip" class="el-upload__tip">{{M2('请上传excel、word、pdf类型的文件，最多上传5个文件')}}</div>
                                    </el-upload>
                                </span>
                            </el-col>  
                        </el-row>
                        
                        <el-row class="textSpeaing">
                            <el-col :span="10" :xs="20" :sm="20" :md="20" :lg="20" :xl="20" style="display:flex">
                                <span class="imageMainbox">{{M2('问题图片')}}： </span>
                                <span class="imageMainboxText" >
                                    <imgUpload :fileType='6' :showButton="false" :value='sampleQuestionPhoto' :limit="20" @upDateFile="upDateFile" :imgUrl="imgUrl" ruleName="sampleQuestionPhoto"></imgUpload> 
                                </span>
                            </el-col>  
                        </el-row>
                        <el-row  class="textSpeaing" v-if="mainPageList.sampleConfirmationResult == 7">
                            <el-col :span="10" :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
                                <span class="imageMainbox"><span style="color:red">*</span>{{M2('不合格原因')}}： </span>
                                <span class="imageMainboxText">
                                    <el-select 
                                        v-model="mainPageList.reasonsDisqualificationId"
                                        size="mini"
                                        >
                                        <el-option 
                                            v-for="item in reasonsDisqualificationIdList"                        
                                            :key="item.t1"
                                            :label="M2(item.t2)"
                                            :value="item.t1"
                                        >
                                        </el-option>
                                    </el-select>
                                </span>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="bottomButton">
                        <el-button type="primary" @click="submitForm('isEdit2',true,2)" size="mini">{{M2('提交')}}</el-button>
                        <el-button @click="updeEditPage('isEdit2',true)"  size="mini">{{M2('取消')}}</el-button>
                    </div>
                </div>
            </el-card>
            <el-card>
                <div slot="header" class="clearfix">
                    <div>{{M2('关联单据')}}</div>   
                </div>
                <div v-if="controlsEdit.isEdit3">
                    <el-table :empty-text="M2('暂无数据')" :data="gridData2" border max-height="500" :header-cell-style="{background:'#f5f7fa',color:'#606266'}">
                        <el-table-column  property="productType" :label="M2('序号')"  type="index"></el-table-column>
                        <el-table-column  property="id" :label="M2('单据')">
                            <template slot-scope="scope">
                                <div @click="routerMove(scope.row.id)" class="fileHoverShow">
                                    {{scope.row.id}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column  property="productTitle" :label="M2('样品名称')"></el-table-column>
                        <el-table-column  property="sampleConditionStr" :label="M2('样品情况')"></el-table-column>
                        <el-table-column  property="scenariosStr" :label="M2('产品类型')"></el-table-column>
                        <el-table-column  property="sampleNum"  :label="M2('来样次数')"></el-table-column>
                        <el-table-column  property="stateValue" :label="M2('当前状态')"></el-table-column>
                        <el-table-column  property="applicationTime" :label="M2('可验样日期')">
                            <template slot-scope="scope">
                                <div>{{showTimeL(scope.row)}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column  property="completionTime" :label="M2('完成时间')">
                            <template slot-scope="scope">
                                <div>{{scope.row.completionTime ? $moment(scope.row.completionTime).format("YYYY-MM-DD HH:mm:ss") : '--'}}</div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-card>
        </div>
        <div style="display:flex;">
            <el-drawer
                :title="M2('修改日志')"
                :visible.sync="dialogVisible"
                size="641px"
                :modal="false"
                direction="ltr"
                class="dialog-main"
                z-index="9999"
                :show-close="false"
                @close="closeUploadDialog()"
                >
                <remarksNew :remarksParam='remarksParam' ref="remarksNew" v-if="showTenth" height='67vh'></remarksNew>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="closeUploadDialog()" size="mini">{{M2('关 闭')}}</el-button>
                </span>
            </el-drawer>
            <i class="el-icon-s-unfold" :title="M2('展开日志')" @click="openRecordDialog()" v-if="$route.query.id"></i>
            <i class="el-icon-s-fold" :title="M2('收缩日志')" @click="closeUploadDialog()" v-if="dialogVisible"></i>      
        </div>
    </div>
</template>
<script>
import { GetFileServiceUrl,judgePorduction,addMask} from '@/utils/tools.js'
import { queryProductSampleById,getFilePath,saveProductSampleAttachment,approvalSampleMemo,getRelevanceProductSample,savaProductSampleRes,hasPermissions,getProductSampleFromProductDev,CFG_ProductSample_ReasonsDisqualification } from '@/api/user.js'
var applicationTime = ''
export default {
    name:'sampleDetail',
    components:{
        remarksNew:() => import('@/components/remarksNew.vue'),//日志页面
        imgUpload:() => import('@/components/common/commonUploadImg'),
        sampleBasicDataEdit:() => import('@/components/sampleConfirmation/sampleBasicDataEdit'),//产品编辑页
    },
    data(){
        return {
            dialogVisible:false,
            renderDom:false,
            showRedRequire:false,
            showRedRequire1:false,
            showRedRequire2:false,
            showfileSample:false,
            imgUrl:'',
            showTenth:false,
            sampleQuestionPhoto:[],
            reasonsDisqualificationIdList:[],
            gridData2:[],
            devSign:[
                {
                    label: '合格',
                    key: 1,
                    value:5
                },
                {
                    label: '改进后通过(产前样)',
                    key: 2,
                    value:6
                },    
                {
                    label: '不合格',
                    key: 3,
                    value:7
                }, 
            ],
            mainPageList:{},
            controlsEdit:{
                isEdit:true,
                isEdit1:true, 
                isEdit2:true, 
                isEdit3:true, 
            },
            setDisabled: {
                 disabledDate(time) {
                    if(applicationTime){
                        return time.getTime() > Date.now() || time.getTime() <= new Date(applicationTime).getTime() - 8.64e7 ;  // 可选历史天、可选当前天、不可选未来天
                    }else {
                        return time.getTime() > Date.now()
                    }
                // return time.getTime() > Date.now() - 8.64e7;  // 可选历史天、不可选当前天、不可选未来天
                // return time.getTime() < Date.now() - 8.64e7;  // 不可选历史天、可选当前天、可选未来天
                // return time.getTime() < Date.now(); // 不可选历史天、不可选当前天、可选未来天
                },
            },
            imgLoading:false,
            routeParam:{
                id:this.$route.query.id || null
            },
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
        }
    },
    computed:{
        action(){
            return `${process.env.VUE_APP_DEVSERVER}/productSample/saveProductSampleAttachment`
        },
        showSampleNum(){
            if(this.mainPageList.sampleCondition == 0){
                return true
            }else {
                return false
            }
        }
    },
    mounted(){
        this.init()
        // this.getProductSampleData()
    },
    methods:{ 
        showTimeL(row){
            if(row.testSite == 0) {
                if(row.applicationTime){
                    return this.$moment(row.applicationTime).format("YYYY-MM-DD")
                }else {
                    return '--'
                }  
            }
            if(row.testSite == 1) {
                if(row.estimatedDateInspection){
                    return this.$moment(row.estimatedDateInspection).format("YYYY-MM-DD")
                }else {
                    return '--'
                }
            }
            return '--'
        },
        getProductSampleData(){
            if(this.$route.query.productKey){
                let param = {
                    productKey:this.$route.query.productKey
                }
                getProductSampleFromProductDev(param).then(res => {
                    if(res.data.basicInformation) res.data.basicInformation = res.data.basicInformation.replaceAll('\\n','\n')
                    if(res.data.jpInformation) res.data.jpInformation = res.data.jpInformation.replaceAll('\\n','\n')
                    let url = judgePorduction() ? 'http://productdev.yaheecloud.com/tool-api/common/getFilePath' : 'http://api-tools-test.yahee.com.cn:82/tool-api/common/getFilePath'
                    getFilePath(url).then(res1 => {
                        if(res.data.psas && res.data.psas.length > 0){
                            res.data.psas.forEach(item => {
                                item.showImgUrl = `${res1.data}/Small/${item.fileUri}`
                                item.showBigImgUrl = `${res1.data}/${item.fileUri}`
                            })
                            //产品尺寸图
                            res.data.productSizePhotoList =  res.data.psas.filter(item => {
                                return item.fileType == 4
                            })
                        } 
                    })
                    res.data.exportMarket = []
                    // this.mainPageList = res.data
                    this.$nextTick(res1 => {
                        this.$set(this,'mainPageList',res.data)
                        this.$set(this.mainPageList,'productSizePhotoList',res.data.productSizePhotoList)
                    })
                  
                })
            }
        },
        init(){
             let sampleUrl = judgePorduction() ? 'http://productdev.yaheecloud.com/tool-api/oceanTransportConfig/queryConfig/CFG_ProductSample_ReasonsDisqualification':
'http://api-tools-test.yahee.com.cn:82//tool-api/oceanTransportConfig/queryConfig/CFG_ProductSample_ReasonsDisqualification'
            CFG_ProductSample_ReasonsDisqualification(sampleUrl).then(res => {
                this.reasonsDisqualificationIdList = res.data.sort((a,b) => {
                    return a.t3 - b.t3
                })
            })
            this.routeParam.id = this.$route.query.id || null
            this.getPermissions()
            let param = {
                id:this.$route.query.id || null
            }
            queryProductSampleById(param).then(res => {
                if(res.data){
                    if(res.data.exportMarket) {
                        res.data.exportMarket = res.data.exportMarket.split(',')
                    }else {
                        res.data.exportMarket = []
                    }
                    applicationTime = res.data.applicationTime
                    if(res.data.basicInformation) res.data.basicInformation = res.data.basicInformation.replaceAll('\\n','\n')
                    if(res.data.jpInformation) res.data.jpInformation = res.data.jpInformation.replaceAll('\\n','\n')
                    let url = judgePorduction() ? 'http://productdev.yaheecloud.com/tool-api/common/getFilePath' : 'http://api-tools-test.yahee.com.cn:82/tool-api/common/getFilePath'
                    getFilePath(url).then(res1 => {
                        if(res.data.psas && res.data.psas.length > 0){
                            res.data.psas.forEach(item => {
                                this.imgUrl = res1.data
                                item.showImgUrl = `${res1.data}/Small/${item.fileUri}`
                                item.showBigImgUrl = `${res1.data}/${item.fileUri}`
                            })
                            // let sampleOnePhoto1 = []
                            //产品尺寸图
                            res.data.productSizePhotoList =  res.data.psas.filter(item => {
                                return item.fileType == 4
                            })
                            //来样图片
                            res.data.sampleOnePhoto  =  res.data.psas.filter(item => {
                                return item.fileType == 1
                            })
                            // this.$set(res.data,'sampleOnePhoto',sampleOnePhoto1)
                            res.data.sampleImprovementPhoto =  res.data.psas.filter(item => {
                                return item.fileType == 0
                            })
                            res.data.changePhoto = res.data.psas.filter(item => {
                                return item.fileType == 3
                            })
                            //样品确认模块文件
                            res.data.sampleQuestionFile = res.data.psas.filter(item => {
                                return item.fileType == 5
                            })
                            res.data.inspectionReport = res.data.psas.filter(item => {
                                return item.fileType == 2
                            })
                            res.data.sampleQuestionFile.forEach(item => {
                                item.name = item.fileName
                                item.url = item.showBigImgUrl
                            })
                            res.data.inspectionReport.forEach(item => {
                                item.name = item.fileName
                                item.url = item.showBigImgUrl
                            })
                            //样品确认模块图片
                            res.data.sampleQuestionPhoto = this.sampleQuestionPhoto = res.data.psas.filter(item => {
                                return item.fileType == 6
                            })
                            //设计施工图
                            res.data.designConstructionDraw = res.data.psas.filter(item => {
                                return item.fileType == 8
                            })
                            //设计施工图
                            res.data.improvedChangeFile = res.data.psas.filter(item => {
                                return item.fileType == 7
                            })

                            res.data.designConstructionFile = res.data.psas.filter(item => {
                                return item.fileType == 20
                            })
                            res.data.designConstructionFile.forEach(item => {
                                 item.name =  item.fileName
                            })
                            if(res.data.improvedChangeFile){
                                res.data.improvedChangeFile.forEach(item => {
                                    item.name =  item.fileName
                                })
                            } 
                            if(res.data.reasonsDisqualificationId){
                                res.data.reasonsDisqualificationId = res.data.reasonsDisqualificationId.toString()
                            }
                            this.mainPageList = res.data
                        }else{
                            this.mainPageList = res.data
                        }
                        // if(this.mainPageList.exportMarket) this.mainPageList.exportMarket = this.mainPageList.exportMarket.split(',')
                    })
                    let param = {
                        productKey:res.data.productKey,
                        supplierId:res.data.supplierId,
                        id:this.$route.query.id || null,
                    }
                    if(!param.supplierId || !param.productKey) return
                    getRelevanceProductSample(param).then(res => {
                        this.gridData2 = res.data
                    })
                }else {
                    this.mainPageList.exportMarket = []
                    this.getProductSampleData()
                }
            })  
        },
         getPermissions(){
            let  params = [
                'ERP.Product.ProductSample.View',
                'ERP.Product.ProductSample.SavaProductSampleRes',
            ]
            hasPermissions(params).then(res => {
                this.pageLoading = false
                let data = JSON.stringify( res.data);
                sessionStorage.setItem("permissions", data);
                let per = res.data.filter(item => {
                    return item.PermissionCode == 'ERP.Product.ProductSample.View' && !item.HasPermission
                })
                if(per && per.length > 0){
                    addMask('ERP.Product.ProductSample.View')
                }else {
                    this.renderDom = true
                }
            })
        },
        //下载地址
        clickFileName(url){
            window.open(`${this.imgUrl}${url}`)
        },
        //改变样品确认时间
        changeSampleConfirmation(val){
            if(val) {
                this.showRedRequire = false
            }
        },
        //改变样品确认时间
        changeSampleResult(val){
            if(val) {
                this.showRedRequire1 = false
            }
        },
        routerMove(id){
            let routeData = this.$router.resolve({
                name: "sampleDetail",
                query:{
                    id
                }
            });
            window.open(routeData.href, '_blank');
        },
        selectSampleConfirmationResult(val){
            if(val == 6 || val==7){
                this.showfileSample = true
            }
        },
         //下载文件地址
        GetFileServiceUrl(url) {
            return GetFileServiceUrl(url)
        },
        closeUploadDialog(){
            this.showTenth = false
            this.dialogVisible = false
        },
        saveProductSampleFn (val){
            let params = {
                productSampleIds:[this.mainPageList.id],//传空会自动生成，正常逻辑是使用 /productSample/getId 生成
                sampleConfirmationTime: this.mainPageList.sampleConfirmationTime,//样品确认时间
                sampleConfirmationResult: this.mainPageList.sampleConfirmationResult,//样品确认结果    5:合格  6：改进后通过(产前样)  7：不合格
                problemDesc:this.mainPageList.problemDesc,//样品确认文件 - 问题描述
                id:this.mainPageList.id,//样品确认文件 - 问题描述
                state: 2,// 1：保存   2：提交
                reasonsDisqualificationId:this.mainPageList.reasonsDisqualificationId ? Number(this.mainPageList.reasonsDisqualificationId) : null,
            }
            let fn 
            if(val == 1){
                fn = approvalSampleMemo(params)
            } else {
                fn = savaProductSampleRes(params)
            }
            fn.then(res => {
                if(res.code == 200){
                    this.$message({
                        type: 'success', 
                        message:this.M2('保存成功'),
                        offset:220
                    })
                    this.init()
                }
            })
        },
        //打开日志弹窗
        openRecordDialog(){
            if(!this.routeParam.id) return
            this.remarksParam = {
                productCountryId:this.routeParam.id,//必传参数
                noteBussinessName:'ProductSample_verify',//必传参数
                pageNum:0,//页面数据num
                PageIndex:-1,//页码
                proImageList:GetFileServiceUrl(),//图片地址
                mainBtn:false,
                Mark:null,
                showAllbutton:false,
            }
            this.showTenth = true
            this.dialogVisible = true
            // if(this.$refs.remarksNew){
            //     this.$refs.remarksNew.load(this.remarksParam,true) 
            // } 
        },
        submitForm(key,value,type){
            let text = ''
            if(type == 1){
                if(!this.mainPageList.sampleConfirmationTime){
                    this.showRedRequire = true
                    return
                }
                if(!this.mainPageList.sampleConfirmationResult){
                    this.showRedRequire1 = true
                    return
                }
                text = this.M2('确定已完成样品确认，准备输出样品确认文档？')
            }else if(type == 2) {
                text = this.M2('确定完成样品确认文件的输出，向采购开发通知样品确认结果？')
                if((this.mainPageList.sampleConfirmationResult == 5 || this.mainPageList.sampleConfirmationResult == 6) && this.mainPageList.inspectionReport.length == 0) {
                    this.showRedRequire2 = true
                    return
                }
                if(this.mainPageList.sampleConfirmationResult != 5){
                    if(!this.mainPageList.problemDesc && this.mainPageList.sampleQuestionFile.length == 0 && this.sampleQuestionPhoto.length == 0){
                        this.$message({
                            type: 'error', 
                            message:this.M2('请添加一个问题描述，文件或者图片！'),
                            offset:220
                        })
                        return
                    }
                }
                if(this.mainPageList.sampleConfirmationResult == 7 && !this.mainPageList.reasonsDisqualificationId){
                    this.$message({
                        type: 'error', 
                        message:this.M2('请选择不合格原因！'),
                        offset:220
                    })
                    return
                }
            }
            this.$confirm(text, this.M2('提示'), {
                confirmButtonText: this.M2('确定'),
                cancelButtonText: this.M2('取消'),
                type: 'warning',
                cancelButtonClass: 'btn-custom-cancel',
            }).then(() => {
                this.$set(this.controlsEdit,key,value)
                this.saveProductSampleFn(type)
                return
            }).catch(() => {
                return          
            });   
        },
        upDateFile(list,name){
            this.$set(this.mainPageList,name,list)
            this[name]= list
        },
        updeEditPage(key,value,shouldUpdate){  
            this.$set(this.controlsEdit,key,value)
            this.init()
            this.showRedRequire = false
            this.showRedRequire1 = false
            this.showRedRequire2 = false
        },
        handleExceed(files, fileList) { 
            this.$refs.uploadRef.abort() // 取消剩余接口请求
            this.$message({
                type: 'warning',
                message: this.M2('文件超限，最多可上传5个文件'),
                offset:220
            })
        },
        handleExceed1(files, fileList) { 
            this.$refs.uploadRef1.abort() // 取消剩余接口请求
            this.$message({
                type: 'warning',
                message: this.M2('文件超限，最多可上传1个文件'),
                offset:220
            })
        },
        uploadFileSuccess(res,file, fileList){
            // 这里需要根据你自己的接口返回数据格式和层级来自行修改
            if (res.code == 200) {
                this.$message({
                    type: 'success', 
                    message:this.M2('上传成功'), 
                    offset:220
                })
                if (this.mainPageList.sampleQuestionFile.length < 5) {
                    fileList.forEach(item => {
                        let file = item.response ? item.response.data[0] : item
                        if(item.response){
                            file.name =  file.fileName
                            file.url =  `${this.imgUrl}/${file.fileUri}`
                        }
                    })
                    this.mainPageList.sampleQuestionFile = fileList
                    // res.data[0].name = res.data[0].fileName
                    // res.data[0].url = `${this.imgUrl}/${res.data[0].fileUri}`
                    // this.mainPageList.sampleQuestionFile.push(res.data[0])
                }else {
                    this.handleExceed()
                }
            } else {
                this.$message({ type: 'error', message: res.msg })
            }
        },
        uploadFileSuccess1(res,file, fileList){
            // 这里需要根据你自己的接口返回数据格式和层级来自行修改
            if (res.code == 200) {
                this.$message({
                    type: 'success', 
                    message:this.M2('上传成功'),
                    offset:220
                })
                res.data[0].name = res.data[0].fileName
                res.data[0].url =  `${this.imgUrl}/${res.data[0].fileUri}`
                this.$set(this.mainPageList,'inspectionReport',res.data)
                this.showRedRequire2 = false
            } else {
                this.$message({ type: 'error', message: res.msg })
            }
        },
        handleRemove(file, fileList){
            let file1 = file.response ? file.response.data[0] : file         
            let param = new FormData();
            param.append('productSampleId', this.$route.query.id || null);
            if(!file1.id) return
            param.append('fileType', 5);
            param.append('datta', file1.id);
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }; 
            saveProductSampleAttachment(param,this.action).then(res => {
                if(res.code == 200){
                    // this.mainPageList.sampleQuestionFile.push(res.data[0])
                    this.mainPageList.sampleQuestionFile.splice(this.mainPageList.sampleQuestionFile.findIndex(item => item.id == file1.id),1)
                }
            })  
        },
        handleRemove1(file, fileList){
            let id = file.id ? file.id :file.response.data[0].id
            let param = new FormData();
            param.append('productSampleId',  this.$route.query.id || null);
            param.append('fileType', 2);
            param.append('datta', id);
            if(!id) return
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }; 
            saveProductSampleAttachment(param,this.action).then(res => {
                if(res.code == 200){
                     this.$message({
                        type: 'success', 
                        message:this.M2('删除成功'),
                        offset:220
                    })
                    this.mainPageList.inspectionReport.splice(this.mainPageList.inspectionReport.findIndex(item => item.id == id),1)
                }
            })  
        },
        beforeRemove(){
            return this.$confirm(this.M2('确定移除这个文件吗？'),this.M2('提示'),{cancelButtonClass: 'btn-custom-cancel'});
        }
    }
}
</script>
<style scoped lang="scss">
.el-card {
    margin-top: 3px;
}
 .el-icon-question1 {
    background-image: url('~@/assets/svg/interpretation.svg');

    cursor: pointer;
    user-select: none;
    background-size: 15px;
    display: inline-block;
    height: 15px;
    width: 15px;
}
.textSpeaing .el-col{
    margin-top: 15px;
}
.imageMainbox{
    text-align: right;
    font-weight: bold;
    width: 180px;
    display: inline-block;
    flex-shrink: 0;
    .imageMainboxText{
        font-weight: normal;
        display: inline-block;
    }
}
.boxFlex{
    display: flex;
}
.image-flex {
    display: flex;
    flex-wrap: wrap;
    .el-image {
        margin: 5px;
        width: 100px;
        height: 100px;
        border: 1px solid #ccc;
    }
}
::v-deep.dialog-main {
    .el-drawer__header {
        padding: 10px 20px 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid #ccc;
        margin-bottom: 0px;
        font-size: 18px;
        font-weight: bold;
    }
    .el-drawer__body {
        padding: 10px;
    }
}
.textSpeaing .el-col{
    margin-top: 15px;
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
    font-size: 28px;
    color: #8c939d;
    width: 130px;
    height: 130px;
    line-height: 130px;
    text-align: center;
}
.avatar {
    width: 130px;
    height: 130px;
    display: block;
}
.bottomButton{
    width: 100%;
    height: 30px;   
    display: flex;
    justify-content: flex-end;
}
.sample-basis .el-row {
    margin-top: 15px;
}
.bg-gray {
    background-color: #ededed;
    padding: 5px;
    .el-icon-s-unfold {
        position: fixed;
        top: 43px;
        left: 10px;
        font-size: 30px;
        cursor: pointer;
        box-shadow: 1px 1px rgba(0,0,0,0.1);
    }
    .el-icon-s-fold {
        background: #fff;
        z-index: 11111;
        position: fixed;
        top: 43px;
        left: 645px;
        font-size: 30px;
        cursor: pointer;
        box-shadow: 1px 1px rgba(0,0,0,0.1);
    }
    .clearfix {
        height: 20px;
    }
    .header-title {
        height: 30px;
        line-height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        position: relative;
        background-color: #fff;
        position: sticky;
        top: 0px;
        z-index: 999;
        border-bottom: 1px solid #ccc;
        .header-text {
            font-size: 18px;
            font-weight: bold;
        }
        .right-button {
            display: flex;
            position: absolute;
            right: 10px;
            div {
                background-color: #0f7535;
                color: #fff;
                padding: 0px 5px;
                margin-right: 5px;
                height: 20px;
                line-height: 20px;
            }
            .gray-div {
                background-color: #aaa;
            }
        }
    }
    .tabContainer{
        height: 100%;
        width: 100%;
        background-color: rgba(230, 230, 230, 1);
        .imageMainbox{
            text-align: right;
            font-weight: bold;
            width: 180px;
            display: inline-block;
            flex-shrink: 0;
           
        }
        .imageMainboxText{
            font-weight: normal;
            display: inline-block;
            // width: 100%;
        }
        ::v-deep .el-card__header{
            padding: 10px 50px !important;
            font-size: 16px;
            font-weight: bold;
            position: relative;
        }
        ::v-deep .el-card__body{
            margin-left: 100px;
        }
        .edit-position{
            float: right;
            margin-right:10px;
            color: #3366cc;
            height: 20px;
            width: 55px;
            font-size: 12px;
            position: absolute;
            right: 5px;
            top: 12px;
            &:hover{
                background-color: #3366cc;
                color: #ffffff;
                cursor: pointer;   
                text-align: center;
                
                .icon-edit{
                    fill: #ffffff;
                    background-image: url(~@/assets/svg/editWrite.svg);
                }
            }
            .icon-edit{
                height: 16px;
                width: 16px;
                float: left;
                background-image: url(~@/assets/svg/edit.svg);
            }
        }
        .imgContainer{
            display: flex;
            min-height: 100px;
            flex-wrap: wrap;
            height: max-content;
            .imgCon{
                width: 100px; 
                    height: 100px; 
                margin: 3px;
                .imageListBox{
                    width: 100px; 
                    height: 100px; 
                    display: block;
                    cursor:pointer;
                    border-radius: 3px;
                }         
            }
        }  
    }
}
.fileHoverShow{
    color: #3366cc;
    display: inline;
    &:hover{
        background: #3366cc;
        color: #ffffff;
        cursor: pointer;
    }
}
</style>
<style>
.el-table .cell {
    white-space: pre-line;
}
</style>