<template>
  <div>
    <h2 class="sub-title">PRODUCTOS</h2>
    <el-button type="primary" plain size="mini" @click="modalProduct = true"
      >Nuevo producto</el-button
    >
    <el-table :data="products">
      <el-table-column prop="brand" label="Código" />
      <el-table-column prop="brand" label="Marca" />
      <el-table-column prop="brand" label="Modelo" />
      <el-table-column prop="name" label="Nombre" />
      <el-table-column prop="actions" label="Acciones" />
    </el-table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  async fetch() {
    try {
      await this.getProducts()
    } catch ({ message }) {
      this.$notify({
        type: 'error',
        title: 'Error',
        message
      })
    }
  },
  computed: {
    ...mapState(['products']),
    modalProduct: {
      get() {
        return this.$store.state.modalProduct
      },
      set(value) {
        this.$store.commit('SET_MODAL_PRODUCT', value)
      }
    }
  },
  methods: {
    ...mapActions(['getProducts'])
  }
}
</script>
