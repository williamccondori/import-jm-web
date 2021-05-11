<template>
  <div>
    <el-page-header content="Configuraciones" @back="goBack" />
    <el-divider />
    <el-tabs tab-position="left">
      <el-tab-pane label="Empresa">
        <div>Empresa</div>
      </el-tab-pane>
      <el-tab-pane label="Unidades">
        <UnitSummary />
      </el-tab-pane>
      <el-tab-pane label="Parámetros">
        <ParameterSummary />
      </el-tab-pane>
      <el-tab-pane label="Clientes">
        <client-tab />
      </el-tab-pane>
      <el-tab-pane label="Productos">
        <product-tab />
      </el-tab-pane>
    </el-tabs>
    <UnitForm />
    <ParameterForm />
  </div>
</template>

<script>
import ClientTab from '~/components/Settings/Client/ClientTab.vue'
import ParameterForm from '~/components/Settings/Parameter/ParameterForm.vue'
import ParameterSummary from '~/components/Settings/Parameter/ParameterSummary.vue'
import ProductTab from '~/components/Settings/Product/ProductTab.vue'
import UnitForm from '~/components/Settings/Unit/UnitForm.vue'
import UnitSummary from '~/components/Settings/Unit/UnitSummary.vue'
export default {
  components: {
    UnitForm,
    UnitSummary,
    ProductTab,
    ClientTab,
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
