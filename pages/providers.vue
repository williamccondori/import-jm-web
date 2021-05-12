<template>
  <div>
    <el-page-header content="Proveedores" @back="goBack" />
    <el-divider />
    <ProviderSummary />
    <ProviderForm />
  </div>
</template>

<script>
import ProviderForm from '~/components/Provider/ProviderForm.vue'
import ProviderSummary from '~/components/Provider/ProviderSummary.vue'
export default {
  components: { ProviderForm, ProviderSummary },
  methods: {
    goBack() {
      this.$router.push('/')
    }
  }
}
</script>
