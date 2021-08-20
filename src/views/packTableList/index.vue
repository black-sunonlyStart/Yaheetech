<template>
  <div class="nav-container">
    <el-card class="nav-card">
      <navBar></navBar>
    </el-card>
    <el-card class="button-card">
      <abilityBtn></abilityBtn>
    </el-card>
    <el-card class="mainTable-card">
      <mainTable></mainTable>
    </el-card>
    <remarks ref="remarks"></remarks>
    <i class="remarks"
       @click="openRemarks"></i>
  </div>
</template>

<script>
import navBar from '@/components/navBar.vue'
import abilityBtn from '@/components/abilityBtn.vue'
import mainTable from '@/components/mainTable.vue'
import remarks from '@/components/remarks.vue'
export default {
  name: 'packTableList',
  components: {
    navBar,
    abilityBtn,
    mainTable,
    remarks
  },
  data () {
    return {
      currentRole: 'adminDashboard',
      faCoRemarks: false
    }
  },
  computed: {
  },
  created () {

  },
  methods: {
    openRemarks () {
      this.$refs.remarks.openHandle()
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-container {
  padding-top: 10px;
  width: 100%;
  min-height: 980px;
  background-color: rgba(230, 230, 230, 1);
  .remarks {
    position: fixed;
    left: 16px;
    top: 417px;
    height: 32px;
    width: 32px;
    z-index: 1000;
    background-image: url(../../assets/shousuo.png);
  }
  .nav-card {
    margin: 0px 26px 10px 10px;
    position: fixed;
    width: 97.6%;
    z-index: 999;
  }
  .button-card {
    margin: 0px 18px 10px 10px;
    position: fixed;
    top: 244px;
    z-index: 1000;
    width: 97.6%;
  }
  .mainTable-card {
    margin: 0px 18px 10px 10px;
    position: relative;
    top: 302px;
  }
}
</style>
