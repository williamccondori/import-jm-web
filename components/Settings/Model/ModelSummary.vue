<template>
  <div>
    <h2 class="sub-title">MODELOS</h2>
    <el-button type="primary" plain size="mini" @click="modalModel = true"
      >Nuevo modelo</el-button
    >
    <el-table :data="models">
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
    ...mapState('models'),
    modalModel: {
      get() {
        return this.$store.state.modalModel
      },
      set(value) {
        this.$store.commit('SET_MODAL_MODEL', value)
      }
    }
  },
  methods: {
    ...mapActions('getModels')
  },
  fetch() {
    this.getModels()
  }
}
</script>
