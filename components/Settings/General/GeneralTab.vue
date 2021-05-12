<template>
  <div>
    <el-tabs tab-position="top" type="card">
      <el-tab-pane label="Tipos de documento">
        <DocumentTypeSummary />
      </el-tab-pane>
      <el-tab-pane label="Unidades">
        <UnitSummary />
      </el-tab-pane>
      <el-tab-pane label="Géneros">
        <GenderSummary />
      </el-tab-pane>
    </el-tabs>
    <DocumentTypeForm />
    <GenderForm />
    <UnitForm />
  </div>
</template>

<script>
import UnitSummary from './Unit/UnitSummary.vue'
import DocumentTypeForm from './DocumentType/DocumentTypeForm.vue'
import DocumentTypeSummary from './DocumentType/DocumentTypeSummary.vue'
import GenderForm from './Gender/GenderForm.vue'
import GenderSummary from './Gender/GenderSummary.vue'
import UnitForm from './Unit/UnitForm.vue'
export default {
  components: {
    GenderForm,
    GenderSummary,
    DocumentTypeForm,
    DocumentTypeSummary,
    UnitSummary,
    UnitForm
  }
}
</script>
