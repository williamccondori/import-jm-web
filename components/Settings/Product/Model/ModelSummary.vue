<template>
  <div>
    <h2 class="sub-title">MODELOS DE PRODUCTO</h2>
    <el-button type="primary" plain size="mini" @click="handleCreate"
      >Nuevo modelo</el-button
    >
    <el-table :data="models" size="mini">
      <el-table-column prop="brand" label="Marca" sortable>
        <template slot-scope="scope">
          <el-tag type="warning" size="mini" disable-transitions>{{
            scope.row.brand.name
          }}</el-tag>
        </template>
      </el-table-column>
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
      await this.getModels()
    } catch ({ message }) {
      this.$notify({
        type: 'error',
        title: 'Error',
        message
      })
    }
  },
  computed: {
    ...mapState(['models']),
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
    ...mapActions(['getModels', 'activateModel']),
    handleCreate() {
      this.activateModel(null)
      this.modalModel = true
    },
    handleEdit(row) {
      this.activateModel(row.id)
      this.modalModel = true
    },
    handleDelete(row) {
      // console.log(row)
    }
  }
}
</script>
