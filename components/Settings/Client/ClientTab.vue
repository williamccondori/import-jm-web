<template>
  <div>
    <el-tabs tab-position="top" type="card">
      <el-tab-pane label="Tipos de cliente">
        <ClientTypeSummary />
      </el-tab-pane>
    </el-tabs>
    <ClientTypeForm />
  </div>
</template>

<script>
import ClientTypeForm from './ClientType/ClientTypeForm.vue'
import ClientTypeSummary from './ClientType/ClientTypeSummary.vue'

export default {
  components: {
    ClientTypeForm,
    ClientTypeSummary
  }
}
</script>
