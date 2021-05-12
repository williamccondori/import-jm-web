<template>
  <div>
    <el-tabs tab-position="top" type="card">
      <el-tab-pane label="Empresa">
        <CompanyForm />
      </el-tab-pane>
      <el-tab-pane label="Sucursales">
        <LocationSummary />
      </el-tab-pane>
    </el-tabs>
    <LocationForm />
  </div>
</template>

<script>
import CompanyForm from './CompanyForm.vue'
import LocationForm from './Location/LocationForm.vue'
import LocationSummary from './Location/LocationSummary.vue'
export default {
  components: {
    CompanyForm,
    LocationForm,
    LocationSummary
  }
}
</script>
