<template>
  <div>
    <h2 class="sub-title">UNIDADES</h2>
    <el-button type="primary" plain size="mini" @click="modalUnit = true"
      >Nueva unidad</el-button
    >
    <el-table :data="units">
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
    ...mapState('units'),
    modalUnit: {
      get() {
        return this.$store.state.modalUnit
      },
      set(value) {
        this.$store.commit('SET_MODAL_UNIT', value)
      }
    }
  },
  methods: {
    ...mapActions('getUnits')
  },
  fetch() {
    this.getUnits()
  }
}
</script>
