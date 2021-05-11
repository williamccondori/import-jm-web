<template>
  <div>
    <el-tabs tab-position="top" type="card">
      <el-tab-pane label="Categorías">
        <CategorySummary />
      </el-tab-pane>
      <el-tab-pane label="Marcas">
        <BrandSummary />
      </el-tab-pane>
      <el-tab-pane label="Modelos">
        <ModelSummary />
      </el-tab-pane>
    </el-tabs>
    <CategoryForm />
    <BrandForm />
    <ModelForm />
  </div>
</template>

<script>
import CategoryForm from '~/components/Settings/Product/Category/CategoryForm.vue'
import CategorySummary from '~/components/Settings/Product/Category/CategorySummary.vue'
import BrandForm from '~/components/Settings/Product/Brand/BrandForm.vue'
import BrandSummary from '~/components/Settings/Product/Brand/BrandSummary.vue'
import ModelForm from '~/components/Settings/Product/Model/ModelForm.vue'
import ModelSummary from '~/components/Settings/Product/Model/ModelSummary.vue'
export default {
  components: {
    CategoryForm,
    CategorySummary,
    BrandForm,
    BrandSummary,
    ModelForm,
    ModelSummary
  }
}
</script>
