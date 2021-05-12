<template>
  <div>
    <h2 class="sub-title">PROVEEDORES</h2>
    <el-button type="primary" plain size="mini" @click="handleCreate"
      >Nuevo proveedor</el-button
    >
    <el-table :data="providers" size="mini">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <p>Nombre legal: {{ scope.row.legalName }}</p>
          <p v-if="scope.row.documentType">
            Tipo de documento: {{ scope.row.documentType.name }} [{{
              scope.row.documentType.alias
            }}]
          </p>
          <p>Dirección: {{ scope.row.address }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="documentNumber" label="N° de documento" sortable />
      <el-table-column prop="legalName" label="Nombre" sortable />
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
      await this.getProviders()
    } catch ({ message }) {
      this.$notify({
        type: 'error',
        title: 'Error',
        message
      })
    }
  },
  computed: {
    ...mapState(['providers']),
    modalProvider: {
      get() {
        return this.$store.state.modalProvider
      },
      set(value) {
        this.$store.commit('SET_MODAL_PROVIDER', value)
      }
    }
  },
  methods: {
    ...mapActions(['getProviders', 'activateProvider']),
    handleCreate() {
      this.activateProvider(null)
      this.modalProvider = true
    },
    handleEdit(row) {
      this.activateProvider(row.id)
      this.modalProvider = true
    },
    handleDelete(row) {
      // console.log(row)
    }
  }
}
</script>
