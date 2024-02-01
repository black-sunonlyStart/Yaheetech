<template>
    <el-table :empty-text="M2('暂无数据')" :data="subTableData" style="width: 100%" height="350" border :header-cell-style="{background:'#f5f7fa',color:'#606266'}" >
            <el-table-column width="145" align="center">
                <template slot="header">
                    {{M2('申请单号')}}
                </template>
                <template slot-scope="scope">
                    <el-link type="primary" style="font-size:12px" @click="subRouterMove(scope.row.id)">
                        {{scope.row.id}}
                    </el-link>
                </template>
            </el-table-column>
            <el-table-column width="145" align="center">
                <template slot="header" >
                    {{M2('申请ID')}}
                </template>
                <template slot-scope="scope" >
                    {{scope.row.productKey}}
                </template>
            </el-table-column>
            <el-table-column  align="center">
                <template slot="header">
                    {{M2('产品类型')}}
                </template>
                <template slot-scope="scope" >
                    {{M2(scope.row.scenariosStr)}}
                </template>
            </el-table-column>
            <el-table-column align="center" >
                <template slot="header">
                    {{M2('样品情况')}}
                </template>
                <template slot-scope="scope" >
                    {{M2(scope.row.sampleConditionStr)}}
                </template>
            </el-table-column>
            <el-table-column align="center">
                <template slot="header">
                    {{M2('样品尺寸')}}
                </template>
                <template slot-scope="scope" >
                    {{scope.row.sampleSize}}
                </template>
            </el-table-column>
            <el-table-column align="center">
                <template slot="header">
                    {{M2('状态')}}
                </template>
                <template slot-scope="scope" >
                    {{M2(scope.row.stateValue)}}
                </template>
            </el-table-column>
            <el-table-column align="center">
                <template slot="header">
                    {{M2('样品确认员')}}
                </template>
                <template slot-scope="scope" >
                    {{scope.row.sampleValidatorName}}
                </template>
            </el-table-column>
            <el-table-column  align="center" width="80">
                <template slot="header">
                    {{M2('申请次数')}}
                </template>
                <template slot-scope="scope" >
                    {{scope.row.sampleNum}}
                </template>
            </el-table-column>
           
        </el-table>
</template>
<script>
export default {
    data(){
        return {
            
        }
    },
    props:{
        subTableData:{
        type: Array,
            default:() => ([])
        },
    },
    methods:{
        subRouterMove(id){
         let routeData = this.$router.resolve({
                name: "sampleDetail",
                query:{
                    id
                }
            });
            window.open(routeData.href, '_blank');
        },
    }
}
</script>