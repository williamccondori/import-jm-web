<template>
  <div>
    <el-page-header content="Configuraciones" @back="goBack" />
    <el-divider />
    <el-tabs tab-position="left">
      <el-tab-pane label="Impuestos">
        <div>Impuestos</div>
      </el-tab-pane>
      <el-tab-pane label="Unidades">
        <UnitSummary />
      </el-tab-pane>
      <el-tab-pane label="Categoría de productos">
        <CategorySummary />
      </el-tab-pane>
      <el-tab-pane label="Marcas">
        <BrandSummary />
      </el-tab-pane>
      <el-tab-pane label="Modelos">
        <ModelSummary />
      </el-tab-pane>
    </el-tabs>
    <!-- ANCHOR: form modals -->
    <UnitForm />
    <CategoryForm />
    <BrandForm />
    <ModelForm />
  </div>
</template>

<script>
import UnitForm from '~/components/Settings/Unit/UnitForm.vue'
import UnitSummary from '~/components/Settings/Unit/UnitSummary.vue'
import CategoryForm from '~/components/Settings/Category/CategoryForm.vue'
import CategorySummary from '~/components/Settings/Category/CategorySummary.vue'
import BrandForm from '~/components/Settings/Brand/BrandForm.vue'
import BrandSummary from '~/components/Settings/Brand/BrandSummary.vue'
import ModelForm from '~/components/Settings/Model/ModelForm.vue'
import ModelSummary from '~/components/Settings/Model/ModelSummary.vue'
export default {
  components: {
    UnitForm,
    UnitSummary,
    CategoryForm,
    CategorySummary,
    BrandForm,
    BrandSummary,
    ModelForm,
    ModelSummary
  },
  methods: {
    goBack() {}
  }
}
</script>

<style></style>
