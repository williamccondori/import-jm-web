<template>
  <div>
    <h2 class="sub-title">MARCAS DE PRODUCTO</h2>
    <el-button type="primary" plain size="mini" @click="handleCreate"
      >Nueva marca</el-button
    >
    <el-table :data="brands" size="mini">
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
      await this.getBrands()
    } catch ({ message }) {
      this.$notify({
        type: 'error',
        title: 'Error',
        message
      })
    }
  },
  computed: {
    ...mapState(['brands']),
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
    ...mapActions(['getBrands', 'activateBrand']),
    handleCreate() {
      this.activateBrand(null)
      this.modalBrand = true
    },
    handleEdit(row) {
      this.activateBrand(row.id)
      this.modalBrand = true
    },
    handleDelete(row) {
      // console.log(row)
    }
  }
}
</script>
