<template>
  <div>
    <h2 class="sub-title">CATEGORÍAS</h2>
    <el-button type="primary" plain size="mini" @click="modalCategory = true"
      >Nueva categoría</el-button
    >
    <el-table :data="categories">
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
    ...mapState('categories'),
    modalCategory: {
      get() {
        return this.$store.state.modalCategory
      },
      set(value) {
        this.$store.commit('SET_MODAL_CATEGORY', value)
      }
    }
  },
  methods: {
    ...mapActions('getCategories')
  },
  fetch() {
    this.getCategories()
  }
}
</script>
