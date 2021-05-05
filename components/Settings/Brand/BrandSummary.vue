<template>
  <div>
    <h2 class="sub-title">MARCAS</h2>
    <el-button type="primary" plain size="mini" @click="modalBrand = true"
      >Nueva marca</el-button
    >
    <el-table :data="brands">
      <el-table-column prop="brand" label="Marca" />
      <el-table-column prop="name" label="Nombre" />
      <el-table-column prop="actions" label="Acciones" />
    </el-table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState('brands'),
    modalBrand: {
      get() {
        return this.$store.state.modalBrand
      },
      set(value) {
        this.$store.commit('SET_MODAL_BRAND', value)
      }
    }
  },
  methods: {
    ...mapActions('getBrands')
  },
  fetch() {
    this.getBrands()
  }
}
</script>
