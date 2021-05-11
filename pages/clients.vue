<template>
  <div>
    <el-page-header content="Clientes" @back="goBack" />
    <el-divider />
    <ClientSummary />
    <ClientForm />
  </div>
</template>

<script>
import ClientForm from '~/components/Client/ClientForm.vue'
import ClientSummary from '~/components/Client/ClientSummary.vue'
export default {
  components: { ClientForm, ClientSummary },
  methods: {
    goBack() {
      this.$router.push('/')
    }
  }
}
</script>
