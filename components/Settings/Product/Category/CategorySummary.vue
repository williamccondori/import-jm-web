<template>
  <div>
    <h2 class="sub-title">CATEGORÍAS DE PRODUCTO</h2>
    <el-button type="primary" plain size="mini" @click="handleCreate"
      >Nueva categoría</el-button
    >
    <el-table :data="categories" size="mini">
      <el-table-column prop="name" label="Nombre" sortable />
      <el-table-column fixed="right" label="Operaciones">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            plain
            round
            @click="handleEdit(scope.row)"
          >
            Editar
          </el-button>
          <el-button
            type="danger"
            size="mini"
            plain
            round
            @click="handleDelete(scope.row)"
          >
            Eliminar
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  async fetch() {
    try {
      await this.getCategories()
    } catch ({ message }) {
      this.$notify({
        type: 'error',
        title: 'Error',
        message
      })
    }
  },
  computed: {
    ...mapState(['categories']),
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
    ...mapActions(['getCategories', 'activateCategory']),
    handleCreate() {
      this.activateCategory(null)
      this.modalCategory = true
    },
    handleEdit(row) {
      this.activateCategory(row.id)
      this.modalCategory = true
    },
    handleDelete(row) {
      // console.log(row)
    }
  }
}
</script>
