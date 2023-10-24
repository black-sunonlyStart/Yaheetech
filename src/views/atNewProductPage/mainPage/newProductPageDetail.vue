<template>
    <div class="bg-gray" v-if="renderDom">
        <div class="flex-stact-title">
            <el-card class="header-title" style="margin-top:0px">
                <div class="header-title-text">
                    {{M2('产品开发')}} > {{M2('新品需求管理')}} 
                </div>
                <div><span class="header-text">{{M2('新品开发需求')}}：</span>
                    <span  class="header-text" style="font-weight: bold;">{{mainPageList.developmentId}}
                    <span v-if="mainPageList.skuAlias">({{mainPageList.skuAlias}})</span></span></div>
                <div class="right-button"> 
                    <div class="green-font" @click="routerDev()" v-if="mainPageList.state > 12">>>{{M2('产品开发详情页')}}</div>
                    <div class="green-div">{{M2('品类经理')}}：{{mainPageList ? mainPageList.categoryManagerName : ''}}</div>
                    <div class="green-div" v-if="mainPageList.businessName || mainPageList.state >= 4">{{M2('业务开发')}}:{{mainPageList ? mainPageList.businessName: ''}}</div>
                    <div class="gray-div">{{M2('预计完成时间')}}：{{mainPageList && mainPageList.completionOn ? $moment(mainPageList.completionOn).format("YYYY-MM-DD") :''}}</div>
                </div>
            </el-card>
            <el-card class="card">
                <div class="stepBox">
                    <span class="leftButton" @click="leftMove"><i class="el-icon-d-arrow-left"></i></span>
                        <span class="step-container">
                            <el-steps :active="nowStatus" space='150' align-center  finish-status="success" process-status="finish">
                                <el-step v-for="item in developmentProgresses" :title="M2(item.statusValue)" :key="item.status" :description="item.createOn" >
                                        <template slot="icon">
                                            <div class="imageBox"></div>
                                        </template>
                                        <template slot="title">
                                            <el-tooltip class="item" effect="dark" :content="item.createBy" placement="top">
                                                <div class="stepTitle">
                                                    {{ item.status == 8 && mainPageList.design == 11 ? M2(item.toStatusValue) : M2(item.statusValue)}}
                                                </div>
                                            </el-tooltip>
                                        </template>
                                </el-step>
                            </el-steps>
                        </span>
                    <span class='rightButton' @click="rightMove"><i class="el-icon-d-arrow-right"></i></span>
                </div> 
            </el-card>
        </div>
        <div class='tabContainer'>
            <el-card class="sample-basis">
                <div slot="header" class="clearfix">
                    <div>{{M2('基本数据')}}
                        <div v-if="!noEditableList.includes(this.mainPageList.state) && assigneePermission"  v-permission="'PM00048'">
                            <div class="edit-position" @click="controlsEdit.isEdit = !controlsEdit.isEdit" v-if="controlsEdit.isEdit">
                                <span><i class="icon-edit"></i>{{M2('编辑')}}</span>
                            </div>
                        </div>
                    </div>   
                </div>
                <div v-if="controlsEdit.isEdit">
                    <el-row class="textSpeaing">
                        <el-col :span="20"  >
                            <div class="boxFlex">
                                <span class="imageMainbox">{{M2('产品图片')}}： </span>
                                <div class="imageMainboxText" >
                                    <div class="image-flex">
                                        <el-image  v-for="item in mainPageList.productDemandImgs" :key="item.url" :src="item.showImgUrl" :preview-src-list="[item.showBigImgUrl]"></el-image>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row class="textSpeaing">
                        <el-col :span="20">
                            <span class="imageMainbox">{{M2('产品名称')}}： </span>
                            <span class="imageMainboxText">{{mainPageList.title}}</span>
                        </el-col>
                    </el-row>
                    <el-row class="textSpeaing">
                        <el-col :span="10" v-if="mainPageList.businessName || mainPageList.state >= 4">
                            <span class="imageMainbox">{{M2('业务开发')}}： </span>
                            <span class="imageMainboxText">{{mainPageList.businessName}}</span>
                        </el-col>
                        <el-col :span="10" v-if="mainPageList.design || mainPageList.state >= 7">
                            <span class="imageMainbox">{{M2('是否为设计款')}}： </span>
                            <span class="imageMainboxText">{{showDesign(mainPageList.design )}}</span>
                        </el-col>
                    </el-row>
                    <el-row class="textSpeaing">
                        <el-col :span="10">
                            <span class="imageMainbox">{{M2('产品来源')}}： </span>
                            <span class="imageMainboxText">{{M2(mainPageList.productSourceStr)}}</span>
                        </el-col>
                        <el-col :span="10">
                            <span class="imageMainbox">{{M2('类目-系列')}}： </span>
                            <span class="imageMainboxText">{{mainPageList.seriesCategoryName }}</span>
                        </el-col>
                    </el-row>
                    <el-row class="textSpeaing">
                        <el-col :span="10" v-if="mainPageList.productSource == 1">
                            <span class="imageMainbox">{{M2('工厂名称')}}： </span>
                            <span class="imageMainboxText">{{mainPageList.factoryName}}</span>
                        </el-col>
                        <el-col :span="10" v-if="mainPageList.productSource == 5">
                            <div class="boxFlex">
                                <span class="imageMainbox">{{M2('其他来源')}}： </span>
                                <div class="imageMainboxText" >{{mainPageList.otherSources}}</div>
                            </div>
                        </el-col>
                        <el-col :span="10" v-if="mainPageList.productSource == 4">
                            <div class="boxFlex">
                                <span class="imageMainbox">{{M2('设计师名称')}}： </span>
                                <div class="imageMainboxText" >{{mainPageList.productSourceDesigner}}</div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row class="textSpeaing">
                        <el-col :span="10">
                            <div class="boxFlex">
                                <span class="imageMainbox">{{M2('平台')}}： </span>
                                <div class="imageMainboxText" >{{mainPageList.platForm}}</div>
                            </div>
                        </el-col>
                        <el-col :span="10">
                            <div class="boxFlex">
                                <span class="imageMainbox">{{M2('产品链接')}}： </span>
                                <div class="imageMainboxText" >{{mainPageList.productLink}}  {{changeMarket(mainPageList.productLinkMarket) }}</div>
                            </div>       
                        </el-col>
                    </el-row>
                    <el-row class="textSpeaing">
                        <el-col :span="10">
                            <div class="boxFlex">
                                <span class="imageMainbox">{{M2('需求颜色')}}： </span>
                                <div class="imageMainboxText" >{{mainPageList.desiredColor && mainPageList.desiredColor.length > 0 ? M2(mainPageList.desiredColor.toString()) : ''}}</div>
                            </div>
                        </el-col>
                        <el-col :span="10">
                            <div class="boxFlex">
                                <span class="imageMainbox">{{M2('需求尺寸')}}： </span>
                                <div class="imageMainboxText" >{{mainPageList.requiredSize}}</div>
                            </div>       
                        </el-col>
                    </el-row>
                    <el-row class="textSpeaing">
                        <el-col :span="20">
                            <div class="boxFlex">
                                <span class="imageMainbox">{{M2('工艺材质')}}： </span>
                                <div class="imageMainboxText" >{{mainPageList.processMaterial}}</div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row class="textSpeaing">
                        <el-col :span="10">
                            <div class="boxFlex">
                                <span class="imageMainbox">{{M2('建议售卖市场')}}： </span>
                                <div class="imageMainboxText" >{{mainPageList.saleMarket && mainPageList.saleMarket.length > 0 ? mainPageList.saleMarket.toString() : ''}}</div>
                            </div>
                        </el-col>
                        <el-col :span="10">
                            <div class="boxFlex">
                                <span class="imageMainbox">{{M2('预测日销')}}： </span>
                                <div class="imageMainboxText" >{{mainPageList.xsdailySales}}</div>
                            </div>       
                        </el-col>
                    </el-row>
                    <el-row class="textSpeaing">
                        <el-col :span="10">
                            <div class="boxFlex">
                                <span class="imageMainbox">{{M2('推荐理由')}}： </span>
                                <div class="imageMainboxText" >{{mainPageList.recomReason}}</div>
                            </div>
                        </el-col>
                        <el-col :span="10">
                            <div class="boxFlex">
                                <span class="imageMainbox">{{M2('调整方向')}}： </span>
                                <div class="imageMainboxText" >{{mainPageList.adjustDirection}}</div>
                            </div>       
                        </el-col>
                    </el-row>  
                    <el-row class="textSpeaing">
                        <el-col :span="20">
                            <div style="display:flex">
                                <span class="imageMainbox">{{M2('竞品信息')}}： </span>
                                <div class="imageMainboxText" style="flex-grow: 1;">
                                    <el-table :empty-text="M2('暂无数据')" :data="mainPageList.productDemandCompetings && mainPageList.productDemandCompetings.filter(item => item.usage)" border align="center" :header-cell-style="{background:'#f5f7fa',color:'#606266'}">
                                        <el-table-column width="500" :label="M2('竞品链接')" header-align='center' align="center">
                                            <template slot-scope="scope">
                                                <div>
                                                    {{scope.row.url}}
                                                </div>   
                                            </template>
                                        </el-table-column>
                                        <el-table-column width=""  :label="M2('链接市场')" header-align='center' align="center">
                                            <template slot-scope="scope">
                                                <div>
                                                    {{changeMarket(scope.row.urlMarket)}}
                                                </div>       
                                            </template>
                                        </el-table-column>
                                        <el-table-column width=""  :label="M2('竞品品牌')" header-align='center' align="center">
                                            <template slot-scope="scope">
                                                <div>
                                                    {{scope.row.bandinfo}}
                                                </div>   
                                            </template>
                                        </el-table-column>
                                        <el-table-column width=""  :label="M2('竞品排名')" header-align='center' align="center">
                                            <template slot-scope="scope">
                                                <div>
                                                    {{scope.row.ranking}}
                                                </div>    
                                            </template>
                                        </el-table-column>
                                        <el-table-column width=""  :label="M2('竞品价格区间')" header-align='center' align="center">
                                            <template slot-scope="scope">
                                                <div style="display:flex;justify-content: center;">
                                                    {{scope.row.minPrice}}
                                                    -   
                                                    {{scope.row.maxPrice}} 
                                                </div>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div> 
                            </div>
                        </el-col>
                    </el-row>  
                     <el-row class="textSpeaing">
                        <el-col :span="10">
                            <div class="boxFlex">
                                <span class="imageMainbox">{{M2('其他说明')}}： </span>
                                <div class="imageMainboxText" >{{mainPageList.otherInstructions}}</div>
                            </div>       
                        </el-col>
                    </el-row> 
                </div>
                <div v-else>
                    <el-form :model="mainPageList" :rules="rules" ref="ruleForm" label-width="170px" size="mini">
                        <el-row :gutter="150">
                            <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="20" :xl="20" >
                                <el-form-item  prop="productDemandImgs">
                                    <template slot="label" >
                                        <span>
                                            {{M2('产品图片')}}:
                                        </span> 
                                    </template>
                                    <imgUpload 
                                        :fileType='1' 
                                        :dataParams="{ fileType:1,productDemandId:this.routeParam.id || 0}" 
                                        :showButton="false" :value='mainPageList.productDemandImgs' 
                                        :limit="10" @upDateFile="upDateFile" 
                                        imageURl="/productDemand/saveProductDemandAttachment" 
                                        :imgUrl="imgUrl" 
                                        ruleName="productDemandImgs"
                                    ></imgUpload> 
                                </el-form-item>
                            </el-col>
                        </el-row>  
                        <el-row :gutter="150">
                            <el-col :span="20">
                                <el-form-item :label="M2('产品名称') + ':'" prop="title">
                                    <el-input type="textarea" rows="1" v-model="mainPageList.title" show-word-limit maxlength="100"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row> 
                        <el-row :gutter="150">
                            <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="11" :xl="10" v-if="mainPageList.businessName || mainPageList.state >= 4">
                                <el-form-item :label="M2('业务开发') + ':'" prop="businessId">
                                    <el-select v-model="mainPageList.businessId" value-key="code" :placeholder="M2('请选择')" class="project-select" size="mini" >
                                        <el-option 
                                            v-for="item in targetPrice"                        
                                            :key="item.Id"
                                            :label="item.TrueName"
                                            :value="item.Id"
                                            >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="11" :xl="10" v-if="mainPageList.design || mainPageList.state >= 7">
                                <el-form-item :label="M2('是否为设计款') + ':'" prop="design">
                                    <el-radio-group v-model="mainPageList.design">
                                        <el-radio :label="2">{{M2('否')}}</el-radio>
                                        <el-radio :label="10">{{M2('设计')}}</el-radio>
                                        <el-radio :label="11">{{M2('P图')}}</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                        </el-row> 
                        <el-row :gutter="150">
                            <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="11" :xl="10">
                                <el-form-item :label="M2('产品来源') + ':'" prop="productSource">
                                    <el-select 
                                        v-model="mainPageList.productSource"
                                        >
                                        <el-option 
                                            v-for="item in supplierTypeList"                        
                                            :key="item.label"
                                            :label="M2(item.name)"
                                            :value="item.label"
                                            >
                                        </el-option>
                                    </el-select> 
                                </el-form-item>
                            </el-col>
                            <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="11" :xl="10">
                                <el-form-item :label="M2('类目-系列') + ':'" prop="classCategoryIdArray">
                                    <el-cascader
                                        style="display: block;"
                                        v-model="mainPageList.classCategoryIdArray"
                                        :options="patentCountry"
                                        size="mini"
                                        separator=' - '
                                        :props="{ 
                                            value:'seriesCategoryId',
                                            label:'seriesCategoryName',
                                            children:'classifyDefs'
                                            }"
                                        clearable
                                        >
                                    </el-cascader> 
                                </el-form-item>
                            </el-col>
                        </el-row> 
                        <el-row :gutter="150">
                            <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="11" :xl="10" v-if="mainPageList.productSource == 1">
                                <el-form-item :label="M2('工厂名称') + ':'" prop="factoryName">
                                    <el-input v-model="mainPageList.factoryName"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="11" :xl="10" v-if="mainPageList.productSource == 5">
                                <el-form-item  :label="M2('其他来源') + ':'" prop="otherSources">
                                    <el-input v-model="mainPageList.otherSources"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="11" :xl="10" v-if="mainPageList.productSource == 4">
                                <el-form-item :label="M2('设计师名称') + ':'" prop="productSourceDesigner">
                                    <el-input v-model="mainPageList.productSourceDesigner"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row> 
                        <el-row :gutter="150">
                            <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="11" :xl="10">
                                <el-form-item :label="M2('平台') + ':'" prop="platForm" :rules="[{required: this.mainPageList && this.mainPageList.productSource == 2,message:M2('请选择平台'),trigger:'blur'}]">
                                    <el-select 
                                        v-model="mainPageList.platForm"
                                        >
                                        <el-option 
                                            v-for="item in queryPlatsList"                        
                                            :key="item.name"
                                            :label="item.name"
                                            :value="item.name"
                                            >
                                        </el-option>
                                    </el-select> 
                                </el-form-item>
                            </el-col>
                            <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="11" :xl="10">
                                <div style="display:flex">
                                    <el-form-item :label="M2('产品链接') + ':'" prop="productLink"
                                        :rules="[{required: this.mainPageList && this.mainPageList.productSource == 2,message:M2('请添加产品链接'),trigger:'blur'}]"
                                        >
                                        <el-input v-model="mainPageList.productLink" style="width:285px"></el-input>
                                    </el-form-item>
                                    <el-form-item prop="productLinkMarket"
                                        label-width="0px"
                                        :rules="[{required: this.mainPageList && this.mainPageList.productSource == 2,message:M2('请添加链接市场'),trigger:'blur'}]"
                                    >
                                        <el-select 
                                            v-model="mainPageList.productLinkMarket"
                                            :placeholder="M2('链接市场')"
                                            style="width:190px"
                                            >
                                            <el-option 
                                                v-for="item in countryList1"                        
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                                >
                                            </el-option>
                                        </el-select> 
                                    </el-form-item>
                                </div>
                            </el-col>
                        </el-row> 
                        <el-row :gutter="150">
                            <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="11" :xl="10">
                                <el-form-item :label="M2('需求颜色') + ':'" prop="desiredColor">
                                    <el-select 
                                        v-model="mainPageList.desiredColor"
                                        multiple
                                        >
                                        <el-option 
                                            v-for="item in checkList"                        
                                            :key="item"
                                            :label="M2(item)"
                                            :value="item"
                                            >
                                        </el-option>
                                    </el-select> 
                                </el-form-item>
                            </el-col>
                            <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="11" :xl="10">
                                <el-form-item :label="M2('需求尺寸') + ':'" prop="requiredSize">
                                    <el-input v-model="mainPageList.requiredSize" type="textarea" show-word-limit maxlength="100" rows="1"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row> 
                        <el-row :gutter="150">
                            <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="11" :xl="10">
                                <el-form-item :label="M2('工艺材质') + ':'" prop="processMaterial">
                                    <el-input v-model="mainPageList.processMaterial" type="textarea" show-word-limit maxlength="200"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row> 
                        <el-row :gutter="150">
                            <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="11" :xl="10">
                                <el-form-item :label="M2('建议售卖市场') + ':'" prop="saleMarket">
                                    <el-select 
                                        v-model="mainPageList.saleMarket"
                                        multiple
                                        >
                                        <el-option 
                                            v-for="item in countryList1"                        
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                            >
                                        </el-option>
                                    </el-select> 
                                </el-form-item>
                            </el-col>
                            <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="11" :xl="10">
                                <el-form-item :label="M2('预测日销') + ':'" prop="xsdailySales">
                                    <el-input v-model.number="mainPageList.xsdailySales" oninput="value=value.replace(/[^0-9]/g,'')"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row> 
                        <el-row :gutter="150">
                            <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="11" :xl="10">
                                <el-form-item :label="M2('推荐理由') + ':'" prop="recomReason">
                                    <el-input type="textarea" v-model="mainPageList.recomReason" show-word-limit maxlength="300"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="11" :xl="10">
                                <el-form-item  :label="M2('调整方向') + ':'" prop="adjustDirection">
                                    <el-input type="textarea" v-model="mainPageList.adjustDirection" show-word-limit maxlength="500"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row> 
                        <el-row :gutter="150">
                            <el-col :span="20">
                                <el-form-item  :label="M2('竞品数据') + ':'">
                                    <el-table :empty-text="M2('暂无数据')" :data="mainPageList.productDemandCompetings && mainPageList.productDemandCompetings.filter(item => item.usage)" border align="center" :header-cell-style="{background:'#f5f7fa',color:'#606266'}">
                                        <el-table-column width="" :label="M2('竞品链接')" header-align='center'>
                                            <template slot-scope="scope">
                                                <el-input v-model="scope.row.url"></el-input>      
                                            </template>
                                        </el-table-column>
                                        <el-table-column width="" :label="M2('链接市场')" header-align='center'>
                                            <template slot-scope="scope">
                                                <el-select 
                                                    v-model="scope.row.urlMarket"
                                                    >
                                                    <el-option 
                                                        v-for="item in countryList1"                        
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value"
                                                        >
                                                    </el-option>
                                                </el-select>       
                                            </template>
                                        </el-table-column>
                                        <el-table-column width="" :label="M2('竞品品牌')" header-align='center'>
                                           <template slot-scope="scope">
                                                <el-input v-model="scope.row.bandinfo"></el-input>      
                                            </template>
                                        </el-table-column>
                                        <el-table-column width="" :label="M2('竞品排名')" header-align='center'>
                                            <template slot-scope="scope">
                                                <el-input v-model="scope.row.ranking" show-word-limit maxlength="100" type="textarea" rows="1"></el-input>      
                                            </template>
                                        </el-table-column>
                                        <el-table-column width="" :label="M2('竞品价格区间')" header-align='center'>
                                            <template slot-scope="scope">
                                                <div style="display:flex">
                                                    <el-input v-model="scope.row.minPrice" oninput="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')"></el-input>   
                                                    -   
                                                    <el-input v-model="scope.row.maxPrice" oninput="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')"></el-input>     
                                                </div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            :label="M2('操作')"
                                            width="50px"
                                            >
                                            <template slot-scope="scope">
                                                <!-- <div v-if="scope.$index == 0 || scope.$index == 1">
                                                    前两条数据无法移除
                                                </div> -->
                                                <el-button
                                                    @click.native.prevent="deleteRow(scope.$index)"
                                                    type="text"
                                                    size="small">
                                                    {{M2('移除')}}
                                                </el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <div class="tableText" @click="addTableList">
                                        {{M2('增加竞品信息')}}
                                    </div>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="150">
                            <el-col :span="12" :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
                                <el-form-item :label="M2('其他说明') + ':'" prop="otherInstructions">
                                    <el-input type="textarea" v-model="mainPageList.otherInstructions" show-word-limit maxlength="500"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row> 
                    </el-form>
                    <div class="bottomButton">
                        <el-button type="primary" @click="submitForm('ruleForm')" size="mini">{{M2('保存')}}</el-button>
                        <el-button @click="updeEditPage('isEdit',true)"  size="mini">{{M2('取消')}}</el-button>
                    </div>
                </div>
            </el-card>
            <el-card v-if="this.mainPageList.state && ![1,2,3].includes(this.mainPageList.state)" >
                <div slot="header" class="clearfix">
                    <div>{{M2('专利信息')}} <!-- -->
                        <div v-if="!noEditableList.includes(this.mainPageList.state) && assigneePermission" v-permission="'PM00049'">
                            <div class="edit-position" @click="controlsEdit.isEdit1 = !controlsEdit.isEdit1" v-if="controlsEdit.isEdit1">
                                <span><i class="icon-edit"></i>{{M2('编辑')}}</span>
                            </div>
                        </div>
                    </div>   
                </div>
                <div v-if="controlsEdit.isEdit1">
                    <el-row class="textSpeaing">
                        <el-col :span="10" :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
                            <span class="imageMainbox"> {{M2('查询国家')}}： </span>
                            <span class="imageMainboxText">
                                <span v-for="(item,index) in patentInfo.countryList" :key="item">{{showCountryText(item)}}<span v-if="index != patentInfo.countryList.length - 1">,</span></span>
                            </span>
                        </el-col>
                    </el-row>
                    <el-row class="textSpeaing" v-if="this.mainPageList.state && ![4,5].includes(this.mainPageList.state)">
                        <el-col :span="10" :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
                            <div style="display:flex">
                                <span class="imageMainbox"> {{M2('查询结果')}}： </span>
                                <div>
                                    <div v-for="item in patentInfo.patentInfoT" :key="item.countryCode">{{showCountryText(item.countryCode) }} - {{showReqRes(item.reqRes)}}</div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row class="textSpeaing" v-if="this.mainPageList.state &&![4,5].includes(this.mainPageList.state)">
                        <el-col :span="10" :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
                            <div style="display:flex">
                                <span class="imageMainbox"> {{M2('专利说明')}}： </span>
                                <div>
                                    <div class="word-break" v-for="item in patentInfo.patentInfoT" :key="item.countryCode">{{showCountryText(item.countryCode)}} - {{item.patentInfo}}</div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                   
                </div>
                <div v-else>
                    <el-form :model="patentInfo" :rules="patentRules" ref="patentRuleForm" label-width="170px" size="mini">
                        <el-row :gutter="150">
                            <el-col :span="12" :xs="13" :sm="13" :md="13" :lg="13" :xl="13">
                                <el-form-item :label="M2('查询国家') + ':'" prop="countryList">      
                                    <el-checkbox-group v-model="patentInfo.countryList" > 
                                        <el-checkbox v-for="item in countryList" :key="item.countryCode" :label="item.countryCode">{{item.label}}</el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11">
                                <div class="tableText" @click="showHistoryQueryInfo()">
                                    {{M2('历史查询结果')}}
                                </div>
                            </el-col>
                        </el-row> 
                        <el-row :gutter="150" v-if="this.mainPageList.state && ![4,5].includes(this.mainPageList.state)">
                            <el-col :span="16">
                                <el-form-item  :label="M2('查询结果') + ':'" prop="queryResults">     
                                    <div v-for="item in countryList" :key="item.countryCode">
                                        <div v-if="patentInfo.countryList && patentInfo.countryList.includes(item.countryCode)">
                                            <span class="country-type">{{item.label}}:</span>
                                            <el-select v-model="item.reqRes">
                                                <el-option 
                                                    v-for="item in devSign"                        
                                                    :key="item.key"
                                                    :label="M2(item.label)"
                                                    :value="item.value"
                                                    >
                                                </el-option>
                                            </el-select>                                            
                                        </div>
                                    </div> 
                                </el-form-item>
                            </el-col>
                        </el-row> 
                        <el-row :gutter="150" v-if="this.mainPageList.state && ![4,5].includes(this.mainPageList.state)">
                            <el-col :span="16">
                                <el-form-item :label="M2('专利说明') + ':'" prop="patentInfo">     
                                    <div v-for="item in countryList" :key="item.countryCode">
                                        <div v-if="patentInfo.countryList && patentInfo.countryList.includes(item.countryCode)" style="display:flex">
                                            <span class="country-type">{{item.label}}:</span>    
                                            <el-input v-model="item.patentInfo" type="textarea" show-word-limit maxlength="500" ></el-input>                                      
                                        </div>
                                    </div> 
                                </el-form-item>
                            </el-col>
                        </el-row> 

                    </el-form>
                    <div class="bottomButton">
                        <el-button type="primary" @click="submitForm1('patentRuleForm')" size="mini">{{M2('保存')}}</el-button>
                        <el-button @click="updeEditPage('isEdit1',true)"  size="mini">{{M2('取消')}}</el-button>
                    </div>
                </div>
            </el-card>
            <el-card v-if="this.mainPageList.state > 6 && this.mainPageList.design != 2 " >
                <div slot="header" class="clearfix">
                    <div>{{M2('设计信息')}} <!-- -->
                        <div v-if="!noEditableList.includes(this.mainPageList.state) && assigneePermission" v-permission="'PM00050'">
                            <div class="edit-position" @click="controlsEdit.isEdit2 = !controlsEdit.isEdit2" v-if="controlsEdit.isEdit2">
                                <span><i class="icon-edit"></i>{{M2('编辑')}}</span>
                            </div>
                        </div>
                    </div>   
                </div>
                <div v-if="controlsEdit.isEdit2">
                    <el-row class="textSpeaing" v-for="(item,index) in devSignInfo.filter(item => item.usage != false)" :key="item.key" style="margin-bottom:40px">              
                        <el-col :span="20">
                            <div style="display:flex">
                                <span class="imageMainbox" style="display: flex;justify-content: space-between;"><div>{{M2('方案')+ changeNum(index) }}</div> <div>{{M2('设计方')}}：</div> </span>
                                <span class="imageMainboxText">{{showDesigner(item.designer) }}</span>
                            </div>
                            
                        </el-col>
                        <el-col :span="20">
                            <div style="display:flex">
                                <span class="imageMainbox">{{M2('设计图片')}}： </span>
                                <span class="imageMainboxText">
                                    <div class="boxFlex">
                                        <div class="image-flex">
                                            <el-image v-for="(item1) in item.designerImgs" :key="item1.fileUri" :src="item1.showImgUrl" :preview-src-list="[item1.showBigImgUrl]"></el-image>
                                        </div>
                                    </div>
                                </span>
                            </div>
                        </el-col>
                        <el-col :span="20" v-if="item.explain">
                            <div style="display:flex">
                                <span class="imageMainbox">{{M2('设计说明')}}： </span>
                                <span class="imageMainboxText">
                                    <div class="boxFlex">
                                        <div class="image-flex">
                                            {{item.explain}}
                                        </div>
                                    </div>
                                </span>
                            </div>
                        </el-col>
                        <el-col :span="20" v-if="item.designerDescImgs && item.designerDescImgs.length > 0">
                            <div style="display:flex">
                                <span class="imageMainbox">{{M2('设计说明-图片')}}： </span>
                                <span class="imageMainboxText">
                                    <div class="boxFlex">
                                        <div class="image-flex">
                                            <el-image v-for="(item1) in item.designerDescImgs" :key="item1.fileUri" :src="item1.showImgUrl" :preview-src-list="[item1.showBigImgUrl]"></el-image>
                                        </div>
                                    </div>
                                </span>
                            </div>
                        </el-col>
                        <el-col :span="20" v-if="item.designerDescFiles && item.designerDescFiles.length > 0">
                            <div style="display:flex">
                                <span class="imageMainbox">{{M2('设计说明-文件')}}： </span>
                                <span class="imageMainboxText">
                                    <div>
                                        <div v-for="(item1) in item.designerDescFiles" :key="item1.id">
                                           <el-link type="primary" class="a-link" @click="clickFileName(item1.fileUri)">{{item1.fileName}}</el-link >
                                        </div>
                                    </div>
                                </span>
                            </div>
                        </el-col>
                        <el-col :span="20" v-if="mainPageList.state11 !== 1" >
                            <div style="display:flex">
                                <span class="imageMainbox">{{M2('结构图片')}}： </span>
                                <span class="imageMainboxText">
                                    <div class="boxFlex">
                                        <div class="image-flex">
                                            <el-image v-for="(item1) in item.structureImgs" :key="item1.fileUri" :src="item1.showImgUrl" :preview-src-list="[item1.showBigImgUrl]"></el-image>
                                        </div>
                                    </div>
                                </span>
                             </div>
                        </el-col>
                        <el-col :span="20" v-if="mainPageList.state11 !== 1 && item.structureFiles && item.structureFiles.length > 0">
                            <div style="display:flex">
                                <span class="imageMainbox">{{M2('结构相关文件')}}： </span>
                                <span class="imageMainboxText">
                                    <div>
                                        <div v-for="item1 in item.structureFiles" :key="item1.id">
                                           <el-link type="primary" class="a-link" @click="clickFileName(item1.fileUri)">{{item1.fileName}}</el-link >
                                        </div>
                                    </div>
                                </span>
                            </div>
                        </el-col>
                    </el-row> 
                </div>
                <div v-else>
                    <el-form v-for="(item,index) in devSignInfo.filter(item => item.usage != false)" :key="index" 
                        :model="item" :rules="rulesDesign" ref="ruleFormDesign" label-width="170px" size="mini">
                        <div class="devsign-b">
                            <el-row class="textSpeaing">
                                <el-col :span="10" :xs="10" :sm="10" :md="10" :lg="10" :xl="10" style="display:flex">
                                    <span>  
                                        <div style="display: flex;justify-content: space-between;position: absolute;">
                                            <div>
                                                <div>{{M2('方案') + changeNum(index)}}</div>
                                            </div>
                                        </div> 
                                    </span>
                                    <el-form-item prop="designer" :label="M2('设计方') + ':'">
                                        <span class="imageMainboxText" style="width:100%;margin-bottom:10px">
                                            <el-select v-model="item.designer" size="mini">
                                                <el-option 
                                                    v-for="item in designerList"                        
                                                    :key="item.value"
                                                    :label="M2(item.label)"
                                                    :value="item.value"
                                                    >
                                                </el-option>
                                            </el-select>  
                                        </span>
                                    </el-form-item>
                                    
                                </el-col>  
                                <el-col :span="10">
                                    <span class="tableText" style="margin-right: 10px;" @click="addDevsign(index)" v-if="index == 0">{{M2('添加方案')}}</span>    
                                    <span class="red-text" :style="{'margin-left':index == 0 ? '0px':''}" @click="delDevsign(index)">
                                        {{M2('删除方案')}}
                                    </span>
                                </el-col>
                            </el-row>

                            <el-row class="textSpeaing">
                                <el-col :span="10" :xs="20" :sm="20" :md="20" :lg="20" :xl="20" style="display:flex">
                                    <el-form-item :label="M2('设计图片') + ':'" prop="designerImgs">
                                        <imgUpload 
                                            :fileType='2' 
                                            :dataParams="{ fileType:2,productDemandId:routeParam.id || 0}" 
                                            :showButton="false" :value='item.designerImgs' 
                                            :limit="10"
                                            imageURl="/productDemand/saveProductDemandAttachment" 
                                            :imgUrl="imgUrl" 
                                        
                                        ></imgUpload> 
                                        <div class="fover-click" @click="addDevsignFile(index)">
                                            {{M2('添加设计说明')}}
                                        </div>
                                    </el-form-item>
                                </el-col>  
                            </el-row>
                            <div >
                                <el-row class="textSpeaing" v-if="item.explain  || item.showDevsignFile">
                                    <el-col :span="20" :xs="20" :sm="20" :md="20" :lg="20" :xl="10" style="display:flex">
                                        <el-form-item  :label="M2('设计说明') + ':'" prop="explain" style="width:100%">
                                            <el-input type="textarea" rows="3" v-model="item.explain"></el-input>
                                        </el-form-item>
                                    </el-col>  
                                </el-row>  
                                <el-row class="textSpeaing" v-if="(item.designerDescImgs && item.designerDescImgs.length > 0) || item.showDevsignFile">
                                    <el-col :span="10" :xs="20" :sm="20" :md="20" :lg="20" :xl="20" style="display:flex">
                                        <el-form-item  :label="M2('设计说明-图片') + ':'" prop="designerDescImgs">
                                            <imgUpload 
                                                :fileType='4' 
                                                :dataParams="{ fileType:4,productDemandId:routeParam.id || 0}" 
                                                :showButton="false" :value='item.designerDescImgs' 
                                                :limit="10"
                                                imageURl="/productDemand/saveProductDemandAttachment" 
                                                :imgUrl="imgUrl" 
                            
                                            ></imgUpload> 
                                        </el-form-item>
                                    </el-col>  
                                </el-row>  
                                <el-row class="textSpeaing" v-if="(item.designerDescFiles && item.designerDescFiles.length > 0) || item.showDevsignFile">
                                    <el-col :span="10" :xs="20" :sm="20" :md="20" :lg="20" :xl="20" style="display:flex">
                                        <el-form-item :label="M2('设计说明-文件') + ':'" prop="designerDescFiles">
                                            <fileUpload 
                                                :fileType='5' 
                                                :dataParams="{ fileType:5,productDemandId:routeParam.id || 0}" 
                                                accept='.doc,.docx,.pdf,.xlsx,.csv,.xls' 
                                                :value='item.designerDescFiles' 
                                                :limit="5"
                                                imageURl="/productDemand/saveProductDemandAttachment" 
                                                :imgUrl="imgUrl" 
                                                extraParams='productDemandId'  
                                            ></fileUpload> 
                                        </el-form-item>
                                    </el-col>  
                                </el-row>                              
                            </div>
                            <el-row class="textSpeaing" v-if="mainPageList.state11 != 1">
                                <el-col :span="10" :xs="20" :sm="20" :md="20" :lg="20" :xl="20" style="display:flex">
                                    <el-form-item :label="M2('结构图片') + ':'" prop="structureImgs">
                                        <imgUpload 
                                            :fileType='3' 
                                            :dataParams="{ fileType:3,productDemandId:routeParam.id || 0}" 
                                            :showButton="false" :value='item.structureImgs' 
                                            :limit="10"
                                            imageURl="/productDemand/saveProductDemandAttachment" 
                                            :imgUrl="imgUrl" 
                        
                                        ></imgUpload> 
                                         <div class="fover-click" @click="showDesignFile(index)">
                                            {{M2('添加结构文件')}}
                                        </div>
                                    </el-form-item>
                                </el-col>  
                            </el-row>                            
                            <el-row class="textSpeaing" v-if="mainPageList.state11 != 1 && (item.structureFiles && item.structureFiles.length > 0 || item.showStructureFiles)">
                                <el-col :span="10" :xs="20" :sm="20" :md="20" :lg="20" :xl="20" style="display:flex">
                                    <el-form-item :label="M2('结构相关文件') + ':'" prop="structureFiles">
                                        <fileUpload 
                                            :fileType='6' 
                                            :dataParams="{ fileType:6,productDemandId:routeParam.id || 0}" 
                                            accept='.pdf'
                                            :value='item.structureFiles' 
                                            :limit="5"
                                            imageURl="/productDemand/saveProductDemandAttachment" 
                                            :imgUrl="imgUrl" 
                                            extraParams='productDemandId'  
                                        ></fileUpload> 
                                    </el-form-item>
                                </el-col>  
                            </el-row>                            
                 
                        </div> 
                    </el-form>                   
                    <div class="bottomButton">
                        <el-button type="primary" @click="submitForm2('ruleFormDesign')" size="mini">{{M2('保存')}}</el-button>
                        <el-button @click="updeEditPage('isEdit2',true)"  size="mini">{{M2('取消')}}</el-button>
                    </div>
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
            
            <i class="el-icon-s-fold" :title="M2('收缩日志')" @click="closeUploadDialog()" v-if="dialogVisible"></i>      
            <i class="el-icon-s-unfold" :title="M2('展开日志')" @click="openRecordDialog()" v-else></i>
        </div>
        <commonDialog ref="commonDialog" :titleText="M2('历史专利信息')">
            <div>
                <el-row class="textSpeaing" >
                    <el-col :span="10" :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
                        <div style="display:flex">
                            <span class="imageMainbox"> {{M2('查询结果')}}： </span>
                            <div>
                                <div v-for="item in historyPatentInfo" :key="item.countryCode">{{showCountryText(item.countryCode) }} - {{showReqRes(item.reqRes)}}</div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row class="textSpeaing" >
                    <el-col :span="10" :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
                        <div style="display:flex">
                            <span class="imageMainbox"> {{M2('专利说明')}}： </span>
                            <div>
                                <div  v-for="item in historyPatentInfo" :key="item.countryCode">{{showCountryText(item.countryCode)}} - {{item.patentInfo}}</div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </commonDialog>
        <checkStatusDialog ref="checkStatusDialog"  @mainListList='init'></checkStatusDialog>
        <div class="bottom-button" v-if="!noEditableList.includes(this.mainPageList.state)">
            <el-button size="mini" plain type="primary"  @click="toExamine()" v-if="this.mainPageList.state">{{mainPageList.state == 2 || mainPageList.state == 3 ? M2('审核') :M2('提交')}}</el-button>
        </div>
    </div>
