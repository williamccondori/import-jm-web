<template>
  <div>
    <el-page-header content="Productos" @back="goBack" />
    <el-divider />
    <ProductSummary />
    <ProductForm />
  </div>
</template>

<script>
import ProductForm from '~/components/Products/ProductForm.vue'
import ProductSummary from '~/components/Products/ProductSummary.vue'
export default {
  components: { ProductSummary, ProductForm },
  methods: {
    goBack() {
      this.$router.push('/')
    }
  }
}
</script>
