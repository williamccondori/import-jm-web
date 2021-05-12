<template>
  <div>
    <el-page-header content="Configuraciones" @back="goBack" />
    <el-divider />
    <el-tabs tab-position="left">
      <el-tab-pane label="Empresa">
        <CompanyTab />
      </el-tab-pane>
      <el-tab-pane label="Parámetros">
        <ParameterSummary />
      </el-tab-pane>
      <el-tab-pane label="General">
        <GeneralTab />
      </el-tab-pane>
      <el-tab-pane label="Clientes">
        <ClientTab />
      </el-tab-pane>
      <el-tab-pane label="Productos">
        <ProductTab />
      </el-tab-pane>
    </el-tabs>
    <ParameterForm />
  </div>
</template>

<script>
import CompanyTab from '~/components/Settings/Company/CompanyTab.vue'
import ClientTab from '~/components/Settings/Client/ClientTab.vue'
import GeneralTab from '~/components/Settings/General/GeneralTab.vue'
import ParameterForm from '~/components/Settings/Parameter/ParameterForm.vue'
import ParameterSummary from '~/components/Settings/Parameter/ParameterSummary.vue'
import ProductTab from '~/components/Settings/Product/ProductTab.vue'
export default {
  components: {
    CompanyTab,
    ProductTab,
    ClientTab,
    GeneralTab,
    ParameterSummary,
    ParameterForm
  },
  methods: {
    goBack() {
      this.$router.push('/')
    }
  }
}
</script>
