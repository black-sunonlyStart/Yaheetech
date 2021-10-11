<template>
  <div class="nav-container">
    <el-card class="nav-card">
      <navBar  @putTableList='putTableList'></navBar>
    </el-card>
    <el-card class="button-card">
      <abilityBtn :selectRow='selectRow' @putTbleList='putTbleList'></abilityBtn>
    </el-card>
    <el-card class="mainTable-card">
      <mainTable :navFilterList='filterList' @putTbleSelection='putTbleSelection' ref="mainTable"></mainTable>
    </el-card>
  </div>
</template>

<script>
import navBar from '@/components/navBar.vue'
import abilityBtn from '@/components/abilityBtn.vue'
import mainTable from '@/components/mainTable.vue'
export default {
  name: 'packTableList',
  components: {
    navBar,
    abilityBtn,
    mainTable,
  },
  data () {
    return {
      currentRole: 'adminDashboard',
      faCoRemarks: false,
      filterList:{},
      selectRow:[],
    }
  },
  computed: {
  },
  created () {

  },
  methods: {
    putTbleSelection(val){
        this.selectRow = val || []
    },
    putTableList (val){
        this.filterList = val
    },
    putTbleList(){
        this.$refs.mainTable.getTableList(this.filterList)
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-container {
  padding-top: 10px;
  width: 100%;
  height: 100%;
  background-color: rgba(230, 230, 230, 1);
  ::v-deep .nav-card {
    z-index: 10001;
    margin: 0px 26px 10px 10px;
    position: fixed;
    width: 98%;
    z-index: 999;
    .el-card__body{
        padding: 10px 20px;
    }
  }
 ::v-deep .button-card {
    margin: 0px 18px 10px 10px;
    position: fixed;
    top: 215px;
    z-index: 1000;
    width: 98%;
    .el-card__body{
        padding: 3px 20px;
    }
  }
  ::v-deep.mainTable-card {
    margin: 0px 18px 10px 10px;
    position: relative;
    top: 246px;
    width: 98%;
    height: 71.5%;
    .el-card__body{
        padding: 5px 20px;
    }
  }
}
</style>
