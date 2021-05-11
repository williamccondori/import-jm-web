<template>
  <div>
    <el-page-header content="Ventas" @back="goBack" />
    <el-divider />
    <SaleSummary />
  </div>
</template>

<script>
import SaleSummary from '~/components/Sales/SaleSummary.vue'
export default {
  components: { SaleSummary },
  methods: {
    goBack() {
      this.$router.push('/')
    }
  }
}
</script>
