<template>
    <div>
        <el-table
            border
            :data="remarksList"
            style="width: 100%">
            <el-table-column
                label="状态"
                prop="statusValue"
                width="180"
                >
            </el-table-column>
            <el-table-column
                label="结果"
                prop="operation"
                width="180"
                >
            </el-table-column>
            <el-table-column
                label="操作人"
                prop="trueName"
                width="180"
                >
            </el-table-column>
            <el-table-column
                label="备注信息"
                prop="note"
                width="180"
                >
            </el-table-column>
            <el-table-column
                label="编辑日期"
                prop="createdon"
                width="180"
                >
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    name:'remarksTable',
    data(){
        return {
        }
    },
    props:{
        remarksList : {
            type:Array,
            default:function(){
                return []
            }
            
        }
    }
}
</script>
<style lang="scss" scoped>

</style>