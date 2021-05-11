<template>
  <div>
    <h2 class="sub-title">TIPOS DE CLIENTE</h2>
    <el-button type="primary" plain size="mini" @click="handleCreate"
      >Nuevo tipo de cliente</el-button
    >
    <el-table :data="clientTypes" size="mini">
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
      await this.getClientTypes()
    } catch ({ message }) {
      this.$notify({
        type: 'error',
        title: 'Error',
        message
      })
    }
  },
  computed: {
    ...mapState(['clientTypes']),
    modalClientType: {
      get() {
        return this.$store.state.modalClientType
      },
      set(value) {
        this.$store.commit('SET_MODAL_CLIENT_TYPE', value)
      }
    }
  },
  methods: {
    ...mapActions(['getClientTypes', 'activateClientType']),
    handleCreate() {
      this.activateClientType(null)
      this.modalClientType = true
    },
    handleEdit(row) {
      this.activateClientType(row.id)
      this.modalClientType = true
    },
    handleDelete(row) {
      // console.log(row)
    }
  }
}
</script>
