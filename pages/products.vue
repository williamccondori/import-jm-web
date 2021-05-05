<template>
  <div>
    <el-page-header content="Productos" @back="goBack" />
    <el-divider />
    <ProductSummary />
  </div>
</template>

<script>
import ProductSummary from '~/components/Products/ProductSummary.vue'
export default {
  components: { ProductSummary }
}
</script>