</template>
<script>
import { GetFileServiceUrl,judgePorduction,addMask} from '@/utils/tools.js'
import { getProductDemandById,getFilePath,saveProductDemand,hasPermissions,atGetSeriesCategoryDef,selectRoleEmployeeForRoleId,queryPlats,saveProductDemandPatent,saveProductDemandDesignInfo,getEmployee} from '@/api/user.js'
export default {
    name:'sampleDetail',
    components:{
        // sampleBasicDataDetail:() => import('@/components/sampleConfirmation/sampleBasicDataDetail'),//产品详情页
        remarksNew:() => import('@/components/remarksNew.vue'),//日志页面
        imgUpload:() => import('@/components/common/commonUploadImg'),
        fileUpload:() => import('@/components/common/commonUploadFile'),
        commonDialog:()=> import('@/components/common/commonDialog'),
        checkStatusDialog:() => import('@/components/atNewProductPage/checkStatusDialog.vue'),
    },
    data(){
        return {
            ruleForm:{
                productColor:[]
            },
            checkList:[
                '米色','黑色','蓝色','天蓝','绿蓝/宝石蓝','浅蓝','深蓝','藏蓝','棕色','深棕色/茶色','浅棕色','中棕色','透明色','黄金','灰色','绿色','白色',
                '奶白色','象牙色','多色','橙色','深橙色','粉红色','紫色','红色','浅红色','银色','黄色','镀铬色','不锈钢','木色','金属钛','古铜色','玫红色',
                '咖啡色','橄榄色','卡其色','铁灰色','暗灰色','驼色','彩虹色','肉色','浅紫色','深紫色','酒红色','复古色'
            ],
            designList:[
                {
                    label:'是',
                    value:1
                },
                {
                    label:'否',
                    value:2
                },
                {
                    label:'设计',
                    value:10
                },
                {
                    label:'P图',
                    value:11
                },
            ],
            productDemandImgs:[],
            historyPatentInfo:[],
            targetPrice:[],
            queryPlatsList:[],
            patentCountry:[],
            employee:{},
            patentInfo:{
                countryList:[],
            },
            nowStatus:0,
            dialogVisible:false,
            renderDom:false,
            imgUrl:'',
            showTenth:false,
            devSignInfo:[
                {
                    id:null,//编辑时必传
                    productDemandId:this.$route.query.id,//新品需求id
                    designer:null,//设计方  1:设计部、2:工厂、3:工厂&设计部
                    usage: true,//使用情况    true 正常     false删除 -- 需要删除时传 false，其他时候不用传值或者true
                    designerImgs: [//设计图片 -- 文件上传后返回数据
                    ],
                    structureImgs: [],
                    designerDescImgs: [], 
                    designerDescFiles: [],  
                    structureFiles: [],  
                }
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
             supplierTypeList:[
                {
                    name:'工厂',
                    label:1,
                },
                {
                    name:'平台',
                    label:2,
                },
                {
                    name:'线下',
                    label:3,
                },
                {
                    name:'设计师推荐',
                    label:4,
                },
                {
                    name:'其他',
                    label:5,
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
            //英、美、德、意、法、西、日、加
            countryList1:[
                {
                    label: 'US',
                    value: 'US',
                },
                {
                    label: 'GB',
                    value: 'GB',
                },
                {
                    label: 'DE',
                    value: 'DE',
                },
                {
                    label: 'FR',
                    value: 'FR',
                },
                {
                    label: 'IT',
                    value: 'IT',
                },
                {
                    label: 'ES',
                    value: 'ES',
                },
                {
                    label: 'CA',
                    value: 'CA',
                },
                {
                    label: 'JP',
                    value: 'JP' ,
                },

            ],
            mainPageList:{
                saleMarket:[],
                desiredColor:[]
            },
            controlsEdit:{
                isEdit:true,
                isEdit1:true, 
                isEdit2:true, 
                isEdit3:true, 
            },
            imgLoading:false,
            productLinkRequire:false,
            routeParam:{
                id:this.$route.query.id || null
            },
            patentRules:{
                countryList: [
                    { required: true, message: this.M2('请选择查询国家'), trigger: 'blur' },
                ],
                queryResults: [
                    {
                        required:true,
                        validator: (rules, value, cb) => {
                            if(!this.patentRules.countryList || this.patentRules.countryList.length == 0){
                                return cb(new Error(this.M2("请选择查询结果")));
                            }
                            let list  = this.countryList.filter(item => {
                                return this.patentInfo.countryList.includes(item.countryCode)
                            })
                            if(list.some(item => !item.reqRes)){
                                return cb(new Error(this.M2("请选择查询结果")));
                            }
                            return cb();
                        },
                        trigger: "change"
                    }
                ],
            },
            rulesDesign:{
                designer: [
                    { required: true, message: this.M2('请选择查询国家'), trigger: 'blur' },
                ],
                designerImgs: [
                    {
                        required:true,
                        message:this.M2('请添加结构图片'),
                        trigger: "change"
                    }
                ],
            },
            rules:{
                productDemandImgs: [
                    { required: true, message: this.M2('请添加产品图片'), trigger: 'blur' },
                ],
                title: [
                    { required: true, message: this.M2('请添加产品名称'), trigger: 'blur' }
                ],
                businessId: [
                    { required: true, message: this.M2('请选择业务开发'), trigger: 'blur' }
                ],
                design: [
                    { required: true, message: this.M2('请选择设计款'), trigger: 'blur' }
                ],
                productSource: [
                    { required: true, message: this.M2('请选择产品来源'), trigger: 'blur' }
                ],
                classCategoryIdArray: [
                    { required: true, message: this.M2('请选择系列-类目'), trigger: 'blur' }
                ],
                factoryName: [
                    { required: true, message: this.M2('请添加工厂名称'), trigger: 'blur' }
                ],
                otherSources: [
                    { required: true, message: this.M2('请添加其他来源'), trigger: 'blur' }
                ],
                productSourceDesigner: [
                    { required: true, message: this.M2('请填写设计师名称'), trigger: 'blur' }
                ],
                saleMarket: [
                    { required: true, message: this.M2('请选择建议售卖市场'), trigger: 'blur' }
                ],
                recomReason: [
                    { required: true, message: this.M2('请添加推荐理由'), trigger: 'blur' }
                ],
                productLink:[
                    {
                        required:(this.mainPageList && this.mainPageList.productSource == 2 )|| this.productLinkRequire,
                        validator: (rules, value, cb) => {
                            if( !this.mainPageList.productLink || !this.mainPageList.productLinkMarket){
                                return cb(new Error(this.M2("请填加产品链接")));
                            }
                            return cb();
                        },
                        trigger: "change"
                    }
                ]
            },
            developmentProgresses:[
            {
                statusValue:'待提交',
                status:'1',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:'待提交'
            },
            {
                statusValue:'需求初审',
                status:'2',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:'需求初审'
            },
            {
                statusValue:'需求复审',
                status:'3',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:'需求复审'
            },
            {
                statusValue:'需求调研',
                status:'4',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:'需求调研'
            },
            {
                statusValue:'立项中',
                status:'5',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:'立项中'
            },
            {
                statusValue:'认证初查',
                status:'6',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:'认证初查'
            },
            {
                statusValue:'制定设计需求',
                status:'7',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:'制定设计需求'
            },
            {
                statusValue:'产品设计',
                status:'8',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:'P图'
            },
            {
                statusValue:'专利查询',
                status:'10',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:'专利查询'
            },
            {
                statusValue:'结构设计',
                status:'11',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:'结构设计'
            },
            {
                statusValue:'样前方案确认',
                status:'12',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:'样前方案确认'
            },
            {
                statusValue:'开发中',
                status:'18',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:'开发中'
            },
            {
                statusValue:'计划下单中',
                status:'13',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:'计划下单中'
            },
            {
                statusValue:'候选下单',
                status:'14',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:'候选下单'
            },
            {
                statusValue:'已下单',
                status:'15',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:'已下单'
            },
            {
                statusValue:'已冻结',
                status:'16',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:'已冻结'
            },
            {
                statusValue:'已取消',
                status:'17',
                createBy:'',
                createOn:'',
                toStatus :'',
                toStatusValue:'已取消'
            },
            ],//进度条数据
            noEditableList:[13,14,15,16,17,18],
            copeMainPageList:{},
        }
    },
    computed:{
        action(){
            return `${process.env.VUE_APP_DEVSERVER}/productSample/saveProductSampleAttachment`
        },
        requireT(){
            return this.mainPageList && this.mainPageList.productSource == 2 ? true : false
        },
        assigneePermission(){
            if(this.employee.Id == this.mainPageList.assigneeId || this.employee.IsAdminRole || !this.mainPageList.assigneeId){
                return true
            }else {
                return false
            }
        }
    },
    mounted(){
        this.init()
    },
    methods:{  
        init(){
            this.routeParam.id = this.$route.query.id || null
            getEmployee().then(res => {
                this.employee = res.data
            })
            this.getPermissions()
            //获取系列数据
            atGetSeriesCategoryDef().then(res => {
                res.data.forEach(item => {
                    item.classifyDefs.forEach(list => {
                        list.seriesCategoryName = list.classifyDefName
                        list.seriesCategoryId = list.classifyDefId
                    })
                })
                this.patentCountry = res.data
            })
            //获取业务开发
            let itemList = {
                rid:document.URL.includes('yaheecloud') ? 40 : 171
                // rid:40//业务开发40
            }
            selectRoleEmployeeForRoleId(itemList).then(res => {
                this.targetPrice = res.data
            })
            //获取平台数据
            let url = document.URL.includes('yaheecloud') ? 'http://productdev.yaheecloud.com/tool-api/platstore/queryPlats' : 'http://api-tools-test.yahee.com.cn:81/api/platstore/queryPlats'
            queryPlats(url).then(res => {
                this.queryPlatsList = res.data
            })
            if(!this.routeParam.id){
                let url = judgePorduction() ? 'http://productdev.yaheecloud.com/tool-api/common/getFilePath' : 'http://api-tools-test.yahee.com.cn:82/tool-api/common/getFilePath'
                getFilePath(url).then(res1 => {
                    this.imgUrl = res1.data
                })
                return
            }
            let param = {
                id:this.routeParam.id
            }
            getProductDemandById(param).then(res => {
                let url = judgePorduction() ? 'http://productdev.yaheecloud.com/tool-api/common/getFilePath' : 'http://api-tools-test.yahee.com.cn:82/tool-api/common/getFilePath'
                getFilePath(url).then(res1 => {
                    this.imgUrl = res1.data
                    if(res.data.productDemandImgs && res.data.productDemandImgs.length > 0){
                        res.data.productDemandImgs.forEach(item => {
                            item.showImgUrl = `${this.imgUrl}/Small/${item.fileUri}`
                            item.showBigImgUrl = `${this.imgUrl}/${item.fileUri}`
                        })
                    }
                    res.data.classCategoryIdArray = [res.data.seriesCategoryId,res.data.classifyDefId]
                    //处理专利信息数据
                    let patentInfo = []
                    if(res.data.productDemandPatents && res.data.productDemandPatents.length > 0){
                        patentInfo = res.data.productDemandPatents.filter(item => {
                            return item.flag == 1
                        })
                    }
                    if(patentInfo.length > 0){
                        patentInfo[0].patentInfo = JSON.parse(patentInfo[0].patentInfo)
                        this.patentInfo = {
                            countryList: patentInfo[0].patentInfo && patentInfo[0].patentInfo.length > 0 ? patentInfo[0].patentInfo.map(item => {return item.countryCode}) : [],
                            patentInfoT:patentInfo[0].patentInfo,
                            id:patentInfo[0].id,
                            productDemandId: patentInfo[0].productDemandId,
                        }
                        if(patentInfo[0].patentInfo && patentInfo[0].patentInfo.length){
                            this.countryList.forEach(item => {
                                patentInfo[0].patentInfo.forEach(item1 => {
                                    if(item.countryCode == item1.countryCode){
                                        this.$set(item,'reqRes',item1.reqRes)
                                        this.$set(item,'patentInfo',item1.patentInfo)
                                    }
                                })
                            })
                        }
                    }else {
                        this.patentInfo.countryList = []
                    }
                    //处理市场数据
                    if(res.data.saleMarket){
                        res.data.saleMarket = res.data.saleMarket.split(',')
                    }
                    if(res.data.desiredColor){
                        res.data.desiredColor = res.data.desiredColor.split(',')
                    }
                    //处理设计信息数据
                    if(res.data.productDemandDesignInfos && res.data.productDemandDesignInfos.length > 0){
                        res.data.productDemandDesignInfos.forEach(item => {
                            if(item.designerImgs){
                                item.designerImgs.forEach(item1 => {
                                    item1.showImgUrl = `${this.imgUrl}/Small/${item1.fileUri}`
                                    item1.showBigImgUrl = `${this.imgUrl}/${item1.fileUri}`
                                })
                            }else {
                                item.designerImgs = []
                            }
                            if(item.structureImgs){
                                item.structureImgs.forEach(item1 => {
                                    item1.showImgUrl = `${this.imgUrl}/Small/${item1.fileUri}`
                                    item1.showBigImgUrl = `${this.imgUrl}/${item1.fileUri}`
                                })
                            }else {
                                item.structureImgs = []
                            }
                            if(item.designerDescImgs){
                                item.designerDescImgs.forEach(item1 => {
                                    item1.showImgUrl = `${this.imgUrl}/Small/${item1.fileUri}`
                                    item1.showBigImgUrl = `${this.imgUrl}/${item1.fileUri}`
                                })
                            }else {
                                item.designerDescImgs = []
                            }
                            if(item.designerDescFiles){
                                item.designerDescFiles.forEach(item1 => {
                                    item1.name =  item1.fileName
                                })
                            }else {
                                item.designerDescFiles = []
                            }
                            if(item.structureFiles){
                                item.structureFiles.forEach(item1 => {
                                    item1.name =  item1.fileName
                                })
                            }else {
                                item.structureFiles = []
                            }
                            if(!item.id){
                                item.id = this.$route.query.id
                            }
                        })
                        this.devSignInfo = res.data.productDemandDesignInfos
                    }
                    //处理状态进度数据
                    if(res.data.progresses && res.data.progresses.length > 0){
                        this.developmentProgresses.forEach(item => {
                            res.data.progresses.forEach(item1 => {
                                if(item1.state == 9){
                                    item1.state = 8
                                }
                                if(item1.state == item.status){
                                    item.createBy = item1.createBy
                                    item.createOn =item1.createOn ? this.$moment(item1.createOn).format("YYYY-MM-DD HH:mm:ss") : null
                                }
                            })
                        })
                    }
                    if(res.data.design == 2){
                        this.developmentProgresses = this.developmentProgresses.filter(item => {
                            return item.status != 8
                        })
                    }
                    if(res.data.state < 13 && res.data.state > 8){
                        if(res.data.design == 2){
                            this.nowStatus = res.data.state ? res.data.state - 3 : 0
                        }else {
                            this.nowStatus = res.data.state ? res.data.state - 2 : 0
                        }
                    }else if(res.data.state == 18){
                        if(res.data.design == 2){
                           this.nowStatus = 10
                        }else {
                            this.nowStatus = 11
                        } 
                    }else { 
                        if(res.data.design == 2){
                            this.nowStatus = res.data.state ? res.data.state - 2 : 0
                        }else {
                            this.nowStatus = res.data.state ? res.data.state - 1 : 0
                        }
                    }
                    this.mainPageList = res.data
                    this.copeMainPageList = JSON.parse(JSON.stringify(this.mainPageList))
                })
            })  
        },
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = {
                        id:this.routeParam.id,//编辑时必传
                        productDemandImgs: this.mainPageList.productDemandImgs,
                        title: this.mainPageList.title,
                        businessId: this.mainPageList.businessId,
                        design:this.mainPageList.design,
                        // seriesCategoryId: this.mainPageList.seriesCategoryId,
                        // classifyDefId:this.mainPageList.classifyDefId,
                        productSource:this.mainPageList.productSource,
                        factoryName:this.mainPageList.factoryName,
                        platForm:this.mainPageList.platForm,
                        productSourceDesigner:this.mainPageList.productSourceDesigner,
                        productLink:this.mainPageList.productLink,
                        productLinkMarket:this.mainPageList.productLinkMarket,
                        otherSources:this.mainPageList.otherSources,
                        desiredColor:this.mainPageList.desiredColor && this.mainPageList.desiredColor.length > 0? this.mainPageList.desiredColor.toString() : null,
                        requiredSize:this.mainPageList.requiredSize,
                        processMaterial:this.mainPageList.processMaterial,
                        saleMarket:this.mainPageList.saleMarket.toString(),
                        xsdailySales:this.mainPageList.xsdailySales,
                        recomReason:this.mainPageList.recomReason,
                        adjustDirection:this.mainPageList.adjustDirection,
                        otherInstructions:this.mainPageList.otherInstructions,
                        productDemandCompetings:this.mainPageList.productDemandCompetings,
                        seriesCategoryId:  this.mainPageList.classCategoryIdArray[0],//类目系列
                        classifyDefId: this.mainPageList.classCategoryIdArray[1],
                    }
                    if(this.mainPageList.productDemandCompetings && this.mainPageList.productDemandCompetings.length > 0){
                        let filterProductDemand = this.mainPageList.productDemandCompetings.filter(item => {
                            return item.usage != false
                        })
                        if(filterProductDemand && filterProductDemand.length > 0){
                            if(!filterProductDemand.every(item => item.urlMarket) || !filterProductDemand.every(item => item.url)){
                                this.error('请补全竞品信息的市场和链接信息！')
                                return
                            }
                        }
                    }
                    saveProductDemand(params).then((res) => {
                        if(res.code == 200){
                            this.$message({
                                type: 'success', 
                                message:this.M2('保存成功'),
                                offset:220
                            })
                        }
                        this.$set(this.routeParam,'id',res.data)
                        this.$router.push({query:{id:res.data}})
                        this.init()
                        this.controlsEdit.isEdit = true
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });   
        },
        submitForm1(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let list  = this.countryList.filter(item => {
                        return this.patentInfo.countryList.includes(item.countryCode)
                    })
                    let params = {
                        productDemandId:this.routeParam.id,//专利信息id 编辑必传
                        id: this.patentInfo.id,  
                    }
                    let patentInfo = list.map(item => {
                        return {
                            countryCode:item.countryCode,
                            patentInfo:item.patentInfo,
                            reqRes:item.reqRes,
                        }
                    })
                    params.patentInfo = JSON.stringify(patentInfo)
                    saveProductDemandPatent(params).then((res) => {
                        if(res.code == 200){
                            this.$message({
                                type: 'success', 
                                message:this.M2('保存成功'),
                                offset:220
                            })
                        }
                        this.init()
                        this.controlsEdit.isEdit1 = true
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            }); 
        },
        submitForm2(formName){
            let usage = [] 
            usage = this.devSignInfo.filter((item) => {
                return item.usage
            })
            if(usage.length == 0){
                this.error('请至少填写一条数据！')
            }
            let p1 = []
            this.$refs[formName].forEach(item => {
                p1.push(item.validate())
            })
            Promise.all(p1).then(res => {
                let num = -1
                this.devSignInfo.forEach((item) => {
                    if(item.usage){
                        num +=1
                        item.seriaNum = this.changeNum(num)
                    }
                    item.productDemandId = this.routeParam.id
                })
                saveProductDemandDesignInfo(this.devSignInfo).then((res) => {
                    if(res.code == 200){
                        this.$message({
                            type: 'success', 
                            message:this.M2('保存成功'),
                            offset:220
                        })
                    }
                    this.init()
                    this.controlsEdit.isEdit2 = true
                })
            }).catch(err => {
                return
            })
        },
         //下载地址
        clickFileName(url){
            window.open(`${this.imgUrl}${url}`)
        },
        routerDev(){
            if(judgePorduction()){
                window.open(`http://productdev.yaheecloud.com/productDetails?developmentId=${this.mainPageList.developmentId}&productId=${this.mainPageList.productId}&productCountryId=${this.mainPageList.productCountryId}`,'_blank')
            }else {
                window.open(`http://api-tools-test.yahee.com.cn:82/productDetails?developmentId=${this.mainPageList.developmentId}&productId=${this.mainPageList.productId}&productCountryId=${this.mainPageList.productCountryId}`,'_blank')
            }  
        },
         //审核数据 
        toExamine(list){
            let checkList = []
            checkList.push(this.copeMainPageList)
            if(checkList.length == 0) {
                this.error('请至少选择一条数据！')
                return
            }
            if(checkList.some(item => [13,14,15,16,17].includes(item.state))){
                this.error('计划下单、候选下单、已下单、已取消、已冻结状态不允许审批！')
                return
            }
            if(checkList.some(item => item.state != checkList[0].state)){
                this.error('请选择相同状态的数据！')
                return
            }
            if(checkList.length > 1 && checkList.some(item => item.state == 6 || item.state == 7 || item.state == 10 || item.state == 13)){
                this.error('所选状态不支持批量处理！')
                return
            }
            if(checkList.some(item => item.assigneeId != this.employee.Id) && !this.employee.IsAdminRole){
                this.error('只有当前经办人可以审批该数据！')
                return
            }
            let checkStatusDialog = this.$refs.checkStatusDialog
            checkStatusDialog.openDialog(checkList) 
        },
        showDesign(val){
            if(!val) return '--'
            let des = []
            des = this.designList.filter(item => {
                return item.value == val
            })
            if(des.length > 0){
                return des[0].label
            }else {
                return '--'
            } 
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
        changeMarket(val){
            if(!val) return ''
            let des = []
            des = this.countryList1.filter(item => {
                return item.value == val
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
        showDesigner(val){
            if(!val) return ''
            let des = []
            des = this.designerList.filter(item => {
                return item.value == val
            })
            if(des.length > 0){
                return des[0].label
            }else {
                return ''
            }
        },
        changeNum(index){
            let numList = ['一','二','三','四','五','六','七','八','九','十']
            return numList[index]
        },
        leftMove(){
            let  image = document.querySelector('.step-container')
            if(image.offsetLeft > 30)return
            image.style.left = image.offsetLeft +100 + 'px'
        },
        //点击右边按钮
        rightMove(){
            let image = document.querySelector('.step-container')
            if(image.offsetLeft <  window.innerWidth - 120 * 18){
                return
            }else{
                image.style.left = image.offsetLeft - 100 + 'px'
            }
        },
        //删除竞品信息
        deleteRow(index,) {
            // this.mainPageList.productDemandCompetings.splice(index, 1);
            let filterProductDemand = this.mainPageList.productDemandCompetings.filter(item => {
                return item.usage != false
            })
            filterProductDemand[index].usage = false
        },
        //添加竞品信息
        addTableList(){
            if(!this.mainPageList.productDemandCompetings) this.$set(this.mainPageList,'productDemandCompetings',[])
            let filterProductDemand = this.mainPageList.productDemandCompetings.filter(item => {
                return item.usage != false
            })
            
            if(filterProductDemand.length > 9){
                this.error('最多添加10条竞品信息！')
                return
            }
            this.mainPageList.productDemandCompetings.push({
                url:'',
                urlMarket:'',
                bandinfo:'',
                ranking:'',
                minPrice:'',
                maxPrice:'',
                usage:true,
            })
        },
        //权限控制
        getPermissions(){
            let  params = [
                'PM00038',
                'PM00048',
                'PM00049',
                'PM00050',
            ]
            hasPermissions(params).then(res => {
                this.pageLoading = false
                let data = JSON.stringify( res.data);
                sessionStorage.setItem("permissions", data);
                let per = res.data.filter(item => {
                    return item.PermissionCode == 'PM00038' && !item.HasPermission
                })
                if(per && per.length > 0){
                    addMask('PM00038')
                }else {
                    this.renderDom = true
                } 
            })
        },
        //添加设计信息
        addDevsign(i){
            if(this.devSignInfo.length > 9){
                this.error('设计方案最多10条！')
                return
            }
            let filterDevSignInfo = this.devSignInfo.filter(item => {
                return item.usage != false
            })
            this.devSignInfo.push({
                id:null,//编辑时必传
                productDemandId:this.routeParam.id,//新品需求id
                designer:null,//设计方  1:设计部、2:工厂、3:工厂&设计部
                seriaNum:this.changeNum(filterDevSignInfo.length + 1),//方案编号
                usage: true,//使用情况    true 正常     false删除 -- 需要删除时传 false，其他时候不用传值或者true
                designerImgs: [],//设计图片 -- 文件上传后返回数据,
                structureImgs: [],
                designerDescImgs: [],
                designerDescFiles: [],
                structureFiles: [],
                explain: '',
            })
        },
        //删除设计信息
        delDevsign(i){
            let filterDevSignInfo = this.devSignInfo.filter(item => {
                return item.usage != false
            })
            if(filterDevSignInfo.length <= 1){
                this.error('最少要有一条设计方案！')
                return
            }
            this.$set(filterDevSignInfo[i],'usage',false)
        },
        addDevsignFile(i){
            this.$set(this.devSignInfo.filter(item => {
                return item.usage != false
            })[i],'showDevsignFile',true
            )
        },
        showDesignFile(i){
            this.$set(this.devSignInfo.filter(item => {
                return item.usage != false
            })[i],'showStructureFiles',true
            )
        },
        //路由参数
        routerMove(id){
            let routeData = this.$router.resolve({
                name: "sampleDetail",
                query:{
                    id
                }
            });
            window.open(routeData.href, '_blank');
        },
         //下载文件地址
        GetFileServiceUrl(url) {
            return GetFileServiceUrl(url)
        },
        //关闭日志弹窗
        closeUploadDialog(){
            this.showTenth = false
            this.dialogVisible = false
        },
        //打开日志弹窗
        openRecordDialog(){
            this.remarksParam = {
                productCountryId:this.routeParam.id,
                noteBussinessName:'ProductDemand_Dev',
                pageNum:0,
                PageIndex:-1,
                proImageList:GetFileServiceUrl(),
                mainBtn:false,
                Mark:null,
                showAllbutton:false,
            }
            this.showTenth = true
            this.dialogVisible = true
        },
        //更新图片数据
        upDateFile(list,name){
            this.$set(this.mainPageList,name,list)
            this[name]= list
        },
        //取消按钮更新数据
        updeEditPage(key,value,shouldUpdate){  
            this.$set(this.controlsEdit,key,value)
            this.init()
        },
        //专利信息显示历史数据
        showHistoryQueryInfo(){
            let  patentInfo = []
            if(this.mainPageList.productDemandPatents && this.mainPageList.productDemandPatents.length > 0) {
                patentInfo = this.mainPageList.productDemandPatents.filter(item => {
                    return item.flag == 0
                })
                if(patentInfo.length == 0) {
                    this.warning('未查询到历史数据！')
                    return
                }
                this.historyPatentInfo = JSON.parse(patentInfo[0].patentInfo) 
                this.$refs.commonDialog.dialogVisible = true
            }
        },
        //成功消息提示
        success() {
            this.$message({
                showClose: true,
                message: '操作成功',
                offset:220,
                duration: 2000,
                type: 'success'
            });
        },
        //警告消息提示
        warning(msg) {
            this.$message({
                showClose: true,
                message: this.M2(msg),
                offset:220,
                type: 'warning'
            });
        },
        //错误消息提示
        error(msg) {
            this.$message({
                showClose: true,
                message:this.M2(msg),
                offset:220,
                type: 'error'
            });
        },
    }
}
</script>
<style scoped lang="scss">
.bottom-button {
    z-index: 1000;
    display: flex;
    justify-content: center;
    border: 1px solid #ffffff;
    background-color: #ffffff;
    position: fixed;
    bottom: 0px;
    right: 0px;
    width: 100%;
    padding: 5px;
    box-shadow: -5px -5px 5px #cccccc
}
.word-break {
    word-break: break-all;
}
.devsign-b{
    border-bottom: 1px solid #ccc;
    margin-bottom: 15px;
}
.tableText{
    &:hover{
        background-color: #3366cc;
        color: #ffffff;
    }
    color:#3366cc ;
    cursor: pointer;
    margin-top: 3px;
    padding: 0 5px;
    border-radius: 3px;
    font-size: 12px;
    display: inline-block;

}

.stepBox{
    position: relative;
    height: 90px;
    .leftButton{
        position: absolute;
        top: -36px;
        left: -20px;
        background: #ffffff;
        width: 50px;
        z-index: 9999;
        line-height: 175px;
        cursor: pointer;
        .el-icon-d-arrow-left{
            font-size: 30px;
        }
    } 
    ::v-deep.step-container{
        display: inline-block;
        width: 200%;
        // overflow: hidden;
        position: absolute;
        left: 23px;
        .el-step.is-horizontal {
            width: 120px;
        }
        .is-success{
            color: green !important;
            border-color: green !important;
            .el-step__line-inner{
                border-width: 1px !important;
                width: 100% !important;;
            }
        }
        .stepTitle{ 
            font-size: 12px;
            // width: 132px;
        }
    }
    .rightButton{
        position: absolute;
        right: -20px;
        width: 52px;
        z-index: 9999;
        top: -36px;
        background: #ffffff;
        line-height: 175px;
        cursor: pointer;
        .el-icon-d-arrow-right{
            font-size: 30px;
        }
    }
}
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
::v-deep.sample-basis {
    .el-row {
        margin-top: 5px;
    }
    .el-select{
        display: block;
    }
}
.bg-gray {
    min-height: 100vh;
    background-color: #ededed;
    padding: 5px;
    .el-icon-s-unfold {
        z-index: 111111;
        position: fixed;
        top: 46px;
        left: 10px;
        font-size: 30px;
        cursor: pointer;
        box-shadow: 1px 1px rgba(0,0,0,0.1);
    }
    .el-icon-s-fold {
        background: #fff;
        z-index: 11111;
        position: fixed;
        top: 46px;
        left: 645px;
        font-size: 30px;
        cursor: pointer;
        box-shadow: 1px 1px rgba(0,0,0,0.1);
    }
    .clearfix {
        height: 20px;
    }
.flex-stact-title {
    position: sticky;
    top: 0px;
    background-color: #ededed;
    z-index: 999;
    .header-title {
        height: 30px;
        line-height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        position: relative;
        border-bottom: 1px solid #ccc; background-color: #fff;
        .header-title-text{
            position: absolute;
            left: 10px;
            font-size: 12px;
            color: #747474;
            top: 0px;
        }
        .header-text {
            font-size: 18px;
            font-weight: bold;
        }
        .right-button {
            display: flex;
            position: absolute;
            right: 10px;
            top: 4px;
            .green-div,.gray-div {
                background-color: #0f7535;
                color: #fff;
                padding: 0px 5px;
                margin-right: 5px;
                height: 20px;
                line-height: 20px;
            }
            .gray-div {
                background-color: #606060;
            }
            .green-font {
                color: #3366cc;
                height: 20px;
                line-height: 20px;
                margin-right: 5px;
                cursor: pointer;
            }
        }
    }
}
.tabContainer{
    height: 100%;
    width: 100%;
    background-color: rgba(230, 230, 230, 1);
    margin-bottom:40px;
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
.red-text {
    color: red;
    cursor: pointer;
    padding: 0 5px;
    border-radius: 3px;
    font-size: 12px;
    display: inline-block;
    margin-left: 70px;
    &:hover {
        background: red;
        color: #ffffff;
    }
}
.country-type {
    display:inline-block;width:60px;padding-right:5px;text-align:right;
    flex-shrink: 0;
}
.fover-click{
    color: #3366cc;
   text-align: left;
    cursor: pointer;
    padding: 1px 2px;
    font-size: 12px;
    float: left;
    display: inline-block;
    height: 20px;
    line-height: 20px;
    margin-top: 2px;
    margin-left: 5px;
    &:hover {
        background-color: #3366cc;
        color: #fff;
    }
}
</style>
<style>
.el-table .cell {
    white-space: pre-line;
}
</style>