<template>
  <div class="nav-container">
    <el-card class="nav-card">
      <navBar  @putTableList='putTableList'></navBar>
    </el-card>
    <el-card class="button-card">
      <abilityBtn :selectRow='selectRow'></abilityBtn>
    </el-card>
    <el-card class="mainTable-card">
      <mainTable :navFilterList='filterList' @putTbleSelection='putTbleSelection'></mainTable>
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
        console.log(this.filterList)
        this.filterList = val
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
  .nav-card {
    margin: 0px 26px 10px 10px;
    position: fixed;
    width: 97.6%;
    z-index: 999;
  }
 ::v-deep .button-card {
    margin: 0px 18px 10px 10px;
    position: fixed;
    top: 244px;
    z-index: 1000;
    width: 97.6%;
    .el-card__body{
        padding: 10px 20px;
    }
  }
  .mainTable-card {
    margin: 0px 18px 10px 10px;
    position: relative;
    top: 282px;
  }
}
</style>
