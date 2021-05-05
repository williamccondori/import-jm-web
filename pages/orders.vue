<template>
  <div>
    <el-page-header content="Órdenes" @back="goBack" />
    <el-divider />
    <OrderSummary />
  </div>
</template>

<script>
import OrderSummary from '~/components/Orders/OrderSummary.vue'
export default {
  components: { OrderSummary }
}
</script>
