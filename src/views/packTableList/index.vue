<template>
  <div class="nav-container">
    <el-card class="nav-card">
      <navBar  @putTableList='putTableList' :total='total'></navBar>
    </el-card>
    <el-card class="button-card">
      <abilityBtn :selectRow='selectRow' @putTbleList='putTbleList' :navFilterList='filterList'></abilityBtn>
    </el-card>
    <el-card class="mainTable-card">
      <mainTable :navFilterList='filterList' @putTbleSelection='putTbleSelection' ref="mainTable" @getTotal='getTotal'></mainTable>
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
      total:''
    }
  },
  computed: {
  },
  created () {

  },
  mounted(){
      this.changeInnterWidth()
  },
  methods: {
      getTotal(total){
          this.total = total
      },
      changeInnterWidth(){
          if(window.innerWidth < 1450){
              document.querySelector('.nav-card > .el-card__body').style.paddingBottom = 5 + 'px'
              document.querySelector('.nav-card > .el-card__body').style.overflowX =  'scroll'
              document.querySelector('.nav-card > .el-card__body').style.overflowY = 'hidden'
          }
            let firefox = ''
            let opera = ''
            if (navigator.userAgent.indexOf('Firefox') >= 0) firefox = true
            if (navigator.userAgent.indexOf('Opera') >= 0) opera = true
            if(firefox){
                document.querySelector('.mainTable-card').style.height = 72.5 + '%'
            }
            if(opera){
                document.querySelector('.mainTable-card').style.height = 73.5 + '%'
            }
      },
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
    margin: 0px 26px 10px 10px;
    position: fixed;
    width: 98.6%;
    z-index: 999;
    height: 183px;
    // overflow-y: auto;
    .el-card__body{
        padding: 5px 20px;
        // overflow-x: scroll;
        // overflow-y: hidden;
    }
  }
 ::v-deep .button-card {
    margin: 0px 18px 10px 10px;
    position: fixed;
    top: 196px;
    z-index: 1000;
    width: 98.6%;
    .el-card__body{
        padding: 3px 20px;
    }
  }
  ::v-deep.mainTable-card {
    margin: 0px 18px 10px 10px;
    position: relative;
    top: 226px;
    width: 98.6%;
    height: 72.5%;
    .el-card__body{
        padding: 5px 10px;
    }
  }
}
</style>
