<template>
  <div>
    <h2 class="sub-title">TIPOS DE DOCUMENTO</h2>
    <el-button type="primary" plain size="mini" @click="handleCreate"
      >Nuevo tipo de documento</el-button
    >
    <el-table :data="documentTypes" size="mini">
      <el-table-column prop="name" label="Nombre" sortable />
      <el-table-column prop="isEnabled" label="¿Está habilitado?" sortable>
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isEnabled"
            active-color="#13ce66"
            disabled
          />
        </template>
      </el-table-column>
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
      await this.getDocumentTypes()
    } catch ({ message }) {
      this.$notify({
        type: 'error',
        title: 'Error',
        message
      })
    }
  },
  computed: {
    ...mapState(['documentTypes']),
    modalDocumentType: {
      get() {
        return this.$store.state.modalDocumentType
      },
      set(value) {
        this.$store.commit('SET_MODAL_DOCUMENT_TYPE', value)
      }
    }
  },
  methods: {
    ...mapActions(['getDocumentTypes', 'activateDocumentType']),
    handleCreate() {
      this.activateDocumentType(null)
      this.modalDocumentType = true
    },
    handleEdit(row) {
      this.activateDocumentType(row.id)
      this.modalDocumentType = true
    },
    handleDelete(row) {
      // console.log(row)
    }
  }
}
</script>
