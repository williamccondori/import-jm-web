<template>
  <div>
    <el-tabs tab-position="top" type="card">
      <el-tab-pane label="Tipos de documento">
        <DocumentTypeSummary />
      </el-tab-pane>
      <el-tab-pane label="Tipos de cliente">
        <ClientTypeSummary />
      </el-tab-pane>
      <el-tab-pane label="Géneros">
        <GenderSummary />
      </el-tab-pane>
    </el-tabs>
    <ClientTypeForm />
    <DocumentTypeForm />
    <GenderForm />
  </div>
</template>

<script>
import ClientTypeForm from './ClientType/ClientTypeForm.vue'
import ClientTypeSummary from './ClientType/ClientTypeSummary.vue'
import DocumentTypeForm from './DocumentType/DocumentTypeForm.vue'
import DocumentTypeSummary from './DocumentType/DocumentTypeSummary.vue'
import GenderForm from './Gender/GenderForm.vue'
import GenderSummary from './Gender/GenderSummary.vue'
export default {
  components: {
    ClientTypeSummary,
    GenderSummary,
    DocumentTypeSummary,
    ClientTypeForm,
    DocumentTypeForm,
    GenderForm
  }
}
</script>
